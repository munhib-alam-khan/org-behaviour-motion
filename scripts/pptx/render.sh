#!/bin/bash
# Render the PPTX to PDF + PNGs for QA. Usage: scripts/pptx/render.sh OUTDIR [dpi]
set -e
SK=/root/.claude/skills/synced/4705065b-833e-4436-9601-1e6f7ca8c1e7_6b82cae4-110b-4e4b-b909-f8f2366cb073/pptx
OUT=$1; DPI=${2:-40}; rm -rf "$OUT"; mkdir -p "$OUT"
cp submission/OB_Midterm_JCM_Imtiaz_Final.pptx "$OUT/deck.pptx"
(cd "$OUT" && timeout 400 python3 $SK/scripts/office/soffice.py --headless --convert-to pdf deck.pptx >/dev/null 2>&1)
pdftoppm -png -r $DPI "$OUT/deck.pdf" "$OUT/s" 2>/dev/null
python3 - "$OUT" <<'PY'
import sys, glob
from PIL import Image
R=sys.argv[1]; fs=sorted(glob.glob(R+'/s-*.png')); w,h=Image.open(fs[0]).size
for part in range(0,len(fs),12):
    sh=Image.new('RGB',(w*3,h*4),(40,40,40))
    for i,f in enumerate(fs[part:part+12]): sh.paste(Image.open(f),((i%3)*w,(i//3)*h))
    sh.save(f'{R}/sheet{part//12}.png')
print(len(fs),'slides rendered')
PY
