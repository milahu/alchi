#! /bin/sh

# start a webserver without caching
# for local development and browsing

# dont use "python -m http.server"
# as we cannot easily disable caching

script="$(readlink -f "$0")"

cd "$(dirname "$0")"

cd ../..

# now we should be in alchi/

which sirv >/dev/null 2>&1 || {
echo "error: sirv was not found. please install sirv:"
echo "npm install -g sirv-cli"
exit 1
}

sirv . --dev --no-clear
