#!/usr/bin/env bash

mkdir -p small

shopt -s dotglob

for jpg in *.jpg *.jpeg; do

  temp_path="$jpg"

  format=jpg

  bth=40;
  wth=98;
  scale=50%;
  quality=80;
  small_scale=50%;
  extra_convert_options=()
  #extra_convert_options=(-rotate 90)
  # https://imagemagick.org/script/webp.php
  # these produce large output:
  # -define webp:alpha-compression=0
  # -define webp:exact=true
  # thresholds can produce ugly transparent output. example: scan.2023-10-03.10-31-42.1.webp
  #   -black-threshold $bth% -white-threshold $wth%
  # level should be enough:
  #   -level $bth"x"$wth%
  shared_convert_options=(
    "${extra_convert_options[@]}"
    -set colorspace RGB
#     -set colorspace Gray
    +profile '*'
    -quality $quality
    -define webp:lossless=false
    -define webp:auto-filter=true
    -define webp:image-hint=graph
  );
#  small_convert_options=("${shared_convert_options[@]}"
#    -scale $small_scale -level $bth"x"$wth%);
  large_convert_options=(
    "${shared_convert_options[@]}"
    -scale $small_scale
#    -level $bth"x"$wth%
  );
#  webp_small="$(basename "$temp_path" .$format).webp";
#  webp_large="large/$(basename "$temp_path" .$format).large.webp";
  webp_large="small/$(basename "$temp_path" .$format).webp";
  # note: convert already uses multiple cpu cores
  # so dont run convert in parallel, or set MAGICK_THREAD_LIMIT=1
  # https://superuser.com/questions/316365/parallel-processing-slower-than-sequential

[ -e "$webp_large" ] && continue

  set -x;
  echo "writing $webp_large"
  convert "$temp_path" "${large_convert_options[@]}" "$webp_large";
#  echo "writing $webp_small"
#  convert "$temp_path" "${small_convert_options[@]}" "$webp_small";
  set +x;

# break

# make it easier to kill
sleep 1

done
