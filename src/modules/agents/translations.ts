export const toolUseSv = {
  title: '2. Vad kan agenter faktiskt göra?',
  intro: 'En agents kraft kommer från dess **verktyg** — det den kan ansluta till och använda. Tänk på det som att anställa en assistent och ge dem tillgång till din e-post, kalender och arkivsystem.',
  tools: [
    { name: 'Sökning / Hämtning', analogy: 'Som att slå upp något i ett arkivskåp', whatItDoes: 'Agenten söker i dina företagsdokument, kunskapsbas eller webben.', businessExample: 'En kund frågar om er returpolicy. Agenten söker i policydokumenten och ger ett korrekt, aktuellt svar.' },
    { name: 'E-post & Meddelanden', analogy: 'Som att be din assistent skicka ett meddelande', whatItDoes: 'Agenten kan skriva och skicka e-post, Slack-meddelanden eller notifieringar.', businessExample: 'Efter att ha löst ett supportärende skickar agenten ett uppföljningsmail.' },
    { name: 'Datauppslag', analogy: 'Som att kolla ett kalkylblad eller databas', whatItDoes: 'Agenten kan fråga ditt CRM, ERP eller annat affärssystem.', businessExample: '"Vad är statusen på Acme Corp-affären?" — agenten kollar Salesforce.' },
    { name: 'Beräkningar', analogy: 'Som att ge någon en miniräknare', whatItDoes: 'Agenten kan köra beräkningar och generera rapporter korrekt.', businessExample: '"Vad blir vår marginal om vi ger 15% rabatt?" — agenten beräknar exakt.' },
    { name: 'Åtgärder & Uppdateringar', analogy: 'Som att be någon uppdatera en post', whatItDoes: 'Agenten kan skapa, uppdatera eller ta bort poster i dina system.', businessExample: '"Skapa en uppföljningsuppgift för Acme-kontot." — agenten skapar den.' },
  ],
  trustTitle: 'Förtroende: vad bör agenter göra själva?',
  trustIntro: 'Precis som du inte ger en nyanställd företagskortet dag ett, behöver du bestämma vad en agent kan göra själv vs vad som behöver godkännande.',
  platformNote: 'Plattformar som **Amazon Bedrock AgentCore** hanterar infrastrukturen — anslutning till verktyg, minneshantering, säkerhet i skala.',
  selfExplainPrompt: 'Din chef frågar: "Ska vi låta AI-agenten skicka e-post till kunder utan godkännande?" Hur tänker du igenom detta?',
  selfExplainAnswer: 'Jag skulle överväga risken: ett felaktigt e-postmeddelande kan skada relationen. Jag rekommenderar att börja med "skriv utkast och godkänn" — agenten skriver, en människa granskar och skickar. Över tid kan vi automatiskt skicka rutinsvar medan vi behåller granskning för känsliga ärenden.',
}

