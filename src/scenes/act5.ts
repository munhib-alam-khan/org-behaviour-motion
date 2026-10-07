import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { JCM, JCM_ORDER, type DimKey } from '../data/research';
import { actTag, sym } from '../components/kit';
import { product } from '../components/illustrations';

// ── Sc13 · Why it matters (JCM) ──────────────────────────────────────
export const theory = defineScene({
  id: 'theory', act: 'V · Interpret', title: 'Why it matters (JCM)', theme: 'night', submission: 5, enter: 'fade',
  build({ root, $, $$, tl, step }) {
    const cx: Record<DimKey, number> = { SV: 260, TI: 560, TS: 860, AU: 1265, FB: 1665 };
    const state = [
      { cls: 'm', x: 150, w: 820, c: 560, t: 'Experienced<br>meaningfulness', from: ['SV', 'TI', 'TS'] as DimKey[] },
      { cls: 'r', x: 1070, w: 390, c: 1265, t: 'Experienced<br>responsibility', from: ['AU'] as DimKey[] },
      { cls: 'k', x: 1475, w: 390, c: 1670, t: 'Knowledge<br>of results', from: ['FB'] as DimKey[] },
    ];
    const ribbon = (x1: number, y1: number, x2: number, y2: number) => `M${x1} ${y1} C${x1} ${(y1 + y2) / 2} ${x2} ${(y1 + y2) / 2} ${x2} ${y2}`;
    const paths = state.flatMap((s) => s.from.map((k) => `<path class="s13-rib s13-rib-${s.cls}" data-k="${k}" d="${ribbon(cx[k], 430, s.c, 560)}"/>`)).join('')
      + state.map((s) => `<path class="s13-out" d="${ribbon(s.c, 690, s.c, 815)}"/>`).join('');
    const tierC = (k: DimKey) => (JCM[k].tier === 'strong' ? 'var(--blue)' : JCM[k].tier === 'lowest' ? 'var(--magenta)' : 'var(--orange)');
    root.innerHTML = `
      ${actTag('V', 'Interpret')}
      <svg class="abs" width="1920" height="1080" style="left:0;top:0" fill="none" stroke="#F4ECDD" stroke-width="14" stroke-linecap="round">${paths}</svg>
      ${JCM_ORDER.map((k) => `
        <div class="abs s13-p" data-k="${k}" style="left:${cx[k] - 90}px;top:150px;width:180px;height:180px">${product[k]}
          <div class="s13-badge d" style="position:absolute;right:-48px;top:-30px;width:110px;height:110px;border-radius:50%;background:${tierC(k)};color:var(--ink);border:5px solid var(--ink);display:flex;align-items:center;justify-content:center;font-size:52px;padding-top:6px">${JCM[k].label}</div>
        </div>
        <div class="abs dx s13-n" style="left:${cx[k] - 160}px;width:320px;text-align:center;top:350px;font-size:28px;line-height:1.05">${JCM[k].name}</div>`).join('')}
      ${state.map((s) => `<div class="abs s13-s s13-s-${s.cls}" style="left:${s.x}px;top:560px;width:${s.w}px;height:130px;background:var(--cream);color:var(--ink);border-radius:65px;display:flex;align-items:center;justify-content:center;text-align:center">
        <span class="dx" style="font-size:31px;line-height:1.05">${s.t}</span></div>`).join('')}
      <div class="abs s13-o" style="left:150px;top:815px;width:1715px;height:120px;background:var(--yellow);color:var(--ink);display:flex;align-items:center;justify-content:center;gap:40px">
        <span class="lbl" style="font-size:26px">Outcomes</span><span class="dx" style="font-size:44px">Internal work motivation · Job satisfaction</span></div>
      <div class="abs mono s13-cap" style="left:150px;top:965px;font-size:28px"><span class="c-org">■</span> Where our data shows the gaps: <b>variety · autonomy · feedback</b> &nbsp; <span class="c-blue">■</span> strengths: significance · identity</div>
      <div class="full s13-big" style="background:rgba(11,6,16,.9);display:flex;flex-direction:column;justify-content:center;padding-left:150px">
        <div class="d" style="font-size:165px">Change the job<span class="c-mag">,</span></div>
        <div class="d c-yel" style="font-size:165px;margin-top:20px">change the experience</div>
        <div class="d" style="font-size:165px;margin-top:20px">of doing it.</div>
      </div>
    `;
    const ribs = $$<SVGPathElement>('.s13-rib, .s13-out');
    ribs.forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { attr: { 'stroke-dasharray': L, 'stroke-dashoffset': L } }); });
    gsap.set($$('.s13-s, .s13-o'), { opacity: 0, scale: 0.85 });
    gsap.set($$('.s13-badge'), { scale: 0 });
    gsap.set([$('.s13-cap'), $('.s13-big')], { opacity: 0 });
    gsap.set($$('.s13-p'), { x: 1800 });
    gsap.set($$('.s13-n'), { opacity: 0 });

    tl.to($$('.s13-p'), { x: 0, duration: 1, ease: 'power3.out', stagger: 0.08 })
      .to($$('.s13-n'), { opacity: 1, duration: 0.4, stagger: 0.06 }, '-=0.5');
    step('The five characteristics return');

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

    tl.to($$('.s13-badge'), { scale: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.08 });
    $$('.s13-rib').forEach((p) => {
      const k = p.dataset.k as DimKey;
      tl.to(p, { attr: { stroke: JCM[k].tier === 'strong' ? '#3D6BFF' : JCM[k].tier === 'lowest' ? '#FF2E88' : '#FF7A1A' }, duration: 0.4 }, '<');
    });
    tl.to($('.s13-cap'), { opacity: 1, duration: 0.4 });
    step('Overlay our scores: the gaps are variety, autonomy, feedback');

    tl.to($('.s13-big'), { opacity: 1, duration: 0.6 })
      .from($$('.s13-big > div'), { y: 60, opacity: 0, stagger: 0.18, duration: 0.7, immediateRender: false }, '<0.1');
    step('"Change the job, change the experience of doing it."');
    void sym;
  },
});
