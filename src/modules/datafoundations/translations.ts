// Data Foundations — Swedish and Korean translations

export const garbageInOutSv = {
  title: '1. Skräp in, skräp ut',
  intro: 'Regel nummer ett för AI: **din AI är bara så bra som den data du matar den med**.',
  introSub: 'Tänk dig att utbilda en nyanställd genom att ge dem en låda med föråldrade manualer, stökiga anteckningar och motsägelsefulla instruktioner. De skulle lära sig fel saker — inte för att de är dåliga på sitt jobb, utan för att de fick dåligt utbildningsmaterial. AI fungerar på samma sätt.',
  messyLabel: 'Med stökig data',
  cleanLabel: 'Med ren data',
  showClean: 'Visa rensad version',
  showMessy: 'Visa stökig version',
  goodDataTitle: 'Vad "bra data" ser ut som',
  qualities: [
    { label: 'Komplett', desc: 'Inga saknade fält — som ett formulär med varje ruta ifylld' },
    { label: 'Konsekvent', desc: 'Samma format överallt — datum, namn, kategorier matchar' },
    { label: 'Aktuell', desc: 'Uppdaterad — inte förra årets produktkatalog' },
    { label: 'Representativ', desc: 'Täcker hela bilden — inte bara en avdelning eller region' },
  ],
}

export const garbageInOutKo = {
  title: '1. 쓰레기를 넣으면 쓰레기가 나온다',
  intro: 'AI의 제1 규칙: **AI는 제공하는 데이터만큼만 좋습니다**.',
  introSub: '신입사원에게 오래된 매뉴얼, 지저분한 메모, 모순된 지침이 담긴 상자를 건네며 교육하는 것을 상상해 보세요. 그들은 잘못된 것을 배울 것입니다 — 업무 능력이 부족해서가 아니라 나쁜 교육 자료를 받았기 때문입니다. AI도 같은 방식으로 작동합니다.',
  messyLabel: '지저분한 데이터로',
  cleanLabel: '깨끗한 데이터로',
  showClean: '정리된 버전 보기',
  showMessy: '지저분한 버전 보기',
  goodDataTitle: '"좋은 데이터"란 이런 것',
  qualities: [
    { label: '완전함', desc: '빠진 필드 없음 — 모든 칸이 채워진 양식처럼' },
    { label: '일관성', desc: '어디서나 같은 형식 — 날짜, 이름, 카테고리가 일치' },
    { label: '최신', desc: '최신 상태 — 작년 제품 카탈로그가 아닌' },
    { label: '대표성', desc: '전체 그림을 포함 — 한 부서나 지역만이 아닌' },
  ],
}

export const dataForBusinessSv = {
  title: '2. Ditt företags data — Vad AI ser',
  intro: 'Ditt företag har redan den data AI behöver. Men all data ser inte likadan ut. Låt oss titta på **faktiska exempel** så du kan se skillnaden.',
  structuredLabel: 'Strukturerad (kalkylblad)',
  unstructuredLabel: 'Ostrukturerad (e-post, dokument)',
  whyItMattersLabel: 'Varför det spelar roll',
  structuredNote: 'Varje information har en tydlig etikett (kolumn) och konsekvent format. AI kan enkelt svara "hur många Enterprise-kunder har vi?"',
  unstructuredNote: 'Samma kundinformation (Acme Corp, Sarah, expansionsplaner) är utspridd över e-post, dokument och Slack — i olika format, utan konsekvent struktur. Detta är **80%+ av de flesta företags data**, och det är här LLM:er verkligen lyser.',
  howMuchTitle: 'Hur mycket data behöver du?',
  howMuchIntro: 'Det beror på uppgiften — som att utbilda en nyanställd:',
  amounts: [
    { task: 'Svara på vanliga frågor', amount: 'Några dussin fråga-svar-par', analogy: 'Som att ge en ny receptionist ett fuskblad' },
    { task: 'Klassificera supportärenden', amount: 'Några hundra märkta exempel', analogy: 'Som att visa en ny agent exempel på varje ärendetyp' },
    { task: 'Skriva i ert varumärkes ton', amount: 'Tusentals av era tidigare kommunikationer', analogy: 'Som månader av att skugga er bästa skribent' },
  ],
  selfExplainPrompt: 'Tänk på ditt företags data. Vad är strukturerat (kalkylblad, CRM)? Vad är ostrukturerat (e-post, dokument, Slack)? Om du pekade en AI på båda, vilka frågor kunde den svara på som ingen kan svara snabbt idag?',
  selfExplainAnswer: 'Exempel: \'Vår CRM har rena kundposter (strukturerat) — AI kunde enkelt svara vem som ska förnya. Men den riktiga guldet finns i vår ostrukturerade data: kontoansvariga e-posttrådar har kontext om kundsentiment, mötesanteckningar fångar muntliga åtaganden, och Slack har realtidssignaler om riskfyllda konton.\'',
}

export const dataForBusinessKo = {
  title: '2. 회사의 데이터 — AI가 보는 것',
  intro: '회사에는 이미 AI가 필요로 하는 데이터가 있습니다. 하지만 모든 데이터가 같은 모습은 아닙니다. **실제 예시**를 보면서 차이를 확인해 보겠습니다.',
  structuredLabel: '정형 데이터 (스프레드시트)',
  unstructuredLabel: '비정형 데이터 (이메일, 문서)',
  whyItMattersLabel: '왜 중요한가',
  structuredNote: '모든 정보에 명확한 레이블(열)과 일관된 형식이 있습니다. AI가 "엔터프라이즈 고객이 몇 명인가요?"에 쉽게 답할 수 있습니다.',
  unstructuredNote: '같은 고객 정보(Acme Corp, Sarah, 확장 계획)가 이메일, 문서, Slack(또는 카카오워크)에 흩어져 있습니다 — 다른 형식으로, 일관된 구조 없이. 이것이 **대부분 회사 데이터의 80% 이상**이며, LLM이 정말 빛나는 곳입니다.',
  howMuchTitle: '얼마나 많은 데이터가 필요한가요?',
  howMuchIntro: '작업에 따라 다릅니다 — 신입사원 교육처럼:',
  amounts: [
    { task: 'FAQ 답변', amount: '수십 개의 Q&A 쌍', analogy: '새 안내원에게 치트시트를 주는 것과 같음' },
    { task: '지원 티켓 분류', amount: '수백 개의 레이블된 예시', analogy: '새 상담원에게 각 티켓 유형의 예시를 보여주는 것과 같음' },
    { task: '브랜드 보이스로 작성', amount: '수천 개의 과거 커뮤니케이션', analogy: '최고의 작가를 수개월 동안 따라다니는 것과 같음' },
  ],
  selfExplainPrompt: '회사의 데이터를 생각해 보세요. 정형 데이터(스프레드시트, CRM)는 무엇인가요? 비정형 데이터(이메일, 문서, Slack/카카오워크)는 무엇인가요? AI를 둘 다에 연결하면 현재 아무도 빠르게 답할 수 없는 어떤 질문에 답할 수 있을까요?',
  selfExplainAnswer: '예시: \'CRM에는 깨끗한 고객 기록(정형)이 있어 AI가 갱신 대상을 쉽게 답할 수 있습니다. 하지만 진짜 금은 비정형 데이터에 있습니다: 계정 관리자의 이메일 스레드에는 고객 감정에 대한 맥락이 있고, 회의록에는 구두 약속이 기록되어 있으며, Slack에는 위험 계정에 대한 실시간 신호가 있습니다.\'',
}