export const toolUseKo = {
  title: '2. 에이전트가 실제로 할 수 있는 것',
  intro: '에이전트의 힘은 **도구**에서 옵니다 — 연결하고 사용할 수 있는 것들. 비서를 고용하고 이메일, 캘린더, 파일 시스템에 대한 접근 권한을 주는 것과 같습니다.',
  tools: [
    { name: '검색 / 조회', analogy: '서류함에서 찾아보는 것과 같음', whatItDoes: '에이전트가 회사 문서, 지식 베이스, 웹을 검색합니다.', businessExample: '고객이 반품 정책을 물어봅니다. 에이전트가 정책 문서를 검색하고 정확한 답변을 제공합니다.' },
    { name: '이메일 & 메시징', analogy: '비서에게 메시지를 보내달라고 하는 것과 같음', whatItDoes: '에이전트가 이메일, Slack(또는 카카오워크) 메시지, 알림을 작성하고 보낼 수 있습니다.', businessExample: '지원 티켓 해결 후 에이전트가 고객에게 후속 이메일을 보냅니다.' },
    { name: '데이터 조회', analogy: '스프레드시트나 데이터베이스를 확인하는 것과 같음', whatItDoes: '에이전트가 CRM, ERP 또는 비즈니스 시스템을 조회할 수 있습니다.', businessExample: '"Acme Corp 거래 상태가 어떻게 되나요?" — 에이전트가 Salesforce를 확인합니다.' },
    { name: '계산', analogy: '계산기를 건네주는 것과 같음', whatItDoes: '에이전트가 정확하게 계산하고 보고서를 생성할 수 있습니다.', businessExample: '"15% 할인하면 마진이 어떻게 되나요?" — 에이전트가 정확히 계산합니다.' },
    { name: '작업 & 업데이트', analogy: '기록을 업데이트해 달라고 하는 것과 같음', whatItDoes: '에이전트가 비즈니스 시스템에서 기록을 생성, 업데이트, 삭제할 수 있습니다.', businessExample: '"Acme 계정에 후속 작업을 만들어 주세요." — 에이전트가 생성합니다.' },
  ],
  trustTitle: '신뢰 질문: 에이전트가 혼자 무엇을 해야 하나요?',
  trustIntro: '신입사원에게 첫날부터 법인카드를 주지 않듯이, 에이전트가 혼자 할 수 있는 것과 승인이 필요한 것을 결정해야 합니다.',
  platformNote: '**Amazon Bedrock AgentCore** 같은 플랫폼이 인프라를 관리합니다 — 도구 연결, 메모리 관리, 대규모 보안.',
  selfExplainPrompt: '매니저가 묻습니다: "AI 에이전트가 승인 없이 고객에게 이메일을 보내게 해야 할까요?" 이 결정을 어떻게 생각하시겠습니까?',
  selfExplainAnswer: '위험을 고려하겠습니다: 잘못된 이메일은 관계를 손상시킬 수 있습니다. "초안 작성 후 승인" 워크플로우로 시작하는 것을 추천합니다. 시간이 지나면서 품질에 대한 신뢰가 쌓이면 일상적인 응답은 자동 발송하고 민감한 커뮤니케이션은 사람 검토를 유지합니다.',
}

export const patternsSv = {
  title: '3. Hur du sätter upp agenter för ditt team',
  intro: 'Det finns ingen universallösning. Precis som du organiserar ett team olika för en snabb uppgift vs ett stort projekt, finns det olika sätt att sätta upp AI-agenter.',
  patterns: [
    { name: 'Ensam agent', analogy: 'En assistent som hanterar allt', howItWorks: 'En AI-agent tar emot uppgiften och gör allt. Enkelt och snabbt.', bestFor: 'Uppgifter med tydliga steg som en person kan hantera.', realExample: 'En kund frågar "vad är min orderstatus?" Agenten kollar och svarar.' },
    { name: 'Överlämning (Routing)', analogy: 'En receptionist som dirigerar dig till rätt avdelning', howItWorks: 'En "router"-agent avgör vilken typ av förfrågan det är och lämnar över till en specialist.', bestFor: 'Olika typer av förfrågningar som behöver olika expertis.', realExample: 'Kund skriver in. Router-agenten upptäcker att det är fakturering och lämnar över.' },
    { name: 'Multi-agent-team', analogy: 'Ett projektteam där var och en har en roll', howItWorks: 'Flera specialiserade agenter samarbetar, var och en hanterar sin del.', bestFor: 'Komplexa uppgifter som gynnas av olika perspektiv.', realExample: 'Marknadsanalys: en agent samlar data, en analyserar, en skriver sammanfattningen.' },
    { name: 'Människa-i-loopen', analogy: 'En assistent som stämmer av före stora beslut', howItWorks: 'Agenten gör arbetet men pausar vid viktiga beslutspunkter för godkännande.', bestFor: 'Högriskuppgifter där misstag är kostsamma.', realExample: 'Agenten förbereder en kontraktsändring, visar dig ändringarna, väntar på ditt OK.' },
  ],
}

