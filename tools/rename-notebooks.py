#!/usr/bin/env python3
"""Give the lab notebooks a .ipynb extension and update the curriculum links.

Colab's GitHub loader only opens files whose names end in .ipynb, and most of
the notebooks under labs/ are stored with no extension at all. This renames
them and rewrites the matching `path:` values in assets/js/curriculum.js so the
two stay in sync.

    python3 tools/rename-notebooks.py            # show what would change
    python3 tools/rename-notebooks.py --apply    # do it

Safe to re-run: files that already end in .ipynb are left alone.
"""

import argparse
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CURRICULUM = ROOT / "assets" / "js" / "curriculum.js"
LABS = ROOT / "labs"


def is_notebook(path: pathlib.Path) -> bool:
    """True if the file parses as a Jupyter notebook, whatever it's called."""
    if path.suffix.lower() == ".ipynb":
        return False  # already named correctly
    if path.suffix:  # .docx and friends
        return False
    try:
        with path.open(encoding="utf-8") as fh:
            return "cells" in json.load(fh)
    except (ValueError, UnicodeDecodeError, OSError):
        return False


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="perform the renames")
    args = ap.parse_args()

    if not LABS.is_dir():
        print(f"error: {LABS} not found — run this from the site root", file=sys.stderr)
        return 1

    targets = sorted(p for p in LABS.rglob("*") if p.is_file() and is_notebook(p))
    if not targets:
        print("Nothing to do — every notebook already ends in .ipynb.")
        return 0

    js = CURRICULUM.read_text(encoding="utf-8")
    renames, unreferenced = [], []

    for src in targets:
        dst = src.with_name(src.name + ".ipynb")
        rel_src = src.relative_to(ROOT).as_posix()
        rel_dst = dst.relative_to(ROOT).as_posix()
        renames.append((src, dst, rel_src, rel_dst))
        if f'"{rel_src}"' not in js:
            unreferenced.append(rel_src)

    print(f"{len(renames)} notebook(s) to rename:\n")
    for _, _, rel_src, rel_dst in renames:
        print(f"  {rel_src}\n    -> {rel_dst}")

    if unreferenced:
        print("\nnot referenced in curriculum.js (renamed anyway):")
        for rel in unreferenced:
            print(f"  {rel}")

    if not args.apply:
        print("\nDry run. Re-run with --apply to make these changes.")
        return 0

    collisions = [d for _, d, _, _ in renames if d.exists()]
    if collisions:
        print("\nerror: refusing to overwrite existing files:", file=sys.stderr)
        for path in collisions:
            print(f"  {path.relative_to(ROOT)}", file=sys.stderr)
        return 1

    for src, dst, rel_src, rel_dst in renames:
        src.rename(dst)
        js = js.replace(f'"{rel_src}"', f'"{rel_dst}"')

    CURRICULUM.write_text(js, encoding="utf-8")
    print(f"\nRenamed {len(renames)} file(s) and updated {CURRICULUM.relative_to(ROOT)}.")
    print("Set COLAB_GITHUB in that file, then commit and push.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
