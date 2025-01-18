#!/usr/bin/env bash
set -eux
# d="2024-12-20.landratsamt-stellungnahme.md"
d="$1"
s="$d"
cd "$(dirname "$(readlink -f "$0")")"
cp /storage/sdcard0/Documents/markor/"$s" "$d"
chmod 0666 "$d"
git add "$d"
if [ $# = 2 ] && [ "$2" = i ]; then
  # init new file
  git commit --no-edit -m "add $d"
else
  # update old file
  git commit --amend --no-edit
fi
torpid=$(pidof tor)
if [ -z "$torpid" ]; then
  echo starting tor
  # this takes about 20 seconds
  tor &
  torpid=$!
fi
# sleep 20
for (( i=0; i<10; i++ )); do
  echo "git push: try $i"
  timeout 10 \
  git push darktea.onion -f &&
  break
  sleep 1
done
# kill $torpid

