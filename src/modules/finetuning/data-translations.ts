// finetuning module — data array translations

export const winCasesTranslations = {
  sv: [
    { title: 'Konsekvent utdataformat', desc: 'Returnera alltid giltig JSON, specifikt XML-schema eller strukturerade rapporter — utan bräcklig prompt engineering.' },
    { title: 'Domänterminologi', desc: 'Medicinsk, juridisk eller intern jargong som basmodellen får fel eller hallucinerar.' },
    { title: 'Latensreduktion', desc: 'En finjusterad 8B-modell kan matcha en generell 70B-modell på din uppgift — 10x snabbare, 10x billigare.' },
    { title: 'Beteendemönster', desc: 'Lär ut en specifik ton, avvisningsstil eller flerstegsresonemang som prompting inte kan producera pålitligt.' },
  ],
  ko: [
    { title: '일관된 출력 형식', desc: '항상 유효한 JSON, 특정 XML 스키마, 구조화된 보고서를 반환 — 취약한 프롬프트 엔지니어링 없이.' },
    { title: '도메인 용어', desc: '기본 모델이 틀리거나 환각하는 의료, 법률, 내부 전문 용어.' },
    { title: '지연시간 감소', desc: '파인튜닝된 8B 모델이 작업에서 범용 70B 모델과 일치 — 10배 빠르고 10배 저렴.' },
    { title: '행동 패턴', desc: '프롬프팅으로 안정적으로 생성할 수 없는 특정 톤, 거부 스타일, 다단계 추론을 학습.' },
  ],
}

export const checklistTranslations = {
  sv: [
    { label: 'Formatvalidering', detail: 'Varje exempel följer det valda formatet (ChatML, Alpaca, etc.)' },
    { label: 'Balanserade kategorier', detail: 'Ingen kategori dominerar — balanserad representation' },
    { label: 'Kvalitetsgranskning', detail: 'Stickprov 50+ exempel manuellt — är svaren faktiskt bra?' },
    { label: 'Inga dubbletter', detail: 'Exakt och nära-dubbletter borttagna' },
    { label: 'Rätt längd', detail: 'Svar är varken för korta (underspecificerade) eller för långa (utfyllnad)' },
    { label: 'Testdelning', detail: '10-20% hålls ut för validering — aldrig sett under träning' },
  ],
  ko: [
    { label: '형식 검증', detail: '모든 예시가 선택한 형식(ChatML, Alpaca 등)을 따름' },
    { label: '균형 잡힌 카테고리', detail: '어떤 카테고리도 지배하지 않음 — 균형 잡힌 표현' },
    { label: '품질 검토', detail: '50개 이상 예시를 수동으로 표본 검사 — 답변이 실제로 좋은가?' },
    { label: '중복 없음', detail: '정확한 중복과 유사 중복 제거' },
    { label: '적절한 길이', detail: '답변이 너무 짧지(불충분) 않고 너무 길지(채우기) 않음' },
    { label: '테스트 분할', detail: '10-20%를 검증용으로 보류 — 학습 중 절대 보지 않음' },
  ],
}

export const platformsTranslations = {
  sv: [
    { name: 'Unsloth (lokal)', ease: 'Medel', notes: 'Snabbast för LoRA/QLoRA. Gratis, öppen källkod.' },
    { name: 'Amazon SageMaker', ease: 'Medel', notes: 'Hanterad träning på AWS. Bra integration med Bedrock.' },
    { name: 'Google Vertex AI', ease: 'Enkel', notes: 'Hanterad finjustering med ett klick för Gemma/PaLM.' },
    { name: 'Together AI', ease: 'Enkel', notes: 'API-baserad finjustering. Betala per jobb.' },
    { name: 'Modal / RunPod', ease: 'Medel', notes: 'GPU-hyra per timme. Full kontroll, lägre kostnad.' },
  ],
  ko: [
    { name: 'Unsloth (로컬)', ease: '중간', notes: 'LoRA/QLoRA에 가장 빠름. 무료, 오픈소스.' },
    { name: 'Amazon SageMaker', ease: '중간', notes: 'AWS에서 관리형 학습. Bedrock과 좋은 통합.' },
    { name: 'Google Vertex AI', ease: '쉬움', notes: 'Gemma/PaLM을 위한 원클릭 관리형 파인튜닝.' },
    { name: 'Together AI', ease: '쉬움', notes: 'API 기반 파인튜닝. 작업당 지불.' },
    { name: 'Modal / RunPod', ease: '중간', notes: '시간당 GPU 임대. 완전한 통제, 낮은 비용.' },
  ],
}
