import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { JCM, REDESIGN, STUDY } from '../data/research';
import { actTag, sym } from '../components/kit';
import { counter } from '../components/illustrations';

// ── Sc22 · Routine ≠ meaningless ─────────────────────────────────────
export const routine = defineScene({
  id: 'routine', act: 'VIII · Conclude', title: 'Routine ≠ meaningless', theme: 'day', enter: 'fade', submission: 2,
  build({ root, $, $$, tl, step }) {
    root.innerHTML = `
      ${actTag('VIII', 'Conclude')}
      <div class="abs d s22-h" style="left:120px;top:130px;font-size:250px">Routine<br><span class="c-mag">${sym('neq')}</span> meaningless</div>
      <div class="abs d s22-s" style="left:120px;top:150px;font-size:150px;width:1700px">Redesign the environment <span class="c-mag">around</span> the cashier — not the cashier.</div>
      <div class="abs s22-a" style="left:120px;top:640px;width:780px">
        <div class="lbl c-blue">Already there</div>
        ${[JCM.TS, JCM.TI].map((d) => `<div class="s22-i" style="display:flex;align-items:center;gap:20px;margin-top:20px"><span class="c-blue" style="font-size:56px">${sym('check')}</span><span class="dx" style="font-size:42px">${d.name}</span><span class="mono" style="font-size:32px;font-weight:700">${d.label}</span></div>`).join('')}
      </div>
      <div class="abs s22-b" style="left:1000px;top:640px;width:820px">
        <div class="lbl c-org">What appears to be missing</div>
        ${['Variety', 'Appropriate discretion', 'Developmental feedback'].map((t) => `<div class="s22-i" style="display:flex;align-items:center;gap:20px;margin-top:20px"><span style="width:44px;height:44px;border:6px solid var(--orange);display:inline-block"></span><span class="dx" style="font-size:42px">${t}</span></div>`).join('')}
      </div>
    `;
    gsap.set($$('.s22-a .s22-i, .s22-b .s22-i, .s22-a .lbl, .s22-b .lbl'), { opacity: 0, x: -30 });
    gsap.set($('.s22-s'), { opacity: 0, y: 40 });
    tl.from($('.s22-h'), { opacity: 0, y: 50, duration: 0.8 });
    step('ROUTINE ≠ MEANINGLESS');
    tl.to($$('.s22-a > *'), { opacity: 1, x: 0, duration: 0.45, stagger: 0.15 });
    step('Already there: significance 4.09 · identity 4.04');
    tl.to($$('.s22-b > *'), { opacity: 1, x: 0, duration: 0.45, stagger: 0.15 });
    step('Missing: variety · discretion · developmental feedback');
    tl.to($('.s22-h'), { opacity: 0, y: -40, duration: 0.4 })
      .to($('.s22-s'), { opacity: 1, y: 0, duration: 0.7 }, '-=0.1');
    step('"Redesign the environment around the cashier."');
  },
});

