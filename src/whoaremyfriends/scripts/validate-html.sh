#! /bin/sh

set -e

#cd markdown
#npx html-validate --config=htmlvalidate.config.json ../wersindmeinefreunde.html

exec ./markdown/node_modules/html-validate/bin/html-validate.js --config=markdown/htmlvalidate.config.json wersindmeinefreunde.html
