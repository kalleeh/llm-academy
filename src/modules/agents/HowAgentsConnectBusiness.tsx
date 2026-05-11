import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'
import { connectSv, connectKo } from './translations'

interface Concept {
  name: string
  analogy: string
  whatItIs: string
  example: string
  color: string
}

const CONCEPTS: Concept[] = [
  { name: 'MCP — connecting to tools', analogy: 'Universal access badges for your systems', whatItIs: 'An open standard (the "USB-C of AI") that lets any AI connect to any tool through one universal protocol. Over 3,000 connectors already exist.', example: 'Your company builds an MCP server for your ticketing system. Now every AI tool in the company can create, read, and update tickets — without building separate integrations for each one.', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { name: 'Skills — teaching agents workflows', analogy: 'A training manual, not just a tool belt', whatItIs: 'MCP gives agents tools. Skills teach agents HOW to use them — the workflow, best practices, and decision logic.', example: 'A "customer onboarding" skill knows the 7-step process: verify contract, create workspace, send welcome email, schedule kickoff, assign CSM, create check-in tasks, update status.', color: 'border-amber-500/30 bg-amber-500/5' },
  { name: 'Powers — expert consultants for developers', analogy: 'A specialist who arrives with their own toolkit and expertise', whatItIs: 'Curated packages for the Kiro IDE that bundle MCP servers, best-practice guidelines, and automation hooks for a specific technology.', example: 'The "AWS Observability" Power gives Kiro knowledge of CloudWatch, X-Ray, and monitoring best practices.', color: 'border-purple-500/30 bg-purple-500/5' },
  { name: 'A2A — agents talking to agents', analogy: 'Departments sending requests to each other', whatItIs: 'While MCP connects agents to tools, A2A connects agents to OTHER agents. Created by Google and backed by 100+ organizations.', example: 'Your support agent detects a billing issue. Via A2A, it sends a refund request to the finance team\'s billing agent.', color: 'border-cyan-500/30 bg-cyan-500/5' },
]

const EN = {
  title: '4. How Agents Connect to Everything',
  intro: 'An agent is only useful if it can do things. Here is how the ecosystem of tools, skills, and protocols fits together — from connecting to one app to orchestrating across entire departments.',
  platformNote: 'Platforms like Amazon Bedrock AgentCore manage the runtime that ties all of this together — model selection, tool calls, memory, and safety limits.',
  selfExplainPrompt: 'Think of a multi-step process at your company that involves multiple systems. What MCP tools would an agent need? What workflow logic (skill) would tie them together?',
  selfExplainAnswer: 'Example — new deal closed: MCP tools: CRM, email, calendar, project management, billing. Skill workflow: (1) Update CRM. (2) Create onboarding project. (3) Schedule kickoff meeting. (4) Send welcome email. (5) Generate invoice. (6) Notify sales manager.',
}

export const HowAgentsConnectBusiness: React.FC = () => {
  const c = useT(EN, { sv: connectSv, ko: connectKo })
  const [expanded, setExpanded] = useState<number | null>(0)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="connect-biz">
      <h2 id="connect-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="mb-6 space-y-2">
        {CONCEPTS.map((concept, i) => (
          <div key={i} className={`rounded-lg border ${concept.color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="min-w-0">
                <span className="text-sm font-medium text-zinc-100">{concept.name}</span>
                <span className="ml-2 text-xs text-zinc-500">— {concept.analogy}</span>
              </div>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-800 px-5 py-4">
                <p className="text-sm text-zinc-300">{concept.whatItIs}</p>
                <div className="rounded-lg bg-zinc-800/50 p-3">
                  <p className="mt-1 text-sm text-zinc-300">{concept.example}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <p className="text-sm text-zinc-300">{c.platformNote}</p>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
