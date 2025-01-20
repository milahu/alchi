#!/bin/sh
set -x
cd "$(dirname "$(readlink -f "$0")")"
git push github.com "$@"
git push darktea.onion "$@"
