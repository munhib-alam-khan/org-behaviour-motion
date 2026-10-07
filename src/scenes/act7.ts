import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { PILOT } from '../data/research';
import { actTag, stamp, sym } from '../components/kit';
import { markerCircle, mk, pic, plate, quadMatrix, tornPic } from '../components/photo';

// ── Sc19 · The credibility turn: the photographs lose their colour ───
export const hypothesis = defineScene({
  id: 'hypothesis', act: 'VII · Test', title: 'A hypothesis. Test it.', theme: 'pause',
  build({ root, $, $$, tl, step }) {
    root.innerHTML = `
      <div class="full s19-photo">
        ${tornPic('a18', { x: 100, y: 300, w: 820, h: 520, seed: 41, rot: -2 })}
        ${tornPic('a10', { x: 1010, y: 290, w: 820, h: 540, seed: 42, rot: 2, pos: '60% 30%' })}
      </div>
      <div class="abs dx s19-a" style="left:150px;top:220px;font-size:58px;color:#333">Everything we have proposed so far is</div>
      <div class="abs d s19-b" style="left:140px;top:310px;font-size:300px">A hypothesis.</div>
      <div class="abs d s19-c" style="left:140px;top:640px;font-size:300px">Test it.</div>
    `;
    gsap.set($$('.s19-a, .s19-b, .s19-c'), { opacity: 0 });
    // ★ colour drains out of the world, the images flatten away; then nothing moves.
    tl.fromTo($('.s19-photo'), { filter: 'grayscale(0) contrast(1)' }, { filter: 'grayscale(1) contrast(.6)', duration: 0.9, ease: 'power2.inOut' })
      .to($('.s19-photo'), { opacity: 0, duration: 0.5, ease: 'power2.in' })
      .to($('.s19-a'), { opacity: 1, duration: 0.05 });
    step('Colour drains away. "Everything we have proposed so far…"');
    tl.to($('.s19-b'), { opacity: 1, duration: 0.03 });
    step('…is A HYPOTHESIS.');
    tl.to($('.s19-c'), { opacity: 1, duration: 0.03 });
    step('TEST IT.');
  },
});

