export const smartSearchSv = {
  title: '1. Varför vanlig sökning inte räcker',
  intro: 'Vanlig sökning letar efter **exakta ord**. AI-driven sökning förstår **betydelse**. Se skillnaden:',
  tryAnother: 'Prova en annan sökning',
  keywordLabel: 'Nyckelordssökning (Ctrl+F-stil)',
  smartLabel: 'AI-driven sökning (förstår betydelse)',
  howTitle: 'Hur fungerar det? (Inget matte, lovar)',
  howText: 'AI omvandlar varje text till ett "betydelsefingeravtryck". Liknande betydelser ger liknande fingeravtryck. När du söker omvandlar AI din fråga till ett fingeravtryck också, och hittar dokumenten med närmast matchning — även om de använder helt andra ord.',
}

export const smartSearchKo = {
  title: '1. 일반 검색이 충분하지 않은 이유',
  intro: '일반 검색은 **정확한 단어**를 찾습니다. AI 기반 검색은 **의미**를 이해합니다. 차이를 확인하세요:',
  tryAnother: '다른 검색어 시도',
  keywordLabel: '키워드 검색 (Ctrl+F 스타일)',
  smartLabel: 'AI 기반 검색 (의미를 이해)',
  howTitle: '어떻게 작동하나요? (수학 없이, 약속합니다)',
  howText: 'AI는 모든 텍스트를 "의미 지문"으로 변환합니다. 비슷한 의미는 비슷한 지문을 갖습니다. 검색할 때 AI는 질문도 지문으로 변환한 다음 가장 가까운 문서를 찾습니다 — 완전히 다른 단어를 사용하더라도.',
}

export const ragSv = {
  title: '2. Ge AI tillgång till ditt företags kunskap',
  intro: 'Direkt ur lådan vet AI bara allmän kunskap från internet. **RAG ger den en öppen bok-tenta** — den söker i dina dokument innan den svarar.',
  stepLabels: ['Du ställer en fråga', 'AI söker i dina dokument', 'AI läser de relevanta delarna', 'AI svarar med källor'],
  withoutRagLabel: 'Utan RAG (svarar ur minnet)',
  withRagLabel: 'Med RAG (öppen bok-tenta)',
  whenTitle: 'När ska man använda detta tillvägagångssätt',
  nextStep: 'Nästa steg →',
  startOver: 'Börja om',
  selfExplainPrompt: 'Ditt team har 10 000 supportartiklar. En kund ställer en fråga. Beskriv hur RAG skulle hjälpa AI:n hitta och använda rätt artikel.',
  selfExplainAnswer: 'Steg 1: Kunden skriver sin fråga. Steg 2: AI omvandlar den till ett betydelsefingeravtryck och söker bland alla 10 000 artiklar. Steg 3: AI läser de mest relevanta avsnitten. Steg 4: AI genererar ett tydligt svar med källhänvisning.',
}

export const ragKo = {
  title: '2. AI에게 회사 지식에 대한 접근 권한 부여',
  intro: '기본적으로 AI는 인터넷의 일반 지식만 알고 있습니다. **RAG는 오픈북 시험을 제공합니다** — 답하기 전에 회사 문서를 검색합니다.',
  stepLabels: ['질문합니다', 'AI가 문서를 검색합니다', 'AI가 관련 부분을 읽습니다', 'AI가 출처와 함께 답합니다'],
  withoutRagLabel: 'RAG 없이 (기억에서 답변)',
  withRagLabel: 'RAG와 함께 (오픈북 시험)',
  whenTitle: '이 접근 방식을 사용할 때',
  nextStep: '다음 단계 →',
  startOver: '처음부터',
  selfExplainPrompt: '팀에 10,000개의 지원 문서가 있습니다. 고객이 질문합니다. RAG가 AI가 올바른 문서를 찾고 사용하는 데 어떻게 도움이 되는지 설명하세요.',
  selfExplainAnswer: '1단계: 고객이 질문을 입력합니다. 2단계: AI가 의미 지문으로 변환하고 10,000개 문서에서 가장 가까운 것을 검색합니다. 3단계: AI가 가장 관련 있는 섹션을 읽습니다. 4단계: AI가 출처 인용과 함께 명확한 답변을 생성합니다.',
}

