// quantization module — data array translations

export const quantLevelsTranslations = {
  sv: [
    { label: 'FP32', useCase: 'Träning, referens' },
    { label: 'FP16', useCase: 'Standard inferens' },
    { label: 'INT8', useCase: 'Snabbare inferens, minimal kvalitetsförlust' },
    { label: 'INT4', useCase: 'Sweet spot — 75% minnesbesparingar, <1% kvalitetsförlust' },
    { label: 'INT3', useCase: 'Aggressiv komprimering, märkbar kvalitetsförlust' },
    { label: 'INT2', useCase: 'Experimentellt — betydande kvalitetsförlust' },
    { label: 'Binary (1-bit)', useCase: 'Forskningsstadie — dramatisk kvalitetsförlust' },
  ],
  ko: [
    { label: 'FP32', useCase: '학습, 참조' },
    { label: 'FP16', useCase: '표준 추론' },
    { label: 'INT8', useCase: '더 빠른 추론, 최소 품질 손실' },
    { label: 'INT4', useCase: '최적점 — 75% 메모리 절약, <1% 품질 손실' },
    { label: 'INT3', useCase: '공격적 압축, 눈에 띄는 품질 손실' },
    { label: 'INT2', useCase: '실험적 — 상당한 품질 손실' },
    { label: 'Binary (1-bit)', useCase: '연구 단계 — 극적인 품질 손실' },
  ],
}

export const methodsTranslations = {
  sv: [
    { name: 'GPTQ', tagline: 'GPU-optimerad, kalibrerad kvantisering', howItWorks: 'Använder kalibreringsdata för att hitta optimala kvantiseringspunkter per lager. Producerar GPU-optimerade modeller.', pros: ['Hög kvalitet med kalibrering', 'Snabb GPU-inferens', 'Väletablerat ekosystem'], cons: ['Kräver GPU', 'Kalibreringsdata behövs', 'Långsammare kvantiseringsprocess'], whenToUse: 'GPU-inferens i produktion med kvalitetskrav' },
    { name: 'GGUF', tagline: 'CPU-vänligt, llama.cpp-format', howItWorks: 'Kvantiserar vikter till valbar precision (Q4_K_M, Q5_K_S etc). Optimerat för CPU-inferens via llama.cpp.', pros: ['Körs på CPU (ingen GPU krävs)', 'Flexibla kvantiseringsnivåer', 'Stort community, många modeller'], cons: ['Långsammare än GPU-metoder', 'Kvalitet varierar med nivå'], whenToUse: 'Lokal inferens på laptop/desktop, edge-enheter' },
    { name: 'AWQ', tagline: 'Activation-aware, bevarar viktiga vikter', howItWorks: 'Identifierar vilka vikter som är viktigast baserat på aktiveringsmönster och kvantiserar dem mer försiktigt.', pros: ['Bättre kvalitet än naiv kvantisering', 'Snabb inferens', 'Bra för 4-bit'], cons: ['Kräver kalibreringsdata', 'Nyare, mindre ekosystem'], whenToUse: 'När kvalitet vid 4-bit är kritisk' },
    { name: 'bitsandbytes', tagline: 'Integrerat i HuggingFace, enkelt att använda', howItWorks: 'Kvantiserar modellen vid laddning med en flagga (load_in_4bit). Används ofta med QLoRA för finjustering.', pros: ['Enklast att använda', 'Integrerat i transformers-biblioteket', 'Perfekt för QLoRA'], cons: ['Bara NVIDIA GPU:er', 'Inte optimalt för ren inferens'], whenToUse: 'QLoRA-finjustering, snabb prototypning' },
  ],
  ko: [
    { name: 'GPTQ', tagline: 'GPU 최적화, 캘리브레이션 양자화', howItWorks: '캘리브레이션 데이터를 사용하여 레이어별 최적 양자화 포인트를 찾습니다. GPU 최적화 모델을 생성합니다.', pros: ['캘리브레이션으로 높은 품질', '빠른 GPU 추론', '잘 확립된 생태계'], cons: ['GPU 필요', '캘리브레이션 데이터 필요', '느린 양자화 과정'], whenToUse: '품질 요구가 있는 프로덕션 GPU 추론' },
    { name: 'GGUF', tagline: 'CPU 친화적, llama.cpp 포맷', howItWorks: '선택 가능한 정밀도(Q4_K_M, Q5_K_S 등)로 가중치를 양자화합니다. llama.cpp를 통한 CPU 추론에 최적화.', pros: ['CPU에서 실행 (GPU 불필요)', '유연한 양자화 수준', '큰 커뮤니티, 많은 모델'], cons: ['GPU 방법보다 느림', '수준에 따라 품질 변동'], whenToUse: '노트북/데스크톱에서 로컬 추론, 엣지 디바이스' },
    { name: 'AWQ', tagline: '활성화 인식, 중요한 가중치 보존', howItWorks: '활성화 패턴을 기반으로 가장 중요한 가중치를 식별하고 더 신중하게 양자화합니다.', pros: ['순진한 양자화보다 나은 품질', '빠른 추론', '4비트에 적합'], cons: ['캘리브레이션 데이터 필요', '더 새로운, 작은 생태계'], whenToUse: '4비트에서 품질이 중요할 때' },
    { name: 'bitsandbytes', tagline: 'HuggingFace 통합, 사용 간편', howItWorks: '로딩 시 플래그 하나로 모델을 양자화(load_in_4bit). QLoRA 파인튜닝에 자주 사용.', pros: ['가장 사용하기 쉬움', 'transformers 라이브러리에 통합', 'QLoRA에 완벽'], cons: ['NVIDIA GPU만', '순수 추론에 최적이 아님'], whenToUse: 'QLoRA 파인튜닝, 빠른 프로토타이핑' },
  ],
}
