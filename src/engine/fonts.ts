import archivo from '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url';
import mono from '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url';
import marker from '@fontsource/caveat-brush/files/caveat-brush-latin-400-normal.woff2?url';

/** Fonts are bundled into the build; this waits until they are ready so
 *  nothing is measured or shown in a fallback face. */
export async function loadFonts() {
  const faces = [
    new FontFace('Archivo', `url(${archivo})`, { weight: '100 900', stretch: '62% 125%' }),
    new FontFace('JetBrains Mono', `url(${mono})`, { weight: '100 800' }),
    new FontFace('Marker', `url(${marker})`, { weight: '400' }), // accent only
  ];
  await Promise.all(
    faces.map(async (f) => {
      try { document.fonts.add(await f.load()); } catch (e) { console.warn('font failed', e); }
    }),
  );
}
