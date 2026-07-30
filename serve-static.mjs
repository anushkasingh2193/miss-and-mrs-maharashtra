import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(
  fileURLToPath(new URL(".", import.meta.url)),
  "Miss Mrs Maharashtra website",
  "design_handoff_pageant_website",
);
const defaultFile = "Miss & Mrs Maharashtra - Blush & Rose.dc.html";
const port = Number(process.env.PORT || 8080);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (url.pathname === "/") {
    res.writeHead(302, { Location: `/${encodeURIComponent(defaultFile)}` });
    res.end();
    return;
  }

  const decodedPath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const filePath = normalize(join(root, decodedPath));

  if (!filePath.startsWith(root) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": types[extname(filePath)] || "application/octet-stream" });
  createReadStream(filePath).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}/`);
});
