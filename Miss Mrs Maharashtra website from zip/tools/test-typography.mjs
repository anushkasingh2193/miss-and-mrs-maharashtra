import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [styles, tailwindConfig] = await Promise.all([
  readFile(new URL("../src/index.css", import.meta.url), "utf8"),
  readFile(new URL("../tailwind.config.ts", import.meta.url), "utf8"),
]);

assert.match(styles, /family=Manrope:/, "the global stylesheet should load Manrope for interface and body text");
assert.match(styles, /family=Playfair\+Display:/, "the global stylesheet should load Playfair Display for editorial headings");
assert.match(styles, /font-family:\s*"Manrope"/, "the document body should use Manrope");
assert.doesNotMatch(styles, /Bodoni Moda|Jost/, "the previous font families should not remain in global styles");
assert.match(tailwindConfig, /display:\s*\["Playfair Display"/, "the display font token should use Playfair Display");
assert.match(tailwindConfig, /sans:\s*\["Manrope"/, "the sans font token should use Manrope");

console.log("Typography test passed: Playfair Display and Manrope cover the global font roles.");
