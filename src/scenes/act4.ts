import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { CORRELATION, JCM, MULTI_RESPONSE, OUTCOMES, PREFERENCES, SAMPLE } from '../data/research';
import { ITEMS_PER_CONSTRUCT, SV_JS_ITEM_SUMS } from '../data/respondents';
import { actTag, priceTag, sym } from '../components/kit';

// ── Sc10 · What employees value ──────────────────────────────────────
export const value = defineScene({
  id: 'value', act: 'IV · Go deeper', title: 'What cashiers value', theme: 'day', enter: 'fade',
  build({ root, $, $$, tl, step }) {
    const P = PREFERENCES;
    root.innerHTML = `
      ${actTag('IV', 'Go deeper')}
      <div class="abs" style="left:110px;top:105px">
        <div class="dc" style="font-size:84px">What would cashiers value?</div>
        <div class="mono" style="font-size:26px;margin-top:12px">Mean agreement · 1–5 · n = ${SAMPLE.n}</div>
      </div>
      <div class="sticker s10-x" style="left:1250px;top:215px;background:var(--paper);transform:rotate(-3deg);font-size:32px">Unlimited freedom<i class="s10-strike"></i></div>
      <div class="sticker s10-x" style="left:1400px;top:120px;background:var(--paper);transform:rotate(2deg);font-size:32px">Random movement<i class="s10-strike"></i></div>
      ${priceTag({ value: P.authority.label, label: P.authority.short, sub: 'to resolve routine customer issues, within clear guidelines', color: 'var(--yellow)', cls: 's10-t', style: 'left:100px;top:380px;width:540px;transform:rotate(-3deg)' })}
      ${priceTag({ value: P.ownership.label, label: P.ownership.short, sub: 'greater responsibility in the role', color: 'var(--orange)', cls: 's10-t', style: 'left:690px;top:350px;width:520px;transform:rotate(2deg)' })}
      ${priceTag({ value: P.feedback.label, label: P.feedback.short, sub: 'more regular performance feedback', color: 'var(--blue)', ink: 'var(--paper)', cls: 's10-t', style: 'left:1260px;top:400px;width:540px;transform:rotate(-1.5deg)' })}
      ${priceTag({ value: OUTCOMES.JS.label, label: 'Overall job satisfaction', color: 'var(--ink)', ink: 'var(--cream)', cls: 's10-js', style: 'left:480px;top:770px;width:700px;transform:rotate(1.5deg);--tv:150px' })}
      ${priceTag({ value: P.rotation.label, label: P.rotation.short, sub: 'still positive, but lower', color: 'var(--pause)', cls: 's10-rot', style: 'left:1300px;top:760px;width:420px;transform:rotate(-2deg)' })}
    `;
    root.querySelectorAll<HTMLElement>('.s10-js .tag-value').forEach((e) => (e.style.fontSize = '150px'));
    root.querySelectorAll<HTMLElement>('.s10-rot .tag-value').forEach((e) => (e.style.fontSize = '120px'));
    const tags = $$('.s10-t');
    gsap.set($$('.s10-x'), { opacity: 0, y: -20 });
    gsap.set($$('.s10-strike'), { scaleX: 0 });
    gsap.set([...tags, $('.s10-js'), $('.s10-rot')], { opacity: 0, y: -260, rotation: '+=8' });

    tl.to($$('.s10-x'), { opacity: 1, y: 0, duration: 0.4, stagger: 0.15 })
      .to($$('.s10-strike'), { scaleX: 1, duration: 0.35, stagger: 0.15, ease: 'power3.inOut' });
    step('"Not unlimited freedom. Not random movement."');
    tags.forEach((t, i) => {
      tl.to(t, { opacity: 1, y: 0, rotation: '-=8', duration: 0.75, ease: 'back.out(1.6)' });
      step(['4.32 · authority to resolve routine issues', '4.16 · responsibility & ownership', '4.04 · more regular feedback'][i]);
    });
    tl.to($('.s10-js'), { opacity: 1, y: 0, rotation: '-=8', duration: 0.75, ease: 'back.out(1.4)' })
      .to($('.s10-rot'), { opacity: 1, y: 0, rotation: '-=8', duration: 0.6 }, '<0.3');
    step('Job satisfaction only 2.84 (rotation 3.28 shown quietly)');
  },
});

