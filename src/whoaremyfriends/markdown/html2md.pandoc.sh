#!/bin/sh

# TODO plugins?
# i want to transform html, for static site generation (SSG)
# does pandoc support templates? nunjucks, handlebars, ...

( cd mdbook/src && pandoc --to markdown_strict --extract-media=images -s ../../wersindmeinefreunde.html -o wersindmeinefreunde.html.md )
