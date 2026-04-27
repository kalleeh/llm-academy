import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { cookbookSv, cookbookKo } from './translations'

const RECIPES = [
  { task: 'Summarize a meeting', category: 'Meetings', template: 'Summarize these meeting notes. Format:\n1. Key decisions made\n2. Action items (who, what, by when)\n3. Open questions for next meeting\n\nKeep it under 200 words. Here are the notes:\n[paste notes]', example: 'Key decisions: (1) Launch date moved to March 15. (2) Budget approved.\nAction items: Sarah — finalize vendor contract by Feb 28. Mike — update timeline by Feb 20.\nOpen questions: Do we need legal review?', color: 'border-blue-500/30 bg-blue-500/5' },
  { task: 'Draft a professional email', category: 'Email', template: 'Draft an email to [recipient/role]. Context: [situation]. Tone: [professional/friendly/formal]. Goal: [what you want them to do]. Keep it under [length]. Sign off as [your name].', example: 'A warm, concise email that acknowledges their busy schedule and proposes 3 new time slots.', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { task: 'Prepare for a meeting', category: 'Meetings', template: 'I have a meeting with [who] about [topic] in 30 minutes. Give me:\n1. Three key talking points\n2. Two questions I should ask\n3. One potential objection and how to handle it\n\nContext:\n[paste relevant info]', example: 'Talking points: (1) Contract renews in 6 weeks. (2) They mentioned a competitor. (3) Usage grew 40%.\nQuestions: What does success look like for Q3? Are there new teams that could benefit?', color: 'border-purple-500/30 bg-purple-500/5' },
  { task: 'Analyze feedback', category: 'Analysis', template: 'Analyze this [customer feedback / survey data]. Give me:\n1. Top 3 themes (with example quotes)\n2. Sentiment breakdown (positive / neutral / negative %)\n3. The #1 thing we should fix and why\n\n[paste data]', example: 'Top themes: (1) Onboarding is confusing — 34%. (2) Pricing is fair — 28%. (3) Support response time — 22%.\nPriority fix: Onboarding — #1 complaint, directly impacts first-month churn.', color: 'border-amber-500/30 bg-amber-500/5' },
  { task: 'Write a status update', category: 'Reporting', template: 'Write a weekly status update for [audience]. Format:\n- What we accomplished this week\n- What is planned for next week\n- Blockers or risks\n\nHere are my rough notes:\n[paste notes]', example: 'Accomplished: Shipped v2.3. Closed 3 enterprise deals ($180K). Hired senior engineer.\nNext week: Q2 planning. Customer advisory board Thursday.\nBlockers: Waiting on legal review for EMEA.', color: 'border-cyan-500/30 bg-cyan-500/5' },
  { task: 'Explain something simply', category: 'Communication', template: 'Explain [complex topic] to [audience] in plain language. Use an everyday analogy. Keep it under [length]. Avoid jargon.', example: '"Rate limiting is like a bouncer at a club — it controls how many requests can enter at once."', color: 'border-pink-500/30 bg-pink-500/5' },
]

const EN = {
  title: '3. Prompt Cookbook — Ready-to-Use Templates',
  intro: 'Stop staring at a blank chat window. These templates work for common office tasks — just fill in the brackets and go.',
  templateLabel: 'Template (copy and fill in the [brackets])',
  resultLabel: 'What you get back',
  proTipTitle: 'Pro tip: save your best prompts',
  proTipText: 'When you get a great result, save the prompt as a template. Share it with your team. Over time you build a library of proven prompts — like email templates, but for AI.',
}

export const CookbookBusiness: React.FC = () => {
  const c = useT(EN, { sv: cookbookSv, ko: cookbookKo })
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="cookbook-biz">
      <h2 id="cookbook-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="space-y-2">
        {RECIPES.map((r, i) => (
          <div key={i} className={`rounded-lg border ${r.color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div><span className="text-sm font-medium text-zinc-100">{r.task}</span><span className="ml-2 rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">{r.category}</span></div>
              <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-800 px-5 py-4">
                <div><p className="mb-1 text-xs font-medium text-zinc-500">{c.templateLabel}</p><pre className="rounded-lg bg-zinc-800 p-3 font-mono text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">{r.template}</pre></div>
                <div><p className="mb-1 text-xs font-medium text-zinc-500">{c.resultLabel}</p><div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3"><p className="text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">{r.example}</p></div></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <p className="mb-2 text-sm font-medium text-zinc-100">{c.proTipTitle}</p>
        <p className="text-sm text-zinc-300">{c.proTipText}</p>
      </div>
    </section>
  )
}
