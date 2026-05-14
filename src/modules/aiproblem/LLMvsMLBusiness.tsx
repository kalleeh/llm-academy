import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'

interface Approach {
  name: string
  shortDef: string
  whatYoudSee: string
  costPerCall: string
  speed: string
  whoBuildsIt: string
  goodFor: string[]
  badFor: string[]
  example: string
  color: string
}

// Cost and speed claims verified against typical 2026 deployment patterns:
// - Rules: <1ms, ~$0
// - Classical ML: ~2ms, ~$0.0001/request (commodity inference)
// - LLM API: 200-2000ms, $0.001-$0.05/request depending on model
//   (e.g. GPT-5.5-Mini ~$0.0001-$0.001 per short request, Opus 4.7 ~$0.01-$0.05)
// Source: pricing pages of OpenAI, Anthropic, Google as of May 2026.

const APPROACHES: Approach[] = [
  {
    name: 'Rules / Logic',
    shortDef: 'A list of "if this, then that" instructions written by humans.',
    whatYoudSee: 'A spreadsheet, a config file, an Excel macro, a workflow in Zapier or Power Automate.',
    costPerCall: '~$0',
    speed: 'Instant',
    whoBuildsIt: 'Anyone — analyst, ops person, or developer. No training needed.',
    goodFor: [
      'Tasks with clear, fixed rules ("if order > $1000, route to manager")',
      'Tax math, expense thresholds, eligibility checks',
      'Anything that needs to be 100% predictable and auditable',
    ],
    badFor: [
      'Anything that requires interpreting messy text',
      'Edge cases (you have to write a rule for each one)',
      'Things where the rules change often',
    ],
    example: '"If invoice amount > $5,000 AND vendor is not on approved list → escalate to finance director."',
    color: 'border-zinc-500/30 bg-zinc-500/5',
  },
  {
    name: 'Classical ML (Machine Learning)',
    shortDef: 'A statistical model trained on labeled examples to predict patterns. Pre-LLM era of AI.',
    whatYoudSee: 'A model deployed inside a SaaS product (e.g., spam filter, fraud score, recommendation engine). You don&apos;t see it directly — it works in the background.',
    costPerCall: '~$0.0001 (a hundredth of a cent)',
    speed: '~2 milliseconds',
    whoBuildsIt: 'A data scientist or ML engineer. Needs thousands of labeled examples to train.',
    goodFor: [
      'High-volume tasks where speed and cost matter (millions of calls/day)',
      'Numerical / structured data (rows in a database)',
      'Well-defined classification (spam/not-spam, fraud/legit)',
      'When you have years of clean labeled data',
    ],
    badFor: [
      'Tasks involving free-form text, conversation, or reasoning',
      'When you don&apos;t have labeled training data',
      'Tasks that change often (each change = retrain)',
    ],
    example: 'Your bank&apos;s fraud detection model that flags suspicious transactions in real time. Trained on millions of past transactions labeled "fraud" or "not fraud."',
    color: 'border-blue-400 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5',
  },
  {
    name: 'LLMs (Large Language Models)',
    shortDef: 'A general-purpose AI model that reads and writes text. Trained on most of the internet.',
    whatYoudSee: 'ChatGPT, Claude, Gemini, Copilot, Amazon Quick — anywhere you can type a question or paste text and get a response.',
    costPerCall: '$0.0001 – $0.05 (varies wildly by model and length)',
    speed: '0.5–3 seconds (much slower than ML)',
    whoBuildsIt: 'You can use them with no training — just write a prompt. Building a custom one (fine-tuning) needs an ML team.',
    goodFor: [
      'Anything involving free-form text — emails, summaries, drafts, Q&A',
      'Tasks that require reasoning or nuance',
      'Working across many domains without retraining',
      'Quickly prototyping something new (no labeled data needed)',
    ],
    badFor: [
      'High-volume, low-margin tasks (cost adds up)',
      'Sub-second latency requirements',
      'Tasks where every output must be exactly right (math, legal calculations)',
      'Decisions that need to be auditable and reproducible',
    ],
    example: '"Summarize this 30-page contract and flag any unusual clauses." A rule can&apos;t do this. Classical ML can&apos;t do this. An LLM can.',
    color: 'border-amber-400 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5',
  },
]

