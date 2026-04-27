export const whyAIGoesWrongSv = {
  title: '1. Varför AI ibland går fel',
  intro: 'AI lärde sig genom att läsa miljarder webbsidor — **tänk dig att utbilda en nyanställd genom att låta dem läsa hela internet**. De skulle få otrolig kunskap, men också felaktig information, fördomar och dåliga vanor.',
  introSub: 'Att förstå vad som kan gå fel är första steget till att använda AI säkert.',
  failures: [
    { title: 'Hallucination — hittar på saker', analogy: 'Kollegan som aldrig säger "jag vet inte"', description: 'AI genererar ibland självsäkra, trovärdiga svar som är helt felaktiga — som en kollega som hittar på ett svar istället för att erkänna att de inte vet.', example: 'En juridisk AI citerade rättsfall som inte existerade. Advokaten lämnade in dem till domstolen utan att kontrollera. Verkligt fall — hände 2023.', risk: 'Beslut baserade på falsk information. Rykteskada. Juridiskt ansvar.' },
    { title: 'Bias — speglar orättvisa mönster', analogy: 'En rekryteringspanel som bara känner en typ av kandidat', description: 'AI lär sig från historisk data. Om den datan speglar tidigare fördomar upprepar AI dem.', example: 'Amazon byggde en CV-gransknings-AI tränad på 10 års inskickade CV:n. Eftersom de flesta sökande inom tech var män lärde sig systemet att manliga kandidater var att föredra. De lade ner projektet.', risk: 'Diskriminering. Juridisk exponering. Förlust av mångfald.' },
    { title: 'Dataläckor — delar det den inte borde', analogy: 'En anställd som skvallrar om konfidentiella möten', description: 'Om AI har tillgång till känslig data kan den avslöja information för personer som inte borde se den.', example: 'Samsung-ingenjörer klistrade in proprietär källkod i ChatGPT. Den koden blev potentiellt tillgänglig för andra.', risk: 'Förlust av immateriella rättigheter. Integritetsbrott. Regulatoriska böter.' },
    { title: 'Skadligt innehåll — säger olämpliga saker', analogy: 'En kundvänd anställd som går utanför manuset', description: 'Utan skyddsräcken kan AI generera stötande eller olämpligt innehåll.', example: 'En bilhandlares chattbot lurades att gå med på att sälja en bil för 1 dollar. En leveransfirmas bot svor åt en kund. Båda blev virala.', risk: 'Varumärkesskada. Förlorat kundförtroende. PR-kriser.' },
  ],
}

export const whyAIGoesWrongKo = {
  title: '1. AI가 때때로 잘못되는 이유',
  intro: 'AI는 수십억 개의 웹 페이지를 읽으며 학습했습니다 — **신입사원에게 인터넷 전체를 읽게 하여 교육하는 것을 상상해 보세요**. 놀라운 지식을 얻겠지만, 잘못된 정보, 편견, 나쁜 습관도 함께 배울 것입니다.',
  introSub: '무엇이 잘못될 수 있는지 이해하는 것이 AI를 안전하게 사용하는 첫 번째 단계입니다.',
  failures: [
    { title: '환각 — 지어내기', analogy: '"모르겠습니다"라고 절대 말하지 않는 동료', description: 'AI는 때때로 자신감 있고 그럴듯하게 들리지만 완전히 틀린 답변을 생성합니다 — 모른다고 인정하기보다 답을 지어내는 동료와 같습니다.', example: '법률 AI가 존재하지 않는 판례를 인용했습니다. 변호사가 확인하지 않고 법원에 제출했습니다. 실제 사례 — 2023년에 발생.', risk: '잘못된 정보에 기반한 결정. 평판 손상. 법적 책임.' },
    { title: '편향 — 불공정한 패턴 반영', analogy: '한 유형의 후보만 아는 채용 패널', description: 'AI는 과거 데이터에서 학습합니다. 그 데이터가 과거의 편향을 반영하면 AI가 이를 반복합니다.', example: 'Amazon은 10년간 제출된 이력서로 학습한 이력서 심사 AI를 만들었습니다. 기술 분야 지원자 대부분이 남성이었기 때문에 시스템은 남성 후보를 선호하도록 학습했습니다. 프로젝트를 중단했습니다.', risk: '차별. 법적 노출. 다양한 인재 손실.' },
    { title: '데이터 유출 — 공유하면 안 되는 것을 공유', analogy: '기밀 회의에 대해 수다를 떠는 직원', description: 'AI가 민감한 데이터에 접근하면 보아서는 안 되는 사람에게 정보를 노출할 수 있습니다.', example: '삼성 엔지니어들이 독점 소스 코드를 ChatGPT에 붙여넣었습니다. 그 코드가 다른 사람들에게 잠재적으로 접근 가능해졌습니다.', risk: '지적 재산 손실. 개인정보 침해. 규제 벌금.' },
    { title: '유해한 콘텐츠 — 부적절한 말', analogy: '대본을 벗어나는 고객 응대 직원', description: '가드레일 없이 AI는 공격적이거나 부적절한 콘텐츠를 생성할 수 있습니다.', example: '자동차 딜러 챗봇이 1달러에 차를 팔겠다고 속아서 동의했습니다. 배달 회사의 봇이 고객에게 욕을 했습니다. 둘 다 바이럴이 되었습니다.', risk: '브랜드 손상. 고객 신뢰 침식. PR 위기.' },
  ],
}

