#!/bin/sh

for x in ./*.generate.sh
do
  (set -x $x)
done

set -x
./svg2png.sh
./move-svg-files.sh
./move-png-files.sh
