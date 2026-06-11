import { CodeBlock } from '../../components/CodeBlock'
import { Icon } from '../../components/Icon'
import { useTranslation } from '../../i18n'

const WEEKLY_REPORT = `Context: weekly [team] status for [audience]. Sources attached.
Task: compile the report from the attached [exports / notes].
Format: 3 sections — Wins, Risks, Next week — max 300 words,
        numbers first, no adjective without a number behind it.
Keep my phrasing where it exists; flag anything that looks off
rather than smoothing it over.`

const MEETING_ACTIONS = `Task: turn this transcript into (1) decisions made, (2) action
      items with owner + due date, (3) open questions.
Format: three short lists. If an owner or date is missing, mark
        it [UNASSIGNED] — don't guess.`

const CUSTOMER_REPLY = `Context: replying to the attached customer email. Relationship:
         [new / long-time / at-risk]. Goal: [retain / inform / apologize].
Task: draft a reply in our voice: [paste 2 lines of a past email
      you like the tone of].
Format: under 150 words, one clear next step, no corporate filler.
Give me 2 versions: one warmer, one more direct.`

export const PromptLibrarySection: React.FC = () => {
  const c = useTranslation().modules.optimizingworkflow.promptLibrary

  return (
    <section aria-labelledby="prompt-library">
      <h2 id="prompt-library" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="space-y-4">
        <CodeBlock code={WEEKLY_REPORT} language="markdown" title={c.templateTitleA} />
        <CodeBlock code={MEETING_ACTIONS} language="markdown" title={c.templateTitleB} />
        <CodeBlock code={CUSTOMER_REPLY} language="markdown" title={c.templateTitleC} />
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{c.tipsTitle}</p>
        <ul className="space-y-3">
          {c.tips.map((t) => (
            <li key={t.name} className="flex gap-2.5 text-sm">
              <span className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"><Icon name="lightbulb" size={14} /></span>
              <span className="text-zinc-700 dark:text-zinc-300"><strong className="text-zinc-900 dark:text-zinc-100">{t.name}.</strong> {t.body}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
    </section>
  )
}
