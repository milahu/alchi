#!/bin/sh

set -e
set -x

opts="--force"

# done: remove. better: socks5h proxy:
# git -c remote.origin.proxy=socks5h://127.0.0.1:9050 clone
# git config --add remote.darktea.proxy socks5h://127.0.0.1:9050
# curl --proxy socks5h://127.0.0.1:9050
#
# build git with patched curl to fix:
# Not resolving .onion address (RFC 7686)
# https://github.com/curl/curl/pull/11236
#export CURL_ALLOW_DOT_ONION=1

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

# no. this is an automatic mirror if the github repo at https://github.com/milahu/alchi
if false; then
remote=try.gitea.io
git push $remote $opts
git push $remote --tags $opts
fi

# http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/alchi
# enable tor:
# git config --add remote.darktea.proxy socks5h://127.0.0.1:9050
git push darktea $opts &&
git push darktea --tags $opts || true

# http://gg6zxtreajiijztyy5g6bt5o6l3qu32nrg7eulyemlhxwwl6enk6ghad.onion/milahu/alchi
# enable tor:
# git config --add remote.humanrightstech.proxy socks5h://127.0.0.1:9050
git push humanrightstech $opts &&
git push humanrightstech --tags $opts || true
