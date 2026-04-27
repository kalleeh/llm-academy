export const approachesSv = {
  title: '1. Fyra sätt att använda AI',
  intro: 'Det finns ett spektrum från enkelt till komplext. **De flesta företag bör börja i den enkla änden** och bara gå uppåt när de stöter på en verklig begränsning.',
  approaches: [
    { name: 'Prompt Engineering', plain: 'Fråga rätt', analogy: 'Som att lära sig skriva bättre e-post — samma verktyg, mycket bättre resultat. Du ändrar inte AI:n, du ändrar hur du pratar med den.', when: 'Du vill ha snabba resultat utan installation.', effort: 'Minuter till timmar', cost: 'Gratis (bara din tid)' },
    { name: 'RAG (Sökning)', plain: 'Ge den ett referensbibliotek', analogy: 'Som en öppen bok-tenta — istället för att förlita sig på minnet letar AI:n i dina företagsdokument innan den svarar.', when: 'Du behöver svar baserade på dina specifika dokument. Information ändras ofta.', effort: 'Dagar till veckor', cost: 'Låg till måttlig' },
    { name: 'Finjustering', plain: 'Träna den på din stil', analogy: 'Som att introducera en nyanställd i företagets sätt att göra saker. Efter träning skriver de naturligt i er ton och följer era processer.', when: 'Du behöver konsekvent varumärkesröst eller domänspecifikt beteende.', effort: 'Veckor till månader', cost: 'Måttlig till hög' },
    { name: 'Egen modell', plain: 'Bygg från grunden', analogy: 'Som att bygga ett specialverktyg istället för att köpa färdigt. Extremt dyrt. Behövs nästan aldrig.', when: 'Nästan aldrig. Bara om du är Google, Meta, eller har ett unikt användningsfall.', effort: 'Månader till år', cost: 'Miljoner dollar' },
  ],
}

export const approachesKo = {
  title: '1. AI를 사용하는 네 가지 방법',
  intro: '간단한 것부터 복잡한 것까지 스펙트럼이 있습니다. **대부분의 기업은 간단한 쪽에서 시작**하고 실제 한계에 부딪힐 때만 올라가야 합니다.',
  approaches: [
    { name: '프롬프트 엔지니어링', plain: '잘 물어보기', analogy: '더 나은 이메일 쓰기를 배우는 것과 같습니다 — 같은 도구, 훨씬 나은 결과. AI를 바꾸는 것이 아니라 대화 방식을 바꿉니다.', when: '설정 없이 빠른 결과를 원할 때.', effort: '몇 분에서 몇 시간', cost: '무료 (시간만 투자)' },
    { name: 'RAG (검색)', plain: '참고 도서관 제공', analogy: '오픈북 시험과 같습니다 — 기억에 의존하는 대신 AI가 답하기 전에 회사 문서를 검색합니다.', when: '특정 문서에 기반한 답변이 필요할 때. 정보가 자주 변경될 때.', effort: '며칠에서 몇 주', cost: '낮음에서 보통' },
    { name: '파인튜닝', plain: '스타일 학습시키기', analogy: '신입사원에게 회사의 방식을 온보딩하는 것과 같습니다. 학습 후 자연스럽게 회사 톤으로 작성하고 프로세스를 따릅니다.', when: '일관된 브랜드 보이스나 도메인별 행동이 필요할 때.', effort: '몇 주에서 몇 달', cost: '보통에서 높음' },
    { name: '커스텀 모델', plain: '처음부터 구축', analogy: '기성품 대신 맞춤 도구를 만드는 것과 같습니다. 매우 비쌉니다. 거의 필요하지 않습니다.', when: '거의 필요 없음. Google, Meta이거나 매우 독특한 사용 사례가 있을 때만.', effort: '몇 달에서 몇 년', cost: '수백만 달러' },
  ],
}

