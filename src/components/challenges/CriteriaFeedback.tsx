import { t, useLanguage } from '../../i18n'
import { Icon } from '../Icon'
import type { GradeOutcome } from '../../challenges/types'

interface CriteriaFeedbackProps {
  outcome: GradeOutcome
}

/** Per-criterion pass/fail rows + an overall banner, styled like KnowledgeCheck. */
export const CriteriaFeedback: React.FC<CriteriaFeedbackProps> = ({ outcome }) => {
  const { lang } = useLanguage()

  const bannerKey = !outcome.graded
    ? 'challenge.notGraded'
    : outcome.passed
      ? 'challenge.passed'
      : 'challenge.almost'

  const bannerClass = !outcome.graded
    ? 'border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300'
    : outcome.passed
      ? 'border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-300'
      : 'border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 text-amber-700 dark:text-amber-300'

  return (
    <div className="space-y-3">
      <div className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${bannerClass}`}>
        <span className="flex items-center gap-2">
          <Icon name={!outcome.graded ? 'lightbulb' : outcome.passed ? 'check' : 'cycle'} className="shrink-0" />
          {t(lang, bannerKey)}
        </span>
        {outcome.graded && (
          <span className="shrink-0 font-mono text-xs">
            {t(lang, 'challenge.score')} {Math.round(outcome.score * 100)}%
          </span>
        )}
      </div>

      {outcome.runtimeError && (
        <p className="rounded-lg border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 px-4 py-3 font-mono text-xs text-amber-700 dark:text-amber-400">
          {outcome.runtimeError}
        </p>
      )}

      {outcome.criteria.length > 0 && (
        <ul className="space-y-2">
          {outcome.criteria.map((c) => (
            <li
              key={c.id}
              className={`flex items-start gap-3 rounded-lg border px-4 py-2.5 text-sm ${
                c.passed
                  ? 'border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5 text-zinc-800 dark:text-zinc-200'
                  : 'border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <Icon
                name={c.passed ? 'check' : 'cross'}
                className={`mt-0.5 shrink-0 ${
                  c.passed ? 'text-emerald-700 dark:text-emerald-400' : 'text-zinc-400 dark:text-zinc-500'
                }`}
              />
              <span>
                {c.label}
                {c.detail && <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">— {c.detail}</span>}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
