# Equal Trio Categories Design

## Intent

Make Miss Maharashtra, Mrs. Maharashtra, and Junior India equally visible at the top of the Categories page while shortening the page and making category selection easier to understand.

## Goals

- Present all three categories together in one immediately visible selector.
- Give every category equal visual weight.
- Keep Junior India distinctive through its event date, not through a larger card.
- Reduce repeated content and oversized category panels.
- Preserve the existing navy, blush, gold, editorial typography, imagery, and motion language.
- Keep the page clear and usable on mobile, tablet, and desktop.

## Non-goals

- Do not invent a Junior India age range, eligibility rule, pathway, or scoring system.
- Do not redesign the navigation, registration flow, or dedicated Junior India page.
- Do not change the established brand palette or typography.
- Do not merge youth and adult judging information.

## Constraints

- Reuse the three existing category images and current project components/tokens.
- Junior India must continue to show the event date `22 November 2026`.
- Miss and Mrs. calls to action continue to open registration.
- Junior India continues to open the dedicated Junior India page.
- Cards must remain keyboard accessible with visible focus treatment.
- The layout must not depend on hover to reveal essential information.

## Approaches Considered

### 1. Large editorial panels

Keep the current oversized Miss, Mrs., and Junior India feature panels. This preserves cinematic impact but creates a long page, repeats information, and prevents visitors from seeing all three categories together.

### 2. Tabs or accordion

Place categories behind tabs or expandable panels. This is compact, but hides two categories at a time and weakens immediate comparison and discoverability.

### 3. Equal Trio selector — selected

Use three equal cards in one responsive category grid. All categories remain visible together, while Junior India receives a small event-date highlight. This is the clearest and most balanced option.

## Selected Layout

### Compact hero

- Keep the existing category-page hero styling but reduce its height and visual complexity.
- Replace the current two-card hero artwork with focused introductory copy and a direct jump to the category selector.
- Update proof text from two categories to three distinct categories.

### Unified category selector

- Place the selector immediately after the hero.
- Desktop: three equal-width cards in one row.
- Tablet: responsive two-column layout with the third card using the available grid width naturally.
- Mobile: one full-width card per row.
- Use a consistent card structure for all three:
  1. Category image.
  2. Small category label.
  3. Category name.
  4. One short eligibility or purpose line using only confirmed copy.
  5. Pathway or event-date detail.
  6. Clear call to action.
- Junior India receives a compact `22 November 2026` badge in the same position used for pathway/status information on the adult cards.
- Essential copy and calls to action remain visible without hover.

### Supporting information

- Remove the two repeated oversized Miss/Mrs. detail panels.
- Remove the separate oversized Junior India feature panel.
- Keep the comparison table, but label it explicitly as a Miss & Mrs. adult-title comparison so it does not imply unconfirmed Junior India rules.
- Keep the scoring section explicitly scoped to the Miss and Mrs. titles unless confirmed Junior India scoring is supplied later.
- Retain the final application/contact call to action.

## Responsive and Accessibility Behaviour

- Maintain readable image crops and consistent card hierarchy at every breakpoint.
- Use semantic buttons for internal page navigation actions.
- Preserve visible focus rings, descriptive image alternatives, and sufficient text contrast.
- Respect reduced-motion behavior already established by the project.
- Do not hide eligibility, date, or action text behind hover animations.

## Validation

- Add/update rendering tests for three visible category cards, correct routes, and the Junior India event date.
- Confirm that adult comparison and scoring headings are correctly scoped.
- Run the full test suite and production build.
- Visually inspect desktop and mobile layouts when the browser environment is available.
