# Hypatia-VSCode Change Log

List of notable changes to the Hypatia-VSCode language-support extension.

## [Unreleased] [*2026.09.10*]

[unreleased]:
  https://github.com/hypatiafsa/companions-vscode/compare/master...dev

Development version, not yet released to the public.

## [0.0.5] [*2026.09.10*]

[0.0.5]: <https://github.com/hypatiafsa/companions-vscode/releases/tag/v0.0.5>

6th public release

### Changed

- Improved the Hypatia TextMate grammar to better match the current language
  specification, including escaped syntax, comments, qualified references,
  best-effort object-language highlighting, and Sifr constructs.
- Simplified the style configuration and updated the related documentation.

### Fixed

- Prevented Hypatia styling from interfering with other languages, editor
  groups, terminal focus, or the selected VS Code theme.

## [0.0.4] [*2026.08.14*]

[0.0.4]: <https://github.com/hypatiafsa/companions-vscode/releases/tag/v0.0.4>

5th public release

### Changed

- Update of the syntax highlighting to reflect the new canonical forms `$Ab`,
  `$Ot`, and `$at`.

## [0.0.3] [*2026.08.08*]

[0.0.3]: <https://github.com/hypatiafsa/companions-vscode/releases/tag/v0.0.3>

4th public release

### Added

- Added an initial stub of the Hypatia Language Server client.

### Changed

- Small improvements across many files.
- Change of the repository name from vscode to companions-vscode.

## [0.0.2] [*2026.02.10*]

[0.0.2]: https://github.com/hypatiafsa/companions-vscode/releases/tag/v0.0.2

3rd public release

### Added

- Added code documentation for improved readability and maintainability.

### Changed

- Refactored codebase in preparation for Hypatia Language Server integration.

### Fixed

- Fixed a regression in switching between Hypatia editors.

## [0.0.1] [*2026.02.07*]

[0.0.1]: https://github.com/hypatiafsa/companions-vscode/releases/tag/v0.0.1

2nd public release

### Changed

- Migrated from CommonJS to ES Modules for better standard compliance.
- Refactored `extension.js` code to be more modular and maintainable.

### Fixed

- Fixed minor bugs in the restoration of the editor original settings.

## [0.0.0] [*2026.01.29*]

[0.0.0]: https://github.com/hypatiafsa/companions-vscode/releases/tag/v0.0.0

1st public release
