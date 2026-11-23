#! /bin/sh

set -e

# https://html-validate.org/

# TODO enable more rules in htmlvalidate.config.json

#cd markdown
#npx html-validate --config=htmlvalidate.config.json ../wersindmeinefreunde.html

cd "$(dirname "$0")"
html_validate="$PWD/node_modules/html-validate/bin/html-validate.mjs"
config="$PWD/htmlvalidate.config.json"

cd ..

set -x

# exec "$html_validate" foo.html
# exec "$html_validate" --config="$config" foo.html
exec "$html_validate" --config="$config" wersindmeinefreunde.html whoaremyfriends.html
