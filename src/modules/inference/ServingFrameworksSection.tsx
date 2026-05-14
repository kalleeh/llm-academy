import { useState, useCallback } from 'react'
import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import { useTranslation } from '../../i18n'

// Non-translatable per-framework metadata. Order matches `frameworks` array in
// `useTranslation().modules.inference.servingFrameworksSection.frameworks`.
const FRAMEWORK_META: { color: string; throughput: string; latency: string; ease: string; gpu: string }[] = [
  { color: 'border-blue-500', throughput: '★★★★☆', latency: '★★★★☆', ease: '★★★★☆', gpu: 'CUDA (Nvidia)' },
  { color: 'border-green-500', throughput: '★★★★★', latency: '★★★★★', ease: '★★★☆☆', gpu: 'CUDA (Nvidia)' },
  { color: 'border-amber-500', throughput: '★★★★★', latency: '★★★★★', ease: '★★☆☆☆', gpu: 'CUDA only (optimized)' },
  { color: 'border-purple-500', throughput: '★★☆☆☆', latency: '★★★☆☆', ease: '★★★★★', gpu: 'CUDA, Metal, ROCm' },
  { color: 'border-red-500', throughput: '★★☆☆☆', latency: '★★★☆☆', ease: '★★★☆☆', gpu: 'CUDA, Metal, Vulkan, SYCL' },
]

const TABLE_HEADERS = ['Framework', 'Throughput', 'Latency', 'Ease of Use', 'GPU Support'] as const

export const ServingFrameworksSection: React.FC = () => {
  const c = useTranslation().modules.inference.servingFrameworksSection
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
        {c.frameworks.map((fw, i) => {
          const meta = FRAMEWORK_META[i]
          return (
            <button
              key={fw.name}
              onClick={() => toggle(fw.name)}
              className={`rounded-lg border-l-4 ${meta.color} bg-white dark:bg-zinc-900 p-4 text-left transition-all hover:bg-zinc-200 dark:hover:bg-zinc-100 dark:bg-zinc-800`}
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
          )
        })}
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
            {c.frameworks.map((fw, i) => {
              const meta = FRAMEWORK_META[i]
              return (
                <tr key={fw.name} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-white dark:bg-zinc-900/50">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">{fw.name}</td>
                  <td className="px-4 py-3 text-xs text-zinc-700 dark:text-zinc-300">{meta.throughput}</td>
                  <td className="px-4 py-3 text-xs text-zinc-700 dark:text-zinc-300">{meta.latency}</td>
                  <td className="px-4 py-3 text-xs text-zinc-700 dark:text-zinc-300">{meta.ease}</td>
                  <td className="px-4 py-3 text-xs text-zinc-700 dark:text-zinc-300">{meta.gpu}</td>
                </tr>
              )
            })}
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
