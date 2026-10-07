"""Helpers for building the PPTX in the HTML's 1920×1080 px coordinate system.
1 px = 6350 EMU (13.333 in wide); font px → pt = px / 2."""
import json, math, copy
from pathlib import Path
from lxml import etree
from PIL import Image, ImageFont
from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR, MSO_AUTO_SIZE
from pptx.oxml.ns import qn

PX = 6350
ROOT = Path(__file__).resolve().parents[2]
IMG = ROOT / 'submission/build/img'
FONTS = ROOT / 'submission/fonts'
DATA = json.loads((ROOT / 'submission/build/data.json').read_text())

# typefaces (static instances of the HTML's fonts)
D, C, X, L, M, K = 'Archivo Display', 'Archivo Condensed', 'Archivo Expanded', 'Archivo Label', 'JetBrains Mono', 'Caveat Brush'
SYM, CHK = 'Arial', 'Segoe UI Symbol'          # glyphs the subsets lack: ≈ ≠ → ↔ ↑ / ✓
FONT_FILES = {D: 'ArchivoDisplay-Regular.ttf', C: 'ArchivoCondensed-Regular.ttf', X: 'ArchivoExpanded-Regular.ttf',
              L: 'ArchivoLabel-Regular.ttf', M: 'JetBrainsMono-Regular.ttf', K: 'CaveatBrush-Regular.ttf'}
MONO_BOLD = 'JetBrainsMono-Bold.ttf'

# palette (HTML tokens)
INK, PLUM, PLUM2 = '0B0610', '1E0B2B', '2B1140'
MAG, BLUE, YEL, ORG = 'FF2E88', '3D6BFF', 'FFD23F', 'FF7A1A'
CREAM, PAPER, PAUSE, VIO = 'F4ECDD', 'FBF8F1', 'D9D6CF', '8A4DFF'
LILAC, RED = 'B892FF', 'E8253F'

E = lambda v: Emu(int(round(v * PX)))

# ── text measurement (real font metrics) ─────────────────────────────
_fc = {}
def _font(face, px, bold=False):
    key = (face, round(px), bold)
    if key not in _fc:
        f = MONO_BOLD if (face == M and bold) else FONT_FILES.get(face)
        _fc[key] = ImageFont.truetype(str(FONTS / f), max(1, round(px))) if f else None
    return _fc[key]

def width(text, face, px, spacing=0.0, bold=False, b=None):
    bold = bold if b is None else b
    f = _font(face, px, bold)
    w = f.getlength(text) if f else len(text) * px * 0.55
    return w + spacing * px * max(0, len(text) - 1)

# ── XML helpers ──────────────────────────────────────────────────────
A = 'http://schemas.openxmlformats.org/drawingml/2006/main'
def sub(parent, tag, **attrs):
    el = etree.SubElement(parent, qn(tag))
    for k, v in attrs.items(): el.set(k, str(v))
    return el

def _clr(parent, hexc, alpha=None):
    c = sub(parent, 'a:srgbClr', val=hexc)
    if alpha is not None and alpha < 1: sub(c, 'a:alpha', val=int(alpha * 100000))
    return c

def spPr(shape):
    return shape._element.spPr

def _insert_effect(sppr, eff):
    # effectLst must follow fill/ln in spPr
    old = sppr.find(qn('a:effectLst'))
    if old is not None: sppr.remove(old)
    after = None
    for t in ('a:ln', 'a:noFill', 'a:solidFill', 'a:gradFill', 'a:blipFill', 'a:pattFill', 'a:prstGeom', 'a:custGeom', 'a:xfrm'):
        after = sppr.find(qn(t))
        if after is not None: break
    if after is not None: after.addnext(eff)
    else: sppr.append(eff)

def effects(shape, shadow=None, glow=None):
    """shadow=(dx_px, dy_px, hex, alpha) hard offset shadow; glow=(radius_px, hex, alpha)."""
    sppr = spPr(shape)
    eff = etree.Element(qn('a:effectLst'))
    if glow:
        g = sub(eff, 'a:glow', rad=int(glow[0] * PX)); _clr(g, glow[1], glow[2])
    if shadow:
        dx, dy, hexc, al = shadow
        dist = int(math.hypot(dx, dy) * PX); dirn = int((math.degrees(math.atan2(dy, dx)) % 360) * 60000)
        s = sub(eff, 'a:outerShdw', blurRad=0, dist=dist, dir=dirn, algn='tl', rotWithShape=0); _clr(s, hexc, al)
    _insert_effect(sppr, eff)

def fill(shape, hexc=None, alpha=1.0):
    if hexc is None:
        shape.fill.background(); return
    shape.fill.solid(); shape.fill.fore_color.rgb = RGBColor.from_string(hexc)
    if alpha < 1:
        sub(shape.fill._xPr.find(qn('a:solidFill')).find(qn('a:srgbClr')), 'a:alpha', val=int(alpha * 100000))

