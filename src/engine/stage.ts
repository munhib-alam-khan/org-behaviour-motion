/** Fixed 1920×1080 canvas, uniformly scaled and letterboxed. Never reflows. */
export const W = 1920;
export const H = 1080;

export function fitStage(stage: HTMLElement) {
  const fit = () => {
    const s = Math.min(window.innerWidth / W, window.innerHeight / H);
    stage.style.transform = `translate(-50%, -50%) scale(${s})`;
  };
  window.addEventListener('resize', fit);
  fit();
}
