import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { Icon } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Non-translatable per-tier color metadata. Order matches `autonomyTiers` array in
// `useTranslation().modules.agents.productionGovernanceSection.autonomyTiers`.
const TIER_META = [
  { color: 'bg-emerald-500/20 text-emerald-300' },
  { color: 'bg-blue-500/20 text-blue-300' },
  { color: 'bg-amber-500/20 text-amber-300' },
  { color: 'bg-red-500/20 text-red-300' },
  { color: 'bg-red-500/30 text-red-400' },
]

export const ProductionGovernanceSection: React.FC = () => {
  const c = useTranslation().modules.agents.productionGovernanceSection
  const [showControls, setShowControls] = useState(false)
  const toggleControls = useCallback(() => setShowControls((p) => !p), [])

  return (
    <section aria-labelledby="governance-tech">
      <h2 id="governance-tech" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        {c.p2} <em>decides</em> what to do. This shifts risk from implementation
        bugs to <strong className="text-zinc-900 dark:text-zinc-100">behavioral failures</strong> — the agent does
        something technically correct but contextually wrong.
      </p>
      <p className="mb-6 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.intro}</p>

      {/* Autonomy tiers */}
      <div className="mb-8 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
        <div className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{c.p7}</span>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50">
              {['Tier', 'Loop', 'Oversight', 'Examples', 'Risk'].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-medium text-zinc-600 dark:text-zinc-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.autonomyTiers.map((t, i) => {
              const meta = TIER_META[i]
              return (
                <tr key={t.tier} className="border-b border-zinc-200 dark:border-zinc-800/50 last:border-0">
                  <td className={`px-3 py-2 font-medium ${meta.color} rounded`}>{t.tier}</td>
                  <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{t.loop}</td>
                  <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">{t.oversight}</td>
                  <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">{t.examples}</td>
                  <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">{t.risk}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Governance controls */}
      <div className="mb-8">
        <button onClick={toggleControls} className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:text-zinc-100" aria-expanded={showControls}>
          <Icon name="shield" size={14} />
          {showControls ? 'Hide' : 'Show'} governance controls checklist
        </button>
        {showControls && (
          <div className="space-y-2">
            {c.governanceControls.map((g) => (
              <div key={g.control} className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{g.control}</p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{g.what}</p>
                <p className="mt-2 text-xs text-zinc-500"><strong className="text-zinc-600 dark:text-zinc-400">Implementation:</strong> {g.implementation}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Failure modes */}
      <div className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.p8}</p>
        <div className="space-y-2">
          {[
            { mode: 'Goal drift', desc: 'Agent optimizes for a proxy metric instead of the actual goal. Support agent minimizes ticket count by closing tickets prematurely instead of resolving issues.', mitigation: 'Measure outcomes (CSAT, reopen rate), not just throughput.' },
            { mode: 'Tool misuse', desc: 'Agent calls the right tool with wrong parameters — issues a refund to the wrong customer, sends an email to the wrong recipient.', mitigation: 'Input validation on tool calls. Confirmation step for irreversible actions.' },
            { mode: 'Infinite loops', desc: 'Agent retries a failing action with slight variations, burning tokens and time.', mitigation: 'max_iterations in harness config. Circuit breaker on repeated tool errors.' },
            { mode: 'Scope creep', desc: 'Agent takes actions outside its intended domain — a support agent starts making product recommendations or offering discounts it\'s not authorized to give.', mitigation: 'Strict action whitelists. Bedrock Guardrails denied topics. Regular behavioral audits.' },
          ].map((f) => (
            <div key={f.mode} className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-4 py-3">
              <p className="text-sm text-zinc-800 dark:text-zinc-200"><strong className="text-red-400">{f.mode}:</strong> {f.desc}</p>
              <p className="mt-1 text-xs text-emerald-400">Mitigation: {f.mitigation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Industry stats */}
      <div className="mb-8 rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
        <p className="mb-2 text-sm font-medium text-amber-300">Industry reality check</p>
        <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
          <p>Up to <strong className="text-zinc-900 dark:text-zinc-100">40% of agentic AI initiatives</strong> may face cancellation by 2027 — not due to model quality but governance, integration, and organizational readiness failures.</p>
          <p>{c.p11}<strong className="text-zinc-900 dark:text-zinc-100">50% decline in model adoption</strong> and user acceptance by 2026 (Gartner).</p>
          <p>{c.p12}<strong className="text-zinc-900 dark:text-zinc-100">7% of global turnover</strong> for prohibited AI practices.</p>
        </div>
      </div>

      <SelfExplain
        prompt="You're deploying a customer support agent at L2 (bounded autonomy). Design the governance framework: what actions can it take autonomously, what needs approval, what are the monitoring metrics, and what triggers a rollback?"
        modelAnswer="Autonomous (L2): Answer FAQs, look up order status, update ticket status, send templated responses, issue refunds <$50. Needs approval (L1): Refunds $50-$500, account modifications, sending non-templated emails, escalating to engineering. Prohibited: Refunds >$500, account deletion, accessing other customers' data, making promises about future features. Monitoring: accuracy (sample 5% of conversations daily), CSAT score (target >4.2/5), escalation rate (alert if >20%), refund total (daily cap $5K), error rate (alert if >2%). Rollback triggers: CSAT drops below 3.5, error rate exceeds 5% for 1 hour, any single refund error, customer complaint about incorrect information. Rollback procedure: switch to L1 (human approval on all actions), investigate root cause, fix, re-validate on 100 test cases before returning to L2."
      />
    </section>
  )
}
