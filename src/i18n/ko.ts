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
  },
}
