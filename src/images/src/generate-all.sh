#!/bin/sh

set -e
set -x

for x in ./*.generate.sh
do
  $x
done

./svg2png.sh
./move-svg-files.sh
./move-png-files.sh
