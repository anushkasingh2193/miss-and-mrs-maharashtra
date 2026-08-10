# Fast React Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Miss & Mrs. Maharashtra design handoff into a working React development app.

**Architecture:** Build a Vite React TypeScript single-page app with state-based routing, data-driven page sections, shared layout chrome, and focused interaction hooks. Keep the original `design_handoff_pageant_website` folder as reference material and implement production code under `src`.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, shadcn-compatible structure, lucide-react, clsx, tailwind-merge.

## Global Constraints

- Use `/components/ui` as the shadcn UI component path.
- Use Tailwind CSS and TypeScript.
- Preserve the nine-page site structure: Home, About, Categories, Register, Mentors, Winners, Sponsors, Press, Contact.
- Implement navigation, registration form state, localStorage draft restore/save, countdown, FAQ accordion, lightbox, and basic scroll reveal behavior.
- Use the design handoff README and HTML as the source of copy, content, palette, and layout direction.

---

### Task 1: App Scaffold

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `components.json`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `src/vite-env.d.ts`
- Create: `src/lib/utils.ts`

**Interfaces:**
- Produces: a Vite app with `@/*` alias mapped to `src/*`.

- [ ] Create the Vite/Tailwind/shadcn-compatible configuration files.
- [ ] Create the React entrypoint and base stylesheet.
- [ ] Run `npm install`.

### Task 2: Content Model And Shared UI

**Files:**
- Create: `src/data/site.ts`
- Create: `src/components/Layout.tsx`
- Create: `src/components/Section.tsx`

**Interfaces:**
- Produces: typed navigation, people, gallery, sponsor, FAQ, and page-section data.
- Produces: shared `Layout`, `Hero`, `SectionHeader`, and `ImageTile` components.

- [ ] Encode the handoff content in typed arrays and objects.
- [ ] Build sticky header, footer, sticky apply bar, and route transition curtain.
- [ ] Build reusable section primitives.

### Task 3: Pages And Interactions

**Files:**
- Create: `src/pages/Home.tsx`
- Create: `src/pages/About.tsx`
- Create: `src/pages/Categories.tsx`
- Create: `src/pages/Register.tsx`
- Create: `src/pages/Mentors.tsx`
- Create: `src/pages/Winners.tsx`
- Create: `src/pages/Sponsors.tsx`
- Create: `src/pages/Press.tsx`
- Create: `src/pages/Contact.tsx`
- Create: `src/hooks/useCountdown.ts`
- Create: `src/hooks/useScrollReveal.ts`

**Interfaces:**
- Consumes: content from `src/data/site.ts`.
- Produces: `PageKey` route views consumed by `App`.

- [ ] Implement all nine pages.
- [ ] Implement registration validation and localStorage draft behavior.
- [ ] Implement countdown, FAQ accordion, lightbox, and reveal behavior.

### Task 4: Verification

**Files:**
- Modify: app files only as needed to fix build/runtime issues.

**Interfaces:**
- Consumes: all app code from earlier tasks.
- Produces: working localhost dev server.

- [ ] Run `npm run build`.
- [ ] Start `npm run dev -- --host 127.0.0.1`.
- [ ] Probe the local URL and report it.
