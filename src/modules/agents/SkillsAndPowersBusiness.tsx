import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { skillsAndPowersSv, skillsAndPowersKo } from './translations'

interface Capability {
  name: string
  analogy: string
  whatItIs: string
  example: string
  bestFor: string
  color: string
}

const CAPABILITIES: Capability[] = [
  {
    name: 'MCP Servers (tools)',
    analogy: 'A power outlet — plug in any appliance',
    whatItIs: 'A universal connector that lets AI access one specific external system. An MCP server for Salesforce lets any AI tool read and write CRM data. One connector, many AI clients.',
    example: 'Your company builds an MCP server for your internal ticketing system. Now Claude, Kiro, Amazon Q, and any other MCP-compatible tool can create, read, and update tickets — without building separate integrations for each.',
    bestFor: 'Connecting AI to a specific tool or data source. The building block everything else is built on.',
    color: 'border-emerald-500/30 bg-emerald-500/5',
  },
  {
    name: 'Skills (behavioral expertise)',
    analogy: 'A training manual for a specific job',
    whatItIs: 'A package that teaches an agent HOW to do something — not just what tools to use, but the workflow, best practices, and decision logic. Skills combine tools with instructions and domain knowledge.',
    example: 'A "customer onboarding" skill doesn\'t just connect to your CRM — it knows the 7-step onboarding process, which emails to send at each stage, what data to collect, and when to escalate to a human.',
    bestFor: 'Encoding your team\'s expertise into a repeatable, automated workflow. Turning tribal knowledge into something an agent can follow.',
    color: 'border-amber-500/30 bg-amber-500/5',
  },
  {
    name: 'Kiro Powers',
    analogy: 'A specialist consultant who arrives with their own toolkit',
    whatItIs: 'Curated packages for the Kiro IDE that bundle MCP servers, best-practice guidelines, and automation hooks for a specific technology or workflow. When you mention a relevant keyword, Kiro automatically loads the right Power.',
    example: 'The "AWS Observability" Power gives Kiro knowledge of CloudWatch, X-Ray, and monitoring best practices. Say "add logging" and Kiro knows your company\'s logging standards, which services to use, and how to configure them.',
    bestFor: 'Software development teams who want AI coding assistance that follows specific technology standards and best practices.',
    color: 'border-purple-500/30 bg-purple-500/5',
  },
  {
    name: 'A2A (Agent-to-Agent)',
    analogy: 'A phone system between departments',
    whatItIs: 'A protocol for agents to talk to OTHER agents — discover what they can do, send requests, and get results back. Unlike MCP (agent → tool), A2A is agent → agent.',
    example: 'Your HR agent receives a new hire request. It calls the IT agent (via A2A) to provision a laptop and accounts, calls the facilities agent to assign a desk, and calls the payroll agent to set up compensation — each is a separate agent owned by a different team.',
    bestFor: 'Cross-team automation where different departments have their own agents that need to collaborate.',
    color: 'border-cyan-500/30 bg-cyan-500/5',
  },
]

export const SkillsAndPowersBusiness: React.FC = () => {
  const c = useT({
    title: '5. Tools, Skills, and Powers — What is the Difference?',
    intro: 'You will hear these terms thrown around. They are related but solve different problems — like the difference between having a hammer (tool), knowing how to build a cabinet (skill), and hiring a carpenter who brings their own tools and expertise (power).',
  }, { sv: skillsAndPowersSv, ko: skillsAndPowersKo })
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="skills-biz">
      <h2 id="skills-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">
        5. Tools, Skills, and Powers — What&apos;s the Difference?
      </h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        {c.intro}<strong className="text-zinc-100">having a hammer</strong> (tool),
        <strong className="text-zinc-100"> knowing how to build a cabinet</strong> (skill), and
        <strong className="text-zinc-100"> hiring a carpenter who brings their own tools and expertise</strong> (power).
      </p>

      <div className="mb-8 space-y-2">
        {CAPABILITIES.map((c, i) => (
          <div key={i} className={`rounded-lg border ${c.color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="min-w-0">
                <span className="text-sm font-medium text-zinc-100">{c.name}</span>
                <span className="ml-2 text-xs text-zinc-500">— {c.analogy}</span>
              </div>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-800 px-5 py-4">
                <p className="text-sm text-zinc-300">{c.whatItIs}</p>
                <div className="rounded-lg bg-zinc-800/50 p-3">
                  <p className="text-xs font-medium text-zinc-500">Example</p>
                  <p className="mt-1 text-sm text-zinc-300">{c.example}</p>
                </div>
                <p className="text-xs text-zinc-400"><strong className="text-zinc-300">Best for:</strong> {c.bestFor}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick comparison */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 overflow-hidden">
        <div className="border-b border-zinc-700 bg-zinc-800 px-4 py-2">
          <span className="text-xs font-medium text-zinc-400">When to use what</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-800/50">
                <th className="px-3 py-2 text-left text-zinc-400">You want to...</th>
                <th className="px-3 py-2 text-left text-zinc-400">Use</th>
              </tr>
            </thead>
            <tbody>
              {[
                { want: 'Connect AI to your CRM, database, or API', use: 'MCP Server' },
                { want: 'Automate a multi-step business process', use: 'Skill (MCP + workflow logic)' },
                { want: 'Give your coding AI expertise in a specific technology', use: 'Kiro Power' },
                { want: 'Let agents from different teams collaborate', use: 'A2A Protocol' },
                { want: 'All of the above in a managed platform', use: 'Amazon Bedrock AgentCore' },
              ].map((row) => (
                <tr key={row.want} className="border-b border-zinc-800/50 last:border-0">
                  <td className="px-3 py-2 text-zinc-300">{row.want}</td>
                  <td className="px-3 py-2 font-medium text-amber-300">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
