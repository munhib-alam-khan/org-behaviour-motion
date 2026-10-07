# PPTX Submission Version: HTML → PowerPoint Mapping

**Status: APPROVED and built.** Final deck: 43 slides (42 main + appendix); see `submission/CONVERSION_REPORT.md` §2 for the two documented changes.

- **Output:** `submission/OB_Midterm_JCM_Imtiaz_Final.pptx` (16:9, 13.333 × 7.5 in), plus a PDF preview, per-slide PNGs and a conversion report.
- **Build method:** a reproducible script (`scripts/build-pptx.py`, python-pptx) that reads the same locked values (`src/data/research.ts`, `src/data/respondents.ts`) and the same prepared images (`src/assets/img/`) as the HTML. No HTML-to-PPT converter and no full-slide screenshots.

## 1. Consolidation rules

The 93 HTML states are grouped into five kinds:

| Kind | Meaning | What happens in the PPTX |
|---|---|---|
| A | Content reveal | Kept, folded into the slide's final state |
| B | Major visual transformation | Gets its own slide; the change is reproduced with a Morph transition |
| C | Data reveal | Kept; the final data state becomes the slide |
| D | Rhetorical beat that changes understanding | Gets its own slide |
| E | Cinematic in-between (beam sweeps, black opener, prints, tears, flies) | Dropped |

**Result: 41 slides.** That is above the 24–35 guide because some single HTML scenes carry two or three distinct arguments (for example, the 2.55 squeeze versus the full diagnosis). §5 lists the merges that would bring it down to 34 if you prefer.

**Morph:** ⟷ marks slide pairs joined by a PowerPoint Morph transition. Matching objects share a `!!name`, so walls close, cards converge, the balance tilts and the lane opens. All other slides use a quick Fade.

## 2. Slide map

Notation: S = scene, s = click state. Editability tags:
- **T**: editable text
- **SH**: native shapes (stamps, tags, walls, bars, arrows, tape, barcode bars)
- **CH**: native, data-editable chart
- **IMG**: image object (photo or cutout, movable)
- **BG**: raster background layer (photo plate or texture only)

