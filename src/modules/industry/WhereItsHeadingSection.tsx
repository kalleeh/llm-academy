import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Per-trend non-translatable metadata. Order matches the `trends` array in
// `useTranslation().modules.industry.whereItsHeadingSection.trends`.
const TREND_META: { icon: IconName; color: string }[] = [
  { icon: 'brain',   color: 'border-purple-500' },
  { icon: 'palette', color: 'border-blue-500' },
  { icon: 'robot',   color: 'border-green-500' },
  { icon: 'mobile',  color: 'border-amber-500' },
  { icon: 'bolt',    color: 'border-cyan-500' },
  { icon: 'scale',   color: 'border-red-500' },
]

export const WhereItsHeadingSection: React.FC = () => {
  const c = useTranslation().modules.industry.whereItsHeadingSection
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = useCallback((id: string) => {
    setExpanded(prev => (prev === id ? null : id))
  }, [])

  return (
    <section aria-labelledby="where-heading">
      <h2 id="where-heading" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {c.trends.map((t, i) => {
          const meta = TREND_META[i]
          return (
            <button
              key={t.id}
              onClick={() => toggle(t.id)}
              className={`rounded-lg border-l-4 ${meta.color} bg-white dark:bg-zinc-900 p-4 text-left transition-all hover:bg-zinc-100 dark:bg-zinc-800`}
              aria-expanded={expanded === t.id}
            >
              <div className="flex items-center gap-2">
                <Icon name={meta.icon} className="text-lg" />
                <h3 className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{t.title}</h3>
              </div>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{t.tagline}</p>
              {expanded === t.id && (
                <div className="mt-3 border-t border-zinc-200 dark:border-zinc-700 pt-3">
                  <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">{t.detail}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {t.examples.map(ex => (
                      <span key={ex} className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-700 dark:text-zinc-300">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
