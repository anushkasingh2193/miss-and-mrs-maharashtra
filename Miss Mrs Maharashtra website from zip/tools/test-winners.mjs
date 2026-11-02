import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const expectedSeasonPortraits = [
  [
    "/missmrs-assets/season-1-winners/dr-rasika-raj.webp",
    "/missmrs-assets/season-1-winners/manisha-tamaskar.webp",
    "/missmrs-assets/season-1-winners/rashmi-revatkar.webp",
  ],
  [
    "/missmrs-assets/season-2-winners/mrs-ashwini-rajput.webp",
    "/missmrs-assets/season-2-winners/tripti-apreja.webp",
    "/missmrs-assets/season-2-winners/anita-nandanwar.webp",
  ],
  [
    "/missmrs-assets/season-3-winners/mrs-maharashtra-winner.jpg",
    "/missmrs-assets/season-3-winners/mrs-maharashtra-first-runner-up.jpg",
    "/missmrs-assets/season-3-winners/mrs-maharashtra-second-runner-up.jpg",
  ],
  [
    "/missmrs-assets/season-1-winners/tejashree-mohite.webp",
    "/missmrs-assets/season-1-winners/poonam-badwaik.webp",
    "/missmrs-assets/season-1-winners/khushi-chhabra.webp",
  ],
  [
    "/missmrs-assets/season-2-winners/khushi-chaware.webp",
    "/missmrs-assets/season-2-winners/trupti-wajurkar.webp",
    "/missmrs-assets/season-2-winners/sonali-bisen.webp",
  ],
  [
    "/missmrs-assets/season-3-winners/miss-supraglobal-india.jpg",
    "/missmrs-assets/season-3-winners/miss-maharashtra-first-runner-up.jpg",
    "/missmrs-assets/season-3-winners/miss-maharashtra-second-runner-up.jpg",
  ],
  [
    "/missmrs-assets/website-zip-portrait/MS/winners/TS100950.jpg",
    "/missmrs-assets/website-zip-portrait/MS/winners/TS102272.jpg",
    "/missmrs-assets/website-zip-portrait/MS/winners/TS102292.jpg",
    "/missmrs-assets/website-zip-portrait/MS/winners/TS102311.jpg",
    "/missmrs-assets/website-zip-portrait/MS/winners/TS102338.jpg",
  ],
];

const vite = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true },
});

try {
  const [{ Winners }, { winnerSeasonGroups }] = await Promise.all([
    vite.ssrLoadModule("/src/pages/Winners.tsx"),
    vite.ssrLoadModule("/src/data/site.ts"),
  ]);

  assert.deepEqual(
    winnerSeasonGroups.map((season) => season.images),
    expectedSeasonPortraits,
    "each season should expose one curated portrait per person",
  );

  assert.deepEqual(
    ["Miss Maharashtra", "Mrs. Maharashtra"].map((category) => winnerSeasonGroups.filter((season) => season.eyebrow === category).length),
    [3, 3],
    "Miss and Mrs categories should expose their own season collections",
  );

  const seasonOneGroups = winnerSeasonGroups.filter((season) => season.title === "Season 1 Winners");
  assert.deepEqual(
    seasonOneGroups.map((season) => season.names),
    [
      ["Dr. Rasika Raj", "Manisha Tamaskar", "Rashmi Revatkar"],
      ["Tejashree Mohite", "Poonam Badwaik", "Khushi Chhabra"],
    ],
    "Season 1 should use the supplied winner names in podium order",
  );
  assert.deepEqual(
    seasonOneGroups.map((season) => season.placements),
    [
      ["Winner", "1st Runner-Up", "2nd Runner-Up"],
      ["Winner", "1st Runner-Up", "2nd Runner-Up"],
    ],
    "Season 1 should label every titleholder placement",
  );

  const seasonTwoGroups = winnerSeasonGroups.filter((season) => season.title === "Season 2 Winners");
  assert.deepEqual(
    seasonTwoGroups.map((season) => season.names),
    [
      ["Mrs. Ashwini Rajput", "Tripti Apreja", "Anita Nandanwar"],
      ["Khushi Chaware", "Trupti Wajurkar", "Sonali Bisen"],
    ],
    "Season 2 should use the supplied winner names in podium order",
  );
  assert.deepEqual(
    seasonTwoGroups.map((season) => season.placements),
    [
      ["Winner", "1st Runner-Up", "2nd Runner-Up"],
      ["Winner", "1st Runner-Up", "2nd Runner-Up"],
    ],
    "Season 2 should label every titleholder placement",
  );

  const seasonThreeGroups = winnerSeasonGroups.filter((season) => season.title === "Season 3 Winners");
  assert.deepEqual(
    seasonThreeGroups.map((season) => season.names),
    [
      ["Sneha Kalbhor", "Apoorva Wandile", "Archana Kamble"],
      ["Shreyashi Walde", "Shruti Mishra", "Diksha Zade"],
    ],
    "Season 3 should use the confirmed winner names in podium order",
  );
  assert.deepEqual(
    seasonThreeGroups.map((season) => season.placements),
    [
      ["Winner", "1st Runner-Up", "2nd Runner-Up"],
      ["Winner", "1st Runner-Up", "2nd Runner-Up"],
    ],
    "Season 3 should label every titleholder placement",
  );

  const html = renderToStaticMarkup(createElement(Winners, { navigate: () => {} }));

  assert.equal((html.match(/data-winner-category-tab="true"/g) ?? []).length, 2, "two winner category tabs should render");
  assert.equal((html.match(/data-winner-season-tab="true"/g) ?? []).length, 3, "the default Miss category should render three season tabs");
  assert.equal((html.match(/data-winner-portrait="true"/g) ?? []).length, 3, "the default Miss season should render three unique portraits");
  assert.match(html, /aria-label="Winner categories"/, "Miss and Mrs controls should be exposed as a category tab list");
  assert.match(html, /aria-label="Miss Maharashtra seasons"/, "season controls should follow the active category");
  assert.match(html, /id="winner-season-panel"/, "the active portrait grid should be exposed as the tab panel");
  assert.match(html, /Tejashree Mohite/, "the default Miss Season 1 grid should show the winner name");
  assert.match(html, /Poonam Badwaik/, "the default Miss Season 1 grid should show the first runner-up name");
  assert.match(html, /Khushi Chhabra/, "the default Miss Season 1 grid should show the second runner-up name");
  assert.match(html, /1st Runner-Up/, "winner cards should show placement labels");
  assert.match(html, /data-winners-hero="editorial-split"/, "winners page should use the approved editorial split hero");
  assert.match(html, /Hall of Fame/, "winners hero should introduce the titleholder archive");
  assert.match(html, /Winners Gallery/, "winners hero should retain the gallery title");
  assert.equal(
    (html.match(/winners-hero-lineup\.jpg/g) ?? []).length,
    1,
    "winners hero should render one clean lineup photograph without a duplicated backdrop",
  );
  assert.ok(
    html.indexOf("Winners Gallery") < html.indexOf("winners-hero-lineup.jpg"),
    "hero copy should precede the lineup photograph in the mobile reading order",
  );
  assert.doesNotMatch(html, /data-winners-hero="full-bleed"/, "the former layered full-bleed hero should not render");
  assert.doesNotMatch(html, /Miss Supraglobal/, "the Maharashtra category tabs should not mix in the companion crown pathway");
  assert.doesNotMatch(html, /View full season|Featured titleholders|M&amp;M gallery|Featured frame/, "removed archive sections should not render");

  console.log("Winners gallery test passed: separate Miss and Mrs tabs with category-specific seasons.");
} finally {
  await vite.close();
}
