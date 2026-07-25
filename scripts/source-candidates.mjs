// AXIS 후보 소싱 스크립트 — 한국 정부 AI 소식을 긁어와 CaseStudy '후보 초안'으로 출력한다.
//
// 목적: app/page.tsx 의 CASE_STUDIES 는 손으로 큐레이션하는 편집 콘텐츠다.
//       이 스크립트는 자동 발행이 아니라, 사람이 검토할 '후보'를 data/ 에 모아둔다.
//       (summary·insight·metric 은 사람이 원문을 읽고 채운다. 여기선 TODO 로 남긴다.)
//
// 검증된 라이브 소스 (2026-07 기준):
//   - 행안부 보도자료 게시판 BBSMSTR_000000000008 — 최신 보도자료, AXIS 한국 사례의 실제 출처
//   - (옵션) 네이버 뉴스 API — NAVER_CLIENT_ID / NAVER_CLIENT_SECRET 환경변수가 있을 때만
// 제외한 소스:
//   - KCISA e-브리핑 / 정책정보포털 API — 데이터가 2019~2021 로 정체돼 최신 소싱엔 부적합
//   - NIA(nia.or.kr) 보도자료 — 목록이 JS 로 렌더돼 정적 스크랩 불가(RSS 도 404).
//     추가하려면 headless 브라우저가 필요하다(이 무의존성 스크립트 범위 밖).
//
// 실행: npm run source:candidates
// 출력: data/candidates.json (초안 배열) + data/candidates.md (검토용 표)

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = resolve(projectRoot, "data");
const pagePath = resolve(projectRoot, "app/page.tsx");

const UA = "Mozilla/5.0 (compatible; axis-observatory-sourcing/1.0)";

// AI·디지털정부 주제로 좁히는 강한 키워드 (하나라도 걸려야 후보로 채택)
const AI_KEYWORDS = [
  "AI", "인공지능", "생성형", "에이전트", "LLM", "초거대",
  "디지털정부", "전자정부", "알고리즘", "자동화", "지능형",
  "마이데이터", "데이터 기반", "정부 실험실",
];

function isRelevant(text) {
  return AI_KEYWORDS.some((k) => text.toLowerCase().includes(k.toLowerCase()));
}

function matchedTags(text) {
  return AI_KEYWORDS.filter((k) => text.toLowerCase().includes(k.toLowerCase())).slice(0, 4);
}

