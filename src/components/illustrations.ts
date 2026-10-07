// Original flat illustrations (inline SVG). No photos, no brand marks.
import type { DimKey } from '../data/research';

const INK = '#0B0610';

/** The five JCM characteristics as checkout "products". viewBox 0 0 240 240. */
export const product: Record<DimKey, string> = {
  // Skill Variety — a basket of many different items
  SV: `<svg viewBox="0 0 240 240" class="product">
    <rect x="58" y="44" width="34" height="78" rx="6" fill="#3D6BFF" stroke="${INK}" stroke-width="6"/>
    <rect x="64" y="30" width="22" height="18" fill="#F4ECDD" stroke="${INK}" stroke-width="6"/>
    <rect x="96" y="70" width="58" height="52" fill="#FFD23F" stroke="${INK}" stroke-width="6"/>
    <circle cx="178" cy="96" r="26" fill="#FF2E88" stroke="${INK}" stroke-width="6"/>
    <path d="M178 70c4-14 14-18 22-16" stroke="${INK}" stroke-width="6" fill="none"/>
    <path d="M20 118h200l-22 96H42z" fill="#FF7A1A" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M60 140v52M100 140v52M140 140v52M180 140v52" stroke="${INK}" stroke-width="6"/>
  </svg>`,
  // Task Identity — a complete receipt, start to end
  TI: `<svg viewBox="0 0 240 240" class="product">
    <path d="M62 18h116v190l-14-12-15 12-14-12-15 12-14-12-15 12-14-12-15 12z" fill="#FBF8F1" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M82 50h76M82 76h56M82 100h70M82 124h48" stroke="${INK}" stroke-width="7"/>
    <circle cx="146" cy="160" r="22" fill="#3D6BFF" stroke="${INK}" stroke-width="6"/>
    <path d="M135 160l8 8 14-16" stroke="#FBF8F1" stroke-width="6" fill="none"/>
  </svg>`,
  // Task Significance — a customer's bag with a heart tag
  TS: `<svg viewBox="0 0 240 240" class="product">
    <path d="M86 82c0-30 14-46 34-46s34 16 34 46" fill="none" stroke="${INK}" stroke-width="8"/>
    <path d="M44 82h152l-12 134H56z" fill="#FFD23F" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M120 186c-30-18-42-34-34-50 6-12 24-12 34 2 10-14 28-14 34-2 8 16-4 32-34 50z" fill="#FF2E88" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  </svg>`,
  // Autonomy — a key
  AU: `<svg viewBox="0 0 240 240" class="product">
    <circle cx="76" cy="120" r="46" fill="#FF7A1A" stroke="${INK}" stroke-width="6"/>
    <circle cx="76" cy="120" r="16" fill="#1E0B2B" stroke="${INK}" stroke-width="6"/>
    <path d="M118 108h96v24h-18v26h-22v-26h-14v18h-22v-18h-20z" fill="#FFD23F" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  </svg>`,
  // Feedback — a scanner emitting a signal
  FB: `<svg viewBox="0 0 240 240" class="product">
    <path d="M34 70h110l20 34-58 18 -18 86H52l14-76H34z" fill="#3D6BFF" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <rect x="44" y="82" width="70" height="20" fill="#FF2E88" stroke="${INK}" stroke-width="5"/>
    <path d="M178 80c14 12 14 36 0 48M196 64c26 22 26 58 0 80M214 48c36 32 36 82 0 112" fill="none" stroke="#FFD23F" stroke-width="8" stroke-linecap="round"/>
  </svg>`,
};

/** Top-down checkout counter. viewBox 0 0 400 400. */
export const counter = (cls = '') => `<svg viewBox="0 0 400 400" class="counter ${cls}">
  <rect x="40" y="70" width="320" height="260" rx="22" fill="#2B1140" stroke="${INK}" stroke-width="8"/>
  <rect x="70" y="100" width="150" height="200" rx="8" fill="#14081C" stroke="${INK}" stroke-width="6"/>
  <path d="M70 130h150M70 160h150M70 190h150M70 220h150M70 250h150M70 280h150" stroke="#3a2450" stroke-width="6"/>
  <rect x="236" y="104" width="100" height="64" rx="6" fill="#FFD23F" stroke="${INK}" stroke-width="6"/>
  <path d="M250 124h70M250 146h44" stroke="${INK}" stroke-width="6"/>
  <rect x="244" y="190" width="84" height="70" rx="6" fill="#3D6BFF" stroke="${INK}" stroke-width="6"/>
  <path d="M252 225h68" stroke="#FF2E88" stroke-width="6"/>
  <rect x="244" y="272" width="84" height="38" rx="5" fill="#F4ECDD" stroke="${INK}" stroke-width="6"/>
  <circle cx="290" cy="368" r="26" fill="#FF7A1A" stroke="${INK}" stroke-width="7"/>
</svg>`;

export const clock = `<svg viewBox="0 0 100 100" class="clock"><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="10"/><path d="M50 26v26l16 10" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round"/></svg>`;
