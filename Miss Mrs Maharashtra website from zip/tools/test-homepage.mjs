import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

const home = read("src/pages/Home.tsx");
const categoriesPage = read("src/pages/Categories.tsx");
const data = read("src/data/site.ts");
const layout = read("src/components/Layout.tsx");
const register = read("src/pages/Register.tsx");
const videoBento = read("src/components/VideoBento.tsx");
const gallery = read("src/components/ui/image-gallery.tsx");
const testimonials = read("src/components/ui/testimonials-6.tsx");
const styles = read("src/index.css");

assert.match(data, /label:\s*"Finale guests"/, "homepage statistics should consistently say Finale guests");
assert.equal((home.match(/data-home-section\b/g) || []).length, 9, "homepage should include the restored testimonial section");
assert.match(home, /Register interest for the next season/, "homepage should use the next-season registration CTA");
assert.match(layout, /Register interest for the next season/, "sticky CTA should use the next-season registration CTA");
assert.doesNotMatch(home, /useCountdown|auditionCities|Apply for auditions|Until finale week|October 2026/, "homepage should not expose stale audition details");
assert.doesNotMatch(layout, /useCountdown|days to finale week|still being reviewed/, "layout should not expose a stale countdown or review status");
assert.doesNotMatch(register, /3 October 2026|10 October 2026|17 October 2026|slot confirmation/, "interest form should not expose expired dates or slots");
assert.match(register, /Preferred city/, "interest form should collect a city preference without an expired audition date");
assert.doesNotMatch(home, /latestNews|YouTubePreview|homepageSponsors|tickets/, "secondary news, sponsor and ticket content should live off the homepage");
assert.match(home, /TestimonialsSection/, "homepage should include the animated testimonial section");
assert.match(home, /founder-line-mask/, "homepage should use the original founder reveal layout");
assert.match(home, /founder-quote-word/, "original founder quote treatment should be restored");
assert.match(home, /id="founder-photo-img"/, "original founder portrait treatment should be restored");
assert.match(home, /finalist-benefits-grid/, "finalist benefits should use the polished editorial grid");
assert.match(home, /finalist-benefit-card/, "finalist benefits should use purpose-built cards");
assert.match(home, /finalist-benefit-image h-full w-full object-cover/, "finalist benefit imagery should fill its frame without empty letterboxing");
assert.doesNotMatch(home, /luxury-hover-media relative aspect-\[3\/4\][\s\S]*?pillar\.bg[\s\S]*?object-contain/, "finalist benefit images should not use tall object-contain frames");
assert.match(data, /titleMiss:\s*`\$\{SEASON_3_WINNERS\}miss-supraglobal-india\.jpg`/, "Miss category cards should use the Season 3 titleholder portrait");
assert.ok(existsSync(resolve(root, "public/missmrs-assets/season-3-winners/miss-supraglobal-india.jpg")), "Season 3 Miss titleholder portrait must exist");
assert.match(categoriesPage, /aspect-\[2\/3\][\s\S]*?lg:min-h-\[720px\]/, "category profiles should preserve full-length portrait proportions");
assert.match(categoriesPage, /lg:grid-cols-\[minmax\(340px,\.8fr\)_minmax\(0,1\.2fr\)\]/, "category profiles should reserve professional desktop width for each portrait");
assert.match(categoriesPage, /luxury-hover-content min-w-0/, "category copy should not force portrait columns into narrow strips");
assert.match(videoBento, /return \(\s*<div className=/, "YouTube preview should use a non-interactive outer container");
assert.doesNotMatch(videoBento, /return \(\s*<button/, "YouTube preview must not wrap its play button in another button");
assert.match(home, /data-hero-video[\s\S]*?preload="auto"/, "hero video should preload for the clearest immediate playback");
assert.doesNotMatch(home, /inset-\[-8%_0\]|h-\[116%\]/, "hero video should not be enlarged beyond its frame");
assert.match(layout, /href=\{`mailto:/, "footer email must be clickable");
assert.match(layout, /href=\{`tel:/, "footer phone must be clickable");
assert.match(gallery, /winner-slider-track/, "winner gallery should use the continuous slider track");
assert.match(gallery, /aria-hidden="true"/, "visual duplicate winner cards must be hidden from assistive technology");
assert.doesNotMatch(gallery, /Previous winners|Next winners|winner-slider-rail/, "continuous winner slider should not expose manual rail controls");
assert.match(gallery, /winner-showcase-title/, "winner showcase should use the refined editorial title treatment");
assert.match(gallery, /winner-slider-scrim/, "winner cards should integrate captions over a readable image scrim");
assert.match(gallery, /winner-card-rule/, "winner cards should use the restrained accent rule");
for (const portrait of ["sneha-kalbhor.jpg", "apoorva-shirbhate.jpg", "archana-kamble.jpg"]) {
  assert.ok(existsSync(resolve(root, "public/missmrs-assets/curated", portrait)), `homepage winner portrait must exist: ${portrait}`);
  assert.match(data, new RegExp(`CURATED}\\$?${portrait.replace(".", "\\.")}`), `homepage winner slider should use curated portrait: ${portrait}`);
}
assert.doesNotMatch(data, /testimonial\/DSC000(?:76|97)\.JPG/, "homepage winner slider must not reference missing testimonial images");
assert.match(testimonials, /InfiniteSlider/, "testimonial section should be animated");
assert.match(testimonials, /direction="vertical"/, "testimonial cards should use continuous vertical motion");
assert.match(styles, /\.winner-marquee-section\s*\{[\s\S]*?background:\s*transparent;/, "winner section should not paint a decorative background");

console.log("Homepage content and accessibility checks passed.");
