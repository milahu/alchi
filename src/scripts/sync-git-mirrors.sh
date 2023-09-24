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

if false; then
  git remote add github https://github.com/milahu/alchi

  git remote add gitlab https://gitlab.com/milahu/alchi

  git remote add srht https://git.sr.ht/~milahu/alchi

  # https://try.gitea.io/milahu/alchi is an automatic mirror of the github repo https://github.com/milahu/alchi

  git remote add darktea http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/alchi
  git config --add remote.darktea.proxy socks5h://127.0.0.1:9050

  git remote add humanrightstech http://gg6zxtreajiijztyy5g6bt5o6l3qu32nrg7eulyemlhxwwl6enk6ghad.onion/milahu/alchi
  git config --add remote.humanrightstech.proxy socks5h://127.0.0.1:9050

  git remote add notabug https://notabug.org/milahu/alchi

  git remote add disroot https://git.disroot.org/milahu/alchi

  #git remote add dev-hub.eu https://git.dev-hub.eu/milahu/alchi
  # dev-hub.eu repos are "internal" so not visible to the public
fi

for remote in github gitlab srht darktea humanrightstech notabug disroot; do
  git push $remote $opts &&
  git push $remote --tags $opts || true
done
