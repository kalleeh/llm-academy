export const measuringSv = {
  title: '1. Hur du vet om din AI fungerar',
  intro: '**"Det verkar ganska bra" räcker inte.** Du skulle inte utvärdera en nyanställd baserat på magkänsla — du skulle sätta tydliga förväntningar och mäta resultat. AI behöver samma rigor.',
  introSub: 'Tänk på det som kvalitetssäkring innan en produktlansering — testa systematiskt, inte bara slumpmässigt.',
  metrics: [
    { metric: 'Noggrannhet', question: 'Hur ofta har den rätt?', analogy: 'Som att kontrollera en nyanställds arbete för fel' },
    { metric: 'Relevans', question: 'Svarar den på den faktiska frågan?', analogy: 'Som att fråga om vägbeskrivning och få en historielektio istället' },
    { metric: 'Säkerhet', question: 'Säger den någonsin något skadligt?', analogy: 'Som att granska vad en nyanställd säger till kunder' },
    { metric: 'Hastighet', question: 'Hur snabbt svarar den?', analogy: 'Kunder väntar inte 30 sekunder på ett svar' },
    { metric: 'Kostnad', question: 'Hur mycket per svar?', analogy: 'Som att spåra kostnad per ärende i support' },
    { metric: 'Konsekvens', question: 'Samma fråga, samma kvalitet?', analogy: 'Som att säkerställa att varje filial ger samma service' },
  ],
  goodAnswerLabel: 'Bra svar',
  badAnswerLabel: 'Dåligt svar',
}

export const measuringKo = {
  title: '1. AI가 잘 작동하는지 어떻게 알 수 있나요',
  intro: '**"꽤 괜찮아 보인다"는 충분하지 않습니다.** 신입사원을 느낌으로 평가하지 않듯이 — 명확한 기대치를 설정하고 결과를 측정해야 합니다. AI에도 같은 엄격함이 필요합니다.',
  introSub: '제품 출시 전 품질 보증처럼 생각하세요 — 체계적으로 테스트하세요.',
  metrics: [
    { metric: '정확도', question: '얼마나 자주 맞나요?', analogy: '신입사원의 작업에서 오류를 확인하는 것과 같음' },
    { metric: '관련성', question: '실제 질문에 답하나요?', analogy: '길을 물었는데 역사 강의를 받는 것과 같음' },
    { metric: '안전성', question: '해로운 말을 하나요?', analogy: '신입사원이 고객에게 하는 말을 검토하는 것과 같음' },
    { metric: '속도', question: '얼마나 빨리 응답하나요?', analogy: '고객은 답변을 30초 기다리지 않습니다' },
    { metric: '비용', question: '답변당 비용은?', analogy: '지원의 티켓당 비용을 추적하는 것과 같음' },
    { metric: '일관성', question: '같은 질문, 같은 품질?', analogy: '모든 지점이 같은 서비스를 제공하는지 확인하는 것과 같음' },
  ],
  goodAnswerLabel: '좋은 답변',
  badAnswerLabel: '나쁜 답변',
}

