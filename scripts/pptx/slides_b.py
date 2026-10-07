"""Slides 16–29 (HTML scenes 9–17)."""
from slides_a import *

PREF = DATA['PREFERENCES']; OUT = DATA['OUTCOMES']; CORR = DATA['CORRELATION']; MR = DATA['MULTI_RESPONSE']; RD = DATA['REDESIGN']

def _narrow_base(sh):
    pic(sh, 'a03_blur', 0, 0, 1920, 1080, alpha=0.75, nm='Photo A03 (store, blurred)')
    rect(sh, 0, 0, 1920, 1080, INK, alpha=0.35, n='Photo dim')
    grain(sh)
    pic(sh, 'a04_cut', *CASHIER, nm='!!cashier A04')

def s16_meaningful(s, sh):
    set_bg(s, night=True); _narrow_base(sh)
    text(sh, 0, 470, 1920, 300, P(R('MEANINGFUL.', D, 330, CREAM, sh=(0, 14, '000000', 0.55)), al='c'), n='!!meaningful')
    hazard_barrier(sh, -700, 660, 'l', nm='L'); hazard_barrier(sh, 1960, 660, 'r', nm='R')

def s17_narrow(s, sh):
    set_bg(s, night=True); _narrow_base(sh)
    hazard_barrier(sh, 0, 660, 'l', nm='L'); hazard_barrier(sh, 1260, 660, 'r', nm='R')
    text(sh, 0, 62, 1920, 110, P(R('MEANINGFUL.', D, 112, CREAM, sh=(0, 6, '000000', 0.55)), al='c'), n='!!meaningful')
    text(sh, 0, 760, 1920, 220, P(R('BUT NARROW.', D, 230, MAG, sh=(0, 10, '000000', 0.6)), al='c'), n='But narrow')

def _tag(sh, src, x, w, dark=None, body_t=0.42, rot=0, lines=(), crop_top=0, n='Tag'):
    iw, ih = img_size(src); h = w * ih / iw
    vis = h * (1 - crop_top)
    src2 = {'dark': 'tag2_dark', 'gray': 'tag2_gray'}.get(dark, src)
    pic(sh, src2, x, 0, w, vis, crop=(0, crop_top, 0, 0), nm=f'{n} (paper tag)', shadow=(10, 14, '000000', 0.28))
    ty = h * body_t - h * crop_top
    text(sh, x - 20, ty, w + 40, 360, lines, rot=rot, n=n)

def s18_value(s, sh):
    set_bg(s, CREAM); grain(sh); act_tag(sh, 'IV', 'Go deeper', day=True)
    v = lambda val, lab, subt, size, col=INK: [P(R(val, D, size, col), al='c'), P(R(lab.upper(), X, 30 if size > 120 else 22, col), al='c', before=8)] + \
        ([P(R(subt, M, 24, col), al='c', before=8, lh=30)] if subt else [])
    _tag(sh, 'tag4', 70, 380, body_t=0.42, rot=-3, crop_top=0.05, lines=v(PREF['authority']['label'], 'Authority', 'routine issues,\vclear guidelines', 170), n='Authority 4.32')
    _tag(sh, 'tag1', 480, 360, body_t=0.44, rot=-5, crop_top=0.09, lines=v(PREF['ownership']['label'], 'Ownership', 'more responsibility', 150), n='Ownership 4.16')
    _tag(sh, 'tag3', 880, 420, body_t=0.40, rot=0, crop_top=0.0, lines=v(PREF['feedback']['label'], 'Feedback', 'more regular', 140), n='Feedback 4.04')
    # tag body offsets reproduce the HTML (tops -40/-70/+20) by cropping the string instead of hanging off-slide
    _tag(sh, 'tag2', 1320, 360, dark='dark', body_t=0.47, rot=7, lines=v(OUT['JS']['label'], 'Job\vsatisfaction', '', 112, CREAM), n='Job satisfaction 2.84')
    _tag(sh, 'tag2', 1640, 200, dark='gray', body_t=0.46, rot=7, crop_top=0.05, lines=[P(R(PREF['rotation']['label'], D, 70, INK), al='c'), P(R('ROTATION', X, 16, INK), al='c', before=4)], n='Rotation 3.28')
    label(sh, 110, 880, 'WHAT WOULD CASHIERS VALUE?', C, 72, INK)
    label(sh, 110, 955, f"Mean agreement · 1–5 · n = {DATA['SAMPLE']['n']}", M, 26, INK)
    for x, y, w, rot, t in [(1180, 925, 340, -3, 'unlimited freedom'), (1530, 990, 330, 2, 'random movement')]:
        tape_strip(sh, x, y, w, rot)
        label(sh, x + 22, y - 6, t, K, 46, INK, rot=rot)
        rect(sh, x - 10, y + 20, w + 20, 9, MAG, rot=rot, n='Strike')

