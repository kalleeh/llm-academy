import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { embeddingModelsSectionSv, embeddingModelsSectionKo } from './tech-translations'
import { CodeBlock } from '../../components/CodeBlock'

const MODELS = [
  { name: 'Voyage-3-large', provider: 'Voyage AI', dims: 1024, maxTokens: '32K', perf: '★★★★★', cost: '$0.06/1M', note: 'Best overall 2025-2026, outperforms by 9-20%' },
  { name: 'text-embedding-3-large', provider: 'OpenAI', dims: 3072, maxTokens: '8K', perf: '★★★★☆', cost: '$0.13/1M', note: 'Widely adopted, good all-rounder' },
  { name: 'embed-v4', provider: 'Cohere', dims: 1024, maxTokens: '128K', perf: '★★★★☆', cost: '$0.10/1M', note: 'Long context, multimodal support' },
  { name: 'BGE-large-en-v1.5', provider: 'BAAI (open)', dims: 1024, maxTokens: '512', perf: '★★★☆☆', cost: 'Free', note: 'Best open-source, self-hosted' },
  { name: 'E5-mistral-7b', provider: 'Microsoft (open)', dims: 4096, maxTokens: '32K', perf: '★★★★☆', cost: 'Free', note: 'LLM-based embeddings, high quality' },
  { name: 'GTE-Qwen2', provider: 'Alibaba (open)', dims: 1536, maxTokens: '8K', perf: '★★★★☆', cost: 'Free', note: 'Strong multilingual performance' },
] as const

const EMBEDDING_CODE = `import openai

client = openai.OpenAI()

# Generate embeddings for a list of texts
response = client.embeddings.create(
    model="text-embedding-3-large",
    input=[
        "The cat sat on the mat",
        "A kitten rested on the rug"
    ],
    dimensions=1024  # Optional: reduce from 3072
)

# Access the embedding vectors
vec_1 = response.data[0].embedding  # [0.012, -0.034, ...]
vec_2 = response.data[1].embedding

# Compute cosine similarity
import numpy as np
similarity = np.dot(vec_1, vec_2) / (
    np.linalg.norm(vec_1) * np.linalg.norm(vec_2)
)
print(f"Similarity: {similarity:.3f}")  # ~0.92`

const EN_P5 = `Embedding Model Comparison (2025-2026)`
const EN_P4 = `Embedding Model Comparison (2025-2026)`
const EN_P2 = `Embedding models and LLMs are both transformers, but they serve different purposes. LLMs`
const EN_P3 = `{c.p3}`
const EN_INTRO = `Input → Variable-length text output`

export const EmbeddingModelsSection: React.FC = () => {
  const { lang } = useLanguage()
  const c = useT({ title: '2. How Embedding Models Work', intro: EN_INTRO , p2: EN_P2, p3: EN_P3 , p4: EN_P4 , p5: EN_P5 }, { sv: embeddingModelsSectionSv, ko: embeddingModelsSectionKo })
  return (
  <section aria-labelledby="embedding-models">
    <h2 id="embedding-models" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
    <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
      {c.p2} <strong className="text-zinc-100">generate text</strong> token by token; embedding
      models produce a <strong className="text-zinc-100">fixed-size vector</strong> that represents
      the entire input&apos;s meaning.
    </p>

    {/* LLM vs Embedding contrast */}
    <div className="mb-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="mb-2 font-mono text-sm font-semibold text-blue-400">LLM (Generative)</h3>
        <p className="mb-3 text-xs text-zinc-400">{c.intro}</p>
        <div className="space-y-1.5 text-xs text-zinc-300">
          <p>• Autoregressive: generates one token at a time</p>
          <p>• Output size varies with generation length</p>
          <p>• Used for: chat, summarization, code generation</p>
          <p>• Example: GPT-4o, Claude, Llama</p>
        </div>
      </div>
      <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-5">
        <h3 className="mb-2 font-mono text-sm font-semibold text-violet-400">Embedding Model</h3>
        <p className="mb-3 text-xs text-zinc-400">Input → Fixed-size vector</p>
        <div className="space-y-1.5 text-xs text-zinc-300">
          <p>• Encoder-only: processes all tokens at once</p>
          <p>• Output is always the same dimensionality</p>
          <p>• Used for: search, retrieval, clustering, classification</p>
          <p>• Example: Voyage-3-large, text-embedding-3-large</p>
        </div>
      </div>
    </div>

    {/* Model comparison table */}
    <div className="mb-8 overflow-hidden rounded-lg border border-zinc-700">
      <div className="border-b border-zinc-700 bg-zinc-800 px-4 py-3">
        <h3 className="font-mono text-sm font-semibold text-zinc-100">{c.p5}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-900">
              {['Model', 'Provider', 'Dims', 'Max Tokens', 'Quality', 'Cost/1M tokens', 'Notes'].map(h => (
                <th key={h} className="px-4 py-2 text-xs font-medium text-zinc-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m, i) => (
              <tr key={m.name} className={`border-b border-zinc-800 ${i === 0 ? 'bg-violet-500/5' : ''}`}>
                <td className="px-4 py-2 font-mono text-xs text-zinc-200">{m.name}</td>
                <td className="px-4 py-2 text-xs text-zinc-400">{m.provider}</td>
                <td className="px-4 py-2 font-mono text-xs text-zinc-300">{m.dims.toLocaleString()}</td>
                <td className="px-4 py-2 text-xs text-zinc-400">{m.maxTokens}</td>
                <td className="px-4 py-2 text-xs text-amber-400">{m.perf}</td>
                <td className="px-4 py-2 font-mono text-xs text-green-400">{m.cost}</td>
                <td className="px-4 py-2 text-xs text-zinc-500">{m.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* API code example */}
    <div className="mb-6">
      <CodeBlock code={EMBEDDING_CODE} language="python" title="embedding_example.py" />
    </div>

    <div className="rounded-md bg-zinc-800 p-4">
      <p className="text-xs leading-relaxed text-zinc-300">
        <strong className="text-zinc-100">Choosing a model:</strong> For production retrieval,{' '}
        <strong className="text-violet-400">Voyage-3-large</strong> leads benchmarks by 9-20% over
        competitors. For cost-sensitive workloads, OpenAI&apos;s{' '}
        <strong className="text-blue-400">text-embedding-3-large</strong> with reduced dimensions
        (1024) offers a good tradeoff. For self-hosted, <strong className="text-green-400">BGE</strong>{' '}
        and <strong className="text-green-400">GTE</strong> are the strongest open-source options.
      </p>
    </div>
  </section>
  )
}