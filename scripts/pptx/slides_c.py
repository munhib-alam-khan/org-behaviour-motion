"""Slides 30–42 (HTML scenes 18–23 + appendix)."""
from slides_b import *

PILOT = DATA['PILOT']

def s30_feedback(s, sh):
    set_bg(s, night=True); grain(sh); act_tag(sh, 'VI', 'Redesign'); proposed_tape(sh)
    header(sh, '04', 'Structured feedback', J['FB']['name'])
    pic(sh, 'torn_a18', 100, 300, 820, 520, rot=-2, shadow=(10, 14, '000000', 0.45), nm='Photo A18 (card terminal ✓)')
    lower3(sh, 90, 280, [('OPERATIONAL FEEDBACK', ORG)])
    text(sh, 470, 770, 520, 120, P(R('did it work? ', K, 96, YEL), R('✓', CHK, 70, YEL)), rot=-5, wrap=False, n='Marker note')
    pic(sh, 'torn_a10', 1010, 290, 820, 540, rot=2, shadow=(10, 14, '000000', 0.45), nm='Photo A10 (conversation)')
    lower3(sh, 1000, 270, [('DEVELOPMENTAL FEEDBACK', 'y')])
    text(sh, 1250, 780, 600, 120, P(R('am I growing? ', K, 96, YEL), R('↑', SYM, 70, YEL)), rot=4, wrap=False, n='Marker note')

def s31_feedback2(s, sh):
    set_bg(s, night=True); grain(sh); act_tag(sh, 'VI', 'Redesign'); proposed_tape(sh)
    header(sh, '04', 'Structured feedback', J['FB']['name'])
    text(sh, 110, 290, 1700, 300, [P(R('OPERATIONAL FEEDBACK TELLS YOU', D, 73, CREAM)), P(R('WHETHER THE TRANSACTION WORKED.', D, 73, CREAM)),
                                   P(R('DEVELOPMENTAL FEEDBACK TELLS YOU', D, 73, YEL), before=27), P(R('WHETHER YOU ARE GROWING.', D, 73, YEL))], n='Statement')
    cols = [CREAM, YEL, ORG, BLUE, MAG]; w = (1700 - 64) / 5
    for i, t in enumerate(RD['feedbackTopics']):
        tb = text(sh, 110 + i * (w + 16), 790, w, 120, P(R(t.upper(), X, 30, INK), al='c', lh=32), anchor='m', shape=MSO_SHAPE.ROUND_2_SAME_RECTANGLE, fill_hex=cols[i], rot=[-1, 1, -0.5, 1.2, -1][i], shadow=(6, 8, '000000', 0.5), n=f'Topic: {t}')
        tb.adjustments[0] = 0.15
    label(sh, 110, 940, 'Short · regular · supervisor-led conversations', M, 28, CREAM)

def s32_hypothesis(s, sh):
    set_bg(s, PAUSE)
    label(sh, 150, 220, 'EVERYTHING WE HAVE PROPOSED SO FAR IS', X, 58, '333333')
    label(sh, 140, 310, 'A HYPOTHESIS.', D, 300, '111111')
    label(sh, 140, 640, 'TEST IT.', D, 300, '111111')

# ── projective mapping onto the photographed clipboard paper (A20) ──
QUAD = [(370, 243), (1022, 106), (1424, 804), (687, 1017)]; PW, PH = 640, 860
def _H():
    (x0, y0), (x1, y1), (x2, y2), (x3, y3) = QUAD
    dx1, dx2, dy1, dy2 = x1 - x2, x3 - x2, y1 - y2, y3 - y2
    sx, sy = x0 - x1 + x2 - x3, y0 - y1 + y2 - y3; den = dx1 * dy2 - dx2 * dy1
    g = (sx * dy2 - dx2 * sy) / den; h = (dx1 * sy - sx * dy1) / den
    a, b, d, e = x1 - x0 + g * x1, x3 - x0 + h * x3, y1 - y0 + g * y1, y3 - y0 + h * y3
    def f(u, v):
        u, v = u / PW, v / PH; z = g * u + h * v + 1
        return ((a * u + b * v + x0) / z, (d * u + e * v + y0) / z)
    return f
HMAP = _H()

