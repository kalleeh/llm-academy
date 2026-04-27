// industry module — data array translations

export const playersTranslations = {
  sv: [
    { name: 'OpenAI', approach: 'Stängd källkod, API-först, massiv skala', innovation: 'Pionjär inom RLHF i skala; o3 resonemang via RL-tränad chain-of-thought', detail: 'Värderat till $100B+. Definierade den moderna LLM-eran med ChatGPT.' },
    { name: 'Anthropic', approach: 'Säkerhetsfokuserat, Constitutional AI', innovation: 'Constitutional AI — självövervakad anpassning utan mänskliga etiketter', detail: 'Grundat av ex-OpenAI-forskare. Leder inom säkerhetsforskning.' },
    { name: 'Google DeepMind', approach: 'Vertikal integration — TPU:er, data, distribution', innovation: 'Anpassad TPU-hårdvara; 1M+ token kontextfönster; Gemma öppna modeller', detail: 'Sammanslagna Google Brain + DeepMind. Gemini nativt multimodal.' },
    { name: 'Meta', approach: 'Ledare inom öppen källkod, MoE-arkitektur', innovation: 'Största öppna modellerna; Llama 4 använder MoE', detail: 'Llama 4 Maverick (400B totalt, 17B aktiva) konkurrerar med GPT-4o.' },
    { name: 'DeepSeek', approach: 'Effektivitet-först, öppna vikter', innovation: 'MoE + Multi-head Latent Attention + FP8-träning — V3 tränad för ~$5.5M', detail: 'Kinesiskt labb som chockade branschen. V3 tränad till en bråkdel av typisk kostnad.' },
    { name: 'Mistral', approach: 'Europeiskt, öppna vikter, effektivitetsfokuserat', innovation: 'Sliding Window Attention; presterar över sin viktklass', detail: 'Paris-baserat. Stark EU-regulatorisk positionering.' },
    { name: 'Amazon / AWS', approach: 'Plattform + egna modeller — Bedrock hostar 100+ modeller', innovation: 'Bedrock modellmarknadsplats; AgentCore för företagsagenter; Nova-familjen', detail: 'AWS byggde plattformlagret: Amazon Bedrock ger ett enda API till Claude, Llama, Mistral och Amazons egna Nova-modeller.' },
    { name: 'xAI', approach: 'Realtidsdata via X/Twitter, massiv beräkning', innovation: 'Tränad på 100K H100 Colossus-kluster; realtidsinformationsåtkomst', detail: 'Elon Musks AI-företag. Grok 3 tränad på ett av de största GPU-klustren.' },
    { name: 'Apple', approach: 'På enheten, integritetsfokuserat', innovation: 'Modeller på enheten som körs på Apple Silicon; Private Cloud Compute', detail: 'Apple Foundation Models körs lokalt på iPhone/Mac.' },
  ],
  ko: [
    { name: 'OpenAI', approach: '클로즈드 소스, API 우선, 대규모', innovation: '대규모 RLHF 선구자; RL 학습 chain-of-thought를 통한 o3 추론', detail: '$1000억+ 가치. ChatGPT로 현대 LLM 시대를 정의.' },
    { name: 'Anthropic', approach: '안전 중심, Constitutional AI', innovation: 'Constitutional AI — 인간 라벨 없는 자기 감독 정렬', detail: '전 OpenAI 연구원이 설립. 안전 연구를 선도.' },
    { name: 'Google DeepMind', approach: '수직 통합 — TPU, 데이터, 배포', innovation: '맞춤 TPU 하드웨어; 100만+ 토큰 컨텍스트 윈도우; Gemma 오픈 모델', detail: 'Google Brain + DeepMind 합병. Gemini는 네이티브 멀티모달.' },
    { name: 'Meta', approach: '오픈소스 리더, MoE 아키텍처', innovation: '최대 오픈 가중치 모델; Llama 4는 MoE 사용', detail: 'Llama 4 Maverick (총 400B, 활성 17B)이 GPT-4o와 경쟁.' },
    { name: 'DeepSeek', approach: '효율성 우선, 오픈 가중치', innovation: 'MoE + Multi-head Latent Attention + FP8 학습 — V3 ~$550만으로 학습', detail: '업계를 충격에 빠뜨린 중국 연구소. V3는 일반적 비용의 일부로 학습.' },
    { name: 'Mistral', approach: '유럽, 오픈 가중치, 효율성 중심', innovation: 'Sliding Window Attention; 체급 이상의 성능', detail: '파리 기반. 강력한 EU 규제 포지셔닝.' },
    { name: 'Amazon / AWS', approach: '플랫폼 + 자체 모델 — Bedrock이 100+ 모델 호스팅', innovation: 'Bedrock 모델 마켓플레이스; 엔터프라이즈 에이전트용 AgentCore; Nova 패밀리', detail: 'AWS가 플랫폼 레이어를 구축: Amazon Bedrock이 Claude, Llama, Mistral, Amazon Nova 모델에 단일 API 제공.' },
    { name: 'xAI', approach: 'X/Twitter를 통한 실시간 데이터, 대규모 컴퓨팅', innovation: '100K H100 Colossus 클러스터에서 학습; 실시간 정보 접근', detail: 'Elon Musk의 AI 회사. Grok 3는 역대 최대 GPU 클러스터 중 하나에서 학습.' },
    { name: 'Apple', approach: '온디바이스, 프라이버시 우선', innovation: 'Apple Silicon에서 실행되는 온디바이스 모델; Private Cloud Compute', detail: 'Apple Foundation Models가 iPhone/Mac에서 로컬 실행.' },
  ],
}

