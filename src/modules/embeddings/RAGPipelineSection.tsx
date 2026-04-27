import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { useT } from '../../useT'
import { rAGPipelineSectionSv, rAGPipelineSectionKo } from './tech-translations'

const RAG_STEPS: TerminalStep[] = [
  {
    command: 'rag-pipeline ingest --file company_docs.pdf',
    output: `Loading document: company_docs.pdf (142 pages)
Splitting into chunks... 847 chunks (avg 384 tokens, 10% overlap)
✓ Document chunked successfully`,
    delay: 800,
  },
  {
    command: 'rag-pipeline embed --model voyage-3-large --batch-size 64',
    output: `Embedding 847 chunks with voyage-3-large (1024 dims)
Batch 1/14 ████████████████████ 64 chunks
Batch 2/14 ████████████████████ 64 chunks
...
Batch 14/14 ███████████████░░░░░ 15 chunks
✓ 847 embeddings generated (1024 dimensions each)`,
    delay: 1000,
  },
  {
    command: 'rag-pipeline store --db qdrant --collection company_kb',
    output: `Connecting to Qdrant at localhost:6333
Creating collection "company_kb" (cosine similarity, HNSW index)
Upserting 847 vectors with metadata...
✓ Stored 847 vectors in collection "company_kb"`,
    delay: 700,
  },
  {
    command: 'rag-pipeline query "What is our refund policy?"',
    output: `Embedding query... [0.23, -0.11, 0.67, ...] (1024 dims)

Vector search (top-10):
  #1 [0.94] "Refund Policy: Customers may request a full refund within 30 days..."
  #2 [0.89] "For subscription cancellations, prorated refunds are issued..."
  #3 [0.82] "Return shipping costs are covered for defective items..."

BM25 keyword search (top-10):
  #1 [8.2] "Refund Policy: Customers may request a full refund within 30 days..."
  #2 [6.1] "The refund process typically takes 5-7 business days..."

Hybrid merge (70% vector + 30% BM25):
  #1 → "Refund Policy: Customers may request a full refund within 30 days..."
  #2 → "For subscription cancellations, prorated refunds are issued..."
  #3 → "The refund process typically takes 5-7 business days..."`,
    delay: 1200,
  },
  {
    command: 'rag-pipeline rerank --model cohere-rerank-v3 --top-k 3',
    output: `Reranking 3 candidates with cross-encoder...
  #1 [0.97] "Refund Policy: Customers may request a full refund within 30 days..."
  #2 [0.91] "The refund process typically takes 5-7 business days..."
  #3 [0.84] "For subscription cancellations, prorated refunds are issued..."
✓ Reranked — top result confidence: 0.97`,
    delay: 600,
  },
  {
    command: 'rag-pipeline generate --model gpt-4o --context top-3',
    output: `Injecting 3 chunks into prompt (1,247 tokens context)

Prompt:
  [System] Answer based on the provided context. Cite sources.
  [Context] {3 retrieved chunks}
  [User] What is our refund policy?

Generating response...

"Based on our documentation, customers can request a full refund
within 30 days of purchase. The refund process typically takes
5-7 business days to complete. For subscription services,
prorated refunds are issued upon cancellation. Return shipping
costs are covered for defective items. [Sources: chunks 1, 2, 3]"

✓ Response generated (87 tokens, 1.2s latency)`,
    delay: 1500,
  },
]

const PIPELINE_STAGES: { label: string; icon: IconName; desc: string }[] = [
  { label: 'Document', icon: 'file', desc: 'Raw source data' },
  { label: 'Chunk', icon: 'scissors', desc: 'Split into pieces' },
  { label: 'Embed', icon: 'numbers', desc: 'Convert to vectors' },
  { label: 'Store', icon: 'database', desc: 'Vector database' },
  { label: 'Query', icon: 'search', desc: 'Embed user query' },
  { label: 'Search', icon: 'bolt', desc: 'ANN + BM25' },
  { label: 'Rerank', icon: 'target', desc: 'Cross-encoder' },
  { label: 'Generate', icon: 'robot', desc: 'LLM response' },
]

