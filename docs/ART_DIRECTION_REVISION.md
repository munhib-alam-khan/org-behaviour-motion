# Art-Direction Revision Plan: "CHECKOUT" v2

**Status: PROPOSAL, awaiting approval. Nothing implemented.**
Scope is visual only. Research, narrative, scene order, click-states, presenter controls, data and engine stay exactly as they are (24 scenes, 93 states). Every locked number keeps its current scene and click.

---

## 1. What the references actually do (second viewing)

**Ref A: Netflix *Geeked Week***
- **Photography is never just placed.** Live footage sits in tilted frames with thick white or coloured borders, floating at different depths over a dark grid. Two or three frames overlap, and the back ones are smaller and cropped tighter. Frames swap their content while the frame itself stays still.
- **The graphics are hand-made.** Spray-paint strokes cut across photo edges, stickers (an eyeball, a d20, a flaming fist) sit on the frame corners, and neon scribbles are drawn on top. Torn black spray edges frame a photo from inside.
- **Type is loud and sits on top of other type.** "COMING UP NEXT" is set in a different face directly over a huge distressed logo. Single words ("AND", "SOME", "EPIC", "SURPRISES") get a full card each, surrounded by doodles.
- **Pattern wipes:** one sticker repeats until it fills the screen, then the cut lands.
- **Lower-third labels** on interview shots are small, boxed and offset, like a sticker slapped on.

**Ref B: iPhone "yellow"**
- **Live action becomes illustration on the beat.** A real man raises the phone and his body becomes a flat drawing while the street stays photographic. Real and graphic share one frame.
- **A hero object carries continuity.** The phone, a pink ribbon and a ball are passed between characters and across cuts.
- **Scale shocks.** A macro of the product fills the frame. A giant foreground shoe dwarfs the street.
- **Graphic elements physically touch the photo:** they stand on kerbs, lean on walls and cast shadows.
- **It ends with a pop-up-book collage world,** then collapses to flat cream with one small mark.

**What translates to our story** (subject matter discarded):
1. **The receipt is the hero object.** It is real, photographed or scanned paper, not a vector.
2. **Photos are cut out and stickered** (white sticker border plus a hard drop shadow), or seen through **torn and irregular masks**. Rectangles are used only on purpose, as tilted "polaroid" frames in the Ref A manner.
3. **Graphics touch the photography.** The scanner beam crosses the photo, stamps land on it, marker scribbles circle things in it, and tape holds it down.
4. **The medium changes on the beat:** photo becomes graphic, graphic becomes data, data becomes paper.
5. **Rhythm alternates:** dense collage, then a single photo shot, then pure typography, then silence.

---

## 2. Global visual system v2

| Layer | Treatment |
|---|---|
| **Photo grade** | Warm, contrasty and slightly crushed blacks, with fine grain. Each image is prepared at **one grade**. Three variants are allowed: **full colour**, **plum/magenta duotone** (Night scenes), **ink/yellow duotone** (Day scenes). |
| **Photo shapes** | (a) **Cutouts** with a 10–14 px white sticker border and a hard offset shadow. (b) **Torn-paper masks** (SVG mask with a jagged edge). (c) **Tilted frames**, 2–6°, thick border, layered at depth. (d) **Full-bleed film shots** with a 2.39:1 letterbox for "commercial" moments. |
| **Paper & objects** | Scanned receipt paper, masking tape, sticker sheets, kraft card, price-tag stock, ink stamps. These are real textures, not drawn ones. |
| **Hand layer** | One **marker font** (OFL, bundled), plus SVG marker strokes that draw on: circles, arrows, underlines, crossings-out. This replaces most UI-style labels. |
| **Graphic layer** | Scanner beam (kept), spray strokes in magenta/yellow, halftone dots, barcode patterns, pattern-wipe tiles. |
| **Data** | Stays exact and vector, but is **printed onto paper**: charts sit on receipt or graph-paper stock, axes are receipt rules, dots are punched holes or price stickers. |
| **Type** | Archivo (kept) for the big voice, JetBrains Mono for the receipt voice, the new marker font for annotations. Type may run **behind** cutouts (depth) and **over** photos. |
| **Palette** | Unchanged: plum/ink, magenta, yellow, orange, electric blue, cream. Photos are graded toward it so nothing looks pasted in. |

