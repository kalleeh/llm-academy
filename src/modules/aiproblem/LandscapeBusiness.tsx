import { useState, useCallback } from 'react'
import { useTranslation } from '../../i18n'

const COLORS = [
  'border-blue-400 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5',
  'border-emerald-400 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5',
  'border-purple-400 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/5',
  'border-amber-400 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5',
]

export const LandscapeBusiness: React.FC = () => {
  const c = useTranslation().modules.aiproblem.landscape
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="landscape-biz">
      <h2 id="landscape-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <div className="space-y-2">
        {c.levels.map((level, i) => (
          <div key={i} style={{ marginLeft: `${i * 20}px` }}>
            <button onClick={() => toggle(i)} className={`w-full rounded-lg border p-4 text-left transition-all hover:brightness-125 ${COLORS[i]} ${expanded === i ? 'ring-2 ring-zinc-500/30' : ''}`} aria-expanded={expanded === i}>
              <div className="flex items-center justify-between">
                <div><span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{level.label}</span><span className="ml-2 text-xs text-zinc-600 dark:text-zinc-400">— {level.plain}</span></div>
                <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
              </div>
            </button>
            {expanded === i && (
              <div className="mt-1 rounded-b-lg border border-t-0 border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 p-4">
                <p className="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{level.analogy}</p>
                <p className="mb-2 text-xs font-medium text-zinc-500">{c.examplesLabel}</p>
                <ul className="space-y-1">{level.examples.map((ex) => <li key={ex} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"><span className="mt-1 text-zinc-500 dark:text-zinc-600">•</span>{ex}</li>)}</ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
