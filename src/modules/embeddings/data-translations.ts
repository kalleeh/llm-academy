// embeddings module — data array translations

export const databasesTranslations = {
  sv: [
    { name: 'Pinecone', tagline: 'Helt hanterad, enklast att starta', when: 'Snabb prototypning, team utan infrastrukturerfarenhet' },
    { name: 'Weaviate', tagline: 'Öppen källkod, hybridssökning inbyggd', when: 'Behöver vektor + nyckelordssökning, vill självhosta' },
    { name: 'Qdrant', tagline: 'Rust-baserad, hög prestanda', when: 'Prestandakritiska applikationer, stora dataset' },
    { name: 'Milvus', tagline: 'Skalbar, distribuerad arkitektur', when: 'Miljardskala vektorer, företagsinstallationer' },
    { name: 'ChromaDB', tagline: 'Lättviktig, perfekt för prototyper', when: 'Lokalt utvecklande, små projekt, lärande' },
    { name: 'pgvector', tagline: 'PostgreSQL-tillägg', when: 'Redan använder PostgreSQL, vill inte lägga till ny databas' },
  ],
  ko: [
    { name: 'Pinecone', tagline: '완전 관리형, 시작하기 가장 쉬움', when: '빠른 프로토타이핑, 인프라 경험 없는 팀' },
    { name: 'Weaviate', tagline: '오픈소스, 하이브리드 검색 내장', when: '벡터 + 키워드 검색 필요, 셀프 호스팅 원함' },
    { name: 'Qdrant', tagline: 'Rust 기반, 고성능', when: '성능이 중요한 애플리케이션, 대규모 데이터셋' },
    { name: 'Milvus', tagline: '확장 가능, 분산 아키텍처', when: '수십억 규모 벡터, 엔터프라이즈 설치' },
    { name: 'ChromaDB', tagline: '경량, 프로토타입에 완벽', when: '로컬 개발, 소규모 프로젝트, 학습' },
    { name: 'pgvector', tagline: 'PostgreSQL 확장', when: '이미 PostgreSQL 사용 중, 새 데이터베이스 추가 원치 않음' },
  ],
}
