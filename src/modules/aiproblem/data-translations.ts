// aiproblem module — data array translations

export const levelsTranslations = {
  sv: [
    { label: 'Artificiell intelligens', definition: 'System som utför uppgifter som normalt kräver mänsklig intelligens — resonemang, planering, perception eller beslutsfattande.', examples: ['Regelbaserade system (if/else-logik för skatteberäkningar)', 'Expertsystem (medicinsk diagnos från symptomregler)', 'Sökalgoritmer (A*, minimax för schack)', 'Robotprocessautomation (RPA för formulärfyllning)'] },
    { label: 'Maskininlärning', definition: 'System som lär sig mönster från data istället för att vara explicit programmerade. De förbättras med mer data.', examples: ['Regression (förutsäga huspriser)', 'Klassificering (spam vs inte spam)', 'Klustring (kundsegmentering)', 'Rekommendationsmotorer (Netflix, Spotify)'] },
    { label: 'Djupinlärning', definition: 'ML med neurala nätverk med många lager. Utmärker sig på att lära sig från rå, ostrukturerad data som bilder, ljud och text.', examples: ['CNN:er — bildklassificering, objektdetektering', 'RNN/LSTM — tidsserier, sekvensmodellering', 'Transformers — arkitekturen bakom moderna LLM:er', 'GAN:er — bildgenerering, stilöverföring'] },
    { label: 'Stora språkmodeller', definition: 'Massiva transformer-modeller tränade på internetskala text. De förutsäger nästa token och utvecklar förmågor inom resonemang, kodning och konversation.', examples: ['GPT-4, Claude, Gemini — allmänt resonemang', 'Llama, Mistral — öppna modeller', 'Textgenerering, sammanfattning, översättning', 'Kodgenerering, analys, felsökning'] },
  ],
  ko: [
    { label: '인공지능', definition: '추론, 계획, 인식, 의사결정 등 일반적으로 인간 지능이 필요한 작업을 수행하는 시스템.', examples: ['규칙 기반 시스템 (세금 계산을 위한 if/else 로직)', '전문가 시스템 (증상 규칙에서 의료 진단)', '검색 알고리즘 (체스/경로 탐색을 위한 A*, minimax)', '로봇 프로세스 자동화 (양식 작성을 위한 RPA)'] },
    { label: '머신러닝', definition: '명시적으로 프로그래밍되는 대신 데이터에서 패턴을 학습하는 시스템. 더 많은 데이터로 개선됩니다.', examples: ['회귀 (특성에서 주택 가격 예측)', '분류 (스팸 vs 비스팸)', '클러스터링 (고객 세분화)', '추천 엔진 (Netflix, Spotify)'] },
    { label: '딥러닝', definition: '많은 레이어의 신경망을 사용하는 ML. 이미지, 오디오, 텍스트 같은 원시 비정형 데이터에서 학습하는 데 뛰어납니다.', examples: ['CNN — 이미지 분류, 객체 감지', 'RNN/LSTM — 시계열, 시퀀스 모델링', '트랜스포머 — 현대 LLM의 아키텍처', 'GAN — 이미지 생성, 스타일 전환'] },
    { label: '대규모 언어 모델', definition: '인터넷 규모의 텍스트로 학습된 대규모 트랜스포머 모델. 다음 토큰을 예측하고 추론, 코딩, 대화 능력이 나타납니다.', examples: ['GPT-4, Claude, Gemini — 범용 추론', 'Llama, Mistral — 오픈 모델', '텍스트 생성, 요약, 번역', '코드 생성, 분석, 디버깅'] },
  ],
}

export const overlaysTranslations = {
  sv: [
    { label: 'Generativ AI', description: 'Modeller som skapar nytt innehåll (text, bilder, ljud, kod). Spänner över djupinlärning och LLM:er.' },
    { label: 'Agentisk AI', description: 'LLM:er förstärkta med verktyg, minne och planering — de utför handlingar, inte bara genererar text.' },
  ],
  ko: [
    { label: '생성형 AI', description: '새로운 콘텐츠(텍스트, 이미지, 오디오, 코드)를 만드는 모델. 딥러닝과 LLM에 걸쳐 있습니다.' },
    { label: '에이전틱 AI', description: '도구, 메모리, 계획으로 강화된 LLM — 텍스트를 생성하는 것이 아니라 행동을 취합니다.' },
  ],
}

