import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'

// Verified facts (May 2026):
// - Claude Opus 4.7 (Apr 16 2026): 87.6% SWE-bench Verified, 64.3% SWE-Bench Pro,
//   $5/$25 per MTok, 1M context, leader for coding/agentic, retrieval regression on long context.
// - GPT-5.5 (Apr 23 2026): 88.7% SWE-bench, 75.1-82.7% Terminal-Bench 2.0, doubled API price,
//   leader for general reasoning and BrowseComp-style web research.
// - Gemini 3.1 Pro: $2/$12 per MTok (cheapest western frontier), 1M+ context,
//   only one to hold long-context after Opus 4.7's regression, native multimodal.
// Sources: thenextweb.com, openai.com, anthropic.com, gemini.google, spectrumailab.com.

interface Model {
  name: string
  vendor: string
  released: string
  bestAt: string
  personality: string
  why: string
  useWhen: string[]
  watchFor: string[]
  pricing: string
  color: string
  badgeColor: string
}

const MODELS: Model[] = [
  {
    name: 'Claude Opus 4.7',
    vendor: 'Anthropic',
    released: 'April 16, 2026',
    bestAt: 'Long-horizon coding · agentic workflows · careful, polished writing',
    personality: 'Cautious. Will refuse or push back when something feels off. Asks clarifying questions instead of guessing.',
    why: 'Trained with Constitutional AI — its safety and honesty principles are baked into the training, not bolted on. The April 2026 update specifically targeted long, multi-step engineering tasks: it self-verifies its own work before reporting back, and Anthropic added an &quot;xhigh&quot; effort tier between high and max for hard tasks.',
    useWhen: [
      'You need it to NOT hallucinate (legal, medical, financial drafting)',
      'Multi-step agentic tasks that chain tools',
      'Code that ships to production',
      'Brand-voice writing where polish matters',
    ],
    watchFor: [
      'Over-refusal on benign requests (sometimes too cautious)',
      'Long-context retrieval regressed in 4.7 vs 4.6 — for 100K+ token retrieval, Gemini may be safer',
      'Slower than GPT-5.5 on simple tasks',
    ],
    pricing: '$5 / $25 per million tokens (input/output) · 1M context',
    color: 'border-amber-500/30 bg-amber-500/5',
    badgeColor: 'bg-amber-500/20 text-amber-300',
  },
  {
    name: 'GPT-5.5',
    vendor: 'OpenAI',
    released: 'April 23, 2026',
    bestAt: 'General reasoning · web research · breadth across domains',
    personality: 'Eager and confident. Will try anything you ask. Strong on terminal-style tasks (75-83% on Terminal-Bench 2.0).',
    why: 'OpenAI invested heavily in reasoning RL — chain-of-thought training makes GPT-5.5 strong on math, science, and multi-step reasoning. Lower hallucination rates than GPT-5.3 in sensitive domains. But it doubled in price compared to its predecessor.',
    useWhen: [
      'Hard reasoning across math, science, or logic',
      'Web research and BrowseComp-style navigation',
      'Broad-domain Q&A where you don\'t know what kind of question is coming',
      'You\'re already invested in the OpenAI ecosystem (Custom GPTs, Codex)',
    ],
    watchFor: [
      'Confident hallucinations — eager personality means it sometimes invents details',
      'Sycophancy bias in early conversations',
      'Doubled API price vs 5.3 — cost-sensitive workloads should benchmark Gemini',
      'Behind Claude Opus 4.7 on production-grade coding (SWE-bench Pro)',
    ],
    pricing: 'Higher than GPT-5.3 (recently doubled) · 200K+ context',
    color: 'border-emerald-500/30 bg-emerald-500/5',
    badgeColor: 'bg-emerald-500/20 text-emerald-300',
  },
  {
    name: 'Gemini 3.1 Pro',
    vendor: 'Google DeepMind',
    released: 'February 2026',
    bestAt: 'Long context (1M+ tokens) · native multimodal · cost-efficiency',
    personality: 'Methodical and factual. Strong on academic reasoning. Native multimodal from training, not bolted on.',
    why: 'Trained multimodal from scratch (text + images + audio + video) on Google\'s data infrastructure and TPUs. The 1M+ token context is the genuine differentiator — and as of April 2026, it\'s the only frontier model that holds long-context retrieval together at scale.',
    useWhen: [
      'Whole codebases, long PDFs, hours of video as input',
      'Native multimodal tasks (analyze a screenshot + a doc + a transcript together)',
      'Cost-sensitive frontier work — cheapest of the three by a clear margin',
      'Academic-style reasoning and research synthesis',
    ],
    watchFor: [
      'Less polished prose than Claude Opus 4.7',
      'Still behind on agentic coding compared to Opus 4.7',
      'Google ecosystem lock-in (Vertex AI, AI Studio)',
    ],
    pricing: '$2 / $12 per million tokens · 1M+ context (cheapest western frontier)',
    color: 'border-blue-500/30 bg-blue-500/5',
    badgeColor: 'bg-blue-500/20 text-blue-300',
  },
]

