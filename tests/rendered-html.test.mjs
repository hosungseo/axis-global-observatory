import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the AXIS observatory", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>AXIS — Global AX Observatory<\/title>/i);
  assert.match(html, /정부는 AI로/);
  assert.match(html, /어떻게 일하는가/);
  assert.match(html, /오늘의 AX 시그널/);
  assert.match(html, /Government AI ‘GENAI’/);
  assert.match(html, /AI 구동형 국가/);
  assert.match(html, /가버먼트 AI 워크스페이스/);
  assert.match(html, /AI-Ready 표준 가이드라인/);
  assert.match(html, /Rules as Code/);
  assert.match(html, /지역 AX 동행지원 패키지/);
  assert.match(html, /법령 데이터와 법제사무 디지털화/);
  assert.match(html, /공공서비스 메쉬와 지자체 BPR/);
  assert.match(html, /지자체 AX\/DX: 프런트야드·백야드 통합/);
  assert.match(html, /GSS: 정부 공통 업무환경/);
  assert.match(html, /2026년 7월 21일 공개된 두 원문/);
  assert.match(html, /국가, 기관, 업무 키워드 검색/);
  assert.match(html, /미국은 왜 연방과 주를 나눠서 봐야 할까/);
  assert.match(html, /기술보다 먼저 바꿔야 할 네 가지/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the finished product free of starter infrastructure", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /^"use client";/);
  assert.match(page, /회계 DX와 원스온리/);
  assert.match(page, /AI로 구급대 운영 최적화/);
  assert.match(page, /학교 현장 AI 활용과 교무 개선/);
  assert.doesNotMatch(page, /SkeletonPreview|_sites-preview|codex-preview/);
  assert.match(layout, /AXIS — Global AX Observatory/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|next\/font/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
  await access(new URL("public/og.png", templateRoot));
});