export const guardrailsSv = {
  title: '2. Att hålla AI säker — Skyddsräckena',
  intro: 'Varje företag har regler för anställda — godkännandeprocesser, efterlevnadsutbildning, eskaleringsrutiner. **AI behöver samma typ av struktur.**',
  introSub: 'Tänk på det som introduktion: en nyanställd börjar med mer övervakning och förtjänar autonomi över tid. AI bör fungera på samma sätt.',
  guardrails: [
    { risk: 'Hallucination (hittar på saker)', mitigation: 'Kräv att AI:n citerar källor. Använd RAG så den svarar från dina dokument, inte minnet. Låt människor stickprovskontrollera svar.', analogy: 'Som att kräva fotnoter i en rapport — kan de inte citera det, kan de inte hävda det.' },
    { risk: 'Bias (orättvisa mönster)', mitigation: 'Granska AI-beslut regelbundet. Testa med varierade indata. Ha tydliga eskaleringsvägar.', analogy: 'Som att granska din rekryteringsprocess — kontrollera resultaten, inte bara intentionerna.' },
    { risk: 'Dataläckor (delar hemligheter)', mitigation: 'Kontrollera vilken data AI:n kan komma åt. Använd självhostade modeller för känslig data. Klistra aldrig in konfidentiell info i publika AI-verktyg.', analogy: 'Som åtkomstkontroller på delade mappar — inte alla ser allt.' },
    { risk: 'Skadligt innehåll (går utanför manuset)', mitigation: 'Sätt tydliga gränser för vad AI:n kan diskutera. Lägg till innehållsfilter. Testa med fientliga indata.', analogy: 'Som ett kundtjänstmanus — definiera vad som är inom ramarna och vad som eskaleras.' },
  ],
  goldenRule: 'Börja strikt, lossa gradvis.',
  goldenRuleDetail: 'Lansera med mänsklig granskning av allt. Spåra noggrannhet och problem. När förtroendet växer, automatisera lågriskbeslut och behåll människor på högriskbeslut.',
  platformNote: 'Molnplattformar erbjuder inbyggda skyddsverktyg. Till exempel låter Amazon Bedrock Guardrails dig konfigurera innehållsfilter, blockera begränsade ämnen, maskera personuppgifter och upptäcka hallucinationer — allt utan att ändra din applikationskod.',
  selfExplainPrompt: 'Ditt företag ska lansera en kundvänd AI-chattbot. Vilka skyddsräcken skulle du sätta upp innan lansering?',
  selfExplainAnswer: 'Jag skulle sätta upp: (1) Begränsa omfattningen — chattboten svarar bara på frågor om våra produkter och policyer. (2) Källkrav — den måste hämta svar från vår godkända kunskapsbas. (3) Mänsklig granskning — första månaden granskar en teammedlem varje konversation dagligen. (4) Eskalering — frågor om fakturering, klagomål eller juridik dirigeras till en människa omedelbart. (5) Innehållsfilter. (6) Övervakningspanel.',
}