export const scenariosTranslations = {
  sv: [
    { problem: 'Förutsäga kundavhopp', approach: 'Klassisk ML', why: 'Strukturerad data med tydligt prediktionsmål' },
    { problem: 'Sammanfatta juridiska kontrakt', approach: 'LLM', why: 'Kräver läsning och bedömning av lång text' },
    { problem: 'Beräkna skatt', approach: 'Regelbaserat', why: 'Exakta regler definierade i lag' },
    { problem: 'Klassificera röntgenbilder', approach: 'Deep Learning (CNN)', why: 'Visuell mönsterigenkänning' },
    { problem: 'Svara på kundfrågor', approach: 'LLM + RAG', why: 'Naturligt språk + företagsspecifik kunskap' },
    { problem: 'Upptäcka bedrägeri', approach: 'ML (anomalidetektion)', why: 'Hitta ovanliga mönster i transaktionsdata' },
    { problem: 'Generera produktbeskrivningar', approach: 'LLM', why: 'Kreativt skrivande med varumärkesröst' },
    { problem: 'Sortera e-post', approach: 'ML (klassificering)', why: 'Kategorisera i fördefinierade klasser' },
    { problem: 'Rekommendera produkter', approach: 'ML (collaborative filtering)', why: 'Mönster i användarbeteende' },
    { problem: 'Översätta dokument', approach: 'LLM', why: 'Kräver djup språkförståelse' },
  ],
  ko: [
    { problem: '고객 이탈 예측', approach: '클래식 ML', why: '명확한 예측 목표가 있는 정형 데이터' },
    { problem: '법률 계약서 요약', approach: 'LLM', why: '긴 텍스트의 읽기와 판단 필요' },
    { problem: '세금 계산', approach: '규칙 기반', why: '법으로 정의된 정확한 규칙' },
    { problem: 'X선 이미지 분류', approach: '딥러닝 (CNN)', why: '시각적 패턴 인식' },
    { problem: '고객 질문 답변', approach: 'LLM + RAG', why: '자연어 + 회사별 지식' },
    { problem: '사기 탐지', approach: 'ML (이상 탐지)', why: '거래 데이터에서 비정상 패턴 찾기' },
    { problem: '제품 설명 생성', approach: 'LLM', why: '브랜드 보이스로 창의적 작성' },
    { problem: '이메일 분류', approach: 'ML (분류)', why: '사전 정의된 클래스로 분류' },
    { problem: '제품 추천', approach: 'ML (협업 필터링)', why: '사용자 행동 패턴' },
    { problem: '문서 번역', approach: 'LLM', why: '깊은 언어 이해 필요' },
  ],
}

export const comparisonTranslations = {
  sv: [
    { dimension: 'Indata', ml: 'Strukturerade features (siffror i kolumner)', llm: 'Rå text (naturligt språk)' },
    { dimension: 'Träning', ml: 'Uppgiftsspecifik (en modell per uppgift)', llm: 'Generell (en modell, många uppgifter)' },
    { dimension: 'Datamängd', ml: '1K-1M märkta exempel', llm: 'Biljoner tokens oövervakad text' },
    { dimension: 'Utdata', ml: 'Siffra eller kategori', llm: 'Fri text, kod, resonemang' },
    { dimension: 'Generaliserbarhet', ml: 'Bara den tränade uppgiften', llm: 'Zero-shot till nya uppgifter' },
    { dimension: 'Tolkbarhet', ml: 'Ofta tolkbar (beslutsträd, SHAP)', llm: 'Svårtolkad (svart låda)' },
  ],
  ko: [
    { dimension: '입력', ml: '구조화된 피처 (열의 숫자)', llm: '원시 텍스트 (자연어)' },
    { dimension: '학습', ml: '작업별 (작업당 하나의 모델)', llm: '범용 (하나의 모델, 많은 작업)' },
    { dimension: '데이터 양', ml: '1K-1M 레이블된 예시', llm: '수조 토큰의 비지도 텍스트' },
    { dimension: '출력', ml: '숫자 또는 카테고리', llm: '자유 텍스트, 코드, 추론' },
    { dimension: '일반화', ml: '학습된 작업만', llm: '새 작업에 제로샷' },
    { dimension: '해석 가능성', ml: '종종 해석 가능 (결정 트리, SHAP)', llm: '해석 어려움 (블랙 박스)' },
  ],
}