const DECISION_RULES = [
  {
    if: 'The rules are clear and don&apos;t change often',
    then: 'Use rules / logic. Don&apos;t use AI just because it&apos;s trendy.',
  },
  {
    if: 'You have lots of clean labeled data and need millisecond speed',
    then: 'Use classical ML. Most fraud detection, recommendations, and forecasting still uses this.',
  },
  {
    if: 'The task involves messy text, conversation, or nuance — and volume is moderate',
    then: 'Use an LLM. Start with API-based (OpenAI, Anthropic, Google, Amazon Bedrock).',
  },
  {
    if: 'The task is mostly clear rules with one fuzzy step',
    then: 'Use rules + a small LLM step. Most production systems are hybrid.',
  },
]

// NOTE: this component never had SV/KO translations in the legacy system
// (it called `useT(EN, {})` with empty translation overrides). Until SV/KO
// strings are authored for it, EN renders for all languages — same as before.
const C = {
  title: '3. AI ≠ AI: Rules vs ML vs LLMs',
  intro:
    '"AI" is a marketing word that covers three very different things. Picking the right one for your problem is the difference between a $50/month tool that works and a $5,000/month tool that disappoints.',
  decisionTitle: 'Quick decision rules',
  selfExplainPrompt:
    'Pick a process at your company that someone on your team does manually. Which of the three approaches above would you start with — and what would the cheapest sensible starting version look like?',
  selfExplainAnswer:
    'Example — sorting incoming sales leads by priority. Manual today, ~30 seconds per lead, 200 leads/day. Approach: try rules FIRST (industry + company size + interest level → score). If rules cover 80%+ of cases, you&apos;re done — fastest, cheapest, fully predictable. Only escalate to an LLM for the 20% where the lead notes contain free-form text that rules can&apos;t parse. Don&apos;t reach for an LLM first just because it&apos;s the cool option.',
}

export const LLMvsMLBusiness: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(0)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="llmvsml-biz">
      <h2 id="llmvsml-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{C.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{C.intro}</p>

      <div className="mb-6 space-y-2">
        {APPROACHES.map((a, i) => (
          <div key={a.name} className={`rounded-lg border ${a.color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="min-w-0">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{a.name}</span>
                <span className="ml-2 text-xs text-zinc-500">— {a.shortDef}</span>
              </div>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">What you&apos;d see in real life</p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: a.whatYoudSee }} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2">
                    <p className="text-xs text-zinc-500">Cost / call</p>
                    <p className="text-xs text-amber-700 dark:text-amber-300">{a.costPerCall}</p>
                  </div>
                  <div className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2">
                    <p className="text-xs text-zinc-500">Speed</p>
                    <p className="text-xs text-amber-700 dark:text-amber-300">{a.speed}</p>
                  </div>
                  <div className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2">
                    <p className="text-xs text-zinc-500">Who builds it</p>
                    <p className="text-xs text-amber-700 dark:text-amber-300">{a.whoBuildsIt}</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">✓ Good for</p>
                    <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
                      {a.goodFor.map((x) => <li key={x}>• <span dangerouslySetInnerHTML={{ __html: x }} /></li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-medium text-red-700 dark:text-red-400">✗ Bad for</p>
                    <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
                      {a.badFor.map((x) => <li key={x}>• <span dangerouslySetInnerHTML={{ __html: x }} /></li>)}
                    </ul>
                  </div>
                </div>
                <div className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3">
                  <p className="mb-1 text-xs font-medium text-zinc-500">Concrete example</p>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: a.example }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">{C.decisionTitle}</p>
        <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
          {DECISION_RULES.map((r) => (
            <li key={r.if} className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2">
              <span className="text-zinc-500">If: </span><span dangerouslySetInnerHTML={{ __html: r.if }} />
              <br />
              <span className="text-emerald-700 dark:text-emerald-400">→ </span><span className="text-zinc-800 dark:text-zinc-200" dangerouslySetInnerHTML={{ __html: r.then }} />
            </li>
          ))}
        </ul>
      </div>

      <SelfExplain prompt={C.selfExplainPrompt} modelAnswer={C.selfExplainAnswer} />
    </section>
  )
}
