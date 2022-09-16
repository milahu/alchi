#! /usr/bin/env bash

svgfiles=()

for f in *.svg
do

svgfiles+=("$f")

#echo mv -v "$f" ../ # dry run
mv -v "$f" ../ # move files

done

echo
echo "next step: add svg files to git"
echo

for f in "${svgfiles[@]}"
do

printf 'git add %q\n' "../$f"

done

echo
echo 'git commit -m "update generated svg images" --edit'
