import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const clientRoot = resolve(projectRoot, "dist/client");
const outputRoot = resolve(projectRoot, "site");

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(clientRoot, outputRoot, { recursive: true });

const { default: worker } = await import(resolve(projectRoot, "dist/server/index.js"));
const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Could not render the home page: ${response.status}`);
}

let html = await response.text();
for (const assetPath of [
  "/assets/",
  "/favicon.svg",
  "/file.svg",
  "/globe.svg",
  "/og.png",
  "/window.svg",
]) {
  html = html.replaceAll(`"${assetPath}`, `".${assetPath}`);
}
html = html.replaceAll(
  "https://axis-global-observatory.ghtjd10855.chatgpt.site",
  "https://hosungseo.github.io/axis-global-observatory",
);

await writeFile(resolve(outputRoot, "index.html"), html);
await writeFile(resolve(outputRoot, "404.html"), html);
await writeFile(resolve(outputRoot, ".nojekyll"), "");

console.log(`Exported GitHub Pages site to ${outputRoot}`);
