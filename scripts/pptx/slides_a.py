"""Slides 1–15 (HTML scenes 0–8)."""
from parts import *
from pptx.chart.data import XyChartData
from pptx.enum.chart import XL_CHART_TYPE, XL_MARKER_STYLE, XL_LABEL_POSITION, XL_TICK_MARK

J = DATA['JCM']; S = DATA['STUDY']; SAMPLE = DATA['SAMPLE']

def s01_title(s, sh):
    set_bg(s, night=True); grain(sh)
    pic(sh, 'torn_a01_title', 700, 0, 1220, 1080, nm='Photo A01 (scanner hands, torn edge)')
    r = rect(sh, 700, 0, 1220, 1080, n='Photo shade'); grad(r, [(0, PLUM, 0.85), (0.4, PLUM, 0.0), (1, PLUM, 0.0)], angle=0)
    rect(sh, 760, 560, 1160, 6, 'FF5AA2', n='Scanner line', glow=(18, MAG, 0.6))
    label(sh, 110, 150, f"{S['institutionShort']} · {S['course'].upper()} · {S['term'].upper()}", M, 26, CREAM, a=0.8, sp=0.12)
    text(sh, 96, 205, 1100, 300, P(R('CHECK', D, 330, CREAM, sh=(0, 14, '000000', 0.35)), R('OUT', D, 330, MAG, sh=(0, 14, '000000', 0.35))), wrap=False, n='Wordmark')
    text(sh, 110, 545, 1000, 110, P(R(S['title'].upper(), X, 44, CREAM), lh=48), n='Title')
    text(sh, 110, 665, 1150, 90, [P(R(S['subtitle'].upper(), L, 26, CREAM, a=0.85, sp=0.14)), P(R(S['context'].upper(), L, 26, CREAM, a=0.85, sp=0.14))], n='Subtitle')
    label(sh, 120, 770, 'a field study', K, 68, YEL, rot=-5)
    spans = [('PRESENTED BY', 'k')] + [(n_, 'y') for n_ in S['team']] + [(f"INSTRUCTOR · {S['instructor']}", 'k')]
    lower3(sh, 1830, 640, spans, right=True)
    credit(sh)

def s02_last(s, sh):
    set_bg(s, '050307')
    cover(sh, 'a02', 0, 0, 1920, 1080, nm='Photo A02 (receipt printer)')
    rect(sh, 0, 0, 1920, 1080, '000000', alpha=0.38, n='Photo dim')
    r = rect(sh, 0, 0, 1920, 1080, n='Shade left'); grad(r, [(0, INK, 0.92), (0.38, INK, 0.7), (0.7, INK, 0.0), (1, INK, 0)], angle=0)
    rect(sh, 0, 0, 1920, 120, '000000', n='Letterbox top'); rect(sh, 0, 960, 1920, 120, '000000', n='Letterbox bottom')
    text(sh, 120, 250, 1000, 520, [P(R('THE LAST', D, 200, CREAM)), P(R('PERSON', D, 200, CREAM)), P(R('YOU MEET.', D, 200, MAG))], n='Headline')
    pic(sh, 'receipt_strip', 1130, 120, 640, 840, nm='Receipt paper')
    label(sh, 1450, 192, 'CHECKOUT', M, 24, INK, al='c', b=True, sp=0.14)
    rect(sh, 1200, 236, 500, 0.1, n='Receipt rule', ln=(INK, 3, 1.0, 'dash'))
    for i, t in enumerate(['MONEY', 'DISCOUNTS', 'ACCURACY', 'WAITING TIME']):
        y = 250 + i * 59
        label(sh, 1200, y, t, M, 42, INK, b=True)
        rect(sh, 1200 + width(t, M, 42, b=True) + 16, y + 40, 460 - width(t, M, 42, b=True) - 40, 0.1, n='Dot leader', ln=(INK, 4, 0.35, 'sysDot'))
        label(sh, 1700, y, '✓', CHK, 36, INK, al='r', b=True)
    rect(sh, 1200, 492, 500, 0.1, n='Total rule', ln=(INK, 4))
    label(sh, 1200, 502, '= FINAL IMPRESSION', M, 40, MAG, b=True)
    marker(sh, marker_circle(1450, 527, 300, 58, 4), YEL, 7, n='Marker ring')

