import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import { useT } from '../../useT'
import { whyEvaluationSectionSv, whyEvaluationSectionKo } from './tech-translations'

interface ModelExample {
  label: string
  perplexity: number
  instruction: string
  response: string
  rating: 'good' | 'bad'
}

const MODEL_EXAMPLES: ModelExample[] = [
  {
    label: 'Model A — Low Perplexity (12.3)',
    perplexity: 12.3,
    instruction: 'Summarize the key points of this article about climate change.',
    response:
      'Climate change is a significant global challenge. The temperature has risen. Carbon dioxide levels are increasing. Many scientists agree. The ice caps are melting. Sea levels are rising. We need to act. The future depends on it. Many countries are working together. Renewable energy is important.',
    rating: 'bad',
  },
  {
    label: 'Model B — Higher Perplexity (18.7)',
    perplexity: 18.7,
    instruction: 'Summarize the key points of this article about climate change.',
    response:
      "Here are the 3 key points:\n\n1. **Temperature trajectory**: Global temps have risen 1.2°C since pre-industrial levels, with projections of 2.5-4.5°C by 2100 under current policies.\n\n2. **Tipping points**: Arctic ice loss, permafrost thaw, and Amazon dieback could trigger irreversible feedback loops within decades.\n\n3. **Policy gap**: Current NDCs (Nationally Determined Contributions) fall ~15 GT CO₂/year short of the Paris Agreement's 1.5°C target.",
    rating: 'good',
  },
]

const EVAL_TYPES: { name: string; icon: IconName; description: string; examples: string[]; pros: string; cons: string }[] = [
  {
    name: 'Automated Benchmarks',
    icon: 'bar-chart',
    description: 'Standardized tests with known answers. Fast, reproducible, but narrow.',
    examples: ['MMLU-Pro', 'HumanEval', 'MATH', 'HellaSwag'],
    pros: 'Cheap, fast, reproducible',
    cons: 'Can be gamed, may not reflect real use',
  },
  {
    name: 'Human Evaluation',
    icon: 'people',
    description: 'Real people rate model outputs for quality, helpfulness, and safety.',
    examples: ['Chatbot Arena', 'Side-by-side comparisons', 'Likert scale ratings'],
    pros: 'Captures nuance, reflects real preferences',
    cons: 'Expensive, slow, subjective variance',
  },
  {
    name: 'Task-Specific Metrics',
    icon: 'target',
    description: 'Metrics designed for your exact use case and domain.',
    examples: ['BLEU/ROUGE for translation', 'F1 for classification', 'Pass@k for code'],
    pros: 'Directly measures what you care about',
    cons: 'Requires custom eval sets, domain expertise',
  },
]

