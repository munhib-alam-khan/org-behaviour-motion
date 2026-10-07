import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { JCM, REDESIGN, STUDY } from '../data/research';
import { actTag, sym } from '../components/kit';
import { markerLine, mk, pic, plate } from '../components/photo';
import { img } from '../assets';

// ── Sc22 · Routine ≠ meaningless — a poster on the opening image ─────
export const routine = defineScene({
  id: 'routine', act: 'VIII · Conclude', title: 'Routine ≠ meaningless', theme: 'night', enter: 'fade', submission: 2,
  build({ root, $, $$, tl, step }) {
    root.innerHTML = `
      ${plate('a01', 's22-ph')}
      <div class="full" style="background:linear-gradient(90deg,rgba(11,6,16,.92) 0%,rgba(11,6,16,.75) 45%,rgba(11,6,16,.25) 100%)"></div>
      <div class="shade-b"></div>
      ${actTag('VIII', 'Conclude')}
      <div class="abs d s22-h" style="left:110px;top:120px;font-size:250px;text-shadow:0 12px 0 rgba(0,0,0,.4)">Routine<br><span class="c-mag">${sym('neq')}</span> meaningless</div>
      <div class="abs d s22-s" style="left:110px;top:150px;font-size:150px;width:1700px;text-shadow:0 10px 0 rgba(0,0,0,.45)">Redesign the environment <span class="c-yel">around</span> the cashier — not the cashier.</div>
      <div class="abs s22-a" style="left:110px;top:670px;width:780px">
        <div class="lbl c-blue">Already there</div>
        ${[JCM.TS, JCM.TI].map((d) => `<div class="s22-i" style="display:flex;align-items:center;gap:20px;margin-top:20px"><span class="mk" style="position:relative;font-size:70px;color:#7FA0FF;line-height:.6">${sym('check')}</span><span class="dx" style="font-size:42px">${d.name}</span><span class="mono" style="font-size:32px;font-weight:700">${d.label}</span></div>`).join('')}
      </div>
      <div class="abs s22-b" style="left:1000px;top:670px;width:820px">
        <div class="lbl c-org">What appears to be missing</div>
        ${['Variety', 'Appropriate discretion', 'Developmental feedback'].map((t) => `<div class="s22-i" style="display:flex;align-items:center;gap:20px;margin-top:20px"><span style="width:58px;height:40px;border:5px dashed var(--orange);border-radius:4px 14px 14px 4px;display:inline-block"></span><span class="dx" style="font-size:42px">${t}</span></div>`).join('')}
      </div>
    `;
    gsap.set($$('.s22-a > *, .s22-b > *'), { opacity: 0, x: -30 });
    gsap.set($('.s22-s'), { opacity: 0, y: 40 });
    tl.from($('.s22-h'), { opacity: 0, y: 50, duration: 0.8 })
      .from($('.s22-ph'), { scale: 1.08, duration: 1.4, ease: 'power2.out' }, '<');
    step('ROUTINE ≠ MEANINGLESS (the opening image, read differently)');
    tl.to($$('.s22-a > *'), { opacity: 1, x: 0, duration: 0.45, stagger: 0.15 });
    step('Already there: significance 4.09 · identity 4.04');
    tl.to($$('.s22-b > *'), { opacity: 1, x: 0, duration: 0.45, stagger: 0.15 });
    step('Missing: variety · discretion · developmental feedback');
    tl.to($('.s22-h'), { opacity: 0, y: -40, duration: 0.4 })
      .to($('.s22-s'), { opacity: 1, y: 0, duration: 0.7 }, '-=0.1');
    step('"Redesign the environment around the cashier."');
    void mk;
  },
});

