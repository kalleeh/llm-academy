import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'

interface Concept {
  name: string
  analogy: string
  whatItIs: string
  whereYouSeeIt: string
  doIneedToDoSomething: string
  whyCare: string
  example: string
  color: string
}

// Verified May 2026:
// - MCP (Model Context Protocol): open standard from Anthropic, adopted by OpenAI,
//   Google, Microsoft, AWS. Hundreds of public MCP servers (mcp.so registry, etc.).
//   The "thousands of connectors" claim refers to total community-built MCP servers.
// - Skills (SKILL.md): Anthropic, launched Oct 2025, open standard Dec 2025.
// - Kiro Powers: AWS Kiro feature — bundled MCP servers + steering for a tech domain.
// - A2A: Google-led protocol launched April 2025; donated to Linux Foundation.

const CONCEPTS: Concept[] = [
  {
    name: 'MCP — connecting AI to your tools',
    analogy: 'Universal access badges for your systems',
    whatItIs:
      'An open standard (often called the "USB-C of AI") that lets any AI tool talk to any external system through one protocol. Built by Anthropic, adopted across the industry. Hundreds of public connectors exist for things like GitHub, Slack, Salesforce, Postgres, Google Drive, Jira, Linear, Notion.',
    whereYouSeeIt:
      'When you click "Connect to Slack" or "Connect to Salesforce" inside a Claude Project, Custom GPT, Cursor, or Kiro — that&apos;s often an MCP connection under the hood. Your IT admin sees them in tool settings as "MCP servers" or "connectors."',
    doIneedToDoSomething:
      'Usually no — the AI tool comes with a list of pre-built MCP connectors. You just click "connect" and authorise. For non-standard internal systems, your engineering team might build a custom MCP server (a one-time effort).',
    whyCare:
      'Without MCP your AI is a smart text box. With MCP it can read your real data and take real actions — file a Jira ticket, query your database, send a Slack message. This is where AI stops being a chat toy and starts replacing busywork.',
    example:
      'Your team installs the GitHub MCP server. Now everyone&apos;s AI tool — Claude, Cursor, Kiro — can review pull requests, file issues, and read code in your private repos. One install, every tool benefits.',
    color: 'border-emerald-500/30 bg-emerald-500/5',
  },
  {
    name: 'Skills — packaged expertise for AI',
    analogy: 'A training manual for one specific task — packaged so any AI can use it',
    whatItIs:
      'A folder of instructions (a SKILL.md file) that teaches an AI HOW to do one thing — the workflow, decision rules, edge cases. Skills are an open standard from Anthropic. The AI loads only the skills it needs, when it needs them.',
    whereYouSeeIt:
      'A "Skills" panel in Claude or Anthropic&apos;s API console. A "skills/" folder in a code repo. A library of installable skills inside Microsoft Agent Framework or Amazon Quick. The newest tools list available skills like an app store.',
    doIneedToDoSomething:
      'You can use skills others have built (more like installing an app) without writing one. Writing one is a markdown file — no code required. Operations, HR, finance teams write skills for their own processes.',
    whyCare:
      'Without a skill, you have to re-explain a multi-step process to AI every time. With a skill, the AI just knows how your team files an expense, runs a release, or onboards a customer — once and forever, no matter which AI tool the user picks.',
    example:
      'Your finance team writes an "expense-policy" skill. From then on, anyone in the company who asks any AI tool to file an expense gets the right approver, right policy version, and right escalation path — automatically.',
    color: 'border-amber-500/30 bg-amber-500/5',
  },
  {
    name: 'Kiro Powers — bundled expertise for developers',
    analogy: 'A specialist consultant who arrives with their own toolkit',
    whatItIs:
      'A Kiro-specific feature: curated bundles of MCP servers + best-practice rules + automation hooks for a specific tech domain. Think "AWS Observability Power" or "Feature Flags Power."',
    whereYouSeeIt:
      'Inside the Kiro IDE — in the Powers panel. When you mention a relevant keyword, Kiro auto-loads the right Power.',
    doIneedToDoSomething:
      'Engineering teams using Kiro can install Powers from the marketplace. Other teams don&apos;t need to do anything — Powers are an engineering tool.',
    whyCare:
      'For engineering managers: Powers let you encode "how we do AWS observability" or "how we use feature flags" as a shareable bundle. Newcomers get up to speed in days, not months.',
    example:
      'Your team installs the "AWS Observability" Power. Now every engineer using Kiro automatically gets your company&apos;s logging conventions, your CloudWatch dashboards, and your incident playbooks — without having to learn them from scratch.',
    color: 'border-purple-500/30 bg-purple-500/5',
  },
  {
    name: 'A2A — agents talking to other agents',
    analogy: 'Departments sending requests to each other',
    whatItIs:
      'Where MCP connects an agent to TOOLS, A2A (Agent-to-Agent) connects an agent to OTHER AGENTS. Created by Google in 2025, donated to the Linux Foundation. Backed by 100+ organisations.',
    whereYouSeeIt:
      'Mostly behind the scenes today — but you&apos;ll see it as "agent marketplaces" emerge: a Salesforce agent calling an Atlassian agent, your support agent delegating to a billing agent. The user just sees one conversation; behind the scenes, multiple agents collaborated.',
    doIneedToDoSomething:
      'For most teams, no action needed in 2026. As more vendors ship A2A-compatible agents, this becomes the plumbing for cross-system AI workflows.',
    whyCare:
      'A2A is the difference between "10 disconnected AI tools" and "your AI tools work together." Today most companies have the disconnected version. Watch this space over the next 12-18 months.',
    example:
      'A customer asks your support agent for a refund. Via A2A, the support agent delegates to the billing agent (which has the actual access to issue refunds). The user sees one smooth response; two agents collaborated.',
    color: 'border-cyan-500/30 bg-cyan-500/5',
  },
]

