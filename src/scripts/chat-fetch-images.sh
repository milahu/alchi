#!/usr/bin/env bash

avif_quality=10% # 10x smaller than jpeg from chatGPT

set -e
set -u

now=$(date -Is | tr -d :-)

# https://unix.stackexchange.com/a/778322/295986
function toBreRegex () { echo "${1//[.\/\\*^\$\[]/\\&}"; }
function toEreRegex () { echo "${1//[.\/\\*+?^\$|({\[]/\\&}"; }

for md in "$@"; do

  echo "md: $md"

  dir="$(dirname "$md")"

  jpeg_dir="$dir/img-jpg"
  avif_dir_rel="img" # relative to dirname(md)
  avif_dir="$dir/$avif_dir_rel"

  mkdir -p "$jpeg_dir"
  mkdir -p "$avif_dir"

  sed_script=""

  while read url
  do

    base=${url##*/} # get basename
    base=${base%\?*} # remove "?purpose=fullsize" suffix

    echo "base: $base"

    jpeg="$jpeg_dir/$base.jpg"
    avif="$avif_dir/$base.avif"
    avif_rel="$avif_dir_rel/$base.avif" # relative to dirname(md)

    if ! [ -e "$jpeg" ]; then
      # download
      # NOTE this assumes that existing files are valid
      # valid = no empty files, no partial downloads
      wget "$url" -O "$jpeg"
    fi

    if ! [ -e "$avif" ]; then
      # compress
      magick "$jpeg" -quality $avif_quality "$avif"
    fi

    url_regex="$(toEreRegex "$url")"

    sed_script+='s|!\[(.*)\]\('"$url_regex"'\)|![\1]('"$avif_rel"')|; '

  done < <(
    cat "$md" |
    grep -F '![Image](https://' |
    sed -E 's|!\[Image\]\((.*)\)|\1|'
  )

  # echo "sed_script: $sed_script" # debug

  sed -i.bak.$now -E "$sed_script" "$md"

  bak="$md.bak.$now"
  if [ "$(md5sum "$bak" | head -c32)" = "$(md5sum "$md" | head -c32)" ]; then
    echo "no change: $md"
    rm "$bak"
  fi

  echo

done
