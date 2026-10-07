// Photographic building blocks: plates, cutouts, torn masks, frames, tape,
// marker annotations. Strings in, strings out, like kit.ts.
import { img } from '../assets';
import { rng } from './kit';

/** Full-bleed photographic plate. */
export const plate = (name: string, cls = '', style = '') =>
  `<img class="plate ${cls}" src="${img(name)}" alt="" draggable="false" style="${style}">`;

/** Positioned image (cutout or crop). */
export const pic = (name: string, style: string, cls = '') =>
  `<img class="pic ${cls}" src="${img(name)}" alt="" draggable="false" style="${style}">`;

/** Jagged, torn-paper clip-path polygon (percent coords), seeded. */
export function torn(seed: number, amp = 1.6, sides: { t?: boolean; r?: boolean; b?: boolean; l?: boolean } = { t: true, r: true, b: true, l: true }) {
  const r = rng(seed);
  const pts: string[] = [];
  const j = (on?: boolean) => (on ? r() * amp : 0);
  for (let x = 0; x <= 100; x += 2.5) pts.push(`${x}% ${j(sides.t)}%`);
  for (let y = 2.5; y <= 100; y += 2.5) pts.push(`${100 - j(sides.r)}% ${y}%`);
  for (let x = 97.5; x >= 0; x -= 2.5) pts.push(`${x}% ${100 - j(sides.b)}%`);
  for (let y = 97.5; y > 0; y -= 2.5) pts.push(`${j(sides.l)}% ${y}%`);
  return `polygon(${pts.join(',')})`;
}

/** Tilted photo frame (Ref-A style thick border). */
export const frame = (name: string, o: { x: number; y: number; w: number; h: number; rot?: number; border?: string; cls?: string; pos?: string }) =>
  `<div class="frame ${o.cls ?? ''}" style="left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px;--rot:${o.rot ?? 0}deg;transform:rotate(var(--rot));border-color:${o.border ?? 'var(--paper)'}">
    <img src="${img(name)}" alt="" draggable="false" style="object-position:${o.pos ?? '50% 50%'}"></div>`;

/** Torn-edged photo panel. */
export const tornPic = (name: string, o: { x: number; y: number; w: number; h: number; seed: number; rot?: number; cls?: string; pos?: string }) =>
  `<div class="torn-pic ${o.cls ?? ''}" style="left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px;transform:rotate(${o.rot ?? 0}deg);clip-path:${torn(o.seed, 1.4)}">
    <img src="${img(name)}" alt="" draggable="false" style="object-position:${o.pos ?? '50% 50%'}"></div>`;

/** A strip of masking tape. */
export const tapeStrip = (x: number, y: number, w = 150, rot = -8, cls = '') =>
  `<i class="tape-strip ${cls}" style="left:${x}px;top:${y}px;width:${w}px;transform:rotate(${rot}deg)"></i>`;

/** Marker (handwriting) accent text. */
export const mk = (text: string, style = '', cls = '') => `<div class="mk ${cls}" style="${style}">${text}</div>`;

/** Hand-drawn ellipse path (slightly open, overshooting like a real marker). */
export function markerCircle(cx: number, cy: number, rx: number, ry: number, seed = 1) {
  const r = rng(seed);
  const p: string[] = [];
  for (let i = 0; i <= 26; i++) {
    const a = -0.4 + (i / 24) * Math.PI * 2;
    const k = 1 + (r() - 0.5) * 0.06;
    p.push(`${(cx + Math.cos(a) * rx * k).toFixed(1)} ${(cy + Math.sin(a) * ry * k).toFixed(1)}`);
  }
  return `M${p.join(' L')}`;
}

/** Wobbly marker line between two points. */
export function markerLine(x1: number, y1: number, x2: number, y2: number, seed = 1, wob = 6) {
  const r = rng(seed);
  const n = 8;
  const p: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const nx = -(y2 - y1), ny = x2 - x1, L = Math.hypot(nx, ny) || 1;
    const o = i === 0 || i === n ? 0 : (r() - 0.5) * wob;
    p.push(`${(x1 + (x2 - x1) * t + (nx / L) * o).toFixed(1)} ${(y1 + (y2 - y1) * t + (ny / L) * o).toFixed(1)}`);
  }
  return `M${p.join(' L')}`;
}

/** Projective transform: maps a w×h box onto a photographed quad (TL,TR,BR,BL). */
export function quadMatrix(w: number, h: number, q: [number, number][]) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2;
  const sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (sx * dy2 - dx2 * sy) / den, hh = (dx1 * sy - sx * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + hh * x3, c = x0;
  const d = y1 - y0 + g * y1, e = y3 - y0 + hh * y3, f = y0;
  // unit square → quad, pre-scaled by the box size
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, hh / h, 0, 0, 1, 0, c, f, 0, 1];
  return `matrix3d(${m.map((v) => +v.toFixed(8)).join(',')})`;
}
