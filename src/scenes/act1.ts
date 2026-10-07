import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { STUDY } from '../data/research';
import { line, sym } from '../components/kit';
import { frame, markerCircle, markerLine, mk, pic, plate, torn } from '../components/photo';
import { img } from '../assets';
import { handoff, receiptWall } from './shared';

const CREDIT = 'Photography: AI-generated &amp; illustrative · no real employees or respondents · academic study, not affiliated with Imtiaz';

// ── Sc0 · Title / standby ────────────────────────────────────────────
export const title = defineScene({
  id: 'title', act: 'Standby', title: 'Title', theme: 'night',
  build({ root, step }) {
    root.innerHTML = `
      <div class="abs" style="left:700px;top:0;width:1220px;height:1080px;clip-path:${torn(3, 2.2, { l: true })}">${plate('a01')}</div>
      <div class="abs" style="left:700px;top:0;width:1220px;height:1080px;background:linear-gradient(90deg,rgba(30,11,43,.85),rgba(30,11,43,0) 40%)"></div>
      <div class="beam-h t0-beam" style="left:760px;right:0;top:380px;opacity:.75"></div>
      <div class="abs mono" style="left:110px;top:150px;font-size:26px;letter-spacing:.12em;opacity:.8">${STUDY.institutionShort} · ${STUDY.course.toUpperCase()} · ${STUDY.term.toUpperCase()}</div>
      <div class="abs d" style="left:96px;top:215px;font-size:330px;text-shadow:0 14px 0 rgba(0,0,0,.35)">Check<span class="c-mag">out</span></div>
      <div class="abs dx" style="left:110px;top:545px;font-size:44px;width:1000px;line-height:1.1">${STUDY.title}</div>
      <div class="abs lbl" style="left:110px;top:665px;font-size:26px;width:900px;opacity:.85">${STUDY.subtitle}<br>${STUDY.context}</div>
      ${mk('a field study', 'left:120px;top:770px;font-size:68px;transform:rotate(-5deg);color:var(--yellow)')}
      <div class="lower3" style="right:90px;bottom:120px;align-items:flex-end">
        <span class="k">PRESENTED BY</span>
        ${STUDY.team.map((n) => `<span>${n}</span>`).join('')}
        <span class="k" style="margin-top:8px">INSTRUCTOR · ${STUDY.instructor}</span>
      </div>
      <div class="abs mono" style="left:110px;bottom:42px;font-size:20px;opacity:.55">${CREDIT}</div>
    `;
    // The only ambient motion in the deck: an idle scanner line across the photo.
    gsap.to(root.querySelector('.t0-beam'), { y: 360, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    step('Title card while the class settles. Click → black.');
  },
});

// ── Sc1 · The last person you meet ───────────────────────────────────
export const lastPerson = defineScene({
  id: 'last-person', act: 'I · Observe', title: 'The last person you meet', theme: 'black',
  build({ root, $, $$, tl, step, beep }) {
    const items = ['Money', 'Discounts', 'Accuracy', 'Waiting time'];
    root.innerHTML = `
      <div class="full s1-film">${plate('a02', '', 'filter:brightness(.62)')}<div class="shade-l"></div></div>
      <div class="abs s1-bar" style="left:0;right:0;top:0;height:120px;background:#000"></div>
      <div class="abs s1-bar" style="left:0;right:0;bottom:0;height:120px;background:#000"></div>
      <div class="beam-h s1-sweep" style="top:0"></div>
      <div class="abs d s1-head" style="left:120px;top:250px;font-size:200px">
        <span class="blk">The last</span><span class="blk">person</span><span class="blk c-mag">you meet.</span>
      </div>
      <div class="beam-v s1-scan" style="left:100px;top:220px;bottom:auto;height:640px"></div>
      <div class="abs s1-clip" style="left:1130px;top:120px;width:640px;height:840px;overflow:hidden">
        <div class="s1-receipt abs" style="left:0;top:0;width:640px;height:840px;background:url(${img('receipt_strip')}) center/100% 100%;filter:drop-shadow(0 30px 40px rgba(0,0,0,.5))">
          <div class="mono" style="position:absolute;left:70px;right:70px;top:70px;color:var(--ink)">
            <div style="text-align:center;font-weight:700;letter-spacing:.14em;font-size:24px;border-bottom:3px dashed var(--ink);padding-bottom:14px;margin-bottom:12px">CHECKOUT</div>
            ${items.map((t) => `<div class="r-line s1-it" style="font-size:42px"><span>${t}</span><i></i><span>${sym('check')}</span></div>`).join('')}
            <div class="r-line r-total s1-it" style="font-size:40px"><span>= Final impression</span></div>
          </div>
        </div>
      </div>
      <svg class="mk-svg s1-ring" width="1920" height="1080"><path d="${markerCircle(1450, 505, 300, 58, 4)}" stroke="#FFD23F" stroke-width="7"/></svg>
    `;
    const head = $('.s1-head');
    gsap.set(head, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set($('.s1-scan'), { opacity: 0 });
    gsap.set($('.s1-sweep'), { y: -20, opacity: 0 });
    gsap.set([$('.s1-film'), ...$$('.s1-bar')], { opacity: 0 });
    gsap.set($('.s1-receipt'), { yPercent: -101 });
    gsap.set($$('.s1-it'), { opacity: 0 });
    const ring = $<SVGPathElement>('.s1-ring path');
    const L = ring.getTotalLength();
    gsap.set(ring, { attr: { 'stroke-dasharray': L, 'stroke-dashoffset': L } });

    tl.to($('.s1-sweep'), { opacity: 1, duration: 0.15 })
      .to($('.s1-sweep'), { y: 1100, duration: 1.1, ease: 'power2.inOut' }, '<')
      .to($('.s1-sweep'), { opacity: 0, duration: 0.2 }, '-=0.2');
    step('Black. "Think about the last time you went grocery shopping…"');

    beep();
    tl.to($('.s1-scan'), { opacity: 1, duration: 0.05 })
      .to($('.s1-scan'), { x: 900, duration: 0.9, ease: 'power2.inOut' })
      .to(head, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power2.inOut' }, '<')
      .to($('.s1-scan'), { opacity: 0, duration: 0.2 });
    step('"…the final person you interacted with was the cashier."');

    const t0 = tl.duration();
    tl.to([$('.s1-film'), ...$$('.s1-bar')], { opacity: 1, duration: 0.6, ease: 'power2.out' }, t0)
      .to($('.s1-receipt'), { yPercent: 0, duration: 0.9, ease: 'steps(12)' }, t0 + 0.3);
    $$('.s1-it').forEach((el, i) => tl.to(el, { opacity: 1, duration: 0.05 }, t0 + 1.25 + i * 0.3));
    tl.to(ring, { attr: { 'stroke-dashoffset': 0 }, duration: 0.5, ease: 'power2.out' });
    step('Printer film shot · receipt prints: money · discounts · accuracy · waiting time = final impression');
  },
});

/** Marker tally marks: groups of four strokes crossed by a fifth. */
function tally(x: number, y: number, groups: number) {
  let d = '';
  for (let g = 0; g < groups; g++) {
    const gx = x + g * 190;
    for (let i = 0; i < 4; i++) d += markerLine(gx + i * 30, y, gx + i * 30 + 4, y + 120, g * 9 + i, 5);
    d += markerLine(gx - 16, y + 100, gx + 120, y + 18, g * 9 + 7, 4);
  }
  return `<path d="${d.replace(/M/g, ' M')}" stroke="#FF2E88" stroke-width="11"/>`;
}

// ── Sc2 · Again. ─────────────────────────────────────────────────────
export const again = defineScene({
  id: 'again', act: 'I · Observe', title: 'Again.', theme: 'black',
  build({ root, $, $$, tl, step }) {
    const four = [[150, 250, -6], [560, 300, 3], [960, 230, -2], [1370, 290, 5]]
      .map(([x, y, r]) => frame('a06', { x, y, w: 420, h: 300, rot: r, cls: 's2-four' })).join('');
    let tiles = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++)
      tiles += frame('a06', { x: 30 + c * 316, y: 30 + r * 262, w: 290, h: 220, rot: ((r * 5 + c * 3) % 7) - 3, border: 'var(--cream)', cls: 's2-tile' });
    root.innerHTML = `
      <div class="full s2-bg">${plate('a03_plum')}</div>
      <div class="s2-l1">${four}</div>
      <div class="s2-l2">${tiles}</div>
      <div class="s2-l3">${receiptWall()}</div>
      ${frame('a06', { x: 580, y: 250, w: 760, h: 520, rot: -3, cls: 's2-one' })}
      <div class="abs s2-txt s2-a" style="left:0;right:0;top:340px;text-align:center"><span class="word-block bg-mag d" style="font-size:330px">Again.</span></div>
      <div class="abs s2-txt s2-b" style="left:0;right:0;top:300px;text-align:center">
        <div class="d nowrap" style="font-size:260px"><span class="word-block bg-cream">And again.</span></div>
        <div class="d echo-o nowrap" style="font-size:260px;margin-top:-160px">And again.</div>
        <div class="d echo-o nowrap" style="font-size:260px;margin-top:-160px;opacity:.5">And again.</div>
      </div>
      <div class="abs s2-txt s2-c" style="left:0;right:0;top:380px;text-align:center"><span class="word-block bg-yel d" style="font-size:250px">For an entire shift.</span></div>
      <svg class="mk-svg s2-tally" width="1920" height="1080">${tally(300, 860, 7)}</svg>
    `;
    gsap.set($$('.s2-four, .s2-tile, .wall-tile'), { scale: 0, opacity: 0 });
    gsap.set([...$$('.s2-txt'), $('.s2-bg'), $('.s2-tally')], { opacity: 0 });
    gsap.set($('.s2-one'), { scale: 1.2, opacity: 0 });

    tl.to($('.s2-one'), { scale: 1, opacity: 1, duration: 0.6 });
    step('One cashier, one transaction. "Now imagine doing that same transaction…"');

    tl.to($('.s2-one'), { opacity: 0, scale: 0.8, duration: 0.25 })
      .to($$('.s2-four'), { scale: 1, opacity: 1, stagger: 0.07, duration: 0.5 }, '<')
      .fromTo($('.s2-a'), { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.45 }, '<0.1');
    step('AGAIN.');

    tl.to($$('.s2-four'), { opacity: 0, duration: 0.2 })
      .to($('.s2-a'), { opacity: 0, duration: 0.15 }, '<')
      .to($('.s2-bg'), { opacity: 1, duration: 0.3 }, '<')
      .to($$('.s2-tile'), { scale: 1, opacity: 1, duration: 0.4, stagger: { each: 0.025, from: 'center', grid: [4, 6] } }, '<')
      .fromTo($('.s2-b'), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5 }, '<0.15');
    step('AND AGAIN. (pattern wipe over the checkout lanes)');

    tl.to([...$$('.s2-tile'), $('.s2-b')], { opacity: 0, duration: 0.2 })
      .to($$('.wall-tile'), { scale: 1, opacity: 1, duration: 0.35, stagger: { each: 0.004, from: 'center', grid: [6, 20] } }, '<')
      .fromTo($('.s2-c'), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5 }, '<0.15')
      .to($('.s2-tally'), { opacity: 1, duration: 0.4 });
    step('FOR AN ENTIRE SHIFT. (wall of receipts)');
  },
});

// ── Sc3 · The question ───────────────────────────────────────────────
export const question = defineScene({
  id: 'question', act: 'I · Observe', title: 'The question', theme: 'black',
  build({ root, $, $$, tl, step }) {
    root.innerHTML = `
      <div class="s3-wall">${receiptWall()}</div>
      <div class="abs s3-wtxt" style="left:0;right:0;top:380px;text-align:center"><span class="word-block bg-yel d" style="font-size:250px">For an entire shift.</span></div>
      <div class="abs d" style="left:120px;top:250px;font-size:205px">
        ${line('Can a job be important', 'blk q1')}
        ${line('<span class="c-mag">and still be poorly designed?</span>', 'blk q2')}
      </div>
      <div class="full s3-yellow" style="background:var(--yellow)">
        <div class="abs d c-ink s3-ask" style="left:110px;top:170px;font-size:330px">
          <span class="blk">We asked</span><span class="blk">the cashiers<span class="s3-dot">.</span></span>
        </div>
        ${pic('a04_sticker', 'left:1250px;top:640px;width:660px', 's3-who')}
      </div>
    `;
    const dot = $('.s3-dot');
    const ask = $('.s3-ask');
    handoff.x = ask.offsetLeft + dot.offsetLeft + dot.offsetWidth / 2;
    handoff.y = ask.offsetTop + dot.offsetTop + dot.offsetHeight * 0.74;
    handoff.size = dot.offsetWidth * 0.62;

    gsap.set($$('.q1 .in, .q2 .in'), { yPercent: 110 });
    gsap.set($('.s3-yellow'), { clipPath: 'inset(100% 0 0 0)' });
    gsap.set($('.s3-who'), { yPercent: 70 });
    $$('.wall-tile').forEach((t) => gsap.set(t, { scale: 1, opacity: 1 }));

    const r = (i: number) => ((i * 9301 + 49297) % 233280) / 233280;
    tl.to($$('.wall-tile'), {
      y: (i: number) => 1150 + r(i) * 300,
      rotation: (i: number) => (r(i + 7) - 0.5) * 70,
      duration: 1.1, ease: 'power3.in', stagger: { each: 0.003, from: 'random' },
    })
      .to($('.s3-wtxt'), { y: 1200, rotation: -6, duration: 0.9, ease: 'power3.in' }, 0.15);
    step('Silence. (receipts fall away)');

    tl.to($$('.q1 .in'), { yPercent: 0, duration: 0.8 });
    step('"Can a job be important…"');
    tl.to($$('.q2 .in'), { yPercent: 0, duration: 0.8 });
    step('"…and still not be designed to bring out the best in the person?"');
    tl.to($('.s3-yellow'), { clipPath: 'inset(0% 0 0 0)', duration: 0.38, ease: 'power4.inOut' })
      .to($('.s3-who'), { yPercent: 0, duration: 0.7, ease: 'power3.out' }, '-=0.1');
    step('WE ASKED THE CASHIERS. (our cashier steps into frame)');
  },
});
