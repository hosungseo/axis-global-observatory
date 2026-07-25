// 데이터 무결성 린트 — 사례 id 중복, 정부 사례의 theme 누락, orphan theme 키를 잡는다.
// 실행: npm run check:data  (CI에서 실패하면 빌드 차단)

import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = await readFile(resolve(root, "app/page.tsx"), "utf-8");

const THEMES = [
  "공통 기반",
  "조달·개발",
  "데이터·규칙",
  "대민 서비스",
  "현장·집행",
  "인재·업무개혁",
  "거버넌스·주권",
];

// CaseStudy 객체: `id: "..."`(따옴표 없는 키) + 뒤따르는 group
const cases = [];
const caseRe = /\bid:\s*"([^"]+)"[\s\S]*?\bgroup:\s*"(정부|민간)"/g;
let m;
while ((m = caseRe.exec(src)) !== null) cases.push({ id: m[1], group: m[2] });

// CASE_THEME 키: `"kebab-id": "테마"`(따옴표 있는 키)
const themeUnion = THEMES.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
const themeRe = new RegExp(`"([a-z0-9-]+)":\\s*"(${themeUnion})"`, "g");
const themeKeys = new Set([...src.matchAll(themeRe)].map((x) => x[1]));

const errors = [];
const seen = new Set();
for (const c of cases) {
  if (seen.has(c.id)) errors.push(`중복 id: ${c.id}`);
  seen.add(c.id);
}
for (const c of cases) {
  if (c.group === "정부" && !themeKeys.has(c.id)) errors.push(`theme 누락(정부 사례): ${c.id}`);
}
for (const k of themeKeys) {
  if (!seen.has(k)) errors.push(`orphan theme 키(존재하지 않는 사례): ${k}`);
}

console.log(`검사: 사례 ${cases.length}건 (정부 ${cases.filter((c) => c.group === "정부").length}), theme 키 ${themeKeys.size}개`);
if (errors.length) {
  console.error("❌ 데이터 무결성 오류:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("✅ 데이터 무결성 통과");
