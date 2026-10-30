# Junior India Contestants Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a production-ready Junior India main-navigation page with a polished empty contestant state and a typed gallery data contract for later names and photographs.

**Architecture:** Extend the existing in-memory `PageKey` navigation system with a `junior-india` page. Store contestant records in the shared site data module, render an empty announcement while the array is empty, and render responsive portrait cards from the same page when records are later supplied.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Node assertion tests with Vite SSR

**Spec:** `docs/superpowers/specs/2026-10-30-junior-india-contestants-design.md`

## Global Constraints

- Add **Junior India** to desktop and mobile main navigation.
- Do not invent contestant names, ages, locations, biographies, photographs, dates, eligibility, or registration details.
- Keep the page consistent with the existing navy, gold, and editorial visual system.
- An empty `juniorIndiaContestants` collection must render a polished “coming soon” state; a non-empty collection must render one card per record.
- Preserve and do not include unrelated uncommitted Mentor-page changes in the feature commit.
- Commit the verified feature and redeploy the linked Vercel production project.

## Review Focus

- Empty contestant data renders the announcement and no broken/blank portrait cards; Task 1 SSR test covers this.
- A future contestant record with only the required fields renders a card without requiring optional copy; Task 1 source/data contract and conditional rendering cover this.
- Desktop and mobile menus both derive from `navItems`, so one Junior India entry appears in each; Task 1 source assertions cover both shared consumers.
- Switching to Junior India uses the existing `PageKey`/`pages` map without falling through to an undefined component; Task 1 route registration assertions cover this.
- The narrow desktop header has room for the added item without document-level overflow; Task 2 browser verification covers desktop and mobile viewports.

---

### Task 1: Junior India navigation and data-ready page

**Files:**
- Create: `src/pages/JuniorIndia.tsx`
- Create: `tools/test-junior-india.mjs`
- Modify: `src/data/site.ts`
- Modify: `src/App.tsx`
- Modify: `package.json`
- Test: `tools/test-junior-india.mjs`

**Interfaces:**
- Consumes: `Section`, `SectionHeader`, `PageKey`, existing `navItems`, and the project’s established page-map navigation pattern.
- Produces: `JuniorIndia({ navigate }: { navigate: (page: PageKey) => void })`, `JuniorIndiaContestant`, and `juniorIndiaContestants: JuniorIndiaContestant[]` where `name` and `image` are required and `descriptor` is optional.

- [ ] **Step 1: Write the failing Junior India regression test**

Create `tools/test-junior-india.mjs` with assertions that:

- `PageKey` and `navItems` contain `junior-india` / `Junior India`.
- `App.tsx` imports and registers `JuniorIndia` under `junior-india`.
- `juniorIndiaContestants` is initially an empty array.
- Vite SSR rendering of `JuniorIndia` contains `Junior India`, `Meet the contestants`, and `Contestant profiles are coming soon`.
- The empty SSR output contains zero `data-junior-contestant-card="true"` markers.
- After pushing `{ name: "Sample Contestant", image: "/sample-contestant.jpg" }` into the exported collection, a second SSR render contains exactly one contestant-card marker, the sample name/image, and no required descriptor; remove the sample after the assertion.
- `Layout.tsx` continues to render both desktop and mobile navigation from `navItems`.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node tools/test-junior-india.mjs`

Expected: FAIL because `JuniorIndia`, the page key, and contestant export do not exist.

- [ ] **Step 3: Add the data and routing contracts**

In `src/data/site.ts`, add `"junior-india"` to `PageKey`, add `{ key: "junior-india", label: "Junior India" }` to `navItems`, define `JuniorIndiaContestant`, and export `juniorIndiaContestants: JuniorIndiaContestant[] = []`.

In `src/App.tsx`, import `JuniorIndia` and register `"junior-india": JuniorIndia` in `pages`.

- [ ] **Step 4: Implement `JuniorIndia`**

Create `src/pages/JuniorIndia.tsx` with:

- an editorial hero for the new title;
- a `Meet the contestants` section;
- a conditional empty announcement when `juniorIndiaContestants.length === 0`;
- a responsive gallery branch mapping each contestant to a `data-junior-contestant-card="true"` portrait card with name and conditional descriptor;
- no unconfirmed event, eligibility, or personal details.

- [ ] **Step 5: Add the focused test to the suite**

Append `node tools/test-junior-india.mjs` to the existing `npm test` script in `package.json`.

- [ ] **Step 6: Run the focused test and verify GREEN**

Run: `node tools/test-junior-india.mjs`

Expected: PASS with a Junior India page/navigation confirmation.

- [ ] **Step 7: Run the complete automated suite**

Run: `npm test`

Expected: all mentor, homepage, winners, press, and Junior India tests pass.

- [ ] **Step 8: Commit only feature files and approved design/plan**

Stage the new page, focused test, package script, `App.tsx`, the Junior India hunks from `site.ts`, and both approved documentation files. Exclude unrelated existing Mentor-page hunks and `.impeccable/`.

Commit message: `feat: add Junior India contestants page`

---

### Task 2: Responsive verification and production deployment

**Files:**
- Verify: `src/pages/JuniorIndia.tsx`
- Verify: `src/components/Layout.tsx`
- Verify: Vercel project linked in `.vercel/project.json`

**Interfaces:**
- Consumes: the committed Junior India navigation entry, page component, and empty contestant data contract from Task 1.
- Produces: a responsive, production-deployed Junior India destination at the existing public alias.

- [ ] **Step 1: Build the production bundle**

Run: `npm run build`

Expected: TypeScript and Vite build complete successfully.

- [ ] **Step 2: Verify desktop behavior in a real browser**

At approximately `1440x900`, verify the Junior India navigation entry is visible, opens the correct page, the empty announcement is readable, and the document has no horizontal overflow.

- [ ] **Step 3: Verify mobile behavior in a real browser**

At approximately `390x844`, verify the menu opens, the Junior India entry navigates correctly, the page remains single-column/readable, and there is no document-level horizontal overflow.

- [ ] **Step 4: Deploy the committed revision to Vercel production**

Deploy the linked project with the existing Vercel CLI configuration and wait until status is `READY`.

- [ ] **Step 5: Verify the production artifact**

Confirm the production alias resolves to the new deployment and the served bundle contains the Junior India navigation/page markers. If deployment protection prevents a direct browser smoke test, use authenticated Vercel retrieval plus local interaction evidence.

- [ ] **Step 6: Report the release**

Provide the production link, deployment status, automated verification summary, and a reminder that contestant names and images can now be supplied for the prepared gallery.
