import { AppSession } from '../../components/AppSession'
import { WorkAppWindow } from '../../components/WorkAppWindow'
import type { WorkEventKind } from '../../components/WorkAppWindow'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

const KINDS: WorkEventKind[] = ['brief', 'plan', 'working', 'review', 'done']

export const DelegateSuperviseSection: React.FC = () => {
  const c = useTranslation().modules.agenticwork.delegateSupervise

  return (
    <section aria-labelledby="delegate-supervise">
      <h2 id="delegate-supervise" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <AppSession
        toggleLabel={c.appToggleLabel}
        tabs={[{ id: 'quick-desktop', label: 'Amazon Quick Desktop' }, { id: 'cowork', label: 'Claude Cowork' }]}
      >
        {(id) => <WorkAppWindow key={id} variant={id as 'quick-desktop' | 'cowork'} steps={[...c.steps]} kinds={KINDS} />}
      </AppSession>
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
