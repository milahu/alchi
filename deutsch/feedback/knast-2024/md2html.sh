#!/usr/bin/env bash

# render markdown to html

# then:
# start http server in repo root
# python3 -m http.server

# then:
# open in browser
# http://localhost:8000/deutsch/feedback/knast-2024/2024-12-31.gutachten-obermaier.kommentiert.md.html

# then:
# print to pdf

# html header with styles and scripts
i1=2024-12-23.beschwerde-gegen-beschluss.md.html
i1n=208

if [ $# != 1 ]; then
  echo "usage: ./md2html.sh src.md"
  exit 1
fi

i2="$1"
o="$1".html

if [ "${i2: -3}" != ".md" ]; then
  echo "error: arg1 must be a .md file"
  exit 1
fi

{

  head -n $i1n $i1

  # no. pandoc is not available in termux
  # https://github.com/termux/termux-packages/issues/372
  # yes. this works with debian on termux
  # https://github.com/termux/termux-packages/issues/372#issuecomment-2624343142
  # https://github.com/sp4rkie/debian-on-termux
  # wget -q https://raw.githubusercontent.com/sp4rkie/debian-on-termux/master/debian_on_termux_10.sh
  # sh debian_on_termux_10.sh
  # apt install pandoc
  # cd /data/data/com.termux/files/home
  pandoc -t html <$i2

  # no. lowdown fails to switch back
  # from html to markdown
  # https://github.com/kristapsdz/lowdown/issues/152
  # lowdown -t html \
  # --html-no-skiphtml --html-no-escapehtml $i2

  # no. hoedown fails to switch back
  # from html to markdown
  # lowdown is based on hoedown
  # hoedown $i2

  # ./render.py $i2

} |
cat >$o

# prettier |
