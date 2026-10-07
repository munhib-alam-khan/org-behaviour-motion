import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { JCM, JCM_RANKED, type Tier } from '../data/research';
import { actTag, line, sym } from '../components/kit';

const tierColor: Record<Tier, string> = { strong: 'var(--blue)', moderate: 'var(--orange)', weak: 'var(--orange)', lowest: 'var(--magenta)' };

// ── Sc7 · Meaning is not the problem ─────────────────────────────────
export const strong = defineScene({
  id: 'meaning', act: 'III · Reveal', title: 'Significance 4.09 · Identity 4.04', theme: 'night', submission: 3,
  build({ root, $, $$, tl, step, beep }) {
    const X = (v: number) => 160 + (v - 1) * 400;
    root.innerHTML = `
      ${actTag('III', 'Reveal')}
      <div class="abs dx s7-l1" style="left:150px;top:150px;font-size:44px">${JCM.TS.name}</div>
      <div class="abs d s7-n1" style="left:130px;top:212px;font-size:400px">${JCM.TS.label}<span class="dx muted" style="font-size:60px;margin-left:16px">/ 5</span></div>
      <div class="beam-v s7-b1" style="left:120px;top:190px;bottom:auto;height:380px"></div>
      <div class="abs dx s7-l2" style="left:1000px;top:150px;font-size:44px">${JCM.TI.name}</div>
      <div class="abs d s7-n2" style="left:980px;top:212px;font-size:400px">${JCM.TI.label}<span class="dx muted" style="font-size:60px;margin-left:16px">/ 5</span></div>
      <div class="beam-v s7-b2" style="left:970px;top:190px;bottom:auto;height:380px"></div>

      <div class="abs s7-strip" style="left:150px;top:610px;width:1620px;height:120px;background:var(--paper);color:var(--ink);display:flex;align-items:center">
        ${['Customer arrives', 'Scan', 'Payment', 'Complete'].map((t, i) => `
          <div class="s7-seg" style="flex:1;display:flex;align-items:center;justify-content:center;gap:18px;height:100%;border-left:${i ? '4px dashed rgba(11,6,16,.35)' : '0'}">
            <span class="dx" style="font-size:38px">${t}</span>${i === 3 ? `<span class="c-blue" style="font-size:44px">${sym('check')}</span>` : ''}
          </div>${i < 3 ? `<span class="s7-arr" style="font-size:34px;margin:0 -17px;z-index:2">${sym('arrow')}</span>` : ''}`).join('')}
      </div>

      <div class="abs" style="left:${X(1)}px;width:${X(5) - X(1)}px;top:880px;height:6px;background:var(--cream);opacity:.85"></div>
      ${[1, 2, 3, 4, 5].map((v) => `<div class="abs" style="left:${X(v) - 3}px;top:868px;width:6px;height:30px;background:var(--cream)"></div>
        <div class="abs mono" style="left:${X(v) - 40}px;width:80px;text-align:center;top:905px;font-size:30px">${v}</div>`).join('')}
      <div class="abs mono muted" style="left:${X(1) - 10}px;top:950px;font-size:24px">1 = strongly disagree</div>
      <div class="abs mono muted" style="left:${X(5) - 300}px;width:310px;text-align:right;top:950px;font-size:24px">5 = strongly agree</div>
      <div class="abs s7-p1" style="left:${X(JCM.TS.mean) - 4}px;top:780px;width:8px;height:100px;background:var(--blue);transform-origin:50% 100%">
        <i style="position:absolute;left:-12px;top:-14px;width:32px;height:32px;border-radius:50%;background:var(--blue)"></i>
        <span class="mono" style="position:absolute;left:30px;top:-22px;font-size:28px;font-weight:700;white-space:nowrap">TS ${JCM.TS.label}</span></div>
      <div class="abs s7-p2" style="left:${X(JCM.TI.mean) - 4}px;top:830px;width:8px;height:50px;background:var(--blue);transform-origin:50% 100%">
        <i style="position:absolute;left:-12px;top:-14px;width:32px;height:32px;border-radius:50%;background:var(--blue)"></i>
        <span class="mono" style="position:absolute;right:30px;top:-22px;font-size:28px;font-weight:700;white-space:nowrap">TI ${JCM.TI.label}</span></div>

      <div class="full s7-freeze" style="background:rgba(11,6,16,.82);display:flex;align-items:center;justify-content:center">
        <div class="d" style="font-size:250px;text-align:center">Meaning<br><span class="c-yel">isn't the problem.</span></div>
      </div>
    `;
    gsap.set([$('.s7-n1'), $('.s7-n2')], { clipPath: 'inset(0 100% 0 0)' });
    gsap.set([$('.s7-b1'), $('.s7-b2'), $('.s7-l2'), $('.s7-freeze')], { opacity: 0 });
    gsap.set([$('.s7-p1'), $('.s7-p2')], { scaleY: 0 });
    gsap.set($('.s7-strip'), { clipPath: 'inset(0 100% 0 0)' });
    gsap.set($$('.s7-seg > *, .s7-arr'), { opacity: 0 });
    step('Task Significance label. Ruler 1–5.');

    const reveal = (n: string, b: string, p: string) => {
      beep();
      tl.to($(b), { opacity: 1, duration: 0.05 })
        .to($(b), { x: 820, duration: 0.85, ease: 'power2.inOut' })
        .to($(n), { clipPath: 'inset(0 0% 0 0)', duration: 0.85, ease: 'power2.inOut' }, '<')
        .to($(b), { opacity: 0, duration: 0.2 })
        .to($(p), { scaleY: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.3');
    };
    reveal('.s7-n1', '.s7-b1', '.s7-p1');
    step('4.09');

    tl.to($('.s7-l2'), { opacity: 1, duration: 0.3 });
    reveal('.s7-n2', '.s7-b2', '.s7-p2');
    step('Task Identity 4.04');

    tl.to($('.s7-strip'), { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power3.out' });
    $$('.s7-seg').forEach((seg, i) => {
      tl.to(seg.children, { opacity: 1, duration: 0.25 }, `>${i ? 0.35 : -0.1}`);
      const arr = $$('.s7-arr')[i];
      if (arr) tl.to(arr, { opacity: 1, duration: 0.15 }, '>');
    });
    step('Customer arrives → scan → payment → complete ✓');

    tl.to($('.s7-freeze'), { opacity: 1, duration: 0.5, ease: 'power2.out' });
    step('Freeze: MEANING ISN\'T THE PROBLEM. (pause here)');
  },
});

// ── Sc8 · The drop ───────────────────────────────────────────────────
export const drop = defineScene({
  id: 'drop', act: 'III · Reveal', title: 'The drop to 2.55', theme: 'night',
  build({ root, $, $$, tl, step, beep }) {
    const T0 = 760, U = 235;
    const X = (v: number) => T0 + (v - 1) * U;
    const rows = JCM_RANKED.map((k, i) => {
      const d = JCM[k];
      const y = 290 + i * 118;
      const left = d.mean < 3;
      return `<div class="s8-row" data-v="${d.mean}" style="position:absolute;left:0;top:${y}px;width:1920px;height:100px">
        <div class="dx" style="position:absolute;left:150px;top:30px;font-size:40px;${d.tier === 'lowest' ? 'color:var(--magenta)' : ''}">${d.name}</div>
        <div style="position:absolute;left:${T0}px;width:${4 * U}px;top:48px;height:4px;background:rgba(244,236,221,.18)"></div>
        <div class="s8-stem" style="position:absolute;top:43px;height:14px;background:${tierColor[d.tier]};left:${Math.min(X(3), X(d.mean))}px;width:${Math.abs(X(d.mean) - X(3))}px;transform-origin:${left ? '100%' : '0%'} 50%"></div>
        <div class="s8-dot" style="position:absolute;left:${X(3) - 26}px;top:24px;width:52px;height:52px;border-radius:50%;background:${tierColor[d.tier]};border:5px solid var(--ink)">
          <span class="d" style="position:absolute;top:-4px;font-size:64px;${left ? 'right:68px' : 'left:68px'}">${d.label}</span></div>
      </div>`;
    }).join('');
    root.innerHTML = `
      ${actTag('III', 'Reveal')}
      <div class="abs dx" style="left:150px;top:130px;font-size:60px">${line('The problem is somewhere else.', 's8-q')}</div>
      <div class="abs s8-r1" style="left:150px;top:290px">
        <div class="dx c-org" style="font-size:44px">${JCM.FB.name}</div>
        <div class="d" style="font-size:300px;margin-top:6px">${JCM.FB.label}</div></div>
      <div class="abs s8-r2" style="left:760px;top:470px">
        <div class="dx c-org" style="font-size:44px">${JCM.AU.name}</div>
        <div class="d" style="font-size:300px;margin-top:6px">${JCM.AU.label}</div></div>

      <div class="full s8-flood" style="background:var(--magenta);color:var(--ink)">
        <div class="abs dx" style="left:120px;top:110px;font-size:80px">${JCM.SV.name}</div>
        <div class="abs mono" style="left:124px;top:215px;font-size:32px;font-weight:700">LOWEST OF ALL FIVE · OUT OF 5</div>
        <div class="abs d s8-big" style="right:90px;top:130px;font-size:1020px;letter-spacing:-.03em;transform-origin:100% 100%">${JCM.SV.label}</div>
      </div>

      <div class="full s8-cmp theme-night" style="background:radial-gradient(120% 95% at 50% 38%, #2d1243 0%, #1c0a29 52%, #0b0610 100%)">
        ${actTag('III', 'Reveal')}
        <div class="abs dc" style="left:150px;top:110px;font-size:96px">The full diagnosis</div>
        <div class="abs lbl muted" style="left:154px;top:215px;font-size:26px">Mean score per job characteristic · n = 25 · scale 1–5</div>
        <div class="abs" style="left:${X(3) - 2}px;top:270px;width:4px;height:620px;background:repeating-linear-gradient(var(--cream) 0 12px,transparent 12px 22px);opacity:.5"></div>
        ${rows}
        ${[1, 2, 3, 4, 5].map((v) => `<div class="abs mono" style="left:${X(v) - 40}px;width:80px;text-align:center;top:900px;font-size:30px">${v}</div>`).join('')}
        <div class="abs mono muted" style="left:${X(3) - 150}px;width:300px;text-align:center;top:945px;font-size:24px">scale midpoint</div>
        <div class="abs mono muted" style="left:${X(1) - 40}px;top:945px;font-size:24px">strongly disagree</div>
        <div class="abs mono muted" style="left:${X(5) - 230}px;width:270px;text-align:right;top:945px;font-size:24px">strongly agree</div>
      </div>
    `;
    gsap.set($('.s8-q .in'), { yPercent: 110 });
    gsap.set([$('.s8-r1'), $('.s8-r2')], { opacity: 0, y: -80 });
    gsap.set($('.s8-flood'), { clipPath: 'inset(100% 0 0 0)' });
    gsap.set($('.s8-big'), { scale: 0.6 });
    gsap.set($('.s8-cmp'), { opacity: 0 });
    gsap.set($$('.s8-stem'), { scaleX: 0 });

    tl.to($('.s8-q .in'), { yPercent: 0, duration: 0.7 });
    step('"The problem appears somewhere else."');
    tl.to($('.s8-r1'), { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    step('Feedback 3.40');
    tl.to($('.s8-r2'), { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    step('Autonomy 2.84');

    beep();
    tl.to($('.s8-flood'), { clipPath: 'inset(0% 0 0 0)', duration: 0.55, ease: 'power4.inOut' })
      .to($('.s8-big'), { scale: 1, duration: 1.3, ease: 'expo.out' }, '-=0.25');
    step('★ SKILL VARIETY 2.55 — the lowest score');

    tl.to($('.s8-cmp'), { opacity: 1, duration: 0.5, ease: 'power2.inOut' });
    $$('.s8-row').forEach((row, i) => {
      const v = +row.dataset.v!;
      tl.to(row.querySelector('.s8-dot'), { x: (v - 3) * U, duration: 0.9, ease: 'power3.out' }, `<${i ? 0.08 : 0.2}`)
        .to(row.querySelector('.s8-stem'), { scaleX: 1, duration: 0.9, ease: 'power3.out' }, '<');
    });
    step('Full comparison of all five (1–5 scale)');
  },
});

// ── Sc9 · Meaningful. But narrow. ────────────────────────────────────
export const narrow = defineScene({
  id: 'narrow', act: 'III · Reveal', title: 'Meaningful. But narrow.', theme: 'day',
  build({ root, $, tl, step }) {
    root.innerHTML = `
      <div class="abs d s9-m" style="left:0;right:0;top:300px;text-align:center;font-size:330px;transform-origin:50% 0">Meaningful.</div>
      <div class="barrier l s9-bl" style="left:0;width:650px"></div>
      <div class="barrier r s9-br" style="right:0;width:650px"></div>
      <div class="abs d c-mag s9-n" style="left:650px;width:620px;top:470px;text-align:center;font-size:180px">But<br>narrow.</div>
    `;
    gsap.set($('.s9-bl'), { xPercent: -101 });
    gsap.set($('.s9-br'), { xPercent: 101 });
    gsap.set($('.s9-n'), { opacity: 0, y: 40 });
    tl.from($('.s9-m'), { opacity: 0, scale: 1.08, duration: 0.8 });
    step('MEANINGFUL.');
    tl.to($('.s9-m'), { scale: 0.36, y: -170, duration: 0.9, ease: 'power3.inOut' })
      .to($('.s9-bl'), { xPercent: 0, duration: 0.9, ease: 'power3.inOut' }, '<0.1')
      .to($('.s9-br'), { xPercent: 0, duration: 0.9, ease: 'power3.inOut' }, '<')
      .to($('.s9-n'), { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
    step('BUT NARROW. (the lane closes in)');
  },
});
