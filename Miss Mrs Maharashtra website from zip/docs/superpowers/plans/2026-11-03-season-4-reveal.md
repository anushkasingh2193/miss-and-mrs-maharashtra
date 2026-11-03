# Season 4 Reveal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a premium, responsive Season 4 reveal section to the homepage using the supplied reel, confirmed dates, and Nagpur venue.

**Architecture:** Create one self-contained React component for the reveal content, media playback, and accessibility behavior. Integrate it into the existing homepage composition and extend the established navy, ivory, and gold CSS system without changing the existing mobile design language.

**Tech Stack:** React, TypeScript, Vite, CSS, Node test script, FFmpeg

**Spec:** `docs/superpowers/specs/2026-11-03-season-4-reveal-design.md`

## File Map

- Create `src/components/SeasonFourReveal.tsx` — semantic reveal section, CTA, autoplay/offscreen behavior, and reduced-motion fallback.
- Modify `src/pages/Home.tsx` — render the reveal after Junior India and connect the registration CTA.
- Modify `src/index.css` — desktop three-column composition, mobile stack, video treatment, and reduced-motion styling.
- Modify `tools/test-homepage.mjs` — verify content, media behavior, placement, section count, CTA wiring, and responsive CSS hooks.
- Create `public/missmrs-assets/videos/season-4-reveal.mp4` — optimized local copy of the supplied reel.
- Create `public/missmrs-assets/videos/season-4-reveal-poster.jpg` — clear poster frame generated from the reel.

## Task 1: Prepare and verify the reveal media

- [ ] Copy `C:\Users\Anushka Singh\Downloads\Video-9549.mp4` to `public/missmrs-assets/videos/season-4-reveal.mp4` without altering the source file.
- [ ] Generate `public/missmrs-assets/videos/season-4-reveal-poster.jpg` from a clear representative frame using FFmpeg.
- [ ] Add failing assertions in `tools/test-homepage.mjs` that both public assets exist and are non-empty.
- [ ] Run `node tools/test-homepage.mjs` and confirm the new asset assertions fail before implementation.
- [ ] Re-run the test after preparing the assets and confirm the asset assertions pass.
- [ ] Commit the media preparation and tests with a focused commit message.

## Task 2: Build the Season 4 reveal component

- [ ] Extend `tools/test-homepage.mjs` with failing source assertions for:
  - exact label `Season 4 Reveal`
  - headline `The crown returns to Nagpur.`
  - exact dates `21st, 22nd & 23rd November 2026`
  - venue `BTP Farms And Resorts, Nagpur`
  - video and poster asset paths
  - `autoPlay`, `muted`, `loop`, and `playsInline`
  - reduced-motion handling and offscreen pause behavior
  - a registration callback invoked by the CTA
- [ ] Run `node tools/test-homepage.mjs` and confirm the new component assertions fail.
- [ ] Create `src/components/SeasonFourReveal.tsx` with:
  - a semantic section labelled for Season 4
  - left announcement copy and short supporting line
  - center vertical reel labelled `Official Reel` and `Nagpur Reveal`
  - right date and venue information cards
  - CTA text `Register for Season 4`
  - an `onRegister: () => void` prop
  - muted inline autoplay and looping when motion is allowed
  - `IntersectionObserver` playback control so the reel pauses offscreen
  - poster-only initial behavior for visitors who prefer reduced motion
- [ ] Add `.season-four-reveal*` styles to `src/index.css` using the existing design tokens:
  - balanced three-column desktop grid
  - constrained portrait reel instead of an oversized media block
  - ivory display copy, gold labels, restrained borders, and navy panels
  - single-column mobile order: announcement, reel, dates, venue
  - no horizontal overflow or clipped typography
  - explicit reduced-motion styling
- [ ] Add a lightweight server-render test that imports the component and verifies the expected accessible structure and CTA.
- [ ] Run `node tools/test-homepage.mjs` and confirm all component and CSS assertions pass.
- [ ] Run `node C:\Users\Anushka Singh\.agents\skills\impeccable\scripts\detect.mjs --json src/components/SeasonFourReveal.tsx src/index.css` once and address relevant findings.
- [ ] Commit the component, CSS, and tests with a focused commit message.

## Task 3: Integrate and verify the homepage

- [ ] Add failing integration assertions in `tools/test-homepage.mjs` that the component is imported and rendered exactly once after `JuniorIndiaCampaign` and before the registration-interest section.
- [ ] Update the expected homepage `data-home-section` count from 10 to 11 and include the new component source in the count.
- [ ] Run `node tools/test-homepage.mjs` and confirm the integration assertions fail.
- [ ] Modify `src/pages/Home.tsx` to render:
  - `<SeasonFourReveal onRegister={() => navigate("register")} />`
  - directly after `<JuniorIndiaCampaign ... />`
- [ ] Run `node tools/test-homepage.mjs` and confirm all homepage checks pass.
- [ ] Run `npm run build` and confirm the production bundle succeeds without warnings introduced by this change.
- [ ] Preview the homepage at representative desktop and mobile widths and verify:
  - desktop composition matches the approved reference hierarchy
  - reel is centered, contained, and clear
  - headline does not clip or overlap
  - dates and venue are immediately readable
  - mobile layout remains clean and naturally stacked
  - CTA navigates to registration
  - reduced-motion visitors see a stable poster rather than forced autoplay
- [ ] Check `git diff --check` and `git status --short`; preserve unrelated working-tree changes.
- [ ] Commit the homepage integration and verification updates with a focused commit message.

## Completion Criteria

- [ ] The homepage contains one polished Season 4 reveal section in the approved position.
- [ ] The supplied reel plays automatically only when appropriate and pauses offscreen.
- [ ] The exact confirmed dates and venue are visible and accessible.
- [ ] Desktop and mobile layouts are both visually balanced with no clipping or overflow.
- [ ] Homepage tests and the production build pass.
- [ ] No unrelated files are modified or removed.
