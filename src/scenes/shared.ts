// Cross-scene continuity helpers (objects that "travel" between scenes).
import { barcode } from '../components/kit';

/** Deterministic dense wall of receipts — built identically in Sc2 and Sc3
 *  so the cut between them is invisible. */
export function receiptWall(cols = 24, rows = 10) {
  const w = 1920 / cols;
  const h = 1080 / rows;
  let html = '';
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      html += `<div class="wall-tile" style="left:${c * w + 6}px;top:${r * h + 6}px;width:${w - 12}px;height:${h - 12}px"></div>`;
  return `<div class="wall full">${html}</div>`;
}

/** Position of the full stop in "THE CASHIERS." (Sc3) → first token (Sc4). */
export const handoff = { x: 0, y: 0, size: 0 };

export const token = (i: number) => `<div class="token"><div class="tk-bar">${barcode(100 + i, 96, 34)}</div><div class="tk-n">#${String(i + 1).padStart(2, '0')}</div></div>`;
