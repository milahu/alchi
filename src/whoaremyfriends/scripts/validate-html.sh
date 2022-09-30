#! /bin/sh

set -e

cd markdown

npx html-validate --config=htmlvalidate.config.json ../wersindmeinefreunde.html
