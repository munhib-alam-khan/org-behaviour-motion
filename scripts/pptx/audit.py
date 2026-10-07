"""QA audit of the built PPTX: morph pairs, locked numbers, notes, off-slide objects, fonts."""
import re, sys, json
from pptx import Presentation
from pptx.util import Emu
sys.path.insert(0, 'scripts/pptx')
from lib import DATA
P = Presentation('submission/OB_Midterm_JCM_Imtiaz_Final.pptx')
W, H = P.slide_width, P.slide_height
slides = list(P.slides)

def names(s):
    out = []
    def walk(shapes):
        for sh in shapes:
            out.append(sh.name)
            if sh.shape_type == 6: walk(sh.shapes)
    walk(s.shapes); return out

def all_text(s):
    t = []
    def walk(shapes):
        for sh in shapes:
            if sh.has_text_frame: t.append(sh.text_frame.text)
            if getattr(sh, 'has_table', False) and sh.has_table:
                for r in sh.table.rows:
                    for c in r.cells: t.append(c.text)
            if sh.shape_type == 6: walk(sh.shapes)
    walk(s.shapes); return '\n'.join(t)

print('== Morph pairs (!!names shared with previous slide)')
for i, s in enumerate(slides):
    x = s._element.xml
    if 'p159:morph' in x:
        a = {n for n in names(slides[i - 1]) if n.startswith('!!')}; b = {n for n in names(s) if n.startswith('!!')}
        print(f'  slide {i}->{i+1}: shared {sorted(a & b)}')

print('== Locked numbers (slide occurrences)')
J = DATA['JCM']; PR = DATA['PREFERENCES']
checks = {'25': r'(?<![\d.])25(?![\d.])', '4.09': r'4\.09', '4.04': r'4\.04', '3.40': r'3\.40', '2.84': r'2\.84', '2.55': r'2\.55',
          '4.32': r'4\.32', '4.16': r'4\.16', '3.28': r'3\.28', 'r ≈ .54': r'r ≈ \.54', '6 weeks': r'(?m)^6$|6 WEEKS|6 weeks', '~10–12': r'10–12'}
for k, rx in checks.items():
    hits = [i + 1 for i, s in enumerate(slides) if re.search(rx, all_text(s))]
    print(f'  {k:8s} slides {hits}')
bad = []
for i, s in enumerate(slides):
    t = all_text(s)
    for wrong in ['2.54', '2.547', '4.093', '0.54 causes', 'significant (p', 'p <', 'p=']:
        if wrong in t: bad.append((i + 1, wrong))
print('  suspicious strings:', bad or 'none')

print('== Chart data')
sums = DATA['SV_JS_ITEM_SUMS']; k = DATA['ITEMS_PER_CONSTRUCT']
for i, s in enumerate(slides):
    for sh in s.shapes:
        if sh.has_chart:
            ser = sh.chart.plots[0].series[0]
            xs = list(sh.chart.plots[0].series[0].values)
            n = len(xs)
            pts = sorted(zip([round(v, 4) for v in sh.chart._chartSpace.xpath('.//c:ser[1]/c:xVal//c:v/text()') and map(float, sh.chart._chartSpace.xpath('.//c:ser[1]/c:xVal//c:v/text()'))], [round(v, 4) for v in xs]))
            exp = sorted((round(a / k, 4), round(b / k, 4)) for a, b in sums)
            print(f'  slide {i+1}: {n} points, matches respondents.ts: {pts == exp}')

print('== Notes')
empty = [i + 1 for i, s in enumerate(slides) if not s.has_notes_slide or not s.notes_slide.notes_text_frame.text.strip()]
print('  slides without notes:', empty or 'none')

print('== Off-slide objects (intentional Morph staging only)')
for i, s in enumerate(slides):
    for sh in s.shapes:
        if sh.left is None: continue
        if sh.left + sh.width <= 0 or sh.left >= W or sh.top >= H or sh.top + sh.height <= 0:
            print(f'  slide {i+1}: {sh.name}')

print('== Fonts used')
import collections
fonts = collections.Counter(re.findall(r'latin typeface="([^"]+)"', ''.join(s._element.xml for s in slides)))
print(' ', dict(fonts))
print('== Pictures / editable objects')
pics = sum(1 for s in slides for sh in s.shapes if sh.shape_type == 13)
print('  slides:', len(slides))