async function fetchText(url, { retries = 3 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  throw new Error(`fetch 실패 (${url}): ${lastErr?.message ?? lastErr}`);
}

// 행안부 보도자료 게시판 목록을 긁어 최신 글을 파싱한다.
async function fetchMoisPressReleases() {
  const bbsId = "BBSMSTR_000000000008";
  const listUrl =
    `https://www.mois.go.kr/frt/bbs/type010/commonSelectBoardList.do?bbsId=${bbsId}`;
  const html = await fetchText(listUrl);

  const anchor =
    /fn_egov_inqire_notice\('(\d+)',\s*'BBSMSTR_000000000008'\);[^>]*>([\s\S]*?)<\/a>/g;
  const items = [];
  const seen = new Set();
  let m;
  while ((m = anchor.exec(html)) !== null) {
    const nttId = m[1];
    if (seen.has(nttId)) continue;
    seen.add(nttId);
    const title = stripTags(m[2]);
    if (!title) continue;
    // 앵커 뒤 300자에서 담당부서·등록일을 뽑는다: "... 인공지능정부정책과 2026.07.22. 조회수"
    const tail = stripTags(html.slice(m.index, m.index + 600));
    const meta = tail
      .slice(title.length)
      .match(/([가-힣·A-Za-z]+(?:과|관|부|팀|단|청|국|실|원))\s*(20\d{2})\.(\d{2})\.(\d{2})/);
    const dept = meta?.[1] ?? "";
    const date = meta ? `${meta[2]}.${meta[3]}` : "";
    items.push({
      nttId,
      title,
      agency: dept ? `행정안전부 ${dept}` : "행정안전부",
      date,
      url:
        `https://www.mois.go.kr/frt/bbs/type010/commonSelectBoardArticle.do` +
        `?bbsId=${bbsId}&nttId=${nttId}`,
      sourceLabel: "행안부 보도자료",
    });
  }
  return items;
}

// 네이버 뉴스 API (자격증명이 있을 때만). 정부 AI 관련 최신 기사.
async function fetchNaverNews() {
  const id = process.env.NAVER_CLIENT_ID;
  const secret = process.env.NAVER_CLIENT_SECRET;
  if (!id || !secret) return [];
  const queries = ["공공부문 인공지능", "정부 AI 행정", "디지털정부 인공지능"];
  const out = [];
  for (const q of queries) {
    const url =
      `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(q)}&display=10&sort=date`;
    try {
      const res = await fetch(url, {
        headers: {
          "X-Naver-Client-Id": id,
          "X-Naver-Client-Secret": secret,
          "User-Agent": UA,
        },
      });
      if (!res.ok) continue;
      const json = await res.json();
      for (const it of json.items ?? []) {
        out.push({
          nttId: "",
          title: stripTags(it.title),
          agency: "언론 보도",
          date: (it.pubDate ?? "").slice(0, 16),
          url: it.originallink || it.link,
          sourceLabel: `네이버뉴스(${q})`,
        });
      }
    } catch {
      // 개별 질의 실패는 건너뛴다
    }
  }
  return out;
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(s) {
  return s
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&nbsp;", " ");
}

// 이미 사이트에 실린 사례(url·nttId)를 읽어 중복 후보를 걸러낸다.
async function loadExisting() {
  const page = await readFile(pagePath, "utf-8");
  const urls = new Set([...page.matchAll(/url:\s*"([^"]+)"/g)].map((x) => x[1]));
  const nttIds = new Set([...page.matchAll(/nttId=(\d+)/g)].map((x) => x[1]));
  return { urls, nttIds };
}

function toDraftCase(item) {
  const text = `${item.title} ${item.agency}`;
  return {
    id: item.nttId ? `kr-mois-${item.nttId}` : `kr-news-${slug(item.title)}`,
    flag: "🇰🇷",
    country: "대한민국",
    region: "한국",
    scope: "중앙·연방",
    stage: "TODO(전략|실증|확산|운영)",
    date: item.date && /^\d{4}\.\d{2}/.test(item.date) ? item.date.slice(0, 7) : "",
    agency: item.agency,
    title: item.title,
    summary: "TODO(원문 읽고 2~3문장)",
    insight: "TODO(AX 관점 한 줄)",
    metric: "TODO(수치·규모)",
    tags: matchedTags(text),
    group: "정부",
    url: item.url,
    _source: item.sourceLabel,
  };
}

function slug(s) {
  return s.replace(/[^0-9A-Za-z가-힣]+/g, "-").slice(0, 32).replace(/-+$/g, "");
}

function renderMarkdown(drafts) {
  const lines = [
    "# AXIS 후보 사례 (자동 소싱)",
    "",
    "> 이 파일은 `npm run source:candidates` 가 생성한 **검토용 후보**입니다.",
    "> 원문을 읽고 summary·insight·metric·stage 를 채운 뒤, 직접 `app/page.tsx` 의",
    "> `CASE_STUDIES` 에 옮겨 넣으세요. 자동 발행은 하지 않습니다.",
    "",
    `생성 후보: **${drafts.length}건**`,
    "",
    "| 소스 | 날짜 | 담당 | 제목 | 태그 | 링크 |",
    "|------|------|------|------|------|------|",
  ];
  for (const d of drafts) {
    const title = d.title.replace(/\|/g, "\\|");
    lines.push(
      `| ${d._source} | ${d.date || "?"} | ${d.agency} | ${title} | ${d.tags.join(", ")} | [원문](${d.url}) |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

async function main() {
  console.log("· 소스 수집 중…");
  const [mois, naver, existing] = await Promise.all([
    fetchMoisPressReleases().catch((e) => {
      console.warn("  행안부 수집 실패:", e.message);
      return [];
    }),
    fetchNaverNews().catch(() => []),
    loadExisting(),
  ]);

  const raw = [...mois, ...naver];
  console.log(`· 원시 수집: ${raw.length}건 (행안부 ${mois.length}, 네이버 ${naver.length})`);

  const drafts = [];
  const dropped = { irrelevant: 0, duplicate: 0 };
  for (const item of raw) {
    if (!isRelevant(`${item.title} ${item.agency}`)) {
      dropped.irrelevant += 1;
      continue;
    }
    if (item.url && existing.urls.has(item.url)) {
      dropped.duplicate += 1;
      continue;
    }
    if (item.nttId && existing.nttIds.has(item.nttId)) {
      dropped.duplicate += 1;
      continue;
    }
    drafts.push(toDraftCase(item));
  }

  console.log(
    `· 필터: 주제무관 ${dropped.irrelevant} 제외, 중복 ${dropped.duplicate} 제외 → 후보 ${drafts.length}건`,
  );

  await mkdir(dataDir, { recursive: true });
  await writeFile(
    resolve(dataDir, "candidates.json"),
    `${JSON.stringify(drafts, null, 2)}\n`,
  );
  await writeFile(resolve(dataDir, "candidates.md"), renderMarkdown(drafts));

  console.log(`✅ data/candidates.json · data/candidates.md 작성 (후보 ${drafts.length}건)`);
  if (!process.env.NAVER_CLIENT_ID) {
    console.log("  (참고: NAVER_CLIENT_ID/SECRET 를 넣으면 뉴스 소스가 추가됩니다)");
  }
}

await main();
