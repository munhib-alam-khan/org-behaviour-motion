"""Build presentation-ready images from assets/raw (AI-generated, illustrative).

Run:  python3 scripts/prepare-assets.py
- Everything happens locally (background removal uses rembg offline).
- Outputs go to src/assets/img/ and are bundled into the single offline HTML.
- Generated text/figures in the source images (receipt lines, POS totals,
  ID badge) are blurred here so they can never be read on screen.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

RAW = Path('assets/raw')
OUT = Path('src/assets/img')
OUT.mkdir(parents=True, exist_ok=True)

PLUM = np.array([30, 11, 43]); MAG = np.array([255, 92, 160])
INK = np.array([16, 10, 22]); YEL = np.array([255, 214, 90])

def load(name):
    return Image.open(next(RAW.glob(name + '*'))).convert('RGB')

def save(im, name, q=80):
    im.save(OUT / f'{name}.webp', 'WEBP', quality=q, method=6)

def grade(im, contrast=1.12, warm=0.05, sat=1.06, lift=-0.025):
    a = np.asarray(im).astype(np.float32) / 255
    lum = a.mean(axis=2, keepdims=True)
    a = lum + (a - lum) * sat
    a = (a - 0.5) * contrast + 0.5 + lift
    a[..., 0] += warm * 0.6; a[..., 2] -= warm * 0.6
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))

def duotone(im, dark, light, gamma=1.0):
    l = np.asarray(im.convert('L')).astype(np.float32) / 255
    l = np.clip((l - 0.04) / 0.92, 0, 1) ** gamma
    a = dark[None, None] * (1 - l[..., None]) + light[None, None] * l[..., None]
    return Image.fromarray(a.astype(np.uint8))

def cover(im, w=1920, h=1080, fy=0.5, fx=0.5, sharpen=True):
    s = max(w / im.width, h / im.height)
    r = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x = round((r.width - w) * fx); y = round((r.height - h) * fy)
    r = r.crop((x, y, x + w, y + h))
    return r.filter(ImageFilter.UnsharpMask(radius=1.4, percent=55, threshold=2)) if sharpen else r

def blur_poly(im, pts, radius=10):
    mask = Image.new('L', im.size, 0)
    ImageDraw.Draw(mask).polygon(pts, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(4))
    return Image.composite(im.filter(ImageFilter.GaussianBlur(radius)), im, mask)

_sess = None
def cut(im):  # local background removal
    global _sess
    from rembg import remove, new_session
    _sess = _sess or new_session('isnet-general-use')
    out = remove(im, session=_sess)
    return out.crop(out.getbbox())

def sticker(rgba, border=12, shadow=(14, 16), max_side=900):
    if max(rgba.size) > max_side:
        s = max_side / max(rgba.size)
        rgba = rgba.resize((round(rgba.width * s), round(rgba.height * s)), Image.LANCZOS)
    m = border * 2 + max(shadow)
    W, H = rgba.width + m * 2, rgba.height + m * 2
    a = Image.new('L', (W, H), 0); a.paste(rgba.getchannel('A'), (m, m))
    a = a.point(lambda v: 255 if v > 60 else 0).filter(ImageFilter.MinFilter(7)).filter(ImageFilter.MaxFilter(7))  # drop specks
    grown = a.filter(ImageFilter.MaxFilter(border * 2 + 1)).filter(ImageFilter.GaussianBlur(1))
    out = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sh = Image.new('RGBA', (W, H), (11, 6, 16, 0)); sh.putalpha(grown.point(lambda v: int(v * 0.85)))
    out.alpha_composite(sh, shadow)
    white = Image.new('RGBA', (W, H), (255, 252, 244, 0)); white.putalpha(grown)
    out.alpha_composite(white)
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0)); layer.paste(rgba, (m, m))
    out.alpha_composite(layer)
    return out.crop(out.getbbox())

def fit(rgba, max_side):
    s = min(1, max_side / max(rgba.size))
    return rgba.resize((round(rgba.width * s), round(rgba.height * s)), Image.LANCZOS)

# ── Full-bleed plates ────────────────────────────────────────────────
a01 = grade(load('A01'));   save(cover(a01), 'a01');  save(cover(duotone(a01, PLUM, MAG, 1.1)), 'a01_plum')
a02 = load('A02')
a02 = blur_poly(a02, [(690, 290), (1250, 268), (1190, 520), (1010, 700), (905, 860), (830, 1024), (290, 1024), (195, 870), (420, 735), (585, 600), (660, 430)], 11)
a02 = grade(a02);           save(cover(a02, fy=0.45), 'a02')
a03 = grade(load('A03'));   save(cover(a03), 'a03');  save(cover(duotone(a03, PLUM, MAG, 1.2)), 'a03_plum')
save(cover(grade(load('A03'), contrast=1.2, lift=-0.16, sat=0.8)).filter(ImageFilter.GaussianBlur(2)), 'a03_night')
save(cover(load('A03')).filter(ImageFilter.GaussianBlur(14)), 'a03_blur', 70)
a05 = grade(load('A05')).crop((0, 110, 1280, 830)); save(cover(a05), 'a05')     # right-edge cashier cropped out
a06 = grade(load('A06'));   save(cover(a06, fy=0.35), 'a06'); save(cover(duotone(a06, INK, YEL, 1.0), fy=0.35), 'a06_yel')
a07 = grade(load('A07')).rotate(26.5, resample=Image.BICUBIC, expand=True).crop((330, 420, 1600, 1134))  # rail made level
save(cover(duotone(a07, PLUM, MAG, 1.3)).filter(ImageFilter.GaussianBlur(2.2)), 'a07_plum')
a08 = grade(load('A08')).crop((60, 240, 1460, 1028)); save(cover(a08), 'a08')     # POS screen excluded
a09 = load('A09'); a09 = blur_poly(a09, [(70, 715), (925, 675), (930, 700), (330, 785), (70, 745)], 6)
a09 = grade(a09);           save(cover(a09, fy=0.6), 'a09')
a10 = load('A10'); a10 = blur_poly(a10, [(1060, 672), (1132, 672), (1132, 800), (1060, 800)], 9)
a10 = grade(a10);           save(cover(a10, fy=0.25), 'a10')
save(a10.crop((985, 90, 1536, 1024)), 'a10_super')                               # supervisor panel
save(cover(a10.crop((330, 150, 990, 1024)), w=660, h=874, sharpen=False), 'a10_cashier')
a16 = grade(load('A16'), warm=0.03); save(cover(a16), 'a16')
strip = load('A16').crop((712, 30, 950, 912)); save(strip, 'receipt_strip', 85)
a18 = grade(load('A18'));   save(cover(a18), 'a18')
a20 = grade(load('A20'), warm=0.03); save(cover(a20), 'a20')

# ── Cutouts (local rembg) ────────────────────────────────────────────
a04 = cut(load('A04'))
a04 = a04.crop((64, 0, a04.width, a04.height))  # drop the blurred hand/scanner blob at the arm tip
save(fit(a04, 1300), 'a04_cut', 85); save(sticker(a04, 14, (16, 18), 1100), 'a04_sticker', 85)
for key, name in [('A11', 'sv'), ('A12', 'ti'), ('A13', 'ts'), ('A15', 'fb')]:
    save(sticker(cut(load(key)), 10, (12, 14), 760), f'obj_{name}', 85)
from rembg import remove as _rm
keys = load('A14')
keys_cut = _rm(keys, session=_sess)
ImageDraw.Draw(keys_cut).polygon([(295, 312), (497, 312), (532, 338), (565, 362), (565, 565), (295, 565)], fill=(0, 0, 0, 0))
keys_cut = keys_cut.crop(keys_cut.getbbox())
save(sticker(keys_cut, 10, (12, 14), 760), 'obj_au', 85)
tags = load('A17')
for i, (x0, x1) in enumerate([(125, 445), (435, 790), (845, 1245), (1275, 1585)]):
    crop = tags.crop((x0, 0, x1, tags.height))
    from rembg import remove as _rm2
    t = _rm2(crop, session=_sess or __import__('rembg').new_session('isnet-general-use'))
    a = t.getchannel('A').point(lambda v: 255 if v > 24 else 0)
    a = a.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.MinFilter(9)).filter(ImageFilter.GaussianBlur(0.8))
    t = crop.convert('RGBA'); t.putalpha(a)        # light card stock: original colour, solid alpha
    t = t.crop(t.getbbox())
    save(fit(t, 900), f'tag{i + 1}', 85)
crates = load('A19')
box = cut(crates.crop((760, 360, 1585, 900)));                 save(fit(box, 760), 'box', 85)
blue = _rm(crates.crop((355, 45, 1200, 440)), session=_sess)
ImageDraw.Draw(blue).rectangle((0, 383, blue.width, blue.height), fill=(0, 0, 0, 0))
save(fit(blue.crop(blue.getbbox()), 760), 'crate', 85)

# ── Collage crops for Sc 4 (25 different moments) ────────────────────
src = {k: load(k) for k in ['A01', 'A03', 'A05', 'A06', 'A07', 'A08', 'A10', 'A11', 'A13', 'A15', 'A16', 'A18', 'A19']}
src['A05'] = src['A05'].crop((0, 0, 1280, 1024)); src['A08'] = src['A08'].crop((0, 240, 1536, 1024))
crops = [
    ('A01', (380, 230, 880, 600)), ('A03', (100, 120, 700, 520)), ('A05', (520, 150, 1100, 560)), ('A06', (480, 360, 1180, 830)),
    ('A07', (230, 150, 700, 600)), ('A08', (360, 160, 1000, 600)), ('A10', (520, 520, 900, 820)), ('A11', (400, 120, 1200, 700)),
    ('A01', (1180, 330, 1672, 680)), ('A03', (900, 120, 1600, 600)), ('A05', (0, 180, 520, 600)), ('A13', (480, 0, 1200, 600)),
    ('A15', (420, 60, 1120, 640)), ('A16', (600, 100, 1050, 500)), ('A18', (380, 100, 1200, 700)), ('A19', (150, 30, 1200, 700)),
    ('A06', (0, 100, 560, 520)), ('A08', (500, 300, 1300, 784)), ('A03', (300, 400, 900, 900)), ('A07', (900, 450, 1450, 900)),
    ('A10', (0, 300, 420, 700)), ('A01', (680, 580, 1400, 941)), ('A05', (700, 500, 1280, 1000)), ('A11', (1100, 100, 1600, 600)),
    ('A03', (1200, 400, 1672, 800)),
]
for i, (k, box_) in enumerate(crops):
    c = grade(src[k].crop(box_)); c = cover(c, 330, 240, sharpen=False)
    save(c, f'm{i + 1:02d}', 74)
print('assets written:', len(list(OUT.glob('*.webp'))))
