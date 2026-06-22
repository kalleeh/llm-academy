import { useMemo } from 'react'
import { t, useLanguage } from '../../i18n'
import { Icon } from '../Icon'
import { gradeRubric } from '../../challenges/graders/rubric'
import type { PromptRubricChallenge, StructureElement } from '../../challenges/types'

interface WritingGuideProps {
  challenge: PromptRubricChallenge
  /** Current textarea contents, so targets update live as the learner types. */
  draft: string
  /** Insert a scaffold stub at the cursor / end of the draft. */
  onInsert: (stub: string) => void
}

// Structure criteria have a safe, universal structural starter (never the
// actual answer). Pure regex/contains criteria intentionally get no insert —
// only live coaching — so the guide never leaks a challenge's solution.
const SCAFFOLD_KEY: Record<StructureElement, string> = {
  role: 'scaffold.role',
  constraints: 'scaffold.constraints',
  examples: 'scaffold.examples',
  outputFormat: 'scaffold.outputFormat',
  context: 'scaffold.context',
}

/**
 * Live, deterministic writing guidance derived from the challenge's own rubric.
 * Shows which elements of a strong answer are present vs. still needed as the
 * learner types, and offers structural starters for structure-based criteria.
 * Deliberately shows neither the score nor pass/fail — that stays for submit.
 */
export const WritingGuide: React.FC<WritingGuideProps> = ({ challenge, draft, onInsert }) => {
  const { lang } = useLanguage()

  // Pure regex grading is cheap enough to run on every keystroke.
  const met = useMemo(() => {
    const outcome = gradeRubric(challenge, draft)
    return new Map(outcome.criteria.map((c) => [c.id, c.passed]))
  }, [challenge, draft])

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/40 p-4">
      <div className="mb-1 flex items-center gap-2">
        <Icon name="lightbulb" className="text-amber-600 dark:text-amber-400" />
        <h4 className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">{t(lang, 'guide.title')}</h4>
      </div>
      <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">{t(lang, 'guide.subtitle')}</p>
      <ul className="space-y-1.5">
        {challenge.rubric.map((c) => {
          const passed = met.get(c.id) ?? false
          const scaffold = c.type === 'structure' ? t(lang, SCAFFOLD_KEY[c.element]) : null
          return (
            <li key={c.id} className="flex items-start gap-2 text-sm">
              <Icon
                name={passed ? 'check' : 'arrow-right'}
                className={`mt-0.5 shrink-0 ${passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400 dark:text-zinc-500'}`}
              />
              <span className={passed ? 'text-zinc-500 line-through dark:text-zinc-500' : 'text-zinc-700 dark:text-zinc-300'}>
                {c.label}
                {passed && <span className="ml-2 text-xs text-emerald-600 dark:text-emerald-400">({t(lang, 'guide.done')})</span>}
              </span>
              {!passed && scaffold && (
                <button
                  type="button"
                  onClick={() => onInsert(scaffold)}
                  className="ml-auto shrink-0 rounded-md border border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-300 transition-colors hover:bg-amber-100 dark:hover:bg-amber-500/20"
                >
                  +
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
