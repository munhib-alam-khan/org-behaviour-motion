"""Cut static TTF instances from the bundled variable fonts so PowerPoint can
use (and embed) the same typography as the HTML deck. OFL fonts; renamed
families describe the instance."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

NM = Path('node_modules')
OUT = Path('submission/fonts'); OUT.mkdir(parents=True, exist_ok=True)

def rename(f, family, style='Regular'):
    full = f'{family} {style}' if style != 'Regular' else family
    ps = (family + '-' + style).replace(' ', '')
    for rec in list(f['name'].names):
        if rec.nameID in (1, 2, 3, 4, 6, 16, 17, 21, 22):
            f['name'].removeNames(nameID=rec.nameID)
    for nid, val in [(1, family), (2, style), (3, ps), (4, full), (6, ps)]:
        f['name'].setName(val, nid, 3, 1, 0x409)
        f['name'].setName(val, nid, 1, 0, 0)
    bold = style == 'Bold'
    f['OS/2'].fsSelection = (0x20 if bold else 0x40) | (f['OS/2'].fsSelection & 0x80)
    f['head'].macStyle = 1 if bold else 0
    f['OS/2'].fsType = 0  # installable embedding (OFL permits)

def inst(src, axes, family, style='Regular', weight_class=None):
    f = TTFont(src)
    f = instantiateVariableFont(f, axes, updateFontNames=False)
    rename(f, family, style)
    if weight_class: f['OS/2'].usWeightClass = weight_class
    f.flavor = None
    out = OUT / f"{family.replace(' ', '')}-{style}.ttf"
    f.save(out); print(out, out.stat().st_size)

A = NM / '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2'
J = NM / '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2'
inst(A, {'wdth': 62, 'wght': 900}, 'Archivo Display', weight_class=400)   # .d   giant numbers / statements
inst(A, {'wdth': 75, 'wght': 850}, 'Archivo Condensed', weight_class=400) # .dc  headlines
inst(A, {'wdth': 125, 'wght': 800}, 'Archivo Expanded', weight_class=400) # .dx  labels / names
inst(A, {'wdth': 112, 'wght': 700}, 'Archivo Label', weight_class=400)    # .lbl tracked caps
inst(J, {'wght': 500}, 'JetBrains Mono', 'Regular', 400)
inst(J, {'wght': 700}, 'JetBrains Mono', 'Bold', 700)
c = TTFont(NM / '@fontsource/caveat-brush/files/caveat-brush-latin-400-normal.woff2'); c.flavor = None
rename(c, 'Caveat Brush'); c.save(OUT / 'CaveatBrush-Regular.ttf'); print('caveat ok')