export const guardrailsKo = {
  title: '2. AI를 안전하게 유지하기 — 가드레일',
  intro: '모든 회사에는 직원을 위한 규칙이 있습니다 — 승인 프로세스, 컴플라이언스 교육, 에스컬레이션 절차. **AI에도 같은 종류의 구조가 필요합니다.**',
  introSub: '온보딩처럼 생각하세요: 신입사원은 더 많은 감독으로 시작하고 시간이 지나면서 자율성을 얻습니다. AI도 같은 방식으로 작동해야 합니다.',
  guardrails: [
    { risk: '환각 (지어내기)', mitigation: 'AI에게 출처를 인용하도록 요구하세요. RAG를 사용하여 기억이 아닌 문서에서 답하게 하세요. 사람이 답변을 표본 검사하세요.', analogy: '보고서에 각주를 요구하는 것과 같습니다 — 인용할 수 없으면 주장할 수 없습니다.' },
    { risk: '편향 (불공정한 패턴)', mitigation: 'AI 결정을 정기적으로 감사하세요. 다양한 입력으로 테스트하세요. 편향이 감지되면 명확한 에스컬레이션 경로를 마련하세요.', analogy: '채용 프로세스를 감사하는 것과 같습니다 — 의도가 아닌 결과를 확인하세요.' },
    { risk: '데이터 유출 (비밀 공유)', mitigation: 'AI가 접근할 수 있는 데이터를 통제하세요. 민감한 데이터에는 자체 호스팅 모델을 사용하세요. 공개 AI 도구에 기밀 정보를 붙여넣지 마세요.', analogy: '공유 폴더의 접근 제어와 같습니다 — 모든 사람이 모든 것을 보는 것은 아닙니다.' },
    { risk: '유해한 콘텐츠 (대본 이탈)', mitigation: 'AI가 논의할 수 있는 것에 대한 명확한 경계를 설정하세요. 콘텐츠 필터를 추가하세요. 적대적 입력으로 테스트하세요.', analogy: '고객 서비스 스크립트와 같습니다 — 범위 내인 것과 관리자에게 에스컬레이션되는 것을 정의하세요.' },
  ],
  goldenRule: '엄격하게 시작하고, 점진적으로 완화하세요.',
  goldenRuleDetail: '모든 것에 대해 사람의 검토로 시작하세요. 정확도와 문제를 추적하세요. 신뢰가 쌓이면 저위험 작업을 자동화하고 고위험 결정에는 사람을 유지하세요.',
  platformNote: '클라우드 플랫폼은 내장 가드레일 도구를 제공합니다. 예를 들어, Amazon Bedrock Guardrails를 사용하면 콘텐츠 필터 구성, 제한된 주제 차단, 개인정보 삭제, 환각 감지를 애플리케이션 코드 변경 없이 할 수 있습니다.',
  selfExplainPrompt: '회사에서 고객 대면 AI 챗봇을 출시하려고 합니다. 출시 전에 어떤 가드레일을 설정하시겠습니까?',
  selfExplainAnswer: '다음 가드레일을 설정하겠습니다: (1) 범위 제한 — 챗봇은 우리 제품과 정책에 대한 질문에만 답합니다. (2) 출처 요구 — 승인된 지식 베이스에서 답변을 가져와야 합니다. (3) 사람 검토 — 첫 달 동안 팀원이 매일 모든 대화를 검토합니다. (4) 에스컬레이션 — 청구, 불만, 법적 주제에 대한 질문은 즉시 사람에게 전달됩니다. (5) 콘텐츠 필터. (6) 모니터링 대시보드.',
}