// ── Sc20 · Proposed pilot — a plan written on a clipboard ────────────
export const pilot = defineScene({
  id: 'pilot', act: 'VII · Test', title: 'Proposed 6-week pilot', theme: 'night', enter: 'fade',
  build({ root, $, $$, tl, step }) {
    // Paper corners measured on A20 (1672×941 → stage ×1.1483).
    const Q: [number, number][] = [[370, 243], [1022, 106], [1424, 804], [687, 1017]];
    const W = 640, H = 860;
    const row = (cls: string, wk: string, title: string, sub: string, color: string) => `
      <div class="${cls}" style="display:flex;gap:14px;align-items:baseline;margin-top:20px">
        <div class="mono s20-wk" style="position:relative;width:92px;flex:none;font-size:30px;font-weight:700;color:${color}">${wk}</div>
        <div><div class="dx nowrap" style="font-size:26px;line-height:1">${title}</div><div class="mono" style="font-size:21px;margin-top:6px;line-height:1.25">${sub}</div></div>
      </div>`;
    root.innerHTML = `
      ${plate('a20')}
      <div class="full" style="background:radial-gradient(80% 90% at 50% 50%, rgba(11,6,16,0) 40%, rgba(11,6,16,.6) 100%)"></div>
      ${actTag('VII', 'Test')}
      <div class="abs s20-paper" style="left:0;top:0;width:${W}px;height:${H}px;transform-origin:0 0;transform:${quadMatrix(W, H, Q)};color:var(--ink);padding:150px 60px 0 70px">
        <div class="mono s20-h" style="font-size:22px;letter-spacing:.16em;font-weight:700">PROPOSED PILOT · PLAN</div>
        <div class="s20-par" style="display:flex;gap:28px;align-items:flex-end;margin-top:10px">
          <div><div class="d nowrap" style="font-size:96px">${PILOT.weeks}</div><div class="dx" style="font-size:20px">Weeks</div></div>
          <div><div class="d nowrap" style="font-size:96px">${PILOT.branches}</div><div class="dx" style="font-size:20px">Karachi branch</div></div>
          <div><div class="d nowrap" style="font-size:96px">${PILOT.cashiers}</div><div class="dx" style="font-size:20px">Cashiers</div></div>
        </div>
        <div style="border-top:3px solid var(--ink);margin-top:20px"></div>
        ${row('s20-w0', 'W0', 'Baseline', 'Same JCM, motivation &amp; satisfaction survey + operational indicators', '#3D6BFF')}
        ${row('s20-w1', 'W1–6', 'Intervention', 'The four proposed changes', '#C98A00')}
        ${row('s20-w3', 'W3', 'Midpoint check', 'Catch operational problems early', '#FF7A1A')}
        ${row('s20-w6', 'W6', 'Post-measurement', 'Same measures again', '#3D6BFF')}
        <svg class="s20-ring" width="130" height="80" viewBox="0 0 130 80" style="position:absolute;overflow:visible;pointer-events:none"><path d="${markerCircle(65, 40, 60, 32, 12)}" fill="none" stroke="#FF2E88" stroke-width="5" stroke-linecap="round"/></svg>
      </div>
      ${stamp('Proposed · not yet conducted', 's20-st', 'left:1080px;top:100px;font-size:46px;transform:rotate(6deg);background:rgba(11,6,16,.35)')}
      ${mk('a plan,<br>not a result', 'left:1460px;top:300px;font-size:84px;color:var(--yellow);transform:rotate(-6deg);white-space:normal', 's20-mk')}
    `;
    // Ring lives on the paper (same perspective) and circles the W3 label.
    const wk3 = $('.s20-w3 .s20-wk'), paper = $('.s20-paper'), ringEl = $<SVGSVGElement>('.s20-ring');
    void paper;
    ringEl.style.left = `${wk3.offsetLeft - 46}px`;   // offsetParent is the paper itself
    ringEl.style.top = `${wk3.offsetTop - 22}px`;
    const ring = $<SVGPathElement>('.s20-ring path');
    const L = ring.getTotalLength();
    gsap.set(ring, { attr: { 'stroke-dasharray': L, 'stroke-dashoffset': L } });
    gsap.set([...$$('.s20-par > div'), $('.s20-h'), $('.s20-w0'), $('.s20-w1'), $('.s20-w3'), $('.s20-w6'), $('.s20-mk')], { opacity: 0 });
    gsap.set($('.s20-st'), { opacity: 0, scale: 1.8 });

    tl.to($('.s20-h'), { opacity: 1, duration: 0.3 })
      .to($$('.s20-par > div'), { opacity: 1, duration: 0.4, stagger: 0.18 })
      .to($('.s20-st'), { opacity: 1, scale: 1, duration: 0.3, ease: 'power4.in' })
      .to($('.s20-mk'), { opacity: 1, duration: 0.3 });
    step('6 weeks · 1 Karachi branch · ~10–12 cashiers (PROPOSED, a plan on paper)');
    tl.to($('.s20-w0'), { opacity: 1, duration: 0.4 });
    step('Week 0: baseline');
    tl.to($('.s20-w1'), { opacity: 1, duration: 0.4 })
      .to($('.s20-w3'), { opacity: 1, duration: 0.4 })
      .to(ring, { attr: { 'stroke-dashoffset': 0 }, duration: 0.5 });
    step('Weeks 1–6: intervention · Week 3: midpoint check');
    tl.to($('.s20-w6'), { opacity: 1, duration: 0.4 });
    step('Week 6: post-measurement');
  },
});


