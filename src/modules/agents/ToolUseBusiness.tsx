import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'
import { toolUseSv, toolUseKo } from './translations'

const TOOLS = [
  { name: 'Search / Retrieval', analogy: 'Like looking something up in a filing cabinet', whatItDoes: 'The agent searches your company documents, knowledge base, or the web.', businessExample: 'A customer asks about your return policy. The agent searches your policy documents and gives an accurate answer.', color: 'border-blue-500/30 bg-blue-500/5' },
  { name: 'Email & Messaging', analogy: 'Like asking your assistant to send a message', whatItDoes: 'The agent can draft and send emails, Slack messages, or notifications.', businessExample: 'After resolving a support ticket, the agent sends a follow-up email.', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { name: 'Data Lookup', analogy: 'Like checking a spreadsheet or database', whatItDoes: 'The agent can query your CRM, ERP, or any business system.', businessExample: '"What\'s the status of the Acme Corp deal?" — the agent checks Salesforce.', color: 'border-purple-500/30 bg-purple-500/5' },
  { name: 'Calculations', analogy: 'Like handing someone a calculator', whatItDoes: 'The agent can run calculations and generate reports accurately.', businessExample: '"What would our margin be if we discount 15%?" — the agent calculates exactly.', color: 'border-amber-500/30 bg-amber-500/5' },
  { name: 'Actions & Updates', analogy: 'Like asking someone to update a record', whatItDoes: 'The agent can create, update, or delete records in your business systems.', businessExample: '"Create a follow-up task for the Acme account." — the agent creates it.', color: 'border-cyan-500/30 bg-cyan-500/5' },
]

const GUARDRAIL_SCENARIOS = [
  { action: 'Look up information', risk: 'Low', recommendation: 'Let the agent do this freely.', riskColor: 'text-emerald-400' },
  { action: 'Send an email to a customer', risk: 'Medium', recommendation: 'Show a draft and ask for approval before sending.', riskColor: 'text-amber-400' },
  { action: 'Update a financial record', risk: 'High', recommendation: 'Always require human approval.', riskColor: 'text-red-400' },
  { action: 'Delete customer data', risk: 'Critical', recommendation: 'Never automate this. Require explicit human action.', riskColor: 'text-red-500' },
]

const EN = {
  title: '2. What Can Agents Actually Do?',
  intro: 'An agent\'s power comes from its tools — the things it can connect to and use. Think of it like hiring an assistant and giving them access to your email, calendar, and filing system.',
  trustTitle: 'The trust question: what should agents do alone?',
  trustIntro: 'Just like you wouldn\'t give a new employee the company credit card on day one, you need to decide what an agent can do on its own vs. what needs your approval. The bigger the consequence of a mistake, the more human oversight you need.',
  platformNote: 'Platforms like Amazon Bedrock AgentCore handle the plumbing — connecting to tools, managing memory across conversations, running securely at scale — so your team can focus on the agent\'s logic rather than infrastructure.',
  selfExplainPrompt: 'Your manager asks: "Should we let the AI agent send emails to customers without approval?" How would you think through this decision?',
  selfExplainAnswer: 'I\'d consider the risk: a wrong email could damage the relationship. I\'d recommend starting with a draft-and-approve workflow. Over time, auto-send routine responses while keeping human review for sensitive communications. Start cautious, loosen as trust builds.',
}

export const ToolUseBusiness: React.FC = () => {
  const c = useT(EN, { sv: toolUseSv, ko: toolUseKo })
  const [expandedTool, setExpandedTool] = useState<number | null>(null)
  const toggleTool = useCallback((i: number) => setExpandedTool((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="tools-biz">
      <h2 id="tools-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="mb-8 space-y-2">
        {TOOLS.map((tool, i) => (
          <div key={i} className={`rounded-lg border ${tool.color}`}>
            <button onClick={() => toggleTool(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expandedTool === i}>
              <div><span className="text-sm font-medium text-zinc-100">{tool.name}</span><span className="ml-2 text-xs text-zinc-500">— {tool.analogy}</span></div>
              <span className="text-xs text-zinc-500">{expandedTool === i ? '▲' : '▼'}</span>
            </button>
            {expandedTool === i && (
              <div className="space-y-3 border-t border-zinc-800 px-5 py-4">
                <p className="text-sm text-zinc-300">{tool.whatItDoes}</p>
                <div className="rounded-lg bg-zinc-800/50 p-3">
                  <p className="mt-1 text-sm text-zinc-300">{tool.businessExample}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="mb-3 font-mono text-lg font-semibold text-zinc-100">{c.trustTitle}</h3>
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-zinc-300">{c.trustIntro}</p>
        <div className="overflow-hidden rounded-lg border border-zinc-700">
          <table className="w-full text-sm">
            <tbody>
              {GUARDRAIL_SCENARIOS.map((s, i) => (
                <tr key={i} className="border-b border-zinc-800 last:border-0">
                  <td className="px-4 py-3 text-zinc-300">{s.action}</td>
                  <td className={`px-4 py-3 font-medium ${s.riskColor}`}>{s.risk}</td>
                  <td className="px-4 py-3 text-zinc-400">{s.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-300">{c.platformNote}</p>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
