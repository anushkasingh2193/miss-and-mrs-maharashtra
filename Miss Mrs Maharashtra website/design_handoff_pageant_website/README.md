# Handoff: Miss & Mrs. Maharashtra Website

## Overview
A nine-page marketing/recruitment site for the Miss & Mrs. Maharashtra pageant (Kara Zoya Pvt Ltd, Nagpur). Goals: attract sponsors, drive audition registrations, sell finale tickets. Home, About, Categories, Register (multi-step form), Mentors/Jury, Winners gallery, Sponsors, Press, Contact/FAQ — all as one client-rendered single-page app with hash-free state-based routing.

## About the Design Files
The bundled file (`Miss & Mrs Maharashtra - Blush & Rose.dc.html`) is a **design reference built in a proprietary component format** (template + a small React-like logic class, compiled by a runtime script not included here). It is **not production code** — do not try to run or copy it as-is into a real app. Treat it as a fully-specified interactive prototype: recreate the same DOM structure, styling, copy, state machine and motion in the target codebase's actual stack (React/Next, Vue, etc.), using that codebase's existing component library and conventions. If no framework exists yet, React is the natural fit given the component-per-page structure already implied by the sections below.

`crown.js` is a real, standalone ES module (three.js custom element `<crown-stage>`) — this one CAN be lifted close to as-is, it just needs the same three.js import (`https://unpkg.com/three@0.184.0/build/three.module.js`) available.

## Fidelity
**High-fidelity.** Colors, type, spacing and copy are final for this palette variant ("Blush & Rose"). Recreate pixel-close using the codebase's own component/styling system (Tailwind, CSS Modules, styled-components — whatever it already uses); don't copy inline styles verbatim if the codebase has a token system, translate them to it using the values below.

Other palette variants exist in the project (Burgundy & Rose Gold, Midnight Navy & Silver, Emerald & Antique Gold, plus the original near-black + champagne) — not included in this bundle. Ask if you need them.

## Global layout & chrome

**Header**: sticky (not fixed) at `top: 0`, height ~74px (can wrap to more on narrow screens — do not hardcode content offset to 74px, header is `position: sticky` and content flows normally beneath it, no manual padding-top hack). Backdrop-blur 14px, background `rgba(255,251,250,.82)` (adjust per palette), bottom hairline border. Contains: wordmark (2-line, "MISS & MRS." / "MAHARASHTRA" letter-spaced), nav (Home/About/Categories/Mentors/Winners/Contact — Sponsors & Press live in footer only), and a filled "Register" pill button pinned right, non-shrinking.

**Footer**: 4-column grid (wordmark+blurb / Pageant links / Media links / Office+contact), bottom bar with copyright, filing numbers, Instagram/Facebook links.

**Sticky apply bar**: fixed bottom bar, appears after scrollY > 420px (home page only, hidden on Register), shows live day-countdown text + "Apply now" button.

**Page-transition curtain**: on nav click, a full-screen color panel wipes in (translateX -100%→0, ~420ms), page content swaps underneath, panel wipes out (0→100%, ~460ms). Center monogram "M&M". Prevents double-nav via a lock flag during the transition.

## Screens

### 1. Home
Cinematic, scroll-driven — NOT a static stack of sections. Structure:

