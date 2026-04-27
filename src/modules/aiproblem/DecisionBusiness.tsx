import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useT } from '../../useT'
import { decisionSv, decisionKo } from './translations'

const ICONS: IconName[] = ['clipboard', 'bar-chart', 'chat', 'file']
const COLORS = ['border-zinc-500/30 bg-zinc-800', 'border-emerald-500/30 bg-emerald-500/5', 'border-amber-500/30 bg-amber-500/5', 'border-purple-500/30 bg-purple-500/5']

const EN = {
  title: '2. Should You Use AI for This?',
  intro: 'Not every problem needs AI. Sometimes a spreadsheet, a checklist, or a simple rule is better. The key question is: are there clear rules, or does it require judgment?',
  introSub: 'Think of it this way: if you can write the complete instructions on a single page, you probably don\'t need AI. If it takes years of experience to do well, AI might help.',
  scenarios: [
    { task: 'Calculate employee bonuses based on a fixed formula', answer: 'No AI needed', why: 'The rules are fixed and exact — like following a recipe step by step. A spreadsheet formula does this perfectly. AI would add complexity and might even get the numbers wrong.' },
    { task: 'Predict which customers are likely to cancel next quarter', answer: 'Machine Learning', why: 'There\'s historical data (past cancellations) and patterns to find (usage dropping, fewer logins). ML learns these patterns from examples — like a sales rep who develops a gut feeling for at-risk accounts, but backed by data.' },
    { task: 'Answer employee questions about company policies', answer: 'LLM + your documents', why: 'Employees ask questions in natural language ("can I carry over vacation days?"). An LLM can understand the question, search your policy docs, and give a clear answer — like having an always-available HR assistant.' },
    { task: 'Summarize a 50-page contract and flag key risks', answer: 'LLM', why: 'This requires reading, understanding context, and making judgments about what matters — exactly what LLMs are good at. Like asking a junior lawyer to do a first pass, but in 30 seconds.' },
  ],
  bestFitLabel: 'Best fit:',
  selfExplainPrompt: 'Think of a task at your job that takes a lot of time. Would AI help? Is it rule-based (spreadsheet), pattern-based (ML), or language-based (LLM)?',
  selfExplainAnswer: 'Example: \'I spend 2 hours every Monday categorizing support tickets by priority.\' This is pattern-based — there\'s historical data on how tickets were categorized, and the task requires reading the ticket text and making a judgment call. An LLM could read each ticket and categorize it based on past patterns, saving most of that time.',
}

export const DecisionBusiness: React.FC = () => {
  const c = useT(EN, { sv: decisionSv, ko: decisionKo })

  return (
    <section aria-labelledby="decision-biz">
      <h2 id="decision-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>
      <p className="mb-6 max-w-2xl text-sm text-zinc-400">{c.introSub}</p>

      <InteractiveDemo
        title={c.title}
        steps={c.scenarios.map((s, i) => (
          <div key={i} className={`rounded-lg border p-5 ${COLORS[i]}`}>
            <p className="mb-3 text-sm font-medium text-zinc-100"><Icon name={ICONS[i]} className="mr-1 inline" /> &quot;{s.task}&quot;</p>
            <div className="mb-3 inline-block rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-amber-300">{c.bestFitLabel} {s.answer}</div>
            <p className="text-sm leading-relaxed text-zinc-300">{s.why}</p>
          </div>
        ))}
      />

      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
