/* -----------------------------------------------------------------------------
--                                                                            --
-- Hypatia-VSCode - Hypatia Language Support for VSCode                       --
--                                                                            --
-- style.js                                                                   --
--                                                                            --
-- Copyright (C) 2025-2026, the Hypatia Development Team                      --
-- All rights reserved                                                        --
--                                                                            --
----------------------------------------------------------------------------- */

/* Begin of file style.js */

import * as vscode from "vscode";
import { readFile } from "node:fs/promises";

/* -------------------------------------------------------------------------- */

import utils from "./utils.js";

/* -------------------------------------------------------------------------- */

const { workspace, window } = vscode;

/* -------------------------------------------------------------------------- */

const STYLE_CHANNEL = "Hypatia Style";

const CFG_ROOT = "hypatia.style";

const THEME_FILE_LIGHT = "themes/hypatia-light.json";
const THEME_FILE_DARK = "themes/hypatia-dark.json";

const KEY_STYLE_VARIANT = `${ CFG_ROOT }.variant`;

const HYPATIA_SCOPE = "source.hypatia";
const INJECTED_RULE_PREFIX = "hypatia_autotokens";

/* -------------------------------------------------------------------------- */

/**
 * Creates a tracer specifically configured for the style output channel and
 * trace setting.
 * @param {vscode.ExtensionContext} context - The extension context, used for
 * creating and managing the output channel.
 * @returns {Object} An object with a `line` method for conditional logging.
 */
function makeTracer(context) {
  return utils.makeConfigBasedTracer(context, CFG_ROOT, STYLE_CHANNEL, "trace");
}

/* -------------------------------------------------------------------------- */

/**
 * Gets the configuration for the hypatia.style section.
 * @returns {vscode.WorkspaceConfiguration} The configuration.
 */
const styleCfg = () => utils.cfg(CFG_ROOT);

/**
 * Gets the theme variant setting (light/dark/auto).
 * @returns {"light" | "dark" | "auto"} Selected variant.
 */
function getThemeVariant() {
  const raw = styleCfg().get("variant", "auto");
  return utils.normaliseEnum(String(raw ?? "auto"), ["light", "dark", "auto"], "auto");
}

/**
 * Resolves the theme variant based on the setting and the current theme.
 * @returns {"light" | "dark"} The resolved variant.
 */
function resolveVariant() {
  const setting = getThemeVariant();
  if (setting === "light" || setting === "dark") return setting;
  return currentThemeKindIsLight() ? "light" : "dark";
}

/**
 * Checks if the currently active theme is light.
 * @returns {boolean} True if the theme is light.
 */
function currentThemeKindIsLight() {
  return utils.isLightThemeKind(window.activeColorTheme.kind);
}

/**
 * Gets the theme file path for a variant.
 * @param {"light" | "dark"} variant - The variant.
 * @returns {string} The theme file path.
 */
function themeFileForVariant(variant) {
  return variant === "light" ? THEME_FILE_LIGHT : THEME_FILE_DARK;
}

/* -------------------------------------------------------------------------- */

const _themeTokenColorsCache = new Map();

/**
 * Reads token colors from a specific theme file.
 * @param {vscode.ExtensionContext} context - Extension context.
 * @param {"light" | "dark"} variant - The theme variant.
 * @param {Object | undefined} trace - Tracer object for logging.
 * @returns {Promise<Array<Object>>} Array of color rules.
 */
async function readTokenColorsFromThemeFile(context, variant, trace) {
  if (_themeTokenColorsCache.has(variant)) return _themeTokenColorsCache.get(variant).slice();
  const rel = themeFileForVariant(variant);
  const abs = context.asAbsolutePath(rel);
  try {
    const raw = await readFile(abs, "utf8");
    const json = JSON.parse(raw);
    const rules = Array.isArray(json.tokenColors) ? json.tokenColors : [];
    _themeTokenColorsCache.set(variant, rules);
    return rules.slice();
  } catch (err) {
    trace?.line(`Style: failed reading ${ rel }`);
    utils.logError(err, "hypatia.style");
    _themeTokenColorsCache.set(variant, []);
    return [];
  }
}

/**
 * Clones an array of TextMate rules and assigns them new names with a unique
 * prefix, restricting their scopes to Hypatia documents.
 * @param {Array<any> | undefined} themeTokenColors - Original array of TextMate
 * rules.
 * @returns {Array<any>} New array of cloned and scoped rules.
 */
const buildInjectedRules = (themeTokenColors) =>
  utils.cloneTextMateRulesWithInjectedNames(
    themeTokenColors,
    INJECTED_RULE_PREFIX,
    HYPATIA_SCOPE
  );

/**
 * Filters an array of TextMate rules, removing those whose name starts with the
 * injection prefix. Used to remove previously injected Hypatia-specific token
 * rules.
 * @param {Array<any> | undefined} rules - Array of TextMate rules.
 * @returns {Array<any>} New filtered array without injected rules.
 */
