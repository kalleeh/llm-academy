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

const VARIANT_META: Record<CliVariant, { label: string; labelColor: string; glyph: string }> = {
  'claude-code': { label: '✻ Claude Code', labelColor: 'text-amber-400', glyph: '>' },
  kiro: { label: '◆ Kiro', labelColor: 'text-violet-400', glyph: '▶' },
}

// Per-line-kind prefix glyph + text color. `user` uses the variant glyph.
function lineClass(kind: LineKind): string {
  switch (kind) {
    case 'assistant': return 'text-zinc-300'
    case 'tool': return 'text-emerald-400'
    case 'result': return 'text-zinc-500'
    case 'ok': return 'text-emerald-400'
    case 'diff-add': return 'text-green-400'
    case 'diff-del': return 'text-red-400'
    default: return 'text-zinc-100'
  }
}

interface RenderedLine extends TranscriptLine { displayed: string; done: boolean }

export const AgentTranscript: React.FC<AgentTranscriptProps> = ({ variant, turns, onTurnExecuted }) => {
  const [rendered, setRendered] = useState<RenderedLine[]>([])
  const [turnIndex, setTurnIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const meta = VARIANT_META[variant]

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

  return (
    <div className="flex h-80 flex-col overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
      <div className="flex shrink-0 items-center gap-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
        <span className="size-3 rounded-full bg-red-500" />
        <span className="size-3 rounded-full bg-yellow-500" />
        <span className="size-3 rounded-full bg-green-500" />
        <span className={`ml-2 font-mono text-xs font-semibold ${meta.labelColor}`}>{meta.label}</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-zinc-900 p-4 font-mono text-sm">
        {rendered.map((line, i) => (
          <pre key={i} className={`whitespace-pre-wrap leading-relaxed ${lineClass(line.kind)}`}>
            {line.kind === 'user' && <span className="text-zinc-500">{meta.glyph} </span>}
            {line.kind === 'tool' && <span>{variant === 'kiro' ? '▶ ' : '⏺ '}</span>}
            {line.kind === 'result' && <span className="text-zinc-600">{'  ⎿ '}</span>}
            {line.kind === 'ok' && <span>{'✓ '}</span>}
            {line.displayed}
            {!line.done && <span className="animate-pulse text-amber-400">▌</span>}
          </pre>
        ))}
        {rendered.length === 0 && (
          <div className="flex items-center gap-1">
            <span className="text-zinc-500">{meta.glyph}</span>
            <span className="animate-pulse text-amber-400">▌</span>
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
        {hasMore ? (
          <>
            <button
              onClick={() => runTurn(turnIndex)}
              disabled={isAnimating}
              className="rounded bg-zinc-200 dark:bg-zinc-600 px-3 py-1 text-xs text-zinc-900 dark:text-zinc-100 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-500 disabled:opacity-50"
            >
              {turnIndex === 0 ? 'Run' : 'Next'}
            </button>
            <span className="text-xs text-zinc-500">Turn {turnIndex + 1} of {turns.length}</span>
          </>
        ) : (
          <span className="text-xs text-zinc-500">{rendered.length > 0 ? '✓ Session complete' : `${turns.length} turns ready`}</span>
        )}
      </div>
    </div>
  )
}
