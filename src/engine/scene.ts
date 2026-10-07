import gsap from 'gsap';

export type Theme = 'night' | 'day' | 'yellow' | 'magenta' | 'pause' | 'black';
export type EnterFx = 'cut' | 'fade';

export interface SceneCtx {
  root: HTMLElement;
  tl: gsap.core.Timeline;
  /** Mark the end of a click-state. The first call is s0 (state on arrival). */
  step(cue: string): void;
  $<T extends Element = HTMLElement>(sel: string): T;
  $$<T extends Element = HTMLElement>(sel: string): T[];
  beep(): void;
}

export interface SceneDef {
  id: string;
  act: string;
  title: string;
  theme: Theme;
  enter?: EnterFx;
  /** Index of the step used as the static submission frame (defaults to last). */
  submission?: number;
  build(ctx: SceneCtx): void;
}

export interface SceneInstance {
  def: SceneDef;
  root: HTMLElement;
  tl: gsap.core.Timeline;
  cues: string[];
  times: number[];
  get steps(): number;
}

export const defineScene = (d: SceneDef) => d;

export function instantiate(def: SceneDef, beep: () => void, parent: HTMLElement): SceneInstance {
  const root = document.createElement('section');
  root.className = `scene theme-${def.theme}`;
  root.dataset.scene = def.id;
  parent.appendChild(root); // in the DOM before build so scenes can measure layout
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out', duration: 0.7 } });
  const cues: string[] = [];
  const times: number[] = [];
  const ctx: SceneCtx = {
    root,
    tl,
    step(cue) {
      times.push(tl.duration());
      cues.push(cue);
    },
    $: (s) => {
      const e = root.querySelector(s);
      if (!e) throw new Error(`[${def.id}] missing ${s}`);
      return e as never;
    },
    $$: (s) => Array.from(root.querySelectorAll(s)) as never,
    beep: () => tl.call(beep),
  };
  def.build(ctx);
  if (!times.length) ctx.step('');
  return { def, root, tl, cues, times, get steps() { return times.length; } };
}
