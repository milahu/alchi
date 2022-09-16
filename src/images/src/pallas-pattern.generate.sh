#! /usr/bin/env bash

basename=pallas-pattern

tempdir=$(mktemp -d)
echo "tempdir: $tempdir"

for configfile in "$basename".*.json
do

echo "configfile: $configfile"

configname="${configfile/$basename/}"
configname="$(echo "$configname" | sed -E 's/^\.?(.*)\.json$/\1/')"
echo "configname: $configname"

(
  set -x
  npx nunjucks "$basename".svg.njk "$configfile" --out "$tempdir" --extension svg --path ""
  #npx nunjucks "$basename".svg.njk "$configfile" --out "$tempdir" --extension "" --path "" # TODO test
)

mv -v "$tempdir/$basename.svg.svg" "$basename.$configname.svg"

done