export const overkillCasesTranslations = {
  sv: [
    { label: 'Tabelldata med tydligt mål', detail: 'Huspriser, kundavhopp, kreditrisk — gradient boosting slår LLM:er' },
    { label: 'Deterministisk logik', detail: 'Skatteberäkning, regelvalidering — traditionell kod är 100% korrekt' },
    { label: 'Realtidssignalbehandling', detail: 'Sensordata, anomalidetektion — specialiserade ML-modeller är snabbare' },
  ],
  ko: [
    { label: '명확한 목표가 있는 테이블 데이터', detail: '주택 가격, 고객 이탈, 신용 위험 — gradient boosting이 LLM을 이김' },
    { label: '결정론적 로직', detail: '세금 계산, 규칙 검증 — 전통적 코드가 100% 정확' },
    { label: '실시간 신호 처리', detail: '센서 데이터, 이상 탐지 — 전문 ML 모델이 더 빠름' },
  ],
}

export const mlBetterCasesTranslations = {
  sv: [
    { label: 'Strukturerad data', detail: 'Rader och kolumner med numeriska features' },
    { label: 'Latenskritiskt', detail: 'Behöver svar på <10ms (LLM:er tar 100ms+)' },
    { label: 'Tolkbarhet krävs', detail: 'Regulatoriska krav på att förklara beslut' },
  ],
  ko: [
    { label: '정형 데이터', detail: '수치 피처가 있는 행과 열' },
    { label: '지연시간 중요', detail: '<10ms 응답 필요 (LLM은 100ms+)' },
    { label: '해석 가능성 필요', detail: '결정을 설명해야 하는 규제 요구' },
  ],
}

export const toolboxTranslations = {
  sv: [
    { level: 'Klassisk ML', tools: ['scikit-learn', 'XGBoost', 'LightGBM', 'pandas'] },
    { level: 'Deep Learning', tools: ['PyTorch', 'TensorFlow', 'JAX', 'Keras'] },
    { level: 'LLM-träning', tools: ['HuggingFace Transformers', 'DeepSpeed', 'Megatron-LM'] },
    { level: 'LLM-inferens', tools: ['vLLM', 'llama.cpp', 'Ollama', 'Amazon Bedrock'] },
    { level: 'LLM-applikationer', tools: ['LangChain', 'LlamaIndex', 'Vercel AI SDK', 'Amazon Bedrock Agents'] },
  ],
  ko: [
    { level: '클래식 ML', tools: ['scikit-learn', 'XGBoost', 'LightGBM', 'pandas'] },
    { level: '딥러닝', tools: ['PyTorch', 'TensorFlow', 'JAX', 'Keras'] },
    { level: 'LLM 학습', tools: ['HuggingFace Transformers', 'DeepSpeed', 'Megatron-LM'] },
    { level: 'LLM 추론', tools: ['vLLM', 'llama.cpp', 'Ollama', 'Amazon Bedrock'] },
    { level: 'LLM 애플리케이션', tools: ['LangChain', 'LlamaIndex', 'Vercel AI SDK', 'Amazon Bedrock Agents'] },
  ],
}