| # | HTML source | PPTX slide | Visual treatment | Editability |
|---|---|---|---|---|
| 01 | S0 s0 | Title | A01 behind a torn edge, CHECKOUT wordmark, team names on sticker labels, "a field study" marker note, imagery credit | T, SH (stickers, scanner line), IMG (torn A01) |
| 02 | S1 s0–2 → final | The last person you meet | A02 printer shot, letterbox bars, receipt listing money / discounts / accuracy / waiting time = final impression, marker ring | T (all receipt lines), SH (bars, ring), IMG (A02, receipt paper) |
| 03 | S2 s1 | AGAIN. | Four tilted A06 frames, magenta word block | T, SH, IMG ×4 |
| 04 | S2 s2–3 → s3 ⟷03 | For an entire shift. | Receipt wall, yellow block, magenta tally marks. "And again" is merged in (kind E) | T, SH (tallies), IMG (wall as one layer) |
| 05 | S3 s1–2 | Can a job be important and still be poorly designed? | Pure type on black | T |
| 06 | S3 s3 | We asked the cashiers. | Yellow, A04 sticker cutout in front of the words | T, IMG |
| 07 | S4 final | 25 | Collage of 25 photo crops with #01–#25 tags, giant 25, five method stickers, marker note | T, SH (stickers, tags), IMG ×25 |
| 08 | S5 final | Five job characteristics | A07 rail duotone, five object cutouts on hooks, 01–05 labels | T, SH (hooks), IMG ×5, BG |
| 09 | S6 s1 | The easy assumption | A09 stamp photo, kraft note "repetitive → job rotation!", strike, THEORY BEFORE PROBLEM stamp, tape | T, SH (strike, stamp, tape), BG |
| 10 | S6 s2 | Diagnose first. Redesign second. | Type on plum. The tear is kind E | T |
| 11 | S7 s3 (its approved submission state) | 4.09 · 4.04 | Two tilted photo frames (A08, A06), oversized numbers, lower-third labels, receipt strip "Customer arrives → Scan → Payment → Complete ✓", 1–5 ruler with TS and TI markers | T, SH (ruler, markers, strip, arrows), IMG ×2 |
| 12 | S7 s4 | Meaning isn't the problem. | Slide 11 dimmed underneath, statement on top | T, SH (dim layer) |
| 13 | S8 s2 | The problem is somewhere else: 3.40 · 2.84 | Night lanes plate, two torn orange stickers | T, SH, BG |
| 14 | S8 s3 ⟷13 | 2.55: the squeeze | A04 cutout, magenta walls closing in, "Skill Variety · lowest of all five", "out of 5" | T, SH (walls), IMG |
| 15 | S8 s4 | The full diagnosis | Dot plot from the 3.0 midpoint on the full 1–5 scale, all five values labelled, n = 25 | T, SH built from data (tracks, stems, dots, ticks) |
| 16 | S9 s0 | MEANINGFUL. | A04 over the blurred A03 store, word in front | T, IMG, BG |
| 17 | S9 s1 ⟷16 | …But narrow. | Hazard-striped barriers close in, BUT NARROW. in magenta | T, SH (barriers), IMG, BG |
| 18 | S10 final | What would cashiers value? | Hanging tag photos with editable values 4.32 / 4.16 / 4.04, dark tag 2.84, grey tag 3.28; taped, struck-out "unlimited freedom" and "random movement" | T, SH (tape, strikes), IMG ×5 (tag paper only) |
| 19 | S11 final | r ≈ .54: Association ≠ causation | Graph-paper sheet with tape and a **native XY scatter of the 25 real points** plus least-squares line; ×2 labels for the three shared points; ink stamp | **CH (data-editable)**, T, SH, BG (graph paper) |
| 20 | S12 s3 | Three signals | Three pinned polaroids (A04 squeeze crop, tag with 4.32 / 4.16 and the "14 of 25*" note, mini real-data scatter), red string | T, SH (frames, pins, string), IMG, CH (mini scatter) |
| 21 | S12 s4 ⟷20 | Managerial signal: not proof | Polaroids shrink and converge, yellow ticket | T, SH |
| 22 | S13 s5 (its approved submission state) | Why it matters (JCM) | A07 rail, five objects with score badges, glowing paths → three psychological states → outcomes bar, gaps caption | T, SH (paths, states, badges), IMG ×5, BG |
| 23 | S13 s6 | Change the job, change the experience of doing it. | Poster over blurred A01 duotone | T, BG |
| 24 | S14 final ⟷17 | Enriched Checkout Cashier | Barriers open onto A03 store, A04 sticker, four taped notes, marker arrows, "keeps what works" bar, PROPOSED tape | T, SH, IMG, BG |
| 25 | S15 final | 01 · Structured micro-rotation | Cream, A04 anchor, five taped notes (three photo crops), pink loops, wandering path, NOT RANDOM MOVEMENT stamp, footnote | T, SH (loops, stamp, tape), IMG |
| 26 | S16 s3 (its approved submission state) | 02 · Controlled decision authority | Dark A05 queue plate. Current flow (dimmed) with queue dots, proposed low-risk flow, high-risk path, six retained items, A10 supervisor torn crop, management footnote. **No thresholds** | T, SH (all flow nodes and arrows), IMG, BG |
| 27 | S16 s4 | Controlled autonomy ≠ unrestricted autonomy | Statement over dimmed slide 26 | T, SH |
| 28 | S16 s5 | Move appropriate decisions closer to where the customer problem occurs. | Dark A09, customer → trained cashier → supervisor line, stamp crop placed at the cashier | T, SH, IMG, BG |
| 29 | S17 final | 03 · Enlargement vs enrichment | Flat "+task" pile versus crate and box staircase with five taped ownership labels, yellow banner | T, SH (tape, floor), IMG (box, crate, basket, bag) |
| 30 | S18 s1 | 04 · Operational vs developmental feedback | Torn A18 terminal ✓ and A10 conversation, lower-thirds, marker notes | T, IMG ×2 |
| 31 | S18 s3 | The feedback sentence + five topics | Two-line statement and five tabs (accuracy, customer service, reliability, improvement, recognition), caption | T, SH (tabs) |
| 32 | S19 final | A hypothesis. Test it. | Flat grey, black type, no imagery. The colour drain is kind E | T |
| 33 | S20 final | Proposed pilot | A20 clipboard; plan text set on the paper's angle (6 weeks · 1 Karachi branch · ~10–12 cashiers; W0 / W1–6 / W3 / W6), ring around W3, PROPOSED · NOT YET CONDUCTED stamp, marker note | T (rotated text boxes), SH (ring, stamp), BG |
| 34 | S21 s1 | Both must survive (balanced) | Balance beam and fulcrum. A04 with the employee list; A08 with the safeguards list | T, SH, IMG ×2 |
| 35 | S21 s2 ⟷34 | Hypothetical imbalance → NOT A SUCCESS | Beam tilts, HYPOTHETICAL caption, stamp | T, SH, IMG |
| 36 | S21 s3 | SCALE · MODIFY · STOP | Three ink stamps over the faded balance | T, SH |
| 37 | S22 s2 | Routine ≠ meaningless | A01 poster; already there (4.09, 4.04) versus what appears to be missing | T, SH, BG |
| 38 | S22 s3 | Redesign the environment around the cashier, not the cashier. | Statement on the same plate | T, BG |
| 39 | S23 s1–2 | A job someone owns. | Lane opened onto A03, four coloured marker lanes with 01–04 labels, A04 at the centre. "performs → owns" shown as a struck-through "performs" beside "owns" | T, SH (lanes), IMG, BG |
| 40 | S23 s3–4 ⟷39 | Not a different job. A better-designed one. | Dark overlay, two lines | T, SH |
| 41 | S23 s5 | Thank you | Cream, receipt with "Thank you." and team names, institution line, Hackman & Oldham (1976), imagery credit | T, IMG (receipt paper) |

