# AXIS — Global AX Observatory

전 세계 정부·공공기관이 AI로 **일하는 방식**을 어떻게 바꾸는지 원문 기반으로 비교하는 관측소입니다.
기술 도입 뉴스가 아니라 누가 어떤 업무를 맡고 무엇이 달라졌는지를 1차 자료(정부·기관 발표, 1차 보고서)에 연결해 정리합니다.

**2026년 7월 기준 · 17개 국가·권역 · 95개 검증 사례**

## 라이브 페이지

- **GitHub Pages:** [hosungseo.github.io/axis-global-observatory](https://hosungseo.github.io/axis-global-observatory/)
- **운영 사이트:** [axis-global-observatory.ghtjd10855.chatgpt.site](https://axis-global-observatory.ghtjd10855.chatgpt.site)
- **에이전트용:** [/llms.txt](https://hosungseo.github.io/axis-global-observatory/llms.txt) + 페이지 내 JSON-LD(Dataset)

`main` 브랜치에 변경이 올라오면 GitHub Actions가 정적 페이지를 다시 빌드해 GitHub Pages에 배포합니다.

## 분류체계 (다축)

같은 사례를 여러 렌즈로 교차 분석합니다.

- **업무방식 7개 주제 (2단계 계층):** 공통 기반 · 조달·개발 · 데이터·규칙 · 대민 서비스 · 현장·집행 · 인재·업무개혁 · 거버넌스·주권 — 각 주제는 세부주제로 다시 나뉩니다.
- **‘사람의 일’ 직교축:** 자동화 · 증강 · 셀프서비스화 · 재배치 · 기반화 (일하는 방식이 어떻게 바뀌는가)
- **근거유형:** 정부 원문 · 민간 리서치 (URL 도메인으로 도출)
- **성숙도:** 전략 · 실증 · 확산 · 운영
- **지역 / 범위:** 지역별, 중앙·연방 / 주·지방 / 초국가 / 민간

### 화면 기능

- **사례 탐색:** 국가 인덱스 + 업무방식·세부주제·사람의 일·지역·성숙도 필터, 키워드 검색
- **국가 × 업무방식 / 국가 × 사람의 일 매트릭스:** 축 토글로 어느 나라가 무엇에 AI를 배치하는지 비교
- **일본 심화 시책 접기:** 일본 중점계획 개별 시책은 기본 화면에서 접어 편중을 완화(토글·필터로 펼침)

## 포함 범위

- 한국(행안부·서울시·조달청·관세청·국세청), 미국(연방·캘리포니아), 영국, EU, 캐나다, 호주, 싱가포르, 프랑스, 독일, 대만, UAE, 인도, 우크라이나, 에스토니아, 일본
- 일본 디지털청 「디지털사회 중점계획」 381개 시책에서 뽑은 정부 업무혁신 사례
- 컨설팅·IT 기업(McKinsey·BCG·Deloitte·Microsoft·PwC·Accenture)의 일하는 방식 리서치

## 로컬 실행

```bash
npm install
npm run dev
```

## 데이터 소싱

행안부 보도자료를 스크랩해 새 한국 정부 AI 사례 **후보**를 만듭니다(자동 발행 없이 검토용).

```bash
npm run source:candidates   # data/candidates.{json,md} 생성
```

`NAVER_CLIENT_ID` / `NAVER_CLIENT_SECRET` 환경변수가 있으면 네이버 뉴스 소스도 추가됩니다.
주 1회 자동 실행은 launchd(`com.hosungseo.axis-sourcing`)로 로컬 예약돼 있습니다.

## 품질 검사

```bash
npm run check:data    # 사례 id 중복 + theme/workChange/subTheme 누락 (prebuild에 연결)
npm run check:links   # 모든 원문 URL 생존 확인
npm run lint
npm test
```

GitHub Actions(`.github/workflows/checks.yml`): 데이터 검사(push/PR) + 원문 링크 점검(주 1회 월요일).

## 주요 원문

- [일본 디지털청 정책 우선순위 목록](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf)
- [일본 디지털청 정책 본문](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf)

## 방법론

- **원문 우선:** 정부·기관·보고서의 1차 자료를 카드마다 연결
- **상태 분리:** 전략·실증·확산·운영을 나눠 파일럿을 성과로 오해하지 않음
- **사람의 일 표시:** 자동화된 과업과 남겨진 판단·책임을 함께 기록

수치는 각 원문 발표 기준이며, 정부 발표와 민간 리서치는 성격이 다르므로 직접 비교보다 설계 질문을 찾는 용도로 읽어주세요.

## 기술 스택

- Next.js 호환 React + vinext
- Cloudflare Workers / Sites 배포
- GitHub Actions / GitHub Pages 정적 배포
- TypeScript, ESLint, Node.js 테스트
