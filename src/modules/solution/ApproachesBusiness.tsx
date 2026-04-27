import { InteractiveDemo } from '../../components/InteractiveDemo'
import { useT } from '../../useT'
import { approachesSv, approachesKo } from './translations'

const APPROACHES = [
  {
    name: 'Prompt Engineering',
    plain: 'Just ask it well',
    analogy: 'Like learning to write better emails — same tool, much better results. You don\'t change the AI, you change how you talk to it.',
    when: 'You want quick results with no setup. The AI already knows enough — it just needs clear instructions.',
    effort: 'Minutes to hours',
    cost: 'Free (just your time)',
    color: 'border-emerald-500/30 bg-emerald-500/5',
  },
  {
    name: 'RAG (Retrieval)',
    plain: 'Give it a reference library',
    analogy: 'Like an open-book exam — instead of relying on memory, the AI looks up your company documents before answering. It can now answer questions about YOUR business, not just general knowledge.',
    when: 'You need answers based on your specific documents, policies, or data. Information changes frequently.',
    effort: 'Days to weeks',
    cost: 'Low to moderate',
    color: 'border-blue-500/30 bg-blue-500/5',
  },
  {
    name: 'Fine-Tuning',
    plain: 'Train it on your style',
    analogy: 'Like onboarding a new hire on your company\'s way of doing things. After training, they naturally write in your tone, follow your processes, and use your terminology — without being reminded every time.',
    when: 'You need consistent brand voice, domain-specific behavior, or specialized knowledge baked in.',
    effort: 'Weeks to months',
    cost: 'Moderate to high',
    color: 'border-purple-500/30 bg-purple-500/5',
  },
  {
    name: 'Custom Model',
    plain: 'Build from scratch',
    analogy: 'Like building a custom tool instead of buying off-the-shelf. Extremely expensive and time-consuming. Only makes sense for very large companies with very specific needs.',
    when: 'Almost never. Only if you\'re Google, Meta, or have a truly unique use case that nothing else can handle.',
    effort: 'Months to years',
    cost: 'Millions of dollars',
    color: 'border-red-500/30 bg-red-500/5',
  },
]

export const ApproachesBusiness: React.FC = () => {
  const c = useT({ title: '1. Four Ways to Use AI', intro: 'There\'s a spectrum from simple to complex. Most businesses should start at the simple end and only move up when they hit a real limitation.' , approaches: APPROACHES}, { sv: approachesSv, ko: approachesKo })
  return (
  <section aria-labelledby="approaches-biz">
    <h2 id="approaches-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
    <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
      {c.intro}
    </p>

    <InteractiveDemo
      title="From Simple to Complex"
      description="Step through the four approaches — most companies only need the first two."
      steps={c.approaches.map((a, i) => (
        <div key={a.name} className={`rounded-lg border p-5 ${(APPROACHES[i]?.color ?? "")}`}>
          <div className="mb-3 flex items-center gap-3">
            <span className="text-sm font-semibold text-zinc-100">{a.name}</span>
            <span className="text-xs text-zinc-400">— {a.plain}</span>
          </div>
          <p className="mb-3 text-sm leading-relaxed text-zinc-300">{a.analogy}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded bg-zinc-800/50 px-3 py-2">
              <p className="text-xs text-zinc-500">When to use</p>
              <p className="mt-1 text-xs text-zinc-300">{a.when}</p>
            </div>
            <div className="rounded bg-zinc-800/50 px-3 py-2">
              <p className="text-xs text-zinc-500">Effort</p>
              <p className="mt-1 text-xs text-amber-300">{a.effort}</p>
            </div>
            <div className="rounded bg-zinc-800/50 px-3 py-2">
              <p className="text-xs text-zinc-500">Cost</p>
              <p className="mt-1 text-xs text-amber-300">{a.cost}</p>
            </div>
          </div>
        </div>
      ))}
    />
  </section>
  )
}