def line(shape, hexc=None, w_px=0, alpha=1.0, dash=None, cap=None):
    if hexc is None or w_px == 0:
        shape.line.fill.background(); return
    shape.line.color.rgb = RGBColor.from_string(hexc); shape.line.width = E(w_px)
    ln = shape._element.spPr.find(qn('a:ln'))
    if alpha < 1: sub(ln.find(qn('a:solidFill')).find(qn('a:srgbClr')), 'a:alpha', val=int(alpha * 100000))
    if dash: sub(ln, 'a:prstDash', val=dash)
    if cap: ln.set('cap', cap)
    sub(ln, 'a:round')

def grad(shape, stops, angle=None, path=None, rect=None):
    """stops=[(pos 0-1, hex, alpha)]; linear angle (deg, PowerPoint convention) or path='circle'."""
    sppr = spPr(shape)
    for t in ('a:noFill', 'a:solidFill', 'a:gradFill'):
        for el in sppr.findall(qn(t)): sppr.remove(el)
    g = etree.Element(qn('a:gradFill')); g.set('rotWithShape', '1')
    gl = sub(g, 'a:gsLst')
    for pos, hexc, al in stops:
        gs = sub(gl, 'a:gs', pos=int(pos * 100000)); _clr(gs, hexc, al)
    if path:
        p = sub(g, 'a:path', path=path); l, t, r, b = rect or (50, 50, 50, 50)
        sub(p, 'a:fillToRect', l=l * 1000, t=t * 1000, r=r * 1000, b=b * 1000)
    else:
        sub(g, 'a:lin', ang=int(angle * 60000), scaled=0)
    sppr.find(qn('a:prstGeom')).addnext(g)

def name(shape, n):
    if n: shape.name = ' '.join(str(n).replace('\v', ' ').split())
    return shape

def lock(shape):
    """Background/texture layers: not selectable, so they never get in the way of editing."""
    nv = shape._element.find('.//' + qn('p:cNvPicPr'))
    if nv is None: nv = shape._element.find('.//' + qn('p:cNvSpPr'))
    if nv is not None:
        lk = nv.find(qn('a:picLocks')) if nv.tag == qn('p:cNvPicPr') else nv.find(qn('a:spLocks'))
        if lk is None: lk = sub(nv, 'a:picLocks' if nv.tag == qn('p:cNvPicPr') else 'a:spLocks')
        lk.set('noSelect', '1')

# ── shapes ───────────────────────────────────────────────────────────
def rect(sh, x, y, w, h, color=None, alpha=1.0, rot=0, n=None, ln=None, shadow=None, shape=MSO_SHAPE.RECTANGLE, glow=None, radius=None):
    s = sh.add_shape(shape, E(x), E(y), E(w), E(h))
    fill(s, color, alpha)
    if ln: line(s, *ln)
    else: line(s, None)
    if rot: s.rotation = rot
    if radius is not None and shape == MSO_SHAPE.ROUNDED_RECTANGLE:
        s.adjustments[0] = min(0.5, radius / min(w, h))
    if shadow or glow: effects(s, shadow=shadow, glow=glow)
    s.text_frame.text = ''
    return name(s, n)

def oval(sh, x, y, w, h, color=None, **kw):
    return rect(sh, x, y, w, h, color, shape=MSO_SHAPE.OVAL, **kw)

def poly(sh, pts, color=None, alpha=1.0, stroke=None, closed=True, n=None, rot=0, shadow=None, glow=None):
    """Freeform from px points. stroke=(hex, w_px, alpha)."""
    fb = sh.build_freeform(E(pts[0][0]), E(pts[0][1]), scale=1.0)
    fb.add_line_segments([(E(x), E(y)) for x, y in pts[1:]], close=closed)
    s = fb.convert_to_shape()
    if color and closed: fill(s, color, alpha)
    else: s.fill.background()
    if stroke:
        line(s, stroke[0], stroke[1], stroke[2] if len(stroke) > 2 else 1.0, cap='rnd')
    else: line(s, None)
    if rot: s.rotation = rot
    if shadow or glow: effects(s, shadow=shadow, glow=glow)
    return name(s, n)

# ── pictures ─────────────────────────────────────────────────────────
def imgpath(n):
    for ext in ('.png', '.jpg'):
        p = IMG / (n + ext)
        if p.exists(): return p
    raise FileNotFoundError(n)

def img_size(n):
    with Image.open(imgpath(n)) as im: return im.size