const EN_P16 = `Merges both ranked lists into a single result set`
const EN_P15 = `Catches exact terms, acronyms, and proper nouns that vectors miss`
const EN_P14 = `Finds semantically similar content even with different wording`
const EN_P13 = `Hybrid Search: Vector + Keyword`
const EN_P12 = `Merges both ranked lists into a single result set`
const EN_P11 = `Catches exact terms, acronyms, and proper nouns that vectors miss`
const EN_P10 = `Finds semantically similar content even with different wording`
const EN_P9 = `Hybrid Search: Vector + Keyword`
const EN_P8 = `Retrieval-Augmented Generation (RAG)`
const EN_P2 = `{c.p2}`
const EN_P3 = `{c.p3}`
const EN_P4 = `Pure vector search misses exact keyword matches. Pure keyword search misses semantic similarity. The best systems combine both.`
const EN_P5 = `{c.p5}`
const EN_P6 = `{c.p6}`
const EN_P7 = `{c.p7}`
export const RAGPipelineSection: React.FC = () => {
  const c = useT({ title: '5. The RAG Pipeline' , p2: EN_P2, p3: EN_P3, p4: EN_P4, p5: EN_P5, p6: EN_P6, p7: EN_P7 , p8: EN_P8 , p9: EN_P9 , p10: EN_P10 , p11: EN_P11 , p12: EN_P12 , p13: EN_P13 , p14: EN_P14 , p15: EN_P15 , p16: EN_P16 }, { sv: rAGPipelineSectionSv, ko: rAGPipelineSectionKo })
  return (
  <section aria-labelledby="rag-pipeline">
    <h2 id="rag-pipeline" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
    <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
      <strong className="text-zinc-100">{c.p8}</strong> combines
      everything: chunk documents, embed them, store in a vector DB, then retrieve relevant
      context to ground LLM responses in your actual data.
    </p>

    {/* Pipeline visualization */}
    <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
      <p className="mb-4 text-sm font-medium text-zinc-400">Full RAG Pipeline</p>
      <div className="flex flex-wrap items-center gap-1">
        {PIPELINE_STAGES.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-1">
            <div className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-center">
              <span className="block text-lg"><Icon name={stage.icon} /></span>
              <span className="block text-xs font-bold text-zinc-200">{stage.label}</span>
              <span className="block text-xs text-zinc-500">{stage.desc}</span>
            </div>
            {i < PIPELINE_STAGES.length - 1 && (
              <span className="text-xs text-zinc-600">→</span>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Interactive terminal */}
    <div className="mb-8">
      <SimulatedTerminal steps={RAG_STEPS} title="rag-pipeline" />
    </div>

    {/* Hybrid search explanation */}
    <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-100">{c.p13}</h3>
      <p className="mb-4 text-sm leading-relaxed text-zinc-300">
        {c.p4}
      </p>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-zinc-800 p-3">
          <p className="mb-1 text-xs font-bold text-blue-400">Vector Search (70%)</p>
          <p className="text-xs text-zinc-300">{c.p14}</p>
        </div>
        <div className="rounded-md bg-zinc-800 p-3">
          <p className="mb-1 text-xs font-bold text-amber-400">BM25 Keyword (30%)</p>
          <p className="text-xs text-zinc-300">{c.p15}</p>
        </div>
        <div className="rounded-md bg-zinc-800 p-3">
          <p className="mb-1 text-xs font-bold text-green-400">Reciprocal Rank Fusion</p>
          <p className="text-xs text-zinc-300">{c.p16}</p>
        </div>
      </div>

      <div className="h-6 w-full overflow-hidden rounded-full bg-zinc-800">
        <div className="flex h-full">
          <div className="flex h-full w-[70%] items-center justify-center bg-blue-500/30">
            <span className="text-xs font-bold text-blue-300">Vector 70%</span>
          </div>
          <div className="flex h-full w-[30%] items-center justify-center bg-amber-500/30">
            <span className="text-xs font-bold text-amber-300">BM25 30%</span>
          </div>
        </div>
      </div>
    </div>

    {/* Emerging patterns */}
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="mb-2 font-mono text-sm font-semibold text-violet-400">GraphRAG</h3>
        <p className="text-xs leading-relaxed text-zinc-300">
          Builds a <strong className="text-zinc-100">knowledge graph</strong> from documents before
          retrieval. Entities and relationships are extracted, enabling multi-hop reasoning.
          Particularly effective for questions that span multiple documents or require connecting
          disparate facts. Microsoft Research showed 30-70% improvement on global questions.
        </p>
      </div>
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="mb-2 font-mono text-sm font-semibold text-amber-400">Agentic RAG</h3>
        <p className="text-xs leading-relaxed text-zinc-300">
          An <strong className="text-zinc-100">AI agent</strong> decides how to retrieve: which
          collections to search, whether to reformulate the query, when to do multi-step retrieval,
          and whether the retrieved context is sufficient. Combines tool use with retrieval for
          dynamic, adaptive pipelines that handle complex queries autonomously.
        </p>
      </div>
    </div>
  </section>
  )
}