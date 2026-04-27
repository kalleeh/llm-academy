import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { postTrainingPipelineSectionSv, postTrainingPipelineSectionKo } from './tech-translations'
import { pipelineTranslations, trendsTranslations } from './data-translations'

interface PipelineStage {
  label: string
  color: string
  bgColor: string
  description: string
}

const PIPELINE: PipelineStage[] = [
  {
    label: 'Base Model',
    color: 'text-zinc-400',
    bgColor: 'bg-zinc-700',
    description: 'Pre-trained on trillions of tokens. Knows language and facts, but no behavioral alignment.',
  },
  {
    label: 'SFT',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    description: 'Supervised fine-tuning on curated (prompt, response) pairs. Teaches the assistant format and basic helpfulness. Increasingly uses synthetic data from stronger models.',
  },
  {
    label: 'DPO',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
    description: 'Direct Preference Optimization on human (or AI-generated) preference pairs. Simpler than PPO, now the default preference learning step for most labs.',
  },
  {
    label: 'RL Reasoning (GRPO)',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    description: 'Reinforcement learning with verifiable rewards — math, code, logic. GRPO or variants train the model to reason step-by-step. This is what produces "thinking" models like DeepSeek-R1 and o3.',
  },
  {
    label: 'Safety Tuning',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    description: 'Final safety pass — Constitutional AI, red-team hardening, refusal training. Often uses RLAIF (AI feedback) for scale. Balances safety with helpfulness to minimize over-refusal.',
  },
  {
    label: 'Deploy',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    description: 'Production deployment with system prompts, output filters, rate limiting, monitoring, and human escalation paths. Continuous red-teaming post-launch.',
  },
]

interface Trend {
  label: string
  description: string
  color: string
}

const TRENDS: Trend[] = [
  {
    label: 'Less human labeling',
    description: 'RLAIF and synthetic data generation replace most human annotation. Humans focus on edge cases and red-teaming.',
    color: 'text-blue-400',
  },
  {
    label: 'More self-play & RL',
    description: 'Models improve by playing against themselves — generating, evaluating, and refining. GRPO and self-play RL are the biggest capability drivers in 2025.',
    color: 'text-green-400',
  },
  {
    label: 'Verifiable rewards',
    description: 'Moving from subjective human preferences to objective metrics: code passes tests, math is correct, logic is valid. Scales better and avoids reward hacking.',
    color: 'text-amber-400',
  },
  {
    label: 'Reasoning as a training target',
    description: 'Chain-of-thought and extended thinking are now explicitly trained via RL, not just prompted. Models learn when to think longer on harder problems.',
    color: 'text-purple-400',
  },
]

const EN_INTRO = `The modern post-training pipeline combines multiple techniques. Click each stage to explore.`

export const PostTrainingPipelineSection: React.FC = () => {
  const { lang } = useLanguage()
  const pIPELINET = tArray(lang, PIPELINE, pipelineTranslations)
  const tRENDST = tArray(lang, TRENDS, trendsTranslations)
  const c = useT({ title: '5. Full Post-Training Pipeline (2025–2026)', intro: EN_INTRO }, { sv: postTrainingPipelineSectionSv, ko: postTrainingPipelineSectionKo })
  const [activeStage, setActiveStage] = useState<number | null>(null)

  const selectStage = useCallback((i: number) => {
    setActiveStage(p => (p === i ? null : i))
  }, [])

  return (
    <section aria-labelledby="post-training-pipeline">
      <h2 id="post-training-pipeline" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Pipeline visualization */}
      <div className="mb-6 flex flex-wrap items-center gap-2" role="list" aria-label="Post-training pipeline">
        {pIPELINET.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-2" role="listitem">
            <button
              onClick={() => selectStage(i)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                activeStage === i
                  ? `border-zinc-500 ${stage.bgColor} ${stage.color}`
                  : `border-zinc-700 ${stage.color} hover:border-zinc-600`
              }`}
            >
              {stage.label}
            </button>
            {i < PIPELINE.length - 1 && (
              <span className="text-zinc-600" aria-hidden="true">→</span>
            )}
          </div>
        ))}
      </div>

      {activeStage !== null && (
        <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
          <h3 className={`mb-1 text-sm font-semibold ${pIPELINET[activeStage].color}`}>
            {pIPELINET[activeStage].label}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-300">
            {pIPELINET[activeStage].description}
          </p>
        </div>
      )}

      {/* Trends */}
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-300">Key Trends</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {tRENDST.map(trend => (
          <div key={trend.label} className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <h4 className={`mb-1 text-sm font-medium ${trend.color}`}>{trend.label}</h4>
            <p className="text-xs leading-relaxed text-zinc-400">{trend.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
