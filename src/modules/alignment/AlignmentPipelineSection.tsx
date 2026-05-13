import { useState, useCallback } from 'react'
import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { tArray, useLanguage, useT } from '../../i18n'
import { alignmentPipelineStages } from './data-translations'
import { alignmentPipelineSectionSv, alignmentPipelineSectionKo } from './tech-translations'

interface Stage {
  id: string
  label: string
  color: string
  bgColor: string
  description: string
  details: string
}

const STAGES: Stage[] = [
  {
    id: 'base',
    label: 'Base Model',
    color: 'text-zinc-600 dark:text-zinc-400',
    bgColor: 'bg-zinc-700',
    description: 'Raw pre-trained model — predicts next tokens, no concept of helpfulness.',
    details: 'The base model has learned language structure and world knowledge from trillions of tokens. It can complete any text, but has no preference for helpful vs harmful completions. GPT-3 (175B params) was a base model — powerful but unpredictable.',
  },
  {
    id: 'sft',
    label: 'SFT',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    description: 'Supervised Fine-Tuning — learn from human-written examples of ideal responses.',
    details: 'Human annotators write high-quality (prompt, response) pairs. The model is fine-tuned on these examples using standard cross-entropy loss. Typically 10K-100K examples. This teaches the model the format and style of a helpful assistant, but it only learns to imitate — it can\'t distinguish good from great.',
  },
  {
    id: 'reward',
    label: 'Reward Model',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    description: 'Train a separate model to score response quality from human preferences.',
    details: 'Humans compare pairs of responses and pick the better one. A reward model (often same architecture as the LLM) is trained to predict these preferences. Given a prompt and response, it outputs a scalar score. This converts subjective human judgment into a differentiable signal the policy can optimize.',
  },
  {
    id: 'rlhf',
    label: 'RLHF',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    description: 'Reinforcement Learning from Human Feedback — optimize the policy against the reward model.',
    details: 'Using PPO (Proximal Policy Optimization), the SFT model generates responses, the reward model scores them, and the policy is updated to maximize reward. A KL-divergence penalty prevents the model from drifting too far from the SFT baseline (reward hacking). This is the step that made ChatGPT feel different from GPT-3.',
  },
  {
    id: 'aligned',
    label: 'Aligned',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    description: 'The final model — helpful, harmless, and honest.',
    details: 'The aligned model balances helpfulness with safety. It follows instructions, refuses harmful requests, admits uncertainty, and maintains a consistent helpful persona. But alignment is never "done" — models can still be jailbroken, and the alignment tax (slight capability reduction) is an active research area.',
  },
]

const TERMINAL_STEPS: TerminalStep[] = [
  {
    command: 'python -m scripts.chat_sft --model logs/d26/model.pt --task smoltalk',
    output: 'nanochat SFT | Loading base model: d26 (1.6B params)\n' +
      'Dataset: SmolTalk (HuggingFace) — multi-turn conversations\n' +
      'Training on chat format: <|im_start|>user\\n...\\n<|im_end|>\n' +
      'Step 500:  loss=1.82 → 1.34\n' +
      'Step 1000: loss=1.34 → 1.12\n' +
      'Step 1500: loss=1.12 → 0.98\n' +
      '✓ SFT model saved to logs/d26/chat_sft.pt',
    delay: 1200,
  },
  {
    command: 'python -m scripts.chat_eval --model logs/d26/chat_sft.pt',
    output: 'Evaluating SFT model on task suite...\n' +
      'ARC (science):    42.3%\n' +
      'GSM8K (math):     18.7%\n' +
      'MMLU (knowledge): 38.1%\n' +
      'HumanEval (code): 12.2%\n' +
      'Note: SFT teaches format, not new knowledge.',
    delay: 800,
  },
  {
    command: 'python -m scripts.chat_rl --model logs/d26/chat_sft.pt --task gsm8k,arc',
    output: 'nanochat RL | GRPO on GSM8K + ARC tasks\n' +
      'Policy: chat_sft.pt | KL penalty: 0.02\n' +
      'Step 200:  reward=0.31  kl=0.8  gsm8k=22.1%\n' +
      'Step 500:  reward=0.58  kl=1.4  gsm8k=28.4%\n' +
      'Step 1000: reward=0.82  kl=2.1  gsm8k=35.6%\n' +
      '✓ RL model saved to logs/d26/chat_rl.pt',
    delay: 1400,
  },
  {
    command: 'python -m scripts.chat_cli --model logs/d26/chat_rl.pt',
    output: '> What is 24 × 17?\n' +
      'Let me work through this step by step:\n' +
      '24 × 17 = 24 × 10 + 24 × 7\n' +
      '        = 240 + 168\n' +
      '        = 408\n\n' +
      'The answer is 408.\n\n' +
      '↑ RL training improved math reasoning significantly.',
    delay: 800,
  },
]

const EN_INTRO = `The classic alignment pipeline (InstructGPT, 2022) has three stages after pre-training.`

export const AlignmentPipelineSection: React.FC = () => {
  const { lang } = useLanguage()
  const stages = tArray(lang, STAGES, alignmentPipelineStages)
  const c = useT({ title: '2. The Alignment Pipeline', intro: EN_INTRO }, { sv: alignmentPipelineSectionSv, ko: alignmentPipelineSectionKo })
  const [activeStage, setActiveStage] = useState<number | null>(null)

  const selectStage = useCallback((i: number) => {
    setActiveStage(p => (p === i ? null : i))
  }, [])

  return (
    <section aria-labelledby="alignment-pipeline">
      <h2 id="alignment-pipeline" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Pipeline visualization */}
      <div className="mb-6 flex flex-wrap items-center gap-2" role="list" aria-label="Alignment pipeline stages">
        {stages.map((stage, i) => (
          <div key={stage.id} className="flex items-center gap-2" role="listitem">
            <button
              onClick={() => selectStage(i)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                activeStage === i
                  ? `border-zinc-500 ${stage.bgColor} ${stage.color}`
                  : `border-zinc-200 dark:border-zinc-700 ${stage.color} hover:border-zinc-600`
              }`}
            >
              {stage.label}
            </button>
            {i < STAGES.length - 1 && (
              <span className="text-zinc-600" aria-hidden="true">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Stage detail */}
      {activeStage !== null && (
        <div className="mb-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 p-4">
          <h3 className={`mb-1 text-sm font-semibold ${STAGES[activeStage].color}`}>
            {STAGES[activeStage].label}
          </h3>
          <p className="mb-2 text-sm text-zinc-700 dark:text-zinc-300">{STAGES[activeStage].description}</p>
          <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{STAGES[activeStage].details}</p>
        </div>
      )}

      {/* Terminal simulation */}
      <SimulatedTerminal steps={TERMINAL_STEPS} title="nanochat — alignment pipeline" />
    </section>
  )
}
