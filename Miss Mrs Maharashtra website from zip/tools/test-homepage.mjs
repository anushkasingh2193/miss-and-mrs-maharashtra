import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { Children, isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

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
const juniorCampaign = read("src/components/JuniorIndiaCampaign.tsx");
const styles = read("src/index.css");

assert.match(data, /label:\s*"Finale guests"/, "homepage statistics should consistently say Finale guests");
assert.equal(
  (home.match(/data-home-section\b/g) || []).length + (juniorCampaign.match(/data-home-section\b/g) || []).length,
  10,
  "homepage should include the Junior India feature and restored testimonial section",
);
assert.match(home, /Register interest for the next season/, "homepage should use the next-season registration CTA");
assert.match(home, /navigate\("junior-india"\)[\s\S]*?Junior India Live Voting/, "homepage hero should expose Junior India live voting");
assert.match(layout, /Register interest for the next season/, "sticky CTA should use the next-season registration CTA");
assert.doesNotMatch(home, /useCountdown|auditionCities|Apply for auditions|Until finale week|October 2026/, "homepage should not expose stale audition details");
assert.doesNotMatch(layout, /useCountdown|days to finale week|still being reviewed/, "layout should not expose a stale countdown or review status");
assert.doesNotMatch(register, /3 October 2026|10 October 2026|17 October 2026|slot confirmation/, "interest form should not expose expired dates or slots");
assert.match(register, /Preferred city/, "interest form should collect a city preference without an expired audition date");
assert.doesNotMatch(home, /latestNews|YouTubePreview|homepageSponsors|tickets/, "secondary news, sponsor and ticket content should live off the homepage");
assert.match(home, /TestimonialsSection/, "homepage should include the animated testimonial section");
assert.match(juniorCampaign, /junior-india-home\.mp4/, "Junior India campaign should use the existing launch film");
assert.match(juniorCampaign, /role="dialog"/, "Junior India launch film should open in a dialog");
assert.match(juniorCampaign, /aria-modal="true"/, "Junior India launch film dialog should be modal");
assert.match(juniorCampaign, /Escape/, "Junior India launch film should close with Escape");
assert.match(juniorCampaign, /document\.body\.style\.overflow/, "Junior India launch film should lock background scrolling");
assert.match(juniorCampaign, /\.inert\s*=\s*true/, "Junior India launch film should isolate the background from keyboard users");
assert.match(juniorCampaign, /event\.key === "Tab"/, "Junior India launch film should trap Tab navigation");
assert.match(juniorCampaign, /onExitComplete/, "Junior India launch film should restore focus after its exit animation");
assert.match(juniorCampaign, /onExplore/, "Junior India campaign should preserve the dedicated page CTA");
assert.match(juniorCampaign, /dateTime="2026-11-22"/, "Junior India campaign should expose the event date semantically");
assert.match(juniorCampaign, /22 November 2026/, "Junior India campaign should highlight the confirmed event date");
assert.match(juniorCampaign, /junior-campaign__wordmark/, "Junior India campaign should use its oversized editorial wordmark");
assert.match(juniorCampaign, /useScroll/, "Junior India campaign should use restrained scroll-linked motion");
assert.match(juniorCampaign, /useTransform/, "Junior India campaign should transform editorial layers independently");
assert.match(styles, /\.junior-campaign\s*\{/, "Junior India campaign should have a dedicated full-width stage");
assert.match(styles, /\.junior-campaign__film\s*\{/, "Junior India campaign film should have an editorial focal layout");
assert.match(styles, /\.junior-film-dialog\s*\{/, "Junior India campaign should style its fullscreen player");
assert.match(styles, /@media\s*\(max-width:\s*767px\)[\s\S]*?\.junior-campaign/, "Junior India campaign should adapt for mobile");
assert.match(styles, /@media\s*\(max-width:\s*767px\)[\s\S]*?\.junior-campaign__film[\s\S]*?clip-path:\s*none\s*!important/, "Junior India campaign should disable clip reveals on narrow touch layouts");
assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.junior-campaign/, "Junior India campaign should provide a reduced-motion treatment");
assert.match(home, /import \{ JuniorIndiaCampaign \}/, "homepage should import the dedicated Junior India campaign");
assert.match(home, /<JuniorIndiaCampaign/, "homepage should render one dedicated Junior India campaign");
assert.match(home, /onExplore=\{\(\) => navigate\("junior-india"\)\}/, "Junior India homepage CTA should open the dedicated tab");
assert.doesNotMatch(home, /juniorIndiaVideoRef|data-junior-india-video|junior-india-home\.mp4/, "homepage should not own the campaign video implementation");
assert.match(juniorCampaign, /data-junior-india-video/, "Junior India campaign should own the runway video");
assert.ok(existsSync(resolve(root, "public/missmrs-assets/videos/junior-india-home.mp4")), "optimized Junior India homepage video must exist");
assert.ok(existsSync(resolve(root, "public/missmrs-assets/videos/junior-india-home-poster.jpg")), "Junior India homepage poster must exist");
assert.match(home, /founder-line-mask/, "homepage should use the original founder reveal layout");
assert.match(home, /founder-quote-word/, "original founder quote treatment should be restored");
assert.match(home, /id="founder-photo-img"/, "original founder portrait treatment should be restored");
assert.match(home, /finalist-benefits-grid/, "finalist benefits should use the polished editorial grid");
assert.match(home, /finalist-benefit-card/, "finalist benefits should use purpose-built cards");
assert.match(home, /finalist-benefit-image h-full w-full object-cover/, "finalist benefit imagery should fill its frame without empty letterboxing");
assert.doesNotMatch(home, /luxury-hover-media relative aspect-\[3\/4\][\s\S]*?pillar\.bg[\s\S]*?object-contain/, "finalist benefit images should not use tall object-contain frames");
assert.match(data, /titleMiss:\s*`\$\{SEASON_3_WINNERS\}miss-supraglobal-india\.jpg`/, "Miss category cards should use the Season 3 titleholder portrait");
assert.ok(existsSync(resolve(root, "public/missmrs-assets/season-3-winners/miss-supraglobal-india.jpg")), "Season 3 Miss titleholder portrait must exist");
assert.match(categoriesPage, /data-category-card="true"[\s\S]*?aspect-\[4\/5\]/, "category cards should preserve consistent portrait proportions");
assert.match(categoriesPage, /md:grid-cols-2 xl:grid-cols-3/, "category cards should show all three categories together on wide screens");
assert.match(categoriesPage, /luxury-hover-content flex flex-1 flex-col/, "category cards should keep their visible copy and actions aligned");
assert.match(categoriesPage, /min-h-\[clamp\(460px,62svh,680px\)\]/, "the simplified category hero should remain compact and responsive");
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
for (const portrait of ["mrs-maharashtra-winner.jpg", "mrs-maharashtra-first-runner-up.jpg", "mrs-maharashtra-second-runner-up.jpg", "miss-supraglobal-india.jpg", "miss-maharashtra-first-runner-up.jpg", "miss-maharashtra-second-runner-up.jpg"]) {
  assert.ok(existsSync(resolve(root, "public/missmrs-assets/season-3-winners", portrait)), `homepage Season 3 winner portrait must exist: ${portrait}`);
  assert.match(data, new RegExp(`SEASON_3_WINNERS}\\$?${portrait.replace(".", "\\.")}`), `homepage winner slider should use the confirmed Season 3 portrait: ${portrait}`);
}
for (const name of ["Sneha Kalbhor", "Apoorva Wandile", "Archana Kamble", "Shreyashi Walde", "Shruti Mishra", "Diksha Zade"]) {
  assert.match(data, new RegExp(`name: "${name}"`), `homepage winner slider should include ${name}`);
}
assert.doesNotMatch(data, /testimonial\/DSC000(?:76|97)\.JPG/, "homepage winner slider must not reference missing testimonial images");
assert.match(testimonials, /InfiniteSlider/, "testimonial section should be animated");
assert.match(testimonials, /direction="vertical"/, "testimonial cards should use continuous vertical motion");
assert.match(styles, /\.winner-marquee-section\s*\{[\s\S]*?background:\s*transparent;/, "winner section should not paint a decorative background");

function collectButtons(node, buttons = []) {
  if (Array.isArray(node)) {
    node.forEach((child) => collectButtons(child, buttons));
  } else if (isValidElement(node)) {
    if (node.type === "button") buttons.push(node);
    collectButtons(node.props.children, buttons);
  }
  return buttons;
}

const vite = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true },
});

try {
  const { HomeCategorySelector } = await vite.ssrLoadModule("/src/pages/Home.tsx");
  const navigations = [];
  const selector = HomeCategorySelector({ navigate: (target) => navigations.push(target) });
  const html = renderToStaticMarkup(selector);
  const categoryButtons = collectButtons(selector).filter(
    (button) => button.props["data-home-category-action"] === "true",
  );
  const juniorIndiaCard = categoryButtons.find((button) => button.props["aria-label"] === "Explore Junior India");
  assert.ok(juniorIndiaCard, "homepage category selector should render the Junior India card");
  const juniorIndiaHtml = renderToStaticMarkup(juniorIndiaCard);

  assert.equal(
    (html.match(/data-home-category-card="true"/g) ?? []).length,
    3,
    "homepage category selector should render three equal category cards",
  );
  assert.match(html, /Junior India/, "homepage category selector should name Junior India");
  assert.match(juniorIndiaHtml, /Youth category/, "homepage Junior India card should keep the category label");
  assert.doesNotMatch(juniorIndiaHtml, /22 November 2026/, "homepage Junior India card should keep the portrait clear of the full event date");
  assert.deepEqual(
    categoryButtons.map((button) => Children.toArray(button.props.children).length),
    [4, 4, 4],
    "homepage category cards should share the same direct image, overlay, label, and content structure",
  );
  assert.match(juniorIndiaHtml, /<dt[^>]*>Event<\/dt>/, "homepage Junior India card should retain the event fact label");
  assert.match(juniorIndiaHtml, /22 Nov 2026/, "homepage Junior India card should retain the abbreviated event fact");
  assert.match(
    html,
    /\/missmrs-assets\/junior-india\/junior-india-runway-hd\.png/,
    "homepage Junior India card should use the enhanced supplied runway picture",
  );

  assert.deepEqual(
    categoryButtons.map((button) => button.props["aria-label"]),
    ["Explore Miss Maharashtra", "Explore Mrs. Maharashtra", "Explore Junior India"],
    "homepage selector should expose one clear action for every category",
  );
  categoryButtons.forEach((button) => button.props.onClick());
  assert.deepEqual(
    navigations,
    ["categories", "categories", "junior-india"],
    "adult category cards should keep the comparison route while Junior India opens its dedicated page",
  );
} finally {
  await vite.close();
}

console.log("Homepage content and accessibility checks passed.");