def pic(sh, n, x, y, w=None, h=None, crop=None, rot=0, nm=None, alpha=1.0, gray=False, ln=None, shadow=None, locked=False):
    iw, ih = img_size(n)
    if crop:  # (l, t, r, b) fractions
        cw, ch = iw * (1 - crop[0] - crop[2]), ih * (1 - crop[1] - crop[3])
    else: cw, ch = iw, ih
    if w is None: w = h * cw / ch
    if h is None: h = w * ch / cw
    p = sh.add_picture(str(imgpath(n)), E(x), E(y), E(w), E(h))
    if crop:
        p.crop_left, p.crop_top, p.crop_right, p.crop_bottom = crop
    blip = p._element.find('.//' + qn('a:blip'))
    if alpha < 1: sub(blip, 'a:alphaModFix', amt=int(alpha * 100000))
    if gray: sub(blip, 'a:grayscl')
    if rot: p.rotation = rot
    if ln: line(p, *ln)
    if shadow: effects(p, shadow=shadow)
    if locked: lock(p)
    return name(p, nm or f'Photo {n}')

def cover(sh, n, x, y, w, h, fx=0.5, fy=0.5, **kw):
    """object-fit: cover — crop the image to the box aspect."""
    iw, ih = img_size(n)
    s = max(w / iw, h / ih); vw, vh = w / s, h / s
    l = (iw - vw) * fx / iw; t = (ih - vh) * fy / ih
    return pic(sh, n, x, y, w, h, crop=(l, t, 1 - l - vw / iw, 1 - t - vh / ih), **kw)

def contain(sh, n, x, y, w, h, **kw):
    iw, ih = img_size(n); s = min(w / iw, h / ih)
    return pic(sh, n, x + (w - iw * s) / 2, y + (h - ih * s) / 2, iw * s, ih * s, **kw)

# ── text ─────────────────────────────────────────────────────────────
def _mix(c, target, a):
    c1 = [int(c[i:i + 2], 16) for i in (0, 2, 4)]; c2 = [int(target[i:i + 2], 16) for i in (0, 2, 4)]
    return ''.join(f'{round(x * a + y * (1 - a)):02X}' for x, y in zip(c1, c2))

def R(t, f=X, s=30, c=CREAM, a=1.0, b=False, sp=0.0, sh=None, outline=None, mix=None):
    """A run: text, face, size px, colour, opacity, bold, letter-spacing (em), text shadow (dx,dy,hex,alpha).
    Opacity is pre-blended into a solid colour (toward the backdrop) — transparent text runs are
    clipped by some renderers (LibreOffice/PDF), so solid colours are the reliable choice."""
    if a < 1:
        lum = sum(int(c[i:i + 2], 16) for i in (0, 2, 4)) / 765
        c = _mix(c, mix or (INK if lum > 0.5 else CREAM), a); a = 1.0
    return dict(t=t, f=f, s=s, c=c, a=a, b=b, sp=sp, sh=sh, ol=outline)

def P(*runs, al='l', lh=None, before=0):
    return dict(runs=list(runs), al=al, lh=lh, before=before)

LH = {D: 0.86, C: 0.92, X: 1.05, L: 1.15, M: 1.25, K: 0.98}

def text(sh, x, y, w, h, paras, anchor='t', wrap=True, rot=0, n=None, fill_hex=None, fill_alpha=1.0,
         inset=(0, 0, 0, 0), shadow=None, ln=None, shape=None):
    if isinstance(paras, dict): paras = [paras]
    if shape is not None: s = sh.add_shape(shape, E(x), E(y), E(w), E(h))
    else: s = sh.add_textbox(E(x), E(y), E(w), E(h))
    tf = s.text_frame
    tf.word_wrap = wrap; tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.margin_left, tf.margin_top, tf.margin_right, tf.margin_bottom = [E(v) for v in inset]
    tf.vertical_anchor = {'t': MSO_ANCHOR.TOP, 'm': MSO_ANCHOR.MIDDLE, 'b': MSO_ANCHOR.BOTTOM}[anchor]
    for i, pd in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = {'l': PP_ALIGN.LEFT, 'c': PP_ALIGN.CENTER, 'r': PP_ALIGN.RIGHT}[pd['al']]
        size0 = max(r['s'] for r in pd['runs']); face0 = pd['runs'][0]['f']
        p.line_spacing = Pt((pd['lh'] or LH.get(face0, 1.1) * size0) / 2)
        if pd['before']: p.space_before = Pt(pd['before'] / 2)
        for rd0 in pd['runs']:
          for j, part in enumerate(rd0['t'].split('\v')):
            if j: p.add_line_break()
            rd = dict(rd0, t=part)
            r = p.add_run(); r.text = rd['t']; fnt = r.font
            fnt.name = rd['f']; fnt.size = Pt(rd['s'] / 2); fnt.bold = rd['b']
            fnt.color.rgb = RGBColor.from_string(rd['c'])
            rPr = r._r.get_or_add_rPr()
            for tag in ('a:ea', 'a:cs'):
                sub(rPr, tag, typeface=rd['f'])
            if rd['a'] < 1:
                sub(rPr.find(qn('a:solidFill')).find(qn('a:srgbClr')), 'a:alpha', val=int(rd['a'] * 100000))
            if rd['sp']: rPr.set('spc', str(int(rd['sp'] * rd['s'] / 2 * 100)))
            if rd['ol']:
                ln_ = etree.Element(qn('a:ln')); ln_.set('w', str(int(rd['ol'][1] * PX)))
                sf = sub(ln_, 'a:solidFill'); _clr(sf, rd['ol'][0]); rPr.insert(0, ln_)
            if rd['sh']:
                dx, dy, hx, al = rd['sh']
                eff = etree.Element(qn('a:effectLst'))
                o = sub(eff, 'a:outerShdw', blurRad=0, dist=int(math.hypot(dx, dy) * PX), dir=int((math.degrees(math.atan2(dy, dx)) % 360) * 60000), algn='tl', rotWithShape=0)
                _clr(o, hx, al)
                rPr.find(qn('a:solidFill')).addnext(eff)
    if fill_hex: fill(s, fill_hex, fill_alpha)
    elif shape is not None: s.fill.background()
    if shape is not None and not ln: line(s, None)
    if ln: line(s, *ln)
    if rot: s.rotation = rot
    if shadow: effects(s, shadow=shadow)
    return name(s, n)

