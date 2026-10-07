import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { JCM, JCM_ORDER, type DimKey } from '../data/research';
import { actTag } from '../components/kit';
import { plate } from '../components/photo';
import { HANG } from './shared';
import { hanging } from './act2';

// ── Sc13 · Why it matters (JCM): objects on the rail → light → states ─
export const theory = defineScene({
  id: 'theory', act: 'V · Interpret', title: 'Why it matters (JCM)', theme: 'night', submission: 5, enter: 'fade',
  build({ root, $, $$, tl, step }) {
    const TOP = 250, SIZE = 210;
    const cx = Object.fromEntries(JCM_ORDER.map((k, i) => [k, HANG.xs[i]])) as Record<DimKey, number>;
    const state = [
      { cls: 'm', x: 110, w: 980, c: 600, t: 'Experienced meaningfulness', from: ['SV', 'TI', 'TS'] as DimKey[] },
      { cls: 'r', x: 1130, w: 380, c: 1320, t: 'Experienced<br>responsibility', from: ['AU'] as DimKey[] },
      { cls: 'k', x: 1530, w: 300, c: 1680, t: 'Knowledge<br>of results', from: ['FB'] as DimKey[] },
    ];
    const SY = 600, OY = 785;
    const beam = (x1: number, y1: number, x2: number, y2: number) => `M${x1} ${y1} C${x1} ${(y1 + y2) / 2} ${x2} ${(y1 + y2) / 2} ${x2} ${y2}`;
    const paths = state.flatMap((s) => s.from.map((k) => `<path class="s13-rib s13-rib-${s.cls}" data-k="${k}" d="${beam(cx[k], TOP + SIZE + 40, s.c, SY)}"/>`)).join('')
      + state.map((s) => `<path class="s13-out" d="${beam(s.c, SY + 110, s.c, OY)}"/>`).join('');
    const tierC = (k: DimKey) => (JCM[k].tier === 'strong' ? 'var(--blue)' : JCM[k].tier === 'lowest' ? 'var(--magenta)' : 'var(--orange)');
    root.innerHTML = `
      ${plate('a07_plum', '', 'transform:translateY(-150px)')}
      <div class="full" style="background:linear-gradient(180deg,rgba(11,6,16,.2) 0%,rgba(11,6,16,.7) 42%,rgba(11,6,16,.95) 70%)"></div>
      ${actTag('V', 'Interpret')}
      <svg class="abs s13-svg" width="1920" height="1080" style="left:0;top:0;filter:drop-shadow(0 0 10px rgba(255,46,136,.85))" fill="none" stroke="#FF6FAE" stroke-width="10" stroke-linecap="round">${paths}</svg>
      ${hanging('s13-p', TOP, SIZE)}
      ${JCM_ORDER.map((k) => `
        <div class="abs dx s13-n" style="left:${cx[k] - 160}px;width:320px;text-align:center;top:${TOP + SIZE + 6}px;font-size:26px;line-height:1.05">${JCM[k].name}</div>
        <div class="abs s13-badge d" data-k="${k}" style="left:${cx[k] + 50}px;top:${TOP - 40}px;width:104px;height:104px;border-radius:50%;background:${tierC(k)};color:var(--ink);border:6px solid var(--paper);box-shadow:5px 7px 0 rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;font-size:48px;padding-top:6px">${JCM[k].label}</div>`).join('')}
      ${state.map((s) => `<div class="abs s13-s s13-s-${s.cls}" style="left:${s.x}px;top:${SY}px;width:${s.w}px;height:110px;background:#160a20;color:var(--cream);border:5px solid #FF6FAE;box-shadow:0 0 26px rgba(255,46,136,.6), inset 0 0 18px rgba(255,46,136,.35);display:flex;align-items:center;justify-content:center;text-align:center">
        <span class="dx" style="font-size:30px;line-height:1.05">${s.t}</span></div>`).join('')}
      <div class="abs s13-o" style="left:110px;top:${OY}px;width:1720px;height:110px;background:var(--yellow);color:var(--ink);display:flex;align-items:center;justify-content:center;gap:40px;transform:rotate(-0.6deg);box-shadow:10px 12px 0 rgba(0,0,0,.5)">
        <span class="lbl" style="font-size:26px">Outcomes</span><span class="dx" style="font-size:44px">Internal work motivation · Job satisfaction</span></div>
      <div class="abs mono s13-cap" style="left:110px;top:930px;font-size:27px"><span class="c-org">■</span> Where our data shows the gaps: <b>variety · autonomy · feedback</b> &nbsp; <span class="c-blue">■</span> strengths: significance · identity</div>
      <div class="full s13-big">
        ${plate('a01_plum', '', 'filter:blur(6px) brightness(.55);transform:scale(1.05)')}
        <div class="full" style="display:flex;flex-direction:column;justify-content:center;padding-left:150px">
          <div class="d" style="font-size:165px">Change the job<span class="c-mag">,</span></div>
          <div class="d c-yel" style="font-size:165px;margin-top:20px">change the experience</div>
          <div class="d" style="font-size:165px;margin-top:20px">of doing it.</div>
        </div>
      </div>
    `;
    const ribs = $$<SVGPathElement>('.s13-rib, .s13-out');
    ribs.forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { attr: { 'stroke-dasharray': L, 'stroke-dashoffset': L } }); });
    gsap.set($$('.s13-s, .s13-o'), { opacity: 0, scale: 0.85 });
    gsap.set($$('.s13-badge'), { scale: 0, rotation: -30 });
    gsap.set([$('.s13-cap'), $('.s13-big')], { opacity: 0 });
    gsap.set($$('.s13-p'), { x: 1800 });
    gsap.set($$('.s13-n'), { opacity: 0 });

    tl.to($$('.s13-p'), { x: 0, duration: 1, ease: 'power3.out', stagger: 0.08 })
      .to($$('.s13-n'), { opacity: 1, duration: 0.4, stagger: 0.06 }, '-=0.5');
    step('The five characteristics return on the rail');

    const draw = (sel: string, pill: string) =>
      tl.to($$(sel), { attr: { 'stroke-dashoffset': 0 }, duration: 0.7, ease: 'power2.inOut', stagger: 0.08 })
        .to($(pill), { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' }, '-=0.2');
    draw('.s13-rib-m', '.s13-s-m');
    step('Variety + identity + significance → MEANINGFULNESS');
    draw('.s13-rib-r', '.s13-s-r');
    step('Autonomy → RESPONSIBILITY');
    draw('.s13-rib-k', '.s13-s-k');
    step('Feedback → KNOWLEDGE OF RESULTS');
    draw('.s13-out', '.s13-o');
    step('States → motivation & satisfaction');

    tl.to($$('.s13-badge'), { scale: 1, rotation: (i: number) => [-8, 6, -4, 8, -6][i], duration: 0.45, ease: 'back.out(2.4)', stagger: 0.08 });
    $$('.s13-rib').forEach((p) => {
      const k = p.dataset.k as DimKey;
      if (JCM[k].tier === 'strong') tl.to(p, { attr: { stroke: '#7FA0FF' }, duration: 0.4 }, '<');
    });
    tl.to($('.s13-cap'), { opacity: 1, duration: 0.4 });
    step('Price-sticker scores: the gaps are variety, autonomy, feedback');

    tl.to($('.s13-big'), { opacity: 1, duration: 0.6 })
      .from($$('.s13-big .d'), { y: 60, opacity: 0, stagger: 0.18, duration: 0.7, immediateRender: false }, '<0.1');
    step('"Change the job, change the experience of doing it."');
  },
});
