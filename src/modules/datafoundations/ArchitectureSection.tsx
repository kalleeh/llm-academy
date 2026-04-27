import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useT } from '../../useT'
import { architectureSectionSv, architectureSectionKo } from './tech-translations'

interface ArchPattern {
  id: string
  title: string
  icon: IconName
  color: string
  borderColor: string
  tagline: string
  whenToUse: string
  pros: string[]
  cons: string[]
  tools: string[]
}

const PATTERNS: ArchPattern[] = [
  {
    id: 'warehouse',
    title: '4. Data Architecture Patterns',
    icon: 'warehouse',
    color: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    tagline: 'Structured · Schema-on-Write · SQL · Analytics',
    whenToUse: 'Business intelligence, dashboards, SQL analytics on clean, structured data.',
    pros: ['Fast SQL queries (columnar storage)', 'Strong schema enforcement', 'Mature ecosystem & tooling'],
    cons: ['Expensive at scale', 'Only structured data', 'Schema changes are painful'],
    tools: ['Snowflake', 'BigQuery', 'Redshift', 'Databricks SQL'],
  },
  {
    id: 'lake',
    title: 'Data Lake',
    icon: 'lake',
    color: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    tagline: 'Raw Files · Schema-on-Read · Cheap Storage',
    whenToUse: 'Storing everything cheaply — logs, images, JSON, Parquet — and deciding how to use it later.',
    pros: ['Very cheap storage (object stores)', 'Any data format', 'Schema flexibility'],
    cons: ['Can become a "data swamp"', 'No ACID transactions', 'Query performance varies'],
    tools: ['S3', 'ADLS', 'GCS', 'HDFS', 'MinIO'],
  },
  {
    id: 'lakehouse',
    title: 'Lakehouse',
    icon: 'home',
    color: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    tagline: 'Best of Both · Open Formats · ACID on Lakes',
    whenToUse: 'When you need warehouse-like performance and governance on top of lake-scale storage.',
    pros: ['ACID transactions on object storage', 'Open table formats (no vendor lock-in)', 'Handles structured + unstructured'],
    cons: ['More complex to set up', 'Newer ecosystem', 'Requires tuning for performance'],
    tools: ['Delta Lake', 'Apache Iceberg', 'Apache Hudi', 'Databricks'],
  },
  {
    id: 'vector',
    title: 'Vector Store',
    icon: 'compass',
    color: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    tagline: 'Embeddings · Semantic Search · RAG',
    whenToUse: 'Storing and searching vector embeddings for similarity search, recommendation, and RAG.',
    pros: ['Semantic (meaning-based) search', 'Powers RAG for LLMs', 'Sub-second nearest-neighbor lookup'],
    cons: ['Not for general analytics', 'Embedding quality matters', 'Index rebuild on schema changes'],
    tools: ['Pinecone', 'Weaviate', 'pgvector', 'ChromaDB', 'Qdrant'],
  },
]

const EN_P2 = `{c.p2}`
const EN_P3 = `{c.p3}`
const EN_INTRO = `Where does data live? Four dominant patterns, each with different tradeoffs.`

export const ArchitectureSection: React.FC = () => {
  const c = useT({ title: '4. Data Architecture Patterns', intro: EN_INTRO , p2: EN_P2, p3: EN_P3 }, { sv: architectureSectionSv, ko: architectureSectionKo })
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = useCallback((id: string) => {
    setExpanded(prev => (prev === id ? null : id))
  }, [])

  return (
    <section aria-labelledby="architecture">
      <h2 id="architecture" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {PATTERNS.map(p => {
          const isOpen = expanded === p.id
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className={`rounded-lg border text-left transition-all ${p.borderColor} ${p.color} ${
                isOpen ? 'ring-2 ring-zinc-400/50' : 'hover:brightness-125'
              }`}
              aria-expanded={isOpen}
            >
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Icon name={p.icon} />
                  <h3 className="font-mono text-sm font-semibold text-zinc-100">{p.title}</h3>
                </div>
                <p className="mt-1 text-xs text-zinc-400">{p.tagline}</p>
              </div>

              {isOpen && (
                <div className="border-t border-zinc-700/50 p-4 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-zinc-300">When to use</p>
                    <p className="mt-0.5 text-xs text-zinc-400">{p.whenToUse}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-medium text-emerald-400">✓ Pros</p>
                      <ul className="mt-1 space-y-0.5">
                        {p.pros.map(pro => (
                          <li key={pro} className="text-xs text-zinc-400">• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-red-400">✗ Cons</p>
                      <ul className="mt-1 space-y-0.5">
                        {p.cons.map(con => (
                          <li key={con} className="text-xs text-zinc-400">• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-300">Tools</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {p.tools.map(t => (
                        <span key={t} className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* RAG connection callout */}
      <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <p className="text-sm font-medium text-amber-300"><Icon name="link" /> Vector Stores → LLMs (RAG Preview)</p>
        <p className="mt-1 text-xs leading-relaxed text-zinc-300">
          Vector stores are the bridge between your data and LLMs. In{' '}
          <span className="text-amber-200">Retrieval-Augmented Generation (RAG)</span>, you embed
          your documents into vectors, store them, then at query time retrieve the most relevant
          chunks and feed them to the LLM as context. This lets the model answer questions about
          <em> your</em> data without retraining.
        </p>
      </div>
    </section>
  )
}
