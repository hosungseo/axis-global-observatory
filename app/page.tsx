"use client";

import { useMemo, useState } from "react";

type Region = "전체" | "한국" | "북미" | "유럽" | "아시아·태평양" | "글로벌";
type Scope = "전체" | "중앙·연방" | "주·지방" | "초국가" | "민간";
type Stage = "전체" | "전략" | "실증" | "확산" | "운영";
type Group = "전체" | "정부" | "민간";

type CaseStudy = {
  id: string;
  flag: string;
  country: string;
  region: Exclude<Region, "전체">;
  scope: Exclude<Scope, "전체">;
  stage: Exclude<Stage, "전체">;
  date: string;
  agency: string;
  title: string;
  summary: string;
  insight: string;
  metric: string;
  tags: string[];
  group: Exclude<Group, "전체">;
  url: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "kr-common-guide",
    flag: "🇰🇷",
    country: "대한민국",
    region: "한국",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.06",
    agency: "행정안전부",
    title: "공공부문 AI 도입·활용 가이드",
    summary: "기획부터 운영까지 5단계로 공공 AI 구축 과정을 표준화하고 범정부 공통 기반 이용을 안내한다.",
    insight: "기술 선택보다 먼저 문제 정의·데이터·검증·운영 책임을 한 흐름으로 묶는다.",
    metric: "5단계 표준화",
    tags: ["공통기반", "RAG", "거버넌스"],
    group: "정부",
    url: "https://www.mois.go.kr/frt/bbs/type010/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000008&nttId=126757",
  },
  {
    id: "kr-casebook",
    flag: "🇰🇷",
    country: "대한민국",
    region: "한국",
    scope: "중앙·연방",
    stage: "운영",
    date: "2026.03",
    agency: "행정안전부·NIA",
    title: "AI 정부 서비스 사례집",
    summary: "환경·고용·복지 등 6개 분야에서 실제 도입한 16개 서비스의 시행착오와 기술 규격을 공개했다.",
    insight: "성과 사례보다 도입 과정의 막힘과 운영 조건을 공유할 때 재사용성이 높아진다.",
    metric: "6개 분야 · 16개 사례",
    tags: ["사례집", "행정서비스", "시행착오"],
    group: "정부",
    url: "https://www.nia.or.kr/site/nia_kor/ex/bbs/View.do?bcIdx=29161&cbIdx=37989&parentSeq=29161",
  },
  {
    id: "kr-champion",
    flag: "🇰🇷",
    country: "대한민국",
    region: "한국",
    scope: "주·지방",
    stage: "확산",
    date: "2026.05",
    agency: "행정안전부·NIA",
    title: "AI 챔피언 고급과정",
    summary: "공무원이 자기 기관의 현안을 AI 서비스로 직접 설계하고 푸는 프로젝트형 리더 양성 과정이다.",
    insight: "현장 문제를 가장 잘 아는 사람이 프로토타입을 만들도록 권한과 학습을 연결한다.",
    metric: "225명 지원 · 48명 선발",
    tags: ["AI 리더", "현장혁신", "역량"],
    group: "정부",
    url: "https://www.mois.go.kr/frt/bbs/type010/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000008&nttId=125796",
  },
  {
    id: "us-inventory",
    flag: "🇺🇸",
    country: "미국",
    region: "북미",
    scope: "중앙·연방",
    stage: "운영",
    date: "2025.12",
    agency: "OMB·연방기관",
    title: "Federal AI Use Case Inventory",
    summary: "각 연방기관이 AI 사용 사례를 매년 목록화하고, 공개 가능한 활용·위험·상태를 중앙 저장소로 모은다.",
    insight: "정부 AX의 출발점을 기술 목록이 아니라 공개 가능한 업무 사례의 공통 언어로 만든다.",
    metric: "기관별 연 1회 공개",
    tags: ["투명성", "사용사례", "연방정부"],
    group: "정부",
    url: "https://github.com/ombegov/2025-Federal-Agency-AI-Use-Case-Inventory",
  },
  {
    id: "us-gao",
    flag: "🇺🇸",
    country: "미국",
    region: "북미",
    scope: "중앙·연방",
    stage: "확산",
    date: "2025.07",
    agency: "GAO",
    title: "연방기관 생성형 AI 사용관리 점검",
    summary: "11개 기관의 보고 사례를 분석해 생성형 AI가 행정 생산성과 업무 전환을 만들지만 관리 역량이 함께 필요하다고 평가했다.",
    insight: "파일럿 수보다 사용 사례를 정기적으로 측정하고 위험 관리가 따라오는지가 핵심이다.",
    metric: "571건 → 1,110건",
    tags: ["감사", "생산성", "위험관리"],
    group: "정부",
    url: "https://www.gao.gov/products/gao-25-107653",
  },
  {
    id: "ca-poppy",
    flag: "🇺🇸",
    country: "미국 · 캘리포니아",
    region: "북미",
    scope: "주·지방",
    stage: "실증",
    date: "2025.12",
    agency: "California Department of Technology",
    title: "Poppy — 주정부 디지털 어시스턴트",
    summary: "주정부 데이터에 연결된 보안형 생성 AI를 공무원 업무에 제공하고, 공통 프롬프트와 모델 선택을 한 환경에서 실험한다.",
    insight: "공통 플랫폼을 먼저 만들고 부처별 업무 맥락을 얹어 확산 비용을 낮춘다.",
    metric: "67개 부처 · 2,800+명 파일럿",
    tags: ["내부업무", "보안", "공통플랫폼"],
    group: "정부",
    url: "https://www.cdt.ca.gov/poppy/",
  },
  {
    id: "ca-pilots",
    flag: "🇺🇸",
    country: "미국 · 캘리포니아",
    region: "북미",
    scope: "주·지방",
    stage: "실증",
    date: "2025.04",
    agency: "California State Government",
    title: "교통·세무·민원 GenAI 파일럿",
    summary: "교통 혼잡과 도로 안전, 세무 콜센터의 지식 검색, 8개 부처 생산성 지원에 생성 AI를 적용했다.",
    insight: "내부 생산성 실험과 시민 서비스 실험을 같은 포트폴리오에서 관리한다.",
    metric: "8개 부처 파일럿",
    tags: ["민원", "교통", "콜센터"],
    group: "정부",
    url: "https://www.gov.ca.gov/2025/04/29/governor-newsom-deploys-first-in-the-nation-genai-technologies-to-improve-efficiency-in-state-government/",
  },
  {
    id: "japan-gennai",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency",
    title: "Government AI ‘GENAI’",
    summary: "법령·관보·행정문서를 연결한 정부 공통 AI 환경을 전 부처로 확장하고 국내 LLM도 시험한다.",
    insight: "공통 데이터와 공통 환경을 국가 단위로 설계해 부처별 중복 구축을 줄인다.",
    metric: "약 18만 명 대상",
    tags: ["법령", "RAG", "국내LLM"],
    group: "정부",
    url: "https://www.digital.go.jp/en/policies/genai",
  },
  {
    id: "singapore-pair",
    flag: "🇸🇬",
    country: "싱가포르",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "운영",
    date: "2025.07",
    agency: "GovTech Singapore",
    title: "Pair — 공무원용 AI 챗봇",
    summary: "공무원용 기기와 정부 맥락에 맞춘 AI 챗봇으로 이메일 작성·리서치·아이디어 발상을 지원한다.",
    insight: "도입 장벽을 낮추는 가장 빠른 방법은 ‘안전하게 써볼 수 있는 기본 도구’를 전 직원에게 주는 것이다.",
    metric: "100+ 기관 · 초기 11,000명",
    tags: ["개인생산성", "리서치", "보안"],
    group: "정부",
    url: "https://www.tech.gov.sg/products-and-services/for-government-agencies/productivity-and-marketing/pair/",
  },
  {
    id: "singapore-vica",
    flag: "🇸🇬",
    country: "싱가포르",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "운영",
    date: "2026.04",
    agency: "GovTech Singapore",
    title: "VICA — 공공 챗봇 플랫폼",
    summary: "공공 정보원과 생성 AI를 결합해 답변을 통제하는 하이브리드 챗봇 플랫폼을 여러 기관에 제공한다.",
    insight: "공통 플랫폼이 정확도와 기관별 맥락을 동시에 관리하는 운영 레이어가 된다.",
    metric: "60개 기관 · 100+ 챗봇",
    tags: ["대민서비스", "하이브리드AI", "플랫폼"],
    group: "정부",
    url: "https://www.tech.gov.sg/products-and-services/for-government-agencies/informational-services/vica/",
  },
  {
    id: "canada-register",
    flag: "🇨🇦",
    country: "캐나다",
    region: "북미",
    scope: "중앙·연방",
    stage: "운영",
    date: "2025.11",
    agency: "Treasury Board Secretariat",
    title: "연방 AI 사용 등록부",
    summary: "어느 부처가 어떤 AI를 어디에 쓰는지 공개 등록부로 묶어 중복을 줄이고 공공 신뢰를 높인다.",
    insight: "공개 등록부는 책임 추적뿐 아니라 기관 간 재사용을 위한 시장 지도 역할도 한다.",
    metric: "최초 공개 레지스터",
    tags: ["등록부", "공공신뢰", "재사용"],
    group: "정부",
    url: "https://www.canada.ca/en/treasury-board-secretariat/news/2025/11/canada-launches-first-register-of-ai-uses-in-federal-government.html",
  },
  {
    id: "uk-playbook",
    flag: "🇬🇧",
    country: "영국",
    region: "유럽",
    scope: "중앙·연방",
    stage: "전략",
    date: "2025.02",
    agency: "Government Digital Service",
    title: "AI Playbook for UK Government",
    summary: "AI를 고르는 법부터 팀 구성·조달·사용자 조사·안전한 운영까지 공무원이 따를 10개 원칙을 제시한다.",
    insight: "업무 개선은 모델 도입이 아니라 법·데이터·조직·현장 검증을 묶는 운영체계다.",
    metric: "10개 원칙 · 5개 파트",
    tags: ["플레이북", "조달", "AI 리터러시"],
    group: "정부",
    url: "https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government",
  },
  {
    id: "eu-public-admin",
    flag: "🇪🇺",
    country: "유럽연합",
    region: "유럽",
    scope: "초국가",
    stage: "전략",
    date: "2026.04",
    agency: "European Commission · JRC",
    title: "공공행정 AI 도입 프레임워크",
    summary: "정책·역량·고영향 업무라는 세 축으로 AI를 공공행정에 정착시키고 위험·성과를 지속 모니터링한다.",
    insight: "시민 중심의 공공가치와 조직의 실행역량을 기술 도입보다 앞에 둔다.",
    metric: "3축 도입 프레임워크",
    tags: ["AI Act", "공공가치", "역량"],
    group: "정부",
    url: "https://publications.jrc.ec.europa.eu/repository/handle/JRC143539",
  },
  {
    id: "eu-pilots",
    flag: "🇪🇺",
    country: "유럽연합",
    region: "유럽",
    scope: "초국가",
    stage: "실증",
    date: "2025.04",
    agency: "European Commission · DIGITAL",
    title: "GenAI 공공행정 파일럿",
    summary: "의사결정·내부 프로세스·접근성·행정부담 완화를 목표로 재사용 가능한 공공행정 GenAI 파일럿을 지원한다.",
    insight: "각국이 단독으로 실험하지 않도록 확장·복제 가능한 컨소시엄 구조를 만든다.",
    metric: "4개 파일럿 · €21m",
    tags: ["확장성", "컨소시엄", "Digital Europe"],
    group: "정부",
    url: "https://digital-strategy.ec.europa.eu/en/events/genai-meets-public-administrations-info-days-funding-opportunities-and-future-adoption-strategies",
  },
  {
    id: "australia-policy",
    flag: "🇦🇺",
    country: "호주",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.01",
    agency: "Digital Transformation Agency",
    title: "Responsible Use of AI 정책 개정",
    summary: "정부 전반의 AI 실험을 허용하면서도 투명성·안전·신뢰를 보장하는 기관별 거버넌스 요구를 강화했다.",
    insight: "혁신 속도를 늦추지 않으면서도 공통 가드레일을 운영하는 이중 속도가 필요하다.",
    metric: "2025.12.15 발효",
    tags: ["책임있는AI", "가드레일", "APS"],
    group: "정부",
    url: "https://www.dta.gov.au/articles/ai-policy-update-strengthening-responsible-use-across-government",
  },
  {
    id: "mckinsey-operating-model",
    flag: "◌",
    country: "글로벌",
    region: "글로벌",
    scope: "민간",
    stage: "전략",
    date: "2026.07",
    agency: "McKinsey",
    title: "AI 성과 기업의 운영모델 재설계",
    summary: "AI 성과가 큰 기업은 도구를 고르기 전에 워크플로와 의사결정 구조를 다시 설계한다는 분석이다.",
    insight: "AI를 IT 프로그램으로 두면 파일럿에 머물고, 운영모델 과제로 다루면 지속 가능한 성과로 연결된다.",
    metric: "상위 기업, 재설계 가능성 3배",
    tags: ["운영모델", "워크플로", "ROI"],
    group: "민간",
    url: "https://www.mckinsey.com/industries/industrials/our-insights/the-operating-model-advantage-why-ai-winners-are-rewiring-their-organizations",
  },
  {
    id: "bcg-ai-at-work",
    flag: "◌",
    country: "글로벌",
    region: "글로벌",
    scope: "민간",
    stage: "확산",
    date: "2026.06",
    agency: "BCG",
    title: "AI at Work — 시간 절감 이후",
    summary: "현장 직원의 AI 사용과 시간 절감은 늘었지만, 절약한 시간을 어떤 고부가 업무로 옮길지는 여전히 조직 과제다.",
    insight: "교육 시간과 리더의 명확한 업무 재배치가 도구 보급률보다 중요하다.",
    metric: "정기 사용자 42%, 주 8시간 절감",
    tags: ["현장직", "교육", "시간재설계"],
    group: "민간",
    url: "https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools",
  },
  {
    id: "deloitte-enterprise",
    flag: "◌",
    country: "글로벌",
    region: "글로벌",
    scope: "민간",
    stage: "확산",
    date: "2026.01",
    agency: "Deloitte",
    title: "State of AI in the Enterprise",
    summary: "조직 전체의 AI 접근은 확대됐지만 핵심 프로세스 재설계와 에이전트 거버넌스는 뒤처져 있다고 진단한다.",
    insight: "도입률을 성과로 착각하지 않으려면 업무 흐름 변화와 책임 구조를 함께 측정해야 한다.",
    metric: "접근권한 약 60% · 성숙 거버넌스 21%",
    tags: ["에이전트", "거버넌스", "전환"],
    group: "민간",
    url: "https://www.deloitte.com/us/en/about/press-room/state-of-ai-report-2026.html",
  },
  {
    id: "microsoft-frontier",
    flag: "◌",
    country: "글로벌",
    region: "글로벌",
    scope: "민간",
    stage: "전략",
    date: "2025.04",
    agency: "Microsoft · LinkedIn",
    title: "Frontier Firm — 사람과 에이전트의 하이브리드 팀",
    summary: "31개국 31,000명 조사에서 AI를 비서에서 디지털 동료·프로세스 운영자로 확장하는 3단계 변화를 제시한다.",
    insight: "새 역할은 ‘AI를 쓰는 사람’이 아니라 에이전트를 설계하고 감독하는 사람으로 이동한다.",
    metric: "리더 82%, 전략 재설계가 올해 핵심",
    tags: ["에이전트", "조직설계", "미래업무"],
    group: "민간",
    url: "https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born",
  },
  {
    id: "pwc-jobs-barometer",
    flag: "◌",
    country: "글로벌",
    region: "글로벌",
    scope: "민간",
    stage: "전략",
    date: "2026.06",
    agency: "PwC",
    title: "AI Jobs Barometer — 역할의 재구성",
    summary: "27개국 10억 건 이상 구인 데이터를 분석해 AI가 반복 업무를 줄이고 판단·리더십 역량을 더 앞단으로 끌어올린다고 설명한다.",
    insight: "직무 폐지보다 직무의 입문 경로·숙련 방식·필요 역량이 먼저 바뀐다.",
    metric: "AI 역량 임금 프리미엄 62%",
    tags: ["인재", "직무설계", "스킬"],
    group: "민간",
    url: "https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-ai-jobs-barometer.html",
  },
  {
    id: "accenture-work",
    flag: "◌",
    country: "글로벌",
    region: "글로벌",
    scope: "민간",
    stage: "전략",
    date: "2025.03",
    agency: "Accenture · Wharton",
    title: "Humans, AI and Robots",
    summary: "생성 AI 에이전트·로봇이 확산되는 시대에 인간의 판단·창의성·관계 역량을 중심에 둔 업무 재설계를 제안한다.",
    insight: "효율화가 아니라 인간의 역량을 확장하는 방식으로 자동화의 목적을 다시 정의한다.",
    metric: "인간-기계 협업 연구 이니셔티브",
    tags: ["인간중심", "역할", "에이전트"],
    group: "민간",
    url: "https://www.accenture.com/us-en/insights/strategy/humans-ai-robots",
  },
];

