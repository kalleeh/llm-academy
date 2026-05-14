import { useState, useCallback } from 'react'
import { useTranslation } from '../../i18n'

// Non-translatable per-method metadata. Order matches `methods` array in
// `useTranslation().modules.quantization.quantizationMethodsSection.methods`.
const METHOD_META: { id: string; badge?: string }[] = [
  { id: 'gptq' },
  { id: 'awq', badge: '⭐ GPU Default' },
  { id: 'gguf', badge: '⭐ Local Default' },
  { id: 'bnb' },
]

export const QuantizationMethodsSection: React.FC = () => {
  const c = useTranslation().modules.quantization.quantizationMethodsSection
  const [activeTab, setActiveTab] = useState(0)
  const method = c.methods[activeTab]
  const meta = METHOD_META[activeTab]

  const selectTab = useCallback((i: number) => setActiveTab(i), [])

  return (
    <section aria-labelledby="quant-methods">
      <h2 id="quant-methods" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {c.methods.map((m, i) => (
          <button
            key={METHOD_META[i].id}
            onClick={() => selectTab(i)}
            className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
              activeTab === i
                ? 'border-zinc-500 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
            }`}
            aria-pressed={activeTab === i}
          >
            {m.name}
            {METHOD_META[i].badge && <span className="ml-2 text-xs text-amber-700 dark:text-amber-400">{METHOD_META[i].badge}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5" key={meta.id}>
        <div className="mb-4">
          <h3 className="font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">{method.name}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{method.tagline}</p>
        </div>

        <div className="mb-4">
          <h4 className="mb-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            How it works
          </h4>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{method.howItWorks}</p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-md bg-green-50 dark:bg-green-500/10 p-3">
            <span className="text-xs font-medium text-green-700 dark:text-green-400">✓ Pros</span>
            <ul className="mt-2 space-y-1">
              {method.pros.map((p) => (
                <li key={p} className="text-sm text-zinc-700 dark:text-zinc-300">• {p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md bg-red-50 dark:bg-red-500/10 p-3">
            <span className="text-xs font-medium text-red-700 dark:text-red-400">✗ Cons</span>
            <ul className="mt-2 space-y-1">
              {method.cons.map((con) => (
                <li key={con} className="text-sm text-zinc-700 dark:text-zinc-300">• {con}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 p-3">
          <span className="text-xs font-medium text-amber-700 dark:text-amber-400">When to use</span>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{method.whenToUse}</p>
        </div>
      </div>
    </section>
  )
}
