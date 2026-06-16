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

const STAGES: { kind: WorkEventKind; label: string }[] = [
  { kind: 'brief', label: 'Brief' }, { kind: 'plan', label: 'Plan' },
  { kind: 'working', label: 'Work' }, { kind: 'review', label: 'Review' }, { kind: 'done', label: 'Done' },
]

// Product-faithful themes. Quick Suite: a light/white agentic workspace with an
// indigo-purple primary (#6344F6) and the hexagon logo motif — deliberately NOT
// Amazon orange/navy. Claude Cowork: lives in the Claude Desktop app on warm cream
// (#FAF9F5 / #F0EEE6) with the clay accent (#D97757) and a Chat·Cowork·Code tab row.
interface WorkTheme {
  name: string
  /** App background. */
  bg: string
  /** Header bar background + text. */
  headerBg: string
  headerText: string
  /** Primary/accent color. */
  accent: string
  /** Soft accent fill for active chips / progress track fills. */
  accentSoft: string
  /** Body text + muted text. */
  text: string
  muted: string
  /** Card surface + border. */
  card: string
  border: string
}

const THEME: Record<WorkAppVariant, WorkTheme> = {
  'quick-desktop': {
    name: 'Amazon Quick',
    bg: '#ffffff',
    headerBg: '#222222',
    headerText: '#f5f5f5',
    accent: '#6344f6',
    accentSoft: '#ece8fd',
    text: '#1f1f24',
    muted: '#6b6b73',
    card: '#faf9ff',
    border: '#e6e3f5',
  },
  cowork: {
    name: 'Claude',
    bg: '#faf9f5',
    headerBg: '#f0eee6',
    headerText: '#3d3d3a',
    accent: '#d97757',
    accentSoft: '#f3e6df',
    text: '#141413',
    muted: '#87867f',
    card: '#ffffff',
    border: '#e8e6dc',
  },
}

