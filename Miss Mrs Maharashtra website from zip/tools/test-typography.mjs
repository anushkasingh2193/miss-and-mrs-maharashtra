import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [styles, tailwindConfig] = await Promise.all([
  readFile(new URL("../src/index.css", import.meta.url), "utf8"),
  readFile(new URL("../tailwind.config.ts", import.meta.url), "utf8"),
]);

assert.match(styles, /family=Manrope:/, "the global stylesheet should load Manrope for interface and body text");
assert.match(styles, /family=Cormorant\+Garamond:/, "the global stylesheet should load Cormorant Garamond for editorial headings");
assert.match(styles, /font-family:\s*"Manrope"/, "the document body should use Manrope");
assert.doesNotMatch(styles, /Playfair Display|Bodoni Moda|Jost/, "previous display font families should not remain in global styles");
assert.match(tailwindConfig, /display:\s*\["Cormorant Garamond"/, "the display font token should use Cormorant Garamond");
assert.match(tailwindConfig, /sans:\s*\["Manrope"/, "the sans font token should use Manrope");

console.log("Typography test passed: Cormorant Garamond and Manrope cover the global font roles.");