export const buildVsBuySv = {
  title: '2. Hyra vs köpa — Det stora beslutet',
  intro: 'Ska du använda en AI-tjänst (som Amazon Bedrock) eller köra din egen AI? Det är samma beslut som **att hyra vs köpa en bil**.',
  introSub: 'Klicka på det alternativ som passar din situation för varje fråga.',
  factors: [
    { question: 'Hur känslig är din data?', rent: 'Data behandlas av leverantören, men företags-AI-tjänster (Azure OpenAI, AWS Bedrock) erbjuder SOC 2, HIPAA och kryptering som de flesta företag inte kan matcha internt.', buy: 'Data stannar på din infrastruktur — ger full kontroll, men DU ansvarar för säkerhet och efterlevnad.' },
    { question: 'Vilken budgetmodell?', rent: 'Betala per användning — förutsägbart vid låg volym, dyrt vid skala. Som att ta taxi.', buy: 'Fast månadskostnad — dyrt i förväg, billigare vid skala. Som att äga en bil.' },
    { question: 'Har du teknisk personal?', rent: 'Inget teknikteam behövs — leverantören hanterar allt.', buy: 'Behöver någon som underhåller — säkerhetsuppdateringar, övervakning.' },
    { question: 'Hur snabbt behöver du starta?', rent: 'Igång på timmar. Registrera dig och börja.', buy: 'Veckor till månader av installation.' },
  ],
  selfExplainPrompt: 'Ditt företag behöver AI för kundsupport. Gå igenom hyra-vs-köpa-beslutet.',
  selfExplainAnswer: 'Exempel: \'Vi hanterar kundbetalningsdata (känsligt → lutar mot köp). Vi är en startup med 50 anställda utan ML-team (lutar mot hyra). Vi behöver något som fungerar om 2 veckor (definitivt hyra). Slutsats: börja med en API-tjänst, men se till att använda en med företagsdataavtal. Utvärdera självhosting om 6 månader.\'',
}

export const buildVsBuyKo = {
  title: '2. 임대 vs 구매 — 큰 결정',
  intro: 'AI 서비스(Amazon Bedrock 같은)를 사용할 것인가, 자체 AI를 운영할 것인가? **자동차를 렌트할 것인가 구매할 것인가**와 같은 결정입니다.',
  introSub: '각 질문에 대해 상황에 맞는 옵션을 클릭하세요.',
  factors: [
    { question: '데이터가 얼마나 민감한가요?', rent: '데이터가 제공업체에서 처리되지만, 엔터프라이즈 AI 서비스(Azure OpenAI, AWS Bedrock)는 대부분의 회사가 자체적으로 맞출 수 없는 SOC 2, HIPAA, 암호화를 제공합니다.', buy: '데이터가 인프라에 남습니다 — 완전한 통제권을 주지만, 보안과 컴플라이언스는 여러분의 책임입니다.' },
    { question: '예산 모델은?', rent: '사용량에 따라 지불 — 적은 양에서는 예측 가능, 대규모에서는 비쌈. 택시를 타는 것과 같음.', buy: '고정 월 비용 — 초기 비용이 높지만 대규모에서는 저렴. 자동차를 소유하는 것과 같음.' },
    { question: '기술 인력이 있나요?', rent: '기술 팀 불필요 — 제공업체가 모든 것을 처리.', buy: '유지보수할 사람이 필요 — 보안 패치, 업데이트, 모니터링.' },
    { question: '얼마나 빨리 시작해야 하나요?', rent: '몇 시간 만에 시작. 가입하고 사용 시작.', buy: '설정에 몇 주에서 몇 달.' },
  ],
  selfExplainPrompt: '회사에서 고객 지원을 위한 AI가 필요합니다. 임대 vs 구매 결정을 진행해 보세요.',
  selfExplainAnswer: '예시: \'고객 결제 데이터를 처리합니다 (민감 → 구매 쪽). 50명 스타트업으로 ML 팀이 없습니다 (임대 쪽). 2주 안에 작동하는 것이 필요합니다 (확실히 임대). 결론: API 서비스로 시작하되, 엔터프라이즈 데이터 계약이 있는 것을 사용. 6개월 후 셀프 호스팅을 재평가.\'',
}
