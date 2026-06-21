import { useState } from 'react'
import { t, useLanguage } from '../../i18n'
import { Icon } from '../Icon'
import type { GradeOutcome, PromptRubricChallenge } from '../../challenges/types'
import { CriteriaFeedback } from './CriteriaFeedback'

interface RubricChallengeProps {
  challenge: PromptRubricChallenge
  outcome: GradeOutcome | null
  onSubmit: (submission: string) => void
}

/** Textarea + progressive hints + submit, for prompt-writing challenges. */
export const RubricChallenge: React.FC<RubricChallengeProps> = ({ challenge, outcome, onSubmit }) => {
  const { lang } = useLanguage()
  const [text, setText] = useState('')
  const [hintsShown, setHintsShown] = useState(0)

  const hints = challenge.hints ?? []
  const canSubmit = text.trim().length > 0

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{challenge.instructions}</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={challenge.placeholder ?? ''}
        rows={6}
        className="w-full resize-y rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-3 font-mono text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-amber-500/50 focus:outline-none"
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => canSubmit && onSubmit(text)}
          disabled={!canSubmit}
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm text-zinc-100 transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {outcome ? t(lang, 'challenge.tryAgain') : t(lang, 'challenge.check')}
        </button>
        {hintsShown < hints.length && (
          <button
            onClick={() => setHintsShown((n) => n + 1)}
            className="flex items-center gap-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 px-4 py-2 text-sm text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-600"
          >
            <Icon name="lightbulb" /> {t(lang, 'challenge.showHint')}
          </button>
        )}
      </div>

      {hintsShown > 0 && (
        <ul className="space-y-2 border-l-2 border-amber-400 dark:border-amber-500/30 pl-4">
          {hints.slice(0, hintsShown).map((hint, i) => (
            <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400">
              {hint}
            </li>
          ))}
        </ul>
      )}

      {outcome && <CriteriaFeedback outcome={outcome} />}
    </div>
  )
}