def scatter(sh, x, y, w, h, mini=False, nm='Scatter: Skill Variety × Job Satisfaction'):
    sums = DATA['SV_JS_ITEM_SUMS']; k = DATA['ITEMS_PER_CONSTRUCT']
    pts = [(a / k, b / k) for a, b in sums]
    mx = sum(p[0] for p in pts) / len(pts); my = sum(p[1] for p in pts) / len(pts)
    sxy = sum((p[0] - mx) * (p[1] - my) for p in pts); sxx = sum((p[0] - mx) ** 2 for p in pts)
    b = sxy / sxx; a = my - b * mx; x0 = min(p[0] for p in pts); x1 = max(p[0] for p in pts)
    from collections import Counter
    dup = [p for p, c in Counter(pts).items() if c > 1]
    cd = XyChartData()
    s1 = cd.add_series(f'Cashiers (n = {len(pts)})'); [s1.add_data_point(round(p[0], 4), round(p[1], 4)) for p in pts]
    s2 = cd.add_series('Least-squares line'); s2.add_data_point(round(x0, 4), round(a + b * x0, 4)); s2.add_data_point(round(x1, 4), round(a + b * x1, 4))
    if not mini:
        s3 = cd.add_series('Two cashiers, identical scores'); [s3.add_data_point(round(p[0], 4), round(p[1], 4)) for p in dup]
    gf = sh.add_chart(XL_CHART_TYPE.XY_SCATTER, E(x), E(y), E(w), E(h), cd); gf.name = nm
    ch = gf.chart; ch.has_legend = False; ch.font.name = M; ch.font.size = Pt(12 if mini else 14); ch.font.color.rgb = RGBColor.from_string(INK)
    for ax, ttl in [(ch.category_axis, f"{CORR['x'].upper()} (score 1–5)"), (ch.value_axis, f"{CORR['y'].upper()} (score 1–5)")]:
        ax.minimum_scale, ax.maximum_scale, ax.major_unit = 1, 5, 1
        ax.has_major_gridlines = False; ax.has_minor_gridlines = False
        ax.format.line.color.rgb = RGBColor.from_string(INK); ax.format.line.width = Pt(2.5 if not mini else 1.5)
        ax.major_tick_mark = XL_TICK_MARK.OUTSIDE
        ax.tick_labels.number_format = '0'; ax.tick_labels.number_format_is_linked = False
        if mini: ax.tick_labels.font.size = Pt(1); ax.visible = True
        if not mini:
            ax.has_title = True; tf = ax.axis_title.text_frame; tf.text = ttl
            f = tf.paragraphs[0].runs[0].font; f.name = L; f.size = Pt(13); f.color.rgb = RGBColor.from_string(INK); f.bold = False
    pl = ch.plots[0]
    sA = pl.series[0]; sA.format.line.fill.background(); sA.marker.style = XL_MARKER_STYLE.CIRCLE; sA.marker.size = 9 if mini else 16
    sA.marker.format.fill.solid(); sA.marker.format.fill.fore_color.rgb = RGBColor.from_string(ORG)
    sA.marker.format.line.color.rgb = RGBColor.from_string('FFFFFF'); sA.marker.format.line.width = Pt(1.5 if mini else 2.5)
    sB = pl.series[1]; sB.marker.style = XL_MARKER_STYLE.NONE; sB.format.line.color.rgb = RGBColor.from_string(RED); sB.format.line.width = Pt(4 if mini else 5.5); sB.smooth = False
    if not mini:
        sC = pl.series[2]; sC.format.line.fill.background(); sC.marker.style = XL_MARKER_STYLE.CIRCLE; sC.marker.size = 30
        sC.marker.format.fill.background(); sC.marker.format.line.color.rgb = RGBColor.from_string(INK); sC.marker.format.line.width = Pt(2); sC.marker.format.line.dash_style = 4
        for i in range(len(dup)):
            dl = sC.points[i].data_label; dl.has_text_frame = True; dl.text_frame.text = '×2'; dl.position = XL_LABEL_POSITION.ABOVE
            rr = dl.text_frame.paragraphs[0].runs[0].font; rr.name = K; rr.size = Pt(20); rr.color.rgb = RGBColor.from_string(INK)
    cs = ch._chartSpace
    for parent in (cs, cs.find(qn('c:chart')).find(qn('c:plotArea'))):
        sp = parent.find(qn('c:spPr'))
        if sp is None:
            sp = etree.SubElement(parent, qn('c:spPr'))
            if parent is cs: cs.remove(sp); cs.find(qn('c:chart')).addnext(sp)
        for c_ in list(sp): sp.remove(c_)
        sub(sp, 'a:noFill'); sub(sub(sp, 'a:ln'), 'a:noFill')
    return gf, b, a