export const patternsKo = {
  title: '3. 팀을 위한 에이전트 설정 방법',
  intro: '만능 해결책은 없습니다. 빠른 작업과 큰 프로젝트에 팀을 다르게 구성하듯이, AI 에이전트를 설정하는 방법도 다양합니다.',
  patterns: [
    { name: '단일 에이전트', analogy: '모든 것을 처리하는 한 명의 비서', howItWorks: '하나의 AI 에이전트가 작업을 받아 모두 처리합니다. 간단하고 빠릅니다.', bestFor: '한 사람이 처리할 수 있는 명확한 단계의 작업.', realExample: '고객이 "주문 상태가 어떻게 되나요?"라고 물으면 에이전트가 확인하고 답합니다.' },
    { name: '핸드오프 (라우팅)', analogy: '올바른 부서로 안내하는 안내원', howItWorks: '"라우터" 에이전트가 요청 유형을 파악하고 전문 에이전트에게 넘깁니다.', bestFor: '다른 전문성이 필요한 다양한 유형의 요청.', realExample: '고객이 문의합니다. 라우터 에이전트가 청구 문제임을 감지하고 청구 전문 에이전트에게 넘깁니다.' },
    { name: '멀티 에이전트 팀', analogy: '각자 역할이 있는 프로젝트 팀', howItWorks: '여러 전문 에이전트가 협력하여 각자의 부분을 처리합니다.', bestFor: '다양한 관점이 도움이 되는 복잡한 작업.', realExample: '시장 분석: 한 에이전트가 데이터를 수집하고, 다른 하나가 분석하고, 세 번째가 요약을 작성합니다.' },
    { name: '휴먼 인 더 루프', analogy: '큰 결정 전에 확인하는 비서', howItWorks: '에이전트가 작업을 수행하지만 주요 결정 지점에서 승인을 위해 일시 중지합니다.', bestFor: '실수 비용이 큰 고위험 작업.', realExample: '에이전트가 계약 수정안을 준비하고, 변경 사항을 보여주고, 확인을 기다립니다.' },
  ],
}

export const connectSv = {
  title: '4. Hur agenter ansluter till allt',
  intro: 'En agent är bara användbar om den kan *göra saker*. Så här passar ekosystemet av verktyg, färdigheter och protokoll ihop.',
  concepts: [
    { name: 'MCP — anslutning till verktyg', analogy: 'Universella åtkomstbrickor för dina system', whatItIs: 'En öppen standard ("USB-C för AI") som låter vilken AI som helst ansluta till vilket verktyg som helst. Över 2 000 kopplingar finns redan.', example: 'Ditt företag bygger en MCP-server för ert ärendesystem. Nu kan alla AI-verktyg skapa och uppdatera ärenden.' },
    { name: 'Färdigheter — lär agenter arbetsflöden', analogy: 'En utbildningsmanual, inte bara ett verktygsbälte', whatItIs: 'MCP ger agenter verktyg. Färdigheter lär dem HUR de ska använda dem — arbetsflödet, bästa praxis och beslutslogik.', example: 'En "kundintroduktion"-färdighet vet 7-stegsprocessen: verifiera kontrakt, skapa arbetsyta, skicka välkomstmail...' },
    { name: 'Powers — expertkonsulter för utvecklare', analogy: 'En specialist som kommer med egen verktygslåda', whatItIs: 'Kurerade paket för Kiro IDE som buntar MCP-servrar, riktlinjer och automatiseringskrokar.', example: '"AWS Observability" Power ger Kiro kunskap om CloudWatch och övervakningspraxis.' },
    { name: 'A2A — agenter pratar med agenter', analogy: 'Avdelningar som skickar förfrågningar till varandra', whatItIs: 'Medan MCP ansluter agenter till verktyg, ansluter A2A agenter till ANDRA agenter. Skapat av Google, stöds av 100+ organisationer.', example: 'Din supportagent upptäcker ett faktureringsproblem. Via A2A skickar den en återbetalningsförfrågan till ekonomiteamets agent.' },
  ],
  platformNote: 'Plattformar som **Amazon Bedrock AgentCore** hanterar körtiden som binder ihop allt detta.',
  selfExplainPrompt: 'Tänk på en flerstegsprocess på ditt företag som involverar flera system. Vilka MCP-verktyg skulle en agent behöva? Vilken arbetsflödeslogik (färdighet) skulle binda ihop dem?',
  selfExplainAnswer: 'Exempel — ny affär stängd: MCP-verktyg: CRM, e-post, kalender, projekthantering, fakturering. Färdighetsarbetsflöde: (1) Uppdatera CRM. (2) Skapa introduktionsprojekt. (3) Boka kickoff-möte. (4) Skicka välkomstmail. (5) Generera faktura. (6) Meddela säljchef.',
}

