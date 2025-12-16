"""
Convert an animated GIF with a solid background (e.g. black) into an animated WebP with alpha.

Strategy (robust for black backgrounds with black outlines):
- For each frame:
  - Convert to RGBA
  - Estimate background color from the four corners (most frequent)
  - Create a candidate mask for pixels "close" to the bg color (color distance threshold)
  - Flood-fill from frame borders within that candidate mask to get ONLY the bg connected to edges
    (preserves internal black outlines / details that are not connected to the border)
  - Set alpha=0 for that flood-filled region; keep everything else unchanged

Outputs a transparent animated WebP (lossless) suitable for web use.
"""

from __future__ import annotations

import os
from collections import Counter, deque
from typing import List, Tuple

from PIL import Image


def _color_dist(a: Tuple[int, int, int], b: Tuple[int, int, int]) -> int:
    return abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2])


def _estimate_bg_color(img_rgb: Image.Image) -> Tuple[int, int, int]:
    w, h = img_rgb.size
    corners = [
        img_rgb.getpixel((0, 0)),
        img_rgb.getpixel((w - 1, 0)),
        img_rgb.getpixel((0, h - 1)),
        img_rgb.getpixel((w - 1, h - 1)),
    ]
    # Use most common corner color (handles slight compression noise poorly, but good for solid bg)
    return Counter(corners).most_common(1)[0][0]


def _floodfill_border(mask: List[List[bool]]) -> List[List[bool]]:
    """Return region connected to border where mask is True."""
    h = len(mask)
    w = len(mask[0]) if h else 0
    out = [[False] * w for _ in range(h)]
    q: deque[Tuple[int, int]] = deque()

    def push(x: int, y: int):
        if 0 <= x < w and 0 <= y < h and mask[y][x] and not out[y][x]:
            out[y][x] = True
            q.append((x, y))

    # seed with border pixels
    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    while q:
        x, y = q.popleft()
        push(x + 1, y)
        push(x - 1, y)
        push(x, y + 1)
        push(x, y - 1)

    return out


def make_transparent_frame(frame: Image.Image, bg_thresh: int) -> Image.Image:
    rgba = frame.convert("RGBA")
    rgb = frame.convert("RGB")
    w, h = rgba.size
    bg = _estimate_bg_color(rgb)

    # candidate mask: pixels close to bg color
    cand = [[False] * w for _ in range(h)]
    px = rgb.load()
    for y in range(h):
        for x in range(w):
            cand[y][x] = _color_dist(px[x, y], bg) <= bg_thresh

    border_region = _floodfill_border(cand)

    out = rgba.copy()
    out_px = out.load()
    for y in range(h):
        for x in range(w):
            if border_region[y][x]:
                r, g, b, _a = out_px[x, y]
                out_px[x, y] = (r, g, b, 0)
    return out


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--in", dest="in_path", required=True, help="Input GIF path")
    parser.add_argument("--out", dest="out_path", required=True, help="Output WebP path")
    parser.add_argument(
        "--bg-thresh",
        dest="bg_thresh",
        type=int,
        default=40,
        help="Color distance threshold for background similarity (sum abs RGB diff). Try 30-80.",
    )
    parser.add_argument(
        "--lossless",
        dest="lossless",
        action="store_true",
        default=True,
        help="Write lossless WebP (default true).",
    )
    args = parser.parse_args()

    in_path = args.in_path
    out_path = args.out_path

    img = Image.open(in_path)
    frames: List[Image.Image] = []
    durations: List[int] = []

    # Extract frames + durations
    n = getattr(img, "n_frames", 1)
    for i in range(n):
        img.seek(i)
        frame = img.copy()
        frames.append(make_transparent_frame(frame, bg_thresh=args.bg_thresh))
        durations.append(int(img.info.get("duration", 80)))

    os.makedirs(os.path.dirname(out_path), exist_ok=True)

    # Pillow requires duration to be a single int OR list. We'll use list.
    frames[0].save(
        out_path,
        format="WEBP",
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        lossless=args.lossless,
        method=6,
        quality=100,
    )

    print(f"OK: wrote {out_path}")


if __name__ == "__main__":
    main()