def s19_assoc(s, sh):
    set_bg(s, night=True); grain(sh)
    pic(sh, 'graph_paper', 110, 70, 1060, 950, rot=-1, shadow=(14, 18, '000000', 0.5), nm='Graph paper')
    scatter(sh, 150, 95, 990, 845)
    label(sh, 200, 952, 'Each point = one cashier · dashed ring = two cashiers with identical scores', M, 22, INK, a=0.8)
    tape_strip(sh, 70, 60, 190, -30); tape_strip(sh, 1040, 70, 190, 28); tape_strip(sh, 90, 975, 170, 24)
    text(sh, 1230, 150, 680, 260, P(R('r ', D, 250, CREAM), R('≈', SYM, 150, CREAM), R(' .54', D, 250, CREAM)), wrap=False, n='Correlation r ≈ .54')
    label(sh, 1235, 400, CORR['caveat'], M, 25, CREAM)
    text(sh, 1235, 440, 680, 40, P(R('Skill Variety ', M, 26, CREAM, a=0.75), R('↔', SYM, 26, CREAM, a=0.75), R(' Job Satisfaction', M, 26, CREAM, a=0.75)), wrap=False, n='Variables')
    stamp(sh, 1215, 600, ['ASSOCIATION', '≠ CAUSATION'], 80, MAG, rot=-6, lh=1.04)
    act_tag(sh, 'IV', 'Go deeper')

def polaroid(sh, cx, cy, rot, scale, kind, nm):
    """Evidence-wall polaroid as a rotated group; built at `scale` so text stays proportional for Morph."""
    g = sh.add_group_shape(); g.name = nm; gs = g.shapes
    k = scale; W, H = 500 * k, 560 * k; x0, y0 = cx - W / 2, cy - H / 2
    rect(gs, x0, y0, W, H, PAPER, shadow=(14 * k, 18 * k, '000000', 0.55), n='Polaroid paper')
    px, py, pw, ph = x0 + 22 * k, y0 + 22 * k, 456 * k, 360 * k
    if kind == 'a':
        rect(gs, px, py, pw, ph, MAG, n='Squeeze background')
        iw, ih = img_size('a04_cut'); sw = 640 * k; shh = sw * ih / iw
        vis_h = ph - 10 * k
        pic(gs, 'a04_cut', px, py + 10 * k, pw, vis_h, crop=(120 / 640, 0, 0.1, max(0, 1 - vis_h / shh)), nm='A04 (squeeze crop)')
        rect(gs, px, py, 110 * k, ph, MAG, n='Wall'); rect(gs, px + pw - 110 * k, py, 110 * k, ph, MAG, n='Wall')
        text(gs, px, py + ph + 14 * k, pw, 160 * k, [P(R('LOWEST JCM SCORE', L, 22 * k, INK, sp=0.14)),
             P(R(J['SV']['label'], D, 110 * k, INK), R('  SKILL VARIETY', X, 26 * k, INK), lh=100 * k)], n='Caption')
    elif kind == 'b':
        rect(gs, px, py, pw, ph, 'CDBFA8', n='Tag background')
        iw, ih = img_size('tag4'); th = 180 * k * ih / iw
        pic(gs, 'tag4', px + 40 * k, py, 180 * k, ph, crop=(0, 150 * k / th, 0, max(0, 1 - (150 * k + ph) / th)), nm='Paper tag')
        text(gs, px + 230 * k, py + 40 * k, 220 * k, 300 * k, [P(R(t, K, 34 * k, INK), lh=38 * k) for t in ['most-selected:', 'learn new skills', '& ownership', f"({MR['learnSkills']['count']} of {MR['of']} each)*"]], n='Marker note')
        text(gs, px, py + ph + 14 * k, pw, 160 * k, [P(R('WHAT CASHIERS VALUE', L, 22 * k, INK, sp=0.14)),
             P(R(PREF['authority']['label'], D, 64 * k, INK), R(' AUTHORITY ', X, 15 * k, INK), R(' ' + PREF['ownership']['label'], D, 52 * k, INK), R(' OWNERSHIP', X, 15 * k, INK), lh=66 * k),
             P(R('*' + MR['caveat'].lower(), M, 17 * k, INK, a=0.7))], n='Caption')
    else:
        pic(gs, 'graph_paper', px, py, pw, ph, crop=(0, 0, 0.57, 0.62), nm='Graph paper')
        mini_scatter(gs, px, py, pw, ph, k)
        text(gs, px, py + ph + 14 * k, pw, 160 * k, [P(R('STRONGEST OBSERVED ASSOCIATION', L, 22 * k, INK, sp=0.14)),
             P(R('r ', D, 96 * k, INK), R('≈', SYM, 58 * k, INK), R(' .54', D, 96 * k, INK), lh=88 * k),
             P(R('SKILL VARIETY ', X, 17 * k, INK), R('↔', SYM, 17 * k, INK), R(' JOB SATISFACTION', X, 17 * k, INK))], n='Caption')
    oval(gs, cx - 15 * k, y0 - 14 * k, 30 * k, 30 * k, 'C3125B', shadow=(4 * k, 6 * k, '000000', 0.4), n='Pin')
    g.rotation = rot
    return g