// ── Sc23 · Finale ────────────────────────────────────────────────────
export const finale = defineScene({
  id: 'finale', act: 'VIII · Conclude', title: 'A better-designed one', theme: 'black', submission: 4,
  build({ root, $, $$, tl, step }) {
    const ends = [[540, 370], [1380, 370], [540, 830], [1380, 830]];
    const lab = [[110, 330, 'left'], [1400, 330, 'left'], [110, 790, 'left'], [1400, 790, 'left']] as const;
    const cols = ['#FF2E88', '#FF7A1A', '#8A4DFF', '#3D6BFF'];
    root.innerHTML = `
      <svg class="abs s23-lanes" width="1920" height="1080" style="left:0;top:0">
        ${ends.map(([x, y], i) => `<line class="s23-ln" x1="960" y1="600" x2="${x}" y2="${y}" stroke="${cols[i]}" stroke-width="16" stroke-linecap="round"/>`).join('')}
      </svg>
      ${REDESIGN.components.map((c, i) => `<div class="abs s23-lab" style="left:${lab[i][0]}px;top:${lab[i][1]}px;width:420px">
        <div class="d" style="font-size:80px;color:${cols[i]}">${c.n}</div><div class="dx" style="font-size:30px;line-height:1.05">${c.name}</div></div>`).join('')}
      <div class="abs s23-ctr" style="left:810px;top:450px;width:300px;height:300px">${counter()}</div>
      <div class="barrier l s23-bl" style="left:0;width:740px;background:var(--plum)"></div>
      <div class="barrier r s23-br" style="right:0;width:740px;background:var(--plum)"></div>
      <div class="abs s23-ph" style="left:0;right:0;top:110px;text-align:center">
        <span class="d" style="font-size:130px">A job someone </span><span class="s23-slot d" style="font-size:130px;display:inline-block;position:relative;width:560px;text-align:left">
          <span class="s23-w1" style="position:absolute;left:0;top:0">performs</span><span class="s23-w2 c-yel" style="position:absolute;left:0;top:0">owns.</span>&nbsp;</span>
      </div>
      <div class="abs d s23-a" style="left:0;right:0;top:200px;text-align:center;font-size:200px">Not a different job.</div>
      <div class="abs d c-yel s23-b" style="left:0;right:0;top:400px;text-align:center;font-size:200px">A better-designed one.</div>
      <div class="abs s23-ty" style="left:0;right:0;top:700px;text-align:center">
        <div class="dx" style="font-size:64px">Thank you.</div>
        <div class="mono muted" style="font-size:28px;margin-top:22px">${STUDY.team.join(' · ')}</div>
        <div class="mono muted" style="font-size:24px;margin-top:10px">${STUDY.institution} · ${STUDY.course} · ${STUDY.term}</div>
      </div>
      <div class="abs mono s23-ref" style="left:120px;right:120px;bottom:40px;text-align:center;font-size:22px;opacity:.5">${STUDY.reference}</div>
    `;
    const lns = $$<SVGLineElement>('.s23-ln');
    lns.forEach((l, i) => { const L = Math.hypot(ends[i][0] - 960, ends[i][1] - 600); gsap.set(l, { attr: { 'stroke-dasharray': L, 'stroke-dashoffset': L } }); });
    gsap.set($$('.s23-lab'), { opacity: 0 });
    gsap.set([$('.s23-ph'), $('.s23-a'), $('.s23-b'), $('.s23-ty'), $('.s23-ref'), $('.s23-w2')], { opacity: 0 });
    gsap.set($('.s23-bl'), { x: 0 });

    tl.from([$('.s23-bl'), $('.s23-br')], { xPercent: (i: number) => (i ? 101 : -101), duration: 0.8, ease: 'power3.out' })
      .from($('.s23-ctr'), { opacity: 0, scale: 0.85, duration: 0.6 }, '<0.2');
    step('The narrow lane, as it is today');
    tl.to($('.s23-bl'), { xPercent: -101, duration: 1.2, ease: 'power3.inOut' })
      .to($('.s23-br'), { xPercent: 101, duration: 1.2, ease: 'power3.inOut' }, '<')
      .to(lns, { attr: { 'stroke-dashoffset': 0 }, duration: 0.8, ease: 'power2.out', stagger: 0.1 }, '-=0.6')
      .to($$('.s23-lab'), { opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.4');
    step('★ The workspace opens; the counter stays at the centre');
    tl.to($('.s23-ph'), { opacity: 1, duration: 0.4 })
      .to($('.s23-w1'), { opacity: 0, y: -40, duration: 0.5, ease: 'power3.in' }, '+=0.7')
      .fromTo($('.s23-w2'), { y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    step('"…a job someone performs… and a job someone owns."');
    tl.to([$('.s23-ph'), $('.s23-lanes'), ...$$('.s23-lab')], { opacity: 0, duration: 0.5 })
      .to($('.s23-ctr'), { y: 260, scale: 0.6, duration: 0.8, ease: 'power3.inOut' }, '<')
      .fromTo($('.s23-a'), { y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3');
    step('NOT A DIFFERENT JOB.');
    tl.fromTo($('.s23-b'), { y: 40 }, { opacity: 1, y: 0, duration: 0.7 });
    step('A BETTER-DESIGNED ONE.');
    tl.to($('.s23-ctr'), { opacity: 0, duration: 0.4 })
      .to([$('.s23-ty'), $('.s23-ref')], { opacity: 1, duration: 0.8 }, '<0.2');
    step('Thank you.');
  },
});