const KEY_INSIGHT = `These differences come from training-time choices: what data the lab fed in, what behaviors they reinforced, what they penalised. Anthropic optimises for honesty. OpenAI optimises for breadth and reasoning. Google optimises for multimodal and long-context. The "personality" is real — it changes with every release — but it's a side effect of measurable choices, not magic. Always re-check after a major version bump.`

const EN = {
  title: '3. Foundation Models Have Personalities — Why and When to Use Each',
  intro:
    'No single AI model wins everything. Four frontier models shipped within eight days of each other in April 2026, and the right pick depends on your task. Here\'s what each one is genuinely good at — and why.',
  insightTitle: 'Why models differ at all',
  insightText: KEY_INSIGHT,
  selfExplainPrompt:
    'Your team has three projects: (1) a customer support chatbot that handles refunds, (2) a legal contract review tool, (3) a research assistant that summarises competitor websites. Which model would you pick for each, and why?',
  selfExplainAnswer:
    '(1) Customer support chatbot: Claude Opus 4.7 — agentic workflows, careful refusal behavior matters when money is involved. Or Claude Haiku for cost. (2) Legal contract review: Claude Opus 4.7 for the careful refusal of hallucination, OR Gemini 3.1 Pro if contracts are 100K+ tokens (long-context wins). (3) Competitor research: GPT-5.5 — its web research and BrowseComp-style navigation are strongest. Note that the right answer changes every 3-6 months as new versions ship; always benchmark with your actual data.',
}

export const ModelPersonalitiesBusiness: React.FC = () => {
  const c = useT(EN, {})
  const [expanded, setExpanded] = useState<number | null>(0)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="model-personalities-biz">
      <h2 id="model-personalities-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="mb-6 space-y-3">
        {MODELS.map((m, i) => (
          <div key={m.name} className={`rounded-lg border ${m.color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-4 text-left" aria-expanded={expanded === i}>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-zinc-100">{m.name}</span>
                  <span className={`rounded px-2 py-0.5 text-xs ${m.badgeColor}`}>{m.vendor}</span>
                  <span className="text-xs text-zinc-500">{m.released}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">{m.bestAt}</p>
              </div>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-800 px-5 py-4 text-sm">
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">Personality</p>
                  <p className="text-zinc-200">{m.personality}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">Why it behaves this way</p>
                  <p className="text-zinc-300">{m.why}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs font-medium text-emerald-400">✓ Use when</p>
                    <ul className="space-y-1 text-xs text-zinc-300">
                      {m.useWhen.map((x) => <li key={x}>• {x}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-medium text-red-400">⚠ Watch out for</p>
                    <ul className="space-y-1 text-xs text-zinc-300">
                      {m.watchFor.map((x) => <li key={x}>• {x}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="rounded bg-zinc-800/50 px-3 py-2">
                  <span className="text-xs text-zinc-500">Pricing & context: </span>
                  <span className="text-xs text-amber-300">{m.pricing}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
        <p className="mb-2 text-sm font-medium text-amber-300">{c.insightTitle}</p>
        <p className="text-sm text-zinc-300">{c.insightText}</p>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