def mini_scatter(gs, x, y, w, h, k=1.0):
    """Miniature of the real 25-point scatter as editable vector shapes (same data, same fit)."""
    sums = DATA['SV_JS_ITEM_SUMS']; kk = DATA['ITEMS_PER_CONSTRUCT']
    pts = [(a / kk, b / kk) for a, b in sums]
    X_ = lambda v: x + 40 * k + (v - 1) / 4 * (w - 70 * k); Y_ = lambda v: y + h - 30 * k - (v - 1) / 4 * (h - 60 * k)
    poly(gs, [(X_(1), Y_(5)), (X_(1), Y_(1)), (X_(5), Y_(1))], stroke=(INK, 3 * k), closed=False, n='Axes')
    mx = sum(p[0] for p in pts) / 25; my = sum(p[1] for p in pts) / 25
    b = sum((p[0] - mx) * (p[1] - my) for p in pts) / sum((p[0] - mx) ** 2 for p in pts); a = my - b * mx
    x0, x1 = min(p[0] for p in pts), max(p[0] for p in pts)
    poly(gs, [(X_(x0), Y_(a + b * x0)), (X_(x1), Y_(a + b * x1))], stroke=(RED, 8 * k), closed=False, n='Fit line')
    for px_, py_ in pts: oval(gs, X_(px_) - 9 * k, Y_(py_) - 9 * k, 18 * k, 18 * k, ORG, ln=('FFFFFF', 3 * k), n='Respondent')

POL = [('a', 365, 520, -4), ('b', 955, 505, 2), ('c', 1545, 525, 4)]
def s20_signals(s, sh):
    set_bg(s, night=True); grain(sh); act_tag(sh, 'IV', 'Go deeper')
    label(sh, 110, 95, 'THREE SIGNALS', C, 90, CREAM)
    marker(sh, quad((365, 245), (650, 330), (955, 225)) + quad((955, 225), (1250, 320), (1550, 245))[1:], RED, 5, n='Red string')
    for kind, cx, cy, rot in POL: polaroid(sh, cx, cy, rot, 1.0, kind, f'!!polaroid{kind}')

def s21_signal(s, sh):
    set_bg(s, night=True); grain(sh); act_tag(sh, 'IV', 'Go deeper')
    label(sh, 110, 95, 'THREE SIGNALS', C, 90, CREAM)
    for (kind, cx, cy, rot), (dx, dy, r2) in zip(POL, [(420, -110, -10), (0, -125, 0), (-420, -110, 10)]):
        polaroid(sh, cx + dx, cy + dy, r2, 0.5, kind, f'!!polaroid{kind}')
    g = sh.add_group_shape(); g.name = '!!ticket'; gs = g.shapes
    rect(gs, 360, 600, 1200, 330, YEL, n='Ticket')
    oval(gs, 334, 739, 52, 52, '1C0A29', n='Ticket notch'); oval(gs, 1534, 739, 52, 52, '1C0A29', n='Ticket notch')
    text(gs, 420, 640, 1100, 260, [P(R('LOWEST SCORE + EMPLOYEE PREFERENCE + STRONGEST ASSOCIATION', L, 26, INK, sp=0.1)),
                                   P(R('MANAGERIAL SIGNAL', D, 128, INK), before=14),
                                   P(R('— not proof. A reason to redesign carefully and test.', M, 30, INK, b=True), before=6)], n='Managerial signal')
    g.rotation = -1.5

