// 링크 무결성 체커 — 모든 사례 원문 URL이 살아있는지 점검한다.
// 실행: npm run check:links   (CI 주 1회 + 수동)
// 정부 사이트는 HEAD를 막는 경우가 많아 GET + User-Agent + 재시도로 확인한다.

import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = await readFile(resolve(root, "app/page.tsx"), "utf-8");

const urls = [...new Set([...src.matchAll(/(?:url|href):\s*"(https?:\/\/[^"]+)"/g)].map((m) => m[1]))];
console.log(`점검 대상 URL: ${urls.length}개`);

const UA = "Mozilla/5.0 (compatible; axis-linkcheck/1.0)";

async function check(url) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 25000);
      const res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: { "User-Agent": UA },
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.ok || res.status === 403 || res.status === 405) return { url, ok: true, status: res.status };
      if (attempt === 1) return { url, ok: false, status: res.status };
    } catch (err) {
      if (attempt === 1) return { url, ok: false, status: `ERR ${err.name || err.message}` };
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  return { url, ok: false, status: "unknown" };
}

// 동시성 6으로 제한
const results = [];
const queue = [...urls];
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    results.push(await check(url));
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

const broken = results.filter((r) => !r.ok);
console.log(`\n정상 ${results.length - broken.length} / 전체 ${results.length}`);
if (broken.length) {
  console.error("\n❌ 깨진 링크:");
  for (const b of broken) console.error(`  [${b.status}] ${b.url}`);
  process.exit(1);
}
console.log("✅ 모든 원문 링크 정상");
