#!/usr/bin/env bash

cd "$(dirname "$0")"

function escape() {
    echo "$1" | sed -E "s/'/\&#39;/g"
}

{
  echo "<html>"
  echo "<body style='margin:0; padding:0; text-align:center'>"
  while read -r date path; do
    if ! echo "$path" | grep -q -E '\.(jpg|jpeg|png|webp|gif|svg)$'; then
      continue
    fi
    lf="&#10;" # "\n"
    echo "<a href='$(escape "$path")'><img title='$(escape "$path")$lf$date' style='width:20%; margin:2%' src='$(escape "$path")'></a>"
  done < <(
    # list files tracked by git, sort by author date
    git ls-tree -r --name-only master . | while read -r path; do
    date=$(git log -n1 --format=format:%aI -- "$path"); echo "$date $path"; done |
    sort -r
    # | cut -c27-
  )
  echo "</body>"
  echo "</html>"

} >index.html
