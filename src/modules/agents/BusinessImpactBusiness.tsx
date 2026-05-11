import { useState, useCallback } from 'react'
import { useT } from '../../i18n'
import { businessImpactSv, businessImpactKo } from './translations'
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'

const AUTONOMY_LEVELS = [
  { level: 'AI as a tool', analogy: 'A calculator — you press the buttons', description: 'AI does exactly what you ask, one task at a time.', orgChange: 'Minimal. Individual productivity boost.', risk: 'Low — the human is always in control.', examples: 'ChatGPT for drafting emails. Copilot for code suggestions.', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { level: 'AI as an assistant', analogy: 'A junior employee — does the legwork, you review', description: 'AI handles multi-step tasks but checks with you at key points.', orgChange: 'Moderate. Workflows change: humans shift from doing to reviewing.', risk: 'Medium — mistakes are caught at review points.', examples: 'AI drafts customer responses for human approval. AI triages support tickets.', color: 'border-blue-500/30 bg-blue-500/5' },
  { level: 'AI as a colleague', analogy: 'A trusted team member — handles their area, escalates exceptions', description: 'AI autonomously handles routine decisions within defined boundaries.', orgChange: 'Significant. Roles shift from execution to oversight.', risk: 'Higher — the AI acts without per-action approval.', examples: 'AI resolves routine support tickets end-to-end. AI processes expense reports.', color: 'border-amber-500/30 bg-amber-500/5' },
  { level: 'AI as an autonomous operator', analogy: 'A self-driving car — no one at the wheel', description: 'AI makes and executes decisions independently across complex workflows.', orgChange: 'Transformational. Entire processes are redesigned.', risk: 'Highest — cascading errors, accountability gaps.', examples: 'Fully autonomous trading systems. Self-driving supply chain optimization.', color: 'border-red-500/30 bg-red-500/5' },
]

const SELF_DRIVING_PARALLELS = [
  { car: 'Self-driving cars are statistically safer than human drivers', ai: 'AI agents can be more consistent and accurate than humans for routine tasks', but: 'But when a self-driving car crashes, it makes national news. We hold autonomous systems to a higher standard.' },
  { car: 'People are more afraid of plane crashes than car crashes', ai: 'People are more afraid of AI making a wrong decision than a human making the same wrong decision', but: 'The fear is about control. We accept risks we feel we control (driving) more than risks we don\'t (flying, AI).' },
  { car: 'Tesla: ship it, iterate. Waymo: test exhaustively, launch slowly.', ai: 'Some companies go all-in on autonomous AI. Others start with human-in-the-loop.', but: 'Both have merit. Low-risk tasks can tolerate the Tesla approach; high-stakes decisions need the Waymo approach.' },
]

const RISK_FRAMEWORK = [
  { decision: 'Answer a FAQ', impact: 'Low', reversible: 'Yes', recommendation: 'Fully autonomous', color: 'text-emerald-400' },
  { decision: 'Send a marketing email', impact: 'Medium', reversible: 'No', recommendation: 'Draft + human approval first, then auto-send routine ones', color: 'text-amber-400' },
  { decision: 'Issue a refund under $50', impact: 'Medium', reversible: 'Partially', recommendation: 'Autonomous with audit trail', color: 'text-amber-400' },
  { decision: 'Change contract terms', impact: 'High', reversible: 'Difficult', recommendation: 'Always human approval', color: 'text-red-400' },
  { decision: 'Hiring/firing recommendation', impact: 'Critical', reversible: 'No', recommendation: 'AI provides data only — never the decision', color: 'text-red-500' },
]

const FAILURE_PATTERNS = [
  { pattern: 'Technology-first, process-second', detail: 'Teams build the agent before defining what decisions it can make and who is accountable.' },
  { pattern: 'No escalation path', detail: 'The agent handles 95% of cases well, but the 5% it can\'t handle have no clear path to a human.' },
  { pattern: 'Rubber-stamp reviews', detail: 'Humans are "in the loop" but approve everything without checking.' },
  { pattern: 'All-or-nothing thinking', detail: 'Leaders want full autonomy or nothing. The gradual approach feels too slow but is far more likely to succeed.' },
]

const EN = {
  title: '6. The Business Reality — When AI Takes the Wheel',
  intro: 'Every executive wants AI transformation. But when it is time to actually let AI make decisions, the room gets quiet. This is the self-driving car problem — the technology might be ready, but are the people and processes?',
  introSub: 'Understanding the spectrum of AI autonomy — and honestly assessing where your organization is ready — is the difference between successful adoption and expensive failures.',
  carTitle: 'The self-driving car lesson',
  carIntro: 'The parallels between autonomous vehicles and autonomous AI agents are striking — and the lessons are directly applicable to your AI strategy.',
  frameworkButton: 'Practical framework: which decisions can AI make?',
  failTitle: 'Why 40% of agentic AI projects may fail',
  failIntro: 'Industry analysts project that up to 40% of agentic AI initiatives could be cancelled by 2027 — not because the technology does not work, but because organizations are not ready.',
  selfExplainPrompt: 'Your CEO says "I want our customer support to be fully autonomous by Q4." How would you advise them?',
  selfExplainAnswer: 'I recommend the Waymo approach: Start with Level 2 for routine tasks in Q1. Move to Level 3 in Q2 once we have data showing 98%+ accuracy. Keep complex tasks at Level 2 through Q3. Evaluate full autonomy in Q4 based on actual performance data. This gets 70% of the efficiency gains early with minimal risk.',
}

export const BusinessImpactBusiness: React.FC = () => {
  const c = useT(EN, { sv: businessImpactSv, ko: businessImpactKo })
  const [showFramework, setShowFramework] = useState(false)
  const toggleFramework = useCallback(() => setShowFramework((p) => !p), [])

  return (
    <section aria-labelledby="impact-biz">
      <h2 id="impact-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>
      <p className="mb-6 max-w-2xl text-sm text-zinc-400">{c.introSub}</p>

      <InteractiveDemo
        title={c.title}
        steps={AUTONOMY_LEVELS.map((l) => (
          <div key={l.level} className={`rounded-lg border p-5 ${l.color}`}>
            <div className="mb-3"><span className="text-sm font-semibold text-zinc-100">{l.level}</span><span className="ml-2 text-xs text-zinc-400">— {l.analogy}</span></div>
            <p className="mb-3 text-sm text-zinc-300">{l.description}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded bg-zinc-800/50 px-3 py-2"><p className="text-xs text-zinc-500">Org change</p><p className="mt-1 text-xs text-zinc-300">{l.orgChange}</p></div>
              <div className="rounded bg-zinc-800/50 px-3 py-2"><p className="text-xs text-zinc-500">Risk</p><p className="mt-1 text-xs text-zinc-300">{l.risk}</p></div>
              <div className="rounded bg-zinc-800/50 px-3 py-2"><p className="text-xs text-zinc-500">Examples</p><p className="mt-1 text-xs text-zinc-300">{l.examples}</p></div>
            </div>
          </div>
        ))}
      />

      <div className="mt-10 mb-8">
        <h3 className="mb-3 font-mono text-lg font-semibold text-zinc-100">{c.carTitle}</h3>
        <p className="mb-4 max-w-2xl text-sm text-zinc-300">{c.carIntro}</p>
        <div className="space-y-3">
          {SELF_DRIVING_PARALLELS.map((p, i) => (
            <div key={i} className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded bg-zinc-800/50 px-3 py-2"><p className="text-xs font-medium text-blue-400">Self-driving cars</p><p className="mt-1 text-xs text-zinc-300">{p.car}</p></div>
                <div className="rounded bg-zinc-800/50 px-3 py-2"><p className="text-xs font-medium text-amber-400">AI agents</p><p className="mt-1 text-xs text-zinc-300">{p.ai}</p></div>
              </div>
              <p className="mt-2 text-xs text-zinc-400 italic">{p.but}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <button onClick={toggleFramework} className="mb-4 flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300" aria-expanded={showFramework}>
          <span>{showFramework ? '▾' : '▸'}</span>{c.frameworkButton}
        </button>
        {showFramework && (
          <div className="overflow-hidden rounded-lg border border-zinc-700">
            <table className="w-full text-xs">
              <tbody>
                {RISK_FRAMEWORK.map((r) => (
                  <tr key={r.decision} className="border-b border-zinc-800 last:border-0">
                    <td className="px-3 py-2 text-zinc-300">{r.decision}</td>
                    <td className={`px-3 py-2 font-medium ${r.color}`}>{r.impact}</td>
                    <td className="px-3 py-2 text-zinc-400">{r.reversible}</td>
                    <td className="hidden px-3 py-2 text-zinc-400 sm:table-cell">{r.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-100">{c.failTitle}</p>
        <p className="mb-3 text-sm text-zinc-300">{c.failIntro}</p>
        <div className="space-y-2">
          {FAILURE_PATTERNS.map((f) => (
            <div key={f.pattern} className="rounded bg-zinc-800/50 px-4 py-3">
              <p className="text-sm font-medium text-zinc-200">{f.pattern}</p>
              <p className="mt-1 text-xs text-zinc-400">{f.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
