import { useState, useMemo, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import { useTranslation, type Translation } from '../../i18n'

type LabelKey = keyof Translation['labels']

const BUDGET_STEPS: { label: string; flops: number; params: string; tokens: string; note: LabelKey }[] = [
  { label: '1e18', flops: 1e18, params: '40M', tokens: '800M', note: 'noteSmallResearch' },
  { label: '1e19', flops: 1e19, params: '130M', tokens: '2.6B', note: 'noteGpt2Small' },
  { label: '1e20', flops: 1e20, params: '400M', tokens: '8B', note: 'noteMidResearch' },
  { label: '1e21', flops: 1e21, params: '1.3B', tokens: '26B', note: 'noteGpt2Xl' },
  { label: '1e22', flops: 1e22, params: '4B', tokens: '80B', note: 'noteChinchilla4b' },
  { label: '1e23', flops: 1e23, params: '13B', tokens: '260B', note: 'noteLlama13b' },
  { label: '1e24', flops: 1e24, params: '40B', tokens: '800B', note: 'noteChinchilla70b' },
  { label: '1e25', flops: 1e25, params: '130B', tokens: '2.6T', note: 'noteFrontier' },
]

export const ScalingLawsSection: React.FC = () => {
  const t = useTranslation()
  const c = t.modules.architecture.scalingLawsSection
  const [budgetIdx, setBudgetIdx] = useState(4)

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBudgetIdx(Number(e.target.value))
  }, [])

  const step = BUDGET_STEPS[budgetIdx]

  const barWidth = useMemo(() => ((budgetIdx + 1) / BUDGET_STEPS.length) * 100, [budgetIdx])

  return (
    <section aria-labelledby="scaling-laws">
      <h2 id="scaling-laws" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        The <strong className="text-zinc-900 dark:text-zinc-100">Chinchilla scaling law</strong> (Hoffmann et al., 2022)
        showed that for a given compute budget, there&apos;s an optimal balance between model size
        and training data. The rule of thumb: train on{' '}
        <strong className="text-zinc-900 dark:text-zinc-100">~20 tokens per parameter</strong>.
      </p>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Interactive slider */}
      <div className="mb-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">
        <p className="mb-4 font-mono text-xs text-zinc-500 uppercase">Compute Budget Explorer</p>

        <label htmlFor="budget-slider" className="mb-2 block text-sm text-zinc-500 dark:text-zinc-400">
          Compute budget: <span className="font-mono text-zinc-900 dark:text-zinc-100">{step.label} FLOPs</span>
        </label>
        <input
          id="budget-slider"
          type="range"
          min={0}
          max={BUDGET_STEPS.length - 1}
          value={budgetIdx}
          onChange={handleSlider}
          className="mb-4 w-full accent-zinc-400"
          aria-valuetext={`${step.label} FLOPs`}
        />

        {/* Visual bar */}
        <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-zinc-600 to-zinc-400 transition-all duration-300"
            style={{ width: `${barWidth}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-4 text-center">
            <p className="text-xs text-zinc-500 uppercase">Optimal Model Size</p>
            <p className="mt-1 font-mono text-lg font-bold text-zinc-900 dark:text-zinc-100">{step.params}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-4 text-center">
            <p className="text-xs text-zinc-500 uppercase">Optimal Tokens</p>
            <p className="mt-1 font-mono text-lg font-bold text-zinc-900 dark:text-zinc-100">{step.tokens}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-4 text-center">
            <p className="text-xs text-zinc-500 uppercase">Scale</p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{t.labels[step.note]}</p>
          </div>
        </div>
      </div>

      {/* DeepSeek challenge */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 p-4">
        <p className="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          <Icon name="microscope" />{c.p8}</p>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{c.p9}<strong className="text-zinc-700 dark:text-zinc-300">14.8T tokens</strong> —
          far beyond the Chinchilla-optimal ratio for its active parameter count. MoE architectures
          break the scaling law assumptions because the &ldquo;effective model size&rdquo; is ambiguous:
          total params store knowledge, but active params determine compute cost. DeepSeek showed you
          can overtrain the active params while the expert routing distributes knowledge across the
          full parameter space efficiently.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3">
            <p className="text-zinc-500">{c.p7}</p>
            <p className="font-mono text-zinc-700 dark:text-zinc-300">~740B tokens</p>
          </div>
          <div className="rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3">
            <p className="text-zinc-500">DeepSeek V3 actual training</p>
            <p className="font-mono text-zinc-700 dark:text-zinc-300">14.8T tokens (20× more)</p>
          </div>
        </div>
      </div>
    </section>
  )
}