// ── Sc23 · Finale: the lane opens onto the store; collapse to cream ──
export const finale = defineScene({
  id: 'finale', act: 'VIII · Conclude', title: 'A better-designed one', theme: 'black', submission: 4,
  build({ root, $, $$, tl, step }) {
    const ends = [[470, 340], [1450, 340], [470, 830], [1450, 830]];
    const lab = [[110, 260], [1470, 260], [110, 760], [1470, 760]];
    const cols = ['#FF2E88', '#FF7A1A', '#8A4DFF', '#3D6BFF'];
    root.innerHTML = `
      ${plate('a03', 's23-world', 'filter:brightness(.6)')}
      <svg class="abs s23-lanes" width="1920" height="1080" style="left:0;top:0">
        ${ends.map(([x, y], i) => `<path class="s23-ln" d="${markerLine(960, 640, x, y, i + 21, 14)}" stroke="${cols[i]}" stroke-width="30" stroke-linecap="round" fill="none" opacity=".92"/>`).join('')}
      </svg>
      ${REDESIGN.components.map((c, i) => `<div class="abs s23-lab" style="left:${lab[i][0]}px;top:${lab[i][1]}px;width:360px;background:rgba(11,6,16,.8);padding:14px 18px;transform:rotate(${[-2, 2, 1.5, -1.5][i]}deg)">
        <div class="d" style="font-size:72px;color:${cols[i]}">${c.n}</div><div class="dx" style="font-size:26px;line-height:1.05">${c.name}</div></div>`).join('')}
      ${pic('a04_sticker', 'left:640px;top:470px;width:640px', 's23-man')}
      <div class="barrier l s23-bl" style="left:0;width:660px;background:var(--plum)"></div>
      <div class="barrier r s23-br" style="left:1260px;width:660px;background:var(--plum)"></div>
      <div class="abs s23-ph" style="left:0;right:0;top:110px;text-align:center">
        <span class="d" style="font-size:130px;text-shadow:0 10px 0 rgba(0,0,0,.5)">A job someone </span><span class="s23-slot d" style="font-size:130px;display:inline-block;position:relative;width:560px;text-align:left">
          <span class="s23-w1" style="position:absolute;left:0;top:0">performs</span><span class="s23-w2 c-yel" style="position:absolute;left:0;top:0">owns.</span>&nbsp;</span>
      </div>
      <div class="full s23-dark" style="background:rgba(7,4,10,.88)"></div>
      <div class="abs d s23-a" style="left:0;right:0;top:250px;text-align:center;font-size:200px">Not a different job.</div>
      <div class="abs d c-yel s23-b" style="left:0;right:0;top:450px;text-align:center;font-size:200px">A better-designed one.</div>
      <div class="full s23-cream" style="background:var(--cream)">
        <div class="abs s23-rc" style="left:760px;top:0;width:400px;height:620px;background:url(${img('receipt_strip')}) center/100% 100%;filter:drop-shadow(0 20px 30px rgba(0,0,0,.25))">
          <div class="mono" style="position:absolute;left:46px;right:46px;top:300px;color:var(--ink);text-align:center">
            <div style="font-weight:700;font-size:56px">Thank you.</div>
            <div style="border-top:3px dashed var(--ink);margin:18px 0 12px"></div>
            ${STUDY.team.map((n) => `<div style="font-size:21px;line-height:1.5;font-weight:600">${n}</div>`).join('')}
          </div>
        </div>
        <div class="abs mono" style="left:0;right:0;top:700px;text-align:center;font-size:26px;color:var(--ink)">${STUDY.institution} · ${STUDY.course} · ${STUDY.term}</div>
        <div class="abs mono" style="left:160px;right:160px;bottom:70px;text-align:center;font-size:20px;color:var(--ink);opacity:.6">${STUDY.reference}<br>Photography: AI-generated &amp; illustrative · no real employees or respondents · not affiliated with Imtiaz</div>
      </div>
    `;
    const lns = $$<SVGPathElement>('.s23-ln');
    lns.forEach((l) => { const L = l.getTotalLength(); gsap.set(l, { attr: { 'stroke-dasharray': L, 'stroke-dashoffset': L } }); });
    gsap.set($$('.s23-lab'), { opacity: 0 });
    gsap.set([$('.s23-ph'), $('.s23-a'), $('.s23-b'), $('.s23-w2'), $('.s23-dark'), $('.s23-cream')], { opacity: 0 });
    gsap.set($('.s23-world'), { scale: 1.15 });
    gsap.set($('.s23-rc'), { yPercent: -100 });

    tl.from([$('.s23-bl'), $('.s23-br')], { xPercent: (i: number) => (i ? 101 : -101), duration: 0.8, ease: 'power3.out' })
      .from($('.s23-man'), { opacity: 0, y: 40, duration: 0.6 }, '<0.2');
    step('The narrow lane, as it is today');
    tl.to($('.s23-bl'), { xPercent: -101, duration: 1.2, ease: 'power3.inOut' })
      .to($('.s23-br'), { xPercent: 101, duration: 1.2, ease: 'power3.inOut' }, '<')
      .to($('.s23-world'), { scale: 1, duration: 1.6, ease: 'power3.out' }, '<')
      .to(lns, { attr: { 'stroke-dashoffset': 0 }, duration: 0.8, ease: 'power2.out', stagger: 0.1 }, '-=0.8')
      .to($$('.s23-lab'), { opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.4');
    step('★ The store opens around him; he stays at the centre');
    tl.to($('.s23-ph'), { opacity: 1, duration: 0.4 })
      .to($('.s23-w1'), { opacity: 0, y: -40, duration: 0.5, ease: 'power3.in' }, '+=0.7')
      .fromTo($('.s23-w2'), { y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    step('"…a job someone performs… and a job someone owns."');
    tl.to($('.s23-ph'), { opacity: 0, duration: 0.4 })
      .to($('.s23-dark'), { opacity: 1, duration: 0.6 }, '<')
      .fromTo($('.s23-a'), { y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2');
    step('NOT A DIFFERENT JOB.');
    tl.fromTo($('.s23-b'), { y: 40 }, { opacity: 1, y: 0, duration: 0.7 });
    step('A BETTER-DESIGNED ONE.');
    tl.to($('.s23-cream'), { opacity: 1, duration: 0.6 })
      .to($('.s23-rc'), { yPercent: 0, duration: 1.0, ease: 'steps(12)' }, '-=0.1');
    step('Collapse to cream: the last receipt prints "Thank you."');
  },
});
