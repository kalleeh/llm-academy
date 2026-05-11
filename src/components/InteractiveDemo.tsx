import { type ReactNode, useState, useCallback, useRef, useEffect } from 'react'

interface InteractiveDemoProps {
  title: string
  description?: string
  steps: ReactNode[]
  currentStep?: number
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  title,
  description,
  steps,
  currentStep: controlledStep,
}) => {
  const [internalStep, setInternalStep] = useState(0)
  const step = controlledStep ?? internalStep
  const total = steps.length
  const contentRef = useRef<HTMLDivElement>(null)
  const [minHeight, setMinHeight] = useState(0)

  // Track the tallest content seen to prevent shrinking
  useEffect(() => {
    const el = contentRef.current
    if (el) {
      const h = el.scrollHeight
      setMinHeight(prev => Math.max(prev, h))
    }
  }, [step])

  const goNext = useCallback(() => {
    setInternalStep(prev => Math.min(prev + 1, total - 1))
  }, [total])

  const goPrev = useCallback(() => {
    setInternalStep(prev => Math.max(prev - 1, 0))
  }, [])

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900" aria-label={title}>
      <div className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
          {total > 1 && (
            <span className="rounded-full bg-zinc-200 dark:bg-zinc-700 px-2.5 py-0.5 text-xs text-zinc-700 dark:text-zinc-300">
              Step {step + 1} of {total}
            </span>
          )}
        </div>
        {description && <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>}
      </div>

      <div
        ref={contentRef}
        className="p-6 transition-[min-height] duration-200"
        style={{ minHeight: minHeight > 0 ? minHeight : undefined }}
      >
        {steps[step]}
      </div>

      {total > 1 && controlledStep === undefined && (
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-6 py-3">
          <button
            onClick={goPrev}
            disabled={step === 0}
            className="rounded bg-zinc-200 dark:bg-zinc-700 px-4 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-600 disabled:opacity-40"
          >
            ← Previous
          </button>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`size-1.5 rounded-full ${i === step ? 'bg-zinc-700 dark:bg-zinc-300' : 'bg-zinc-300 dark:bg-zinc-600'}`}
              />
            ))}
          </div>
          <button
            onClick={goNext}
            disabled={step === total - 1}
            className="rounded bg-zinc-200 dark:bg-zinc-700 px-4 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-600 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </section>
  )
}
