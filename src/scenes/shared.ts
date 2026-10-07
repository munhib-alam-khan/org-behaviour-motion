// Cross-scene continuity helpers (objects that "travel" between scenes).
import { img } from '../assets';

/** Deterministic wall of real receipt paper, built identically in Sc2 and Sc3
 *  so the cut between them is invisible. One CSS variable holds the texture. */
export function receiptWall(cols = 20, rows = 6) {
  const w = 1920 / cols;
  const h = 1080 / rows;
  let html = '';
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const rot = (((r * 7 + c * 13) % 9) - 4) * 0.8;
      html += `<div class="wall-tile" style="left:${c * w + 5}px;top:${r * h + 4}px;width:${w - 10}px;height:${h - 8}px;transform:rotate(${rot}deg)"></div>`;
    }
  return `<div class="wall full" style="--rcpt:url(${img('receipt_strip')})">${html}</div>`;
}

/** Position of the full stop in "THE CASHIERS." (Sc3) → first collage tile (Sc4). */
export const handoff = { x: 0, y: 0, size: 0 };

/** Where the five JCM objects hang in Sc5 and Sc13 (continuity). */
export const HANG = { xs: [250, 600, 960, 1320, 1670], top: 405, size: 270 };
