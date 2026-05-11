import { useState, useCallback } from 'react'
import { tArray, useLanguage, useT } from '../../i18n'
import { evolutionLadderSectionSv, evolutionLadderSectionKo } from './tech-translations'
import { rungsTranslations } from './data-translations'

const TASK = 'Classify customer sentiment'

interface Rung {
  name: string
  prompt: string
  output: string
  why: string
}

const RUNGS: Rung[] = [
  {
    name: 'Zero-shot',
    prompt: `${TASK}: "I've been waiting 3 weeks for my order and nobody responds to my emails."`,
    output: 'Negative',
    why: 'Just asks the model directly. Works for simple tasks but gives no structure or reasoning.',
  },
  {
    name: 'Few-shot',
    prompt: `Classify customer sentiment as Positive, Negative, or Neutral.

"Love this product!" → Positive
"It's okay, nothing special" → Neutral
"Worst purchase ever" → Negative

"I've been waiting 3 weeks for my order and nobody responds to my emails." →`,
    output: 'Negative',
    why: 'Examples teach the model the exact format and label set. Much more reliable output.',
  },
  {
    name: 'Chain-of-thought',
    prompt: `Classify customer sentiment. Think step by step before giving your answer.

"I've been waiting 3 weeks for my order and nobody responds to my emails."`,
    output: `Step 1: The customer mentions a 3-week wait — this indicates frustration with delivery time.
Step 2: "Nobody responds to my emails" shows unresolved support issues.
Step 3: Both signals point to a negative experience.

Sentiment: Negative`,
    why: 'Reasoning steps improve accuracy on ambiguous cases and let you audit the model\'s logic.',
  },
  {
    name: 'System prompt',
    prompt: `[System] You are a customer support analyst. Classify sentiment as Positive, Negative, or Neutral. Be concise.

[User] "I've been waiting 3 weeks for my order and nobody responds to my emails."`,
    output: 'Negative — The customer expresses frustration with both shipping delays and unresponsive support.',
    why: 'A role and constraints in the system prompt give consistent behavior across all messages.',
  },
  {
    name: 'Structured output',
    prompt: `[System] You are a sentiment classifier. Respond ONLY with valid JSON matching this schema:
{"sentiment": "positive|negative|neutral", "confidence": 0.0-1.0, "keywords": ["..."]}

[User] "I've been waiting 3 weeks for my order and nobody responds to my emails."`,
    output: `{
  "sentiment": "negative",
  "confidence": 0.95,
  "keywords": ["waiting 3 weeks", "nobody responds"]
}`,
    why: 'JSON output is machine-parseable. You can pipe it directly into your application logic.',
  },
  {
    name: 'Multi-step reasoning',
    prompt: `Step 1 — Extract claims: What specific complaints does the customer make?
Step 2 — Rate severity: Score each complaint 1-5.
Step 3 — Classify: Based on severity scores, output JSON with sentiment, confidence, and action.

"I've been waiting 3 weeks for my order and nobody responds to my emails."`,
    output: `Claims: (1) 3-week shipping delay, (2) no email responses
Severity: shipping=4, support=5
{
  "sentiment": "negative",
  "confidence": 0.97,
  "action": "escalate_to_manager",
  "priority": "high"
}`,
    why: 'Breaking complex tasks into explicit steps produces the most reliable and actionable results.',
  },
]

export const EvolutionLadderSection: React.FC = () => {
  const { lang } = useLanguage()
  const rUNGST = tArray(lang, RUNGS, rungsTranslations)
  const c = useT({ title: '1. The Evolution Ladder' }, { sv: evolutionLadderSectionSv, ko: evolutionLadderSectionKo })
  const [activeRung, setActiveRung] = useState(0)

  const handleRungClick = useCallback((index: number) => {
    setActiveRung(index)
  }, [])

  const rung = RUNGS[activeRung]

  return (
    <section aria-labelledby="evolution-ladder">
      <h2 id="evolution-ladder" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        The same task — <strong className="text-zinc-900 dark:text-zinc-100">&quot;{TASK}&quot;</strong> — gets
        dramatically better as you climb from simple prompts to advanced techniques. Click each rung
        to see the improvement.
      </p>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Ladder */}
        <div className="flex flex-col-reverse gap-1" role="tablist" aria-label="Prompt evolution ladder">
          {rUNGST.map((r, i) => (
            <button
              key={r.name}
              role="tab"
              aria-selected={i === activeRung}
              onClick={() => handleRungClick(i)}
              className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                i === activeRung
                  ? 'bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 ring-1 ring-violet-500/40'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                i <= activeRung ? 'bg-violet-200 dark:bg-violet-500/30 text-violet-700 dark:text-violet-300' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
              }`}>
                {i + 1}
              </span>
              {r.name}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900" role="tabpanel">
          <div className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-5 py-3">
            <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Level {activeRung + 1}: {rung.name}
            </h3>
          </div>
          <div className="space-y-4 p-5">
            <div>
              <p className="mb-1 text-xs font-medium text-zinc-500">Prompt</p>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-zinc-50 dark:bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-green-700 dark:text-green-300">
                {rung.prompt}
              </pre>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-zinc-500">Model Output</p>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-zinc-50 dark:bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-amber-700 dark:text-amber-300">
                {rung.output}
              </pre>
            </div>
            <div className="rounded-md bg-zinc-100 dark:bg-zinc-800 p-3">
              <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                <strong className="text-zinc-900 dark:text-zinc-100">Why this level matters:</strong> {rung.why}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