def on_paper(sh, u, v, w, h, paras, n):
    """Place a text box whose paper-space box is (u,v,w,h): centre mapped, rotated and scaled to the local paper frame."""
    cu, cv = u + w / 2, v + h / 2
    cx, cy = HMAP(cu, cv); ex, ey = HMAP(cu + 10, cv); fx, fy = HMAP(cu, cv + 10)
    ang = math.degrees(math.atan2(ey - cy, ex - cx)); k = math.hypot(ex - cx, ey - cy) / 10; kv = math.hypot(fx - cx, fy - cy) / 10
    scaled = []
    for p_ in paras:
        q = copy.deepcopy(p_)
        for r_ in q['runs']: r_['s'] *= k
        if q['lh']: q['lh'] *= k
        q['before'] *= kv
        scaled.append(q)
    W_, H_ = w * k, h * kv
    return text(sh, cx - W_ / 2, cy - H_ / 2, W_, H_, scaled, rot=ang, n=n, wrap=True)

def s33_pilot(s, sh):
    set_bg(s, INK)
    pic(sh, 'a20', 0, 0, 1920, 1080, nm='Photo A20 (clipboard)')
    r = rect(sh, 0, 0, 1920, 1080, n='Vignette'); grad(r, [(0, INK, 0.0), (0.4, INK, 0.0), (1, INK, 0.6)], path='circle', rect=(50, 50, 50, 50))
    grain(sh); act_tag(sh, 'VII', 'Test')
    on_paper(sh, 70, 140, 520, 34, [P(R('PROPOSED PILOT · PLAN', M, 22, INK, b=True, sp=0.16))], 'Paper: header')
    u = 70
    for num, lab in [(str(PILOT['weeks']), 'WEEKS'), (str(PILOT['branches']), 'KARACHI BRANCH'), (PILOT['cashiers'], 'CASHIERS')]:
        bw = max(width(num, D, 96), max(width(w_, X, 20) for w_ in lab.split())) * 1.08 + 8
        on_paper(sh, u, 188, bw, 150, [P(R(num, D, 96, INK)), P(R(lab, X, 20, INK), lh=22)], f'Paper: {num} {lab.lower()}')
        u += bw + 24
    rows = [('W0', 'BASELINE', 'Same JCM, motivation & satisfaction survey + operational indicators', '3D6BFF'),
            ('W1–6', 'INTERVENTION', 'The four proposed changes', 'C98A00'),
            ('W3', 'MIDPOINT CHECK', 'Catch operational problems early', 'FF7A1A'),
            ('W6', 'POST-MEASUREMENT', 'Same measures again', '3D6BFF')]
    v = 362
    for wk, t, subt, c in rows:
        on_paper(sh, 70, v, 92, 40, [P(R(wk, M, 30, c, b=True))], f'Paper: {wk}')
        lines = max(1, math.ceil(width(subt, M, 21) / 395))
        on_paper(sh, 176, v + 4, 410, 34 + lines * 27, [P(R(t, X, 26, INK)), P(R(subt, M, 21, INK), before=6, lh=26)], f'Paper: {t.title()}')
        if wk == 'W3':
            pts = [HMAP(u_, v_) for u_, v_ in marker_circle(70 + 40, v + 18, 62, 32, 12)]
            marker(sh, pts, MAG, 6, n='Marker ring (W3)')
        v += 52 + lines * 27 + 20
    poly(sh, [HMAP(70, 346), HMAP(586, 346)], stroke=(INK, 3), closed=False, n='Paper rule')
    stamp(sh, 1080, 100, ['PROPOSED · NOT YET CONDUCTED'], 46, MAG, rot=6, bg=INK, bg_alpha=0.35)
    text(sh, 1460, 290, 460, 220, [P(R('a plan,', K, 84, YEL)), P(R('not a result', K, 84, YEL))], rot=-6, n='Marker note')