def s22_jcm(s, sh):
    set_bg(s, night=True)
    pic(sh, 'a07_plum', 0, 0, 1920, 930, crop=(0, 150 / 1080, 0, 0), nm='Photo A07 (bag rail, duotone)')
    r = rect(sh, 0, 0, 1920, 1080, n='Shade'); grad(r, [(0, INK, 0.2), (0.42, INK, 0.7), (0.7, INK, 0.95), (1, INK, 0.95)], angle=90)
    grain(sh); act_tag(sh, 'V', 'Interpret')
    TOP, SIZE, SY, OY = 250, 210, 600, 785
    cx = dict(zip(DATA['JCM_ORDER'], XS))
    states = [('m', 110, 980, 600, 'EXPERIENCED MEANINGFULNESS', ['SV', 'TI', 'TS']), ('r', 1130, 380, 1320, 'EXPERIENCED\vRESPONSIBILITY', ['AU']), ('k', 1530, 300, 1680, 'KNOWLEDGE\vOF RESULTS', ['FB'])]
    for key, x, w, c, t, frm in states:
        for kk in frm:
            col = '7FA0FF' if J[kk]['tier'] == 'strong' else 'FF6FAE'
            marker(sh, bezier((cx[kk], TOP + SIZE + 40), (cx[kk], (TOP + SIZE + 40 + SY) / 2), (c, (TOP + SIZE + 40 + SY) / 2), (c, SY)), col, 10, n=f'Path {kk}', glow=(10, MAG, 0.45))
        marker(sh, [(c, SY + 110), (c, OY)], 'FF6FAE', 10, n='Path to outcomes', glow=(10, MAG, 0.45))
    hang(sh, TOP, SIZE, prefix='!!jcm')
    tier = {'strong': BLUE, 'moderate': ORG, 'weak': ORG, 'lowest': MAG}
    for i, kk in enumerate(DATA['JCM_ORDER']):
        label(sh, cx[kk], TOP + SIZE + 6, J[kk]['name'].upper(), X, 26, CREAM, al='c')
        text(sh, cx[kk] + 50, TOP - 40, 104, 104, P(R(J[kk]['label'], D, 46, INK), al='c'), anchor='m', shape=MSO_SHAPE.OVAL, fill_hex=tier[J[kk]['tier']], ln=(PAPER, 6), shadow=(5, 7, '000000', 0.5), rot=[-8, 6, -4, 8, -6][i], n=f'Score {kk} {J[kk]["label"]}', inset=(0, 6, 0, 0))
    for key, x, w, c, t, frm in states:
        text(sh, x, SY, w, 110, P(R(t, X, 30, CREAM), al='c', lh=33), anchor='m', shape=MSO_SHAPE.RECTANGLE, fill_hex='160A20', ln=('FF6FAE', 5), n=f'State: {t}', shadow=None)
    text(sh, 110, OY, 1720, 110, P(R('OUTCOMES   ', L, 26, INK, sp=0.14), R('INTERNAL WORK MOTIVATION · JOB SATISFACTION', X, 44, INK), al='c'), anchor='m', shape=MSO_SHAPE.RECTANGLE, fill_hex=YEL, rot=-0.6, shadow=(10, 12, '000000', 0.5), n='Outcomes')
    text(sh, 110, 930, 1720, 40, P(R('■ ', M, 27, ORG), R('Where our data shows the gaps: ', M, 27, CREAM), R('variety · autonomy · feedback', M, 27, CREAM, b=True),
                                 R('    ■ ', M, 27, BLUE), R('strengths: significance · identity', M, 27, CREAM)), wrap=False, n='Gaps caption')

def s23_change(s, sh):
    set_bg(s, INK)
    pic(sh, 'a01_plum_blur', 0, 0, 1920, 1080, nm='Photo A01 (blurred duotone)')
    text(sh, 150, 290, 1700, 520, [P(R('CHANGE THE JOB', D, 165, CREAM), R(',', D, 165, MAG)), P(R('CHANGE THE EXPERIENCE', D, 165, YEL), before=20), P(R('OF DOING IT.', D, 165, CREAM), before=20)], n='Statement')

def _enriched_base(sh, opened):
    if opened: pic(sh, 'a03', 0, 0, 1920, 1080, nm='!!store A03')
    else: pic(sh, 'a03', -115, -65, 2150, 1210, nm='!!store A03')
    rect(sh, 0, 0, 1920, 1080, '000000', alpha=0.45, n='Photo dim')
    grain(sh)
    pic(sh, 'a04_sticker', 610, 440, 700, nm='!!cashier A04')
    if opened: hazard_barrier(sh, -700, 600, 'l', PLUM, nm='L'); hazard_barrier(sh, 2020, 600, 'r', PLUM, nm='R')
    else: hazard_barrier(sh, 0, 600, 'l', PLUM, nm='L'); hazard_barrier(sh, 1320, 600, 'r', PLUM, nm='R')
    act_tag(sh, 'VI', 'Redesign'); proposed_tape(sh)
    label(sh, 960, 110, RD['name'].upper(), C, 110, CREAM, al='c', shd=(0, 8, '000000', 0.45), n='!!title')

def s24a_enriched_narrow(s, sh):
    set_bg(s, INK); _enriched_base(sh, False)

