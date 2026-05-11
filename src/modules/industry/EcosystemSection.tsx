import { useState, useCallback } from 'react'
import { tArray, useLanguage, useT } from '../../i18n'
import { ecosystemSectionSv, ecosystemSectionKo } from './tech-translations'
import { layersTranslations } from './data-translations'

interface Layer {
  name: string
  color: string
  tools: { name: string; note: string }[]
}

const LAYERS: Layer[] = [
  {
    name: 'Foundation Models',
    color: 'bg-purple-900/40 border-purple-500',
    tools: [
      { name: 'GPT-5.5 / Claude Opus 4.7', note: 'Frontier closed models via API' },
      { name: 'Llama 4 / DeepSeek V3', note: 'Open-weight models you can self-host' },
      { name: 'Gemma 3 / Qwen 2.5', note: 'Smaller open models for fine-tuning' },
    ],
  },
  {
    name: 'Fine-tuning Tools',
    color: 'bg-blue-900/40 border-blue-500',
    tools: [
      { name: 'Hugging Face Transformers', note: 'De facto standard for model training & sharing' },
      { name: 'Unsloth', note: '2-5× faster LoRA fine-tuning, lower memory' },
      { name: 'Axolotl', note: 'Config-driven fine-tuning framework' },
    ],
  },
  {
    name: 'Serving & Inference',
    color: 'bg-green-900/40 border-green-500',
    tools: [
      { name: 'vLLM', note: 'Production serving with PagedAttention' },
      { name: 'Ollama', note: 'Local inference, one-command setup' },
      { name: 'TensorRT-LLM', note: 'Nvidia-optimized, max throughput' },
    ],
  },
  {
    name: 'Orchestration',
    color: 'bg-amber-900/40 border-amber-500',
    tools: [
      { name: 'LangChain', note: 'Chains, agents, tool use, RAG pipelines' },
      { name: 'LlamaIndex', note: 'Data ingestion, indexing, retrieval' },
      { name: 'Semantic Kernel', note: 'Microsoft\'s orchestration SDK' },
    ],
  },
  {
    name: 'Applications',
    color: 'bg-red-900/40 border-red-500',
    tools: [
      { name: 'Chatbots & Assistants', note: 'Customer support, internal tools' },
      { name: 'Code Assistants', note: 'Copilot, Cursor, Cody, Kiro' },
      { name: 'Autonomous Agents', note: 'Multi-step task execution with tool use' },
    ],
  },
]

const EN_P2 = `You rarely build from scratch. Most teams pick a foundation model, optionally fine-tune it, serve it with an existing framework, and wire it into their app with an orchestration layer. The ecosystem makes this possible without training a single weight.`
const EN_INTRO = `LLMs don't exist in isolation. A full stack connects foundation models to end users.`

export const EcosystemSection: React.FC = () => {
  const { lang } = useLanguage()
  const lAYERST = tArray(lang, LAYERS, layersTranslations)
  const c = useT({ title: '3. The Ecosystem', intro: EN_INTRO , p2: EN_P2 }, { sv: ecosystemSectionSv, ko: ecosystemSectionKo })
  const [expanded, setExpanded] = useState<number | null>(null)

  const toggle = useCallback((idx: number) => {
    setExpanded(prev => (prev === idx ? null : idx))
  }, [])

  return (
    <section aria-labelledby="ecosystem">
      <h2 id="ecosystem" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="space-y-2">
        {lAYERST.map((layer, idx) => (
          <div key={layer.name}>
            <button
              onClick={() => toggle(idx)}
              className={`w-full rounded-lg border-l-4 ${layer.color} p-4 text-left transition-all hover:brightness-110`}
              aria-expanded={expanded === idx}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-sm font-bold text-zinc-100">{layer.name}</h3>
                <span className="text-xs text-zinc-500">
                  {layer.tools.map(t => t.name).join(' · ')}
                </span>
              </div>
            </button>
            {expanded === idx && (
              <div className="ml-4 mt-1 space-y-2 border-l-2 border-zinc-700 pl-4 pt-2">
                {layer.tools.map(tool => (
                  <div key={tool.name} className="rounded bg-zinc-900 p-3">
                    <p className="font-mono text-xs font-bold text-zinc-100">{tool.name}</p>
                    <p className="mt-1 text-xs text-zinc-400">{tool.note}</p>
                  </div>
                ))}
              </div>
            )}
            {idx < LAYERS.length - 1 && (
              <div className="flex justify-center py-1">
                <span className="text-zinc-600" aria-hidden="true">↓</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
        <p className="text-xs leading-relaxed text-zinc-400">
          <strong className="text-zinc-300">Key insight:</strong> {c.p2}
        </p>
      </div>
    </section>
  )
}
