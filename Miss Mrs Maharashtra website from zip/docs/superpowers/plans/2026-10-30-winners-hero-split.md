# Winners Hero Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the crowded Winners hero with a responsive editorial split and deploy it to production.

**Architecture:** Keep the change inside the existing `Winners` page. Update the server-rendered regression test first, then replace only the hero markup while preserving the archive controls and data below it.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vite, Node assertions, Vercel

**Spec:** `docs/superpowers/specs/2026-10-30-winners-hero-split-design.md`

## Global Constraints

- Use one lineup photograph and do not layer duplicate copies.
- Keep all title text outside the photograph.
- Preserve the existing navy, ivory, and gold identity.
- Preserve all category tabs, season tabs, portraits, and lightbox behavior.
- Stack title before photograph on narrow viewports.

## Review Focus

- Wide screens: the 3:2 image remains fully legible and does not become a thin panoramic crop.
- Narrow screens: text precedes the image and neither heading nor photograph overflows.
- Accessibility: one meaningful image alternative and one page-level heading remain.
- Regression safety: archive tabs and default portraits remain unchanged.
- Deployment: production returns the new split-hero marker after the build completes.

---

### Task 1: Pin the approved hero contract

**Files:**
- Modify: `tools/test-winners.mjs`

**Interfaces:**
- Consumes: server-rendered `Winners` markup.
- Produces: assertions for `data-winners-hero="editorial-split"`, a single `winners-hero-lineup.jpg` occurrence, the “Hall of Fame” eyebrow, and removal of the former full-bleed hero contract.

- [ ] **Step 1: Replace the obsolete hero assertions with the approved split-hero assertions.**
- [ ] **Step 2: Run `node tools/test-winners.mjs` and verify it fails against the current full-bleed hero.**

### Task 2: Implement the editorial split hero

**Files:**
- Modify: `src/pages/Winners.tsx`

**Interfaces:**
- Consumes: `/missmrs-assets/featured/winners-hero-lineup.jpg`.
- Produces: responsive split markup with one image, external title copy, and no duplicate background or text overlay.

- [ ] **Step 1: Replace only the current hero section with the approved responsive two-column composition.**
- [ ] **Step 2: Run `node tools/test-winners.mjs` and verify all split-hero and archive assertions pass.**
- [ ] **Step 3: Run the layout detector and resolve any new unexplained layout findings.**
- [ ] **Step 4: Inspect desktop and mobile renderings for crop, hierarchy, and overflow.**
- [ ] **Step 5: Run `npm test` and `npm run build`; both must exit successfully.**

### Task 3: Commit and redeploy

**Files:**
- Add: the two design documents and the focused source/test changes.
- Exclude: unrelated `.impeccable/` files.

**Interfaces:**
- Consumes: verified production build.
- Produces: a Git commit and updated production Vercel deployment.

- [ ] **Step 1: Review the focused diff and commit it as `fix: simplify winners gallery hero`.**
- [ ] **Step 2: Deploy the verified build to Vercel production.**
- [ ] **Step 3: Confirm the production URL is Ready and return the deployed link.**
