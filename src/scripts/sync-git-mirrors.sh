#!/bin/sh

set -e
set -x

# main repo
# https://github.com/milahu/alchi
git pull github master --tags
git push github --tags

# https://gitlab.com/milahu/alchi
git push gitlab --tags

# https://try.gitea.io/milahu/alchi
# this is an automatic mirror
# updates are pulled by try.gitea.io
#git push gitea

git push srht --tags

# http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/alchi
torsocks git push darktea --tags