export const connectKo = {
  title: '4. 에이전트가 모든 것에 연결하는 방법',
  intro: '에이전트는 *무언가를 할 수 있어야* 유용합니다. 도구, 스킬, 프로토콜의 생태계가 어떻게 맞물리는지 알아보겠습니다.',
  concepts: [
    { name: 'MCP — 도구에 연결', analogy: '시스템을 위한 범용 접근 배지', whatItIs: '어떤 AI든 어떤 도구에든 연결할 수 있는 오픈 표준("AI의 USB-C"). 이미 3,000개 이상의 커넥터가 있습니다.', example: '회사가 티켓 시스템용 MCP 서버를 구축합니다. 이제 모든 AI 도구가 티켓을 생성하고 업데이트할 수 있습니다.' },
    { name: '스킬 — 에이전트에게 워크플로우 가르치기', analogy: '도구 벨트가 아닌 교육 매뉴얼', whatItIs: 'MCP는 에이전트에게 도구를 줍니다. 스킬은 사용 방법을 가르칩니다 — 워크플로우, 모범 사례, 의사결정 로직.', example: '"고객 온보딩" 스킬은 7단계 프로세스를 알고 있습니다: 계약 확인, 워크스페이스 생성, 환영 이메일 발송...' },
    { name: 'Powers — 개발자를 위한 전문 컨설턴트', analogy: '자체 도구와 전문성을 가지고 오는 전문가', whatItIs: 'Kiro IDE를 위한 큐레이션된 패키지로 MCP 서버, 가이드라인, 자동화 훅을 번들합니다.', example: '"AWS Observability" Power는 Kiro에게 CloudWatch와 모니터링 모범 사례에 대한 지식을 제공합니다.' },
    { name: 'A2A — 에이전트끼리 대화', analogy: '부서 간 요청을 보내는 것', whatItIs: 'MCP가 에이전트를 도구에 연결하는 반면, A2A는 에이전트를 다른 에이전트에 연결합니다. Google이 만들고 100개 이상의 조직이 지원합니다.', example: '지원 에이전트가 청구 문제를 감지합니다. A2A를 통해 재무팀의 청구 에이전트에게 환불 요청을 보냅니다.' },
  ],
  platformNote: '**Amazon Bedrock AgentCore** 같은 플랫폼이 이 모든 것을 연결하는 런타임을 관리합니다.',
  selfExplainPrompt: '회사에서 여러 시스템을 포함하는 다단계 프로세스를 생각해 보세요. 에이전트에게 어떤 MCP 도구가 필요할까요? 어떤 워크플로우 로직(스킬)이 연결할까요?',
  selfExplainAnswer: '예시 — 새 거래 성사: MCP 도구: CRM, 이메일, 캘린더, 프로젝트 관리, 청구. 스킬 워크플로우: (1) CRM 업데이트. (2) 온보딩 프로젝트 생성. (3) 킥오프 미팅 예약. (4) 환영 이메일 발송. (5) 인보이스 생성. (6) 영업 매니저에게 알림.',
}

