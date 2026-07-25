"use client";

import { useMemo, useState } from "react";

type Region = "전체" | "한국" | "북미" | "유럽" | "아시아·태평양" | "글로벌";
type Scope = "전체" | "중앙·연방" | "주·지방" | "초국가" | "민간";
type Stage = "전체" | "전략" | "실증" | "확산" | "운영";
type Group = "전체" | "정부" | "민간";

type CaseStudy = {
  id: string;
  code?: string;
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

const JAPAN_EXECUTION_ITEMS: CaseStudy[] = [
  {
    id: "japan-ai-ready-guidelines",
    code: "1-11",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Digital Agency",
    title: "AI-Ready 표준 가이드라인",
    summary: "요건정의·설계·개발 자료를 Markdown·JSON 등 기계가독 형식으로 정비해 정부 시스템 조달과 내부개발에 생성 AI를 쓸 수 있게 한다.",
    insight: "모델 도입보다 먼저 업무 문서의 형식을 바꾸는 데이터·문서 운영 과제다.",
    metric: "2026 방법·절차 정리",
    tags: ["AI-Ready", "문서표준", "내부개발"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-ai-procurement",
    code: "1-12",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "실증",
    date: "2026.07",
    agency: "Digital Agency",
    title: "AI 활용을 전제로 한 정부 조달 평가",
    summary: "AI로 비용·기간·품질을 개선하는 제안과 AI-driven development를 정부 정보시스템 조달 평가에 반영하는 방식을 검토한다.",
    insight: "AI를 쓰는 발주자와 사업자를 따로 보지 않고 조달 자체를 AX 실험장으로 삼는다.",
    metric: "2026 시범 도입",
    tags: ["조달", "AI-driven", "DMP"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-rules-as-code",
    code: "2-18",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Digital Agency · 관계 부처",
    title: "Rules as Code로 행정 규칙을 실행 가능한 데이터로",
    summary: "급부·세제 등 제도·절차를 AI가 해석·처리할 수 있는 코드로 바꾸어 제도 개정에 따른 시스템 수정과 행정업무를 빠르게 한다.",
    insight: "법령·신청서·표준사양서를 코드화하면 AI 에이전트가 제도 변경을 따라가는 업무 기반이 된다.",
    metric: "세제 등 고빈도 개정 분야부터",
    tags: ["Rules as Code", "법령데이터", "자동화"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-regional-ax",
    code: "4-19",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "주·지방",
    stage: "실증",
    date: "2026.07",
    agency: "Ministry of Internal Affairs and Communications",
    title: "지역 AX 동행지원 패키지",
    summary: "인구감소·인력부족에 대응해 AI·자동운전 실증, 디지털 인재·체계 지원, 지역 통신 인프라를 묶어 지방정부 모델을 동행 지원한다.",
    insight: "지자체 AX는 솔루션 배포가 아니라 인재·체계·인프라와 동행지원까지 포함한 실행 패키지다.",
    metric: "2027년 말까지 약 30건",
    tags: ["지역AX", "디지털인재", "실증"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-ai-skills-platform",
    code: "6-2",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Cabinet Office · IPA",
    title: "AI 시대 디지털 인재 스킬 플랫폼",
    summary: "생성 AI·에이전트로 직무·스킬 정의가 유동화되는 상황에 맞춰 스킬 플랫폼을 확장하고 다음 정부 목표·KPI를 설계한다.",
    insight: "업무혁신의 성패를 도입률이 아니라 문제설정·책임·스킬 이동으로 측정한다.",
    metric: "2026년 말 차기 목표 정리",
    tags: ["스킬", "KPI", "인재"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-government-ai-global",
    code: "4-51/52",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "초국가",
    stage: "전략",
    date: "2026.07",
    agency: "Digital Agency · Ministry of Internal Affairs and Communications",
    title: "源内 OSS와 가버먼트 AI 국제공동개발",
    summary: "정부 AI ‘源内’의 OSS화를 바탕으로 ASEAN·글로벌사우스와 수요·과제를 조사하고 공동개발·협력 모델을 만든다.",
    insight: "정부 내부 도구를 국제 공공재·협력 모델로 확장해 AI 자율성을 외교·개발 의제로 연결한다.",
    metric: "2026 조사 → 2027 이후 구현",
    tags: ["OSS", "국제협력", "AI자율성"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-ai-administrative-governance",
    code: "1-15",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Digital Agency",
    title: "행정통칙법 관점 AI 거버넌스",
    summary: "AI의 편익을 살리면서 권리·투명성·공정성을 확보하기 위해 행정절차·불복심사 관점의 가이드라인과 쟁점을 검토한다.",
    insight: "책임 있는 업무재설계는 사람의 최종 판단점과 시민의 이의제기 경로까지 설계하는 일이다.",
    metric: "2026 가이드라인 검토",
    tags: ["거버넌스", "투명성", "권리보호"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-genai-guideline",
    code: "1-6",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Digital Agency",
    title: "생성 AI 조달·활용 가이드라인 개정",
    summary: "정부 직원이 AI·AI 에이전트를 안전하게 쓰도록 각 부처 유스케이스 확대를 반영해 조달·활용 가이드라인을 개정한다.",
    insight: "가드레일을 금지목록이 아니라 실제 유스케이스와 함께 업데이트한다.",
    metric: "2026 개정안 결론",
    tags: ["가이드라인", "조달", "안전"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-user-centered-ai",
    code: "1-9",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Digital Agency",
    title: "이용자 관점 AI 설계 가이드",
    summary: "국민·사업자·공무원의 필요에 맞게 AI를 행정서비스에 넣기 위한 설계지침·가이드북·지원도구를 만들고, 서비스 기획부터 운영까지 표준 프로세스를 갖춘다.",
    insight: "AI 품질을 모델 성능만이 아니라 서비스디자인·요건정의·조달·운영의 전체 흐름에서 본다.",
    metric: "2026 도구 1건 이상 공개",
    tags: ["서비스디자인", "사용자중심", "체크리스트"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-dmp",
    code: "1-10",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency",
    title: "DMP로 공공 SaaS 조달 단순화",
    summary: "정부·지자체가 카탈로그에서 SaaS를 빠르게 조달하고, 스타트업 등 다양한 공급자의 공공시장 진입을 넓히는 디지털 마켓플레이스다.",
    insight: "공공 AI 확산의 병목인 조달 시간을 플랫폼·표준·공급자 생태계로 줄인다.",
    metric: "2026 등록 소프트웨어 750개 목표",
    tags: ["DMP", "공공SaaS", "조달"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-analog-regulation",
    code: "1-16",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency",
    title: "아날로그 규제의 디지털 전환",
    summary: "사람·서면 개입을 요구하는 규제를 정비해 인프라 점검과 지자체 업무에 디지털 기술이 들어갈 수 있도록 하고, 기술 맵으로 현장 구현을 돕는다.",
    insight: "AI 도입 전에 규정상 사람·서류·대면 의무를 찾아 없애는 제도 BPR이다.",
    metric: "국가 규제 재검토 약 99% 완료",
    tags: ["규제개혁", "제도BPR", "기술맵"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-base-registry",
    code: "1-18",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency",
    title: "베이스 레지스트리로 행정 데이터 연결",
    summary: "법인·부동산·주소 등 여러 절차가 공통으로 참조하는 데이터를 기관 간 연결해 신청·검증의 반복을 줄이고 민간 활용도 연다.",
    insight: "AI 에이전트의 정확도보다 먼저, 한 번 만든 공적 기초정보를 여러 업무가 재사용하도록 만든다.",
    metric: "법인·부동산·주소 데이터",
    tags: ["베이스레지스트리", "데이터연계", "원스온리"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-law-data",
    code: "1-19",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency",
    title: "법령 데이터와 법제사무 디지털화",
    summary: "법률·정령·성령에 이어 법규적 고시까지 법령 데이터를 정비해 정부 법제사무와 민간 규제 파악의 효율을 높인다.",
    insight: "법령 원문을 연결 가능한 데이터로 만들면 RAG를 넘어 규칙 변경과 업무 영향 분석까지 가능해진다.",
    metric: "2026 단계적 제공 시작",
    tags: ["법령데이터", "법제사무", "RAG"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-gcas-devstack",
    code: "2-5",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "실증",
    date: "2026.07",
    agency: "Digital Agency",
    title: "GCAS DevStack 공공 AI 개발환경",
    summary: "가버먼트 클라우드 위에 공공시스템 개발환경을 제공하고, 보안 점검·소프트웨어 공급망 가시화·AI 개발환경으로 기간과 비용을 낮춘다.",
    insight: "공공 시스템 개발자에게 공통 툴체인과 안전한 기본값을 제공하는 내부 플랫폼 전략이다.",
    metric: "2026 AI 개발환경 정비",
    tags: ["DevStack", "개발생산성", "공급망"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-public-service-mesh",
    code: "2-6",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "주·지방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency",
    title: "공공서비스 메쉬와 지자체 BPR",
    summary: "표준 시스템·공공 SaaS·마이넘버포털을 연결해 지자체가 서비스를 선택하면 저비용으로 연계되고, 업무의 속인성과 연결조정 부담을 줄인다.",
    insight: "공통 데이터 연결을 업무 효율화·BPR의 기반으로 둔다.",
    metric: "2030 희망 지자체 도입률 100%",
    tags: ["서비스메쉬", "BPR", "공통인프라"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-municipal-ax",
    code: "2-7",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "주·지방",
    stage: "확산",
    date: "2026.07",
    agency: "Ministry of Internal Affairs and Communications",
    title: "지자체 AX/DX: 프런트야드·백야드 통합",
    summary: "창구를 출발점으로 주민 접점을 개선하고 표준 기초시스템과 데이터를 연결해 온라인 완결·업무 자동화·BI 정책수립을 추진한다.",
    insight: "시민 접점(front yard)과 내부 업무(backyard)를 함께 바꿔야 지자체 AX가 지속된다.",
    metric: "AI·자동화·BI·공동조달",
    tags: ["지자체AX", "창구DX", "BI"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-gss-standard-workspace",
    code: "1-1",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency",
    title: "GSS: 정부 공통 업무환경",
    summary: "PC·네트워크·정부 클라우드 접속을 공통 표준환경으로 통합해 생산성과 보안을 동시에 끌어올리고, 정형업무(단말관리·헬프데스크)의 외부위탁까지 포함해 지속가능한 운영체계를 갖춘다.",
    insight: "툴을 부처별로 선택하게 두지 않고 조직 전체의 기본 업무환경을 공통화한다.",
    metric: "2031년도말 약 28만 명·6,000거점",
    tags: ["GSS", "업무환경", "보안"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-digital-law-review",
    code: "1-17",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency · Cabinet Secretariat",
    title: "디지털 법제심사",
    summary: "내각 제출 법안마다 디지털 원칙 적합성을 점검하고, 아날로그 규제와 시스템 구축을 어렵게 하는 조항을 기술 맵·점검 도구로 검토한다.",
    insight: "새 제도를 만든 뒤 디지털화하지 않고 입법 단계부터 자동화 가능성을 심사한다.",
    metric: "매 국회 점검 결과 공개",
    tags: ["법제심사", "디지털원칙", "규제"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-open-data",
    code: "2-9",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "주·지방",
    stage: "전략",
    date: "2026.07",
    agency: "Digital Agency · MIC",
    title: "생성 AI 시대의 공공 오픈데이터 개편",
    summary: "공공데이터 이용규약·e-Gov 데이터 연계·기계가독 데이터셋을 재정비하고, 지자체 간 유스케이스를 발굴한다.",
    insight: "오픈데이터 정책도 AI가 읽고 재사용할 수 있는 구조로 다시 설계한다.",
    metric: "지자체 참여 약 90%",
    tags: ["오픈데이터", "기계가독", "재사용"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-front-service-api",
    code: "3-23",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "주·지방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency",
    title: "프런트서비스 API 기반",
    summary: "온라인 신청에 이름·주소 자동 전기, 보정 요청·처분 통지를 API로 연결해 시민과 공무원의 반복 입력을 줄인다.",
    insight: "대민 채널을 하나의 API 기반으로 만들면 접수 이후의 내부 처리도 함께 표준화된다.",
    metric: "2026 대상 17개 절차",
    tags: ["API", "온라인신청", "원스온리"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-accounting-dx",
    code: "3-130",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Cabinet Secretariat · Digital Agency · Ministry of Finance",
    title: "회계 DX와 원스온리",
    summary: "국가 회계의 중복 입력을 줄이고 표준 업무·데이터·서식과 시스템을 정리해 투명성과 전체 최적화를 추진한다.",
    insight: "반복 입력 제거를 시스템 구축이 아니라 업무·데이터 표준화 과제로 접근한다.",
    metric: "148만~424만 시간 절감 전망",
    tags: ["회계", "원스온리", "표준화"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-ina-dx",
    code: "3-131",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Ministry of Internal Affairs and Communications",
    title: "독립행정법인 DX: 프로세스 개혁 후 디지털화",
    summary: "독립행정법인이 일하는 방식을 먼저 바꾼 뒤 디지털화하고, 데이터 분석·평가 기반으로 서비스 품질을 개선한다.",
    insight: "‘업무 프로세스 개혁 후 디지털화’를 명시한 정부 조직개편 사례다.",
    metric: "2026 요구정의 → 2027 α판",
    tags: ["프로세스개혁", "평가", "데이터"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-egov",
    code: "3-136",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "운영",
    date: "2026.07",
    agency: "Digital Agency",
    title: "e-Gov 전자신청 확장",
    summary: "전자신청·심사 지원 서비스를 안정화하고 국·지방 행정절차의 온라인화를 지원한다.",
    insight: "내부 심사 지원과 대외 전자신청을 하나의 운영 기반으로 확장한다.",
    metric: "2026 4,294만 건 목표",
    tags: ["e-Gov", "전자신청", "심사지원"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-public-records",
    code: "3-139",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "Cabinet Secretariat",
    title: "공문서 관리 디지털화",
    summary: "문서관리 규칙을 디지털에 맞게 정비하고 메타데이터를 붙여 문서 생성부터 보존까지 전자적으로 처리한다.",
    insight: "AI 활용의 전제인 기록·메타데이터·보존 규칙을 업무 시스템에 내장한다.",
    metric: "2030 기능 완성 목표",
    tags: ["공문서", "메타데이터", "기록관리"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-geo-ai",
    code: "3-162",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "MLIT · Geospatial Information Authority",
    title: "Geo AI: 지리공간 정보로 정책판단 고도화",
    summary: "공공 지리공간 정보를 AI-Ready로 정비하고 분석·평가·정책결정에 활용하는 산학관 체계를 만든다.",
    insight: "정책 현장 데이터를 AI가 읽을 수 있는 공간정보로 만들어 의사결정의 질을 바꾼다.",
    metric: "AI-Ready 공간정보 유통환경",
    tags: ["GeoAI", "공간정보", "정책분석"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-school-ai",
    code: "3-82",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "주·지방",
    stage: "실증",
    date: "2026.07",
    agency: "MEXT",
    title: "학교 현장 AI 활용과 교무 개선",
    summary: "학교 AI 가이드라인을 개정하고 교사 연수·파일럿 학교·교무 활용 연구를 통해 안전한 현장 확산을 지원한다.",
    insight: "직원 교육과 위험 대응을 파일럿과 함께 묶어 현장 채택을 측정한다.",
    metric: "2029년 50% 이상 학교 목표",
    tags: ["교육", "교무", "AI리터러시"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-disaster-data",
    code: "3-102",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "실증",
    date: "2026.07",
    agency: "Cabinet Office · Digital Agency · MIC",
    title: "방재 데이터 유통·민관 공동개발",
    summary: "SOBO-WEB 등에 모인 재난정보를 민간 앱·서비스가 활용할 수 있도록 데이터 제공·운영 규칙을 설계한다.",
    insight: "공공 데이터의 개방 여부만이 아니라 기관 간 조정 비용과 운영 규칙을 함께 설계한다.",
    metric: "프로토타입 연계 기반",
    tags: ["방재", "데이터유통", "민관협력"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-emergency-ai",
    code: "3-53",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "주·지방",
    stage: "확산",
    date: "2026.07",
    agency: "Fire and Disaster Management Agency",
    title: "AI로 구급대 운영 최적화",
    summary: "AI로 출동 운영을 최적화해 현장 도착 시간을 줄이고, 소방본부 도입을 위한 설명회·기술 지원을 제공한다.",
    insight: "AI 결과를 연구로 끝내지 않고 기술 카탈로그·교육·지원으로 현장 도입 루프를 만든다.",
    metric: "전국 소방본부 확산 지원",
    tags: ["응급", "운영최적화", "현장확산"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-smart-city",
    code: "2-15",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "주·지방",
    stage: "실증",
    date: "2026.07",
    agency: "Cabinet Office · Digital Agency",
    title: "스마트시티: AI·IoT·민관데이터 실장",
    summary: "AI·IoT와 민관 데이터를 지역 문제 해결에 적용하고, 레퍼런스 아키텍처와 민관 플랫폼으로 재사용 가능한 모델을 만든다.",
    insight: "기술 실증을 도시 운영 모델과 레퍼런스 아키텍처로 번역한다.",
    metric: "로드맵·레퍼런스 아키텍처",
    tags: ["스마트시티", "민관데이터", "재사용"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-ai-basic-plan",
    code: "1-8",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Digital Agency",
    title: "인공지능 기본계획으로 정책 정렬",
    summary: "AI 구동형 국가 실현의 상위 전략으로 인공지능 기본계획을 추진하고, 이용자 관점 AI 활용환경·공공조달 개혁·디지털 마켓플레이스를 하위 시책으로 연결한다.",
    insight: "개별 도구 도입을 국가 AI 기본계획이라는 상위 전략에 정렬해 부처별 중복과 표류를 막는다.",
    metric: "인공지능 기본계획(2026.7.14 각의결정) 4대 방침",
    tags: ["AI기본계획", "국가전략", "정책정렬"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-benefit-infra",
    code: "1-23",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "실증",
    date: "2026.07",
    agency: "Digital Agency",
    title: "공정·신속한 급부 인프라 — 디지털 패전의 교훈",
    summary: "코로나19의 ‘디지털 패전’을 교훈으로 신청–심사–입금을 일관되게 디지털로 처리하는 급부 인프라를 구축하고, 공공서비스 메시 강화·공금수취계좌 전제 설계·국고지급시스템(ADAMSⅡ) 개편으로 국가가 필요한 시점에 직접 지원한다.",
    insight: "위기 시 행정의 ‘속도’를 임시 시스템이 아니라 급부 데이터·계좌 인프라의 평시 정비로 확보한다.",
    metric: "2026년도 착수 · 공금수취계좌 옵트아웃",
    tags: ["급부인프라", "공금수취계좌", "위기대응"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-local-standardization",
    code: "2-1",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "주·지방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency · MIC",
    title: "지자체 핵심시스템 표준화·정부 클라우드 이전",
    summary: "20개 핵심업무시스템을 표준준거 시스템으로 통일해 정부 클라우드로 이전하고, 이전 후 운영비 적정화와 데이터연계 자동화로 표준화 효과를 가시화한다.",
    insight: "AI·데이터 연계의 전제인 ‘데이터 구조 통일’을 지자체 표준화라는 대규모 이행과제로 먼저 끝낸다.",
    metric: "2025년도말 표준화 대상 약 70% 이전",
    tags: ["표준화", "정부클라우드", "지자체이전"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-cloud-security-dashboard",
    code: "1-4",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "운영",
    date: "2026.07",
    agency: "Digital Agency",
    title: "정부 클라우드 보안 대시보드·재해복구",
    summary: "정부 클라우드 이용기관 확대에 맞춰 디지털청이 보안상황을 가시화·환류하는 보안 대시보드를 확장하고, 공통 운영관리기능을 다른 데이터센터에서 복구하는 재해대비 기능을 정비한다.",
    insight: "공통 클라우드의 확산 리스크를 중앙 가시화·기관 자율대응·재해복구 설계로 관리한다.",
    metric: "2026년도 보안 대시보드 확장",
    tags: ["정부클라우드", "보안대시보드", "재해복구"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-human-centered-ai",
    code: "1-7",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "초국가",
    stage: "전략",
    date: "2026.07",
    agency: "Ministry of Internal Affairs and Communications",
    title: "히로시마 AI 프로세스 — 인간중심 AI 원칙 실천",
    summary: "히로시마 AI 프로세스를 기반으로 G7·GPAI와 연계해 인간중심·안전·신뢰 가능한 AI의 글로벌 생태계를 넓히고, 프렌즈 그룹 액션플랜을 분기별로 후속 점검한다.",
    insight: "AI 거버넌스를 국내 규율이 아니라 민주적 가치에 기반한 국제 공동규범 형성으로 확장한다.",
    metric: "프렌즈 그룹 분기 회의 · 액션플랜 2026 점검",
    tags: ["히로시마AI프로세스", "AI거버넌스", "국제규범"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-ai-sovereignty",
    code: "4-1",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "실증",
    date: "2026.07",
    agency: "Digital Agency",
    title: "정부 AI의 전략적 자율성(AI 주권) 확보",
    summary: "AI 주권 확보를 위해 2026년도 국산 포함 복수 기반모델을 가버먼트 AI에서 비교평가하고, 2027년도 국내외 모델을 과업별로 선택·전환하는 통합운영기반을 개발해 특정 사업자의 장애·철수에도 대비한다.",
    insight: "특정 모델·사업자 종속을 국가가 자율적으로 평가·선택·전환하는 운영기반으로 관리한다.",
    metric: "2026 복수모델 비교평가 → 2027 통합운영기반",
    tags: ["AI주권", "모델선택", "전략적자율성"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-senior-digital-talent",
    code: "6-11",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "운영",
    date: "2026.07",
    agency: "Cabinet Secretariat · Digital Agency",
    title: "고급 디지털인재 외부 임용·협업",
    summary: "각 부처의 업무효율화·근본적 업무개혁과 고도 사이버보안 대응을 위해 디지털청과 국가사이버통괄실이 외부 고급 전문인재를 매년 임용해 각 부처를 지원·자문한다.",
    insight: "내부 육성만으로 부족한 고급 역량을 외부 전문인재 임용으로 조직에 직접 주입한다.",
    metric: "디지털청·사이버통괄실 매년 전문인재 임용",
    tags: ["디지털인재", "외부임용", "업무개혁"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-policy-dashboard",
    code: "7-22",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency · Cabinet Secretariat",
    title: "정책 대시보드로 민첩한 정책 모니터링",
    summary: "데이터 기반 정책수립·평가를 위해 정책 대시보드와 공적통계 Japan Dashboard를 개발·공개하고, 데이터기반 ‘sukuna’ 확대와 가이드북으로 각 부처의 대시보드 작성·활용을 지원한다.",
    insight: "정책 성과를 문서 보고가 아니라 상시 데이터 가시화로 관리해 담당자와 국민이 직관적으로 진행을 확인하게 한다.",
    metric: "2027년 지원정책 40건·60만 PV, 2029년 부처 정착",
    tags: ["정책대시보드", "데이터기반정책", "JapanDashboard"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-portfolio-audit",
    code: "8-6",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "운영",
    date: "2026.07",
    agency: "Digital Agency",
    title: "정보시스템 일원적 프로젝트 감리",
    summary: "정부 정보시스템 운영비 30% 절감목표 아래 평가를 비용효과 중심으로 전환하고, 타당성이 확인되지 않으면 예산요구·집행을 원칙적으로 불허하며, PMO가 생애주기 전반을 횡단 관리해 상류단계부터 BPR과 공통기능 활용을 촉진한다.",
    insight: "시스템 예산을 개별 심사가 아니라 포트폴리오 차원의 비용효과·공통기능 강제로 통제한다.",
    metric: "비용효과 100%↑ 시스템 비율 100% 목표",
    tags: ["포트폴리오감리", "비용효과", "BPR"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-counter-dx",
    code: "2-8",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "주·지방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency",
    title: "창구 DX — ‘작성하지 않는 원스톱 창구’",
    summary: "정부 클라우드의 「창구 DX SaaS」를 확산하고, 창구업무 개혁 경험이 있는 지자체 직원을 ‘창구 BPR 자문관’으로 파견해 백야드 개혁과 추진체계 구축을 지원한다.",
    insight: "창구 화면만 바꾸지 않고 백야드 업무개혁과 자문관 파견까지 묶어 원스톱을 실현한다.",
    metric: "창구 BPR 자문관 파견 확대",
    tags: ["창구DX", "원스톱", "BPR자문관"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-travel-expense-bpr",
    code: "3-133",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "실증",
    date: "2026.07",
    agency: "Digital Agency",
    title: "여비정산 시스템 근본 쇄신과 AI 챗봇",
    summary: "여비 등 내부관리 공통시스템을 영수증 불러오기·공용 신용카드 연계 등 민간 표준기능을 갖춘 차기 시스템으로 갱신하고, 현행 시스템에는 생성형 AI 챗봇을 도입해 교육시간·문의건수를 줄인다.",
    insight: "내부 백오피스(여비정산)를 UI/UX·AI 챗봇·프로세스 재설계로 근본 개편해 직원 부담을 줄인다.",
    metric: "만족도 NPS +10p · 2028년도말 차기 시스템",
    tags: ["여비정산", "백오피스", "생성형AI"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-labor-inspection-ai",
    code: "3-138",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "실증",
    date: "2026.07",
    agency: "Ministry of Health, Labour and Welfare",
    title: "AI 기반 노동기준감독 — 위험 타깃팅",
    summary: "감독관이 부족한 상황에서 감독서에 축적된 정보와 AI를 결합해 위반·산업재해 위험이 높은 사업장을 선정하고 한정된 자원을 집중하며, 자율개선을 지원하는 웹사이트를 구축한다.",
    insight: "규제 집행을 전수점검이 아니라 AI 기반 위험 타깃팅으로 전환해 한정된 인력을 배분한다.",
    metric: "2027년도 자율개선 지원 사이트 운영",
    tags: ["위험기반집행", "노동감독", "자원배분"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-govt-ospo",
    code: "4-6",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Digital Agency",
    title: "정부 OSS 자율성과 OSPO 최초 설치",
    summary: "표준 확산 소프트웨어를 OSS로 공개(아웃바운드)하고 보안위험을 관리하며 OSS를 적극 도입(인바운드)해 벤더 종속을 피하고, 이를 총괄할 OSPO(Open Source Program Office)를 정부 최초로 설치한다.",
    insight: "소프트웨어 자율성을 선언이 아니라 OSPO라는 상설 조직·거버넌스로 제도화한다.",
    metric: "2026년도 정부 최초 OSPO 설치",
    tags: ["OSS", "OSPO", "벤더종속회피"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-yata-shield",
    code: "5-1",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Cabinet Secretariat",
    title: "Project YATA-Shield — AI 시대 사이버보안 패키지",
    summary: "AI 성능이 고도화되는 상황에서도 사이버보안을 확보하기 위해 중요인프라 사업자 대응과 취약점 발견·수정을 함께 담은 정부 전체 대책 패키지 ‘Project YATA-Shield’를 추진하고 시행상황을 기동적으로 점검한다.",
    insight: "AI가 공격 속도·규모를 키우는 국면을 개별 대응이 아니라 범정부 통합 패키지로 관리한다.",
    metric: "12개 부처·기관 합동 시행",
    tags: ["사이버보안", "중요인프라", "범정부"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-civil-court-digital",
    code: "3-190",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "Ministry of Justice",
    title: "민사재판절차 전면 디지털화",
    summary: "민사소송이 2026년 5월 전면 디지털화되었고, 민사집행·보전·도산·가사사건 등도 사법부의 자율적 판단을 존중하며 2028년 6월까지 전면 시행하도록 환경을 정비한다.",
    insight: "사법 절차라는 고신뢰 업무도 단계적 입법과 환경정비를 거쳐 종이에서 데이터로 옮긴다.",
    metric: "민사소송 2026.5 전면 디지털화 · 2028.6 확대",
    tags: ["사법디지털화", "민사소송", "절차전환"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-teacher-workload",
    code: "3-94",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "주·지방",
    stage: "확산",
    date: "2026.07",
    agency: "MEXT",
    title: "교사 근무방식 개혁 — 대시보드로 초과근무 가시화",
    summary: "2029년도까지 교사의 월평균 시간외 근무를 약 30시간으로 줄이는 목표 아래, ‘학교와 교사 업무의 3분류’ 추진상황과 교육위원회별 초과근무를 정책 대시보드로 가시화해 각 위원회가 시책을 재검토하게 한다.",
    insight: "근무방식 개혁을 구호가 아니라 교육위원회별 초과근무 데이터의 상시 공개로 밀어붙인다.",
    metric: "2029년도 월 시간외 근무 약 30시간 목표",
    tags: ["근무방식개혁", "정책대시보드", "교원"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-hr-digital",
    code: "3-141",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "실증",
    date: "2026.07",
    agency: "Cabinet Secretariat · NPA · Digital Agency",
    title: "국가공무원 인사관리정보 디지털화",
    summary: "절차 전자화와 부처 공통체계로 인사업무를 효율화하기 위해 근무시간관리·직원정보관리 공통시스템과 인사관리지원 공통플랫폼을 정비한다.",
    insight: "인사를 부처별 개별 시스템에서 전략적 인사관리를 위한 공통 데이터 기반으로 옮긴다.",
    metric: "근무시간관리 2026 정비 → 2027 선행부처 운영",
    tags: ["인사관리", "공통플랫폼", "백오피스"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-common-chatbot",
    code: "7-24",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "Ministry of Internal Affairs and Communications",
    title: "‘가봇’ 국가·지방 공통상담 챗봇 + 생성형 AI",
    summary: "국민이 행정기관에 문의하기 전에 쓰는 공통상담 챗봇 ‘가봇’을 확충하고, 각 부처가 템플릿으로 자체 챗봇을 만들어 FAQ를 집약하며, 행정상담에 생성형 AI를 도입해 어려운 사건에 더 많은 시간을 쓰게 한다.",
    insight: "공통 챗봇으로 단순 문의를 흡수해 상담 인력을 난도 높은 사건으로 재배치한다.",
    metric: "2026.4 이후 탑재분야·FAQ 수시 확대",
    tags: ["상담챗봇", "생성형AI", "공통기반"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-agency-capacity",
    code: "8-1",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "운영",
    date: "2026.07",
    agency: "Digital Agency",
    title: "디지털청 추진체계 강화 — 지휘본부화",
    summary: "디지털청이 디지털사회 형성의 지휘본부로서 약 1,500명 규모로 행정·민간 전문인재를 채용하고, 2026년 9월 디지털행재정개혁회의 사무국을 이관받아 종합조정 기능을 강화한다.",
    insight: "AX를 부처 자율에 맡기지 않고 강한 지휘본부(디지털청)의 인력·권한 확충으로 끌고 간다.",
    metric: "2027년말 약 1,500명 · 2026년말 +100명",
    tags: ["추진체계", "지휘본부", "전문인재"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-public-saas",
    code: "2-4",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "주·지방",
    stage: "실증",
    date: "2026.07",
    agency: "Digital Agency",
    title: "공공 SaaS·BaaS 공통개발기반",
    summary: "민간이 소유하고 행정이 이용하는 시스템까지 정부 클라우드를 쓰도록 ‘공공 SaaS’를 정의하고, SaaS 공급자가 여러 지자체에 클라우드+SaaS를 일체 제공하도록 ID·인증·데이터연계 등 공통기능을 BaaS로 주는 공통개발기반을 정비한다.",
    insight: "지자체마다 개별 구축하던 앱을 공통 백엔드(BaaS)와 참조 아키텍처로 묶어 개발비를 낮춘다.",
    metric: "2026년도 공통개발기반·개발가이드 정비",
    tags: ["공공SaaS", "BaaS", "공통개발기반"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-tax-social-online",
    code: "3-119",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency · MHLW",
    title: "사회보험·세무절차 온라인 원스톱",
    summary: "마이넘버 포털 API로 사회보험·세무 절차를 온라인 원스톱화하고, 행정기관이 클라우드 데이터를 참조해 확정신고에 활용하며 대상절차를 넓힌다. 공적연금 시뮬레이터의 계산기능도 확장한다.",
    insight: "반복 제출을 마이넘버 데이터 참조로 없애 신고·납부의 절차 부담을 구조적으로 줄인다.",
    metric: "클라우드 참조 절차 2026 이후 확대",
    tags: ["세무", "사회보험", "원스톱"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-police-dx",
    code: "3-196",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "National Police Agency",
    title: "경찰업무 디지털화 — 공통기반 집약",
    summary: "경찰공통기반에 시스템을 공통화·집약하고 경찰행정절차 온라인시스템(2025.12 운영)과 유실물관리시스템을 전국에 확산하며 교통범칙금 지급수단을 다양화한다.",
    insight: "개별 시스템을 공통기반으로 집약해 현장 사무를 효율화하고 국민 접점을 온라인으로 옮긴다.",
    metric: "유실물관리 2026년말 전국 도도부현 운영",
    tags: ["경찰", "공통기반", "절차온라인"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-internal-talent",
    code: "5-25",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2026.07",
    agency: "Cabinet Secretariat · Digital Agency",
    title: "정부 디지털인재 내부 육성",
    summary: "각 부처가 「디지털인재 확보·육성계획」에 기술인정 목표와 고위직까지의 인사경로를 설정해 내부 전문인재를 계획적으로 육성하고, ‘사이버보안 인재 프레임워크 2026’을 반영하며 실무연수·자격·처우로 육성을 가속한다.",
    insight: "외부 임용과 짝을 이뤄, 내부 직원을 기술인정·인사경로·처우로 전문인재로 키운다.",
    metric: "연수 지식 활용 응답 80% 목표",
    tags: ["내부육성", "기술인정", "보안인재"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-procurement-gate",
    code: "8-2",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "실증",
    date: "2026.07",
    agency: "Digital Agency",
    title: "정보시스템 횡단 조달관리·게이트 통제",
    summary: "디지털청이 신규·개수 시스템을 내부개발할지 외부위탁할지 판단하고 단계별 게이트관리를 통일 기준·승인절차로 실시하며, 보안·운영감시 등 업무를 집약하고 가동 후 성과정보를 정기 수집해 미달 시스템을 개선 지원한다.",
    insight: "시스템 조달을 부처 재량이 아니라 통일 게이트·성과추적으로 횡단 통제한다.",
    metric: "2026년도 통일 게이트·승인체계 정비",
    tags: ["조달거버넌스", "게이트관리", "성과추적"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-total-design",
    code: "3-71",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Digital Agency",
    title: "토털 디자인 — 스마트폰 60초 절차완료",
    summary: "‘스마트폰 60초 절차완료·7일 서비스개시·민간 수준 비용’을 목표로 시스템·제도·업무를 일체 개혁하고, 출생·육아 분야 절차를 하나의 양식으로 온라인 일괄신청하며 같은 항목은 한 번만 입력하는 원스온리를 구현한다.",
    insight: "개별 절차 온라인화를 넘어 ‘60초·원스온리’라는 이용자 경험 목표로 제도·업무를 함께 바꾼다.",
    metric: "2026 여름 출생·육아 일괄신청 정비",
    tags: ["토털디자인", "원스온리", "출생육아"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-wellbeing-index",
    code: "2-13",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "주·지방",
    stage: "확산",
    date: "2026.07",
    agency: "Digital Agency",
    title: "지역행복도(Well-Being) 지표 기반 지역문제 해결",
    summary: "약 250개 지자체가 쓰는 지역행복도 지표 데이터세트와 대시보드를 개선·확산해, 관민 워크숍에서 분야횡단 정책입안과 주민참여형 지역만들기를 활성화한다.",
    insight: "지자체 정책을 감이 아니라 공통 행복도 지표·대시보드 위에서 설계하게 한다.",
    metric: "2030년말 활용 지자체 450개(전국 1/4)",
    tags: ["Well-Being지표", "데이터기반", "지방창생"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  {
    id: "japan-hellowork",
    code: "3-197",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "운영",
    date: "2026.07",
    agency: "Ministry of Health, Labour and Welfare",
    title: "헬로워크 온라인 고용서비스 확충",
    summary: "온라인 구인·구직 신청과 마이페이지로 방문 없이 구직활동을 가능하게 하고, 구직자 상황별 개별지원·정착지원과 고용보험업무 디지털화로 진짜 지원이 필요한 이용자 서비스를 확충한다.",
    insight: "창구 방문형 고용서비스를 온라인 셀프서비스와 표적 지원으로 재편한다.",
    metric: "2026년도 구직자 마이페이지 이용률 50%",
    tags: ["고용서비스", "온라인신청", "표적지원"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
];

const JAPAN_POLICY_FEATURED_ITEMS = JAPAN_EXECUTION_ITEMS.slice(0, 18);

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "kr-ai-lab",
    flag: "🇰🇷",
    country: "대한민국",
    region: "한국",
    scope: "중앙·연방",
    stage: "실증",
    date: "2026.07",
    agency: "행정안전부",
    title: "AI 정부 실험실 — 공무원이 만든 AI 과제",
    summary: "공무원이 대화형 코딩과 AI 도구로 업무개선 과제를 직접 개발·검증하는 실험환경으로, ‘나라 예산 한눈에’·‘재난 문자 지도’·‘모두의 민원콜’ 등이 나왔고 산출물은 공공 GitLab으로 관리한다.",
    insight: "AI 역량을 외부 발주가 아니라 현장 공무원의 직접 개발로 옮겨, 도구 도입이 아니라 문제정의·프로토타입 능력을 조직에 심는다.",
    metric: "2026.07 시범 → 2027년 동시접속 3,000명",
    tags: ["시민개발", "대화형코딩", "AI챔피언"],
    group: "정부",
    url: "https://www.mois.go.kr/frt/bbs/type010/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000008&nttId=128081",
  },
  {
    id: "kr-judgment-open",
    flag: "🇰🇷",
    country: "대한민국",
    region: "한국",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "행정안전부",
    title: "법원 판결문 개방과 리걸테크 — 고가치 데이터 TOP 100",
    summary: "AI 시대 법률데이터 개방을 위해 민·관 세미나를 열어, 판결문을 공공데이터로 개방해 AI 기반 맞춤형 법률상담과 리걸테크 산업 육성, 국민 법률서비스 접근성을 높이는 방향을 논의했다.",
    insight: "AI 서비스의 병목을 모델이 아니라 개방된 고가치 데이터로 보고, 데이터 개방을 산업 육성·접근성 정책으로 연결한다.",
    metric: "인공지능·고가치 공공데이터 TOP 100",
    tags: ["공공데이터개방", "리걸테크", "고가치데이터"],
    group: "정부",
    url: "https://www.mois.go.kr/frt/bbs/type010/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000008&nttId=128079",
  },
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
    id: "kr-seoul-ai-chat-llm",
    flag: "🇰🇷",
    country: "대한민국",
    region: "한국",
    scope: "주·지방",
    stage: "확산",
    date: "2026.01",
    agency: "서울특별시",
    title: "서울AI챗 전 직원 확산 + 자체 LLM 도입",
    summary: "서울시가 29종 생성형 AI 모델을 골라 쓰는 내부 업무용 ‘서울AI챗’을 운영해 본청 직원의 63% 이상이 활용 중이며, 보고서 작성이 3~4시간에서 약 1시간으로 줄었고 2026년 2월 민감정보 유출을 막는 자체 LLM 시범 도입을 시작한다.",
    insight: "상용 구독형이 아니라 모델을 골라 쓰는 내부 게이트웨이와 자체 LLM 조합으로, AI 활용을 보안·비용 통제 가능한 조직 인프라로 전환했다.",
    metric: "본청 63%+ 활용(6,318명)·만족도 89%·보고서 3~4h→약 1h",
    tags: ["지자체AI행정", "내부생산성", "자체LLM"],
    group: "정부",
    url: "https://news.seoul.go.kr/gov/archives/574496",
  },
  {
    id: "kr-pps-worknet-genai",
    flag: "🇰🇷",
    country: "대한민국",
    region: "한국",
    scope: "중앙·연방",
    stage: "확산",
    date: "2025.09",
    agency: "조달청",
    title: "공공 업무망 내 생성형 AI 이용 개통",
    summary: "조달청이 그동안 인터넷망에서만 쓰던 생성형 AI를 정부·지자체·공공기관의 폐쇄 업무망에서도 쓸 수 있도록 개통해, 국정원 최고등급 보안검증을 충족한 환경에서 자료·통계 분석, 보고서 작성·요약, 문서 초안 생성을 지원한다.",
    insight: "‘망분리’ 규제 안에서 생성형 AI를 실무 업무망으로 끌어들여, 공무원 일상 업무에 AI를 붙일 수 있는 보안 관문을 제도적으로 열었다.",
    metric: "업무망 내 생성형 AI 개통(국정원 최고등급 보안검증)",
    tags: ["망분리", "업무생산성", "공공클라우드"],
    group: "정부",
    url: "https://www.pps.go.kr/kor/bbs/view.do?key=00634&bbsSn=2509080008",
  },
  {
    id: "kr-customs-xsync-ai-xray",
    flag: "🇰🇷",
    country: "대한민국",
    region: "한국",
    scope: "중앙·연방",
    stage: "실증",
    date: "2025.12",
    agency: "관세청",
    title: "AI 엑스레이 판독 ‘X-Sync’ 사업 완료",
    summary: "관세청이 엑스레이 영상과 화물 신고정보를 AI로 실시간 연계·통합하는 통관 영상관리 솔루션 ‘X-Sync’를 완료해, 불법·위해물품 AI 판독 알림과 유사 영상 검색 기능을 갖추고 인천공항세관 특송통관 현장에서 실증했다.",
    insight: "심사관 개인 숙련도에 의존하던 엑스레이 판독을 신고정보 연계와 AI 알림으로 재설계해 통관 검사 업무 방식을 데이터 기반으로 바꿨다.",
    metric: "총사업비 30억 원·2023.6~2025.12·인천공항세관 특송 실증",
    tags: ["통관검사", "컴퓨터비전", "실증"],
    group: "정부",
    url: "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156737262",
  },
  {
    id: "kr-nts-genai-tax-counseling",
    flag: "🇰🇷",
    country: "대한민국",
    region: "한국",
    scope: "중앙·연방",
    stage: "운영",
    date: "2026.04",
    agency: "국세청",
    title: "생성형 AI 국세상담 챗봇 확대 운영",
    summary: "국세청이 홈택스에서 24시간 응대하는 생성형 AI 국세상담을 부가가치세·연말정산에 이어 2026년 5월부터 종합소득세·장려금으로 확대한다. 세법 개정·유권해석을 실시간 반영하는 세무 특화 챗봇이다.",
    insight: "범용 AI가 아닌 세법 개정을 실시간 반영하는 도메인 특화 챗봇으로 상담 채널을 재편해, 이용자는 늘되 상담 부하는 줄였다.",
    metric: "총이용자 전년比 +20%·질의 약 -26%·2026.5 종소세 확대",
    tags: ["대국민서비스", "세무챗봇", "서비스재설계"],
    group: "정부",
    url: "https://www.korea.kr/news/policyNewsView.do?newsId=156757496",
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
    title: "Government AI ‘GENAI’ 전 부처 실증",
    summary: "법령·관보·행정문서를 연결한 정부 공통 AI 환경을 전 부처로 확장하고, AI 앱·에이전트와 국내 LLM도 시험한다.",
    insight: "공통 데이터·모델·관리 규칙을 국가 단위로 설계해 부처별 중복 구축과 도입 장벽을 줄인다.",
    metric: "약 18만 명 대상",
    tags: ["법령", "AI에이전트", "국내LLM"],
    group: "정부",
    url: "https://www.digital.go.jp/en/policies/genai",
  },
  {
    id: "japan-ai-driven-state",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Digital Agency · Cabinet Office",
    title: "AI 구동형 국가를 향한 AX/DX 중점계획",
    summary: "생성 AI와 AI 에이전트를 행정·내부개발·조달에 넓히고, 자율형·제안형 행정서비스로 전환하는 국가 방향을 제시한다.",
    insight: "AI를 도구 도입이 아니라 제도·업무·시스템을 함께 바꾸는 국가 운영모델로 정의한다.",
    metric: "AX/DX 4대 기둥",
    tags: ["AI구동형국가", "AI에이전트", "인재·수용성"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    id: "japan-government-ai-workspace",
    flag: "🇯🇵",
    country: "일본",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "전략",
    date: "2026.07",
    agency: "Digital Agency · MIC · Cabinet Secretariat",
    title: "가버먼트 AI 워크스페이스와 MCP 접근환경",
    summary: "회의·출장 같은 공통업무를 BPR한 뒤 AI 에이전트와 연결한 업무시스템을 만들고, 행정시스템의 MCP 대응도 검토한다.",
    insight: "업무 선정 → BPR → 프로토타입 → 순차 운영의 흐름을 명시해 ‘툴 설치’와 업무혁신을 분리한다.",
    metric: "2026 BPR·프로토타입",
    tags: ["BPR", "MCP", "공통업무"],
    group: "정부",
    url: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
  },
  ...JAPAN_EXECUTION_ITEMS,
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
    id: "usa-gsa-usai-platform",
    flag: "🇺🇸",
    country: "미국",
    region: "북미",
    scope: "중앙·연방",
    stage: "실증",
    date: "2025.08",
    agency: "General Services Administration (GSA)",
    title: "USAi — 연방 공통 생성형 AI 실험·평가 플랫폼",
    summary: "GSA가 전 연방기관이 무비용으로 쓸 수 있는 생성형 AI 평가 스위트 ‘USAi’를 출범해, 주요 모델을 안전한 클라우드 환경에서 채팅·코드생성·문서요약 용도로 시험하고 대시보드로 기관별 도입 성숙도와 성능을 측정한다.",
    insight: "기관마다 개별 조달·검증하던 AI 도입을 하나의 공통 플랫폼으로 묶어 ‘실험→평가→확산’을 정부 표준 프로세스로 만든다.",
    metric: "전 연방기관 대상 무비용 시범(2025.8)",
    tags: ["공통플랫폼", "생성형AI", "기관간공유"],
    group: "정부",
    url: "https://www.gsa.gov/about-gsa/newsroom/news-releases/gsa-launches-usai-to-advance-white-house-americas-ai-action-plan-08142025",
  },
  {
    id: "uk-humphrey-civil-service-suite",
    flag: "🇬🇧",
    country: "영국",
    region: "유럽",
    scope: "중앙·연방",
    stage: "확산",
    date: "2025.05",
    agency: "Incubator for AI (i.AI), DSIT",
    title: "‘험프리’ — 공무원용 AI 도구 묶음",
    summary: "영국 정부가 회의록 자동요약(Minute), 공청회 응답 분석(Consult), 법령 조사(Lex), 의회기록 검색(Parlex) 등 공무원 업무를 지원하는 AI 도구 묶음 ‘험프리’를 배포하고 지방의회로도 시범 확대했다.",
    insight: "특정 시스템이 아니라 요약·검색·분석 같은 공무원의 반복 인지노동 자체를 도구화해 정부 전반의 업무 표준으로 삼았다.",
    metric: "회의당 약 1시간 절감 · 25개 지방의회 시범",
    tags: ["공무원생산성", "회의록자동화", "공청회분석"],
    group: "정부",
    url: "https://www.gov.uk/government/news/ai-experiments-see-humphrey-help-townhalls-cut-costs-and-improve-services",
  },
  {
    id: "estonia-ai-leap-2025",
    flag: "🇪🇪",
    country: "에스토니아",
    region: "유럽",
    scope: "중앙·연방",
    stage: "확산",
    date: "2025.02",
    agency: "Ministry of Education and Research · AI Leap Foundation",
    title: "AI Leap 2025 — 전국 학교 AI 도입 국가사업",
    summary: "에스토니아가 전국 학교에 최고 수준의 AI 도구와 활용 역량을 무상 제공하는 ‘AI Leap’을 출범해, 2025년 9월 고교생 2만명·교사 3천명으로 시작하고 공공-민간 공동 재단이 전략과 계약을 관리한다.",
    insight: "AI를 개별 교사의 선택이 아니라 국가가 계약·역량·거버넌스를 일괄 조달하는 공적 인프라로 다룬다.",
    metric: "고교생 2만명·교사 3천명(2025.9), 이후 확대",
    tags: ["국가AI조달", "역량강화", "공공민간재단"],
    group: "정부",
    url: "https://www.hm.ee/en/news/estonia-announces-groundbreaking-national-initiative-ai-leap-programme-bring-ai-tools-all",
  },
  {
    id: "singapore-govtech-aibots",
    flag: "🇸🇬",
    country: "싱가포르",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "운영",
    date: "2025.02",
    agency: "Government Technology Agency (GovTech)",
    title: "AIBots — 공무원 셀프서비스 챗봇 구축 플랫폼",
    summary: "싱가포르 GovTech의 AIBots는 공무원이 15분 내에 내부 지식베이스를 연결한 RAG 기반 생성형 AI 챗봇을 직접 만들어 배포하는 정부망 전용 플랫폼으로, 정책 문답·발언요지 작성·설문 분석 등에 활용된다.",
    insight: "AI 도구를 IT부서가 만들어 배포하지 않고 일선 공무원이 스스로 구축하게 해 AI 개발 권한을 현업으로 분산시킨다.",
    metric: "4만명·115개 기관·1.2만 봇·100만+ 메시지",
    tags: ["셀프서비스", "RAG챗봇", "내부지식"],
    group: "정부",
    url: "https://www.tech.gov.sg/products-and-services/for-government-agencies/productivity-and-marketing/aibots/",
  },
  {
    id: "france-albert-state-ai",
    flag: "🇫🇷",
    country: "프랑스",
    region: "유럽",
    scope: "중앙·연방",
    stage: "확산",
    date: "2024.01",
    agency: "DINUM · Etalab",
    title: "Albert — 국가 주권형 생성형 AI 플랫폼",
    summary: "프랑스 디지털총국(DINUM)이 개발한 Albert는 행정기관이 SecNumCloud 인증 주권 환경에서 생성형 AI를 쓸 수 있게 하는 부처 공통 추론 플랫폼으로, 오픈소스(OpenGateLLM) 기반 RAG로 France Services 창구의 시민 민원 응대를 지원한다.",
    insight: "빅테크 API 대신 국가가 자체 구축·운영하는 공통 AI 인프라로 데이터 주권과 부처 간 재사용을 동시에 확보한다.",
    metric: "70여 개 공공 프로젝트 활용",
    tags: ["주권AI", "부처공통인프라", "민원지원"],
    group: "정부",
    url: "https://www.numerique.gouv.fr/offre-accompagnement/expertise-albert-ia-etat/",
  },
  {
    id: "germany-baergpt-berlin",
    flag: "🇩🇪",
    country: "독일",
    region: "유럽",
    scope: "주·지방",
    stage: "운영",
    date: "2025.11",
    agency: "베를린 상원 · Technologiestiftung Berlin",
    title: "베를린 행정 전용 AI 비서 ‘BärGPT’",
    summary: "베를린주가 공무원 업무 지원을 위해 자체 개발한 오픈소스 기반 AI 비서 BärGPT를 출시했다. 텍스트 생성·번역·요약, 문서 자동 분석, 행정지식 RAG 검색을 제공하며 데이터 보호 기준을 충족하도록 공무원과 애자일하게 함께 만들었다.",
    insight: "생성형 AI를 외부 상용 서비스가 아니라 데이터주권·오픈소스 기반 자체 행정도구로 내재화해 인력난에 대응한다.",
    metric: "2025.11.25 출시 · 오픈소스 기반",
    tags: ["내부생산성", "데이터주권", "오픈소스"],
    group: "정부",
    url: "https://www.berlin.de/en/news/10042018-5559700-berlin-relies-on-its-own-ai-assistant-in.en.html",
  },
  {
    id: "taiwan-taigto-ai-talent-office",
    flag: "🇹🇼",
    country: "대만",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "확산",
    date: "2025.07",
    agency: "디지털부(MODA) · 인사행정총처(DGPA)",
    title: "대만 ‘AI 정부인재판공실(TAIGTO)’과 공용 실험 플랫폼",
    summary: "대만 정부가 디지털부와 인사행정총처 공동으로 ‘AI 정부인재판공실(TAIGTO)’을 출범해 부처 간 AI 인재 양성과 공무 적용을 총괄하고, 10종 이상 LLM을 시험하는 정부 AI 샌드박스(TryAI)와 재사용 봇 20종 이상의 ‘AI 봇 마켓플레이스’를 함께 제공한다.",
    insight: "개별 챗봇 도입을 넘어 인재 양성·공용 샌드박스·재사용 봇 마켓플레이스를 하나의 국가 플랫폼으로 묶어 중복개발을 줄인다.",
    metric: "2025.7 출범 · LLM 10종+ · 재사용 봇 20종+",
    tags: ["공용플랫폼", "인력양성", "거버넌스"],
    group: "정부",
    url: "https://moda.gov.tw/en/press/press-releases/16896",
  },
  {
    id: "uae-u-ask-unified-chatbot",
    flag: "🇦🇪",
    country: "아랍에미리트",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "운영",
    date: "2023.05",
    agency: "통신·디지털정부규제청(TDRA)",
    title: "UAE 통합 정부서비스 AI 챗봇 ‘U-Ask’",
    summary: "UAE 연방정부가 시민·거주자·근로자·학생·방문자·투자자의 정부서비스 문의에 답하는 통합 생성형 AI 챗봇 U-Ask를 공식 포털에서 운영한다. 아랍어·영어로 서비스 요건·맞춤 정보·신청 링크를 한 곳에서 24시간 제공한다.",
    insight: "부처별로 흩어진 서비스 안내를 단일 생성형 AI 창구로 통합해 ‘서비스 탐색’ 자체를 재설계했다.",
    metric: "아랍어·영어 24/7 · Gartner 2023 수상",
    tags: ["대민서비스", "생성형AI", "서비스재설계"],
    group: "정부",
    url: "https://u.ae/en/about-the-uae/digital-uae/digital-technology/artificial-intelligence/chatgpt",
  },
  {
    id: "india-bhashini-language-ai-dpi",
    flag: "🇮🇳",
    country: "인도",
    region: "아시아·태평양",
    scope: "중앙·연방",
    stage: "운영",
    date: "2022.07",
    agency: "전자정보기술부(MeitY) · Digital India Bhashini",
    title: "인도 다국어 정부서비스 언어 AI 공공인프라 ‘Bhashini’",
    summary: "인도의 플래그십 언어 플랫폼 Bhashini는 22개 헌법 지정 언어에 대한 실시간 번역·음성인식·음성합성을 공공 디지털 인프라(DPI)로 제공하고, 시민의 정부서비스·디지털 콘텐츠 접근과 의회 회의록까지 다국어로 연결한다.",
    insight: "언어 장벽을 공공 API 스택으로 해소해 모든 정부서비스에 재사용 가능한 다국어 계층을 깔았다.",
    metric: "22개 언어 · 300+ 언어 AI 모델 · 월 1억+ 추론",
    tags: ["언어AI", "디지털공공인프라", "포용성"],
    group: "정부",
    url: "https://ddnews.gov.in/en/indias-22-languages-go-digital-ai-platforms-like-bhashini-bharatgen-and-adi-vaani-lead-the-multilingual-revolution/",
  },
  {
    id: "ukraine-diia-ai-agent",
    flag: "🇺🇦",
    country: "우크라이나",
    region: "유럽",
    scope: "중앙·연방",
    stage: "운영",
    date: "2025.09",
    agency: "디지털전환부(Ministry of Digital Transformation)",
    title: "우크라이나 국가 AI 에이전트 ‘Diia.AI’",
    summary: "우크라이나 디지털전환부가 상담을 넘어 실제 공공서비스를 신청·처리해 주는 국가급 AI 에이전트 Diia.AI를 Diia 포털에 출시했다. 채팅으로 요청하면 소득증명 등 서류를 양식 작성 없이 발급하며, 저코드 플랫폼과 MCP로 정부서비스에 연결된다.",
    insight: "챗봇이 ‘안내’에서 ‘서비스 이행(에이전트)’으로 진화한 전환점으로, 정부서비스를 AI-네이티브 아키텍처로 재구성한다.",
    metric: "2025.09 출시 · 채팅으로 서비스 신청·발급",
    tags: ["AI에이전트", "서비스재설계", "AI네이티브정부"],
    group: "정부",
    url: "https://digitalstate.gov.ua/news/govtech/diiaai-building-the-architecture-of-an-ai-native-state",
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

// 업무방식(테마) 분류축 — '정부가 AI로 일하는 방식'을 7개 주제로 나눈다.
type Theme =
  | "공통 기반"
  | "조달·개발"
  | "데이터·규칙"
  | "대민 서비스"
  | "현장·집행"
  | "인재·업무개혁"
  | "거버넌스·주권";

const THEME_ORDER: Theme[] = [
  "공통 기반",
  "조달·개발",
  "데이터·규칙",
  "대민 서비스",
  "현장·집행",
  "인재·업무개혁",
  "거버넌스·주권",
];

const THEME_LABEL: Record<Theme, string> = {
  "공통 기반": "공통 기반·워크스페이스",
  "조달·개발": "조달·개발 방식",
  "데이터·규칙": "데이터·규칙·레지스트리",
  "대민 서비스": "대민 서비스 재설계",
  "현장·집행": "현장·집행 자동화",
  "인재·업무개혁": "인재·역량·업무개혁",
  "거버넌스·주권": "거버넌스·주권·감리",
};

const CASE_THEME: Record<string, Theme> = {
  // 공통 기반·워크스페이스
  "japan-regional-ax": "공통 기반",
  "japan-public-service-mesh": "공통 기반",
  "japan-gss-standard-workspace": "공통 기반",
  "japan-local-standardization": "공통 기반",
  "japan-cloud-security-dashboard": "공통 기반",
  "japan-gennai": "공통 기반",
  "japan-government-ai-workspace": "공통 기반",
  "kr-seoul-ai-chat-llm": "공통 기반",
  "kr-pps-worknet-genai": "공통 기반",
  "singapore-pair": "공통 기반",
  "eu-pilots": "공통 기반",
  "usa-gsa-usai-platform": "공통 기반",
  "singapore-govtech-aibots": "공통 기반",
  "france-albert-state-ai": "공통 기반",
  "ca-poppy": "공통 기반",
  // 조달·개발 방식
  "japan-ai-ready-guidelines": "조달·개발",
  "japan-ai-procurement": "조달·개발",
  "japan-dmp": "조달·개발",
  "japan-gcas-devstack": "조달·개발",
  // 데이터·규칙·레지스트리
  "japan-rules-as-code": "데이터·규칙",
  "japan-base-registry": "데이터·규칙",
  "japan-law-data": "데이터·규칙",
  "japan-open-data": "데이터·규칙",
  "japan-public-records": "데이터·규칙",
  "japan-geo-ai": "데이터·규칙",
  "kr-judgment-open": "데이터·규칙",
  // 대민 서비스 재설계
  "japan-user-centered-ai": "대민 서비스",
  "japan-municipal-ax": "대민 서비스",
  "japan-front-service-api": "대민 서비스",
  "japan-egov": "대민 서비스",
  "japan-benefit-infra": "대민 서비스",
  "japan-counter-dx": "대민 서비스",
  "japan-civil-court-digital": "대민 서비스",
  "kr-nts-genai-tax-counseling": "대민 서비스",
  "ca-pilots": "대민 서비스",
  "singapore-vica": "대민 서비스",
  // 현장·집행 자동화
  "japan-school-ai": "현장·집행",
  "japan-disaster-data": "현장·집행",
  "japan-emergency-ai": "현장·집행",
  "japan-smart-city": "현장·집행",
  "japan-labor-inspection-ai": "현장·집행",
  "kr-customs-xsync-ai-xray": "현장·집행",
  // 인재·역량·업무개혁
  "japan-ai-skills-platform": "인재·업무개혁",
  "japan-accounting-dx": "인재·업무개혁",
  "japan-ina-dx": "인재·업무개혁",
  "japan-senior-digital-talent": "인재·업무개혁",
  "japan-travel-expense-bpr": "인재·업무개혁",
  "japan-teacher-workload": "인재·업무개혁",
  "kr-ai-lab": "인재·업무개혁",
  "kr-champion": "인재·업무개혁",
  "uk-humphrey-civil-service-suite": "인재·업무개혁",
  "estonia-ai-leap-2025": "인재·업무개혁",
  "mckinsey-operating-model": "인재·업무개혁",
  "bcg-ai-at-work": "인재·업무개혁",
  "microsoft-frontier": "인재·업무개혁",
  "pwc-jobs-barometer": "인재·업무개혁",
  "accenture-work": "인재·업무개혁",
  // 거버넌스·주권·감리
  "japan-government-ai-global": "거버넌스·주권",
  "japan-ai-administrative-governance": "거버넌스·주권",
  "japan-genai-guideline": "거버넌스·주권",
  "japan-analog-regulation": "거버넌스·주권",
  "japan-digital-law-review": "거버넌스·주권",
  "japan-ai-basic-plan": "거버넌스·주권",
  "japan-human-centered-ai": "거버넌스·주권",
  "japan-ai-sovereignty": "거버넌스·주권",
  "japan-policy-dashboard": "거버넌스·주권",
  "japan-portfolio-audit": "거버넌스·주권",
  "japan-govt-ospo": "거버넌스·주권",
  "japan-yata-shield": "거버넌스·주권",
  "japan-ai-driven-state": "거버넌스·주권",
  "kr-common-guide": "거버넌스·주권",
  "kr-casebook": "거버넌스·주권",
  "us-inventory": "거버넌스·주권",
  "us-gao": "거버넌스·주권",
  "canada-register": "거버넌스·주권",
  "uk-playbook": "거버넌스·주권",
  "eu-public-admin": "거버넌스·주권",
  "australia-policy": "거버넌스·주권",
  "deloitte-enterprise": "거버넌스·주권",
  // 3차 보강 (일본 미반영 시책)
  "japan-hr-digital": "인재·업무개혁",
  "japan-common-chatbot": "대민 서비스",
  "japan-agency-capacity": "거버넌스·주권",
  "japan-public-saas": "조달·개발",
  "japan-tax-social-online": "대민 서비스",
  "japan-police-dx": "현장·집행",
  // 4차 보강
  "japan-internal-talent": "인재·업무개혁",
  "japan-procurement-gate": "거버넌스·주권",
  "japan-total-design": "대민 서비스",
  "japan-wellbeing-index": "현장·집행",
  "japan-hellowork": "대민 서비스",
  // 지리적 균형 보강 (신규 5개국)
  "germany-baergpt-berlin": "공통 기반",
  "taiwan-taigto-ai-talent-office": "인재·업무개혁",
  "uae-u-ask-unified-chatbot": "대민 서비스",
  "india-bhashini-language-ai-dpi": "공통 기반",
  "ukraine-diia-ai-agent": "대민 서비스",
};

function themeOf(item: CaseStudy): Theme {
  return CASE_THEME[item.id] ?? "거버넌스·주권";
}

// '심화 시책' = 코드가 붙은 일본 중점계획 개별 항목. 기본 화면에서는 접어 편중을 줄인다.
function isDeepPolicy(item: CaseStudy): boolean {
  return item.group === "정부" && Boolean(item.code);
}

// ── 2번째 직교축: '사람의 일'이 어떻게 바뀌나 ──
type WorkChange = "자동화" | "증강" | "셀프서비스화" | "재배치" | "기반화";
const WORK_CHANGE_ORDER: WorkChange[] = ["자동화", "증강", "셀프서비스화", "재배치", "기반화"];
const WORK_CHANGE_DESC: Record<WorkChange, string> = {
  자동화: "반복 업무를 AI가 대체·자동 처리",
  증강: "사람의 판단·작성·검색을 AI가 보조",
  셀프서비스화: "전문가·창구 없이 현업·시민이 직접",
  재배치: "역할·권한·인력을 다시 배치·감독",
  기반화: "공통 기반·표준·규칙을 재사용 자산으로",
};
const CASE_WORKCHANGE: Record<string, WorkChange> = {
  "japan-regional-ax": "기반화", "japan-public-service-mesh": "기반화", "japan-gss-standard-workspace": "기반화",
  "japan-local-standardization": "기반화", "japan-cloud-security-dashboard": "기반화", "japan-gennai": "증강",
  "japan-government-ai-workspace": "증강", "kr-seoul-ai-chat-llm": "증강", "kr-pps-worknet-genai": "증강",
  "singapore-pair": "증강", "eu-pilots": "기반화", "usa-gsa-usai-platform": "증강",
  "singapore-govtech-aibots": "셀프서비스화", "france-albert-state-ai": "증강", "ca-poppy": "증강",
  "germany-baergpt-berlin": "증강", "india-bhashini-language-ai-dpi": "기반화",
  "japan-ai-ready-guidelines": "기반화", "japan-ai-procurement": "기반화", "japan-dmp": "기반화",
  "japan-gcas-devstack": "증강", "japan-public-saas": "기반화",
  "japan-rules-as-code": "기반화", "japan-base-registry": "기반화", "japan-law-data": "기반화",
  "japan-open-data": "기반화", "japan-public-records": "기반화", "japan-geo-ai": "증강", "kr-judgment-open": "기반화",
  "japan-user-centered-ai": "셀프서비스화", "japan-municipal-ax": "셀프서비스화", "japan-front-service-api": "자동화",
  "japan-egov": "셀프서비스화", "japan-benefit-infra": "자동화", "japan-counter-dx": "셀프서비스화",
  "japan-civil-court-digital": "셀프서비스화", "kr-nts-genai-tax-counseling": "셀프서비스화", "ca-pilots": "셀프서비스화",
  "singapore-vica": "셀프서비스화", "japan-common-chatbot": "셀프서비스화", "japan-tax-social-online": "자동화",
  "japan-total-design": "셀프서비스화", "japan-hellowork": "셀프서비스화", "uae-u-ask-unified-chatbot": "셀프서비스화",
  "ukraine-diia-ai-agent": "셀프서비스화",
  "japan-school-ai": "증강", "japan-disaster-data": "기반화", "japan-emergency-ai": "자동화",
  "japan-smart-city": "기반화", "japan-labor-inspection-ai": "자동화", "kr-customs-xsync-ai-xray": "자동화",
  "japan-police-dx": "셀프서비스화", "japan-wellbeing-index": "증강",
  "japan-ai-skills-platform": "재배치", "japan-accounting-dx": "자동화", "japan-ina-dx": "재배치",
  "japan-senior-digital-talent": "재배치", "japan-travel-expense-bpr": "자동화", "japan-teacher-workload": "재배치",
  "kr-ai-lab": "셀프서비스화", "kr-champion": "재배치", "uk-humphrey-civil-service-suite": "증강",
  "estonia-ai-leap-2025": "재배치", "mckinsey-operating-model": "재배치", "bcg-ai-at-work": "재배치",
  "microsoft-frontier": "재배치", "pwc-jobs-barometer": "재배치", "accenture-work": "재배치",
  "japan-hr-digital": "기반화", "japan-internal-talent": "재배치", "taiwan-taigto-ai-talent-office": "재배치",
  "japan-government-ai-global": "기반화", "japan-ai-administrative-governance": "기반화", "japan-genai-guideline": "기반화",
  "japan-analog-regulation": "기반화", "japan-digital-law-review": "기반화", "japan-ai-basic-plan": "기반화",
  "japan-human-centered-ai": "기반화", "japan-ai-sovereignty": "기반화", "japan-policy-dashboard": "증강",
  "japan-portfolio-audit": "재배치", "japan-govt-ospo": "기반화", "japan-yata-shield": "기반화",
  "japan-ai-driven-state": "기반화", "kr-common-guide": "기반화", "kr-casebook": "기반화",
  "us-inventory": "재배치", "us-gao": "재배치", "canada-register": "재배치", "uk-playbook": "기반화",
  "eu-public-admin": "기반화", "australia-policy": "기반화", "deloitte-enterprise": "재배치",
  "japan-agency-capacity": "재배치", "japan-procurement-gate": "재배치",
};
function workChangeOf(item: CaseStudy): WorkChange {
  return CASE_WORKCHANGE[item.id] ?? "기반화";
}

// ── 2단계 계층: 주제별 서브주제 ──
const SUBTHEMES: Record<Theme, string[]> = {
  "공통 기반": ["워크스페이스", "게이트웨이", "인프라"],
  "조달·개발": ["AI조달", "개발환경", "공통기반"],
  "데이터·규칙": ["레지스트리", "규칙코드화", "오픈데이터"],
  "대민 서비스": ["상담·챗봇", "신청·원스톱", "서비스에이전트"],
  "현장·집행": ["재난·응급", "규제·집행", "지역·교육"],
  "인재·업무개혁": ["인재확보·육성", "내부BPR", "데이터기반관리"],
  "거버넌스·주권": ["AI원칙·거버넌스", "감리·예산", "주권·자율성"],
};
const CASE_SUBTHEME: Record<string, string> = {
  "japan-regional-ax": "인프라", "japan-public-service-mesh": "인프라", "japan-gss-standard-workspace": "워크스페이스",
  "japan-local-standardization": "인프라", "japan-cloud-security-dashboard": "인프라", "japan-gennai": "워크스페이스",
  "japan-government-ai-workspace": "워크스페이스", "kr-seoul-ai-chat-llm": "게이트웨이", "kr-pps-worknet-genai": "게이트웨이",
  "singapore-pair": "워크스페이스", "eu-pilots": "인프라", "usa-gsa-usai-platform": "게이트웨이",
  "singapore-govtech-aibots": "워크스페이스", "france-albert-state-ai": "게이트웨이", "ca-poppy": "워크스페이스",
  "germany-baergpt-berlin": "워크스페이스", "india-bhashini-language-ai-dpi": "인프라",
  "japan-ai-ready-guidelines": "AI조달", "japan-ai-procurement": "AI조달", "japan-dmp": "AI조달",
  "japan-gcas-devstack": "개발환경", "japan-public-saas": "공통기반",
  "japan-rules-as-code": "규칙코드화", "japan-base-registry": "레지스트리", "japan-law-data": "규칙코드화",
  "japan-open-data": "오픈데이터", "japan-public-records": "레지스트리", "japan-geo-ai": "오픈데이터", "kr-judgment-open": "오픈데이터",
  "japan-user-centered-ai": "신청·원스톱", "japan-municipal-ax": "신청·원스톱", "japan-front-service-api": "신청·원스톱",
  "japan-egov": "신청·원스톱", "japan-benefit-infra": "신청·원스톱", "japan-counter-dx": "신청·원스톱",
  "japan-civil-court-digital": "신청·원스톱", "kr-nts-genai-tax-counseling": "상담·챗봇", "ca-pilots": "상담·챗봇",
  "singapore-vica": "상담·챗봇", "japan-common-chatbot": "상담·챗봇", "japan-tax-social-online": "신청·원스톱",
  "japan-total-design": "신청·원스톱", "japan-hellowork": "신청·원스톱", "uae-u-ask-unified-chatbot": "상담·챗봇",
  "ukraine-diia-ai-agent": "서비스에이전트",
  "japan-school-ai": "지역·교육", "japan-disaster-data": "재난·응급", "japan-emergency-ai": "재난·응급",
  "japan-smart-city": "지역·교육", "japan-labor-inspection-ai": "규제·집행", "kr-customs-xsync-ai-xray": "규제·집행",
  "japan-police-dx": "규제·집행", "japan-wellbeing-index": "지역·교육",
  "japan-ai-skills-platform": "인재확보·육성", "japan-accounting-dx": "내부BPR", "japan-ina-dx": "내부BPR",
  "japan-senior-digital-talent": "인재확보·육성", "japan-travel-expense-bpr": "내부BPR", "japan-teacher-workload": "데이터기반관리",
  "kr-ai-lab": "인재확보·육성", "kr-champion": "인재확보·육성", "uk-humphrey-civil-service-suite": "내부BPR",
  "estonia-ai-leap-2025": "인재확보·육성", "mckinsey-operating-model": "내부BPR", "bcg-ai-at-work": "내부BPR",
  "microsoft-frontier": "내부BPR", "pwc-jobs-barometer": "인재확보·육성", "accenture-work": "내부BPR",
  "japan-hr-digital": "내부BPR", "japan-internal-talent": "인재확보·육성", "taiwan-taigto-ai-talent-office": "인재확보·육성",
  "japan-government-ai-global": "주권·자율성", "japan-ai-administrative-governance": "AI원칙·거버넌스", "japan-genai-guideline": "AI원칙·거버넌스",
  "japan-analog-regulation": "AI원칙·거버넌스", "japan-digital-law-review": "AI원칙·거버넌스", "japan-ai-basic-plan": "AI원칙·거버넌스",
  "japan-human-centered-ai": "AI원칙·거버넌스", "japan-ai-sovereignty": "주권·자율성", "japan-policy-dashboard": "감리·예산",
  "japan-portfolio-audit": "감리·예산", "japan-govt-ospo": "주권·자율성", "japan-yata-shield": "AI원칙·거버넌스",
  "japan-ai-driven-state": "AI원칙·거버넌스", "kr-common-guide": "AI원칙·거버넌스", "kr-casebook": "AI원칙·거버넌스",
  "us-inventory": "감리·예산", "us-gao": "감리·예산", "canada-register": "감리·예산", "uk-playbook": "AI원칙·거버넌스",
  "eu-public-admin": "AI원칙·거버넌스", "australia-policy": "AI원칙·거버넌스", "deloitte-enterprise": "AI원칙·거버넌스",
  "japan-agency-capacity": "감리·예산", "japan-procurement-gate": "감리·예산",
};
function subThemeOf(item: CaseStudy): string {
  return CASE_SUBTHEME[item.id] ?? SUBTHEMES[themeOf(item)][0];
}

// ── 근거유형: URL 도메인으로 도출 ──
type SourceType = "정부 원문" | "민간 리서치";
function sourceTypeOf(item: CaseStudy): SourceType {
  return /mckinsey|bcg\.com|deloitte|microsoft|pwc\.com|accenture/.test(item.url) ? "민간 리서치" : "정부 원문";
}
// 근거 강도: 핵심 수치에 숫자가 있으면 '수치'
function hasQuant(item: CaseStudy): boolean {
  return /\d/.test(item.metric);
}

const SIGNALS = [
  {
    date: "07.21",
    label: "일본",
    title: "AI 구동형 국가를 우선정책으로",
    text: "가버먼트 AI 워크스페이스·MCP·지자체 AX/DX를 하나의 실행축으로 묶었다",
    tone: "blue",
    href: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
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

const JAPAN_POLICY_OUTLINES = [
  {
    label: "본문 · 47쪽",
    date: "2026.07.21",
    title: "AI 구동형 국가로의 전환",
    summary: "생성 AI에서 AI 에이전트·피지컬 AI로의 변화를 전제로, 국가·지자체·사회 전체의 AX/DX를 인구감소 대응과 성장전략으로 묶는다.",
    points: ["국가 AX/DX 기반의 고도화·강인화", "AI·에이전트를 행정·내부개발·조달에 활용", "자율형·제안형 행정서비스를 지향"],
    href: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/208168e8/20260721_policies_priority_outline_03.pdf",
  },
  {
    label: "重点政策一覧 · 114쪽",
    date: "2026.07.21",
    title: "업무 인프라를 공통화하고, 현장에서 실험",
    summary: "전 부처 공통 AI 환경을 확장하는 동시에, BPR 기반 워크스페이스와 MCP 접근환경, AI-ready 조달·개발, 지자체 AX/DX를 구체 사업으로 쪼갠다.",
    points: ["가버먼트 AI 워크스페이스 프로토타입", "AI 에이전트의 정부시스템 접근방식(MCP) 검토", "AI-Ready·Rules as Code·지자체 AX/DX"],
    href: "https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/5ecac8cc-50f1-4168-b989-2bcaabffe870/a9e38e03/20260721_policies_priority_outline_04.pdf",
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
  const [theme, setTheme] = useState<Theme | "전체">("전체");
  const [country, setCountry] = useState<string>("전체");
  const [search, setSearch] = useState("");
  const [workChange, setWorkChange] = useState<WorkChange | "전체">("전체");
  const [subTheme, setSubTheme] = useState<string>("전체");
  const [showAll, setShowAll] = useState(false);
  const [showDeep, setShowDeep] = useState(false);
  const [matrixAxis, setMatrixAxis] = useState<"theme" | "work">("theme");

  const filteredCases = useMemo(() => {
    const query = search.trim().toLowerCase();
    // 국가·주제·사람의일·검색 등 명시적 조건이 있으면 심화 시책도 함께 보여준다.
    const explicit =
      country !== "전체" || theme !== "전체" || workChange !== "전체" || subTheme !== "전체" || Boolean(query);
    return CASE_STUDIES.filter((item) => {
      const matchesGroup = group === "전체" || item.group === group;
      const matchesRegion = region === "전체" || item.region === region;
      const matchesStage = stage === "전체" || item.stage === stage;
      const matchesTheme = theme === "전체" || themeOf(item) === theme;
      const matchesSub = subTheme === "전체" || subThemeOf(item) === subTheme;
      const matchesWork = workChange === "전체" || workChangeOf(item) === workChange;
      const matchesCountry = country === "전체" || item.country === country;
      const matchesDepth = showDeep || explicit || !isDeepPolicy(item);
      const matchesQuery =
        !query ||
        [item.country, item.agency, item.title, item.summary, item.insight, ...item.tags]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesGroup && matchesRegion && matchesStage && matchesTheme && matchesSub && matchesWork && matchesCountry && matchesDepth && matchesQuery;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, [group, region, stage, theme, subTheme, workChange, country, search, showDeep]);

  const deepCount = CASE_STUDIES.filter(isDeepPolicy).length;

  const governmentCount = CASE_STUDIES.filter((item) => item.group === "정부").length;
  const privateCount = CASE_STUDIES.filter((item) => item.group === "민간").length;
  const visibleCases = showAll ? filteredCases : filteredCases.slice(0, 9);

  // 국가 인덱스: 정부 사례가 있는 국가를 사례 수 순으로 정렬
  const countryIndex = useMemo(() => {
    const counts = new Map<string, { flag: string; count: number }>();
    for (const item of CASE_STUDIES) {
      if (item.group !== "정부") continue;
      const entry = counts.get(item.country) ?? { flag: item.flag, count: 0 };
      entry.count += 1;
      counts.set(item.country, entry);
    }
    return [...counts.entries()]
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // 국가×주제 매트릭스: 대표 국가(사례 3건 이상) × 7개 주제
  const matrixCols = matrixAxis === "theme" ? THEME_ORDER : WORK_CHANGE_ORDER;
  const classify = matrixAxis === "theme" ? themeOf : workChangeOf;
  const matrix = useMemo(() => {
    const topCountries = countryIndex.filter((c) => c.count >= 2);
    return topCountries.map((c) => ({
      country: c.name,
      flag: c.flag,
      cells: matrixCols.map((col) => ({
        col,
        count: CASE_STUDIES.filter(
          (item) => item.group === "정부" && item.country === c.name && classify(item) === col,
        ).length,
      })),
    }));
  }, [countryIndex, matrixCols, classify]);

  const resetFilters = () => {
    setSearch("");
    setRegion("전체");
    setStage("전체");
    setGroup("전체");
    setTheme("전체");
    setSubTheme("전체");
    setWorkChange("전체");
    setCountry("전체");
    setShowAll(false);
  };

  const focusExplorer = (patch: () => void) => {
    patch();
    setShowAll(false);
    document.getElementById("explorer")?.scrollIntoView({ behavior: "smooth" });
  };

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: "AXIS — Global AX Observatory",
            description:
              "전 세계 정부·공공기관이 AI로 일하는 방식을 원문 기반으로 비교하는 관측소. 성숙도 구분과 업무방식 7개 주제로 정부 AI 전환 사례를 정리한다.",
            url: "https://hosungseo.github.io/axis-global-observatory/",
            inLanguage: "ko",
            isAccessibleForFree: true,
            dateModified: "2026-07-26",
            creator: { "@type": "Person", name: "hosungseo" },
            measurementTechnique: "primary-source curation",
            keywords: ["government AI", "public sector AI", "AX", "digital government", ...THEME_ORDER],
            variableMeasured: THEME_ORDER,
            size: `${CASE_STUDIES.length} cases · ${countCountries(CASE_STUDIES)} countries/regions`,
          }),
        }}
      />

      <div className="top-strip">
        <div className="top-strip-inner">
          <span className="status-dot" aria-hidden="true" />
          <span>AXIS는 원문으로 확인하는 글로벌 AX 관측소입니다.</span>
          <span className="top-strip-date">2026.07.26 기준</span>
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
          <a href="#japan-policy">일본 7.21 정책</a>
          <a href="#explorer">사례 탐색</a>
          <a href="#matrix">국가×주제 매트릭스</a>
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
            <p className="brief-title">같은 문제, 17개국의 다른 답</p>
            <p className="brief-text">
              일본은 중점계획으로 업무 인프라를 통째로 재설계하고, 프랑스·독일은 주권형 자체 AI를, 우크라이나는 서비스를 직접 이행하는 AI 에이전트를 택했습니다. 95개 원문 사례를 업무방식 7개 주제로 비교합니다.
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

        <section className="section japan-policy-section" id="japan-policy" aria-labelledby="japan-policy-title">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">JAPAN · POLICY PULSE</p>
              <h2 id="japan-policy-title">일본은 AI를 ‘업무 인프라’로 정의했다</h2>
            </div>
            <p className="section-intro">2026년 7월 21일 공개된 두 원문을 AX 관점으로 다시 읽었습니다. 방향은 본문에서, 실행 단위는 중점정책 목록에서 확인할 수 있습니다.</p>
          </div>
          <div className="japan-policy-lede">
            <span>일본의 설계 문장</span>
            <p>AI를 붙이는 과업을 고르는 데서 멈추지 않고, <strong>업무를 BPR한 뒤 공통 플랫폼·데이터·접근 규칙을 만들고 현장에 순차 배포</strong>하는 국가 실행모델입니다.</p>
          </div>
          <div className="japan-policy-grid">
            {JAPAN_POLICY_OUTLINES.map((policy) => (
              <article className="japan-policy-card" key={policy.label}>
                <div className="japan-policy-meta"><span>{policy.label}</span><time dateTime="2026-07-21">{policy.date}</time></div>
                <h3>{policy.title}</h3>
                <p>{policy.summary}</p>
                <ul>
                  {policy.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <a href={policy.href} target="_blank" rel="noreferrer">원문 열기 <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
          <div className="japan-execution-heading">
            <span>MORE FROM THE SAME PLAN</span>
            <p>업무혁신 담당자가 바로 비교할 수 있도록, 두 원문에서 추가로 뽑은 18개 실행 항목입니다. 나머지는 사례 탐색에서 확인할 수 있습니다.</p>
          </div>
          <div className="japan-execution-grid">
            {JAPAN_POLICY_FEATURED_ITEMS.map((item) => (
              <a className="japan-execution-card" href={item.url} target="_blank" rel="noreferrer" key={item.id}>
                <div className="japan-execution-meta"><span>{item.code}</span><span>{item.metric}</span></div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="japan-execution-tags">{item.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}<span aria-hidden="true">↗</span></div>
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

          <div className="country-index" aria-label="국가별 바로가기">
            <button
              type="button"
              className={country === "전체" ? "country-chip is-active" : "country-chip"}
              aria-pressed={country === "전체"}
              onClick={() => { setCountry("전체"); setShowAll(false); }}
            >
              전체 국가
            </button>
            {countryIndex.map((c) => (
              <button
                type="button"
                className={country === c.name ? "country-chip is-active" : "country-chip"}
                aria-pressed={country === c.name}
                key={c.name}
                onClick={() => { setCountry(country === c.name ? "전체" : c.name); setShowAll(false); }}
              >
                <span aria-hidden="true">{c.flag}</span>
                {c.name}
                <em>{c.count}</em>
              </button>
            ))}
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

          <div className="filter-row theme-row">
            <div className="filter-group theme-filter" aria-label="업무방식 주제 필터">
              <span className="filter-label">업무방식</span>
              <button type="button" className={theme === "전체" ? "filter-chip is-active" : "filter-chip"} aria-pressed={theme === "전체"} onClick={() => { setTheme("전체"); setSubTheme("전체"); setShowAll(false); }}>
                전체
              </button>
              {THEME_ORDER.map((item) => (
                <button type="button" className={theme === item ? "filter-chip is-active" : "filter-chip"} aria-pressed={theme === item} key={item} onClick={() => { const next = theme === item ? "전체" : item; setTheme(next); setSubTheme("전체"); setShowAll(false); }}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          {theme !== "전체" && (
            <div className="filter-row subtheme-row">
              <div className="filter-group" aria-label="세부주제 필터">
                <span className="filter-label">└ 세부</span>
                <button type="button" className={subTheme === "전체" ? "filter-chip is-active" : "filter-chip"} aria-pressed={subTheme === "전체"} onClick={() => { setSubTheme("전체"); setShowAll(false); }}>
                  전체
                </button>
                {SUBTHEMES[theme].map((item) => (
                  <button type="button" className={subTheme === item ? "filter-chip is-active" : "filter-chip"} aria-pressed={subTheme === item} key={item} onClick={() => { setSubTheme(subTheme === item ? "전체" : item); setShowAll(false); }}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="filter-row work-row">
            <div className="filter-group work-filter" aria-label="사람의 일 필터">
              <span className="filter-label">사람의 일</span>
              <button type="button" className={workChange === "전체" ? "filter-chip is-active" : "filter-chip"} aria-pressed={workChange === "전체"} onClick={() => { setWorkChange("전체"); setShowAll(false); }}>
                전체
              </button>
              {WORK_CHANGE_ORDER.map((item) => (
                <button type="button" className={workChange === item ? "filter-chip is-active" : "filter-chip"} aria-pressed={workChange === item} key={item} title={WORK_CHANGE_DESC[item]} onClick={() => { setWorkChange(workChange === item ? "전체" : item); setShowAll(false); }}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="depth-toggle-row">
            <button
              type="button"
              className={showDeep ? "depth-toggle is-active" : "depth-toggle"}
              aria-pressed={showDeep}
              onClick={() => { setShowDeep((v) => !v); setShowAll(false); }}
            >
              <span aria-hidden="true">{showDeep ? "▾" : "▸"}</span>
              일본 중점계획 심화 시책 {showDeep ? "접기" : `펼치기 (+${deepCount})`}
            </button>
            <span className="depth-hint">기본 화면은 대표 사례만 보여줍니다. 국가·주제·검색을 지정하면 심화 시책도 함께 표시됩니다.</span>
          </div>

          <div className="case-grid">
            {visibleCases.map((item) => (
              <article className="case-card" key={item.id}>
                <div className="case-card-top">
                  <span className="case-place"><span className="case-flag" aria-hidden="true">{item.flag}</span>{item.country}</span>
                  <span className={`stage-badge stage-${item.stage}`}>{item.stage}</span>
                </div>
                <div className="case-card-meta">
                  <span className="case-theme">{themeOf(item)} › {subThemeOf(item)}</span>
                  <time dateTime={item.date.replace(".", "-")}>{item.date}</time>
                </div>
                <div className="case-agency">{item.agency}</div>
                <div className="case-classify">
                  <span className="work-badge" title={WORK_CHANGE_DESC[workChangeOf(item)]}>{workChangeOf(item)}</span>
                  <span className={sourceTypeOf(item) === "정부 원문" ? "src-badge src-gov" : "src-badge src-report"}>{sourceTypeOf(item)}</span>
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
              <button type="button" className="button button-secondary" onClick={resetFilters}>필터 초기화</button>
            </div>
          )}
          {filteredCases.length > 9 && (
            <button type="button" className="load-more" onClick={() => setShowAll((current) => !current)}>
              {showAll ? "간추려 보기 ↑" : `사례 ${filteredCases.length - 9}건 더 보기 ↓`}
            </button>
          )}
        </section>

        <section className="compare-section" id="matrix" aria-labelledby="matrix-title">
          <div className="section compare-inner">
            <div className="section-heading split-heading compare-heading">
              <div>
                <p className="eyebrow light">03 · MATRIX</p>
                <h2 id="matrix-title">국가 × {matrixAxis === "theme" ? "업무방식" : "사람의 일"} 매트릭스</h2>
              </div>
              <p className="section-intro light-copy">어느 나라가 AI를 ‘어느 {matrixAxis === "theme" ? "업무방식" : "방식으로 일을 바꾸는지"}’에 배치했는지 한눈에 봅니다. 숫자를 누르면 해당 사례로 이동합니다.</p>
            </div>
            <div className="matrix-axis-toggle" role="group" aria-label="매트릭스 축 선택">
              <button type="button" className={matrixAxis === "theme" ? "is-active" : ""} aria-pressed={matrixAxis === "theme"} onClick={() => setMatrixAxis("theme")}>업무방식(주제)</button>
              <button type="button" className={matrixAxis === "work" ? "is-active" : ""} aria-pressed={matrixAxis === "work"} onClick={() => setMatrixAxis("work")}>사람의 일</button>
            </div>
            <div className="matrix-scroll">
              <table className="matrix-table">
                <thead>
                  <tr>
                    <th scope="col" className="matrix-corner">국가 \ {matrixAxis === "theme" ? "업무방식" : "사람의 일"}</th>
                    {matrixCols.map((col) => (
                      <th scope="col" key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row) => (
                    <tr key={row.country}>
                      <th scope="row" className="matrix-country">
                        <span aria-hidden="true">{row.flag}</span> {row.country}
                      </th>
                      {row.cells.map((cell) => (
                        <td key={cell.col} className={cell.count ? "matrix-cell has-count" : "matrix-cell"}>
                          {cell.count ? (
                            <button
                              type="button"
                              onClick={() => focusExplorer(() => {
                                setCountry(row.country);
                                if (matrixAxis === "theme") { setTheme(cell.col as Theme); setSubTheme("전체"); setWorkChange("전체"); }
                                else { setWorkChange(cell.col as WorkChange); setTheme("전체"); setSubTheme("전체"); }
                              })}
                              aria-label={`${row.country} · ${cell.col} ${cell.count}건 보기`}
                            >
                              {cell.count}
                            </button>
                          ) : (
                            <span aria-hidden="true">·</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="compare-takeaway"><span>AXIS TAKEAWAY</span><p>주제축으로 보면 공통 기반·거버넌스가 여러 나라에 겹치고, ‘사람의 일’축으로 바꾸면 자동화·셀프서비스·기반화의 무게중심이 나라마다 다르게 드러납니다. 빈 칸은 ‘아직 관측되지 않은 조합’입니다.</p></div>
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
          <div className="source-note"><span>LAST UPDATED</span><strong>2026.07.26</strong><p>공개 원문 {CASE_STUDIES.length}건을 큐레이션하고, 모든 사례를 ‘업무방식’ 7개 주제로 분류했습니다. 이번 업데이트에는 한국(서울시·조달청·관세청·국세청)과 미국·영국·에스토니아·싱가포르·프랑스 사례, 그리고 일본 디지털청 2026년 7월 21일 중점계획의 추가 시책을 반영했습니다. 국가×업무방식 매트릭스와 국가 인덱스로 비교 경로를 넓혔습니다. 수치는 원문 발표 기준이며, 정부 발표와 민간 리서치의 성격이 다르므로 직접 비교하기보다 설계 질문을 찾는 용도로 읽어주세요.</p></div>
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
