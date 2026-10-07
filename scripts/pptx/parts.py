"""Recurring visual components (HTML motifs) for the PPTX."""
from lib import *
from lib import _clr, _font

def set_bg(slide, color=None, night=False):
    cSld = slide._element.cSld
    old = cSld.find(qn('p:bg'))
    if old is not None: cSld.remove(old)
    bg = etree.Element(qn('p:bg')); bgPr = sub(bg, 'p:bgPr')
    if night:
        g = sub(bgPr, 'a:gradFill', rotWithShape='1'); gl = sub(g, 'a:gsLst')
        for pos, c in [(0, '2D1243'), (52000, '1C0A29'), (100000, INK)]:
            _clr(sub(gl, 'a:gs', pos=pos), c)
        p = sub(g, 'a:path', path='circle'); sub(p, 'a:fillToRect', l=50000, t=38000, r=50000, b=62000)
    else:
        _clr(sub(bgPr, 'a:solidFill'), color)
    sub(bgPr, 'a:effectLst'); cSld.insert(0, bg)

def grain(sh):
    p = pic(sh, 'grain', 0, 0, 1920, 1080, nm='Texture: film grain', locked=True)
    return p

def act_tag(sh, n, title, day=False):
    w1 = width(n, M, 24, 0.08, True) + 8
    if day:
        rect(sh, 62, 48, w1 + 8, 32, INK if False else YEL, n='Act tag box')
    text(sh, 64, 46, 700, 40, P(R(n, M, 24, INK if day else MAG, b=True, sp=0.08), R('  ' + title.upper(), M, 24, INK if day else CREAM, a=0.75, sp=0.08)), wrap=False, n='Act tag', inset=(4, 4, 0, 0))

def proposed_tape(sh):
    t = 'PROPOSED REDESIGN'; w = width(t, M, 26, 0.14, True) + 52
    text(sh, 1920 - 64 - w, 40, w, 50, P(R(t, M, 26, INK, b=True, sp=0.14), al='c'), anchor='m', fill_hex=YEL, rot=2, shape=MSO_SHAPE.RECTANGLE, n='Tape: proposed redesign')

def header(sh, n, title, target, ink=False):
    col = INK if ink else CREAM
    sh_ = None if ink else (0, 6, '000000', 0.4)
    label(sh, 110, 95, f'{n} · {title.upper()}', C, 88, col, shd=sh_, n='Header')
    text(sh, 110, 190, 1200, 40, P(R('TARGET ', M, 28, col), R('→ ', SYM, 28, col), R(target, M, 28, col, b=True)), wrap=False, n='Header target')

def tape_strip(sh, x, y, w=150, rot=-8, n='Tape'):
    return rect(sh, x, y, w, 46, 'F0E4C8', alpha=0.85, rot=rot, n=n, shadow=(0, 2, '000000', 0.15))

def stamp(sh, x, y, lines, size=84, color=MAG, rot=0, bg=None, bg_alpha=1.0, al='c', n='Stamp', border=10, lh=1.0, center_x=None):
    ws = max(width(t, C, size, 0.02) for t in lines)
    w = ws + 60 + 2 * border; h = len(lines) * size * lh + 18 + 2 * border
    if center_x is not None: x = center_x - w / 2
    s = text(sh, x, y, w, h, [P(R(t, C, size, color, sp=0.02), al=al, lh=size * lh) for t in lines],
             anchor='m', shape=MSO_SHAPE.ROUNDED_RECTANGLE, fill_hex=bg, fill_alpha=bg_alpha, ln=(color, border), rot=rot, n=n, inset=(30, 8, 30, 6))
    s.adjustments[0] = min(0.5, 16 / min(w, h))
    return s

def sticker(sh, x, y, t, bg, fg=INK, rot=0, size=33, n='Sticker'):
    w = width(t, L, size, 0.04) + 52 + 10
    return text(sh, x, y, w, size * 1.15 + 32 + 10, P(R(t, L, size, fg, sp=0.04)), anchor='m', fill_hex=bg, ln=(INK, 5), shadow=(9, 9, INK, 1.0), rot=rot, shape=MSO_SHAPE.RECTANGLE, n=n, inset=(26, 4, 26, 4), wrap=False)

def lower3(sh, x, y, spans, right=False):
    """spans = [(text, kind)] kind: 'k' (ink key) | 'y' (yellow) | hex colour."""
    yy = y
    for t, kind in spans:
        size = 22 if kind == 'k' else (34 if kind == 'big' else 26)
        bg = INK if kind == 'k' else (YEL if kind in ('y', 'big') else kind)
        fg = CREAM if kind == 'k' else INK
        sp = 0.14 if kind == 'k' else 0
        w = width(t, M, size, sp, True) + 30; h = size * 1.2 + 12
        xx = x - w if right else x
        text(sh, xx, yy, w, h, P(R(t, M, size, fg, b=True, sp=sp)), anchor='m', fill_hex=bg, shadow=(6, 6, INK, 1.0), shape=MSO_SHAPE.RECTANGLE, n='Lower third', inset=(14, 2, 10, 2), wrap=False)
        yy += h + 6
    return yy

def frame(sh, n, x, y, w, h, rot=0, border=16, border_hex=PAPER, fx=0.5, fy=0.5, nm=None):
    p = cover(sh, n, x, y, w, h, fx, fy, rot=rot, nm=nm or f'Photo frame {n}', ln=(border_hex, border), shadow=(14, 18, '000000', 0.55))
    return p

def marker(sh, pts, hexc=MAG, w=7, n='Marker', alpha=1.0, glow=None):
    return poly(sh, pts, stroke=(hexc, w, alpha), closed=False, n=n, glow=glow)

def hazard_barrier(sh, x, w, side, color=INK, nm='L'):
    rect(sh, x, 0, w, 1080, color, n=f'!!bar{nm}')
    hx = x + w - 36 if side == 'l' else x
    pic(sh, 'hazard', hx, 0, 36, 1080, nm=f'!!haz{nm}')

def mono_line(sh, x, y, t, s=24, c=CREAM, a=1.0, b=False, al='l', n=None):
    return label(sh, x, y, t, M, s, c, al=al, a=a, b=b, n=n)

def credit(sh, y=1018, c=CREAM, a=0.55, x=110):
    text(sh, x, y, 1700, 30, P(R('Photography: AI-generated & illustrative · no real employees or respondents · academic study, not affiliated with Imtiaz', M, 20, c, a=a)), wrap=False, n='Imagery disclosure')
