import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const vite = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true },
});

try {
  const juniorModule = await vite.ssrLoadModule("/src/pages/JuniorIndia.tsx").catch(() => null);
  assert.ok(juniorModule, "Junior India should have a dedicated page module");

  const [{ pages }, { navItems }] = await Promise.all([
    vite.ssrLoadModule("/src/App.tsx"),
    vite.ssrLoadModule("/src/data/site.ts"),
  ]);

  const { JuniorIndia } = juniorModule;
  assert.equal(pages["junior-india"], JuniorIndia, "the Junior India navigation target should resolve to its page");
  assert.deepEqual(
    navItems.find((item) => item.key === "junior-india"),
    { key: "junior-india", label: "Junior India" },
    "main navigation should expose the Junior India title",
  );
  const emptyHtml = renderToStaticMarkup(createElement(JuniorIndia, { navigate: () => {} }));
  assert.match(emptyHtml, /<h1[^>]*>Meet Junior India Contestants<\/h1>/, "the page should show the centered contestant heading");
  assert.doesNotMatch(emptyHtml, /A new title begins/, "the previous hero eyebrow should be removed");
  assert.doesNotMatch(emptyHtml, /Contestant profiles are coming soon/, "the placeholder announcement should be removed");
  assert.doesNotMatch(emptyHtml, /<img|<a|<p/, "the page should not render old imagery, calls to action, or supporting copy");
  assert.equal(
    (emptyHtml.match(/data-junior-contestant-card="true"/g) ?? []).length,
    0,
    "the page should not render contestant cards before profiles are supplied",
  );

  console.log("Junior India test passed: the page is reduced to its centered contestant heading.");
} finally {
  await vite.close();
}
