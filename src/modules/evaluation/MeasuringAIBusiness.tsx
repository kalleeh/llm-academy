import { InteractiveDemo } from '../../components/InteractiveDemo'
import { useT } from '../../i18n'
import { measuringSv, measuringKo } from './translations'

const RATINGS = [
  {
    question: 'What is our refund policy for annual subscriptions?',
    good: 'Annual subscriptions can be refunded within 30 days of purchase. After 30 days, we offer a prorated credit for the remaining months. Contact support@example.com to request a refund.',
    bad: 'We generally offer refunds for subscriptions. You should be able to get your money back if you contact us. Our policy is customer-friendly and we aim to resolve all issues promptly.',
    why: 'The good answer is specific, cites the actual policy, and gives actionable next steps. The bad answer is vague, non-committal, and could apply to any company.',
  },
  {
    question: 'Can I integrate your product with Salesforce?',
    good: 'Yes, we have a native Salesforce integration. It syncs contacts, deals, and activities bi-directionally. Setup takes about 15 minutes — here\'s our guide: docs.example.com/salesforce',
    bad: 'Our product integrates with many popular CRM platforms including Salesforce, HubSpot, and others. Integration capabilities vary by plan. Please contact our sales team for more details about specific integrations.',
    why: 'The good answer directly answers yes/no, explains what it does, and links to setup. The bad answer dodges the question and pushes to sales.',
  },
]

export const MeasuringAIBusiness: React.FC = () => {
  const c = useT({ title: '1. How to Tell If Your AI Is Working' , intro: '"It seems pretty good" isn\'t good enough.', introSub: 'Think of it like quality assurance before launching a product — test it systematically, not just casually.', goodAnswerLabel: 'Good answer', badAnswerLabel: 'Bad answer'}, { sv: measuringSv, ko: measuringKo })
  return (
  <section aria-labelledby="measuring-biz">
    <h2 id="measuring-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
    <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300">
{c.intro}
    </p>
    <p className="mb-6 max-w-2xl text-sm text-zinc-400">
{c.introSub}
    </p>

    <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {[
        { metric: 'Accuracy', question: 'How often is it right?', analogy: 'Like checking a new hire\'s work for errors', color: 'text-emerald-400' },
        { metric: 'Relevance', question: 'Does it answer the actual question?', analogy: 'Like asking for directions and getting a history lesson instead', color: 'text-blue-400' },
        { metric: 'Safety', question: 'Does it ever say something harmful?', analogy: 'Like reviewing what a new employee says to customers', color: 'text-red-400' },
        { metric: 'Speed', question: 'How fast does it respond?', analogy: 'Customers won\'t wait 30 seconds for an answer', color: 'text-amber-400' },
        { metric: 'Cost', question: 'How much per answer?', analogy: 'Like tracking cost-per-ticket in support', color: 'text-purple-400' },
        { metric: 'Consistency', question: 'Same question, same quality?', analogy: 'Like ensuring every branch gives the same service', color: 'text-cyan-400' },
      ].map((m) => (
        <div key={m.metric} className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
          <p className={`text-sm font-semibold ${m.color}`}>{m.metric}</p>
          <p className="mt-1 text-sm text-zinc-200">{m.question}</p>
          <p className="mt-2 text-xs text-zinc-500 italic">{m.analogy}</p>
        </div>
      ))}
    </div>

    <InteractiveDemo
      title="Good vs Bad AI Answers"
      description="Compare these real-world examples. What makes one answer better than the other?"
      steps={RATINGS.map((r) => (
        <div key={r.question} className="space-y-3">
          <p className="text-sm font-medium text-zinc-100">Customer asks: &quot;{r.question}&quot;</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <p className="mb-2 text-xs font-medium text-emerald-400">{c.goodAnswerLabel}</p>
              <p className="text-sm text-zinc-300">{r.good}</p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <p className="mb-2 text-xs font-medium text-red-400">{c.badAnswerLabel}</p>
              <p className="text-sm text-zinc-300">{r.bad}</p>
            </div>
          </div>
          <p className="text-xs text-zinc-400">{r.why}</p>
        </div>
      ))}
    />
  </section>
  )
}
