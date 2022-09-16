#! /usr/bin/env bash

pngfiles=()

for f in *.png
do

pngfiles+=("$f")

echo mv -v "$f" ../ # dry run
#mv -v "$f" ../ # move files

done

echo
echo "next step: add png files to git"
echo

for f in "${pngfiles[@]}"
do

printf 'git add %q\n' "../$f"

done

echo
echo 'git commit -m "update generated png images" --edit'