export const choosingSv = {
  title: '2. Rätt AI-modell att välja',
  intro: 'Att välja en AI-modell är som att **rekrytera för en specifik roll** — den "bästa" kandidaten beror på DINA behov, inte bara deras CV.',
  introSub: 'En doktor i fysik är imponerande, men du skulle inte anställa dem som receptionist. På samma sätt är den största, dyraste AI-modellen inte alltid rätt val.',
  tiers: [
    { model: 'Stora frontmodeller (GPT-4o, Claude Sonnet, Gemini Pro)', fit: 'Komplex resonering, nyanserat skrivande, flerstegsuppgifter', analogy: 'Seniorkonsulten — dyr men hanterar det svåra', cost: '$$$', speed: 'Långsammare' },
    { model: 'Mellanstora modeller (Claude Haiku, Amazon Nova Pro, Gemini Flash)', fit: 'De flesta vardagsuppgifter — sammanfattningar, Q&A, klassificering', analogy: 'Den pålitliga heltidsanställda — bra på det mesta, kostnadseffektiv', cost: '$$', speed: 'Snabb' },
    { model: 'Små/specialiserade modeller (Amazon Nova Micro, Mistral Small)', fit: 'En specifik uppgift gjord mycket bra', analogy: 'Specialistkonsulten — gör en sak, snabbt och billigt', cost: '$', speed: 'Snabbast' },
  ],
  tipsTitle: 'Att läsa AI-rankningar (som produktrecensioner)',
  tips: [
    { tip: 'Titta på uppgifter som matchar DITT användningsfall', detail: 'En modell som är bra på matte kan vara medioker på skrivande.' },
    { tip: 'Benchmarks ≠ verklig prestanda', detail: 'Som hur en bra intervjukandidat kan kämpa på det faktiska jobbet. Testa alltid med DIN data.' },
    { tip: 'Kostnad och hastighet spelar lika stor roll som kvalitet', detail: 'En modell som är 5% bättre men 10× dyrare kanske inte är värd det.' },
    { tip: 'Plattformar låter dig byta enkelt', detail: 'Tjänster som Amazon Bedrock ger tillgång till 100+ modeller via ett API.' },
  ],
  selfExplainPrompt: 'Hur skulle du utvärdera om en AI-chattbot fungerar bra för ert kundsupportteam? Vad specifikt skulle du mäta?',
  selfExplainAnswer: 'Jag skulle mäta: (1) Noggrannhet — stickprov 100 konversationer per vecka. (2) Kundnöjdhet — tumme upp/ner efter varje svar. (3) Lösningsgrad — hur stor andel hanterar AI utan människa? (4) Svarstid. (5) Eskaleringskvalitet. (6) Kostnad per konversation.',
}

export const choosingKo = {
  title: '2. 올바른 AI 모델 선택하기',
  intro: 'AI 모델을 선택하는 것은 **특정 역할에 채용하는 것**과 같습니다 — "최고의" 후보는 이력서가 아니라 여러분의 필요에 따라 달라집니다.',
  introSub: '물리학 박사는 인상적이지만, 안내원으로 채용하지는 않을 것입니다. 마찬가지로, 가장 크고 비싼 AI 모델이 항상 올바른 선택은 아닙니다.',
  tiers: [
    { model: '대형 프론티어 모델 (GPT-4o, Claude Sonnet, Gemini Pro)', fit: '복잡한 추론, 섬세한 글쓰기, 다단계 작업', analogy: '시니어 컨설턴트 — 비싸지만 어려운 일을 처리', cost: '$$$', speed: '느림' },
    { model: '중형 모델 (Claude Haiku, Amazon Nova Pro, Gemini Flash)', fit: '대부분의 일상 작업 — 요약, Q&A, 분류', analogy: '믿을 수 있는 정규직 — 대부분의 일을 잘하고 비용 효율적', cost: '$$', speed: '빠름' },
    { model: '소형/전문 모델 (Amazon Nova Micro, Mistral Small)', fit: '한 가지 특정 작업을 매우 잘 수행', analogy: '전문 계약자 — 한 가지를 빠르고 저렴하게', cost: '$', speed: '가장 빠름' },
  ],
  tipsTitle: 'AI 리더보드 읽기 (제품 리뷰 읽기처럼)',
  tips: [
    { tip: '여러분의 사용 사례에 맞는 작업을 보세요', detail: '수학을 잘하는 모델이 글쓰기에는 평범할 수 있습니다.' },
    { tip: '벤치마크 ≠ 실제 성능', detail: '면접을 잘 본 후보가 실제 업무에서 어려움을 겪을 수 있는 것처럼. 항상 여러분의 데이터로 테스트하세요.' },
    { tip: '비용과 속도도 품질만큼 중요합니다', detail: '5% 더 정확하지만 10배 더 비싼 모델은 가치가 없을 수 있습니다.' },
    { tip: '플랫폼을 통해 쉽게 전환할 수 있습니다', detail: 'Amazon Bedrock 같은 서비스는 하나의 API로 100개 이상의 모델에 접근할 수 있습니다.' },
  ],
  selfExplainPrompt: '고객 지원팀을 위한 AI 챗봇이 잘 작동하는지 어떻게 평가하시겠습니까? 구체적으로 무엇을 측정하시겠습니까?',
  selfExplainAnswer: '측정할 것: (1) 정확도 — 주당 100개 대화를 표본 검사. (2) 고객 만족도 — 각 AI 응답 후 좋아요/싫어요. (3) 해결률 — AI가 사람 없이 처리하는 비율. (4) 응답 시간. (5) 에스컬레이션 품질. (6) 대화당 비용.',
}
