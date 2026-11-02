# Junior India Runway Manifesto

## Intent

Replace the conventional Junior India homepage block with an immersive luxury fashion campaign announcing a new generation and a new legacy. The section should feel like an editorial spread in motion while preserving the website's midnight navy, ivory, and antique gold identity.

## Goals

- Make the existing Junior India launch video the primary visual focal point.
- Use oversized `JUNIOR INDIA` typography as part of the composition, not as a heading above content.
- Create deliberate overlap between the campaign line, background wordmark, and portrait video.
- Open the film in an accessible fullscreen cinematic player through a custom circular play control.
- Use restrained progressive type, clip-path, hover, and parallax motion with reduced-motion fallbacks.
- Preserve the existing Junior India navigation destination and leave every other homepage section unchanged.

## Composition

- A full-width midnight campaign stage with generous negative space and no card container.
- A large, low-contrast `JUNIOR INDIA` wordmark extends beyond the section edges.
- The portrait video sits asymmetrically toward the right and overlaps the background typography.
- The campaign line `A New Generation. A New Legacy.` crosses the composition as the primary message.
- Small details include `FILM 001`, `OFFICIAL LAUNCH`, `JUNIOR INDIA`, and one vertical editorial label.
- The existing CTA remains visible and navigates to the Junior India page.

## Video Experience

- Source: `/missmrs-assets/videos/junior-india-home.mp4`.
- Inline preview loops silently and pauses off-screen; reduced-motion users receive a still poster.
- A circular play control opens a fullscreen dialog using the same source with sound-capable controls.
- The dialog closes through its close control, Escape, or backdrop click; focus and body scrolling are managed correctly.

## Motion

- Use the installed Motion library rather than adding GSAP.
- Reveal the background wordmark and campaign line progressively.
- Reveal the video with a smooth clip-path animation and a restrained hover scale.
- Apply subtle pointer/scroll parallax only on capable devices.
- Keep static fallbacks complete and legible when motion is reduced.

## Responsive Behavior

- Desktop uses an asymmetric overlapping composition.
- Tablet reduces overlap while keeping the video visually dominant.
- Mobile becomes a single editorial stack: oversized cropped wordmark, campaign line, large video, play control, and CTA.
- Typography scales within stable limits and never clips essential copy or controls.

## Non-Goals

- No replacement imagery or video source.
- No autoplay audio, scroll hijacking, decorative cards, or changes to adjacent sections.
- No new third-party dependency.

## Approaches Considered

- **Runway Manifesto:** selected for its balance of editorial impact, video prominence, and responsive clarity.
- **Fashion Film Cover:** rejected because the CTA and campaign message would become too subordinate.
- **Crown Monolith:** rejected because its extra vertical height would recreate the mobile scale problem.
