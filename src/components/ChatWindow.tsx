import { useState, useCallback, useEffect, useRef } from 'react'
import { Icon } from './Icon'

export type ChatVariant = 'chatgpt' | 'claude'
export type ChatRole = 'user' | 'assistant'
export interface ChatStep { label: string; content: string; note?: string }

interface ChatWindowProps {
  variant: ChatVariant
  steps: ChatStep[]
  /** Parallel to steps: who "sends" each step. */
  roles: ChatRole[]
}

// Product-faithful themes. The load-bearing fidelity detail in BOTH products is
// the asymmetry: the user message is a right-aligned rounded bubble/card, the
// assistant message is bubble-less full-width prose with no avatar.
// ChatGPT — white app, #f4f4f4 user bubble, black-circle send, "Ask anything".
// Claude.ai — warm cream #FAF9F5 centered column, #F0EEE6 sand user card, clay
// #D97757 send + composer model selector, assistant prose in serif.
interface ChatTheme {
  name: string
  bg: string
  /** Sidebar / rail bg. */
  rail: string
  /** Header + composer surface. */
  surface: string
  text: string
  muted: string
  border: string
  /** User-message bubble fill. */
  userBubble: string
  /** Accent (Claude clay; ChatGPT keeps mono black send). */
  accent: string
  /** Composer placeholder. */
  placeholder: string
  /** Header model label. */
  headerLabel: string
  /** Assistant prose font family. */
  assistantFont: string
  serifAssistant: boolean
}

const SANS = "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
const SERIF = "Georgia, 'Times New Roman', serif"

const THEME: Record<ChatVariant, ChatTheme> = {
  chatgpt: {
    name: 'ChatGPT',
    bg: '#ffffff',
    rail: '#f9f9f9',
    surface: '#ffffff',
    text: '#0d0d0d',
    muted: '#8f8f8f',
    border: '#e5e5e5',
    userBubble: '#f4f4f4',
    accent: '#000000',
    placeholder: 'Ask anything',
    headerLabel: 'ChatGPT',
    assistantFont: SANS,
    serifAssistant: false,
  },
  claude: {
    name: 'Claude',
    bg: '#faf9f5',
    rail: '#f5f4ed',
    surface: '#ffffff',
    text: '#141413',
    muted: '#73726c',
    border: '#e8e6dc',
    userBubble: '#f0eee6',
    accent: '#d97757',
    placeholder: 'Reply to Claude…',
    headerLabel: 'Claude Opus 4.8',
    assistantFont: SERIF,
    serifAssistant: true,
  },
}

