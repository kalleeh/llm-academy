import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'

// Cost figures verified May 2026 against vendor pricing pages:
// - GPT-5.5: ~$3 in / $12 out per 1M tokens (recent doubling from 5.3)
// - GPT-5.5-Mini: ~$0.20 in / $0.80 out per 1M tokens
// - Claude Opus 4.7: $5 in / $25 out per 1M tokens
// - Claude Haiku 4.5: ~$0.25 in / $1.25 out per 1M tokens
// - Gemini 3.1 Pro: $2 in / $12 out per 1M tokens (cheapest western frontier)
// - 1 page of text ≈ 500 input tokens; a typical Q&A round-trip ≈ 800 in / 300 out
// - Heuristic: a $20/month ChatGPT Plus subscription = unlimited consumer use,
//   but enterprise pricing is per-seat: ChatGPT Enterprise ~$60/user/mo;
//   Claude Team $30/user/mo; Amazon Quick Plus $20/user/mo;
//   Microsoft Copilot M365 $30/user/mo; Salesforce Agentforce ~$2/conversation

interface CostScenario {
  scenario: string
  cheapestApproach: string
  cheapestCost: string
  midApproach: string
  midCost: string
  premiumApproach: string
  premiumCost: string
  recommendation: string
  color: string
}

const SCENARIOS: CostScenario[] = [
  {
    scenario: '1 employee using AI daily for personal productivity',
    cheapestApproach: 'Free tier (ChatGPT, Claude, Gemini, Quick Free)',
    cheapestCost: '$0/month',
    midApproach: 'ChatGPT Plus / Claude Pro / Gemini Advanced',
    midCost: '~$20/user/month',
    premiumApproach: 'ChatGPT Enterprise / Claude Team / Microsoft Copilot M365',
    premiumCost: '$30–60/user/month',
    recommendation:
      'Free tiers are surprisingly good in 2026 — start there. Upgrade to a paid tier only when you hit usage limits or need privacy guarantees. For a 200-person company, that&apos;s ~$72K/year for a paid tier — real money.',
    color: 'border-blue-500/30 bg-blue-500/5',
  },
  {
    scenario: 'Customer support chatbot — 1,000 conversations/day',
    cheapestApproach: 'Mid-tier model API (GPT-5.5-Mini, Claude Haiku, Gemini Flash)',
    cheapestCost: '~$30–100/month in API calls',
    midApproach: 'Frontier model API (GPT-5.5, Claude Sonnet, Gemini Pro)',
    midCost: '~$300–1,000/month in API calls',
    premiumApproach: 'Vendor platform with managed everything (Salesforce Agentforce, Quick Suite)',
    premiumCost: '$2/conversation × 30K = ~$60,000/month',
    recommendation:
      'API costs at this volume are tiny. The premium platforms charge for the integration, not the AI. Worth it only if you want zero engineering effort and your data already lives in Salesforce / AWS / Microsoft.',
    color: 'border-amber-500/30 bg-amber-500/5',
  },
  {
    scenario: 'Internal knowledge bot — 50 employees, ~50 questions/day',
    cheapestApproach: 'ChatGPT Projects / Claude Projects / Custom GPT (1 person builds it)',
    cheapestCost: '$0–20/month (just the per-seat AI subscription)',
    midApproach: 'Amazon Quick custom agent / Microsoft Copilot Studio agent',
    midCost: '~$20/user/month + setup time',
    premiumApproach: 'Custom RAG system (engineering team builds it)',
    premiumCost: '$50K-$200K to build + ~$500/month to run',
    recommendation:
      'Most teams overshoot here. Try a Custom GPT with attached docs FIRST. If that fails (too many docs, complex permissions), move to a Quick / Copilot agent. Only build custom RAG if neither works.',
    color: 'border-emerald-500/30 bg-emerald-500/5',
  },
  {
    scenario: 'Public-facing AI feature in your product (e.g. AI writing assistant)',
    cheapestApproach: 'Cheap-tier model behind your own UI',
    cheapestCost: '~$0.001-$0.01 per user interaction',
    midApproach: 'Frontier model with caching',
    midCost: '~$0.05-$0.30 per user interaction',
    premiumApproach: 'Frontier model + custom infrastructure + monitoring',
    premiumCost: '~$1+ per interaction at small scale, drops at scale',
    recommendation:
      'For consumer products, AI cost = COGS. A free tier with 10 AI calls/user/month at $0.05/call = $0.50/user/month — that&apos;s a real margin hit. Pick the cheapest model that meets quality bar; reserve the frontier for paying users.',
    color: 'border-purple-500/30 bg-purple-500/5',
  },
]

interface HiddenCost {
  cost: string
  detail: string
  rough: string
}

