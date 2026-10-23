import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

const home = read("src/pages/Home.tsx");
const data = read("src/data/site.ts");
const layout = read("src/components/Layout.tsx");
const gallery = read("src/components/ui/image-gallery.tsx");
const testimonials = read("src/components/ui/testimonials-6.tsx");

assert.match(data, /label:\s*"Finale guests"/, "homepage statistics should consistently say Finale guests");
assert.match(data, /homepageSponsors/, "homepage should expose real sponsor marks");
assert.match(home, /Until finale week/, "countdown must explain what it is counting toward");
assert.match(home, /getAuditionStatus/, "audition cities must display date-aware status");
assert.match(home, /Runway\. Crown\. Applause\./, "showreel title should use polished punctuation");
assert.match(home, /Enquire about \{ticket\.name\}/, "ticket CTAs must describe the contact flow honestly");
assert.match(home, /<article[\s\S]*?<YouTubePreview/, "news video previews should not be nested inside an outer button");
assert.match(layout, /href=\{`mailto:/, "footer email must be clickable");
assert.match(layout, /href=\{`tel:/, "footer phone must be clickable");
assert.doesNotMatch(gallery, /sliderItems\s*=\s*\[\.\.\.homepageWinnerSlider/, "winner carousel must not duplicate accessible cards");
assert.match(gallery, /aria-label="Previous winners"/, "winner carousel needs previous controls");
assert.match(gallery, /aria-label="Next winners"/, "winner carousel needs next controls");
assert.doesNotMatch(testimonials, /InfiniteSlider/, "testimonials should not run in an infinite motion loop");
assert.match(testimonials, /quotes\.slice\(0, 3\)/, "homepage should show three external testimonials");

console.log("Homepage content and accessibility checks passed.");
