import { useState, useCallback } from 'react'
import { CodeBlock } from '../../components/CodeBlock'
import { Icon } from '../../components/Icon'
import { tArray, useLanguage, useT } from '../../i18n'
import { a2ASectionSv, a2ASectionKo } from './tech-translations'
import { protocolsTranslations } from './data-translations'

const A2A_AGENT_CARD = `{
  "name": "billing-agent",
  "description": "Handles refunds, invoice disputes, and payment adjustments",
  "url": "https://agents.acme.com/billing",
  "version": "1.0.0",
  "capabilities": {
    "streaming": true,
    "pushNotifications": true
  },
  "skills": [
    {
      "id": "process-refund",
      "name": "Process Refund",
      "description": "Issue a refund for a customer order",
      "inputModes": ["application/json"],
      "outputModes": ["application/json"]
    },
    {
      "id": "dispute-invoice",
      "name": "Dispute Invoice",
      "description": "Investigate and resolve invoice discrepancies"
    }
  ],
  "authentication": {
    "schemes": ["OAuth2"]
  }
}`

const PROTOCOLS = [
  { name: 'MCP', direction: 'Agent → Tool/Resource', analogy: 'USB — connecting peripherals to a computer', scope: 'One agent accessing external capabilities (APIs, databases, file systems)', standard: 'Anthropic (open, adopted by OpenAI, AWS, Microsoft)', status: '3,000+ servers, production-ready' },
  { name: 'A2A', direction: 'Agent → Agent', analogy: 'HTTP — computers talking to computers', scope: 'Agents discovering, delegating to, and collaborating with other agents across org boundaries', standard: 'Google → Linux Foundation (100+ orgs: AWS, Microsoft, Salesforce, SAP)', status: 'Spec stable, early production adoption' },
]

const EN_P4 = `Example: cross-team agent collaboration`
const EN_P3 = `MCP handles agent→tool connections. A2A handles agent→agent delegation. Together they enable cross-team workflows where each team owns and operates their own agent.`
export const A2ASection: React.FC = () => {
  const { lang } = useLanguage()
  const pROTOCOLST = tArray(lang, PROTOCOLS, protocolsTranslations)
  const c = useT({ title: '7. A2A — Agent-to-Agent Protocol' , p3: EN_P3 , p4: EN_P4 }, { sv: a2ASectionSv, ko: a2ASectionKo })
  const [showCard, setShowCard] = useState(false)
  const toggleCard = useCallback(() => setShowCard((p) => !p), [])

  return (
    <section aria-labelledby="a2a-tech">
      <h2 id="a2a-tech" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        MCP connects agents to <em>tools</em>. A2A connects agents to <em>other agents</em>.
        Launched by Google in April 2025 and donated to the Linux Foundation in June 2025, A2A defines how
        opaque agents discover each other, negotiate capabilities, exchange tasks, and stream results —
        regardless of framework or vendor.
      </p>

      {/* MCP vs A2A comparison */}
      <div className="mb-6 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
              {['Protocol', 'Direction', 'Scope', 'Backed by', 'Status'].map((h) => (
                <th key={h} className="px-3 py-2 text-left text-xs font-medium text-zinc-600 dark:text-zinc-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pROTOCOLST.map((p) => (
              <tr key={p.name} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                <td className="px-3 py-2 font-mono font-medium text-amber-300">{p.name}</td>
                <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{p.direction}</td>
                <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">{p.scope}</td>
                <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">{p.standard}</td>
                <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* A2A architecture */}
      <div className="mb-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <p className="mb-3 text-xs font-medium text-zinc-500">A2A core concepts</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { term: 'Agent Card', desc: 'JSON metadata at /.well-known/agent.json — declares capabilities, skills, auth requirements. Like an OpenAPI spec but for agents.' },
            { term: 'Task', desc: 'The unit of work. A client agent sends a task, the remote agent processes it, returns results. Tasks can be long-running with streaming updates.' },
            { term: 'Message / Part', desc: 'Communication within a task. Supports text, files, structured data. Multi-turn conversations between agents.' },
            { term: 'Push Notifications', desc: 'Remote agent can notify the client when async work completes — no polling required.' },
          ].map((c) => (
            <div key={c.term} className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2">
              <p className="text-xs font-medium text-emerald-400">{c.term}</p>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Card example */}
      <div className="mb-6">
        <button onClick={toggleCard} className="mb-2 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:text-zinc-200">
          <Icon name="file" size={14} />
          {showCard ? 'Hide' : 'Show'} example Agent Card
        </button>
        {showCard && <CodeBlock code={A2A_AGENT_CARD} language="javascript" title="/.well-known/agent.json" />}
      </div>

      {/* Multi-agent flow */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <p className="mb-3 text-xs font-medium text-zinc-500">{c.p4}</p>
        <div className="space-y-2 font-mono text-xs">
          {[
            { agent: 'support-agent', action: 'Receives: "Customer #1234 was double-charged"', color: 'text-blue-400' },
            { agent: 'support-agent', action: 'MCP → billing-db: lookup_charges(customer=1234) → confirms duplicate', color: 'text-emerald-400' },
            { agent: 'support-agent', action: 'A2A → billing-agent: { task: "process-refund", amount: 49.99, customer: 1234 }', color: 'text-amber-400' },
            { agent: 'billing-agent', action: 'MCP → payment-gateway: issue_refund(txn=...) → success', color: 'text-emerald-400' },
            { agent: 'billing-agent', action: 'A2A → support-agent: { status: "completed", refund_id: "R-5678" }', color: 'text-amber-400' },
            { agent: 'support-agent', action: 'Responds to customer with refund confirmation', color: 'text-blue-400' },
          ].map((step, i) => (
            <div key={i} className="flex gap-2">
              <span className="w-28 shrink-0 text-zinc-500">{step.agent}</span>
              <span className={step.color}>{step.action}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          {c.p3}
        </p>
      </div>
    </section>
  )
}
