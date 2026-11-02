# Junior India Runway Manifesto Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage Junior India block with an immersive luxury campaign composition and an accessible fullscreen launch-film player.

**Architecture:** Extract the campaign into a focused `JuniorIndiaCampaign` component so `Home.tsx` keeps its existing page orchestration. The component owns inline preview playback, fullscreen player state, focus/scroll management, and Motion-based reveals; dedicated CSS in `index.css` owns the asymmetric desktop composition and responsive editorial stack.

**Tech Stack:** React 18, TypeScript, Motion 12, Tailwind utilities, existing CSS design tokens, Lucide icons, Vite.

**Spec:** `docs/superpowers/specs/2026-10-31-junior-india-runway-manifesto-design.md`

## Global Constraints

- Use `/missmrs-assets/videos/junior-india-home.mp4` and its existing poster.
- Preserve the midnight navy, ivory, and antique gold palette.
- Keep the Junior India CTA destination unchanged.
- Add no dependency and modify no adjacent homepage section.
- Provide complete reduced-motion, keyboard, and mobile fallbacks.
- Never autoplay audio or hijack scrolling.

## Review Focus

- Autoplay rejection: the poster and play control remain usable when inline playback is blocked.
- Reduced motion: inline video stays paused and text/video render in their final states.
- Keyboard operation: the player opens from Enter/Space, closes with Escape, and returns focus to the trigger.
- Small mobile viewport: campaign copy, play control, video, vertical details, and CTA remain visible without horizontal overflow.
- Player lifecycle: body scrolling and video playback restore correctly after every close path.

---

### Task 1: Campaign Component and Fullscreen Film Player

**Files:**
- Create: `src/components/JuniorIndiaCampaign.tsx`
- Modify: `tools/test-homepage.mjs`

**Interfaces:**
- Consumes: `onExplore: () => void`, Motion APIs, existing video/poster URLs.
- Produces: `JuniorIndiaCampaign({ onExplore }: { onExplore: () => void }): JSX.Element` with `data-junior-india-campaign`, `data-junior-india-video`, and an accessible fullscreen dialog.

- [ ] **Step 1: Write the failing component contract tests**

Update `tools/test-homepage.mjs` to read `src/components/JuniorIndiaCampaign.tsx` and assert:

```js
assert.match(campaign, /junior-india-home\.mp4/);
assert.match(campaign, /role="dialog"/);
assert.match(campaign, /aria-modal="true"/);
assert.match(campaign, /Escape/);
assert.match(campaign, /document\.body\.style\.overflow/);
assert.match(campaign, /onExplore/);
```

- [ ] **Step 2: Run the homepage test and verify it fails**

Run: `node tools/test-homepage.mjs`
Expected: FAIL because `JuniorIndiaCampaign.tsx` does not exist.

- [ ] **Step 3: Implement the component behavior**

Create `JuniorIndiaCampaign({ onExplore }: { onExplore: () => void })` with:

- muted looping inline preview that pauses off-screen and for reduced motion;
- circular play button with `aria-label="Play the Junior India launch film"`;
- Motion `AnimatePresence` fullscreen dialog using the same source with `controls`, `autoPlay`, and `playsInline`;
- close button, Escape/backdrop close, body-scroll lock, trigger focus restoration, and cleanup on unmount;
- the exact campaign copy `A New Generation. A New Legacy.` plus `FILM 001`, `OFFICIAL LAUNCH`, and `JUNIOR INDIA` details;
- an `Explore Junior India` CTA calling `onExplore`.

- [ ] **Step 4: Run the homepage test**

Run: `node tools/test-homepage.mjs`
Expected: PASS.

- [ ] **Step 5: Commit the behavior**

```bash
git add src/components/JuniorIndiaCampaign.tsx tools/test-homepage.mjs
git commit -m "feat: add Junior India campaign player"
```

### Task 2: Runway Manifesto Composition and Motion