**What gets removed:** most rounded "cards", pill nodes, UI chips, flat icon illustrations and the dashboard-style headers. The flat vector "products" and "counter" are replaced by photographic cutouts.

**Approximate mix across the deck:** about 50% photographic, 30% data and graphic, 20% type, collage and objects. Per-scene estimates appear in §4.

---

## 3. Shot list (assets I need)

IDs are referenced in §4. Landscape, at least 2400 px on the long side. "CUT" means the image will be cut out, so a clean or plain background helps. ★ = critical.

| ID | Shot | Use |
|---|---|---|
| **P01 ★** | Close-up of cashier **hands scanning an item**, red scanner light visible, shallow focus | Opening, Reveal |
| **P02 ★** | **Long receipt emerging from a printer**, macro, side light | Opening and its match cut |
| **P03 ★** | **A real long receipt**, flatbed-scanned or shot flat, no store name or logo | Hero texture throughout |
| **P04 ★** | **Wide shot of a row of checkout lanes**, receding, repetitive | "Again", "25" |
| **P05 ★** | **Cashier waist-up behind the counter**, neutral pose, plain background preferred (CUT) | The 2.55 squeeze, finale |
| **P06** | Customer queue from behind or the side, **faces not identifiable** | Autonomy (queue), opening |
| **P07 ★** | **Top-down conveyor belt** with groceries spaced apart | Five dimensions |
| **P08 ★** | Five single objects (CUT): **mixed basket · long receipt · shopping bag · keys · handheld scanner** | The five JCM "products" |
| **P09** | Hands counting cash / an open cash drawer | Task significance |
| **P10 ★** | **Rubber stamp and ink pad**, macro; a hand pressing a stamp | Diagnose first, Autonomy |
| **P11** | **Product barcode macro**, real packaging, no brand visible | 2.55, association |
| **P12 ★** | **Blank paper price tags / shelf-edge labels** (real stock, blank or blurred) | What cashiers value |
| **P13** | Store aisle wide, near the checkout zone | Micro-rotation |
| **P14** | Two people in conversation at work, over-the-shoulder, faces soft or turned | Feedback |
| **P15** | Supervisor figure from behind or the shoulder, keys or lanyard visible (CUT) | Autonomy |
| **P16** | Karachi street or storefronts at dusk, **no shop signage readable** | "Multiple Karachi branches" |
| **P17** | Empty checkout lane after closing, lights on | Credibility turn (optional), finale |
| **P18** | Hand passing a receipt or bag to a customer | "Final impression" |
| **P19** | Paper textures: masking tape, sticker sheet, kraft card, graph paper (scans) | Global |
| **P20** | Optional **5–8 s video loops** (scanner beep, belt moving, receipt printing), MP4 | Optional "film" moments |

Where something is missing, I fall back to a typographic or graphic treatment. I will never invent data or fake a document.

---

## 4. Scene-by-scene plan

Each scene uses the same six items:
1. **Keep:** what stays as it is.
2. **Too infographic now:** what currently reads as an animated infographic.
3. **Assets:** which shots (§3) come in.
4. **Treatment:** the graphic design around them.
5. **Motion:** what moves and what it transforms into.
6. **Why:** how it supports what the speaker is saying.

The mix line gives the approximate share of photo / graphic / type for that scene.

### ACT I · OBSERVE

**Sc 0 · Title** (photo 40 / graphic 20 / type 40)
1. **Keep:** CHECKOUT wordmark, the team receipt and the idle scanner line.
2. **Too infographic now:** the vector receipt on flat plum feels like a UI mock-up.
3. **Assets:** P01 hands-at-scanner, duotone plum, cropped hard to the right half.
4. **Treatment:** the wordmark sits half **behind** the hands cutout. The team list is printed on the real receipt (P03 texture), taped to the frame with masking tape. A small sticker reads "Illustrative imagery".
5. **Motion:** only the scanner light idles across the hands (already the one ambient loop).
6. **Why:** before anyone speaks, the room sees a job and a person, not a diagram.

