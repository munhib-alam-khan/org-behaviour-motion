import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { JCM, JCM_RANKED, type Tier } from '../data/research';
import { actTag, barcode, line, sym } from '../components/kit';
import { frame, markerCircle, mk, pic, plate, torn } from '../components/photo';

const tierColor: Record<Tier, string> = { strong: 'var(--blue)', moderate: 'var(--orange)', weak: 'var(--orange)', lowest: 'var(--magenta)' };
/** A04 placement shared by Sc8 (squeeze) and Sc9 so the cut is continuous. */
const CASHIER = 'left:315px;top:120px;width:1380px';
const SLOT = { l: 660, r: 1260 };

// ── Sc7 · Meaning is not the problem ─────────────────────────────────
export const strong = defineScene({
  id: 'meaning', act: 'III · Reveal', title: 'Significance 4.09 · Identity 4.04', theme: 'night', submission: 3,
  build({ root, $, $$, tl, step, beep }) {
    const X = (v: number) => 160 + (v - 1) * 400;
    root.innerHTML = `
      ${actTag('III', 'Reveal')}
      ${frame('a08', { x: 100, y: 120, w: 800, h: 430, rot: -2.5, cls: 's7-f1' })}
      ${frame('a06', { x: 1010, y: 105, w: 800, h: 430, rot: 2, cls: 's7-f2', pos: '50% 35%' })}
      <div class="lower3 s7-l1" style="left:96px;top:96px"><span class="k">MONEY · ACCURACY · THE CUSTOMER</span><span style="font-size:34px">${JCM.TS.name}</span></div>
      <div class="lower3 s7-l2" style="left:1030px;top:80px"><span class="k">START → FINISH</span><span style="font-size:34px">${JCM.TI.name}</span></div>
      <div class="abs d s7-n1" style="left:130px;top:330px;font-size:300px;text-shadow:0 12px 0 rgba(0,0,0,.55)">${JCM.TS.label}<span class="dx" style="font-size:54px;margin-left:12px;opacity:.85">/ 5</span></div>
      <div class="beam-v s7-b1" style="left:120px;top:320px;bottom:auto;height:300px"></div>
      <div class="abs d s7-n2" style="left:1050px;top:330px;font-size:300px;text-shadow:0 12px 0 rgba(0,0,0,.55)">${JCM.TI.label}<span class="dx" style="font-size:54px;margin-left:12px;opacity:.85">/ 5</span></div>
      <div class="beam-v s7-b2" style="left:1040px;top:320px;bottom:auto;height:300px"></div>

      <div class="paper s7-strip" style="left:150px;top:640px;width:1620px;height:118px;display:flex;align-items:center;clip-path:polygon(0 0,100% 0,99% 10%,100% 20%,99% 30%,100% 40%,99% 50%,100% 60%,99% 70%,100% 80%,99% 90%,100% 100%,0 100%,1% 90%,0 80%,1% 70%,0 60%,1% 50%,0 40%,1% 30%,0 20%,1% 10%)">
        ${['Customer arrives', 'Scan', 'Payment', 'Complete'].map((t, i) => `
          <div class="s7-seg" style="flex:1;display:flex;align-items:center;justify-content:center;gap:18px;height:100%;border-left:${i ? '4px dashed rgba(11,6,16,.35)' : '0'}">
            <span class="mono" style="font-size:36px;font-weight:700;text-transform:uppercase">${t}</span>${i === 3 ? `<span class="c-blue" style="font-size:44px">${sym('check')}</span>` : ''}
          </div>${i < 3 ? `<span class="s7-arr" style="font-size:34px;margin:0 -17px;z-index:2">${sym('arrow')}</span>` : ''}`).join('')}
      </div>
      <svg class="mk-svg s7-ring" width="1920" height="1080"><path d="${markerCircle(1580, 700, 200, 70, 9)}" stroke="#FF2E88" stroke-width="7"/></svg>

      <div class="abs" style="left:${X(1)}px;width:${X(5) - X(1)}px;top:880px;height:6px;background:var(--cream);opacity:.85"></div>
      ${[1, 2, 3, 4, 5].map((v) => `<div class="abs" style="left:${X(v) - 3}px;top:868px;width:6px;height:30px;background:var(--cream)"></div>
        <div class="abs mono" style="left:${X(v) - 40}px;width:80px;text-align:center;top:905px;font-size:30px">${v}</div>`).join('')}
      <div class="abs mono" style="left:${X(1) - 10}px;top:950px;font-size:24px;opacity:.7">1 = strongly disagree</div>
      <div class="abs mono" style="left:${X(5) - 300}px;width:310px;text-align:right;top:950px;font-size:24px;opacity:.7">5 = strongly agree</div>
      <div class="abs s7-p1" style="left:${X(JCM.TS.mean) - 4}px;top:790px;width:8px;height:90px;background:var(--blue);transform-origin:50% 100%">
        <i style="position:absolute;left:-12px;top:-14px;width:32px;height:32px;border-radius:50%;background:var(--blue)"></i>
        <span class="mono" style="position:absolute;left:30px;top:-22px;font-size:28px;font-weight:700;white-space:nowrap">TS ${JCM.TS.label}</span></div>
      <div class="abs s7-p2" style="left:${X(JCM.TI.mean) - 4}px;top:830px;width:8px;height:50px;background:var(--blue);transform-origin:50% 100%">
        <i style="position:absolute;left:-12px;top:-14px;width:32px;height:32px;border-radius:50%;background:var(--blue)"></i>
        <span class="mono" style="position:absolute;right:30px;top:-22px;font-size:28px;font-weight:700;white-space:nowrap">TI ${JCM.TI.label}</span></div>

      <div class="full s7-freeze" style="background:rgba(11,6,16,.86);display:flex;align-items:center;justify-content:center">
        <div class="d" style="font-size:250px;text-align:center">Meaning<br><span class="c-yel">isn't the problem.</span></div>
      </div>
    `;
    gsap.set([$('.s7-n1'), $('.s7-n2')], { clipPath: 'inset(0 100% 0 0)' });
    gsap.set([$('.s7-b1'), $('.s7-b2'), $('.s7-freeze'), $('.s7-f2'), $('.s7-l2')], { opacity: 0 });
    gsap.set($('.s7-f2'), { x: 120, rotation: 8 });
    gsap.set([$('.s7-p1'), $('.s7-p2')], { scaleY: 0 });
    gsap.set($('.s7-strip'), { clipPath: 'inset(0 100% 0 0)' });
    gsap.set($$('.s7-seg > *, .s7-arr'), { opacity: 0 });
    const ring = $<SVGPathElement>('.s7-ring path');
    const RL = ring.getTotalLength();
    gsap.set(ring, { attr: { 'stroke-dasharray': RL, 'stroke-dashoffset': RL } });
    tl.from([$('.s7-f1'), $('.s7-l1')], { opacity: 0, x: -80, rotation: -8, duration: 0.7, stagger: 0.1 });
    step('Task Significance: money, accuracy, the customer. Ruler 1–5.');

    const reveal = (n: string, b: string, p: string) => {
      beep();
      tl.to($(b), { opacity: 1, duration: 0.05 })
        .to($(b), { x: 760, duration: 0.85, ease: 'power2.inOut' })
        .to($(n), { clipPath: 'inset(0 0% 0 0)', duration: 0.85, ease: 'power2.inOut' }, '<')
        .to($(b), { opacity: 0, duration: 0.2 })
        .to($(p), { scaleY: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.3');
    };
    reveal('.s7-n1', '.s7-b1', '.s7-p1');
    step('4.09');

    tl.to([$('.s7-f2'), $('.s7-l2')], { opacity: 1, x: 0, rotation: (i: number) => (i ? 0 : 2), duration: 0.6 });
    reveal('.s7-n2', '.s7-b2', '.s7-p2');
    step('Task Identity 4.04');

    tl.to($('.s7-strip'), { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power3.out' });
    $$('.s7-seg').forEach((seg, i) => {
      tl.to(seg.children, { opacity: 1, duration: 0.25 }, `>${i ? 0.3 : -0.1}`);
      const arr = $$('.s7-arr')[i];
      if (arr) tl.to(arr, { opacity: 1, duration: 0.15 }, '>');
    });
    tl.to(ring, { attr: { 'stroke-dashoffset': 0 }, duration: 0.4 });
    step('Customer arrives → scan → payment → complete ✓');

    tl.to($('.s7-freeze'), { opacity: 1, duration: 0.5, ease: 'power2.out' });
    step('Freeze: MEANING ISN\'T THE PROBLEM. (pause here)');
  },
});

// ── Sc8 · The drop: 3.40 → 2.84 → the squeeze at 2.55 → full diagnosis ─
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
        <div class="s8-track" style="position:absolute;left:${T0}px;width:${4 * U}px;top:48px;height:4px;background:rgba(244,236,221,.22);transform-origin:0 50%"></div>
        <div class="s8-stem" style="position:absolute;top:43px;height:14px;background:${tierColor[d.tier]};left:${Math.min(X(3), X(d.mean))}px;width:${Math.abs(X(d.mean) - X(3))}px;transform-origin:${left ? '100%' : '0%'} 50%"></div>
        <div class="s8-dot" style="position:absolute;left:${X(3) - 26}px;top:24px;width:52px;height:52px;border-radius:50%;background:${tierColor[d.tier]};border:5px solid #07040a">
          <span class="d" style="position:absolute;top:-4px;font-size:64px;${left ? 'right:68px' : 'left:68px'}">${d.label}</span></div>
      </div>`;
    }).join('');
    const chip = (cls: string, x: number, y: number, rot: number, seed: number, name: string, v: string) => `
      <div class="abs ${cls}" style="left:${x}px;top:${y}px;width:560px;height:350px;transform:rotate(${rot}deg);filter:drop-shadow(12px 14px 0 rgba(0,0,0,.5))">
        <div class="full" style="background:var(--orange);clip-path:${torn(seed, 2.4)};padding:30px 40px;color:var(--ink)">
          <div class="dx" style="font-size:40px">${name}</div>
          <div class="d" style="font-size:270px;margin-top:4px">${v}</div>
        </div></div>`;
    root.innerHTML = `
      ${plate('a03_night', '', 'opacity:.55')}
      ${actTag('III', 'Reveal')}
      <div class="abs dx" style="left:150px;top:130px;font-size:60px">${line('The problem is somewhere else.', 's8-q')}</div>
      ${chip('s8-r1', 150, 270, -3, 21, JCM.FB.name, JCM.FB.label)}
      ${chip('s8-r2', 820, 470, 2.5, 22, JCM.AU.name, JCM.AU.label)}

      <div class="full s8-sq" style="background:#120818">
        ${pic('a04_cut', CASHIER, 's8-man')}
        <div class="abs s8-wl" style="left:0;top:0;width:${SLOT.l}px;height:1080px;background:var(--magenta)">
          <div class="d" style="position:absolute;right:30px;bottom:150px;font-size:440px;color:var(--ink);letter-spacing:-.03em">${JCM.SV.label}</div>
          <div class="mono" style="position:absolute;right:40px;bottom:110px;font-size:28px;font-weight:700;color:var(--ink)">OUT OF 5</div>
        </div>
        <div class="abs s8-wr" style="left:${SLOT.r}px;top:0;width:${1920 - SLOT.r}px;height:1080px;background:var(--magenta);color:var(--ink)">
          <div class="dx" style="position:absolute;left:44px;top:120px;font-size:72px;line-height:1">${JCM.SV.name.replace(' ', '<br>')}</div>
          ${mk('lowest of<br>all five', 'left:48px;top:320px;font-size:96px;color:var(--ink);transform:rotate(-5deg);white-space:normal', '')}
        </div>
      </div>

      <div class="full s8-cmp" style="background:#07040a">
        <div class="abs s8-bc" style="left:560px;top:240px;width:800px;height:600px;display:flex;align-items:center;justify-content:center;color:var(--cream)">${barcode(255, 800, 600)}</div>
        <div class="s8-chart">
          ${actTag('III', 'Reveal')}
          <div class="abs dc" style="left:150px;top:110px;font-size:96px">The full diagnosis</div>
          <div class="abs lbl" style="left:154px;top:215px;font-size:26px;opacity:.75">Mean score per job characteristic · n = 25 · scale 1–5</div>
          <div class="abs" style="left:${X(3) - 2}px;top:270px;width:4px;height:620px;background:repeating-linear-gradient(var(--cream) 0 12px,transparent 12px 22px);opacity:.5"></div>
          ${rows}
          ${[1, 2, 3, 4, 5].map((v) => `<div class="abs mono" style="left:${X(v) - 40}px;width:80px;text-align:center;top:900px;font-size:30px">${v}</div>`).join('')}
          <div class="abs mono" style="left:${X(3) - 150}px;width:300px;text-align:center;top:945px;font-size:24px;opacity:.7">scale midpoint</div>
          <div class="abs mono" style="left:${X(1) - 40}px;top:945px;font-size:24px;opacity:.7">strongly disagree</div>
          <div class="abs mono" style="left:${X(5) - 230}px;width:270px;text-align:right;top:945px;font-size:24px;opacity:.7">strongly agree</div>
        </div>
      </div>
    `;
    gsap.set($('.s8-q .in'), { yPercent: 110 });
    gsap.set([$('.s8-r1'), $('.s8-r2')], { opacity: 0, y: -160, rotation: '-=10' });
    gsap.set($('.s8-sq'), { opacity: 0 });
    gsap.set($('.s8-wl'), { xPercent: -100 });
    gsap.set($('.s8-wr'), { xPercent: 100 });
    gsap.set($('.s8-man'), { y: 120, scale: 1.04, transformOrigin: '47% 100%' });
    gsap.set([$('.s8-cmp'), $('.s8-chart')], { opacity: 0 });
    gsap.set($$('.s8-stem'), { scaleX: 0 });
    gsap.set($$('.s8-track'), { scaleX: 0 });

    tl.to($('.s8-q .in'), { yPercent: 0, duration: 0.7 });
    step('"The problem appears somewhere else."');
    tl.to($('.s8-r1'), { opacity: 1, y: 0, rotation: '+=10', duration: 0.7, ease: 'power3.out' });
    step('Feedback 3.40');
    tl.to($('.s8-r2'), { opacity: 1, y: 0, rotation: '+=10', duration: 0.7, ease: 'power3.out' });
    step('Autonomy 2.84');

    beep();
    tl.to($('.s8-sq'), { opacity: 1, duration: 0.25 })
      .to($('.s8-man'), { y: 0, duration: 0.8, ease: 'power3.out' }, '<')
      .to($('.s8-wl'), { xPercent: 0, duration: 0.75, ease: 'power4.inOut' }, '-=0.45')
      .to($('.s8-wr'), { xPercent: 0, duration: 0.75, ease: 'power4.inOut' }, '<')
      .to($('.s8-man'), { scale: 0.98, duration: 0.3, ease: 'power2.in' }, '-=0.15');
    step('★ SKILL VARIETY 2.55: the walls close in on the cashier');

    tl.to($('.s8-cmp'), { opacity: 1, duration: 0.35 })
      .fromTo($('.s8-bc'), { scale: 0.35, opacity: 1 }, { scale: 3.2, opacity: 0, duration: 1.0, ease: 'power3.in' }, '<')
      .to($('.s8-chart'), { opacity: 1, duration: 0.3 }, '-=0.35')
      .to($$('.s8-track'), { scaleX: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' }, '<');
    $$('.s8-row').forEach((row, i) => {
      const v = +row.dataset.v!;
      tl.to(row.querySelector('.s8-dot'), { x: (v - 3) * U, duration: 0.9, ease: 'power3.out' }, `<${i ? 0.08 : 0.15}`)
        .to(row.querySelector('.s8-stem'), { scaleX: 1, duration: 0.9, ease: 'power3.out' }, '<');
    });
    step('Barcode becomes the chart: full comparison on the 1–5 scale');
  },
});

// ── Sc9 · Meaningful. But narrow. ────────────────────────────────────
export const narrow = defineScene({
  id: 'narrow', act: 'III · Reveal', title: 'Meaningful. But narrow.', theme: 'night',
  build({ root, $, tl, step }) {
    root.innerHTML = `
      ${plate('a03_blur', '', 'opacity:.75')}
      <div class="full" style="background:rgba(11,6,16,.35)"></div>
      ${pic('a04_cut', CASHIER, 's9-man')}
      <div class="abs d s9-m" style="left:0;right:0;top:470px;text-align:center;font-size:330px;transform-origin:50% 0;text-shadow:0 14px 0 rgba(0,0,0,.55);z-index:5">Meaningful.</div>
      <div class="barrier l s9-bl" style="left:0;width:${SLOT.l}px"></div>
      <div class="barrier r s9-br" style="left:${SLOT.r}px;width:${1920 - SLOT.r}px"></div>
      <div class="abs d c-mag s9-n" style="left:0;right:0;top:760px;z-index:6;text-align:center;font-size:230px;text-shadow:0 10px 0 rgba(0,0,0,.6)">But narrow.</div>
    `;
    gsap.set($('.s9-bl'), { xPercent: -101 });
    gsap.set($('.s9-br'), { xPercent: 101 });
    gsap.set($('.s9-n'), { opacity: 0, y: 40 });
    tl.from($('.s9-m'), { opacity: 0, scale: 1.08, duration: 0.8 });
    step('MEANINGFUL. (the same cashier, now with room around him)');
    tl.to($('.s9-m'), { scale: 0.34, y: -400, duration: 0.9, ease: 'power3.inOut' })
      .to($('.s9-bl'), { xPercent: 0, duration: 0.9, ease: 'power3.inOut' }, '<0.1')
      .to($('.s9-br'), { xPercent: 0, duration: 0.9, ease: 'power3.inOut' }, '<')
      .to($('.s9-n'), { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
    step('BUT NARROW. (the lane closes in)');
  },
});
