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
const WORKCHANGE = ["자동화", "증강", "셀프서비스화", "재배치", "기반화"];
const SUBTHEMES = [
  "워크스페이스", "게이트웨이", "인프라", "AI조달", "개발환경", "공통기반",
  "레지스트리", "규칙코드화", "오픈데이터", "상담·챗봇", "신청·원스톱", "서비스에이전트",
  "재난·응급", "규제·집행", "지역·교육", "인재확보·육성", "내부BPR", "데이터기반관리",
  "AI원칙·거버넌스", "감리·예산", "주권·자율성",
];

function keysFor(values) {
  const union = values.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const re = new RegExp(`"([a-z0-9-]+)":\\s*"(${union})"`, "g");
  return new Set([...src.matchAll(re)].map((x) => x[1]));
}

const themeKeys = keysFor(THEMES);
const workKeys = keysFor(WORKCHANGE);
const subKeys = keysFor(SUBTHEMES);

const errors = [];
const seen = new Set();
for (const c of cases) {
  if (seen.has(c.id)) errors.push(`중복 id: ${c.id}`);
  seen.add(c.id);
}
for (const c of cases) {
  if (!themeKeys.has(c.id)) errors.push(`theme 누락: ${c.id}`);
  if (!workKeys.has(c.id)) errors.push(`workChange 누락: ${c.id}`);
  if (!subKeys.has(c.id)) errors.push(`subTheme 누락: ${c.id}`);
}
for (const k of themeKeys) {
  if (!seen.has(k)) errors.push(`orphan theme 키: ${k}`);
}

console.log(
  `검사: 사례 ${cases.length}건 · theme ${themeKeys.size} · workChange ${workKeys.size} · subTheme ${subKeys.size}`,
);
if (errors.length) {
  console.error("❌ 데이터 무결성 오류:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("✅ 데이터 무결성 통과");