def _balance(sh, tilt=0, dim=1.0, ly=0, ry=0):
    rect(sh, 210, 762, 1500, 18, CREAM, alpha=dim, rot=tilt, n='!!beam', shape=MSO_SHAPE.ROUNDED_RECTANGLE, radius=9)
    poly(sh, [(880, 930), (960, 780), (1040, 930)], YEL, alpha=dim, n='Fulcrum')
    for side, x, col, title, items, mark, yoff in [('left', 200, BLUE, 'EMPLOYEE EXPERIENCE', PILOT['employeeMeasures'], 'expected ↑', ly),
                                                    ('right', 1040, MAG, 'OPERATIONAL SAFETY', PILOT['safeguards'], 'no worse', ry)]:
        g = sh.add_group_shape(); g.name = f'!!{side}'; gs = g.shapes
        if side == 'left': pic(gs, 'a04_sticker', 240, 120 + yoff, 470, alpha=dim, nm='Cashier A04')
        else: pic(gs, 'torn_a08', 1130, 110 + yoff, 500, 300, rot=3, alpha=dim, nm='Till (A08, torn)')
        rect(gs, x, 400 + yoff, 680, 350, 'F7F1E3', alpha=dim, shadow=(10, 14, '000000', 0.45 * dim), n='Card')
        rect(gs, x, 400 + yoff, 680, 22, col, alpha=dim, n='Card top')
        mx_ = '3A2A44' if dim < 1 else None
        text(gs, x + 34, 428 + yoff, 620, 62, P(R(title, C, 54, INK, a=dim, mix=mx_)), wrap=False, n=f'{title.title()} title')
        paras = [P(R(it, M, 27, INK, a=dim, b=True, mix=mx_), before=10 if j else 0) for j, it in enumerate(items)]
        text(gs, x + 34, 500 + yoff, 420, 250, paras, n=f'{title.title()} list')
        mk_ = [P(R(mark.replace(' ↑', ''), M, 27, col, a=dim, b=True, mix=mx_), R(' ↑', SYM, 27, col, a=dim, mix=mx_) if '↑' in mark else R('', M, 27, col), al='r', before=10) for _ in items]
        mk_[0]['before'] = 0
        text(gs, x + 440, 500 + yoff, 210, 250, mk_, n=f'{title.title()} direction')

def s34_both(s, sh):
    set_bg(s, night=True); grain(sh); act_tag(sh, 'VII', 'Test'); _balance(sh)

def s35_fail(s, sh):
    set_bg(s, night=True); grain(sh); act_tag(sh, 'VII', 'Test'); _balance(sh, tilt=7, ly=-92, ry=92)
    text(sh, 0, 950, 1920, 50, P(R('HYPOTHETICAL: satisfaction ', M, 28, YEL, b=True), R('↑', SYM, 28, YEL), R(' while cash discrepancies ', M, 28, YEL, b=True), R('↑', SYM, 28, YEL), al='c'), n='Hypothetical caption')
    stamp(sh, 0, 470, ['NOT A SUCCESS'], 120, MAG, bg=INK, bg_alpha=0.75, center_x=960)

def s36_decide(s, sh):
    set_bg(s, night=True); grain(sh); act_tag(sh, 'VII', 'Test'); _balance(sh, dim=0.3)
    ws = [width(d.upper(), C, 110, 0.02) + 80 for d in PILOT['decisions']]; x = (1920 - sum(ws) - 120) / 2
    for d, w, c, r in zip(PILOT['decisions'], ws, [BLUE, YEL, MAG], [-3, 1, 3]):
        stamp(sh, x, 420, [d.upper()], 110, c, rot=r, bg=INK, bg_alpha=0.85, n=f'Decision: {d}'); x += w + 60

def _routine_base(sh):
    pic(sh, 'a01', 0, 0, 1920, 1080, nm='Photo A01 (scanner hands)')
    r = rect(sh, 0, 0, 1920, 1080, n='Shade left'); grad(r, [(0, INK, 0.92), (0.45, INK, 0.75), (1, INK, 0.25)], angle=0)
    r = rect(sh, 0, 0, 1920, 1080, n='Shade bottom'); grad(r, [(0, INK, 0.0), (0.35, INK, 0.0), (0.65, INK, 0.6), (1, INK, 0.95)], angle=90)
    grain(sh); act_tag(sh, 'VIII', 'Conclude')
    label(sh, 110, 670, 'ALREADY THERE', L, 30, '7FA0FF', sp=0.14)
    for i, k in enumerate(['TS', 'TI']):
        y = 720 + i * 66
        text(sh, 110, y, 760, 60, P(R('✓  ', CHK, 44, '7FA0FF'), R(J[k]['name'].upper(), X, 42, CREAM), R('  ' + J[k]['label'], M, 32, CREAM, b=True)), wrap=False, n=f'Already there: {J[k]["name"]}')
    label(sh, 1000, 670, 'WHAT APPEARS TO BE MISSING', L, 30, ORG, sp=0.14)
    for i, t in enumerate(['Variety', 'Appropriate discretion', 'Developmental feedback']):
        y = 720 + i * 66
        rect(sh, 1000, y + 8, 58, 40, None, ln=(ORG, 5, 1.0, 'dash'), n='Empty tag', shape=MSO_SHAPE.ROUNDED_RECTANGLE, radius=10)
        label(sh, 1080, y, t.upper(), X, 42, CREAM, n=f'Missing: {t}')