def s24_enriched(s, sh):
    set_bg(s, INK); _enriched_base(sh, True)
    pos = [(100, 260), (1380, 260), (100, 640), (1380, 640)]; tips = [(600, 520), (1320, 520), (610, 860), (1300, 860)]
    cols = [MAG, ORG, VIO, BLUE]
    for i, ((x, y), c) in enumerate(zip(pos, RD['components'])):
        marker(sh, marker_line(x + 440 if x < 900 else x, y + 120, *tips[i], i + 3, 10), cols[i], 9, n='Marker arrow')
    for i, ((x, y), c) in enumerate(zip(pos, RD['components'])):
        g = sh.add_group_shape(); g.name = f'Component {c["n"]}'; gs = g.shapes
        rect(gs, x, y, 440, 240, 'F7F1E3', shadow=(10, 14, '000000', 0.45), n='Note paper'); rect(gs, x, y, 18, 240, cols[i], n='Colour tab')
        text(gs, x + 40, y + 20, 390, 210, [P(R(c['n'], D, 96, cols[i], outline=(INK, 3))), P(R(c['name'].upper(), X, 30, INK), lh=33, before=6),
                                           P(R('→ ', SYM, 24, INK), R(c['target'], M, 24, INK), before=8)], n=f'{c["n"]} {c["name"]}')
        tape_strip(gs, x + 150, y - 24, 140, -4)
        g.rotation = [-3, 2.5, 2, -2.5][i]
    text(sh, 0, 1000, 1920, 56, P(R('Keeps what works: ', M, 28, CREAM), R(f"{J['TI']['name']} ", M, 28, CREAM, b=True), R('✓', CHK, 26, '7FA0FF'),
                                  R(' · ', M, 28, CREAM), R(f"{J['TS']['name']} ", M, 28, CREAM, b=True), R('✓', CHK, 26, '7FA0FF'), R(' preserved — he still owns the whole transaction', M, 28, CREAM), al='c'),
         anchor='m', shape=MSO_SHAPE.RECTANGLE, fill_hex=INK, fill_alpha=0.82, n='Keeps what works')

def svg_path(d):
    """Sample an SVG path made of M / C / S commands (the HTML's wandering line)."""
    import re
    toks = re.findall(r'[MCS]|-?\d+\.?\d*', d); i = 0; pts = []; cur = None; last_c2 = None; cmd = None
    nums = lambda n: [float(toks[i + j]) for j in range(n)]
    while i < len(toks):
        if toks[i] in 'MCS': cmd = toks[i]; i += 1; continue
        if cmd == 'M': cur = tuple(nums(2)); pts.append(cur); i += 2
        elif cmd == 'C':
            v = nums(6); c1, c2, p = (v[0], v[1]), (v[2], v[3]), (v[4], v[5]); pts += bezier(cur, c1, c2, p)[1:]; cur, last_c2 = p, c2; i += 6
        elif cmd == 'S':
            v = nums(4); c1 = (2 * cur[0] - last_c2[0], 2 * cur[1] - last_c2[1]); c2, p = (v[0], v[1]), (v[2], v[3]); pts += bezier(cur, c1, c2, p)[1:]; cur, last_c2 = p, c2; i += 4
    return pts

def s25_rotation(s, sh):
    set_bg(s, CREAM); grain(sh); act_tag(sh, 'VI', 'Redesign', day=True); proposed_tape(sh)
    header(sh, '01', 'Structured micro-rotation', J['SV']['name'], ink=True)
    home = (430, 600)
    notes = [(760, 270, 340, RD['rotation'][0], 'm03', -3), (1170, 220, 360, RD['rotation'][1], 'a10_cashier', 2.5),
             (1560, 330, 300, RD['rotation'][2], None, -2), (1220, 640, 340, RD['rotation'][3], None, 2), (780, 610, 340, RD['rotation'][4], 'm22', -2)]
    for i, (x, y, w, t, ph, rot) in enumerate(notes):
        tx, ty = x + w / 2, y + 40; hx, hy = home
        mx, my = (hx + tx) / 2, (hy + ty) / 2; nx, ny = -(ty - hy) * 0.18, (tx - hx) * 0.18
        marker(sh, quad(home, (mx + nx, my + ny), (tx, ty)) + quad((tx, ty), (mx - nx, my - ny), (hx + 14 * (i - 2), hy + 10))[1:], MAG, 7, n='Loop')
    marker(sh, svg_path('M 380 900 C 200 700, 900 980, 700 520 S 1500 1000, 1300 560 S 1850 380, 1700 980 S 600 1060, 900 860'), INK, 5, alpha=0.55, n='Wandering path')
    pic(sh, 'a04_sticker', 120, 380, 600, nm='Cashier A04')
    text(sh, 150, 840, width('STILL PRIMARILY A CASHIER', L, 30, 0.14) + 40, 52, P(R('STILL PRIMARILY A CASHIER', L, 30, CREAM, sp=0.14)), anchor='m', shape=MSO_SHAPE.RECTANGLE, fill_hex=INK, n='Still primarily a cashier', inset=(16, 0, 10, 0), wrap=False)
    for x, y, w, t, ph, rot in notes:
        g = sh.add_group_shape(); g.name = f'Note: {t}'; gs = g.shapes
        php = 250 if ph == 'a10_cashier' else 170
        lines = max(1, math.ceil(width(t.upper(), X, 26) * 1.08 / (w - (34 if ph else 64))))
        hh = (14 + php + 12 + lines * 29 + 14) if ph else (22 + lines * 29 + 22)
        rect(gs, x, y, w, hh, 'F7F1E3', shadow=(10, 14, '000000', 0.45), n='Note paper')
        if ph: cover(gs, ph, x + 14, y + 14, w - 28, php, fy=0.3, nm=f'Photo {ph}')
        else: rect(gs, x + 22, y + 22, 12, lines * 29, MAG, n='Marker tab')
        text(gs, x + (20 if ph else 50), y + (14 + php + 12 if ph else 22), w - (34 if ph else 64), lines * 29 + 6, P(R(t.upper(), X, 26, INK), lh=29), n=t)
        tape_strip(gs, x + w / 2 - 60, y - 22, 120, rot * 2)
        g.rotation = rot
    stamp(sh, 0, 915, ['NOT RANDOM MOVEMENT AROUND THE STORE'], 50, MAG, rot=-2, bg=CREAM, bg_alpha=0.9, center_x=960)
    label(sh, 64, 1024, 'Checkout-adjacent only · subject to training & staffing · checkout coverage protected', M, 24, INK, a=0.85)

