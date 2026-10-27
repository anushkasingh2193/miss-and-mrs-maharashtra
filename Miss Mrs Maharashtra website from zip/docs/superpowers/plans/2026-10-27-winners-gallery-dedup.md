# Winners Gallery Deduplication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify the Winners page so each season tab shows one clean representative portrait per person, with the repeated image strips and oversized archive removed.

**Architecture:** Keep `winnerSeasonGroups` as the page's season model, but replace each generated archive with a small hand-curated list of visually unique local portraits. Render the active season directly as a responsive portrait grid in `Winners.tsx`, while retaining the existing tabs and lightbox. A source-level Node test will lock in both the simplified structure and the curated data boundaries.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Node.js `assert`, Vercel CLI.

**Spec:** `docs/superpowers/specs/2026-10-27-winners-gallery-dedup-design.md`

## Global Constraints

- Preserve the user's existing uncommitted mentor-roster edits in `src/data/site.ts` and `tools/test-mentors.mjs`.
- Reuse local assets only; do not add a remote image dependency.
- Do not add Shreyuashi until a confirmed photo is supplied.
- Do not change the site navigation, typography, colors, homepage winner slider, or other pages.
- Do not add names for people whose identities are not confirmed.
- Make every source edit with `apply_patch`, and review the final diff for unrelated changes before testing or committing.

## Review Focus

- Each tab must display exactly one representative image for each visually distinct person selected for that season.
- The old hero feature card, six-image strip, three-photo group strip, titleholder section, large featured archive frame, and expand button must be gone.
- Season tabs, responsive layout, keyboard-accessible buttons, image alt text, and lightbox behavior must still work.
- Desktop and mobile views must remain balanced even when seasons contain different portrait counts.

### Task 1: Add a failing Winners-page regression test

**Files:**
- Create: `tools/test-winners.mjs`
- Modify: `package.json`
- Read before editing tests: `C:/Users/Anushka Singh/.codex/plugins/cache/openai-curated-remote/superpowers/7.0.1/skills/test-driven-development/writing-good-tests.md`

- [ ] Inspect the current diff of `package.json`, `src/data/site.ts`, `src/pages/Winners.tsx`, and `tools/test-mentors.mjs` so the new work does not overwrite existing user changes.
- [ ] Create `tools/test-winners.mjs` using `node:assert/strict`, `node:fs`, and `node:path`.
- [ ] Read `src/pages/Winners.tsx` and assert that the season-tab mapping remains (`winnerSeasonGroups.map`) and that the page contains a stable `winner-season-portrait-grid` marker plus a direct `selectedSeason.images.map` portrait render.
- [ ] Assert that the old structures are absent from `Winners.tsx`: `mAndMWinnerImages.slice`, `titleholders.map`, `showFullArchive`, `visibleSeasonImages`, `View full season`, and the oversized featured-image state.
- [ ] Extract only the `winnerSeasonGroups` declaration from `src/data/site.ts` and assert that it includes the agreed representative image files while excluding known same-person alternates and group frames. This keeps global archival exports free to retain their original assets for other pages.
- [ ] Update the `test` script in `package.json` to append `node tools/test-winners.mjs` without changing the existing mentor and homepage checks.
- [ ] Run `node tools/test-winners.mjs` and confirm it fails for the expected reason: the current page still contains archive/strip structures and lacks the portrait-grid marker.
- [ ] Commit only the test harness and package-script change with message `test: define winners gallery deduplication` if the repository's current workflow permits an isolated commit; otherwise leave the files staged separately for the final commit.

### Task 2: Curate one portrait per person for every season

**Files:**
- Modify: `src/data/site.ts` (`winnerSeasonGroups` only)
- Test: `tools/test-winners.mjs`

**Data contract:** Preserve the existing group shape `{ eyebrow, title, note, images }`; only replace each `images` archive with a manually curated local-image array.

- [ ] Re-open the current diff for `src/data/site.ts` and preserve the unrelated removal of `Miss Mohini Sharma` exactly as found.
- [ ] Replace the Season 1 archive with four visually distinct portraits: `AKAL3979.jpg`, `AKAL4002.jpg`, `DSC_6501.jpg`, and `DSC_6792.jpg` from `M&M/M&M s1 winners`.
- [ ] Replace the Season 2 archive with the three confirmed unique portraits already exposed through `titleholders`: Sneha Kalbhor, Apoorva Shirbhate, and Archana Kamble. Reference their local curated asset paths directly so the Winners data does not depend on the display order of another array.
- [ ] Replace the Season 3 archive with the four visually distinct Drive M&M portraits represented by `mAndMWinnerImages[0]`, `[1]`, `[3]`, and `[4]` (blue gown, black gown, striped gown, and black runner-up gown), using explicit local paths or those stable indexes consistently.
- [ ] Replace the Miss Maharashtra Season 2 archive with `navdeep.jpg`, `ZOHR2080.jpg`, and `ZOHR2090.jpg` from `MIS/s2 Winners`.
- [ ] Replace the Miss Maharashtra Season 3 archive with `TS102124.jpg`, `TS102129.jpg`, and `TS102142.jpg` from `MIS/s3 winners`.
- [ ] Replace the Miss Supraglobal archive with `TS100950.jpg`, `TS102272.jpg`, `TS102292.jpg`, `TS102311.jpg`, and `TS102338.jpg` from `MS/winners`.
- [ ] Keep large archival arrays and helpers intact if they are referenced elsewhere; the source-level test should constrain only `winnerSeasonGroups`.
- [ ] Run `node tools/test-winners.mjs`; confirm that the data assertions now pass and that the test still fails only on the not-yet-simplified page structure.

