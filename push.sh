#!/bin/sh
cd "$(dirname "$(readlink -f "$0")")"
git push darktea.onion -f
