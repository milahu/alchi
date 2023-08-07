#! /usr/bin/env bash

set -e
set -u
set -x

svg_file="$1"

cat "$svg_file" |
perl -0777 -pe 's/\n    \@media screen \{\n.*?\n    \}\n(    \@media screen \{\n.*?\n    \}\n)?/\n/sg' |
perl -0777 -pe 's/\n      \@media screen \{\n.*?\n      \}\n(      \@media screen \{\n.*?\n      \}\n)?/\n/sg' |
perl -0777 -pe 's/\n        \@media screen \{\n.*?\n        \}\n(        \@media screen \{\n.*?\n        \}\n)?/\n/sg' |
sponge "$svg_file"
