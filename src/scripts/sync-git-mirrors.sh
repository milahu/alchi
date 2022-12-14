#!/bin/sh

set -e
set -x

opts="--force"

git stash -m "git pull-push $(date)"

# main repo
# https://github.com/milahu/alchi
git pull github master
git pull github master --tags
git push github $opts
git push github --tags $opts

# https://gitlab.com/milahu/alchi
git push gitlab $opts
git push gitlab --tags $opts

# https://try.gitea.io/milahu/alchi
# this is an automatic mirror
# updates are pulled by try.gitea.io
#git push gitea

git push srht $opts
git push srht --tags $opts

# http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/alchi
(
torsocks git push darktea $opts &&
torsocks git push darktea --tags $opts
) ||
(
echo retrying darktea
torsocks git push darktea $opts &&
torsocks git push darktea --tags $opts
)

git stash pop
