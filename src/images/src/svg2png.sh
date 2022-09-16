#! /usr/bin/env bash

# dependencies:
# imagemagick -> convert
# inkscape

# install dependencies on ...
# nixos linux: nix-shell -p imagemagick inkscape
# debian linux: sudo apt install imagemagick inkscape

# TODO is this deterministic?
# or will imagemagick produce different PNG files from the same SVG files?

for svg in *.svg
do

base="${svg%.*}"
echo "base: $base"

echo "output transparent background: $base.png"
( set -x; inkscape "$svg" --export-filename "$base.png" --export-width 800 )

echo "output white background: $base.light.png"
( set -x; convert "$base.png" -background white -alpha remove -alpha off "$base.light.png" )

echo "output black background: $base.dark.png"
( set -x; convert "$base.light.png" -negate "$base.dark.png" )

echo

done
