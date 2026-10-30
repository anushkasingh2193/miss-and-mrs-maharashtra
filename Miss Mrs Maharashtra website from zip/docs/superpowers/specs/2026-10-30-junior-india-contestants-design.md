# Junior India Contestants Page — Design

## Intent

Launch **Junior India** as a distinct title in the website’s main navigation now, before its contestant roster is available. The page should establish the new title professionally and provide a stable place for contestant names and portraits to be added later.

## Goals

- Add a top-level **Junior India** navigation tab on desktop and mobile.
- Add a dedicated Junior India page consistent with the existing navy, gold, and editorial visual system.
- Show a clear, polished empty state explaining that contestant profiles will be announced soon.
- Define a typed `juniorIndiaContestants` data collection so future names and photos can be added without redesigning the page.
- Keep the empty state automatically replaceable by a responsive contestant portrait grid when data is supplied.

## Non-goals

- Do not invent contestant names, ages, locations, biographies, or photographs.
- Do not add registration, voting, payment, or eligibility workflows in this release.
- Do not change the existing Miss Maharashtra, Mrs. Maharashtra, mentor, or winner content.

## Approaches considered

1. **Dedicated, data-ready page — selected.** A complete Junior India page with an empty contestant collection and a future-ready gallery. This adds a strong launch destination now and minimizes later work.
2. **Static placeholder page.** A navigation tab and “coming soon” message only. This is quicker but would require restructuring once contestant profiles arrive.

## Page structure

1. An editorial hero introducing Junior India as a new title, without making unconfirmed claims about dates or eligibility.
2. A contestant section headed **Meet the contestants**.
3. While the contestant collection is empty, a refined announcement card: contestant names and portraits are coming soon.
4. When data is later added, the same section renders one portrait card per contestant with name and optional short descriptor.

## Technical shape

- Add `"junior-india"` to `PageKey` and `navItems`.
- Add `JuniorIndia.tsx` and register it in the `pages` map in `App.tsx`.
- Add and export a typed `juniorIndiaContestants` array in `src/data/site.ts`.
- Add a focused regression test covering the navigation entry, route registration, empty state, and data-ready gallery contract.
- Preserve all unrelated uncommitted work already present in the shared checkout.

## Success criteria

- Junior India is reachable from both desktop and mobile main navigation.
- The page renders correctly with zero contestants and contains no invented personal information.
- Adding an item to `juniorIndiaContestants` later is sufficient to display a contestant card.
- Existing tests and the production build pass before commit and deployment.
