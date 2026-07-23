# AXIS — Global AX Observatory

전 세계 정부와 공공기관의 AI 전환(AX) 동향을 한곳에서 탐색하는 한국어 관측 사이트입니다.
기술 도입뿐 아니라 행정절차, 조직 운영, 조달, 데이터, 현장 업무의 변화 사례를 함께 정리합니다.

## 포함 범위

- 미국 연방·주정부, 일본, 유럽연합 및 주요 국가의 정부 AI 정책
- 일본 디지털청 정책 원문에서 추출한 정부 업무혁신 사례
- 컨설팅·IT 기업의 일하는 방식 개선 관련 논의
- 국가·기관·업무 키워드 검색과 정부/민간 사례 필터

## 실행

```bash
npm install
npm run dev
```

검증 명령:

```bash
npm run lint
npm test
```

## 공개 사이트

[axis-global-observatory.ghtjd10855.chatgpt.site](https://axis-global-observatory.ghtjd10855.chatgpt.site)

## 주요 원문

- [일본 디지털청 정책 우선순위 목록](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf)
- [일본 디지털청 정책 본문](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf)

## 기술 스택

- Next.js 호환 React 코드와 vinext
- Cloudflare Workers / Sites 배포
- TypeScript, ESLint, Node.js 테스트
