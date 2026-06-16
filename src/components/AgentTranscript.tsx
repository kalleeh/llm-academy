import { useState, useEffect, useCallback, useRef } from 'react'

export type CliVariant = 'claude-code' | 'kiro'
export type LineKind = 'user' | 'assistant' | 'tool' | 'result' | 'ok' | 'diff-add' | 'diff-del'
export interface TranscriptLine { kind: LineKind; text: string }
export interface TranscriptTurn { lines: TranscriptLine[]; delay?: number }

interface AgentTranscriptProps {
  variant: CliVariant
  turns: TranscriptTurn[]
  /** Called with the turn index after a turn finishes animating. */
  onTurnExecuted?: (turnIndex: number) => void
}

// Per-product terminal theme. Colors are sourced from the real products:
// Claude Code — default dark truecolor theme (accent clay #D97757, tool dots
// green #4EBA65, result lines dimmed). Kiro — brand violet #9046FF on the
// purple-tinted "prey" dark background #19161D.
interface CliTheme {
  /** Terminal background. */
  bg: string
  /** Title-bar background (terminal-emulator chrome). */
  barBg: string
  /** Product label shown in the title bar + welcome banner. */
  label: string
  /** Accent (brand) color — banner mark, spinner, in-progress todos. */
  accent: string
  /** User-prompt glyph color. */
  promptColor: string
  /** Tool bullet glyph + its color. */
  toolGlyph: string
  toolColor: string
  /** Welcome-banner lines (rendered in a rounded accent-bordered box). */
  welcome: { mark: string; title: string; sub: string }
  /** Bottom status-line text. */
  status: string
}

const TEXT = '#e6e6e6'
const DIM = '#8a8a8a'
const GREEN = '#4eba65'

const THEME: Record<CliVariant, CliTheme> = {
  'claude-code': {
    bg: '#1c1b1a',
    barBg: '#2a2725',
    label: '✻ Claude Code',
    accent: '#d97757',
    promptColor: GREEN,
    toolGlyph: '⏺',
    toolColor: GREEN,
    welcome: { mark: '✻', title: 'Welcome to Claude Code', sub: '/help for help, /status for your current setup' },
    status: '✻ Opus 4.8 · claude-opus-4-8',
  },
  kiro: {
    bg: '#19161d',
    barBg: '#28242e',
    label: '◯ KIRO',
    accent: '#9046ff',
    promptColor: '#b080ff',
    toolGlyph: '●',
    toolColor: '#b080ff',
    welcome: { mark: '◯', title: 'Kiro CLI', sub: 'spec-driven agentic coding · kiro_planner ready' },
    status: '◆ Spec mode · claude-sonnet-4-6',
  },
}

interface RenderedLine extends TranscriptLine { displayed: string; done: boolean }

