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

// Case studies translations
export const caseStudiesTranslations = {
  sv: [
    { title: 'Kundsupport', problem: 'E-handelsföretag får 10K supportärenden/dag. 60% är repetitiva. Behöver 24/7-täckning med korrekta, varumärkesanpassade svar.', solution: 'RAG + finjusterad liten modell', approach: 'RAG hämtar från kunskapsbas. Finjusterad 8B-modell säkerställer konsekvent varumärkesröst.', result: '70% ärendedeflektering, $0.002/fråga, 800ms snittlatens',
      steps: [
        { question: 'Ändras data ofta?', answer: 'Ja — policyer, produkter och FAQ uppdateras veckovis → RAG för kunskapshämtning' },
        { question: 'Behövs specifik stil?', answer: 'Ja — varumärkesröst, empatisk ton → Finjustera en liten modell för stil' },
        { question: 'Volym och latens?', answer: '10K/dag, <2s svar → Liten modell (8B) för hastighet, självhostad för kostnad' },
        { question: 'Integritetsfrågor?', answer: 'Kunddata involverad → Självhostad för att hålla data internt' },
      ] },
    { title: 'Kodassistent', problem: 'Startup behöver AI-kodassistent som förstår deras ramverk. Måste hantera kodgenerering, felsökning och dokumentation.', solution: 'Stor modell-API + anpassade prompts', approach: 'Frontier API-modell för maximal kodkvalitet. Omfattande systemprompts med ramverksdokumentation.', result: '40% snabbare utveckling, $3K/mån API-kostnad för 500 utvecklare',
      steps: [
        { question: 'Uppgiftskomplexitet?', answer: 'Mycket hög — flerfilsresonemang, felsökning → Behöver frontier-modellkapacitet' },
        { question: 'Proprietär kunskap?', answer: 'Ja — anpassade ramverksdokument → RAG för API-referens, systemprompt för mönster' },
        { question: 'Träningsdata tillgänglig?', answer: 'Begränsad — litet ramverk, få exempel → Inte tillräckligt för effektiv finjustering' },
        { question: 'Budget vs kvalitet?', answer: 'Kvalitet är kritisk för utvecklarförtroende → API-kostnad motiverad av kapacitetsgap' },
      ] },
    { title: 'Medicinsk dokumentanalys', problem: 'Sjukhusnätverk behöver extrahera strukturerad data från kliniska anteckningar. Måste hantera medicinsk terminologi och följa HIPAA.', solution: 'Finjusterad domänmodell', approach: 'Finjustera en medicinsk domänmodell på annoterade kliniska dokument. Självhostad för HIPAA.', result: '94% extraktionsnoggrannhet, HIPAA-kompatibel, 3s per dokument',
      steps: [
        { question: 'Domänspecificitet?', answer: 'Extremt hög — medicinsk terminologi, förkortningar → Finjustering nödvändig' },
        { question: 'Regulatoriska krav?', answer: 'HIPAA — ingen data får lämna lokalen → Måste självhosta, inga externa API:er' },
        { question: 'Utdataformat?', answer: 'Strukturerad extraktion (ICD-koder, mediciner) → Finjustera för konsekvent schema' },
        { question: 'Datatillgänglighet?', answer: '50K annoterade kliniska anteckningar → Tillräckligt för effektiv finjustering' },
      ] },
    { title: 'Intern kunskapsbas', problem: 'Företag med 50K anställda kan inte hitta information. Anställda slösar 2 timmar/dag på att söka svar.', solution: 'RAG med vektorlagring', approach: 'Indexera alla interna dokument i en vektorlagring. RAG-pipeline hämtar relevanta delar och genererar svar med källänkar.', result: '85% svarsnoggrannhet, sparar 45min/anställd/dag, $1.2K/mån',
      steps: [
        { question: 'Datavolym och aktualitet?', answer: '100K+ dokument, uppdateras dagligen → RAG med inkrementell indexering' },
        { question: 'Behövs källhänvisningar?', answer: 'Kritiskt — anställda måste verifiera svar → RAG ger källänkar' },
        { question: 'Anpassning behövs?', answer: 'Minimal — generellt Q&A-format → Prompting räcker, ingen finjustering' },
        { question: 'Skala?', answer: '50K användare, ~5K frågor/dag → API-modell för enkelhet, hanterbar kostnad' },
      ] },
  ],
  ko: [
    { title: '고객 지원', problem: '이커머스 회사가 하루 10K 지원 티켓을 받습니다. 60%가 반복적입니다. 정확하고 브랜드에 맞는 24/7 응대가 필요합니다.', solution: 'RAG + 파인튜닝된 소형 모델', approach: 'RAG가 지식 베이스에서 검색합니다. 파인튜닝된 8B 모델이 일관된 브랜드 보이스를 보장합니다.', result: '70% 티켓 전환, $0.002/쿼리, 800ms 평균 지연',
      steps: [
        { question: '데이터가 자주 변경되나요?', answer: '예 — 정책, 제품, FAQ가 매주 업데이트 → 지식 검색을 위한 RAG' },
        { question: '특정 출력 스타일이 필요한가요?', answer: '예 — 브랜드 보이스, 공감적 톤 → 스타일을 위한 소형 모델 파인튜닝' },
        { question: '볼륨과 지연시간?', answer: '하루 10K, <2초 응답 → 속도를 위한 소형 모델(8B), 비용을 위한 셀프 호스팅' },
        { question: '개인정보 우려?', answer: '고객 데이터 관련 → 데이터를 내부에 유지하기 위한 셀프 호스팅' },
      ] },
    { title: '코드 어시스턴트', problem: '스타트업이 자체 프레임워크를 이해하는 AI 코드 어시스턴트가 필요합니다. 코드 생성, 디버깅, 문서화를 처리해야 합니다.', solution: '대형 모델 API + 커스텀 프롬프트', approach: '최대 코드 품질을 위한 프론티어 API 모델. 프레임워크 문서가 포함된 상세한 시스템 프롬프트.', result: '40% 빠른 개발, 500명 개발자에 월 $3K API 비용',
      steps: [
        { question: '작업 복잡도?', answer: '매우 높음 — 다중 파일 추론, 디버깅 → 프론티어 모델 능력 필요' },
        { question: '독점 지식?', answer: '예 — 커스텀 프레임워크 문서 → API 참조를 위한 RAG, 패턴을 위한 시스템 프롬프트' },
        { question: '학습 데이터 가용성?', answer: '제한적 — 작은 프레임워크, 적은 예시 → 효과적인 파인튜닝에 불충분' },
        { question: '예산 vs 품질?', answer: '개발자 신뢰를 위해 품질이 중요 → 능력 격차로 API 비용 정당화' },
      ] },
    { title: '의료 문서 분석', problem: '병원 네트워크가 임상 노트에서 구조화된 데이터를 추출해야 합니다. 의료 용어를 처리하고 HIPAA를 준수해야 합니다.', solution: '파인튜닝된 도메인 모델', approach: '주석이 달린 임상 문서로 의료 도메인 모델을 파인튜닝합니다. HIPAA 준수를 위해 셀프 호스팅.', result: '94% 추출 정확도, HIPAA 준수, 문서당 3초',
      steps: [
        { question: '도메인 특수성?', answer: '매우 높음 — 의료 용어, 약어 → 파인튜닝 필수' },
        { question: '규제 요구사항?', answer: 'HIPAA — 데이터가 구내를 떠날 수 없음 → 셀프 호스팅 필수, 외부 API 불가' },
        { question: '출력 형식?', answer: '구조화된 추출 (ICD 코드, 약물) → 일관된 스키마를 위한 파인튜닝' },
        { question: '데이터 가용성?', answer: '50K 주석 임상 노트 → 효과적인 파인튜닝에 충분' },
      ] },
    { title: '내부 지식 베이스', problem: '50K 직원 기업이 정보를 찾지 못합니다. 직원들이 하루 2시간을 답변 검색에 낭비합니다.', solution: '벡터 스토어를 사용한 RAG', approach: '모든 내부 문서를 벡터 스토어에 인덱싱합니다. RAG 파이프라인이 관련 청크를 검색하고 소스 링크와 함께 답변을 생성합니다.', result: '85% 답변 정확도, 직원당 하루 45분 절약, 월 $1.2K',
      steps: [
        { question: '데이터 볼륨과 최신성?', answer: '100K+ 문서, 매일 업데이트 → 증분 인덱싱을 사용한 RAG' },
        { question: '인용이 필요한가요?', answer: '필수 — 직원이 답변을 검증해야 함 → RAG가 소스 링크 제공' },
        { question: '커스터마이징 필요?', answer: '최소 — 일반 Q&A 형식 → 프롬프팅으로 충분, 파인튜닝 불필요' },
        { question: '규모?', answer: '50K 사용자, 하루 ~5K 쿼리 → 단순성을 위한 API 모델, 관리 가능한 비용' },
      ] },
  ],
}
