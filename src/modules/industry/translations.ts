export const keyPlayersSv = {
  title: '1. Vem gör AI?',
  intro: 'En handfull företag dominerar AI-landskapet. Tänk på det som smartphonemarknaden — några stora aktörer, var och en med en egen strategi. Klicka på varje för att lära dig mer.',
  players: [
    { name: 'OpenAI', product: 'ChatGPT, GPT-4o', position: 'Den alla känner till — som AI:ns iPhone. Först på marknaden, störst varumärkeskännedom.', users: 'Miljontals konsumenter och företag. Microsoft är deras största partner.' },
    { name: 'Google', product: 'Gemini', position: 'Inbyggd i allt Google — Sök, Gmail, Docs, Android. Massiv distributionsfördel.', users: 'Alla som använder Google-produkter. Företag på Google Cloud.' },
    { name: 'Anthropic', product: 'Claude', position: 'Företaget med "säkerhet först". Populärt bland företag som bryr sig om tillförlitlighet.', users: 'Företag, utvecklare, Amazon (stor investerare och partner via AWS).' },
    { name: 'Amazon / AWS', product: 'Bedrock, Nova, AgentCore', position: 'Istället för att bygga en modell byggde AWS plattformen — Amazon Bedrock ger tillgång till 100+ modeller genom ett enda API med företagssäkerhet.', users: 'Företag redan på AWS. Företag som vill ha modellval utan leverantörslåsning.' },
    { name: 'Meta', product: 'Llama (gratis)', position: 'Ger bort sin AI gratis. Strategi: bygg ekosystemet, som Android vs iPhone.', users: 'Utvecklare och företag som vill köra AI på egna servrar.' },
    { name: 'Övriga', product: 'Mistral, DeepSeek, Cohere m.fl.', position: 'Mindre aktörer med specifika styrkor — vissa är billigare, vissa bättre för vissa språk.', users: 'Företag som söker alternativ eller specialiserade funktioner.' },
  ],
}

export const keyPlayersKo = {
  title: '1. 누가 AI를 만드나요?',
  intro: '소수의 회사가 AI 환경을 지배합니다. 스마트폰 시장처럼 생각하세요 — 몇몇 큰 플레이어가 각자 다른 전략을 가지고 있습니다. 각각을 클릭해서 자세히 알아보세요.',
  players: [
    { name: 'OpenAI', product: 'ChatGPT, GPT-4o', position: '모두가 아는 회사 — AI의 아이폰과 같습니다. 시장 선점, 가장 큰 브랜드 인지도.', users: '수백만 소비자와 기업. Microsoft가 가장 큰 파트너 (Copilot이 OpenAI로 구동).' },
    { name: 'Google', product: 'Gemini', position: '모든 Google 제품에 내장 — 검색, Gmail, Docs, Android. 대규모 배포 이점.', users: 'Google 제품 사용자. Google Cloud의 기업 고객.' },
    { name: 'Anthropic', product: 'Claude', position: '"안전 우선" 회사. 신뢰성을 중시하는 기업에서 인기.', users: '기업, 개발자, Amazon (AWS를 통한 주요 투자자 및 파트너).' },
    { name: 'Amazon / AWS', product: 'Bedrock, Nova, AgentCore', position: '하나의 모델을 만드는 대신 AWS는 플랫폼을 구축했습니다 — Amazon Bedrock은 엔터프라이즈 보안과 함께 단일 API로 100개 이상의 모델에 접근할 수 있게 합니다.', users: '이미 AWS를 사용하는 기업. 단일 AI 제공업체에 종속되지 않고 모델 선택을 원하는 회사.' },
    { name: 'Meta', product: 'Llama (무료)', position: 'AI를 무료로 제공합니다. 전략: 생태계 구축, Android vs iPhone처럼.', users: '자체 서버에서 AI를 실행하려는 개발자와 회사.' },
    { name: '기타', product: 'Mistral, DeepSeek, Cohere 등', position: '특정 강점을 가진 소규모 플레이어 — 일부는 더 저렴하고, 일부는 특정 언어나 작업에 더 뛰어남.', users: '대안이나 전문 기능을 찾는 회사.' },
  ],
}

