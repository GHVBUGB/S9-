import os
import sys
from collections import Counter, deque
from PIL import Image

def _color_dist(a, b):
    return abs(a[0]-b[0]) + abs(a[1]-b[1]) + abs(a[2]-b[2])

def _estimate_bg_color(img_rgb):
    w, h = img_rgb.size
    corners = [
        img_rgb.getpixel((0, 0)),
        img_rgb.getpixel((w-1, 0)),
        img_rgb.getpixel((0, h-1)),
        img_rgb.getpixel((w-1, h-1)),
    ]
    return Counter(corners).most_common(1)[0][0]

def _floodfill_border(mask):
    h = len(mask)
    w = len(mask[0]) if h else 0
    out = [[False]*w for _ in range(h)]
    q = deque()
    visited = set()
    
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
    bg = _estimate_bg_color(rgb)
    
    px = rgb.load()
    cand = [[False]*w for _ in range(h)]
    for y in range(h):
        for x in range(w):
            cand[y][x] = _color_dist(px[x, y], bg) <= thresh
    
    border = _floodfill_border(cand)
    
    out = rgba.copy()
    out_px = out.load()
    for y in range(h):
        for x in range(w):
            if border[y][x]:
                r, g, b, _a = out_px[x, y]
                out_px[x, y] = (r, g, b, 0)
    
    return out

print("开始处理新GIF...")
img = Image.open('public/12月15日 (1)(1).gif')
frames = []
durs = []
n = getattr(img, 'n_frames', 1)
print(f"总共 {n} 帧")

for i in range(n):
    img.seek(i)
    frames.append(process_frame(img.copy()))
    durs.append(int(img.info.get('duration', 80)))
    if (i+1) % 10 == 0:
        print(f"已处理 {i+1}/{n} 帧")

os.makedirs('public', exist_ok=True)
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

print("✓ 完成！已替换 public/mascot.webp")

