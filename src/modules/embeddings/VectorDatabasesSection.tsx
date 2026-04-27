import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { vectorDatabasesSectionSv, vectorDatabasesSectionKo } from './tech-translations'

interface VectorDB {
  name: string
  tagline: string
  color: string
  when: string
  pros: string[]
  cons: string[]
  lang: string
}

const DATABASES: VectorDB[] = [
  {
    name: 'Pinecone',
    tagline: 'Managed, easy to start',
    color: 'border-blue-500/40 bg-blue-500/5',
    when: 'You want zero-ops vector search with a generous free tier',
    pros: ['Fully managed — no infra to maintain', 'Sub-50ms queries at scale', 'Serverless pricing option'],
    cons: ['Vendor lock-in', 'Limited filtering vs SQL', 'Can get expensive at scale'],
    lang: 'Managed SaaS',
  },
  {
    name: 'Weaviate',
    tagline: 'Open-source, hybrid search',
    color: 'border-green-500/40 bg-green-500/5',
    when: 'You need hybrid vector + keyword search with GraphQL API',
    pros: ['Built-in hybrid search (vector + BM25)', 'GraphQL API', 'Active open-source community'],
    cons: ['Higher memory usage', 'Steeper learning curve', 'Self-hosting complexity'],
    lang: 'Go',
  },
  {
    name: 'Qdrant',
    tagline: 'Rust-powered, fast',
    color: 'border-amber-500/40 bg-amber-500/5',
    when: 'You need maximum performance with rich filtering',
    pros: ['Written in Rust — very fast', 'Advanced filtering on payload', 'Low memory footprint'],
    cons: ['Smaller ecosystem than Pinecone', 'Fewer managed options', 'Newer project'],
    lang: 'Rust',
  },
  {
    name: 'Milvus',
    tagline: 'Scalable, enterprise-grade',
    color: 'border-purple-500/40 bg-purple-500/5',
    when: 'You have billions of vectors and need horizontal scaling',
    pros: ['Scales to billions of vectors', 'Multiple index types (IVF, HNSW, DiskANN)', 'GPU acceleration'],
    cons: ['Complex deployment (etcd, MinIO, Pulsar)', 'Heavy resource requirements', 'Overkill for small datasets'],
    lang: 'Go / C++',
  },
  {
    name: 'pgvector',
    tagline: 'PostgreSQL extension',
    color: 'border-cyan-500/40 bg-cyan-500/5',
    when: 'You already use PostgreSQL and want to add vector search without new infra',
    pros: ['No new database to manage', 'Full SQL + vector search', 'ACID transactions on vectors'],
    cons: ['Slower than purpose-built DBs at scale', 'Limited index options', 'Not ideal for >10M vectors'],
    lang: 'C (PG extension)',
  },
  {
    name: 'ChromaDB',
    tagline: 'Lightweight, prototyping',
    color: 'border-rose-500/40 bg-rose-500/5',
    when: 'You\'re prototyping a RAG pipeline and want something running in 5 minutes',
    pros: ['pip install chromadb — done', 'Great Python DX', 'Embedded mode (no server)'],
    cons: ['Not production-grade at scale', 'Limited query features', 'Single-node only'],
    lang: 'Python',
  },
]

const EN_P4 = `Why ANN Search? (Approximate Nearest Neighbor)`
const EN_P3 = `Why ANN Search? (Approximate Nearest Neighbor)`
const EN_P2 = `{c.p2}`
export const VectorDatabasesSection: React.FC = () => {
  const c = useT({ title: '3. Vector Databases' , p2: EN_P2 , p3: EN_P3 , p4: EN_P4 }, { sv: vectorDatabasesSectionSv, ko: vectorDatabasesSectionKo })
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = useCallback((name: string) => () => {
    setExpanded(prev => prev === name ? null : name)
  }, [])

  return (
    <section aria-labelledby="vector-databases">
      <h2 id="vector-databases" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        Once you have embeddings, you need somewhere to store and search them efficiently.
        Vector databases are purpose-built for{' '}
        <strong className="text-zinc-100">approximate nearest neighbor (ANN)</strong> search
        over high-dimensional vectors.
      </p>

      {/* Database cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {DATABASES.map(db => (
          <button
            key={db.name}
            onClick={toggle(db.name)}
            className={`rounded-lg border p-4 text-left transition-all ${db.color} ${
              expanded === db.name ? 'ring-1 ring-zinc-500' : ''
            }`}
            aria-expanded={expanded === db.name}
          >
            <div className="mb-1 flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold text-zinc-100">{db.name}</h3>
              <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                {db.lang}
              </span>
            </div>
            <p className="mb-2 text-xs text-zinc-400">{db.tagline}</p>

            {expanded === db.name && (
              <div className="mt-3 space-y-3 border-t border-zinc-700/50 pt-3">
                <div>
                  <p className="mb-1 text-xs font-bold text-zinc-400">When to use</p>
                  <p className="text-xs text-zinc-300">{db.when}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold text-green-400">Pros</p>
                  {db.pros.map(p => (
                    <p key={p} className="text-xs text-zinc-300">+ {p}</p>
                  ))}
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold text-red-400">Cons</p>
                  {db.cons.map(c => (
                    <p key={c} className="text-xs text-zinc-300">− {c}</p>
                  ))}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ANN explanation */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-100">{c.p4}</h3>
        <p className="mb-4 text-sm leading-relaxed text-zinc-300">
          Exact nearest neighbor search compares your query vector against{' '}
          <strong className="text-zinc-100">every single vector</strong> in the database.
          At scale, this is impossibly slow.
        </p>

        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          {[
            { vectors: '1K', exact: '~1ms', ann: '~0.5ms', label: 'Prototype' },
            { vectors: '1M', exact: '~2s', ann: '~5ms', label: 'Production' },
            { vectors: '1B', exact: '~30min', ann: '~10ms', label: 'Enterprise' },
          ].map(row => (
            <div key={row.vectors} className="rounded-md bg-zinc-800 p-3">
              <p className="mb-1 text-xs font-bold text-zinc-400">{row.label} ({row.vectors} vectors)</p>
              <p className="text-xs text-zinc-300">
                Exact: <span className="text-red-400">{row.exact}</span>
              </p>
              <p className="text-xs text-zinc-300">
                ANN: <span className="text-green-400">{row.ann}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-md bg-zinc-800 p-3">
          <p className="text-xs leading-relaxed text-zinc-300">
            <strong className="text-zinc-100">How ANN works:</strong> Algorithms like{' '}
            <strong className="text-amber-400">HNSW</strong> (Hierarchical Navigable Small World)
            build a graph structure that lets you jump to the approximate neighborhood of your query
            in O(log n) time. You trade a tiny accuracy loss (typically 95-99% recall) for
            orders-of-magnitude speed improvement.
          </p>
        </div>
      </div>
    </section>
  )
}
