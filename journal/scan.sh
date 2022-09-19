#!/usr/bin/env bash

# dependencies:
# sane-backends -> scanimage
# imagemagick -> convert

# date
d=$(date +%Y-%m-%d.%H-%M-%S)

cachefile="$HOME/.cache/scan.sh.cache.txt"

title="$1"
title="${title%.webp}" # remove .webp file extension
if [[ -z "$title" ]]
then
  title="scan.$d"
fi

# output file
# lossy compression to webp. better than jpg
# 0.2 MByte
#o=large/scan.$d.large.webp
o="large/$title.large.webp"
quality=80

outdir="$(dirname "$o")"
if [[ ! -d "$outdir" ]]
then
  mkdir -p -v "$outdir"
fi

# also produce a small version
o_small="$title.webp"
small_scale=50%

# 15 MByte png file
resolution=300

mkdir /run/user/$(id --user) 2>/dev/null

# temp file
t=/run/user/$(id --user)/scan.$d.$title.png



# find scanner

scanner=""
if [[ -f "$cachefile" ]]
then
  # read cache
  scanner=$(cat "$cachefile")
fi

if [[ ! -z "$scanner" ]]
then
  echo "using cached scanner $scanner"

  # TODO validate cache
  # = is the device still online?
  # fast check with scanimage?
fi

if [[ -z "$scanner" ]]
then

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

  # write cache
  # FIXME no such file??
  (
    # debug
    set -x
    readlink -f ~
    readlink -f ~/.cache
    ls ~/.cache
    stat "$cachefile"
    stat "$(dirname "$cachefile")"
  )
  echo "$scanner" >"$cachefile"

fi



# scan

echo scan to temp file $t ...

sudo scanimage --device-name="$scanner" --mode=Color --resolution=$resolution --format=png --output="$t" --progress

# fuzzy = wildcard -> not working
#sudo scanimage --device-name="genesys:libusb:*:*" --mode=Color --resolution=300 --format=png --output="$t" --progress



# convert

convert_options=()

# set profile to fix red tint (red color cast)
# https://blog.teamgeist-medien.de/2015/07/typo3-graphicsmagick-rotstich-bei-bildern-beheben-farbfehler.html
# https://legacy.imagemagick.org/discourse-server/viewtopic.php?t=22549
convert_options+=( -set colorspace RGB +profile '*' )

(
  set -x
  convert "$t" "${convert_options[@]}" -quality $quality "$o"
)

echo done "$o"



# postprocess: contrast + scale + compress

postprocess_options=()

# contrast: increase contrast to remove noise in document scans
# https://superuser.com/questions/622950/is-there-a-way-to-increase-the-contrast-of-a-pdf-that-was-created-by-scanning-a
# http://www.fmwconcepts.com/imagemagick/thresholds/index.php # -t soft -l 25 -h 75
# to find these threshold values, use gimp > colors > levels
lowthresh=40 # higher = more black, more artefacts
highthresh=80 # lower = more white, artefacts
postprocess_options+=( -black-threshold "${lowthresh}%" -white-threshold "${highthresh}%" -level ${lowthresh}x${highthresh}% )

# scale
postprocess_options+=( -scale "$small_scale" )

# compress
postprocess_options+=( -quality $quality )

(
  set -x
  convert "$t" "${postprocess_options[@]}" "$o_small"
)

echo done "$o_small"



# remove tempfile

#rm -f "$t"
echo keep tempfile "$t"



# open result

echo opening "$o_small" ...
xdg-open "$o_small"
