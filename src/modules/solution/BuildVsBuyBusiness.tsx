import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useT } from '../../i18n'
import { buildVsBuySv, buildVsBuyKo } from './translations'

const FACTORS: { question: string; rent: string; buy: string; icon: IconName }[] = [
  { question: 'How sensitive is your data?', rent: 'Data is processed by the provider, but enterprise AI services (Azure OpenAI, AWS Bedrock) offer SOC 2, HIPAA, and encryption that most companies can\'t match in-house.', buy: 'Data stays on your infrastructure — gives you full control, but YOU are responsible for security, encryption, and compliance. Most companies underestimate this burden.', icon: 'shield' },
  { question: 'What\'s your budget model?', rent: 'Pay per use — predictable for low volume, expensive at scale. Like taking taxis.', buy: 'Fixed monthly cost — expensive upfront, cheaper at scale. Like owning a car.', icon: 'bar-chart' },
  { question: 'Do you have technical staff?', rent: 'No tech team needed — the provider handles everything. Like using a taxi service.', buy: 'Need someone to maintain it — security patches, updates, monitoring. Like owning a car means oil changes and repairs.', icon: 'people' },
  { question: 'How fast do you need to start?', rent: 'Up and running in hours. Sign up, get an account, start using it.', buy: 'Weeks to months of setup. Hardware, software, configuration, testing.', icon: 'bolt' },
]

export const BuildVsBuyBusiness: React.FC = () => {
  const c = useT({ title: '2. Rent vs Buy — The Big Decision', intro: '{c.intro}.', introSub: '{c.introSub}' , selfExplainPrompt: 'Your company needs AI for customer support. Walk through the rent-vs-buy decision.'}, { sv: buildVsBuySv, ko: buildVsBuyKo })
  const [answers, setAnswers] = useState<Record<number, 'rent' | 'buy'>>({})

  const select = useCallback((i: number, choice: 'rent' | 'buy') => {
    setAnswers((prev) => ({ ...prev, [i]: choice }))
  }, [])

  const answered = Object.keys(answers).length
  const rentScore = Object.values(answers).filter((v) => v === 'rent').length
  const buyScore = Object.values(answers).filter((v) => v === 'buy').length

  return (
    <section aria-labelledby="bvb-biz">
      <h2 id="bvb-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        {c.intro}
      </p>
      <p className="mb-6 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
  {c.introSub}
      </p>

      <div className="mb-6 space-y-3">
        {FACTORS.map((f, i) => (
          <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
            <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100"><Icon name={f.icon} className="mr-1 inline" /> {f.question}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <button onClick={() => select(i, 'rent')} className={`rounded-lg border p-3 text-left text-sm transition-all ${answers[i] === 'rent' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-600'}`}>
                <span className="text-xs font-medium text-emerald-400">Rent (API service)</span>
                <p className="mt-1 text-xs">{f.rent}</p>
              </button>
              <button onClick={() => select(i, 'buy')} className={`rounded-lg border p-3 text-left text-sm transition-all ${answers[i] === 'buy' ? 'border-blue-500/50 bg-blue-500/10 text-blue-300' : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-600'}`}>
                <span className="text-xs font-medium text-blue-400">Buy (self-hosted)</span>
                <p className="mt-1 text-xs">{f.buy}</p>
              </button>
            </div>
          </div>
        ))}
      </div>

      {answered === FACTORS.length && (
        <div className="mb-8 rounded-lg border border-amber-500/30 bg-amber-500/5 p-5">
          <p className="mb-2 text-sm font-medium text-amber-300">Your result</p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {rentScore > buyScore
              ? `You leaned toward renting (${rentScore}/${FACTORS.length}). An API service like Amazon Bedrock, Azure OpenAI, or Google Vertex AI is probably your best starting point. Bedrock is especially flexible — it gives you access to Claude, Llama, Mistral, and Amazon Nova through one API, so you're not locked into a single model provider. Low setup, no maintenance, and you can always switch later.`
              : buyScore > rentScore
                ? `You leaned toward buying (${buyScore}/${FACTORS.length}). Self-hosting an open model (like Llama) gives you more control. You'll need technical staff, but you get full customization and no per-use costs. Services like Amazon Bedrock AgentCore can also help you deploy and manage self-hosted agents with enterprise security.`
                : 'It\'s a tie! Consider starting with an API service (faster, easier) and evaluating self-hosting later as your needs grow and you understand your usage patterns better.'}
          </p>
        </div>
      )}

      <SelfExplain
        prompt="Your company needs AI for customer support. Walk through the rent-vs-buy decision: what's your data sensitivity, budget, team capability, and timeline?"
        modelAnswer="Example: 'We handle customer payment data (sensitive → leans toward buy/self-host). We're a 50-person startup with no ML team (leans toward rent). We need something working in 2 weeks (definitely rent). Budget is tight — we'd rather pay per use than commit to infrastructure (rent). Verdict: start with an API service, but make sure we use one with enterprise data agreements. Revisit self-hosting in 6 months when we understand our volume and can justify the investment.'"
      />
    </section>
  )
}
