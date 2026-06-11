import { AppSession } from '../../components/AppSession'
import { ChatWindow } from '../../components/ChatWindow'
import type { ChatRole } from '../../components/ChatWindow'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

const ROLES: ChatRole[] = ['user', 'assistant', 'assistant', 'assistant']

export const OneOffToSystemBusiness: React.FC = () => {
  const c = useTranslation().modules.optimizingworkflow.oneOffToSystem

  return (
    <section aria-labelledby="one-off-to-system">
      <h2 id="one-off-to-system" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <AppSession
        toggleLabel={c.appToggleLabel}
        tabs={[{ id: 'chatgpt', label: 'ChatGPT' }, { id: 'claude', label: 'Claude' }]}
      >
        {(id) => <ChatWindow key={id} variant={id as 'chatgpt' | 'claude'} steps={[...c.steps]} roles={ROLES} />}
      </AppSession>
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
