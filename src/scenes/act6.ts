import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { JCM, REDESIGN } from '../data/research';
import { actTag, stamp, sym, tape } from '../components/kit';
import { clock } from '../components/illustrations';
import { markerLine, mk, pic, plate, tapeStrip, torn, tornPic } from '../components/photo';
import { img } from '../assets';

const MOD_COLORS = ['var(--magenta)', 'var(--orange)', 'var(--violet)', 'var(--blue)'];
const proposed = () => tape('Proposed redesign', '', 'right:64px;top:40px;transform:rotate(2deg);z-index:41');
const header = (n: string, name: string, target: string, ink = false) => `
  <div class="abs" style="left:110px;top:95px;z-index:20;${ink ? 'color:var(--ink)' : ''}">
    <div class="dc" style="font-size:88px;text-shadow:${ink ? 'none' : '0 6px 0 rgba(0,0,0,.4)'}">${n} · ${name}</div>
    <div class="mono" style="font-size:28px;margin-top:10px">TARGET ${sym('arrow')} <b>${target}</b></div>
  </div>`;
const drawable = (els: SVGPathElement[]) => els.forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { attr: { 'stroke-dasharray': L, 'stroke-dashoffset': L } }); });

// ── Sc14 · Enriched checkout cashier: the lane opens ─────────────────
export const enriched = defineScene({
  id: 'enriched', act: 'VI · Redesign', title: 'Enriched Checkout Cashier', theme: 'night', enter: 'fade',
  build({ root, $, $$, tl, step }) {
    const pos = [[100, 260], [1380, 260], [100, 640], [1380, 640]];
    const tips = [[600, 520], [1320, 520], [610, 860], [1300, 860]];
    root.innerHTML = `
      ${plate('a03', 's14-world', 'filter:brightness(.55) saturate(1.1)')}
      ${pic('a04_sticker', 'left:610px;top:440px;width:700px', 's14-man')}
      <div class="barrier l s14-bl" style="left:0;width:600px;background:var(--plum)"></div>
      <div class="barrier r s14-br" style="left:1320px;width:600px;background:var(--plum)"></div>
      ${actTag('VI', 'Redesign')}${proposed()}
      <div class="abs dc" style="left:0;right:0;top:110px;text-align:center;font-size:110px;z-index:20;text-shadow:0 8px 0 rgba(0,0,0,.45)">${REDESIGN.name}</div>
      <svg class="mk-svg s14-arrows" width="1920" height="1080" style="z-index:25">
        ${pos.map(([x, y], i) => `<path d="${markerLine(x < 900 ? x + 440 : x, y + 120, tips[i][0], tips[i][1], i + 3, 10)}" stroke="${['#FF2E88', '#FF7A1A', '#8A4DFF', '#3D6BFF'][i]}" stroke-width="9"/>`).join('')}
      </svg>
      ${REDESIGN.components.map((c, i) => `
        <div class="paper s14-m" style="left:${pos[i][0]}px;top:${pos[i][1]}px;width:440px;height:240px;padding:24px 28px;transform:rotate(${[-3, 2.5, 2, -2.5][i]}deg);z-index:22">
          <i style="position:absolute;left:0;top:0;bottom:0;width:18px;background:${MOD_COLORS[i]}"></i>
          <div class="d" style="font-size:96px;color:${MOD_COLORS[i]};-webkit-text-stroke:3px var(--ink);margin-left:12px">${c.n}</div>
          <div class="dx" style="font-size:30px;line-height:1.08;margin:6px 0 0 12px">${c.name}</div>
          <div class="mono" style="font-size:24px;margin:8px 0 0 12px">${sym('arrow')} ${c.target}</div>
          ${tapeStrip(150, -24, 140, -4)}
        </div>`).join('')}
      <div class="abs s14-keep mono" style="left:0;right:0;top:1000px;text-align:center;font-size:28px;z-index:22;background:rgba(11,6,16,.82);padding:12px 0">
        Keeps what works: <b>${JCM.TI.name} <span class="c-blue">${sym('check')}</span></b> · <b>${JCM.TS.name} <span class="c-blue">${sym('check')}</span></b> preserved — he still owns the whole transaction</div>
    `;
    gsap.set($('.s14-world'), { scale: 1.12 });
    gsap.set($$('.s14-m'), { opacity: 0, scale: 1.6 });
    drawable($$<SVGPathElement>('.s14-arrows path'));
    gsap.set($('.s14-keep'), { opacity: 0 });
    tl.from($('.s14-man'), { opacity: 0, y: 60, duration: 0.7 });
    step('The proposed role, still in the narrow lane: Enriched Checkout Cashier');
    tl.to($('.s14-bl'), { xPercent: -101, duration: 1.1, ease: 'power3.inOut' })
      .to($('.s14-br'), { xPercent: 101, duration: 1.1, ease: 'power3.inOut' }, '<')
      .to($('.s14-world'), { scale: 1, duration: 1.4, ease: 'power3.out' }, '<')
      .to($$('.s14-m'), { opacity: 1, scale: 1, duration: 0.35, ease: 'power4.in', stagger: 0.16 }, '-=0.5')
      .to($$('.s14-arrows path'), { attr: { 'stroke-dashoffset': 0 }, duration: 0.4, stagger: 0.12 }, '-=0.3');
    step('★ The lane opens: four components land around him');
    tl.to($('.s14-keep'), { opacity: 1, duration: 0.5 });
    step('Keeps what works: identity & significance');
  },
});