**Sc 1 · The last person you meet** (photo 70 / type 30)
1. **Keep:** black open, beam sweep, the five printed lines.
2. **Too infographic now:** the receipt is a vector drawing.
3. **Assets:** **P02** printer macro, then **P03** real receipt. P18 hand-to-customer as a small inset.
4. **Treatment:** a commercial-film shot in 2.39:1 letterbox. "THE LAST PERSON YOU MEET." is revealed by the beam across the photo. The five lines (MONEY · DISCOUNTS · ACCURACY · WAITING TIME · = FINAL IMPRESSION) are **typeset onto the photographed receipt** in thermal-print style, with a marker circle drawn around "FINAL IMPRESSION".
5. **Motion:** the receipt physically prints down the frame, then is **torn off**, and the tear is the cut into Sc 2.
6. **Why:** the speaker lists real stakes, so the audience watches a real object accumulate them.

**Sc 2 · Again.** (photo 60 / type 40)
1. **Keep:** AGAIN / AND AGAIN / FOR AN ENTIRE SHIFT build, and the stacked outline type echo.
2. **Too infographic now:** the receipt tiles are grey placeholder rectangles.
3. **Assets:** **P03 receipt** as the repeating tile. **P04** checkout lanes behind.
4. **Treatment:**
   - "AGAIN.": four real receipts as tilted polaroid frames.
   - "AND AGAIN.": a Ref-A **pattern wipe**, where the receipt repeats into a wall over the P04 lanes photo, duotone magenta.
   - "FOR AN ENTIRE SHIFT.": a full wall of receipts, plus a marker tally (𝍸𝍸𝍸…) scrawled over it.
5. **Motion:** the frames multiply on each click, and the lanes photo pushes in slightly with each state.
6. **Why:** repetition becomes physical, made of paper and place.

**Sc 3 · The question** (type 85 / photo 15)
1. **Keep:** the receipt wall collapse, the two-line question, the yellow "WE ASKED THE CASHIERS." with the full stop as the hand-off.
2. **Too infographic now:** little. This is the deliberate minimal beat.
3. **Assets:** P05 cashier cutout, used only at the final state.
4. **Treatment:** the question stays pure type on black. On the final yellow card a **cutout of the cashier** stands **in front of** "THE CASHIERS.", so the word sits behind a person.
5. **Motion:** receipts fall away (kept). On the last click the cutout rises in from the bottom edge as the yellow lands.
6. **Why:** "we asked the cashiers" should show a person, and the cut from black text to a human figure marks the turn from assumption to asking.

### ACT II · INVESTIGATE

**Sc 4 · 25** (photo 45 / graphic 25 / type 30)
1. **Keep:** the full stop becoming respondent #01, the giant 25, the method stickers.
2. **Too infographic now:** the 5×5 token grid is too tidy and UI-like.
3. **Assets:** **P16** Karachi street at dusk (torn-paper strip), **P04** lanes, P03 receipt stubs.
4. **Treatment:**
   - The 25 tokens become **real torn receipt stubs** pinned in a loose collage with tape, each carrying a number.
   - "25" is huge, set **over** the P16 strip.
   - The method stickers stay but become real sticker-sheet textures, with a marker note "read aloud ✓" in handwriting.
   - No faces. No branch names (per the earlier decision).
5. **Motion:** stubs drop and land with slight rotation, then "25" is masked through the street photo, then the stickers slap on.
6. **Why:** 25 should feel like 25 conversations, scraps of paper gathered on the shop floor, not a counter.

**Sc 5 · Five job characteristics** (photo 70 / type 30)
1. **Keep:** the belt metaphor, the names and the 01–05 order.
2. **Too infographic now:** flat icon "products" on a vector belt.
3. **Assets:** **P07** top-down conveyor plate (full bleed). **P08** five object cutouts: basket = Skill Variety, receipt = Task Identity, bag = Task Significance, keys = Autonomy, scanner = Feedback.
4. **Treatment:** the camera looks straight down at the belt. Each object cutout has a white sticker border, and its name is on a **real price-tag sticker** stuck beside it with a marker number.
5. **Motion:** the belt texture slides and the objects travel in under the scanner beam. Each one "beeps" (beam flash) as it is named.
6. **Why:** "five lenses" become five things a cashier handles every minute, and the theory is introduced inside the job.

