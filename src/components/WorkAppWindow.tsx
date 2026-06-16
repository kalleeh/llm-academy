import { useState, useCallback, useEffect } from 'react'
import { Icon } from './Icon'
import type { IconName } from './Icon'

export type WorkAppVariant = 'quick-desktop' | 'cowork'
export type WorkEventKind = 'brief' | 'plan' | 'working' | 'review' | 'done'
export interface WorkStep { label: string; content: string; note?: string }

interface WorkAppWindowProps {
  variant: WorkAppVariant
  steps: WorkStep[]
  /** Parallel to steps: the app-event kind for each step. */
  kinds: WorkEventKind[]
}

// ── shared logo marks ──────────────────────────────────────────────────────
// Amazon Quick's hexagon logo; Claude's hand-drawn clay "spark".
const QuickHex: React.FC<{ size?: number; color: string }> = ({ size = 16, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill={color} />
    <circle cx="12" cy="12" r="2.6" fill="#fff" />
  </svg>
)
const ClaudeSpark: React.FC<{ size?: number; color: string }> = ({ size = 16, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path
      d="M12 1.5c.4 3.3 1.1 5.3 2.3 6.4 1.1 1.1 3.1 1.8 6.2 2.1-3.1.3-5.1 1-6.2 2.1-1.2 1.1-1.9 3.1-2.3 6.4-.4-3.3-1.1-5.3-2.3-6.4-1.1-1.1-3.1-1.8-6.2-2.1 3.1-.3 5.1-1 6.2-2.1 1.2-1.1 1.9-3.1 2.3-6.4z"
      fill={color}
    />
  </svg>
)

// macOS window-control dots, shared chrome on both apps.
const TrafficLights = () => (
  <div className="flex items-center gap-1.5">
    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
    <span className="size-2.5 rounded-full bg-[#febc2e]" />
    <span className="size-2.5 rounded-full bg-[#28c840]" />
  </div>
)

// Step bookkeeping shared by both layouts.
interface StepState { step: WorkStep; kind: WorkEventKind; gi: number; state: 'done' | 'current' | 'pending' }
function useStepStates(steps: WorkStep[], kinds: WorkEventKind[], revealed: number): StepState[] {
  const complete = revealed >= steps.length
  return steps.map((step, gi) => ({
    step,
    kind: kinds[gi],
    gi,
    state: gi >= revealed ? 'pending' : complete ? 'done' : gi === revealed - 1 ? 'current' : 'done',
  }))
}

const STAGE_LABEL: Record<WorkEventKind, string> = {
  brief: 'Task', plan: 'Plan', working: 'Work', review: 'Review', done: 'Done',
}

// ── Amazon Quick Desktop layout ─────────────────────────────────────────────
// Left icon+label rail · light/white chat workspace · top-right panel toggles ·
// agent work shown as an inline task list · indigo #6344F6 accent.
const QUICK = { accent: '#6344f6', soft: '#ece8fd', text: '#1f1f24', muted: '#6b6b73', border: '#e6e3f5', bg: '#ffffff', rail: '#faf9fe' }
const QUICK_NAV: { icon: IconName; label: string }[] = [
  { icon: 'edit', label: 'New chat' },
  { icon: 'bolt', label: 'Activity feed' },
  { icon: 'bar-chart', label: 'My stuff' },
  { icon: 'people', label: 'More' },
]
const QUICK_PANELS = ['Feed', 'Agents', 'Tasks', 'All data & apps']

const QuickApp: React.FC<{ states: StepState[]; revealed: number; hasMore: boolean; next: () => void; total: number }> = ({ states, revealed, hasMore, next, total }) => {
  const q = QUICK
  const brief = states.find((s) => s.kind === 'brief')
  const agent = states.filter((s) => s.kind !== 'brief')
  const anyAgentRevealed = agent.some((s) => s.state !== 'pending')
  return (
    <div className="flex h-full" style={{ backgroundColor: q.bg }}>
      {/* Left icon+label rail */}
      <div className="hidden w-40 shrink-0 flex-col border-r px-2 py-3 sm:flex" style={{ backgroundColor: q.rail, borderColor: q.border }}>
        <div className="mb-3 flex items-center gap-1.5 px-2">
          <QuickHex size={15} color={q.accent} />
          <span className="text-xs font-bold" style={{ color: q.text }}>Quick</span>
        </div>
        {QUICK_NAV.map((n, i) => (
          <div
            key={n.label}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs"
            style={i === 0 ? { backgroundColor: q.soft, color: q.accent, fontWeight: 600 } : { color: q.muted }}
          >
            <Icon name={n.icon} size={14} /> {n.label}
          </div>
        ))}
        <div className="mt-2 px-2 text-[10px] font-semibold uppercase tracking-wide" style={{ color: q.muted }}>Recents</div>
        <div className="truncate px-2 py-1 text-xs" style={{ color: q.muted }}>Customer themes…</div>
        <div className="mt-auto flex items-center gap-2 px-2 py-1.5 text-xs" style={{ color: q.muted }}>
          <Icon name="gear" size={14} /> Settings
        </div>
      </div>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top panel-toggle strip */}
        <div className="flex shrink-0 items-center gap-1.5 border-b px-3 py-1.5" style={{ borderColor: q.border }}>
          {QUICK_PANELS.map((p) => (
            <span key={p} className="rounded-md px-2 py-0.5 text-[10px] font-medium" style={{ color: q.muted }}>{p}</span>
          ))}
          <span className="ml-auto flex items-center gap-1 text-[10px]" style={{ color: q.muted }}>
            <span className="size-2 rounded-full bg-[#28c840]" /> Connected
          </span>
        </div>

        {/* Conversation */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {revealed === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <QuickHex size={28} color={q.accent} />
              <p className="mt-3 text-sm font-medium" style={{ color: q.text }}>Good morning</p>
              <p className="mt-1 text-xs" style={{ color: q.muted }}>Ask a question or delegate a task to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* User brief */}
              {brief && (
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm px-3.5 py-2 text-sm leading-relaxed" style={{ backgroundColor: q.soft, color: q.text }}>
                    {brief.step.content}
                  </div>
                </div>
              )}
              {/* Agent response with an inline task list */}
              {anyAgentRevealed && (
                <div className="flex gap-2.5">
                  <span className="mt-0.5 shrink-0"><QuickHex size={18} color={q.accent} /></span>
                  <div className="min-w-0 flex-1">
                    <div className="rounded-xl border p-3" style={{ borderColor: q.border, backgroundColor: q.rail }}>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: q.muted }}>
                        {revealed >= total ? 'Completed' : 'Working…'}
                      </p>
                      <div className="space-y-2">
                        {agent.filter((s) => s.state !== 'pending').map((s) => (
                          <div key={s.gi}>
                            <div className="flex items-center gap-2 text-sm" style={{ color: q.text }}>
                              {s.state === 'current' ? (
                                <span className="size-3.5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent" style={{ color: q.accent }} />
                              ) : (
                                <span className="grid size-3.5 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: q.accent }}><Icon name="check" size={9} /></span>
                              )}
                              <span className="font-medium">{s.step.label}</span>
                            </div>
                            {s.state === 'current' && <p className="ml-5.5 mt-0.5 pl-0.5 text-sm leading-relaxed" style={{ color: q.muted }}>{s.step.content}</p>}
                          </div>
                        ))}
                      </div>
                      {revealed >= total && (
                        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium" style={{ backgroundColor: q.soft, color: q.accent }}>
                          <Icon name="check" size={12} /> Deliverable ready in My stuff
                        </div>
                      )}
                    </div>
                    {agent.find((s) => s.state === 'current')?.step.note && (
                      <p className="mt-1.5 text-xs italic" style={{ color: q.muted }}>
                        <Icon name="lightbulb" size={12} className="mr-1 inline" />{agent.find((s) => s.state === 'current')?.step.note}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="shrink-0 border-t px-3 py-2.5" style={{ borderColor: q.border }}>
          <div className="flex items-center gap-2 rounded-xl border px-2.5 py-1.5" style={{ borderColor: q.border }}>
            <span className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: q.soft, color: q.accent }}>Quick ▾</span>
            <span className="flex-1 truncate text-xs" style={{ color: q.muted }}>Ask a question…</span>
            <span className="rounded px-1 text-[10px]" style={{ color: q.muted }}>Auto ▾</span>
            <Icon name="search" size={13} className="shrink-0" style={{ color: q.muted }} />
            {hasMore ? (
              <button onClick={next} className="grid size-6 shrink-0 place-items-center rounded-full text-white transition-opacity hover:opacity-90" style={{ backgroundColor: q.accent }}>
                <Icon name="arrow-right" size={13} />
              </button>
            ) : (
              <span className="px-1 text-xs font-medium" style={{ color: q.accent }}>✓</span>
            )}
          </div>
          <p className="mt-1 text-center text-[10px]" style={{ color: q.muted }}>{hasMore ? `${revealed === 0 ? 'Press send to run' : 'Step ' + revealed + ' of ' + total} · click ▸ to advance` : 'Session complete'}</p>
        </div>
      </div>
    </div>
  )
}

// ── Claude Cowork layout ────────────────────────────────────────────────────
// Claude Desktop chrome with Chat·Cowork·Code tabs · left chats/projects rail ·
// center reading column · signature right-hand live Activity panel · cream bg.
const CO = { accent: '#d97757', soft: '#f3e6df', text: '#141413', muted: '#87867f', border: '#e8e6dc', bg: '#faf9f5', rail: '#f0eee6', card: '#ffffff' }
const CO_NAV: { icon: IconName; label: string }[] = [
  { icon: 'edit', label: 'New chat' },
  { icon: 'folder', label: 'Projects' },
]

const CoworkApp: React.FC<{ states: StepState[]; revealed: number; hasMore: boolean; next: () => void }> = ({ states, revealed, hasMore, next }) => {
  const co = CO
  const brief = states.find((s) => s.kind === 'brief')
  const agent = states.filter((s) => s.kind !== 'brief')
  const current = agent.find((s) => s.state === 'current')
  const revealedAgent = agent.filter((s) => s.state !== 'pending')
  const showArtifacts = agent.some((s) => (s.kind === 'review' || s.kind === 'done') && s.state !== 'pending')
  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: co.bg }}>
      {/* Claude Desktop tab bar */}
      <div className="flex shrink-0 items-center gap-2 border-b px-3 py-1.5" style={{ backgroundColor: co.rail, borderColor: co.border }}>
        <ClaudeSpark size={15} color={co.accent} />
        <span className="text-xs font-semibold" style={{ color: co.text }}>Claude</span>
        <div className="ml-3 flex items-center gap-0.5 rounded-lg p-0.5" style={{ backgroundColor: co.border }}>
          {['Chat', 'Cowork', 'Code'].map((tab) => (
            <span key={tab} className="rounded-md px-2.5 py-0.5 text-[11px] font-medium" style={tab === 'Cowork' ? { backgroundColor: co.card, color: co.text } : { color: co.muted }}>{tab}</span>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Left chats/projects rail */}
        <div className="hidden w-32 shrink-0 flex-col border-r px-2 py-3 sm:flex" style={{ backgroundColor: co.rail, borderColor: co.border }}>
          {CO_NAV.map((n) => (
            <div key={n.label} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs" style={{ color: co.muted }}>
              <Icon name={n.icon} size={13} /> {n.label}
            </div>
          ))}
          <div className="mt-3 px-2 text-[10px] font-semibold uppercase tracking-wide" style={{ color: co.muted }}>Recents</div>
          <div className="truncate px-2 py-1 text-xs" style={{ color: co.muted }}>This session</div>
          <div className="mt-auto flex items-center gap-1.5 px-2 text-xs" style={{ color: co.muted }}>
            <span className="grid size-4 place-items-center rounded-full text-[9px] text-white" style={{ backgroundColor: co.accent }}>K</span> You
          </div>
        </div>

        {/* Center reading column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {revealed === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ClaudeSpark size={26} color={co.accent} />
                <p className="mt-3 text-sm" style={{ color: co.muted }}>Pick a task and Claude works it in your folder.</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {['Organize files', 'Crunch data', 'Draft a summary'].map((s) => (
                    <span key={s} className="rounded-lg border px-2.5 py-1 text-xs" style={{ borderColor: co.border, color: co.text }}>{s}</span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-xl space-y-4">
                {brief && (
                  <div className="rounded-xl px-3.5 py-2.5 text-sm leading-relaxed" style={{ backgroundColor: co.soft, color: co.text }}>
                    {brief.step.content}
                  </div>
                )}
                {revealedAgent.length > 0 && (
                  <div className="text-sm leading-relaxed" style={{ color: co.text }}>
                    <p className="mb-2">Here's my plan — I'll work through it in <span className="font-medium">~/Documents</span> and check in before anything destructive.</p>
                    <div className="space-y-1.5">
                      {agent.map((s) => (
                        <div key={s.gi} className="flex items-start gap-2">
                          <span className="mt-0.5 shrink-0">
                            {s.state === 'done' ? (
                              <span className="grid size-4 place-items-center rounded-[4px] text-white" style={{ backgroundColor: co.accent }}><Icon name="check" size={10} /></span>
                            ) : s.state === 'current' ? (
                              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" style={{ color: co.accent }} />
                            ) : (
                              <span className="size-4 rounded-[4px] border" style={{ borderColor: co.border }} />
                            )}
                          </span>
                          <span style={{ color: s.state === 'pending' ? co.muted : co.text, textDecoration: s.state === 'done' ? 'none' : 'none' }}>{s.step.label}</span>
                        </div>
                      ))}
                    </div>
                    {current && <p className="mt-2.5" style={{ color: co.muted }}>{current.step.content}</p>}
                    {current?.step.note && <p className="mt-1.5 text-xs italic" style={{ color: co.muted }}><Icon name="lightbulb" size={12} className="mr-1 inline" />{current.step.note}</p>}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Composer with the signature "Work in a folder" affordance */}
          <div className="shrink-0 border-t px-4 py-2.5" style={{ borderColor: co.border }}>
            <div className="mb-2 flex items-center gap-1.5 text-[11px]" style={{ color: co.muted }}>
              <span className="grid size-3.5 place-items-center rounded border" style={{ borderColor: co.accent, backgroundColor: co.accent }}><Icon name="check" size={9} className="text-white" /></span>
              Work in a folder · ~/Documents
            </div>
            <div className="flex items-center gap-2 rounded-xl border px-3 py-1.5" style={{ borderColor: co.border, backgroundColor: co.card }}>
              <span className="flex-1 truncate text-xs" style={{ color: co.muted }}>Describe the outcome you want…</span>
              {hasMore ? (
                <button onClick={next} className="grid size-6 shrink-0 place-items-center rounded-md text-white transition-opacity hover:opacity-90" style={{ backgroundColor: co.accent }}>
                  <Icon name="arrow-right" size={13} />
                </button>
              ) : (
                <span className="px-1 text-xs font-medium" style={{ color: co.accent }}>✓</span>
              )}
            </div>
          </div>
        </div>

        {/* Right live Activity panel — Cowork's signature surface */}
        <div className="hidden w-40 shrink-0 flex-col border-l md:flex" style={{ backgroundColor: co.rail, borderColor: co.border }}>
          <div className="border-b px-3 py-2 text-[11px] font-semibold" style={{ borderColor: co.border, color: co.text }}>Activity</div>
          <div className="flex-1 overflow-y-auto px-2 py-2">
            {revealed === 0 ? (
              <p className="px-1 text-[11px] italic" style={{ color: co.muted }}>Steps appear here as Claude works.</p>
            ) : (
              <div className="space-y-1.5">
                {agent.map((s) => (
                  <div key={s.gi} className="flex items-center gap-1.5 text-[11px]" style={{ color: s.state === 'pending' ? co.muted : co.text, opacity: s.state === 'pending' ? 0.55 : 1 }}>
                    {s.state === 'done' ? <span style={{ color: co.accent }}>✓</span> : s.state === 'current' ? <span className="size-2.5 animate-spin rounded-full border-2 border-current border-t-transparent" style={{ color: co.accent }} /> : <span style={{ color: co.muted }}>○</span>}
                    {STAGE_LABEL[s.kind]}
                  </div>
                ))}
              </div>
            )}
            {showArtifacts && (
              <div className="mt-3 border-t pt-2" style={{ borderColor: co.border }}>
                <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-wide" style={{ color: co.muted }}>Artifacts</p>
                <div className="flex items-center gap-1.5 px-1 py-0.5 text-[11px]" style={{ color: co.text }}><Icon name="file" size={11} /> summary.md</div>
                <div className="flex items-center gap-1.5 px-1 py-0.5 text-[11px]" style={{ color: co.text }}><Icon name="bar-chart" size={11} /> figures.png</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── orchestrator ────────────────────────────────────────────────────────────
export const WorkAppWindow: React.FC<WorkAppWindowProps> = ({ variant, steps, kinds }) => {
  const [revealed, setRevealed] = useState(0)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setRevealed(0) }, [variant, steps])

  const next = useCallback(() => setRevealed((r) => Math.min(r + 1, steps.length)), [steps.length])
  const hasMore = revealed < steps.length
  const states = useStepStates(steps, kinds, revealed)

  return (
    <div className="h-[30rem] overflow-hidden rounded-lg border shadow-sm" style={{ borderColor: variant === 'quick-desktop' ? QUICK.border : CO.border }}>
      {/* Window chrome */}
      <div className="flex h-8 items-center gap-2 border-b px-3" style={{ backgroundColor: variant === 'quick-desktop' ? QUICK.rail : CO.rail, borderColor: variant === 'quick-desktop' ? QUICK.border : CO.border }}>
        <TrafficLights />
        <span className="ml-1 text-[11px] font-medium" style={{ color: variant === 'quick-desktop' ? QUICK.muted : CO.muted }}>
          {variant === 'quick-desktop' ? 'Amazon Quick' : 'Claude'}
        </span>
      </div>
      <div className="h-[calc(30rem-2rem)]">
        {variant === 'quick-desktop'
          ? <QuickApp states={states} revealed={revealed} hasMore={hasMore} next={next} total={steps.length} />
          : <CoworkApp states={states} revealed={revealed} hasMore={hasMore} next={next} />}
      </div>
    </div>
  )
}