# convenience single-line text sized from real metrics
def label(sh, x, y, t, f=X, s=30, c=CREAM, al='l', a=1.0, b=False, sp=0.0, rot=0, n=None, shd=None, lh=None, wbox=None, ol=None, mix=None):
    w = wbox or width(t, f, s, sp, b) * 1.04 + s * 0.4
    xx = x if al == 'l' else (x - w / 2 if al == 'c' else x - w)
    hh = (lh or LH.get(f, 1.1) * s) + s * 0.1
    return text(sh, xx, y, w, hh, P(R(t, f, s, c, a, b, sp, shd, ol, mix), al=al, lh=lh), wrap=False, rot=rot, n=n)

# ── seeded geometry identical to the HTML (rng / torn / marker) ──────
def rng(seed):
    s = [seed & 0xffffffff or 1]
    def r():
        s[0] = (s[0] * 1664525 + 1013904223) & 0xffffffff
        return s[0] / 4294967296
    return r

def torn_pts(seed, x, y, w, h, amp=1.6):
    r = rng(seed); pts = []
    v = 0.0
    while v <= 100.0001: pts.append((v, r() * amp)); v += 2.5
    v = 2.5
    while v <= 100.0001: pts.append((100 - r() * amp, v)); v += 2.5
    v = 97.5
    while v >= -0.0001: pts.append((v, 100 - r() * amp)); v -= 2.5
    v = 97.5
    while v > 0: pts.append((r() * amp, v)); v -= 2.5
    return [(x + px / 100 * w, y + py / 100 * h) for px, py in pts]

def marker_circle(cx, cy, rx, ry, seed=1):
    r = rng(seed); out = []
    for i in range(27):
        a = -0.4 + (i / 24) * math.pi * 2; k = 1 + (r() - 0.5) * 0.06
        out.append((cx + math.cos(a) * rx * k, cy + math.sin(a) * ry * k))
    return out

def marker_line(x1, y1, x2, y2, seed=1, wob=6):
    r = rng(seed); n = 8; out = []
    for i in range(n + 1):
        t = i / n; nx, ny = -(y2 - y1), x2 - x1; Ln = math.hypot(nx, ny) or 1
        o = 0 if i in (0, n) else (r() - 0.5) * wob
        out.append((x1 + (x2 - x1) * t + nx / Ln * o, y1 + (y2 - y1) * t + ny / Ln * o))
    return out

def bezier(p0, p1, p2, p3, n=24):
    return [((1-t)**3*p0[0] + 3*(1-t)**2*t*p1[0] + 3*(1-t)*t**2*p2[0] + t**3*p3[0],
             (1-t)**3*p0[1] + 3*(1-t)**2*t*p1[1] + 3*(1-t)*t**2*p2[1] + t**3*p3[1]) for t in [i / n for i in range(n + 1)]]

def quad(p0, p1, p2, n=20):
    return [((1-t)**2*p0[0] + 2*(1-t)*t*p1[0] + t**2*p2[0], (1-t)**2*p0[1] + 2*(1-t)*t*p1[1] + t**2*p2[1]) for t in [i / n for i in range(n + 1)]]
