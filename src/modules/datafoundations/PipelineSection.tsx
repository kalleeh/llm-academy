import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

interface StageMeta {
  id: string
  icon: IconName
  color: string
}

// Non-translatable per-stage metadata. Order matches `stages` array in
// `useTranslation().modules.datafoundations.pipelineSection.stages`.
const STAGE_META: StageMeta[] = [
  { id: 'source', icon: 'ingest', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300' },
  { id: 'ingest', icon: 'cycle', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' },
  { id: 'transform', icon: 'gear', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300' },
  { id: 'store', icon: 'save', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300' },
  { id: 'serve', icon: 'rocket', color: 'border-pink-400 dark:border-pink-500/40 bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-300' },
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

export const PipelineSection: React.FC = () => {
  const c = useTranslation().modules.datafoundations.pipelineSection
  const [activeStage, setActiveStage] = useState<string | null>(null)

  const toggleStage = useCallback((id: string) => {
    setActiveStage(prev => (prev === id ? null : id))
  }, [])

  return (
    <section aria-labelledby="pipelines">
      <h2 id="pipelines" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Pipeline visualization */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {c.stages.map((stage, i) => {
          const meta = STAGE_META[i]
          return (
            <div key={meta.id} className="flex items-center gap-2">
              <button
                onClick={() => toggleStage(meta.id)}
                className={`rounded-lg border px-4 py-3 text-center transition-all ${meta.color} ${
                  activeStage === meta.id ? 'ring-2 ring-zinc-400/50 scale-105' : 'hover:brightness-125'
                }`}
                aria-expanded={activeStage === meta.id}
              >
                <div className="text-lg"><Icon name={meta.icon} /></div>
                <div className="mt-1 text-xs font-medium">{stage.label}</div>
              </button>
              {i < c.stages.length - 1 && (
                <span className="text-zinc-500 dark:text-zinc-600">→</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Stage details */}
      {activeStage && (() => {
        const idx = STAGE_META.findIndex(s => s.id === activeStage)
        if (idx < 0) return null
        const stage = c.stages[idx]
        const meta = STAGE_META[idx]
        return (
          <div className="mb-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 p-4">
            <h3 className="mb-1 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <Icon name={meta.icon} /> {stage.label}: {stage.description}
            </h3>
            <ul className="mt-3 space-y-1">
              {stage.details.map(d => (
                <li key={d} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="mt-1 text-zinc-500 dark:text-zinc-600">•</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )
      })()}

      {/* Terminal demo */}
      <div>
        <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">{c.p4}</p>
        <SimulatedTerminal steps={TERMINAL_STEPS} title="data-pipeline-demo" />
      </div>

      <SelfExplain
        prompt="You just ran a mini pipeline that went from raw JSON → clean Parquet → vector embeddings → semantic search. In your own words, explain why the data went through so many transformations instead of just searching the raw JSON directly."
        modelAnswer="Raw JSON is human-readable but terrible for computation. Each transformation serves a purpose: cleaning normalizes messy data (inconsistent dates, duplicates, missing values), Parquet is a columnar format that's much faster to query than JSON, and vector embeddings convert text into numerical representations that capture meaning — so 'broke quickly' matches 'stopped working' even though they share no words. Searching raw JSON would only find exact keyword matches and would be slow on large datasets. The pipeline trades upfront processing time for dramatically better search quality and speed."
      />
    </section>
  )
}
