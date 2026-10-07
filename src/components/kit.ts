// Small HTML/SVG building blocks shared by scenes. All return strings so
// scenes can compose markup declaratively; every text stays real text.

/** Seeded PRNG so barcodes and layouts are identical on every run. */
export function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** Glyphs missing from the bundled fonts, drawn as SVG (inherit colour/size). */
export function sym(name: 'neq' | 'arrow' | 'check' | 'approx' | 'both' | 'up' | 'cross', cls = '') {
  const p: Record<string, string> = {
    neq: '<path d="M14 38H86M14 62H86M66 10 34 90"/>',
    arrow: '<path d="M8 50H88M60 22l28 28-28 28"/>',
    check: '<path d="M12 52l26 26 50-56"/>',
    approx: '<path d="M12 40c12-14 24-14 38 0s26 14 38 0M12 66c12-14 24-14 38 0s26 14 38 0"/>',
    both: '<path d="M8 50H92M30 26 8 50l22 24M70 26l22 24-22 24"/>',
    up: '<path d="M50 92V10M22 38 50 10l28 28"/>',
    cross: '<path d="M18 18 82 82M82 18 18 82"/>',
  };
  return `<svg class="sym ${cls}" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">${p[name]}</svg>`;
}

/** Mask-reveal line: animate `.in` (yPercent 110 → 0). */
export const line = (html: string, cls = '') => `<span class="mask ${cls}"><span class="in">${html}</span></span>`;

export function barcode(seed: number, w = 300, h = 80, color = 'currentColor') {
  const r = rng(seed);
  let x = 0;
  let bars = '';
  while (x < w - 6) {
    const bw = 2 + Math.floor(r() * 4) * 2;
    if (r() > 0.35) bars += `<rect x="${x}" y="0" width="${bw}" height="${h}"/>`;
    x += bw + 2 + Math.floor(r() * 3) * 2;
  }
  return `<svg class="barcode" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="${color}" aria-hidden="true">${bars}</svg>`;
}

export const actTag = (n: string, name: string) => `<div class="act-tag"><b>${n}</b> ${name}</div>`;

export function receipt(body: string, opts: { cls?: string; style?: string } = {}) {
  return `<div class="receipt ${opts.cls ?? ''}" style="${opts.style ?? ''}"><div class="r-body">${body}</div></div>`;
}

export const rLine = (left: string, right = sym('check'), cls = '') =>
  `<div class="r-line ${cls}"><span>${left}</span><i></i><span>${right}</span></div>`;

export function priceTag(o: { value: string; label: string; sub?: string; color: string; ink?: string; cls?: string; style?: string }) {
  return `<div class="tag ${o.cls ?? ''}" style="--tag:${o.color};--tag-ink:${o.ink ?? 'var(--ink)'};${o.style ?? ''}">
    <span class="tag-hole"></span>
    <div class="tag-value">${o.value}</div>
    <div class="tag-label">${o.label}</div>
    ${o.sub ? `<div class="tag-sub">${o.sub}</div>` : ''}
  </div>`;
}

export const stamp = (text: string, cls = '', style = '') => `<div class="stamp ${cls}" style="${style}">${text}</div>`;

export const tape = (text: string, cls = '', style = '') => `<div class="tape ${cls}" style="${style}">${text}</div>`;
