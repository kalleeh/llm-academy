// transformer module — data array translations

export const layersTranslations = {
  sv: [
    { label: 'Indata-embedding', desc: 'Konverterar tokens till vektorer och lägger till positionsinformation' },
    { label: 'Attention', desc: 'Varje token tittar på alla andra tokens för att samla kontext' },
    { label: 'Feed-Forward', desc: 'Bearbetar varje token oberoende — där kunskap lagras' },
    { label: 'Layer Norm', desc: 'Stabiliserar värden mellan lager' },
    { label: 'Residual', desc: 'Adderar indata tillbaka till utdata (hoppa-över-koppling)' },
    { label: 'Utdata', desc: 'Projicerar till vokabulärstorlek för nästa-token-sannolikheter' },
  ],
  ko: [
    { label: '입력 임베딩', desc: '토큰을 벡터로 변환하고 위치 정보를 추가' },
    { label: '어텐션', desc: '각 토큰이 컨텍스트를 수집하기 위해 다른 모든 토큰을 봄' },
    { label: '피드포워드', desc: '각 토큰을 독립적으로 처리 — 지식이 저장되는 곳' },
    { label: 'Layer Norm', desc: '레이어 간 값을 안정화' },
    { label: 'Residual', desc: '입력을 출력에 다시 추가 (스킵 연결)' },
    { label: '출력', desc: '다음 토큰 확률을 위해 어휘 크기로 투영' },
  ],
}

export const layerDataTranslations = {
  sv: [
    { name: 'Rå token', description: 'Bara ett index i vokabulären. Ingen semantisk information ännu.' },
    { name: 'Embedding', description: 'Token konverterad till en tät vektor. Position tillagd.' },
    { name: 'Lager 1', description: 'Grundläggande syntaktiska mönster framträder. Modellen börjar känna igen ordklasser.' },
    { name: 'Lager 16', description: 'Semantiska relationer bildas. Modellen förstår sammansatta begrepp.' },
  ],
  ko: [
    { name: '원시 토큰', description: '어휘에서의 인덱스일 뿐. 아직 의미 정보 없음.' },
    { name: '임베딩', description: '토큰이 밀집 벡터로 변환됨. 위치 추가됨.' },
    { name: '레이어 1', description: '기본 구문 패턴이 나타남. 모델이 품사를 인식하기 시작.' },
    { name: '레이어 16', description: '의미적 관계가 형성됨. 모델이 복합 개념을 이해.' },
  ],
}