const stripInjectedRules = (rules) =>
  utils.stripRulesWithNamePrefix(rules, INJECTED_RULE_PREFIX);

/**
 * Checks if an array of TextMate rules contains at least one rule whose name
 * starts with the injection prefix. Used to detect if Hypatia-specific token
 * rules are already present.
 * @param {Array<any> | undefined} rules - Array of TextMate rules.
 * @returns {boolean} True if at least one injected rule is found.
 */
const hasInjectedRules = (rules) =>
  utils.hasRulesWithNamePrefix(rules, INJECTED_RULE_PREFIX);

/* -------------------------------------------------------------------------- */

/**
 * Applies the token color overlay for the selected variant.
 * @param {vscode.ExtensionContext} context - Extension context.
 * @param {{value: boolean}} switchingRef - Reference for update status.
 * @param {Object | undefined} trace - Tracer object for logging.
 */
async function applyTokenOverlay(context, switchingRef, trace) {

  const editorCfg = utils.cfg("editor");
  const rawCurrent = editorCfg.get("tokenColorCustomizations");
  const current = utils.asPlainObject(rawCurrent, {});
  const variant = resolveVariant();
  const themeTokenColors = await readTokenColorsFromThemeFile(context, variant, trace);
  const injectedRules = buildInjectedRules(themeTokenColors);
  const baseRules = stripInjectedRules(current.textMateRules);
  const nextRules = [...baseRules, ...injectedRules];
  const currentRules = Array.isArray(current.textMateRules) ? current.textMateRules : [];

  if (JSON.stringify(currentRules) === JSON.stringify(nextRules)) {
    trace?.line(`Style: token palette '${ variant }' already applied`);
    return;
  }

  const target = utils.pickTargetForKey("editor", "tokenColorCustomizations");
  const next = Object.assign({}, current, { textMateRules: nextRules });
  await utils.updateSetting(
    "editor",
    "tokenColorCustomizations",
    next,
    { switchingRef, target }
  );
  trace?.line(`Style: applied token palette '${ variant }'`);

}

/**
 * Removes the Hypatia token color overlay.
 * @param {{value: boolean}} switchingRef - Reference for update status.
 * @param {Object | undefined} trace - Tracer object for logging.
 */
async function restoreTokenOverlay(switchingRef, trace) {

  const editorCfg = utils.cfg("editor");
  const rawCurrent = editorCfg.get("tokenColorCustomizations");
  const current = utils.asPlainObject(rawCurrent, {});
  if (!hasInjectedRules(current.textMateRules)) return;

  const strippedRules = stripInjectedRules(current.textMateRules);
  const base = Object.assign({}, current, { textMateRules: strippedRules });
  const keys = Object.keys(base);
  const onlyEmptyRules =
    keys.length === 0 ||
    (keys.length === 1 &&
      keys[0] === "textMateRules" &&
      Array.isArray(base.textMateRules) &&
      base.textMateRules.length === 0);
  const restored = onlyEmptyRules ? undefined : base;
  const target = utils.pickTargetForKey("editor", "tokenColorCustomizations");

  await utils.updateSetting(
    "editor",
    "tokenColorCustomizations",
    restored,
    { switchingRef, target }
  );
  trace?.line("Style: removed token palette");

}

/* -------------------------------------------------------------------------- */

/**
 * Activates the style management.
 * @param {vscode.ExtensionContext} context - Extension context.
 * @returns {vscode.Disposable} Object for deactivation.
 */
export function activateStyle(context) {

  const switchingRef = { value: false };
  const trace = makeTracer(context);
  const queue = utils.createSerialQueue((err) => {
    try { trace?.line(`Error: ${ String(err?.message ?? err) }`); } catch { }
    utils.logError(err, "hypatia.style");
  });
  const disposables = [];
  const schedule = (fn) =>
    (typeof queueMicrotask === "function" ? queueMicrotask : (f) => Promise.resolve().then(f))(fn);

  let pending = false;
  const requestApply = () => {
    if (pending) return;
    pending = true;
    schedule(() => {
      pending = false;
      queue.enqueue(() => applyTokenOverlay(context, switchingRef, trace));
    });
  };

  disposables.push(window.onDidChangeActiveColorTheme(() => {
    if (getThemeVariant() === "auto") requestApply();
  }));

  disposables.push(workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration(KEY_STYLE_VARIANT)) requestApply();
  }));

  requestApply();

  const disposeAsync = async () => {
    for (const d of disposables) { try { d.dispose(); } catch { } }
    await queue.enqueue(async () => {
      try {
        await restoreTokenOverlay(switchingRef, trace);
      } catch (err) {
        utils.logError(err, `${ CFG_ROOT }.dispose`);
      }
    });
  };

  return {
    dispose() { void disposeAsync(); },
    disposeAsync
  };

}

/* End of file style.js */
