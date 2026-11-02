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
  const { Categories } = await vite.ssrLoadModule("/src/pages/Categories.tsx");
  const html = renderToStaticMarkup(createElement(Categories, { navigate: () => {} }));

  assert.match(html, /Junior India/, "categories should include a separate Junior India event section");
  assert.match(html, /22 November 2026/, "Junior India should show its event date");
  assert.match(
    html,
    /\/missmrs-assets\/junior-india\/junior-india-runway-hd\.png/,
    "Junior India should use the enhanced supplied runway picture",
  );
  assert.match(
    html,
    /data-category-section="junior-india"/,
    "Junior India should remain separate from the Miss and Mrs. category comparison",
  );

  console.log("Categories test passed: the separate Junior India event section is present with its date and supplied image.");
} finally {
  await vite.close();
}