**Sc 6 · Diagnose first** (photo 35 / type 65)
1. **Keep:** the REPETITIVE → ROTATION assumption, the THEORY BEFORE PROBLEM stamp, the tear into DIAGNOSE FIRST / REDESIGN SECOND.
2. **Too infographic now:** the sticker boxes and the vector strike line.
3. **Assets:** **P10** stamp-and-hand photo (cutout).
4. **Treatment:** the assumption is handwritten in marker on kraft card, like a hasty sticky note. A **photographed hand brings a real rubber stamp** down on it, and the stamp imprint is our "THEORY BEFORE PROBLEM" in red ink texture.
5. **Motion:** the hand enters, there is an impact frame (one-frame shake), the hand lifts, and the ink stays. Then the card **tears** (kept) to reveal the two lines.
6. **Why:** the speaker rejects a lazy assumption, so the visual shows a physical act of rejection.

### ACT III · REVEAL

**Sc 7 · Significance 4.09 · Identity 4.04** (photo 50 / data 30 / type 20)
1. **Keep:** beam-revealed 4.09 and 4.04, the 1–5 scale, the four-step transaction strip, the freeze card.
2. **Too infographic now:** the ruler and the white strip with arrows.
3. **Assets:** **P09** hands with cash (left), **P01** hands scanning (right), both duotone plum. **P03** receipt.
4. **Treatment:**
   - Two tilted Ref-A photo frames at depth. 4.09 and 4.04 are set huge across the frames.
   - The 1–5 scale is a **receipt rule** printed along the bottom.
   - The transaction strip becomes a **real receipt with four printed line items** (CUSTOMER ARRIVES / SCAN / PAYMENT / COMPLETE ✓) that **unrolls**, with a marker tick on COMPLETE.
5. **Motion:** the beam crosses the photograph and the number appears behind the light (kept logic, now over photo). The receipt unrolls. The freeze card drops the frames to near black.
6. **Why:** significance and identity are shown as the actual moments that carry them: money handled and a sale completed.

**Sc 8 · The drop to 2.55** (photo 50 / data 35 / type 15)
1. **Keep:** the quiet "somewhere else" line, 3.40 then 2.84 descending, the magenta flood for 2.55, the exact 1–5 dot plot.
2. **Too infographic now:** the final dot plot reads as a dashboard.
3. **Assets:** **P05 cashier cutout** ★. **P11** barcode macro.
4. **Treatment:**
   - 3.40 and 2.84 are set as torn price stickers dropping lower down the frame.
   - **2.55:** the cashier cutout stands centre-frame while **two magenta walls close in from both sides** until the figure barely fits. "2.55" fills the remaining strip. The marker note reads "lowest of all five".
   - **Full diagnosis:** the **P11 barcode enlarges until its bars become the five rows of the chart.** The plot is printed on receipt stock, values are punched-hole dots, and the midpoint is a dashed tear line.
5. **Motion:** the walls squeeze the photograph, which is the user's requested "constrained cashier" move. Then barcode → chart, a medium change on the beat.
6. **Why:** "the lowest score" is felt as physical narrowing of a person, and the honest chart then arrives as evidence.

**Sc 9 · Meaningful. But narrow.** (photo 40 / type 60)
1. **Keep:** the barriers closing and the two-word structure.
2. **Too infographic now:** fine as minimal. It only needs a person.
3. **Assets:** P05 cutout (continuing from Sc 8), P04 lanes behind, blurred.
4. **Treatment:** "MEANINGFUL." spans wide behind the cashier. The hazard-striped barriers (kept) close in and crop both the word and the photo. "BUT NARROW." sits in the slot.
5. **Motion:** a continuation match. The same cutout carries over from Sc 8 with the walls still present.
6. **Why:** this is the thesis line, held on a human and a physical constraint.

### ACT IV · GO DEEPER

**Sc 10 · What cashiers value** (photo 45 / data 35 / type 20) — *an editorial magazine spread*
1. **Keep:** the four values, the struck-out "unlimited freedom / random movement", the dark 2.84 tag, the quiet 3.28.
2. **Too infographic now:** the vector price tags look like a UI kit.
3. **Assets:** **P12** real blank price tags (photographed), P19 tape.
4. **Treatment:**
   - A cream editorial spread. The values are **printed onto the photographed tags**, which hang by real string and are taped down.
   - The struck-out phrases are written on masking tape and crossed out in marker.
   - 2.84 SATISFACTION is a dark tag torn at the edge.
