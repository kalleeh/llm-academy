import { useState, useCallback } from 'react'
import { useTranslation } from '../../i18n'

// Non-translatable per-technique metadata. Order matches `techniques` array in
// `useTranslation().modules.inference.optimizationTechniquesSection.techniques`.
const TECHNIQUE_META: { id: string; before: { label: string; value: number }; after: { label: string; value: number }; unit: string; visual: string[] }[] = [
  {
    id: 'continuous-batching',
    before: { label: 'Static batching', value: 40 },
    after: { label: 'Continuous batching', value: 150 },
    unit: 'req/s',
    visual: ['Req A ████████░░░░', 'Req B ░░████████░░', 'Req C ░░░░░░████░░', 'GPU idle ████░░░░████'],
  },
  {
    id: 'kv-paging',
    before: { label: 'Contiguous allocation', value: 35 },
    after: { label: 'PagedAttention', value: 90 },
    unit: '% GPU utilization',
    visual: ['Seq 1 [██░░░░░░]', 'Seq 2 [████░░░░]', 'Wasted  [░░░░████]'],
  },
  {
    id: 'speculative',
    before: { label: 'Standard decode', value: 30 },
    after: { label: 'Speculative (K=5)', value: 75 },
    unit: 'tokens/s',
    visual: ['Draft:  [t1 t2 t3 t4 t5]', 'Verify: [✓  ✓  ✓  ✗  —]', 'Accept: [t1 t2 t3] + resample t4'],
  },
  {
    id: 'prefix-caching',
    before: { label: 'No caching', value: 200 },
    after: { label: 'Prefix cached', value: 50 },
    unit: 'ms prefill',
    visual: ['System prompt KV: [cached ████████]', 'User query KV:   [compute ██]', 'Total:           [████████ ██]'],
  },
]

export const OptimizationTechniquesSection: React.FC = () => {
  const c = useTranslation().modules.inference.optimizationTechniquesSection
  const [activeIdx, setActiveIdx] = useState(0)
  const tech = c.techniques[activeIdx]
  const meta = TECHNIQUE_META[activeIdx]

  const handleSelect = useCallback((i: number) => () => setActiveIdx(i), [])

  const beforePct = Math.round((meta.before.value / Math.max(meta.before.value, meta.after.value)) * 100)
  const afterPct = Math.round((meta.after.value / Math.max(meta.before.value, meta.after.value)) * 100)
  const isLowerBetter = meta.id === 'prefix-caching'

  return (
    <section aria-labelledby="optimization-techniques">
      <h2 id="optimization-techniques" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Technique selector */}
      <div className="mb-4 flex flex-wrap gap-2">
        {c.techniques.map((t, i) => (
          <button
            key={TECHNIQUE_META[i].id}
            onClick={handleSelect(i)}
            className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
              activeIdx === i
                ? 'bg-zinc-100 text-zinc-900'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700'
            }`}
            aria-pressed={activeIdx === i}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Detail card */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <h3 className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{tech.name}</h3>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{tech.short}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{tech.description}</p>

        {/* ASCII visual */}
        <div className="mt-4 rounded-md bg-zinc-50 dark:bg-zinc-950 p-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
          {meta.visual.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {/* Before/after comparison */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
            Before / After ({meta.unit})
          </p>
          <div className="space-y-2">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">{meta.before.label}</span>
                <span className={isLowerBetter ? 'text-red-700 dark:text-red-400' : 'text-zinc-700 dark:text-zinc-300'}>
                  {meta.before.value} {meta.unit}
                </span>
              </div>
              <div className="h-5 w-full overflow-hidden rounded bg-zinc-100 dark:bg-zinc-800">
                <div
                  className={`h-full rounded transition-all duration-500 ${isLowerBetter ? 'bg-red-200 dark:bg-red-500/60' : 'bg-zinc-600'}`}
                  style={{ width: `${beforePct}%` }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">{meta.after.label}</span>
                <span className={isLowerBetter ? 'text-green-700 dark:text-green-400' : 'text-green-700 dark:text-green-400'}>
                  {meta.after.value} {meta.unit}
                </span>
              </div>
              <div className="h-5 w-full overflow-hidden rounded bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full rounded bg-green-500 transition-all duration-500"
                  style={{ width: `${afterPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
