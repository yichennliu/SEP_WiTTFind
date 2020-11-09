#
# Makefile
#
SHELL = /bin/bash
MAKESHELL = /bin/bash

SILENT ?=
QUIET ?=
NPM_CMD ?= npm
NPM_OPT ?= install
NPM ?= $(NPM_CMD) $(NPM_OPT)

export # exports all variables

.NOTPARALLEL:
# recursively called makefiles will still run with -j

.SECONDEXPANSION:
# Usage of the *magic* target descriptions:
# Descriptions of targets can be specified as !TARGETNAME
# Example:
#
# !target: ; echo description of target
# !%:      ; echo description of $/ (where $/ "replaces" $* )
# target: $! prereq1 prereq2
#
# All target descriptions were located in make/describe.make
! = !$$@      # `$!' as a prerequisite means that this target is to be described
/ = $(@:!%=%) # `$/' in a recipe holds the target's name without `!'


default: npm

all: npm

dist: $! distclean
	find ./ -type f -not -iwholename '*.git*' > MANIFEST
	tar -c -v -z --files-from=MANIFEST -f wittfind-web.tar.gz 2>&1 >/dev/null

include make/*.make
