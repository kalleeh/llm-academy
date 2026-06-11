import { AppSession } from '../../components/AppSession'
import { WorkAppWindow } from '../../components/WorkAppWindow'
import type { WorkEventKind } from '../../components/WorkAppWindow'
import { useTranslation } from '../../i18n'

const KINDS: WorkEventKind[] = ['brief', 'plan', 'working', 'review', 'done']

export const DelegationDemoBusiness: React.FC = () => {
  const c = useTranslation().modules.toolslandscape.delegation

  return (
    <section aria-labelledby="delegation-demo">
      <h2 id="delegation-demo" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <AppSession
        toggleLabel={c.appToggleLabel}
        tabs={[{ id: 'quick-desktop', label: 'Amazon Quick Desktop' }, { id: 'cowork', label: 'Claude Cowork' }]}
      >
        {(id) => <WorkAppWindow key={id} variant={id as 'quick-desktop' | 'cowork'} steps={[...c.steps]} kinds={KINDS} />}
      </AppSession>
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
    </section>
  )
}