// ── Sc11 · Association ≠ causation ───────────────────────────────────
export const association = defineScene({
  id: 'association', act: 'IV · Go deeper', title: 'r ≈ .54 · association', theme: 'night',
  build({ root, $, $$, tl, step }) {
    const L = 300, R = 1140, B = 900, T = 170;
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

    const grid = [1, 2, 3, 4, 5].map((v) => `
      <line x1="${px(v)}" y1="${T - 10}" x2="${px(v)}" y2="${B}" stroke="rgba(244,236,221,.12)" stroke-width="2"/>
      <line x1="${L}" y1="${py(v)}" x2="${R + 10}" y2="${py(v)}" stroke="rgba(244,236,221,.12)" stroke-width="2"/>`).join('');
    const dots = [...groups.values()].map((g) => `
      <g transform="translate(${px(g.x)} ${py(g.y)})"><g class="s11-pt">
        ${g.n > 1 ? '<circle r="27" fill="none" stroke="#FFD23F" stroke-width="4"/>' : ''}
        <circle r="15" fill="#F4ECDD" stroke="#0B0610" stroke-width="4"/>
      </g></g>`).join('');
    const dupLabels = [...groups.values()].filter((g) => g.n > 1).map((g) =>
      `<div class="abs mono s11-dup" style="left:${px(g.x) + 26}px;top:${py(g.y) - 46}px;font-size:24px;font-weight:700;color:var(--yellow)">×${g.n}</div>`).join('');

    root.innerHTML = `
      ${actTag('IV', 'Go deeper')}
      <svg class="abs" width="1920" height="1080" viewBox="0 0 1920 1080" style="left:0;top:0">
        <g class="s11-axes">${grid}
          <line x1="${L}" y1="${B}" x2="${R + 10}" y2="${B}" stroke="#F4ECDD" stroke-width="5"/>
          <line x1="${L}" y1="${B}" x2="${L}" y2="${T - 10}" stroke="#F4ECDD" stroke-width="5"/></g>
        <line class="s11-fit" x1="${px(x0)}" y1="${py(a + b * x0)}" x2="${px(x1)}" y2="${py(a + b * x1)}" stroke="#FF2E88" stroke-width="8" stroke-linecap="round"/>
        ${dots}
      </svg>
      ${dupLabels}
      ${[1, 2, 3, 4, 5].map((v) => `<div class="abs mono" style="left:${px(v) - 30}px;width:60px;text-align:center;top:${B + 14}px;font-size:28px">${v}</div>
        <div class="abs mono" style="left:${L - 60}px;top:${py(v) - 18}px;font-size:28px">${v}</div>`).join('')}
      <div class="abs lbl" style="left:${L}px;top:${B + 62}px;font-size:28px">${CORRELATION.x} <span class="muted">(score 1–5)</span></div>
      <div class="abs lbl" style="left:${L - 70}px;top:${T - 70}px;font-size:28px">${CORRELATION.y} <span class="muted">(score 1–5)</span></div>
      <div class="abs mono muted" style="left:${L}px;top:${B + 108}px;font-size:24px">Each dot = one cashier · rings = two cashiers with identical scores</div>

      <div class="abs s11-r" style="left:1270px;top:150px">
        <div class="d nowrap" style="font-size:250px"><span style="text-transform:none">r</span> <span style="font-size:.6em">${sym('approx')}</span> .54</div>
        <div class="mono" style="font-size:28px;margin-top:10px">${CORRELATION.caveat}</div>
        <div class="mono muted" style="font-size:26px;margin-top:6px">Skill Variety ${sym('both')} Job Satisfaction</div>
      </div>
      <div class="abs s11-flap" style="left:1270px;top:560px;perspective:900px">
        <div class="d s11-f" style="font-size:120px">Association</div>
        <div class="d s11-f c-mag" style="font-size:120px;margin:6px 0">${sym('neq')}</div>
        <div class="d s11-f" style="font-size:120px;background:var(--cream);color:var(--ink);display:inline-block;padding:4px 12px 0">Causation</div>
      </div>
    `;
    const fit = $<SVGLineElement>('.s11-fit');
    const len = Math.hypot(px(x1) - px(x0), py(a + b * x1) - py(a + b * x0));
    gsap.set(fit, { attr: { 'stroke-dasharray': len, 'stroke-dashoffset': len } });
    gsap.set($('.s11-axes'), { opacity: 0 });
    gsap.set($$('.s11-pt'), { opacity: 0, y: -40 });
    gsap.set($$('.s11-dup'), { opacity: 0 });
    gsap.set($('.s11-r'), { opacity: 0, x: 40 });
    gsap.set($$('.s11-f'), { rotationX: -95, opacity: 0, transformOrigin: '50% 0%' });

    tl.to($('.s11-axes'), { opacity: 1, duration: 0.5 });
    step('Axes: skill variety × job satisfaction');
    tl.to($$('.s11-pt'), { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)', stagger: { each: 0.05, from: 'random' } })
      .to($$('.s11-dup'), { opacity: 1, duration: 0.3 });
    step('25 real respondents appear');
    tl.to(fit, { attr: { 'stroke-dashoffset': 0 }, duration: 0.9, ease: 'power2.inOut' })
      .to($('.s11-r'), { opacity: 1, x: 0, duration: 0.6 }, '-=0.4');
    step('Trend line · r ≈ .54 (exploratory)');
    tl.to($$('.s11-f'), { rotationX: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.18 });
    step('ASSOCIATION ≠ CAUSATION');
  },
});

// ── Sc12 · Managerial signal ─────────────────────────────────────────
export const signal = defineScene({
  id: 'signal', act: 'IV · Go deeper', title: 'Managerial signal', theme: 'night', submission: 3,
  build({ root, $, $$, tl, step }) {
    const card = (cls: string, x: number, bg: string, ink: string, inner: string) =>
      `<div class="abs s12-c ${cls}" style="left:${x}px;top:250px;width:540px;height:600px;background:${bg};color:${ink};padding:40px 44px;border:5px solid var(--ink);box-shadow:12px 12px 0 rgba(0,0,0,.6)">${inner}</div>`;
    root.innerHTML = `
      ${actTag('IV', 'Go deeper')}
      <div class="abs dc" style="left:110px;top:100px;font-size:96px">Three signals</div>
      ${card('s12-a', 100, 'var(--magenta)', 'var(--ink)', `
        <div class="lbl">Lowest JCM score</div>
        <div class="d" style="font-size:270px;margin-top:30px">${JCM.SV.label}</div>
        <div class="dx" style="font-size:44px;margin-top:16px">${JCM.SV.name}</div>`)}
      ${card('s12-b', 690, 'var(--yellow)', 'var(--ink)', `
        <div class="lbl">What cashiers value</div>
        <div style="display:flex;gap:22px;align-items:baseline;margin-top:26px"><div class="d" style="font-size:170px">${PREFERENCES.authority.label}</div><div class="dx" style="font-size:30px">Authority</div></div>
        <div style="display:flex;gap:22px;align-items:baseline;margin-top:10px"><div class="d" style="font-size:110px">${PREFERENCES.ownership.label}</div><div class="dx" style="font-size:30px">Ownership</div></div>
        <div class="mono" style="font-size:24px;margin-top:22px;line-height:1.35;border-top:3px dashed var(--ink);padding-top:14px">Most-selected changes*: learn additional skills &amp; more ownership (${MULTI_RESPONSE.learnSkills.count} of ${MULTI_RESPONSE.of} each)<br><span style="opacity:.75">*${MULTI_RESPONSE.caveat.toLowerCase()}</span></div>`)}
      ${card('s12-c3', 1280, 'var(--cream)', 'var(--ink)', `
        <div class="lbl">Strongest observed association</div>
        <div class="d nowrap" style="font-size:180px;margin-top:40px"><span style="text-transform:none">r</span> <span style="font-size:.6em">${sym('approx')}</span> .54</div>
        <div class="dx" style="font-size:30px;margin-top:16px">Skill variety ${sym('both')}<br>job satisfaction</div>`)}
      <div class="abs s12-ticket" style="left:360px;top:560px;width:1200px;height:330px;background:var(--yellow);color:var(--ink);padding:44px 60px;
        -webkit-mask:radial-gradient(circle 26px at 0 50%,#0000 98%,#000) left/51% 100% no-repeat,radial-gradient(circle 26px at 100% 50%,#0000 98%,#000) right/51% 100% no-repeat;
        mask:radial-gradient(circle 26px at 0 50%,#0000 98%,#000) left/51% 100% no-repeat,radial-gradient(circle 26px at 100% 50%,#0000 98%,#000) right/51% 100% no-repeat">
        <div class="lbl">Lowest score + employee preference + strongest association</div>
        <div class="d nowrap" style="font-size:128px;margin-top:18px">Managerial signal</div>
        <div class="mono" style="font-size:30px;margin-top:10px;font-weight:700">— not proof. A reason to redesign carefully and test.</div>
      </div>
    `;
    const [a, b, c] = [$('.s12-a'), $('.s12-b'), $('.s12-c3')];
    gsap.set(a, { x: -800, rotation: -6 });
    gsap.set(b, { y: 900, rotation: 4 });
    gsap.set(c, { x: 800, rotation: 6 });
    gsap.set($('.s12-ticket'), { opacity: 0, scale: 0.6, rotation: -4 });
    step('"Three signals…"');
    tl.to(a, { x: 0, rotation: -1.5, duration: 0.8, ease: 'power3.out' });
    step('Lowest JCM score: skill variety 2.55');
    tl.to(b, { y: 0, rotation: 1, duration: 0.8, ease: 'power3.out' });
    step('What cashiers value: authority 4.32 · ownership 4.16');
    tl.to(c, { x: 0, rotation: -1, duration: 0.8, ease: 'power3.out' });
    step('Strongest observed association r ≈ .54');
    tl.to(a, { x: 420, y: -130, scale: 0.5, rotation: -10, duration: 0.9, ease: 'power3.inOut' })
      .to(b, { x: 0, y: -150, scale: 0.5, rotation: 0, duration: 0.9, ease: 'power3.inOut' }, '<')
      .to(c, { x: -420, y: -130, scale: 0.5, rotation: 10, duration: 0.9, ease: 'power3.inOut' }, '<')
      .to($('.s12-ticket'), { opacity: 1, scale: 1, rotation: -1.5, duration: 0.7, ease: 'back.out(1.5)' }, '-=0.35');
    step('★ Converge → MANAGERIAL SIGNAL (not proof)');
  },
});
