/* -----------------------------------------------------------------------------
--                                                                            --
-- Hypatia-VSCode - Hypatia Language Support for VSCode                       --
--                                                                            --
-- hls.js                                                                     --
--                                                                            --
-- Copyright (C) 2025-2026, the Hypatia Development Team                      --
-- All rights reserved                                                        --
--                                                                            --
----------------------------------------------------------------------------- */

/* Begin of file hls.js */

import * as vscode from "vscode";

/* -------------------------------------------------------------------------- */

const HLS_CHANNEL = "Hypatia HLS";

const CMD_TOGGLE = "hypatia.hls.server";
const CMD_RESTART = "hypatia.hls.restart";
const CMD_VALIDATE = "hypatia.hls.validate";

const KEY_RESTART = "Ctrl+K Ctrl+Enter";
const KEY_VALIDATE = "Ctrl+K Ctrl+V";

/* -------------------------------------------------------------------------- */

/**
 * Writes a stub command invocation to the HLS output channel.
 *
 * @param {vscode.OutputChannel} channel - HLS output channel.
 * @param {string} command - VSCode command identifier.
 * @param {string | undefined} keybinding - Associated keyboard shortcut.
 * @returns {void}
 */
function logStubCommand(channel, command, keybinding) {
  const suffix = keybinding === undefined
    ? ""
    : ` [keybinding: ${ keybinding }]`;
  channel.appendLine(`[stub] command invoked: ${ command }${ suffix }`);
  channel.show(true);
}

/* -------------------------------------------------------------------------- */

/**
 * Activates the current HLS stub.
 *
 * @param {vscode.ExtensionContext} _context - VSCode extension context.
 * @returns {vscode.Disposable} Disposable containing the stub resources.
 */
export function activateHLS(_context) {
  const channel = vscode.window.createOutputChannel(HLS_CHANNEL);

  const toggle = vscode.commands.registerCommand(CMD_TOGGLE, () => {
    logStubCommand(channel, CMD_TOGGLE, undefined);
  });

  const restart = vscode.commands.registerCommand(CMD_RESTART, () => {
    logStubCommand(channel, CMD_RESTART, KEY_RESTART);
  });

  const validate = vscode.commands.registerCommand(CMD_VALIDATE, () => {
    logStubCommand(channel, CMD_VALIDATE, KEY_VALIDATE);
  });

  return vscode.Disposable.from(channel, toggle, restart, validate);
}

/* End of file hls.js */
