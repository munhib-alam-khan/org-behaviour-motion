import gsap from 'gsap';
import { defineScene } from '../engine/scene';
import { STUDY } from '../data/research';
import { barcode, line, rLine, receipt } from '../components/kit';
import { handoff, receiptWall } from './shared';

// ── Sc0 · Title / standby ────────────────────────────────────────────
export const title = defineScene({
  id: 'title', act: 'Standby', title: 'Title', theme: 'night',
  build({ root, step }) {
    root.innerHTML = `
      <div class="abs mono muted" style="left:120px;top:150px;font-size:28px;letter-spacing:.12em">${STUDY.institutionShort} · ${STUDY.course.toUpperCase()} · ${STUDY.term.toUpperCase()}</div>
      <div class="abs d" style="left:110px;top:260px;font-size:270px">Check<span class="c-mag">out</span></div>
      <div class="abs dx" style="left:120px;top:590px;font-size:56px;width:1060px;line-height:1.08">${STUDY.title}</div>
      <div class="abs lbl muted" style="left:120px;top:735px;font-size:30px;width:1060px">${STUDY.subtitle}<br>${STUDY.context}</div>
      ${receipt(`
        <div class="r-head">PRESENTED BY</div>
        ${STUDY.team.map((n) => `<div class="r-line" style="font-size:28px;line-height:1.75"><span>${n}</span><i></i><span>×1</span></div>`).join('')}
        <div class="r-small" style="margin-top:22px;border-top:3px dashed #0b0610;padding-top:16px">INSTRUCTOR<br><b>${STUDY.instructor}</b></div>
        <div style="margin-top:24px">${barcode(7, 382, 70, '#0b0610')}</div>
      `, { style: 'left:1340px;top:130px;width:470px' })}
      <div class="beam-h t0-beam" style="left:1310px;right:80px;top:190px"></div>
    `;
    // The only ambient motion in the deck: an idle scanner line on the standby card.
    gsap.to(root.querySelector('.t0-beam'), { y: 640, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    step('Title card while the class settles. Click → black.');
  },
});

// ── Sc1 · The last person you meet ───────────────────────────────────
export const lastPerson = defineScene({
  id: 'last-person', act: 'I · Observe', title: 'The last person you meet', theme: 'black',
  build({ root, $, $$, tl, step, beep }) {
    root.innerHTML = `
      <div class="beam-h s1-sweep" style="top:0"></div>
      <div class="abs d s1-head" style="left:120px;top:250px;font-size:200px">
        <span class="blk">The last</span><span class="blk">person</span><span class="blk c-mag">you meet.</span>
      </div>
      <div class="beam-v s1-scan" style="left:100px;top:220px;bottom:auto;height:640px"></div>
      <div class="abs s1-slot" style="left:1060px;top:0;width:740px;height:26px;background:#1a1a1a;border-radius:0 0 10px 10px;box-shadow:0 6px 0 #000"></div>
      <div class="abs s1-clip" style="left:1080px;top:20px;width:700px;height:1060px;overflow:hidden">
        ${receipt(`
          <div class="r-head">CHECKOUT · LANE 04</div>
          <div class="s1-items">
            ${rLine('Money')}${rLine('Discounts')}${rLine('Accuracy')}${rLine('Waiting time')}
          </div>
          <div class="r-line r-total"><span>= Final impression</span></div>
          <div style="margin-top:30px">${barcode(11, 612, 90, '#0b0610')}</div>
        `, { cls: 's1-receipt', style: 'left:0;top:0;width:700px' })}
      </div>
    `;
    const head = $('.s1-head');
    gsap.set(head, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set($('.s1-scan'), { opacity: 0 });
    gsap.set($('.s1-sweep'), { y: -20, opacity: 0 });
    gsap.set($('.s1-receipt'), { yPercent: -101 });
    gsap.set($$('.s1-items .r-line, .s1-receipt .r-total'), { opacity: 0 });

    // intro: a single scanner sweep across darkness
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
    tl.to($('.s1-receipt'), { yPercent: 0, duration: 0.9, ease: 'steps(12)' });
    $$('.s1-items .r-line, .s1-receipt .r-total').forEach((el, i) => {
      tl.to(el, { opacity: 1, duration: 0.05 }, t0 + 0.95 + i * 0.32);
    });
    step('Receipt prints: money · discounts · accuracy · waiting time = final impression');
  },
});

// ── Sc2 · Again. ─────────────────────────────────────────────────────
export const again = defineScene({
  id: 'again', act: 'I · Observe', title: 'Again.', theme: 'black',
  build({ root, $, $$, tl, step }) {
    const four = [0, 1, 2, 3].map((i) => `<div class="mini-r s2-four" style="left:${300 + i * 340}px;top:300px"></div>`).join('');
    let forty = '';
    for (let r = 0; r < 5; r++) for (let c = 0; c < 8; c++)
      forty += `<div class="mini-r sm s2-forty" style="left:${70 + c * 228}px;top:${40 + r * 206}px"></div>`;
    root.innerHTML = `
      <div class="s2-l1">${four}</div>
      <div class="s2-l2">${forty}</div>
      <div class="s2-l3">${receiptWall()}</div>
      <div class="mini-r s2-one" style="left:810px;top:300px"></div>
      <div class="abs s2-txt s2-a" style="left:0;right:0;top:330px;text-align:center"><span class="word-block bg-mag d" style="font-size:330px">Again.</span></div>
      <div class="abs s2-txt s2-b" style="left:0;right:0;top:300px;text-align:center">
        <div class="d echo nowrap" style="font-size:260px"><span class="word-block bg-cream">And again.</span></div>
        <div class="d echo-o nowrap" style="font-size:260px;margin-top:-160px">And again.</div>
        <div class="d echo-o nowrap" style="font-size:260px;margin-top:-160px;opacity:.5">And again.</div>
      </div>
      <div class="abs s2-txt s2-c" style="left:0;right:0;top:380px;text-align:center"><span class="word-block bg-yel d" style="font-size:250px">For an entire shift.</span></div>
    `;
    gsap.set($$('.s2-four, .s2-forty, .wall-tile'), { scale: 0, opacity: 0 });
    gsap.set($$('.s2-txt'), { opacity: 0 });
    gsap.set($('.s2-one'), { scale: 1.25, opacity: 0 });

    tl.to($('.s2-one'), { scale: 1, opacity: 1, duration: 0.6 });
    step('One receipt. "Now imagine doing that same transaction…"');

    tl.to($('.s2-one'), { opacity: 0, duration: 0.2 })
      .to($$('.s2-four'), { scale: 1, opacity: 1, stagger: 0.07, duration: 0.5 }, '<')
      .fromTo($('.s2-a'), { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.45 }, '<0.1');
    step('AGAIN.');

    tl.to($$('.s2-four'), { opacity: 0, duration: 0.2 })
      .to($('.s2-a'), { opacity: 0, duration: 0.15 }, '<')
      .to($$('.s2-forty'), { scale: 1, opacity: 1, duration: 0.4, stagger: { each: 0.018, from: 'center', grid: [5, 8] } }, '<')
      .fromTo($('.s2-b'), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5 }, '<0.15');
    step('AND AGAIN.');

    tl.to($$('.s2-forty'), { opacity: 0, duration: 0.2 })
      .to($('.s2-b'), { opacity: 0, duration: 0.15 }, '<')
      .to($$('.wall-tile'), { scale: 1, opacity: 1, duration: 0.35, stagger: { each: 0.0035, from: 'center', grid: [10, 24] } }, '<')
      .fromTo($('.s2-c'), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5 }, '<0.15');
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
        <div class="abs d c-ink s3-ask" style="left:120px;top:190px;font-size:350px">
          <span class="blk">We asked</span><span class="blk">the cashiers<span class="s3-dot">.</span></span>
        </div>
      </div>
    `;
    // measure the full stop for the hand-off into Sc4
    const dot = $('.s3-dot');
    const ask = $('.s3-ask');
    handoff.x = ask.offsetLeft + dot.offsetLeft + dot.offsetWidth / 2;
    handoff.y = ask.offsetTop + dot.offsetTop + dot.offsetHeight * 0.74;
    handoff.size = dot.offsetWidth * 0.62;

    gsap.set($$('.q1 .in, .q2 .in'), { yPercent: 110 });
    gsap.set($('.s3-yellow'), { clipPath: 'inset(100% 0 0 0)' });
    $$('.wall-tile').forEach((t, i) => gsap.set(t, { scale: 1, opacity: 1, transformOrigin: '50% 50%', zIndex: i % 7 }));

    // intro: the wall collapses out of frame → silence
    const r = (i: number) => ((i * 9301 + 49297) % 233280) / 233280;
    tl.to($$('.wall-tile'), {
      y: (i: number) => 1150 + r(i) * 300,
      rotation: (i: number) => (r(i + 7) - 0.5) * 70,
      duration: 1.1, ease: 'power3.in', stagger: { each: 0.002, from: 'random' },
    })
      .to($('.s3-wtxt'), { y: 1200, rotation: -6, duration: 0.9, ease: 'power3.in' }, 0.15);
    step('Silence. (receipts fall away)');

    tl.to($$('.q1 .in'), { yPercent: 0, duration: 0.8 });
    step('"Can a job be important…"');
    tl.to($$('.q2 .in'), { yPercent: 0, duration: 0.8 });
    step('"…and still not be designed to bring out the best in the person?"');
    tl.to($('.s3-yellow'), { clipPath: 'inset(0% 0 0 0)', duration: 0.38, ease: 'power4.inOut' });
    step('WE ASKED THE CASHIERS.');
  },
});
