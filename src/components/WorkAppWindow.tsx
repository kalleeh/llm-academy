import { useState, useCallback, useEffect, useRef } from 'react'
import { Icon } from './Icon'

export type WorkAppVariant = 'quick-desktop' | 'cowork'
export type WorkEventKind = 'brief' | 'plan' | 'working' | 'review' | 'done'
export interface WorkStep { label: string; content: string; note?: string }

interface WorkAppWindowProps {
  variant: WorkAppVariant
  steps: WorkStep[]
  /** Parallel to steps: the app-event kind for each step. */
  kinds: WorkEventKind[]
}

const META: Record<WorkAppVariant, { name: string; bar: string; accent: string; chip: string; mark: string }> = {
  'quick-desktop': {
    name: 'Amazon Quick Desktop', bar: 'bg-slate-800', accent: 'text-orange-400',
    chip: 'bg-orange-500/15 text-orange-300 border-orange-500/30', mark: '▦',
  },
  cowork: {
    name: 'Claude Cowork', bar: 'bg-stone-700', accent: 'text-orange-300',
    chip: 'bg-orange-400/15 text-orange-200 border-orange-400/30', mark: '✻',
  },
}

const STAGES: { kind: WorkEventKind; label: string }[] = [
  { kind: 'brief', label: 'Brief' }, { kind: 'plan', label: 'Plan' },
  { kind: 'working', label: 'Work' }, { kind: 'review', label: 'Review' }, { kind: 'done', label: 'Done' },
]

export const WorkAppWindow: React.FC<WorkAppWindowProps> = ({ variant, steps, kinds }) => {
  const [revealed, setRevealed] = useState(0) // count of steps shown
  const m = META[variant]
  const bodyRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setRevealed(0) }, [variant, steps])
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight }, [revealed])

  const next = useCallback(() => setRevealed((r) => Math.min(r + 1, steps.length)), [steps.length])
  const hasMore = revealed < steps.length
  const currentStageIdx = revealed > 0 ? STAGES.findIndex((s) => s.kind === kinds[revealed - 1]) : -1

  return (
    <div className="flex h-96 flex-col overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700 shadow-sm">
      {/* Title bar */}
      <div className={`flex shrink-0 items-center gap-2 px-4 py-2 ${m.bar}`}>
        <span className="size-3 rounded-full bg-white/25" />
        <span className="size-3 rounded-full bg-white/25" />
        <span className="size-3 rounded-full bg-white/25" />
        <span className={`ml-2 font-mono text-xs font-semibold ${m.accent}`}>{m.mark} {m.name}</span>
      </div>
      {/* Stage tracker */}
      <div className="flex shrink-0 items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-3 py-2 text-[10px] font-medium">
        {STAGES.map((s, i) => (
          <span key={s.kind} className={`rounded px-2 py-0.5 ${i <= currentStageIdx ? m.chip + ' border' : 'text-zinc-400 dark:text-zinc-600'}`}>{s.label}</span>
        ))}
      </div>
      {/* Activity body */}
      <div ref={bodyRef} className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950 p-4 space-y-3">
        {steps.slice(0, revealed).map((s, i) => {
          const kind = kinds[i]
          return (
            <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-3">
              <div className="mb-1.5 flex items-center gap-2">
                <span className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${m.chip}`}>{kind === 'brief' ? 'Task' : STAGES.find((st) => st.kind === kind)?.label ?? kind}</span>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{s.label}</span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{s.content}</p>
              {kind === 'working' && (
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div className={`h-full rounded-full ${variant === 'quick-desktop' ? 'bg-orange-500' : 'bg-orange-400'}`} style={{ width: '70%' }} />
                </div>
              )}
              {kind === 'done' && (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-300">
                  <Icon name="check" size={12} /> Deliverable ready
                </div>
              )}
              {s.note && <p className="mt-2 text-xs italic text-zinc-500 dark:text-zinc-500"><Icon name="lightbulb" size={12} className="mr-1 inline" />{s.note}</p>}
            </div>
          )
        })}
        {revealed === 0 && (
          <div className="flex h-full items-center justify-center text-xs text-zinc-400 dark:text-zinc-600">Press Run to start the session</div>
        )}
      </div>
      {/* Action bar */}
      <div className="flex shrink-0 items-center gap-2 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
        {hasMore ? (
          <>
            <button onClick={next} className="rounded bg-zinc-200 dark:bg-zinc-600 px-3 py-1 text-xs text-zinc-900 dark:text-zinc-100 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-500">{revealed === 0 ? 'Run' : 'Next'}</button>
            <span className="text-xs text-zinc-500">Step {revealed + 1} of {steps.length}</span>
          </>
        ) : (
          <span className="text-xs text-zinc-500">✓ Session complete</span>
        )}
      </div>
    </div>
  )
}
