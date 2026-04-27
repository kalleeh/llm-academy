// AI Problem module — Swedish and Korean translations
// English content stays inline in the components

export const landscapeSv = {
  title: '1. AI-familjeträdet',
  intro: '"AI" är ett stort paraply. Allt under det är inte samma sak. Tänk så här: alla LLM:er är AI, men all AI är inte en LLM — precis som alla golden retrievers är hundar, men inte alla hundar är golden retrievers. Klicka på varje lager för att lära dig mer.',
  levels: [
    { label: 'Artificiell intelligens', plain: 'All smart automatisering', analogy: 'Ett samlingsbegrepp för programvara som gör saker vi tidigare trodde bara människor kunde — känna igen ansikten, förstå tal, fatta beslut.', examples: ['Spamfilter i din e-post', 'Automatisk komplettering när du skriver', 'Bedrägeridetektering på ditt kreditkort'] },
    { label: 'Maskininlärning', plain: 'Lär sig från exempel', analogy: 'Istället för att programmera varje regel för hand visar du systemet tusentals exempel och det hittar mönstren — som att utbilda en nyanställd genom att studera tidigare ärenden istället för att läsa en 500-sidig manual.', examples: ['Netflix-rekommendationer', 'E-postsortering i Primär/Socialt/Kampanjer', 'Förutsäga vilka kunder som kan säga upp sig'] },
    { label: 'Djupinlärning', plain: 'Mönsterigenkänning på steroider', analogy: 'En kraftfullare version av maskininlärning som kan hantera stökig, komplex data som foton, ljud och text — saker som är enkla för människor men var omöjliga för traditionell programvara.', examples: ['Ansiktsigenkänning för att låsa upp din telefon', 'Röstassistenter som förstår vad du säger', 'Översättning mellan språk i realtid'] },
    { label: 'Stora språkmodeller', plain: 'AI som förstår och genererar språk', analogy: 'AI:n bakom ChatGPT, Copilot och Gemini. Tränad genom att läsa miljarder webbsidor lärde den sig skriva, resonera, sammanfatta, översätta och konversera — som en otroligt beläst kollega.', examples: ['ChatGPT, Claude, Gemini, Copilot', 'Skriva e-post, sammanfatta dokument', 'Svara på frågor om ditt företags data'] },
  ],
  examplesLabel: 'Exempel du redan använder:',
}

export const landscapeKo = {
  title: '1. AI 가계도',
  intro: '"AI"는 큰 우산입니다. 그 아래 있는 모든 것이 같지는 않습니다. 이렇게 생각하세요: 모든 LLM은 AI이지만, 모든 AI가 LLM은 아닙니다 — 모든 골든 리트리버가 개이지만, 모든 개가 골든 리트리버는 아닌 것처럼요. 각 레이어를 클릭해서 자세히 알아보세요.',
  levels: [
    { label: '인공지능', plain: '모든 스마트 자동화', analogy: '얼굴 인식, 음성 이해, 의사결정 등 이전에는 인간만 할 수 있다고 생각했던 일을 하는 소프트웨어를 통칭하는 용어입니다.', examples: ['이메일의 스팸 필터', '타이핑할 때 자동 완성', '신용카드 사기 탐지'] },
    { label: '머신러닝', plain: '예시로부터 학습', analogy: '모든 규칙을 직접 프로그래밍하는 대신, 시스템에 수천 개의 예시를 보여주면 패턴을 스스로 파악합니다 — 500페이지 매뉴얼을 읽는 대신 과거 사례를 공부하며 신입사원을 교육하는 것과 같습니다.', examples: ['넷플릭스 추천', '이메일을 기본/소셜/프로모션으로 분류', '어떤 고객이 해지할지 예측'] },
    { label: '딥러닝', plain: '강력한 패턴 인식', analogy: '사진, 오디오, 텍스트 같은 복잡한 데이터를 처리할 수 있는 더 강력한 머신러닝 — 인간에게는 쉽지만 기존 소프트웨어로는 불가능했던 것들입니다.', examples: ['휴대폰 잠금 해제를 위한 얼굴 인식', '음성 비서가 말을 이해하는 것', '실시간 언어 번역'] },
    { label: '대규모 언어 모델', plain: '언어를 이해하고 생성하는 AI', analogy: 'ChatGPT, Copilot, Gemini 뒤에 있는 AI입니다. 수십억 개의 웹 페이지를 읽으며 학습하여 글쓰기, 추론, 요약, 번역, 대화를 배웠습니다 — 거의 모든 주제를 논의할 수 있는 엄청나게 박식한 동료와 같습니다.', examples: ['ChatGPT, Claude, Gemini, Copilot', '이메일 작성, 문서 요약', '회사 데이터에 대한 질문 답변'] },
  ],
  examplesLabel: '이미 사용하고 있는 예시:',
}

