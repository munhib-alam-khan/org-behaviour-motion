"""Convert the approved, already-prepared HTML images (src/assets/img/*.webp)
into PowerPoint-safe files (JPEG for opaque, PNG for alpha) and build the few
PPTX-only raster layers: torn-edge photos, night gradient, grain, hazard stripes,
graph paper, receipt wall. No new imagery: every pixel comes from approved assets."""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = Path('src/assets/img'); OUT = Path('submission/build/img'); OUT.mkdir(parents=True, exist_ok=True)

def save(im, name):
    if im.mode == 'RGBA' and im.getextrema()[3][0] < 255:
        im.save(OUT / f'{name}.png', optimize=True)
    else:
        im.convert('RGB').save(OUT / f'{name}.jpg', quality=86, optimize=True, progressive=True)

for f in sorted(SRC.glob('*.webp')):
    save(Image.open(f).convert('RGBA'), f.stem)

# seeded LCG identical to the HTML's rng()/torn()
def rng(seed):
    s = [seed & 0xffffffff or 1]
    def r():
        s[0] = (s[0] * 1664525 + 1013904223) & 0xffffffff
        return s[0] / 4294967296
    return r

def torn_poly(seed, w, h, amp=1.4, sides='trbl'):
    r = rng(seed); pts = []
    j = lambda on: r() * amp if on else 0
    x = 0.0
    while x <= 100.0001: pts.append((x, j('t' in sides))); x += 2.5
    y = 2.5
    while y <= 100.0001: pts.append((100 - j('r' in sides), y)); y += 2.5
    x = 97.5
    while x >= -0.0001: pts.append((x, 100 - j('b' in sides))); x -= 2.5
    y = 97.5
    while y > 0: pts.append((j('l' in sides), y)); y -= 2.5
    return [(px / 100 * w, py / 100 * h) for px, py in pts]

def cover(im, w, h, fx=0.5, fy=0.5):
    s = max(w / im.width, h / im.height)
    r = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x = round((r.width - w) * fx); y = round((r.height - h) * fy)
    return r.crop((x, y, x + w, y + h))

def torn(name, src, w, h, seed, fx=0.5, fy=0.5, amp=1.4, sides='trbl'):
    im = cover(Image.open(SRC / f'{src}.webp').convert('RGB'), w, h, fx, fy).convert('RGBA')
    m = Image.new('L', (w * 2, h * 2), 0)
    ImageDraw.Draw(m).polygon([(x * 2, y * 2) for x, y in torn_poly(seed, w, h, amp, sides)], fill=255)
    im.putalpha(m.resize((w, h), Image.LANCZOS)); save(im, name)

torn('torn_a01_title', 'a01', 1220, 1080, 3, amp=2.2, sides='l')
torn('torn_a10_super', 'a10_super', 300, 400, 31, fy=0.2)
torn('torn_a18', 'a18', 820, 520, 41)
torn('torn_a10', 'a10', 820, 540, 42, fx=0.6, fy=0.3)
torn('torn_a08', 'a08', 500, 300, 61)

W, H = 1920, 1080
# night radial gradient (matches .theme-night)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
d = np.sqrt(((xx - W * .5) / (W * 1.2)) ** 2 + ((yy - H * .38) / (H * .95)) ** 2)
c0, c1, c2 = np.array([45, 18, 67]), np.array([28, 10, 41]), np.array([11, 6, 16])
t1 = np.clip(d / .52, 0, 1)[..., None]; t2 = np.clip((d - .52) / .48, 0, 1)[..., None]
g = np.where(d[..., None] < .52, c0 * (1 - t1) + c1 * t1, c1 * (1 - t2) + c2 * t2)
Image.fromarray(g.astype(np.uint8)).save(OUT / 'bg_night.jpg', quality=90)
# film grain (transparent)
rs = np.random.RandomState(7)
gr = np.zeros((H // 2, W // 2, 4), np.uint8)
v = (rs.rand(H // 2, W // 2) > .5) * 255
gr[..., 0] = gr[..., 1] = gr[..., 2] = v; gr[..., 3] = (rs.rand(H // 2, W // 2) * 50).astype(np.uint8)
Image.fromarray(gr, 'RGBA').resize((W, H), Image.NEAREST).save(OUT / 'grain.png', optimize=True)
# hazard stripe strip (barrier edge)
st = Image.new('RGBA', (36, 1080), (11, 6, 16, 255)); dr = ImageDraw.Draw(st)
for k in range(-2, 60):
    y0 = k * 52; dr.polygon([(0, y0), (36, y0 - 36), (36, y0 - 10), (0, y0 + 26)], fill=(255, 210, 63, 255))
save(st.convert('RGB'), 'hazard')
# graph paper (blue grid on warm paper)
gp = Image.new('RGB', (1060, 950), (246, 242, 231)); dr = ImageDraw.Draw(gp)
for x in range(0, 1060, 20): dr.line([(x, 0), (x, 950)], fill=(226, 228, 238) if x % 100 else (206, 214, 240), width=1 if x % 100 else 2)
for y in range(0, 950, 20): dr.line([(0, y), (1060, y)], fill=(226, 228, 238) if y % 100 else (206, 214, 240), width=1 if y % 100 else 2)
gp.save(OUT / 'graph_paper.jpg', quality=90)
# receipt wall (same construction as the HTML wall, as one image layer)
rc = Image.open(SRC / 'receipt_strip.webp').convert('RGB')
wall = Image.new('RGB', (W, H), (5, 3, 7)); cols, rows = 20, 6; tw, th = W / cols, H / rows
for r_ in range(rows):
    for c_ in range(cols):
        tile = rc.resize((int(tw - 10), int(th - 8))); td = ImageDraw.Draw(tile)
        for k in range(int(th * .14), int(th * .66), 12): td.rectangle([tile.width * .16, k, tile.width * .84, k + 3], fill=(60, 55, 62))
        rot = (((r_ * 7 + c_ * 13) % 9) - 4) * 0.8
        t2 = tile.convert('RGBA').rotate(-rot, expand=True, resample=Image.BICUBIC)
        wall.paste(t2, (int(c_ * tw + 5 - (t2.width - tile.width) / 2), int(r_ * th + 4 - (t2.height - tile.height) / 2)), t2)
wall.save(OUT / 'receipt_wall.jpg', quality=84)
print('images:', len(list(OUT.iterdir())))

# CSS-filter equivalents used by the HTML (no new imagery)
from PIL import ImageEnhance
t2 = Image.open(SRC / 'tag2.webp').convert('RGBA'); a_ = t2.getchannel('A')
dk = ImageEnhance.Color(ImageEnhance.Brightness(t2.convert('RGB')).enhance(0.32)).enhance(0.6).convert('RGBA'); dk.putalpha(a_); dk.save(OUT / 'tag2_dark.png')
gy = ImageEnhance.Brightness(t2.convert('L').convert('RGB')).enhance(1.15).convert('RGBA'); gy.putalpha(a_); gy.save(OUT / 'tag2_gray.png')
bl = Image.open(SRC / 'a01_plum.webp').convert('RGB').filter(ImageFilter.GaussianBlur(6))
ImageEnhance.Brightness(bl).enhance(0.55).save(OUT / 'a01_plum_blur.jpg', quality=86)
print('filters ok')
