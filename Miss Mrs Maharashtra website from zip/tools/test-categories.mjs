import assert from "node:assert/strict";
import { isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

function elementText(node) {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(elementText).join("");
  if (isValidElement(node)) return elementText(node.props.children);
  return "";
}

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
  const { Categories } = await vite.ssrLoadModule("/src/pages/Categories.tsx");
  const navigations = [];
  const page = Categories({ navigate: (target) => navigations.push(target) });
  const html = renderToStaticMarkup(page);

  assert.equal(
    (html.match(/data-category-card="true"/g) ?? []).length,
    3,
    "categories should render exactly three equally structured category cards",
  );
  assert.equal(
    (html.match(/Three stages\. One place to find yours\./g) ?? []).length,
    1,
    "the categories page should keep one concise centered heading",
  );
  assert.ok(
    html.indexOf("Three stages. One place to find yours.") < html.indexOf('data-category-card="true"'),
    "the concise heading should appear directly before the category cards",
  );
  assert.doesNotMatch(
    html,
    /Compare each category|3 distinct categories|Separate pathways|One confident stage|Choose your category|Every stage, clearly presented/,
    "the removed category intro copy, proof points, and actions should stay absent",
  );
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

  const categoryButtons = collectButtons(page).filter((button) => /^(Apply for|Explore)/.test(elementText(button)));
  assert.equal(categoryButtons.length, 3, "each category card should expose one clear action");
  categoryButtons.forEach((button) => button.props.onClick());
  assert.deepEqual(
    navigations,
    ["register", "register", "junior-india"],
    "Miss and Mrs. should open registration while Junior India opens its dedicated page",
  );

  console.log("Categories test passed: the Equal Trio selector presents all three categories with correct routes and scoped details.");
} finally {
  await vite.close();
}
