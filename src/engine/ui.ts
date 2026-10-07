import type { Deck } from './deck';
import { sound } from './sound';

const h = (html: string) => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild as HTMLElement;
};

/** Presenter controls: keyboard, click, navigator (M), overlay (P), blackout (B), sound (S). */
export function installUI(deck: Deck, viewport: HTMLElement) {
  const progress = h(`<div id="progress"><i></i></div>`);
  const blackout = h(`<div id="blackout"></div>`);
  const toast = h(`<div id="toast"></div>`);
  const corner = h(`<div id="corner" class="ui">
      <button data-a="nav" title="Scenes (M)">Scenes</button>
      <button data-a="sound" title="Sound (S)">Sound: off</button>
      <button data-a="fs" title="Fullscreen (F)">Fullscreen</button>
    </div>`);
  const presenter = h(`<div id="presenter" class="ui"></div>`);
  const nav = h(`<div id="nav" class="ui"><div class="nav-head">
      <span>Scenes</span><span class="hint">Click = start of scene · Shift+click = final state · type a number + Enter · Esc closes</span>
    </div><div class="nav-grid"></div></div>`);
  const grid = nav.querySelector('.nav-grid')!;
  deck.scenes.forEach((s, i) => {
    const b = h(`<button class="nav-card theme-chip-${s.def.theme}" data-i="${i}">
        <b>${String(i + 1).padStart(2, '0')}</b><em>${s.def.act}</em><span>${s.def.title}</span><small>${s.steps} state${s.steps > 1 ? 's' : ''}</small>
      </button>`);
    grid.appendChild(b);
  });
  document.body.append(progress, blackout, toast, corner, presenter, nav);

  const soundBtn = corner.querySelector<HTMLButtonElement>('[data-a="sound"]')!;
  const syncSound = () => { soundBtn.textContent = `Sound: ${sound.on ? 'on' : 'off'}`; };
  syncSound();

  let toastT = 0;
  const say = (msg: string) => {
    toast.textContent = msg;
    toast.classList.add('on');
    clearTimeout(toastT);
    toastT = window.setTimeout(() => toast.classList.remove('on'), 1100);
  };

  const render = () => {
    const s = deck.scene;
    const total = deck.scenes.reduce((a, x) => a + x.steps, 0);
    const done = deck.scenes.slice(0, deck.cur).reduce((a, x) => a + x.steps, 0) + deck.step + 1;
    (progress.firstElementChild as HTMLElement).style.transform = `scaleX(${done / total})`;
    const nextCue = deck.step < s.steps - 1 ? s.cues[deck.step + 1] : `→ Scene ${deck.cur + 2 <= deck.scenes.length ? `${deck.cur + 2} · ${deck.scenes[deck.cur + 1]?.def.title}` : '— end —'}`;
    presenter.innerHTML = `
      <div class="p-row"><b>${deck.cur + 1}/${deck.scenes.length}</b> ${s.def.act} · ${s.def.title}</div>
      <div class="p-row">State <b>${deck.step + 1}/${s.steps}</b> &nbsp; <span class="dots">${s.cues.map((_, k) => `<i class="${k <= deck.step ? 'on' : ''}"></i>`).join('')}</span></div>
      <div class="p-now">NOW: ${s.cues[deck.step] || '—'}</div>
      <div class="p-next">NEXT CLICK: ${nextCue}</div>
      <div class="p-keys">→ / Space / click next · ← back · ↑↓ scene · M scenes · B black · S sound · F fullscreen · P hide</div>`;
    grid.querySelectorAll('.nav-card').forEach((c, i) => c.classList.toggle('current', i === deck.cur));
  };
  deck.onChange(render);
  render();

  const toggle = (el: HTMLElement, force?: boolean) => el.classList.toggle('open', force);
  const fullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen().catch(() => {});
  };

  let digits = '';
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key;
    if (/^[0-9]$/.test(k)) { digits += k; say(`Go to scene ${digits}…`); return; }
    if (k === 'Enter' && digits) {
      deck.goto(parseInt(digits, 10) - 1, 0);
      digits = '';
      toggle(nav, false);
      return;
    }
    digits = '';
    if (nav.classList.contains('open') && k !== 'm' && k !== 'M' && k !== 'Escape') return;
    switch (k) {
      case 'ArrowRight': case ' ': case 'PageDown': case 'Enter':
        e.preventDefault(); if (!e.repeat) deck.next(); break;
      case 'ArrowLeft': case 'PageUp': case 'Backspace':
        e.preventDefault(); if (!e.repeat) deck.prev(); break;
      case 'ArrowDown': e.preventDefault(); deck.nextScene(); break;
      case 'ArrowUp': e.preventDefault(); deck.prevScene(); break;
      case 'Home': deck.goto(0, 0); break;
      case 'End': deck.goto(deck.scenes.length - 1, 99); break;
      case 'm': case 'M': toggle(nav); break;
      case 'p': case 'P': toggle(presenter); break;
      case 'b': case 'B': case '.': toggle(blackout); break;
      case 's': case 'S': say(`Sound ${sound.toggle() ? 'on' : 'off'}`); syncSound(); break;
      case 'f': case 'F': fullscreen(); break;
      case 'Escape':
        if (nav.classList.contains('open')) toggle(nav, false);
        else if (blackout.classList.contains('open')) toggle(blackout, false);
        break;
    }
  });

  viewport.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest('.ui')) return;
    if (blackout.classList.contains('open')) { toggle(blackout, false); return; }
    deck.next();
  });
  viewport.addEventListener('contextmenu', (e) => { e.preventDefault(); deck.prev(); });
  blackout.addEventListener('pointerdown', () => toggle(blackout, false));

  corner.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('button')?.dataset.a;
    if (a === 'nav') toggle(nav);
    if (a === 'sound') { sound.toggle(); syncSound(); }
    if (a === 'fs') fullscreen();
  });
  grid.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('.nav-card');
    if (!b) return;
    deck.goto(+b.dataset.i!, (e as MouseEvent).shiftKey ? 99 : 0);
    toggle(nav, false);
  });
  nav.addEventListener('pointerdown', (e) => { if (e.target === nav) toggle(nav, false); });

  // Hide the cursor while presenting; it returns on mouse movement.
  let idleT = 0;
  const wake = () => {
    document.body.classList.remove('idle');
    clearTimeout(idleT);
    idleT = window.setTimeout(() => document.body.classList.add('idle'), 2200);
  };
  window.addEventListener('pointermove', wake);
  wake();
}
