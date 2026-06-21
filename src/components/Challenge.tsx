import { useCallback, useState } from 'react'
import { t, useLanguage } from '../i18n'
import type { Challenge as ChallengeData, GradeOutcome } from '../challenges/types'
import { grade } from '../challenges/grade'
import { translateChallenge } from '../challenges/challenge-translations'
import { loadChallengeResult, saveChallengeResult } from '../challenges/storage'
import { RubricChallenge } from './challenges/RubricChallenge'

interface ChallengeProps {
  moduleId: string
  challenge: ChallengeData
}

/**
 * Dispatcher for interactive challenges — owns submission state, grading,
 * persistence, and i18n, then delegates input UI to a per-kind component.
 * Mirrors how KnowledgeCheck wraps MCQuestion / FreeRecallQuestion.
 */
export const Challenge: React.FC<ChallengeProps> = ({ moduleId, challenge: raw }) => {
  const { lang } = useLanguage()
  const challenge = translateChallenge(raw, lang)
  const [outcome, setOutcome] = useState<GradeOutcome | null>(null)

  const handleSubmit = useCallback(
    async (submission: string) => {
      const result = await grade(challenge, submission)
      setOutcome(result)
      if (challenge.graded) {
        const prev = loadChallengeResult(moduleId, challenge.id)
        saveChallengeResult(moduleId, {
          challengeId: challenge.id,
          correct: result.passed,
          score: result.score,
          answeredAt: Date.now(),
          attempts: (prev?.attempts ?? 0) + 1,
        })
      }
    },
    [challenge, moduleId],
  )

  return (
    <section className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <div className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{challenge.title}</h3>
          <span className="shrink-0 rounded-full bg-amber-200/60 dark:bg-amber-500/15 px-2.5 py-0.5 text-xs text-amber-800 dark:text-amber-300">
            {t(lang, 'challenge.title')}
          </span>
        </div>
      </div>

      <div className="p-6">
        {challenge.kind === 'prompt-rubric' && (
          <RubricChallenge challenge={challenge} outcome={outcome} onSubmit={handleSubmit} />
        )}
      </div>
    </section>
  )
}
