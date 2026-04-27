import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { Icon } from '../../components/Icon'
import { useT } from '../../useT'
import { productionGovernanceSectionSv, productionGovernanceSectionKo } from './tech-translations'

const AUTONOMY_TIERS = [
  { tier: 'L0 — Copilot', loop: 'Human acts, AI suggests', oversight: 'Every action', examples: 'Code completion, email drafts, search suggestions', risk: 'Minimal — human executes', color: 'bg-emerald-500/20 text-emerald-300' },
  { tier: 'L1 — Executor', loop: 'Human approves, AI acts', oversight: 'Per-action approval', examples: 'AI drafts + human sends email, AI prepares + human files ticket', risk: 'Low — human gate on every action', color: 'bg-blue-500/20 text-blue-300' },
  { tier: 'L2 — Bounded autonomy', loop: 'AI acts within rules, human monitors', oversight: 'Async review + alerts', examples: 'Auto-resolve L1 tickets, process refunds <$100, schedule meetings', risk: 'Medium — errors may not be caught immediately', color: 'bg-amber-500/20 text-amber-300' },
  { tier: 'L3 — Supervised autonomy', loop: 'AI acts, escalates exceptions', oversight: 'Exception-based + audits', examples: 'End-to-end customer onboarding, automated incident response', risk: 'High — cascading errors possible, need kill switches', color: 'bg-red-500/20 text-red-300' },
  { tier: 'L4 — Full autonomy', loop: 'AI acts, human sets strategy', oversight: 'Outcome-based review', examples: 'Autonomous trading, self-healing infrastructure, supply chain optimization', risk: 'Critical — accountability gaps, regulatory exposure', color: 'bg-red-500/30 text-red-400' },
]

const GOVERNANCE_CONTROLS = [
  { control: 'Action boundaries', what: 'Whitelist of permitted actions per agent. Anything not explicitly allowed is denied.', implementation: 'System prompt constraints + AgentCore harness max_iterations + tool-level IAM policies' },
  { control: 'Spend limits', what: 'Cap on financial impact per action and per session.', implementation: 'Guardrails on refund amounts, purchase limits, API call budgets. Hard-coded in skill logic, not just prompt instructions.' },
  { control: 'Audit trail', what: 'Every agent action logged with reasoning trace, tool calls, inputs/outputs.', implementation: 'AgentCore Observability — step-by-step execution traces, metadata tagging, trajectory inspection.' },
  { control: 'Kill switch', what: 'Ability to immediately halt an agent or class of agents.', implementation: 'AgentCore Runtime session termination. Circuit breakers on error rate thresholds.' },
  { control: 'Human escalation', what: 'Defined triggers that pause the agent and route to a human.', implementation: 'Confidence thresholds, topic classifiers (Bedrock Guardrails), explicit escalation rules in skills.' },
  { control: 'Drift detection', what: 'Monitor for behavioral changes over time — is the agent doing something it didn\'t used to do?', implementation: 'Baseline metrics (action distribution, escalation rate, error rate). Alert on statistical deviation.' },
]

const EN_P2 = `Deploying agents to production is fundamentally different from deploying APIs. An API does what you coded. An agent`
const EN_P3 = `{c.p3}`
const EN_P4 = `{c.p4}`
const EN_P5 = `{c.p5}`
const EN_P6 = `{c.p6}`
const EN_INTRO = `McKinsey (2026): "Organizations can no longer concern themselves only with AI systems
        saying the wrong thing; they must contend with systems doing the wrong thing."`

