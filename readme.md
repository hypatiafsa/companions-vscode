# Hypatia-VSCode

Hypatia Language Support for VSCode

[![Release]](https://github.com/hypatiafsa/companions-vscode/releases)
[![Tag]](https://github.com/hypatiafsa/companions-vscode/tags)
[![License]](https://opensource.org/license/uoi-ncsa-php)

[![Marketplace]](https://marketplace.visualstudio.com/items?itemName=hypatiafsa.hypatia)
[![OpenVSXV]](https://open-vsx.org/extension/hypatiafsa/hypatia)
[![OpenVSXD]](https://open-vsx.org/extension/hypatiafsa/hypatia)

[release]:
  https://img.shields.io/github/v/release/hypatiafsa/companions-vscode?label=Release
[tag]:
  https://img.shields.io/github/v/tag/hypatiafsa/companions-vscode?label=Tag
[license]:
  https://img.shields.io/badge/License-Illinois-blue.svg

[marketplace]:
  https://img.shields.io/badge/VS%20Marketplace-Hypatia-blue
[openvsxv]:
  https://img.shields.io/open-vsx/v/hypatiafsa/hypatia?label=Open+VSX
[openvsxd]:
  https://img.shields.io/open-vsx/dt/hypatiafsa/hypatia?label=OVSX+Downloads

[organisation-support]:
  https://github.com/hypatiafsa/.github/blob/master/support.md
[organisation-contributing]:
  https://github.com/hypatiafsa/.github/blob/master/contributing.md
[organisation-todo]:
  https://github.com/hypatiafsa/.github/blob/master/todo.md

---

### Table of Contents

1. [**The Extension**](#the-extension)
2. [**Language Styling**](#language-styling)
3. [**HLS Commands**](#hls-commands)
4. [**Configuration**](#configuration)
5. [**Versioning**](#versioning)
6. [**Installation**](#installation)
7. [**Change Log**](#change-log)
8. [**To Do**](#to-do)
9. [**Support**](#support)
10. [**Contributing**](#contributing)
11. [**Contributors**](#contributors)

---

## The Extension

**Hypatia-VSCode** provides language and editor support for Hypatia documents in
VSCode.
Files with the `.hyp` and `.hypatia` extensions are recognised as Hypatia
documents and receive Hypatia-specific syntax highlighting, styling, editor
configuration, and command support.

The extension also bundles the **Hypatia Light** and **Hypatia Dark** themes.
They can be selected as ordinary VSCode colour themes, while their token
palettes are used to style Hypatia syntax under arbitrary VSCode themes.

---

## Language Styling

The extension provides TextMate syntax highlighting for Hypatia files and
dedicated light and dark token palettes.

The grammar follows the current Hypatia syntax as closely as possible within the
limitations of TextMate, including escaped syntax, comments, qualified
references, Sifr constructs, and best-effort object-language highlighting.
Object-language highlighting currently recognises the inclusor pair `“ ... ”`.

Hypatia token colours are scoped to Hypatia documents, so they can coexist with
other languages and editor groups. The `hypatia.style.variant` setting selects
the light or dark palette, or follows the active VSCode theme when set to
`auto`.

The extension also provides Hypatia-specific editor support for comments,
surrounding pairs, auto-closing pairs, brackets, and folding.

---

## HLS Commands

The extension reserves the following commands for Hypatia Language Server
integration:

- **Hypatia: Toggle HLS**;
- **Hypatia: Restart HLS** (`Ctrl+K Ctrl+Enter` in a Hypatia editor);
- **Hypatia: Validate Current Editor** (`Ctrl+K Ctrl+V` in a Hypatia editor).

The current HLS integration is an initial stub: invoking these commands records
the invocation in the *Hypatia HLS* output channel.
The command identifiers and keybindings provide the interface for the future
Pythia language-server client.

---

## Configuration

The extension currently exposes the following style settings:

- `hypatia.style.variant`: selects `light`, `dark`, or `auto` for Hypatia token
  colours;
- `hypatia.style.trace`: enables diagnostic logging for Hypatia styling.

HLS configuration options are available under `hypatia.hls.*` in the VSCode
settings interface, in preparation for the language-server integration.

---

## Versioning

For details on the versioning scheme used for this extension, please refer to
the [Versioning Policy](./versioning.md).

---

## Installation

You can install **Hypatia-VSCode** in one of the following ways.

### Install from the VSCode Marketplace

1. Open the **Extensions** view (`Ctrl+Shift+X`).
2. Search for **Hypatia-VSCode** (or **Hypatia**).
3. Click **Install** and reload VSCode if prompted.

### Install from a VSIX package

If you have a `.vsix` release file (for example from the GitHub Releases page):

- In VSCode:

  open the **Extensions** view
  →
  click the `...` menu
  →
  **Install from VSIX…**

- From the terminal:

  ```shell
  code --install-extension hypatia-<version>.vsix
  ```

---

## Change Log

For a complete history of updates and modifications, please refer to the
[Change Log](./changelog.md) file.

---

## To Do

The list of upcoming features and improvements is tracked in the
[To Do](./todo.md) file.

---

## Support

For support with Hypatia-VSCode, please refer to the
[Support Guidelines][organisation-support].

For general discussions, check out GitHub Discussions on the
[Hypatia Organisation page](https://github.com/hypatiafsa).

---

## Contributing

We welcome contributions of all kinds, from bug reports and feature requests to
documentation improvements and code enhancements.
If you would like to contribute, please read the
[Contributing Guidelines][organisation-contributing] and consult the
[repository To Do](./todo.md) and [organisation To Do][organisation-todo] files.

---

## Contributors

For the list of contributors, please refer to the
[Contributors](./contributors.txt) file.
