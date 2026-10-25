import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

const home = read("src/pages/Home.tsx");
const data = read("src/data/site.ts");
const layout = read("src/components/Layout.tsx");
const register = read("src/pages/Register.tsx");
const videoBento = read("src/components/VideoBento.tsx");
const gallery = read("src/components/ui/image-gallery.tsx");

assert.match(data, /label:\s*"Finale guests"/, "homepage statistics should consistently say Finale guests");
assert.equal((home.match(/data-home-section\b/g) || []).length, 8, "homepage should contain eight primary sections");
assert.match(home, /Register interest for the next season/, "homepage should use the next-season registration CTA");
assert.match(layout, /Register interest for the next season/, "sticky CTA should use the next-season registration CTA");
assert.doesNotMatch(home, /useCountdown|auditionCities|Apply for auditions|Until finale week|October 2026/, "homepage should not expose stale audition details");
assert.doesNotMatch(layout, /useCountdown|days to finale week|still being reviewed/, "layout should not expose a stale countdown or review status");
assert.doesNotMatch(register, /3 October 2026|10 October 2026|17 October 2026|slot confirmation/, "interest form should not expose expired dates or slots");
assert.match(register, /Preferred city/, "interest form should collect a city preference without an expired audition date");
assert.doesNotMatch(home, /latestNews|YouTubePreview|TestimonialsSection|homepageSponsors|tickets/, "secondary news, testimonials, sponsor and ticket content should live off the homepage");
assert.match(videoBento, /return \(\s*<div className=/, "YouTube preview should use a non-interactive outer container");
assert.doesNotMatch(videoBento, /return \(\s*<button/, "YouTube preview must not wrap its play button in another button");
assert.match(home, /data-hero-video[\s\S]*?preload="auto"/, "hero video should preload for the clearest immediate playback");
assert.doesNotMatch(home, /inset-\[-8%_0\]|h-\[116%\]/, "hero video should not be enlarged beyond its frame");
assert.match(layout, /href=\{`mailto:/, "footer email must be clickable");
assert.match(layout, /href=\{`tel:/, "footer phone must be clickable");
assert.doesNotMatch(gallery, /sliderItems\s*=\s*\[\.\.\.homepageWinnerSlider/, "winner carousel must not duplicate accessible cards");
assert.match(gallery, /aria-label="Previous winners"/, "winner carousel needs previous controls");
assert.match(gallery, /aria-label="Next winners"/, "winner carousel needs next controls");

console.log("Homepage content and accessibility checks passed.");
