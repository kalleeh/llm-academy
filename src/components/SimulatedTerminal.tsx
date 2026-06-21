import { useState, useEffect, useCallback, useRef } from 'react'

export interface TerminalStep {
  command: string
  output: string
  delay?: number
}

interface SimulatedTerminalProps {
  steps: TerminalStep[]
  title?: string
  /** Called after each step finishes animating, with the step index */
  onStepExecuted?: (stepIndex: number) => void
}

interface ExecutedStep {
  command: string
  output: string
  displayedOutput: string
  done: boolean
}

// Real-terminal palette (macOS Terminal / iTrm2 dark): a true #1e1e1e window,
// a zsh-style "➜  cwd" prompt in green/cyan, and bright-white commands. The
// prompt + cwd give it the look of an actual shell rather than a generic box.
const BG = '#1e1e1e'
const BAR = '#323233'
const PROMPT_GREEN = '#5af78e'
const PROMPT_CWD = '#57c7ff'
const CMD = '#f1f1f0'
const OUT = '#c7c7c7'
const CURSOR = '#f1f1f0'

export const SimulatedTerminal: React.FC<SimulatedTerminalProps> = ({ steps, title, onStepExecuted }) => {
  const [executed, setExecuted] = useState<ExecutedStep[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll within the terminal container only — not the page
  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [executed])

  const animateOutput = useCallback((output: string, delay: number, stepIdx: number) => {
    setIsAnimating(true)
    const chars = output.length
    const charDelay = Math.max(5, Math.min(30, delay / chars))
    let i = 0

    const interval = setInterval(() => {
      i++
      setExecuted(prev => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        if (last) {
          updated[updated.length - 1] = { ...last, displayedOutput: output.slice(0, i) }
        }
        return updated
      })
      if (i >= chars) {
        clearInterval(interval)
        setExecuted(prev => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          if (last) {
            updated[updated.length - 1] = { ...last, done: true }
          }
          return updated
        })
        setIsAnimating(false)
        onStepExecuted?.(stepIdx)
      }
    }, charDelay)
  }, [onStepExecuted])

  const runStep = useCallback((index: number) => {
    if (index >= steps.length || isAnimating) return
    const step = steps[index]
    setExecuted(prev => [...prev, {
      command: step.command,
      output: step.output,
      displayedOutput: '',
      done: false,
    }])
    setCurrentIndex(index + 1)
    animateOutput(step.output, step.delay ?? 600, index)
  }, [steps, isAnimating, animateOutput])

  const hasMore = currentIndex < steps.length
  const cwd = title ?? '~/project'

  // The zsh-style prompt line: "➜  cwd " — a plain JSX fragment, reused inline.
  const prompt = (
    <>
      <span style={{ color: PROMPT_GREEN }}>➜</span>
      <span className="ml-2" style={{ color: PROMPT_CWD }}>{cwd}</span>
    </>
  )

  return (
    <div className="flex h-80 flex-col overflow-hidden rounded-lg border border-zinc-700 shadow-sm">
      {/* Terminal-emulator title bar — always present, like a real window */}
      <div className="relative flex shrink-0 items-center px-3 py-2" style={{ backgroundColor: BAR }}>
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="absolute inset-x-0 text-center font-mono text-xs" style={{ color: '#b0b0b0' }}>
          {cwd} — -zsh
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
        style={{ backgroundColor: BG }}
      >
        {executed.map((entry, i) => (
          <div key={i} className="mb-2">
            <div className="flex flex-wrap items-baseline gap-x-2">
              {prompt}
              <span style={{ color: CMD }}>{entry.command}</span>
            </div>
            {entry.displayedOutput && (
              <pre className="mt-1 whitespace-pre-wrap" style={{ color: OUT }}>
                {entry.displayedOutput}
                {!entry.done && <span className="animate-pulse" style={{ color: CURSOR }}>▌</span>}
              </pre>
            )}
          </div>
        ))}

        {!isAnimating && hasMore && (
          <div className="flex items-center gap-2">
            {prompt}
            <span className="animate-pulse" style={{ color: CURSOR }}>▌</span>
          </div>
        )}

        {!hasMore && executed.length === 0 && (
          <div className="flex items-center gap-2">
            {prompt}
            <span className="animate-pulse" style={{ color: CURSOR }}>▌</span>
          </div>
        )}
      </div>

      {/* Always-visible bottom bar — prevents layout shift */}
      <div className="flex shrink-0 items-center gap-2 px-4 py-2" style={{ backgroundColor: BAR }}>
        {hasMore ? (
          <>
            <button
              onClick={() => runStep(currentIndex)}
              disabled={isAnimating}
              className="rounded px-3 py-1 text-xs font-medium text-zinc-100 transition-colors hover:bg-zinc-600 disabled:opacity-50"
              style={{ backgroundColor: '#4a4a4c' }}
            >
              {currentIndex === 0 ? 'Run' : 'Next'}: <code style={{ color: '#5af78e' }}>{steps[currentIndex].command.length > 56 ? steps[currentIndex].command.slice(0, 53) + '…' : steps[currentIndex].command}</code>
            </button>
            <span className="text-xs" style={{ color: '#9a9a9a' }}>
              Step {currentIndex + 1} of {steps.length}
            </span>
          </>
        ) : (
          <span className="text-xs" style={{ color: '#9a9a9a' }}>
            {executed.length > 0 ? '✓ All commands executed' : `${steps.length} commands ready`}
          </span>
        )}
      </div>
    </div>
  )
}
