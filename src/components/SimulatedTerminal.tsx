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

  return (
    <div className="flex h-80 flex-col overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
      {title && (
        <div className="flex shrink-0 items-center gap-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
          <span className="size-3 rounded-full bg-red-500" />
          <span className="size-3 rounded-full bg-yellow-500" />
          <span className="size-3 rounded-full bg-green-500" />
          <span className="ml-2 font-mono text-xs text-zinc-600 dark:text-zinc-400">{title}</span>
        </div>
      )}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-zinc-900 p-4 font-mono text-sm"
      >
        {executed.map((entry, i) => (
          <div key={i} className="mb-2">
            <div className="flex items-center gap-1">
              <span className="text-green-400">$</span>
              <span className="text-zinc-100">{entry.command}</span>
            </div>
            {entry.displayedOutput && (
              <pre className="mt-1 whitespace-pre-wrap text-zinc-300">
                {entry.displayedOutput}
                {!entry.done && <span className="animate-pulse text-amber-400">▌</span>}
              </pre>
            )}
          </div>
        ))}

        {!isAnimating && hasMore && (
          <div className="flex items-center gap-1">
            <span className="text-green-400">$</span>
            <span className="animate-pulse text-amber-400">▌</span>
          </div>
        )}

        {!hasMore && executed.length === 0 && (
          <div className="flex items-center gap-1">
            <span className="text-green-400">$</span>
            <span className="animate-pulse text-amber-400">▌</span>
          </div>
        )}
      </div>

      {/* Always-visible bottom bar — prevents layout shift */}
      <div className="flex shrink-0 items-center gap-2 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
        {hasMore ? (
          <>
            <button
              onClick={() => runStep(currentIndex)}
              disabled={isAnimating}
              className="rounded bg-zinc-200 dark:bg-zinc-600 px-3 py-1 text-xs text-zinc-900 dark:text-zinc-100 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-500 disabled:opacity-50"
            >
              {currentIndex === 0 ? 'Run' : 'Next'}: <code className="text-amber-700 dark:text-amber-300">{steps[currentIndex].command.length > 60 ? steps[currentIndex].command.slice(0, 57) + '...' : steps[currentIndex].command}</code>
            </button>
            <span className="text-xs text-zinc-500">
              Step {currentIndex + 1} of {steps.length}
            </span>
          </>
        ) : (
          <span className="text-xs text-zinc-500">
            {executed.length > 0 ? '✓ All commands executed' : `${steps.length} commands ready`}
          </span>
        )}
      </div>
    </div>
  )
}
