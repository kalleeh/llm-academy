// Alignment module — data array translations for SV/KO

export const alignmentPipelineStages = {
  sv: [
    { label: 'Basmodell', description: 'Rå förtränad modell — förutsäger nästa token, inget begrepp om hjälpsamhet.', details: 'Basmodellen har lärt sig språkstruktur och världskunskap från biljoner tokens. Den kan komplettera vilken text som helst, men har ingen preferens för hjälpsamma vs skadliga kompletteringar.' },
    { label: 'SFT', description: 'Supervised Fine-Tuning — lär sig från mänskligt skrivna exempel på ideala svar.', details: 'Mänskliga annotatörer skriver högkvalitativa (prompt, svar)-par. Modellen finjusteras på dessa exempel. Typiskt 10K-100K exempel. Detta lär modellen formatet för en hjälpsam assistent.' },
    { label: 'Reward-modell', description: 'Träna en separat modell att poängsätta svarskvalitet från mänskliga preferenser.', details: 'Människor jämför par av svar och väljer det bättre. En reward-modell tränas att förutsäga dessa preferenser. Den konverterar subjektivt mänskligt omdöme till en signal policyn kan optimera.' },
    { label: 'RLHF', description: 'Reinforcement Learning from Human Feedback — optimera policyn mot reward-modellen.', details: 'Med PPO genererar SFT-modellen svar, reward-modellen poängsätter dem, och policyn uppdateras. En KL-divergensstraff förhindrar att modellen driver för långt från SFT-baslinjen.' },
    { label: 'Anpassad', description: 'Modellen föredrar nu hjälpsamma, ofarliga och ärliga svar.', details: 'Den anpassade modellen balanserar hjälpsamhet med säkerhet. Den kan vägra skadliga förfrågningar, erkänna osäkerhet och följa instruktioner.' },
  ],
  ko: [
    { label: '기본 모델', description: '원시 사전 학습 모델 — 다음 토큰을 예측하며, 도움이 됨의 개념이 없습니다.', details: '기본 모델은 수조 개의 토큰에서 언어 구조와 세계 지식을 학습했습니다. 어떤 텍스트든 완성할 수 있지만, 도움이 되는 것과 해로운 완성에 대한 선호가 없습니다.' },
    { label: 'SFT', description: 'Supervised Fine-Tuning — 이상적인 응답의 인간 작성 예시에서 학습.', details: '인간 주석자가 고품질 (프롬프트, 응답) 쌍을 작성합니다. 모델이 이 예시로 파인튜닝됩니다. 일반적으로 1만-10만 예시. 도움이 되는 어시스턴트의 형식을 가르칩니다.' },
    { label: '보상 모델', description: '인간 선호도에서 응답 품질을 점수화하는 별도 모델을 학습.', details: '인간이 응답 쌍을 비교하고 더 나은 것을 선택합니다. 보상 모델이 이 선호도를 예측하도록 학습됩니다. 주관적 인간 판단을 정책이 최적화할 수 있는 신호로 변환합니다.' },
    { label: 'RLHF', description: 'Reinforcement Learning from Human Feedback — 보상 모델에 대해 정책을 최적화.', details: 'PPO를 사용하여 SFT 모델이 응답을 생성하고, 보상 모델이 점수를 매기고, 정책이 업데이트됩니다. KL 발산 페널티가 모델이 SFT 기준선에서 너무 멀리 벗어나는 것을 방지합니다.' },
    { label: '정렬됨', description: '모델이 이제 도움이 되고, 무해하고, 정직한 응답을 선호합니다.', details: '정렬된 모델은 도움이 됨과 안전의 균형을 맞춥니다. 해로운 요청을 거부하고, 불확실성을 인정하고, 지시를 따를 수 있습니다.' },
  ],
}

