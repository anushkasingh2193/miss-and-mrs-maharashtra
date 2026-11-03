import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { Children, createElement, isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

const home = read("src/pages/Home.tsx");
const about = read("src/pages/About.tsx");
const categoriesPage = read("src/pages/Categories.tsx");
const data = read("src/data/site.ts");
const layout = read("src/components/Layout.tsx");
const register = read("src/pages/Register.tsx");
const videoBento = read("src/components/VideoBento.tsx");
const gallery = read("src/components/ui/image-gallery.tsx");
const testimonials = read("src/components/ui/testimonials-6.tsx");
const juniorCampaign = read("src/components/JuniorIndiaCampaign.tsx");
const styles = read("src/index.css");
const seasonFourVideo = resolve(root, "public/missmrs-assets/videos/season-4-reveal.mp4");
const seasonFourPoster = resolve(root, "public/missmrs-assets/videos/season-4-reveal-poster.jpg");

assert.ok(existsSync(seasonFourVideo), "Season 4 reveal video must exist");
assert.ok(existsSync(seasonFourPoster), "Season 4 reveal poster must exist");
assert.ok(statSync(seasonFourVideo).size > 0, "Season 4 reveal video must not be empty");
assert.ok(statSync(seasonFourPoster).size > 0, "Season 4 reveal poster must not be empty");

assert.match(data, /label:\s*"Finale guests"/, "homepage statistics should consistently say Finale guests");
assert.match(home, /Register interest for the next season/, "homepage should use the next-season registration CTA");
assert.match(about, /Who we are · What we do/, "the About page should clearly introduce the organisation and its work");
assert.match(about, /founded in Nagpur by Zoya and Siraj Sheikh/, "the About bio should identify the founders using established site facts");
assert.match(about, /mentoring, grooming, runway, styling, voice, interview and portfolio preparation/, "the About bio should explain how the platform prepares applicants");
assert.match(home, /navigate\("junior-india"\)[\s\S]*?Junior India Live Voting/, "homepage hero should expose Junior India live voting");
assert.doesNotMatch(layout, /Season 3 auditions are complete|Register interest for the next season|inset-x-0 bottom-0 z-40/, "the global sticky registration banner should stay removed");
assert.doesNotMatch(layout, /pb-20 sm:pb-0/, "pages should not reserve mobile space for the removed sticky banner");
assert.doesNotMatch(home, /useCountdown|auditionCities|Apply for auditions|Until finale week|October 2026/, "homepage should not expose stale audition details");
assert.doesNotMatch(layout, /useCountdown|days to finale week|still being reviewed/, "layout should not expose a stale countdown or review status");
assert.doesNotMatch(register, /3 October 2026|10 October 2026|17 October 2026|slot confirmation/, "interest form should not expose expired dates or slots");
assert.match(register, /Preferred city/, "interest form should collect a city preference without an expired audition date");
assert.doesNotMatch(home, /latestNews|YouTubePreview|homepageSponsors|tickets/, "secondary news, sponsor and ticket content should live off the homepage");
assert.match(home, /TestimonialsSection/, "homepage should include the animated testimonial section");
assert.match(juniorCampaign, /junior-india-home\.mp4/, "Junior India campaign should use the existing launch film");
assert.doesNotMatch(juniorCampaign, /junior-campaign__play|Play the Junior India launch film|role="dialog"|createPortal/, "Junior India preview should not render a play overlay or unreachable dialog");
assert.match(juniorCampaign, /onExplore/, "Junior India campaign should preserve the dedicated page CTA");
assert.match(juniorCampaign, /dateTime="2026-11-22"/, "Junior India campaign should expose the event date semantically");
assert.match(juniorCampaign, /22 November 2026/, "Junior India campaign should highlight the confirmed event date");
assert.match(juniorCampaign, /junior-campaign__wordmark/, "Junior India campaign should use its oversized editorial wordmark");
assert.match(juniorCampaign, /useScroll/, "Junior India campaign should use restrained scroll-linked motion");
assert.match(juniorCampaign, /useTransform/, "Junior India campaign should transform editorial layers independently");
assert.match(styles, /\.junior-campaign\s*\{/, "Junior India campaign should have a dedicated full-width stage");
assert.match(styles, /\.junior-campaign__film\s*\{/, "Junior India campaign film should have an editorial focal layout");
assert.doesNotMatch(styles, /\.junior-campaign__play|\.junior-film-dialog/, "removed Junior India player controls should not leave dead CSS");
assert.match(styles, /@media\s*\(min-width:\s*1025px\)[\s\S]*?\.junior-campaign__film\s*\{[\s\S]*?grid-column:\s*7\s*\/\s*12;[\s\S]*?width:\s*min\(100%,\s*480px\);[\s\S]*?height:\s*640px;[\s\S]*?max-height:\s*640px;[\s\S]*?aspect-ratio:\s*auto;/, "desktop Junior India film should widen without changing its 640px height");
assert.match(styles, /@media\s*\(max-width:\s*767px\)[\s\S]*?\.junior-campaign/, "Junior India campaign should adapt for mobile");
assert.match(styles, /@media\s*\(max-width:\s*767px\)[\s\S]*?\.junior-campaign__film\s*\{[\s\S]*?width:\s*min\(88vw,\s*390px\);/, "Junior India film should retain its existing mobile width");
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
assert.match(categoriesPage, /text-center[\s\S]*Three stages\. One place to find yours\.[\s\S]*md:grid-cols-2 xl:grid-cols-3/, "the centered category title should lead directly into the three-card grid");
assert.doesNotMatch(categoriesPage, /min-h-\[clamp\(460px,62svh,680px\)\]/, "the categories page should not keep a separate oversized hero");
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
  let seasonFourModule;
  try {
    seasonFourModule = await vite.ssrLoadModule("/src/components/SeasonFourReveal.tsx");
  } catch (error) {
    assert.fail(`Season 4 reveal component should load: ${error instanceof Error ? error.message : String(error)}`);
  }

  const { SeasonFourRevealContent, syncRevealPlayback } = seasonFourModule;
  const registrations = [];
  const reveal = createElement(SeasonFourRevealContent, {
    onRegister: () => registrations.push("register"),
    shouldReduceMotion: false,
    videoRef: { current: null },
  });
  const revealHtml = renderToStaticMarkup(reveal);
  const revealButtons = collectButtons(SeasonFourRevealContent({
    onRegister: () => registrations.push("register"),
    shouldReduceMotion: false,
    videoRef: { current: null },
  }));
  const registerButton = revealButtons.find((button) => button.props["data-season-four-register"] === "true");

  assert.match(revealHtml, /Season 4 Reveal/, "Season 4 reveal should identify the announcement");
  assert.match(revealHtml, /The crown returns to Nagpur\./, "Season 4 reveal should lead with the approved headline");
  assert.match(revealHtml, /21st, 22nd &amp; 23rd November 2026/, "Season 4 reveal should show the confirmed dates");
  assert.doesNotMatch(
    revealHtml,
    /datetime="2026-11-21"/i,
    "the three-day Season 4 range should not be represented as a single date",
  );
  assert.match(revealHtml, /BTP Farms And Resorts, Nagpur/, "Season 4 reveal should show the confirmed venue");
  assert.match(revealHtml, /season-4-reveal\.mp4/, "Season 4 reveal should use the supplied reel");
  assert.match(revealHtml, /season-4-reveal-poster\.jpg/, "Season 4 reveal should use the generated poster");
  assert.match(revealHtml, /autoplay=""/, "motion-safe Season 4 reveal should autoplay");
  assert.match(revealHtml, /muted=""/, "Season 4 reveal should stay muted");
  assert.match(revealHtml, /loop=""/, "Season 4 reveal should loop");
  assert.match(revealHtml, /playsinline=""/, "Season 4 reveal should play inline");
  assert.ok(registerButton, "Season 4 reveal should expose one registration action");
  registerButton.props.onClick();
  assert.deepEqual(registrations, ["register"], "Season 4 registration action should call its callback once");

  const reducedMotionHtml = renderToStaticMarkup(createElement(SeasonFourRevealContent, {
    onRegister: () => undefined,
    shouldReduceMotion: true,
    videoRef: { current: null },
  }));
  assert.doesNotMatch(reducedMotionHtml, /autoplay=""/, "reduced-motion visitors should not receive forced autoplay");
  assert.match(reducedMotionHtml, /controls=""/, "reduced-motion visitors should receive manual video controls");

  const playback = {
    playCalls: 0,
    pauseCalls: 0,
    play() {
      this.playCalls += 1;
      return Promise.resolve();
    },
    pause() {
      this.pauseCalls += 1;
    },
  };
  syncRevealPlayback(playback, false);
  await syncRevealPlayback(playback, true);
  assert.deepEqual(
    { playCalls: playback.playCalls, pauseCalls: playback.pauseCalls },
    { playCalls: 1, pauseCalls: 1 },
    "Season 4 reel playback should pause offscreen and resume onscreen",
  );

  const { Home, HomeCategorySelector } = await vite.ssrLoadModule("/src/pages/Home.tsx");
  const renderedHome = renderToStaticMarkup(createElement(Home, { navigate: () => undefined }));
  const juniorCampaignIndex = renderedHome.indexOf("data-junior-india-campaign");
  const seasonFourIndex = renderedHome.indexOf("data-season-four-reveal");
  const registrationInterestIndex = renderedHome.indexOf("The next season starts with your interest.");

  assert.equal(
    (renderedHome.match(/data-home-section="true"/g) ?? []).length,
    11,
    "homepage should render eleven distinct content sections",
  );
  assert.equal(
    (renderedHome.match(/data-season-four-reveal="true"/g) ?? []).length,
    1,
    "homepage should render one Season 4 reveal",
  );
  assert.ok(
    juniorCampaignIndex >= 0 && seasonFourIndex > juniorCampaignIndex && registrationInterestIndex > seasonFourIndex,
    "Season 4 reveal should appear after Junior India and before registration interest",
  );

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
