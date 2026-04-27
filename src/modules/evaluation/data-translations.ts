// evaluation module — data array translations

export const benchmarksTranslations = {
  sv: [
    { name: 'MMLU', category: 'Kunskap', what: 'Flervalsfrågor över 57 ämnen', scoring: 'Noggrannhet (%)' },
    { name: 'HumanEval', category: 'Kodning', what: 'Python-programmeringsproblem', scoring: 'pass@k (% som klarar tester)' },
    { name: 'GSM8K', category: 'Matematik', what: 'Matematikproblem på grundskolenivå', scoring: 'Noggrannhet (%)' },
    { name: 'TruthfulQA', category: 'Sanningsenlighet', what: 'Frågor designade att framkalla vanliga missuppfattningar', scoring: '% sanningsenliga svar' },
    { name: 'MT-Bench', category: 'Konversation', what: 'Flerturns konversationskvalitet', scoring: 'GPT-4 bedömning (1-10)' },
    { name: 'ARC-AGI', category: 'Resonemang', what: 'Abstrakta resonemangspussel', scoring: 'Noggrannhet (%)' },
  ],
  ko: [
    { name: 'MMLU', category: '지식', what: '57개 과목에 걸친 객관식 문제', scoring: '정확도 (%)' },
    { name: 'HumanEval', category: '코딩', what: 'Python 프로그래밍 문제', scoring: 'pass@k (테스트 통과 %)' },
    { name: 'GSM8K', category: '수학', what: '초등학교 수준 수학 문제', scoring: '정확도 (%)' },
    { name: 'TruthfulQA', category: '진실성', what: '일반적인 오해를 유발하도록 설계된 질문', scoring: '진실된 답변 %' },
    { name: 'MT-Bench', category: '대화', what: '다중 턴 대화 품질', scoring: 'GPT-4 판정 (1-10)' },
    { name: 'ARC-AGI', category: '추론', what: '추상적 추론 퍼즐', scoring: '정확도 (%)' },
  ],
}

export const taskTypesTranslations = {
  sv: [
    { label: 'Klassificering', metrics: 'Noggrannhet, F1, precision, recall', tip: 'Stratifiera testdata efter klass' },
    { label: 'Generering', metrics: 'BLEU, ROUGE, BERTScore, mänsklig bedömning', tip: 'Automatiska mätvärden korrelerar dåligt med kvalitet' },
    { label: 'Extraktion', metrics: 'Exakt matchning, F1 på tokennivå', tip: 'Testa med variationer i format' },
    { label: 'Sammanfattning', metrics: 'ROUGE-L, faktakonsistens, mänsklig bedömning', tip: 'Kontrollera att sammanfattningen inte hallucinerar fakta' },
    { label: 'Konversation', metrics: 'Mänsklig preferens, LLM-som-domare, uppgiftslösning', tip: 'Flerturns-utvärdering fångar saker som enstaka svar missar' },
  ],
  ko: [
    { label: '분류', metrics: '정확도, F1, 정밀도, 재현율', tip: '클래스별로 테스트 데이터를 층화' },
    { label: '생성', metrics: 'BLEU, ROUGE, BERTScore, 인간 평가', tip: '자동 지표는 품질과 상관관계가 낮음' },
    { label: '추출', metrics: '정확 일치, 토큰 수준 F1', tip: '형식 변형으로 테스트' },
    { label: '요약', metrics: 'ROUGE-L, 사실 일관성, 인간 평가', tip: '요약이 사실을 환각하지 않는지 확인' },
    { label: '대화', metrics: '인간 선호도, LLM 판정, 작업 완료', tip: '다중 턴 평가가 단일 응답이 놓치는 것을 포착' },
  ],
}

export const modelExamplesTranslations = { sv: [], ko: [] }
