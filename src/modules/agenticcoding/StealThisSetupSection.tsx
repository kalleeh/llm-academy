import { CodeBlock } from '../../components/CodeBlock'
import { Icon } from '../../components/Icon'
import { useTranslation } from '../../i18n'

const AGENTS_MD_STARTER = `# AGENTS.md — [project name]

## Setup
- Install: [pnpm install]
- Dev server: [pnpm dev]
- Tests: [pnpm test]   <- run before claiming any task done
- Lint: [pnpm lint]

## Conventions
- [Language + strictness, e.g. "TypeScript strict; no any"]
- [Style rules the linter doesn't catch, e.g. "named exports only"]
- [Error handling, e.g. "wrap errors with context; never swallow"]

## Architecture notes
- [1-3 bullets: where things live, what calls what]
- [Known gotchas, e.g. "auth middleware must stay first in the chain"]

## Definition of done
- Tests pass, lint clean
- [Your bar: "new code has a test", "no TODOs without a ticket"]`

export const StealThisSetupSection: React.FC = () => {
  const c = useTranslation().modules.agenticcoding.stealThisSetup

  return (
    <section aria-labelledby="steal-this-setup">
      <h2 id="steal-this-setup" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="space-y-4">
        <CodeBlock code={AGENTS_MD_STARTER} language="markdown" title={c.templateTitle} />
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