const REGION_OPTIONS: Region[] = ["전체", "한국", "북미", "유럽", "아시아·태평양", "글로벌"];
const STAGE_OPTIONS: Stage[] = ["전체", "전략", "실증", "확산", "운영"];

const SIGNALS = [
  {
    date: "07.10",
    label: "일본",
    title: "정부 AI ‘GENAI’ 전 부처 확산",
    text: "18만 명 규모의 대규모 실증과 행정문서 RAG를 함께 추진",
    tone: "blue",
    href: "https://www.digital.go.jp/en/policies/genai",
  },
  {
    date: "06.10",
    label: "한국",
    title: "공공 AI 도입 가이드 배포",
    text: "공통 기반 이용을 포함한 기획–운영 5단계 실행 흐름 제시",
    tone: "red",
    href: "https://www.mois.go.kr/frt/bbs/type010/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000008&nttId=126757",
  },
  {
    date: "06.03",
    label: "업무 리서치",
    title: "AI 성과의 병목은 ‘전략’",
    text: "현장 사용자는 시간을 아끼지만, 조직은 그 시간을 재설계하지 못한다",
    tone: "green",
    href: "https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools",
  },
  {
    date: "04.09",
    label: "유럽연합",
    title: "공공행정 AI 도입 프레임워크",
    text: "정책·역량·고영향 업무의 세 축으로 공공가치를 측정",
    tone: "ochre",
    href: "https://publications.jrc.ec.europa.eu/repository/handle/JRC143539",
  },
];

