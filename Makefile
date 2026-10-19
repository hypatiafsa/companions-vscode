################################################################################
#                                                                              #
# Hypatia-VSCode - Hypatia Language Support for VSCode                         #
#                                                                              #
# Makefile                                                                     #
#                                                                              #
# Copyright (C) 2025-2026, the Hypatia Development Team                        #
# All rights reserved.                                                         #
#                                                                              #
################################################################################

SHELL := /bin/bash
.SHELLFLAGS := -euo pipefail -c
.DEFAULT_GOAL := build

.PHONY: build install help

NPX ?= npx
NODE ?= node
CODE ?= code

help:
	@printf '%s\n' \
	  'Hypatia-VSCode' \
	  '' \
	  '  make build       Package the extension as a VSIX file (default).' \
	  '  make install     Package and install the extension in VSCode.' \
	  '  make help        List the available commands.'

build:
	@printf '\n# Building the extension...\n'
	$(NPX) @vscode/vsce package

install: build
	@printf '\n# Installing the extension...\n'
	@package="$$($(NODE) -p \
	  'const p = require("./package.json"); p.name + "-" + p.version + ".vsix"' \
		)";	$(CODE) --install-extension "$$package"
