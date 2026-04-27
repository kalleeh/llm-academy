import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../useT'
import { choosingSv, choosingKo } from './translations'

export const ChoosingModelsBusiness: React.FC = () => {
  const c = useT({ title: '2. Choosing the Right AI Model' , tipsTitle: 'Reading AI leaderboards (like reading product reviews)', selfExplainPrompt: 'How would you evaluate whether an AI chatbot is working well for your customer support team?', intro: 'Choosing an AI model is like hiring for a specific role', introSub: 'A PhD in physics is impressive, but you wouldn\'t hire them for a receptionist role.'}, { sv: choosingSv, ko: choosingKo })
  return (
  <section aria-labelledby="choosing-biz">
    <h2 id="choosing-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
    <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300">
{c.intro}
    </p>
    <p className="mb-6 max-w-2xl text-sm text-zinc-400">
{c.introSub}
    </p>

    <div className="mb-8 space-y-3">
      {[
        { model: 'Large frontier models (GPT-4o, Claude Sonnet, Gemini Pro)', fit: 'Complex reasoning, nuanced writing, multi-step tasks', analogy: 'The senior consultant — expensive but handles the hard stuff', cost: '$$$', speed: 'Slower', color: 'border-purple-500/30 bg-purple-500/5' },
        { model: 'Mid-size models (Claude Haiku, Amazon Nova Pro, Gemini Flash)', fit: 'Most everyday tasks — summaries, Q&A, classification, drafting', analogy: 'The reliable full-time employee — good at most things, cost-effective', cost: '$$', speed: 'Fast', color: 'border-blue-500/30 bg-blue-500/5' },
        { model: 'Small/specialized models (Amazon Nova Micro, Mistral Small)', fit: 'One specific task done very well — like classifying tickets or extracting data', analogy: 'The specialist contractor — does one thing, does it fast and cheap', cost: '$', speed: 'Fastest', color: 'border-emerald-500/30 bg-emerald-500/5' },
      ].map((m) => (
        <div key={m.model} className={`rounded-lg border p-5 ${m.color}`}>
          <p className="mb-1 text-sm font-semibold text-zinc-100">{m.model}</p>
          <p className="mb-2 text-xs text-zinc-500 italic">{m.analogy}</p>
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded bg-zinc-800/50 px-3 py-2"><span className="text-xs text-zinc-500">Best for: </span><span className="text-xs text-zinc-300">{m.fit}</span></div>
            <div className="rounded bg-zinc-800/50 px-3 py-2"><span className="text-xs text-zinc-500">Cost: </span><span className="text-xs text-amber-300">{m.cost}</span></div>
            <div className="rounded bg-zinc-800/50 px-3 py-2"><span className="text-xs text-zinc-500">Speed: </span><span className="text-xs text-amber-300">{m.speed}</span></div>
          </div>
        </div>
      ))}
    </div>

    <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
      <p className="mb-3 text-sm font-medium text-zinc-100">{c.tipsTitle}</p>
      <p className="mb-3 text-sm text-zinc-300">
        {c.intro}
        Simply: they gave the AI a standardized test and it got 92% right. Like a student&apos;s exam score.
      </p>
      <div className="space-y-2">
        {[
          { tip: 'Look at the tasks that match YOUR use case', detail: 'A model that\'s great at math might be mediocre at writing. Check the scores for what you actually need.' },
          { tip: 'Benchmarks ≠ real-world performance', detail: 'Like how a great interview candidate might struggle on the actual job. Always test with YOUR data and YOUR tasks.' },
          { tip: 'Cost and speed matter as much as quality', detail: 'A model that\'s 5% more accurate but 10× more expensive and 3× slower might not be worth it.' },
          { tip: 'Platforms let you switch easily', detail: 'Services like Amazon Bedrock give you access to 100+ models through one API — test Claude, Llama, Nova, and Mistral side by side without changing your code.' },
        ].map((t) => (
          <div key={t.tip} className="rounded bg-zinc-800/50 px-4 py-3">
            <p className="text-sm text-zinc-200">{t.tip}</p>
            <p className="mt-1 text-xs text-zinc-500">{t.detail}</p>
          </div>
        ))}
      </div>
    </div>

    <SelfExplain
      prompt="How would you evaluate whether an AI chatbot is working well for your customer support team? What specific things would you measure, and how?"
      modelAnswer="I'd measure: (1) Accuracy — sample 100 conversations per week and have a human grade whether the AI's answers were correct. Target: 95%+. (2) Customer satisfaction — add a thumbs up/down after each AI response. Track the ratio. (3) Resolution rate — what % of conversations does the AI handle without needing a human? (4) Response time — is it faster than human agents? (5) Escalation quality — when it hands off to a human, does it provide good context? (6) Cost per conversation — compare AI cost vs human agent cost. I'd run this evaluation weekly for the first month, then monthly once it stabilizes."
    />
  </section>
  )
}
