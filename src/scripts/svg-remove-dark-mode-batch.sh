#! /usr/bin/env bash

grep -l "prefers-color-scheme: dark" src/images/*.svg 2>/dev/null |
while read f; do
  echo
  echo "file: $f"
  s=$(git status --porcelain "$f")
  if [[ "${s:0:2}" == "??" ]]; then
    echo file is not tracked by git
    cp -v "$f" "$f.bak.$(date +%s)"
    ./src/scripts/svg-remove-dark-mode.sh "$f"
  elif [[ "$s" == "" ]]; then
    echo file is tracked by git
    ./src/scripts/svg-remove-dark-mode.sh "$f"
    git add "$f"
    git commit -m "$(basename "$f"): remove dark mode"
    sleep 1
  else
    echo "FIXME unknown git status: $s"
  fi
done
