#!/bin/sh

# crop to aspect 16:9
# 1200/675 == 16/9

src="Koan - Dell'arte (Side A) - a0406257674_10.jpg"
dst="$src.crop.jpg"

echo "writing $dst"
exec jpegtran -crop 1200x675+0+162 "$src" >"$dst"
