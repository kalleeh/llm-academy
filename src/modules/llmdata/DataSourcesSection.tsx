import { useState, useCallback } from 'react'
import { useTranslation } from '../../i18n'

// Non-translatable per-source visualization metadata. Order matches `sources` array in
// `useTranslation().modules.llmdata.dataSourcesSection.sources`.
const SOURCE_META = [
  { percent: 65, barColor: 'bg-blue-500', color: 'text-blue-700 dark:text-blue-400' },
  { percent: 12, barColor: 'bg-green-500', color: 'text-green-700 dark:text-green-400' },
  { percent: 8, barColor: 'bg-amber-500', color: 'text-amber-700 dark:text-amber-400' },
  { percent: 5, barColor: 'bg-purple-500', color: 'text-purple-700 dark:text-purple-400' },
  { percent: 3, barColor: 'bg-cyan-500', color: 'text-cyan-700 dark:text-cyan-400' },
  { percent: 7, barColor: 'bg-rose-500', color: 'text-rose-700 dark:text-rose-400' },
]

export const DataSourcesSection: React.FC = () => {
  const c = useTranslation().modules.llmdata.dataSourcesSection
  const [selected, setSelected] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setSelected(p => p === i ? null : i), [])

  return (
    <section aria-labelledby="data-sources">
      <h2 id="data-sources" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-4 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        {c.p2} <strong className="text-zinc-900 dark:text-zinc-100">FineWeb</strong> (15T tokens),{' '}
        <strong className="text-zinc-900 dark:text-zinc-100">DCLM</strong>, and <strong className="text-zinc-900 dark:text-zinc-100">RedPajama</strong>.
      </p>
      <div className="mb-4 flex h-10 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700" role="img" aria-label="Data source distribution">
        {c.sources.map((s, i) => {
          const meta = SOURCE_META[i]
          return (
            <button key={s.name} onClick={() => toggle(i)}
              className={`${meta.barColor} relative flex items-center justify-center transition-opacity hover:opacity-80 ${selected !== null && selected !== i ? 'opacity-50' : ''}`}
              style={{ width: `${meta.percent}%` }} aria-label={`${s.name}: ${meta.percent}%`}>
              {meta.percent >= 8 && <span className="truncate px-1 text-xs font-semibold text-white drop-shadow">{s.name}</span>}
            </button>
          )
        })}
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {c.sources.map((s, i) => {
          const meta = SOURCE_META[i]
          return (
            <button key={s.name} onClick={() => toggle(i)}
              className={`rounded-lg border p-3 text-left transition-colors ${selected === i ? 'border-zinc-500 bg-zinc-100 dark:bg-zinc-800' : 'border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-600'}`}>
              <div className="flex items-center gap-2">
                <span className={`size-3 rounded-sm ${meta.barColor}`} />
                <span className={`text-sm font-medium ${meta.color}`}>{s.name}</span>
                <span className="ml-auto font-mono text-sm text-zinc-600 dark:text-zinc-400">{meta.percent}%</span>
              </div>
              {selected === i && <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{s.details}</p>}
            </button>
          )
        })}
      </div>
    </section>
  )
}