export const openVsClosedSv = {
  title: '2. Öppen vs stängd AI — Vad det betyder för dig',
  intro: 'Vissa AI-modeller är **"stängda"** (du betalar för att använda dem, företaget kontrollerar allt) och vissa är **"öppna"** (gratis att ladda ner och köra själv). Tänk på det som **Microsoft Office vs LibreOffice**, eller **iPhone vs Android**.',
  closedTitle: 'Stängda modeller (GPT-4o, Claude, Gemini)',
  closedSubtitle: 'Som att använda Microsoft Office 365',
  openTitle: 'Öppna modeller (Llama, Mistral, DeepSeek)',
  openSubtitle: 'Som att använda Android eller LibreOffice',
  realPictureTitle: 'Den verkliga bilden: det är inte svart eller vitt',
  realPictureText: 'Uppfattningen "öppen = privat, stängd = riskfyllt" är föråldrad. Företags-AI-tjänster i molnet (Azure OpenAI, AWS Bedrock, Google Vertex) erbjuder säkerhetscertifieringar och efterlevnadsgarantier som de flesta företag inte kan replikera själva. Självhosting ger dig kontroll, men **kontroll ≠ säkerhet** — du behöver teamet och expertisen för att faktiskt säkra det.',
  selfExplainPrompt: 'Din CTO säger "vi borde använda AI med öppen källkod för att undvika leverantörslåsning." Vilka avvägningar vill du diskutera?',
  selfExplainAnswer: 'Jag skulle ta upp: (1) Vi undviker leverantörslåsning men tar på oss underhållsansvar — har vi teknisk personal? (2) Dataintegritet är bättre. (3) Öppna modeller är något mindre kapabla för komplexa uppgifter — vi bör testa. (4) Installation tar veckor vs timmar. (5) En hybridmetod kan fungera. (6) Total kostnad: GPU-hosting är inte gratis.',
}

export const openVsClosedKo = {
  title: '2. 오픈 vs 클로즈드 AI — 비즈니스에 미치는 의미',
  intro: '일부 AI 모델은 **"클로즈드"**(사용료를 내고, 회사가 모든 것을 통제)이고 일부는 **"오픈"**(무료로 다운로드하여 직접 실행)입니다. **Microsoft Office vs LibreOffice**, 또는 **iPhone vs Android**처럼 생각하세요.',
  closedTitle: '클로즈드 모델 (GPT-4o, Claude, Gemini)',
  closedSubtitle: 'Microsoft Office 365를 사용하는 것과 같음',
  openTitle: '오픈 모델 (Llama, Mistral, DeepSeek)',
  openSubtitle: 'Android나 LibreOffice를 사용하는 것과 같음',
  realPictureTitle: '실제 상황: 흑백이 아닙니다',
  realPictureText: '"오픈 = 프라이버시, 클로즈드 = 위험"이라는 프레이밍은 구식입니다. 엔터프라이즈 클라우드 AI 서비스(Azure OpenAI, AWS Bedrock, Google Vertex)는 대부분의 회사가 자체적으로 복제할 수 없는 보안 인증과 컴플라이언스 보장을 제공합니다. 셀프 호스팅은 통제권을 주지만, **통제 ≠ 보안** — 실제로 보안을 유지할 팀과 전문성이 필요합니다.',
  selfExplainPrompt: 'CTO가 "벤더 종속을 피하기 위해 오픈소스 AI를 사용해야 한다"고 말합니다. 결정 전에 논의하고 싶은 트레이드오프는 무엇인가요?',
  selfExplainAnswer: '다음을 제기하겠습니다: (1) 벤더 종속은 피하지만 유지보수 책임을 지게 됩니다 — 기술 인력이 있나요? (2) 데이터 프라이버시가 더 좋습니다. (3) 오픈 모델은 복잡한 작업에서 약간 덜 능력이 있습니다 — 테스트해야 합니다. (4) 설정에 몇 주 vs 몇 시간. (5) 하이브리드 접근이 가능합니다. (6) 총 비용: GPU 호스팅은 무료가 아닙니다.',
}