// The Quick hexagon logo + the Claude clay "spark" mark, inline as small SVGs.
const QuickHex: React.FC<{ size?: number; color: string }> = ({ size = 16, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" fill={color} />
    <circle cx="12" cy="12" r="3" fill="#fff" />
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

export const WorkAppWindow: React.FC<WorkAppWindowProps> = ({ variant, steps, kinds }) => {
  const [revealed, setRevealed] = useState(0) // count of steps shown
  const t = THEME[variant]
  const isQuick = variant === 'quick-desktop'
  const bodyRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setRevealed(0) }, [variant, steps])
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight }, [revealed])

  const next = useCallback(() => setRevealed((r) => Math.min(r + 1, steps.length)), [steps.length])
  const hasMore = revealed < steps.length
  const currentStageIdx = revealed > 0 ? STAGES.findIndex((s) => s.kind === kinds[revealed - 1]) : -1

  const stageLabel = (kind: WorkEventKind) =>
    kind === 'brief' ? 'Task' : STAGES.find((st) => st.kind === kind)?.label ?? kind

  return (
    <div className="flex h-96 flex-col overflow-hidden rounded-lg border shadow-sm" style={{ borderColor: t.border, backgroundColor: t.bg }}>
      {/* Title bar — product chrome */}
      <div className="flex shrink-0 items-center gap-2 border-b px-3 py-2" style={{ backgroundColor: t.headerBg, borderColor: t.border }}>
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex items-center gap-1.5">
          {isQuick ? <QuickHex color={t.accent} /> : <ClaudeSpark color={t.accent} />}
          <span className="text-xs font-semibold" style={{ color: t.headerText }}>{t.name}</span>
        </div>
        {/* Claude Desktop's Chat · Cowork · Code tab row */}
        {!isQuick && (
          <div className="ml-3 flex items-center gap-1 text-[11px]">
            {['Chat', 'Cowork', 'Code'].map((tab) => (
              <span
                key={tab}
                className="rounded px-2 py-0.5 font-medium"
                style={tab === 'Cowork'
                  ? { backgroundColor: '#fff', color: t.text }
                  : { color: t.muted }}
              >
                {tab}
              </span>
            ))}
          </div>
        )}
        {/* Quick's right-side connection dot */}
        {isQuick && <span className="ml-auto size-2 rounded-full bg-[#28c840]" title="Connected" />}
      </div>

      {/* Stage tracker — segmented pipeline */}
      <div className="flex shrink-0 items-center gap-1.5 border-b px-3 py-2" style={{ borderColor: t.border, backgroundColor: t.bg }}>
        {STAGES.map((s, i) => {
          const active = i <= currentStageIdx
          return (
            <span
              key={s.kind}
              className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={active
                ? { backgroundColor: t.accentSoft, color: t.accent }
                : { color: t.muted, opacity: 0.6 }}
            >
              {active && i < currentStageIdx && <Icon name="check" size={9} />}
              {s.label}
            </span>
          )
        })}
      </div>

      {/* Activity body — the agent's conversation / run log */}
      <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-3" style={{ backgroundColor: t.bg }}>
        <div className="space-y-2.5">
          {steps.slice(0, revealed).map((s, i) => {
            const kind = kinds[i]
            const isBrief = kind === 'brief'
            return (
              <div key={i}>
                {isBrief ? (
                  /* The brief reads as the user's message — right-aligned bubble */
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm px-3.5 py-2 text-sm leading-relaxed" style={{ backgroundColor: t.accentSoft, color: t.text }}>
                      {s.content}
                    </div>
                  </div>
                ) : (
                  /* Agent activity card */
                  <div className="rounded-xl border p-3" style={{ backgroundColor: t.card, borderColor: t.border }}>
                    <div className="mb-1.5 flex items-center gap-2">
                      {isQuick ? <QuickHex size={13} color={t.accent} /> : <ClaudeSpark size={13} color={t.accent} />}
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ backgroundColor: t.accentSoft, color: t.accent }}>
                        {stageLabel(kind)}
                      </span>
                      <span className="text-xs font-medium" style={{ color: t.muted }}>{s.label}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: t.text }}>{s.content}</p>
                    {kind === 'working' && (
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: t.accentSoft }}>
                        <div className="h-full rounded-full transition-all" style={{ width: '70%', backgroundColor: t.accent }} />
                      </div>
                    )}
                    {kind === 'done' && (
                      <div className="mt-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium" style={{ backgroundColor: t.accentSoft, color: t.accent }}>
                        <Icon name="check" size={12} /> Deliverable ready
                      </div>
                    )}
                    {s.note && (
                      <p className="mt-2 text-xs italic" style={{ color: t.muted }}>
                        <Icon name="lightbulb" size={12} className="mr-1 inline" />{s.note}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
          {revealed === 0 && (
            <div className="flex h-64 items-center justify-center text-xs" style={{ color: t.muted }}>
              Press Run to start the session
            </div>
          )}
        </div>
      </div>

      {/* Composer / action bar */}
      <div className="shrink-0 border-t px-3 py-2.5" style={{ borderColor: t.border, backgroundColor: t.bg }}>
        {/* Cowork's signature "Work in a Folder" affordance */}
        {!isQuick && (
          <div className="mb-2 flex items-center gap-1.5 text-[11px]" style={{ color: t.muted }}>
            <span className="grid size-3.5 place-items-center rounded border" style={{ borderColor: t.accent, backgroundColor: t.accent }}>
              <Icon name="check" size={9} className="text-white" />
            </span>
            Work in a folder · ~/Documents
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full border px-3 py-1.5" style={{ borderColor: t.border, backgroundColor: t.card }}>
            <span className="flex-1 truncate text-xs" style={{ color: t.muted }}>
              {isQuick ? 'Ask a question…' : 'Describe the outcome you want…'}
            </span>
            <span className="grid size-5 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: t.accent }}>
              <Icon name="arrow-right" size={12} />
            </span>
          </div>
          {hasMore ? (
            <button
              onClick={next}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: t.accent }}
            >
              {revealed === 0 ? 'Run' : 'Next'}
            </button>
          ) : (
            <span className="px-2 text-xs font-medium" style={{ color: t.accent }}>✓ Done</span>
          )}
        </div>
        <p className="mt-1 text-center text-[10px]" style={{ color: t.muted }}>
          {hasMore ? `Step ${revealed + 1} of ${steps.length}` : 'Session complete'}
        </p>
      </div>
    </div>
  )
}
