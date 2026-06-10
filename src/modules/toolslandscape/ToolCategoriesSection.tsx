import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Non-translatable per-category metadata. Order matches the `items` array in
// `useTranslation().modules.toolslandscape.categories.items`.
const CATEGORY_META: { icon: IconName; color: string }[] = [
  { icon: 'chat', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'edit', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'terminal', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'robot', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const ToolCategoriesSection: React.FC = () => {
  const c = useTranslation().modules.toolslandscape.categories
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="tool-categories">
      <h2 id="tool-categories" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <div className="space-y-2">
        {c.items.map((item, i) => (
          <div key={item.name} className={`rounded-lg border ${CATEGORY_META[i]?.color ?? ''}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="flex items-center gap-2">
                <Icon name={CATEGORY_META[i]?.icon ?? 'box'} className="shrink-0 text-zinc-600 dark:text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">— {item.tagline}</span>
              </div>
              <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{item.description}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400"><strong>{c.whenLabel}</strong> {item.when}</p>
                <p className="text-xs text-zinc-500"><strong className="text-zinc-600 dark:text-zinc-400">{c.toolsLabel}</strong> {item.tools}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-2xl rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.axisNote}</p>
    </section>
  )
}
