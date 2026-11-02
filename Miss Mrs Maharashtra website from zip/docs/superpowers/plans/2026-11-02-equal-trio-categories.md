# Equal Trio Categories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the repeated category presentation with one responsive, equally weighted selector for Miss Maharashtra, Mrs. Maharashtra, and Junior India.

**Architecture:** Keep the Categories page as the single composition boundary. Expand its local category configuration to three confirmed records, render one shared card pattern, and retain the existing adult comparison/scoring content with explicit adult-title labels.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Lucide React, Vite, Node rendering tests

**Spec:** `docs/superpowers/specs/2026-11-02-equal-trio-categories-design.md`

## Global Constraints

- Preserve the existing navy, blush, gold, editorial typography, imagery, and motion language.
- Display `22 November 2026` for Junior India.
- Do not invent Junior India age, eligibility, pathway, or scoring rules.
- Miss and Mrs. actions navigate to `register`; Junior India navigates to `junior-india`.
- Essential copy and actions remain visible without hover.
- Preserve keyboard focus, semantic controls, readable contrast, and responsive behavior.
- Do not alter unrelated homepage/campaign work already present in the working tree.

## Review Focus

- Exactly three category cards render; add a static-render assertion in Task 1.
- Junior India remains routed separately from adult registration; assert the source route in Task 1.
- Junior date and HD image remain present; assert both in Task 1.
- Adult comparison/scoring are not presented as Junior India rules; assert scoped headings in Task 1.
- Old duplicated large panels do not remain; assert the old Junior section marker and two-category proof are absent in Task 1.

---

### Task 1: Build the Equal Trio category selector

**Files:**
- Modify: `tools/test-categories.mjs`
- Modify: `src/pages/Categories.tsx`

**Interfaces:**
- Consumes: `imageRoles.titleMiss`, `imageRoles.titleMrs`, `imageRoles.juniorIndiaCategory`, and `PageKey` from `src/data/site.ts`.
- Produces: three rendered elements with `data-category-card="true"`; card targets `register`, `register`, and `junior-india`.

- [ ] **Step 1: Write the failing rendering test**

Update `tools/test-categories.mjs` to assert:

```js
assert.equal((html.match(/data-category-card="true"/g) ?? []).length, 3);
assert.match(html, /3 distinct categories/);
assert.match(html, /22 November 2026/);
assert.match(html, /junior-india-runway-hd\.png/);
assert.match(html, /Adult title comparison/);
assert.match(html, /Miss &amp; Mrs\. title scoring/);
assert.doesNotMatch(html, /data-category-section="junior-india"/);
assert.doesNotMatch(html, /2 title categories/);
```

Also read `src/pages/Categories.tsx` and assert it contains both `navigate("register")` and `navigate("junior-india")`.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node tools/test-categories.mjs`

Expected: FAIL because the page does not yet render three shared category cards and still contains the old separate Junior India section.

- [ ] **Step 3: Implement the shared category configuration and compact hero**

In `src/pages/Categories.tsx`, replace the two-record local configuration with three records containing exact `key`, `title`, `label`, `description`, `metaLabel`, `meta`, `image`, `position`, `target: PageKey`, and `cta` values. Remove the unused `categories` import. Update the hero proof to `3 distinct categories`, `Separate pathways`, and `One confident stage`; replace the hero's two-card artwork with a compact introduction and link to `#choose-category`.

- [ ] **Step 4: Implement the unified responsive selector**

Render one `Section` with `id="choose-category"` and a `md:grid-cols-2 xl:grid-cols-3` grid. Each equal-height article must expose `data-category-card="true"`, use the same image/content hierarchy, keep all copy visible, and navigate through its record's `target`. Show Junior India's confirmed event date in the same metadata position used for adult pathways.

- [ ] **Step 5: Remove duplicated panels and scope adult information**

Delete the repeated oversized Miss/Mrs. detail loop and the separate `data-category-section="junior-india"` feature. Change the comparison eyebrow to `Adult title comparison` and the scoring eyebrow to `Miss & Mrs. title scoring` without changing the adult comparison values or scoring weights.

- [ ] **Step 6: Run the focused test and verify GREEN**

Run: `node tools/test-categories.mjs`

Expected: PASS with the three-card, route, date, image, scoped-heading, and duplication assertions green.

### Task 2: Verify and deliver

**Files:**
- Add: `docs/superpowers/specs/2026-11-02-equal-trio-categories-design.md`
- Add: `docs/superpowers/plans/2026-11-02-equal-trio-categories.md`
- Modify: `src/pages/Categories.tsx`
- Modify: `tools/test-categories.mjs`

**Interfaces:**
- Consumes: Task 1's rendered Equal Trio selector.
- Produces: tested commit on `main`, pushed to `origin/main`, and a READY Vercel production deployment.

- [ ] **Step 1: Run repository verification**

Run: `npm test`

Expected: all project tests pass, including `test-categories.mjs`.

Run: `npm run build`

Expected: TypeScript and Vite production build exit 0.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 2: Review and stage only scoped files**

Inspect `git status --short`, the task diff, and the staged diff. Do not stage unrelated `Home.tsx`, `JuniorIndiaCampaign.tsx`, `index.css`, homepage tests, or `.impeccable` files.

- [ ] **Step 3: Commit and push**

```bash
git add "Miss Mrs Maharashtra website from zip/src/pages/Categories.tsx" \
  "Miss Mrs Maharashtra website from zip/tools/test-categories.mjs" \
  "Miss Mrs Maharashtra website from zip/docs/superpowers/specs/2026-11-02-equal-trio-categories-design.md" \
  "Miss Mrs Maharashtra website from zip/docs/superpowers/plans/2026-11-02-equal-trio-categories.md"
git commit -m "refactor: simplify category selection"
git push origin main
```

- [ ] **Step 4: Redeploy and verify production**

Verify the linked Vercel project, deploy production from the repository root, inspect for `READY`, and confirm the public production alias returns HTTP 200 with a bundle containing `3 distinct categories`, `22 November 2026`, and `junior-india-runway-hd.png`.
