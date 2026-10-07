"""Wrap a TrueType font in an (uncompressed) Embedded OpenType v2.1 container —
the format PowerPoint uses for /ppt/fonts/*.fntdata embedded-font parts."""
import struct
from fontTools.ttLib import TTFont

def _name(f, nid):
    rec = f['name'].getName(nid, 3, 1, 0x409) or f['name'].getName(nid, 1, 0, 0)
    return str(rec) if rec else ''

def _str(s):
    b = s.encode('utf-16-le')
    return struct.pack('<H', len(b)) + b

def ttf_to_eot(path):
    data = open(path, 'rb').read()
    f = TTFont(path)
    os2, head = f['OS/2'], f['head']
    panose = bytes([getattr(os2.panose, k) for k in ('bFamilyType', 'bSerifStyle', 'bWeight', 'bProportion', 'bContrast',
                                                      'bStrokeVariation', 'bArmStyle', 'bLetterForm', 'bMidline', 'bXHeight')])
    ur = os2.ulUnicodeRange1, os2.ulUnicodeRange2, os2.ulUnicodeRange3, os2.ulUnicodeRange4
    cp = getattr(os2, 'ulCodePageRange1', 1), getattr(os2, 'ulCodePageRange2', 0)
    italic = 1 if os2.fsSelection & 1 else 0
    body = (struct.pack('<I', 0x00020001) + struct.pack('<I', 0) + panose + struct.pack('<BB', 1, italic) +
            struct.pack('<I', os2.usWeightClass) + struct.pack('<H', os2.fsType) + struct.pack('<H', 0x504C) +
            struct.pack('<4I', *ur) + struct.pack('<2I', *cp) + struct.pack('<I', head.checkSumAdjustment) +
            struct.pack('<4I', 0, 0, 0, 0) + struct.pack('<H', 0) +
            _str(_name(f, 1)) + struct.pack('<H', 0) + _str(_name(f, 2)) + struct.pack('<H', 0) +
            _str(_name(f, 5)) + struct.pack('<H', 0) + _str(_name(f, 4)) + struct.pack('<H', 0) + struct.pack('<H', 0))
    total = 8 + len(body) + len(data)
    return struct.pack('<II', total, len(data)) + body + data
