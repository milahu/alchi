#!/usr/bin/env bash

backupDir=backup/fix-trailing-whitespace/$(date +%Y-%m-%d.%H-%M-%S)

#for f in "$@"
for f in src/pages/*.html
do
  backupFile="${backupDir}/${f}"
  mkdir -p "$(dirname "$backupFile")"
  cp -v "$f" "$backupFile"
  sed -i -E 's/\s+$//' "$f"
done
