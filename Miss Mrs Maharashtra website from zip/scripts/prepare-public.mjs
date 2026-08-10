import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const source = join(projectRoot, "public");
const target = join(projectRoot, ".vercel-public");

const excludedDirectories = new Set([
  "missmrs-assets/website-zip",
  "missmrs-assets/website-zip-optimized",
]);

const toPosix = (path) => path.replaceAll("\\", "/");

function copyDirectory(from, to) {
  mkdirSync(to, { recursive: true });

  for (const entry of readdirSync(from)) {
    const sourcePath = join(from, entry);
    const relativePath = toPosix(relative(source, sourcePath));

    if (statSync(sourcePath).isDirectory()) {
      if (excludedDirectories.has(relativePath)) {
        continue;
      }

      copyDirectory(sourcePath, join(to, entry));
      continue;
    }

    cpSync(sourcePath, join(to, basename(sourcePath)));
  }
}

if (!existsSync(source)) {
  throw new Error(`Missing public directory: ${source}`);
}

rmSync(target, { recursive: true, force: true });
copyDirectory(source, target);
