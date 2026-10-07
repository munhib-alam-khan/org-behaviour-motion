# CHECKOUT — A Cinematic Presentation Engine
### Job Redesign Using the Job Characteristics Model · Checkout cashiers at Imtiaz, Karachi
KSBL · Organizational Behaviour · Fall 2026 · Instructor: Dr. Faryal Razzaq
Team: Munhib Alam Khan · Abdullah Khan · Rabie Sami · Karan Kumar

**Status: APPROVED and implemented.** See the decisions log at the end.

---

## 0. What I inspected

| Source | What I took from it |
|---|---|
| Reference video A (38 s, Netflix *Geeked Week* promo) | **Dark-world grammar.** Near-black / deep-purple bases; neon accents used sparingly; frame-within-frame panels with thick coloured borders; sticker/cut-out collage; spray-paint and halftone textures; kinetic type with stacked/echoed outline repeats ("COMING UP NEXT"); fly-through-a-frame tunnel transitions; **pattern-tile wipes** (one icon repeated until it fills the frame, then cut); a flat single-colour end lockup. |
| Reference video B (51 s, iPhone "yellow" spot) | **Bright-world grammar.** Cream/yellow palette; flat illustrated elements interacting with real space; **one object travels through every scene and stitches them together** (the pink ribbon); sudden scale jumps (macro close-up of the product); pop-up-book collage; ends quiet, mostly empty cream with one small mark. |
| Final report (.docx) | Narrative, theory, method, ethics, the four interventions, pilot scorecard, limitations. Used to check every claim below. |
| Raw survey workbook (.xlsx) | 25 rows × 33 columns. I recomputed every construct from the item columns using the workbook's own codebook. |
| Baseline JD (.docx) | Current responsibilities, escalation rules, "repetitive" working conditions — the "before" state for the redesign. |

Nothing about fashion, phones, people, brands or shows from the references will appear. Only their pacing, composition and transition logic.

### Data verification (from the raw workbook)
Every locked number reproduces exactly:

| Construct | Locked | Recomputed (M, SD) |
|---|---|---|
| Task Significance | 4.09 | 4.093, 0.66 |
| Task Identity | 4.04 | 4.040, 0.87 |
| Feedback | 3.40 | 3.400, 0.84 |
| Autonomy | 2.84 | 2.840, 0.67 |
| Skill Variety | 2.55 | 2.547, 0.89 |
| Internal Work Motivation | 3.46 | 3.460, 0.87 |
| Job Satisfaction | 2.84 | 2.840, 0.84 |
| RD3 Authority | 4.32 | 4.32 |
| RD2 Ownership | 4.16 | 4.16 |
| RD4 Feedback | 4.04 | 4.04 |
| RD1 Rotation | 3.28 | 3.28 |
| r (SV, JS) | ≈ .54 | .539 (n = 25) |

Branches: Clifton 8, Bahadurabad 5, Gulshan-e-Iqbal 4, Korangi 3, Nazimabad 3, Other Karachi 2 (= 25).
**No discrepancy with any locked number.**

---

## 1. Creative direction

**Concept: "CHECKOUT" — an investigation told through the objects of a checkout counter.**
The audience never sees a stock photo or a logo. They see a receipt, a barcode, a scanner beam, a conveyor belt, price tags and approval stamps, and these objects carry the argument.

