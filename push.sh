#!/bin/sh
set -x
cd "$(dirname "$(readlink -f "$0")")"
git push github.com "$@"
git push codeberg.org "$@"
git push darktea.onion "$@"
git push rtp "$@"
# git push gh450 "$@"
