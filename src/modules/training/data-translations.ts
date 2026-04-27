// training module — data array translations

export const variantsTranslations = {
  sv: [
    { label: 'Från grunden', desc: 'Träna en helt ny modell från slumpmässiga vikter. Dyrast men full kontroll.' },
    { label: 'Fortsatt förträning', desc: 'Ta en befintlig modell och träna vidare på domänspecifik data.' },
    { label: 'LoRA / QLoRA', desc: 'Finjustera med små adapter-matriser. Billigt, snabbt, effektivt.' },
    { label: 'Full finjustering', desc: 'Uppdatera alla vikter. Bäst kvalitet men kräver mest resurser.' },
  ],
  ko: [
    { label: '처음부터', desc: '랜덤 가중치에서 완전히 새로운 모델 학습. 가장 비싸지만 완전한 통제.' },
    { label: '계속 사전 학습', desc: '기존 모델을 가져와 도메인별 데이터로 추가 학습.' },
    { label: 'LoRA / QLoRA', desc: '작은 어댑터 행렬로 파인튜닝. 저렴하고 빠르고 효율적.' },
    { label: '전체 파인튜닝', desc: '모든 가중치 업데이트. 최고 품질이지만 가장 많은 리소스 필요.' },
  ],
}

export const formatComparisonTranslations = {
  sv: [
    { name: 'SafeTensors', useCase: 'Standard för modellvikter. Säker, snabb laddning.' },
    { name: 'GGUF', useCase: 'Kvantiserade modeller för llama.cpp. CPU-inferens.' },
    { name: 'JSONL', useCase: 'Träningsdata. En JSON-rad per exempel.' },
  ],
  ko: [
    { name: 'SafeTensors', useCase: '모델 가중치 표준. 안전하고 빠른 로딩.' },
    { name: 'GGUF', useCase: 'llama.cpp용 양자화 모델. CPU 추론.' },
    { name: 'JSONL', useCase: '학습 데이터. 예시당 하나의 JSON 행.' },
  ],
}
