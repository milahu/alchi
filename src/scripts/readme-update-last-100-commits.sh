#!/usr/bin/env bash

set -e
set -x

command -v sponge
command -v git
command -v grep

cd "$(dirname "$0")"/../..

{
  grep -B99999 -Fx '<!-- <last-100-commits> -->' readme.md
  echo
  git log --format=' %H `%T` %ai %f' | tac | grep -n '.*' | sed -E 's/^([0-9]+): (.*)$/\1\\. \2  /' | tac | head -n100
  echo
  grep -A99999 -Fx '<!-- </last-100-commits> -->' readme.md
} | sponge readme.md