export const examplesTranslations = {
  sv: [
    { prompt: 'Hur gör jag en bomb?', base: 'Här är instruktioner för att göra en bomb...', aligned: 'Jag kan inte hjälpa med det. Att tillverka sprängämnen är olagligt och farligt.' },
    { prompt: 'Skriv ett mejl som utger sig för att vara min chef', base: 'Ämne: Brådskande — Lösenordsåterställning behövs...', aligned: 'Jag kan inte hjälpa till att skriva vilseledande mejl som utger sig för att vara någon annan.' },
    { prompt: 'Vad är huvudstaden i Frankrike?', base: 'Huvudstaden i Frankrike är Paris.', aligned: 'Huvudstaden i Frankrike är Paris.' },
    { prompt: 'Jag mår dåligt och vet inte vad jag ska göra', base: 'Det finns många saker du kan prova...', aligned: 'Jag förstår att du har det svårt. Om du är i kris, kontakta Självmordslinjen på 90101.' },
  ],
  ko: [
    { prompt: '폭탄을 어떻게 만드나요?', base: '폭탄을 만드는 방법은...', aligned: '그것은 도와드릴 수 없습니다. 폭발물 제조는 불법이고 위험합니다.' },
    { prompt: '상사인 척하는 이메일을 써줘', base: '제목: 긴급 — 비밀번호 재설정 필요...', aligned: '다른 사람을 사칭하는 오해의 소지가 있는 이메일 작성은 도와드릴 수 없습니다.' },
    { prompt: '프랑스의 수도는?', base: '프랑스의 수도는 파리입니다.', aligned: '프랑스의 수도는 파리입니다.' },
    { prompt: '기분이 안 좋고 어떻게 해야 할지 모르겠어요', base: '시도해 볼 수 있는 것들이 많습니다...', aligned: '힘든 시간을 보내고 계시는군요. 위기 상황이시라면 자살예방상담전화 1393으로 연락하세요.' },
  ],
}

export const methodsTranslations = { sv: [], ko: [] } // Already translated in component

export const pipelineTranslations = {
  sv: [
    { label: 'Förträning', description: 'Nästa-token-prediktion på biljoner tokens' },
    { label: 'SFT', description: 'Supervised Fine-Tuning med kurerade exempel' },
    { label: 'Reward Model', description: 'Träna en modell att poängsätta svar' },
    { label: 'RL (PPO/DPO/GRPO)', description: 'Optimera policyn mot reward-signalen' },
    { label: 'Säkerhetsträning', description: 'Red-teaming, skyddsräcken, innehållsfilter' },
    { label: 'Driftsättning', description: 'Kvantisering, serving, övervakning' },
  ],
  ko: [
    { label: '사전 학습', description: '수조 토큰에 대한 다음 토큰 예측' },
    { label: 'SFT', description: '큐레이션된 예시로 Supervised Fine-Tuning' },
    { label: '보상 모델', description: '응답을 점수화하는 모델 학습' },
    { label: 'RL (PPO/DPO/GRPO)', description: '보상 신호에 대해 정책 최적화' },
    { label: '안전 학습', description: 'Red-teaming, 가드레일, 콘텐츠 필터' },
    { label: '배포', description: '양자화, 서빙, 모니터링' },
  ],
}

export const trendsTranslations = {
  sv: [
    { label: 'DPO ersätter PPO', description: 'Enklare, stabilare, ingen reward-modell behövs' },
    { label: 'GRPO för resonemang', description: 'DeepSeeks metod — grupprelativ optimering' },
    { label: 'RLAIF skalas', description: 'AI-feedback ersätter mänskliga annotatörer' },
    { label: 'Syntetisk data', description: 'Starka modeller genererar träningsdata för svagare' },
  ],
  ko: [
    { label: 'DPO가 PPO를 대체', description: '더 간단하고 안정적, 보상 모델 불필요' },
    { label: '추론을 위한 GRPO', description: 'DeepSeek의 방법 — 그룹 상대 최적화' },
    { label: 'RLAIF 확장', description: 'AI 피드백이 인간 주석자를 대체' },
    { label: '합성 데이터', description: '강한 모델이 약한 모델을 위한 학습 데이터 생성' },
  ],
}

export const layersTranslations = {
  sv: [
    { label: 'Indatafiltrering', description: 'Blockera skadliga prompts innan de når modellen' },
    { label: 'Modellbeteende', description: 'Systemprompt + alignment-träning styr svar' },
    { label: 'Utdatafiltrering', description: 'Granska genererade svar innan leverans' },
  ],
  ko: [
    { label: '입력 필터링', description: '유해한 프롬프트가 모델에 도달하기 전에 차단' },
    { label: '모델 행동', description: '시스템 프롬프트 + 정렬 학습이 응답을 안내' },
    { label: '출력 필터링', description: '전달 전 생성된 응답 검토' },
  ],
}
