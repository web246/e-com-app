from PIL import Image
import sys

img_path = 'src/assets/logo.png'
try:
    im = Image.open(img_path).convert('RGBA')
except Exception as e:
    print('ERROR:', e)
    sys.exit(1)

# Resize to speed up
im_small = im.resize((200, 200))
# Remove fully transparent
pixels = [p for p in im_small.getdata() if p[3] > 0]
if not pixels:
    pixels = list(im_small.getdata())

# Convert to palette with adaptive
pal = Image.new('P', (1,1))
pal = im_small.convert('P', palette=Image.ADAPTIVE, colors=8)
palette = pal.getpalette()
color_counts = sorted(pal.getcolors(), reverse=True)

colors = []
for count, idx in color_counts[:8]:
    r = palette[idx*3]
    g = palette[idx*3+1]
    b = palette[idx*3+2]
    colors.append((count, (r,g,b)))

# Normalize to hex and unique ordered by count
seen = set()
hex_colors = []
for count, (r,g,b) in colors:
    h = '#%02X%02X%02X' % (r,g,b)
    if h not in seen:
        seen.add(h)
        hex_colors.append({'hex': h, 'count': count})

# Also sample the darkest brown and the cyan used for letters by sampling specific pixels heuristically
# Sample center area for silhouette brown
w,h = im.size
center = im.crop((int(w*0.35), int(h*0.15), int(w*0.65), int(h*0.85))).convert('RGBA')
center_pixels = [p for p in center.getdata() if p[3] > 0]
if center_pixels:
    # average
    rs = sum(p[0] for p in center_pixels)//len(center_pixels)
    gs = sum(p[1] for p in center_pixels)//len(center_pixels)
    bs = sum(p[2] for p in center_pixels)//len(center_pixels)
    hex_colors.insert(0, {'hex':'#%02X%02X%02X' % (rs,gs,bs), 'label':'silhouette_avg'})

# Sample bright cyan letters by scanning for bright pixels
bright = [p for p in pixels if p[0]>100 and p[1]>150 and p[2]>200]
if bright:
    r = sum(p[0] for p in bright)//len(bright)
    g = sum(p[1] for p in bright)//len(bright)
    b = sum(p[2] for p in bright)//len(bright)
    hex_colors.insert(0, {'hex':'#%02X%02X%02X' % (r,g,b), 'label':'letter_cyan'})

import json
print(json.dumps(hex_colors, indent=2))
