import { CodeBlock } from '../../components/CodeBlock'
import { Icon } from '../../components/Icon'
import { useTranslation } from '../../i18n'

const BRIEF_TEMPLATE = `Task: [the outcome, in one sentence]
Inputs: [the files / folders / sources it may use — be explicit]
Rules: [the policy, criteria, or definitions to apply]
Deliverable: [exact format: table / doc / list + length]
Checkpoint: show me [the plan / flagged items / the draft]
            before [running / sending / finalizing]
Out of bounds: [what it must NOT touch or do without asking]`

const BRIEF_EXAMPLE = `Task: Reconcile this month's expenses against our travel policy.
Inputs: expenses-march.xlsx, travel-policy.pdf (attached)
Rules: flag any line that breaks a policy rule; cite the rule
       and the amount over
Deliverable: a review table (line, rule broken, amount over)
             plus a 1-line summary
Checkpoint: show me the flagged list before drafting the
            finance email
Out of bounds: don't email anyone; don't modify the spreadsheet`

export const BriefLibrarySection: React.FC = () => {
  const c = useTranslation().modules.agenticwork.briefLibrary

  return (
    <section aria-labelledby="brief-library">
      <h2 id="brief-library" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="space-y-4">
        <CodeBlock code={BRIEF_TEMPLATE} language="markdown" title={c.templateTitle} />
        <CodeBlock code={BRIEF_EXAMPLE} language="markdown" title={c.exampleTitle} />
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
