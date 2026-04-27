// architecture module — data array translations

export const comparisonTranslations = {
  sv: [
    { aspect: 'Parametrar', dense: 'Alla aktiva varje token', moe: 'Bara en delmängd aktiv per token' },
    { aspect: 'Beräkning', dense: 'Proportionell mot total storlek', moe: 'Proportionell mot aktiv storlek' },
    { aspect: 'Minne', dense: 'Alla vikter i minnet', moe: 'Alla vikter i minnet (större totalt)' },
    { aspect: 'Kvalitet', dense: 'Konsekvent, förutsägbar', moe: 'Kan matcha dense med färre FLOP:ar' },
    { aspect: 'Träning', dense: 'Enklare, mer stabil', moe: 'Kräver lastbalansering, mer komplex' },
  ],
  ko: [
    { aspect: '파라미터', dense: '모든 토큰에 모두 활성', moe: '토큰당 부분집합만 활성' },
    { aspect: '계산', dense: '총 크기에 비례', moe: '활성 크기에 비례' },
    { aspect: '메모리', dense: '모든 가중치가 메모리에', moe: '모든 가중치가 메모리에 (총 더 큼)' },
    { aspect: '품질', dense: '일관적, 예측 가능', moe: '더 적은 FLOP으로 dense와 일치 가능' },
    { aspect: '학습', dense: '더 간단, 더 안정적', moe: '로드 밸런싱 필요, 더 복잡' },
  ],
}

export const presetsTranslations = { sv: [], ko: [] }
