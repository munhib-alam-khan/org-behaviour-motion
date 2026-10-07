import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Builds ONE self-contained dist/index.html (JS, CSS and fonts inlined)
// so the deck runs from a USB stick / desktop with no network at all.
export default defineConfig({
  base: './',
  plugins: [viteSingleFile()],
  build: {
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    target: 'es2020',
  },
});
