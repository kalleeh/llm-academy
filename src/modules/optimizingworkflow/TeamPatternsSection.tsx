import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { CourseBridge } from '../../components/CourseBridge'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.optimizingworkflow.teamPatterns.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'folder', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'books', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'shield', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'bar-chart', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const TeamPatternsSection: React.FC = () => {
  const c = useTranslation().modules.optimizingworkflow.teamPatterns
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="team-patterns">
      <h2 id="team-patterns" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <div className="space-y-2">
        {c.items.map((item, i) => (
          <div key={item.name} className={`rounded-lg border ${ITEM_META[i]?.color ?? ''}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="flex items-center gap-2">
                <Icon name={ITEM_META[i]?.icon ?? 'box'} className="shrink-0 text-zinc-600 dark:text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">— {item.tagline}</span>
              </div>
              <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <CourseBridge target="ai-in-org" blurb={c.bridgeBlurb} />
    </section>
  )
}
