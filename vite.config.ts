import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Source entry lives in src/index.html. The build is ONE self-contained
// dist/index.html (JS, CSS, fonts inlined) that runs offline from file://
// and from GitHub Pages ("Deploy from a branch" serves the root index.html).
export default defineConfig({
  root: 'src',
  base: './',
  publicDir: false,
  plugins: [viteSingleFile()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    target: 'es2020',
  },
});
