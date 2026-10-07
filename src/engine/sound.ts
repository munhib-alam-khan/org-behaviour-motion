// Single synthesised checkout beep — no audio files, no music.
let ctx: AudioContext | null = null;
let enabled = false;
try { enabled = localStorage.getItem('deck.sound') === 'on'; } catch { /* storage unavailable */ }

export const sound = {
  get on() { return enabled; },
  toggle() {
    enabled = !enabled;
    try { localStorage.setItem('deck.sound', enabled ? 'on' : 'off'); } catch { /* ignore */ }
    if (enabled) this.beep();
    return enabled;
  },
  beep() {
    if (!enabled) return;
    try {
      ctx ??= new AudioContext();
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'square';
      o.frequency.value = 2730;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.06, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.13);
    } catch { /* audio unavailable */ }
  },
};
