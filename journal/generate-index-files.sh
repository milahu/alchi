#! /usr/bin/env bash

for month in 2022-08 2022-09
do

(
printf '# %s\n\n' "$month"
find . -maxdepth 1 -name "$month-*.webp" -printf '%P\n' |
while read f
do
  printf '## %s\n\n' "$f"
  printf '![](%s)\n\n' "$f"
done
) | tee $month.md

done
