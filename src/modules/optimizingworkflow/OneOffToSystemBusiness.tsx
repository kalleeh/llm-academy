import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { Icon } from '../../components/Icon'
import { useTranslation } from '../../i18n'

export const OneOffToSystemBusiness: React.FC = () => {
  const c = useTranslation().modules.optimizingworkflow.oneOffToSystem

  return (
    <section aria-labelledby="one-off-to-system">
      <h2 id="one-off-to-system" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <InteractiveDemo
        title={c.title}
        steps={c.steps.map((s, i) => (
          <div key={i} className="space-y-3">
            <div className="inline-block rounded-full bg-purple-100 dark:bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">{c.stepLabel} {i + 1}: {s.label}</div>
            <p className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{s.content}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400"><Icon name="lightbulb" className="mr-1 inline" /> {s.note}</p>
          </div>
        ))}
      />
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
