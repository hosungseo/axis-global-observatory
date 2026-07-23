# AXIS — Global AX Observatory

전 세계 정부와 공공기관이 AI로 일하는 방식을 비교하는 원문 기반 AX 관측소입니다.
기술 도입만 모으지 않고 행정절차, 조직 운영, 조달, 데이터, 현장 업무가 어떻게 바뀌는지 사례로 정리합니다.

## 라이브 페이지

- **GitHub Pages:** [hosungseo.github.io/axis-global-observatory](https://hosungseo.github.io/axis-global-observatory/)
- **운영 사이트:** [axis-global-observatory.ghtjd10855.chatgpt.site](https://axis-global-observatory.ghtjd10855.chatgpt.site)

`main` 브랜치에 변경사항이 올라오면 GitHub Actions가 정적 페이지를 다시 빌드해 GitHub Pages에 배포합니다.

## 포함 범위

- 미국 연방·주정부, 일본, 유럽연합 및 주요 국가의 정부 AI 정책
- 일본 디지털청 정책 원문에서 추출한 정부 업무혁신 사례
- 컨설팅·IT 기업의 일하는 방식 개선 관련 논의
- 국가·기관·업무 키워드 검색과 정부/민간 사례 필터

## 로컬 실행

```bash
npm install
npm run dev
```

검증 명령:

```bash
npm run lint
npm test
```

## 주요 원문

- [일본 디지털청 정책 우선순위 목록](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf)
- [일본 디지털청 정책 본문](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf)

## 기술 스택

- Next.js 호환 React 코드와 vinext
- Cloudflare Workers / Sites 배포
- GitHub Actions / GitHub Pages 정적 배포
- TypeScript, ESLint, Node.js 테스트
