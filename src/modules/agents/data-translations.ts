// agents module — data array translations

export const protocolsTranslations = {
  sv: [
    { name: 'MCP', direction: 'Agent → Verktyg/Resurs', analogy: 'USB — ansluta kringutrustning', scope: 'En agent som använder externa funktioner', standard: 'Anthropic (öppen, antagen av OpenAI, AWS, Microsoft)', status: '2300+ servrar, produktionsklar' },
    { name: 'A2A', direction: 'Agent → Agent', analogy: 'HTTP — datorer som pratar med datorer', scope: 'Agenter som upptäcker och samarbetar med andra agenter', standard: 'Google → Linux Foundation (150+ org: AWS, Microsoft, Salesforce)', status: 'Spec stabil, tidig produktionsanvändning' },
  ],
  ko: [
    { name: 'MCP', direction: '에이전트 → 도구/리소스', analogy: 'USB — 주변기기 연결', scope: '하나의 에이전트가 외부 기능 사용', standard: 'Anthropic (오픈, OpenAI, AWS, Microsoft 채택)', status: '2300+ 서버, 프로덕션 준비' },
    { name: 'A2A', direction: '에이전트 → 에이전트', analogy: 'HTTP — 컴퓨터 간 통신', scope: '에이전트가 다른 에이전트를 발견하고 협업', standard: 'Google → Linux Foundation (150+ 조직: AWS, Microsoft, Salesforce)', status: '스펙 안정, 초기 프로덕션 채택' },
  ],
}

export const frameworksTranslations = {
  sv: [
    { name: 'Rå funktionsanrop', description: 'Direkta API-anrop med verktygsscheman. Inget ramverksoverhead.', bestFor: 'Enkla agenter, lärande, prototyper' },
    { name: 'Vercel AI SDK', description: 'Webbfokuserat, bra TypeScript-stöd, streaming-först.', bestFor: 'Webbappar, Next.js, streaming-UI' },
    { name: 'LangChain / LangGraph', description: 'Mest populärt. LangGraph lägger till grafbaserade arbetsflöden.', bestFor: 'Produktionsagenter, komplexa arbetsflöden' },
    { name: 'CrewAI', description: 'Multi-agent-ramverk med rollbaserade agenter som samarbetar.', bestFor: 'Multi-agent-team, rollbaserade uppgifter' },
    { name: 'AutoGen (Microsoft)', description: 'Multi-agent-konversationer med human-in-the-loop-stöd.', bestFor: 'Forskning, komplexa multi-agent-system' },
    { name: 'Amazon Bedrock AgentCore', description: 'Hanterad infrastruktur för agenter i skala. Fungerar med alla ramverk.', bestFor: 'Företagsdriftsättning, produktionsagenter på AWS' },
  ],
  ko: [
    { name: '원시 함수 호출', description: '도구 스키마를 사용한 직접 API 호출. 프레임워크 오버헤드 없음.', bestFor: '간단한 에이전트, 학습, 프로토타입' },
    { name: 'Vercel AI SDK', description: '웹 중심, 좋은 TypeScript 지원, 스트리밍 우선.', bestFor: '웹 앱, Next.js, 스트리밍 UI' },
    { name: 'LangChain / LangGraph', description: '가장 인기. LangGraph가 그래프 기반 워크플로우 추가.', bestFor: '프로덕션 에이전트, 복잡한 워크플로우' },
    { name: 'CrewAI', description: '역할 기반 에이전트가 협업하는 멀티 에이전트 프레임워크.', bestFor: '멀티 에이전트 팀, 역할 기반 작업' },
    { name: 'AutoGen (Microsoft)', description: '휴먼 인 더 루프 지원이 있는 멀티 에이전트 대화.', bestFor: '연구, 복잡한 멀티 에이전트 시스템' },
    { name: 'Amazon Bedrock AgentCore', description: '대규모 에이전트를 위한 관리형 인프라. 모든 프레임워크와 작동.', bestFor: '엔터프라이즈 배포, AWS의 프로덕션 에이전트' },
  ],
}

export const patternsTranslations = {
  sv: [
    { name: 'ReAct', description: 'Det vanligaste mönstret. Agenten alternerar mellan att tänka, agera och observera.', useCase: 'Allmänna agenter, Q&A med verktygsanvändning.', example: '"Vilka är de 3 bästa restaurangerna nära mig?" → tänker → söker → läser → svarar' },
    { name: 'Reflektion', description: 'Agenten genererar output, granskar sedan sitt eget arbete och förbättrar det.', useCase: 'Kodgenerering, skrivuppgifter.', example: 'Generera kod → granska för buggar → fixa → leverera' },
    { name: 'Planera-och-utför', description: 'Agenten skapar en plan först, utför sedan varje steg.', useCase: 'Komplexa flerstegsuppgifter.', example: '"Planera en resa till Tokyo" → lista steg → boka flyg → boka hotell → skapa resplan' },
    { name: 'Multi-agent', description: 'Flera specialiserade agenter samarbetar, var och en med sin roll.', useCase: 'Komplexa uppgifter som gynnas av specialisering.', example: 'Forskningsagent + skribentagent + granskningsagent' },
    { name: 'Human-in-the-loop', description: 'Agenten pausar vid viktiga beslutspunkter för mänskligt godkännande.', useCase: 'Högriskuppgifter, känsliga beslut.', example: 'Agent förbereder kontrakt → människa granskar → agent skickar' },
  ],
  ko: [
    { name: 'ReAct', description: '가장 일반적인 패턴. 에이전트가 생각, 행동, 관찰을 번갈아 수행.', useCase: '범용 에이전트, 도구 사용 Q&A.', example: '"근처 최고 레스토랑 3곳?" → 생각 → 검색 → 읽기 → 응답' },
    { name: '반성', description: '에이전트가 출력을 생성한 후 자체 작업을 검토하고 개선.', useCase: '코드 생성, 작문 작업.', example: '코드 생성 → 버그 검토 → 수정 → 전달' },
    { name: '계획 후 실행', description: '에이전트가 먼저 계획을 세운 후 각 단계를 실행.', useCase: '복잡한 다단계 작업.', example: '"도쿄 여행 계획" → 단계 나열 → 항공편 예약 → 호텔 예약 → 일정 생성' },
    { name: '멀티 에이전트', description: '여러 전문 에이전트가 각자의 역할로 협업.', useCase: '전문화가 도움이 되는 복잡한 작업.', example: '연구 에이전트 + 작성 에이전트 + 검토 에이전트' },
    { name: '휴먼 인 더 루프', description: '에이전트가 주요 결정 지점에서 인간 승인을 위해 일시 중지.', useCase: '고위험 작업, 민감한 결정.', example: '에이전트가 계약 준비 → 인간 검토 → 에이전트 발송' },
  ],
}

export const demoStepsTranslations = { sv: [], ko: [] }
export const comparisonTranslations = { sv: [], ko: [] }
export const autonomyTiersTranslations = { sv: [], ko: [] }
export const governanceControlsTranslations = { sv: [], ko: [] }
export const capabilitiesTranslations = { sv: [], ko: [] }
