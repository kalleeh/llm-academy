import { useState, useCallback } from 'react'
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { useLanguage } from '../../i18n'
import { getWhatAreAgentsContent } from './content'

const LEVEL_STYLES = [
  { color: 'border-blue-500/30 bg-blue-500/5', badge: 'bg-blue-500/20 text-blue-300' },
  { color: 'border-emerald-500/30 bg-emerald-500/5', badge: 'bg-emerald-500/20 text-emerald-300' },
  { color: 'border-amber-500/30 bg-amber-500/5', badge: 'bg-amber-500/20 text-amber-300' },
]

const LOOP_STYLES = [
  'border-purple-500/40 bg-purple-500/10 text-purple-300',
  'border-amber-500/40 bg-amber-500/10 text-amber-300',
  'border-green-500/40 bg-green-500/10 text-green-300',
  'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
]

export const WhatAreAgentsBusiness: React.FC = () => {
  const { lang } = useLanguage()
  const c = getWhatAreAgentsContent(lang)
  const [expandedExample, setExpandedExample] = useState<number | null>(null)

  const toggleExample = useCallback((i: number) => {
    setExpandedExample((prev) => (prev === i ? null : i))
  }, [])

  return (
    <section aria-labelledby="what-are-agents-biz">
      <h2 id="what-are-agents-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">
        {c.sectionTitle}
      </h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300"
        dangerouslySetInnerHTML={{ __html: c.intro.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-900 dark:text-zinc-100">$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }}
      />
      <p className="mb-8 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.introSub}</p>

      <InteractiveDemo
        title={c.demoTitle}
        description={c.demoDescription}
        steps={c.levels.map((level, i) => (
          <div key={level.level} className="space-y-4">
            <div className={`rounded-lg border p-5 ${LEVEL_STYLES[i]?.color}`}>
              <div className="mb-3 flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${LEVEL_STYLES[i]?.badge}`}>
                  {level.level}
                </span>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{level.analogy}</span>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{level.description}</p>
              <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800/50 p-3">
                <p className="text-xs font-medium text-zinc-500">{c.everydayLabel}</p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{level.everyday}</p>
              </div>
              <p className="mt-3 text-xs text-zinc-500">
                <strong className="text-zinc-600 dark:text-zinc-400">{c.limitLabel}</strong> {level.limit}
              </p>
            </div>
          </div>
        ))}
      />

      <div className="mt-10 mb-8">
        <h3 className="mb-3 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">{c.loopTitle}</h3>
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{c.loopIntro}</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
          {c.loopSteps.map((step, i) => (
            <div key={i} className="contents">
              {i > 0 && <div className="hidden items-center justify-center text-lg text-zinc-600 sm:flex">→</div>}
              <div className={`flex-1 rounded-lg border p-3 ${LOOP_STYLES[i]}`}>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 font-mono text-xs">
                    {i < 3 ? i + 1 : '↻'}
                  </span>
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.loopOutro}</p>
      </div>

      <div className="mb-8">
        <h3 className="mb-3 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">{c.beforeAfterTitle}</h3>
        <div className="space-y-3">
          {c.examples.map((ex, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
              <button
                onClick={() => toggleExample(i)}
                className="flex w-full items-center justify-between px-5 py-3 text-left text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800/50"
                aria-expanded={expandedExample === i}
              >
                {ex.scenario}
                <span className="text-xs text-zinc-500">{expandedExample === i ? '▲' : '▼'}</span>
              </button>
              {expandedExample === i && (
                <div className="grid gap-3 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800/50 p-3">
                    <p className="mb-1 text-xs font-medium text-zinc-500">{c.withoutLabel}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{ex.without}</p>
                  </div>
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                    <p className="mb-1 text-xs font-medium text-emerald-400">{c.withLabel}</p>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">{ex.with}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
