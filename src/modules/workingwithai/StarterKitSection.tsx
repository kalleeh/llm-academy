import { CodeBlock } from '../../components/CodeBlock'
import { Icon } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Template content stays English by convention (matches prompting-module examples).
const CUSTOM_INSTRUCTIONS = `About me:
- Role: [your role, e.g. "customer success lead at a 40-person B2B SaaS"]
- I mostly use AI for: [your top 3 tasks]
- Audience I usually write for: [e.g. "customers and the exec team"]

How to answer:
- Default to [concise / detailed] answers; bullets over prose
- Tone: [e.g. "professional but warm, no corporate filler"]
- If my request is ambiguous, ask up to 2 clarifying questions first
- When I ask for writing, give me 2-3 variants, not one
- Never invent facts, numbers, or quotes; say "I don't know" instead`

const PROMPT_SKELETON = `Context: [1 sentence on the situation and who this is for]
Task: [the verb — draft / summarize / compare / rewrite — and the object]
Input: [paste the material, or name the attached file]
Format: [bullets / table / max length / sections you want]
Constraints: [tone, what to leave out, what must stay verbatim]`

export const StarterKitSection: React.FC = () => {
  const c = useTranslation().modules.workingwithai.starterKit

  return (
    <section aria-labelledby="starter-kit">
      <h2 id="starter-kit" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="space-y-4">
        <CodeBlock code={CUSTOM_INSTRUCTIONS} language="markdown" title={c.templateTitleA} />
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4">
          <p className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.whereTitle}</p>
          <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            {c.where.map((w) => (
              <li key={w.app}><strong className="text-zinc-900 dark:text-zinc-100">{w.app}:</strong> {w.path}</li>
            ))}
          </ul>
        </div>
        <CodeBlock code={PROMPT_SKELETON} language="markdown" title={c.templateTitleB} />
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
