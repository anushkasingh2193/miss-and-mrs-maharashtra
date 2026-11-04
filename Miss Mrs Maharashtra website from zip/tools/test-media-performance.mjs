import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = resolve(import.meta.dirname, "..");
const publicFile = (path) => resolve(root, "public", path.replace(/^\//, ""));
const sizeInMb = (path) => statSync(publicFile(path)).size / 1024 / 1024;

const mediaBudgets = [
  ["/missmrs-assets/videos/contestants-runway-hero.mp4", 5],
  ["/missmrs-assets/videos/junior-india-home.mp4", 3],
  ["/missmrs-assets/videos/season-4-reveal.mp4", 3],
  ["/missmrs-assets/junior-india/junior-india-runway-hd.webp", 0.7],
  ["/missmrs-assets/featured/newsroom-titleholders-cutout.webp", 0.7],
  ["/missmrs-assets/mentor/dr-girish-chabrani-confirmed.webp", 0.7],
  ["/missmrs-assets/mentor/dr-anshul-jain-confirmed.webp", 0.7],
  ["/missmrs-assets/mentor/soniya-khatri-confirmed.webp", 0.7],
];

for (const [path, maxMb] of mediaBudgets) {
  assert.ok(existsSync(publicFile(path)), `optimized media must exist: ${path}`);
  assert.ok(
    sizeInMb(path) <= maxMb,
    `${path} must stay at or below ${maxMb} MB (received ${sizeInMb(path).toFixed(2)} MB)`,
  );
}

const vite = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true },
});

try {
  const [{ JuniorIndiaCampaignContent }, { SeasonFourRevealContent }] = await Promise.all([
    vite.ssrLoadModule("/src/components/JuniorIndiaCampaign.tsx"),
    vite.ssrLoadModule("/src/components/SeasonFourReveal.tsx"),
  ]);

  const juniorHtml = renderToStaticMarkup(createElement(JuniorIndiaCampaignContent, {
    onExplore: () => undefined,
    shouldReduceMotion: false,
    videoRef: { current: null },
    isVideoReady: false,
  }));
  const seasonHtml = renderToStaticMarkup(createElement(SeasonFourRevealContent, {
    onRegister: () => undefined,
    shouldReduceMotion: false,
    videoRef: { current: null },
    isVideoReady: false,
  }));

  for (const [label, html] of [["Junior India", juniorHtml], ["Season 4", seasonHtml]]) {
    assert.doesNotMatch(html, /autoplay=""/, `${label} reel must not request autoplay before it nears the viewport`);
    assert.doesNotMatch(html, /<source[^>]+src=/, `${label} reel source must stay detached before it nears the viewport`);
    assert.match(html, /preload="none"/, `${label} reel must avoid offscreen metadata downloads`);
  }
} finally {
  await vite.close();
}

console.log("Media performance budgets and deferred video loading checks passed.");
