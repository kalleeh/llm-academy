export const basicsSv = {
  title: '1. Varför hur du frågar spelar roll',
  intro: 'Att få bra resultat från AI är som att **ge instruktioner till en ny praktikant** — ju tydligare du är, desto bättre resultat.',
  introSub: '"Skriv något om vår produkt" ger vaga resultat. "Skriv en 200-ords produktbeskrivning för vår webbplats, professionell ton, lyft fram dessa 3 funktioner" ger exakt vad du behöver.',
  vagueLabel: 'Vag prompt',
  specificLabel: 'Specifik prompt',
  keysTitle: 'De 4 nycklarna till en bra prompt',
  keys: [
    { key: 'Var specifik', example: 'Inte "hjälp med e-post" utan "skriv ett uppföljningsmail till en klient om den försenade leveransen"' },
    { key: 'Ge kontext', example: '"Du hjälper ett B2B SaaS-företag" eller "målgruppen är seniora chefer"' },
    { key: 'Visa exempel', example: '"Här är ett bra svar vi skickade förut — skriv ett liknande"' },
    { key: 'Ange format', example: '"Punktlista", "ett stycke", "tabell med 3 kolumner"' },
  ],
}

export const basicsKo = {
  title: '1. 어떻게 물어보느냐가 중요한 이유',
  intro: 'AI에서 좋은 결과를 얻는 것은 **새 인턴에게 지시하는 것**과 같습니다 — 명확할수록 결과가 좋습니다.',
  introSub: '"제품에 대해 뭔가 써줘"는 모호한 결과를 줍니다. "웹사이트용 200단어 제품 설명을 전문적인 톤으로, 이 3가지 기능을 강조해서 써줘"는 정확히 필요한 것을 줍니다.',
  vagueLabel: '모호한 프롬프트',
  specificLabel: '구체적인 프롬프트',
  keysTitle: '좋은 프롬프트의 4가지 핵심',
  keys: [
    { key: '구체적으로', example: '"이메일 도와줘"가 아니라 "지연된 배송에 대해 고객에게 보내는 후속 이메일 작성해 줘"' },
    { key: '맥락 제공', example: '"B2B SaaS 회사를 돕고 있다" 또는 "대상은 임원진이다"' },
    { key: '예시 보여주기', example: '"이전에 보낸 좋은 응답이 있어 — 이것처럼 써줘"' },
    { key: '형식 지정', example: '"글머리 기호", "한 단락", "3열 표"' },
  ],
}

export const techniquesSv = {
  title: '2. Praktiska tekniker för vardagsarbete',
  intro: 'Fyra tekniker som omedelbart förbättrar dina AI-resultat — ingen teknisk kunskap krävs.',
  techniques: [
    { name: 'Ge den en roll', analogy: 'Som att briefa en konsult före ett möte', example: '"Du är en erfaren HR-chef på ett medelstort teknikföretag."', why: 'AI:n anpassar ton, ordval och perspektiv efter rollen.' },
    { name: 'Be om steg-för-steg-tänkande', analogy: 'Som att be någon visa sitt arbete', example: '"Tänk igenom detta steg för steg: bör vi expandera till den europeiska marknaden?"', why: 'När AI tänker högt fångar den sina egna misstag.' },
    { name: 'Ge exempel', analogy: 'Som att utbilda genom att visa', example: '"Här är 3 kundsvar vårt team bedömde som utmärkta. Skriv ett svar i samma stil."', why: 'Exempel är värda tusen ord av instruktioner.' },
    { name: 'Skapa återanvändbara mallar', analogy: 'Som e-postmallar, men för AI', example: '"Sammanfatta bifogade mötesanteckningar. Format: (1) Beslut, (2) Åtgärdspunkter, (3) Öppna frågor."', why: 'Spara prompts som fungerar bra. AI-kodningsverktyg som Kiro tar detta vidare med strukturerade specifikationer.' },
  ],
  mistakesTitle: 'Vanliga misstag (och snabba fixar)',
  mistakes: [
    { mistake: 'För vag', fix: 'Lägg till detaljer: vem, vad, format, längd, ton' },
    { mistake: 'Ingen kontext', fix: 'Berätta för AI:n vem du är och vem målgruppen är' },
    { mistake: 'Flera förfrågningar samtidigt', fix: 'En uppgift per prompt — som ett ämne per e-post' },
    { mistake: 'Itererar inte', fix: 'Om första resultatet inte stämmer, förfina — "gör det kortare" eller "mer formellt"' },
  ],
  selfExplainPrompt: 'Välj en uppgift du gör regelbundet på jobbet. Skriv en specifik prompt som skulle få AI att hjälpa dig effektivt. Använd minst 2 av teknikerna ovan.',
  selfExplainAnswer: 'Exempel: "Du är en senior projektledare (roll). Jag klistrar in anteckningar från dagens sprint-retrospektiv. Ge mig: (1) Topp 3 saker som gick bra, (2) Topp 3 förbättringsområden med förslag, (3) Tabell med åtgärdspunkter. Här är ett exempel på en bra sammanfattning (exempel). Håll tonen konstruktiv (ton). Max en sida (längd)."',
}