Every scene is represented. Click states not listed are kind E, or are already contained in the final state of the slide shown.

## 3. Editability and rasterization strategy

- **Always editable:**
  - every heading, number, label, list item, caption, credit and name
  - stamps, stickers, tape, walls and barriers, flow diagrams, ruler and dot plot
  - barcode bars (where used), marker rings, loops and arrows (native freeforms)
- **Native charts:** the r ≈ .54 scatter (25 real points, fit line) and its miniature. Data editable via Edit Data.
- **Rasterized, image layers only:**
  - photographs and cutouts, with the HTML's grading, duotones and sticker borders already applied
  - torn-edge photos, as transparent PNGs
  - the receipt wall, the graph-paper texture and the film-grain overlay
- **No slide is a flat screenshot.** Text never sits inside an image.
- **Generated text in the photos** (A02 receipt, A08 screen total, A10 badge) uses the already-blurred images, so no AI-generated figure is legible.

## 4. Fonts (decision needed)

PowerPoint can't use the HTML's variable-width Archivo directly.

| Option | Display / labels / receipt / marker | Look | Risk |
|---|---|---|---|
| **A, recommended** | Static Archivo instances cut from the bundled font (Black Condensed, ExtraBold Expanded, Bold Semi-Expanded), JetBrains Mono, Caveat Brush. **Embedded in the PPTX**, also shipped in `submission/fonts/` | Identical to the HTML | Some PowerPoint builds ignore embedded fonts and substitute until the fonts are installed. The included fonts folder fixes that |
| B | Bahnschrift Condensed Bold / Bahnschrift / Consolas / Ink Free (pre-installed on Windows) | Close, slightly more technical | None on Windows. Mac PowerPoint lacks Bahnschrift |

## 5. Questions

1. **Approve the 41-slide map?** To reach about 34, merge 16+17, 27+28, 34+35, 37+38, 03+04, 12 into 11, and 39+40.
2. **Fonts:** A (recommended) or B?
3. **Optional appendix slide** (after slide 41, clearly marked as an appendix): the full exploratory correlation table, all 10 r values (5 dimensions × motivation and satisfaction), labelled "exploratory · n = 25 · no significance testing". It isn't in the HTML, so I'd add it only if you want it.
4. **Speaker notes:** fill each slide's notes with the spoken script lines from your original brief? (The notes pane would be useful for the PDF version too.)