const EN_P13 = `Loss is a training signal, not a quality metric.`
const EN_P12 = `Compare these two models. Model A has`
const EN_P11 = `Training loss tells you the model is learning`
const EN_P10 = `Loss is a training signal, not a quality metric.`
const EN_P9 = `Compare these two models. Model A has`
const EN_P8 = `Training loss tells you the model is learning`
const EN_P7 = `Evaluation in Practice — nanochat`
const EN_P2 = `{c.p2}`
const EN_P3 = `{c.p3}`
const EN_P4 = `Model A has lower perplexity because it produces &ldquo;safe&rdquo; generic sentences that are easy to predict. Model B takes more risks with specific facts and structure — harder to predict, but far more useful.`
const EN_P5 = `{c.p5}`
const EN_P6 = `{c.p6}`
export const WhyEvaluationSection: React.FC = () => {
  const c = useT({ title: '1. Why Evaluation Matters' , p2: EN_P2, p3: EN_P3, p4: EN_P4, p5: EN_P5, p6: EN_P6 , p7: EN_P7 , p8: EN_P8 , p9: EN_P9 , p10: EN_P10 , p11: EN_P11 , p12: EN_P12 , p13: EN_P13 }, { sv: whyEvaluationSectionSv, ko: whyEvaluationSectionKo })
  const [selectedModel, setSelectedModel] = useState(0)
  const [activeType, setActiveType] = useState(0)

  const selectModel = useCallback((i: number) => setSelectedModel(i), [])

  const example = MODEL_EXAMPLES[selectedModel]

  return (
    <section aria-labelledby="why-evaluation">
      <h2 id="why-evaluation" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300">{c.p11}<em>something</em> — but not whether it&apos;s
        learning anything <strong className="text-zinc-100">useful</strong>. A model can achieve
        excellent perplexity while being terrible at following instructions, giving accurate answers,
        or being safe.
      </p>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.p12}<strong className="text-zinc-100">lower perplexity</strong>{' '}
        (better by that metric), but which response would you actually want?
      </p>

      <div className="mb-4 flex gap-2">
        {MODEL_EXAMPLES.map((m, i) => (
          <button
            key={i}
            onClick={() => selectModel(i)}
            className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
              selectedModel === i
                ? 'border-zinc-500 bg-zinc-800 text-zinc-100'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mb-6 overflow-hidden rounded-lg border border-zinc-700">
        <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-4 py-2">
          <span className="font-mono text-xs text-zinc-400">
            Instruction: {example.instruction}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              example.rating === 'good'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {example.rating === 'good' ? '✓ Helpful' : '✗ Unhelpful'} · PPL {example.perplexity}
          </span>
        </div>
        <div className="bg-zinc-900 p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-zinc-300">
            {example.response}
          </pre>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <p className="text-sm leading-relaxed text-zinc-400">
          <strong className="text-amber-400">Key insight:</strong> {c.p4}
          <strong className="text-zinc-100">{c.p13}</strong>
        </p>
      </div>

      <h3 className="mb-4 font-mono text-lg font-semibold text-zinc-100">Types of Evaluation</h3>

      <div className="mb-4 flex gap-2">
        {EVAL_TYPES.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveType(i)}
            className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
              activeType === i
                ? 'border-zinc-500 bg-zinc-800 text-zinc-100'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            <Icon name={t.icon} /> {t.name}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h4 className="mb-2 font-mono text-sm font-semibold text-zinc-100">
          <Icon name={EVAL_TYPES[activeType].icon} /> {EVAL_TYPES[activeType].name}
        </h4>
        <p className="mb-3 text-sm leading-relaxed text-zinc-300">
          {EVAL_TYPES[activeType].description}
        </p>
        <div className="mb-3 flex flex-wrap gap-2">
          {EVAL_TYPES[activeType].examples.map((ex) => (
            <span key={ex} className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">
              {ex}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-green-500/10 p-3">
            <span className="text-xs font-medium text-green-400">✓ Strengths</span>
            <p className="mt-1 text-sm text-zinc-300">{EVAL_TYPES[activeType].pros}</p>
          </div>
          <div className="rounded-md bg-red-500/10 p-3">
            <span className="text-xs font-medium text-red-400">✗ Weaknesses</span>
            <p className="mt-1 text-sm text-zinc-300">{EVAL_TYPES[activeType].cons}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-300">{c.p7}</h3>
        <p className="mb-3 text-sm text-zinc-400">
          nanochat includes two eval scripts that cover both base model quality and chat capabilities.
          The CORE metric (from the DCLM paper) is the primary benchmark for the GPT-2 speedrun leaderboard.
        </p>
        <SimulatedTerminal
          title="nanochat — evaluation"
          steps={[
            {
              command: 'python -m scripts.base_eval --model logs/d26/model.pt',
              output:
                'Evaluating base model: d26 (1.6B params)\n' +
                '─────────────────────────────────────────\n' +
                'val_bpb:     0.745 (bits per byte — lower is better)\n' +
                'CORE metric: 0.2585 (GPT-2 baseline: 0.2565) ✓\n' +
                '─────────────────────────────────────────\n' +
                'Generating samples:\n' +
                '> "The meaning of life is"\n' +
                '  ...a question that has puzzled philosophers\n' +
                '  for centuries. From Aristotle to modern...',
              delay: 1200,
            },
            {
              command: 'python -m scripts.chat_eval --model logs/d26/chat_rl.pt',
              output:
                'Evaluating chat model on task suite:\n' +
                '─────────────────────────────────────────\n' +
                'ARC (science):      42.3%\n' +
                'GSM8K (math):       35.6%  (↑17% from SFT)\n' +
                'MMLU (knowledge):   38.1%\n' +
                'HumanEval (code):   14.8%\n' +
                'SpellingBee:        67.2%\n' +
                '─────────────────────────────────────────\n' +
                'Note: This is a 1.6B model — impressive for\n' +
                'its size, but frontier models score 85-95%.',
              delay: 1000,
            },
          ]}
        />
      </div>
    </section>
  )
}