5. **Motion:** tags swing in on their string (a pendulum ease that settles; no idle sway).
6. **Why:** "what would you value?" is answered in price-tag language, the cashier's own visual vocabulary.

**Sc 11 · r ≈ .54 · association** (data 70 / graphic 30)
1. **Keep:** the exact 25-point scatter, the ×2 rings, the fit line, r ≈ .54 and ASSOCIATION ≠ CAUSATION.
2. **Too infographic now:** a dark chart on plum is generic.
3. **Assets:** P19 graph paper, P03 receipt edge.
4. **Treatment:**
   - The plot is **printed on graph paper taped to the dark wall**, Ref-A style, tilted 2°.
   - Points are small round **price stickers** (exact positions).
   - The line is drawn in **red marker** on the paper.
   - "ASSOCIATION ≠ CAUSATION" is a hand-stamped red ink block over the corner.
   - The caveat line is written in marker.
5. **Motion:** stickers are placed one by one (fast stagger), the marker line draws on, and the stamp lands.
6. **Why:** it looks like evidence you are examining rather than a confident graphic. The hand-made treatment visually signals "exploratory".
   - **Data rule:** the geometry stays computed from the 25 real points, and nothing is jittered.

**Sc 12 · Managerial signal** (photo 30 / graphic 40 / type 30)
1. **Keep:** the three signals converging into "MANAGERIAL SIGNAL — not proof."
2. **Too infographic now:** three coloured cards.
3. **Assets:** fragments re-used from earlier scenes: the 2.55 cashier crop (Sc 8), a price tag (Sc 10), the graph-paper corner (Sc 11).
4. **Treatment:** the three signals are **torn pieces of the earlier scenes**, tilted polaroid frames that reuse their own imagery, pinned to a wall with tape and connected by **red string** (an investigation wall). The ticket stays as a real paper ticket.
5. **Motion:** each fragment flies in from its own direction, the string draws between pins, and they compress into the ticket.
6. **Why:** "pointing in the same direction" becomes literal: evidence pinned and linked, the investigation pay-off.

### ACT V · INTERPRET

**Sc 13 · Why it matters (JCM)** (photo 50 / graphic 35 / type 15)
1. **Keep:** characteristics → three states → outcomes, the score overlay and the closing sentence.
2. **Too infographic now:** this is the most diagram-like scene; it has pills and ribbons.
3. **Assets:** the **P08 object cutouts** return (continuity from Sc 5), plus P03 receipt strips.
4. **Treatment:**
   - The objects hang in a row.
   - The connections are **real receipt strips** that curl down and **glue together**: three strips merge into a paper band printed EXPERIENCED MEANINGFULNESS.
   - Keys and scanner each feed their own band.
   - The outcomes are a **wide receipt** at the bottom.
   - The score overlay uses **price stickers** on the objects in their tier colours.
   - The closing sentence is a full-bleed type poster over a blurred P01.
5. **Motion:** paper strips unroll and merge (no vector ribbons).
6. **Why:** it shows the theory as a mechanism made from the job's own materials.

### ACT VI · REDESIGN

