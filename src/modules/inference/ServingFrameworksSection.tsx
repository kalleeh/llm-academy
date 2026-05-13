import { useState, useCallback } from 'react'
import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import { tArray, useLanguage, useT } from '../../i18n'
import { servingFrameworksSectionSv, servingFrameworksSectionKo } from './tech-translations'
import { frameworksTranslations } from './data-translations'

interface Framework {
  name: string
  tagline: string
  color: string
  features: string[]
  throughput: string
  latency: string
  ease: string
  gpu: string
}

const FRAMEWORKS: Framework[] = [
  {
    name: 'vLLM',
    tagline: 'PagedAttention · Continuous batching · Production standard',
    color: 'border-blue-500',
    features: ['PagedAttention for efficient KV cache', 'Continuous batching', 'OpenAI-compatible API', 'Tensor parallelism'],
    throughput: '★★★★☆',
    latency: '★★★★☆',
    ease: '★★★★☆',
    gpu: 'CUDA (Nvidia)',
  },
  {
    name: 'SGLang',
    tagline: 'RadixAttention · Fastest structured output',
    color: 'border-green-500',
    features: ['RadixAttention for prefix sharing', 'Fastest JSON/grammar output', 'Automatic KV cache reuse', 'Constrained decoding'],
    throughput: '★★★★★',
    latency: '★★★★★',
    ease: '★★★☆☆',
    gpu: 'CUDA (Nvidia)',
  },
  {
    name: 'TensorRT-LLM',
    tagline: 'Nvidia optimized · Best raw throughput',
    color: 'border-amber-500',
    features: ['Nvidia kernel fusion', 'FP8 quantization', 'In-flight batching', 'Multi-GPU via NVLink'],
    throughput: '★★★★★',
    latency: '★★★★★',
    ease: '★★☆☆☆',
    gpu: 'CUDA only (optimized)',
  },
  {
    name: 'Ollama',
    tagline: 'Local · Easy · GGUF format',
    color: 'border-purple-500',
    features: ['One-command install', 'GGUF model library', 'REST API built-in', 'macOS/Linux/Windows'],
    throughput: '★★☆☆☆',
    latency: '★★★☆☆',
    ease: '★★★★★',
    gpu: 'CUDA, Metal, ROCm',
  },
  {
    name: 'llama.cpp',
    tagline: 'C++ · CPU+GPU · Edge deployment',
    color: 'border-red-500',
    features: ['Pure C/C++ implementation', 'CPU + GPU hybrid inference', 'GGUF quantized models', 'Runs on phones & Raspberry Pi'],
    throughput: '★★☆☆☆',
    latency: '★★★☆☆',
    ease: '★★★☆☆',
    gpu: 'CUDA, Metal, Vulkan, SYCL',
  },
]

const TABLE_HEADERS = ['Framework', 'Throughput', 'Latency', 'Ease of Use', 'GPU Support'] as const

const EN_P3 = `Inference in Practice — nanochat`
const EN_INTRO = `A trained model is just weights on disk. To serve it at scale you need a framework that handles batching, scheduling, and optimization.`

export const ServingFrameworksSection: React.FC = () => {
  const { lang } = useLanguage()
  const fRAMEWORKST = tArray(lang, FRAMEWORKS, frameworksTranslations)
  const c = useT({ title: '2. Serving Frameworks', intro: EN_INTRO  , p3: EN_P3 }, { sv: servingFrameworksSectionSv, ko: servingFrameworksSectionKo })
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = useCallback((name: string) => {
    setExpanded(prev => (prev === name ? null : name))
  }, [])

  return (
    <section aria-labelledby="serving-frameworks">
      <h2 id="serving-frameworks" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Cards */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {fRAMEWORKST.map(fw => (
          <button
            key={fw.name}
            onClick={() => toggle(fw.name)}
            className={`rounded-lg border-l-4 ${fw.color} bg-white dark:bg-zinc-900 p-4 text-left transition-all hover:bg-zinc-200 dark:hover:bg-zinc-100 dark:bg-zinc-800`}
            aria-expanded={expanded === fw.name}
          >
            <h3 className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{fw.name}</h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{fw.tagline}</p>
            {expanded === fw.name && (
              <ul className="mt-3 space-y-1">
                {fw.features.map(f => (
                  <li key={f} className="text-xs text-zinc-700 dark:text-zinc-300">• {f}</li>
                ))}
              </ul>
            )}
          </button>
        ))}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
              {TABLE_HEADERS.map(h => (
                <th key={h} className="px-4 py-3 font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fRAMEWORKST.map(fw => (
              <tr key={fw.name} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-white dark:bg-zinc-900/50">
                <td className="px-4 py-3 font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">{fw.name}</td>
                <td className="px-4 py-3 text-xs text-zinc-700 dark:text-zinc-300">{fw.throughput}</td>
                <td className="px-4 py-3 text-xs text-zinc-700 dark:text-zinc-300">{fw.latency}</td>
                <td className="px-4 py-3 text-xs text-zinc-700 dark:text-zinc-300">{fw.ease}</td>
                <td className="px-4 py-3 text-xs text-zinc-700 dark:text-zinc-300">{fw.gpu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-700 dark:text-zinc-300">{c.p3}</h3>
        <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">
          nanochat includes its own inference engine (<code className="text-amber-700 dark:text-amber-300">engine.py</code>)
          with KV cache, plus two ways to talk to your model: a CLI and a ChatGPT-like web UI.
        </p>
        <SimulatedTerminal
          title="nanochat — inference"
          steps={[
            {
              command: 'python -m scripts.chat_cli --model logs/d26/chat_rl.pt -p "Write a haiku about GPUs"',
              output:
                'Loading model: d26 (1.6B params)\n' +
                'Using engine.py: KV cache enabled, bfloat16\n' +
                '─────────────────────────────────────────\n' +
                'Silicon hearts glow,\n' +
                'Matrices dance through the night—\n' +
                'Gradients descend.\n' +
                '─────────────────────────────────────────\n' +
                'Tokens generated: 24 | Time: 0.8s | 30 tok/s',
              delay: 1000,
            },
            {
              command: 'python -m scripts.chat_web --model logs/d26/chat_rl.pt',
              output:
                'Starting nanochat web UI...\n' +
                'Model: d26 (1.6B params) | KV cache: enabled\n' +
                '─────────────────────────────────────────\n' +
                '  Server running at http://0.0.0.0:8000\n' +
                '   Open in browser to chat with your LLM!\n' +
                '─────────────────────────────────────────\n' +
                'This is the same ChatGPT-like interface\n' +
                'you get after running the full speedrun.',
              delay: 800,
            },
          ]}
        />
      </div>
    </section>
  )
}
