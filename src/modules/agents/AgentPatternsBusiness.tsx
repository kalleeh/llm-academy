import { useState, useCallback } from 'react'
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { useT } from '../../useT'
import { patternsSv, patternsKo } from './translations'

interface Pattern {
  name: string
  analogy: string
  howItWorks: string
  bestFor: string
  realExample: string
  color: string
}

const PATTERNS: Pattern[] = [
  {
    name: 'Single Agent',
    analogy: 'One assistant handling everything',
    howItWorks: 'One AI agent receives the task, figures out the steps, and does them all. Simple and fast for straightforward tasks.',
    bestFor: 'Tasks with clear steps that one person could handle — answering questions, filling forms, simple lookups.',
    realExample: 'A customer asks "what\'s my order status?" The agent checks the order system and responds. Done in one go.',
    color: 'border-blue-500/30 bg-blue-500/5',
  },
  {
    name: 'Handoff (Routing)',
    analogy: 'A receptionist directing you to the right department',
    howItWorks: 'A "router" agent figures out what kind of request this is, then hands it off to a specialist agent. Like calling a company and being transferred to the right department.',
    bestFor: 'When you have different types of requests that need different expertise — support vs. sales vs. billing.',
    realExample: 'Customer writes in. Router agent detects it\'s a billing issue and hands off to the billing specialist agent, which has access to payment systems.',
    color: 'border-emerald-500/30 bg-emerald-500/5',
  },
  {
    name: 'Multi-Agent Team',
    analogy: 'A project team where each person has a role',
    howItWorks: 'Multiple specialized agents work together, each handling their part. One might research, another writes, another reviews — like a team collaborating on a project.',
    bestFor: 'Complex tasks that benefit from different perspectives or skills — report generation, research projects, content creation.',
    realExample: 'Creating a market analysis: one agent gathers data, another analyzes trends, a third writes the executive summary, and a fourth checks the numbers.',
    color: 'border-purple-500/30 bg-purple-500/5',
  },
  {
    name: 'Human-in-the-Loop',
    analogy: 'An assistant who checks with you before big decisions',
    howItWorks: 'The agent does the work but pauses at key decision points to get your approval. Like an assistant who drafts the email but waits for you to hit send.',
    bestFor: 'High-stakes tasks where mistakes are costly — financial transactions, customer communications, legal documents.',
    realExample: 'Agent prepares a contract amendment, shows you the changes, and waits for your "looks good" before sending it to the client.',
    color: 'border-amber-500/30 bg-amber-500/5',
  },
]

const DECISION_QUESTIONS = [
  {
    question: 'How complex is the task?',
    simple: 'Single agent — keep it simple',
    complex: 'Multi-agent team — divide and conquer',
  },
  {
    question: 'How risky are mistakes?',
    simple: 'Let the agent run autonomously',
    complex: 'Add human-in-the-loop checkpoints',
  },
  {
    question: 'Are there different request types?',
    simple: 'One agent handles all',
    complex: 'Router + specialist agents',
  },
  {
    question: 'How fast does it need to be?',
    simple: 'Single agent is fastest',
    complex: 'Multi-agent adds latency but improves quality',
  },
]

export const AgentPatternsBusiness: React.FC = () => {
  const c = useT({ title: '3. How to Set Up Agents for Your Team' , patterns: PATTERNS, intro: 'There\'s no one-size-fits-all.'}, { sv: patternsSv, ko: patternsKo })
  const [showDecision, setShowDecision] = useState(false)

  const toggleDecision = useCallback(() => {
    setShowDecision((prev) => !prev)
  }, [])

  return (
    <section aria-labelledby="patterns-biz">
      <h2 id="patterns-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">
        {c.title}
      </h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        {c.intro}
      </p>

      <InteractiveDemo
        title="Agent Patterns"
        description="Four common ways to organize AI agents — from simple to sophisticated."
        steps={c.patterns.map((p, i) => (
          <div key={p.name} className={`rounded-lg border p-5 ${(PATTERNS[i]?.color ?? "")}`}>
            <div className="mb-3">
              <span className="text-sm font-semibold text-zinc-100">{p.name}</span>
              <span className="ml-2 text-xs text-zinc-400">— {p.analogy}</span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-zinc-300">{p.howItWorks}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-zinc-800/50 p-3">
                <p className="text-xs font-medium text-zinc-500">Best for</p>
                <p className="mt-1 text-sm text-zinc-300">{p.bestFor}</p>
              </div>
              <div className="rounded-lg bg-zinc-800/50 p-3">
                <p className="text-xs font-medium text-zinc-500">Real example</p>
                <p className="mt-1 text-sm text-zinc-300">{p.realExample}</p>
              </div>
            </div>
          </div>
        ))}
      />

      {/* Quick decision guide */}
      <div className="mt-10">
        <button
          onClick={toggleDecision}
          className="mb-4 flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300"
          aria-expanded={showDecision}
        >
          <span>{showDecision ? '▾' : '▸'}</span>
          {c.title}
        </button>
        {showDecision && (
          <div className="space-y-3">
            {DECISION_QUESTIONS.map((dq, i) => (
              <div key={i} className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
                <p className="mb-2 text-sm font-medium text-zinc-200">{dq.question}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded bg-zinc-800/50 px-3 py-2 text-xs text-zinc-400">
                    <span className="text-emerald-400">Simple → </span>{dq.simple}
                  </div>
                  <div className="rounded bg-zinc-800/50 px-3 py-2 text-xs text-zinc-400">
                    <span className="text-amber-400">Complex → </span>{dq.complex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
