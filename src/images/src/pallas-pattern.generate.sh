#! /usr/bin/env bash

basename=pallas-pattern

defaultconfigname='simple'

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

outputfile="$basename.$configname.svg"
if [[ "$configname" == "$defaultconfigname" ]]
then
  outputfile="$basename.svg"
fi
echo "outputfile: $outputfile"
mv -v "$tempdir/$basename.svg.svg" "$outputfile"

echo

done
