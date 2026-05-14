/**
 * Korean translations.
 *
 * Structure mirrors `en.ts`. Any field omitted (or set to empty string)
 * falls back to the EN value at runtime. Machine-translated entries are
 * marked with `// MT` comments above them; entries without that marker
 * were preserved verbatim from the legacy translation files (human-quality).
 *
 * Tone: 합니다체 (formal-polite). Maintainers: see
 * docs/i18n-refactor/PLAN.md § "Translation policy".
 */
import type { DeepPartial } from './types'
import type { Translation } from './en'

export const ko: DeepPartial<Translation> = {
  modules: {
    aiproblem: {
      // From legacy: src/modules/aiproblem/translations.ts → landscapeKo
      landscape: {
        title: '1. AI 가계도',
        intro:
          '"AI"는 큰 우산입니다. 그 아래 있는 모든 것이 같지는 않습니다. 이렇게 생각하세요: 모든 LLM은 AI이지만, 모든 AI가 LLM은 아닙니다 — 모든 골든 리트리버가 개이지만, 모든 개가 골든 리트리버는 아닌 것처럼요. 각 레이어를 클릭해서 자세히 알아보세요.',
        levels: [
          {
            label: '인공지능',
            plain: '모든 스마트 자동화',
            analogy:
              '얼굴 인식, 음성 이해, 의사결정 등 이전에는 인간만 할 수 있다고 생각했던 일을 하는 소프트웨어를 통칭하는 용어입니다.',
            examples: [
              '이메일의 스팸 필터',
              '타이핑할 때 자동 완성',
              '신용카드 사기 탐지',
            ],
          },
          {
            label: '머신러닝',
            plain: '예시로부터 학습',
            analogy:
              '모든 규칙을 직접 프로그래밍하는 대신, 시스템에 수천 개의 예시를 보여주면 패턴을 스스로 파악합니다 — 500페이지 매뉴얼을 읽는 대신 과거 사례를 공부하며 신입사원을 교육하는 것과 같습니다.',
            examples: [
              '넷플릭스 추천',
              '이메일을 기본/소셜/프로모션으로 분류',
              '어떤 고객이 해지할지 예측',
            ],
          },
          {
            label: '딥러닝',
            plain: '강력한 패턴 인식',
            analogy:
              '사진, 오디오, 텍스트 같은 복잡한 데이터를 처리할 수 있는 더 강력한 머신러닝 — 인간에게는 쉽지만 기존 소프트웨어로는 불가능했던 것들입니다.',
            examples: [
              '휴대폰 잠금 해제를 위한 얼굴 인식',
              '음성 비서가 말을 이해하는 것',
              '실시간 언어 번역',
            ],
          },
          {
            label: '대규모 언어 모델',
            plain: '언어를 이해하고 생성하는 AI',
            analogy:
              'ChatGPT, Copilot, Gemini 뒤에 있는 AI입니다. 수십억 개의 웹 페이지를 읽으며 학습하여 글쓰기, 추론, 요약, 번역, 대화를 배웠습니다 — 거의 모든 주제를 논의할 수 있는 엄청나게 박식한 동료와 같습니다.',
            examples: [
              'ChatGPT, Claude, Gemini, Copilot',
              '이메일 작성, 문서 요약',
              '회사 데이터에 대한 질문 답변',
            ],
          },
        ],
        examplesLabel: '이미 사용하고 있는 예시:',
      },
      // From legacy: src/modules/aiproblem/translations.ts → decisionKo
      decision: {
        title: '2. 이 작업에 AI를 사용해야 할까요?',
        intro:
          '모든 문제에 AI가 필요한 것은 아닙니다. 때로는 스프레드시트, 체크리스트, 또는 간단한 규칙이 더 낫습니다. 핵심 질문은: 명확한 규칙이 있는가, 아니면 판단이 필요한가?',
        introSub:
          '이렇게 생각하세요: 완전한 지침을 한 페이지에 쓸 수 있다면 AI가 필요 없을 것입니다. 잘하려면 수년간의 경험이 필요하다면 AI가 도움이 될 수 있습니다.',
        scenarios: [
          {
            task: '고정 공식에 따라 직원 보너스 계산',
            answer: 'AI 불필요',
            why: '규칙이 고정되고 정확합니다 — 레시피를 단계별로 따르는 것과 같습니다. 스프레드시트 수식이 완벽하게 처리합니다.',
          },
          {
            task: '다음 분기에 해지할 가능성이 있는 고객 예측',
            answer: '머신러닝',
            why: '과거 데이터와 찾아야 할 패턴이 있습니다. ML은 예시에서 패턴을 학습합니다 — 데이터에 기반한 위험 계정 직감을 개발하는 영업 담당자와 같습니다.',
          },
          {
            task: '회사 정책에 대한 직원 질문 답변',
            answer: 'LLM + 회사 문서',
            why: '직원들은 자연어로 질문합니다. LLM은 질문을 이해하고, 정책 문서를 검색하고, 명확한 답변을 제공할 수 있습니다 — 항상 이용 가능한 HR 비서와 같습니다.',
          },
          {
            task: '50페이지 계약서를 요약하고 주요 위험 표시',
            answer: 'LLM',
            why: '읽기, 맥락 이해, 중요한 것에 대한 판단이 필요합니다 — 정확히 LLM이 잘하는 것입니다. 30초 만에 주니어 변호사의 첫 번째 검토와 같습니다.',
          },
        ],
        bestFitLabel: '최적 도구:',
        selfExplainPrompt:
          '직장에서 시간이 많이 걸리는 작업을 생각해 보세요. AI가 도움이 될까요? 규칙 기반(스프레드시트), 패턴 기반(ML), 언어 기반(LLM) 중 어디에 해당하나요?',
        selfExplainAnswer:
          "예시: '매주 월요일 지원 티켓을 우선순위별로 분류하는 데 2시간을 씁니다.' 이것은 패턴 기반입니다 — 과거 데이터가 있고, 작업은 텍스트를 읽고 판단하는 것이 필요합니다. LLM이 과거 패턴에 기반하여 분류할 수 있습니다.",
      },
      // From legacy: src/modules/aiproblem/tech-translations.ts → landscapeSectionKo
      landscapeSection: {
        title: '1. 전체 그림',
        intro:
          'AI는 넓은 분야입니다. 머신러닝은 부분집합이고, 딥러닝은 그것의 부분집합이며, LLM은 딥러닝의 특정 유형입니다.',
        // From legacy: src/modules/aiproblem/data-translations.ts → levelsTranslations.ko
        levels: [
          { label: '인공지능', definition: '추론, 계획, 인식, 의사결정 등 일반적으로 인간 지능이 필요한 작업을 수행하는 시스템.', examples: ['규칙 기반 시스템 (세금 계산을 위한 if/else 로직)', '전문가 시스템 (증상 규칙에서 의료 진단)', '검색 알고리즘 (체스/경로 탐색을 위한 A*, minimax)', '로봇 프로세스 자동화 (양식 작성을 위한 RPA)'] },
          { label: '머신러닝', definition: '명시적으로 프로그래밍되는 대신 데이터에서 패턴을 학습하는 시스템. 더 많은 데이터로 개선됩니다.', examples: ['회귀 (특성에서 주택 가격 예측)', '분류 (스팸 vs 비스팸)', '클러스터링 (고객 세분화)', '추천 엔진 (Netflix, Spotify)'] },
          { label: '딥러닝', definition: '많은 레이어의 신경망을 사용하는 ML. 이미지, 오디오, 텍스트 같은 원시 비정형 데이터에서 학습하는 데 뛰어납니다.', examples: ['CNN — 이미지 분류, 객체 감지', 'RNN/LSTM — 시계열, 시퀀스 모델링', '트랜스포머 — 현대 LLM의 아키텍처', 'GAN — 이미지 생성, 스타일 전환'] },
          { label: '대규모 언어 모델', definition: '인터넷 규모의 텍스트로 학습된 대규모 트랜스포머 모델. 다음 토큰을 예측하고 추론, 코딩, 대화 능력이 나타납니다.', examples: ['GPT-4, Claude, Gemini — 범용 추론', 'Llama, Mistral — 오픈 모델', '텍스트 생성, 요약, 번역', '코드 생성, 분석, 디버깅'] },
        ],
        // From legacy: overlaysTranslations.ko
        overlays: [
          { label: '생성형 AI', description: '새로운 콘텐츠(텍스트, 이미지, 오디오, 코드)를 만드는 모델. 딥러닝과 LLM에 걸쳐 있습니다.' },
          { label: '에이전틱 AI', description: '도구, 메모리, 계획으로 강화된 LLM — 텍스트를 생성하는 것이 아니라 행동을 취합니다.' },
        ],
      },
      // From legacy: src/modules/aiproblem/tech-translations.ts → classificationSectionKo
      classificationSection: {
        title: '2. 문제 분류',
        // MT
        p2: '모든 문제에 LLM이 필요한 것은 아닙니다. 각 카드를 클릭하여 최적의 접근 방식을 확인하세요 — 그리고 더 중요하게는,',
        // From legacy: scenariosTranslations.ko
        scenarios: [
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
      },
      // From legacy: src/modules/aiproblem/tech-translations.ts → decisionFrameworkSectionKo
      decisionFrameworkSection: {
        title: '3. 의사결정 프레임워크',
        intro: '이 의사결정 트리를 통해 문제에 맞는 접근 방식을 찾으세요.',
        // From legacy: treeTranslations.ko
        tree: {
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
      },
      // From legacy: src/modules/aiproblem/tech-translations.ts → lLMDifferenceSectionKo
      llmDifferenceSection: {
        title: '4. LLM이 다른 점',
        intro: 'LLM은 단순히 더 큰 ML 모델이 아닙니다. 근본적으로 다른 패러다임을 나타냅니다.',
        // MT
        sameProblemHeading: '같은 문제, 두 가지 접근: 감성 분석',
        // From legacy: comparisonTranslations.ko
        comparison: [
          { dimension: '입력', ml: '구조화된 피처 (열의 숫자)', llm: '원시 텍스트 (자연어)' },
          { dimension: '학습', ml: '작업별 (작업당 하나의 모델)', llm: '범용 (하나의 모델, 많은 작업)' },
          { dimension: '데이터 양', ml: '1K-1M 레이블된 예시', llm: '수조 토큰의 비지도 텍스트' },
          { dimension: '출력', ml: '숫자 또는 카테고리', llm: '자유 텍스트, 코드, 추론' },
          { dimension: '일반화', ml: '학습된 작업만', llm: '새 작업에 제로샷' },
          { dimension: '해석 가능성', ml: '종종 해석 가능 (결정 트리, SHAP)', llm: '해석 어려움 (블랙 박스)' },
        ],
        // From legacy: overkillCasesTranslations.ko
        overkillCases: [
          { label: '명확한 목표가 있는 테이블 데이터', detail: '주택 가격, 고객 이탈, 신용 위험 — gradient boosting이 LLM을 이김' },
          { label: '결정론적 로직', detail: '세금 계산, 규칙 검증 — 전통적 코드가 100% 정확' },
          { label: '실시간 신호 처리', detail: '센서 데이터, 이상 탐지 — 전문 ML 모델이 더 빠름' },
        ],
        // From legacy: mlBetterCasesTranslations.ko
        mlBetterCases: [
          { label: '정형 데이터', detail: '수치 피처가 있는 행과 열' },
          { label: '지연시간 중요', detail: '<10ms 응답 필요 (LLM은 100ms+)' },
          { label: '해석 가능성 필요', detail: '결정을 설명해야 하는 규제 요구' },
        ],
      },
      // From legacy: src/modules/aiproblem/tech-translations.ts → toolboxSectionKo
      toolboxSection: {
        title: '5. AI/ML/LLM 도구 상자',
        intro: 'AI 환경의 각 수준에는 자체 도구와 프레임워크 생태계가 있습니다.',
        // MT
        upNextNote:
          '나머지 과정에서는 LLM 트랙을 깊이 다룹니다 — 내부 작동 방식, 효과적으로 사용하는 방법, 실제 애플리케이션 구축 방법.',
        // From legacy: toolboxTranslations.ko
        toolbox: [
          { level: '클래식 ML', tools: ['scikit-learn', 'XGBoost', 'LightGBM', 'pandas'] },
          { level: '딥러닝', tools: ['PyTorch', 'TensorFlow', 'JAX', 'Keras'] },
          { level: 'LLM 학습', tools: ['HuggingFace Transformers', 'DeepSpeed', 'Megatron-LM'] },
          { level: 'LLM 추론', tools: ['vLLM', 'llama.cpp', 'Ollama', 'Amazon Bedrock'] },
          { level: 'LLM 애플리케이션', tools: ['LangChain', 'LlamaIndex', 'Vercel AI SDK', 'Amazon Bedrock Agents'] },
        ],
      },
    },
    industry: {
      // From legacy: src/modules/industry/translations.ts → keyPlayersKo
      keyPlayers: {
        title: '1. 누가 AI를 만드나요?',
        intro:
          '소수의 회사가 AI 환경을 지배합니다. 스마트폰 시장처럼 생각하세요 — 몇몇 큰 플레이어가 각자 다른 전략을 가지고 있습니다. 각각을 클릭해서 자세히 알아보세요.',
        players: [
          { name: 'OpenAI', product: 'ChatGPT, GPT-4o', position: '모두가 아는 회사 — AI의 아이폰과 같습니다. 시장 선점, 가장 큰 브랜드 인지도.', users: '수백만 소비자와 기업. Microsoft가 가장 큰 파트너 (Copilot이 OpenAI로 구동).' },
          { name: 'Google', product: 'Gemini', position: '모든 Google 제품에 내장 — 검색, Gmail, Docs, Android. 대규모 배포 이점.', users: 'Google 제품 사용자. Google Cloud의 기업 고객.' },
          { name: 'Anthropic', product: 'Claude', position: '"안전 우선" 회사. 신뢰성을 중시하는 기업에서 인기.', users: '기업, 개발자, Amazon (AWS를 통한 주요 투자자 및 파트너).' },
          { name: 'Amazon / AWS', product: 'Bedrock, Nova, AgentCore', position: '하나의 모델을 만드는 대신 AWS는 플랫폼을 구축했습니다 — Amazon Bedrock은 엔터프라이즈 보안과 함께 단일 API로 100개 이상의 모델에 접근할 수 있게 합니다.', users: '이미 AWS를 사용하는 기업. 단일 AI 제공업체에 종속되지 않고 모델 선택을 원하는 회사.' },
          { name: 'Meta', product: 'Llama (무료)', position: 'AI를 무료로 제공합니다. 전략: 생태계 구축, Android vs iPhone처럼.', users: '자체 서버에서 AI를 실행하려는 개발자와 회사.' },
          { name: '기타', product: 'Mistral, DeepSeek, Cohere 등', position: '특정 강점을 가진 소규모 플레이어 — 일부는 더 저렴하고, 일부는 특정 언어나 작업에 더 뛰어남.', users: '대안이나 전문 기능을 찾는 회사.' },
        ],
      },
      // From legacy: src/modules/industry/translations.ts → openVsClosedKo
      openVsClosed: {
        title: '2. 오픈 vs 클로즈드 AI — 비즈니스에 미치는 의미',
        intro:
          '일부 AI 모델은 **"클로즈드"**(사용료를 내고, 회사가 모든 것을 통제)이고 일부는 **"오픈"**(무료로 다운로드하여 직접 실행)입니다. **Microsoft Office vs LibreOffice**, 또는 **iPhone vs Android**처럼 생각하세요.',
        closedTitle: '클로즈드 모델 (GPT-4o, Claude, Gemini)',
        closedSubtitle: 'Microsoft Office 365를 사용하는 것과 같음',
        openTitle: '오픈 모델 (Llama, Mistral, DeepSeek)',
        openSubtitle: 'Android나 LibreOffice를 사용하는 것과 같음',
        realPictureTitle: '실제 상황: 흑백이 아닙니다',
        realPictureText:
          '"오픈 = 프라이버시, 클로즈드 = 위험"이라는 프레이밍은 구식입니다. 엔터프라이즈 클라우드 AI 서비스(Azure OpenAI, AWS Bedrock, Google Vertex)는 대부분의 회사가 자체적으로 복제할 수 없는 보안 인증과 컴플라이언스 보장을 제공합니다. 셀프 호스팅은 통제권을 주지만, **통제 ≠ 보안** — 실제로 보안을 유지할 팀과 전문성이 필요합니다.',
        selfExplainPrompt:
          'CTO가 "벤더 종속을 피하기 위해 오픈소스 AI를 사용해야 한다"고 말합니다. 결정 전에 논의하고 싶은 트레이드오프는 무엇인가요?',
        selfExplainAnswer:
          '다음을 제기하겠습니다: (1) 벤더 종속은 피하지만 유지보수 책임을 지게 됩니다 — 기술 인력이 있나요? (2) 데이터 프라이버시가 더 좋습니다. (3) 오픈 모델은 복잡한 작업에서 약간 덜 능력이 있습니다 — 테스트해야 합니다. (4) 설정에 몇 주 vs 몇 시간. (5) 하이브리드 접근이 가능합니다. (6) 총 비용: GPU 호스팅은 무료가 아닙니다.',
      },
      // From legacy: src/modules/industry/tech-translations.ts → whoBuiltWhatSectionKo
      whoBuiltWhatSection: {
        title: '1. 누가 무엇을 만들었나',
        intro: 'LLM 환경은 각기 다른 철학을 가진 소수의 자금이 풍부한 연구소가 지배합니다.',
        // From legacy: playersTranslations.ko
        players: [
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
      },
      // From legacy: src/modules/industry/tech-translations.ts → openVsClosedSectionKo
      openVsClosedSection: {
        title: '2. 오픈 vs 클로즈드',
        intro: '오픈 가중치와 클로즈드 소스 모델 간의 격차가 크게 줄었습니다.',
        // MT
        trendCallout:
          '오픈 모델이 이제 대부분의 표준 벤치마크에서 클로즈드 모델과 일치하거나 능가합니다. 남은 격차는 에이전틱 능력, 긴 컨텍스트 신뢰성, 안전 도구에 있으며 — 빠르게 좁혀지고 있습니다.',
        // MT
        openModelsHeading: '프론티어 클로즈드 모델과 경쟁하는 오픈 모델 (2026년 중반 기준):',
        // From legacy: comparisonTranslations.ko
        comparison: [
          { dimension: '능력', open: 'Llama 4, DeepSeek V3가 대부분의 벤치마크에서 GPT-4o와 일치', closed: 'GPT-5.5, Claude Opus 4.7이 가장 어려운 작업에서 여전히 선두' },
          { dimension: '비용', open: '무료 가중치; 컴퓨팅만 지불', closed: '토큰당 가격; 저볼륨에서 더 저렴할 수 있음' },
          { dimension: '프라이버시', open: '데이터에 대한 완전한 통제 — 하지만 보안은 본인 책임', closed: '제공업체가 데이터 처리 — 엔터프라이즈 티어가 강력한 컴플라이언스 제공' },
          { dimension: '커스터마이징', open: '완전한 접근 — 파인튜닝, 양자화, 병합, 증류', closed: 'API 파라미터와 시스템 프롬프트로 제한' },
          { dimension: '속도', open: '하드웨어와 최적화에 따라 다름', closed: '최적화된 인프라, 일관된 지연시간' },
          { dimension: '생태계', open: 'HuggingFace, vLLM, Unsloth, GGUF — 대규모 커뮤니티', closed: '벤더별 SDK와 도구' },
          { dimension: '안전', open: '커뮤니티 감사; 가드레일은 본인 책임', closed: '벤더 관리 가드레일과 콘텐츠 필터' },
          { dimension: '라이선스', open: '다양: Apache 2.0, Llama Community 등', closed: '독점; 이용 약관이 변경될 수 있음' },
        ],
        // From legacy: openModelsTranslations.ko
        openModels: [
          { name: 'Llama 4 Maverick', note: '총 400B, 128 전문가를 통해 17B 활성' },
          { name: 'DeepSeek V3', note: '총 671B, 37B 활성. ~50만으로 학습' },
          { name: 'Mistral Large 2', note: '유럽, 강력한 다국어 성능' },
          { name: 'Qwen 2.5', note: 'Alibaba 플래그십, 중국어 + 영어에 강함' },
          { name: 'Gemma 3', note: 'Google의 오픈 모델, 효율성 최적화' },
        ],
      },
      // From legacy: src/modules/industry/tech-translations.ts → ecosystemSectionKo
      ecosystemSection: {
        title: '3. 생태계',
        intro: 'LLM은 고립되어 존재하지 않습니다. 전체 스택이 기초 모델을 최종 사용자에게 연결합니다.',
        // MT
        keyInsight:
          '처음부터 구축하는 경우는 드뭅니다. 대부분의 팀은 기초 모델을 선택하고, 선택적으로 파인튜닝하고, 기존 프레임워크로 서빙하고, 오케스트레이션 레이어로 앱에 연결합니다. 생태계가 단일 가중치를 학습하지 않고도 이를 가능하게 합니다.',
        // From legacy: layersTranslations.ko (only `name` was translated)
        layers: [
          { name: '기초 모델' },
          { name: '파인튜닝 & 적응' },
          { name: '추론 & 서빙' },
          { name: '오케스트레이션 & 에이전트' },
          { name: '애플리케이션' },
        ],
      },
      // From legacy: src/modules/industry/tech-translations.ts → whereItsHeadingSectionKo
      whereItsHeadingSection: {
        title: '4. 앞으로의 방향',
        intro: '2026년 이후 LLM 환경을 형성하는 여섯 가지 트렌드.',
        // From legacy: trendsTranslations.ko
        trends: [
          { title: '추론 모델', tagline: '답하기 전에 생각하는 모델', detail: 'o3, DeepSeek-R1 등이 RL을 사용하여 chain-of-thought 추론을 학습.', examples: ['o3 (OpenAI), DeepSeek-R1, Gemini 2 Flash Thinking'] },
          { title: '멀티모달 모델', tagline: '텍스트, 이미지, 오디오, 비디오를 하나의 모델에서', detail: '여러 모달리티를 네이티브로 이해하고 생성하는 모델.', examples: ['GPT-4o, Gemini, Claude (비전), Amazon Nova'] },
          { title: '오픈 수렴', tagline: '오픈 모델이 클로즈드에 근접', detail: 'MoE, 증류, 커뮤니티 혁신 덕분에 격차가 빠르게 줄어듦.', examples: ['Llama 4, DeepSeek V3, Mistral Large 2'] },
          { title: '에이전틱 시스템', tagline: '텍스트에서 행동으로', detail: '계획하고, 도구를 사용하고, 다단계 작업을 자율적으로 수행하는 LLM.', examples: ['Amazon Bedrock AgentCore, OpenAI Assistants, LangGraph'] },
          { title: '효율성', tagline: '더 적은 것으로 더 많이', detail: '양자화, MoE, 증류, 더 나은 데이터가 모델 실행 비용을 줄임.', examples: ['GGUF, AWQ, Llama 4 Scout (109B 중 17B 활성)'] },
          { title: '규제', tagline: 'EU AI Act와 글로벌 프레임워크', detail: '규제 요구사항이 모델 개발과 배포 방식을 형성.', examples: ['EU AI Act (2025-2027), Biden Executive Order, 중국 AI 규칙'] },
        ],
      },
    },
  },
}
