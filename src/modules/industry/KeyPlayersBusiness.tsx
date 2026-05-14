import { useState, useCallback } from 'react'
import { useTranslation } from '../../i18n'

// Per-player non-translatable color. Order matches the `players` array in
// `useTranslation().modules.industry.keyPlayers.players`.
const PLAYER_COLORS = [
  'border-emerald-500/30 bg-emerald-500/5',
  'border-blue-500/30 bg-blue-500/5',
  'border-purple-500/30 bg-purple-500/5',
  'border-amber-500/30 bg-amber-500/5',
  'border-cyan-500/30 bg-cyan-500/5',
  'border-zinc-500/30 bg-zinc-100 dark:bg-zinc-800',
] as const

export const KeyPlayersBusiness: React.FC = () => {
  const c = useTranslation().modules.industry.keyPlayers
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="players-biz">
      <h2 id="players-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        {c.intro}
      </p>
      <div className="space-y-2">
        {c.players.map((p, i) => (
          <div key={p.name} className={`rounded-lg border ${PLAYER_COLORS[i] ?? ''}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div><span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{p.name}</span><span className="ml-2 text-xs text-zinc-600 dark:text-zinc-400">— {p.product}</span></div>
              <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{p.position}</p>
                <p className="text-xs text-zinc-500"><strong className="text-zinc-600 dark:text-zinc-400">Who uses them:</strong> {p.users}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