export const ProductionGovernanceSection: React.FC = () => {
  const c = useT({ title: '8. Production Governance — Trust at Scale', intro: EN_INTRO , p2: EN_P2, p3: EN_P3, p4: EN_P4, p5: EN_P5, p6: EN_P6 }, { sv: productionGovernanceSectionSv, ko: productionGovernanceSectionKo })
  const [showControls, setShowControls] = useState(false)
  const toggleControls = useCallback(() => setShowControls((p) => !p), [])

  return (
    <section aria-labelledby="governance-tech">
      <h2 id="governance-tech" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300">
        {c.p2} <em>decides</em> what to do. This shifts risk from implementation
        bugs to <strong className="text-zinc-100">behavioral failures</strong> — the agent does
        something technically correct but contextually wrong.
      </p>
      <p className="mb-6 max-w-2xl text-sm text-zinc-400">{c.intro}</p>

      {/* Autonomy tiers */}
      <div className="mb-8 overflow-hidden rounded-lg border border-zinc-700">
        <div className="border-b border-zinc-700 bg-zinc-800 px-4 py-2">
          <span className="text-xs font-medium text-zinc-400">Autonomy tiers — match oversight to risk</span>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-800/50">
              {['Tier', 'Loop', 'Oversight', 'Examples', 'Risk'].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-medium text-zinc-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AUTONOMY_TIERS.map((t) => (
              <tr key={t.tier} className="border-b border-zinc-800/50 last:border-0">
                <td className={`px-3 py-2 font-medium ${t.color} rounded`}>{t.tier}</td>
                <td className="px-3 py-2 text-zinc-300">{t.loop}</td>
                <td className="px-3 py-2 text-zinc-400">{t.oversight}</td>
                <td className="px-3 py-2 text-zinc-400">{t.examples}</td>
                <td className="px-3 py-2 text-zinc-400">{t.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Governance controls */}
      <div className="mb-8">
        <button onClick={toggleControls} className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-200 hover:text-zinc-100" aria-expanded={showControls}>
          <Icon name="shield" size={14} />
          {showControls ? 'Hide' : 'Show'} governance controls checklist
        </button>
        {showControls && (
          <div className="space-y-2">
            {GOVERNANCE_CONTROLS.map((g) => (
              <div key={g.control} className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
                <p className="text-sm font-medium text-zinc-100">{g.control}</p>
                <p className="mt-1 text-sm text-zinc-300">{g.what}</p>
                <p className="mt-2 text-xs text-zinc-500"><strong className="text-zinc-400">Implementation:</strong> {g.implementation}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Failure modes */}
      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-100">Agent-specific failure modes (beyond hallucination)</p>
        <div className="space-y-2">
          {[
            { mode: 'Goal drift', desc: 'Agent optimizes for a proxy metric instead of the actual goal. Support agent minimizes ticket count by closing tickets prematurely instead of resolving issues.', mitigation: 'Measure outcomes (CSAT, reopen rate), not just throughput.' },
            { mode: 'Tool misuse', desc: 'Agent calls the right tool with wrong parameters — issues a refund to the wrong customer, sends an email to the wrong recipient.', mitigation: 'Input validation on tool calls. Confirmation step for irreversible actions.' },
            { mode: 'Infinite loops', desc: 'Agent retries a failing action with slight variations, burning tokens and time.', mitigation: 'max_iterations in harness config. Circuit breaker on repeated tool errors.' },
            { mode: 'Scope creep', desc: 'Agent takes actions outside its intended domain — a support agent starts making product recommendations or offering discounts it\'s not authorized to give.', mitigation: 'Strict action whitelists. Bedrock Guardrails denied topics. Regular behavioral audits.' },
          ].map((f) => (
            <div key={f.mode} className="rounded bg-zinc-800/50 px-4 py-3">
              <p className="text-sm text-zinc-200"><strong className="text-red-400">{f.mode}:</strong> {f.desc}</p>
              <p className="mt-1 text-xs text-emerald-400">Mitigation: {f.mitigation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Industry stats */}
      <div className="mb-8 rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
        <p className="mb-2 text-sm font-medium text-amber-300">Industry reality check</p>
        <div className="space-y-1 text-sm text-zinc-300">
          <p>Up to <strong className="text-zinc-100">40% of agentic AI initiatives</strong> may face cancellation by 2027 — not due to model quality but governance, integration, and organizational readiness failures.</p>
          <p>Organizations without proactive governance could see a <strong className="text-zinc-100">50% decline in model adoption</strong> and user acceptance by 2026 (Gartner).</p>
          <p>The EU AI Act (phasing in 2025-2027) imposes fines up to <strong className="text-zinc-100">7% of global turnover</strong> for prohibited AI practices.</p>
        </div>
      </div>

      <SelfExplain
        prompt="You're deploying a customer support agent at L2 (bounded autonomy). Design the governance framework: what actions can it take autonomously, what needs approval, what are the monitoring metrics, and what triggers a rollback?"
        modelAnswer="Autonomous (L2): Answer FAQs, look up order status, update ticket status, send templated responses, issue refunds <$50. Needs approval (L1): Refunds $50-$500, account modifications, sending non-templated emails, escalating to engineering. Prohibited: Refunds >$500, account deletion, accessing other customers' data, making promises about future features. Monitoring: accuracy (sample 5% of conversations daily), CSAT score (target >4.2/5), escalation rate (alert if >20%), refund total (daily cap $5K), error rate (alert if >2%). Rollback triggers: CSAT drops below 3.5, error rate exceeds 5% for 1 hour, any single refund error, customer complaint about incorrect information. Rollback procedure: switch to L1 (human approval on all actions), investigate root cause, fix, re-validate on 100 test cases before returning to L2."
      />
    </section>
  )
}