export const comparisonTranslations = {
  sv: [
    { dimension: 'Kapacitet', open: 'Llama 4, DeepSeek V3 matchar GPT-4o på de flesta benchmarks', closed: 'GPT-5, Claude Opus 4.6 leder fortfarande på de svåraste uppgifterna' },
    { dimension: 'Kostnad', open: 'Gratis vikter; betala bara för beräkning', closed: 'Per-token-prissättning; kan vara billigare vid låg volym' },
    { dimension: 'Integritet', open: 'Full kontroll över data — men säkerhet är ditt ansvar', closed: 'Data behandlas av leverantör — företagsnivåer erbjuder stark efterlevnad' },
    { dimension: 'Anpassning', open: 'Full åtkomst — finjustera, kvantisera, slå samman, destillera', closed: 'Begränsat till API-parametrar och systemprompts' },
    { dimension: 'Hastighet', open: 'Beror på din hårdvara och optimering', closed: 'Optimerad infrastruktur, konsekvent latens' },
    { dimension: 'Ekosystem', open: 'HuggingFace, vLLM, Unsloth, GGUF — massivt community', closed: 'Leverantörsspecifika SDK:er och verktyg' },
    { dimension: 'Säkerhet', open: 'Community-granskad; du ansvarar för skyddsräcken', closed: 'Leverantörshanterade skyddsräcken och innehållsfilter' },
    { dimension: 'Licens', open: 'Varierar: Apache 2.0, Llama Community, etc.', closed: 'Proprietär; användningsvillkor kan ändras' },
  ],
  ko: [
    { dimension: '능력', open: 'Llama 4, DeepSeek V3가 대부분의 벤치마크에서 GPT-4o와 일치', closed: 'GPT-5, Claude Opus 4.6이 가장 어려운 작업에서 여전히 선두' },
    { dimension: '비용', open: '무료 가중치; 컴퓨팅만 지불', closed: '토큰당 가격; 저볼륨에서 더 저렴할 수 있음' },
    { dimension: '프라이버시', open: '데이터에 대한 완전한 통제 — 하지만 보안은 본인 책임', closed: '제공업체가 데이터 처리 — 엔터프라이즈 티어가 강력한 컴플라이언스 제공' },
    { dimension: '커스터마이징', open: '완전한 접근 — 파인튜닝, 양자화, 병합, 증류', closed: 'API 파라미터와 시스템 프롬프트로 제한' },
    { dimension: '속도', open: '하드웨어와 최적화에 따라 다름', closed: '최적화된 인프라, 일관된 지연시간' },
    { dimension: '생태계', open: 'HuggingFace, vLLM, Unsloth, GGUF — 대규모 커뮤니티', closed: '벤더별 SDK와 도구' },
    { dimension: '안전', open: '커뮤니티 감사; 가드레일은 본인 책임', closed: '벤더 관리 가드레일과 콘텐츠 필터' },
    { dimension: '라이선스', open: '다양: Apache 2.0, Llama Community 등', closed: '독점; 이용 약관이 변경될 수 있음' },
  ],
}

export const openModelsTranslations = {
  sv: [
    { name: 'Llama 4 Maverick', note: '400B totalt, 17B aktiva via 128 experter' },
    { name: 'DeepSeek V3', note: '671B totalt, 37B aktiva. Tränad för ~.5M' },
    { name: 'Mistral Large 2', note: 'Europeiskt, stark flerspråkig prestanda' },
    { name: 'Qwen 2.5', note: 'Alibabas flaggskepp, stark på kinesiska + engelska' },
    { name: 'Gemma 3', note: 'Googles öppna modell, optimerad för effektivitet' },
  ],
  ko: [
    { name: 'Llama 4 Maverick', note: '총 400B, 128 전문가를 통해 17B 활성' },
    { name: 'DeepSeek V3', note: '총 671B, 37B 활성. ~50만으로 학습' },
    { name: 'Mistral Large 2', note: '유럽, 강력한 다국어 성능' },
    { name: 'Qwen 2.5', note: 'Alibaba 플래그십, 중국어 + 영어에 강함' },
    { name: 'Gemma 3', note: 'Google의 오픈 모델, 효율성 최적화' },
  ],
}

