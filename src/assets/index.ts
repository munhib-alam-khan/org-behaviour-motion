// All presentation imagery (AI-generated, illustrative; prepared by
// scripts/prepare-assets.py). Vite inlines every file into the single offline
// HTML; at boot each data URI is turned into a short blob: URL so repeated use
// (tiles, frames) never duplicates megabytes of base64 in the DOM.
const files = import.meta.glob('./img/*.webp', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

const urls: Record<string, string> = {};

export async function loadImages() {
  await Promise.all(
    Object.entries(files).map(async ([path, src]) => {
      const name = path.replace('./img/', '').replace('.webp', '');
      let url = src;
      try { url = URL.createObjectURL(await (await fetch(src)).blob()); } catch { /* keep data URI */ }
      const im = new Image();
      im.src = url;
      try { await im.decode(); } catch { /* decode lazily */ }
      urls[name] = url;
    }),
  );
}

/** URL for a prepared image by name (e.g. 'a04_cut'). */
export function img(name: string): string {
  const u = urls[name];
  if (!u) throw new Error(`missing image ${name}`);
  return u;
}
