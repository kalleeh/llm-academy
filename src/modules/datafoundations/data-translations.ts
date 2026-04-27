// datafoundations module — data array translations

export const categoriesTranslations = {
  sv: [
    { title: 'Strukturerad', description: 'Rader och kolumner med definierade typer. Tänk kalkylblad, SQL-databaser, CSV-filer.' },
    { title: 'Semi-strukturerad', description: 'Har viss organisation men inget strikt schema. JSON, XML, loggar, e-post med rubriker.' },
    { title: 'Ostrukturerad', description: 'Ingen fördefinierad struktur. Fritext, bilder, ljud, video — 80%+ av all data.' },
  ],
  ko: [
    { title: '정형', description: '정의된 타입의 행과 열. 스프레드시트, SQL 데이터베이스, CSV 파일.' },
    { title: '반정형', description: '일부 조직이 있지만 엄격한 스키마 없음. JSON, XML, 로그, 헤더가 있는 이메일.' },
    { title: '비정형', description: '사전 정의된 구조 없음. 자유 텍스트, 이미지, 오디오, 비디오 — 전체 데이터의 80% 이상.' },
  ],
}

export const stagesTranslations = {
  sv: [
    { label: 'Extrahera', description: 'Hämta rå data från källsystem', details: 'API:er, databaser, filer, webbskrapning' },
    { label: 'Transformera', description: 'Rensa, normalisera, berika', details: 'Ta bort dubbletter, fixa format, lägg till beräknade fält' },
    { label: 'Ladda', description: 'Skriv till destinationssystem', details: 'Data warehouse, vektordatabas, sökindex' },
    { label: 'Validera', description: 'Kontrollera kvalitet och fullständighet', details: 'Schemavalidering, nullkontroller, distributionskontroller' },
    { label: 'Övervaka', description: 'Spåra pipeline-hälsa över tid', details: 'Datadrift, volymavvikelser, fördröjningsvarningar' },
  ],
  ko: [
    { label: '추출', description: '소스 시스템에서 원시 데이터 가져오기', details: 'API, 데이터베이스, 파일, 웹 스크래핑' },
    { label: '변환', description: '정제, 정규화, 보강', details: '중복 제거, 형식 수정, 계산된 필드 추가' },
    { label: '로드', description: '대상 시스템에 쓰기', details: '데이터 웨어하우스, 벡터 데이터베이스, 검색 인덱스' },
    { label: '검증', description: '품질과 완전성 확인', details: '스키마 검증, null 체크, 분포 체크' },
    { label: '모니터링', description: '시간에 따른 파이프라인 건강 추적', details: '데이터 드리프트, 볼륨 이상, 지연 경고' },
  ],
}

export const patternsTranslations = {
  sv: [
    { title: 'Data Warehouse', tagline: 'Centraliserad, strukturerad, SQL-frågor', whenToUse: 'Affärsanalys, rapportering, dashboards' },
    { title: 'Data Lake', tagline: 'Rå data i alla format, schema-on-read', whenToUse: 'ML-träning, utforskande analys, arkivering' },
    { title: 'Lakehouse', tagline: 'Bästa av båda — lake-lagring med warehouse-funktioner', whenToUse: 'Moderna dataplattformar som behöver båda' },
    { title: 'Vektorlagring', tagline: 'Embeddings för semantisk sökning', whenToUse: 'RAG, rekommendationer, likhetssökning' },
  ],
  ko: [
    { title: '데이터 웨어하우스', tagline: '중앙화, 정형, SQL 쿼리', whenToUse: '비즈니스 분석, 보고, 대시보드' },
    { title: '데이터 레이크', tagline: '모든 형식의 원시 데이터, schema-on-read', whenToUse: 'ML 학습, 탐색적 분석, 아카이빙' },
    { title: '레이크하우스', tagline: '양쪽의 장점 — 레이크 스토리지 + 웨어하우스 기능', whenToUse: '둘 다 필요한 현대 데이터 플랫폼' },
    { title: '벡터 스토어', tagline: '시맨틱 검색을 위한 임베딩', whenToUse: 'RAG, 추천, 유사도 검색' },
  ],
}

export const datasetTranslations = { sv: [], ko: [] }
export const issuesTranslations = { sv: [], ko: [] }
