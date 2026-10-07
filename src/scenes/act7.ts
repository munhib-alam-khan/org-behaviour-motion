import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { PILOT } from '../data/research';
import { actTag, stamp, sym } from '../components/kit';

// ── Sc19 · The credibility turn ──────────────────────────────────────
export const hypothesis = defineScene({
  id: 'hypothesis', act: 'VII · Test', title: 'A hypothesis. Test it.', theme: 'pause',
  build({ root, $, $$, tl, step }) {
    const cols = ['var(--magenta)', 'var(--yellow)', 'var(--blue)', 'var(--orange)'];
    root.innerHTML = `
      ${cols.map((c, i) => `<div class="abs s19-bar" style="left:${i * 480}px;top:0;width:481px;height:1080px;background:${c}"></div>`).join('')}
      <div class="abs dx s19-a" style="left:150px;top:220px;font-size:58px;color:#333">Everything we have proposed so far is</div>
      <div class="abs d s19-b" style="left:140px;top:310px;font-size:300px">A hypothesis.</div>
      <div class="abs d s19-c" style="left:140px;top:640px;font-size:300px">Test it.</div>
    `;
    gsap.set($$('.s19-a, .s19-b, .s19-c'), { opacity: 0 });
    // ★ colour drains out of the world; then nothing moves.
    tl.to($$('.s19-bar'), { scaleY: 0, transformOrigin: '50% 100%', duration: 0.9, ease: 'power4.inOut', stagger: 0.12 })
      .to($('.s19-a'), { opacity: 1, duration: 0.05 });
    step('Colour drains away. "Everything we have proposed so far…"');
    tl.to($('.s19-b'), { opacity: 1, duration: 0.03 });
    step('…is A HYPOTHESIS.');
    tl.to($('.s19-c'), { opacity: 1, duration: 0.03 });
    step('TEST IT.');
  },
});

