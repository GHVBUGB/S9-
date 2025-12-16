from PIL import Image

gif = Image.open('public/mascot.gif')
print(f'GIF 总帧数: {getattr(gif, "n_frames", 1)}')

webp = Image.open('public/mascot.webp')
print(f'WebP 总帧数: {getattr(webp, "n_frames", 1)}')

# 检查每帧时长
print("\nGIF 帧时长:")
for i in range(min(5, getattr(gif, "n_frames", 1))):
    gif.seek(i)
    print(f"  第 {i+1} 帧: {gif.info.get('duration', 0)}ms")

print("\nWebP 帧时长:")
for i in range(min(5, getattr(webp, "n_frames", 1))):
    webp.seek(i)
    print(f"  第 {i+1} 帧: {webp.info.get('duration', 0)}ms")

