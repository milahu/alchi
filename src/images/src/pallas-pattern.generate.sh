#! /usr/bin/env bash

# dependencies:
# nunjucks

# install dependencies with
# npm install

set -e

# debug
#set -x

basename=pallas-pattern

defaultconfigname='simple'

tempdir=$(mktemp -d)
echo "tempdir: $tempdir"

configfile_list=()

if [ -n "$1" ]; then
configfile_list+=("$1")
else
for configfile in "$basename".*.json
do
configfile_list+=("$configfile")
done
fi

# debug
echo "configfile_list:"
for configfile in "${configfile_list[@]}"
do
echo "  $configfile"
done

# debug
#exit

for configfile in "${configfile_list[@]}"
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
