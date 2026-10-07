import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { JCM, REDESIGN } from '../data/research';
import { actTag, stamp, sym, tape } from '../components/kit';
import { clock, counter } from '../components/illustrations';

const MOD_COLORS = ['var(--magenta)', 'var(--orange)', 'var(--violet)', 'var(--blue)'];
const proposed = () => tape('Proposed redesign', '', 'right:64px;top:40px;transform:rotate(2deg);z-index:41');
const header = (n: string, name: string, target: string, dark = false) => `
  <div class="abs" style="left:110px;top:95px">
    <div class="dc" style="font-size:88px">${n} · ${name}</div>
    <div class="mono" style="font-size:28px;margin-top:10px;${dark ? '' : ''}">TARGET ${sym('arrow')} <b>${target}</b></div>
  </div>`;

// ── Sc14 · Enriched checkout cashier ─────────────────────────────────
export const enriched = defineScene({
  id: 'enriched', act: 'VI · Redesign', title: 'Enriched Checkout Cashier', theme: 'day', enter: 'fade',
  build({ root, $, $$, tl, step }) {
    const pos = [[110, 300], [1290, 300], [110, 650], [1290, 650]];
    root.innerHTML = `
      ${actTag('VI', 'Redesign')}
      ${proposed()}
      <div class="abs dc" style="left:0;right:0;top:110px;text-align:center;font-size:110px">${REDESIGN.name}</div>
      <svg class="abs" width="1920" height="1080" style="left:0;top:0">
        ${pos.map(([x, y], i) => `<line class="s14-ln" x1="960" y1="600" x2="${x < 900 ? x + 520 : x}" y2="${y + 115}" stroke="#0B0610" stroke-width="6" stroke-dasharray="14 12"/>`).join('')}
      </svg>
      <div class="abs s14-ctr" style="left:760px;top:400px;width:400px;height:400px">${counter()}</div>
      ${REDESIGN.components.map((c, i) => `
        <div class="abs s14-m" style="left:${pos[i][0]}px;top:${pos[i][1]}px;width:520px;height:230px;background:var(--paper);border:5px solid var(--ink);box-shadow:10px 10px 0 var(--ink);padding:26px 30px;border-top:22px solid ${MOD_COLORS[i]}">
          <div style="display:flex;gap:22px;align-items:flex-start">
            <div class="d" style="font-size:110px;color:${MOD_COLORS[i]};-webkit-text-stroke:3px var(--ink)">${c.n}</div>
            <div><div class="dx" style="font-size:33px;line-height:1.08">${c.name}</div>
            <div class="mono" style="font-size:26px;margin-top:12px">${sym('arrow')} ${c.target}</div></div>
          </div></div>`).join('')}
      <div class="abs s14-keep mono" style="left:0;right:0;top:965px;text-align:center;font-size:30px">
        Keeps what works: <b>${JCM.TI.name} <span class="c-blue">${sym('check')}</span></b> · <b>${JCM.TS.name} <span class="c-blue">${sym('check')}</span></b> preserved — the cashier still owns the whole transaction</div>
    `;
    gsap.set($('.s14-ctr'), { scale: 0.6, opacity: 0 });
    gsap.set($$('.s14-m'), { opacity: 0, x: (i: number) => (i % 2 ? 300 : -300), y: (i: number) => (i < 2 ? -120 : 120) });
    gsap.set($$('.s14-ln'), { opacity: 0 });
    gsap.set($('.s14-keep'), { opacity: 0, y: 20 });
    tl.to($('.s14-ctr'), { scale: 1, opacity: 1, duration: 0.8 });
    step('The proposed role: Enriched Checkout Cashier');
    tl.to($$('.s14-m'), { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 })
      .to($$('.s14-ln'), { opacity: 1, duration: 0.4, stagger: 0.12 }, '<0.3');
    step('Four components dock around the counter');
    tl.to($('.s14-keep'), { opacity: 1, y: 0, duration: 0.5 });
    step('Keeps what works: identity & significance');
  },
});