export const techniquesKo = {
  title: '2. 일상 업무를 위한 실용적 기법',
  intro: 'AI 결과를 즉시 개선하는 네 가지 기법 — 기술 지식이 필요 없습니다.',
  techniques: [
    { name: '역할 부여', analogy: '회의 전 컨설턴트에게 브리핑하는 것과 같음', example: '"당신은 중견 기술 회사의 경험 많은 HR 매니저입니다."', why: 'AI가 역할에 맞게 톤, 어휘, 관점을 조정합니다.' },
    { name: '단계별 사고 요청', analogy: '답만이 아니라 과정을 보여달라고 하는 것과 같음', example: '"단계별로 생각해 보세요: 유럽 시장에 진출해야 할까요?"', why: 'AI가 소리 내어 생각하면 자체 실수를 잡습니다.' },
    { name: '예시 제공', analogy: '말로 설명하는 것이 아니라 보여주며 교육', example: '"우리 팀이 우수하다고 평가한 고객 응답 3개입니다. 같은 스타일로 작성해 주세요."', why: '예시는 천 마디 지시보다 가치 있습니다.' },
    { name: '재사용 가능한 템플릿 만들기', analogy: '이메일 템플릿과 같지만 AI용', example: '"첨부된 회의록을 요약해 주세요. 형식: (1) 주요 결정, (2) 실행 항목, (3) 미해결 질문."', why: '잘 작동하는 프롬프트를 저장하세요. Kiro 같은 AI 코딩 도구는 구조화된 사양으로 이를 더 발전시킵니다.' },
  ],
  mistakesTitle: '흔한 실수 (그리고 빠른 해결)',
  mistakes: [
    { mistake: '너무 모호함', fix: '세부사항 추가: 누구, 무엇, 형식, 길이, 톤' },
    { mistake: '맥락 없음', fix: 'AI에게 당신이 누구인지, 대상이 누구인지 알려주세요' },
    { mistake: '한 번에 여러 요청', fix: '프롬프트당 하나의 작업 — 이메일당 하나의 주제처럼' },
    { mistake: '반복하지 않음', fix: '첫 결과가 맞지 않으면 다듬기 — "더 짧게" 또는 "더 격식 있게"' },
  ],
  selfExplainPrompt: '직장에서 정기적으로 하는 작업을 선택하세요. AI가 효과적으로 도울 수 있는 구체적인 프롬프트를 작성하세요. 위 기법 중 최소 2개를 사용하세요.',
  selfExplainAnswer: '예시: "당신은 시니어 프로젝트 매니저입니다(역할). 오늘 스프린트 회고 노트를 붙여넣겠습니다. 다음을 주세요: (1) 잘된 점 상위 3개, (2) 개선 영역 상위 3개와 제안, (3) 실행 항목 표. 지난달의 좋은 회고 요약 예시입니다(예시). 건설적인 톤으로(톤). 한 페이지 이내(길이)."',
}

export const cookbookSv = {
  title: '3. Promptkokbok — Färdiga mallar',
  intro: 'Sluta stirra på ett tomt chattfönster. Dessa mallar fungerar för vanliga arbetsuppgifter — fyll bara i hakparenteserna.',
  templateLabel: 'Mall (kopiera och fyll i [hakparenteserna])',
  resultLabel: 'Vad du får tillbaka',
  proTipTitle: 'Proffstips: spara dina bästa prompts',
  proTipText: 'När du får ett bra resultat, spara prompten som en mall. Dela med ditt team. Över tid bygger ni ett bibliotek av beprövade prompts — som e-postmallar, men för AI.',
}

