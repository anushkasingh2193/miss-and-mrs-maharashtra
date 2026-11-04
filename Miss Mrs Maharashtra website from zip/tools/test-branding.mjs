import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

const logoPath = resolve(root, "public/brand/miss-mrs-maharashtra-logo.jpg");
const markPath = resolve(root, "public/brand/miss-mrs-maharashtra-mark.jpg");
const faviconPath = resolve(root, "public/favicon.png");
const faviconIcoPath = resolve(root, "public/favicon.ico");
const touchIconPath = resolve(root, "public/apple-touch-icon.png");

assert.ok(!existsSync(logoPath), "the full hero logo asset should be removed when no longer displayed");
assert.ok(existsSync(markPath), "a compact logo mark should be available for shared navigation branding");
assert.ok(existsSync(faviconPath), "a PNG favicon should be available at the public root");
assert.ok(existsSync(faviconIcoPath), "an ICO favicon fallback should be available at the public root");
assert.ok(existsSync(touchIconPath), "a dedicated Apple touch icon should be available at the public root");

const favicon = readFileSync(faviconPath);
assert.equal(favicon.toString("ascii", 1, 4), "PNG", "favicon should be a valid PNG image");
const width = favicon.readUInt32BE(16);
const height = favicon.readUInt32BE(20);
assert.equal(width, height, "favicon should be square");
assert.equal(width, 64, "favicon should be optimized to 64px");

const touchIcon = readFileSync(touchIconPath);
assert.equal(touchIcon.readUInt32BE(16), 180, "touch icon should be 180px wide");
assert.equal(touchIcon.readUInt32BE(20), 180, "touch icon should be 180px tall");

const index = read("index.html");
const home = read("src/pages/Home.tsx");
const layout = read("src/components/Layout.tsx");

assert.match(index, /rel="icon"[^>]+href="\/favicon\.png"/, "document metadata should link the favicon");
assert.match(index, /rel="shortcut icon"[^>]+href="\/favicon\.ico"/, "document metadata should link the ICO fallback");
assert.match(index, /rel="apple-touch-icon"[^>]+href="\/apple-touch-icon\.png"/, "document metadata should link the dedicated touch icon");
assert.doesNotMatch(home, /miss-mrs-maharashtra-logo\.jpg|homepage-brand-logo/, "homepage hero should not display the large centered logo");
assert.equal((layout.match(/miss-mrs-maharashtra-mark\.jpg/g) || []).length, 2, "header and footer should both display the optimized compact logo mark");

console.log("Brand logo and favicon checks passed.");
