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

export const scenariosTranslations = { sv: [], ko: [] }

export const comparisonTranslations = { sv: [], ko: [] }

export const overkillCasesTranslations = { sv: [], ko: [] }

export const mlBetterCasesTranslations = { sv: [], ko: [] }

export const toolboxTranslations = { sv: [], ko: [] }