def _flow_node(sh, x, y, w, t, bg, fg=INK, rot=0, a=1.0, n='Node'):
    runs = t if isinstance(t, list) else [R(t, X, 26 if w > 230 else 21, fg, a=a)]
    return text(sh, x, y, w, 84, P(*runs, al='c', lh=28), anchor='m', shape=MSO_SHAPE.RECTANGLE, fill_hex=bg, fill_alpha=a, rot=rot, shadow=(6, 8, '000000', 0.55 * a), n=n)

def _authority(sh):
    pic(sh, 'a05', 0, 0, 1920, 1080, nm='Photo A05 (queue)')
    rect(sh, 0, 0, 1920, 1080, '000000', alpha=0.6, n='Photo dim')
    r = rect(sh, 0, 0, 1920, 1080, n='Shade'); grad(r, [(0, INK, 0.6), (1, INK, 0.85)], angle=90)
    grain(sh); act_tag(sh, 'VI', 'Redesign'); proposed_tape(sh)
    header(sh, '02', 'Controlled decision authority', J['AU']['name'])
    ox = lambda i: 110 + i * 258; dim = 0.25
    label(sh, 110, 240, 'CURRENT · ROUTINE ISSUES ESCALATE', L, 26, ORG, a=0.45, sp=0.14)
    old = [('CUSTOMER', CREAM, INK), ('CASHIER', CREAM, INK), ('WAIT', ORG, INK), ('SUPERVISOR', VIO, CREAM), ('DECISION', VIO, CREAM), ('CASHIER', CREAM, INK), ('CUSTOMER', CREAM, INK)]
    for i, (t, bg, fg) in enumerate(old):
        runs = [R('◷ ', CHK, 21, fg, a=dim), R(t, X, 21, fg, a=dim)] if t == 'WAIT' else t
        _flow_node(sh, ox(i), 285, 220, runs if t == 'WAIT' else t, bg, fg, ((i * 5) % 3) - 1, a=dim, n=f'Current: {t.title()}')
        if i: label(sh, ox(i) - 18, 307, '→', SYM, 32, YEL, al='c', a=0.4)
    label(sh, 110, 392, 'QUEUE', M, 24, CREAM)
    for i in range(2): oval(sh, 210 + i * 32, 395, 22, 22, ORG, n='Queue dot')
    label(sh, 110, 470, 'PROPOSED · PREDEFINED LOW-RISK ROUTINE ISSUES', L, 26, YEL, sp=0.14)
    _flow_node(sh, 110, 515, 220, 'CUSTOMER', CREAM, rot=-1, n='Proposed: Customer'); label(sh, 349, 537, '→', SYM, 32, YEL, al='c')
    _flow_node(sh, 368, 515, 300, 'TRAINED CASHIER', YEL, rot=1, n='Proposed: Trained cashier'); label(sh, 687, 537, '→', SYM, 32, YEL, al='c')
    _flow_node(sh, 706, 515, 260, [R('RESOLVED ', X, 26, INK), R('✓', CHK, 24, BLUE)], CREAM, rot=-1, n='Proposed: Resolved')
    oval(sh, 816, 488, 40, 40, MAG, ln=(INK, 4), n='Customer problem token')
    label(sh, 110, 690, 'HIGH-RISK EXCEPTIONS · SUPERVISOR RETAINS', L, 26, LILAC, sp=0.14)
    rect(sh, 500, 599, 6, 136, VIO, n='High-risk path')
    _flow_node(sh, 368, 735, 300, 'TRAINED CASHIER', YEL, rot=1, n='High-risk: Trained cashier'); label(sh, 687, 757, '→', SYM, 32, YEL, al='c')
    _flow_node(sh, 706, 735, 260, 'SUPERVISOR', VIO, CREAM, rot=-1, n='High-risk: Supervisor')
    for i, t in enumerate(RD['supervisorRetains']):
        text(sh, 1010, 560 + i * 58, 500, 48, P(R(t, M, 25, INK, b=True)), anchor='m', shape=MSO_SHAPE.RECTANGLE, fill_hex='F7F1E3', rot=-1, shadow=(5, 6, '000000', 0.5), n=f'Supervisor retains: {t}', inset=(26, 0, 10, 0))
        rect(sh, 1010, 560 + i * 58, 10, 48, VIO, rot=-1, n='Tab')
    pic(sh, 'torn_a10_super', 1560, 520, 300, 400, rot=2, shadow=(10, 14, '000000', 0.45), nm='Supervisor (A10, torn)')
    label(sh, 64, 1018, 'Proposed design principle — exact permissions & any thresholds would be defined by management.', M, 24, CREAM, a=0.8)

