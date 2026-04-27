import { useState, useCallback, useMemo } from 'react'
import { Icon } from '../../components/Icon'
import { useT } from '../../useT'
import { chunkingStrategiesSectionSv, chunkingStrategiesSectionKo } from './tech-translations'

type Strategy = 'fixed' | 'semantic' | 'recursive'

const DOCUMENT = `# Introduction to Machine Learning

Machine learning is a subset of artificial intelligence that enables systems to learn from data. Unlike traditional programming where rules are explicitly coded, ML algorithms discover patterns automatically.

## Supervised Learning

In supervised learning, models train on labeled examples. The algorithm learns a mapping from inputs to outputs. Common tasks include classification (spam detection, image recognition) and regression (price prediction, demand forecasting).

Key algorithms include linear regression, decision trees, random forests, and neural networks. Each has different strengths depending on the data characteristics.

## Unsupervised Learning

Unsupervised learning finds hidden patterns in unlabeled data. Clustering groups similar data points together, while dimensionality reduction compresses high-dimensional data into fewer features.

Popular methods include K-means clustering, DBSCAN, PCA, and autoencoders. These are often used for customer segmentation, anomaly detection, and feature engineering.`

const CHUNK_COLORS = [
  'border-blue-500/40 bg-blue-500/10',
  'border-green-500/40 bg-green-500/10',
  'border-amber-500/40 bg-amber-500/10',
  'border-purple-500/40 bg-purple-500/10',
  'border-rose-500/40 bg-rose-500/10',
  'border-cyan-500/40 bg-cyan-500/10',
]

function chunkFixed(text: string): string[] {
  const words = text.split(/\s+/)
  const chunkSize = 50 // ~50 words ≈ 512 tokens simplified
  const chunks: string[] = []
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '))
  }
  return chunks
}

function chunkSemantic(text: string): string[] {
  return text.split(/\n\n+/).filter(p => p.trim().length > 0)
}

function chunkRecursive(text: string): string[] {
  // Split on headers first, then paragraphs within
  const sections = text.split(/(?=^#+ )/m).filter(s => s.trim().length > 0)
  const chunks: string[] = []
  for (const section of sections) {
    const paragraphs = section.split(/\n\n+/).filter(p => p.trim().length > 0)
    if (paragraphs.length <= 2) {
      chunks.push(section.trim())
    } else {
      for (const p of paragraphs) {
        chunks.push(p.trim())
      }
    }
  }
  return chunks
}

const STRATEGIES: { id: Strategy; label: string; desc: string }[] = [
  { id: 'fixed', label: 'Fixed-Size (512 tokens)', desc: 'Split every N tokens regardless of content boundaries' },
  { id: 'semantic', label: 'Semantic (by paragraph)', desc: 'Split on natural boundaries: paragraphs and sections' },
  { id: 'recursive', label: 'Recursive (headers → paragraphs → sentences)', desc: 'Try headers first, then paragraphs, then sentences' },
]

export const ChunkingStrategiesSection: React.FC = () => {
  const c = useT({ title: '4. Chunking Strategies' }, { sv: chunkingStrategiesSectionSv, ko: chunkingStrategiesSectionKo })
  const [strategy, setStrategy] = useState<Strategy>('fixed')

  const handleStrategy = useCallback((s: Strategy) => () => setStrategy(s), [])

  const chunks = useMemo(() => {
    switch (strategy) {
      case 'fixed': return chunkFixed(DOCUMENT)
      case 'semantic': return chunkSemantic(DOCUMENT)
      case 'recursive': return chunkRecursive(DOCUMENT)
    }
  }, [strategy])

  return (
    <section aria-labelledby="chunking-strategies">
      <h2 id="chunking-strategies" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        Documents are too long to embed as a single vector. You need to split them into{' '}
        <strong className="text-zinc-100">chunks</strong> — but how you chunk dramatically affects
        retrieval quality.
      </p>

      {/* Strategy selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {STRATEGIES.map(s => (
          <button
            key={s.id}
            onClick={handleStrategy(s.id)}
            className={`rounded-md border px-4 py-2 text-left transition-all ${
              strategy === s.id
                ? 'border-violet-500 bg-violet-500/10 text-violet-300'
                : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600'
            }`}
            aria-pressed={strategy === s.id}
          >
            <span className="block text-xs font-bold">{s.label}</span>
            <span className="block text-xs opacity-70">{s.desc}</span>
          </button>
        ))}
      </div>

      {/* Chunked document */}
      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-mono text-sm font-semibold text-zinc-100">
            Document → {chunks.length} chunks
          </h3>
          <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400">
            {strategy === 'fixed' ? 'Splits mid-sentence' : strategy === 'semantic' ? 'Respects paragraphs' : 'Respects structure'}
          </span>
        </div>
        <div className="space-y-2">
          {chunks.map((chunk, i) => (
            <div
              key={i}
              className={`rounded-md border p-3 ${CHUNK_COLORS[i % CHUNK_COLORS.length]}`}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs font-bold text-zinc-400">
                  Chunk {i + 1}
                </span>
                <span className="text-xs text-zinc-500">
                  ~{Math.round(chunk.split(/\s+/).length * 1.3)} tokens
                </span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-300 whitespace-pre-line">
                {chunk.length > 300 ? chunk.slice(0, 300) + '...' : chunk}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Best practices */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5">
          <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-100">Chunk Size Impact</h3>
          <div className="space-y-2">
            {[
              { size: '128 tokens', retrieval: 'High precision, low context', bar: 40, color: 'bg-amber-500' },
              { size: '256-512 tokens', retrieval: 'Best balance ✓', bar: 90, color: 'bg-green-500' },
              { size: '1024 tokens', retrieval: 'More context, lower precision', bar: 55, color: 'bg-amber-500' },
              { size: '2048+ tokens', retrieval: 'Too much noise', bar: 25, color: 'bg-red-500' },
            ].map(row => (
              <div key={row.size}>
                <div className="mb-0.5 flex justify-between text-xs">
                  <span className="text-zinc-400">{row.size}</span>
                  <span className="text-zinc-500">{row.retrieval}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.bar}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5">
          <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-100">Best Practices</h3>
          <div className="space-y-2 text-xs text-zinc-300">
            <p>
              <strong className="text-green-400">✓ 256-512 tokens</strong> — sweet spot for most
              retrieval tasks
            </p>
            <p>
              <strong className="text-green-400">✓ 10-15% overlap</strong> — prevents losing context
              at chunk boundaries
            </p>
            <p>
              <strong className="text-green-400">✓ Semantic chunking</strong> — produces{' '}
              <strong className="text-zinc-100">40-60% better retrieval</strong> than fixed-size
            </p>
            <p>
              <strong className="text-green-400">✓ Recursive splitting</strong> — best for
              structured documents (docs, code, markdown)
            </p>
            <p>
              <strong className="text-amber-400"><Icon name="warning" /> Include metadata</strong> — attach source, page
              number, section title to each chunk
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