**Files:**
- Modify: `src/components/JuniorIndiaCampaign.tsx`
- Modify: `src/index.css`
- Modify: `tools/test-homepage.mjs`

**Interfaces:**
- Consumes: the component and data attributes from Task 1.
- Produces: `.junior-campaign`, `.junior-campaign__wordmark`, `.junior-campaign__film`, `.junior-campaign__vertical`, and `.junior-film-dialog` responsive styling hooks.

- [ ] **Step 1: Write the failing editorial-layout tests**

Add assertions that the campaign contains the oversized wordmark and motion hooks, and that `index.css` defines the campaign/video/player selectors plus mobile and reduced-motion rules.

- [ ] **Step 2: Run the homepage test and verify it fails**

Run: `node tools/test-homepage.mjs`
Expected: FAIL on missing campaign styles or motion hooks.

- [ ] **Step 3: Implement the asymmetric campaign stage**

Use CSS Grid only as an invisible positioning system, not as a visible two-column layout. Place the oversized wordmark beyond the section edges; overlap the portrait film, primary campaign line, and vertical detail; remove all card borders and boxed captions; add an ivory-to-navy bottom transition into the next section.

- [ ] **Step 4: Implement restrained Motion choreography**

Use `useReducedMotion`, `useScroll`, and `useTransform` for progressive wordmark/campaign-line reveals, clip-path film reveal, subtle film parallax, and hover scale. Disable parallax and clip animation for reduced motion and narrow touch layouts.

- [ ] **Step 5: Run focused checks**

Run: `node tools/test-homepage.mjs`
Expected: PASS.

Run: `node C:\Users\Anushka Singh\.agents\skills\impeccable\scripts\detect.mjs --json src/components/JuniorIndiaCampaign.tsx src/index.css`
Expected: `[]` or only reviewed findings that preserve the approved editorial direction.

- [ ] **Step 6: Commit the campaign art direction**

```bash
git add src/components/JuniorIndiaCampaign.tsx src/index.css tools/test-homepage.mjs
git commit -m "feat: style Junior India runway manifesto"
```

### Task 3: Homepage Integration and Responsive Verification

**Files:**
- Modify: `src/pages/Home.tsx:1-235`
- Modify: `tools/test-homepage.mjs`

**Interfaces:**
- Consumes: `JuniorIndiaCampaign` and its `onExplore` callback from Task 1.
- Produces: one homepage campaign instance navigating through `navigate("junior-india")`.

- [ ] **Step 1: Update the integration test first**

Assert that `Home.tsx` imports and renders `JuniorIndiaCampaign`, passes `navigate("junior-india")`, and no longer owns the old inline Junior India video block or its observer ref.

- [ ] **Step 2: Run the homepage test and verify it fails**

Run: `node tools/test-homepage.mjs`
Expected: FAIL because the old block remains in `Home.tsx`.

- [ ] **Step 3: Integrate the component**

Remove the old Junior India video ref, observer effect, and compact section markup from `Home.tsx`. Import `JuniorIndiaCampaign` and render it in the same homepage position with `onExplore={() => navigate("junior-india")}`.

- [ ] **Step 4: Run all automated verification**

Run: `npm run test`
Expected: all content, accessibility, winners, press, and Junior India checks pass.

Run: `npm run build`
Expected: TypeScript and Vite production build complete successfully.

- [ ] **Step 5: Perform bounded visual QA**

Capture desktop `1440x1000` and mobile `390x844` screenshots. Verify the campaign hierarchy, overlap, negative space, inline video crop, circular play interaction, fullscreen close paths, focus return, no horizontal overflow, and smooth transition into the following section. Apply at most one consolidated correction pass, then confirm once.

- [ ] **Step 6: Commit the integration**

```bash
git add src/pages/Home.tsx tools/test-homepage.mjs
git commit -m "feat: launch Junior India campaign on homepage"
```
