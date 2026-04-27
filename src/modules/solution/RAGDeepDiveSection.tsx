import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { rAGDeepDiveSectionSv, rAGDeepDiveSectionKo } from './tech-translations'
import { ragVsFinetuneTranslations } from './data-translations'

const PIPELINE_STEPS: { id: string; label: string; icon: IconName; desc: string }[] = [
  { id: 'query', label: 'User Query', icon: 'chat', desc: 'User asks a natural language question' },
  { id: 'embed', label: 'Embed Query', icon: 'numbers', desc: 'Convert query to a vector using embedding model' },
  { id: 'search', label: 'Search Vector Store', icon: 'search', desc: 'Find most similar document chunks by cosine similarity' },
  { id: 'retrieve', label: 'Retrieve Docs', icon: 'file', desc: 'Pull top-k relevant document chunks' },
  { id: 'inject', label: 'Inject into Prompt', icon: 'inject', desc: 'Add retrieved context to the LLM prompt' },
  { id: 'generate', label: 'LLM Generates', icon: 'robot', desc: 'Model answers using retrieved context' },
]

const RAG_VS_FINETUNE = [
  { aspect: 'Data freshness', rag: 'Update anytime — just re-index docs', finetune: 'Stale — requires retraining' },
  { aspect: 'Citations', rag: 'Built-in — can point to source docs', finetune: 'Not available — knowledge baked into weights' },
  { aspect: 'Training data needed', rag: 'None — just your documents', finetune: '1K–100K labeled examples' },
  { aspect: 'Hallucination control', rag: 'Better — grounded in retrieved text', finetune: 'Harder — model may confabulate' },
  { aspect: 'Domain adaptation', rag: 'Good for factual recall', finetune: 'Better for style/reasoning patterns' },
  { aspect: 'Latency', rag: 'Higher — retrieval adds ~100-500ms', finetune: 'Lower — single model inference' },
]

const TERMINAL_STEPS: TerminalStep[] = [
  { command: 'pip install langchain chromadb openai', output: 'Successfully installed langchain-0.1.0 chromadb-0.4.22 openai-1.12.0', delay: 800 },
  { command: 'python -c "from langchain.document_loaders import DirectoryLoader; print(\'✓ Loader ready\')"', output: '✓ Loader ready', delay: 400 },
  { command: 'python ingest.py --source ./docs --chunk-size 512 --overlap 50', output: 'Loading documents from ./docs...\nFound 47 files (PDF, MD, TXT)\nSplitting into chunks: 512 tokens, 50 overlap\nCreated 1,284 chunks\nEmbedding with text-embedding-3-small...\nStored 1,284 vectors in ChromaDB\n✓ Ingestion complete', delay: 1200 },
  { command: 'python query.py "What is our refund policy?"', output: 'Searching vector store...\nRetrieved 3 relevant chunks (similarity: 0.92, 0.87, 0.84)\n\nContext injected into prompt:\n---\n[chunk 1] "Refunds are available within 30 days of purchase..."\n[chunk 2] "Digital products are non-refundable after download..."\n[chunk 3] "Contact support@company.com for refund requests..."\n---\n\nLLM Response:\nOur refund policy allows returns within 30 days of purchase.\nDigital products are non-refundable once downloaded.\nTo request a refund, email support@company.com.\n\nSources: refund-policy.pdf (p.2), terms-of-service.md (§4.1)', delay: 1500 },
]

const EN_P2 = `RAG is the most common production pattern because it requires no training, supports citations, and lets you update knowledge by simply re-indexing documents. Combine with fine-tuning when you also need specific reasoning or output style.`
export const RAGDeepDiveSection: React.FC = () => {
  const { lang } = useLanguage()
  const rAG_VS_FINETUNET = tArray(lang, RAG_VS_FINETUNE, ragVsFinetuneTranslations)
  const c = useT({ title: '2. RAG Deep Dive' , p2: EN_P2 }, { sv: rAGDeepDiveSectionSv, ko: rAGDeepDiveSectionKo })
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const selectStep = useCallback((i: number) => {
    setActiveStep(prev => (prev === i ? null : i))
  }, [])

  return (
    <section aria-labelledby="rag-deep-dive">
      <h2 id="rag-deep-dive" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        <strong className="text-zinc-100">Retrieval-Augmented Generation</strong> gives an LLM
        access to external knowledge without retraining. Instead of baking facts into weights,
        you retrieve relevant documents at query time and inject them into the prompt.
      </p>

      {/* Pipeline visual */}
      <div className="mb-6 overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <p className="mb-4 font-mono text-xs text-zinc-500 uppercase">RAG Pipeline</p>
        <div className="flex items-center gap-2">
          {PIPELINE_STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2">
              <button
                onClick={() => selectStep(i)}
                className={`flex flex-col items-center rounded-lg border p-3 transition-all ${
                  activeStep === i
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                }`}
                style={{ minWidth: '5.5rem' }}
                aria-pressed={activeStep === i}
              >
                <span className="text-lg"><Icon name={step.icon} /></span>
                <span className="mt-1 text-xs font-medium">{step.label}</span>
              </button>
              {i < PIPELINE_STEPS.length - 1 && (
                <span className="text-zinc-600">→</span>
              )}
            </div>
          ))}
        </div>
        {activeStep !== null && (
          <div className="mt-4 rounded-md border border-zinc-700 bg-zinc-800/50 p-3">
            <p className="text-sm text-zinc-300">
              <strong className="text-zinc-100">Step {activeStep + 1}:</strong>{' '}
              {PIPELINE_STEPS[activeStep].desc}
            </p>
          </div>
        )}
      </div>

      {/* RAG vs Fine-tuning */}
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-300">When RAG Beats Fine-tuning</h3>
      <div className="mb-6 overflow-x-auto rounded-lg border border-zinc-700">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800">
              <th className="px-4 py-2 text-xs text-zinc-500 uppercase">Aspect</th>
              <th className="px-4 py-2 text-xs text-blue-400/70 uppercase">RAG</th>
              <th className="px-4 py-2 text-xs text-amber-400/70 uppercase">Fine-tuning</th>
            </tr>
          </thead>
          <tbody>
            {rAG_VS_FINETUNET.map(row => (
              <tr key={row.aspect} className="border-b border-zinc-800">
                <td className="px-4 py-2 font-medium text-zinc-300">{row.aspect}</td>
                <td className="px-4 py-2 text-zinc-400">{row.rag}</td>
                <td className="px-4 py-2 text-zinc-400">{row.finetune}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Terminal demo */}
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-300"><Icon name="terminal" /> RAG Pipeline Setup</h3>
      <SimulatedTerminal steps={TERMINAL_STEPS} title="rag-pipeline" />

      <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <p className="text-sm leading-relaxed text-zinc-400">
          <strong className="text-amber-400">Key insight:</strong> {c.p2}
        </p>
      </div>
    </section>
  )
}
