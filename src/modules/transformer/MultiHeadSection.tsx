import { useState, useCallback } from 'react'
import { HEADS } from './attentionData'
import { AttentionHeatmap } from './AttentionHeatmap'
import { useT } from '../../i18n'
import { multiHeadSectionSv, multiHeadSectionKo } from './tech-translations'

const EN_P7 = `After all heads compute their patterns, the results are`
const EN_P6 = `One attention pattern isn't enough. The model runs`
const EN_P5 = `After all heads compute their patterns, the results are`
const EN_P4 = `One attention pattern isn't enough. The model runs`
export const MultiHeadSection: React.FC = () => {
  const c = useT({ title: '3 · Multi-Head Attention'  , p4: EN_P4 , p5: EN_P5 , p6: EN_P6 , p7: EN_P7 }, { sv: multiHeadSectionSv, ko: multiHeadSectionKo })
  const [activeHead, setActiveHead] = useState(0)

  const selectHead = useCallback((i: number) => {
    setActiveHead(i)
  }, [])

  return (
    <section aria-labelledby="multihead-heading">
      <h2 id="multihead-heading" className="mb-2 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">{c.p6}<strong>multiple attention heads in
        parallel</strong>, each learning to focus on different relationships. Toggle between heads
        to see how each one captures a different linguistic pattern.
      </p>

      {/* Head selector tabs */}
      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Attention heads">
        {HEADS.map((head, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={activeHead === i}
            onClick={() => selectHead(i)}
            className={`rounded-lg border px-3 py-2 text-xs transition-all ${
              activeHead === i
                ? 'border-amber-600 bg-amber-950 text-amber-700 dark:text-amber-300'
                : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500'
            }`}
          >
            <span className="font-semibold">Head {i + 1}</span>
            <span className="ml-1 text-zinc-500">— {head.label}</span>
          </button>
        ))}
      </div>

      {/* Active head display */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4" role="tabpanel">
        <div className="mb-3 flex items-baseline gap-2">
          <span className="font-mono text-sm font-bold text-amber-700 dark:text-amber-300">
            Head {activeHead + 1}: {HEADS[activeHead].label}
          </span>
          <span className="text-xs text-zinc-500">{HEADS[activeHead].description}</span>
        </div>
        <AttentionHeatmap weights={HEADS[activeHead].weights} />
      </div>

      {/* Compact side-by-side overview */}
      <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {HEADS.map((head, i) => (
          <button
            key={i}
            onClick={() => selectHead(i)}
            className={`rounded-lg border p-2 text-left transition-all ${
              activeHead === i ? 'border-amber-600 ring-1 ring-amber-600' : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500'
            }`}
          >
            <div className="mb-1 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">
              Head {i + 1}: {head.label}
            </div>
            <AttentionHeatmap weights={head.weights} compact />
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-zinc-500">{c.p7}<strong className="text-zinc-700 dark:text-zinc-300">
        concatenated and projected</strong> back to the model dimension. This lets the model
        simultaneously track grammar, proximity, meaning, and references — far richer than any
        single attention pattern could capture.
      </p>
    </section>
  )
}