def _again_frames(sh, prefix='!!f'):
    for i, (x, y, r) in enumerate([(150, 250, -6), (560, 300, 3), (960, 230, -2), (1370, 290, 5)]):
        frame(sh, 'a06', x, y, 420, 300, rot=r, nm=f'{prefix}{i}')

def word_block(sh, lines, size, bg, fg=INK, top=0, n='!!word'):
    w = max(width(t, D, size) for t in lines) + size * 0.24 + 20
    h = len(lines) * size * 0.86 + size * 0.12
    return text(sh, (1920 - w) / 2, top, w, h, [P(R(t, D, size, fg), al='c', lh=size * 0.86) for t in lines], fill_hex=bg, shape=MSO_SHAPE.RECTANGLE, n=n, inset=(0, size * 0.06, 0, 0))

def s03_again(s, sh):
    set_bg(s, '050307'); _again_frames(sh)
    word_block(sh, ['AGAIN.'], 330, MAG, top=360)

def s04_shift(s, sh):
    set_bg(s, '050307')
    pic(sh, 'receipt_wall', 0, 0, 1920, 1080, nm='Receipt wall (repetition)')
    word_block(sh, ['FOR AN ENTIRE', 'SHIFT.'], 250, YEL, top=330)
    for g in range(7):
        gx = 300 + g * 190
        for i in range(4): marker(sh, marker_line(gx + i * 30, 860, gx + i * 30 + 4, 980, g * 9 + i, 5), MAG, 11, n='Tally')
        marker(sh, marker_line(gx - 16, 960, gx + 120, 878, g * 9 + 7, 4), MAG, 11, n='Tally')

def s05_question(s, sh):
    set_bg(s, '050307')
    text(sh, 120, 250, 1720, 700, [P(R('CAN A JOB BE IMPORTANT', D, 205, CREAM)), P(R('AND STILL BE POORLY DESIGNED?', D, 205, MAG))], n='Question')

def s06_asked(s, sh):
    set_bg(s, YEL); grain(sh)
    text(sh, 110, 170, 1800, 620, [P(R('WE ASKED', D, 330, INK)), P(R('THE CASHIERS.', D, 330, INK))], n='Headline')
    pic(sh, 'a04_sticker', 1250, 640, 660, nm='!!cashier A04')

