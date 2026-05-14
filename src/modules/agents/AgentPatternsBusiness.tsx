import { useState, useCallback } from 'react'
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { useTranslation } from '../../i18n'

// Non-translatable per-pattern color metadata. Order matches `patterns` array in
// `useTranslation().modules.agents.patterns.patterns`.
const PATTERN_META = [
  { color: 'border-blue-500/30 bg-blue-500/5' },
  { color: 'border-emerald-500/30 bg-emerald-500/5' },
  { color: 'border-purple-500/30 bg-purple-500/5' },
  { color: 'border-amber-500/30 bg-amber-500/5' },
]

export const AgentPatternsBusiness: React.FC = () => {
  const c = useTranslation().modules.agents.patterns
  const [showDecision, setShowDecision] = useState(false)

  const toggleDecision = useCallback(() => {
    setShowDecision((prev) => !prev)
  }, [])

  return (
    <section aria-labelledby="patterns-biz">
      <h2 id="patterns-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">
        {c.title}
      </h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        {c.intro}
      </p>

      <InteractiveDemo
        title="Agent Patterns"
        description="Four common ways to organize AI agents — from simple to sophisticated."
        steps={c.patterns.map((p, i) => (
          <div key={p.name} className={`rounded-lg border p-5 ${PATTERN_META[i]?.color ?? ''}`}>
            <div className="mb-3">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{p.name}</span>
              <span className="ml-2 text-xs text-zinc-600 dark:text-zinc-400">— {p.analogy}</span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{p.howItWorks}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800/50 p-3">
                <p className="text-xs font-medium text-zinc-500">Best for</p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{p.bestFor}</p>
              </div>
              <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800/50 p-3">
                <p className="text-xs font-medium text-zinc-500">Real example</p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{p.realExample}</p>
              </div>
            </div>
          </div>
        ))}
      />

      {/* Quick decision guide */}
      <div className="mt-10">
        <button
          onClick={toggleDecision}
          className="mb-4 flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300"
          aria-expanded={showDecision}
        >
          <span>{showDecision ? '▾' : '▸'}</span>
          {c.title}
        </button>
        {showDecision && (
          <div className="space-y-3">
            {c.decisionQuestions.map((dq, i) => (
              <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
                <p className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">{dq.question}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <span className="text-emerald-400">Simple → </span>{dq.simple}
                  </div>
                  <div className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <span className="text-amber-400">Complex → </span>{dq.complex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