**Sc 14 · Enriched Checkout Cashier** (photo 55 / graphic 25 / type 20)
1. **Keep:** the four components, their JCM targets, "keeps what works", the PROPOSED tape.
2. **Too infographic now:** four UI cards around a vector counter.
3. **Assets:** **P05 cashier cutout** (centre), P13 aisle.
4. **Treatment:** the composition **physically opens**. The narrow walls from Sc 8–9 slide away and the cashier stands centre on a wider floor (P13 behind, softened). The four components are **taped paper notes** around the figure, each with a coloured spray stroke and a marker arrow to the person.
5. **Motion:** walls retract (the user's requested "opens"), then the notes slap on one by one.
6. **Why:** the redesign is about the same person given more room, so the audience sees it.

**Sc 15 · 01 Micro-rotation** (photo 60 / graphic 40)
1. **Keep:** "Still primarily a cashier", the five activities, "NOT RANDOM MOVEMENT", the training/staffing note.
2. **Too infographic now:** pill nodes with tether lines.
3. **Assets:** P05 cutout (anchor), **P13 aisle**, small P06 queue crop.
4. **Treatment:** a **hand-drawn map over the aisle photo**. Marker loops go out and come back to the counter, each loop ending at a small taped photo-crop and a handwritten label. A crossed-out wandering scribble across the whole store gets the red stamp.
5. **Motion:** loops draw out and return. The wandering scribble draws, then is stamped.
6. **Why:** "tethered" variety versus wandering is clearest as a path on a real floor.

**Sc 16 · 02 Controlled authority** (photo 45 / graphic 40 / type 15) — *keeps the clearest logic*
1. **Keep:** OLD vs PROPOSED flow, the queue growing and shrinking, the six supervisor-retained items, CONTROLLED ≠ UNRESTRICTED, the decision-moving sentence. No thresholds.
2. **Too infographic now:** boxes and arrows.
3. **Assets:** **P06 queue** (side view), **P15 supervisor** cutout, **P10 stamp**.
4. **Treatment:**
   - **OLD:** a big **APPROVAL stamp physically lands between the customer and the cashier**, blocking the frame. The queue photo extends sideways as the wait grows.
   - **PROPOSED:** the stamp slides from the supervisor's hand to the cashier's side of the counter, and the queue photo crops shorter.
   - The **six retained items** stay as **taped index cards** pinned under the supervisor cutout.
   - The footnote stays on screen.
5. **Motion:** the stamp is the actor: it blocks, slides, and becomes the "DECIDE" moment.
6. **Why:** the user's requested image. Authority is shown as an object that moves closer to the problem.

**Sc 17 · 03 Enlargement vs enrichment** (photo 40 / graphic 40 / type 20)
1. **Keep:** the two-column contrast, the five ownership areas, "WE AIM FOR ENRICHMENT."
2. **Too infographic now:** grey boxes versus purple bars.
3. **Assets:** P07 belt crops, P03 receipt.
4. **Treatment:**
   - **Enlargement:** more and more groceries pile **flat** on the belt photo, the same level, getting heavier.
   - **Enrichment:** a receipt-paper **staircase** rises, each step printed with an ownership area, with the cashier cutout (small) stepping up.
   - Banner as yellow tape.
5. **Motion:** the pile grows sideways, then the staircase builds upward.
6. **Why:** more tasks versus more responsibility is shown as horizontal versus vertical.

**Sc 18 · 04 Structured feedback** (photo 50 / type 35 / graphic 15)
1. **Keep:** operational versus developmental, the key sentence, the five topics.
2. **Too infographic now:** the vector receipt and the step chart.
3. **Assets:** **P14** conversation (over the shoulder), P03 receipt.
4. **Treatment:**
   - **Operational** is a real receipt photo with "BALANCED ✓" marked.
   - **Developmental** is the P14 conversation photo with marker annotations ("growing?", an arrow up).
   - The sentence is a full-bleed poster split across the two images.
   - The five topics are **index tabs** on a real notebook edge.
5. **Motion:** the receipt slides out and the conversation photo slides in (a medium swap). The tabs pop up.
6. **Why:** the difference between a transaction check and a person-to-person conversation is shown with the two real artefacts.

### ACT VII · TEST

**Sc 19 · A hypothesis. Test it.** (type 100)
1. **Keep:** **everything**. The colour drains, then plain grey and black type. It is the deliberate counterpoint.
2. **Too infographic now:** nothing.
3. **Assets:** none. Optionally the drain starts from a full-colour photo collage (the last frame of Sc 18) rather than colour bars.
4. **Treatment:** a stark grey stop.
5. **Motion:** the photo collage desaturates and flattens to grey (about 1.4 s), then hard cuts only.
6. **Why:** after 18 scenes of rich imagery, removing all imagery is the loudest possible signal of academic caution.

**Sc 20 · Proposed pilot** (photo 30 / graphic 50 / type 20)
1. **Keep:** 6 weeks / 1 branch / ~10–12, the W0–W6 timeline, the PROPOSED · NOT YET CONDUCTED stamp.
2. **Too infographic now:** the boxed timeline.
3. **Assets:** P03 receipt as a **long horizontal roll across a tabletop** (P19 kraft), P17 empty lane (small, faded).
4. **Treatment:** the timeline is **printed on the unrolled receipt**. Week blocks are coloured tape strips, and the midpoint is a marker circle. The stamp is real ink texture.
5. **Motion:** the receipt unrolls left to right, then the tape strips are laid on.
6. **Why:** a plan that has not happened yet looks like a working document on a desk.

**Sc 21 · Both must survive** (photo 40 / graphic 45 / type 15)
1. **Keep:** the two lists, balance, hypothetical imbalance → NOT A SUCCESS, SCALE / MODIFY / STOP.
2. **Too infographic now:** a vector seesaw and cards.
3. **Assets:** P05 cutout (left pan), **P09 cash drawer** (right pan).
4. **Treatment:** a **real-looking balance** (photo-collage scale) with the cashier photo on one pan and the cash drawer on the other. The lists are written on paper slips taped to each pan. The HYPOTHETICAL label is handwritten. Decisions are three ink stamps.
5. **Motion:** the beam tips and settles (kept logic) with photographic weight.
6. **Why:** employee experience versus operational safety is a person versus the till, and both must stay level.

### ACT VIII · CONCLUDE

**Sc 22 · Routine ≠ meaningless** (photo 40 / type 60) — *graphic poster*
1. **Keep:** the headline, already-there versus missing, the environment line.
2. **Too infographic now:** checklists.
3. **Assets:** **P01** hands scanning, full colour, full bleed.
4. **Treatment:** a poster. "ROUTINE ≠ MEANINGLESS" is huge over the photo. Checks are **marker ticks** on a receipt strip (already there). The missing items are **empty price-tag outlines**.
5. **Motion:** the photo pushes in slightly, then the ticks and empty tags draw on.
6. **Why:** the same image that opened the deck is now read differently: routine hands, meaningful work.

**Sc 23 · Finale** (photo 60 / type 40)
1. **Keep:** narrow → opening, performs → owns, NOT A DIFFERENT JOB. / A BETTER-DESIGNED ONE., then Thank you.
2. **Too infographic now:** the vector counter and the four lines.
3. **Assets:** **P05 cashier cutout**, **P17 empty lane at night** → **P04 lanes lit**.
4. **Treatment:**
   - The cashier stands in a narrow slot (from Sc 9).
   - The walls open onto a **wide, warmly lit store** with the four component colours as spray strokes reaching outward.
   - The final line is set over a quiet cream frame with the **last real receipt** printing "Thank you" and the names.
   - Image credits sit in small mono at the bottom.
5. **Motion:** the slot opens (the Ref-B pop-up world), then the image collapses to cream (the Ref-B ending).
6. **Why:** the thesis made physical: the same job with more room around the person.

---

## 5. Technical approach (no engine changes)

- **Assets** are prepared once into `src/assets/photo/`:
  - WebP, 1920 px for full-bleed and around 1000 px for cutouts.
  - Alpha WebP for cutouts.
  - Pre-graded (sharp/ImageMagick script, committed, reproducible).
  - Target **total under 15 MB**. Everything is still bundled into the **single offline HTML**, and images are decoded before the first scene (no pop-in).
- **Masks:** CSS `clip-path` and SVG `mask` for torn edges. Duotones are pre-baked into the files rather than live filters, which keeps projector laptops smooth.
- **Motion** stays transform/opacity/clip only. The same click-states and step cues remain, so presenter notes and navigation don't change. The `?static` submission frames stay deterministic.
- **One new font:** a marker/handwritten face (OFL), bundled.
- **Integrity:**
  - Imagery is labelled **illustrative**.
  - No Imtiaz logos or signage.
  - No photographed person is presented as a respondent.
  - All numbers remain from `research.ts`, and `npm run verify` is unchanged.

---

## 6. Questions before implementation

1. **Delivering the photos:** attach them in chat or push to `assets/raw/` in the repo. Name them by shot ID if you can (e.g. `P05_cashier.jpg`).
2. **Rights and people:** are they stock/licensed, AI-generated, or your own shots? If any show **real Imtiaz staff or stores**, I need to know. Identifiable people need consent, and store branding must be kept out.
3. **Cutouts:** may I remove backgrounds locally (an offline tool, if it installs here)? Or would you rather supply PNG cutouts? Using Adobe's background-removal service would mean uploading your photos to Adobe, and I won't do that without your OK.
4. **Short video loops (P20):** allowed? They add realism but about 1–3 MB each.
5. **Handwritten/marker annotation font:** OK?
