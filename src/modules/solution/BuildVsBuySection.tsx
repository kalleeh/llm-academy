import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import { useT } from '../../useT'
import { buildVsBuySectionSv, buildVsBuySectionKo } from './tech-translations'

type ApproachId = 'api' | 'open-source' | 'fine-tuned'

interface ComparisonRow {
  aspect: string
  api: string
  openSource: string
  fineTuned: string
}

const COMPARISON: ComparisonRow[] = [
  { aspect: 'Cost model', api: 'Pay per token — scales with usage', openSource: 'Fixed infra cost — GPU rental/purchase', fineTuned: 'Training cost + hosting cost' },
  { aspect: 'Latency', api: '100–2000ms — network + queue time', openSource: '50–500ms — local inference, no network', fineTuned: 'Same as hosting approach chosen' },
  { aspect: 'Privacy', api: 'Data processed by provider — enterprise tiers (Azure OpenAI, Bedrock) offer SOC 2, HIPAA BAAs, data isolation', openSource: 'Full control — but security is your responsibility (encryption, patching, access controls)', fineTuned: 'Training data exposure risk varies by platform' },
  { aspect: 'Customization', api: 'Prompt engineering + system prompts', openSource: 'Full model access — modify anything', fineTuned: 'Deep customization of behavior/knowledge' },
  { aspect: 'Vendor lock-in', api: 'High — API-specific features, prompt formats', openSource: 'None — switch models freely', fineTuned: 'Medium — tied to base model ecosystem' },
  { aspect: 'Maintenance', api: 'Zero — provider handles everything', openSource: 'High — you manage infra, updates, scaling', fineTuned: 'High — retraining as base models improve' },
  { aspect: 'Time to production', api: 'Hours–Days', openSource: 'Weeks — infra setup, optimization', fineTuned: 'Weeks–Months — data curation, training' },
  { aspect: 'Quality ceiling', api: 'Highest — frontier models (GPT-4o, Claude)', openSource: 'Good — Llama 3, Mistral competitive', fineTuned: 'Best for specific domain tasks' },
]

interface Constraint {
  label: string
  question: string
  options: { text: string; scores: Record<ApproachId, number> }[]
}

const CONSTRAINTS: Constraint[] = [
  {
    label: 'Data sensitivity',
    question: 'How sensitive is your data?',
    options: [
      { text: 'Public / non-sensitive', scores: { api: 2, 'open-source': 1, 'fine-tuned': 1 } },
      { text: 'Internal / business data', scores: { api: 0, 'open-source': 2, 'fine-tuned': 1 } },
      { text: 'Regulated (HIPAA, PCI)', scores: { api: -1, 'open-source': 2, 'fine-tuned': 2 } },
    ],
  },
  {
    label: 'Budget',
    question: 'What\'s your budget situation?',
    options: [
      { text: 'Minimize upfront cost', scores: { api: 2, 'open-source': 0, 'fine-tuned': -1 } },
      { text: 'Optimize for scale', scores: { api: 0, 'open-source': 2, 'fine-tuned': 1 } },
      { text: 'Willing to invest heavily', scores: { api: 1, 'open-source': 1, 'fine-tuned': 2 } },
    ],
  },
  {
    label: 'Team expertise',
    question: 'ML engineering capability?',
    options: [
      { text: 'No ML team', scores: { api: 2, 'open-source': -1, 'fine-tuned': -1 } },
      { text: 'Some ML experience', scores: { api: 1, 'open-source': 1, 'fine-tuned': 1 } },
      { text: 'Dedicated ML team', scores: { api: 0, 'open-source': 2, 'fine-tuned': 2 } },
    ],
  },
  {
    label: 'Latency needs',
    question: 'Latency requirements?',
    options: [
      { text: 'Relaxed (>1s OK)', scores: { api: 2, 'open-source': 1, 'fine-tuned': 1 } },
      { text: 'Moderate (<500ms)', scores: { api: 0, 'open-source': 2, 'fine-tuned': 1 } },
      { text: 'Strict (<100ms)', scores: { api: -1, 'open-source': 2, 'fine-tuned': 2 } },
    ],
  },
]