export const AgentTranscript: React.FC<AgentTranscriptProps> = ({ variant, turns, onTurnExecuted }) => {
  const [rendered, setRendered] = useState<RenderedLine[]>([])
  const [turnIndex, setTurnIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const t = THEME[variant]

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [rendered])

  const runTurn = useCallback((index: number) => {
    if (index >= turns.length || isAnimating) return
    const turn = turns[index]
    const instant = turn.lines.slice(0, -1).map((l) => ({ ...l, displayed: l.text, done: true }))
    const last = turn.lines[turn.lines.length - 1]
    setRendered((prev) => [...prev, ...instant, { ...last, displayed: '', done: false }])
    setIsAnimating(true)
    setTurnIndex(index + 1)

    const full = last.text
    const delay = turn.delay ?? 700
    const charDelay = Math.max(5, Math.min(28, delay / Math.max(full.length, 1)))
    let i = 0
    const id = setInterval(() => {
      i++
      setRendered((prev) => {
        const up = [...prev]
        const tail = up[up.length - 1]
        if (tail) up[up.length - 1] = { ...tail, displayed: full.slice(0, i) }
        return up
      })
      if (i >= full.length) {
        clearInterval(id)
        setRendered((prev) => {
          const up = [...prev]
          const tail = up[up.length - 1]
          if (tail) up[up.length - 1] = { ...tail, done: true }
          return up
        })
        setIsAnimating(false)
        onTurnExecuted?.(index)
      }
    }, charDelay)
  }, [turns, isAnimating, onTurnExecuted])

  const hasMore = turnIndex < turns.length

  // Render a single transcript line with product-faithful gutters + colors.
  const renderLine = (line: RenderedLine, i: number) => {
    const { kind, displayed, done } = line
    const cursor = !done && <span className="animate-pulse" style={{ color: t.accent }}>▌</span>

    if (kind === 'user') {
      return (
        <pre key={i} className="whitespace-pre-wrap leading-relaxed" style={{ color: TEXT }}>
          <span style={{ color: t.promptColor }}>{'> '}</span>{displayed}{cursor}
        </pre>
      )
    }
    if (kind === 'tool') {
      return (
        <pre key={i} className="whitespace-pre-wrap font-semibold leading-relaxed" style={{ color: TEXT }}>
          <span style={{ color: t.toolColor }}>{t.toolGlyph} </span>{displayed}{cursor}
        </pre>
      )
    }
    if (kind === 'result') {
      return (
        <pre key={i} className="whitespace-pre-wrap leading-relaxed" style={{ color: DIM }}>
          {'  ⎿  '}{displayed}{cursor}
        </pre>
      )
    }
    if (kind === 'ok') {
      return (
        <pre key={i} className="whitespace-pre-wrap leading-relaxed" style={{ color: variant === 'kiro' ? t.accent : GREEN }}>
          {'✓ '}{displayed}{cursor}
        </pre>
      )
    }
    if (kind === 'diff-add') {
      return (
        <pre key={i} className="whitespace-pre-wrap leading-relaxed" style={{ color: '#a8f0b8', backgroundColor: 'rgba(34,92,43,0.55)' }}>
          {displayed}{cursor}
        </pre>
      )
    }
    if (kind === 'diff-del') {
      return (
        <pre key={i} className="whitespace-pre-wrap leading-relaxed" style={{ color: '#ffb3bf', backgroundColor: 'rgba(122,41,54,0.55)' }}>
          {displayed}{cursor}
        </pre>
      )
    }
    // assistant
    return (
      <pre key={i} className="whitespace-pre-wrap leading-relaxed" style={{ color: TEXT }}>
        {displayed}{cursor}
      </pre>
    )
  }

  return (
    <div className="flex h-80 flex-col overflow-hidden rounded-lg border border-zinc-700 shadow-sm">
      {/* Terminal-emulator title bar */}
      <div className="flex shrink-0 items-center gap-2 px-4 py-2" style={{ backgroundColor: t.barBg }}>
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs font-semibold" style={{ color: t.accent }}>{t.label}</span>
      </div>
      {/* Transcript body */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm" style={{ backgroundColor: t.bg }}>
        {/* Welcome banner — rounded accent-bordered box, like the real CLIs on launch */}
        <div className="mb-3 inline-block rounded-md border px-3 py-1.5" style={{ borderColor: t.accent }}>
          <div style={{ color: TEXT }}>
            <span style={{ color: t.accent }}>{t.welcome.mark} </span>
            <span className="font-semibold">{t.welcome.title}</span>
          </div>
          <div className="mt-0.5 text-xs" style={{ color: DIM }}>{t.welcome.sub}</div>
        </div>
        {rendered.map((line, i) => renderLine(line, i))}
        {rendered.length === 0 && (
          <div className="flex items-center gap-1">
            <span style={{ color: t.promptColor }}>{'>'}</span>
            <span className="animate-pulse" style={{ color: t.accent }}>▌</span>
          </div>
        )}
      </div>
      {/* Bottom status line */}
      <div className="flex shrink-0 items-center gap-2 border-t px-4 py-2" style={{ backgroundColor: t.barBg, borderColor: 'rgba(255,255,255,0.08)' }}>
        {hasMore ? (
          <>
            <button
              onClick={() => runTurn(turnIndex)}
              disabled={isAnimating}
              className="rounded px-3 py-1 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: t.accent }}
            >
              {turnIndex === 0 ? 'Run' : 'Next'}
            </button>
            <span className="text-xs" style={{ color: DIM }}>Turn {turnIndex + 1} of {turns.length}</span>
          </>
        ) : (
          <span className="text-xs" style={{ color: rendered.length > 0 ? GREEN : DIM }}>
            {rendered.length > 0 ? '✓ Session complete' : `${turns.length} turns ready`}
          </span>
        )}
        <span className="ml-auto truncate font-mono text-[11px]" style={{ color: DIM }}>{t.status}</span>
      </div>
    </div>
  )
}
