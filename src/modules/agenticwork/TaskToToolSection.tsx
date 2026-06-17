import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { WorkAppWindow } from '../../components/WorkAppWindow'
import type { WorkEventKind } from '../../components/WorkAppWindow'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// The recurring-task signal: the same weekly job run in Quick, third week running.
// Seeing it repeat is what motivates the delegate→commission pivot below.
const RECUR_KINDS: WorkEventKind[] = ['brief', 'working', 'done']

// Order matches `items` in useTranslation().modules.agenticwork.taskToTool.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'cycle', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'build', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'puzzle', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'people', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

const STEP_COLORS = [
  'border-blue-400 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5',
  'border-emerald-400 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5',
  'border-amber-400 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5',
  'border-purple-400 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/5',
  'border-rose-400 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/5',
]

export const TaskToToolSection: React.FC = () => {
  const c = useTranslation().modules.agenticwork.taskToTool
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="task-to-tool">
      <h2 id="task-to-tool" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="mb-8">
        <p className="mb-3 max-w-2xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{c.demoIntro}</p>
        <WorkAppWindow variant="quick-desktop" steps={[...c.demoSteps]} kinds={RECUR_KINDS} />
      </div>

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

      <div className="mt-8">
        <InteractiveDemo
          title={c.walkthroughTitle}
          steps={c.steps.map((s, i) => (
            <div key={i} className={`rounded-lg border p-5 ${STEP_COLORS[i % STEP_COLORS.length]}`}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{c.stepLabel} {i + 1} — {s.label}</p>
              <p className="mb-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{s.content}</p>
              <p className="text-xs italic text-zinc-600 dark:text-zinc-400">{s.note}</p>
            </div>
          ))}
        />
      </div>

      <p className="mt-6 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>

      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