// ── Sc15 · 01 Structured micro-rotation ──────────────────────────────
export const rotation = defineScene({
  id: 'rotation', act: 'VI · Redesign', title: '01 · Micro-rotation', theme: 'day',
  build({ root, $, $$, tl, step }) {
    const nodes = [[110, 300], [110, 520], [110, 740], [1350, 400], [1350, 640]];
    root.innerHTML = `
      ${actTag('VI', 'Redesign')}${proposed()}
      ${header('01', 'Structured micro-rotation', JCM.SV.name)}
      <svg class="abs" width="1920" height="1080" style="left:0;top:0">
        ${nodes.map(([x, y]) => `<line class="s15-t" x1="960" y1="590" x2="${x < 900 ? x + 460 : x}" y2="${y + 45}" stroke="#FF2E88" stroke-width="7"/>`).join('')}
      </svg>
      <div class="abs s15-ctr" style="left:790px;top:420px;width:340px;height:340px">${counter()}</div>
      <div class="abs lbl s15-still" style="left:0;right:0;text-align:center;top:790px;font-size:32px">Still primarily a cashier</div>
      ${REDESIGN.rotation.map((r, i) => `<div class="abs s15-n" style="left:${nodes[i][0]}px;top:${nodes[i][1]}px;width:460px;height:90px;background:var(--paper);border:5px solid var(--ink);border-left:20px solid var(--magenta);display:flex;align-items:center;padding:0 22px">
        <span class="dx" style="font-size:27px;line-height:1.05">${r}</span></div>`).join('')}
      ${stamp('Not random movement around the store', 's15-st', 'left:0;right:0;margin:auto;width:max-content;top:875px;font-size:62px;transform:rotate(-2deg)')}
      <div class="foot s15-f">Checkout-adjacent only · subject to training &amp; staffing · checkout coverage protected</div>
    `;
    const ts = $$<SVGLineElement>('.s15-t');
    ts.forEach((l) => { const L = Math.hypot(+l.getAttribute('x2')! - 960, +l.getAttribute('y2')! - 590); gsap.set(l, { attr: { 'stroke-dasharray': L, 'stroke-dashoffset': L } }); });
    gsap.set($$('.s15-n'), { opacity: 0, scale: 0.8 });
    gsap.set([$('.s15-st'), $('.s15-f')], { opacity: 0 });
    gsap.set($('.s15-st'), { scale: 1.8 });
    tl.from($('.s15-ctr'), { scale: 0.7, opacity: 0, duration: 0.7 })
      .from($('.s15-still'), { opacity: 0, y: 20, duration: 0.5 }, '<0.2');
    step('Still primarily a cashier');
    ts.forEach((l, i) => {
      tl.to(l, { attr: { 'stroke-dashoffset': 0 }, duration: 0.35, ease: 'power2.out' }, i ? '<0.14' : '>')
        .to($$('.s15-n')[i], { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, '<0.2');
    });
    step('Five checkout-adjacent activities, tethered to the counter');
    tl.to($('.s15-st'), { opacity: 1, scale: 1, duration: 0.3, ease: 'power4.in' })
      .to($('.s15-f'), { opacity: 0.8, duration: 0.4 });
    step('NOT random movement · subject to training & staffing');
  },
});

// ── Sc16 · 02 Controlled decision authority ──────────────────────────
export const authority = defineScene({
  id: 'authority', act: 'VI · Redesign', title: '02 · Controlled authority', theme: 'night', submission: 3,
  build({ root, $, $$, tl, step }) {
    const node = (x: number, y: number, w: number, label: string, bg: string, ink = 'var(--ink)', cls = '') =>
      `<div class="abs fl-n ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:84px;background:${bg};color:${ink};border:4px solid var(--ink);display:flex;align-items:center;justify-content:center;gap:10px;text-align:center"><span class="dx" style="font-size:26px;line-height:1">${label}</span></div>`;
    const arrow = (x: number, y: number, cls: string) => `<div class="abs ${cls}" style="left:${x}px;top:${y + 26}px;font-size:32px;color:var(--cream)">${sym('arrow')}</div>`;
    const oldN = ['Customer', 'Cashier', `<span style="width:30px;height:30px;display:inline-block">${clock}</span> Wait`, 'Supervisor', 'Decision', 'Cashier', 'Customer'];
    const oldBg = ['var(--cream)', 'var(--cream)', 'var(--orange)', 'var(--violet)', 'var(--violet)', 'var(--cream)', 'var(--cream)'];
    const ox = (i: number) => 110 + i * 258;
    root.innerHTML = `
      ${actTag('VI', 'Redesign')}${proposed()}
      ${header('02', 'Controlled decision authority', JCM.AU.name)}
      <div class="full s16-dia">
        <div class="abs lbl c-org s16-lo" style="left:110px;top:240px;font-size:26px">Current · routine issues escalate</div>
        ${oldN.map((t, i) => node(ox(i), 285, 220, t, oldBg[i], i === 3 || i === 4 ? 'var(--cream)' : 'var(--ink)', 's16-o')).join('')}
        ${oldN.slice(1).map((_, i) => arrow(ox(i) + 222, 285, 's16-oa')).join('')}
        <div class="abs mono s16-q" style="left:110px;top:388px;font-size:24px;display:flex;align-items:center;gap:10px">QUEUE ${Array.from({ length: 10 }, (_, i) => `<i class="q-dot" data-i="${i}"></i>`).join('')}</div>

        <div class="abs lbl c-yel s16-lp" style="left:110px;top:470px;font-size:26px">Proposed · predefined low-risk routine issues</div>
        ${node(110, 515, 220, 'Customer', 'var(--cream)', 'var(--ink)', 's16-p')}
        ${arrow(332, 515, 's16-pa')}
        ${node(368, 515, 300, 'Trained cashier', 'var(--yellow)', 'var(--ink)', 's16-p')}
        ${arrow(670, 515, 's16-pa')}
        ${node(706, 515, 260, `Resolved <span class="c-blue">${sym('check')}</span>`, 'var(--cream)', 'var(--ink)', 's16-p')}

        <div class="abs lbl s16-lh" style="left:110px;top:690px;font-size:26px;color:#b892ff">High-risk exceptions · supervisor retains</div>
        <div class="abs s16-h" style="left:500px;top:599px;width:6px;height:136px;background:var(--violet)"></div>
        ${node(368, 735, 300, 'Trained cashier', 'var(--yellow)', 'var(--ink)', 's16-h')}
        ${arrow(670, 735, 's16-h')}
        ${node(706, 735, 260, 'Supervisor', 'var(--violet)', 'var(--cream)', 's16-h')}
        <div class="abs s16-chips" style="left:1010px;top:690px;width:860px;display:grid;grid-template-columns:1fr 1fr;gap:12px">
          ${REDESIGN.supervisorRetains.map((r) => `<div class="s16-chip mono" style="border:3px solid var(--violet);padding:10px 16px;font-size:25px;font-weight:700">${r}</div>`).join('')}
        </div>
        <div class="abs s16-tok" style="left:${ox(0) + 90}px;top:258px;width:40px;height:40px;border-radius:50%;background:var(--magenta);border:4px solid var(--ink);color:var(--ink);font:900 26px/32px var(--display);text-align:center">!</div>
      </div>
      <div class="foot">Proposed design principle — exact permissions &amp; any thresholds would be defined by management.</div>

      <div class="full s16-ov1" style="background:rgba(11,6,16,.92);display:flex;flex-direction:column;justify-content:center;padding-left:150px">
        <div class="d c-yel" style="font-size:200px">Controlled autonomy</div>
        <div class="d c-mag" style="font-size:150px;margin:10px 0 0 10px">${sym('neq')}</div>
        <div class="d" style="font-size:200px;margin-top:10px">Unrestricted autonomy</div>
      </div>
      <div class="full s16-ov2" style="background:var(--plum)">
        ${actTag('VI', 'Redesign')}
        <div class="abs" style="left:200px;right:200px;top:300px;height:8px;background:var(--cream);opacity:.5"></div>
        <div class="abs" style="left:150px;top:200px;width:300px;text-align:center"><div class="lbl" style="font-size:26px">Customer problem</div></div>
        <div class="abs" style="left:186px;top:282px;width:44px;height:44px;border-radius:50%;background:var(--magenta);border:4px solid var(--ink)"></div>
        <div class="abs" style="left:560px;top:200px;width:360px;text-align:center"><div class="lbl" style="font-size:26px;color:var(--yellow)">Trained cashier</div></div>
        <div class="abs" style="left:1450px;top:200px;width:320px;text-align:center"><div class="lbl" style="font-size:26px;color:#b892ff">Supervisor</div></div>
        ${stamp('Decide', 's16-dec', 'left:1480px;top:250px;font-size:70px;color:var(--yellow);background:var(--plum)')}
        <div class="abs d s16-sent" style="left:150px;top:450px;font-size:150px;width:1700px">Move appropriate decisions <span class="c-yel">closer to where the customer problem occurs.</span></div>
      </div>
    `;
    const tok = $('.s16-tok');
    gsap.set($$('.s16-o, .s16-oa, .s16-p, .s16-pa, .s16-h, .s16-chip, .s16-lo, .s16-lp, .s16-lh, .s16-q'), { opacity: 0 });
    gsap.set($$('.q-dot'), { scale: (i: number) => (i < 3 ? 1 : 0) });
    gsap.set([$('.s16-ov1'), $('.s16-ov2')], { opacity: 0 });
    gsap.set(tok, { scale: 0 });
    gsap.set($('.s16-sent'), { opacity: 0, y: 40 });

    tl.to(tok, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
    step('A routine customer problem arrives');

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
      .fromTo($('.s16-dec'), { x: 0, rotation: 0 }, { x: -820, rotation: -6, duration: 1.1, ease: 'power3.inOut' })
      .to($('.s16-sent'), { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
    step('"Move appropriate decisions closer to where the problem occurs."');
  },
});

// ── Sc17 · 03 Checkout-zone ownership ────────────────────────────────
export const ownership = defineScene({
  id: 'ownership', act: 'VI · Redesign', title: '03 · Enlargement vs enrichment', theme: 'day',
  build({ root, $, $$, tl, step }) {
    root.innerHTML = `
      ${actTag('VI', 'Redesign')}${proposed()}
      ${header('03', 'Checkout-zone ownership', 'Responsibility & ownership')}
      <div class="abs" style="left:958px;top:270px;width:5px;height:620px;background:var(--ink);opacity:.25"></div>
      <div class="s17-left">
        <div class="abs" style="left:110px;top:280px"><div class="dc" style="font-size:96px">Job enlargement</div>
          <div class="dx" style="font-size:40px;margin-top:10px">= simply more tasks</div></div>
        <div class="abs" style="left:110px;top:840px;width:780px;height:12px;background:var(--ink)"></div>
        ${Array.from({ length: 6 }, (_, i) => `<div class="abs s17-box mono" style="left:${110 + i * 130}px;top:722px;width:118px;height:118px;background:${i % 2 ? 'var(--orange)' : 'var(--paper)'};border:5px solid var(--ink);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700">+task</div>`).join('')}
      </div>
      <div class="s17-right">
        <div class="abs" style="left:1030px;top:280px"><div class="dc" style="font-size:96px">Job enrichment</div>
          <div class="dx" style="font-size:40px;margin-top:10px">= more responsibility &amp; ownership</div></div>
        ${REDESIGN.ownership.map((o, i) => `<div class="abs s17-own" style="left:${1030 + i * 44}px;top:${790 - i * 80}px;width:${640}px;height:70px;background:var(--violet);color:var(--paper);border:4px solid var(--ink);display:flex;align-items:center;padding:0 22px"><span class="dx" style="font-size:26px">${o}</span></div>`).join('')}
      </div>
      <div class="abs s17-ban" style="left:0;right:0;top:900px;background:var(--yellow);border-top:6px solid var(--ink);border-bottom:6px solid var(--ink);text-align:center;padding:14px 0 6px">
        <span class="d" style="font-size:110px">We aim for enrichment.</span></div>
    `;
    gsap.set($$('.s17-box'), { opacity: 0, x: -60 });
    gsap.set($$('.s17-own'), { opacity: 0, y: 50 });
    gsap.set($('.s17-right'), { opacity: 0 });
    gsap.set($('.s17-ban'), { yPercent: 120, opacity: 0 });
    tl.to($$('.s17-box'), { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, ease: 'power3.out' });
    step('ENLARGEMENT = more tasks, same level');
    tl.to($('.s17-right'), { opacity: 1, duration: 0.3 })
      .to($$('.s17-own'), { opacity: 1, y: 0, duration: 0.45, stagger: 0.14, ease: 'back.out(1.6)' });
    step('ENRICHMENT = responsibility for queue, POS issues, readiness, concerns, handover');
    tl.to($('.s17-left'), { opacity: 0.25, filter: 'grayscale(1)', duration: 0.5 })
      .to($('.s17-ban'), { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '<');
    step('WE AIM FOR ENRICHMENT.');
  },
});

// ── Sc18 · 04 Structured feedback ────────────────────────────────────
export const feedback = defineScene({
  id: 'feedback', act: 'VI · Redesign', title: '04 · Structured feedback', theme: 'night',
  build({ root, $, $$, tl, step }) {
    const stairs = [[0, 360], [150, 360], [150, 280], [300, 280], [300, 200], [450, 200], [450, 120], [600, 120], [600, 40], [720, 40]];
    root.innerHTML = `
      ${actTag('VI', 'Redesign')}${proposed()}
      ${header('04', 'Structured feedback', JCM.FB.name)}
      <div class="s18-cols">
        <div class="abs s18-op" style="left:110px;top:290px">
          <div class="lbl c-org" style="font-size:28px">Operational feedback</div>
          <div class="d" style="font-size:130px;margin-top:10px">Did it work?</div>
          <div class="receipt" style="position:relative;width:600px;margin-top:30px"><div class="r-body">
            <div class="r-line" style="font-size:38px"><span>Items scanned</span><i></i><span class="c-blue">${sym('check')}</span></div>
            <div class="r-line" style="font-size:38px"><span>Payment</span><i></i><span class="c-blue">${sym('check')}</span></div>
            <div class="r-line" style="font-size:38px"><span>Drawer balanced</span><i></i><span class="c-blue">${sym('check')}</span></div>
          </div></div>
        </div>
        <div class="abs s18-dev" style="left:1030px;top:290px">
          <div class="lbl c-yel" style="font-size:28px">Developmental feedback</div>
          <div class="d" style="font-size:130px;margin-top:10px">Am I growing?</div>
          <svg width="760" height="400" style="margin-top:30px;overflow:visible"><polyline class="s18-st" points="${stairs.map((p) => p.join(',')).join(' ')}" fill="none" stroke="#FFD23F" stroke-width="14" stroke-linejoin="miter"/>
            <circle class="s18-dotc" cx="720" cy="40" r="22" fill="#FF2E88" stroke="#0B0610" stroke-width="5"/></svg>
        </div>
      </div>
      <div class="full s18-sent" style="display:flex;flex-direction:column;justify-content:center;padding-left:110px;transform-origin:110px 50%">
        <div class="d" style="font-size:118px">Operational feedback tells you<br>whether the transaction worked.</div>
        <div class="d c-yel" style="font-size:118px;margin-top:44px">Developmental feedback tells you<br>whether you are growing.</div>
      </div>
      <div class="abs s18-tabs" style="left:110px;top:790px;width:1700px;display:flex;gap:16px">
        ${REDESIGN.feedbackTopics.map((t, i) => `<div class="s18-tab" style="flex:1;height:120px;background:${['var(--cream)', 'var(--yellow)', 'var(--orange)', 'var(--blue)', 'var(--magenta)'][i]};color:var(--ink);border:5px solid var(--ink);border-radius:18px 18px 0 0;display:flex;align-items:center;justify-content:center"><span class="dx" style="font-size:30px">${t}</span></div>`).join('')}
      </div>
      <div class="abs mono s18-cap" style="left:110px;top:940px;font-size:28px">Short · regular · supervisor-led conversations</div>
    `;
    const st = $<SVGPolylineElement>('.s18-st');
    const L = st.getTotalLength();
    gsap.set(st, { attr: { 'stroke-dasharray': L, 'stroke-dashoffset': L } });
    gsap.set($('.s18-dotc'), { scale: 0, transformOrigin: '50% 50%' });
    gsap.set($('.s18-dev'), { opacity: 0 });
    gsap.set($('.s18-op .receipt'), { clipPath: 'inset(0 0 100% 0)' });
    gsap.set([$('.s18-sent'), $('.s18-cap')], { opacity: 0 });
    gsap.set($$('.s18-tab'), { opacity: 0, y: 60 });

    tl.from($('.s18-op'), { opacity: 0, x: -40, duration: 0.6 })
      .to($('.s18-op .receipt'), { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'steps(8)' });
    step('OPERATIONAL: did it work?');
    tl.to($('.s18-dev'), { opacity: 1, duration: 0.4 })
      .to(st, { attr: { 'stroke-dashoffset': 0 }, duration: 1, ease: 'power2.inOut' })
      .to($('.s18-dotc'), { scale: 1, duration: 0.4, ease: 'back.out(3)' });
    step('DEVELOPMENTAL: am I growing?');
    tl.to($('.s18-cols'), { opacity: 0.08, duration: 0.5 })
      .to($('.s18-sent'), { opacity: 1, duration: 0.6 }, '<0.2');
    step('"Operational feedback tells you… Developmental feedback tells you…"');
    tl.to($('.s18-cols'), { opacity: 0, duration: 0.3 })
      .to($('.s18-sent'), { scale: 0.62, y: -120, duration: 0.8, ease: 'power3.inOut' }, '<')
      .to($$('.s18-tab'), { opacity: 1, y: 0, duration: 0.5, stagger: 0.09, ease: 'back.out(1.6)' }, '-=0.3')
      .to($('.s18-cap'), { opacity: 1, duration: 0.4 });
    step('Five conversation topics: accuracy · service · reliability · improvement · recognition');
  },
});