### Task 3: Replace the Winners archive with a clean portrait grid

**Files:**
- Modify: `src/pages/Winners.tsx`
- Test: `tools/test-winners.mjs`

- [ ] Remove imports that become unused (`mAndMWinnerImages`, `titleholders`, and `ArrowRight` if it is no longer needed), while retaining `cn`, `imageRoles`, `winnerSeasonGroups`, and `PageKey` as required.
- [ ] Remove `showFullArchive`, `visibleSeasonImages`, and `featuredImage` state/derivations; retain `activeSeason`, `selectedSeason`, and `lightbox`.
- [ ] Make the hero text-led by removing its standalone featured winner card while preserving the page title, description, and visual background treatment.
- [ ] Delete the six-image strip, the three-photo group strip, and the separate featured-titleholders section.
- [ ] Keep the current season-tab controls and their active-state styling. When a tab changes, render that season immediately without an archive-expansion state.
- [ ] Replace the featured frame and thumbnail archive with a responsive grid marked `winner-season-portrait-grid`, using approximately one column on small screens, two on medium screens, and three or four on wider screens as the portrait count allows.
- [ ] Render `selectedSeason.images.map((image, idx) => ...)` as one 3:4 portrait button per curated image, with `object-cover`, a subtle overlay, a neutral label such as `Portrait 01`, descriptive alt text based on the selected season, and `onClick={() => setLightbox(image)}`.
- [ ] Preserve the existing lightbox and ensure its close button remains keyboard accessible with an explicit accessible label.
- [ ] Run `node tools/test-winners.mjs` and confirm it passes.
- [ ] Run `npm test` and confirm the mentor, homepage, and Winners regression tests all pass.
- [ ] Run `npm run build` and fix only errors caused by this change.
- [ ] Review `git diff --check` and `git diff -- src/data/site.ts src/pages/Winners.tsx tools/test-winners.mjs package.json` for whitespace problems, accidental archive deletion, or unrelated edits.
- [ ] Commit the implementation with message `feat: simplify winners season galleries`, preserving the user's pre-existing mentor changes without claiming them as new work.

### Task 4: Verify the rendered page at desktop and mobile widths

**Files:**
- Verify: `src/pages/Winners.tsx`
- Verify: `src/data/site.ts`

- [ ] Read and follow the `playwright` skill before browser automation.
- [ ] Start the Vite development server from the app directory and note its local URL.
- [ ] Open `/winners` at a desktop viewport near 1440×900. Confirm the hero is text-led, only one portrait grid appears, every season tab is visible, no repeated strips/archive control remain, and each portrait opens/closes in the lightbox.
- [ ] Click every season tab and compare the rendered card count to its curated data count: 4, 3, 4, 3, 3, and 5 respectively.
- [ ] Repeat the key checks at a mobile viewport near 390×844, including horizontal tab usability, single-column portrait presentation, no overflow, and lightbox close behavior.
- [ ] Capture screenshots only if they help diagnose or communicate a layout problem; do not add them to the production bundle.
- [ ] If visual QA finds a defect, add or strengthen the smallest relevant regression test before changing code, then repeat `npm test` and `npm run build`.

### Task 5: Deploy and verify production

**Files:**
- Verify: `.vercel/project.json`
- Verify: `vercel.json`

- [ ] Read and follow the `vercel:vercel-cli` and `vercel:verification` skills before deploying.
- [ ] Confirm the linked Vercel project is `anushkas-projects-a523dd96/miss-mrs-maharashtra` and that the production alias is expected to remain `https://miss-mrs-maharashtra-indol.vercel.app`.
- [ ] Run the final `npm test` and `npm run build` immediately before deployment and save the fresh pass results.
- [ ] Deploy from the linked workspace with `vercel --prod --non-interactive`; record the immutable deployment URL and alias reported by Vercel.
- [ ] Open the production `/winners` route and repeat a concise desktop smoke test: page loads, season tabs switch, portrait counts match, and the lightbox opens and closes.
- [ ] Report the deployed link, verification results, files changed, and the fact that the existing mentor-roster edits were preserved.

## Final Self-Review Checklist

- [ ] The implementation matches every goal and non-goal in the approved design spec.
- [ ] No season includes two selected photos of the same visible person.
- [ ] The page contains no repeated strips, separate titleholder gallery, oversized archive frame, or archive expansion button.
- [ ] Tests fail before implementation and pass afterward; the final test and build results are fresh.
- [ ] Desktop and mobile visual checks cover every season tab and the lightbox.
- [ ] The final diff contains no unintended changes and preserves all user-owned work that predated this plan.
- [ ] The production alias resolves to the verified updated deployment.
