// inference module — data array translations

export const techniquesTranslations = {
  sv: [
    { name: 'Continuous Batching', short: 'Fyll GPU:n hela tiden', description: 'Lägg till nya förfrågningar så fort platser frigörs istället för att vänta.' },
    { name: 'KV Cache', short: 'Beräkna inte om', description: 'Lagra nyckel/värde-vektorer från tidigare tokens för att undvika omberäkning.' },
    { name: 'Speculative Decoding', short: 'Gissa och verifiera', description: 'En liten modell genererar kandidater snabbt, den stora modellen verifierar parallellt.' },
    { name: 'Kvantisering', short: 'Mindre vikter', description: 'Minska viktprecision (FP16→INT4) för snabbare inferens och mindre minne.' },
    { name: 'FlashAttention', short: 'Snabbare attention', description: 'Minneseffektiv attention-beräkning som undviker att materialisera hela attention-matrisen.' },
    { name: 'Tensor Parallelism', short: 'Dela över GPU:er', description: 'Dela modellager över flera GPU:er för att hantera modeller som inte ryms på en.' },
    { name: 'PagedAttention', short: 'Effektiv KV-cache', description: 'Hantera KV-cache som virtuellt minne — allokera sidor vid behov istället för i förväg.' },
    { name: 'Prefix Caching', short: 'Återanvänd gemensamma prefix', description: 'Cachelagra KV-tillstånd för gemensamma systemprompts så de inte beräknas om.' },
  ],
  ko: [
    { name: 'Continuous Batching', short: 'GPU를 항상 채우기', description: '전체 배치가 완료될 때까지 기다리지 않고 자리가 비면 새 요청 추가.' },
    { name: 'KV Cache', short: '재계산하지 않기', description: '이전 토큰의 키/값 벡터를 저장하여 재계산 방지.' },
    { name: 'Speculative Decoding', short: '추측하고 검증', description: '작은 모델이 후보를 빠르게 생성하고 큰 모델이 병렬로 검증.' },
    { name: '양자화', short: '더 작은 가중치', description: '가중치 정밀도를 줄여(FP16→INT4) 더 빠른 추론과 적은 메모리.' },
    { name: 'FlashAttention', short: '더 빠른 어텐션', description: '전체 어텐션 행렬을 구체화하지 않는 메모리 효율적 어텐션 계산.' },
    { name: 'Tensor Parallelism', short: 'GPU 간 분할', description: '하나의 GPU에 맞지 않는 모델을 위해 모델 레이어를 여러 GPU에 분할.' },
    { name: 'PagedAttention', short: '효율적 KV 캐시', description: 'KV 캐시를 가상 메모리처럼 관리 — 미리가 아닌 필요 시 페이지 할당.' },
    { name: 'Prefix Caching', short: '공통 접두사 재사용', description: '공통 시스템 프롬프트의 KV 상태를 캐시하여 재계산 방지.' },
  ],
}

export const frameworksTranslations = {
  sv: [
    { name: 'vLLM', tagline: 'Snabbast för de flesta användningsfall', features: ['PagedAttention, continuous batching, tensor parallelism'] },
    { name: 'TGI (HuggingFace)', tagline: 'Enkel integration med HuggingFace-ekosystemet', features: ['Flash attention, kvantisering, streaming'] },
    { name: 'llama.cpp', tagline: 'CPU-inferens, GGUF-format', features: ['Körs överallt — laptop, telefon, Raspberry Pi'] },
    { name: 'Ollama', tagline: 'Enklaste sättet att köra lokalt', features: ['En-kommando-installation, modellbibliotek, API'] },
    { name: 'Amazon Bedrock', tagline: 'Hanterad inferens, 100+ modeller', features: ['Inget att hantera — API-anrop, autoskalning, företagssäkerhet'] },
  ],
  ko: [
    { name: 'vLLM', tagline: '대부분의 사용 사례에서 가장 빠름', features: ['PagedAttention, continuous batching, tensor parallelism'] },
    { name: 'TGI (HuggingFace)', tagline: 'HuggingFace 생태계와 쉬운 통합', features: ['Flash attention, 양자화, 스트리밍'] },
    { name: 'llama.cpp', tagline: 'CPU 추론, GGUF 포맷', features: ['어디서나 실행 — 노트북, 폰, Raspberry Pi'] },
    { name: 'Ollama', tagline: '로컬 실행의 가장 쉬운 방법', features: ['원커맨드 설치, 모델 라이브러리, API'] },
    { name: 'Amazon Bedrock', tagline: '관리형 추론, 100+ 모델', features: ['관리할 것 없음 — API 호출, 자동 스케일링, 엔터프라이즈 보안'] },
  ],
}
