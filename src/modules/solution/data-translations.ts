// solution module — data array translations

export const approachesTranslations = {
  sv: [
    { label: 'Prompt Engineering', when: 'Modellen kan redan göra det — du behöver bara fråga bättre', effort: 'Minuter', data: 'Inga', control: 'Låg' },
    { label: 'RAG', when: 'Modellen behöver din specifika kunskap', effort: 'Dagar', data: 'Dina dokument', control: 'Medel' },
    { label: 'Finjustering', when: 'Modellen behöver nytt beteende, ton eller format', effort: 'Veckor', data: '1K-100K exempel', control: 'Hög' },
    { label: 'Förträning', when: 'Inget befintligt modell fungerar för din domän', effort: 'Månader', data: 'Miljarder tokens', control: 'Total' },
  ],
  ko: [
    { label: '프롬프트 엔지니어링', when: '모델이 이미 할 수 있음 — 더 잘 물어보면 됨', effort: '몇 분', data: '없음', control: '낮음' },
    { label: 'RAG', when: '모델에 특정 지식이 필요', effort: '며칠', data: '문서', control: '중간' },
    { label: '파인튜닝', when: '모델에 새로운 행동, 톤, 형식이 필요', effort: '몇 주', data: '1K-100K 예시', control: '높음' },
    { label: '사전 학습', when: '기존 모델이 도메인에 맞지 않음', effort: '몇 달', data: '수십억 토큰', control: '완전' },
  ],
}

export const scenariosTranslations = {
  sv: [
    { label: 'Kundsupport-bot', answer: 'RAG' },
    { label: 'Kodgranskning', answer: 'Prompt Engineering' },
    { label: 'Medicinsk rapport-sammanfattning', answer: 'Finjustering' },
    { label: 'Intern policy-Q&A', answer: 'RAG' },
    { label: 'Varumärkesröst-skrivande', answer: 'Finjustering' },
    { label: 'Dataextraktion från fakturor', answer: 'Finjustering' },
  ],
  ko: [
    { label: '고객 지원 봇', answer: 'RAG' },
    { label: '코드 리뷰', answer: '프롬프트 엔지니어링' },
    { label: '의료 보고서 요약', answer: '파인튜닝' },
    { label: '내부 정책 Q&A', answer: 'RAG' },
    { label: '브랜드 보이스 작성', answer: '파인튜닝' },
    { label: '인보이스 데이터 추출', answer: '파인튜닝' },
  ],
}

export const comparisonTranslations = {
  sv: [
    { aspect: 'Kostnadsmodell', api: 'Betala per token — skalas med användning', openSource: 'Fast infrakostnad — GPU-hyra/köp', fineTuned: 'Träningskostnad + hostingkostnad' },
    { aspect: 'Latens', api: '100–2000ms — nätverk + kötid', openSource: '50–500ms — lokal inferens', fineTuned: 'Samma som vald hostingmetod' },
    { aspect: 'Integritet', api: 'Data behandlas av leverantör — företagsnivåer erbjuder SOC 2, HIPAA', openSource: 'Full kontroll — men säkerhet är ditt ansvar', fineTuned: 'Risk för exponering av träningsdata varierar' },
    { aspect: 'Anpassning', api: 'Prompt engineering + systemprompts', openSource: 'Full modellåtkomst — ändra vad som helst', fineTuned: 'Djup anpassning av beteende/kunskap' },
    { aspect: 'Leverantörslåsning', api: 'Hög — API-specifika funktioner', openSource: 'Ingen — byt modeller fritt', fineTuned: 'Medel — bunden till basmodellens ekosystem' },
    { aspect: 'Underhåll', api: 'Noll — leverantören hanterar allt', openSource: 'Högt — du hanterar infra, uppdateringar, skalning', fineTuned: 'Högt — omträning när basmodeller förbättras' },
    { aspect: 'Tid till produktion', api: 'Timmar–Dagar', openSource: 'Veckor — infrauppsättning, optimering', fineTuned: 'Veckor–Månader — datakurering, träning' },
    { aspect: 'Kvalitetstak', api: 'Högst — frontiermodeller', openSource: 'Bra — Llama 3, Mistral konkurrenskraftiga', fineTuned: 'Bäst för specifika domänuppgifter' },
  ],
  ko: [
    { aspect: '비용 모델', api: '토큰당 지불 — 사용량에 따라 확장', openSource: '고정 인프라 비용 — GPU 임대/구매', fineTuned: '학습 비용 + 호스팅 비용' },
    { aspect: '지연시간', api: '100–2000ms — 네트워크 + 대기 시간', openSource: '50–500ms — 로컬 추론', fineTuned: '선택한 호스팅 방식과 동일' },
    { aspect: '프라이버시', api: '제공업체가 데이터 처리 — 엔터프라이즈 티어가 SOC 2, HIPAA 제공', openSource: '완전한 통제 — 하지만 보안은 본인 책임', fineTuned: '학습 데이터 노출 위험은 다양' },
    { aspect: '커스터마이징', api: '프롬프트 엔지니어링 + 시스템 프롬프트', openSource: '완전한 모델 접근 — 무엇이든 수정', fineTuned: '행동/지식의 깊은 커스터마이징' },
    { aspect: '벤더 종속', api: '높음 — API별 기능', openSource: '없음 — 자유롭게 모델 전환', fineTuned: '중간 — 기본 모델 생태계에 종속' },
    { aspect: '유지보수', api: '제로 — 제공업체가 모든 것 처리', openSource: '높음 — 인프라, 업데이트, 스케일링 관리', fineTuned: '높음 — 기본 모델 개선 시 재학습' },
    { aspect: '프로덕션까지 시간', api: '시간–일', openSource: '주 — 인프라 설정, 최적화', fineTuned: '주–월 — 데이터 큐레이션, 학습' },
    { aspect: '품질 상한', api: '최고 — 프론티어 모델', openSource: '좋음 — Llama 3, Mistral 경쟁력', fineTuned: '특정 도메인 작업에 최적' },
  ],
}

