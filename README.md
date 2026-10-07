# CHECKOUT — a cinematic presentation engine

**Redesigning the Checkout Cashier Role Using the Job Characteristics Model**
KSBL · Organizational Behaviour · Fall 2026 · Instructor: Dr. Faryal Razzaq
Munhib Alam Khan · Abdullah Khan · Rabie Sami · Karan Kumar

An academic study. Not affiliated with or endorsed by Imtiaz. The redesign and pilot are **proposed**, not implemented.

---

## Presenting (offline, no internet needed)

1. Open **`release/CHECKOUT-presentation.html`** (identical to the root `index.html`) in Chrome or Edge by double-clicking it. It is one self-contained file with fonts, code and graphics inside, so copy it to the laptop or a USB stick beforehand.
2. Press **F** for fullscreen.
3. Press **P** once to check the presenter overlay, then **P** again to hide it.

| Key | Action |
|---|---|
| → · Space · Enter · PageDown · left-click | Next reveal |
| ← · Backspace · PageUp · right-click | Previous reveal (instant) |
| ↓ / ↑ | Next scene / start of scene (then previous scene) |
| **M** | Scene navigator. Click = start of scene · Shift+click = its final state |
| number + Enter | Jump to scene (e.g. `1` `2` Enter → the r ≈ .54 scatterplot) |
| **P** | Presenter overlay: scene, state k/n, what is on screen now, what the next click shows |
| **B** or **.** | Black screen (any click/B returns) |
| **S** | Scanner-beep sound on/off. **Off by default.** |
| **F** / Esc | Fullscreen on / off |
| Home / End | First / last scene |

- Nothing auto-advances. A press *during* an animation completes it rather than skipping a reveal.
- Going back always snaps to the exact state, so it is safe to answer "show me that correlation again" mid-talk.
- Most clicker remotes send PageUp/PageDown or arrows and work out of the box.
- The URL keeps your place (`#scene.state`), so a refresh returns to the same slide.
- Hover the bottom-right corner for Scenes / Sound / Fullscreen buttons. The cursor hides itself after 2 s.

## Structure (24 scenes · 93 click-states · ~8 min)

| Act | Scenes |
|---|---|
| I · Observe | Title · The last person you meet · Again. · The question |
| II · Investigate | 25 cashiers · Five job characteristics · Diagnose first |
| III · Reveal | 4.09 / 4.04 · The drop to 2.55 + full diagnosis · Meaningful. But narrow. |
| IV · Go deeper | What cashiers value · r ≈ .54 scatter (real respondent data) · Managerial signal |
| V · Interpret | JCM: characteristics → psychological states → outcomes |
| VI · Redesign | Enriched Checkout Cashier · 01 Micro-rotation · 02 Controlled authority · 03 Zone ownership · 04 Structured feedback |
| VII · Test | A hypothesis. Test it. · Proposed 6-week pilot · Both must survive |
| VIII · Conclude | Routine ≠ meaningless · Not a different job. A better-designed one. |

The full creative direction and scene map are in [`docs/PRESENTATION_PLAN.md`](docs/PRESENTATION_PLAN.md).

## Imagery

All photography is **AI-generated and illustrative**: no real employees, respondents or Imtiaz branding. The deck says so on the title and closing frames.

- Source files live in `assets/raw/` (A01–A20, mapped in [`docs/ART_DIRECTION_REVISION.md`](docs/ART_DIRECTION_REVISION.md)).
- `python3 scripts/prepare-assets.py` builds everything in `src/assets/img/` locally:
  - grades, duotones and 16:9 crops
  - **offline background removal** (rembg) with sticker borders baked in
  - the 25 collage crops
  - blurring of any AI-generated receipt text, POS totals or badge text, so no generated figure is ever legible
- A04 is the one recurring cashier character. A10's supervisor is the one recurring supervisor.
- Requires `pip install rembg onnxruntime pillow numpy`. Only needed when the raw assets change, because the outputs are committed.

## Data integrity

- Every number on screen comes from [`src/data/research.ts`](src/data/research.ts).
- The scatterplot uses only the 25 anonymous (Skill Variety, Job Satisfaction) item sums in [`src/data/respondents.ts`](src/data/respondents.ts). Identical points are drawn as rings ("×2"), never jittered.
- `npm run verify` recomputes the means and r from those values and fails the build if anything drifts.
- Correlation is labelled *association*, never causation. The pilot is labelled *proposed · not yet conducted*, and its "not a success" example is labelled *hypothetical*.

## Development

```bash
npm install
npm run dev       # live dev server
npm run verify    # check locked numbers
npm run build     # verify + typecheck + dist/index.html (single file)
npm run release   # build + copy to index.html (GitHub Pages) and release/CHECKOUT-presentation.html
```

- Open `dist/index.html?static` (or the release file with `?static`) to see a **contact sheet of every scene's submission state**. This is the canonical static frame per scene, intended for the later PPTX export.
- Each scene is a paused GSAP timeline. Every `step()` call marks a click-state label, so forward plays to the next label and back/jump seeks. Scene modules live in `src/scenes/act*.ts`.
- **GitHub Pages** (*Settings → Pages → Deploy from a branch*, folder `/ (root)`) serves the root `index.html`, which is the **built** presentation. The dev source entry is `src/index.html`. **Always run `npm run release` and commit before pushing**, or Pages will show the old build. Local offline use never depends on Pages.

Fonts: Archivo and JetBrains Mono (SIL Open Font License), plus Caveat Brush (OFL) as a marker accent only, all bundled. Animation: GSAP 3 (bundled).
