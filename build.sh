#! /bin/bash

################################################################################
#                                                                              #
# Hypatia-VSCode - Hypatia Language Support for VSCode                         #
#                                                                              #
# build.sh                                                                     #
#                                                                              #
# Copyright (C) 2025, the Hypatia Development Team                             #
# All rights reserved.                                                         #
#                                                                              #
################################################################################

## Begin of file build.sh ##

set -euo pipefail
cd "$(dirname "$0")"

echo
echo "# Building the extension..."
npx @vscode/vsce pack

## End of file build.sh ##
