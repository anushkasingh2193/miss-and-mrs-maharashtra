# Winners Gallery Deduplication Design

## Intent

Make the Winners page feel curated rather than repetitive. Visitors should be able to choose a season and see one clear portrait for each person, without repeated strips, group-photo bands, or a large multi-image archive.

## Goals

- Keep the existing season tabs.
- Show one representative portrait per person in the selected season.
- Replace the current featured-image-plus-thumbnail archive with a clean responsive portrait grid.
- Remove the repeated hero feature card, six-image strip, three group-photo strip, and separate featured-titleholders block.
- Keep the existing page styling, lightbox behavior, and mobile responsiveness.

## Non-goals

- Do not redesign the site navigation, colors, typography, or other pages.
- Do not add names to people whose identities are not confirmed in the source material.
- Do not add Shreyuashi until her confirmed photo is supplied.

## Constraints

- The source archive uses camera filenames rather than person names, so the curated season lists will use visually distinct representative portraits and avoid known repeated shots of the same person.
- Existing local assets will be reused; no new remote image dependency will be introduced.

## Approaches Considered

1. Remove only exact duplicate file paths. Rejected because different photos of the same person would remain.
2. Keep the full archive but cap each season. Rejected because the page would still feel dense and repetitive.
3. Keep season tabs and replace the archive with a small unique-person portrait grid. Selected because it directly matches the requested simpler presentation.

## Selected Design

The Winners page will retain its title and season selector. Selecting a season will render a concise grid of unique representative portraits for that season. Each portrait opens in the existing lightbox. Repeated image bands, the oversized featured frame, the separate titleholder grid, and the “view full season” expansion will be removed.

## Verification

- Add a source-level regression test that requires the season tabs and unique portrait grid while rejecting the removed archive/strip structures.
- Run the full test suite and production build.
- Inspect the rendered Winners page at desktop and mobile widths.
