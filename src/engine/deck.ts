import gsap from 'gsap';
import { instantiate, type SceneDef, type SceneInstance } from './scene';
import { sound } from './sound';

/**
 * Presentation controller.
 * Every click-state is a label on a paused per-scene timeline, so any state
 * can be reached deterministically: forward PLAYS to the next label,
 * backward and jumps SNAP instantly. Nothing ever auto-advances.
 */
export class Deck {
  scenes: SceneInstance[];
  cur = 0;
  step = 0;
  private pending: { tween: gsap.core.Tween | gsap.core.Timeline; from: number } | null = null;
  private layerFx: gsap.core.Tween | null = null;
  private listeners: Array<() => void> = [];

  constructor(private stage: HTMLElement, defs: SceneDef[]) {
    this.scenes = defs.map((d) => instantiate(d, () => sound.beep(), stage));
  }

  onChange(fn: () => void) { this.listeners.push(fn); }
  private emit() {
    for (const f of this.listeners) f();
    try { history.replaceState(null, '', `#${this.cur + 1}.${this.step}`); } catch { /* file:// in some browsers */ }
  }

  get scene() { return this.scenes[this.cur]; }
  get busy() { return !!this.pending?.tween.isActive() || !!this.layerFx?.isActive(); }

  /** Finish whatever is animating (presenter pressed during a transition). */
  private settle(): boolean {
    let was = false;
    if (this.layerFx?.isActive()) { this.layerFx.progress(1); was = true; }
    if (this.pending) {
      if (this.pending.tween.isActive()) was = true;
      this.pending.tween.progress(1).kill();
      this.pending = null;
    }
    return was;
  }

  next() {
    // A press during an animation completes it rather than skipping a reveal.
    if (this.settle()) return;
    const s = this.scene;
    if (this.step < s.steps - 1) this.play(this.step + 1);
    else if (this.cur < this.scenes.length - 1) this.enter(this.cur + 1);
  }

  prev() {
    if (this.pending?.tween.isActive()) {
      const from = this.pending.from;
      this.pending.tween.kill();
      this.pending = null;
      this.snap(this.cur, from);
      return;
    }
    this.settle();
    if (this.step > 0) this.snap(this.cur, this.step - 1);
    else if (this.cur > 0) this.snap(this.cur - 1, this.scenes[this.cur - 1].steps - 1);
  }

  nextScene() {
    this.settle();
    if (this.cur < this.scenes.length - 1) this.enter(this.cur + 1);
  }

  prevScene() {
    this.settle();
    if (this.step > 0) this.snap(this.cur, 0);
    else if (this.cur > 0) this.snap(this.cur - 1, 0);
  }

  /** Jump directly to a scene/state (navigator, deep links, Home/End). */
  goto(index: number, step = 0) {
    this.settle();
    const i = Math.max(0, Math.min(this.scenes.length - 1, index));
    const k = Math.max(0, Math.min(this.scenes[i].steps - 1, step));
    this.snap(i, k);
  }

  private play(k: number) {
    const s = this.scene;
    const from = this.step;
    s.tl.seek(s.times[from], true);
    this.step = k;
    const tween = s.tl.tweenFromTo(s.times[from], s.times[k], { ease: 'none' });
    this.pending = { tween, from };
    this.emit();
  }

  private show(i: number) {
    for (const [j, s] of this.scenes.entries()) {
      s.root.classList.toggle('active', j === i);
      if (j !== i) gsap.set(s.root, { opacity: 1 });
    }
  }

  private snap(i: number, k: number) {
    this.layerFx?.kill();
    this.layerFx = null;
    this.cur = i;
    this.step = k;
    this.show(i);
    const s = this.scene;
    s.tl.seek(s.times[k], true);
    this.emit();
  }

  /** Forward entry into a scene: plays its intro (if any) up to s0. */
  private enter(i: number) {
    const prev = this.scene;
    const next = this.scenes[i];
    this.cur = i;
    this.step = 0;
    next.tl.seek(0, true);
    next.root.classList.add('active');
    next.root.style.zIndex = '2';
    const done = () => {
      prev.root.classList.remove('active');
      next.root.style.zIndex = '';
    };
    if (next.def.enter === 'fade') {
      this.layerFx = gsap.fromTo(next.root, { opacity: 0 }, { opacity: 1, duration: 0.55, ease: 'power2.inOut', onComplete: done });
    } else done();
    if (next.times[0] > 0) {
      const tween = next.tl.tweenFromTo(0, next.times[0], { ease: 'none' });
      this.pending = { tween, from: 0 };
    }
    this.emit();
  }
}