def s37_routine(s, sh):
    set_bg(s, INK); _routine_base(sh)
    text(sh, 110, 120, 1700, 460, [P(R('ROUTINE', D, 250, CREAM, sh=(0, 12, '000000', 0.4))), P(R('≠ ', SYM, 200, MAG), R('MEANINGLESS', D, 250, CREAM, sh=(0, 12, '000000', 0.4)))], n='Statement')

def s38_environment(s, sh):
    set_bg(s, INK); _routine_base(sh)
    text(sh, 110, 150, 1700, 460, P(R('REDESIGN THE ENVIRONMENT ', D, 150, CREAM, sh=(0, 10, '000000', 0.45)), R('AROUND', D, 150, YEL, sh=(0, 10, '000000', 0.45)), R(' THE CASHIER — NOT THE CASHIER.', D, 150, CREAM, sh=(0, 10, '000000', 0.45))), n='Statement')

LANE_ENDS = [(470, 340), (1450, 340), (470, 830), (1450, 830)]; LANE_LAB = [(110, 260), (1470, 260), (110, 760), (1470, 760)]
def _finale(sh, opened):
    if opened: pic(sh, 'a03', 0, 0, 1920, 1080, nm='!!store A03')
    else: pic(sh, 'a03', -144, -81, 2208, 1242, nm='!!store A03')
    rect(sh, 0, 0, 1920, 1080, '000000', alpha=0.4, n='Photo dim')
    if opened:
        cols = [MAG, ORG, VIO, BLUE]
        for i, (x, y) in enumerate(LANE_ENDS):
            marker(sh, marker_line(960, 640, x, y, i + 21, 14), cols[i], 30, alpha=0.92, n=f'Lane {i+1}')
        for i, ((x, y), c) in enumerate(zip(LANE_LAB, RD['components'])):
            text(sh, x, y, 360, 150, [P(R(c['n'], D, 72, cols[i])), P(R(c['name'].upper(), X, 26, CREAM), lh=28)], fill_hex=INK, fill_alpha=0.8, shape=MSO_SHAPE.RECTANGLE, rot=[-2, 2, 1.5, -1.5][i], n=f'Lane label {c["n"]}', inset=(18, 14, 18, 14))
    pic(sh, 'a04_sticker', 640, 470, 640, nm='!!cashier A04')
    if opened:
        hazard_barrier(sh, -700, 660, 'l', PLUM, nm='L'); hazard_barrier(sh, 1960, 660, 'r', PLUM, nm='R')
    else:
        hazard_barrier(sh, 0, 660, 'l', PLUM, nm='L'); hazard_barrier(sh, 1260, 660, 'r', PLUM, nm='R')

def s39_performs(s, sh):
    set_bg(s, INK); _finale(sh, False)
    text(sh, 0, 110, 1920, 150, P(R('A JOB SOMEONE ', D, 130, CREAM, sh=(0, 10, '000000', 0.5)), R('PERFORMS…', D, 130, CREAM, sh=(0, 10, '000000', 0.5)), al='c'), n='!!phrase')

def s40_owns(s, sh):
    set_bg(s, INK); _finale(sh, True)
    text(sh, 0, 110, 1920, 150, P(R('A JOB SOMEONE ', D, 130, CREAM, sh=(0, 10, '000000', 0.5)), R('OWNS.', D, 130, YEL, sh=(0, 10, '000000', 0.5)), al='c'), n='!!phrase')

