#!/usr/bin/env bash

set -e
#set -x # debug

command -v sponge >/dev/null
command -v git >/dev/null
command -v grep >/dev/null
command -v sed >/dev/null

cd "$(dirname "$0")"/../..

tag_name=git-tags

{
  grep -B99999 -Fx "<!-- <$tag_name> -->" readme.md

  echo

  git tag -l --format='%(objectname) %(refname)' --sort=authordate |
  while read hash ref; do
    tree=$(git show --format=format:%T $hash | head -n1);
    echo " $hash $tree $ref";
  done |
  grep -n '.*' | tac | sed -E 's|^([0-9]+): ([0-9a-f]+) ([0-9a-f]+) refs/tags/(.*)$|\1\\. \2 `\3` \4  |'

  echo

  grep -A99999 -Fx "<!-- </$tag_name> -->" readme.md
} | sponge readme.md
