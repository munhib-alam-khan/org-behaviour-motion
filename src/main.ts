import './styles/base.css';
import './styles/components.css';
import './styles/ui.css';
import { loadFonts } from './engine/fonts';
import { installTextures } from './engine/textures';
import { fitStage } from './engine/stage';
import { Deck } from './engine/deck';
import { installUI } from './engine/ui';
import { SCENES } from './scenes';
import { loadImages } from './assets';

async function boot() {
  installTextures();
  await Promise.all([loadFonts(), loadImages()]);
  const viewport = document.getElementById('viewport')!;
  const stage = document.getElementById('stage')!;
  const params = new URLSearchParams(location.search);

  const deck = new Deck(stage, SCENES);
  (window as unknown as { __deck: Deck }).__deck = deck; // for automated checks

  if (params.has('static')) {
    // Contact sheet: every scene at its canonical submission state.
    document.body.classList.add('static');
    stage.remove();
    deck.scenes.forEach((s, i) => {
      const frame = document.createElement('div');
      frame.className = 'sheet-frame';
      frame.innerHTML = `<div class="frame-label">${String(i + 1).padStart(2, '0')} · ${s.def.title}</div>`;
      frame.appendChild(s.root);
      viewport.appendChild(frame);
      const k = s.def.submission ?? s.steps - 1;
      s.tl.seek(s.times[k], true);
    });
    return;
  }

  fitStage(stage);
  installUI(deck, viewport);
  const m = /^#(\d+)(?:\.(\d+))?/.exec(location.hash);
  deck.goto(m ? +m[1] - 1 : 0, m?.[2] ? +m[2] : 0);
  document.body.dataset.ready = '1';
}

boot();
