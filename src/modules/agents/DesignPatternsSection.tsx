import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Non-translatable per-pattern metadata. Order matches `patterns` array in
// `useTranslation().modules.agents.designPatternsSection.patterns`.
const PATTERN_META: { icon: IconName; diagram: string[] }[] = [
  { icon: 'cycle', diagram: ['Thought', '→', 'Action', '→', 'Observation', '→', '(repeat)'] },
  { icon: 'mirror', diagram: ['Generate', '→', 'Critique', '→', 'Revise', '→', 'Output'] },
  { icon: 'clipboard', diagram: ['Analyze task', '→', 'Create plan', '→', 'Execute steps', '→', 'Adapt if needed'] },
  { icon: 'people', diagram: ['Orchestrator', '→', 'Agent A', '⇄', 'Agent B', '⇄', 'Agent C'] },
  { icon: 'shield', diagram: ['Agent plans', '→', 'Risk check', '→', '⏸ Human approval', '→', 'Execute'] },
]

export const DesignPatternsSection: React.FC = () => {
  const c = useTranslation().modules.agents.designPatternsSection
  const [activePattern, setActivePattern] = useState(0)

  const handlePatternClick = useCallback((index: number) => {
    setActivePattern(index)
  }, [])

  const pattern = c.patterns[activePattern]
  const meta = PATTERN_META[activePattern]

  return (
    <section aria-labelledby="design-patterns">
      <h2 id="design-patterns" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        {/* Pattern selector */}
        <div className="flex flex-col gap-1.5" role="tablist" aria-label="Agent design patterns">
          {c.patterns.map((p, i) => (
            <button
              key={p.name}
              role="tab"
              aria-selected={i === activePattern}
              onClick={() => handlePatternClick(i)}
              className={`flex items-center gap-2.5 rounded-md px-3 py-3 text-left text-sm transition-colors ${
                i === activePattern
                  ? 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/40'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:bg-zinc-800 hover:text-zinc-800 dark:text-zinc-200'
              }`}
            >
              <span className="text-lg"><Icon name={PATTERN_META[i].icon} /></span>
              {p.name}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900" role="tabpanel">
          <div className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-5 py-3">
            <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <Icon name={meta.icon} /> {pattern.name}
            </h3>
          </div>
          <div className="space-y-4 p-5">
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{pattern.description}</p>

            {/* Diagram */}
            <div className="rounded-md bg-zinc-50 dark:bg-zinc-950 p-4">
              <p className="mb-2 text-xs font-medium text-zinc-500">Flow</p>
              <div className="flex flex-wrap items-center gap-2">
                {meta.diagram.map((step, i) =>
                  step === '→' || step === '⇄' ? (
                    <span key={i} className="text-zinc-600">{step}</span>
                  ) : (
                    <span key={i} className="rounded border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 font-mono text-xs text-violet-300">
                      {step}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-md bg-zinc-100 dark:bg-zinc-800 p-3">
              <p className="text-xs font-medium text-zinc-500">Best for</p>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{pattern.useCase}</p>
            </div>

            <div className="rounded-md bg-zinc-100 dark:bg-zinc-800 p-3">
              <p className="text-xs font-medium text-zinc-500">Example</p>
              <p className="mt-1 font-mono text-xs leading-relaxed text-green-300">{pattern.example}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