def s07_25(s, sh):
    set_bg(s, YEL); grain(sh); act_tag(sh, 'II', 'Investigate', day=True)
    gx, gy, cw, chh = 830, 70, 212, 190
    jit = lambda i, k: ((i * 37 + k * 11) % 9) - 4
    for i in range(SAMPLE['n']):
        x = gx + (i % 5) * cw + jit(i, 1) * 3; y = gy + (i // 5) * chh + jit(i, 2) * 3
        cover(sh, f'm{i+1:02d}', x, y, 198, 146, rot=jit(i, 3) * 0.8, alpha=0.4, ln=(PAPER, 6), shadow=(6, 8, INK, 0.85), nm=f'Collage {i+1:02d}')
        text(sh, x - 6, y + 128, 62, 30, P(R(f'#{i+1:02d}', M, 22, YEL, b=True), al='c'), anchor='m', fill_hex=INK, shape=MSO_SHAPE.RECTANGLE, n='Collage tag', wrap=False)
    text(sh, 80, 115, 760, 640, P(R(str(SAMPLE['n']), D, 760, INK, sp=-0.03)), wrap=False, n='Sample size 25')
    label(sh, 100, 780, 'CHECKOUT CASHIERS', X, 66, INK)
    label(sh, 100, 862, SAMPLE['where'].upper(), L, 30, INK, sp=0.14)
    m = SAMPLE['method']
    m3 = 'NO NAMES · NO IDs · NO PHONE NUMBERS'
    sticker(sh, 900, 200, m[0].upper(), INK, CREAM, -3); sticker(sh, 930, 350, m[1].upper(), MAG, INK, 2)
    sticker(sh, 910, 500, m[2].upper(), PAPER, INK, -2); sticker(sh, 880, 650, m3, CREAM, INK, 1.5)
    sticker(sh, 950, 810, SAMPLE['limits'].upper(), BLUE, PAPER, -2.5)
    text(sh, 1360, 955, 520, 70, P(R('every one read aloud ', K, 58, INK), R('✓', CHK, 46, INK)), rot=-4, wrap=False, n='Marker note')

OBJ = {'SV': 'obj_sv', 'TI': 'obj_ti', 'TS': 'obj_ts', 'AU': 'obj_au', 'FB': 'obj_fb'}
XS = [250, 600, 960, 1320, 1670]
def hang(sh, top, size, prefix='!!obj'):
    for i, k in enumerate(DATA['JCM_ORDER']):
        x = XS[i]
        rect(sh, x - 2, top - 46, 4, 80, CREAM, alpha=0.75, n=f'{prefix}{k} hook')
        contain(sh, OBJ[k], x - size / 2, top, size, size, nm=f'{prefix}{k}')

def s08_five(s, sh):
    set_bg(s, night=True)
    pic(sh, 'a07_plum', 0, 0, 1920, 1080, nm='Photo A07 (bag rail, duotone)', locked=False)
    r = rect(sh, 0, 0, 1920, 1080, n='Shade'); grad(r, [(0, INK, 0.15), (0.45, INK, 0.55), (1, INK, 0.88)], angle=90)
    grain(sh); act_tag(sh, 'II', 'Investigate')
    label(sh, 110, 110, 'FIVE JOB CHARACTERISTICS', C, 104, CREAM, shd=(0, 8, '000000', 0.4))
    label(sh, 110, 222, 'Job Characteristics Model · Hackman & Oldham (1976)', M, 26, CREAM, a=0.85)
    hang(sh, 405, 270)
    for i, k in enumerate(DATA['JCM_ORDER']):
        nm_ = J[k]['name'].upper().split(' ', 1)
        text(sh, XS[i] - 175, 705, 350, 130, [P(R(f'0{i+1}', M, 28, YEL, b=True), al='c'), P(R(nm_[0], X, 34, CREAM), al='c', lh=38)] + ([P(R(nm_[1], X, 34, CREAM), al='c', lh=38)] if len(nm_) > 1 else []), n=f'Label {k}')

def s09_assume(s, sh):
    set_bg(s, '050307')
    cover(sh, 'a09', 0, 0, 1920, 1080, fy=0.6, nm='Photo A09 (stamp)')
    rect(sh, 0, 0, 1920, 1080, INK, alpha=0.25, n='Photo dim')
    rect(sh, 560, 250, 820, 420, 'B88A55', rot=-3, shadow=(10, 14, '000000', 0.5), n='Kraft note')
    text(sh, 600, 285, 760, 360, [P(R('THE EASY ASSUMPTION', M, 26, INK, b=True, sp=0.14)),
                                    P(R('repetitive ', K, 118, INK), R('→', SYM, 90, INK), before=24, lh=112),
                                    P(R('    job rotation!', K, 118, INK), lh=112)], rot=-3, n='Assumption (handwritten)')
    tape_strip(sh, 600, 228, 170, -12); tape_strip(sh, 1230, 240, 170, 9)
    marker(sh, marker_line(600, 520, 1340, 410, 3, 10), MAG, 16, n='Strike')
    stamp(sh, 600, 640, ['THEORY BEFORE PROBLEM'], 84, MAG, rot=-7)
    act_tag(sh, 'II', 'Investigate')

def s10_diagnose(s, sh):
    set_bg(s, night=True); grain(sh); act_tag(sh, 'II', 'Investigate')
    label(sh, 120, 170, 'DIAGNOSE FIRST.', D, 235, CREAM)
    label(sh, 1800, 600, 'REDESIGN SECOND.', D, 235, MAG, al='r')

def _meaning_base(sh):
    act_tag(sh, 'III', 'Reveal')
    frame(sh, 'a08', 100, 120, 800, 430, rot=-2.5)
    frame(sh, 'a06', 1010, 105, 800, 430, rot=2, fy=0.35)
    lower3(sh, 96, 96, [('MONEY · ACCURACY · THE CUSTOMER', 'k'), ('Task Significance', 'big')])
    lower3(sh, 1030, 80, [('START → FINISH', 'k'), ('Task Identity', 'big')])
    shd = (0, 12, '000000', 0.55)
    for x, k in [(130, 'TS'), (1050, 'TI')]:
        text(sh, x, 320, 700, 280, P(R(J[k]['label'], D, 300, CREAM, sh=shd), R(' / 5', X, 54, CREAM, a=0.85, sh=shd)), wrap=False, n=f'{J[k]["name"]} {J[k]["label"]}')
    rect(sh, 150, 640, 1620, 118, 'F7F1E3', shadow=(10, 14, '000000', 0.45), n='Transaction strip')
    steps = ['CUSTOMER ARRIVES', 'SCAN', 'PAYMENT', 'COMPLETE']
    for i, t in enumerate(steps):
        x0 = 150 + i * 405
        if i: rect(sh, x0, 650, 0.1, 98, n='Divider', ln=(INK, 4, 0.35, 'dash'))
        runs = [R(t, M, 36, INK, b=True)] + ([R('  ✓', CHK, 36, BLUE, b=True)] if i == 3 else [])
        text(sh, x0, 640, 405, 118, P(*runs, al='c'), anchor='m', n=f'Step {t.title()}')
        if i < 3: label(sh, x0 + 405, 676, '→', SYM, 34, INK, al='c')
    marker(sh, marker_circle(1580, 700, 200, 70, 9), MAG, 7, n='Marker ring')
    X_ = lambda v: 160 + (v - 1) * 400
    rect(sh, X_(1), 880, X_(5) - X_(1), 6, CREAM, alpha=0.85, n='Ruler')
    for v in range(1, 6):
        rect(sh, X_(v) - 3, 868, 6, 30, CREAM, n='Tick'); label(sh, X_(v), 905, str(v), M, 30, CREAM, al='c')
    label(sh, X_(1) - 10, 950, '1 = strongly disagree', M, 24, CREAM, a=0.7)
    label(sh, X_(5) + 10, 950, '5 = strongly agree', M, 24, CREAM, a=0.7, al='r')
    for k, top, side in [('TS', 790, 'r'), ('TI', 830, 'l')]:
        x = X_(J[k]['mean'])
        rect(sh, x - 4, top, 8, 880 - top, BLUE, n=f'Marker {k}'); oval(sh, x - 16, top - 14, 32, 32, BLUE, n=f'Marker dot {k}')
        label(sh, x + 30 if side == 'r' else x - 30, top - 26, f'{k} {J[k]["label"]}', M, 28, CREAM, b=True, al='l' if side == 'r' else 'r')

def s11_meaning(s, sh):
    set_bg(s, night=True); grain(sh); _meaning_base(sh)

def s12_notproblem(s, sh):
    set_bg(s, night=True); grain(sh); _meaning_base(sh)
    rect(sh, 0, 0, 1920, 1080, INK, alpha=0.86, n='Freeze overlay')
    text(sh, 0, 300, 1920, 480, [P(R('MEANING', D, 250, CREAM), al='c'), P(R("ISN'T THE PROBLEM.", D, 250, YEL), al='c')], n='Statement')

def _chip(sh, x, y, rot, seed, nm, v, morph):
    poly(sh, torn_pts(seed, x, y, 560, 350, 2.4), ORG, rot=rot, shadow=(12, 14, '000000', 0.5), n=f'Torn sticker {nm}')
    text(sh, x + 44, y + 44, 500, 300, [P(R(nm.upper(), X, 40, INK)), P(R(v, D, 270, INK), before=4)], rot=rot, n=f'{nm} {v}')

def walls_offslide(sh):
    rect(sh, -680, 0, 660, 1080, MAG, n='!!wallL'); rect(sh, 1940, 0, 660, 1080, MAG, n='!!wallR')

def s13_else(s, sh):
    set_bg(s, night=True)
    pic(sh, 'a03_night', 0, 0, 1920, 1080, alpha=0.55, nm='Photo A03 (lanes, night)')
    grain(sh); act_tag(sh, 'III', 'Reveal')
    label(sh, 150, 130, 'THE PROBLEM IS SOMEWHERE ELSE.', X, 60, CREAM)
    _chip(sh, 150, 270, -3, 21, J['FB']['name'], J['FB']['label'], 'fb')
    _chip(sh, 820, 470, 2.5, 22, J['AU']['name'], J['AU']['label'], 'au')
    walls_offslide(sh)

CASHIER = (315, 120, 1380)
def s14_squeeze(s, sh):
    set_bg(s, '120818')
    pic(sh, 'a04_cut', *CASHIER, nm='!!cashier A04')
    rect(sh, 0, 0, 660, 1080, MAG, n='!!wallL'); rect(sh, 1260, 0, 660, 1080, MAG, n='!!wallR')
    label(sh, 630, 560, J['SV']['label'], D, 440, INK, al='r', sp=-0.03, n='Skill Variety 2.55')
    label(sh, 620, 930, 'OUT OF 5', M, 28, INK, al='r', b=True)
    text(sh, 1304, 120, 560, 170, [P(R('SKILL', X, 72, INK)), P(R('VARIETY', X, 72, INK))], n='Dimension name')
    text(sh, 1308, 320, 560, 220, [P(R('lowest of', K, 96, INK)), P(R('all five', K, 96, INK))], rot=-5, n='Marker note')

def s15_diagnosis(s, sh):
    set_bg(s, '07040A'); grain(sh); act_tag(sh, 'III', 'Reveal')
    T0, U = 760, 235; X_ = lambda v: T0 + (v - 1) * U
    label(sh, 150, 110, 'THE FULL DIAGNOSIS', C, 96, CREAM)
    label(sh, 154, 215, f"MEAN SCORE PER JOB CHARACTERISTIC · n = {SAMPLE['n']} · SCALE 1–5", L, 26, CREAM, a=0.75, sp=0.14)
    rect(sh, X_(3) - 2, 270, 0.1, 620, n='Midpoint', ln=(CREAM, 4, 0.5, 'dash'))
    col = {'strong': BLUE, 'moderate': ORG, 'weak': ORG, 'lowest': MAG}
    for i, k in enumerate(DATA['JCM_RANKED']):
        d = J[k]; y = 290 + i * 118; c = col[d['tier']]
        label(sh, 150, y + 30, d['name'].upper(), X, 40, MAG if d['tier'] == 'lowest' else CREAM)
        rect(sh, T0, y + 48, 4 * U, 4, CREAM, alpha=0.22, n='Track')
        a, b = sorted([X_(3), X_(d['mean'])]); rect(sh, a, y + 43, b - a, 14, c, n=f'Bar {k}')
        oval(sh, X_(d['mean']) - 26, y + 24, 52, 52, c, ln=('07040A', 5), n=f'Dot {k}')
        if d['mean'] < 3: label(sh, X_(d['mean']) - 42, y + 14, d['label'], D, 64, CREAM, al='r', n=f'{d["name"]} {d["label"]}')
        else: label(sh, X_(d['mean']) + 42, y + 14, d['label'], D, 64, CREAM, n=f'{d["name"]} {d["label"]}')
    for v in range(1, 6): label(sh, X_(v), 900, str(v), M, 30, CREAM, al='c')
    label(sh, X_(3), 945, 'scale midpoint', M, 24, CREAM, a=0.7, al='c')
    label(sh, X_(1) - 40, 945, 'strongly disagree', M, 24, CREAM, a=0.7)
    label(sh, X_(5) + 40, 945, 'strongly agree', M, 24, CREAM, a=0.7, al='r')