def s26_authority(s, sh): set_bg(s, INK); _authority(sh)

def s27_controlled(s, sh):
    set_bg(s, INK); _authority(sh)
    rect(sh, 0, 0, 1920, 1080, INK, alpha=0.93, n='Overlay')
    text(sh, 150, 210, 1700, 700, [P(R('CONTROLLED AUTONOMY', D, 200, YEL)), P(R('≠', SYM, 150, MAG), before=10), P(R('UNRESTRICTED AUTONOMY', D, 200, CREAM), before=10)], n='Statement')

def s28_closer(s, sh):
    set_bg(s, INK)
    pic(sh, 'a09', 0, 0, 1920, 1080, nm='Photo A09 (stamp)'); rect(sh, 0, 0, 1920, 1080, '000000', alpha=0.65, n='Photo dim')
    grain(sh); act_tag(sh, 'VI', 'Redesign')
    rect(sh, 200, 300, 1520, 8, CREAM, alpha=0.6, n='Decision line')
    label(sh, 260, 200, 'CUSTOMER PROBLEM', L, 26, CREAM, al='c', sp=0.14); oval(sh, 186, 282, 44, 44, MAG, ln=(INK, 4), n='Problem token')
    label(sh, 740, 200, 'TRAINED CASHIER', L, 26, YEL, al='c', sp=0.14)
    label(sh, 1610, 200, 'SUPERVISOR', L, 26, LILAC, al='c', sp=0.14)
    pic(sh, 'a09', 640, 250, 280, 190, crop=(0.1534, 0.368, 0.5436, 0.2664), rot=-5, ln=(YEL, 10), shadow=(10, 12, '000000', 0.6), nm='The decision stamp (moved to the cashier)')
    text(sh, 150, 500, 1700, 500, P(R('MOVE APPROPRIATE DECISIONS ', D, 140, CREAM), R('CLOSER TO WHERE THE CUSTOMER PROBLEM OCCURS.', D, 140, YEL)), n='Statement')

def s29_enrich(s, sh):
    set_bg(s, CREAM); grain(sh); act_tag(sh, 'VI', 'Redesign', day=True); proposed_tape(sh)
    header(sh, '03', 'Checkout-zone ownership', 'Responsibility & ownership', ink=True)
    rect(sh, 958, 280, 5, 600, INK, alpha=0.25, n='Divider')
    label(sh, 100, 250, 'JOB ENLARGEMENT', C, 80, INK, a=0.3); label(sh, 100, 335, '= SIMPLY MORE TASKS', X, 30, INK, a=0.3)
    rect(sh, 90, 880, 820, 10, INK, alpha=0.3, n='Floor')
    px = 100
    for i, (nm_, w) in enumerate([('box', 170), ('obj_sv', 180), ('obj_ts', 115), ('box', 160), ('obj_sv', 165), ('obj_ts', 105)]):
        iw, ih = img_size(nm_); h = w * ih / iw
        pic(sh, nm_, px, 880 - h, w, h, gray=True, alpha=0.3, nm=f'+task {i+1}')
        label(sh, px + w / 2, 880 - h - 52, '+task', K, 44, INK, al='c', a=0.3, rot=4 if i % 2 else -4)
        px += w - 22
    label(sh, 1010, 185, 'JOB ENRICHMENT', C, 80, INK); label(sh, 1010, 270, '= MORE RESPONSIBILITY & OWNERSHIP', X, 30, INK)
    rect(sh, 990, 880, 240, 10, INK, n='Floor')
    sy = 880
    for i, o in enumerate(RD['ownership']):
        crate = i % 2 == 1; h = 92 if crate else 130; sy -= h - 6
        n_ = 'crate' if crate else 'box'; iw, ih = img_size(n_); ph = 200 * ih / iw
        pic(sh, n_, 1000 + (i % 2) * 14, sy + h - ph, 200, ph, nm=f'Stack {i+1}')
        tape_strip(sh, 1230, sy + h / 2 - 26, 600, 1.5 if i % 2 else -1.5)
        label(sh, 1252, sy + h / 2 - 18, o.upper(), M, 25, INK, b=True, rot=1.5 if i % 2 else -1.5, n=f'Ownership: {o}')
    text(sh, 0, 930, 1920, 120, P(R('WE AIM FOR ENRICHMENT.', D, 100, INK), al='c'), anchor='m', shape=MSO_SHAPE.RECTANGLE, fill_hex=YEL, ln=(INK, 6), n='Banner')
