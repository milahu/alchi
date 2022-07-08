#!/bin/sh

set -e
set -x

# main repo
# https://github.com/milahu/alchi
#git push github # TODO
git pull github master

# https://gitlab.com/milahu/alchi
git push gitlab

# https://try.gitea.io/milahu/alchi
# this is an automatic mirror
# updates are pulled by try.gitea.io
#git push gitea

# http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/alchi
torsocks git push darktea
