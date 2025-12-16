#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Quick script to convert mascot.gif to transparent mascot.webp"""

from PIL import Image
import os
from collections import Counter, deque

def color_dist(a, b):
    return abs(a[0]-b[0]) + abs(a[1]-b[1]) + abs(a[2]-b[2])

def estimate_bg(img):
    w, h = img.size
    corners = [
        img.getpixel((0, 0)),
        img.getpixel((w-1, 0)),
        img.getpixel((0, h-1)),
        img.getpixel((w-1, h-1))
    ]
    return Counter(corners).most_common(1)[0][0]

def floodfill_border(mask):
    h = len(mask)
    w = len(mask[0]) if h else 0
    out = [[False]*w for _ in range(h)]
    q = deque()
    visited = set()
    
    # Seed border pixels
    for x in range(w):
        if mask[0][x]:
            q.append((x, 0))
        if mask[h-1][x]:
            q.append((x, h-1))
    for y in range(h):
        if mask[y][0]:
            q.append((0, y))
        if mask[y][w-1]:
            q.append((w-1, y))
    
    while q:
        x, y = q.popleft()
        if (x, y) in visited:
            continue
        if not (0 <= x < w and 0 <= y < h):
            continue
        if not mask[y][x]:
            continue
        visited.add((x, y))
        out[y][x] = True
        q.append((x+1, y))
        q.append((x-1, y))
        q.append((x, y+1))
        q.append((x, y-1))
    
    return out

def process_frame(frame, thresh=80):
    rgba = frame.convert('RGBA')
    rgb = frame.convert('RGB')
    w, h = rgba.size
    bg = estimate_bg(rgb)
    
    px = rgb.load()
    cand = [[False]*w for _ in range(h)]
    for y in range(h):
        for x in range(w):
            cand[y][x] = color_dist(px[x, y], bg) <= thresh
    
    border = floodfill_border(cand)
    
    out = rgba.copy()
    out_px = out.load()
    for y in range(h):
        for x in range(w):
            if border[y][x]:
                r, g, b, _a = out_px[x, y]
                out_px[x, y] = (r, g, b, 0)
    
    return out

def main():
    print("Loading public/mascot.gif...")
    img = Image.open('public/mascot.gif')
    
    frames = []
    durs = []
    n = getattr(img, 'n_frames', 1)
    
    print(f"Processing {n} frames...")
    for i in range(n):
        img.seek(i)
        frame = img.copy()
        frames.append(process_frame(frame, thresh=80))
        durs.append(int(img.info.get('duration', 80)))
        print(f"  Frame {i+1}/{n} done")
    
    os.makedirs('public', exist_ok=True)
    
    print("Saving public/mascot.webp...")
    frames[0].save(
        'public/mascot.webp',
        format='WEBP',
        save_all=True,
        append_images=frames[1:],
        duration=durs,
        loop=0,
        lossless=True,
        method=6,
        quality=100
    )
    
    print("\n✓ SUCCESS! public/mascot.webp created with transparent background!")
    print("Now refresh your browser to see the transparent mascot!")

if __name__ == '__main__':
    main()