export const decisionSv = {
  title: '2. Ska du använda AI för detta?',
  intro: 'Inte alla problem behöver AI. Ibland räcker ett kalkylblad, en checklista eller en enkel regel. Nyckelfrågan är: finns det tydliga regler, eller krävs det omdöme?',
  introSub: 'Tänk så här: om du kan skriva de fullständiga instruktionerna på en enda sida behöver du förmodligen inte AI. Om det krävs års erfarenhet för att göra det bra kan AI hjälpa.',
  scenarios: [
    { task: 'Beräkna anställdas bonusar baserat på en fast formel', answer: 'Ingen AI behövs', why: 'Reglerna är fasta och exakta — som att följa ett recept steg för steg. En kalkylbladsformel gör detta perfekt.' },
    { task: 'Förutsäga vilka kunder som troligen säger upp sig nästa kvartal', answer: 'Maskininlärning', why: 'Det finns historisk data och mönster att hitta. ML lär sig dessa mönster från exempel — som en säljare som utvecklar en magkänsla för riskfyllda konton, men baserat på data.' },
    { task: 'Svara på anställdas frågor om företagets policyer', answer: 'LLM + dina dokument', why: 'Anställda ställer frågor på naturligt språk. En LLM kan förstå frågan, söka i dina policydokument och ge ett tydligt svar — som en alltid tillgänglig HR-assistent.' },
    { task: 'Sammanfatta ett 50-sidigt kontrakt och flagga viktiga risker', answer: 'LLM', why: 'Detta kräver läsning, kontextförståelse och bedömning — precis vad LLM:er är bra på. Som att be en junior jurist göra en första genomgång, men på 30 sekunder.' },
  ],
  bestFitLabel: 'Bäst lämpat:',
  selfExplainPrompt: 'Tänk på en uppgift på ditt jobb som tar mycket tid. Skulle AI hjälpa? Är den regelbaserad (kalkylblad), mönsterbaserad (ML) eller språkbaserad (LLM)?',
  selfExplainAnswer: 'Exempel: \'Jag lägger 2 timmar varje måndag på att kategorisera supportärenden efter prioritet.\' Detta är mönsterbaserat — det finns historisk data, och uppgiften kräver att läsa texten och göra en bedömning. En LLM kunde kategorisera baserat på tidigare mönster.',
}

export const decisionKo = {
  title: '2. 이 작업에 AI를 사용해야 할까요?',
  intro: '모든 문제에 AI가 필요한 것은 아닙니다. 때로는 스프레드시트, 체크리스트, 또는 간단한 규칙이 더 낫습니다. 핵심 질문은: 명확한 규칙이 있는가, 아니면 판단이 필요한가?',
  introSub: '이렇게 생각하세요: 완전한 지침을 한 페이지에 쓸 수 있다면 AI가 필요 없을 것입니다. 잘하려면 수년간의 경험이 필요하다면 AI가 도움이 될 수 있습니다.',
  scenarios: [
    { task: '고정 공식에 따라 직원 보너스 계산', answer: 'AI 불필요', why: '규칙이 고정되고 정확합니다 — 레시피를 단계별로 따르는 것과 같습니다. 스프레드시트 수식이 완벽하게 처리합니다.' },
    { task: '다음 분기에 해지할 가능성이 있는 고객 예측', answer: '머신러닝', why: '과거 데이터와 찾아야 할 패턴이 있습니다. ML은 예시에서 패턴을 학습합니다 — 데이터에 기반한 위험 계정 직감을 개발하는 영업 담당자와 같습니다.' },
    { task: '회사 정책에 대한 직원 질문 답변', answer: 'LLM + 회사 문서', why: '직원들은 자연어로 질문합니다. LLM은 질문을 이해하고, 정책 문서를 검색하고, 명확한 답변을 제공할 수 있습니다 — 항상 이용 가능한 HR 비서와 같습니다.' },
    { task: '50페이지 계약서를 요약하고 주요 위험 표시', answer: 'LLM', why: '읽기, 맥락 이해, 중요한 것에 대한 판단이 필요합니다 — 정확히 LLM이 잘하는 것입니다. 30초 만에 주니어 변호사의 첫 번째 검토와 같습니다.' },
  ],
  bestFitLabel: '최적 도구:',
  selfExplainPrompt: '직장에서 시간이 많이 걸리는 작업을 생각해 보세요. AI가 도움이 될까요? 규칙 기반(스프레드시트), 패턴 기반(ML), 언어 기반(LLM) 중 어디에 해당하나요?',
  selfExplainAnswer: '예시: \'매주 월요일 지원 티켓을 우선순위별로 분류하는 데 2시간을 씁니다.\' 이것은 패턴 기반입니다 — 과거 데이터가 있고, 작업은 텍스트를 읽고 판단하는 것이 필요합니다. LLM이 과거 패턴에 기반하여 분류할 수 있습니다.',
}
