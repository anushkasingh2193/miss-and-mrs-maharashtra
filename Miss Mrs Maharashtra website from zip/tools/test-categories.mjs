import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const vite = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true },
});

try {
  const { Categories } = await vite.ssrLoadModule("/src/pages/Categories.tsx");
  const html = renderToStaticMarkup(createElement(Categories, { navigate: () => {} }));
  const source = readFileSync(new URL("../src/pages/Categories.tsx", import.meta.url), "utf8");

  assert.equal(
    (html.match(/data-category-card="true"/g) ?? []).length,
    3,
    "categories should render exactly three equally structured category cards",
  );
  assert.match(html, /3 distinct categories/, "the hero should introduce all three available categories");
  assert.match(html, /22 November 2026/, "Junior India should show its event date");
  assert.match(
    html,
    /\/missmrs-assets\/junior-india\/junior-india-runway-hd\.png/,
    "Junior India should use the enhanced supplied runway picture",
  );
  assert.match(html, /Adult title comparison/, "the comparison table should be scoped to the adult titles");
  assert.match(html, /Miss &amp; Mrs\. title scoring/, "the scoring section should be scoped to Miss and Mrs. titles");
  assert.doesNotMatch(html, /data-category-section="junior-india"/, "Junior India should not remain in a separate oversized panel");
  assert.doesNotMatch(html, /2 title categories/, "the old two-category proof point should be removed");
  assert.match(source, /navigate\("register"\)/, "adult category cards should navigate to registration");
  assert.match(source, /navigate\("junior-india"\)/, "the Junior India card should navigate to its dedicated page");

  console.log("Categories test passed: the Equal Trio selector presents all three categories with correct routes and scoped details.");
} finally {
  await vite.close();
}
