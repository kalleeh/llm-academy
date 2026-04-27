import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { modernAlternativesSectionSv, modernAlternativesSectionKo } from './tech-translations'
import { methodsTranslations } from './data-translations'

interface Method {
  id: string
  label: string
  color: string
  tagline: string
  description: string
  pros: string[]
  cons: string[]
  complexity: string
  cost: string
  quality: string
}

const METHODS: Method[] = [
  {
    id: 'rlhf',
    label: 'RLHF / PPO',
    color: 'text-amber-400',
    tagline: 'The original — OpenAI, 2022',
    description: 'Train a reward model on human preferences, then optimize the policy with PPO (Proximal Policy Optimization). Requires careful tuning of KL penalty, reward model accuracy, and PPO hyperparameters. Used in InstructGPT, ChatGPT, and early Claude.',
    pros: ['Battle-tested at scale', 'Can optimize complex objectives', 'Reward model is reusable'],
    cons: ['4 models in memory (policy, ref, reward, value)', 'Reward hacking is common', 'Unstable training, sensitive to hyperparameters'],
    complexity: 'Very High',
    cost: 'Very High',
    quality: 'High',
  },
  {
    id: 'dpo',
    label: 'DPO',
    color: 'text-blue-400',
    tagline: 'Direct Preference Optimization — Stanford, 2023',
    description: 'Skips the reward model entirely. Reformulates the RLHF objective as a simple classification loss on preference pairs. The policy itself implicitly defines the reward. Just needs (prompt, chosen, rejected) triples and standard fine-tuning.',
    pros: ['No reward model needed', 'Simple as supervised fine-tuning', 'Stable training, fewer hyperparameters'],
    cons: ['Offline only — can\'t explore', 'Quality ceiling may be lower than PPO', 'Sensitive to preference data quality'],
    complexity: 'Low',
    cost: 'Low',
    quality: 'High',
  },
  {
    id: 'grpo',
    label: 'GRPO',
    color: 'text-green-400',
    tagline: 'Group Relative Policy Optimization — DeepSeek, 2024',
    description: 'The key insight: PPO needs a separate "critic" model to estimate how good each response is — that\'s expensive and complex. GRPO takes a simpler approach: for each prompt, generate a batch of, say, 8 different responses. Score them all (e.g., did the math answer check out? did the code pass tests?). Then grade on a curve — responses above the group average get reinforced, below-average get penalized. No critic model needed. This is how DeepSeek-R1 learned to reason through multi-step problems — the model discovered chain-of-thought on its own, just from "did you get the right answer?" feedback.',
    pros: ['No value/critic model (saves ~50% memory vs PPO)', 'Works beautifully with verifiable rewards (math, code)', 'Enabled DeepSeek-R1\'s emergent reasoning abilities'],
    cons: ['Needs tasks with checkable answers — harder for open-ended writing', 'Requires generating many samples per prompt (compute cost)', 'Newer method, less battle-tested than PPO at massive scale'],
    complexity: 'Medium',
    cost: 'Medium',
    quality: 'Very High (reasoning)',
  },
  {
    id: 'rlaif',
    label: 'RLAIF',
    color: 'text-purple-400',
    tagline: 'RL from AI Feedback — Anthropic, 2023',
    description: 'RLHF\'s bottleneck is human labelers — they\'re slow, expensive, and inconsistent. RLAIF replaces them with AI. A strong model reads two candidate responses and picks the better one, guided by a set of principles (a "constitution"): "Choose the response that is more helpful, less harmful, and more honest." This is Anthropic\'s Constitutional AI approach. The AI generates millions of preference labels at a fraction of the cost. The catch: the AI judge can only be as good as its own training — it can\'t catch blind spots it shares with the model being trained. That\'s why some human oversight is still needed for the principles themselves.',
    pros: ['Scales to millions of comparisons (vs thousands for human RLHF)', 'Consistent — no annotator disagreement or fatigue', 'Principles are explicit and auditable (the "constitution")'],
    cons: ['Bounded by the judge model\'s own quality and biases', 'Can amplify systematic blind spots', 'Still needs humans to define and validate the principles'],
    complexity: 'Medium',
    cost: 'Low',
    quality: 'High',
  },
]

const COMPARISON_FIELDS: { key: keyof Pick<Method, 'complexity' | 'cost' | 'quality'>; label: string }[] = [
  { key: 'complexity', label: 'Complexity' },
  { key: 'cost', label: 'Cost' },
  { key: 'quality', label: 'Quality' },
]

const EN_INTRO = `RLHF with PPO was the breakthrough that turned base models into helpful assistants — but it requires four models in memory simultaneously and is notoriously finicky to train. The field has since developed simpler alternatives that match or exceed PPO's quality while being dramatically easier to implement. Each makes a different trade-off.`

export const ModernAlternativesSection: React.FC = () => {
  const { lang } = useLanguage()
  const mETHODST = tArray(lang, METHODS, methodsTranslations)
  const c = useT({ title: '3. Modern Alternatives', intro: EN_INTRO }, { sv: modernAlternativesSectionSv, ko: modernAlternativesSectionKo })
  const [activeTab, setActiveTab] = useState(0)

  const selectTab = useCallback((i: number) => setActiveTab(i), [])

  const method = METHODS[activeTab]

  return (
    <section aria-labelledby="modern-alternatives">
      <h2 id="modern-alternatives" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-lg border border-zinc-700 bg-zinc-800 p-1" role="tablist">
        {mETHODST.map((m, i) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={activeTab === i}
            onClick={() => selectTab(i)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === i
                ? 'bg-zinc-700 text-zinc-100'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Active method detail */}
      <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-900 p-5" role="tabpanel">
        <div className="mb-3">
          <h3 className={`text-lg font-semibold ${method.color}`}>{method.label}</h3>
          <p className="text-xs text-zinc-500">{method.tagline}</p>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-zinc-300">{method.description}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-1 text-xs font-semibold text-green-400">Pros</h4>
            <ul className="space-y-1">
              {method.pros.map(p => (
                <li key={p} className="text-xs text-zinc-400">+ {p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-1 text-xs font-semibold text-red-400">Cons</h4>
            <ul className="space-y-1">
              {method.cons.map(c => (
                <li key={c} className="text-xs text-zinc-400">− {c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="overflow-hidden rounded-lg border border-zinc-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800">
              <th className="px-4 py-2 text-left text-xs font-medium text-zinc-400">Method</th>
              {COMPARISON_FIELDS.map(f => (
                <th key={f.key} className="px-4 py-2 text-left text-xs font-medium text-zinc-400">
                  {f.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mETHODST.map(m => (
              <tr key={m.id} className="border-b border-zinc-800 last:border-0">
                <td className={`px-4 py-2 font-medium ${m.color}`}>{m.label}</td>
                {COMPARISON_FIELDS.map(f => (
                  <td key={f.key} className="px-4 py-2 text-zinc-300">{m[f.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
