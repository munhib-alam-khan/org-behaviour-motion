# PPTX Conversion Report
`OB_Midterm_JCM_Imtiaz_Final.pptx` · editable submission version of the final HTML presentation

| Item | Result |
|---|---|
| Slides | **43 = 42 main + 1 appendix** (slide 43). See the two documented changes in §2 |
| Canvas | 16:9 widescreen, 13.333 × 7.5 in (built on the HTML's 1920 × 1080 grid) |
| Speaker notes | On all 43 slides: the finalized script, divided across the slides that carry it. [Bracketed lines] are presenter cues |
| Transitions | Morph on 7 slide pairs, quick Fade elsewhere. No in-slide animations were added |
| HTML | **Not modified.** Read-only source of truth; built from the same `src/data` and `src/assets/img` |
| Files | `OB_Midterm_JCM_Imtiaz_Final.pptx` · `OB_Midterm_JCM_Imtiaz_Final_preview.pdf` · `preview/slide-01…43.png` · this report |
| Rebuild | `python3 scripts/pptx/make_fonts.py && python3 scripts/pptx/prep_images.py && python3 scripts/pptx/build.py` |

## 1. Slide list and consolidated HTML states

| PPTX | HTML scene / states | Consolidated (purely cinematic, dropped) |
|---|---|---|
| 1 | S0 title | — |
| 2 | S1 s0–2 (final) | Black opener, beam sweep, receipt printing |
| 3 → 4 ⟷ | S2 s1 / s3 | Single-frame opener; "And again" pattern wipe |
| 5–6 | S3 s1–2 / s3 | Receipt wall falling away |
| 7 | S4 final | Full stop → token hand-off, staggered landing |
| 8 | S5 final | Objects riding in, beam "scans" |
| 9–10 | S6 s1 / s2 | Stamp impact frame, paper tear |
| 11–12 | S7 s3 / s4 | Number-by-number beam reveals (both numbers shown) |
| 13 → 14 ⟷ → 15 | S8 s2 / s3 / s4 | Quiet line before 3.40; barcode-to-chart flight |
| 16 → 17 ⟷ | S9 s0 / s1 | — |
| 18 | S10 final | Tags dropping one by one |
| 19 | S11 final | Axes-only and points-only states |
| 20 → 21 ⟷ | S12 s3 / s4 | Polaroids flying in one at a time |
| 22–23 | S13 s5 / s6 | Path-by-path drawing |
| **24** → 25 ⟷ | S14 s0 / final | Module-by-module docking |
| 26 | S15 final | Loop-by-loop drawing |
| 27–29 | S16 s3 / s4 / s5 | Token animation along the current and proposed flows (both flows shown together on 27) |
| 30 | S17 final | Pile and stack building |
| 31–32 | S18 s1 / s3 | Sentence-only state |
| 33 | S19 final | Colour drain |
| 34 | S20 final | Row-by-row writing |
| 35 → 36 ⟷ → 37 | S21 s1 / s2 / s3 | — |
| 38–39 | S22 s2 / s3 | List-by-list reveals |
| **40 → 41 ⟷ → 42** | S23 s0 / s2 / s3–5 | Lane-label stagger; cream receipt print |
| 43 | Appendix | Not in HTML (approved backup slide) |

## 2. Documented changes to the approved 41-slide map
Both changes come from one PowerPoint limitation: **Morph only connects adjacent slides**, so a transformation needs its starting state on the slide immediately before it.

1. **Slide 24 added (Enriched Checkout Cashier, still in the narrow lane: HTML S14 s0).**
   - Slide 23 (the theory poster) sits between "But narrow" and the enriched role, so no Morph could show the lane opening.
   - Slide 24 is the HTML's own first state of that scene. 24 → 25 morphs the barriers open.
   - **This moves the main deck to 42 slides and the appendix to slide 43.**
2. **Finale regrouped without changing its length.**
   - The approved map had "lane opened + owns" and "Not a different job" as separate slides, with no narrow source for the required finale Morph. It is now:
     - **40:** narrow lane, "A job someone performs…"
     - **41:** ⟷ lane opens, "…owns."
     - **42:** "Not a different job. A better-designed one." with a subtle receipt "Thank you.", concise references and the imagery disclosure, as your original brief described the ending ("Final words… Then subtle: Thank you.").
   - The HTML's last two states (dark lines, then cream collapse) are combined into slide 42.

### Morph pairs (shared objects verified by `scripts/pptx/audit.py`)
| Pair | Transformation | Shared objects |
|---|---|---|
| 3 → 4 | Repetition: AGAIN. → FOR AN ENTIRE SHIFT. | the word block |
| 13 → 14 | 2.55: walls close on the cashier | both walls (staged off-slide on 13) |
| 16 → 17 | Meaningful → but narrow | barriers, hazard strips, cashier, headline |
| 20 → 21 | Evidence → managerial signal | three polaroid groups |
| 24 → 25 | Enriched role: lane opens | barriers, hazard strips, cashier, store photo, title |
| 35 → 36 | Balanced → hypothetical failure | beam, both outcome groups |
| 40 → 41 | Finale: lane opens, performs → owns | barriers, hazard strips, cashier, store photo, phrase |

The only off-slide objects in the file are the Morph staging copies of walls and barriers (slides 13, 16, 25, 41).

## 3. What is editable
- **All text:** every heading, number, label, list, caption, name, credit, method sticker, flow node, stamp and note. Each is a native text box or shape text.
- **Native shapes:**
  - walls and barriers, stickers, stamps, tape, price-tag text, receipt rules and leaders
  - ruler and dot plot (slide 15, built from the data)
  - flow diagram (27), JCM states and paths (22), balance (35–37), lanes (41)
  - marker rings, tallies, loops and strike-throughs (native freeforms)
  - the mini scatter on the evidence wall (25 vector points from the data)
- **Native, data-editable chart:** the **r ≈ .54 scatter** (slide 19). It has three series:
  - all **25 respondent observations** from `src/data/respondents.ts`
  - the least-squares line
  - the 3 shared points, labelled ×2
  Right-click → Edit Data.
- **Native table:** the appendix correlation table (slide 43).
- **Groups:** polaroids, component notes, micro-rotation notes and balance pans are rotated groups that move as one.

## 4. What is rasterized (image objects only, never text or data)
- **Photographs and cutouts:** the approved A01–A20 assets, with the HTML's grading, duotones and sticker borders pre-applied. Each is a separate, movable picture.
- **Torn-edge photos:** the A01 title, A10 supervisor, A18 terminal, A10 conversation and A08 till, as transparent PNGs.
- **Texture layers:**
  - film grain, locked against selection
  - graph paper
  - receipt wall (slide 4)
  - hazard stripes
- **Photo-based filters reproduced as images:** the blurred A01 duotone (slide 23) and the dark and grey tag variants (slide 18).
- AI-generated text in photos (A02 receipt, A08 screen total, A10 badge) is already blurred in the source images. **No number, finding, recommendation or claim is inside any image.**

## 5. Fonts
| Role | Font (static instance of the HTML's font) |
|---|---|
| Giant numbers and statements | Archivo Display (Archivo, width 62, weight 900) |
| Headlines | Archivo Condensed (width 75, weight 850) |
| Labels and names | Archivo Expanded (width 125, weight 800) |
| Tracked caps | Archivo Label (width 112, weight 700) |
| Receipt and technical text | JetBrains Mono Regular / Bold |
| Marker accents | Caveat Brush |
| ≈ ≠ → ↔ ↑ / ✓ (missing from the font subsets) | Arial / Segoe UI Symbol (installed with Windows and Office) |

- **Embedding:** all six families are embedded in the PPTX as PowerPoint embedded-font parts (EOT `.fntdata`, OFL fonts with installable embedding).
- **Verification limit:** PowerPoint can't run in this sandbox, and LibreOffice (used for the previews) does not load embedded PowerPoint fonts. So the embedding is built to PowerPoint's format but **not confirmed in PowerPoint itself**. The previews were rendered with the fonts installed locally.
- **One-minute guarantee:**
  1. Install the 7 files in `submission/fonts/` on one computer.
  2. Open the PPTX in PowerPoint.
  3. Go to **File → Options → Save → "Embed fonts in the file" (embed all characters)** and save.

  PowerPoint then writes its own embedded copies, and the file renders identically everywhere without any font files. Recipients never need the folder.

## 6. Effects not reproduced exactly
- **Continuous HTML motion** (beam sweeps, printing, flying objects, staggered reveals) appears as final states plus Morph. Per the brief, no imitation animations were added.
- **The pilot clipboard text** follows the paper's perspective by per-line placement, rotation and scaling. PowerPoint has no true perspective warp for text.
- **The evidence-wall shrink** is built as separate half-size polaroids, so the Morph scales them with the text staying proportional.
- **The barcode-to-chart transformation** (HTML S8) and the colour drain (S19) are cinematic in-betweens and are not shown.
- **Text with reduced opacity** uses a solid pre-blended colour (same appearance), because transparent text runs are clipped by some renderers.
- **The HTML's idle scanner-line loop** on the title is static.

## 7. QA performed
1. Built, validated (OOXML schema, relationships, content types, charts: all passed), rendered every slide and inspected each one.
2. **Fixed in QA rounds:**
   - clipped semi-transparent labels
   - title subtitle wrap
   - "SIGNIFICANCE" mid-word break
   - micro-rotation note overflow
   - current-flow label wrap
   - clipboard figure collisions
   - balance card titles
   - evidence-wall captions
   - act tag hidden behind the graph paper
   - "KARACHI" splitting mid-word
   - missing Morph source for the enriched-role transformation
   Re-rendered after each round.
3. **Number audit** (`submission/build/audit.txt`), locked values on slides only where expected:

| Value | Slides |
|---|---|
| 25 (n) | 7, 15, 18, 19, 20, 21, 43 |
| 4.09 | 11, 12, 15, 22, 38, 39 |
| 4.04 (Task Identity / feedback preference) | 11, 12, 15, 18, 22, 38, 39 |
| 3.40 | 13, 15, 22 |
| 2.84 (Autonomy / Job Satisfaction) | 13, 15, 18, 22 |
| 2.55 | 14, 15, 20, 21, 22 |
| 4.32 · 4.16 | 18, 20, 21 |
| 3.28 | 18 |
| r ≈ .54 | 19, 20, 21, 43 (+0.539) |
| 6 weeks · ~10–12 cashiers | 34 |

   - No "significant", p-values, causal wording, unrounded 2.547/4.093 or invented figures were found.
   - The scatter's 25 points match `respondents.ts` exactly.
   - The appendix values match the locked correlation list. SV ↔ JS (+0.539) is recomputed from the respondent data at build time.
4. **Speaker notes:** present on all 43 slides. Script language is preserved. Split scenes divide the script rather than repeat it.