// Decision Framework — tree node translations (keyed by node ID)
export const treeTranslations: Record<string, Record<string, { question?: string; answer?: string; explanation?: string; example?: string }>> = {
  sv: {
    start: { question: 'Är ditt problem väldefinierat med tydliga, deterministiska regler?' },
    'rule-based': { answer: 'Regelbaserat system', explanation: 'Om logiken helt kan fångas i formler, uppslagstabeller eller beslutsregler — behöver du inte ML alls. Traditionell programvara är billigare, snabbare och 100% förutsägbar.', example: 'Skatteberäkning, enhetskonvertering, fraktformler, formulärvalidering.' },
    structured: { question: 'Har du strukturerad/tabelldata?' },
    prediction: { question: 'Behöver du prediktion eller mönsterigenkänning?' },
    'classical-ml': { answer: 'Klassisk ML', explanation: 'Strukturerad data med rader och kolumner är den perfekta platsen för gradient boosting, random forests och logistisk regression. Dessa modeller är snabba, tolkbara och beprövade.', example: 'Bedrägeridetektering, kundavhoppsprediktion, kreditbedömning, efterfrågeprognos.' },
    'rule-based-2': { answer: 'Regelbaserat eller enkel analys', explanation: 'Om du har strukturerad data men bara behöver aggregering, filtrering eller rapportering — SQL och affärslogik är rätt verktyg.', example: 'Dashboardmätvärden, lagervarningar, tröskelbaserade notifieringar.' },
    media: { question: 'Involverar det bilder, ljud eller video?' },
    'deep-learning': { answer: 'Djupinlärning (CNN / talmodeller)', explanation: 'Ostrukturerad mediadata kräver neurala nätverk som lär sig hierarkiska features. CNN:er för bilder, specialiserade arkitekturer som Whisper för ljud.', example: 'Bildklassificering, objektdetektering, tal-till-text, videoanalys.' },
    text: { question: 'Involverar det att förstå eller generera naturligt språk?' },
    llm: { answer: 'LLM', explanation: 'Om uppgiften kräver att läsa, skriva, resonera om eller generera text — LLM:er är byggda för detta. Lägg till RAG för domänkunskap, finjustering för specialiserat beteende.', example: 'Sammanfattning, chattbotar, kodgenerering, dokument-Q&A, översättning.' },
    reassess: { answer: 'Omvärdera problemet', explanation: 'Om inget av ovanstående passar, bryt ner problemet i mindre delproblem. De flesta verkliga system kombinerar flera metoder.', example: 'E-handel: regler för prissättning + ML för rekommendationer + LLM för produktbeskrivningar.' },
  },
  ko: {
    start: { question: '문제가 명확하고 결정론적인 규칙으로 잘 정의되어 있나요?' },
    'rule-based': { answer: '규칙 기반 시스템', explanation: '로직이 공식, 조회 테이블 또는 결정 규칙으로 완전히 포착될 수 있다면 — ML이 전혀 필요 없습니다. 전통적 소프트웨어가 더 저렴하고, 빠르고, 100% 예측 가능합니다.', example: '세금 계산, 단위 변환, 배송비 공식, 양식 검증.' },
    structured: { question: '정형/테이블 데이터가 있나요?' },
    prediction: { question: '예측이나 패턴 인식이 필요한가요?' },
    'classical-ml': { answer: '클래식 ML', explanation: '행과 열이 있는 정형 데이터는 gradient boosting, random forest, 로지스틱 회귀의 최적 영역입니다.', example: '사기 탐지, 이탈 예측, 신용 평가, 수요 예측.' },
    'rule-based-2': { answer: '규칙 기반 또는 간단한 분석', explanation: '정형 데이터가 있지만 집계, 필터링 또는 보고만 필요하다면 — SQL과 비즈니스 로직이 올바른 도구입니다.', example: '대시보드 지표, 재고 알림, 임계값 기반 알림.' },
    media: { question: '이미지, 오디오 또는 비디오가 관련되나요?' },
    'deep-learning': { answer: '딥러닝 (CNN / 음성 모델)', explanation: '비정형 미디어 데이터는 계층적 특성을 학습하는 신경망이 필요합니다.', example: '이미지 분류, 객체 감지, 음성-텍스트 변환, 비디오 분석.' },
    text: { question: '자연어를 이해하거나 생성하는 것이 관련되나요?' },
    llm: { answer: 'LLM', explanation: '작업이 텍스트를 읽고, 쓰고, 추론하거나 생성해야 한다면 — LLM이 이를 위해 만들어졌습니다.', example: '요약, 챗봇, 코드 생성, 문서 Q&A, 번역.' },
    reassess: { answer: '문제 재평가', explanation: '위의 어느 것도 맞지 않으면 문제를 더 작은 하위 문제로 분해하세요. 대부분의 실제 시스템은 여러 접근 방식을 결합합니다.', example: '이커머스: 가격 책정용 규칙 + 추천용 ML + 제품 설명용 LLM.' },
  },
}