export const businessImpactSv = {
  title: '6. Affärsverkligheten — När AI tar ratten',
  intro: 'Varje chef vill ha AI-transformation. Men när det är dags att faktiskt låta AI fatta beslut blir det tyst i rummet. Detta är problemet med självkörande bilar — tekniken kanske är redo, men är människorna och processerna det?',
  introSub: 'Att förstå spektrumet av AI-autonomi — och ärligt bedöma var din organisation är redo — är skillnaden mellan framgångsrik adoption och dyra misslyckanden.',
  loopTitle: 'Autonomispektrumet',
  loopDesc: 'Från miniräknare till självkörande bil — fyra nivåer av AI-autonomi och vad varje nivå innebär för din organisation.',
  carTitle: 'Lärdomen från självkörande bilar',
  carIntro: 'Parallellerna mellan autonoma fordon och autonoma AI-agenter är slående — och lärdomarna är direkt tillämpbara på din AI-strategi.',
  frameworkButton: 'Praktiskt ramverk: vilka beslut kan AI fatta?',
  failTitle: 'Varför 40% av agentiska AI-projekt kan misslyckas',
  failIntro: 'Branschanalytiker bedömer att upp till 40% av agentiska AI-initiativ kan avbrytas till 2027 — inte för att tekniken inte fungerar, utan för att organisationer inte är redo.',
  selfExplainPrompt: 'Din VD säger "Jag vill att vår kundsupport ska vara helt autonom till Q4 — inga människor i loopen." Hur skulle du råda dem med hjälp av autonomispektrumet och analogin med självkörande bilar?',
  selfExplainAnswer: 'Jag skulle säga: "Jag delar ambitionen, men låt oss lära av branschen för självkörande bilar. Jag rekommenderar Waymo-metoden: Börja med Nivå 2 för rutinärenden i Q1. Flytta till Nivå 3 i Q2 när vi har data som visar 98%+ noggrannhet. Behåll komplexa ärenden på Nivå 2 genom Q3. Utvärdera full autonomi i Q4 baserat på faktisk prestanda."',
}

export const businessImpactKo = {
  title: '6. 비즈니스 현실 — AI가 운전대를 잡을 때',
  intro: '모든 임원이 AI 전환을 원합니다. 하지만 실제로 AI가 결정을 내리게 할 때가 되면 회의실이 조용해집니다. 이것이 자율주행차 문제입니다 — 기술은 준비되었을 수 있지만, 사람과 프로세스는 준비되었나요?',
  introSub: 'AI 자율성의 스펙트럼을 이해하고 — 조직이 어디까지 준비되었는지 솔직하게 평가하는 것이 — 성공적인 도입과 비싼 실패의 차이입니다.',
  loopTitle: '자율성 스펙트럼',
  loopDesc: '계산기에서 자율주행차까지 — AI 자율성의 네 단계와 각 단계가 조직에 미치는 의미.',
  carTitle: '자율주행차의 교훈',
  carIntro: '자율주행차와 자율 AI 에이전트 사이의 유사점은 놀랍습니다 — 그리고 교훈은 AI 전략에 직접 적용됩니다.',
  frameworkButton: '실용적 프레임워크: AI가 어떤 결정을 내릴 수 있나요?',
  failTitle: '에이전틱 AI 프로젝트의 40%가 실패할 수 있는 이유',
  failIntro: '업계 분석가들은 에이전틱 AI 이니셔티브의 최대 40%가 2027년까지 취소될 수 있다고 예측합니다 — 기술이 작동하지 않아서가 아니라 조직이 준비되지 않았기 때문입니다.',
  selfExplainPrompt: 'CEO가 "Q4까지 고객 지원을 완전 자율화하고 싶다 — 사람은 루프에 없어도 된다"고 말합니다. 자율성 스펙트럼과 자율주행차 비유를 사용하여 어떻게 조언하시겠습니까?',
  selfExplainAnswer: '이렇게 말하겠습니다: "야망을 공유하지만, 자율주행차 업계에서 배우겠습니다. Waymo 접근법을 추천합니다: Q1에 일상 업무에 대해 레벨 2로 시작. Q2에 98%+ 정확도 데이터가 있으면 레벨 3으로 이동. Q3까지 복잡한 업무는 레벨 2 유지. Q4에 실제 성과 데이터를 기반으로 완전 자율성 평가."',
}

export const skillsAndPowersSv = {
  title: '5. Verktyg, färdigheter och Powers — Vad är skillnaden?',
  intro: 'Du kommer att höra dessa termer. De är relaterade men löser olika problem — som skillnaden mellan att ha en hammare (verktyg), veta hur man bygger ett skåp (färdighet) och anlita en snickare som kommer med egna verktyg och expertis (power).',
}

export const skillsAndPowersKo = {
  title: '5. 도구, 스킬, Powers — 차이점은?',
  intro: '이 용어들을 자주 듣게 될 것입니다. 관련이 있지만 다른 문제를 해결합니다 — 망치를 가지고 있는 것(도구), 캐비닛을 만드는 방법을 아는 것(스킬), 자체 도구와 전문성을 가진 목수를 고용하는 것(power)의 차이와 같습니다.',
}