const HIDDEN_COSTS: HiddenCost[] = [
  {
    cost: 'Setup and integration time',
    detail:
      'Plugging AI into your existing systems (CRM, ticketing, data warehouse) is usually 5-10× the cost of the AI itself in the first year.',
    rough: '$10K-$200K depending on system complexity',
  },
  {
    cost: 'Change management and training',
    detail:
      'Teams need real time to adopt new tools. Without this, fancy AI gets shelved within months.',
    rough: 'Allocate 2-5% of headcount cost for the first year',
  },
  {
    cost: 'Eval and quality monitoring',
    detail:
      'How do you know it&apos;s working? You need ongoing measurement: sample outputs, customer feedback loops, drift detection.',
    rough: '~10% of total project cost, ongoing',
  },
  {
    cost: 'Compliance and security review',
    detail:
      'Especially in regulated industries (finance, health, legal). Privacy reviews, data handling, audit trails, vendor security questionnaires.',
    rough: '$5K-$100K up front, plus ongoing audit cost',
  },
  {
    cost: 'Failure mode handling',
    detail:
      'What happens when the AI is wrong? Customer support escalation, refund liability, brand damage from a bad AI message — all real costs that don&apos;t show up in the AI bill.',
    rough: 'Hard to predict. Plan for 1-3 incidents per year per deployment.',
  },
]

const RULES = [
  '**Free tiers are real now.** Don&apos;t pay for what your team won&apos;t use.',
  '**Try the cheap model first.** GPT-5.5-Mini, Claude Haiku, and Gemini Flash handle 80%+ of tasks at 1/10th the cost.',
  '**API costs are usually NOT the bottleneck.** Setup, integration, and change management dominate the first-year bill.',
  '**Per-conversation pricing is a trap at scale.** Vendor platforms that charge $1-5 per conversation look fine for 100 calls/month and ruinous for 100,000.',
  '**Cost compresses ~10× per year.** Don&apos;t over-engineer for cost today — re-evaluate every 12 months.',
]

const EN = {
  title: '3. What Does AI Actually Cost?',
  intro:
    'Pricing pages are confusing. Here&apos;s what AI actually costs in real money for the most common business scenarios — and the costs nobody puts in the slide deck.',
  hiddenTitle: 'The costs nobody puts in the deck',
  rulesTitle: 'Rules of thumb',
  selfExplainPrompt:
    'Pick a real AI use case at your company. Estimate the headline AI cost (subscription or API) and add the hidden costs above. What ratio of "AI cost" to "everything else cost" do you end up with in year 1?',
  selfExplainAnswer:
    'For a typical mid-sized internal AI deployment (knowledge bot, ~50 users), a realistic year-1 budget is roughly: API/subscription $5K, integration $30K, change management $20K, eval & monitoring $10K, compliance $15K. So the headline "AI cost" is about 6% of the total. That ratio shocks most executives who only see the OpenAI invoice. Plan accordingly: don&apos;t budget for the AI bill, budget for the project.',
}

export const CostRealityBusiness: React.FC = () => {
  const c = useT(EN, {})
  const [expanded, setExpanded] = useState<number | null>(0)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="cost-reality-biz">
      <h2 id="cost-reality-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="mb-6 space-y-2">
        {SCENARIOS.map((s, i) => (
          <div key={s.scenario} className={`rounded-lg border ${s.color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{s.scenario}</span>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4 text-xs">
                <div className="grid gap-2 sm:grid-cols-3">
                  <div className="rounded border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
                    <p className="font-medium text-emerald-400">Cheapest sensible</p>
                    <p className="mt-1 text-zinc-700 dark:text-zinc-300">{s.cheapestApproach}</p>
                    <p className="mt-1 font-mono text-amber-300">{s.cheapestCost}</p>
                  </div>
                  <div className="rounded border border-amber-500/20 bg-amber-500/5 px-3 py-2">
                    <p className="font-medium text-amber-400">Mid-tier</p>
                    <p className="mt-1 text-zinc-700 dark:text-zinc-300">{s.midApproach}</p>
                    <p className="mt-1 font-mono text-amber-300">{s.midCost}</p>
                  </div>
                  <div className="rounded border border-red-500/20 bg-red-500/5 px-3 py-2">
                    <p className="font-medium text-red-400">Premium / managed</p>
                    <p className="mt-1 text-zinc-700 dark:text-zinc-300">{s.premiumApproach}</p>
                    <p className="mt-1 font-mono text-amber-300">{s.premiumCost}</p>
                  </div>
                </div>
                <div className="rounded bg-zinc-100 dark:bg-zinc-800/50 p-3">
                  <p className="mb-1 font-medium text-zinc-600 dark:text-zinc-400">Recommendation</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: s.recommendation }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-5">
        <p className="mb-3 text-sm font-medium text-red-300">{c.hiddenTitle}</p>
        <ul className="space-y-2 text-xs">
          {HIDDEN_COSTS.map((h) => (
            <li key={h.cost} className="rounded bg-white dark:bg-zinc-900 px-3 py-2">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{h.cost}</p>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400" dangerouslySetInnerHTML={{ __html: h.detail }} />
              <p className="mt-1 font-mono text-amber-300">{h.rough}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.rulesTitle}</p>
        <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          {RULES.map((r, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: '• ' + r.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-amber-300">$1</strong>') }} />
          ))}
        </ul>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
