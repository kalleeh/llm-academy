import { useState, useCallback } from 'react'
import { useTranslation } from '../../i18n'

interface PipelineMeta {
  color: string
  bgColor: string
}

// Non-translatable per-stage metadata. Order matches `pipeline` array in
// `useTranslation().modules.alignment.postTrainingPipelineSection.pipeline`.
const PIPELINE_META: PipelineMeta[] = [
  { color: 'text-zinc-600 dark:text-zinc-400', bgColor: 'bg-zinc-700' },
  { color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
  { color: 'text-cyan-400', bgColor: 'bg-cyan-500/20' },
  { color: 'text-green-400', bgColor: 'bg-green-500/20' },
  { color: 'text-amber-400', bgColor: 'bg-amber-500/20' },
  { color: 'text-emerald-400', bgColor: 'bg-emerald-500/20' },
]

// Non-translatable per-trend color metadata. Order matches `trends` array.
const TREND_META = [
  { color: 'text-blue-400' },
  { color: 'text-green-400' },
  { color: 'text-amber-400' },
  { color: 'text-purple-400' },
]

export const PostTrainingPipelineSection: React.FC = () => {
  const c = useTranslation().modules.alignment.postTrainingPipelineSection
  const [activeStage, setActiveStage] = useState<number | null>(null)

  const selectStage = useCallback((i: number) => {
    setActiveStage(p => (p === i ? null : i))
  }, [])

  return (
    <section aria-labelledby="post-training-pipeline">
      <h2 id="post-training-pipeline" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Pipeline visualization */}
      <div className="mb-6 flex flex-wrap items-center gap-2" role="list" aria-label="Post-training pipeline">
        {c.pipeline.map((stage, i) => {
          const meta = PIPELINE_META[i]
          return (
            <div key={stage.label} className="flex items-center gap-2" role="listitem">
              <button
                onClick={() => selectStage(i)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  activeStage === i
                    ? `border-zinc-500 ${meta.bgColor} ${meta.color}`
                    : `border-zinc-200 dark:border-zinc-700 ${meta.color} hover:border-zinc-600`
                }`}
              >
                {stage.label}
              </button>
              {i < c.pipeline.length - 1 && (
                <span className="text-zinc-600" aria-hidden="true">→</span>
              )}
            </div>
          )
        })}
      </div>

      {activeStage !== null && (
        <div className="mb-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 p-4">
          <h3 className={`mb-1 text-sm font-semibold ${PIPELINE_META[activeStage].color}`}>
            {c.pipeline[activeStage].label}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {c.pipeline[activeStage].description}
          </p>
        </div>
      )}

      {/* Trends */}
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-700 dark:text-zinc-300">Key Trends</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {c.trends.map((trend, i) => (
          <div key={trend.label} className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
            <h4 className={`mb-1 text-sm font-medium ${TREND_META[i].color}`}>{trend.label}</h4>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{trend.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