// ── Sc21 · Both must survive — the cashier vs the till ───────────────
export const balance = defineScene({
  id: 'balance', act: 'VII · Test', title: 'Both must survive', theme: 'night',
  build({ root, $, $$, tl, step }) {
    const card = (cls: string, x: number, title: string, color: string, items: readonly string[], mark: string) => `
      <div class="paper ${cls}" style="left:${x}px;top:400px;width:680px;height:350px;border-top:22px solid ${color};padding:22px 34px">
        <div class="dc nowrap" style="font-size:54px">${title}</div>
        ${items.map((t) => `<div class="mono" style="font-size:27px;font-weight:700;margin-top:9px;display:flex;justify-content:space-between"><span>${t}</span><span style="color:${color}">${mark}</span></div>`).join('')}
      </div>`;
    root.innerHTML = `
      ${actTag('VII', 'Test')}
      <div class="s21-world">
        <div class="abs s21-beam" style="left:210px;top:762px;width:1500px;height:18px;background:var(--cream);border-radius:9px"></div>
        <div class="abs" style="left:880px;top:780px;width:0;height:0;border-left:80px solid transparent;border-right:80px solid transparent;border-bottom:150px solid var(--yellow)"></div>
        <div class="s21-l">
          ${pic('a04_sticker', 'left:240px;top:120px;width:470px')}
          ${card('', 200, 'Employee experience', 'var(--blue)', ['Skill variety', 'Autonomy', 'Feedback', 'Internal work motivation', 'Job satisfaction'], `expected ${sym('up')}`)}
        </div>
        <div class="s21-r">
          ${tornPic('a08', { x: 1130, y: 110, w: 500, h: 300, seed: 61, rot: 3 })}
          ${card('', 1040, 'Operational safety', 'var(--magenta)', ['Transaction / error rate', 'Cash discrepancies', 'Routine escalations', 'Checkout complaints'], 'no worse')}
        </div>
      </div>
      <div class="abs s21-hyp" style="left:0;right:0;top:950px;text-align:center">
        <div class="mono c-yel" style="font-size:28px;font-weight:700">HYPOTHETICAL: satisfaction ${sym('up')} while cash discrepancies ${sym('up')}</div>
      </div>
      ${stamp('Not a success', 's21-st', 'left:0;right:0;margin:auto;width:max-content;top:470px;font-size:120px;background:rgba(11,6,16,.75)')}
      <div class="abs s21-dec" style="left:0;right:0;top:420px;display:flex;justify-content:center;gap:60px">
        ${PILOT.decisions.map((d, i) => `<div class="stamp" style="position:relative;font-size:110px;color:${['var(--blue)', 'var(--yellow)', 'var(--magenta)'][i]};background:rgba(11,6,16,.85);transform:rotate(${[-3, 1, 3][i]}deg)">${d}</div>`).join('')}
      </div>
    `;
    const Lg = $('.s21-l'), Rg = $('.s21-r'), beam = $('.s21-beam');
    gsap.set([Lg, Rg], { opacity: 0 });
    gsap.set([$('.s21-hyp'), $('.s21-st')], { opacity: 0 });
    gsap.set($('.s21-st'), { scale: 1.8 });
    gsap.set($$('.s21-dec > .stamp'), { opacity: 0, scale: 1.8 });
    gsap.set(beam, { rotation: -6, transformOrigin: '50% 50%' });
    gsap.set(Lg, { y: 78 - 60 });
    gsap.set(Rg, { y: -60 });

    tl.to(Lg, { opacity: 1, y: 78, duration: 0.6 });
    step('EMPLOYEE EXPERIENCE: our cashier · variety · autonomy · feedback · motivation · satisfaction');
    tl.to(Rg, { opacity: 1, y: 0, duration: 0.6 })
      .to(beam, { rotation: 0, duration: 0.8, ease: 'power3.inOut' }, '<0.2')
      .to(Lg, { y: 0, duration: 0.8, ease: 'power3.inOut' }, '<');
    step('OPERATIONAL SAFETY: the till · errors · discrepancies · escalations · complaints — balanced');
    tl.to(beam, { rotation: 7, duration: 0.7, ease: 'power3.inOut' })
      .to(Lg, { y: -92, duration: 0.7, ease: 'power3.inOut' }, '<')
      .to(Rg, { y: 92, duration: 0.7, ease: 'power3.inOut' }, '<')
      .to($('.s21-hyp'), { opacity: 1, duration: 0.3 }, '<0.2')
      .to($('.s21-st'), { opacity: 1, scale: 1, duration: 0.3, ease: 'power4.in' });
    step('Hypothetical: satisfaction up, discrepancies up → NOT A SUCCESS');
    tl.to([$('.s21-hyp'), $('.s21-st')], { opacity: 0, duration: 0.3 })
      .to(beam, { rotation: 0, duration: 0.7, ease: 'power3.inOut' }, '<')
      .to([Lg, Rg], { y: 0, duration: 0.7, ease: 'power3.inOut' }, '<')
      .to($('.s21-world'), { opacity: 0.3, duration: 0.4 })
      .to($$('.s21-dec > .stamp'), { opacity: 1, scale: 1, duration: 0.28, ease: 'power4.in', stagger: 0.25 });
    step('Decision: SCALE · MODIFY · STOP');
  },
});
