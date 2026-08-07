# Hypatia-VSCode Versioning Policy

The Hypatia-VSCode extension follows [Semantic Versioning](https://semver.org/)
to ensure clarity and consistency in version numbering.

Public releases are assigned versions in the format `MAJOR.MINOR.PATCH`.

Version numbers begin at `0.0.0` and increase according to the following rules.

1. **Breaking Changes**
   (`MAJOR.MINOR.PATCH -> (MAJOR + 1).0.0`)

   The `MAJOR` index is incremented for backward-incompatible changes to the
   public API, implementation-specific formats, or externally visible behaviour,
   requiring users to adapt their work to the new version.

2. **New Features**
   (`MAJOR.MINOR.PATCH -> MAJOR.(MINOR + 1).0`)

   The `MINOR` index is incremented when new features are added in a
   backward-compatible manner, including significant refinements or
   improvements that do not break existing functionality.

3. **Bug Fixes and Minor Improvements**
   (`MAJOR.MINOR.PATCH -> MAJOR.MINOR.(PATCH + 1)`)

   The `PATCH` index is incremented for backward-compatible bug fixes,
   optimisations, documentation corrections, and minor refinements that do not
   introduce significant new features or break existing functionality.