export const constraintsTranslations = {
  sv: [
    { label: 'Datakänslighet', question: 'Hur känslig är er data?' },
    { label: 'Budget', question: 'Vilken budgetmodell?' },
    { label: 'Teamexpertis', question: 'ML-ingenjörskapacitet?' },
    { label: 'Latensbehov', question: 'Latenskrav?' },
  ],
  ko: [
    { label: '데이터 민감도', question: '데이터가 얼마나 민감한가요?' },
    { label: '예산', question: '예산 모델은?' },
    { label: '팀 전문성', question: 'ML 엔지니어링 역량?' },
    { label: '지연시간 요구', question: '지연시간 요구사항?' },
  ],
}
export const casesTranslations = {
  sv: [
    { title: 'Kundsupport-bot', problem: 'Svara på 10K+ supportärenden/månad med konsekvent kvalitet' },
    { title: 'Juridisk dokumentgranskning', problem: 'Granska kontrakt för risker och efterlevnadsproblem' },
    { title: 'Intern kunskapsbas', problem: 'Anställda kan inte hitta svar i 50K+ policydokument' },
    { title: 'Kodassistent', problem: 'Snabba upp utveckling med AI-kodförslag' },
  ],
  ko: [
    { title: '고객 지원 봇', problem: '월 10K+ 지원 티켓에 일관된 품질로 답변' },
    { title: '법률 문서 검토', problem: '계약서에서 위험과 컴플라이언스 문제 검토' },
    { title: '내부 지식 베이스', problem: '직원들이 50K+ 정책 문서에서 답을 찾지 못함' },
    { title: '코드 어시스턴트', problem: 'AI 코드 제안으로 개발 속도 향상' },
  ],
}
export const ragVsFinetuneTranslations = {
  sv: [
    { aspect: 'Kunskapskälla', rag: 'Externa dokument (hämtas vid frågetid)', finetune: 'Inbakad i modellvikterna' },
    { aspect: 'Uppdateringsfrekvens', rag: 'Omedelbar (uppdatera dokument)', finetune: 'Kräver omträning' },
    { aspect: 'Källhänvisningar', rag: 'Ja — kan peka på källchunks', finetune: 'Nej — kunskap är implicit' },
    { aspect: 'Beteendeändring', rag: 'Minimal — samma modell, ny kunskap', finetune: 'Djup — ny ton, format, stil' },
    { aspect: 'Datakrav', rag: 'Dokument i valfritt format', finetune: '1K-100K strukturerade exempel' },
    { aspect: 'Kostnad', rag: 'Låg (embedding + vektorlagring)', finetune: 'Medel-Hög (GPU-träning)' },
  ],
  ko: [
    { aspect: '지식 소스', rag: '외부 문서 (질의 시 검색)', finetune: '모델 가중치에 내장' },
    { aspect: '업데이트 빈도', rag: '즉시 (문서 업데이트)', finetune: '재학습 필요' },
    { aspect: '출처 인용', rag: '예 — 소스 청크를 가리킬 수 있음', finetune: '아니요 — 지식이 암묵적' },
    { aspect: '행동 변경', rag: '최소 — 같은 모델, 새 지식', finetune: '깊음 — 새 톤, 형식, 스타일' },
    { aspect: '데이터 요구', rag: '모든 형식의 문서', finetune: '1K-100K 구조화된 예시' },
    { aspect: '비용', rag: '낮음 (임베딩 + 벡터 스토리지)', finetune: '중-높음 (GPU 학습)' },
  ],
}
