#!/usr/bin/env bash

# dependencies:
# sane-backends -> scanimage
# imagemagick -> convert

# date
d=$(date +%Y-%m-%d.%H-%M-%S)

# output file
# lossy compression to webp. better than jpg
# 0.2 MByte
o=large/scan.$d.large.webp
quality=80

mkdir large # todo parse from $o

# also produce a small version
o_small=scan.$d.webp
small_scale=50%

# 15 MByte png file
resolution=300

mkdir /run/user/$(id --user) 2>/dev/null

# temp file
t=/run/user/$(id --user)/scan.$d.png

# TODO cache
echo find scanners ...

scanners="$(sudo scanimage -L)"
echo "$scanners"
scanners="$(echo "$scanners" | sed -E "s/^.*\`(.*)'.*$/\\1/")"
numscanners="$(echo "$scanners" | wc -l)"
if [[ "$numscanners" != "1" ]]
then
  echo "FIXME choose scanner"
  exit 1
fi
# only 1 scanner
scanner="$scanners"

echo scan to temp file $t ...

sudo scanimage --device-name="$scanner" --mode=Color --resolution=$resolution --format=png --output="$t" --progress

# fuzzy = wildcard -> not working
#sudo scanimage --device-name="genesys:libusb:*:*" --mode=Color --resolution=300 --format=png --output="$t" --progress

convert "$t" -quality $quality "$o"

convert "$t" -scale "$small_scale" -quality $quality "$o_small"

rm -f "$t"

echo done $o