// ── Sc20 · Proposed pilot ────────────────────────────────────────────
export const pilot = defineScene({
  id: 'pilot', act: 'VII · Test', title: 'Proposed 6-week pilot', theme: 'day', enter: 'fade',
  build({ root, $, $$, tl, step }) {
    const cx = (w: number) => 120 + w * 240;
    root.innerHTML = `
      ${actTag('VII', 'Test')}
      ${stamp('Proposed · not yet conducted', 's20-st', 'right:90px;top:70px;font-size:50px;transform:rotate(3deg)')}
      <div class="abs" style="left:120px;top:150px;display:flex;gap:110px;align-items:flex-end">
        <div class="s20-par"><div class="d" style="font-size:230px">${PILOT.weeks}</div><div class="dx" style="font-size:38px;margin-top:10px">Weeks</div></div>
        <div class="s20-par"><div class="d" style="font-size:230px">${PILOT.branches}</div><div class="dx" style="font-size:38px;margin-top:10px">Karachi branch</div></div>
        <div class="s20-par"><div class="d" style="font-size:230px">${PILOT.cashiers}</div><div class="dx" style="font-size:38px;margin-top:10px">Cashiers</div></div>
      </div>
      <div class="abs s20-strip" style="left:120px;top:540px;width:1680px;height:400px;background:var(--paper);border:5px solid var(--ink)">
        ${Array.from({ length: 7 }, (_, w) => `<div class="abs mono" style="left:${w * 240}px;top:0;width:240px;height:100%;border-left:${w ? '3px dashed rgba(11,6,16,.3)' : '0'}">
          <div style="text-align:center;font-size:32px;font-weight:700;padding-top:14px">W${w}</div></div>`).join('')}
        <div class="abs s20-base" style="left:14px;top:80px;width:212px;height:300px;background:var(--ink);color:var(--cream);padding:18px">
          <div class="dx" style="font-size:30px">Baseline</div>
          <div class="mono" style="font-size:24px;margin-top:12px;line-height:1.35">JCM, motivation &amp; satisfaction survey + operational indicators</div></div>
        <div class="abs s20-int" style="left:254px;top:80px;width:1412px;height:96px;background:var(--yellow);border:4px solid var(--ink);display:flex;align-items:center;padding:0 24px;gap:20px">
          <span class="dx" style="font-size:34px">Intervention</span><span class="mono" style="font-size:26px">the four proposed changes</span></div>
        <div class="abs s20-mid" style="left:${3 * 240 + 14}px;top:196px;width:212px;height:150px;background:var(--orange);border:4px solid var(--ink);padding:14px">
          <div class="dx" style="font-size:28px">Midpoint check</div><div class="mono" style="font-size:24px;margin-top:8px">catch problems early</div></div>
        <div class="abs s20-post" style="left:${6 * 240 + 14}px;top:196px;width:212px;height:184px;background:var(--blue);color:var(--paper);border:4px solid var(--ink);padding:14px">
          <div class="dx" style="font-size:28px">Post</div><div class="mono" style="font-size:24px;margin-top:8px">same measures again</div></div>
      </div>
    `;
    void cx;
    gsap.set($$('.s20-par'), { opacity: 0, y: 50 });
    gsap.set($('.s20-st'), { opacity: 0, scale: 1.8 });
    gsap.set($('.s20-strip'), { clipPath: 'inset(0 100% 0 0)' });
    gsap.set([$('.s20-base'), $('.s20-mid'), $('.s20-post')], { opacity: 0, y: 30 });
    gsap.set($('.s20-int'), { scaleX: 0, transformOrigin: '0 50%' });

    tl.to($$('.s20-par'), { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 })
      .to($('.s20-st'), { opacity: 1, scale: 1, duration: 0.3, ease: 'power4.in' })
      .to($('.s20-strip'), { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut' }, '-=0.1');
    step('6 weeks · 1 Karachi branch · ~10–12 cashiers (PROPOSED)');
    tl.to($('.s20-base'), { opacity: 1, y: 0, duration: 0.5 });
    step('Week 0: baseline');
    tl.to($('.s20-int'), { scaleX: 1, duration: 0.9, ease: 'power3.inOut' })
      .to($('.s20-mid'), { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
    step('Weeks 1–6: intervention · Week 3: midpoint check');
    tl.to($('.s20-post'), { opacity: 1, y: 0, duration: 0.5 });
    step('Week 6: post-measurement');
  },
});

// ── Sc21 · Both must survive ─────────────────────────────────────────
export const balance = defineScene({
  id: 'balance', act: 'VII · Test', title: 'Both must survive', theme: 'night',
  build({ root, $, $$, tl, step }) {
    const card = (cls: string, x: number, title: string, color: string, items: readonly string[], mark: string) => `
      <div class="abs ${cls}" style="left:${x}px;top:130px;width:680px;height:430px;background:var(--cream);color:var(--ink);border:5px solid var(--ink);border-top:22px solid ${color};padding:26px 34px">
        <div class="dc nowrap" style="font-size:56px">${title}</div>
        ${items.map((t) => `<div class="mono" style="font-size:28px;font-weight:700;margin-top:12px;display:flex;justify-content:space-between"><span>${t}</span><span style="color:${color}">${mark}</span></div>`).join('')}
      </div>`;
    root.innerHTML = `
      ${actTag('VII', 'Test')}
      <div class="s21-world">
        <div class="abs s21-beam" style="left:210px;top:588px;width:1500px;height:18px;background:var(--cream);border-radius:9px"></div>
        <div class="abs" style="left:880px;top:606px;width:0;height:0;border-left:80px solid transparent;border-right:80px solid transparent;border-bottom:150px solid var(--yellow)"></div>
        ${card('s21-l', 200, 'Employee experience', 'var(--blue)', ['Skill variety', 'Autonomy', 'Feedback', 'Internal work motivation', 'Job satisfaction'], `expected ${sym('up')}`)}
        ${card('s21-r', 1040, 'Operational safety', 'var(--magenta)', ['Transaction / error rate', 'Cash discrepancies', 'Routine escalations', 'Checkout complaints'], 'no worse')}
      </div>
      <div class="abs s21-hyp" style="left:0;right:0;top:790px;text-align:center">
        <div class="mono c-yel" style="font-size:28px;font-weight:700">HYPOTHETICAL: satisfaction ↑ while cash discrepancies ↑</div>
      </div>
      ${stamp('Not a success', 's21-st', 'left:0;right:0;margin:auto;width:max-content;top:850px;font-size:110px')}
      <div class="abs s21-dec" style="left:0;right:0;top:800px;display:flex;justify-content:center;gap:60px">
        ${PILOT.decisions.map((d, i) => `<div class="stamp" style="position:relative;font-size:96px;color:${['var(--blue)', 'var(--yellow)', 'var(--magenta)'][i]};transform:rotate(${[-3, 1, 3][i]}deg)">${d}</div>`).join('')}
      </div>
    `;
    const L = $('.s21-l'), R = $('.s21-r'), beam = $('.s21-beam');
    gsap.set([L, R], { opacity: 0, y: -60 });
    gsap.set([$('.s21-hyp'), $('.s21-st')], { opacity: 0 });
    gsap.set($('.s21-st'), { scale: 1.8 });
    gsap.set($$('.s21-dec > .stamp'), { opacity: 0, scale: 1.8 });
    gsap.set(beam, { rotation: -6, transformOrigin: '50% 50%' });
    gsap.set(L, { y: 78 - 60 });

    tl.to(L, { opacity: 1, y: 78, duration: 0.6 });
    step('EMPLOYEE EXPERIENCE: variety · autonomy · feedback · motivation · satisfaction');
    tl.to(R, { opacity: 1, y: 0, duration: 0.6 })
      .to(beam, { rotation: 0, duration: 0.8, ease: 'power3.inOut' }, '<0.2')
      .to(L, { y: 0, duration: 0.8, ease: 'power3.inOut' }, '<');
    step('OPERATIONAL SAFETY: errors · discrepancies · escalations · complaints — balanced');
    tl.to(beam, { rotation: 7, duration: 0.7, ease: 'power3.inOut' })
      .to(L, { y: -92, duration: 0.7, ease: 'power3.inOut' }, '<')
      .to(R, { y: 92, duration: 0.7, ease: 'power3.inOut' }, '<')
      .to($('.s21-hyp'), { opacity: 1, duration: 0.3 }, '<0.2')
      .to($('.s21-st'), { opacity: 1, scale: 1, duration: 0.3, ease: 'power4.in' });
    step('Hypothetical: satisfaction up, discrepancies up → NOT A SUCCESS');
    tl.to([$('.s21-hyp'), $('.s21-st')], { opacity: 0, duration: 0.3 })
      .to(beam, { rotation: 0, duration: 0.7, ease: 'power3.inOut' }, '<')
      .to([L, R], { y: 0, duration: 0.7, ease: 'power3.inOut' }, '<')
      .to($$('.s21-dec > .stamp'), { opacity: 1, scale: 1, duration: 0.28, ease: 'power4.in', stagger: 0.25 });
    step('Decision: SCALE · MODIFY · STOP');
  },
});