1. **Shot 1 — Hero** (pinned ~2.3 viewports): full-bleed photo background, scroll-progress drives `scale(1→1.16)` + translateY on the image, headline/subhead/CTA copy drifts up and fades out (opacity driven by same 0–1 progress, `pointer-events: none` once faded). A procedural 3D crown (three.js, see `crown.js`) sits top-right, idly rotating with a moving key-light highlight; its rotation/tilt/camera-push are also driven by the same scroll progress. Headline: "Ready to represent the spirit of Maharashtra." Eyebrow: "Season 3 · Nagpur · November 2026". Marathi kicker below eyebrow: "महाराष्ट्राचा अभिमान" (font: Tiro Devanagari Marathi). CTAs: "Register for auditions" (filled), "Finale tickets" (outline, scrolls to #tickets).
2. **Stats strip**: 4-col grid (120+ Contestants / 1,000 Gala audience / 18 Designers / 40+ Guests & jury), numbers count up from 0 on scroll-into-view (cubic ease, ~1.1s), staggered 90ms per card.
3. **About teaser**: photo + copy 2-col, "2 Seasons crowned" badge overlapping photo corner.
4. **Shot 4 — Two crowns** (pinned ~1.65 viewports): a horizontal camera-pan between two full-viewport panels (Miss / Mrs.), driven via `translate3d` on a 200%-wide flex track (NOT by animating panel widths — that causes jank/repaint on full-bleed images). Each panel: bg photo, gradient scrim, eyebrow/title/blurb bottom-left, whole panel clickable → Categories page.
5. **Why participate**: 4-col grid, each card = photo (clip-path reveal on scroll-entry: `inset(42% 0 42% 0)` → `inset(0 0 0 0)`, 1.2s) + number + caption + title + body.
6. **Countdown**: parallax photo bg, 4-unit live countdown (days/hours/mins/secs to 30 Sep 2026 23:59:59 IST) + "Apply now".
7. **Season 2 partners teaser**, **How it works** (5-step process list), **Where to audition** (3 city cards: Nagpur 3 Oct / Pune 10 Oct / Mumbai 17 Oct), **Titleholder spotlight** (Shot 6, pinned ~2.6 viewports: portrait scales 1.12→1, three text "beats" fade/rise in at scroll thresholds 0.06/0.3/0.56 of section progress).
8. **Season showreel** (pinned ~1.7 viewports): full-bleed muted `<video>`, `currentTime` mapped directly to scroll progress (`video.duration * progress`), gradient scrim, live % label, right-edge scrub rail that fills top-to-bottom with progress. NOTE: current asset is only ~8s — copy says "Scroll the reel", not a multi-chapter narration; if given a longer video, restore per-chapter labels.
9. **Winners crowned** (3-card teaser), **Jury quotes** (3 testimonial cards + jury name list), **Tickets** (3-tier list + seats-remaining bar that draws left-to-right on entry), **Sponsors teaser** grid.

Motion notes: staggered reveals (90ms/card) on every card grid; images do a "settle" scale-down from 1.07→1 on entry where not using clip-path.

### 2. About
Hero band (photo + gradient + eyebrow "About" + Marathi kicker "आमची ओळख" + H1). Mission copy (2-col: eyebrow rail + 2 paragraphs). **Founders section** (new, important): 2-up cards for Zoya Siraj Sheikh (Founder & Chairman — Mrs. Maharashtra 2022, Mrs. Universe 3rd Runner-up of 106) and Siraj Sheikh (Chairman — BTP Group), each with photo, Marathi subhead, bio, 2-stat mini-grid. Timeline (5 rows: 2022 founder crowned → 2023 idea → 2024 S1 → 2025 S2 → 2025 international pathway → 2026 S3). "The archive" photo mosaic (asymmetric 3-col grid, roman numerals I–IV captions). 4-value grid (Empowerment / Personal growth / Global impact / Social impact).

### 3. Categories
Hero. Then per-category (Miss, Mrs.) full alternating 2-col sections: title, eyebrow, long copy, 4-fact mini-grid, "Apply for X" CTA, full-bleed photo. **Real eligibility** (corrected from earlier draft): Miss = open to all single & unmarried women/girls of Maharashtra; Mrs. = open to married, divorced, widowed women & single mothers. No age bands — removed after content correction. Onward pathways: Miss → Miss Supraglobal, Miss Summit International; Mrs. → Mrs. India Supranational, Women of the Universe. Scoring table (5 rows: Personal interview 30% / Advocacy 25% / Talent 20% / Runway 15% / Live question 10%).

### 4. Register
Hero + 3 fee/cost chips (₹2,500 fee, payable only if shortlisted, free to start). 3-step tab strip (Basics / Profile / Photos & fee) — click any step to jump. Two-column: form card (left, wider) + sidebar (right: "Before you start" documents list, Eligibility list, "What you receive" list).

**This is a real, functional multi-step form** — not just a mockup:
- State lives in one `f` object: name, dob, email, phone, city, height, occupation, statement, talent, c0/c1/c2 (3 consent booleans).
- Draft auto-saves to localStorage (key `mmm-application-draft`) on every step-advance and restores on mount.
- Per-step validation, inline error text under each field:
  - Step 1: name ≥3 chars; dob matches `DD / MM / YYYY`; email regex; phone ≥10 digits.
  - Step 2: occupation ≥2 chars; statement ≥15 words (live word counter "X / 150 words"); talent chip selected.
  - Step 3: all 3 consent checkboxes must be checked.
- Category picker (Miss/Mrs. selectable cards) at top of step 1.
- Talent chips (Classical dance / Vocals / Instrument / Spoken word / Theatre / Sport / Other) — single-select.
- Consent rows are custom checkboxes (bordered box, ✓ mark, filled when checked) with the 3 policy strings (accuracy, code-of-conduct + media use, fee non-refundable).
- On step-3 submit with no errors: shows a confirmation screen ("Thank you, {name}.") with applied category + audition city, and an "Edit my application" link back into the form.
- Documents list: govt ID, domicile proof, marriage certificate (Mrs. only), 2 photos (headshot no-makeup + full-length, JPEG ≥2000px), bank details.
- Policies grid (5 cards): fees/refunds, withdrawal, code of conduct, safeguarding (named chaperone, guardian access for under-21, confidential contact), image rights.

### 5. Mentors
Hero. 6-card mentor grid (name, role, bio, photo) — real people: Zoya Siraj Sheikh, Siraj Sheikh, Kavita Kharayat (grooming/ramp), Megha Kapoor Amesar (makeover), Sonali Nakshine (voice), Mohini Sharma (Season 1 mentor). 8-card guest jury grid with photos (Shreyas Talpade, Sonal Naik, Neha Dhupia, Terence Lewis, Sandhya Shetty, Mr. & Mrs. Kothari, Anjali Rathee, Shweta Pote).

### 6. Winners
Hero. **Pinned horizontal shelf** ("Shot" mechanic, ~320vh pin): 6 titleholder cards scroll sideways as the page scrolls down (translateX driven by pin progress), each with clip-path photo reveal, 3D cursor-tilt (perspective rotateX/Y toward pointer, translateZ lift + shadow on hover), plate number, title/name/quote. Click → lightbox. Below: masonry gallery grid (9-11 photos, 3 columns, click → lightbox with prev/next/close).

### 7. Sponsors
Hero. 4-stat reach grid. 3-tier pricing cards (Associate ₹1.5L / Powered By ₹6L — middle tier highlighted border / Title Partner on request) each with perks list + "Enquire" CTA → Contact. **Partner proof** block: real quote from Megha Kapoor Amesar with photo. Sponsor logo grid (currently placeholder tiles — 2 real names, rest say "Partner slot open").

### 8. Press
Hero. 4-video embed grid (YouTube iframes). News list (5 rows, outlet/headline/date — currently placeholder "Outlet TBC... add clipping", needs real press). **Press kit** section (4 download cards: logo pack, fact sheet, photo selection, founder bios — these are UI only, no real files wired). Media accreditation CTA block.

### 9. Contact
Hero. Contact info rows (office address, email, phone, hours) + embedded Google Map (grayscale/inverted filter to match palette). FAQ accordion (7 items, plus/minus toggle, one open at a time).

## Global lightbox
Fixed full-screen overlay, click-to-close, background-image (not `<img>`, to avoid prefetching before an image is chosen), prev/next arrows cycling through the full gallery array (11 images including 2 jury portraits reused).

## Interactions & Behavior — motion system detail

- **Smooth scroll**: wheel events are intercepted (unless the pointer is over a scrollable descendant — walks up the DOM checking `overflow-y` and remaining scroll room, and always yields for `<textarea>`/`<select>`) and eased toward a target via `requestAnimationFrame`, time-normalized lerp (`1 - 0.86^(dt/16.67)`), releases when within 1px or when the achieved scroll position stops changing, and immediately yields if anything else (keyboard, anchor, scrollbar) moved the page. A `smoothScroll` prop/flag should exist to disable this.
- **Scroll-reveal**: `IntersectionObserver` (threshold 0.02, rootMargin `0px 0px -4% 0px`) triggers a `rise` keyframe (opacity 0→1, translateY 26px→0, 0.9s cubic-bezier(.2,.8,.2,1)) once per element (idempotent, flagged so it can't re-fire). A synchronous "sweep" on every scroll/poll tick force-enters anything whose top has passed the viewport bottom, so nothing can be stranded if the observer is missed (fast flings, anchor jumps). Elements already visible at mount enter immediately without the fade animation (`noAnim` flag) so nothing on first paint is invisible.
- **Staggered children**: containers marked for stagger animate their direct children 90ms apart.
- **Pinned "shots"**: sections use `height: 250vh`-style tall wrappers with an inner `position: sticky; top: <header height>px; height: calc(100vh - header height)` frame. A single `requestAnimationFrame` loop computes each pinned section's 0–1 progress (`-rect.top / (sectionHeight - viewportHeight)`, clamped) every frame and applies transforms/opacity directly (not via React state, to avoid re-render cost). A slow interval (~40ms) acts as a fallback if rAF is throttled.
- **Follow-spot**: a radial-gradient div tracks pointer position (soft-light blend mode) over the dark video section, fades in only while the pointer is within that section's bounds.
- **3D card tilt**: pointer position relative to card center drives `rotateY`/`rotateX` (±5.5°/±4.5°) + `translateZ(14px)`, reset to flat when pointer is far away.
- **Curtain nav transition**: see Global layout above.

## Design Tokens (Blush & Rose palette)

Backgrounds: `#FFFBFA` (page/card), `#FBF0F2` (alt section tint), `#F5E2E6` (image placeholder fill).
Text: `#3B2A31` (headings/body-dark), `#655259` (body), `#8A7078` / `#8C6D77` (muted/eyebrow-adjacent).
Accent: `#B0567A` (primary — deepened from an initial `#C2708C` for AA contrast), hover `#C46E8E`.
Borders/hairlines: `rgba(59,42,49,.1)` to `rgba(59,42,49,.22)` depending on weight.
Header glass: `rgba(255,251,250,.82)` + 14px backdrop-blur.

Typography: **Bodoni Moda** (serif, weights 400/500/600, optical size range) for all headings/display numbers; **Jost** (sans, weights 300/400/500/600) for body/UI; **Tiro Devanagari Marathi** for Marathi kickers. Headline sizes use `clamp()` fluid scaling (e.g. hero H1 `clamp(46px, 6.4vw, 104px)`). Eyebrows: 11px, letter-spacing .34em, uppercase, accent color.

Spacing: section vertical padding 90–130px desktop, horizontal padding `clamp(20px, 4vw, 42px)`. Grids use `repeat(auto-fit, minmax(Npx, 1fr))` throughout for responsiveness rather than fixed column counts — this was a deliberate fix for overflow on narrow viewports; preserve the pattern.

Radius/shadows: this design uses **no border-radius** and **no drop shadows** except the 3D tilt hover shadow (`0 26px 60px rgba(59,42,49,.18)`) and the ticket/badge overlap shadow — it's a flat, editorial, hairline-bordered aesthetic (1px borders, not shadows, separate cards).

## Assets
- Photos: pulled live from `https://missandmrsmaharashtra.org/public/...` (gallery/, images/, mentor/, testimonial/ subfolders) — production build should download and self-host these, not hotlink.
- Video: `https://missandmrsmaharashtra.org/public/video.mp4` (~8s clip, muted, used both inline in Home step-showcase card and full-bleed in the scrubbed reel section).
- Fonts: Google Fonts (Bodoni Moda, Jost, Tiro Devanagari Marathi).
- Google Maps embed iframe (Contact page) — grayscale/invert CSS filter applied to match palette.
- YouTube embeds (Press page) — 4 placeholder video IDs, need confirming as real.
- `crown.js`: standalone three.js module, procedurally builds a crown (no external model file) — portable as-is, needs `three@0.184.0` module import available in the target app.

## Known placeholders / needs real content before launch
- Press headlines/outlets ("Outlet TBC · add clipping").
- 4 of 6 sponsor logo slots ("Partner slot open").
- Press kit download cards have no real files wired.
- Safeguarding contact email was invented (`safeguarding@missandmrsmaharashtra.org`) — confirm.
- Spotlight stat numbers (14 appearances / 9 schools / 1 national entry) are illustrative — confirm with the real titleholder.
- Sticky-shelf and pinned-shot scroll lengths (vh multipliers) were tuned by feel; re-check on real devices/content lengths before launch.

## Files
- `Miss & Mrs Maharashtra - Blush & Rose.dc.html` — full site (all 9 pages + shared header/footer/lightbox), template markup + logic class in one file.
- `crown.js` — the 3D crown custom element (`<crown-stage>`), loaded as an ES module.
