import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const expectedSeasonPortraits = [
  [
    "/missmrs-assets/website-zip-portrait/M&M/M&M s1 winners/AKAL3979.jpg",
    "/missmrs-assets/website-zip-portrait/M&M/M&M s1 winners/AKAL4002.jpg",
    "/missmrs-assets/website-zip-portrait/M&M/M&M s1 winners/DSC_6501.jpg",
    "/missmrs-assets/website-zip-portrait/M&M/M&M s1 winners/DSC_6792.jpg",
  ],
  [
    "/missmrs-assets/curated/sneha-kalbhor.jpg",
    "/missmrs-assets/curated/apoorva-shirbhate.jpg",
    "/missmrs-assets/curated/archana-kamble.jpg",
  ],
  [
    "/missmrs-assets/drive-mm/DSC00068.jpg",
    "/missmrs-assets/drive-mm/DSC00076.jpg",
    "/missmrs-assets/drive-mm/DSC00092.jpg",
    "/missmrs-assets/drive-mm/DSC00097.jpg",
  ],
  [
    "/missmrs-assets/website-zip-portrait/MIS/s2 Winners/navdeep.jpg",
    "/missmrs-assets/website-zip-portrait/MIS/s2 Winners/ZOHR2080.jpg",
    "/missmrs-assets/website-zip-portrait/MIS/s2 Winners/ZOHR2090.jpg",
  ],
  [
    "/missmrs-assets/website-zip-portrait/MIS/s3 winners/TS102124.jpg",
    "/missmrs-assets/website-zip-portrait/MIS/s3 winners/TS102129.jpg",
    "/missmrs-assets/website-zip-portrait/MIS/s3 winners/TS102142.jpg",
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
    [2, 3],
    "Miss and Mrs categories should expose their own season collections",
  );

  const html = renderToStaticMarkup(createElement(Winners, { navigate: () => {} }));

  assert.equal((html.match(/data-winner-category-tab="true"/g) ?? []).length, 2, "two winner category tabs should render");
  assert.equal((html.match(/data-winner-season-tab="true"/g) ?? []).length, 2, "the default Miss category should render two season tabs");
  assert.equal((html.match(/data-winner-portrait="true"/g) ?? []).length, 3, "the default Miss season should render three unique portraits");
  assert.match(html, /aria-label="Winner categories"/, "Miss and Mrs controls should be exposed as a category tab list");
  assert.match(html, /aria-label="Miss Maharashtra seasons"/, "season controls should follow the active category");
  assert.match(html, /id="winner-season-panel"/, "the active portrait grid should be exposed as the tab panel");
  assert.match(html, /data-winners-hero="full-bleed"/, "winners page should use one full-width photographic hero");
  assert.match(html, /Winners Gallery/, "winners hero should contain only the centered gallery title");
  assert.match(html, /newsroom-titleholders-cutout\.png/, "winners hero should reuse the transparent crowned-titleholder group");
  assert.doesNotMatch(html, /Crowned on stage\.|Hall of fame/, "the former split-hero labels should not render");
  assert.doesNotMatch(html, /Miss Supraglobal/, "the Maharashtra category tabs should not mix in the companion crown pathway");
  assert.doesNotMatch(html, /View full season|Featured titleholders|M&amp;M gallery|Featured frame/, "removed archive sections should not render");

  console.log("Winners gallery test passed: separate Miss and Mrs tabs with category-specific seasons.");
} finally {
  await vite.close();
}