const PLAYBOOKS = [
  {
    number: "01",
    title: "과업이 아니라 흐름을 다시 그리기",
    body: "문서 작성 한 단계를 자동화하기 전에 입력–판단–승인–예외의 전체 경로를 펼쳐본다.",
    source: "McKinsey · BCG",
    href: "https://www.mckinsey.com/industries/industrials/our-insights/the-operating-model-advantage-why-ai-winners-are-rewiring-their-organizations",
  },
  {
    number: "02",
    title: "사람의 판단점을 설계하기",
    body: "AI가 빠르게 처리할 구간과 사람이 책임져야 할 예외·맥락·공감을 명시한다.",
    source: "UK AI Playbook · Deloitte",
    href: "https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government",
  },
  {
    number: "03",
    title: "공통 기반 위에 현장 맥락 얹기",
    body: "보안·데이터·모델을 공통화하되, 부처와 팀이 자기 언어로 실험할 공간을 남긴다.",
    source: "Japan GENAI · Singapore Pair",
    href: "https://www.tech.gov.sg/products-and-services/for-government-agencies/productivity-and-marketing/pair/",
  },
  {
    number: "04",
    title: "절약한 시간을 성과로 번역하기",
    body: "절감 시간, 시민 접점, 오류, 재작업을 함께 측정하고 고부가 업무로 이동했는지 확인한다.",
    source: "NHS England · PwC",
    href: "https://www.england.nhs.uk/2026/01/nhs-backs-ai-notetaking-free-up-more-face-to-face-care/",
  },
];