def s41_end(s, sh):
    set_bg(s, '07040A'); grain(sh)
    text(sh, 0, 190, 1920, 200, P(R('NOT A DIFFERENT JOB.', D, 200, CREAM), al='c'), n='Final line 1')
    text(sh, 0, 380, 1920, 200, P(R('A BETTER-DESIGNED ONE.', D, 200, YEL), al='c'), n='Final line 2')
    iw, ih = img_size('receipt_strip'); w = 330; full = w * ih / iw; vis = 330
    pic(sh, 'receipt_strip', 795, 660, w, vis, crop=(0, 1 - vis / full, 0, 0), shadow=(0, 12, '000000', 0.4), nm='Receipt paper')
    text(sh, 815, 680, 290, 290, [P(R('Thank you.', M, 46, INK, b=True), al='c'), P(R('— — — — — — — —', M, 18, INK, a=0.6), al='c', before=4)] +
         [P(R(n_, M, 21, INK, b=True), al='c', lh=30) for n_ in S['team']], n='Thank you')
    text(sh, 110, 900, 640, 140, [P(R(f"{S['institution']}", M, 20, CREAM, a=0.6)), P(R(f"{S['course']} · {S['term']} · {S['instructor']}", M, 20, CREAM, a=0.6)),
                                  P(R('Reference: Hackman & Oldham (1976), Organizational Behavior and Human Performance, 16(2), 250–279.', M, 20, CREAM, a=0.6), before=6)], n='References')
    text(sh, 1180, 940, 640, 100, [P(R('Photography: AI-generated & illustrative.', M, 20, CREAM, a=0.6), al='r'), P(R('No real employees or respondents · not affiliated with Imtiaz.', M, 20, CREAM, a=0.6), al='r')], n='Imagery disclosure')

CORRS = [  # exploratory Pearson r, n = 25 (raw workbook; verified at build for SV–JS)
    ('Skill Variety', 0.312, 0.539), ('Task Identity', 0.439, -0.048), ('Task Significance', 0.330, 0.203),
    ('Autonomy', 0.161, -0.006), ('Feedback', 0.354, 0.364)]
def s42_appendix(s, sh):
    set_bg(s, night=True); grain(sh)
    label(sh, 110, 70, 'APPENDIX · BACKUP FOR Q&A', M, 24, MAG, b=True, sp=0.12)
    label(sh, 110, 110, 'EXPLORATORY CORRELATIONS', C, 96, CREAM)
    label(sh, 112, 215, 'n = 25 · Pearson r · no significance testing', M, 30, YEL, b=True)
    rows, cols = 6, 3
    gf = sh.add_table(rows, cols, E(110), E(300), E(1300), E(600)); gf.name = 'Correlation table'; t = gf.table
    t.columns[0].width = E(560); t.columns[1].width = E(370); t.columns[2].width = E(370)
    hdr = ['Job characteristic', 'Internal Work Motivation', 'Job Satisfaction']
    def cell(r_, c_, txt, f, sz, col, bg, b=False, al='l'):
        ce = t.cell(r_, c_); ce.fill.solid(); ce.fill.fore_color.rgb = RGBColor.from_string(bg)
        ce.margin_left = ce.margin_right = E(24); ce.vertical_anchor = MSO_ANCHOR.MIDDLE
        tf = ce.text_frame; tf.text = ''; p = tf.paragraphs[0]; p.alignment = {'l': PP_ALIGN.LEFT, 'r': PP_ALIGN.RIGHT, 'c': PP_ALIGN.CENTER}[al]
        r = p.add_run(); r.text = txt; r.font.name = f; r.font.size = Pt(sz / 2); r.font.bold = b; r.font.color.rgb = RGBColor.from_string(col)
    for c_, h in enumerate(hdr): cell(0, c_, h.upper(), L, 24, INK, YEL, al='l' if c_ == 0 else 'c')
    for i, (nm_, iwm, js) in enumerate(CORRS, 1):
        bg = 'F7F1E3' if i % 2 else 'EDE3D0'
        cell(i, 0, nm_.upper(), X, 30, INK, bg)
        cell(i, 1, f'{iwm:+.3f}', M, 34, INK, bg, b=True, al='c')
        hi = nm_ == 'Skill Variety'
        cell(i, 2, f'{js:+.3f}', M, 34, CREAM if hi else INK, MAG if hi else bg, b=True, al='c')
    for r_ in range(rows): t.rows[r_].height = E(100)
    text(sh, 1460, 300, 380, 600, [P(R('READ AS ASSOCIATIONS ONLY', L, 24, YEL, sp=0.1)),
        P(R('Cross-sectional, self-reported, small sample. No p-values were computed, so no coefficient is described as statistically significant. None of these values shows causation.', M, 24, CREAM), before=14, lh=34),
        P(R('Highlighted: Skill Variety ', M, 24, CREAM), R('↔', SYM, 24, CREAM), R(' Job Satisfaction, r = +0.539, presented in the deck as r ≈ .54.', M, 24, CREAM), before=18, lh=34)], n='Reading note')
