#! /usr/bin/env python3

import os, sys, re

i = sys.argv[1]
o = (
  os.path.splitext(i)[0] +
  ".kommentiert.md"
)

with open(i) as f:
  s = f.read()

if s.startswith("<!--"):
  s = s[4:]
else:
  s = "<blockquote>\n\n" + s

if s.endswith("-->\n"):
  s = s[:-4] + "\n"
elif s.endswith("-->"):
  s = s[:-3] + "\n"
else:
  s = s + "\n\n</blockquote>"

s = s.replace("<!--", "\n\n</blockquote>\n\n")
s = s.replace("-->", "\n\n<blockquote>\n\n")

s = s.replace("\n.\n", "\n\n")

# debug
# print("\n".join(s.split("\n")[0:30]))
# sys.exit()

with open(o, "w") as f:
  f.write(s)

print("done", o)

# test
