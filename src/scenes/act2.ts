import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { JCM, JCM_ORDER, SAMPLE } from '../data/research';
import { actTag, line, stamp, sym } from '../components/kit';
import { product } from '../components/illustrations';
import { handoff, token } from './shared';

// ── Sc4 · 25 ─────────────────────────────────────────────────────────
export const twentyFive = defineScene({
  id: 'twenty-five', act: 'II · Investigate', title: '25 cashiers', theme: 'yellow',
  build({ root, $, $$, tl, step }) {
    const gx = 1010, gy = 150, cw = 158, ch = 172;
    const toks = Array.from({ length: SAMPLE.n }, (_, i) =>
      `<div class="s4-tok" style="position:absolute;left:${gx + (i % 5) * cw}px;top:${gy + Math.floor(i / 5) * ch}px">${token(i)}</div>`).join('');
    root.innerHTML = `
      ${actTag('II', 'Investigate')}
      ${toks}
      <div class="abs s4-dot" style="background:var(--ink);border-radius:50%"></div>
      <div class="abs d c-ink" style="left:90px;top:120px;font-size:760px;letter-spacing:-.03em">${line(String(SAMPLE.n), 's4-num')}</div>
      <div class="abs s4-cap" style="left:110px;top:780px">
        <div class="dx" style="font-size:66px">Checkout cashiers</div>
        <div class="lbl" style="margin-top:14px">${SAMPLE.where}</div>
      </div>
      <div class="sticker s4-st" style="left:900px;top:200px;background:var(--ink);color:var(--cream);transform:rotate(-3deg)">${SAMPLE.method[0]}</div>
      <div class="sticker s4-st" style="left:930px;top:350px;background:var(--magenta);transform:rotate(2deg)">${SAMPLE.method[1]}</div>
      <div class="sticker s4-st" style="left:910px;top:500px;background:var(--paper);transform:rotate(-2deg)">${SAMPLE.method[2]}</div>
      <div class="sticker s4-st" style="left:880px;top:650px;background:var(--cream);transform:rotate(1.5deg)">${SAMPLE.method[3]}</div>
      <div class="sticker s4-st" style="left:950px;top:810px;background:var(--blue);color:var(--paper);transform:rotate(-2.5deg)">${SAMPLE.limits}</div>
    `;
    const first = { x: gx + 66, y: gy + 75 };
    const s = handoff.size || 60;
    gsap.set($('.s4-dot'), { width: s, height: s, left: (handoff.x || 1400) - s / 2, top: (handoff.y || 600) - s / 2 });
    gsap.set($$('.s4-tok'), { opacity: 0, y: -40, scale: 0.9 });
    gsap.set($('.s4-num .in'), { yPercent: 105 });
    gsap.set($('.s4-cap'), { opacity: 0, y: 30 });
    gsap.set($$('.s4-st'), { opacity: 0, scale: 1.7 });

    // intro: the full stop from "THE CASHIERS." becomes respondent #01
    tl.to($('.s4-dot'), { left: first.x - s / 2, top: first.y - s / 2, duration: 0.7, ease: 'power3.inOut' })
      .to($('.s4-dot'), { scale: 0.2, opacity: 0, duration: 0.25 })
      .to($$('.s4-tok'), { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.4)', stagger: 0.045 }, '-=0.3');
    step('25 receipt tokens land. "We collected responses from…"');

    tl.to($('.s4-num .in'), { yPercent: 0, duration: 0.9 })
      .to($('.s4-cap'), { opacity: 1, y: 0, duration: 0.6 }, '<0.25')
      .to($$('.s4-tok'), { opacity: 0.35, duration: 0.6 }, '<');
    step('25 CHECKOUT CASHIERS · multiple Karachi branches');

    tl.to($$('.s4-st'), { opacity: 1, scale: 1, duration: 0.35, ease: 'power4.out', stagger: 0.22 });
    step('Method: interviewer-administered · read aloud & explained · voluntary · anonymous · small sample');
  },
});

// ── Sc5 · Five lenses ────────────────────────────────────────────────
export const fiveLenses = defineScene({
  id: 'five-lenses', act: 'II · Investigate', title: 'Five job characteristics', theme: 'night', enter: 'fade',
  build({ root, $, $$, tl, step }) {
    const xs = [150, 490, 830, 1170, 1510];
    root.innerHTML = `
      ${actTag('II', 'Investigate')}
      <div class="abs" style="left:150px;top:120px">
        <div class="dc" style="font-size:120px">Five job characteristics</div>
        <div class="mono muted" style="font-size:28px;margin-top:16px">Job Characteristics Model · Hackman &amp; Oldham (1976)</div>
      </div>
      ${JCM_ORDER.map((k, i) => `
        <div class="abs s5-prod" style="left:${xs[i] + 20}px;top:470px;width:240px;height:240px">${product[k]}</div>
        <div class="abs s5-name" style="left:${xs[i]}px;top:345px;width:290px">
          <div class="mono c-mag" style="font-size:28px;font-weight:700">0${i + 1}</div>
          <div class="dx" style="font-size:38px;line-height:1.05">${JCM[k].name.replace(' ', '<br>')}</div>
        </div>`).join('')}
      <div class="abs belt" style="left:0;right:0;top:715px;height:90px"></div>
      <div class="abs" style="left:0;right:0;top:805px;height:60px;display:flex;justify-content:space-around;padding:0 40px">
        ${Array.from({ length: 12 }, () => '<i class="roller"></i>').join('')}
      </div>
    `;
    gsap.set($$('.s5-prod'), { x: 1700 });
    gsap.set($$('.s5-name'), { opacity: 0, y: 24 });
    step('Empty belt. "…we looked at their jobs through five dimensions…"');

    const t0 = tl.duration();
    tl.to($('.belt'), { backgroundPositionX: '-1700px', duration: 2.4, ease: 'power2.out' }, t0);
    $$('.s5-prod').forEach((p, i) => {
      tl.to(p, { x: 0, duration: 1.15, ease: 'power3.out' }, t0 + i * 0.32);
      tl.to($$('.s5-name')[i], { opacity: 1, y: 0, duration: 0.4 }, t0 + i * 0.32 + 0.7);
    });
    step('Five products ride in: skill variety · task identity · significance · autonomy · feedback');
  },
});

// ── Sc6 · Diagnose first ─────────────────────────────────────────────
export const diagnoseFirst = defineScene({
  id: 'diagnose-first', act: 'II · Investigate', title: 'Diagnose first', theme: 'night',
  build({ root, $, $$, tl, step }) {
    root.innerHTML = `
      <div class="abs d nowrap" style="left:120px;top:170px;font-size:235px">${line('Diagnose first.', 's6-a')}</div>
      <div class="abs d c-mag nowrap" style="right:120px;top:600px;font-size:235px;text-align:right">${line('Redesign second.', 's6-b')}</div>
      <div class="abs s6-top" style="left:-20px;right:-20px;top:-20px;height:580px;background:var(--cream);clip-path:polygon(0 0,100% 0,100% 94%,96% 100%,92% 94%,88% 100%,84% 94%,80% 100%,76% 94%,72% 100%,68% 94%,64% 100%,60% 94%,56% 100%,52% 94%,48% 100%,44% 94%,40% 100%,36% 94%,32% 100%,28% 94%,24% 100%,20% 94%,16% 100%,12% 94%,8% 100%,4% 94%,0 100%)"></div>
      <div class="abs s6-bot" style="left:-20px;right:-20px;top:530px;height:580px;background:var(--cream);clip-path:polygon(0 6%,4% 0,8% 6%,12% 0,16% 6%,20% 0,24% 6%,28% 0,32% 6%,36% 0,40% 6%,44% 0,48% 6%,52% 0,56% 6%,60% 0,64% 6%,68% 0,72% 6%,76% 0,80% 6%,84% 0,88% 6%,92% 0,96% 6%,100% 0,100% 100%,0 100%)"></div>
      <div class="full s6-eq c-ink">
        ${actTag('II', 'Investigate')}
        <div class="abs mono" style="left:0;right:0;top:250px;text-align:center;font-size:30px;letter-spacing:.14em">THE EASY ASSUMPTION</div>
        <div class="abs" style="left:0;right:0;top:340px;display:flex;justify-content:center">
          <div style="position:relative;display:flex;align-items:center;gap:34px">
            <span class="sticker d" style="position:relative;font-stretch:62%;font-weight:900;font-size:150px;background:var(--paper);padding:18px 30px 4px">Repetitive</span>
            <span class="d" style="font-size:120px">${sym('arrow')}</span>
            <span class="sticker d" style="position:relative;font-stretch:62%;font-weight:900;font-size:150px;background:var(--yellow);padding:18px 30px 4px">Rotation</span>
            <div class="s6-strike" style="position:absolute;left:-30px;right:-30px;top:50%;height:16px;margin-top:-8px;background:var(--magenta);transform-origin:0 50%"></div>
          </div>
        </div>
        ${stamp('Theory before problem', 's6-stamp', 'left:560px;top:640px;transform:rotate(-7deg)')}
      </div>
    `;
    gsap.set($$('.s6-a .in, .s6-b .in'), { yPercent: 110 });
    gsap.set($('.s6-strike'), { scaleX: 0 });
    gsap.set($('.s6-stamp'), { opacity: 0, scale: 2.2 });
    step('"We did not begin by saying: repetitive → rotation."');

    tl.to($('.s6-stamp'), { opacity: 1, scale: 1, duration: 0.3, ease: 'power4.in' })
      .to($('.s6-strike'), { scaleX: 1, duration: 0.45, ease: 'power3.inOut' }, '+=0.05');
    step('Stamp: THEORY BEFORE PROBLEM');

    tl.to($('.s6-eq'), { opacity: 0, scale: 0.94, duration: 0.35, ease: 'power2.in' })
      .to($('.s6-top'), { yPercent: -105, rotation: -2, duration: 1.1, ease: 'power3.inOut' }, '-=0.1')
      .to($('.s6-bot'), { yPercent: 105, rotation: 2, duration: 1.1, ease: 'power3.inOut' }, '<')
      .to($('.s6-a .in'), { yPercent: 0, duration: 0.9 }, '-=0.6')
      .to($('.s6-b .in'), { yPercent: 0, duration: 0.9 }, '-=0.6');
    step('★ Tear: DIAGNOSE FIRST. REDESIGN SECOND.');
  },
});
