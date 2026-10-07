import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { CORRELATION, JCM, MULTI_RESPONSE, OUTCOMES, PREFERENCES, SAMPLE } from '../data/research';
import { ITEMS_PER_CONSTRUCT, SV_JS_ITEM_SUMS } from '../data/respondents';
import { actTag, sym } from '../components/kit';
import { markerLine, mk, pic, tapeStrip } from '../components/photo';
import { img } from '../assets';

// ── Sc10 · What cashiers value — real tags on string ─────────────────
export const value = defineScene({
  id: 'value', act: 'IV · Go deeper', title: 'What cashiers value', theme: 'day', enter: 'fade',
  build({ root, $, $$, tl, step }) {
    const P = PREFERENCES;
    // [image, left, width, rot of tag body, text box (relative to tag), value px]
    const tag = (cls: string, src: string, x: number, w: number, top: number, filter: string, body: { t: number; rot: number }, inner: string) => `
      <div class="abs ${cls}" style="left:${x}px;top:${top}px;width:${w}px;transform-origin:50% 0">
        <img src="${img(src)}" alt="" style="width:100%;display:block;filter:${filter} drop-shadow(10px 14px 6px rgba(0,0,0,.28))">
        <div style="position:absolute;left:0;right:0;top:${body.t}%;transform:rotate(${body.rot}deg);text-align:center;color:var(--ink)">${inner}</div>
      </div>`;
    const v = (val: string, label: string, sub: string, size = 150) => `
      <div class="d" style="font-size:${size}px">${val}</div>
      <div class="dx" style="font-size:30px;margin-top:8px">${label}</div>
      ${sub ? `<div class="mono" style="font-size:24px;margin-top:10px;line-height:1.25;padding:0 18px">${sub}</div>` : ''}`;
    root.innerHTML = `
      ${actTag('IV', 'Go deeper')}
      ${tag('s10-t', 'tag4', 70, 380, -40, '', { t: 42, rot: -3 }, v(P.authority.label, P.authority.short, 'routine issues,<br>clear guidelines', 170))}
      ${tag('s10-t', 'tag1', 480, 360, -70, '', { t: 44, rot: -5 }, v(P.ownership.label, P.ownership.short, 'more responsibility'))}
      ${tag('s10-t', 'tag3', 880, 420, 20, '', { t: 42, rot: 0 }, v(P.feedback.label, P.feedback.short, 'more regular', 140))}
      ${tag('s10-js', 'tag2', 1320, 360, 40, 'brightness(.32) saturate(.6)', { t: 47, rot: 7 }, `<div style="color:var(--cream);padding:0 30px">${v(OUTCOMES.JS.label, 'Job<br>satisfaction', '', 112).replace('font-size:30px', 'font-size:24px')}</div>`)}
      ${tag('s10-rot', 'tag2', 1640, 200, -40, 'grayscale(1) brightness(1.15)', { t: 48, rot: 7 }, `<div class="d" style="font-size:70px">${P.rotation.label}</div><div class="dx" style="font-size:16px;margin-top:4px">Rotation</div>`)}
      <div class="abs" style="left:110px;top:880px">
        <div class="dc" style="font-size:72px">What would cashiers value?</div>
        <div class="mono" style="font-size:26px;margin-top:10px">Mean agreement · 1–5 · n = ${SAMPLE.n}</div>
      </div>
      <div class="abs s10-x" style="left:1180px;top:925px;transform:rotate(-3deg)">${tapeStrip(0, 0, 340, 0)}<span class="mk" style="left:26px;top:-2px;font-size:46px;color:var(--ink)">unlimited freedom</span><i class="s10-strike"></i></div>
      <div class="abs s10-x" style="left:1540px;top:990px;transform:rotate(2deg)">${tapeStrip(0, 0, 330, 0)}<span class="mk" style="left:24px;top:-2px;font-size:46px;color:var(--ink)">random movement</span><i class="s10-strike"></i></div>
    `;
    $$<HTMLElement>('.s10-x .s10-strike').forEach((e) => Object.assign(e.style, { left: '-10px', width: '360px', right: 'auto', top: '24px' }));
    const tags = $$('.s10-t');
    gsap.set($$('.s10-x'), { opacity: 0, y: 20 });
    gsap.set($$('.s10-strike'), { scaleX: 0 });
    gsap.set([...tags, $('.s10-js'), $('.s10-rot')], { opacity: 0, y: -420, rotation: 22 });

    tl.to($$('.s10-x'), { opacity: 1, y: 0, duration: 0.4, stagger: 0.15 })
      .to($$('.s10-strike'), { scaleX: 1, duration: 0.35, stagger: 0.15, ease: 'power3.inOut' });
    step('"Not unlimited freedom. Not random movement."');
    tags.forEach((t, i) => {
      tl.to(t, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .to(t, { rotation: 0, duration: 1.3, ease: 'elastic.out(1, 0.4)' }, '<0.15');
      step(['4.32 · authority to resolve routine issues', '4.16 · responsibility & ownership', '4.04 · more regular feedback'][i]);
    });
    tl.to($('.s10-js'), { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to($('.s10-js'), { rotation: 0, duration: 1.3, ease: 'elastic.out(1, 0.4)' }, '<0.15')
      .to($('.s10-rot'), { opacity: 1, y: 0, rotation: 0, duration: 0.8, ease: 'power3.out' }, '<0.2');
    step('Job satisfaction only 2.84 (rotation 3.28 shown quietly)');
  },
});

// ── Sc11 · Association ≠ causation — evidence on graph paper ─────────
export const association = defineScene({
  id: 'association', act: 'IV · Go deeper', title: 'r ≈ .54 · association', theme: 'night',
  build({ root, $, $$, tl, step }) {
    // chart coordinates are inside the (rotated) paper element
    const L = 150, R = 930, B = 800, T = 90;
    const px = (v: number) => L + ((v - 1) / 4) * (R - L);
    const py = (v: number) => B - ((v - 1) / 4) * (B - T);
    const pts = SV_JS_ITEM_SUMS.map(([s, j]) => [s / ITEMS_PER_CONSTRUCT, j / ITEMS_PER_CONSTRUCT] as const);
    const groups = new Map<string, { x: number; y: number; n: number }>();
    for (const [x, y] of pts) {
      const k = `${x.toFixed(4)}|${y.toFixed(4)}`;
      const g = groups.get(k) ?? { x, y, n: 0 };
      g.n++;
      groups.set(k, g);
    }
    const mx = pts.reduce((a, p) => a + p[0], 0) / pts.length;
    const my = pts.reduce((a, p) => a + p[1], 0) / pts.length;
    let sxy = 0, sxx = 0;
    for (const [x, y] of pts) { sxy += (x - mx) * (y - my); sxx += (x - mx) ** 2; }
    const b = sxy / sxx, a = my - b * mx;
    const x0 = Math.min(...pts.map((p) => p[0])), x1 = Math.max(...pts.map((p) => p[0]));
    const dots = [...groups.values()].map((g) => `
      <g transform="translate(${px(g.x)} ${py(g.y)})"><g class="s11-pt">
        ${g.n > 1 ? '<circle r="27" fill="none" stroke="#0B0610" stroke-width="4" stroke-dasharray="6 5"/>' : ''}
        <circle r="17" fill="#FF7A1A" stroke="#FFFDF6" stroke-width="5"/>
      </g></g>`).join('');
    const dup = [...groups.values()].filter((g) => g.n > 1).map((g) =>
      `<div class="abs mk s11-dup" style="left:${px(g.x) + 22}px;top:${py(g.y) - 58}px;font-size:40px;color:var(--ink)">×${g.n}</div>`).join('');
    const fitD = markerLine(px(x0), py(a + b * x0), px(x1), py(a + b * x1), 5, 3);

    root.innerHTML = `
      ${actTag('IV', 'Go deeper')}
      <div class="graph s11-paper" style="left:110px;top:70px;width:1060px;height:950px;transform:rotate(-1.5deg)">
        <svg class="abs" width="1060" height="950" style="left:0;top:0">
          <g class="s11-axes" stroke="#0B0610" stroke-width="5">
            <line x1="${L}" y1="${B}" x2="${R + 20}" y2="${B}"/><line x1="${L}" y1="${B}" x2="${L}" y2="${T - 20}"/></g>
          <path class="s11-fit" d="${fitD}" fill="none" stroke="#E8253F" stroke-width="11" stroke-linecap="round"/>
          ${dots}
        </svg>
        ${dup}
        <div class="s11-ax">
        ${[1, 2, 3, 4, 5].map((v) => `<div class="abs mono" style="left:${px(v) - 30}px;width:60px;text-align:center;top:${B + 14}px;font-size:28px;color:var(--ink)">${v}</div>
          <div class="abs mono" style="left:${L - 54}px;top:${py(v) - 18}px;font-size:28px;color:var(--ink)">${v}</div>`).join('')}
        <div class="abs lbl" style="left:${L}px;top:${B + 60}px;font-size:26px;color:var(--ink)">${CORRELATION.x} <span style="opacity:.6">(score 1–5)</span></div>
        <div class="abs lbl" style="left:${L - 60}px;top:${T - 74}px;font-size:26px;color:var(--ink)">${CORRELATION.y} <span style="opacity:.6">(score 1–5)</span></div>
        <div class="abs mono" style="left:${L}px;top:${B + 104}px;font-size:22px;color:var(--ink);opacity:.75">Each sticker = one cashier · dashed ring = two cashiers, identical scores</div>
        </div>
      </div>
      ${tapeStrip(70, 60, 190, -30)}${tapeStrip(1040, 70, 190, 28)}${tapeStrip(90, 960, 170, 24)}

      <div class="abs s11-r" style="left:1230px;top:150px">
        <div class="d nowrap" style="font-size:250px"><span style="text-transform:none">r</span> <span style="font-size:.6em">${sym('approx')}</span> .54</div>
        <div class="mono" style="font-size:25px;margin-top:10px">${CORRELATION.caveat}</div>
        <div class="mono" style="font-size:26px;margin-top:6px;opacity:.75">Skill Variety ${sym('both')} Job Satisfaction</div>
      </div>
      <div class="ink-stamp s11-st" style="left:1215px;top:600px;font-size:80px;color:var(--magenta);mix-blend-mode:normal;line-height:1.02;transform:rotate(-6deg)">
        Association<br><span style="font-size:.9em">${sym('neq')}</span> causation</div>
    `;
    const fit = $<SVGPathElement>('.s11-fit');
    const len = fit.getTotalLength();
    gsap.set(fit, { attr: { 'stroke-dasharray': len, 'stroke-dashoffset': len } });
    gsap.set([$('.s11-axes'), $('.s11-ax')], { opacity: 0 });
    gsap.set($$('.s11-pt'), { opacity: 0, scale: 1.8 });
    gsap.set($$('.s11-dup'), { opacity: 0 });
    gsap.set($('.s11-r'), { opacity: 0, x: 40 });
    gsap.set($('.s11-st'), { opacity: 0, scale: 2 });

    tl.to([$('.s11-axes'), $('.s11-ax')], { opacity: 1, duration: 0.5 });
    step('Graph paper: skill variety × job satisfaction');
    tl.to($$('.s11-pt'), { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(3)', stagger: { each: 0.05, from: 'random' } })
      .to($$('.s11-dup'), { opacity: 1, duration: 0.3 });
    step('25 real respondents placed as stickers');
    tl.to(fit, { attr: { 'stroke-dashoffset': 0 }, duration: 0.9, ease: 'power2.inOut' })
      .to($('.s11-r'), { opacity: 1, x: 0, duration: 0.6 }, '-=0.4');
    step('Marker trend line · r ≈ .54 (exploratory)');
    tl.to($('.s11-st'), { opacity: 1, scale: 1, duration: 0.3, ease: 'power4.in' });
    step('Stamp: ASSOCIATION ≠ CAUSATION');
  },
});

/** Miniature of the real 25-point scatter (same data, same fit), for the evidence wall. */
function miniScatter(w: number, h: number) {
  const pts = SV_JS_ITEM_SUMS.map(([s, j]) => [s / ITEMS_PER_CONSTRUCT, j / ITEMS_PER_CONSTRUCT] as const);
  const px = (v: number) => 40 + ((v - 1) / 4) * (w - 70);
  const py = (v: number) => h - 30 - ((v - 1) / 4) * (h - 60);
  const mx = pts.reduce((a, p) => a + p[0], 0) / pts.length, my = pts.reduce((a, p) => a + p[1], 0) / pts.length;
  let sxy = 0, sxx = 0;
  for (const [x, y] of pts) { sxy += (x - mx) * (y - my); sxx += (x - mx) ** 2; }
  const b = sxy / sxx, a = my - b * mx;
  const x0 = Math.min(...pts.map((p) => p[0])), x1 = Math.max(...pts.map((p) => p[0]));
  return `<svg class="abs" width="${w}" height="${h}"><path d="M${px(1)} ${py(1)}H${px(5)}M${px(1)} ${py(1)}V${py(5)}" stroke="#0B0610" stroke-width="3" fill="none"/>
    <path d="${markerLine(px(x0), py(a + b * x0), px(x1), py(a + b * x1), 7, 2)}" stroke="#E8253F" stroke-width="8" fill="none" stroke-linecap="round"/>
    ${pts.map(([x, y]) => `<circle cx="${px(x).toFixed(1)}" cy="${py(y).toFixed(1)}" r="9" fill="#FF7A1A" stroke="#fff" stroke-width="3"/>`).join('')}</svg>`;
}

// ── Sc12 · Managerial signal — the evidence wall ─────────────────────
export const signal = defineScene({
  id: 'signal', act: 'IV · Go deeper', title: 'Managerial signal', theme: 'night', submission: 3,
  build({ root, $, $$, tl, step }) {
    const polaroid = (cls: string, x: number, y: number, rot: number, photo: string, cap: string) => `
      <div class="abs s12-c ${cls}" style="left:${x}px;top:${y}px;width:500px;height:560px;background:var(--paper);padding:22px 22px 0;transform:rotate(${rot}deg);box-shadow:14px 18px 0 rgba(0,0,0,.55)">
        <div style="position:relative;width:456px;height:360px;overflow:hidden">${photo}</div>
        <div style="color:var(--ink);padding:14px 4px">${cap}</div>
        <i class="pin" style="left:235px;top:-14px"></i>
      </div>`;
    root.innerHTML = `
      ${actTag('IV', 'Go deeper')}
      <div class="abs dc" style="left:110px;top:95px;font-size:90px">Three signals</div>
      <svg class="mk-svg s12-str" width="1920" height="1080"><path d="M 365 245 Q 650 330 955 225 Q 1250 320 1550 245" fill="none" stroke="#E8253F" stroke-width="5"/></svg>
      ${polaroid('s12-a', 115, 240, -4, `<div class="full" style="background:var(--magenta)"></div>${pic('a04_cut', 'left:-120px;top:10px;width:640px')}<div class="abs" style="left:0;top:0;width:110px;height:360px;background:var(--magenta)"></div><div class="abs" style="right:0;top:0;width:110px;height:360px;background:var(--magenta)"></div>`,
        `<div class="lbl" style="font-size:22px">Lowest JCM score</div><div style="display:flex;align-items:baseline;gap:16px"><span class="d" style="font-size:110px">${JCM.SV.label}</span><span class="dx" style="font-size:28px">${JCM.SV.name}</span></div>`)}
      ${polaroid('s12-b', 705, 225, 2, `<div class="full" style="background:#cdbfa8"></div>${pic('tag4', 'left:40px;top:-150px;width:180px;transform:rotate(-4deg)')}
          ${mk(`most-selected:<br>learn new skills<br>&amp; ownership<br>(${MULTI_RESPONSE.learnSkills.count} of ${MULTI_RESPONSE.of} each)*`, 'left:230px;top:50px;font-size:38px;color:var(--ink);white-space:normal;transform:rotate(-4deg);line-height:1.05')}`,
        `<div class="lbl" style="font-size:22px">What cashiers value</div><div style="display:flex;align-items:baseline;gap:10px"><span class="d" style="font-size:70px">${PREFERENCES.authority.label}</span><span class="dx" style="font-size:18px">authority</span><span class="d" style="font-size:56px">${PREFERENCES.ownership.label}</span><span class="dx" style="font-size:18px">ownership</span></div><div class="mono" style="font-size:18px;opacity:.7">*${MULTI_RESPONSE.caveat.toLowerCase()}</div>`)}
      ${polaroid('s12-c3', 1295, 245, 4, `<div class="graph full" style="box-shadow:none"></div>${miniScatter(456, 360)}`,
        `<div class="lbl" style="font-size:22px">Strongest observed association</div><div style="display:flex;align-items:baseline;gap:14px"><span class="d nowrap" style="font-size:100px"><span style="text-transform:none">r</span> ${sym('approx')} .54</span><span class="dx" style="font-size:22px">variety ${sym('both')} satisfaction</span></div>`)}
      <div class="abs s12-ticket" style="left:360px;top:600px;width:1200px;height:330px;background:var(--yellow);color:var(--ink);padding:44px 60px;
        -webkit-mask:radial-gradient(circle 26px at 0 50%,#0000 98%,#000) left/51% 100% no-repeat,radial-gradient(circle 26px at 100% 50%,#0000 98%,#000) right/51% 100% no-repeat;
        mask:radial-gradient(circle 26px at 0 50%,#0000 98%,#000) left/51% 100% no-repeat,radial-gradient(circle 26px at 100% 50%,#0000 98%,#000) right/51% 100% no-repeat">
        <div class="lbl">Lowest score + employee preference + strongest association</div>
        <div class="d nowrap" style="font-size:128px;margin-top:18px">Managerial signal</div>
        <div class="mono" style="font-size:30px;margin-top:10px;font-weight:700">— not proof. A reason to redesign carefully and test.</div>
      </div>
    `;
    const [a, b, c] = [$('.s12-a'), $('.s12-b'), $('.s12-c3')];
    const str = $<SVGPathElement>('.s12-str path');
    const SL = str.getTotalLength();
    gsap.set(str, { attr: { 'stroke-dasharray': SL, 'stroke-dashoffset': SL } });
    gsap.set(a, { x: -800, rotation: -14 });
    gsap.set(b, { y: 900, rotation: 10 });
    gsap.set(c, { x: 800, rotation: 14 });
    gsap.set($('.s12-ticket'), { opacity: 0, scale: 0.6, rotation: -4 });
    step('"Three signals…"');
    tl.to(a, { x: 0, rotation: -4, duration: 0.8, ease: 'power3.out' });
    step('Lowest JCM score: skill variety 2.55');
    tl.to(b, { y: 0, rotation: 2, duration: 0.8, ease: 'power3.out' });
    step('What cashiers value: authority 4.32 · ownership 4.16');
    tl.to(c, { x: 0, rotation: 4, duration: 0.8, ease: 'power3.out' })
      .to(str, { attr: { 'stroke-dashoffset': 0 }, duration: 0.8, ease: 'power2.inOut' });
    step('Strongest observed association r ≈ .54 · red string connects them');
    tl.to(str, { opacity: 0, duration: 0.3 })
      .to(a, { x: 420, y: -110, scale: 0.5, rotation: -10, duration: 0.9, ease: 'power3.inOut' }, '<')
      .to(b, { x: 0, y: -125, scale: 0.5, rotation: 0, duration: 0.9, ease: 'power3.inOut' }, '<')
      .to(c, { x: -420, y: -110, scale: 0.5, rotation: 10, duration: 0.9, ease: 'power3.inOut' }, '<')
      .to($('.s12-ticket'), { opacity: 1, scale: 1, rotation: -1.5, duration: 0.7, ease: 'back.out(1.5)' }, '-=0.35');
    step('★ Converge → MANAGERIAL SIGNAL (not proof)');
  },
});
