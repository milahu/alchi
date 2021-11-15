#!/usr/bin/env bash

grep images/ src/pages/* | \
sed -E 's/^.*src="([^"]+)".*$/\1/' | \
sort | \
uniq | \
while read f
do
  echo git add src/$f
  git add src/$f
done
