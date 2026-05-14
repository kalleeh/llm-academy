import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

const ICONS: IconName[] = ['clipboard', 'bar-chart', 'chat', 'file']
const COLORS = ['border-zinc-500/30 bg-zinc-100 dark:bg-zinc-800', 'border-emerald-400 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5', 'border-amber-400 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5', 'border-purple-400 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/5']

export const DecisionBusiness: React.FC = () => {
  const c = useTranslation().modules.aiproblem.decision

  return (
    <section aria-labelledby="decision-biz">
      <h2 id="decision-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <p className="mb-6 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.introSub}</p>

      <InteractiveDemo
        title={c.title}
        steps={c.scenarios.map((s, i) => (
          <div key={i} className={`rounded-lg border p-5 ${COLORS[i]}`}>
            <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100"><Icon name={ICONS[i]} className="mr-1 inline" /> &quot;{s.task}&quot;</p>
            <div className="mb-3 inline-block rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">{c.bestFitLabel} {s.answer}</div>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{s.why}</p>
          </div>
        ))}
      />

      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
