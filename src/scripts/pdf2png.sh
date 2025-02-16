#!/usr/bin/env bash

# https://stackoverflow.com/questions/6605006
# convert-pdf-to-image-with-high-resolution

set -eu

pdf="$1"
png="$pdf.p1.png"

dpi=600
dpi=150
dpi=300

pages=0


a=(
convert
# -units PixelsPerInch
-density $dpi
"$pdf""[$pages]"
-trim
-flatten
# -sharpen 0x1.0
-background white
-alpha remove
-alpha off
"$png"
)

set -x

"${a[@]}"
