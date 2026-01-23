#!/usr/bin/env python3

import os
import re
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
os.chdir(SCRIPT_DIR)

CSS_PATH = Path("bootstrap.css")

HTML_PATH_List = [
    Path("../../whoaremyfriends.html"),
    Path("../../wersindmeinefreunde.html"),
]

css = CSS_PATH.read_text(encoding="utf-8")
style_block = f'<style id="bootstrap-css">\n{css}\n</style>'
style_regex = re.compile(
    r'<style id="bootstrap-css" class="foldme">.*?</style>',
    re.DOTALL | re.IGNORECASE
)

for HTML_PATH in HTML_PATH_List:
    html = HTML_PATH.read_text(encoding="utf-8")
    html = style_regex.sub(style_block, html)
    HTML_PATH.write_text(html, encoding="utf-8")
    print(f"done {HTML_PATH}")
