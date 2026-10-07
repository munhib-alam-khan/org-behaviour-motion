"""Build submission/OB_Midterm_JCM_Imtiaz_Final.pptx from the same data and
images as the HTML deck. Run: python3 scripts/pptx/build.py"""
import sys, zipfile, shutil, re
sys.path.insert(0, str(__import__('pathlib').Path(__file__).parent))
from slides_c import *
from notes import NOTES
from eot import ttf_to_eot

OUTF = ROOT / 'submission/OB_Midterm_JCM_Imtiaz_Final.pptx'

# (builder, transition) — 'morph' marks the approved Morph pairs (morph on the arriving slide)
SLIDES = [
    (s01_title, 'fade'), (s02_last, 'fade'), (s03_again, 'fade'), (s04_shift, 'morph'),
    (s05_question, 'fade'), (s06_asked, 'fade'), (s07_25, 'fade'), (s08_five, 'fade'),
    (s09_assume, 'fade'), (s10_diagnose, 'fade'), (s11_meaning, 'fade'), (s12_notproblem, 'fade'),
    (s13_else, 'fade'), (s14_squeeze, 'morph'), (s15_diagnosis, 'fade'), (s16_meaningful, 'fade'),
    (s17_narrow, 'morph'), (s18_value, 'fade'), (s19_assoc, 'fade'), (s20_signals, 'fade'),
    (s21_signal, 'morph'), (s22_jcm, 'fade'), (s23_change, 'fade'), (s24a_enriched_narrow, 'fade'), (s24_enriched, 'morph'),
    (s25_rotation, 'fade'), (s26_authority, 'fade'), (s27_controlled, 'fade'), (s28_closer, 'fade'),
    (s29_enrich, 'fade'), (s30_feedback, 'fade'), (s31_feedback2, 'fade'), (s32_hypothesis, 'fade'),
    (s33_pilot, 'fade'), (s34_both, 'fade'), (s35_fail, 'morph'), (s36_decide, 'fade'),
    (s37_routine, 'fade'), (s38_environment, 'fade'), (s39_performs, 'fade'), (s40_owns, 'morph'),
    (s41_end, 'fade'), (s42_appendix, 'fade'),
]

NS_P = 'http://schemas.openxmlformats.org/presentationml/2006/main'
def transition(slide, kind):
    sld = slide._element
    if kind == 'morph':
        xml = (f'<mc:AlternateContent xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">'
               f'<mc:Choice xmlns:p159="http://schemas.microsoft.com/office/powerpoint/2015/09/main" Requires="p159">'
               f'<p:transition xmlns:p="{NS_P}" spd="slow"><p159:morph option="byObject"/></p:transition></mc:Choice>'
               f'<mc:Fallback><p:transition xmlns:p="{NS_P}" spd="slow"><p:fade/></p:transition></mc:Fallback></mc:AlternateContent>')
    else:
        xml = f'<p:transition xmlns:p="{NS_P}" spd="med"><p:fade/></p:transition>'
    el = etree.fromstring(xml)
    sld.find(qn('p:clrMapOvr')).addnext(el)

def build():
    prs = Presentation(); prs.slide_width = E(1920); prs.slide_height = E(1080)
    prs.core_properties.title = 'Redesigning the Checkout Cashier Role Using the Job Characteristics Model'
    prs.core_properties.author = ', '.join(DATA['STUDY']['team'])
    prs.core_properties.subject = 'KSBL · Organizational Behaviour · Fall 2026'
    for i, (fn, tr) in enumerate(SLIDES, 1):
        s = prs.slides.add_slide(prs.slide_layouts[6])
        fn(s, s.shapes)
        s.notes_slide.notes_text_frame.text = NOTES[fn.__name__]
        transition(s, tr)
    prs.save(OUTF)
    embed_fonts(OUTF)
    print('wrote', OUTF, len(SLIDES), 'slides')

def embed_fonts(path):
    """Embed the TrueType fonts (OFL, fsType installable) so the deck renders on machines without them."""
    faces = [(D, FONT_FILES[D], None), (C, FONT_FILES[C], None), (X, FONT_FILES[X], None), (L, FONT_FILES[L], None),
             (M, FONT_FILES[M], MONO_BOLD), (K, FONT_FILES[K], None)]
    tmp = path.with_suffix('.tmp')
    zin = zipfile.ZipFile(path); zout = zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED)
    rels = zin.read('ppt/_rels/presentation.xml.rels').decode(); pres = zin.read('ppt/presentation.xml').decode()
    ct = zin.read('[Content_Types].xml').decode()
    entries = []; n = 0; files = {}
    for face, reg, bold in faces:
        ids = []
        for f in (reg, bold):
            if not f: ids.append(None); continue
            n += 1; rid = f'rIdFont{n}'; files[f'ppt/fonts/font{n}.fntdata'] = ttf_to_eot(str(FONTS / f))
            rels = rels.replace('</Relationships>', f'<Relationship Id="{rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/font" Target="fonts/font{n}.fntdata"/></Relationships>')
            ids.append(rid)
        e = f'<p:embeddedFont><p:font typeface="{face}" pitchFamily="{49 if face == M else 2}" charset="0"/><p:regular r:id="{ids[0]}"/>' + (f'<p:bold r:id="{ids[1]}"/>' if ids[1] else '') + '</p:embeddedFont>'
        entries.append(e)
    lst = '<p:embeddedFontLst>' + ''.join(entries) + '</p:embeddedFontLst>'
    pres = re.sub(r'(<p:notesSz[^>]*/>)', r'\1' + lst, pres, count=1)
    pres = pres.replace('<p:presentation ', '<p:presentation embedTrueTypeFonts="1" ', 1)
    if 'Extension="fntdata"' not in ct:
        ct = ct.replace('<Default ', '<Default Extension="fntdata" ContentType="application/x-fontdata"/><Default ', 1)
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == 'ppt/_rels/presentation.xml.rels': data = rels.encode()
        elif item.filename == 'ppt/presentation.xml': data = pres.encode()
        elif item.filename == '[Content_Types].xml': data = ct.encode()
        zout.writestr(item, data)
    for k, v in files.items(): zout.writestr(k, v)
    zout.close(); zin.close(); shutil.move(tmp, path)

if __name__ == '__main__':
    build()