// The OpenAI "blossom" knot, simplified, monochrome. Sidebar/empty-state only.
const ChatGPTMark: React.FC<{ size?: number; color: string }> = ({ size = 16, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill={color}>
    <path d="M12 2.5a4 4 0 013.7 2.5 4 4 0 012.8 6.8 4 4 0 01-2.8 6.8A4 4 0 0112 21.5a4 4 0 01-3.7-2.9 4 4 0 01-2.8-6.8 4 4 0 012.8-6.8A4 4 0 0112 2.5zm0 3.1a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" />
  </svg>
)
// Claude's hand-drawn clay spark.
const ClaudeSpark: React.FC<{ size?: number; color: string }> = ({ size = 16, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path
      d="M12 1.5c.4 3.3 1.1 5.3 2.3 6.4 1.1 1.1 3.1 1.8 6.2 2.1-3.1.3-5.1 1-6.2 2.1-1.2 1.1-1.9 3.1-2.3 6.4-.4-3.3-1.1-5.3-2.3-6.4-1.1-1.1-3.1-1.8-6.2-2.1 3.1-.3 5.1-1 6.2-2.1 1.2-1.1 1.9-3.1 2.3-6.4z"
      fill={color}
    />
  </svg>
)

const Mark: React.FC<{ variant: ChatVariant; size?: number; color: string }> = ({ variant, size, color }) =>
  variant === 'chatgpt' ? <ChatGPTMark size={size} color={color} /> : <ClaudeSpark size={size} color={color} />

export const ChatWindow: React.FC<ChatWindowProps> = ({ variant, steps, roles }) => {
  const [revealed, setRevealed] = useState(0)
  const t = THEME[variant]
  const bodyRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setRevealed(0) }, [variant, steps])
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight }, [revealed])

  const next = useCallback(() => setRevealed((r) => Math.min(r + 1, steps.length)), [steps.length])
  const hasMore = revealed < steps.length

  return (
    <div className="flex h-[26rem] overflow-hidden rounded-lg border shadow-sm" style={{ borderColor: t.border, backgroundColor: t.bg }}>
      {/* Left sidebar */}
      <div className="hidden w-44 shrink-0 flex-col px-2 py-3 sm:flex" style={{ backgroundColor: t.rail }}>
        <div className="mb-3 flex items-center gap-1.5 px-2">
          <Mark variant={variant} size={15} color={t.text} />
          <span className="text-xs font-semibold" style={{ color: t.text }}>{t.name}</span>
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium" style={{ color: t.text }}>
          <Icon name="edit" size={13} /> New chat
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs" style={{ color: t.muted }}>
          <Icon name="search" size={13} /> Search
        </div>
        {variant === 'claude' && (
          <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs" style={{ color: t.muted }}>
            <Icon name="folder" size={13} /> Projects
          </div>
        )}
        <div className="mt-3 px-2 text-[10px] font-semibold uppercase tracking-wide" style={{ color: t.muted }}>Recents</div>
        <div className="truncate rounded-md px-2 py-1 text-xs" style={{ color: t.muted }}>This conversation</div>
        <div className="mt-auto flex items-center gap-1.5 px-2 text-xs" style={{ color: t.muted }}>
          <span className="grid size-4 place-items-center rounded-full text-[9px] text-white" style={{ backgroundColor: variant === 'claude' ? t.accent : '#000' }}>K</span> You
        </div>
      </div>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <div className="flex h-9 shrink-0 items-center gap-1.5 border-b px-3" style={{ borderColor: t.border }}>
          <span className="text-xs font-semibold" style={{ color: t.text }}>{t.headerLabel}</span>
          <span className="text-[10px]" style={{ color: t.muted }}>▾</span>
          <span className="ml-auto text-[11px]" style={{ color: t.muted }}>Share</span>
        </div>

        {/* Thread — centered reading column */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-4">
          <div className="mx-auto max-w-2xl space-y-4">
            {steps.slice(0, revealed).map((s, i) => {
              const isUser = roles[i] === 'user'
              if (isUser) {
                return (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[80%] px-4 py-2.5 text-sm leading-relaxed" style={{ backgroundColor: t.userBubble, color: t.text, borderRadius: variant === 'chatgpt' ? 24 : 16 }}>
                      {s.content}
                    </div>
                  </div>
                )
              }
              // Assistant: bubble-less full-width prose, no avatar.
              return (
                <div key={i} className="space-y-1.5">
                  <p className="text-[15px] leading-relaxed" style={{ color: t.text, fontFamily: t.assistantFont }}>{s.content}</p>
                  {s.note && <p className="text-xs italic" style={{ color: t.muted, fontFamily: SANS }}><Icon name="lightbulb" size={12} className="mr-1 inline" />{s.note}</p>}
                </div>
              )
            })}
            {revealed === 0 && (
              <div className="flex h-72 flex-col items-center justify-center text-center">
                <Mark variant={variant} size={26} color={t.accent === '#000000' ? t.text : t.accent} />
                <p className="mt-3 text-sm" style={{ color: t.muted, fontFamily: t.serifAssistant ? SERIF : SANS }}>
                  {variant === 'claude' ? 'How can I help you today?' : 'Ready when you are.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Composer */}
        <div className="shrink-0 px-4 pb-3 pt-1">
          <div className="mx-auto flex max-w-2xl items-center gap-2 border px-3 py-2" style={{ borderColor: t.border, backgroundColor: t.surface, borderRadius: 24 }}>
            <Icon name="box" size={15} className="shrink-0" style={{ color: t.muted }} />
            <span className="flex-1 truncate text-sm" style={{ color: t.muted }}>{t.placeholder}</span>
            {variant === 'claude' && <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px]" style={{ color: t.muted }}>Opus 4.8 ▾</span>}
            {hasMore ? (
              <button
                onClick={next}
                className="grid size-7 shrink-0 place-items-center text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: t.accent, borderRadius: variant === 'chatgpt' ? 9999 : 8 }}
                aria-label={revealed === 0 ? 'Run' : 'Next'}
              >
                <Icon name="arrow-right" size={14} className="-rotate-90" />
              </button>
            ) : (
              <span className="shrink-0 px-1 text-xs font-medium" style={{ color: variant === 'claude' ? t.accent : t.text }}>✓</span>
            )}
          </div>
          <p className="mt-1.5 text-center text-[10px]" style={{ color: t.muted }}>
            {hasMore ? `${revealed === 0 ? 'Press send to start' : `Step ${revealed} of ${steps.length}`}` : 'Conversation complete'}
          </p>
        </div>
      </div>
    </div>
  )
}
