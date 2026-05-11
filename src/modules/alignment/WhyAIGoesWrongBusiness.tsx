import { InteractiveDemo } from '../../components/InteractiveDemo'
import { useT } from '../../i18n'
import { whyAIGoesWrongSv, whyAIGoesWrongKo } from './translations'

const FAILURES = [
  {
    title: 'Hallucination — making things up',
    analogy: 'The colleague who never says "I don\'t know"',
    description: 'AI sometimes generates confident, plausible-sounding answers that are completely wrong — like a colleague who invents an answer rather than admitting they don\'t know.',
    example: 'A legal AI cited court cases that didn\'t exist. The lawyer submitted them to court without checking. Real case — happened in 2023.',
    risk: 'Decisions based on false information. Reputational damage. Legal liability.',
    color: 'border-red-500/30 bg-red-500/5',
  },
  {
    title: 'Bias — reflecting unfair patterns',
    analogy: 'A hiring panel that only knows one type of candidate',
    description: 'AI learns from historical data. If that data reflects past biases, the AI repeats them — like a hiring panel that unconsciously favors candidates who look like previous hires.',
    example: 'Amazon built a resume screening AI trained on 10 years of resumes submitted to the company. Since most applicants in tech were men, the system taught itself that male candidates were preferable — it penalized resumes containing the word "women\'s" and downgraded graduates of two all-women\'s colleges. They disbanded the project.',
    risk: 'Discrimination. Legal exposure. Loss of diverse talent and perspectives.',
    color: 'border-amber-500/30 bg-amber-500/5',
  },
  {
    title: 'Data leaks — sharing what it shouldn\'t',
    analogy: 'An employee who gossips about confidential meetings',
    description: 'If AI is trained on or has access to sensitive data, it might reveal that information to people who shouldn\'t see it — like an employee who accidentally shares confidential details.',
    example: 'Samsung engineers pasted proprietary source code into ChatGPT for help. That data was sent to external servers, raising concerns about confidentiality and potential exposure.',
    risk: 'Intellectual property loss. Privacy violations. Regulatory fines.',
    color: 'border-purple-500/30 bg-purple-500/5',
  },
  {
    title: 'Harmful content — saying inappropriate things',
    analogy: 'A customer-facing employee going off-script',
    description: 'Without guardrails, AI can generate offensive, inappropriate, or harmful content — like an employee who says something terrible to a customer.',
    example: 'A car dealership chatbot was tricked into agreeing to sell a car for $1. A delivery company\'s bot swore at a customer. Both went viral.',
    risk: 'Brand damage. Customer trust erosion. PR crises.',
    color: 'border-cyan-500/30 bg-cyan-500/5',
  },
]

export const WhyAIGoesWrongBusiness: React.FC = () => {
  const c = useT({ title: '1. Why AI Sometimes Goes Wrong' , failures: FAILURES, intro: 'AI learned by reading billions of web pages', introSub: 'Understanding what can go wrong is the first step to using AI safely.'}, { sv: whyAIGoesWrongSv, ko: whyAIGoesWrongKo })
  return (
  <section aria-labelledby="wrong-biz">
    <h2 id="wrong-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
    <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300">
      {c.intro}
    </p>
    <p className="mb-6 max-w-2xl text-sm text-zinc-400">
      {c.introSub}
    </p>

    <InteractiveDemo
      title="The Four Ways AI Can Fail"
      description="Real failures that happened to real companies. Click through to learn from their mistakes."
      steps={c.failures.map((f, i) => (
        <div key={f.title} className={`rounded-lg border p-5 ${(FAILURES[i]?.color ?? "")}`}>
          <p className="mb-1 text-sm font-semibold text-zinc-100">{f.title}</p>
          <p className="mb-3 text-xs text-zinc-500">{f.analogy}</p>
          <p className="mb-3 text-sm leading-relaxed text-zinc-300">{f.description}</p>
          <div className="mb-3 rounded-lg bg-zinc-800/50 p-3">
            <p className="text-xs font-medium text-zinc-500">Real-world case</p>
            <p className="mt-1 text-sm text-zinc-300">{f.example}</p>
          </div>
          <p className="text-xs text-zinc-400"><strong className="text-zinc-300">Business risk:</strong> {f.risk}</p>
        </div>
      ))}
    />
  </section>
  )
}