const APPROACH_META: Record<ApproachId, { label: string; color: string; examples: string }> = {
  api: { label: 'API (OpenAI / Anthropic / Amazon Bedrock)', color: 'text-green-400', examples: 'GPT-4o, Claude Sonnet, Amazon Nova Pro via Bedrock' },
  'open-source': { label: 'Open-Source Self-Hosted', color: 'text-blue-400', examples: 'Llama 3, Mistral, Qwen' },
  'fine-tuned': { label: 'Fine-Tuned Model', color: 'text-amber-400', examples: 'Fine-tuned Llama, domain-specific models' },
}

const EN_P2 = `{c.p2}`
const EN_INTRO = `Three main deployment approaches, each with different tradeoffs.`

export const BuildVsBuySection: React.FC = () => {
  const c = useT({ title: '3. Build vs Buy', intro: EN_INTRO , p2: EN_P2 }, { sv: buildVsBuySectionSv, ko: buildVsBuySectionKo })
  const [answers, setAnswers] = useState<Record<number, number>>({})

  const selectOption = useCallback((constraintIdx: number, optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [constraintIdx]: optionIdx }))
  }, [])

  // Calculate scores
  const scores: Record<ApproachId, number> = { api: 0, 'open-source': 0, 'fine-tuned': 0 }
  for (const [ci, oi] of Object.entries(answers)) {
    const option = CONSTRAINTS[Number(ci)].options[oi]
    for (const [key, val] of Object.entries(option.scores)) {
      scores[key as ApproachId] += val
    }
  }
  const hasAnswers = Object.keys(answers).length > 0
  const maxScore = Math.max(...Object.values(scores))
  const recommendation = hasAnswers
    ? (Object.entries(scores).find(([, v]) => v === maxScore)?.[0] as ApproachId)
    : null

  return (
    <section aria-labelledby="build-vs-buy">
      <h2 id="build-vs-buy" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Comparison table */}
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-700">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800">
              <th className="px-4 py-2 text-xs text-zinc-500 uppercase">Aspect</th>
              <th className="px-4 py-2 text-xs text-green-400/70 uppercase">API</th>
              <th className="px-4 py-2 text-xs text-blue-400/70 uppercase">Open-Source</th>
              <th className="px-4 py-2 text-xs text-amber-400/70 uppercase">Fine-Tuned</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map(row => (
              <tr key={row.aspect} className="border-b border-zinc-800">
                <td className="px-4 py-2 font-medium text-zinc-300">{row.aspect}</td>
                <td className="px-4 py-2 text-zinc-400">{row.api}</td>
                <td className="px-4 py-2 text-zinc-400">{row.openSource}</td>
                <td className="px-4 py-2 text-zinc-400">{row.fineTuned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decision framework */}
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-300">
        <Icon name="compass" /> Decision Framework — Answer to Get a Recommendation
      </h3>
      <div className="mb-6 space-y-4">
        {CONSTRAINTS.map((c, ci) => (
          <div key={ci} className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <p className="mb-2 text-sm font-medium text-zinc-200">{c.question}</p>
            <div className="flex flex-wrap gap-2">
              {c.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => selectOption(ci, oi)}
                  className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                    answers[ci] === oi
                      ? 'border-zinc-500 bg-zinc-700 text-zinc-100'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      {recommendation && (
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-5">
          <p className="mb-3 text-sm font-medium text-zinc-200"><Icon name="bar-chart" /> Based on your constraints:</p>
          <div className="mb-3 flex gap-4">
            {(Object.entries(scores) as [ApproachId, number][]).map(([id, score]) => (
              <div key={id} className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className={`text-xs font-medium ${APPROACH_META[id].color}`}>
                    {APPROACH_META[id].label.split(' ')[0]}
                  </span>
                  <span className="text-xs text-zinc-500">{score}pts</span>
                </div>
                <div className="h-2 rounded-full bg-zinc-700">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      id === recommendation ? 'bg-green-500' : 'bg-zinc-500'
                    }`}
                    style={{ width: `${Math.max(5, ((score + 4) / 12) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-300">
            <strong className={APPROACH_META[recommendation].color}>
              Recommendation: {APPROACH_META[recommendation].label}
            </strong>
            {' — '}
            <span className="text-zinc-400">e.g., {APPROACH_META[recommendation].examples}</span>
          </p>
        </div>
      )}
    </section>
  )
}