export const layersTranslations = {
  sv: [
    { name: 'Grundmodeller', note: 'Kärnan — de stora förtränade modellerna' },
    { name: 'Finjustering & Anpassning', note: 'Anpassa modeller till specifika uppgifter' },
    { name: 'Inferens & Serving', note: 'Kör modeller i produktion' },
    { name: 'Orkestrering & Agenter', note: 'Bygg applikationer ovanpå modeller' },
    { name: 'Applikationer', note: 'Slutanvändarprodukter' },
  ],
  ko: [
    { name: '기초 모델', note: '핵심 — 대규모 사전 학습 모델' },
    { name: '파인튜닝 & 적응', note: '특정 작업에 모델 맞춤화' },
    { name: '추론 & 서빙', note: '프로덕션에서 모델 실행' },
    { name: '오케스트레이션 & 에이전트', note: '모델 위에 애플리케이션 구축' },
    { name: '애플리케이션', note: '최종 사용자 제품' },
  ],
}

export const trendsTranslations = {
  sv: [
    { title: 'Resonemangsmodeller', tagline: 'Modeller som tänker innan de svarar', detail: 'o3, DeepSeek-R1 och liknande modeller använder RL för att lära sig chain-of-thought-resonemang.', examples: ['o3 (OpenAI), DeepSeek-R1, Gemini 2 Flash Thinking'] },
    { title: 'Multimodala modeller', tagline: 'Text, bild, ljud, video i en modell', detail: 'Modeller som nativt förstår och genererar flera modaliteter.', examples: ['GPT-4o, Gemini, Claude (vision), Amazon Nova'] },
    { title: 'Öppen konvergens', tagline: 'Öppna modeller närmar sig stängda', detail: 'Gapet minskar snabbt tack vare MoE, distillation och community-innovation.', examples: ['Llama 4, DeepSeek V3, Mistral Large 2'] },
    { title: 'Agentiska system', tagline: 'Från text till handling', detail: 'LLM:er som kan planera, använda verktyg och utföra flerstegsuppgifter autonomt.', examples: ['Amazon Bedrock AgentCore, OpenAI Assistants, LangGraph'] },
    { title: 'Effektivitet', tagline: 'Mer med mindre', detail: 'Kvantisering, MoE, distillation och bättre data gör modeller billigare att köra.', examples: ['GGUF, AWQ, Llama 4 Scout (17B aktiva av 109B)'] },
    { title: 'Reglering', tagline: 'EU AI Act och globala ramverk', detail: 'Regulatoriska krav formar hur modeller utvecklas och driftsätts.', examples: ['EU AI Act (2025-2027), Bidens Executive Order, Kinas AI-regler'] },
  ],
  ko: [
    { title: '추론 모델', tagline: '답하기 전에 생각하는 모델', detail: 'o3, DeepSeek-R1 등이 RL을 사용하여 chain-of-thought 추론을 학습.', examples: ['o3 (OpenAI), DeepSeek-R1, Gemini 2 Flash Thinking'] },
    { title: '멀티모달 모델', tagline: '텍스트, 이미지, 오디오, 비디오를 하나의 모델에서', detail: '여러 모달리티를 네이티브로 이해하고 생성하는 모델.', examples: ['GPT-4o, Gemini, Claude (비전), Amazon Nova'] },
    { title: '오픈 수렴', tagline: '오픈 모델이 클로즈드에 근접', detail: 'MoE, 증류, 커뮤니티 혁신 덕분에 격차가 빠르게 줄어듦.', examples: ['Llama 4, DeepSeek V3, Mistral Large 2'] },
    { title: '에이전틱 시스템', tagline: '텍스트에서 행동으로', detail: '계획하고, 도구를 사용하고, 다단계 작업을 자율적으로 수행하는 LLM.', examples: ['Amazon Bedrock AgentCore, OpenAI Assistants, LangGraph'] },
    { title: '효율성', tagline: '더 적은 것으로 더 많이', detail: '양자화, MoE, 증류, 더 나은 데이터가 모델 실행 비용을 줄임.', examples: ['GGUF, AWQ, Llama 4 Scout (109B 중 17B 활성)'] },
    { title: '규제', tagline: 'EU AI Act와 글로벌 프레임워크', detail: '규제 요구사항이 모델 개발과 배포 방식을 형성.', examples: ['EU AI Act (2025-2027), Biden Executive Order, 중국 AI 규칙'] },
  ],
}
