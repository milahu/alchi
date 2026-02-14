#!/usr/bin/env python3

import sys
import re
import argparse


TILE = 4

LABEL_RE = re.compile(r'[FM]\d[LS]')


# ============================================================
# TRANSFORMS
# ============================================================

def hmove(g):
    return [row[-2:] + row[:-2] for row in g]


def vmove(g):
    return g[-2:] + g[:-2]


def hflip(g):
    return [list(reversed(row)) for row in g]


def vflip(g):
    return list(reversed(g))


def lrotate(g):
    return [[g[x][TILE-1-y] for x in range(TILE)] for y in range(TILE)]


def rrotate(g):
    return [[g[TILE-1-x][y] for x in range(TILE)] for y in range(TILE)]


TRANSFORMS = {
    "hmove": hmove,
    "vmove": vmove,
    "hflip": hflip,
    "vflip": vflip,
    "lrotate": lrotate,
    "rrotate": rrotate,
}


# ============================================================
# EXTRACT POSITIONS
# ============================================================

def extract(lines):

    positions = []
    values = []

    for y, line in enumerate(lines):
        for m in LABEL_RE.finditer(line):
            positions.append((y, m.start(), m.end()))
            values.append(m.group())

    xs = sorted(set(x for _, x, _ in positions))
    ys = sorted(set(y for y, _, _ in positions))

    w = len(xs)
    h = len(ys)

    grid = [[None]*w for _ in range(h)]
    posmap = {}

    i = 0
    for gy, y in enumerate(ys):
        for gx, x in enumerate(xs):
            grid[gy][gx] = values[i]
            posmap[(gy, gx)] = positions[i]
            i += 1

    return grid, posmap, h, w


# ============================================================
# APPLY TILE TRANSFORM
# ============================================================

def transform_tiles(grid, transforms, h, w):

    new = [row[:] for row in grid]

    for ty in range(0, h, TILE):
        for tx in range(0, w, TILE):

            tile = [
                grid[ty+y][tx+x]
                for y in range(TILE)
                for x in range(TILE)
            ]

            tile = [
                tile[i:i+TILE]
                for i in range(0, TILE*TILE, TILE)
            ]

            for t in transforms:
                tile = TRANSFORMS[t](tile)

            for y in range(TILE):
                for x in range(TILE):
                    new[ty+y][tx+x] = tile[y][x]

    return new


# ============================================================
# WRITE BACK
# ============================================================

def apply(lines, grid, posmap):

    lines = list(lines)

    for (gy, gx), (y, x, x2) in posmap.items():

        line = lines[y]

        lines[y] = line[:x] + grid[gy][gx] + line[x2:]

    return lines


# ============================================================
# PROCESS FILE
# ============================================================

def process(filename, transforms):

    with open(filename, encoding="utf-8") as f:
        lines = f.read().splitlines()

    grid, posmap, h, w = extract(lines)

    newgrid = transform_tiles(grid, transforms, h, w)

    newlines = apply(lines, newgrid, posmap)

    old = "\n".join(lines)
    new = "\n".join(newlines)

    if old != new:
        with open(filename, "w", encoding="utf-8") as f:
            f.write(new + "\n")


# ============================================================
# CLI
# ============================================================

def main():

    ap = argparse.ArgumentParser()

    ap.add_argument("transforms")
    ap.add_argument("files", nargs="+")

    args = ap.parse_args()

    transforms = args.transforms.split(",")

    for t in transforms:
        if t not in TRANSFORMS:
            print("Invalid:", t)
            sys.exit(1)

    for f in args.files:
        print("Processing", f)
        process(f, transforms)


if __name__ == "__main__":
    main()
