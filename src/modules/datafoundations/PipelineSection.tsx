import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { pipelineSectionSv, pipelineSectionKo } from './tech-translations'
import { stagesTranslations } from './data-translations'

interface PipelineStage {
  id: string
  label: string
  icon: IconName
  color: string
  description: string
  details: string[]
}

const STAGES: PipelineStage[] = [
  {
    id: 'source',
    label: 'Source',
    icon: 'ingest',
    color: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    description: 'Where data originates',
    details: [
      'Databases — PostgreSQL, MySQL, MongoDB',
      'APIs — REST, GraphQL, webhooks',
      'Web scraping — crawlers, parsers',
      'File uploads — CSV, JSON, Parquet',
      'Streaming — Kafka, Kinesis, event buses',
    ],
  },
  {
    id: 'ingest',
    label: 'Ingest',
    icon: 'cycle',
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    description: 'How data enters the pipeline',
    details: [
      'Batch — scheduled jobs (hourly, daily)',
      'Streaming — real-time event processing',
      'ETL — Extract, Transform, then Load',
      'ELT — Extract, Load, then Transform',
      'CDC — Change Data Capture for incremental sync',
    ],
  },
  {
    id: 'transform',
    label: 'Transform',
    icon: 'gear',
    color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
    description: 'Clean and reshape data',
    details: [
      'Cleaning — handle nulls, fix types, trim whitespace',
      'Normalization — consistent formats, units, encodings',
      'Deduplication — remove exact and fuzzy duplicates',
      'Feature engineering — derive new columns from existing',
      'Aggregation — group, summarize, window functions',
    ],
  },
  {
    id: 'store',
    label: 'Store',
    icon: 'save',
    color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    description: 'Where processed data lives',
    details: [
      'Data warehouse — Snowflake, BigQuery, Redshift',
      'Data lake — S3, ADLS, GCS (raw files)',
      'Lakehouse — Delta Lake, Iceberg, Hudi',
      'Vector store — Pinecone, Weaviate, pgvector',
      'Feature store — Feast, Tecton',
    ],
  },
  {
    id: 'serve',
    label: 'Serve',
    icon: 'rocket',
    color: 'border-pink-500/40 bg-pink-500/10 text-pink-300',
    description: 'How data reaches consumers',
    details: [
      'APIs — REST/GraphQL endpoints for apps',
      'Dashboards — BI tools, Grafana, Metabase',
      'Model training — feed into ML/LLM pipelines',
      'RAG retrieval — semantic search over embeddings',
      'Exports — reports, data shares, reverse ETL',
    ],
  },
]

const TERMINAL_STEPS: TerminalStep[] = [
  {
    command: 'cat raw_reviews.jsonl | head -2',
    output:
      '{"id":1,"text":"Great product!","rating":5,"date":"2024-01-15"}\n{"id":2,"text":"Terrible, broke on day 1","rating":1,"date":"01/16/2024"}',
    delay: 400,
  },
  {
    command: 'python transform.py --input raw_reviews.jsonl --output clean_reviews.parquet',
    output:
      'Loading 10,000 records...\n✓ Normalized dates → ISO 8601\n✓ Removed 47 duplicates\n✓ Filled 12 missing ratings (median=4)\n✓ Tokenized text → added token_count column\nWrote 9,953 records to clean_reviews.parquet',
    delay: 800,
  },
  {
    command: 'python embed.py --input clean_reviews.parquet --store chromadb',
    output:
      'Generating embeddings (batch_size=64)...\n████████████████████████████████ 100%\n✓ 9,953 vectors stored in ChromaDB\n✓ Collection: product_reviews\n✓ Avg embedding dim: 384',
    delay: 600,
  },
  {
    command: 'python query.py "products that broke quickly"',
    output:
      'Semantic search results (top 3):\n1. [0.92] "Terrible, broke on day 1" (rating: 1)\n2. [0.87] "Stopped working after a week" (rating: 2)\n3. [0.84] "Fragile — handle with care" (rating: 3)',
    delay: 500,
  },
]

const EN_P4 = `A mini pipeline in action: raw JSON → clean Parquet → vector embeddings → semantic search`
const EN_P3 = `A mini pipeline in action: raw JSON → clean Parquet → vector embeddings → semantic search`
const EN_P2 = `{c.p2}`
const EN_INTRO = `Data rarely arrives ready to use. A pipeline moves it from source to consumer through a series of transformations.`

export const PipelineSection: React.FC = () => {
  const { lang } = useLanguage()
  const sTAGEST = tArray(lang, STAGES, stagesTranslations)
  const c = useT({ title: '2. Data Pipelines', intro: EN_INTRO , p2: EN_P2 , p3: EN_P3 , p4: EN_P4 }, { sv: pipelineSectionSv, ko: pipelineSectionKo })
  const [activeStage, setActiveStage] = useState<string | null>(null)

  const toggleStage = useCallback((id: string) => {
    setActiveStage(prev => (prev === id ? null : id))
  }, [])

  return (
    <section aria-labelledby="pipelines">
      <h2 id="pipelines" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Pipeline visualization */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {sTAGEST.map((stage, i) => (
          <div key={stage.id} className="flex items-center gap-2">
            <button
              onClick={() => toggleStage(stage.id)}
              className={`rounded-lg border px-4 py-3 text-center transition-all ${stage.color} ${
                activeStage === stage.id ? 'ring-2 ring-zinc-400/50 scale-105' : 'hover:brightness-125'
              }`}
              aria-expanded={activeStage === stage.id}
            >
              <div className="text-lg"><Icon name={stage.icon} /></div>
              <div className="mt-1 text-xs font-medium">{stage.label}</div>
            </button>
            {i < STAGES.length - 1 && (
              <span className="text-zinc-600">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Stage details */}
      {activeStage && (() => {
        const stage = STAGES.find(s => s.id === activeStage)
        if (!stage) return null
        return (
          <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-900/80 p-4">
            <h3 className="mb-1 font-mono text-sm font-semibold text-zinc-100">
              <Icon name={stage.icon} /> {stage.label}: {stage.description}
            </h3>
            <ul className="mt-3 space-y-1">
              {stage.details.map(d => (
                <li key={d} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className="mt-1 text-zinc-600">•</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )
      })()}

      {/* Terminal demo */}
      <div>
        <p className="mb-3 text-sm text-zinc-400">{c.p4}</p>
        <SimulatedTerminal steps={TERMINAL_STEPS} title="data-pipeline-demo" />
      </div>

      <SelfExplain
        prompt="You just ran a mini pipeline that went from raw JSON → clean Parquet → vector embeddings → semantic search. In your own words, explain why the data went through so many transformations instead of just searching the raw JSON directly."
        modelAnswer="Raw JSON is human-readable but terrible for computation. Each transformation serves a purpose: cleaning normalizes messy data (inconsistent dates, duplicates, missing values), Parquet is a columnar format that's much faster to query than JSON, and vector embeddings convert text into numerical representations that capture meaning — so 'broke quickly' matches 'stopped working' even though they share no words. Searching raw JSON would only find exact keyword matches and would be slow on large datasets. The pipeline trades upfront processing time for dramatically better search quality and speed."
      />
    </section>
  )
}
