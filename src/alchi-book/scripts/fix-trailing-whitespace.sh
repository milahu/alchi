#!/usr/bin/env bash

for f in "$@"
do
  t=$(date +%s)
  sed -i.$t.bak -E 's/\s+$//' "$f"
  echo "$f -> $f.$t.bak"
done