// ── Sc15 · 01 Structured micro-rotation: a marker map of short loops ─
export const rotation = defineScene({
  id: 'rotation', act: 'VI · Redesign', title: '01 · Micro-rotation', theme: 'day',
  build({ root, $, $$, tl, step }) {
    const home = [430, 600];
    const notes = [
      { x: 760, y: 270, w: 340, t: REDESIGN.rotation[0], photo: 'm03', rot: -3 },
      { x: 1170, y: 220, w: 360, t: REDESIGN.rotation[1], photo: 'a10_cashier', rot: 2.5 },
      { x: 1560, y: 330, w: 300, t: REDESIGN.rotation[2], photo: '', rot: -2 },
      { x: 1220, y: 640, w: 340, t: REDESIGN.rotation[3], photo: '', rot: 2 },
      { x: 780, y: 610, w: 340, t: REDESIGN.rotation[4], photo: 'm22', rot: -2 },
    ];
    const loop = (tx: number, ty: number, i: number) => {
      const [hx, hy] = home;
      const mx = (hx + tx) / 2, my = (hy + ty) / 2, nx = -(ty - hy) * 0.18, ny = (tx - hx) * 0.18;
      return `M${hx} ${hy} Q${mx + nx} ${my + ny} ${tx} ${ty} Q${mx - nx} ${my - ny} ${hx + 14 * (i - 2)} ${hy + 10}`;
    };
    root.innerHTML = `
      ${actTag('VI', 'Redesign')}${proposed()}
      ${header('01', 'Structured micro-rotation', JCM.SV.name, true)}
      <svg class="mk-svg s15-loops" width="1920" height="1080">
        ${notes.map((n, i) => `<path d="${loop(n.x + n.w / 2, n.y + 40, i)}" stroke="#FF2E88" stroke-width="7" stroke-dasharray="0"/>`).join('')}
        <path class="s15-wander" d="M 380 900 C 200 700, 900 980, 700 520 S 1500 1000, 1300 560 S 1850 380, 1700 980 S 600 1060, 900 860" stroke="#0B0610" stroke-width="5" opacity=".55"/>
      </svg>
      ${pic('a04_sticker', 'left:120px;top:380px;width:600px', 's15-man')}
      <div class="abs lbl s15-still" style="left:150px;top:840px;font-size:30px;color:var(--cream);background:var(--ink);padding:8px 16px;z-index:5">Still primarily a cashier</div>
      ${notes.map((n) => `
        <div class="paper s15-n" style="left:${n.x}px;top:${n.y}px;width:${n.w}px;padding:${n.photo ? '14px' : '22px'};transform:rotate(${n.rot}deg)">
          ${n.photo ? `<img src="${img(n.photo)}" alt="" style="width:100%;height:${n.photo === 'a10_cashier' ? 250 : 170}px;object-fit:cover;display:block;object-position:50% 30%">` : ''}
          <div class="dx" style="font-size:26px;line-height:1.08;padding:${n.photo ? '12px 6px 4px' : '0'};border-left:${n.photo ? '0' : '12px solid var(--magenta)'};padding-left:${n.photo ? '6px' : '16px'}">${n.t}</div>
          ${tapeStrip(n.w / 2 - 60, -22, 120, n.rot * 2)}
        </div>`).join('')}
      ${stamp('Not random movement around the store', 's15-st', 'left:0;right:0;margin:auto;width:max-content;top:915px;font-size:50px;transform:rotate(-2deg);background:rgba(244,236,221,.9)')}
      <div class="foot s15-f" style="color:var(--ink);bottom:24px">Checkout-adjacent only · subject to training &amp; staffing · checkout coverage protected</div>
    `;
    const loops = $$<SVGPathElement>('.s15-loops path:not(.s15-wander)');
    drawable([...loops, $<SVGPathElement>('.s15-wander')]);
    gsap.set($$('.s15-n'), { opacity: 0, scale: 0.8 });
    gsap.set([$('.s15-st'), $('.s15-f')], { opacity: 0 });
    gsap.set($('.s15-st'), { scale: 1.8 });
    tl.from($('.s15-man'), { x: -80, opacity: 0, duration: 0.7 })
      .from($('.s15-still'), { opacity: 0, y: 20, duration: 0.5 }, '<0.2');
    step('Still primarily a cashier');
    loops.forEach((l, i) => {
      tl.to(l, { attr: { 'stroke-dashoffset': 0 }, duration: 0.55, ease: 'power2.inOut' }, i ? '<0.16' : '>')
        .to($$('.s15-n')[i], { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, '<0.25');
    });
    step('Five checkout-adjacent loops: out and back to the counter');
    tl.to($('.s15-wander'), { attr: { 'stroke-dashoffset': 0 }, duration: 0.8, ease: 'none' })
      .to($('.s15-st'), { opacity: 1, scale: 1, duration: 0.3, ease: 'power4.in' })
      .to($('.s15-f'), { opacity: 0.85, duration: 0.4 });
    step('A wandering path gets stamped: NOT RANDOM MOVEMENT');
    void mk; void torn;
  },
});

// ── Sc16 · 02 Controlled decision authority ──────────────────────────
export const authority = defineScene({
  id: 'authority', act: 'VI · Redesign', title: '02 · Controlled authority', theme: 'night', submission: 3,
  build({ root, $, $$, tl, step }) {
    const node = (x: number, y: number, w: number, label: string, bg: string, ink = 'var(--ink)', cls = '', rot = 0) =>
      `<div class="abs fl-n ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:84px;background:${bg};color:${ink};display:flex;align-items:center;justify-content:center;gap:10px;text-align:center;transform:rotate(${rot}deg);box-shadow:6px 8px 0 rgba(0,0,0,.55);background-image:var(--grain)"><span class="dx" style="font-size:26px;line-height:1">${label}</span></div>`;
    const arrow = (x: number, y: number, cls: string) => `<div class="abs ${cls}" style="left:${x}px;top:${y + 26}px;font-size:32px;color:var(--yellow)">${sym('arrow')}</div>`;
    const oldN = ['Customer', 'Cashier', `<span style="width:30px;height:30px;display:inline-block">${clock}</span> Wait`, 'Supervisor', 'Decision', 'Cashier', 'Customer'];
    const oldBg = ['var(--cream)', 'var(--cream)', 'var(--orange)', 'var(--violet)', 'var(--violet)', 'var(--cream)', 'var(--cream)'];
    const ox = (i: number) => 110 + i * 258;
    root.innerHTML = `
      ${plate('a05', '', 'filter:brightness(.4) saturate(.8)')}
      <div class="full" style="background:linear-gradient(180deg,rgba(11,6,16,.6),rgba(11,6,16,.85))"></div>
      ${actTag('VI', 'Redesign')}${proposed()}
      ${header('02', 'Controlled decision authority', JCM.AU.name)}
      <div class="full s16-dia">
        <div class="abs lbl c-org s16-lo" style="left:110px;top:240px;font-size:26px">Current · routine issues escalate</div>
        ${oldN.map((t, i) => node(ox(i), 285, 220, t, oldBg[i], i === 3 || i === 4 ? 'var(--cream)' : 'var(--ink)', 's16-o', ((i * 5) % 3) - 1)).join('')}
        ${oldN.slice(1).map((_, i) => arrow(ox(i) + 222, 285, 's16-oa')).join('')}
        <div class="abs mono s16-q" style="left:110px;top:388px;font-size:24px;display:flex;align-items:center;gap:10px">QUEUE ${Array.from({ length: 10 }, (_, i) => `<i class="q-dot" data-i="${i}"></i>`).join('')}</div>

        <div class="abs lbl c-yel s16-lp" style="left:110px;top:470px;font-size:26px">Proposed · predefined low-risk routine issues</div>
        ${node(110, 515, 220, 'Customer', 'var(--cream)', 'var(--ink)', 's16-p', -1)}
        ${arrow(332, 515, 's16-pa')}
        ${node(368, 515, 300, 'Trained cashier', 'var(--yellow)', 'var(--ink)', 's16-p', 1)}
        ${arrow(670, 515, 's16-pa')}
        ${node(706, 515, 260, `Resolved <span class="c-blue">${sym('check')}</span>`, 'var(--cream)', 'var(--ink)', 's16-p', -1)}

        <div class="abs lbl s16-lh" style="left:110px;top:690px;font-size:26px;color:#b892ff">High-risk exceptions · supervisor retains</div>
        <div class="abs s16-h" style="left:500px;top:599px;width:6px;height:136px;background:var(--violet)"></div>
        ${node(368, 735, 300, 'Trained cashier', 'var(--yellow)', 'var(--ink)', 's16-h', 1)}
        ${arrow(670, 735, 's16-h')}
        ${node(706, 735, 260, 'Supervisor', 'var(--violet)', 'var(--cream)', 's16-h', -1)}
        <div class="abs s16-chips" style="left:1010px;top:560px;width:500px;display:flex;flex-direction:column;gap:10px">
          ${REDESIGN.supervisorRetains.map((r, i) => `<div class="s16-chip mono paper" style="position:relative;padding:8px 16px;font-size:25px;font-weight:700;transform:rotate(${((i * 3) % 3) - 1}deg);box-shadow:5px 6px 0 rgba(0,0,0,.5);border-left:10px solid var(--violet)">${r}</div>`).join('')}
        </div>
        ${tornPic('a10_super', { x: 1560, y: 520, w: 300, h: 400, seed: 31, rot: 2, cls: 's16-h s16-sup', pos: '50% 20%' })}
        <div class="abs s16-tok" style="left:${ox(0) + 90}px;top:258px;width:40px;height:40px;border-radius:50%;background:var(--magenta);border:4px solid var(--ink);color:var(--ink);font:900 26px/32px var(--display);text-align:center">!</div>
      </div>
      <div class="foot">Proposed design principle — exact permissions &amp; any thresholds would be defined by management.</div>

      <div class="full s16-ov1" style="background:rgba(11,6,16,.93);display:flex;flex-direction:column;justify-content:center;padding-left:150px">
        <div class="d c-yel" style="font-size:200px">Controlled autonomy</div>
        <div class="d c-mag" style="font-size:150px;margin:10px 0 0 10px">${sym('neq')}</div>
        <div class="d" style="font-size:200px;margin-top:10px">Unrestricted autonomy</div>
      </div>
      <div class="full s16-ov2">
        ${plate('a09', '', 'filter:brightness(.35)')}
        ${actTag('VI', 'Redesign')}
        <div class="abs" style="left:200px;right:200px;top:300px;height:8px;background:var(--cream);opacity:.6"></div>
        <div class="abs" style="left:110px;top:200px;width:300px;text-align:center"><div class="lbl" style="font-size:26px">Customer problem</div></div>
        <div class="abs" style="left:186px;top:282px;width:44px;height:44px;border-radius:50%;background:var(--magenta);border:4px solid var(--ink)"></div>
        <div class="abs" style="left:560px;top:200px;width:360px;text-align:center"><div class="lbl" style="font-size:26px;color:var(--yellow)">Trained cashier</div></div>
        <div class="abs" style="left:1450px;top:200px;width:320px;text-align:center"><div class="lbl" style="font-size:26px;color:#b892ff">Supervisor</div></div>
        <div class="abs s16-dec" style="left:1460px;top:250px;width:280px;height:190px;border:10px solid var(--yellow);box-shadow:10px 12px 0 rgba(0,0,0,.6);background:url(${img('a09')}) 22% 58% / 330% auto"></div>
        <div class="abs d s16-sent" style="left:150px;top:500px;font-size:140px;width:1700px">Move appropriate decisions <span class="c-yel">closer to where the customer problem occurs.</span></div>
      </div>
    `;
    const tok = $('.s16-tok');
    gsap.set($$('.s16-o, .s16-oa, .s16-p, .s16-pa, .s16-h, .s16-chip, .s16-lo, .s16-lp, .s16-lh, .s16-q'), { opacity: 0 });
    gsap.set($$('.q-dot'), { scale: (i: number) => (i < 3 ? 1 : 0) });
    gsap.set([$('.s16-ov1'), $('.s16-ov2')], { opacity: 0 });
    gsap.set(tok, { scale: 0 });
    gsap.set($('.s16-sent'), { opacity: 0, y: 40 });

    tl.to(tok, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
    step('A routine customer problem arrives (the queue is real)');

    tl.to([$('.s16-lo'), $('.s16-q')], { opacity: 1, duration: 0.3 });
    $$('.s16-o').forEach((n, i) => {
      tl.to(n, { opacity: 1, duration: 0.2 }, i ? '>-0.05' : '>');
      if (i) tl.to($$('.s16-oa')[i - 1], { opacity: 1, duration: 0.15 }, '<');
      tl.to(tok, { x: ox(i) - ox(0), duration: 0.25, ease: 'power2.inOut' }, '<');
      if (i === 2) tl.to($$('.q-dot'), { scale: 1, duration: 0.3, stagger: 0.05 }, '<').to({}, { duration: 0.35 });
    });
    step('CURRENT: customer → cashier → wait → supervisor → decision → cashier → customer');

    tl.to($$('.s16-o, .s16-oa, .s16-lo'), { opacity: 0.22, duration: 0.4 })
      .to(tok, { x: 0, y: 230, duration: 0.01 })
      .to($('.s16-lp'), { opacity: 1, duration: 0.3 });
    $$('.s16-p').forEach((n, i) => {
      tl.to(n, { opacity: 1, duration: 0.25 });
      if (i) tl.to($$('.s16-pa')[i - 1], { opacity: 1, duration: 0.15 }, '<');
      tl.to(tok, { x: [0, 298, 616][i], duration: 0.3, ease: 'power2.inOut' }, '<');
    });
    tl.to($$('.q-dot'), { scale: (i: number) => (i < 2 ? 1 : 0), duration: 0.3, stagger: { each: 0.03, from: 'end' } }, '<');
    step('PROPOSED: customer → trained cashier → resolved (queue shrinks)');

    tl.to($('.s16-lh'), { opacity: 1, duration: 0.3 })
      .to($$('.s16-h'), { opacity: 1, duration: 0.3, stagger: 0.1 })
      .to($$('.s16-chip'), { opacity: 1, duration: 0.3, stagger: 0.07 }, '-=0.1');
    step('High-risk exceptions stay with the supervisor');

    tl.to($('.s16-ov1'), { opacity: 1, duration: 0.5 });
    step('CONTROLLED AUTONOMY ≠ UNRESTRICTED AUTONOMY');

    tl.to($('.s16-ov2'), { opacity: 1, duration: 0.5 })
      .fromTo($('.s16-dec'), { x: 0, rotation: 4 }, { x: -820, rotation: -5, duration: 1.1, ease: 'power3.inOut' })
      .to($('.s16-sent'), { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
    step('The stamp itself slides to the cashier: "closer to where the problem occurs."');
  },
});

// ── Sc17 · 03 Enlargement vs enrichment — pile vs stack ──────────────
export const ownership = defineScene({
  id: 'ownership', act: 'VI · Redesign', title: '03 · Enlargement vs enrichment', theme: 'day',
  build({ root, $, $$, tl, step }) {
    const pile = [['box', 170], ['obj_sv', 180], ['obj_ts', 115], ['box', 160], ['obj_sv', 165], ['obj_ts', 105]] as const;
    let px = 100;
    const pileHtml = pile.map(([n, w], i) => {
      const x = px; px += w - 22;
      return `<div class="abs s17-box" style="left:${x}px;bottom:200px;width:${w}px"><img src="${img(n)}" alt="" style="width:100%;display:block;filter:drop-shadow(6px 8px 0 rgba(11,6,16,.25))">
        <div class="mk" style="left:${w / 2 - 40}px;top:-50px;font-size:44px;color:var(--ink);transform:rotate(${(i % 2 ? 4 : -4)}deg)">+task</div></div>`;
    }).join('');
    const stack = REDESIGN.ownership.map((o, i) => {
      const crate = i % 2 === 1;
      const h = crate ? 92 : 130;
      return { o, crate, h };
    });
    let sy = 880;
    const stackHtml = stack.map(({ o, crate, h }, i) => {
      sy -= h - 6;
      return `<div class="abs s17-own" style="left:${1000 + (i % 2) * 14}px;top:${sy}px;width:200px;height:${h}px">
          <img src="${img(crate ? 'crate' : 'box')}" alt="" style="position:absolute;left:0;bottom:0;width:200px">
        </div>
        <div class="abs s17-lab" style="left:1230px;top:${sy + h / 2 - 26}px">${tapeStrip(0, 0, 600, (i % 2 ? 1.5 : -1.5))}<span class="mono" style="position:absolute;left:22px;top:8px;font-size:25px;font-weight:700;white-space:nowrap;z-index:31;color:var(--ink);text-transform:uppercase">${o}</span></div>`;
    }).join('');
    root.innerHTML = `
      ${actTag('VI', 'Redesign')}${proposed()}
      ${header('03', 'Checkout-zone ownership', 'Responsibility & ownership', true)}
      <div class="abs" style="left:958px;top:280px;width:5px;height:600px;background:var(--ink);opacity:.25"></div>
      <div class="s17-left">
        <div class="abs" style="left:100px;top:250px"><div class="dc" style="font-size:80px">Job enlargement</div>
          <div class="dx" style="font-size:30px;margin-top:8px">= simply more tasks</div></div>
        <div class="abs" style="left:90px;top:880px;width:820px;height:10px;background:var(--ink)"></div>
        ${pileHtml}
      </div>
      <div class="s17-right">
        <div class="abs" style="left:1010px;top:185px"><div class="dc" style="font-size:80px">Job enrichment</div>
          <div class="dx" style="font-size:30px;margin-top:8px">= more responsibility &amp; ownership</div></div>
        <div class="abs" style="left:990px;top:880px;width:240px;height:10px;background:var(--ink)"></div>
        ${stackHtml}
      </div>
      <div class="abs s17-ban" style="left:0;right:0;top:930px;background:var(--yellow);border-top:6px solid var(--ink);border-bottom:6px solid var(--ink);text-align:center;padding:14px 0 6px">
        <span class="d" style="font-size:100px">We aim for enrichment.</span></div>
    `;
    gsap.set($$('.s17-box'), { opacity: 0, x: -80 });
    gsap.set($$('.s17-own'), { opacity: 0, y: -200 });
    gsap.set($$('.s17-lab'), { opacity: 0, x: 40 });
    gsap.set($('.s17-right > div:first-child'), { opacity: 0 });
    gsap.set($('.s17-ban'), { yPercent: 120, opacity: 0 });
    tl.to($$('.s17-box'), { opacity: 1, x: 0, duration: 0.45, stagger: 0.14, ease: 'power3.out' });
    step('ENLARGEMENT = more tasks piled on the same level');
    tl.to($('.s17-right > div:first-child'), { opacity: 1, duration: 0.3 });
    $$('.s17-own').forEach((b, i) => {
      tl.to(b, { opacity: 1, y: 0, duration: 0.45, ease: 'bounce.out' }, i ? '<0.22' : '>')
        .to($$('.s17-lab')[i], { opacity: 1, x: 0, duration: 0.35 }, '<0.2');
    });
    step('ENRICHMENT = responsibility stacks up: queue, POS issues, readiness, concerns, handover');
    tl.to($('.s17-left'), { opacity: 0.25, filter: 'grayscale(1)', duration: 0.5 })
      .to($('.s17-ban'), { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '<');
    step('WE AIM FOR ENRICHMENT.');
  },
});

// ── Sc18 · 04 Structured feedback — the terminal vs the conversation ─
export const feedback = defineScene({
  id: 'feedback', act: 'VI · Redesign', title: '04 · Structured feedback', theme: 'night',
  build({ root, $, $$, tl, step }) {
    root.innerHTML = `
      ${actTag('VI', 'Redesign')}${proposed()}
      ${header('04', 'Structured feedback', JCM.FB.name)}
      <div class="s18-cols">
        <div class="s18-op">
          ${tornPic('a18', { x: 100, y: 300, w: 820, h: 520, seed: 41, rot: -2 })}
          <div class="lower3" style="left:90px;top:280px"><span style="background:var(--orange)">OPERATIONAL FEEDBACK</span></div>
          ${mk(`did it work? ${sym('check')}`, 'left:470px;top:780px;font-size:96px;color:var(--yellow);transform:rotate(-5deg)')}
        </div>
        <div class="s18-dev">
          ${tornPic('a10', { x: 1010, y: 290, w: 820, h: 540, seed: 42, rot: 2, pos: '60% 30%' })}
          <div class="lower3" style="left:1000px;top:270px"><span>DEVELOPMENTAL FEEDBACK</span></div>
          ${mk(`am I growing? ${sym('up')}`, 'left:1250px;top:790px;font-size:96px;color:var(--yellow);transform:rotate(4deg)')}
        </div>
      </div>
      <div class="full s18-sent" style="display:flex;flex-direction:column;justify-content:center;padding-left:110px;transform-origin:110px 50%">
        <div class="d" style="font-size:118px">Operational feedback tells you<br>whether the transaction worked.</div>
        <div class="d c-yel" style="font-size:118px;margin-top:44px">Developmental feedback tells you<br>whether you are growing.</div>
      </div>
      <div class="abs s18-tabs" style="left:110px;top:790px;width:1700px;display:flex;gap:16px">
        ${REDESIGN.feedbackTopics.map((t, i) => `<div class="s18-tab" style="flex:1;height:120px;background:${['var(--cream)', 'var(--yellow)', 'var(--orange)', 'var(--blue)', 'var(--magenta)'][i]};color:var(--ink);border-radius:18px 18px 0 0;display:flex;align-items:center;justify-content:center;background-image:var(--grain);box-shadow:6px 8px 0 rgba(0,0,0,.5);transform:rotate(${[-1, 1, -0.5, 1.2, -1][i]}deg)"><span class="dx" style="font-size:30px">${t}</span></div>`).join('')}
      </div>
      <div class="abs mono s18-cap" style="left:110px;top:940px;font-size:28px">Short · regular · supervisor-led conversations</div>
    `;
    gsap.set([$('.s18-sent'), $('.s18-cap'), $('.s18-dev')], { opacity: 0 });
    gsap.set($$('.s18-tab'), { opacity: 0, y: 60 });
    tl.from($('.s18-op'), { opacity: 0, x: -60, duration: 0.6 });
    step('OPERATIONAL: the terminal says ✓ — did it work?');
    tl.fromTo($('.s18-dev'), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.6 });
    step('DEVELOPMENTAL: a conversation — am I growing?');
    tl.to($('.s18-cols'), { opacity: 0.12, duration: 0.5 })
      .to($('.s18-sent'), { opacity: 1, duration: 0.6 }, '<0.2');
    step('"Operational feedback tells you… Developmental feedback tells you…"');
    tl.to($('.s18-cols'), { opacity: 0, duration: 0.3 })
      .to($('.s18-sent'), { scale: 0.62, y: -120, duration: 0.8, ease: 'power3.inOut' }, '<')
      .to($$('.s18-tab'), { opacity: 1, y: 0, duration: 0.5, stagger: 0.09, ease: 'back.out(1.6)' }, '-=0.3')
      .to($('.s18-cap'), { opacity: 1, duration: 0.4 });
    step('Five conversation topics: accuracy · service · reliability · improvement · recognition');
  },
});