export const waysToFeedSv = {
  title: '3. "Jag laddade upp en PDF till ChatGPT — Är det RAG?"',
  intro: 'Det finns flera sätt att ge AI tillgång till din information, och de fungerar olika. Du har förmodligen redan använt några utan att veta det tekniska namnet.',
  methods: [
    { name: 'Klistra in i chatten', youKnowItAs: 'Kopiera-klistra text i ChatGPT eller Claude', isRag: 'Inte RAG — du ger bara AI:n mer kontext i konversationen. Ingen sökning inblandad.' },
    { name: 'Ladda upp en fil', youKnowItAs: 'Dra en PDF eller Word-fil till ChatGPT, Claude eller Gemini', isRag: 'Vanligtvis inte RAG — filen stoppas in i kontexten, inte indexerad och sökbar.' },
    { name: 'Kunskapsbas / Projektfiler', youKnowItAs: 'ChatGPT "Projekt", Claude "Projekt", Amazon Quick', isRag: 'Ja — detta ÄR RAG. Plattformen indexerar dina dokument, söker i dem och matar relevanta delar till AI:n.' },
    { name: 'Eget RAG-system', youKnowItAs: 'Vad ditt teknikteam bygger med Amazon Bedrock Knowledge Bases', isRag: 'Ja — RAG med full kontroll. Företagsversionen av vad ChatGPT Projekt gör automatiskt.' },
  ],
  selfExplainPrompt: 'En kollega säger "jag laddar bara upp allt till ChatGPT och det fungerar bra — varför behöver vi ett eget RAG-system?" Hur förklarar du skillnaden?',
  selfExplainAnswer: 'Att ladda upp till ChatGPT fungerar bra för personligt, ad hoc-bruk. Men det har begränsningar: (1) Det sparas inte — du laddar upp varje gång. (2) Det kan inte söka bland tusentals dokument. (3) Inga åtkomstkontroller. (4) Inget revisionsspår. Ett RAG-system indexerar alla dokument en gång, söker intelligent, respekterar behörigheter och ger källhänvisade svar i skala.',
}

export const waysToFeedKo = {
  title: '3. "ChatGPT에 PDF를 업로드했는데 — 이게 RAG인가요?"',
  intro: 'AI에 정보를 제공하는 여러 방법이 있으며, 각각 다르게 작동합니다. 기술적 이름을 모르고도 이미 일부를 사용해 봤을 것입니다.',
  methods: [
    { name: '채팅에 붙여넣기', youKnowItAs: 'ChatGPT나 Claude에 텍스트 복사-붙여넣기', isRag: 'RAG가 아닙니다 — 대화에 더 많은 맥락을 제공하는 것뿐입니다. 검색이 관여하지 않습니다.' },
    { name: '파일 업로드', youKnowItAs: 'ChatGPT, Claude, Gemini에 PDF나 Word 문서 드래그', isRag: '보통 RAG가 아닙니다 — 파일이 컨텍스트에 넣어지며, 인덱싱되고 검색되지 않습니다.' },
    { name: '지식 베이스 / 프로젝트 파일', youKnowItAs: 'ChatGPT "프로젝트", Claude "프로젝트", Amazon Quick', isRag: '예 — 이것이 RAG입니다. 플랫폼이 문서를 인덱싱하고, 질문할 때 검색하고, 관련 부분을 AI에 제공합니다.' },
    { name: '커스텀 RAG 시스템', youKnowItAs: '엔지니어링 팀이 Amazon Bedrock Knowledge Bases로 구축하는 것', isRag: '예 — 완전한 통제가 가능한 RAG. ChatGPT 프로젝트가 자동으로 하는 것의 엔터프라이즈 버전입니다.' },
  ],
  selfExplainPrompt: '동료가 "ChatGPT에 다 업로드하면 잘 되는데 — 왜 커스텀 RAG 시스템이 필요해?"라고 합니다. 차이를 어떻게 설명하시겠습니까?',
  selfExplainAnswer: 'ChatGPT에 업로드하는 것은 개인적이고 임시적인 사용에 좋습니다. 하지만 한계가 있습니다: (1) 저장되지 않음 — 매번 다시 업로드. (2) 수천 개의 문서를 검색할 수 없음. (3) 접근 제어 없음. (4) 감사 추적 없음. RAG 시스템은 모든 문서를 한 번 인덱싱하고, 지능적으로 검색하고, 권한을 존중하며, 대규모로 출처가 있는 답변을 제공합니다.',
}
