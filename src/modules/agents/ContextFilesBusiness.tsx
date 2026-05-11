import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'

interface ContextFile {
  name: string
  analogy: string
  whatItIs: string
  example: string
  whoUsesIt: string
  color: string
}

// All content below is verified from official sources (October–December 2025 launches):
// - AGENTS.md   — open standard, Agentic AI Foundation (Linux Foundation), Dec 2025
// - SKILL.md    — Anthropic Agent Skills, agentskills.io, Dec 18 2025
// - Kiro steering — kiro.dev/docs/cli/steering
// - Custom Instructions / Custom GPTs — OpenAI help docs

const FILES: ContextFile[] = [
  {
    name: 'AGENTS.md',
    analogy: 'A README written for the AI, not the humans',
    whatItIs:
      'A markdown file at the root of a code project that tells any AI coding tool how to work on the project — setup commands, testing rules, code style, what NOT to touch. Adopted across 60,000+ repositories and supported by Codex, Claude Code, Cursor, Aider, and Kiro.',
    example:
      'Your engineering team adds an AGENTS.md to the repo. Now whether someone uses Claude Code, Codex, or Kiro, the AI follows the same rules: same test commands, same code style, same PR title format. No more &quot;the AI keeps using yarn even though we use pnpm.&quot;',
    whoUsesIt:
      'Engineers and engineering managers — but you do NOT have to write code to add one. Many teams have a tech writer or PM contribute to it.',
    color: 'border-emerald-500/30 bg-emerald-500/5',
  },
  {
    name: 'SKILL.md',
    analogy: 'A training manual for one specific task — packaged so any AI can use it',
    whatItIs:
      'A folder containing instructions for a specific workflow, designed so any compatible AI tool loads it on demand. The file has a description (so the AI knows when to use it) and a body (the actual steps). Created by Anthropic and now an open standard.',
    example:
      '"How we file expense reports" becomes a SKILL.md. Whenever any team member asks an AI to file an expense, the AI auto-loads the skill, follows the 5 steps, knows which approver to tag, and pulls the right policy from the company handbook.',
    whoUsesIt:
      'Operations, finance, HR, customer success — anyone with repeatable processes. Plus engineering. The skill format is just markdown, so domain experts can write the body themselves.',
    color: 'border-amber-500/30 bg-amber-500/5',
  },
  {
    name: 'Custom Instructions',
    analogy: 'Your personal preferences, set once',
    whatItIs:
      'A free-form text field in ChatGPT, Claude, Gemini, and similar tools where you describe yourself and how you want responses formatted. Applied to every new conversation automatically. Found in Settings → Personalization → Custom Instructions in ChatGPT.',
    example:
      '"I\'m a marketing manager at a B2B SaaS company. Always respond in plain language without jargon. Keep emails under 150 words. When I ask for analysis, give me the conclusion first and the supporting evidence second."',
    whoUsesIt:
      'Every individual user. Takes 5 minutes. Improves every conversation forever.',
    color: 'border-blue-500/30 bg-blue-500/5',
  },
  {
    name: 'Custom GPTs / Claude Projects / Quick Apps',
    analogy: 'A purpose-built assistant your team can share',
    whatItIs:
      'A configured AI assistant with persistent instructions, optional connected documents, and (sometimes) connected tools. ChatGPT calls them &quot;Custom GPTs&quot;, Claude calls them &quot;Projects&quot;, Amazon Quick calls them &quot;Apps&quot; or &quot;Custom chat agents.&quot; Same idea, different names.',
    example:
      'Your team builds a &quot;Brand Voice Editor&quot; in ChatGPT that knows your brand guide, your forbidden words, your preferred tone. Anyone in marketing can ask it to review copy and get consistent feedback — no need to re-paste the brand guide every time.',
    whoUsesIt:
      'Team leads and power users (build them once); the whole team consumes them. For company-wide use, IT/admins build them in Amazon Quick or Microsoft Copilot Studio.',
    color: 'border-purple-500/30 bg-purple-500/5',
  },
  {
    name: 'Kiro steering',
    analogy: 'Project knowledge that&apos;s always loaded',
    whatItIs:
      'Markdown files in a hidden .kiro/steering/ folder that give AWS&apos;s Kiro coding tool persistent context about your project — what it does, what stack it uses, what the conventions are. Kiro reads these every time so your team doesn&apos;t have to repeat themselves.',
    example:
      'Your team standardizes on TypeScript with strict mode and forbids the axios library. You write that in tech.md. Kiro reads it on every new chat and never suggests axios or loose typing again.',
    whoUsesIt:
      'Engineering teams using Kiro (AWS&apos;s AI coding tool, replacement for Amazon Q Developer).',
    color: 'border-cyan-500/30 bg-cyan-500/5',
  },
]

const EN = {
  title: '5. The Hidden Files That Program AI Tools',
  intro:
    'Modern AI tools are increasingly programmed by markdown files, not code. Some are personal (Custom Instructions), some are shared with your team (Custom GPTs, Quick apps), some live in code projects (AGENTS.md, SKILL.md). You don&apos;t need to be technical to write any of them.',
  whyItMatters: 'Why this matters for non-engineers',
  whyItMattersText:
    'Five years ago, customizing software meant filing a ticket with IT. Today, customizing your AI tool is a markdown file you write yourself. The teams getting the most out of AI in 2026 are the ones who realized this and started writing skills, custom GPTs, and project context — not the ones with the biggest IT budget.',
  selfExplainPrompt:
    'Pick a repetitive task your team does (e.g. handling new customer inquiries, drafting QBR slides, reviewing contracts). Which of the formats above would be the right home for the rules and steps your team follows? Why?',
  selfExplainAnswer:
    'For most repetitive team tasks, a Custom GPT (or Claude Project, or Amazon Quick App) is the right starting point — anyone in the team can use it, and it does not require engineering. Move to a SKILL.md only if you need the same workflow to work across multiple AI tools (e.g. ChatGPT + Claude Code + Kiro all running through it). AGENTS.md is for code repositories. Custom Instructions are personal — useful for personal preferences, not team workflows.',
}

export const ContextFilesBusiness: React.FC = () => {
  const c = useT(EN, {})
  const [expanded, setExpanded] = useState<number | null>(0)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="context-files-biz">
      <h2 id="context-files-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300" dangerouslySetInnerHTML={{ __html: c.intro }} />

      <div className="mb-6 space-y-2">
        {FILES.map((f, i) => (
          <div key={i} className={`rounded-lg border ${f.color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="min-w-0">
                <span className="text-sm font-medium text-zinc-100">{f.name}</span>
                <span className="ml-2 text-xs text-zinc-500">— {f.analogy}</span>
              </div>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-800 px-5 py-4">
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">What it actually is</p>
                  <p className="text-sm text-zinc-300" dangerouslySetInnerHTML={{ __html: f.whatItIs }} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">Concrete example</p>
                  <p className="text-sm text-zinc-300" dangerouslySetInnerHTML={{ __html: f.example }} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">Who actually writes one</p>
                  <p className="text-sm text-zinc-300" dangerouslySetInnerHTML={{ __html: f.whoUsesIt }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
        <p className="mb-2 text-sm font-medium text-amber-300">{c.whyItMatters}</p>
        <p className="text-sm text-zinc-300">{c.whyItMattersText}</p>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
