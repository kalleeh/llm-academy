import { useState, useCallback } from 'react'
import { useTranslation } from '../../i18n'

type Category = 'rule-based' | 'classical-ml' | 'deep-learning' | 'llm'

// Per-scenario non-translatable metadata. Order matches the `scenarios` array
// in `useTranslation().modules.aiproblem.classificationSection.scenarios`.
const SCENARIO_CATEGORIES: Category[] = [
  'rule-based',
  'classical-ml',
  'classical-ml',
  'deep-learning',
  'deep-learning',
  'llm',
  'llm',
  'llm',
  'classical-ml',
  'classical-ml',
]

const CATEGORY_COLORS: Record<Category, string> = {
  'rule-based': 'border-zinc-500/50 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300',
  'classical-ml': 'border-emerald-400 dark:border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  'deep-learning': 'border-purple-400 dark:border-purple-500/50 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300',
  'llm': 'border-amber-400 dark:border-amber-500/50 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300',
}

export const ClassificationSection: React.FC = () => {
  const c = useTranslation().modules.aiproblem.classificationSection
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  const toggleCard = useCallback((index: number) => {
    setRevealed(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }, [])

  return (
    <section aria-labelledby="classification">
      <h2 id="classification" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        {c.p2} <em>why</em>.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {c.scenarios.map((s, i) => {
          const isRevealed = revealed.has(i)
          const category = SCENARIO_CATEGORIES[i]
          return (
            <button
              key={i}
              onClick={() => toggleCard(i)}
              className={`rounded-lg border p-4 text-left transition-all ${
                isRevealed
                  ? 'border-zinc-600 bg-zinc-100 dark:bg-zinc-800/80'
                  : 'border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-100 dark:bg-zinc-800/50'
              }`}
              aria-expanded={isRevealed}
            >
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{s.problem}</p>
              {isRevealed ? (
                <div className="mt-3 space-y-2">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[category]}`}
                  >
                    {s.approach}
                  </span>
                  <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{s.why}</p>
                </div>
              ) : (
                <p className="mt-2 text-xs text-zinc-500">Click to reveal →</p>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
