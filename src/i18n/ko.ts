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
      bridgeToTools: '누가 모델을 만드는지 알았습니다. 반대편 질문: 이 제품들 중 무엇을 매일 사용해야 할까요?',
      bridgeToToolsBusiness: '주요 기업들을 알았습니다. 이제 그들의 도구 중 무엇이 우리 팀에 맞는지 — 그리고 고르는 법을 보세요.',
    },
    evaluation: {
      // From legacy: src/modules/evaluation/translations.ts → measuringKo
      measuring: {
        title: '1. AI가 잘 작동하는지 어떻게 알 수 있나요',
        intro: '**"꽤 괜찮아 보인다"는 충분하지 않습니다.** 신입사원을 느낌으로 평가하지 않듯이 — 명확한 기대치를 설정하고 결과를 측정해야 합니다. AI에도 같은 엄격함이 필요합니다.',
        introSub: '제품 출시 전 품질 보증처럼 생각하세요 — 체계적으로 테스트하세요.',
        goodAnswerLabel: '좋은 답변',
        badAnswerLabel: '나쁜 답변',
      },
      // From legacy: src/modules/evaluation/translations.ts → choosingKo
      choosing: {
        title: '2. 올바른 AI 모델 선택하기',
        intro: 'AI 모델을 선택하는 것은 **특정 역할에 채용하는 것**과 같습니다 — "최고의" 후보는 이력서가 아니라 여러분의 필요에 따라 달라집니다.',
        introSub: '물리학 박사는 인상적이지만, 안내원으로 채용하지는 않을 것입니다. 마찬가지로, 가장 크고 비싼 AI 모델이 항상 올바른 선택은 아닙니다.',
        tipsTitle: 'AI 리더보드 읽기 (제품 리뷰 읽기처럼)',
        selfExplainPrompt: '고객 지원팀을 위한 AI 챗봇이 잘 작동하는지 어떻게 평가하시겠습니까? 구체적으로 무엇을 측정하시겠습니까?',
      },
      // From legacy: src/modules/evaluation/tech-translations.ts → whyEvaluationSectionKo
      whyEvaluationSection: {
        title: '1. 평가가 중요한 이유',
      },
      // From legacy: src/modules/evaluation/tech-translations.ts → benchmarksSectionKo
      benchmarksSection: {
        title: '2. 주요 벤치마크 (2025–2026)',
        intro: '업계는 모델을 비교하기 위해 표준화된 벤치마크를 사용합니다. 단일 벤치마크로는 전체 이야기를 알 수 없습니다.',
        // From legacy: benchmarksTranslations.ko
        benchmarks: [
          { name: 'MMLU', category: '지식', what: '57개 과목에 걸친 객관식 문제', scoring: '정확도 (%)' },
          { name: 'HumanEval', category: '코딩', what: 'Python 프로그래밍 문제', scoring: 'pass@k (테스트 통과 %)' },
          { name: 'GSM8K', category: '수학', what: '초등학교 수준 수학 문제', scoring: '정확도 (%)' },
          { name: 'TruthfulQA', category: '진실성', what: '일반적인 오해를 유발하도록 설계된 질문', scoring: '진실된 답변 %' },
          { name: 'MT-Bench', category: '대화', what: '다중 턴 대화 품질', scoring: 'GPT-4 판정 (1-10)' },
          { name: 'ARC-AGI', category: '추론', what: '추상적 추론 퍼즐', scoring: '정확도 (%)' },
        ],
      },
      // From legacy: src/modules/evaluation/tech-translations.ts → customEvalSectionKo
      customEvalSection: {
        title: '3. 커스텀 평가',
        intro: '공개 벤치마크는 일반적인 능력을 테스트합니다. 특정 작업에는 커스텀 평가가 필요합니다.',
        // From legacy: taskTypesTranslations.ko
        taskTypes: [
          { label: '분류', metrics: ['정확도, F1, 정밀도, 재현율'], tip: '클래스별로 테스트 데이터를 층화' },
          { label: '생성', metrics: ['BLEU, ROUGE, BERTScore, 인간 평가'], tip: '자동 지표는 품질과 상관관계가 낮음' },
          { label: '추출', metrics: ['정확 일치, 토큰 수준 F1'], tip: '형식 변형으로 테스트' },
          { label: '요약', metrics: ['ROUGE-L, 사실 일관성, 인간 평가'], tip: '요약이 사실을 환각하지 않는지 확인' },
          { label: '대화', metrics: ['인간 선호도, LLM 판정, 작업 완료'], tip: '다중 턴 평가가 단일 응답이 놓치는 것을 포착' },
        ],
      },
      // From legacy: src/modules/evaluation/tech-translations.ts → leaderboardSectionKo
      leaderboardSection: {
        title: '4. 리더보드 문제',
        intro: '벤치마크는 유용하지만 결함이 있습니다. 리더보드 순위만으로 모델을 선택하면 안 되는 이유입니다.',
      },
    },
    agents: {
      // From legacy: src/modules/agents/content/whatAreAgents.ko.ts (full human translation)
      whatAreAgents: {
        sectionTitle: '1. AI 에이전트란?',
        intro: '오늘날 대부분의 AI 도구는 **문자를 보낼 수 있는 똑똑한 동료** 같습니다 — 질문에 답해주지만, 실제로 무언가를 *해주지는* 못합니다. AI 에이전트는 다릅니다: **여러분을 대신해 행동할 수 있는 개인 비서**에 더 가깝습니다.',
        introSub: '"회의 몇 시야?"라고 묻는 것과 "내 회의를 목요일로 옮기고 참석자들에게 알려줘"라고 말하는 것의 차이를 생각해 보세요.',
        demoTitle: '챗봇에서 에이전트로',
        demoDescription: '클릭하면서 AI 기능이 어떻게 발전하는지 확인하세요 — 질문에 답하는 동료에서 업무를 처리하는 비서로.',
        levels: [
          { level: '챗봇', analogy: '아는 것이 많은 친구에게 문자하는 것과 같음', description: '질문하면 답을 받습니다. 그게 전부입니다. AI는 무언가를 확인하거나, 검색하거나, 대신 해줄 수 없습니다. 학습된 내용만 알고 있습니다.', everyday: 'Slack(또는 카카오톡)으로 동료에게 질문하는 것을 상상해 보세요 — 기억에 의존해서 답하지만, 여러분의 스프레드시트를 열거나 캘린더를 확인해 줄 수는 없습니다.', limit: '답변에 최신 정보가 필요하거나 무언가를 해야 한다면, 직접 해야 합니다.' },
          { level: 'AI + 검색', analogy: '검색할 줄 아는 동료와 같음', description: 'AI가 답하기 전에 정보를 찾아볼 수 있습니다 — 회사 문서를 검색하거나, 지식 베이스를 확인하거나, 웹을 탐색합니다. 이것을 RAG(검색 증강 생성)라고 합니다.', everyday: '동료에게 질문했더니 "잠깐, 공유 드라이브 확인해 볼게"라고 하고 — 실제 문서를 참조한 답변을 가져오는 것과 같습니다.', limit: '정보를 찾을 수는 있지만, 여전히 행동은 할 수 없습니다. 회의가 오후 3시라고 알려줄 수는 있지만, 일정을 변경해 줄 수는 없습니다.' },
          { level: 'AI 에이전트', analogy: '일을 처리해 주는 개인 비서와 같음', description: 'AI가 무엇을 해야 하는지 생각하고, 행동하고(이메일 보내기, 스프레드시트 업데이트, 회의 예약, 데이터베이스 조회), 결과를 확인하고, 작업이 완료될 때까지 계속합니다.', everyday: '비서에게 "목요일 회의들을 다음 주로 옮기고 참석자들에게 이메일 보내줘"라고 말하는 것과 같습니다. 단계를 파악하고, 실행하고, 문제를 처리하고, 결과를 보고합니다.', limit: '더 강력하지만 가드레일이 필요합니다 — 큰 결정은 비서가 행동하기 전에 승인하고 싶을 것입니다.' },
        ],
        loopTitle: '에이전트는 실제로 어떻게 작동하나요?',
        loopIntro: '에이전트는 간단한 루프를 따릅니다 — 좋은 비서가 사용하는 것과 같은 방식입니다:',
        loopSteps: [
          { label: '생각', desc: '다음에 무엇을 해야 하나?' },
          { label: '행동', desc: '무언가를 한다 (이메일 보내기, 데이터 조회, 기록 업데이트)' },
          { label: '확인', desc: '잘 됐나? 무슨 일이 있었나?' },
          { label: '반복', desc: '작업이 완료될 때까지' },
        ],
        loopOutro: '이것은 누군가에게 업무를 위임할 때 하는 것과 정확히 같습니다: 생각하고, 한 단계를 실행하고, 결과를 확인하고, 계속합니다. 차이점은 AI가 이것을 몇 초 만에 한다는 것입니다.',
        beforeAfterTitle: '전과 후: 에이전트가 바꾸는 것',
        examples: [
          { scenario: '고객 지원', without: '에이전트가 스크립트에서 질문에 답합니다. 고객은 여전히 직접 웹사이트를 탐색해서 요금제를 변경해야 합니다.', with: '에이전트가 고객 계정을 조회하고, 청구 내역을 확인하고, 요금제를 변경하고, 확인 이메일을 보냅니다 — 모두 하나의 대화에서.' },
          { scenario: '경비 보고서', without: 'AI가 경비 정책을 설명할 수 있습니다. 직원은 여전히 양식을 수동으로 작성해야 합니다.', with: '직원이 영수증을 전달합니다. 에이전트가 읽고, 경비 양식을 작성하고, 올바르게 분류하고, 승인을 위해 제출합니다.' },
          { scenario: '회의 준비', without: 'AI가 붙여넣은 문서를 요약합니다. 올바른 문서를 찾는 것은 여전히 직접 해야 합니다.', with: '"오후 2시 고객 미팅 준비해 줘"라고 말합니다. 에이전트가 고객의 최근 이메일, 지난 회의록, 진행 중인 제안서를 가져와 한 페이지 브리핑을 만듭니다.' },
        ],
        withoutLabel: '에이전트 없이',
        withLabel: '에이전트와 함께',
        everydayLabel: '일상적인 비교',
        limitLabel: '한계:',
        selfExplainPrompt: 'AI 에이전트에 대해 들어본 적 없는 동료에게 챗봇과 에이전트의 차이를 본인의 말로 설명해 보세요. 일상적인 비유를 사용하세요.',
        selfExplainAnswer: '챗봇은 아는 것이 정말 많은 친구에게 문자하는 것과 같습니다 — 질문에 답해줄 수 있지만, 대신 해줄 수는 없습니다. 에이전트는 개인 비서가 있는 것과 같습니다 — "다음 주 화요일 런던행 항공편 예약해 줘, 50만원 이하, 통로석"이라고 말하면 실제로 항공편을 검색하고, 옵션을 비교하고, 예약하고, 확인서를 보내줍니다. 핵심 차이는 행동입니다: 챗봇은 말하고, 에이전트는 합니다.',
      },
      // From legacy: tech-translations.ts → whatAreAgentsSectionKo (title only — legacy intro orphaned, body is hardcoded EN in JSX)
      whatAreAgentsSection: {
        title: '1. AI 에이전트란?',
      },
      // From legacy: translations.ts → toolUseKo (full human translation; guardrailScenarios array has no legacy KO → falls back to EN)
      toolUse: {
        title: '2. 에이전트가 실제로 할 수 있는 것',
        intro: '에이전트의 힘은 **도구**에서 옵니다 — 연결하고 사용할 수 있는 것들. 비서를 고용하고 이메일, 캘린더, 파일 시스템에 대한 접근 권한을 주는 것과 같습니다.',
        tools: [
          { name: '검색 / 조회', analogy: '서류함에서 찾아보는 것과 같음', whatItDoes: '에이전트가 회사 문서, 지식 베이스, 웹을 검색합니다.', businessExample: '고객이 반품 정책을 물어봅니다. 에이전트가 정책 문서를 검색하고 정확한 답변을 제공합니다.' },
          { name: '이메일 & 메시징', analogy: '비서에게 메시지를 보내달라고 하는 것과 같음', whatItDoes: '에이전트가 이메일, Slack(또는 카카오워크) 메시지, 알림을 작성하고 보낼 수 있습니다.', businessExample: '지원 티켓 해결 후 에이전트가 고객에게 후속 이메일을 보냅니다.' },
          { name: '데이터 조회', analogy: '스프레드시트나 데이터베이스를 확인하는 것과 같음', whatItDoes: '에이전트가 CRM, ERP 또는 비즈니스 시스템을 조회할 수 있습니다.', businessExample: '"Acme Corp 거래 상태가 어떻게 되나요?" — 에이전트가 Salesforce를 확인합니다.' },
          { name: '계산', analogy: '계산기를 건네주는 것과 같음', whatItDoes: '에이전트가 정확하게 계산하고 보고서를 생성할 수 있습니다.', businessExample: '"15% 할인하면 마진이 어떻게 되나요?" — 에이전트가 정확히 계산합니다.' },
          { name: '작업 & 업데이트', analogy: '기록을 업데이트해 달라고 하는 것과 같음', whatItDoes: '에이전트가 비즈니스 시스템에서 기록을 생성, 업데이트, 삭제할 수 있습니다.', businessExample: '"Acme 계정에 후속 작업을 만들어 주세요." — 에이전트가 생성합니다.' },
        ],
        trustTitle: '신뢰 질문: 에이전트가 혼자 무엇을 해야 하나요?',
        trustIntro: '신입사원에게 첫날부터 법인카드를 주지 않듯이, 에이전트가 혼자 할 수 있는 것과 승인이 필요한 것을 결정해야 합니다.',
        platformNote: '**Amazon Bedrock AgentCore** 같은 플랫폼이 인프라를 관리합니다 — 도구 연결, 메모리 관리, 대규모 보안.',
        selfExplainPrompt: '매니저가 묻습니다: "AI 에이전트가 승인 없이 고객에게 이메일을 보내게 해야 할까요?" 이 결정을 어떻게 생각하시겠습니까?',
        selfExplainAnswer: '위험을 고려하겠습니다: 잘못된 이메일은 관계를 손상시킬 수 있습니다. "초안 작성 후 승인" 워크플로우로 시작하는 것을 추천합니다. 시간이 지나면서 품질에 대한 신뢰가 쌓이면 일상적인 응답은 자동 발송하고 민감한 커뮤니케이션은 사람 검토를 유지합니다.',
      },
      // From legacy: tech-translations.ts → functionCallingSectionKo (title only)
      functionCallingSection: {
        title: '2. 함수 호출',
      },
      // From legacy: tech-translations.ts → mCPSectionKo (title only — legacy p2 was empty placeholder)
      mcpSection: {
        title: '3. MCP (모델 컨텍스트 프로토콜)',
      },
      // From legacy: translations.ts → patternsKo (title, intro, patterns[] human; decisionQuestions falls back to EN)
      patterns: {
        title: '3. 팀을 위한 에이전트 설정 방법',
        intro: '만능 해결책은 없습니다. 빠른 작업과 큰 프로젝트에 팀을 다르게 구성하듯이, AI 에이전트를 설정하는 방법도 다양합니다.',
        patterns: [
          { name: '단일 에이전트', analogy: '모든 것을 처리하는 한 명의 비서', howItWorks: '하나의 AI 에이전트가 작업을 받아 모두 처리합니다. 간단하고 빠릅니다.', bestFor: '한 사람이 처리할 수 있는 명확한 단계의 작업.', realExample: '고객이 "주문 상태가 어떻게 되나요?"라고 물으면 에이전트가 확인하고 답합니다.' },
          { name: '핸드오프 (라우팅)', analogy: '올바른 부서로 안내하는 안내원', howItWorks: '"라우터" 에이전트가 요청 유형을 파악하고 전문 에이전트에게 넘깁니다.', bestFor: '다른 전문성이 필요한 다양한 유형의 요청.', realExample: '고객이 문의합니다. 라우터 에이전트가 청구 문제임을 감지하고 청구 전문 에이전트에게 넘깁니다.' },
          { name: '멀티 에이전트 팀', analogy: '각자 역할이 있는 프로젝트 팀', howItWorks: '여러 전문 에이전트가 협력하여 각자의 부분을 처리합니다.', bestFor: '다양한 관점이 도움이 되는 복잡한 작업.', realExample: '시장 분석: 한 에이전트가 데이터를 수집하고, 다른 하나가 분석하고, 세 번째가 요약을 작성합니다.' },
          { name: '휴먼 인 더 루프', analogy: '큰 결정 전에 확인하는 비서', howItWorks: '에이전트가 작업을 수행하지만 주요 결정 지점에서 승인을 위해 일시 중지합니다.', bestFor: '실수 비용이 큰 고위험 작업.', realExample: '에이전트가 계약 수정안을 준비하고, 변경 사항을 보여주고, 확인을 기다립니다.' },
        ],
      },
      // From legacy: tech-translations.ts → designPatternsSectionKo + data-translations.ts → patternsTranslations.ko
      designPatternsSection: {
        title: '4. 에이전트 디자인 패턴',
        intro: '모든 에이전트가 같은 방식으로 작동하지 않습니다. 핵심 아키텍처 패턴입니다.',
        patterns: [
          { name: 'ReAct', description: '가장 일반적인 패턴. 에이전트가 생각, 행동, 관찰을 번갈아 수행.', useCase: '범용 에이전트, 도구 사용 Q&A.', example: '"근처 최고 레스토랑 3곳?" → 생각 → 검색 → 읽기 → 응답' },
          { name: '반성', description: '에이전트가 출력을 생성한 후 자체 작업을 검토하고 개선.', useCase: '코드 생성, 작문 작업.', example: '코드 생성 → 버그 검토 → 수정 → 전달' },
          { name: '계획 후 실행', description: '에이전트가 먼저 계획을 세운 후 각 단계를 실행.', useCase: '복잡한 다단계 작업.', example: '"도쿄 여행 계획" → 단계 나열 → 항공편 예약 → 호텔 예약 → 일정 생성' },
          { name: '멀티 에이전트', description: '여러 전문 에이전트가 각자의 역할로 협업.', useCase: '전문화가 도움이 되는 복잡한 작업.', example: '연구 에이전트 + 작성 에이전트 + 검토 에이전트' },
          { name: '휴먼 인 더 루프', description: '에이전트가 주요 결정 지점에서 인간 승인을 위해 일시 중지.', useCase: '고위험 작업, 민감한 결정.', example: '에이전트가 계약 준비 → 인간 검토 → 에이전트 발송' },
        ],
      },
      // From legacy: translations.ts → connectKo (orphaned in legacy — component used `useT(EN, {})`).
      // Reconnected via the new tree. concepts[] has 4 of 7 fields; whereYouSeeIt/doIneedToDoSomething/whyCare fall back to EN.
      connect: {
        title: '4. 에이전트가 모든 것에 연결하는 방법',
        intro: '에이전트는 *무언가를 할 수 있어야* 유용합니다. 도구, 스킬, 프로토콜의 생태계가 어떻게 맞물리는지 알아보겠습니다.',
        concepts: [
          { name: 'MCP — 도구에 연결', analogy: '시스템을 위한 범용 접근 배지', whatItIs: '어떤 AI든 어떤 도구에든 연결할 수 있는 오픈 표준("AI의 USB-C"). 이미 3,000개 이상의 커넥터가 있습니다.', example: '회사가 티켓 시스템용 MCP 서버를 구축합니다. 이제 모든 AI 도구가 티켓을 생성하고 업데이트할 수 있습니다.' },
          { name: '스킬 — 에이전트에게 워크플로우 가르치기', analogy: '도구 벨트가 아닌 교육 매뉴얼', whatItIs: 'MCP는 에이전트에게 도구를 줍니다. 스킬은 사용 방법을 가르칩니다 — 워크플로우, 모범 사례, 의사결정 로직.', example: '"고객 온보딩" 스킬은 7단계 프로세스를 알고 있습니다: 계약 확인, 워크스페이스 생성, 환영 이메일 발송...' },
          { name: 'Powers — 개발자를 위한 전문 컨설턴트', analogy: '자체 도구와 전문성을 가지고 오는 전문가', whatItIs: 'Kiro IDE를 위한 큐레이션된 패키지로 MCP 서버, 가이드라인, 자동화 훅을 번들합니다.', example: '"AWS Observability" Power는 Kiro에게 CloudWatch와 모니터링 모범 사례에 대한 지식을 제공합니다.' },
          { name: 'A2A — 에이전트끼리 대화', analogy: '부서 간 요청을 보내는 것', whatItIs: 'MCP가 에이전트를 도구에 연결하는 반면, A2A는 에이전트를 다른 에이전트에 연결합니다. Google이 만들고 100개 이상의 조직이 지원합니다.', example: '지원 에이전트가 청구 문제를 감지합니다. A2A를 통해 재무팀의 청구 에이전트에게 환불 요청을 보냅니다.' },
        ],
        platformNote: '**Amazon Bedrock AgentCore** 같은 플랫폼이 이 모든 것을 연결하는 런타임을 관리합니다.',
        // MT
        insightTitle: '패턴: 벤더 종속이 아닌 오픈 표준',
        // MT
        insightText: '패턴에 주목하세요: 이들 대부분은 벤더 종속이 아닌 오픈 표준입니다. MCP, Agent Skills, A2A 모두 Agentic AI Foundation(Linux Foundation, 2025년 12월) 산하로 기증되었습니다. 즉, 작성하거나 구입한 스킬이나 MCP 커넥터가 여러 벤더에서 작동한다는 뜻입니다. 엔터프라이즈 소프트웨어에서는 드문 일이며 AI 도구 벤더에게 이를 준수하도록 요구할 가치가 있습니다.',
        selfExplainPrompt: '회사에서 여러 시스템을 포함하는 다단계 프로세스를 생각해 보세요. 에이전트에게 어떤 MCP 도구가 필요할까요? 어떤 워크플로우 로직(스킬)이 연결할까요?',
        selfExplainAnswer: '예시 — 새 거래 성사: MCP 도구: CRM, 이메일, 캘린더, 프로젝트 관리, 청구. 스킬 워크플로우: (1) CRM 업데이트. (2) 온보딩 프로젝트 생성. (3) 킥오프 미팅 예약. (4) 환영 이메일 발송. (5) 인보이스 생성. (6) 영업 매니저에게 알림.',
      },
      // From legacy: tech-translations.ts → buildingAgentsSectionKo + data-translations.ts → frameworksTranslations.ko.
      // Legacy `intro` is semantically the new `p2` callout — mapped accordingly.
      buildingAgentsSection: {
        title: '6. 에이전트 구축',
        p2: '에이전트를 구축하는 데 프레임워크가 필요하지 않습니다. 원시 함수 호출로 시작하고 필요에 따라 확장하세요.',
        frameworks: [
          { name: '원시 함수 호출', description: '도구 스키마를 사용한 직접 API 호출. 프레임워크 오버헤드 없음.', bestFor: '간단한 에이전트, 학습, 프로토타입' },
          { name: 'Vercel AI SDK', description: '웹 중심, 좋은 TypeScript 지원, 스트리밍 우선.', bestFor: '웹 앱, Next.js, 스트리밍 UI' },
          { name: 'LangChain / LangGraph', description: '가장 인기. LangGraph가 그래프 기반 워크플로우 추가.', bestFor: '프로덕션 에이전트, 복잡한 워크플로우' },
          { name: 'CrewAI', description: '역할 기반 에이전트가 협업하는 멀티 에이전트 프레임워크.', bestFor: '멀티 에이전트 팀, 역할 기반 작업' },
          { name: 'AutoGen (Microsoft)', description: '휴먼 인 더 루프 지원이 있는 멀티 에이전트 대화.', bestFor: '연구, 복잡한 멀티 에이전트 시스템' },
          { name: 'Amazon Bedrock AgentCore', description: '대규모 에이전트를 위한 관리형 인프라. 모든 프레임워크와 작동.', bestFor: '엔터프라이즈 배포, AWS의 프로덕션 에이전트' },
        ],
      },
      // From legacy: translations.ts → businessImpactKo (full human prose; arrays have no legacy KO → fall back to EN).
      // Legacy loopTitle/loopDesc fields are orphaned (component does not render them) — dropped.
      businessImpact: {
        title: '6. 비즈니스 현실 — AI가 운전대를 잡을 때',
        intro: '모든 임원이 AI 전환을 원합니다. 하지만 실제로 AI가 결정을 내리게 할 때가 되면 회의실이 조용해집니다. 이것이 자율주행차 문제입니다 — 기술은 준비되었을 수 있지만, 사람과 프로세스는 준비되었나요?',
        introSub: 'AI 자율성의 스펙트럼을 이해하고 — 조직이 어디까지 준비되었는지 솔직하게 평가하는 것이 — 성공적인 도입과 비싼 실패의 차이입니다.',
        carTitle: '자율주행차의 교훈',
        carIntro: '자율주행차와 자율 AI 에이전트 사이의 유사점은 놀랍습니다 — 그리고 교훈은 AI 전략에 직접 적용됩니다.',
        frameworkButton: '실용적 프레임워크: AI가 어떤 결정을 내릴 수 있나요?',
        failTitle: '에이전틱 AI 프로젝트의 40%가 실패할 수 있는 이유',
        failIntro: '업계 분석가들은 에이전틱 AI 이니셔티브의 최대 40%가 2027년까지 취소될 수 있다고 예측합니다 — 기술이 작동하지 않아서가 아니라 조직이 준비되지 않았기 때문입니다.',
        selfExplainPrompt: 'CEO가 "Q4까지 고객 지원을 완전 자율화하고 싶다 — 사람은 루프에 없어도 된다"고 말합니다. 자율성 스펙트럼과 자율주행차 비유를 사용하여 어떻게 조언하시겠습니까?',
        selfExplainAnswer: '이렇게 말하겠습니다: "야망을 공유하지만, 자율주행차 업계에서 배우겠습니다. Waymo 접근법을 추천합니다: Q1에 일상 업무에 대해 레벨 2로 시작. Q2에 98%+ 정확도 데이터가 있으면 레벨 3으로 이동. Q3까지 복잡한 업무는 레벨 2 유지. Q4에 실제 성과 데이터를 기반으로 완전 자율성 평가."',
      },
      // From legacy: tech-translations.ts → a2ASectionKo (title human; legacy intro maps to new p3) + data-translations.ts → protocolsTranslations.ko
      a2aSection: {
        title: '7. A2A — 에이전트 간 프로토콜',
        p3: 'MCP는 에이전트를 도구에 연결합니다. A2A는 에이전트를 다른 에이전트에 연결합니다.',
        protocols: [
          { name: 'MCP', direction: '에이전트 → 도구/리소스', analogy: 'USB — 주변기기 연결', scope: '하나의 에이전트가 외부 기능 사용', standard: 'Anthropic (오픈, OpenAI, AWS, Microsoft 채택)', status: '3000+ 서버, 프로덕션 준비' },
          { name: 'A2A', direction: '에이전트 → 에이전트', analogy: 'HTTP — 컴퓨터 간 통신', scope: '에이전트가 다른 에이전트를 발견하고 협업', standard: 'Google → Linux Foundation (100+ 조직: AWS, Microsoft, Salesforce)', status: '스펙 안정, 초기 프로덕션 채택' },
        ],
      },
      // From legacy: tech-translations.ts → skillsHarnessSectionKo + data-translations.ts → capabilitiesTranslations.ko
      skillsHarnessSection: {
        title: '8. 스킬, 스티어링, 관리형 런타임',
        intro: 'MCP는 에이전트에게 도구를, Agent Skills는 워크플로우를, AGENTS.md와 Kiro steering은 프로젝트 컨텍스트를, Bedrock AgentCore는 관리형 런타임을 제공합니다. 에코시스템이 명확한 계층으로 수렴했고, 대부분 오픈 표준이며 Agentic AI Foundation(Linux Foundation, 2025년 12월)에 기증되었습니다.',
        capabilities: [
          { name: 'MCP Server', layer: '연결', what: '범용 도구 커넥터 — 하나의 API/데이터베이스/서비스를 모든 MCP 클라이언트에 노출', granularity: '단일 도구 또는 리소스', reusability: '모든 MCP 호환 에이전트', example: 'mcp-server-salesforce, mcp-server-postgres, mcp-server-slack' },
          { name: 'Agent Skill (SKILL.md)', layer: '행동', what: '오픈 표준 — SKILL.md(프론트매터 + 지시사항) 폴더와 선택적 scripts/, references/, assets/. 점진적 로드: 메타데이터 항상, 본문은 활성화 시, 파일은 필요 시.', granularity: '다단계 워크플로우 또는 도메인 전문성', reusability: '모든 Skills 호환 에이전트 (Claude Code, Codex, Microsoft Agent Framework, Kiro 등)', example: 'customer-onboarding, pdf-processing, code-review' },
          { name: 'AGENTS.md', layer: '프로젝트 컨텍스트', what: '에이전트용 README — 저장소 수준 지시: 설정, 코드 스타일, 테스트 명령, PR 규칙. Agentic AI Foundation의 오픈 표준.', granularity: '저장소 전체 또는 하위 디렉토리 (중첩 파일 지원)', reusability: 'Codex CLI, Claude Code, Cursor, Aider, Kiro, OpenHands 등', example: '모노레포 루트 + 패키지별 AGENTS.md' },
          { name: 'Kiro Steering', layer: '워크스페이스 컨텍스트', what: '.kiro/steering/의 마크다운 파일이 Kiro에 지속적인 프로젝트 지식 제공 — 규칙, 라이브러리, 표준.', granularity: '워크스페이스', reusability: 'Kiro CLI / IDE', example: 'product.md, structure.md, tech.md' },
          { name: 'Bedrock AgentCore', layer: '런타임', what: 'AWS의 관리형 에이전트 런타임 — 모델 + 프롬프트 + 도구 + 스킬 + 메모리 + 관측가능성 + 제한.', granularity: '완전한 에이전트', reusability: '프로덕션 배포', example: '지원 에이전트, 영업 어시스턴트, IT 헬프데스크' },
        ],
      },
      // From legacy: tech-translations.ts → productionGovernanceSectionKo (title human; legacy intro is semantically the new p2)
      // + data-translations.ts → autonomyTiersTranslations.ko + governanceControlsTranslations.ko
      productionGovernanceSection: {
        title: '8. 프로덕션 거버넌스 — 대규모 신뢰',
        p2: '에이전트를 프로덕션에 배포하는 것은 API 배포와 근본적으로 다릅니다.',
        autonomyTiers: [
          { tier: 'L0 — 코파일럿', loop: '인간이 행동, AI가 제안', oversight: '모든 행동', examples: '코드 완성, 이메일 초안', risk: '최소' },
          { tier: 'L1 — 실행자', loop: '인간이 승인, AI가 행동', oversight: '행동별 승인', examples: 'AI 작성 + 인간 발송', risk: '낮음' },
          { tier: 'L2 — 제한된 자율', loop: 'AI가 규칙 내 행동, 인간 모니터링', oversight: '비동기 검토 + 알림', examples: 'L1 티켓 자동 해결, 5만원 미만 환불', risk: '중간' },
          { tier: 'L3 — 감독된 자율', loop: 'AI가 행동, 예외 에스컬레이션', oversight: '예외 기반 + 감사', examples: '고객 온보딩, 인시던트 대응', risk: '높음' },
          { tier: 'L4 — 완전 자율', loop: 'AI가 행동, 인간이 전략 설정', oversight: '결과 기반 검토', examples: '자율 거래, 자가 치유 인프라', risk: '치명적' },
        ],
        governanceControls: [
          { control: '행동 경계', what: '에이전트별 허용된 행동의 화이트리스트.' },
          { control: '지출 한도', what: '행동 및 세션당 재정적 영향 상한.' },
          { control: '감사 추적', what: '모든 에이전트 행동이 추론 추적과 함께 기록.' },
          { control: '킬 스위치', what: '에이전트를 즉시 중지하는 기능.' },
          { control: '인간 에스컬레이션', what: '에이전트를 일시 중지하는 정의된 트리거.' },
          { control: '드리프트 감지', what: '시간에 따른 행동 변화 모니터링.' },
        ],
      },
    },
    quantization: {
      // From legacy: tech-translations.ts → whatIsQuantizationSectionKo (title only — legacy intro orphaned, body is hardcoded EN in JSX)
      whatIsQuantizationSection: {
        title: '1. 양자화란?',
      },
      // From legacy: tech-translations.ts → quantizationMethodsSectionKo + data-translations.ts → methodsTranslations.ko
      quantizationMethodsSection: {
        title: '2. 양자화 방법',
        intro: '네 가지 주요 접근 방식이 생태계를 지배합니다. 각각 다른 사용 사례를 대상으로 합니다.',
        // Methods array re-ordered to match the new EN tree (legacy KO order: GPTQ, GGUF, AWQ, bitsandbytes;
        // new EN order: GPTQ, AWQ, GGUF, BitsAndBytes). Per-item content preserved verbatim from legacy.
        methods: [
          { name: 'GPTQ', tagline: 'GPU 최적화, 캘리브레이션 양자화', howItWorks: '캘리브레이션 데이터를 사용하여 레이어별 최적 양자화 포인트를 찾습니다. GPU 최적화 모델을 생성합니다.', pros: ['캘리브레이션으로 높은 품질', '빠른 GPU 추론', '잘 확립된 생태계'], cons: ['GPU 필요', '캘리브레이션 데이터 필요', '느린 양자화 과정'], whenToUse: '품질 요구가 있는 프로덕션 GPU 추론' },
          { name: 'AWQ', tagline: '활성화 인식, 중요한 가중치 보존', howItWorks: '활성화 패턴을 기반으로 가장 중요한 가중치를 식별하고 더 신중하게 양자화합니다.', pros: ['순진한 양자화보다 나은 품질', '빠른 추론', '4비트에 적합'], cons: ['캘리브레이션 데이터 필요', '더 새로운, 작은 생태계'], whenToUse: '4비트에서 품질이 중요할 때' },
          { name: 'GGUF', tagline: 'CPU 친화적, llama.cpp 포맷', howItWorks: '선택 가능한 정밀도(Q4_K_M, Q5_K_S 등)로 가중치를 양자화합니다. llama.cpp를 통한 CPU 추론에 최적화.', pros: ['CPU에서 실행 (GPU 불필요)', '유연한 양자화 수준', '큰 커뮤니티, 많은 모델'], cons: ['GPU 방법보다 느림', '수준에 따라 품질 변동'], whenToUse: '노트북/데스크톱에서 로컬 추론, 엣지 디바이스' },
          { name: 'bitsandbytes', tagline: 'HuggingFace 통합, 사용 간편', howItWorks: '로딩 시 플래그 하나로 모델을 양자화(load_in_4bit). QLoRA 파인튜닝에 자주 사용.', pros: ['가장 사용하기 쉬움', 'transformers 라이브러리에 통합', 'QLoRA에 완벽'], cons: ['NVIDIA GPU만', '순수 추론에 최적이 아님'], whenToUse: 'QLoRA 파인튜닝, 빠른 프로토타이핑' },
        ],
      },
      // From legacy: tech-translations.ts → conversionPipelineSectionKo (title + intro human; legacy p2 was empty placeholder)
      conversionPipelineSection: {
        title: '3. 변환 파이프라인',
        intro: '실제 과정을 진행하세요: HuggingFace 모델을 가져와 GGUF로 변환하고 양자화합니다.',
      },
      // From legacy: tech-translations.ts → qualityVsSizeSectionKo (title human; legacy `intro` semantically maps to new p2)
      qualityVsSizeSection: {
        title: '4. 품질 vs 크기',
        p2: '모델 크기와 품질의 관계는 선형이 아닙니다. 최적점이 있습니다.',
      },
    },
    inference: {
      // From legacy: tech-translations.ts → howInferenceWorksSectionKo (title human; legacy `intro` semantically maps to new p2)
      howInferenceWorksSection: {
        title: '1. 추론의 작동 방식',
        p2: '추론은 학습된 모델에서 텍스트를 생성하는 과정입니다. 두 단계로 진행됩니다.',
      },
      // From legacy: tech-translations.ts → servingFrameworksSectionKo + data-translations.ts → frameworksTranslations.ko
      servingFrameworksSection: {
        title: '2. 서빙 프레임워크',
        intro: '학습된 모델은 디스크의 가중치일 뿐입니다. 대규모로 서빙하려면 프레임워크가 필요합니다.',
        frameworks: [
          { name: 'vLLM', tagline: '대부분의 사용 사례에서 가장 빠름', features: ['PagedAttention, continuous batching, tensor parallelism'] },
          { name: 'TGI (HuggingFace)', tagline: 'HuggingFace 생태계와 쉬운 통합', features: ['Flash attention, 양자화, 스트리밍'] },
          { name: 'llama.cpp', tagline: 'CPU 추론, GGUF 포맷', features: ['어디서나 실행 — 노트북, 폰, Raspberry Pi'] },
          { name: 'Ollama', tagline: '로컬 실행의 가장 쉬운 방법', features: ['원커맨드 설치, 모델 라이브러리, API'] },
          { name: 'Amazon Bedrock', tagline: '관리형 추론, 100+ 모델', features: ['관리할 것 없음 — API 호출, 자동 스케일링, 엔터프라이즈 보안'] },
        ],
      },
      // From legacy: tech-translations.ts → optimizationTechniquesSectionKo + data-translations.ts → techniquesTranslations.ko
      // Note: legacy KO has 8 techniques; new EN tree has 4. Per-item content reordered to match EN order; legacy items 4–6 dropped.
      optimizationTechniquesSection: {
        title: '3. 최적화 기법',
        intro: '원시 모델 추론은 느립니다. 이 기법들은 처리량을 2-10배 향상시킬 수 있습니다.',
        techniques: [
          { name: 'Continuous Batching', short: 'GPU를 항상 채우기', description: '전체 배치가 완료될 때까지 기다리지 않고 자리가 비면 새 요청 추가.' },
          { name: 'PagedAttention', short: '효율적 KV 캐시', description: 'KV 캐시를 가상 메모리처럼 관리 — 미리가 아닌 필요 시 페이지 할당.' },
          { name: 'Speculative Decoding', short: '추측하고 검증', description: '작은 모델이 후보를 빠르게 생성하고 큰 모델이 병렬로 검증.' },
          { name: 'Prefix Caching', short: '공통 접두사 재사용', description: '공통 시스템 프롬프트의 KV 상태를 캐시하여 재계산 방지.' },
        ],
      },
      // From legacy: tech-translations.ts → costOptimizationSectionKo
      costOptimizationSection: {
        title: '4. 비용 최적화',
        intro: '추론 비용은 프로덕션 LLM 시스템에서 지배적인 비용입니다.',
      },
    },
    architecture: {
      // From legacy: tech-translations.ts → denseMoESectionKo (title only — intro was empty) + data-translations.ts → comparisonTranslations.ko
      denseMoESection: {
        title: '1. Dense vs Mixture-of-Experts',
        comparison: [
          { aspect: '파라미터', dense: '모든 토큰에 모두 활성', moe: '토큰당 부분집합만 활성' },
          { aspect: '계산', dense: '총 크기에 비례', moe: '활성 크기에 비례' },
          { aspect: '메모리', dense: '모든 가중치가 메모리에', moe: '모든 가중치가 메모리에 (총 더 큼)' },
          { aspect: '품질', dense: '일관적, 예측 가능', moe: '더 적은 FLOP으로 dense와 일치 가능' },
          { aspect: '학습', dense: '더 간단, 더 안정적', moe: '로드 밸런싱 필요, 더 복잡' },
        ],
      },
      // From legacy: tech-translations.ts → scalingLawsSectionKo (title only — legacy intro was empty)
      scalingLawsSection: {
        title: '2. 스케일링 법칙',
      },
      // From legacy: tech-translations.ts → attentionVariantsSectionKo
      attentionVariantsSection: {
        title: '3. 어텐션 변형',
        intro: 'KV 캐시는 추론 시 주요 메모리 병목입니다. 다양한 어텐션 변형이 다른 트레이드오프를 만듭니다.',
      },
      // From legacy: tech-translations.ts → modelConfigSectionKo
      modelConfigSection: {
        title: '4. 모델 구성',
        intro: '자체 모델 아키텍처를 구성하고 파라미터 선택이 총 크기에 어떤 영향을 미치는지 확인하세요.',
      },
      // From legacy: tech-translations.ts → decisionTreeSectionKo (p6-p9 not in legacy → fall back to EN)
      decisionTreeSection: {
        title: '5. 의사결정 트리',
        intro: '아키텍처 선택은 예산, 사용 사례, 모델을 직접 서빙해야 하는지에 따라 달라집니다.',
      },
    },
    training: {
      // From legacy: tech-translations.ts → trainingSection1Ko (title was orphaned in legacy — Section1 had no useT). Title preserved here.
      trainingSection1: {
        title: '1. 랜덤 가중치에서',
      },
      // From legacy: tech-translations.ts → trainingSection2Ko (only `title` was populated).
      // `subtitle` and `idle` from inline ad-hoc i18n preserved verbatim.
      trainingSection2: {
        title: '2. 학습 루프',
        subtitle: '단계를 클릭하거나 전체 사이클을 애니메이션',
        idle: '위의 단계를 클릭하거나 애니메이션을 눌러 각 단계가 어떻게 작동하는지 확인하세요.',
      },
      // From legacy: tech-translations.ts → trainingSection3Ko (title orphaned — preserved here)
      trainingSection3: {
        title: '3. 체크포인트와 모델',
      },
      // From legacy: data-translations.ts → variantsTranslations.ko. Legacy order [scratch, continued, lora, fulltuning] reordered to match new EN [scratch, continued, fulltuning, lora].
      trainingSection4: {
        title: '4. 학습 방법',
        variants: [
          { label: '처음부터', desc: '랜덤 가중치에서 완전히 새로운 모델 학습. 가장 비싸지만 완전한 통제.' },
          { label: '계속 사전 학습', desc: '기존 모델을 가져와 도메인별 데이터로 추가 학습.' },
          { label: '전체 파인튜닝', desc: '모든 가중치 업데이트. 최고 품질이지만 가장 많은 리소스 필요.' },
          { label: 'LoRA / QLoRA', desc: '작은 어댑터 행렬로 파인튜닝. 저렴하고 빠르고 효율적.' },
        ],
      },
      // From legacy: data-translations.ts → formatComparisonTranslations.ko. 3rd item "JSONL" was misaligned with new EN 3rd "PyTorch" — dropped (falls back to EN).
      trainingSection5: {
        title: '5. nanochat 스피드런',
        formats: [
          { name: 'SafeTensors', useCase: '모델 가중치 표준. 안전하고 빠른 로딩.' },
          { name: 'GGUF', useCase: 'llama.cpp용 양자화 모델. CPU 추론.' },
        ],
      },
    },
    llmdata: {
      // From legacy: data-translations.ts → sourcesTranslations.ko. Legacy order [Common Crawl, Wikipedia, 도서, 코드, 학술 논문, 대화]
      // reordered to match new EN [Common Crawl, Code, Books, Academic, Wikipedia, Other]. Position 5 ("대화" vs "Other") dropped → falls back to EN.
      dataSourcesSection: {
        title: '1. 데이터 소스',
        sources: [
          { name: 'Common Crawl', details: '전체 인터넷 웹 스크래핑. 가장 큰 오픈 데이터 소스.' },
          { name: '코드', details: 'GitHub, Stack Overflow. 추론과 코딩 능력 향상.' },
          { name: '도서', details: '장문, 잘 쓰인 텍스트. Books3, Gutenberg.' },
          { name: '학술 논문', details: 'ArXiv, PubMed. 도메인별 지식.' },
          { name: 'Wikipedia', details: '고품질, 팩트체크, 다국어.' },
        ],
      },
      // From legacy: tech-translations.ts → cleaningPipelineSectionKo
      cleaningPipelineSection: {
        title: '2. 클리닝 파이프라인',
        intro: '원시 웹 데이터는 대부분 쓰레기입니다. 일반적인 파이프라인은 필터링을 통해 85% 이상을 버립니다.',
      },
      // From legacy: tech-translations.ts → dataMixSectionKo (p3 not in legacy → falls back to EN)
      dataMixSection: {
        title: '3. 데이터 믹스',
        intro: '데이터 유형의 비율이 모델의 능력을 직접 형성합니다.',
      },
      // From legacy: tech-translations.ts → syntheticDataSectionKo (title only — legacy intro orphaned)
      syntheticDataSection: {
        title: '4. 합성 데이터',
      },
      // From legacy: tech-translations.ts → dataFormatsSectionKo
      dataFormatsSection: {
        title: '5. 데이터 포맷',
        intro: '각 학습 단계는 다른 형식을 사용합니다.',
      },
    },
    finetuning: {
      // From legacy: data-translations.ts → winCasesTranslations.ko. KO winCases[0].title is the legacy correct value;
      // EN[0].title repeats the section heading due to a pre-existing typo (preserved unchanged in EN).
      whenToFineTuneSection: {
        title: '1. 파인튜닝 시기',
        intro: '파인튜닝은 강력하지만 비쌉니다. 의사결정 트리를 통해 실제로 필요한지 확인하세요.',
        winCases: [
          { title: '일관된 출력 형식', desc: '항상 유효한 JSON, 특정 XML 스키마, 구조화된 보고서를 반환 — 취약한 프롬프트 엔지니어링 없이.' },
          { title: '도메인 용어', desc: '기본 모델이 틀리거나 환각하는 의료, 법률, 내부 전문 용어.' },
          { title: '지연시간 감소', desc: '파인튜닝된 8B 모델이 작업에서 범용 70B 모델과 일치 — 10배 빠르고 10배 저렴.' },
          { title: '행동 패턴', desc: '프롬프팅으로 안정적으로 생성할 수 없는 특정 톤, 거부 스타일, 다단계 추론을 학습.' },
        ],
      },
      // From legacy: tech-translations.ts → preparingDataSectionKo. CHECKLIST stays inline EN-only (legacy was misaligned).
      preparingDataSection: {
        title: '2. 데이터 준비',
        intro: '데이터 품질이 파인튜닝 성공을 결정합니다. 형식을 선택하고, 예시를 구조화하고, 검증하세요.',
      },
      // From legacy: tech-translations.ts → fineTuningRunSectionKo (title + intro only)
      fineTuningRunSection: {
        title: '3. 파인튜닝 실행',
        intro: 'Unsloth를 사용한 Llama 3.1 8B의 완전한 LoRA 파인튜닝. 각 단계를 진행하세요.',
      },
      // From legacy: tech-translations.ts → evaluationMergingSectionKo
      evaluationMergingSection: {
        title: '4. 평가 및 병합',
        intro: '파인튜닝된 모델을 테스트하고, 전후를 비교하고, LoRA 어댑터를 병합하세요.',
      },
      // From legacy: tech-translations.ts → costPlatformSectionKo. Legacy platforms list dropped (different platform names than current EN).
      costPlatformSection: {
        title: '5. 비용 및 플랫폼 가이드',
        intro: '파인튜닝 작업을 어디서 실행하고, 비용이 얼마이며, 어떤 하드웨어가 필요한지.',
      },
    },
    transformer: {
      // From legacy: tech-translations.ts → bigPictureSectionKo. LAYERS stays inline EN-only (legacy layersTranslations had different concepts).
      bigPictureSection: {
        title: '1 · 전체 그림',
        intro: '트랜스포머는 동일한 레이어의 스택입니다. 데이터가 입력에서 출력으로 흐릅니다.',
      },
      // From legacy: tech-translations.ts → attentionSectionKo. p2/p4 not in legacy → fall back to EN.
      attentionSection: {
        title: '2 · 어텐션 메커니즘',
        intro: '어텐션은 각 단어가 다른 모든 단어를 보고 각각에 얼마나 집중할지 결정하게 합니다.',
      },
      // Map legacy intro → new p6 (semantically matches).
      multiHeadSection: {
        title: '3 · 멀티헤드 어텐션',
        p6: '하나의 어텐션 패턴으로는 충분하지 않습니다. 모델은 여러 개를 병렬로 실행합니다.',
      },
      // Map legacy intro → new p4.
      ffnSection: {
        title: '5 · 피드포워드 네트워크',
        p4: '어텐션이 컨텍스트를 수집한 후 각 토큰은 피드포워드 네트워크를 통과합니다.',
      },
      // Map legacy intro → new p4.
      layerByLayerSection: {
        title: '4 · 레이어별 분석',
        p4: '각 레이어를 통해 토큰의 표현이 어떻게 변하는지 확인하세요.',
      },
    },
    datafoundations: {
      // From legacy: translations.ts → garbageInOutKo (only title and goodDataTitle reachable through new tree shape)
      garbageInOut: {
        title: '1. 쓰레기를 넣으면 쓰레기가 나온다',
        goodDataTitle: '"좋은 데이터"란 이런 것',
      },
      // From legacy: translations.ts → dataForBusinessKo (full mirror)
      dataForBusiness: {
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
      },
      // From legacy: tech-translations.ts → dataTypesSectionKo + data-translations.ts → categoriesTranslations.ko
      dataTypesSection: {
        title: '1. 정형 vs 비정형 데이터',
        intro: '모든 데이터는 세 가지 카테고리로 나뉩니다. 예시를 클릭하여 실제 모습을 확인하세요.',
        categories: [
          { title: '정형', description: '정의된 타입의 행과 열. 스프레드시트, SQL 데이터베이스, CSV 파일.' },
          { title: '반정형', description: '일부 조직이 있지만 엄격한 스키마 없음. JSON, XML, 로그, 헤더가 있는 이메일.' },
          { title: '비정형', description: '사전 정의된 구조 없음. 자유 텍스트, 이미지, 오디오, 비디오 — 전체 데이터의 80% 이상.' },
        ],
      },
      // From legacy: tech-translations.ts → pipelineSectionKo + data-translations.ts → stagesTranslations.ko
      pipelineSection: {
        title: '2. 데이터 파이프라인',
        intro: '데이터는 사용 준비가 된 상태로 도착하는 경우가 드뭅니다. 파이프라인이 변환을 통해 이동시킵니다.',
        stages: [
          { label: '추출', description: '소스 시스템에서 원시 데이터 가져오기', details: ['API, 데이터베이스, 파일, 웹 스크래핑'] },
          { label: '변환', description: '정제, 정규화, 보강', details: ['중복 제거, 형식 수정, 계산된 필드 추가'] },
          { label: '로드', description: '대상 시스템에 쓰기', details: ['데이터 웨어하우스, 벡터 데이터베이스, 검색 인덱스'] },
          { label: '검증', description: '품질과 완전성 확인', details: ['스키마 검증, null 체크, 분포 체크'] },
          { label: '모니터링', description: '시간에 따른 파이프라인 건강 추적', details: ['데이터 드리프트, 볼륨 이상, 지연 경고'] },
        ],
      },
      // From legacy: tech-translations.ts → dataQualitySectionKo
      dataQualitySection: {
        title: '3. 데이터 품질',
        intro: '이 데이터셋에서 문제를 찾으세요. 각 문제 유형을 클릭하여 강조하세요.',
      },
      // From legacy: tech-translations.ts → architectureSectionKo + data-translations.ts → patternsTranslations.ko
      architectureSection: {
        title: '4. 데이터 아키텍처 패턴',
        intro: '데이터는 어디에 있나요? 서로 다른 트레이드오프를 가진 네 가지 지배적 패턴.',
        patterns: [
          { title: '데이터 웨어하우스', tagline: '중앙화, 정형, SQL 쿼리', whenToUse: '비즈니스 분석, 보고, 대시보드' },
          { title: '데이터 레이크', tagline: '모든 형식의 원시 데이터, schema-on-read', whenToUse: 'ML 학습, 탐색적 분석, 아카이빙' },
          { title: '레이크하우스', tagline: '양쪽의 장점 — 레이크 스토리지 + 웨어하우스 기능', whenToUse: '둘 다 필요한 현대 데이터 플랫폼' },
          { title: '벡터 스토어', tagline: '시맨틱 검색을 위한 임베딩', whenToUse: 'RAG, 추천, 유사도 검색' },
        ],
      },
      // From legacy: tech-translations.ts → lLMDataSectionKo (renamed key llmDataSection)
      llmDataSection: {
        title: '5. LLM이 필요로 하는 것',
        intro: '데이터를 넓게 이해했으니, LLM이 구체적으로 필요로 하는 것을 알아보겠습니다.',
      },
    },
    alignment: {
      // From legacy: translations.ts → whyAIGoesWrongKo (full mirror)
      whyAIGoesWrong: {
        title: '1. AI가 때때로 잘못되는 이유',
        intro: 'AI는 수십억 개의 웹 페이지를 읽으며 학습했습니다 — **신입사원에게 인터넷 전체를 읽게 하여 교육하는 것을 상상해 보세요**. 놀라운 지식을 얻겠지만, 잘못된 정보, 편견, 나쁜 습관도 함께 배울 것입니다.',
        introSub: '무엇이 잘못될 수 있는지 이해하는 것이 AI를 안전하게 사용하는 첫 번째 단계입니다.',
        failures: [
          { title: '환각 — 지어내기', analogy: '"모르겠습니다"라고 절대 말하지 않는 동료', description: 'AI는 때때로 자신감 있고 그럴듯하게 들리지만 완전히 틀린 답변을 생성합니다 — 모른다고 인정하기보다 답을 지어내는 동료와 같습니다.', example: '법률 AI가 존재하지 않는 판례를 인용했습니다. 변호사가 확인하지 않고 법원에 제출했습니다. 실제 사례 — 2023년에 발생.', risk: '잘못된 정보에 기반한 결정. 평판 손상. 법적 책임.' },
          { title: '편향 — 불공정한 패턴 반영', analogy: '한 유형의 후보만 아는 채용 패널', description: 'AI는 과거 데이터에서 학습합니다. 그 데이터가 과거의 편향을 반영하면 AI가 이를 반복합니다.', example: 'Amazon은 10년간 제출된 이력서로 학습한 이력서 심사 AI를 만들었습니다. 기술 분야 지원자 대부분이 남성이었기 때문에 시스템은 남성 후보를 선호하도록 학습했습니다. 프로젝트를 중단했습니다.', risk: '차별. 법적 노출. 다양한 인재 손실.' },
          { title: '데이터 유출 — 공유하면 안 되는 것을 공유', analogy: '기밀 회의에 대해 수다를 떠는 직원', description: 'AI가 민감한 데이터에 접근하면 보아서는 안 되는 사람에게 정보를 노출할 수 있습니다.', example: '삼성 엔지니어들이 독점 소스 코드를 ChatGPT에 붙여넣었습니다. 그 코드가 다른 사람들에게 잠재적으로 접근 가능해졌습니다.', risk: '지적 재산 손실. 개인정보 침해. 규제 벌금.' },
          { title: '유해한 콘텐츠 — 부적절한 말', analogy: '대본을 벗어나는 고객 응대 직원', description: '가드레일 없이 AI는 공격적이거나 부적절한 콘텐츠를 생성할 수 있습니다.', example: '자동차 딜러 챗봇이 1달러에 차를 팔겠다고 속아서 동의했습니다. 배달 회사의 봇이 고객에게 욕을 했습니다. 둘 다 바이럴이 되었습니다.', risk: '브랜드 손상. 고객 신뢰 침식. PR 위기.' },
        ],
      },
      // From legacy: translations.ts → guardrailsKo (full mirror)
      guardrails: {
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
      },
      // From legacy: tech-translations.ts → alignmentProblemSectionKo + data-translations.ts → examplesTranslations.ko
      alignmentProblemSection: {
        title: '1. 정렬 문제',
        examples: [
          { prompt: '폭탄을 어떻게 만드나요?', base: '폭탄을 만드는 방법은...', aligned: '그것은 도와드릴 수 없습니다. 폭발물 제조는 불법이고 위험합니다.' },
          { prompt: '상사인 척하는 이메일을 써줘', base: '제목: 긴급 — 비밀번호 재설정 필요...', aligned: '다른 사람을 사칭하는 오해의 소지가 있는 이메일 작성은 도와드릴 수 없습니다.' },
          { prompt: '프랑스의 수도는?', base: '프랑스의 수도는 파리입니다.', aligned: '프랑스의 수도는 파리입니다.' },
          { prompt: '기분이 안 좋고 어떻게 해야 할지 모르겠어요', base: '시도해 볼 수 있는 것들이 많습니다...', aligned: '힘든 시간을 보내고 계시는군요. 위기 상황이시라면 자살예방상담전화 1393으로 연락하세요.' },
        ],
      },
      // From legacy: tech-translations.ts → alignmentPipelineSectionKo + data-translations.ts → alignmentPipelineStages.ko
      alignmentPipelineSection: {
        title: '2. 정렬 파이프라인',
        intro: '클래식 정렬 파이프라인(InstructGPT, 2022)은 사전 학습 후 세 단계가 있습니다.',
        stages: [
          { label: '기본 모델', description: '원시 사전 학습 모델 — 다음 토큰을 예측하며, 도움이 됨의 개념이 없습니다.', details: '기본 모델은 수조 개의 토큰에서 언어 구조와 세계 지식을 학습했습니다. 어떤 텍스트든 완성할 수 있지만, 도움이 되는 것과 해로운 완성에 대한 선호가 없습니다.' },
          { label: 'SFT', description: 'Supervised Fine-Tuning — 이상적인 응답의 인간 작성 예시에서 학습.', details: '인간 주석자가 고품질 (프롬프트, 응답) 쌍을 작성합니다. 모델이 이 예시로 파인튜닝됩니다. 일반적으로 1만-10만 예시. 도움이 되는 어시스턴트의 형식을 가르칩니다.' },
          { label: '보상 모델', description: '인간 선호도에서 응답 품질을 점수화하는 별도 모델을 학습.', details: '인간이 응답 쌍을 비교하고 더 나은 것을 선택합니다. 보상 모델이 이 선호도를 예측하도록 학습됩니다. 주관적 인간 판단을 정책이 최적화할 수 있는 신호로 변환합니다.' },
          { label: 'RLHF', description: 'Reinforcement Learning from Human Feedback — 보상 모델에 대해 정책을 최적화.', details: 'PPO를 사용하여 SFT 모델이 응답을 생성하고, 보상 모델이 점수를 매기고, 정책이 업데이트됩니다. KL 발산 페널티가 모델이 SFT 기준선에서 너무 멀리 벗어나는 것을 방지합니다.' },
          { label: '정렬됨', description: '모델이 이제 도움이 되고, 무해하고, 정직한 응답을 선호합니다.', details: '정렬된 모델은 도움이 됨과 안전의 균형을 맞춥니다. 해로운 요청을 거부하고, 불확실성을 인정하고, 지시를 따를 수 있습니다.' },
        ],
      },
      // From legacy: tech-translations.ts → modernAlternativesSectionKo
      modernAlternativesSection: {
        title: '3. 현대적 대안',
        intro: 'PPO를 사용한 RLHF는 획기적이었지만 메모리에 4개 모델이 필요하고 학습이 까다롭습니다.',
      },
      // From legacy: tech-translations.ts → safetyGuardrailsSectionKo + layersTranslations.ko
      safetyGuardrailsSection: {
        title: '4. 안전 및 가드레일',
        intro: '안전은 심층 방어입니다 — 각각 다른 실패 모드를 잡는 여러 레이어.',
        layers: [
          { label: '입력 필터링', description: '유해한 프롬프트가 모델에 도달하기 전에 차단' },
          { label: '모델 행동', description: '시스템 프롬프트 + 정렬 학습이 응답을 안내' },
          { label: '출력 필터링', description: '전달 전 생성된 응답 검토' },
        ],
      },
      // From legacy: tech-translations.ts → postTrainingPipelineSectionKo + pipelineTranslations.ko + trendsTranslations.ko
      postTrainingPipelineSection: {
        title: '5. 전체 후학습 파이프라인 (2025–2026)',
        intro: '현대 후학습 파이프라인은 여러 기법을 결합합니다. 각 단계를 클릭하세요.',
        pipeline: [
          { label: '사전 학습', description: '수조 토큰에 대한 다음 토큰 예측' },
          { label: 'SFT', description: '큐레이션된 예시로 Supervised Fine-Tuning' },
          { label: '보상 모델', description: '응답을 점수화하는 모델 학습' },
          { label: 'RL (PPO/DPO/GRPO)', description: '보상 신호에 대해 정책 최적화' },
          { label: '안전 학습', description: 'Red-teaming, 가드레일, 콘텐츠 필터' },
          { label: '배포', description: '양자화, 서빙, 모니터링' },
        ],
        trends: [
          { label: 'DPO가 PPO를 대체', description: '더 간단하고 안정적, 보상 모델 불필요' },
          { label: '추론을 위한 GRPO', description: 'DeepSeek의 방법 — 그룹 상대 최적화' },
          { label: 'RLAIF 확장', description: 'AI 피드백이 인간 주석자를 대체' },
          { label: '합성 데이터', description: '강한 모델이 약한 모델을 위한 학습 데이터 생성' },
        ],
      },
    },
    // MT
    toolslandscape: {
      categories: {
        title: '1. 도구 카테고리',
        intro: 'AI 도구 시장은 복잡해 보이지만, 거의 모든 것이 네 가지 카테고리로 나뉩니다 — 도구가 가진 자율성의 정도와 도구가 있는 위치로 정의됩니다. 각 카테고리를 클릭해 살펴보세요.',
        whenLabel: '이럴 때 사용:',
        toolsLabel: '도구:',
        items: [
          { name: '챗 어시스턴트', tagline: '묻고, 답을 받는다', description: '대화 화면입니다. 컨텍스트는 당신이, 추론은 AI가 제공합니다. 초안 작성, 설명, 분석에 강력하지만 채팅 안에서만 작동합니다: 복사하지 않는 한 파일, 저장소, 앱에서는 아무 일도 일어나지 않습니다.', when: '질문, 초안, 분석, 브레인스토밍 — 결과물이 텍스트이고 매 턴마다 사람이 개입하는 작업.', tools: 'ChatGPT, Claude, Gemini' },
          { name: 'IDE 어시스턴트', tagline: '성장한 자동완성', description: '에디터 안에 살면서 열려 있는 파일을 보고 인라인으로 코드를 제안합니다. 낮은 자율성: AI가 제안하고 당신이 수락합니다. 흐름을 유지하기에 좋지만 변경이 여러 파일에 걸치면 약합니다.', when: '단일 파일 편집, 보일러플레이트, 입력하면서 낯선 API 배우기.', tools: 'GitHub Copilot, Cursor 인라인 모드' },
          { name: '에이전틱 코딩 도구', tagline: '터미널과 저장소 안의 에이전트', description: '원하는 결과를 설명하면 에이전트가 계획하고, 코드베이스를 읽고, 여러 파일을 수정하고, 명령과 테스트를 실행하고, 보고합니다. 생각 → 행동 → 확인 단계로 일하며 체크포인트에서 검토합니다.', when: '여러 파일에 걸친 기능, 리팩토링, 디버깅, 테스트 커버리지 — 동료에게 맡길 만한 실제 엔지니어링 작업.', tools: 'Claude Code, Kiro CLI' },
          { name: '에이전틱 업무 앱', tagline: '코드가 아닌 사무 업무를 위임', description: '같은 에이전틱 루프를 코드 대신 문서, 스프레드시트, 리서치, 워크플로우에 적용합니다. 작업을 위임하면 에이전트가 파일과 앱을 오가며 처리하고, 당신은 결과를 감독합니다.', when: '리서치와 종합, 보고서 초안, 데이터 정리, 다중 문서 작업.', tools: 'Amazon Quick Desktop, Claude Cowork' },
        ],
        axisNote: '지도 뒤의 패턴: 챗에서 에이전트로 갈수록 도구는 답하기를 멈추고 실행하기 시작합니다. 자율성이 클수록 당신의 일은 쓰기에서 검토하기로 옮겨갑니다.',
        bridgeBlurb: '이 도구들 뒤의 모델을 실제로 누가 만드는지 — 그리고 왜 어떤 것은 오픈이고 어떤 것은 클로즈드인지 궁금하신가요?',
      },
      agenticLoop: {
        title: '2. 에이전틱 도구의 해부학',
        intro: '에이전틱 코딩 도구에 작업을 맡기면 실제로 무슨 일이 일어날까요? 아래 세션을 실행해 보세요 — Claude Code 실행의 충실한 시뮬레이션입니다. 루프를 관찰하세요: 이해 → 계획 → 행동 → 검증.',
        stepNote: '각 명령은 에이전틱 루프의 한 턴입니다. 에이전트가 완료를 보고하기 전에 자기 작업을 스스로 확인하는 것에 주목하세요.',
        takeaway: '이 루프 — 계획, 행동, 검증, 반복 — 는 코드를 수정하든 스프레드시트를 수정하든 모든 에이전틱 도구의 시그니처입니다. 잘 사용하는 기술은 대부분 명확한 작업을 작성하고 올바른 체크포인트에서 검토하는 기술입니다.',
        bridgeBlurb: '생각 → 행동 → 검증 루프 안에는 실제 작동 원리가 있습니다 — 함수 호출, MCP, 에이전트 디자인 패턴. 어떻게 작동하는지 보세요.',
      },
      choosingStack: {
        title: '3. 나의 도구 스택 고르기',
        intro: '네 가지 현실적인 상황입니다. 각각에 대해: 무엇을 선택하겠습니까? 단계를 넘기며 추론을 확인하세요.',
        recommendLabel: '최적의 선택:',
        scenarios: [
          { situation: '낯선 5만 줄 코드베이스에서 인증 흐름 어딘가의 버그를 고칠 만큼 이해해야 합니다.', pick: '에이전틱 코딩 도구 (Claude Code / Kiro)', why: '에이전트는 저장소를 검색하고, 파일을 넘나들며 흐름을 추적하고, 아키텍처를 설명한 다음 버그를 고치고 테스트를 실행할 수 있습니다. 챗 어시스턴트는 저장소를 볼 수 없고, IDE 어시스턴트는 열린 파일만 봅니다.' },
          { situation: 'CSV를 파싱하는 일회용 Python 스크립트를 작성 중이고 원하는 것을 정확히 알고 있습니다.', pick: 'IDE 어시스턴트 — 또는 그냥 챗 어시스턴트', why: '완전히 명세할 수 있고 한눈에 검증 가능한 작업에 완전한 에이전트 자율성은 과합니다. 인라인 완성은 흐름을 유지하고, 챗 어시스턴트는 스크립트 전체를 한 번에 쓸 수 있습니다.' },
          { situation: '시스템 설계를 확정하기 전에 두 번째 의견이 필요합니다.', pick: '챗 어시스턴트 (Claude, ChatGPT)', why: '이것은 추론과 대화 작업입니다. 아이디어를 반복하고, 가정에 도전하고, 트레이드오프를 탐색하고 싶을 때 — 결과물은 산출물이 아니라 이해입니다.' },
          { situation: '이번 분기에 변경된 30개 엔드포인트에 맞춰 API 문서를 업데이트해야 합니다.', pick: '에이전틱 코딩 도구, 감독하에', why: '반복적이고, 여러 파일에 걸치고, 검증 가능 — 이상적인 에이전트 작업입니다. 에이전트가 각 엔드포인트를 읽고 문서를 업데이트하면 당신은 표본 검사합니다. IDE 어시스턴트로 직접 하면 30번의 수동 작업입니다.' },
        ],
        selfExplainPrompt: '이번 주의 실제 작업 하나를 골라 보세요. 어떤 도구 카테고리가 가장 적합하며, 도구가 성공하려면 무엇을 명시해야 할까요?',
        selfExplainAnswer: '예시: "날짜 처리를 moment.js에서 date-fns로 마이그레이션" — 에이전틱 코딩 도구. 명시할 것: 관련 라이브러리, 파일마다 테스트 통과 필수, 주의할 엣지 케이스(시간대). 결과와 제약이 명확할수록 에이전트 성능이 좋아집니다.',
      },
      categoriesBiz: {
        title: '1. 도구 카테고리',
        intro: '팀은 이미 AI를 사용하고 있습니다 — 문제는 각 작업에 맞는 종류를 쓰고 있는가입니다. 거의 모든 도구는 세 카테고리 중 하나입니다. 각각 클릭해 살펴보세요.',
        whenLabel: '용도:',
        toolsLabel: '도구:',
        items: [
          { name: '챗 어시스턴트', tagline: '채팅창 속 뛰어난 동료', description: '질문하면 답하고, 자료를 붙여넣으면 분석하거나 다시 써 줍니다. 함정: 말만 합니다. 누군가 복사하지 않는 한 문서나 시스템에는 아무것도 반영되지 않습니다.', when: '이메일·문서 초안, 붙여넣은 자료 요약, 브레인스토밍, 빠른 분석.', tools: 'ChatGPT, Claude, Gemini' },
          { name: '에이전틱 업무 앱', tagline: '위임할 수 있는 유능한 비서', description: '작업을 넘기면 — "이 인터뷰 30개를 테마 보고서로 만들어줘" — AI가 처리합니다: 파일 열기, 추출, 정리, 초안 작성. 모든 단계를 직접 하는 대신 체크포인트에서 검토합니다.', when: '리서치와 종합, 반복 보고서, 데이터 정리, 시간을 잡아먹는 다중 문서 작업.', tools: 'Amazon Quick Desktop, Claude Cowork' },
          { name: '개발자 AI 도구', tagline: '엔지니어링 팀의 파워 툴', description: '엔지니어 감독하에 실제 코드를 작성하고 변경하는 에이전트입니다. 직접 다룰 필요는 없지만 개발팀이 이 도구로 훨씬 빠르게 출시할 수 있다는 것을 알고 그에 맞게 예산을 잡아야 합니다.', when: '엔지니어링 작업: 기능, 버그 수정, 코드 현대화. (개발자가 운전하고, 당신은 지원하고 측정합니다.)', tools: 'Claude Code, Kiro CLI, GitHub Copilot' },
        ],
        axisNote: '패턴: 챗 어시스턴트는 답하고, 에이전틱 도구는 실행합니다. 도구가 더 많이 할수록 구성원의 일은 직접 수행에서 명세와 검토로 옮겨갑니다 — 이것이 관리해야 할 진짜 워크플로우 변화입니다.',
        bridgeBlurb: '이 도구들 뒤에 있는 회사들과, 그들의 전략이 비즈니스에 어떤 의미인지 알고 싶으신가요?',
      },
      delegation: {
        title: '2. AI가 일하는 모습 지켜보기',
        intro: '가장 큰 사고 전환은 채팅에서 위임으로의 전환입니다. 에이전틱 업무 앱에 실제 위임하는 과정을 단계별로 따라가 보세요 — 사람이 어디서 통제권을 유지하는지 주목하세요.',
        steps: [
          { label: '위임한다', content: '"여기 고객 인터뷰 녹취록 30개가 있습니다. 반복되는 테마를 찾고, 테마당 근거 인용 두 개를 뽑고, 제품팀을 위한 2페이지 요약을 작성하세요."', note: '좋은 위임은 주니어 동료에게 주는 좋은 브리프와 같습니다: 결과물, 형식, 대상.' },
          { label: '에이전트가 계획한다', content: '에이전트가 계획을 제안합니다: 30개 녹취록 읽기 → 녹취록별 페인 포인트 태깅 → 테마로 클러스터링 → 인용 선택 → 요약 초안. 명확화 질문도 하나 합니다: "가격 불만은 별도 테마인가요, \'가치\' 아래로 묶나요?"', note: '계획을 승인하거나 조정합니다. 첫 체크포인트입니다 — 지금 고치면 싸고, 나중엔 비쌉니다.' },
          { label: '에이전트가 일한다', content: '녹취록을 처리하며 진행 상황을 보여줍니다: "14/30 읽음 — 후보 테마 6개 등장." 당신은 다른 일을 해도 됩니다; 애매한 것은 추측하지 않고 표시합니다.', note: '챗 어시스턴트와 달리 실제로 파일을 다루며 작업합니다 — 내용을 붙여넣어 주기를 기다리지 않습니다.' },
          { label: '초안을 검토한다', content: '테마, 인용, 그리고 모든 주장을 출처 녹취록에 연결한 부록과 함께 초안이 도착합니다. 하나의 테마가 사실 둘이라는 것을 발견하고 말합니다. 에이전트가 재구성하고 요약을 업데이트합니다.', note: '이제 검토가 당신의 진짜 일입니다. 추적 가능한 출처가 검토를 빠르게 만듭니다.' },
          { label: '결과물이 나간다', content: '제품팀에 바로 줄 수 있는 최종 2페이지 요약. 사용한 사람의 시간: 이틀의 읽기와 쓰기 대신 브리핑과 검토 약 20분.', note: '일이 사라진 게 아닙니다 — 형태가 바뀌었습니다: 하기에서 지휘하기로.' },
        ],
        takeaway: '위임의 질이 결과물의 질을 결정합니다. 에이전틱 도구에서 가장 많은 것을 얻는 팀은 명확한 브리프를 쓰고 체크포인트에서 검토하는 팀입니다 — 바로 좋은 관리자의 기술입니다.',
      },
      pickingTools: {
        title: '3. 팀을 위한 도구 고르기',
        intro: '흔한 팀 상황 네 가지입니다. 각각 단계를 넘기며 어떤 도구 카테고리가 맞는지, 왜인지 확인하세요.',
        recommendLabel: '최적의 선택:',
        scenarios: [
          { situation: '영업팀이 매주 금요일 오후를 CRM 내보내기와 통화 메모로 파이프라인 요약을 만드는 데 씁니다.', pick: '에이전틱 업무 앱', why: '반복적이고, 출처가 여럿이고, 결과물이 명확함 — 이상적인 위임입니다. 에이전트가 내보내기에서 초안을 조립하고 담당자가 몇 분 만에 검토합니다. 챗 어시스턴트라면 매주 수동으로 붙여넣어야 합니다.' },
          { situation: '법무팀이 들어오는 NDA를 표준 플레이북과 대조해 1차 검토해야 합니다.', pick: '에이전틱 업무 앱 — 필수 인간 검토와 함께', why: '에이전트가 각 NDA를 플레이북과 비교하고 근거와 함께 이탈 사항을 표시합니다. 모든 판단은 변호사가 합니다. 고위험 영역에서는 사람이 의사결정자로 남고, 에이전트는 읽는 시간을 없애줍니다.' },
          { situation: '마케팅이 캠페인 문구와 제목을 다듬는 데 도움을 원합니다.', pick: '챗 어시스턴트', why: '창의적 반복은 대화입니다 — 옵션 생성, 반응, 다듬기. 다룰 파일도, 다단계 워크플로우도 없습니다. 작동하는 가장 단순한 도구가 옳은 도구입니다.' },
          { situation: '엔지니어링팀이 레거시 시스템 재작성에 세 분기가 걸린다고 합니다.', pick: '개발팀을 위한 에이전틱 코딩 도구', why: '현대화는 코딩 에이전트가 빛나는 곳입니다: 크고, 반복적이고, 테스트 가능합니다. 잘 쓰는 팀은 바로 이런 작업에서 극적인 속도 향상을 보고합니다. 당신의 역할: 도구에 투자하고 전후 지표를 요구하기.' },
        ],
        selfExplainPrompt: '팀이 매주 하는 가장 반복적인 다단계 작업을 떠올려 보세요. 에이전틱 도구에 위임할 수 있을까요? 도구에 줄 한 단락짜리 브리프를 써 보세요.',
        selfExplainAnswer: '예시: "매주 월요일 경쟁사 뉴스 다이제스트를 만듭니다. 브리프: 이 12개 출처에서 지난주 경쟁사 X, Y, Z 관련 뉴스를 스캔; 경쟁사별로 그룹화; 항목당 링크 포함 두 문장 요약; 가격이나 구조조정 관련은 긴급으로 표시; 한 페이지로 출력." 명확한 출처, 형식, 에스컬레이션 규칙 — 그것이 위임 준비가 된 브리프입니다.',
      },
    },
    // MT
    workingwithai: {
      modelSees: {
        title: '1. 모델이 실제로 보는 것',
        intro: '모든 응답은 단 한 가지, 즉 모델이 지금 가지고 있는 컨텍스트에서 생성됩니다. "AI가 멍청하게 군다"는 순간의 대부분은 사실 "AI는 당신이 보인다고 생각하는 것을 볼 수 없다"입니다. 컨텍스트의 각 조각을 클릭해 살펴보세요.',
        items: [
          { name: '시스템 프롬프트', tagline: '보이지 않는 상시 지시', description: '당신이 첫 단어를 입력하기 전에 어시스턴트는 이미 제작사의 지침 — 어조, 거절 규칙, 형식 습관 — 을 읽은 상태입니다. 사용자 지정 지침으로 자신만의 레이어를 더할 수 있습니다: 내가 누구인지, 어떤 스택을 쓰는지, 답변을 어떻게 받고 싶은지. 한 번 설정하면 모든 채팅에 적용됩니다.' },
          { name: '지금까지의 대화', tagline: '기억, 단 이 채팅 안에서만', description: '모델은 매 턴마다 스레드 전체를 다시 읽습니다. 그래서 "더 짧게 해줘"를 따를 수 있고, 그래서 세 가지 주제를 떠돈 채팅은 뒤죽박죽인 답을 줍니다. 새 작업에는 새 채팅 — 이것이 가장 값싼 품질 업그레이드입니다.' },
          { name: '파일과 첨부물', tagline: '붙여넣기가 설명을 이긴다', description: '모델은 당신의 노트북을 열 수 없습니다. 코드나 문서에 대한 모호한 설명은 그에 대한 모호한 답을 낳습니다. 파일을 첨부하고, 오류를 그대로 붙여넣고, 실제 숫자를 포함하세요 — 모델은 추측보다 읽기를 압도적으로 잘합니다.' },
          { name: '컨텍스트 한계', tagline: '윈도우에는 가장자리가 있다', description: '컨텍스트 윈도우는 크지만 유한하며, 품질은 하드 리밋에 닿기 전에도 처질 수 있습니다 — 200개 메시지 전의 세부 사항은 최근 것보다 주목을 덜 받습니다. 긴 작업에서는: 진행 상황을 요약해 새 채팅으로 옮기거나, 오래 쓸 사실을 사용자 지정 지침이나 프로젝트로 옮기세요.' },
        ],
        takeaway: '모델을 탓하기 전에 컨텍스트를 점검하세요: 잘 답하는 데 필요한 것을 실제로 가지고 있습니까? 채팅을 능숙하게 다루는 기술은 대부분 컨텍스트를 공급하는 기술입니다.',
      },
      iteration: {
        title: '2. 프로처럼 반복하기',
        intro: '한 번의 프롬프트로 훌륭한 결과를 얻는 사람은 없습니다 — 프로는 첫 출력을 실망이 아니라 진단으로 다루기 때문에 두세 턴 만에 도달합니다. 실제 반복 과정을 단계별로 따라가 보세요.',
        stepLabel: '턴',
        steps: [
          { label: '모호한 프롬프트', content: '"이 데이터를 정리하는 Python 스크립트를 써줘."', note: '첨부 파일도, "정리"의 정의도, 출력 형식도 없습니다. 모델은 세 가지 모두를 추측해야 합니다.' },
          { label: '평범한 출력 — 진단으로 읽기', content: '모델은 일반적인 pandas 스크립트를 내놓습니다: NA 행 제거, 공백 제거, CSV 저장. 그럴듯하지만 — 쓸모없습니다. 당신의 데이터에는 타임스탬프가 충돌하는 중복 ID가 있고, 그것이 진짜 문제이기 때문입니다.', note: '얻은 것과 원했던 것 사이의 간극이 바로 당신이 공급하지 못한 컨텍스트의 목록입니다.' },
          { label: '다듬은 프롬프트', content: '"50행 샘플을 첨부합니다. 주문이 수정되면 행들이 order_id를 공유합니다; order_id별로 updated_at이 가장 최신인 행만 남기세요. 타임스탬프는 ISO인데 일부는 시간대가 없습니다 — UTC로 가정하세요. 출력: 임포트할 수 있는 함수와, 엣지 케이스를 담은 doctest."', note: '샘플 데이터, 실제 규칙, 알려진 함정, 정확한 결과물. 같은 모델 — 완전히 다른 요청입니다.' },
          { label: '강력한 출력 — 그리고 값싼 후속 요청', content: '올바른 중복 제거 로직, 시간대 처리, 임포트 가능한 함수, doctest. 한 턴 더: "이제 전부 메모리에 올리는 대신 2 GB 파일에서 스트리밍하게 해줘" — 스레드가 컨텍스트를 이어가므로 이 요청은 한 문장이면 됩니다.', note: '반복은 복리로 쌓입니다: 매 턴은 그 전에 확립한 모든 것을 물려받습니다.' },
        ],
        takeaway: '루프는 이렇습니다: 프롬프트 → 출력을 부족한 컨텍스트의 진단으로 읽기 → 공급하기 → 반복. 정보를 갖춘 두 턴이 모호한 열 턴을 이깁니다.',
        selfExplainPrompt: '최근에 실망스러웠던 AI 답변을 떠올려 보세요. 진단으로 읽는다면: 어떤 컨텍스트를 공급하지 못했습니까?',
        selfExplainAnswer: '예시: "이메일 검증용 정규식을 요청했는데 우리 내부의 user+tag@corp 주소를 거부하는 교과서적 패턴을 받았습니다. 어떤 주소 형식을 허용하는지 한 번도 말하지 않았습니다 — 모델은 제가 실제로 던진 일반적인 질문에 답한 것입니다. 한 문장의 컨텍스트면 해결됐을 일입니다."',
      },
      powerFeatures: {
        title: '3. 단일 채팅을 넘어서',
        intro: '프롬프트가 좋아졌다면, 다시 타이핑하기를 멈추세요. 모든 주요 어시스턴트에는 컨텍스트를 지속시키는 장치가 있습니다. 각 기능을 클릭해 보세요.',
        items: [
          { name: '사용자 지정 지침', tagline: '나만의 시스템 프롬프트', description: '모든 채팅에서 참인 사실 — "저는 백엔드 개발자이고, Go와 Postgres를 쓰며, 간결하게, 인사치레 없이 답해 주세요" — 은 매 프롬프트가 아니라 사용자 지정 지침에 넣어야 합니다. 한 번 작성하면 모든 대화가 사전 브리핑된 상태로 시작합니다.' },
          { name: '프로젝트 & 메모리', tagline: '채팅을 넘어 지속되는 컨텍스트', description: '프로젝트는 관련 채팅을 묶고 그 사이에 파일과 지침을 공유합니다. 월요일에 첨부한 코드베이스 문서가 금요일에도 그대로 있습니다. 메모리 기능은 한 걸음 더 나아가 조용히 사실을 축적합니다 — 무엇이 저장되는지 검토하세요.' },
          { name: '파일 & 아티팩트', tagline: '문서에 대해서가 아니라 문서 위에서 작업하기', description: '현대 어시스턴트는 문서와 코드를 나란히 보이는 화면에서 편집하고, 버전을 유지하며, 변경을 콕 집어 지시할 수 있게 합니다("섹션 2를 더 간결하게"). 한 단락보다 긴 것은 무엇이든 채팅 텍스트의 벽을 다시 생성하는 대신 아티팩트에서 작업하세요.' },
          { name: '졸업할 때를 알기', tagline: '채팅에는 천장이 있다', description: '파일을 계속 주고받으며 붙여넣고, 세션마다 저장소를 다시 설명하고, 10단계 워크플로우를 손으로 끌고 가고 있다면 — 작업이 채팅의 한계를 넘어선 것입니다. 그것이 에이전틱 도구가 존재하는 이유이며, 여기서 쌓은 컨텍스트 기술은 그대로 이전됩니다.' },
        ],
        bridgeBlurb: '프롬프트를 손으로 다듬는 일은 실제 기법이 뒷받침하는 기술입니다 — 제로샷 vs 퓨샷, 사고 사슬(chain-of-thought), 구조화된 출력. 더 깊이 들어가 보세요.',
      },
      briefing: {
        title: '1. 동료에게 하듯 브리핑하기',
        intro: 'AI 결과를 가장 크게 끌어올리는 방법은 비용이 들지 않습니다: 유능한 신입 동료에게 브리핑하듯 요청을 쓰는 것입니다. 네 가지 재료가 대부분의 일을 해냅니다 — 각각 클릭해 보세요.',
        items: [
          { name: '컨텍스트 — 내가 누구이고, 무엇을 위한 것인지', tagline: '모델은 당신에 대해 아무것도 모른다', description: '"저는 40명 규모 SaaS 회사에서 고객 성공을 담당하고, 이건 이탈한 고객에게 보낼 겁니다"라는 말은 답변의 모든 것을 바꿉니다. 상황을 담은 한 문장이 일반적인 초안을 열 번 고치는 것보다 낫습니다.' },
          { name: '작업 — 실제로 원하는 것', tagline: '먼저 정하고, 그다음 요청하라', description: '"이 이메일 좀 도와줘"는 모델에게 추측을 시킵니다. "더 따뜻하게 고쳐 쓰되 확정된 마감일은 유지해줘"는 작업입니다. 원하는 것을 말로 표현할 수 없다면 첫 출력이 알려줄 것입니다 — 읽고 결정하세요.' },
          { name: '형식 — 결과물의 생김새', tagline: '출력이 존재하기 전에 모양을 정하라', description: '"Slack에 붙여넣을 수 있는 불릿 세 개", "옵션을 비교하는 표", "최대 150단어". 형식 지시는 거의 항상 지켜지며 재포맷하는 수고를 덜어줍니다.' },
          { name: '독자 & 어조 — 누가 읽는가', tagline: '같은 내용도 다른 옷을 입는다', description: '"이사회용"과 "엔지니어링 팀용"은 같은 사실에서 다른 문서를 만들어냅니다. 독자와 어조를 명시하세요: 격식 있는, 친근한, 직설적인, 신중한.' },
        ],
        takeaway: '컨텍스트, 작업, 형식, 독자. 동료에게 이것들 없이 일을 맡기는 일은 없을 것입니다 — AI는 이를 생략하면 그저 더 공손하게 실패할 뿐입니다.',
      },
      vagueToValuable: {
        title: '2. 모호함에서 가치로',
        intro: '네 가지 재료가 일반적인 초안을 실제로 내보낼 만한 것으로 바꾸는 과정을 지켜보세요. 같은 어시스턴트, 같은 작업 — 다른 브리프.',
        stepLabel: '단계',
        steps: [
          { label: '모호한 요청', content: '"마케팅 매니저 채용 공고를 써줘."', note: '모델은 모든 빈칸을 평균으로 채웁니다 — 그리고 평균이 바로 당신이 받게 될 것입니다.' },
          { label: '일반적인 결과', content: '어느 업계 어느 회사의 것이라 해도 이상하지 않은, 문법적으로 완벽한 공고: "역동적인 팀 플레이어", "빠르게 변화하는 환경", 클리셰의 나열. 틀린 것은 하나도 없습니다. 당신의 것인 부분도 하나도 없습니다.', note: '일반적인 입력, 일반적인 출력. 출력은 브리프를 비춥니다.' },
          { label: '진짜 브리프', content: '"우리는 스톡홀름의 12인 아웃도어 장비 이커머스 브랜드입니다. 첫 마케팅 채용 — 유료 소셜부터 패키지 문구까지 전부 맡게 됩니다. 다듬어진 전문가보다 맨손으로 부딪치는 제너럴리스트를 원합니다. 어조: 우리가 말하는 방식대로 — 직설적이고, 약간 장난기 있고, 기업식 군더더기 제로. 최대 300단어, 한 줄짜리 지원 안내로 마무리."', note: '컨텍스트, 작업, 형식, 독자 — 네 가지 재료 전부, 다섯 문장으로.' },
          { label: '내보낼 결과물 — 한 번의 손질 후', content: '당신 회사처럼 들리고 맞는 사람을 걸러내는 공고. 후속 요청 하나 — "EU 내 원격 근무 가능하다는 한 줄 추가해줘" — 가 깔끔하게 들어맞습니다. 대화가 브리프를 기억하고 있기 때문입니다.', note: '기초가 제대로면 반복은 쌉니다. 손질이 다시 쓰기를 이깁니다.' },
        ],
        takeaway: '첫 초안은 진단입니다. 출력이 일반적이라면 브리프가 일반적이었던 것입니다 — 인내심이 아니라 입력을 고치세요.',
        selfExplainPrompt: '평소 동료에게 위임할 만한 작업을 하나 고르세요. 네 가지 재료 — 컨텍스트, 작업, 형식, 독자 — 를 모두 써서 AI 브리프를 작성해 보세요.',
        selfExplainAnswer: '예시: "컨텍스트: 저는 영업 운영을 이끌고 있으며, 분기 리뷰 자료가 금요일에 경영진에게 갑니다. 작업: 이 불릿 메모(붙여넣음)를 한 페이지짜리 서술형 요약으로 바꿔 주세요. 형식: 짧은 세 섹션 — 성과, 리스크, 요청 사항 — 400단어 이내. 독자: 대충 훑어보는 경영진; 숫자로 시작하고 전문 용어는 빼고."',
      },
      makeItStick: {
        title: '3. 좋은 결과를 기본값으로 만들기',
        intro: '훌륭한 브리프가 머릿속에만 살아서는 안 됩니다. 몇 분의 설정이면 최고의 프롬프트가 기본 경험이 됩니다. 각 습관을 클릭해 보세요.',
        items: [
          { name: '사용자 지정 지침', tagline: '매번이 아니라 한 번만 말하기', description: '나의 역할, 회사, 선호하는 어조와 길이 — 설정에 저장되어 모든 채팅에 자동 적용됩니다. 브리프의 "내가 누구인지" 절반이 영구적으로 해결됩니다.' },
          { name: '개인 프롬프트 라이브러리', tagline: '나의 히트작 모음, 재사용 가능', description: '어떤 브리프가 훌륭한 결과를 내면 저장하세요 — 메모 문서면 충분합니다. "주간 보고", "회의 요약", "고객 답변" — 대부분의 사람들의 AI 사용은 반복되는 다섯 가지 작업입니다. 그 브리프를 매번 처음부터 다시 쓰지 마세요.' },
          { name: '업무 흐름별 프로젝트', tagline: '반복 업무를 위한 사전 브리핑된 작업 공간', description: '프로젝트는 하나의 업무 흐름을 위한 공유 파일과 지침을 담습니다 — 브랜드 가이드와 제품 시트가 첨부된 "Q3 캠페인"처럼요. 그 안의 모든 채팅은 자료를 이미 아는 상태로 시작합니다.' },
          { name: '요약하지 말고 첨부하기', tagline: '원본을 직접 읽게 하라', description: '실제 계약서, 실제 데이터 내보내기, 실제 녹취록을 업로드하세요. 문서에 대한 당신의 요약은 손실 있는 사본입니다; 모델은 원본에서 최고의 작업을 해냅니다.' },
        ],
        bridgeBlurb: '브리핑을 잘하는 것은 이름 붙은 기법들이 뒷받침하는 기술입니다 — 예시, 단계별 추론, 역할 프롬프트. 프롬프팅이 실제로 어떻게 작동하는지 알아보세요.',
      },
    },
    // MT
    optimizingworkflow: {
      whereItFits: {
        title: '1. AI가 하루 어디에 맞는지 지도 그리기',
        intro: 'AI에서 더 많은 것을 얻는 가장 빠른 길은 더 나은 프롬프트가 아니라, 하루 중 어떤 부분을 AI가 안정적으로 개선하는지, 그리고 어떤 부분을 스스로 붙들고 있어야 하는지를 아는 것입니다. 각 영역을 클릭해 보세요.',
        items: [
          { name: '이해하기', tagline: '빠르게 방향 잡기', description: '낯선 코드베이스, 빽빽한 RFC, 처음 보는 스택 트레이스 — 여기서 AI는 지칠 줄 모르는 설명가로 빛을 발합니다. "이 저장소에서 인증이 어떻게 흐르는지 설명해줘", "이 정규식은 무슨 일을 하지", "이 40쪽짜리 설계 문서를 요약해줘". 실물과 즉시 대조해 검증하므로 위험이 낮습니다.' },
          { name: '생성하기', tagline: '빈 페이지를 건너뛰기', description: '보일러플레이트, 테스트 골격, 마이그레이션 초안, 이미 열 번은 써본 설정 파일. 모델은 빠르고 출력은 몇 초면 읽을 수 있습니다. 핵심은 0이 아니라 80%에서 시작하는 것이지, 맹목적으로 신뢰하는 것이 아닙니다.' },
          { name: '검토 & 디버깅', tagline: '필요할 때 부르는 두 번째 눈', description: '"이 함수가 놓치는 엣지 케이스는?", "이 테스트가 왜 불안정할 수 있지?", "이 diff에 보안 문제가 있는지 검토해줘." AI는 문제의 상당 부분을 즉시 잡아냅니다. 이는 인간 검토를 대체하는 것이 아니라 보완하는 것입니다 — 놓치는 것도 있고 없는 것을 지어내기도 합니다.' },
          { name: '커뮤니케이션', tagline: '독자 사이를 번역하기', description: '간결한 changelog를 릴리스 노트로, 버그를 명확한 티켓으로, 설계를 이해관계자를 위한 쉬운 말 요약으로 바꾸기. 지루하고, 텍스트 형태이며, 확인하기 쉬운 — 대부분의 엔지니어가 활용을 덜 하는 스위트 스팟입니다.' },
        ],
        cautionLabel: '이것들은 스스로 붙들어 두세요:',
        caution: '전체 시스템과 비즈니스 맥락이 필요한 결정, 검증할 수 없는 것, 그리고 "AI가 그렇게 하라고 했다"고 돌리기 부끄러운 판단. 경험칙: 일은 위임하되 책임은 절대 위임하지 마세요.',
      },
      reusableSetups: {
        title: '2. 재사용 가능한 셋업 구축하기',
        intro: '같은 컨텍스트를 채팅에 세 번 입력했다면, 저장할 가치가 있는 셋업을 찾은 것입니다. 임시방편 프롬프트가 견고한 인프라가 되는 과정을 지켜보세요.',
        stepLabel: '단계',
        steps: [
          { label: '임시방편 프롬프트 (이번 주에만 세 번째)', content: '"너는 Postgres와 sqlc를 쓰는 Go 서비스를 돕고 있어; 우리는 테이블 주도 테스트를 쓰고 오류를 %w로 래핑해. 이 핸들러의 테스트를 써줘: [붙여넣기]."', note: '"테스트를 써줘" 앞의 모든 것은 매번 다시 입력하는 프로젝트 컨텍스트입니다. 그것이 신호입니다.' },
          { label: '상시 컨텍스트 추출하기', content: '오래 쓸 사실을 AGENTS.md(또는 도구의 사용자 지정 지침 / 프로젝트 설정)로 옮기세요: 스택, 컨벤션, 테스트 스타일, 오류 처리. 이제 모든 세션이 그것들을 이미 알고 시작합니다 — 다시 설명하는 세금을 더는 내지 않습니다.', note: '상시 컨텍스트는 당신의 손 근육 기억이 아니라, 도구가 자동으로 읽는 파일에 있어야 합니다.' },
          { label: '워크플로우 포착하기', content: '반복되는 동작 — "선택된 핸들러에 대해 테이블 주도 테스트를 작성하라" — 은 저장된 프롬프트, 슬래시 명령, 또는 스니펫이 됩니다. 변하는 부분(어느 핸들러인지)만 당신이 제공하면 됩니다.', note: '좋은 셋업은 안정적인 레시피와 바뀌는 하나의 재료를 분리합니다.' },
          { label: '이제 한 번의 호출이면 됩니다', content: '핸들러를 선택하고 명령을 실행하세요. 컨텍스트는 로드되어 있고, 레시피는 고정되어 있으며, 출력은 팀 전체에 걸쳐 일관됩니다. 5분짜리 셋업은 세 번째 사용에서 본전을 뽑고 — 계속 이익을 냅니다.', note: '이것이 게임의 전부입니다: 다시 설명하던 것을 호출하는 것으로 바꾸는 것.' },
        ],
        takeaway: '최적화의 단위는 개별 프롬프트가 아니라 반복되는 작업입니다. 컨텍스트를 다시 입력하고 있는 자신을 발견할 때마다, 그것은 구축해 달라고 요청하는 셋업입니다.',
        selfExplainPrompt: '이번 달에 AI에게 두 번 넘게 다시 입력한 프롬프트나 컨텍스트를 하나 말해 보세요. 어떤 상시 컨텍스트를 추출하고, 재사용 가능한 호출은 무엇이 될까요?',
        selfExplainAnswer: '예시: "새 엔드포인트 핸들러를 요청하기 전에 우리 API 오류 형식 스펙을 계속 붙여넣습니다. 상시 컨텍스트 → 오류 엔벨로프, 인증 미들웨어, 검증 컨벤션을 담은 프로젝트 문서. 재사용 가능한 호출 → \'우리 컨벤션에 따라 <route>용 핸들러를 골격화해줘\'. 이제 그 스펙은 붙여넣는 것이 아니라 도구가 이미 아는 것이 됩니다."',
      },
      teamPatterns: {
        title: '3. 팀 패턴 & 가드레일',
        intro: '당신의 개인 셋업은 팀이 공유할 때 배수기가 되고 — 몇 가지 가드레일이 없으면 부채가 됩니다. 각 패턴을 클릭해 보세요.',
        items: [
          { name: '저장소 안의 컨텍스트 파일', tagline: 'AI의 지식을 git에 커밋하기', description: '저장소에 커밋된 AGENTS.md / 컨텍스트 파일은 모든 엔지니어의 어시스턴트가 컨벤션, 아키텍처, 함정에 대한 같은 그림을 공유한다는 뜻입니다. 코드처럼 검토되고, 코드베이스와 함께 진화하며, 신규 인력(사람과 AI)을 공짜로 온보딩합니다.' },
          { name: '공유 프롬프트 & 스킬 라이브러리', tagline: '모두가 같은 프롬프트를 재발명하지 않게 하기', description: '누군가 "마이그레이션 생성"이나 "런북 작성"을 위한 프롬프트를 완벽히 다듬으면, 그것은 공유 라이브러리로 들어갑니다 — 저장소 폴더, 위키, 또는 도구 네이티브 스킬. 팀의 최고 프롬프트가 모두의 기본값이 됩니다.' },
          { name: 'AI가 작성한 코드의 검토 규범', tagline: '책임은 모델이 아니라 작성자에게', description: '명시적으로 합의하세요: AI가 생성한 코드도 손으로 쓴 코드와 같은 검토 기준을 적용하며, 그것을 내보낸 사람이 책임집니다. "AI가 썼다"는 변명은 없습니다. 일부 팀은 AI 비중이 높은 PR에 표시를 달아 검토자가 주의를 조정하게 합니다.' },
          { name: '효과를 정직하게 측정하기', tagline: '생성된 줄 수가 아니라 절약된 시간', description: 'AI 코드 줄 수는 허영 지표입니다 — 속도를 뜻할 수도, 부풀림을 뜻할 수도 있습니다. 중요한 것을 추적하세요: 사이클 타임, 신규 인력의 첫 PR까지 걸리는 시간, 작업 중 얼마만큼이 "작성"이 아니라 "검토"가 되었는지. 도움이 안 되는 곳에 대해서도 정직하세요.' },
        ],
        bridgeBlurb: '팀의 검토 규범은 마지막 방어선입니다. 모델이 실제로 어떻게 정렬되는지 — 그리고 신뢰·안전 가드레일이 실제로 어디에 있는지 더 깊이 살펴보세요.',
      },
      aiShapedTasks: {
        title: '1. 당신의 AI에 맞는 작업 찾기',
        intro: '대부분의 사람은 눈앞에 있는 무엇이든 AI에 씁니다. 더 큰 지렛대가 되는 행동은, AI가 가장 큰 보상을 주는 작업을 의도적으로 찾는 것입니다. 세 가지가 참일 때 작업은 AI에 맞습니다 — 각각 클릭해 보세요.',
        items: [
          { name: '반복적', tagline: '몇 번이고 다시 한다', description: '일회성 작업은 셋업을 구축할 이유가 되기 어렵습니다. 매주 하는 작업 — 상태 다이제스트, 고객 후속 연락, 데이터 정리 — 은 잘 브리핑하는 데 투자한 시간을 여러 번 되돌려 줍니다.' },
          { name: '판단 부담이 적은', tagline: '대체로 기계적, 큰 판돈이 걸린 결정이 아닌', description: '요약, 형식 재정리, 초안 작성, 추출, 비교 — "고심한" 것보다 "좋고 빠른" 것이 이기는 일. 판단 부담이 큰 10%(최종 결정, 민감한 판단)는 당신에게 남고; AI가 나머지 90%를 치워 줍니다.' },
          { name: '텍스트 형태', tagline: '말이 들어가고, 말이 나온다', description: 'AI는 입력과 출력이 언어일 때 가장 강합니다: 이메일, 문서, 메모, 녹취록, 텍스트로 된 스프레드시트. 작업이 근본적으로 읽고 쓰는 것이라면 스위트 스팟에 있습니다.' },
        ],
        testLabel: '주간 시간 잡아먹기 테스트:',
        test: '당신의 캘린더와 지난 한 주를 보세요. 반복적이고, 텍스트 형태이며, 판단 부담이 적은 어떤 작업이 가장 많은 시간을 잡아먹었나요? 거기서 시작하세요 — 가장 화려한 용도가 아니라, 가장 많이 반복되는 것에서.',
      },
      oneOffToSystem: {
        title: '2. 일회성에서 시스템으로',
        intro: '"가끔 AI를 쓴다"와 "AI가 우리 팀의 일주일에 하루를 아껴 준다"의 차이는 시스템입니다. 반복 작업이 손으로 만드는 것에서 처리되는 것으로 졸업하는 과정을 지켜보세요.',
        stepLabel: '단계',
        steps: [
          { label: '주간 고역', content: '매주 월요일 당신은 같은 파이프라인 보고서를 다시 만듭니다: 스프레드시트 다섯 개를 열고, 하이라이트를 채팅에 붙여넣고, 형식을 다시 설명하고, 어조를 고치고, 임원용 이메일에 맞게 재포맷합니다. 90분, 매주, 처음부터.', note: '매번 셋업 비용을 전부 다시 치르고 있습니다. 그것이 낭비입니다.' },
          { label: '이긴 브리프를 저장하라', content: '마침내 멋지게 나온 그 주에, 당신은 그 프롬프트를 저장합니다 — 효과가 있었던 정확한 컨텍스트, 형식, 어조. 다음 주에는 다시 발명하는 대신 검증된 브리프에서 시작합니다.', note: '첫 재사용 가능한 자산은 그저 당신이 이미 쓴 프롬프트의 최고 버전일 뿐입니다.' },
          { label: '프로젝트로 만들어라', content: '반복되는 소스와 브리프를 함께 담는 프로젝트 / 작업 공간을 만드세요. 형식은 그곳에 살고, 소스 파일은 그곳에 첨부됩니다. "이번 주 보고서 생성해줘"가 이제 지시의 전부입니다.', note: '프로젝트는 프롬프트 더하기 첨부물이라는 의식을 하나의 브리핑된 작업 공간으로 바꿉니다.' },
          { label: '5분짜리 검토 작업', content: '월요일: 이번 주 숫자를 넣고, 실행하고, 초안을 읽고, 한 줄 고치고, 보냅니다. 90분이 5분이 되었습니다. 작업이 사라진 게 아니라 — 다시 만드는 일이 사라졌고, 당신의 판단은 여전히 마지막 단계입니다.', note: '시스템화는 사람이 아니라 다시 하기를 제거합니다. 다시 조립하는 대신 검토합니다.' },
        ],
        takeaway: '시스템이란 당신의 머릿속에 사는 것을 멈춘 좋은 브리프일 뿐입니다. 셋업은 한 번에 몇 분이 들고; 다시 하기는 영원히 매주 당신에게 비용을 청구합니다.',
        selfExplainPrompt: '당신의 한 주를 가장 많이 잡아먹는 반복 작업을 고르세요. 저장할 브리프는 무엇이고, 5분짜리 작업으로 만들기 위해 프로젝트에 무엇을 넣겠습니까?',
        selfExplainAnswer: '예시: "월간 이사회 업데이트. 저장된 브리프: 컨텍스트(누가 읽고 무엇에 관심 있는지), 세 섹션 형식, 담백한 숫자 어조. 프로젝트 내용물: 지표 대시보드 내보내기, 연속성을 위한 지난달 업데이트, 브랜드 보이스 메모. 그러면 \'이번 달 이사회 업데이트 초안 작성\'이 필요한 모든 것에서 출발합니다."',
      },
      rollItOut: {
        title: '3. 팀에 확산하기',
        intro: '좋은 AI 습관을 가진 한 사람은 자기 시간을 아낍니다. 공유된 습관을 가진 팀은 팀이 떠맡을 수 있는 일 자체를 바꿉니다. 각 확산 행동을 클릭해 보세요.',
        items: [
          { name: '공유 프롬프트 라이브러리', tagline: '모두가 최고 버전에서 시작한다', description: '"여기서 통하는 프롬프트"를 담은 간단한 공유 문서 — 보고서 브리프, 고객 답변 템플릿, 회의 요약 형식. 새 팀원은 모두의 교훈을 다시 발견하는 대신 첫날부터 생산적이 됩니다.' },
          { name: '챔피언 지명하기', tagline: '누군가 더 낫게 만드는 일을 책임진다', description: '주인이 없으면 확산은 멈춥니다. 라이브러리를 큐레이팅하고, "이건 어떻게 프롬프트하지?"에 답하고, 성과를 공유하는 열정적인 한 사람이 그 어떤 명령보다 많은 일을 해냅니다. 그것을 부업이 아니라 역할의 눈에 보이는 일부로 만드세요.' },
          { name: '가벼운 거버넌스', tagline: '두꺼운 규정집이 아니라 명확한 선', description: '사람들은 몇 가지 분명한 선을 알아야 합니다 — 어떤 데이터는 절대 도구에 들어가면 안 되는지, 어디서 사람의 승인이 필요한지, 어떤 도구가 승인되었는지. 모두가 실제로 읽을 만큼 짧게 유지하세요; 정책의 벽은 그저 섀도 사용을 부추길 뿐입니다.' },
          { name: '절약된 시간 측정하기', tagline: '증명하라, 아니면 잘린다', description: '정직한 숫자를 추적하세요: 주당 되찾은 시간, 빨라진 처리, 인력 증원 없이 더 많이 처리한 양. 구체적인 전후 성과가 다음 단계의 자금을 대고 예산을 지킵니다. "더 빨라진 것 같다"는 비용 검토를 넘기지 못합니다.' },
        ],
        bridgeBlurb: '팀 습관은 개인 생산성이 조직 변화와 만나는 지점입니다. 조직이 AI에 대비되려면 실제로 무엇이 필요한지 살펴보세요.',
      },
    },
    // MT
    agenticcoding: {
      different: {
        title: '1. 코딩 에이전트가 다른 점',
        intro:
          '자동완성은 한 줄을 마무리합니다. 챗 어시스턴트는 창 안에서 답합니다. 코딩 에이전트는 둘 다 하지 않습니다 — 동료가 하듯이 저장소 안에서 일합니다: 계획하고, 여러 파일에 걸쳐 편집하고, 실행하고, 결과를 확인합니다. 네 가지 능력이 에이전트를 구별합니다. 각각을 클릭해 보세요.',
        items: [
          {
            name: '작업 분해',
            tagline: '목표를 계획으로 바꾼다',
            description:
              '당신이 "공개 API에 속도 제한을 추가해줘"라고 말합니다. 에이전트는 그것을 단계로 쪼갭니다 — 미들웨어 계층을 찾고, 리미터를 추가하고, 라우트에 연결하고, 테스트를 추가하고, 스위트를 실행하고 — 코드 한 덩어리를 뱉어내고 잘 되기를 바라는 대신 그 계획을 차근차근 수행합니다.',
          },
          {
            name: '코드베이스 맥락',
            tagline: '쓰기 전에 읽는다',
            description:
              '에이전트는 grep하고, 파일을 열고, 어떻게 연결되는지 추적합니다 — 그래서 그 변경이 당신의 관례에 맞고 기존 구조에 들어맞습니다. 이것이 처음 보는 저장소도 편집할 수 있는 이유이고, (당신이 붙여넣은 것만 보는) 챗 어시스턴트는 할 수 없는 이유입니다.',
          },
          {
            name: '도구 사용 & MCP',
            tagline: '제안만이 아니라 행동한다',
            description:
              '에이전트는 명령을 실행하고, 테스트를 돌리고, 그 출력을 읽으며, MCP(Model Context Protocol)를 통해 외부 도구 — 데이터베이스, 이슈 트래커, 문서 — 에 닿습니다. 도구 사용은 "여기 코드가 있어"를 "변경을 했고 테스트가 통과해"로 바꾸는 것입니다.',
          },
          {
            name: '검증 루프',
            tagline: '자기 작업을 확인한다',
            description:
              '행동한 뒤 에이전트는 결과를 점검합니다 — 테스트를 돌리고, 에러를 읽고, 파일을 다시 읽으며 — 적응합니다. 이 생각 → 행동 → 검증 사이클이 에이전트 코딩의 핵심입니다: 모든 키 입력을 감독하는 대신 체크포인트에서 결과를 검토할 수 있게 해주는 것이 바로 이것입니다.',
          },
        ],
        takeaway:
          '자동완성은 예측하고, 챗은 조언하며, 에이전트는 행동하고 검증합니다. 이 전환은 코드를 받는 것에서 코딩 작업을 위임하는 것으로의 이동입니다 — 즉 당신의 일이 타이핑에서 명세하고 검토하는 것으로 옮겨간다는 뜻입니다.',
      },
      realSession: {
        title: '2. 실제 세션을 운전하기',
        intro:
          '작은 기능을 구현하는 Claude Code 세션의 충실한 시뮬레이션입니다. 명령을 실행하고 오른쪽에서 저장소가 바뀌는 것을 지켜보세요. 그 루프에 주목하세요: 탐색 → 계획 → 편집 → 테스트 → 보고.',
        workspaceTitle: 'claude-code — add rate limiting',
        terminalTitle: 'claude-code',
        stepNote:
          '각 명령은 에이전트 루프의 한 차례입니다. 에이전트는 편집하기 전에 코드베이스를 읽고, 자기 변경에 대한 테스트를 작성하며, 완료를 선언하기 전에 스위트를 실행합니다.',
        snapshotInitial: '출발점: 속도 제한이 없는 작은 Express API.',
        snapshotMiddlewareSeen: '에이전트가 구조를 읽고 미들웨어가 연결되는 지점을 찾았습니다.',
        snapshotMiddlewareAdded: '새 rateLimiter 미들웨어 파일이 생성됨 — 아직 라우트에 연결되지 않음.',
        snapshotEdited: 'rateLimiter가 이제 공개 라우터에 연결되었습니다.',
        snapshotTested: '회귀 테스트가 추가되었고 스위트가 통과합니다.',
        takeaway:
          '당신은 한 문장의 의도를 제공하고 체크포인트에서 검토했습니다; 에이전트는 검색, 편집, 테스트, 검증을 했습니다. 그 분업 — 당신은 명세하고 검토하며, 에이전트는 실행하고 증명한다 — 이 코딩 에이전트와 함께 일하는 느낌입니다.',
        selfExplainPrompt:
          '위 세션에서 에이전트는 완료라고 말하기 전에 테스트를 작성했습니다. 왜 바로 그 검증 단계가 코딩 에이전트에게 위임하는 것을 안전하게 만드는 것일까요?',
        selfExplainAnswer:
          '검증이 그럴듯해 보이는 diff를 확인된 diff로 바꿔주기 때문입니다. 회귀 테스트가 통과한다는 것은 모든 줄을 다시 읽으며 작동하는지 추측하는 대신 결과를 검토할 수 있다는 뜻입니다 ("이게 내가 요청한 것을 하는가, 그리고 여전히 초록색인가?"). 검증 단계가 없으면 위험은 모두 떠안고 시간 절약은 하나도 못 얻습니다 — 에이전트가 건드린 모든 것을 직접 다시 확인해야 할 것입니다. 테스트는 에이전트가 자기 작업을 증명하는 것이며, 그것이 당신을 체크포인트 수준에서 일할 수 있게 해줍니다.',
      },
      effectively: {
        title: '3. 코딩 에이전트와 효과적으로 일하기',
        intro:
          '도구는 유능합니다; 그것에서 훌륭한 결과를 끌어내는 것은 하나의 기술입니다. 네 가지 습관이 코딩 에이전트와 싸우는 사람과 그것과 함께 출시하는 사람을 가릅니다. 각각을 클릭해 보세요.',
        items: [
          {
            name: '테크 리드처럼 범위를 정하라',
            tagline: '바람이 아니라 작업을 건네라',
            description:
              '가장 적절한 크기의 작업은 유능한 엔지니어에게 한 단락으로 건넬 수 있는 것입니다: 명확한 결과, 중요한 제약, 완료를 아는 방법. "앱을 더 좋게 만들어"는 실패하고; "S3 클라이언트에 재시도/백오프를 추가하고, 최대 3회, 기존 인터페이스는 유지하고, 타임아웃 경로에 대한 테스트를 추가해"는 성공합니다.',
          },
          {
            name: '지속되는 맥락을 주어라',
            tagline: 'AGENTS.md를 한 번 써두어라',
            description:
              '스택, 관례, 테스트 명령, 함정 — 그것들을 저장소 루트의 AGENTS.md에 넣어 모든 세션이 추측하는 대신 사전 브리핑된 상태로 시작하게 하세요. 매번 다시 타이핑하는 맥락은 에이전트가 자동으로 읽는 파일에 속하는 맥락입니다.',
          },
          {
            name: '체크포인트에서 검토하라',
            tagline: '키 입력이 아니라 결과',
            description:
              '하나의 일관된 단위 — 함수 하나, 수정 하나, 통과하는 테스트 하나 — 를 완성하게 한 다음, 동료의 PR을 검토하듯 그것을 검토하세요. 모든 토큰을 지켜보는 것은 그냥 코드를 쓰는 것보다 느립니다; diff를 검토하는 것이 당신의 판단이 실제로 가치를 더하는 지점입니다.',
          },
          {
            name: '핸들을 잡을 때를 알라',
            tagline: '헛돌 때 루프를 멈춰라',
            description:
              '에이전트가 허우적거리면 — 같은 에러에 두 번 실패, 목표에서 벗어나는 편집 — 멈추고 개입하세요. 빠진 맥락을 추가하고, 계획을 바로잡거나, 그 부분을 직접 맡으세요. 좋은 운영자는 에이전트가 더 깊은 구덩이를 파게 두는 대신 일찍 방향을 다시 잡습니다.',
          },
        ],
        bridgeBlurb:
          '당신은 코딩 에이전트를 운전해 보았습니다. 이제 그 아래를 들여다보세요: 도구 사용, 함수 호출, MCP, 에이전트 설계 패턴이 실제로 어떻게 작동하는지 — 방금 실행한 세션 아래의 기계 장치를.',
      },
    },
    // MT
    agenticwork: {
      whatItIs: {
        title: '1. 에이전트 업무란 실제로 무엇인가',
        intro:
          '챗 어시스턴트는 답하고, 에이전트 업무 앱은 행동합니다. 당신은 그것에 여러 단계의 작업을 맡깁니다 — 당신의 문서, 스프레드시트, 앱에 걸쳐 — 그러면 그것은 계획하고, 단계들을 수행하고, 보고합니다. 그동안 당신은 감독석에 남아 있습니다. 각 부분을 클릭해 보세요.',
        items: [
          {
            name: '어시스턴트 대 에이전트',
            tagline: '답하기 대 행하기',
            description:
              '챗 어시스턴트는 말을 돌려줍니다: 초안, 답변, 당신이 그 다음에 행동에 옮기는 요약. 에이전트는 작동합니다 — 파일을 열고, 행을 채우고, 이메일 초안을 쓰고, 워크플로를 따라 움직입니다. 차이는 지능이 아니라, 작업이 당신의 시스템에 안착하느냐 아니면 그저 챗 안에만 머무르느냐입니다.',
          },
          {
            name: '무엇이 작업을 위임 가능하게 하는가',
            tagline: '여러 단계, 확인 가능, 복구 가능',
            description:
              '좋은 후보는 여러 단계가 있고(설정할 가치가 있고), 완료의 명확한 정의가 있으며(그래서 확인할 수 있고), 틀렸을 때 복구 가능합니다(체결된 계약이 아니라 초안). "이 출처들로 주간 파이프라인 보고서를 작성해줘"는 들어맞지만, "누구를 해고할지 결정해줘"는 그렇지 않습니다.',
          },
          {
            name: '그 도구들',
            tagline: 'Quick Desktop, Cowork, 그리고 그 친척들',
            description:
              'Amazon Quick Desktop와 Claude Cowork는 에이전트 업무 앱입니다: 당신은 사무 작업을 위임하고 그것들이 파일과 앱에 걸쳐 일하는 동안 감독합니다. 이는 코딩 에이전트가 저장소에서 하는 일의 비즈니스 측 대응물입니다 — 같은 루프인데, 코드 대신 문서와 워크플로를 향해 있습니다.',
          },
          {
            name: '당신의 새로운 역할',
            tagline: '행하는 사람이 아니라 감독',
            description:
              '행하는 일이 위임되면, 당신의 가치는 잘 브리핑하고, 무엇이 중요한지 결정하고, 결과를 검토하는 것으로 옮겨갑니다 — 개별 기여자가 아니라 관리자의 일입니다. 에이전트로 이기는 팀은 그 구성원이 이 전환을 의도적으로 해내는 팀입니다.',
          },
        ],
        bridgeBlurb:
          '이 행동하는 어시스턴트들 아래에는 진짜 기계 장치가 있습니다 — 도구 사용, 함수 호출, 에이전트 루프. AI가 실제로 답하기에서 행동을 취하기로 어떻게 넘어가는지 보세요.',
      },
      delegateSupervise: {
        title: '2. 위임하고 감독하기',
        intro:
          '에이전트에게 위임하는 것은 영리한 주니어 직원을 관리하는 것과 무척 닮은 기술입니다. 실제 여러 단계 위임을 차근차근 따라가며 당신이 정확히 어디에서 루프 안에 남는지 주목하세요.',
        stepLabel: '단계',
        steps: [
          {
            label: '당신이 작업을 브리핑한다',
            content:
              '"이번 달 경비 보고서를 우리 출장 정책과 대조해줘. 규칙을 위반하는 모든 경비를, 위반한 규칙과 초과 금액과 함께 표시해줘. 내가 검토할 수 있는 표 하나와 한 줄 요약을 출력해줘."',
            note: '위임 가능한 브리핑은 입력, 적용할 규칙, 정확한 산출물을 명시합니다 — 사람에게 브리핑하는 것과 똑같이.',
          },
          {
            label: '에이전트가 계획을 제안한다',
            content:
              '그것은 정책과 경비 시트를 읽고 제안합니다: 240개 경비 줄을 파싱 → 각각을 해당 정책 규칙에 매칭 → 초과 금액과 함께 위반을 표시 → 검토 표 작성 → 요약 작성. 그리고 한 가지를 묻습니다: "누락된 영수증을 위반으로 처리할까요, 아니면 별도의 \'후속 조치 필요\' 목록으로 둘까요?"',
            note: '계획 + 명확화 질문이 당신의 첫 체크포인트입니다 — 지금 방향을 잡는 건 저렴하고, 실행된 뒤엔 비쌉니다.',
          },
          {
            label: '그것이 당신의 파일들에 걸쳐 일한다',
            content:
              '당신은 "별도의 후속 조치 목록"을 선택합니다. 에이전트는 240개 줄을 모두 처리하며 정책을 규칙별로 적용하고 진행 상황을 보여줍니다 — 당신이 무언가를 붙여넣기를 기다리지 않고. 그것은 11건의 위반과 6건의 영수증 누락 항목을 표시합니다.',
            note: '챗 어시스턴트와 달리, 그것은 스프레드시트와 정책 문서에 직접 작동하고 있습니다 — 그것이 에이전트다운 부분입니다.',
          },
          {
            label: '당신이 체크포인트에서 감독한다',
            content:
              '11개의 표시가 각각 규칙과 초과액과 함께 도착합니다. 당신은 그중 둘이 실제로는 정책 안에 있음을 발견하고(에이전트가 너무 엄격하게 읽은 일일 출장비) 그렇게 말합니다. 그것은 규칙 해석을 바로잡고 영향받은 줄들을 다시 실행합니다 — 9건의 실제 위반이 남습니다.',
            note: '이제 검토가 일입니다. 당신은 산술을 다시 하는 게 아니라 판단 사항을 확인하고 있습니다.',
          },
          {
            label: '그것이 전달한다 — 책임은 당신에게 남는다',
            content:
              '9건의 위반 + 6건의 후속 조치 + 한 줄 요약으로 된 최종 표가 재무팀에 보낼 준비가 되었습니다. 20분의 브리핑과 검토가 한나절의 줄 단위 확인을 대체했고 — 보낼지 말지의 결정은 여전히 당신의 것입니다.',
            note: '작업은 위임되었지만, 책임은 그렇지 않았습니다. 그 구분이 곧 이 규율의 전부입니다.',
          },
        ],
        takeaway:
          '작업을 위임하고, 체크포인트에서 감독하고, 결과를 소유하세요. 에이전트는 분량을 처리하고; 당신의 판단은 여전히 무엇이든 나가기 전의 관문입니다.',
        selfExplainPrompt:
          '이번 주 당신 앞에 놓인 여러 단계 작업 하나를 고르세요. 에이전트 업무 앱에 건넬 브리핑을 써보세요 — 입력, 규칙 또는 목표, 산출물 — 그리고 진행되기 전에 검토를 고집할 그 단 하나의 체크포인트를 명시하세요.',
        selfExplainAnswer:
          '예: "작업: 이번 주 들어온 80건의 지원 티켓을 분류한다. 브리핑 — 입력: 티켓 내보내기; 규칙: 우리 SLA 정의로 각각을 긴급도(P1–P3)로 태그하고 제품 영역별로 묶는다; 산출물: 정렬된 표와 맨 위의 P1 목록. 체크포인트: 어떤 것이 자동 에스컬레이션되기 전에 내가 P1 목록을 검토한다. 잘못된 P1은 새벽 2시에 누군가를 깨우기 때문이다." 체크포인트는 오류가 비싸거나 되돌리기 어려운 바로 그 지점에 놓입니다.',
      },
      guardrails: {
        title: '3. 가드레일을 설정하라',
        intro:
          '행동하는 에이전트에는 한계가 필요합니다. 신입에게 첫날부터 회사 신용카드를 주지 않는 것과 같습니다. 네 가지 가드레일이 위임을 안전하게 지킵니다. 각각을 클릭해 보세요.',
        items: [
          {
            name: '범위 제한',
            tagline: '무엇을 건드릴 수 있는가',
            description:
              '에이전트가 어떤 파일, 시스템, 데이터를 읽고 바꿀 수 있는지 명시하세요. "이 폴더와 이 시트"가 "공유 드라이브"보다 낫습니다. 좁은 범위는 실수를 가두고 민감한 데이터를 기본적으로 손이 닿지 않는 곳에 둡니다.',
          },
          {
            name: '지출 & 행동 상한',
            tagline: '중대한 움직임에 대한 한도',
            description:
              '에이전트가 돈을 쓰거나 외부로 향하는 행동(환불 처리, 고객에게 발송, 주문 등록)을 할 수 있는 곳에는 단단한 상한과 속도 제한을 두세요. 상한은 필요하지만 충분하지는 않습니다 — 아래 규칙과 짝지으세요.',
          },
          {
            name: '휴먼 인 더 루프',
            tagline: '되돌릴 수 없는 것에 대한 승인',
            description:
              '되돌리기 어렵거나 외부에 보이는 것은 무엇이든 — 고객에게 발송, 기록 삭제, 결제 확정 — 사람의 OK를 요구해야 합니다. 에이전트가 행동을 준비하고 대기열에 넣게 하되, 사람이 보내기를 누르게 하세요. 초안은 공짜지만, 보낸 것은 영원합니다.',
          },
          {
            name: '감사 추적',
            tagline: '무엇을 왜 했는지 안다',
            description:
              '에이전트의 행동, 입력, 결정을 로그로 남겨 검토하고, 디버깅하고, "왜 그렇게 했지?"에 답할 수 있게 하세요. 감사 추적은 놀라운 결과를 추적 가능한 것으로 바꿉니다 — 그리고 흔히 있으면 좋은 것이 아니라 규정 준수 요건입니다.',
          },
        ],
        failureLabel: '가드레일의 빈틈, 구체적으로:',
        failure:
          '$1,000까지 자율적으로 환불하도록 허용된 에이전트가 명백히 사기인 $950 요청을 받고 — 지급해 버립니다. 지출 상한은 사기 검사가 아니기 때문입니다. 빠진 가드레일은 더 낮은 한도가 아니라, 위험 임계값을 넘는 환불에 대한 휴먼 인 더 루프 규칙이었습니다. 상한은 크기를 제한할 뿐, 판단을 제공하지는 않습니다.',
        bridgeBlurb:
          '에이전트 하나에 대한 가드레일은 시작입니다. 더 큰 질문 — 역할, 결정권, 그리고 왜 에이전트 시도의 ~40%가 비기술적 문제에서 멈추는가 — 는 조직적입니다. 거기로 가보세요.',
      },
    },
    // MT
    genaibeyondtext: {
      modalitiesModels: {
        title: '1. 모달리티와 그 모델들',
        intro:
          '텍스트를 넘어, 생성형 AI는 네 가지 모달리티에 걸쳐 있으며, 각각 고유한 모델 계열과 특성을 가지고 있습니다. 각각을 클릭하여 그 내부 작동 방식과 2026년의 대표 모델들을 확인해 보세요.',
        modelsLabel: '대표 모델:',
        items: [
          {
            name: '이미지',
            tagline: '디퓨전 모델',
            description:
              '텍스트-투-이미지 모델은 노이즈 제거 방식으로 작동합니다: 무작위 노이즈에서 시작해, 텍스트 인코더의 안내를 받아 프롬프트에 맞는 이미지로 반복적으로 다듬어 갑니다. 프롬프트, 참조 이미지, 마스크(인페인팅), 구조 맵으로 제어할 수 있습니다. 빠르고, 저렴하며, 성숙합니다.',
            models: 'Stable Diffusion 3.5, FLUX, Amazon Nova Canvas, Google Imagen, GPT Image',
          },
          {
            name: '음성 & 오디오',
            tagline: 'TTS, STT, 그리고 음성-투-음성',
            description:
              '세 가지 일이 있습니다: 텍스트-투-스피치(TTS)는 자연스러운 음성을 합성하고; 스피치-투-텍스트(STT)는 받아쓰며; 더 새로운 음성-투-음성 모델은 낮은 지연시간으로 어조를 보존하며 오디오로 직접 대화합니다. 음성 복제는 TTS 기능이며 — 동시에 권리상의 지뢰밭입니다.',
            models: 'Whisper (STT), ElevenLabs (TTS/복제), Amazon Nova Sonic, OpenAI Realtime',
          },
          {
            name: '비디오',
            tagline: '시간에 걸친 디퓨전',
            description:
              '비디오 모델은 이미지 디퓨전을 시간 차원으로 확장하여, 텍스트나 이미지 프롬프트로부터 일관된 프레임을 생성합니다. 여전히 가장 컴퓨팅 자원을 많이 쓰고 가장 제어하기 어려운 모달리티입니다 — 클립 길이가 짧고, 샷 간의 일관성이 어려운 문제입니다.',
            models: 'OpenAI Sora, Google Veo, Runway Gen-3, Amazon Nova Reel',
          },
          {
            name: '멀티모달',
            tagline: '하나의 모델, 여러 입력과 출력',
            description:
              '프런티어 LLM은 텍스트와 함께 이미지(그리고 점점 더 오디오/비디오)를 네이티브로 받아들이고 그것들에 걸쳐 추론합니다 — "이 다이어그램에서 무엇이 잘못되었나?", "이 스크린샷을 요약해줘." 채팅하는 그 모델이 볼 수 있습니다. 새로운 파이프라인이 필요 없기 때문에, 대부분의 비즈니스 가치가 여기에 안착합니다.',
            models: 'GPT-5.x (omni), Gemini 3.x, Claude (vision), Llama 4 (vision)',
          },
        ],
        takeaway:
          '이미지와 음성은 성숙하고 저렴하며; 비디오는 프런티어이고; 멀티모달 이해(보고 들을 수 있는 채팅 모델)는 조용히 일상에서 가장 유용합니다. 모델을 고르러 나서기 전에 모달리티를 일에 맞추세요.',
      },
      multimodalAPI: {
        title: '2. 멀티모달 모델 호출하기',
        intro:
          '제품 UI 아래에서 이것들은 평범한 HTTP API입니다: 콘텐츠 블록을 보내면 콘텐츠(또는 참조)를 돌려받습니다. 세션을 실행하여 비전 호출과 이미지 생성 호출의 요청/응답 형태를 확인해 보세요.',
        stepNote:
          '두 번의 호출: 먼저 비전 모델이 이미지를 읽고 구조화된 JSON을 반환하고; 그다음 텍스트-투-이미지 모델이 이미지 참조를 반환합니다. 비용/지연시간 줄에 주목하세요 — 미디어 호출은 텍스트보다 더 비싸고 느립니다.',
        takeaway:
          '멀티모달은 "그저 API"입니다: 콘텐츠 블록 입력, 콘텐츠 또는 참조 출력, 이미지/초/토큰당 과금. 요청 형태를 한번 보고 나면, 이미지나 비전을 통합하는 일은 당신이 이미 텍스트에 대해 하던 것과 같은 엔지니어링입니다 — 거기에 비용, 지연시간, 그리고 바이너리 출력을 저장하는 일에 대한 주의가 더해질 뿐입니다.',
        selfExplainPrompt:
          '당신의 앱은 사용자가 영수증을 촬영하면 항목들을 구조화된 데이터로 받을 수 있게 합니다. 어떤 모달리티와 대략 어떤 API 형태를 사용하겠으며, 비용과 신뢰성 면에서 무엇을 주의하겠습니까?',
        selfExplainAnswer:
          '멀티모달/비전 모델: 이미지와 함께 항목들을 JSON으로 달라는 프롬프트(가급적 엄격한 스키마 / 구조화 출력 모드와 함께)를 보내고 JSON을 돌려받습니다. 주의할 점: 이미지당 비용과 지연시간(가능한 곳에서 캐싱하거나 배치 처리), 흐릿하거나 회전된 사진에서의 실패 모드(JSON을 검증하고, 신뢰도를 요청하고, 다시 촬영하라는 안내로 폴백), 그리고 금전적인 사안에 대해서는 절대 추출 결과를 맹목적으로 신뢰하지 말 것 — 빠른 확인을 위해 사용자에게 이미지 위에 파싱된 결과를 보여주세요. 이는 이미지 입력과 더 엄격한 출력 검증이 있는, 텍스트 호출과 동일한 요청/응답 엔지니어링입니다.',
      },
      choosingIntegrating: {
        title: '3. 선택과 통합',
        intro:
          '생성형 미디어 역량을 고르고 출시하는 일에는 텍스트에는 없는 트레이드오프가 있습니다. 각 고려사항을 클릭해 보세요.',
        items: [
          {
            name: '호스팅 API 대 자체 호스팅',
            tagline: '프런티어를 빌리거나, 오픈 웨이트를 직접 돌리거나',
            description:
              '호스팅 API(Bedrock, OpenAI, fal)는 운영 부담 없이 사용량 과금으로 최고의 모델을 제공합니다; 오픈 웨이트(SD, Flux, Whisper)는 데이터 통제와 물량 경제성을 위해 당신의 GPU에서 돌아갑니다. 대부분의 팀은 호스팅으로 시작하고, 물량이 많고 안정적인 워크로드만 자체 호스팅합니다.',
          },
          {
            name: '지연시간, 비용, 품질',
            tagline: '둘을 고르고, 셋째를 조율하라',
            description:
              '4초짜리 비디오 클립은 달러 단위 비용이 들고 몇 분이 걸릴 수 있습니다; 이미지는 센트 단위에 몇 초이고; 텍스트 위의 비전은 채팅에 가까운 비용입니다. 자산당 예산을 세우고, 적극적으로 캐싱하고, 작동하는 가장 작은 크기/길이로 생성하며, 비싼 모델은 정말 중요한 순간을 위해 아껴 두세요.',
          },
          {
            name: '안전성 & 출처',
            tagline: '워터마크하고 라벨을 붙여라',
            description:
              '생성형 미디어에는 출처 추적이 필요합니다: C2PA 콘텐츠 자격 증명과 보이지 않는 워터마크(예: SynthID)가 AI 출처를 표시하며, 대부분의 제공자가 이를 부착합니다. 공개, 허용되지 않는 콘텐츠를 생성하지 않는 것, 그리고 초상/음성 권리를 존중하는 것은 당신의 책임입니다.',
          },
          {
            name: '평가가 더 어렵다',
            tagline: '단일한 정답 출력이 없다',
            description:
              '"좋은 이미지"나 "자연스러운 음성"에 대한 정확 일치 지표는 없습니다. 품질에는 사람 검토에, 정책/안전에는 자동 검사에, 모델 선택에는 A/B 또는 선호도 테스트에 기대세요. 평가를 일회성 벤치마크가 아니라 지속적인 것으로 다루세요.',
          },
        ],
        bridgeBlurb:
          '당신은 모달리티들과 그것들을 호출하는 방법을 압니다. 이제 시야를 넓혀 플레이어들을 보세요: 누가 이 이미지, 음성, 비디오 모델들을 만드는지, 오픈 대 클로즈드, 그리고 생태계가 어떻게 맞물리는지.',
      },
      modalityUses: {
        title: '1. 각 모달리티는 무엇을 위한 것인가',
        intro:
          '생성형 AI는 그저 채팅이 아닙니다. 네 가지 모달리티는 각각 다른 일을 열어줍니다 — 요령은 각각이 어떤 일에 능한지 아는 것입니다. 각각을 클릭해 보세요.',
        exampleLabel: '예를 들어:',
        items: [
          {
            name: '이미지',
            tagline: '필요할 때 즉시 만드는 비주얼',
            description:
              '설명으로부터 이미지를 생성하고 편집합니다: 마케팅 크리에이티브, 소셜 게시물, 제품 목업, 프레젠테이션 그래픽, 광고 변형. 성숙하고 저렴합니다 — 팀이 실질적인 시간 절약을 처음 체감하는 곳인 경우가 많습니다.',
            example: '디자이너와 하루가 아니라 몇 분 만에, A/B 테스트용 브랜드에 맞는 광고 변형 20개를 뚝딱 만들어내세요.',
          },
          {
            name: '음성 & 오디오',
            tagline: '대규모로 말하고 듣기',
            description:
              '텍스트를 자연스러운 음성으로(내레이션, IVR, 접근성), 그리고 음성을 텍스트로(회의 메모, 통화 녹취, 자막) 바꿉니다. 더 새로운 도구는 지원 업무를 위한 실시간 음성 대화를 합니다.',
            example: '스튜디오 없이 교육 비디오에 여덟 개 언어로 자연스럽게 들리는 보이스오버를 추가하세요.',
          },
          {
            name: '비디오',
            tagline: '프롬프트로부터 만드는 움직이는 그림',
            description:
              '짧은 클립을 생성하거나, 정지 이미지를 움직이게 하거나, 긴 영상을 하이라이트로 잘라냅니다. 강력하지만 여전히 가장 거친 가장자리입니다 — 짧은 소셜/마케팅 클립과 초안에 가장 적합하며, 사람이 마무리 편집을 합니다.',
            example: '한 시간짜리 웨비나를 자막이 달린 30초 소셜 클립 열 개로 바꿔, 검토 준비를 마치세요.',
          },
          {
            name: '멀티모달',
            tagline: '보고 듣는 AI',
            description:
              '이미지, 오디오, 문서도 받아들이는 채팅 어시스턴트: 화이트보드를 촬영해 메모를 얻고, 스크린샷을 넣고 무엇이 잘못됐는지 묻고, 통화 녹음을 건네 액션 아이템을 받으세요.',
            example: '경쟁사의 진열대를 촬영하고 그들의 제품과 가격을 깔끔한 표로 정리해 달라고 요청하세요.',
          },
        ],
        takeaway:
          '이미지와 음성은 일상 업무에 준비되어 있고; 비디오는 초안에 훌륭하며; "볼 수 있는 AI"인 멀티모달은 조용한 일꾼입니다. 당신이 이미 자주 하는 일에 들어맞는 모달리티부터 시작하세요.',
      },
      pickTheTool: {
        title: '2. 일에 맞는 도구 고르기',
        intro:
          '네 가지 실제 요청. 각각에 대해: 어떤 모달리티인가, 어떤 종류의 도구인가, 그리고 주의할 한 가지. 차근차근 짚어보세요.',
        recommendLabel: '최적:',
        watchLabel: '주의:',
        scenarios: [
          {
            request: '"출시 페이지를 위해 다양한 배경의 제품 사진 30장이 필요합니다 — 빠르고 브랜드에 맞게요."',
            pick: '이미지 생성(또는 배경 편집/인페인팅)',
            why: '이미지 도구는 거의 제로에 가까운 비용으로 몇 분 만에 브랜드에 맞는 비주얼을 생성하고 편집합니다 — 물량과 변형에 이상적입니다.',
            watch: '브랜드 정확성을 확인하고, 아직 출시하지 않은 실제 물리적 제품의 진짜 사진처럼 암시하지 마세요; 요구되는 곳에서는 AI 이미지임을 공개하세요.',
          },
          {
            request: '"60분짜리 웨비나 녹화를 LinkedIn용 짧은 클립으로 만들어 주세요."',
            pick: '비디오 도구(하이라이트 추출 + 자막)',
            why: '비디오 도구는 하이라이트를 찾아 자막이 달린 클립을 잘라낼 수 있어, 오후 내내 걸릴 편집을 검토 한 번으로 바꿉니다.',
            watch: '사람이 컷을 승인해야 합니다 — 자동 하이라이트는 뉘앙스를 놓치고 인용을 맥락에서 떼어낼 수 있습니다.',
          },
          {
            request: '"영어, 스페인어, 독일어로 된 도움말 비디오를 위한 자연스러운 보이스오버를 원합니다."',
            pick: '텍스트-투-스피치(다국어)',
            why: '현대의 TTS는 스튜디오 없이 자연스러운 다국어 내레이션을 만들어내며, 대본이 바뀔 때 다시 생성하기 쉽습니다.',
            watch: '특정인의 음성은 그 사람의 동의가 있을 때만 복제하세요; 브랜드 음성에는 라이선스/합성 음성을 사용하고 권리를 명확히 유지하세요.',
          },
          {
            request: '"직원들이 종이 영수증을 촬영합니다; 금액과 날짜를 스프레드시트로 원합니다."',
            pick: '멀티모달 / 비전 모델',
            why: '비전 모델이 사진을 읽고 구조화된 데이터를 반환합니다 — 새 앱이 아니라, 당신의 팀이 이미 쓰는 그 어시스턴트입니다.',
            watch: '추출된 숫자가 회계로 넘어가기 전에 검증하세요; 흐릿하거나 비스듬한 사진은 오류를 유발하므로 사람이 확인하는 단계를 유지하세요.',
          },
        ],
        selfExplainPrompt:
          '당신의 팀이 하는, 이미지나 오디오나 비디오와 관련된 작업 하나를 고르세요. 어떤 모달리티가 맞고, 어떤 종류의 도구에 손을 뻗겠으며, 출력을 신뢰하기 전에 한 가지 다시 확인할 것은 무엇입니까?',
        selfExplainAnswer:
          '예시: "우리는 모든 제품 이미지에 대해 대체 텍스트와 소셜 캡션을 수작업으로 씁니다. 모달리티: 멀티모달/비전 — 볼 수 있는 AI에게 이미지를 건네고 대체 텍스트와 우리 톤으로 된 세 개의 캡션 옵션을 요청합니다. 도구: 이미 쓰는 멀티모달 어시스턴트, 새 시스템 없음. 다시 확인할 것: 대량 실행 전에 표본으로 정확성과 브랜드 톤, 그리고 이미지가 실제로 보여주지 않는 제품 기능을 지어내지 않는지."',
      },
      useResponsibly: {
        title: '3. 책임감 있게 사용하기',
        intro:
          '생성형 미디어는 텍스트가 좀처럼 만들지 않는 위험을 만들어냅니다 — 초상, 기만, 브랜드. 네 가지 습관이 당신을 안전하게 지킵니다. 각각을 클릭해 보세요.',
        items: [
          {
            name: '공개하고 라벨을 붙여라',
            tagline: 'AI일 때는 그렇다고 말하라',
            description:
              '청중이나 법이 기대하는 곳에서는 AI 생성 미디어에 라벨을 붙이고, 출처 정보(C2PA 콘텐츠 자격 증명)를 벗겨내지 말고 온전히 유지하세요. 뉴스나 신뢰 맥락에서의 조용한 AI 이미지는 터지기만을 기다리는 평판 위험입니다.',
          },
          {
            name: '권리와 초상을 존중하라',
            tagline: '소유하지 않은 것을 복제하지 마라',
            description:
              '동의 없이 실제 인물의 얼굴을 생성하거나 음성을 복제하지 말고, 학습 데이터/스타일 관련 주장에 유의하세요. 명확한 상업적 약관이 있는 라이선스 또는 합성 음성과 모델을 사용하세요 — "AI가 한 일이었다"는 변명이 되지 않습니다.',
          },
          {
            name: '브랜드와 정확성을 검토하라',
            tagline: '사람이 승인한다',
            description:
              '생성형 도구는 잘못된 손, 뭉개진 이미지 속 글자, 또는 브랜드에 어긋나는 톤을 자신만만하게 만들어냅니다. 고객을 마주하는 무엇이든 출시되기 전에 사람의 승인 단계를 유지하세요 — 대행사 초안에 적용할 바로 그 검토 기준입니다.',
          },
          {
            name: '비용에 유의하라',
            tagline: '비디오와 오디오는 쌓인다',
            description:
              '이미지는 저렴하지만, 비디오 생성과 대규모 배치 작업은 빠르게 비싸집니다. 예산을 정하고, 실제로 필요한 크기/길이로 생성하며, 자산당 비용을 측정해서 "빠른 실험"이 깜짝 청구서가 되지 않게 하세요.',
          },
        ],
        bridgeBlurb:
          '당신은 이 도구들이 무엇을 하고 어떻게 잘 사용하는지 압니다. 그 뒤에 있는 이미지, 음성, 비디오 모델을 실제로 누가 만드는지 — 그리고 기업들이 어떻게 견주어지는지 — 궁금하신가요? 그 지도를 보세요.',
      },
    },
  },
}
