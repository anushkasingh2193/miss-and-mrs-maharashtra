# Season 4 Reveal — Design

## Intent

Add a premium Season 4 announcement to the homepage using the supplied reel as the focal point. The section should closely follow the supplied reference: editorial copy on the left, a tall video in the middle, and date/venue cards on the right.

## Content

- Eyebrow: `Season 4 Reveal`
- Headline: `The crown returns to Nagpur.`
- Supporting line: `Three days. One stage. A new chapter begins.`
- CTA: `Register for Season 4` and route to the existing registration page
- Video labels: `Official Reel` and `Nagpur Reveal`
- Dates: `21st, 22nd & 23rd November 2026`
- Venue: `BTP Farms And Resorts, Nagpur`

## Placement and layout

- Place the section on the homepage immediately after the Junior India campaign and before the existing registration-interest section.
- Desktop: three-column composition matching the reference, with the vertical video as the largest central element.
- Mobile: stack in this order — announcement, video, dates, venue — without changing the established site navigation or other sections.
- Use the existing navy, ivory and gold visual system, display typography, borders and spacing rhythm.

## Video behavior

- Copy the supplied `Video-9549.mp4` into the website's local video assets.
- Autoplay muted, loop and play inline; pause when the section leaves the viewport.
- Generate a clear poster frame from the supplied video to prevent an empty loading state.
- Respect reduced-motion preferences by showing the poster until the visitor starts playback.

## Approaches considered

1. **Faithful autoplay reveal — selected.** Best visual match to the reference and makes the supplied reel the centerpiece.
2. Click-to-play poster. Lighter initial motion, but weaker as a reveal and less faithful to the requested example.

## Constraints and non-goals

- Keep the current homepage identity and all unrelated sections unchanged.
- Do not invent extra event details beyond the confirmed season, dates and venue.
- Maintain readable contrast, semantic headings and responsive behavior.

