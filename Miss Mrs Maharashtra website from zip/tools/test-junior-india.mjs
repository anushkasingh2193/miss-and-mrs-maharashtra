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

  const [{ pages }, { navItems, juniorIndiaContestants }] = await Promise.all([
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
  assert.deepEqual(juniorIndiaContestants, [], "the contestant roster should remain empty until profiles are supplied");

  const emptyHtml = renderToStaticMarkup(createElement(JuniorIndia, { navigate: () => {} }));
  assert.match(emptyHtml, /Junior India/, "the page should introduce the Junior India title");
  assert.match(emptyHtml, /Meet the contestants/, "the page should reserve a contestant section");
  assert.match(emptyHtml, /Contestant profiles are coming soon/, "an empty roster should render the announcement state");
  assert.equal(
    (emptyHtml.match(/data-junior-contestant-card="true"/g) ?? []).length,
    0,
    "an empty roster should not render blank contestant cards",
  );

  juniorIndiaContestants.push({ name: "Sample Contestant", image: "/sample-contestant.jpg" });
  try {
    const populatedHtml = renderToStaticMarkup(createElement(JuniorIndia, { navigate: () => {} }));
    assert.equal(
      (populatedHtml.match(/data-junior-contestant-card="true"/g) ?? []).length,
      1,
      "one future contestant record should render one portrait card",
    );
    assert.match(populatedHtml, /Sample Contestant/, "a contestant card should render its supplied name");
    assert.match(populatedHtml, /\/sample-contestant\.jpg/, "a contestant card should render its supplied portrait");
    assert.doesNotMatch(populatedHtml, /undefined/, "the optional descriptor should not be required");
    assert.doesNotMatch(populatedHtml, /Contestant profiles are coming soon/, "a populated roster should replace the empty announcement");
  } finally {
    juniorIndiaContestants.pop();
  }

  console.log("Junior India test passed: main navigation, empty announcement, and future contestant cards are ready.");
} finally {
  await vite.close();
}