function countCountries(items: CaseStudy[]) {
  return new Set(items.map((item) => item.country)).size;
}

export default function Home() {
  const [group, setGroup] = useState<Group>("전체");
  const [region, setRegion] = useState<Region>("전체");
  const [stage, setStage] = useState<Stage>("전체");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredCases = useMemo(() => {
    const query = search.trim().toLowerCase();
    return CASE_STUDIES.filter((item) => {
      const matchesGroup = group === "전체" || item.group === group;
      const matchesRegion = region === "전체" || item.region === region;
      const matchesStage = stage === "전체" || item.stage === stage;
      const matchesQuery =
        !query ||
        [item.country, item.agency, item.title, item.summary, item.insight, ...item.tags]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesGroup && matchesRegion && matchesStage && matchesQuery;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, [group, region, stage, search]);

  const governmentCount = CASE_STUDIES.filter((item) => item.group === "정부").length;
  const privateCount = CASE_STUDIES.filter((item) => item.group === "민간").length;
  const visibleCases = showAll ? filteredCases : filteredCases.slice(0, 9);

  const setGroupAndScroll = (nextGroup: Group) => {
    setGroup(nextGroup);
    setShowAll(false);
    document.getElementById("explorer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        본문으로 건너뛰기
      </a>

      <div className="top-strip">
        <div className="top-strip-inner">
          <span className="status-dot" aria-hidden="true" />
          <span>AXIS는 원문으로 확인하는 글로벌 AX 관측소입니다.</span>
          <span className="top-strip-date">2026.07.24 기준</span>
        </div>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="AXIS 홈">
          <span className="brand-mark">A</span>
          <span>
            <strong>AXIS</strong>
            <small>Global AX Observatory</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="주요 메뉴">
          <a href="#signals">오늘의 시그널</a>
          <a href="#explorer">사례 탐색</a>
          <a href="#compare">미국 연방 vs 주</a>
          <a href="#playbook">업무혁신 플레이북</a>
        </nav>
        <a className="header-link" href="#sources">
          원문 기준 <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="main-content">
        <section className="hero section-frame" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">THE CIVIC AX INDEX · ISSUE 01</p>
            <h1 id="hero-title">
              정부는 AI로
              <br />
              <em>어떻게 일하는가</em>
            </h1>
            <p className="hero-lede">
              각국 정부가 AI를 어디에 배치하고, 조직의 일하는 방식을 어떻게 바꾸는지 한 곳에서 읽습니다.
              기술 도입을 넘어 정책·역할·업무 흐름의 변화를 추적합니다.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => setGroupAndScroll("정부")}>
                정부 사례부터 보기 <span aria-hidden="true">↓</span>
              </button>
              <a className="text-link" href="#playbook">
                업무혁신 관점으로 읽기 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <aside className="brief-panel" aria-label="이번 호 브리핑">
            <div className="brief-panel-top">
              <span className="brief-kicker">WEEKLY BRIEF</span>
              <span className="brief-issue">#01</span>
            </div>
            <div className="brief-rule" />
            <p className="brief-title">공통 기반은 빨라지고, 업무 재설계는 뒤처진다</p>
            <p className="brief-text">
              일본은 18만 명 규모의 정부 AI를 확장하고, 한국은 공공 AI 도입 과정을 표준화했습니다. 동시에 기업 리서치는 ‘시간을 아끼는 것’과 ‘일을 바꾸는 것’ 사이의 간극을 지적합니다.
            </p>
            <a className="brief-read" href="#signals">
              이번 주 신호 읽기 <span aria-hidden="true">↗</span>
            </a>
          </aside>

          <div className="hero-stats" aria-label="AXIS 데이터 범위">
            <div>
              <strong>{countCountries(CASE_STUDIES)}개</strong>
              <span>국가·권역</span>
            </div>
            <div>
              <strong>{CASE_STUDIES.length}건</strong>
              <span>검증 사례</span>
            </div>
            <div>
              <strong>{governmentCount}건</strong>
              <span>정부 사례</span>
            </div>
            <div>
              <strong>{privateCount}건</strong>
              <span>민간 인사이트</span>
            </div>
          </div>
        </section>

        <section className="section signals-section" id="signals" aria-labelledby="signals-title">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">01 · SIGNALS</p>
              <h2 id="signals-title">오늘의 AX 시그널</h2>
            </div>
            <p className="section-intro">발표일이 가까운 원문부터, 실제 일하는 방식의 변화만 골라 읽습니다.</p>
          </div>
          <div className="signal-grid">
            {SIGNALS.map((signal) => (
              <a className={`signal-card ${signal.tone}`} href={signal.href} key={signal.title} target="_blank" rel="noreferrer">
                <div className="signal-meta">
                  <span>{signal.label}</span>
                  <time dateTime={`2026-${signal.date.replace(".", "-")}`}>2026.{signal.date}</time>
                </div>
                <h3>{signal.title}</h3>
                <p>{signal.text}</p>
                <span className="card-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section explorer-section" id="explorer" aria-labelledby="explorer-title">
          <div className="section-heading split-heading explorer-heading">
            <div>
              <p className="eyebrow">02 · EXPLORER</p>
              <h2 id="explorer-title">사례를 비교하는 가장 짧은 길</h2>
            </div>
            <div className="result-note" aria-live="polite">
              <strong>{filteredCases.length}</strong>건이 현재 조건과 맞습니다.
            </div>
          </div>

          <div className="explorer-toolbar">
            <div className="segmented-control" role="group" aria-label="사례 유형">
              {(["전체", "정부", "민간"] as Group[]).map((item) => (
                <button
                  type="button"
                  className={group === item ? "is-active" : ""}
                  aria-pressed={group === item}
                  key={item}
                  onClick={() => {
                    setGroup(item);
                    setShowAll(false);
                  }}
                >
                  {item === "전체" ? "전체 보기" : item === "정부" ? "정부 AX" : "업무혁신 인사이트"}
                </button>
              ))}
            </div>
            <label className="search-field">
              <span className="sr-only">사례 검색</span>
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="국가, 기관, 업무 키워드 검색" />
              {search && (
                <button type="button" aria-label="검색어 지우기" className="search-clear" onClick={() => setSearch("")}>
                  ×
                </button>
              )}
            </label>
          </div>

          <div className="filter-row">
            <div className="filter-group" aria-label="지역 필터">
              <span className="filter-label">지역</span>
              {REGION_OPTIONS.map((item) => (
                <button type="button" className={region === item ? "filter-chip is-active" : "filter-chip"} aria-pressed={region === item} key={item} onClick={() => { setRegion(item); setShowAll(false); }}>
                  {item}
                </button>
              ))}
            </div>
            <label className="stage-select">
              <span className="filter-label">성숙도</span>
              <select value={stage} onChange={(event) => { setStage(event.target.value as Stage); setShowAll(false); }}>
                {STAGE_OPTIONS.map((item) => <option key={item} value={item}>{item === "전체" ? "모든 단계" : item}</option>)}
              </select>
            </label>
          </div>

          <div className="case-grid">
            {visibleCases.map((item) => (
              <article className="case-card" key={item.id}>
                <div className="case-card-top">
                  <span className="case-place"><span className="case-flag" aria-hidden="true">{item.flag}</span>{item.country}</span>
                  <span className={`stage-badge stage-${item.stage}`}>{item.stage}</span>
                </div>
                <div className="case-card-meta">
                  <span>{item.agency}</span>
                  <time dateTime={item.date.replace(".", "-")}>{item.date}</time>
                </div>
                <h3>{item.title}</h3>
                <p className="case-summary">{item.summary}</p>
                <div className="case-insight"><span>읽을 포인트</span>{item.insight}</div>
                <div className="case-card-bottom">
                  <strong>{item.metric}</strong>
                  <div className="tag-list">{item.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <a href={item.url} target="_blank" rel="noreferrer" aria-label={`${item.title} 원문 열기`} className="case-source">원문 <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>

          {filteredCases.length === 0 && (
            <div className="empty-state">
              <strong>조건에 맞는 사례가 없습니다.</strong>
              <p>검색어 또는 필터를 조금 넓혀보세요.</p>
              <button type="button" className="button button-secondary" onClick={() => { setSearch(""); setRegion("전체"); setStage("전체"); setGroup("전체"); }}>필터 초기화</button>
            </div>
          )}
          {filteredCases.length > 9 && (
            <button type="button" className="load-more" onClick={() => setShowAll((current) => !current)}>
              {showAll ? "간추려 보기 ↑" : `사례 ${filteredCases.length - 9}건 더 보기 ↓`}
            </button>
          )}
        </section>

        <section className="compare-section" id="compare" aria-labelledby="compare-title">
          <div className="section compare-inner">
            <div className="section-heading split-heading compare-heading">
              <div>
                <p className="eyebrow light">03 · US LENS</p>
                <h2 id="compare-title">미국은 왜 연방과 주를 나눠서 봐야 할까</h2>
              </div>
              <p className="section-intro light-copy">같은 AI라도 중앙의 가드레일과 현장의 업무 실험은 다른 속도로 움직입니다.</p>
            </div>
            <div className="compare-grid">
              <div className="compare-card federal">
                <div className="compare-card-label"><span>FEDERAL</span><span>연방정부</span></div>
                <h3>목록화·공개·책임 추적</h3>
                <p>OMB 요구에 따라 기관별 사용 사례를 인벤토리로 모으고, 고영향 사용에는 위험·공개·피드백 구조를 붙입니다.</p>
                <div className="compare-line"><span>대표 메커니즘</span><strong>AI Use Case Inventory</strong></div>
                <a href="https://github.com/ombegov/2025-Federal-Agency-AI-Use-Case-Inventory" target="_blank" rel="noreferrer">연방 인벤토리 보기 ↗</a>
              </div>
              <div className="compare-card state">
                <div className="compare-card-label"><span>STATE</span><span>캘리포니아</span></div>
                <h3>공통 플랫폼·빠른 파일럿</h3>
                <p>Poppy 같은 보안형 내부 도구와 교통·세무·민원 파일럿을 동시에 밀어 현장 업무에서 학습합니다.</p>
                <div className="compare-line"><span>대표 메커니즘</span><strong>Poppy + 부처 파일럿</strong></div>
                <a href="https://www.cdt.ca.gov/poppy/" target="_blank" rel="noreferrer">주정부 파일럿 보기 ↗</a>
              </div>
            </div>
            <div className="compare-takeaway"><span>AXIS TAKEAWAY</span><p>연방은 “무엇을 쓰는가”를 보이게 만들고, 주정부는 “어떻게 일하는가”를 빠르게 시험합니다. 조직의 AX 로드맵에는 두 레이어가 모두 필요합니다.</p></div>
          </div>
        </section>

        <section className="section playbook-section" id="playbook" aria-labelledby="playbook-title">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">04 · PLAYBOOK</p>
              <h2 id="playbook-title">기술보다 먼저 바꿔야 할 네 가지</h2>
            </div>
            <p className="section-intro">정부 사례와 컨설팅·IT 기업의 논의를 업무 개선 담당자의 실행 언어로 번역했습니다.</p>
          </div>
          <div className="playbook-grid">
            {PLAYBOOKS.map((playbook) => (
              <a className="playbook-card" href={playbook.href} target="_blank" rel="noreferrer" key={playbook.number}>
                <span className="playbook-number">{playbook.number}</span>
                <h3>{playbook.title}</h3>
                <p>{playbook.body}</p>
                <span className="playbook-source">{playbook.source} <span aria-hidden="true">↗</span></span>
              </a>
            ))}
          </div>
        </section>

        <section className="section method-section" id="sources" aria-labelledby="method-title">
          <div className="method-grid">
            <div>
              <p className="eyebrow">05 · METHOD</p>
              <h2 id="method-title">AXIS는 이렇게 읽습니다</h2>
              <p className="method-lede">발표자료의 ‘AI를 도입했다’는 문장보다, 누가 어떤 업무를 맡고 무엇이 달라졌는지를 우선합니다.</p>
            </div>
            <div className="method-list">
              <div><span>01</span><p><strong>원문 우선</strong><br />정부·기관·보고서의 1차 자료를 카드마다 연결합니다.</p></div>
              <div><span>02</span><p><strong>상태 분리</strong><br />전략·실증·확산·운영을 나눠 파일럿을 성과로 오해하지 않습니다.</p></div>
              <div><span>03</span><p><strong>사람의 일 표시</strong><br />자동화된 과업과 남겨진 판단·책임을 함께 기록합니다.</p></div>
            </div>
          </div>
          <div className="source-note"><span>LAST UPDATED</span><strong>2026.07.24</strong><p>초기 버전은 공개 원문 20건을 큐레이션했습니다. 수치는 원문 발표 기준이며, 정부 발표와 민간 리서치의 성격이 다르므로 직접 비교하기보다 설계 질문을 찾는 용도로 읽어주세요.</p></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><span className="brand-mark">A</span><div><strong>AXIS</strong><small>Global AX Observatory</small></div></div>
        <p>정부의 AI 전환을 ‘기술 뉴스’가 아니라 ‘일하는 방식의 기록’으로 읽습니다.</p>
        <a href="#top">맨 위로 ↑</a>
      </footer>
    </div>
  );
}
