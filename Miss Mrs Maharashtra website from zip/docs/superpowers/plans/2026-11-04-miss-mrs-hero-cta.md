# Miss & Mrs. Hero CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic homepage hero registration label with the approved short Miss & Mrs. contestant-entry CTA.

**Architecture:** Keep the existing `Home` hero component, button styling, and `navigate("register")` handler intact. Pin the approved copy with the existing homepage source-level test, then make the smallest source change.

**Tech Stack:** React 18, TypeScript, Vite, Node.js assertions

**Spec:** `docs/superpowers/specs/2026-11-04-miss-mrs-hero-cta-design.md`

## Global Constraints

- The secondary CTA text must be exactly `Enter Miss & Mrs.`.
- The primary `Junior India Live Voting` CTA must remain unchanged.
- The secondary CTA must continue navigating to `register`.
- Existing responsive styling must remain unchanged.

## Review Focus

- Copy regression: the old `Register Now` label must not remain in the homepage hero.
- Route regression: the revised CTA must remain paired with `navigate("register")`.
- Primary CTA regression: `Junior India Live Voting` must remain present.
- Responsive regression: no hero class names should change.
- Build regression: the TypeScript and Vite production build must still pass.

---

### Task 1: Update and verify the homepage hero CTA

**Files:**
- Modify: `tools/test-homepage.mjs`
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Consumes: the existing `Home` component and its `navigate(target)` prop.
- Produces: a secondary hero button labeled `Enter Miss & Mrs.` that invokes `navigate("register")`.

- [ ] **Step 1: Add a failing homepage assertion**

Assert that the `navigate("register")` hero button is followed by the exact copy `Enter Miss & Mrs.` and that `Register Now` is absent.

- [ ] **Step 2: Run the focused homepage test and verify it fails**

Run: `node tools/test-homepage.mjs`
Expected: FAIL because `Enter Miss & Mrs.` is not yet present.

- [ ] **Step 3: Replace the secondary hero CTA copy**

In `src/pages/Home.tsx`, change only `Register Now` to `Enter Miss & Mrs.`.

- [ ] **Step 4: Run verification**

Run: `npm test`
Expected: all site assertion suites pass.

Run: `npm run build`
Expected: TypeScript and Vite complete successfully.

- [ ] **Step 5: Commit, push, and redeploy**

Commit only the CTA source, test, spec, and plan files; push `main`; deploy the linked `miss-mrs-maharashtra` Vercel project to production; verify the deployed page contains the approved CTA.

