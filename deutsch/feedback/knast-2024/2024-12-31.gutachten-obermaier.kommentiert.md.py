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

# fixme: no effect
s = re.sub(
  " ?<!-- ?([.\n]*) ?--> ?",
  (
    "\n\n</blockquote>\n\n" +
    r"\1" +
    "\n\n<blockquote>\n\n"
  ),
  s,
  re.S | re.M
)

s = s.replace("<!--", "\n\n</blockquote>\n\n")
s = s.replace("-->", "\n\n<blockquote>\n\n")

s = s.replace("\n.\n", "\n\n")

# debug
# print("\n".join(s.split("\n")[0:30]))
# sys.exit()

with open(o, "w") as f:
  f.write(s)

print("done", o)
