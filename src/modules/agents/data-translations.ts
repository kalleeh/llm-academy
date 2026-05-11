// agents module — data array translations

export const protocolsTranslations = {
  sv: [
    { name: 'MCP', direction: 'Agent → Verktyg/Resurs', analogy: 'USB — ansluta kringutrustning', scope: 'En agent som använder externa funktioner', standard: 'Anthropic (öppen, antagen av OpenAI, AWS, Microsoft)', status: '3000+ servrar, produktionsklar' },
    { name: 'A2A', direction: 'Agent → Agent', analogy: 'HTTP — datorer som pratar med datorer', scope: 'Agenter som upptäcker och samarbetar med andra agenter', standard: 'Google → Linux Foundation (100+ org: AWS, Microsoft, Salesforce)', status: 'Spec stabil, tidig produktionsanvändning' },
  ],
  ko: [
    { name: 'MCP', direction: '에이전트 → 도구/리소스', analogy: 'USB — 주변기기 연결', scope: '하나의 에이전트가 외부 기능 사용', standard: 'Anthropic (오픈, OpenAI, AWS, Microsoft 채택)', status: '3000+ 서버, 프로덕션 준비' },
    { name: 'A2A', direction: '에이전트 → 에이전트', analogy: 'HTTP — 컴퓨터 간 통신', scope: '에이전트가 다른 에이전트를 발견하고 협업', standard: 'Google → Linux Foundation (100+ 조직: AWS, Microsoft, Salesforce)', status: '스펙 안정, 초기 프로덕션 채택' },
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

export const demoStepsTranslations = { sv: [], ko: [] } // Terminal demo - stays English
export const comparisonTranslations = {
  sv: [
    { aspect: 'Verktygsupptäckt', functionCalling: 'Hårdkodad i varje API-anrop', mcp: 'Dynamisk — klienten frågar servern vilka verktyg som finns' },
    { aspect: 'Standardisering', functionCalling: 'Leverantörsspecifik (OpenAI, Anthropic har olika format)', mcp: 'Universell standard — bygg en gång, fungerar överallt' },
    { aspect: 'Ekosystem', functionCalling: 'Du bygger varje integration', mcp: '3000+ färdiga servrar' },
    { aspect: 'Tillståndshantering', functionCalling: 'Du hanterar sessioner', mcp: 'Inbyggt sessionsstöd' },
    { aspect: 'Autentisering', functionCalling: 'Du implementerar per verktyg', mcp: 'Standardiserat via OAuth/API-nycklar' },
    { aspect: 'Transport', functionCalling: 'HTTP API-anrop', mcp: 'stdio, SSE, HTTP — flexibelt' },
  ],
  ko: [
    { aspect: '도구 발견', functionCalling: '각 API 호출에 하드코딩', mcp: '동적 — 클라이언트가 서버에 사용 가능한 도구 질의' },
    { aspect: '표준화', functionCalling: '벤더별 (OpenAI, Anthropic 다른 형식)', mcp: '범용 표준 — 한 번 구축, 어디서나 작동' },
    { aspect: '생태계', functionCalling: '각 통합을 직접 구축', mcp: '3000+ 기성 서버' },
    { aspect: '상태 관리', functionCalling: '세션을 직접 관리', mcp: '내장 세션 지원' },
    { aspect: '인증', functionCalling: '도구별로 직접 구현', mcp: 'OAuth/API 키로 표준화' },
    { aspect: '전송', functionCalling: 'HTTP API 호출', mcp: 'stdio, SSE, HTTP — 유연' },
  ],
}
export const autonomyTiersTranslations = {
  sv: [
    { tier: 'L0 — Copilot', loop: 'Människa agerar, AI föreslår', oversight: 'Varje handling', examples: 'Kodkomplettering, mejlutkast', risk: 'Minimal' },
    { tier: 'L1 — Utförare', loop: 'Människa godkänner, AI agerar', oversight: 'Godkännande per handling', examples: 'AI skriver + människa skickar mejl', risk: 'Låg' },
    { tier: 'L2 — Begränsad autonomi', loop: 'AI agerar inom regler, människa övervakar', oversight: 'Asynkron granskning + varningar', examples: 'Autolösa L1-ärenden, återbetalningar <500kr', risk: 'Medel' },
    { tier: 'L3 — Övervakad autonomi', loop: 'AI agerar, eskalerar undantag', oversight: 'Undantagsbaserad + revisioner', examples: 'Kundintroduktion, incidenthantering', risk: 'Hög' },
    { tier: 'L4 — Full autonomi', loop: 'AI agerar, människa sätter strategi', oversight: 'Resultatbaserad granskning', examples: 'Autonom handel, självläkande infra', risk: 'Kritisk' },
  ],
  ko: [
    { tier: 'L0 — 코파일럿', loop: '인간이 행동, AI가 제안', oversight: '모든 행동', examples: '코드 완성, 이메일 초안', risk: '최소' },
    { tier: 'L1 — 실행자', loop: '인간이 승인, AI가 행동', oversight: '행동별 승인', examples: 'AI 작성 + 인간 발송', risk: '낮음' },
    { tier: 'L2 — 제한된 자율', loop: 'AI가 규칙 내 행동, 인간 모니터링', oversight: '비동기 검토 + 알림', examples: 'L1 티켓 자동 해결, 5만원 미만 환불', risk: '중간' },
    { tier: 'L3 — 감독된 자율', loop: 'AI가 행동, 예외 에스컬레이션', oversight: '예외 기반 + 감사', examples: '고객 온보딩, 인시던트 대응', risk: '높음' },
    { tier: 'L4 — 완전 자율', loop: 'AI가 행동, 인간이 전략 설정', oversight: '결과 기반 검토', examples: '자율 거래, 자가 치유 인프라', risk: '치명적' },
  ],
}
export const governanceControlsTranslations = {
  sv: [
    { control: 'Handlingsgränser', what: 'Vitlista av tillåtna handlingar per agent.' },
    { control: 'Utgiftsgränser', what: 'Tak på ekonomisk påverkan per handling och session.' },
    { control: 'Revisionsspår', what: 'Varje agenthandling loggas med resonemangsspår.' },
    { control: 'Nödstopp', what: 'Möjlighet att omedelbart stoppa en agent.' },
    { control: 'Mänsklig eskalering', what: 'Definierade triggers som pausar agenten.' },
    { control: 'Driftdetektering', what: 'Övervaka beteendeförändringar över tid.' },
  ],
  ko: [
    { control: '행동 경계', what: '에이전트별 허용된 행동의 화이트리스트.' },
    { control: '지출 한도', what: '행동 및 세션당 재정적 영향 상한.' },
    { control: '감사 추적', what: '모든 에이전트 행동이 추론 추적과 함께 기록.' },
    { control: '킬 스위치', what: '에이전트를 즉시 중지하는 기능.' },
    { control: '인간 에스컬레이션', what: '에이전트를 일시 중지하는 정의된 트리거.' },
    { control: '드리프트 감지', what: '시간에 따른 행동 변화 모니터링.' },
  ],
}
export const capabilitiesTranslations = {
  sv: [
    { name: 'MCP Server', layer: 'Anslutning', what: 'Universell verktygskoppling — exponerar ett API/databas/tjänst för alla MCP-klienter', granularity: 'Enskilt verktyg eller resurs', reusability: 'Alla MCP-kompatibla agenter', example: 'mcp-server-salesforce, mcp-server-postgres, mcp-server-slack' },
    { name: 'Agent Skill (SKILL.md)', layer: 'Beteende', what: 'Öppen standard — mapp med SKILL.md (frontmatter + instruktioner) plus valfria scripts/, references/, assets/. Laddas progressivt: metadata alltid, kropp vid aktivering, filer vid behov.', granularity: 'Flerstegs arbetsflöde eller domänexpertis', reusability: 'Alla Skills-kompatibla agenter (Claude Code, Codex, Microsoft Agent Framework, Kiro, …)', example: 'customer-onboarding, pdf-processing, code-review' },
    { name: 'AGENTS.md', layer: 'Projektkontext', what: 'README för agenter — repo-instruktioner: setup, kodstil, testkommandon, PR-regler. Öppen standard från Agentic AI Foundation.', granularity: 'Hela repot eller underkatalog (nestade filer stöds)', reusability: 'Codex CLI, Claude Code, Cursor, Aider, Kiro, OpenHands m.fl.', example: 'monorepo-rot + AGENTS.md per paket' },
    { name: 'Kiro Steering', layer: 'Workspace-kontext', what: 'Markdown-filer i .kiro/steering/ som ger Kiro persistent projektkunskap — konventioner, bibliotek, standarder.', granularity: 'Workspace', reusability: 'Kiro CLI / IDE', example: 'product.md, structure.md, tech.md' },
    { name: 'Bedrock AgentCore', layer: 'Körtid', what: 'Hanterad agentkörtid på AWS — modell + prompt + verktyg + skills + minne + observability + gränser.', granularity: 'Komplett agent', reusability: 'Produktionsdriftsättning', example: 'Supportagent, säljassistent, IT-helpdesk' },
  ],
  ko: [
    { name: 'MCP Server', layer: '연결', what: '범용 도구 커넥터 — 하나의 API/데이터베이스/서비스를 모든 MCP 클라이언트에 노출', granularity: '단일 도구 또는 리소스', reusability: '모든 MCP 호환 에이전트', example: 'mcp-server-salesforce, mcp-server-postgres, mcp-server-slack' },
    { name: 'Agent Skill (SKILL.md)', layer: '행동', what: '오픈 표준 — SKILL.md(프론트매터 + 지시사항) 폴더와 선택적 scripts/, references/, assets/. 점진적 로드: 메타데이터 항상, 본문은 활성화 시, 파일은 필요 시.', granularity: '다단계 워크플로우 또는 도메인 전문성', reusability: '모든 Skills 호환 에이전트 (Claude Code, Codex, Microsoft Agent Framework, Kiro 등)', example: 'customer-onboarding, pdf-processing, code-review' },
    { name: 'AGENTS.md', layer: '프로젝트 컨텍스트', what: '에이전트용 README — 저장소 수준 지시: 설정, 코드 스타일, 테스트 명령, PR 규칙. Agentic AI Foundation의 오픈 표준.', granularity: '저장소 전체 또는 하위 디렉토리 (중첩 파일 지원)', reusability: 'Codex CLI, Claude Code, Cursor, Aider, Kiro, OpenHands 등', example: '모노레포 루트 + 패키지별 AGENTS.md' },
    { name: 'Kiro Steering', layer: '워크스페이스 컨텍스트', what: '.kiro/steering/의 마크다운 파일이 Kiro에 지속적인 프로젝트 지식 제공 — 규칙, 라이브러리, 표준.', granularity: '워크스페이스', reusability: 'Kiro CLI / IDE', example: 'product.md, structure.md, tech.md' },
    { name: 'Bedrock AgentCore', layer: '런타임', what: 'AWS의 관리형 에이전트 런타임 — 모델 + 프롬프트 + 도구 + 스킬 + 메모리 + 관측가능성 + 제한.', granularity: '완전한 에이전트', reusability: '프로덕션 배포', example: '지원 에이전트, 영업 어시스턴트, IT 헬프데스크' },
  ],
}
