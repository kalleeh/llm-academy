import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Order matches `scenarios` in useTranslation().modules.toolslandscape.choosingStack.
const SCENARIO_COLORS = [
  'border-blue-400 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5',
  'border-emerald-400 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5',
  'border-amber-400 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5',
  'border-purple-400 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/5',
]

export const ChoosingStackSection: React.FC = () => {
  const c = useTranslation().modules.toolslandscape.choosingStack

  return (
    <section aria-labelledby="choosing-stack">
      <h2 id="choosing-stack" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <InteractiveDemo
        title={c.title}
        steps={c.scenarios.map((s, i) => (
          <div key={i} className={`rounded-lg border p-5 ${SCENARIO_COLORS[i]}`}>
            <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">&quot;{s.situation}&quot;</p>
            <div className="mb-3 inline-block rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">{c.recommendLabel} {s.pick}</div>
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