export const cookbookKo = {
  title: '3. 프롬프트 쿡북 — 바로 사용 가능한 템플릿',
  intro: '빈 채팅 창을 멍하니 바라보지 마세요. 이 템플릿은 일반적인 업무 작업에 사용할 수 있습니다 — 대괄호만 채우면 됩니다.',
  templateLabel: '템플릿 ([대괄호]를 복사하여 채우세요)',
  resultLabel: '받게 되는 결과',
  proTipTitle: '프로 팁: 최고의 프롬프트를 저장하세요',
  proTipText: '좋은 결과를 얻으면 프롬프트를 템플릿으로 저장하세요. 팀과 공유하세요. 시간이 지나면 검증된 프롬프트 라이브러리가 만들어집니다 — 이메일 템플릿과 같지만 AI용입니다.',
}

export const systemPromptsSv = {
  title: '4. De dolda instruktionerna — Systemprompts',
  intro: 'Varje AI-verktyg har **dolda instruktioner** som användaren aldrig ser — som en personalhandbok som ges på första dagen.',
  introSub: 'När du använder ChatGPT finns det en systemprompt bakom kulisserna. När ett företag bygger en chattbot skriver de sin egen systemprompt.',
  goodPromptTitle: 'Vad gör en bra systemprompt?',
  keys: [
    { key: 'Definiera rollen', example: '"Du är en supportagent för Acme Corp"' },
    { key: 'Sätt tonen', example: '"Professionell men varm, aldrig påträngande"' },
    { key: 'Ange datakällor', example: '"Använd personalhandboken 2025"' },
    { key: 'Sätt gränser', example: '"Diskutera aldrig konkurrenter"' },
    { key: 'Definiera reservplaner', example: '"Om osäker, säg att du inte vet"' },
    { key: 'Begränsa omfattningen', example: '"Svara bara på frågor om våra produkter"' },
  ],
  selfExplainPrompt: 'Skriv en systemprompt för en AI-assistent som hjälper ditt team med en specifik uppgift.',
  selfExplainAnswer: 'Exempel för en IT-helpdesk: "Du är IT-supportassistenten för Acme Corp. Hjälp anställda med lösenordsåterställning, programåtkomst och VPN-problem. Använd IT-kunskapsbasen (2025). Var tålmodig och tydlig. Vid säkerhetsincidenter, eskalera till IT-säkerhetsteamet."',
}

export const systemPromptsKo = {
  title: '4. 숨겨진 지시 — 시스템 프롬프트',
  intro: '모든 AI 도구에는 사용자가 볼 수 없는 **숨겨진 지시**가 있습니다 — 첫날 주어지는 직원 핸드북과 같습니다.',
  introSub: 'ChatGPT를 사용할 때 뒤에서 시스템 프롬프트가 작동합니다. 회사가 챗봇을 만들 때 자체 시스템 프롬프트를 작성합니다.',
  goodPromptTitle: '좋은 시스템 프롬프트란?',
  keys: [
    { key: '역할 정의', example: '"당신은 Acme Corp의 지원 에이전트입니다"' },
    { key: '톤 설정', example: '"전문적이지만 따뜻하게, 절대 강압적이지 않게"' },
    { key: '데이터 소스 지정', example: '"2025년 직원 핸드북을 사용하세요"' },
    { key: '경계 설정', example: '"경쟁사에 대해 절대 논의하지 마세요"' },
    { key: '대체 방안 정의', example: '"확실하지 않으면 모르겠다고 말하세요"' },
    { key: '범위 제한', example: '"우리 제품에 대한 질문에만 답하세요"' },
  ],
  selfExplainPrompt: '팀의 특정 작업을 돕는 AI 비서를 위한 시스템 프롬프트를 작성하세요.',
  selfExplainAnswer: 'IT 헬프데스크 예시: "당신은 Acme Corp의 IT 지원 비서입니다. 비밀번호 재설정, 소프트웨어 접근 요청, VPN 문제를 도와주세요. IT 지식 베이스(2025)를 사용하세요. 인내심 있고 명확하게. 보안 사고 시 IT 보안팀에 에스컬레이션하세요."',
}
