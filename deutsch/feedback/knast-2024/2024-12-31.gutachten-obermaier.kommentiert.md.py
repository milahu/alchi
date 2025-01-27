#! /usr/bin/env python3

import os, sys, re

i = "2024-12-31.gutachten-obermaier.md"
o = "2024-12-31.gutachten-obermaier.kommentiert.md"

with open(i) as f:
  s = f.read()

s = (
  "<blockquote>\n\n" +
  s +
  "\n\n</blockquote>"
)

s = re.sub(
  r" ?<!-- ?(.+) ?--> ?",
  (
    r"\n\n</blockquote>\n\n" +
    r"\1" +
    r"\n\n<blockquote>\n\n"
  ),
  s
)

with open(o, "w") as f:
  f.write(s)

print("done", o)
