import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { JCM, JCM_ORDER, SAMPLE } from '../data/research';
import { actTag, line, stamp, sym } from '../components/kit';
import { markerLine, mk, pic, plate, tapeStrip } from '../components/photo';
import { img } from '../assets';
import { HANG, handoff } from './shared';

// ── Sc4 · 25 — a contact sheet of 25 different shop-floor moments ────
export const twentyFive = defineScene({
  id: 'twenty-five', act: 'II · Investigate', title: '25 cashiers', theme: 'yellow',
  build({ root, $, $$, tl, step }) {
    const gx = 830, gy = 70, cw = 212, ch = 190;
    const jit = (i: number, k: number) => ((i * 37 + k * 11) % 9) - 4;
    const tiles = Array.from({ length: SAMPLE.n }, (_, i) => {
      const x = gx + (i % 5) * cw + jit(i, 1) * 3, y = gy + Math.floor(i / 5) * ch + jit(i, 2) * 3;
      return `<div class="s4-tile" style="position:absolute;left:${x}px;top:${y}px;width:198px;height:146px;transform:rotate(${jit(i, 3) * 0.8}deg)">
        <img src="${img(`m${String(i + 1).padStart(2, '0')}`)}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;border:6px solid var(--paper);box-shadow:6px 8px 0 rgba(11,6,16,.85)">
        <span class="mono" style="position:absolute;left:-6px;bottom:-14px;background:var(--ink);color:var(--yellow);font-weight:700;font-size:22px;padding:2px 8px">#${String(i + 1).padStart(2, '0')}</span>
      </div>`;
    }).join('');
    root.innerHTML = `
      ${actTag('II', 'Investigate')}
      ${tiles}
      <div class="abs s4-dot" style="background:var(--ink);border-radius:50%"></div>
      <div class="abs d c-ink" style="left:80px;top:120px;font-size:760px;letter-spacing:-.03em">${line(String(SAMPLE.n), 's4-num')}</div>
      <div class="abs s4-cap" style="left:100px;top:780px">
        <div class="dx" style="font-size:66px">Checkout cashiers</div>
        <div class="lbl" style="margin-top:14px">${SAMPLE.where}</div>
      </div>
      <div class="sticker s4-st" style="left:900px;top:200px;background:var(--ink);color:var(--cream);transform:rotate(-3deg)">${SAMPLE.method[0]}</div>
      <div class="sticker s4-st" style="left:930px;top:350px;background:var(--magenta);transform:rotate(2deg)">${SAMPLE.method[1]}</div>
      <div class="sticker s4-st" style="left:910px;top:500px;background:var(--paper);transform:rotate(-2deg)">${SAMPLE.method[2]}</div>
      <div class="sticker s4-st" style="left:880px;top:650px;background:var(--cream);transform:rotate(1.5deg)">${SAMPLE.method[3]}</div>
      <div class="sticker s4-st" style="left:950px;top:810px;background:var(--blue);color:var(--paper);transform:rotate(-2.5deg)">${SAMPLE.limits}</div>
      ${mk(`every one read aloud ${sym('check')}`, 'left:1500px;top:960px;font-size:58px;color:var(--ink);transform:rotate(-4deg)', 's4-mk')}
    `;
    const first = { x: gx + 99, y: gy + 73 };
    const s = handoff.size || 60;
    gsap.set($('.s4-dot'), { width: s, height: s, left: (handoff.x || 1400) - s / 2, top: (handoff.y || 600) - s / 2 });
    gsap.set($$('.s4-tile'), { opacity: 0, y: -50, scale: 1.15 });
    gsap.set($('.s4-num .in'), { yPercent: 105 });
    gsap.set($('.s4-cap'), { opacity: 0, y: 30 });
    gsap.set([...$$('.s4-st'), $('.s4-mk')], { opacity: 0, scale: 1.7 });

    tl.to($('.s4-dot'), { left: first.x - s / 2, top: first.y - s / 2, duration: 0.7, ease: 'power3.inOut' })
      .to($('.s4-dot'), { scale: 0.2, opacity: 0, duration: 0.25 })
      .to($$('.s4-tile'), { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', stagger: 0.045 }, '-=0.3');
    step('25 shop-floor moments land. "We collected responses from…"');

    tl.to($('.s4-num .in'), { yPercent: 0, duration: 0.9 })
      .to($('.s4-cap'), { opacity: 1, y: 0, duration: 0.6 }, '<0.25')
      .to($$('.s4-tile'), { opacity: 0.4, duration: 0.6 }, '<');
    step('25 CHECKOUT CASHIERS · multiple Karachi branches');

    tl.to($$('.s4-st'), { opacity: 1, scale: 1, duration: 0.35, ease: 'power4.out', stagger: 0.22 })
      .to($('.s4-mk'), { opacity: 1, scale: 1, duration: 0.3 });
    step('Method: interviewer-administered · read aloud & explained · voluntary · anonymous · small sample');
  },
});

// ── Sc5 · Five characteristics hang from the bag rail ────────────────
export const OBJ: Record<string, string> = { SV: 'obj_sv', TI: 'obj_ti', TS: 'obj_ts', AU: 'obj_au', FB: 'obj_fb' };

export function hanging(cls: string, top = HANG.top, size = HANG.size) {
  return JCM_ORDER.map((k, i) => {
    const x = HANG.xs[i];
    return `<div class="${cls}" data-k="${k}" style="position:absolute;left:${x - size / 2}px;top:${top}px;width:${size}px;height:${size}px">
      <i style="position:absolute;left:50%;top:-46px;width:4px;height:80px;margin-left:-2px;background:rgba(244,236,221,.75)"></i>
      <img src="${img(OBJ[k])}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain">
    </div>`;
  }).join('');
}

export const fiveLenses = defineScene({
  id: 'five-lenses', act: 'II · Investigate', title: 'Five job characteristics', theme: 'night', enter: 'fade',
  build({ root, $, $$, tl, step, beep }) {
    root.innerHTML = `
      ${plate('a07_plum')}
      <div class="full" style="background:linear-gradient(180deg,rgba(11,6,16,.15) 0%,rgba(11,6,16,.55) 45%,rgba(11,6,16,.88) 100%)"></div>
      ${actTag('II', 'Investigate')}
      <div class="abs" style="left:110px;top:110px">
        <div class="dc" style="font-size:104px;text-shadow:0 8px 0 rgba(0,0,0,.4)">Five job characteristics</div>
        <div class="mono" style="font-size:26px;margin-top:12px;opacity:.85">Job Characteristics Model · Hackman &amp; Oldham (1976)</div>
      </div>
      ${hanging('s5-obj')}
      ${JCM_ORDER.map((k, i) => `
        <div class="abs s5-tag" style="left:${HANG.xs[i] - 150}px;top:705px;width:300px;text-align:center">
          <div class="mono c-yel" style="font-size:28px;font-weight:700">0${i + 1}</div>
          <div class="dx" style="font-size:36px;line-height:1.05;margin-top:6px">${JCM[k].name.replace(' ', '<br>')}</div>
        </div>`).join('')}
      <div class="beam-v s5-beam" style="left:0;top:400px;bottom:auto;height:290px"></div>
    `;
    gsap.set($$('.s5-obj'), { x: 1900, rotation: 10, transformOrigin: '50% -60px' });
    gsap.set($$('.s5-tag'), { opacity: 0, y: 24 });
    gsap.set($('.s5-beam'), { opacity: 0 });
    step('The rail is empty. "…we looked at their jobs through five dimensions…"');

    const t0 = tl.duration();
    $$('.s5-obj').forEach((p, i) => {
      const at = t0 + i * 0.34;
      tl.to(p, { x: 0, duration: 1.0, ease: 'power3.out' }, at)
        .to(p, { rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, at + 0.5)
        .set($('.s5-beam'), { x: HANG.xs[i], opacity: 1 }, at + 0.75)
        .to($('.s5-beam'), { opacity: 0, duration: 0.25 }, at + 0.8)
        .to($$('.s5-tag')[i], { opacity: 1, y: 0, duration: 0.4 }, at + 0.75);
    });
    beep();
    step('Five objects ride in and are "scanned": variety · identity · significance · autonomy · feedback');
  },
});

// ── Sc6 · Diagnose first ─────────────────────────────────────────────
export const diagnoseFirst = defineScene({
  id: 'diagnose-first', act: 'II · Investigate', title: 'Diagnose first', theme: 'night',
  build({ root, $, $$, tl, step }) {
    const content = `
      <div class="full s6-photo">${plate('a09')}<div class="shade" style="background:rgba(11,6,16,.25)"></div></div>
      <div class="kraft s6-card" style="left:560px;top:250px;width:820px;height:420px;transform:rotate(-3deg);padding:44px 54px">
        <div class="mono" style="font-size:26px;letter-spacing:.14em;font-weight:700">THE EASY ASSUMPTION</div>
        <div class="mk" style="position:relative;color:var(--ink);font-size:118px;margin-top:30px;white-space:normal;line-height:.95">repetitive&nbsp;${sym('arrow')}<br>&nbsp;&nbsp;job rotation!</div>
      </div>
      ${tapeStrip(600, 228, 170, -12)}${tapeStrip(1230, 240, 170, 9)}
      <svg class="mk-svg" width="1920" height="1080"><path class="s6-strike" d="${markerLine(600, 520, 1340, 410, 3, 10)}" stroke="#FF2E88" stroke-width="16"/></svg>
      ${stamp('Theory before problem', 's6-stamp', 'left:600px;top:640px;transform:rotate(-7deg);background:rgba(244,236,221,.0)')}
    `;
    const tear = 'polygon(0 0,100% 0,100% 94%,96% 100%,92% 94%,88% 100%,84% 94%,80% 100%,76% 94%,72% 100%,68% 94%,64% 100%,60% 94%,56% 100%,52% 94%,48% 100%,44% 94%,40% 100%,36% 94%,32% 100%,28% 94%,24% 100%,20% 94%,16% 100%,12% 94%,8% 100%,4% 94%,0 100%)';
    root.innerHTML = `
      <div class="abs d nowrap" style="left:120px;top:170px;font-size:235px">${line('Diagnose first.', 's6-a')}</div>
      <div class="abs d c-mag nowrap" style="right:120px;top:600px;font-size:235px;text-align:right">${line('Redesign second.', 's6-b')}</div>
      <div class="abs s6-top" style="left:0;top:0;width:1920px;height:580px;overflow:hidden;clip-path:${tear}"><div class="abs" style="left:0;top:0;width:1920px;height:1080px">${content}</div></div>
      <div class="abs s6-bot" style="left:0;top:520px;width:1920px;height:560px;overflow:hidden"><div class="abs" style="left:0;top:-520px;width:1920px;height:1080px">${content}</div></div>
      ${actTag('II', 'Investigate')}
    `;
    gsap.set($$('.s6-a .in, .s6-b .in'), { yPercent: 110 });
    gsap.set($$('.s6-photo'), { opacity: 0 });
    gsap.set($$('.s6-stamp'), { opacity: 0, scale: 2.2 });
    $$<SVGPathElement>('.s6-strike').forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { attr: { 'stroke-dasharray': L, 'stroke-dashoffset': L } }); });
    step('"We did not begin by saying: repetitive → rotation."');

    tl.to($$('.s6-photo'), { opacity: 1, duration: 0.12 })
      .fromTo($$('.s6-photo img'), { scale: 1.08 }, { scale: 1, duration: 0.5, ease: 'power3.out' }, '<')
      .to($$('.s6-stamp'), { opacity: 1, scale: 1, duration: 0.28, ease: 'power4.in' }, '<0.15')
      .to($$('.s6-strike'), { attr: { 'stroke-dashoffset': 0 }, duration: 0.45, ease: 'power3.inOut' }, '+=0.05');
    step('Hard cut: the stamp comes down · THEORY BEFORE PROBLEM');

    tl.to($('.s6-top'), { yPercent: -105, rotation: -2, duration: 1.1, ease: 'power3.inOut' })
      .to($('.s6-bot'), { yPercent: 105, rotation: 2, duration: 1.1, ease: 'power3.inOut' }, '<')
      .to($('.s6-a .in'), { yPercent: 0, duration: 0.9 }, '-=0.6')
      .to($('.s6-b .in'), { yPercent: 0, duration: 0.9 }, '-=0.6');
    step('★ The frame tears: DIAGNOSE FIRST. REDESIGN SECOND.');
    void pic;
  },
});
