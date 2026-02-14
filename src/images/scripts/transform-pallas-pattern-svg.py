#!/usr/bin/env python3

import sys
import re
import argparse


# ============================================================
# CONFIGURATION
# ============================================================

GRID = 4
STEP = 200
MOVE = STEP * 2

ORIGIN_X = 400
ORIGIN_Y = 400


# ============================================================
# GRID TRANSFORMS (TEXT)
# ============================================================

def hmove(grid):
    return [row[-2:] + row[:-2] for row in grid]


def vmove(grid):
    return grid[-2:] + grid[:-2]


def hflip(grid):
    return [list(reversed(row)) for row in grid]


def vflip(grid):
    return list(reversed(grid))


def lrotate(grid):
    # 90° CCW
    return [
        [grid[x][GRID-1-y] for x in range(GRID)]
        for y in range(GRID)
    ]


def rrotate(grid):
    # 90° CW
    return [
        [grid[GRID-1-x][y] for x in range(GRID)]
        for y in range(GRID)
    ]


GRID_TRANSFORMS = {
    "hmove": hmove,
    "vmove": vmove,
    "hflip": hflip,
    "vflip": vflip,
    "lrotate": lrotate,
    "rrotate": rrotate,
}


# ============================================================
# REGEX
# ============================================================

TEXT_GROUP_RE = re.compile(
    r'(<g\b[^>]*(?:inkscape:label|title)="text"[^>]*>)(.*?)(</g>)',
    re.DOTALL
)

TEXT_RE = re.compile(
    r'(<text\b[^>]*>)([^<]*)(</text>)'
)

ARROWHEAD_RE = re.compile(
    r'(<g\b[^>]*(?:inkscape:label|title)="arrowheads"[^>]*)(>)'
)

TRANSFORM_RE = re.compile(
    r'\btransform="([^"]*)"'
)

ORIGIN_RE = re.compile(
    r'\btransform-origin="([^"]*)"'
)


# ============================================================
# HELPERS
# ============================================================

def make_grid(values):

    return [
        values[i:i+GRID]
        for i in range(0, GRID * GRID, GRID)
    ]


def flatten(grid):

    return [v for row in grid for v in row]


# ============================================================
# BUILD MINIMAL SVG TRANSFORM
# ============================================================

def build_minimal_transform(transforms):

    tx = 0
    ty = 0

    sx = 1
    sy = 1

    rot = 0

    for t in transforms:

        if t == "hmove":
            tx += MOVE

        elif t == "vmove":
            ty += MOVE

        elif t == "hflip":
            sx *= -1

        elif t == "vflip":
            sy *= -1

        elif t == "lrotate":
            rot -= 90

        elif t == "rrotate":
            rot += 90


    # normalize rotation
    rot %= 360

    parts = []

    if tx or ty:
        parts.append(f"translate({tx},{ty})")

    if rot:
        parts.append(f"rotate({rot})")

    if sx != 1 or sy != 1:
        parts.append(f"scale({sx},{sy})")

    return " ".join(parts)


# ============================================================
# TEXT PATCH
# ============================================================

def transform_text(content, transforms):

    def replace_group(match):

        start, body, end = match.groups()

        texts = TEXT_RE.findall(body)

        if len(texts) != 16:
            return match.group(0)

        values = [t[1] for t in texts]

        grid = make_grid(values)

        for t in transforms:
            grid = GRID_TRANSFORMS[t](grid)

        new_values = flatten(grid)

        i = 0

        def replace_text(m):
            nonlocal i
            result = m.group(1) + new_values[i] + m.group(3)
            i += 1
            return result

        new_body = TEXT_RE.sub(replace_text, body)

        return start + new_body + end


    return TEXT_GROUP_RE.sub(replace_group, content)


# ============================================================
# ARROWHEAD PATCH
# ============================================================

def transform_arrowheads(content, transforms):

    new_transform = build_minimal_transform(transforms)

    def repl(match):

        tag = match.group(1)

        # remove existing
        tag = TRANSFORM_RE.sub("", tag)
        tag = ORIGIN_RE.sub("", tag)

        tag = tag.rstrip()

        tag += f' transform-origin="{ORIGIN_X} {ORIGIN_Y}"'

        if new_transform:
            tag += f' transform="{new_transform}"'

        return tag + ">"

    return ARROWHEAD_RE.sub(repl, content)


# ============================================================
# FILE PROCESS
# ============================================================

def process_file(filename, transforms):

    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = transform_text(content, transforms)

    new_content = transform_arrowheads(new_content, transforms)

    if new_content != content:

        with open(filename, "w", encoding="utf-8") as f:
            f.write(new_content)


# ============================================================
# CLI
# ============================================================

def main():

    parser = argparse.ArgumentParser()

    parser.add_argument(
        "transforms",
        help="Comma separated: hmove,vmove,hflip,vflip,lrotate,rrotate"
    )

    parser.add_argument(
        "files",
        nargs="+"
    )

    args = parser.parse_args()

    transforms = args.transforms.split(",")

    for t in transforms:
        if t not in GRID_TRANSFORMS:
            print("Invalid transform:", t)
            sys.exit(1)

    for file in args.files:
        print("Processing", file)
        process_file(file, transforms)


if __name__ == "__main__":
    main()
