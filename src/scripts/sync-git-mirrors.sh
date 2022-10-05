#!/bin/sh

set -e
set -x

args=("$@")

# main repo
# https://github.com/milahu/alchi
#git pull github master
#git pull github master --tags

git push github "${args[@]}"
git push github --tags "${args[@]}"

# https://gitlab.com/milahu/alchi
git push gitlab "${args[@]}"
git push gitlab --tags "${args[@]}"

# https://try.gitea.io/milahu/alchi
# this is an automatic mirror
# updates are pulled by try.gitea.io
#git push gitea

git push srht "${args[@]}"
git push srht --tags "${args[@]}"

# http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/alchi
torsocks git push darktea "${args[@]}"
torsocks git push darktea --tags "${args[@]}"
