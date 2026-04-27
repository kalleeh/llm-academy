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

export const examplesTranslations = { sv: [], ko: [] }

export const methodsTranslations = { sv: [], ko: [] }

export const pipelineTranslations = { sv: [], ko: [] }

export const trendsTranslations = { sv: [], ko: [] }

export const layersTranslations = { sv: [], ko: [] }