**The traveling thread (borrowed from Ref B's ribbon): the RECEIPT.**
It prints in the opening, multiplies into the repetition montage, becomes the transaction strip in the Reveal, unrolls into the pilot timeline, and tears in half for the final line. It gives the audience one continuous physical object to follow from scene to scene.

**Two worlds, one system (borrowed from Ref A vs Ref B):**
- **NIGHT** (plum `#1E0B2B` → near-black `#0B0610`): diagnosis, tension, the drop to 2.55, the credibility turn. Neon accents: magenta `#FF2E88`, electric blue `#2F6BFF`.
- **DAY** (cream `#F6EFE2`, receipt-paper white, yellow `#FFD23F`, orange `#FF7A1A`): what employees want, redesign, conclusion. Ink is near-black.
- **PAUSE** (flat paper grey, no colour, no motion): reserved for "A HYPOTHESIS. / TEST IT." and nothing else, so it lands.

Colour roles are fixed so the same meaning keeps the same colour everywhere: strong dimensions = electric blue, weak dimensions = orange, the lowest (Skill Variety) = magenta, proposals = yellow "PROPOSED" tape, supervisor/control = deep purple.

**Typography (bundled locally, OFL licences):**
- **Archivo** (variable, widths 62–125, weights 100–900) as the display face. Ultra-condensed black for giant numbers and headline words, expanded for labels. One family covers every display role.
- **JetBrains Mono** for receipt text, axis labels and "data voice" captions.
- Minimum on-screen text: 28 px at 1920×1080. Spoken-section keywords: 64 px or more. Hero numbers: 300–900 px.

**Texture:** a pre-rendered grain PNG plus a halftone dot overlay on Night scenes; paper fibre on Day scenes. These are static images composited with blend modes, not live filters, so they cost nothing at runtime.

**Motion rules:** transforms and opacity only. Clip-path masks drive the reveals. Easing is mostly `expo.out` / `power3.inOut`; there are no elastic bounces or idle floating. Normal step transitions run 0.4–0.9 s. Only five "turning-point" transitions are allowed to run 1.2–1.8 s (★ in the map below).

---

## 2. Scene map

Format: **Purpose · Script · Composition · Motion · Click states (s0 = state on arrival) · Out-transition.**
★ marks a long cinematic transition. The ⧉ submission state is the static frame used for the future PPTX export (always the final step unless noted).

Proposed speaker split (please confirm): **A** Opening + Investigate (Sc 0–6) · **B** Reveal + Go Deeper (7–12) · **C** Interpret + Redesign (13–19) · **D** Test + Conclude (20–23).

### ACT I — OBSERVE

**Sc 0 · Standby / Title** (shown while the class settles)
- Composition: Night. A small receipt header, centred: `KSBL · ORGANIZATIONAL BEHAVIOUR · FALL 2026`, the title *Redesigning the Checkout Cashier*, and the four team names printed as receipt line items. A thin magenta scanner line idles slowly. This is the only ambient motion in the whole deck.
- Clicks: s0 title.
- Out: everything fades to black except the scanner line, which carries into Sc 1.
- ⧉ Title slide.

**Sc 1 · The last person you meet**
- Script: "Think about the last time you went grocery shopping… the final person you interacted with was the cashier… money, discounts, billing accuracy, waiting time, final impression."
- Composition: Pure black. The scanner beam sweeps once. A receipt prints downward from the top edge, centred.
- Clicks: s0 black and the beam · s1 "THE LAST PERSON YOU MEET." is masked in by the beam · s2 the receipt prints five line items in rhythm (about 0.3 s each): `MONEY` `DISCOUNTS` `ACCURACY` `WAITING TIME` and a total line, `= FINAL IMPRESSION` in magenta.
- Out: the receipt is torn off the printer (match cut into Sc 2).
- Note: the spoken "30–40 minutes" stays spoken only. It is an illustration, not data, so it does not appear on screen.

**Sc 2 · Again.**
- Script: "Now imagine doing that same transaction… again. And again. For an entire shift."
- Composition: Uses the Ref A pattern-tile wipe. The single receipt duplicates.
- Clicks: s0 one receipt · s1 **AGAIN.** (giant, condensed) and the receipt becomes 4 · s2 **AND AGAIN.** with receipts tiling to 40 and type echoes stacking in outline · s3 **FOR AN ENTIRE SHIFT.** The screen is saturated with about 300 receipts in a grid, then everything stops dead.
- Out ★: all receipts drop out of frame at once, leaving silence and black.

**Sc 3 · The Question**
- Script: "Can a job be important, but still not be designed in a way that brings out the best in the person doing it?"
- Composition: Black, nothing else. Two lines, left-aligned, huge.
- Clicks: s0 empty · s1 "CAN A JOB BE IMPORTANT" · s2 "AND STILL BE POORLY DESIGNED?" in magenta · s3 hard cut to a yellow full-bleed: **WE ASKED THE CASHIERS.**
- Out: the full stop of "CASHIERS." scales up and becomes the first of 25 tokens (match cut).

### ACT II — INVESTIGATE

**Sc 4 · 25**
- Script: "We collected responses from 25 checkout cashiers across multiple Imtiaz branches in Karachi."
- Composition: Day/yellow. 25 small receipt-stub tokens, each with a unique barcode, land in a 5×5 grid on the right. A giant "25" is masked on the left, about 800 px tall.
- Clicks: s0 tokens land one by one (fast stagger, about 1.2 s total) · s1 the "25" is masked in and the label "CHECKOUT CASHIERS · KARACHI" appears · s2 four method stickers slap on: `INTERVIEWER-ADMINISTERED` `VOLUNTARY` `NO NAMES · NO IDs · NO PHONE NUMBERS` `CROSS-SECTIONAL · SMALL SAMPLE` (plus an optional branch strip, see Q3).
- Out: the 25 tokens slide onto a conveyor belt in Sc 5.

**Sc 5 · Five lenses**
- Script: "…five dimensions of the Job Characteristics Model: skill variety, task identity, task significance, autonomy, and feedback."
- Composition: Night. A side-view conveyor belt runs across the lower third. Five illustrated checkout "products" ride in, each a flat SVG object with its label on a price tag:
  - Skill Variety → a mixed basket (many different items)
  - Task Identity → a complete receipt (start to end)
  - Task Significance → a customer bag with a heart-shaped tag
  - Autonomy → a key
  - Feedback → a scanner emitting a beep wave
- Clicks: s0 empty belt · s1 the five products ride in, each stopping under its tag as it is named (one click; the stagger matches speech rhythm).
- Out: the belt stops and the products hold. These exact objects return in Sc 13.
- ⧉ Five dimensions.

**Sc 6 · Diagnose first** ★
- Script: "We did not begin by saying 'cashier jobs are repetitive, therefore job rotation is the solution'… Diagnose first. Redesign second."
- Composition: Day. A tempting equation is printed like a sticker: `REPETITIVE → ROTATION`.
- Clicks: s0 the equation · s1 a red approval stamp slams down: **THEORY BEFORE PROBLEM** with a strike-through · s2 ★ the frame tears horizontally like a receipt. The top half reads **DIAGNOSE FIRST.**, the bottom half (offset, magenta) **REDESIGN SECOND.**
- Out: the top half stays and becomes the background of Sc 7 (Night).

### ACT III — REVEAL

**Sc 7 · Meaning is not the problem**
- Script: "Task Significance was 4.09… Task Identity was 4.04… A customer arrives. Products are scanned. Payment is processed. The transaction is completed."
- Composition: Night. A full 1–5 scale ruler runs across the bottom with ticks 1·2·3·4·5. Numbers appear above as giant type.
- Clicks: s0 label "TASK SIGNIFICANCE" and the empty ruler · s1 the scanner beam sweeps and **4.09** is revealed by the beam; a blue marker drops onto the ruler · s2 "TASK IDENTITY", **4.04**, second marker · s3 the receipt strip unrolls across the frame: `CUSTOMER ARRIVES → SCAN → PAYMENT → COMPLETE ✓` (each segment ticks in sequence, about 1.5 s) · s4 freeze: **MEANING ISN'T THE PROBLEM.** Hold. Nothing moves.
- Out: a hard cut to Sc 8 on the presenter's click only.

**Sc 8 · The drop**
- Script: "The problem appears somewhere else. Feedback falls to 3.40. Autonomy falls to 2.84… Skill Variety: 2.55 out of 5."
- Composition: Night, with the same ruler for continuity. Each new number enters lower on the screen than the last: the layout literally descends.
- Clicks: s0 "THE PROBLEM IS SOMEWHERE ELSE." (small, quiet) · s1 FEEDBACK **3.40** (orange) · s2 AUTONOMY **2.84** (orange) · s3 ★ SKILL VARIETY **2.55**. The screen flips to magenta, "2.55" fills about 90% of the frame height, the earlier numbers shrink away, and a single scanner beep plays if sound is on · s4 the **full comparison**: a horizontal dot plot of all five dimensions on a full 1–5 scale with a midpoint (3) reference line, sorted high to low and colour-coded blue/orange/magenta, with exact values labelled. No truncated axis and no bars implying a zero baseline on a 1–5 scale.
- ⧉ The s4 dot plot (s3 is an optional extra PPT slide).

**Sc 9 · MEANINGFUL. BUT NARROW.**
- Script: "The job is meaningful. But it is narrow."
- Composition: Minimal. Cream background.
- Clicks: s0 **MEANINGFUL.** spans the full width · s1 the frame physically narrows (side panels close in like checkout-lane barriers) and **BUT NARROW.** sits in the tight column left behind.
- Out: the barriers slide open into Sc 10.

### ACT IV — GO DEEPER

**Sc 10 · What employees value**
- Script: "The strongest response was not unlimited freedom… authority 4.32… ownership 4.16… feedback 4.04… satisfaction only 2.84."
- Composition: Day, playful editorial collage in the style of Ref B. Each result is a giant **price tag**, slightly rotated and pinned.
- Clicks: s0 two struck-through tags: ~~UNLIMITED FREEDOM~~ ~~RANDOM MOVEMENT~~ · s1 tag **4.32 AUTHORITY** ("to resolve routine issues, within clear guidelines") · s2 **4.16 OWNERSHIP** · s3 **4.04 FEEDBACK** · s4 a contrasting dark tag **2.84 JOB SATISFACTION** drops in, and a small quiet tag `ROTATION 3.28` appears (see Q4).
- ⧉ All tags.

**Sc 11 · Association ≠ causation**
- Script: "Skill variety had the clearest positive association with job satisfaction… r = .54… association, not causation."
- Composition: Night. A real scatterplot of all 25 respondents: x = Skill Variety score, y = Job Satisfaction score, both on full 1–5 axes, computed from the workbook. Three coordinate pairs are shared by two respondents. These are drawn as a double ring with "×2", never jittered, so no point is moved.
- Clicks: s0 axes · s1 the 25 points drop in like scanned items (fast stagger) · s2 a least-squares line draws itself and **r ≈ .54** is labelled with `n = 25 · exploratory · cross-sectional` · s3 a split-flap stack slams in: **ASSOCIATION / ≠ / CAUSATION**.
- ⧉ The scatter plus caption.

**Sc 12 · The managerial signal**
- Script: "When the lowest JCM score, employee preferences, and the strongest observed association begin pointing in a similar direction…"
- Composition: Three cards enter from three edges.
- Clicks: s1 **LOWEST JCM SCORE**: Skill Variety 2.55 · s2 **WHAT EMPLOYEES VALUE**: Authority 4.32 / Ownership 4.16 · s3 **STRONGEST OBSERVED ASSOCIATION**: SV ↔ JS, r ≈ .54 · s4 ★ the cards converge and compress into one yellow ticket: **MANAGERIAL SIGNAL — not proof.**
- Out: the ticket flips over and its back is the Sc 13 background.

### ACT V — INTERPRET

**Sc 13 · Why it matters (JCM)**
- Script: theory link from characteristics → psychological states → outcomes; "Change specific characteristics of the job so that the psychological experience of doing that job changes."
- Composition: Night. The five products from Sc 5 return on the conveyor (continuity). Paths are drawn as glowing receipt-paper ribbons, not textbook boxes.
- Clicks: s0 five objects in a row · s1 Skill Variety, Task Identity and Task Significance slide together and fuse into **EXPERIENCED MEANINGFULNESS** · s2 the key (Autonomy) morphs into **EXPERIENCED RESPONSIBILITY** · s3 the scanner wave (Feedback) morphs into **KNOWLEDGE OF RESULTS** · s4 the three states align and feed **INTERNAL WORK MOTIVATION · JOB SATISFACTION** · s5 our data is overlaid: paths fed by the weak characteristics (SV, Autonomy, Feedback) turn orange/magenta · s6 everything clears to one kinetic sentence: **CHANGE THE JOB → CHANGE THE EXPERIENCE OF THE JOB.**
- ⧉ The s5 diagram (s6 becomes its own PPT slide).

### ACT VI — REDESIGN

**Sc 14 · The Enriched Checkout Cashier (proposed)**
- Composition: Day. A top-down illustrated checkout counter sits at the centre, wrapped in yellow `PROPOSED` tape (this persists through Sc 15–18 as a corner tag).
- Clicks: s0 the counter and the title **ENRICHED CHECKOUT CASHIER** · s1 four modules dock around the counter like lanes, each tagged with its JCM target: 01 Structured Micro-Rotation → Skill Variety · 02 Controlled Decision Authority → Autonomy · 03 Checkout-Zone Ownership → Responsibility · 04 Structured Feedback → Feedback · s2 a small line: "Keeps what works: task identity & significance preserved."
- ⧉ The four-module overview (this doubles as the redesign index).

**Sc 15 · 01 Structured micro-rotation**
- Composition: The counter stays the fixed anchor at the centre. Five checkout-adjacent nodes orbit close around it, never far away.
- Clicks: s0 **STILL PRIMARILY A CASHIER** · s1 the nodes light up one by one: queue coordination · basic price-verification coordination · checkout-area readiness checks · onboarding / shadow support · customer checkout guidance · s2 a chaotic scribble path wandering "around the store" draws in, then gets a red **NOT RANDOM MOVEMENT** stamp. Footnote: "subject to training & staffing".

**Sc 16 · 02 Controlled decision authority**
- Composition: A flow diagram drawn as queue lanes. A red "problem" token travels the paths.
- Clicks: s0 the token arrives at the counter · s1 **OLD FLOW**: Customer → Cashier → WAIT (clock, the queue visibly lengthens) → Supervisor → Decision → Cashier → Customer · s2 **PROPOSED LOW-RISK FLOW**: the arrow reroutes and the queue compresses: Customer → Trained Cashier → Resolution ✓ · s3 a separate purple **HIGH-RISK** lane stays: Cashier → Supervisor, listing significant refunds · discretionary discounts · suspected fraud · security issues · major price disputes · unusual exceptions · s4 **CONTROLLED AUTONOMY ≠ UNRESTRICTED AUTONOMY** · s5 visual moment: the supervisor's approval stamp physically slides along the line toward the counter, then the sentence "Move appropriate decisions closer to where the customer problem actually occurs."
- Footnote on every state: "Proposed design principle. Permissions & thresholds would be defined by management." No amounts are shown anywhere.

**Sc 17 · 03 Checkout-zone ownership: enlargement vs enrichment**
- Composition: Split screen.
- Clicks: s0 left **ENLARGEMENT = MORE TASKS**: boxes pile up horizontally on the same flat belt, getting heavier · s1 right **ENRICHMENT = MORE RESPONSIBILITY**: the zone around the counter gains depth and height, with ownership areas labelled: queue buildup · recurring POS / pricing issues · checkout-area readiness · customer concerns · handover communication · s2 the left side greys out and the right side takes the frame: **WE AIM FOR ENRICHMENT.**

**Sc 18 · 04 Structured feedback**
- Clicks: s0 a receipt prints `TRANSACTION ✓ BALANCED`, labelled **OPERATIONAL: did it work?** · s1 the receipt curls into a rising step-graph, labelled **DEVELOPMENTAL: am I growing?** · s2 the line "Operational feedback tells you whether the transaction worked. Developmental feedback tells you whether you are growing." as giant two-line type · s3 five conversation tabs: Accuracy · Customer Service · Reliability · Improvement · Recognition, with the caption "short · regular · supervisor-led".
- ⧉ The s3 state (s2 sentence becomes an extra PPT slide).

### ACT VII — TEST

**Sc 19 · The credibility turn** ★
- Script: "Everything we have proposed so far is a hypothesis… The next step is to test it."
- Composition: **All colour, texture and motion stop.** Flat paper grey, black type, no grain. The change itself is the message.
- Clicks: s0 ★ colour drains out of the previous frame (about 1.5 s desaturate-and-flatten) and "EVERYTHING SO FAR IS…" appears · s1 **A HYPOTHESIS.** · s2 **TEST IT.**

**Sc 20 · Proposed pilot**
- Composition: The grey world slowly re-admits colour. The receipt from Act I unrolls horizontally as a 7-column timeline. A permanent stamp reads: **PROPOSED · NOT YET CONDUCTED**.
- Clicks: s0 the three parameters as receipt header lines: `6 WEEKS` `1 KARACHI BRANCH` `~10–12 CASHIERS` · s1 W0 **BASELINE** (same JCM, motivation & satisfaction survey, plus operational indicators where available) · s2 W1–6 **INTERVENTION** band, with W3 **MIDPOINT CHECK** pinned · s3 W6 **POST-MEASUREMENT**.
- ⧉ The full timeline.

**Sc 21 · Both must survive**
- Composition: Two columns sit as a balance on one fulcrum (the counter).
- Clicks: s0 **EMPLOYEE EXPERIENCE ↑**: Skill Variety · Autonomy · Feedback · Internal Work Motivation · Job Satisfaction · s1 **OPERATIONAL SAFETY: no deterioration**: transaction/error rate · cash discrepancies · routine escalations · checkout complaints · s2 counter-example: satisfaction rises and discrepancies rise, the balance tips, and a red stamp reads **NOT A SUCCESS** · s3 three decision stamps: **SCALE · MODIFY · STOP**.
- ⧉ The s3 state.

### ACT VIII — CONCLUDE

**Sc 22 · Routine ≠ meaningless**
- Clicks: s0 **ROUTINE ≠ MEANINGLESS** · s1 two receipt lines tick with blue check marks: `ALREADY THERE: significance ✓ identity ✓` · s2 three open boxes in orange: `MISSING: variety · discretion · developmental feedback` · s3 "Redesign the environment around the cashier, not the cashier."

**Sc 23 · Finale** ★
- Composition: The narrow lane from Sc 9 returns: a rigid, boxed-in counter on a near-black field.
- Clicks: s0 the narrow lane · s1 the workspace expands outward as the four redesign paths open (the same colours as Sc 14), while the counter stays fixed at the centre · s2 two words cross-fade on one baseline: "a job someone **performs**" → "a job someone **owns**" · s3 **NOT A DIFFERENT JOB.** · s4 **A BETTER-DESIGNED ONE.** · s5 the last receipt prints quietly: `Thank you.` plus the four team names. A tiny references line (Hackman & Oldham, 1976) sits at the bottom.
- ⧉ The s4 frame plus a separate thank-you/references slide.

**Totals:** 24 scenes, about 80 clicks. Most clicks are sub-second reveals that sit on a spoken phrase. Rough time budget: I 0:55 · II 1:00 · III 1:20 · IV 1:15 · V 0:45 · VI 1:30 · VII 0:50 · VIII 0:35, about 8:10. If rehearsal runs long, Sc 15 and Sc 17 can be merged.

---

## 3. Engine & architecture

- **Stack:** Vite + TypeScript, no UI framework (plain DOM and inline SVG components), with **GSAP 3** bundled from npm. It is justified for timeline control, clip-path tweens and instant `progress(1)` state-setting.
- **Deterministic states:** each scene exports `{ id, title, steps, build(), setState(step, {animate}) }`.
  - Forward (→ / Space / click) plays the transition into step n+1.
  - Back (←) **snaps instantly** to step n−1. It never reverse-plays, so going back is always immediate and correct.
  - A scene jump (M navigator, ↑/↓, number+Enter) snaps the target scene to s0, or to its final state with Shift.
  - Mid-animation clicks fast-forward the current tween to its end and then advance, so the presenter never waits.
- **Keys:** → Space click = next · ← = back · ↓/↑ = next/previous scene · **M** = scene navigator (thumbnail grid) · **P** = presenter overlay (scene, step k/n, speaker, next cue) · **B** = black-out · **S** = sound on/off (default **off**) · **F** = fullscreen · Esc = exit fullscreen / close overlay · Home/End.
- **Canvas:** a fixed 1920×1080 stage, uniformly scaled with letterboxing and no scrollbars.
- **Offline:** `vite-plugin-singlefile` builds one self-contained `dist/index.html` (JS, CSS, fonts as base64, SVGs inline). It runs by double-clicking the file in Chrome/Edge with Wi-Fi off. The same build is deployable to GitHub Pages via an Actions workflow.
- **Sound:** the single scanner beep is synthesised with WebAudio, so there is no audio file. It is muted by default.
- **Data:** `src/data/research.ts` holds every locked value. `src/data/respondents.ts` holds only the 25 anonymous (SV, JS) construct-score pairs, with no branch, tenure or free text. A `npm run verify` script asserts the deck's numbers match the locked values.
- **Submission states:** `?static` renders every scene's ⧉ state as a contact sheet. Text is real text and charts are SVG generated from data, so a later PPTX exporter can rebuild each frame.
- **Layout:**
  ```
  src/
    engine/       (stage scaling, navigator, input, overlay, sound)
    scenes/       (one file per scene)
    components/   (Receipt, Barcode, ScannerBeam, PriceTag, Stamp, Conveyor, CheckoutCounter, DotPlot, Scatter, FlowLane, PilotTimeline, …)
    data/
    styles/
    assets/       (fonts, grain, SVG objects)
  ```

## 4. Assets to create
All original. No photos, no Imtiaz logo or branding.
- SVG illustrations: receipt (variable length), barcode generator, scanner beam, conveyor belt, top-down checkout counter, the five dimension products (basket, receipt, bag, key, scanner), price tags, approval stamps, the "problem" token, queue figures (abstract pills, not people), and balance/fulcrum.
- Textures: grain PNG, halftone tile, paper fibre (generated locally).
- Fonts: Archivo variable and JetBrains Mono, via `@fontsource` (OFL) and bundled.

---

## 5. Factual ambiguities / questions for the team

1. **Data-entry timing.** In the raw workbook, 13 of the 25 responses (rows 13–25) were submitted on 6 Oct between 23:20:30 and 23:21:32, roughly 5 seconds apart. Several of their open-text answers repeat verbatim (for example, "More constructive feedback and recognition would help employees stay motivated." appears 4 times). That is hard to reconcile with "recorded in Google Forms during store visits". It may simply be batch transcription from paper interview sheets. The presentation shows respondent-level points (Sc 11), and a professor who opens the sheet will see the timestamps. **How should the method sticker describe data entry?** Something like "interviewer-administered · recorded on paper, entered into Google Forms" if that is what happened. I will not change any numbers either way.
2. "Interviewer-administered / standardized questions read aloud" is in your brief but not stated explicitly in the report, which says the questionnaire was "administered". Is it OK to show it on screen?
3. Should the branch breakdown (Clifton 8 · Bahadurabad 5 · Gulshan 4 · Korangi 3 · Nazimabad 3 · Other 2) appear as a small strip in Sc 4, or should the slide keep only "multiple Karachi branches"?
4. **Rotation 3.28** is not in the spoken script. I propose showing it as a small, quiet tag in Sc 10, since it supports "not random movement" and leaving it out could look selective. OK?
5. The report's multiple-response item: "learn additional skills" and "greater responsibility/ownership" were each selected by 14 of 25. That item is exploratory because the "up to 3" limit was not enforced. Add it to the Sc 12 convergence card, or leave it out?
6. Is the speaker split A/B/C/D above correct, and who is which person? This sets the presenter overlay cues.
7. Sound: should the beep be default **off** with an S toggle (proposed), or default on?
8. Title wording: "Redesigning the Checkout Cashier Role" (the report title) or a shorter cinematic title such as "CHECKOUT"?

---

## 6. Decisions (team answers)

1. Data entry: no timestamps are stored or shown anywhere; the scatter uses anonymous construct scores only.
2. Method shown as "Interviewer-administered · Questions read aloud & explained · Voluntary · No names / IDs / phone numbers".
3. Branches shown as "Multiple Imtiaz branches · Karachi".
4. Rotation 3.28 shown as a small quiet tag in Sc 10.
5. "Learn additional skills" (14 of 25) added to the Sc 12 card, labelled exploratory.
6. No speaker labels; the presenter overlay shows the current and next cue.
7. Sound: one synthesised beep, off by default, toggled with S.
8. Title: "CHECKOUT" wordmark, with the report title underneath.

Implementation notes vs. plan:
- A press during an animation **completes** it (it does not also advance), so a double-press can never skip a reveal such as 2.55.
- Sc 4 (Investigate) has 3 states. The question and "WE ASKED THE CASHIERS." live in Sc 3, and the receipt wall's collapse is Sc 3's intro.
