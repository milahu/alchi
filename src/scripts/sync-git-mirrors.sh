#!/bin/sh

set -e
set -x

opts="--force"

# build git with patched curl to fix:
# Not resolving .onion address (RFC 7686)
# https://github.com/curl/curl/pull/11236
export CURL_ALLOW_DOT_ONION=1

# pull changes from main repo
git stash -m "git pull-push $(date)"
git pull github master
git pull github master --tags
git stash pop

# push changes to all repos

# https://github.com/milahu/alchi
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

# http error 500 -> "|| true" to allow error
# http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/alchi
(
torsocks git push darktea $opts &&
torsocks git push darktea --tags $opts
) ||
(
echo retrying darktea
torsocks git push darktea $opts &&
torsocks git push darktea --tags $opts
) || true

# http://gg6zxtreajiijztyy5g6bt5o6l3qu32nrg7eulyemlhxwwl6enk6ghad.onion/milahu/alchi
torsocks git push humanrightstech $opts &&
torsocks git push humanrightstech --tags $opts