const PLATFORM_NOTE = `Platforms like Amazon Bedrock AgentCore, Microsoft Copilot Studio, and Salesforce Agentforce wrap all of this together — they manage which model runs, which tools are available, how memory works, what limits apply. Most companies don't build this from scratch; they pick a platform that fits their existing stack.`

const KEY_INSIGHT = `Notice the pattern: most of these are open standards, not vendor lock-in. MCP, Agent Skills, A2A — all donated to the Linux Foundation under the Agentic AI Foundation (December 2025). That means a skill or MCP connector you write or buy works across vendors. This is rare in enterprise software and worth pushing your AI tool vendors to honour.`

const EN = {
  title: '4. How Agents Connect to Everything',
  intro:
    'An agent is only useful if it can do things. Here is how the ecosystem fits together — what each piece does, where you actually see it in your tools, and whether you need to do anything about it.',
  platformNote: PLATFORM_NOTE,
  insightTitle: 'The pattern: open standards, not lock-in',
  insightText: KEY_INSIGHT,
  selfExplainPrompt:
    'Think of a multi-step process at your company that involves multiple systems (e.g. closing a deal, onboarding a hire, processing a refund). Which of the four concepts above would each step rely on?',
  selfExplainAnswer:
    'Example — closing a deal: (1) MCP connects the agent to your CRM, email, calendar, project management, and billing systems. (2) A "deal-close" Skill encodes your team&apos;s 6-step workflow. (3) Powers are not relevant here (engineering-specific). (4) A2A could come into play if the deal-close agent has to delegate billing setup to a finance team agent. The platform (Quick / Copilot Studio / Agentforce) ties them all together at runtime.',
}

export const HowAgentsConnectBusiness: React.FC = () => {
  const c = useT(EN, {})
  const [expanded, setExpanded] = useState<number | null>(0)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="connect-biz">
      <h2 id="connect-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="mb-6 space-y-2">
        {CONCEPTS.map((concept, i) => (
          <div key={i} className={`rounded-lg border ${concept.color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="min-w-0">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{concept.name}</span>
                <span className="ml-2 text-xs text-zinc-500">— {concept.analogy}</span>
              </div>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4 text-sm">
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">What it actually is</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: concept.whatItIs }} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">Where you&apos;ll see it in real life</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: concept.whereYouSeeIt }} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-amber-300">Do you need to do anything?</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: concept.doIneedToDoSomething }} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-emerald-400">Why you should care</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: concept.whyCare }} />
                </div>
                <div className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3">
                  <p className="mb-1 text-xs font-medium text-zinc-500">Concrete example</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: concept.example }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
        <p className="mb-2 text-sm font-medium text-amber-300">{c.insightTitle}</p>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{c.insightText}</p>
      </div>

      <div className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{c.platformNote}</p>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
