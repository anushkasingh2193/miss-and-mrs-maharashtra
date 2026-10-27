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
  const { Press } = await vite.ssrLoadModule("/src/pages/Press.tsx");
  const html = renderToStaticMarkup(createElement(Press, { navigate: () => {} }));

  assert.match(html, /data-press-hero="editorial"/, "press page should use the editorial split hero");
  assert.match(html, /Newsroom\./, "press hero should use a concise newsroom heading");
  assert.match(html, /Official announcements, contestant stories and verified coverage/, "press hero copy should stay concise");
  assert.match(html, /href="#latest-news"/, "press hero should link directly to the latest stories");
  assert.match(html, /id="latest-news"/, "the latest-news target should remain available");
  assert.doesNotMatch(html, /News &amp; coverage\./, "the oversized legacy heading should be removed");

  console.log("Press page test passed: compact editorial hero with direct newsroom navigation.");
} finally {
  await vite.close();
}
