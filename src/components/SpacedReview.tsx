import { useState, useCallback, useMemo } from 'react'
import { Icon } from './Icon'
import { t, useLanguage } from '../i18n'
import type { Question } from './KnowledgeCheck'

interface SpacedReviewProps {
  onNavigateToModule: (moduleId: string) => void
}

interface StoredResult {
  questionId: string
  correct: boolean
  answeredAt: number
}

interface StoredCheckData {
  results: StoredResult[]
  completedAt: number
}

interface ReviewSchedule {
  [questionId: string]: {
    moduleId: string
    nextReview: number
    interval: number
    correct: boolean
  }
}

// Intervals in ms
const CORRECT_INTERVALS = [
  1 * 24 * 60 * 60 * 1000, // 1 day
  3 * 24 * 60 * 60 * 1000, // 3 days
  7 * 24 * 60 * 60 * 1000, // 7 days
  14 * 24 * 60 * 60 * 1000, // 14 days
]
const INCORRECT_INTERVALS = [
  4 * 60 * 60 * 1000, // 4 hours
  1 * 24 * 60 * 60 * 1000, // 1 day
  3 * 24 * 60 * 60 * 1000, // 3 days
]

const SCHEDULE_KEY = 'llm-academy-review-schedule'

function loadSchedule(): ReviewSchedule {
  try {
    const raw = localStorage.getItem(SCHEDULE_KEY)
    return raw ? (JSON.parse(raw) as ReviewSchedule) : {}
  } catch {
    return {}
  }
}

function saveSchedule(schedule: ReviewSchedule) {
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule))
}

function getNextInterval(current: number, correct: boolean): number {
  const intervals = correct ? CORRECT_INTERVALS : INCORRECT_INTERVALS
  const idx = intervals.indexOf(current)
  if (idx === -1) return intervals[0]
  return intervals[Math.min(idx + 1, intervals.length - 1)]
}

function buildScheduleFromChecks(): ReviewSchedule {
  const schedule = loadSchedule()
  const keys = Object.keys(localStorage).filter((k) => k.startsWith('llm-academy-checks-'))

  for (const key of keys) {
    try {
      const moduleId = key.replace('llm-academy-checks-', '')
      const data = JSON.parse(localStorage.getItem(key)!) as StoredCheckData
      for (const r of data.results) {
        if (!schedule[r.questionId]) {
          const intervals = r.correct ? CORRECT_INTERVALS : INCORRECT_INTERVALS
          schedule[r.questionId] = {
            moduleId,
            nextReview: r.answeredAt + intervals[0],
            interval: intervals[0],
            correct: r.correct,
          }
        }
      }
    } catch {
      // skip malformed entries
    }
  }

  saveSchedule(schedule)
  return schedule
}

function getDueQuestions(schedule: ReviewSchedule): Array<{ questionId: string; moduleId: string }> {
  const now = Date.now()
  return Object.entries(schedule)
    .filter(([, entry]) => entry.nextReview <= now)
    .map(([questionId, entry]) => ({ questionId, moduleId: entry.moduleId }))
}

function getNextReviewTime(schedule: ReviewSchedule): number | null {
  const future = Object.values(schedule)
    .map((e) => e.nextReview)
    .filter((t) => t > Date.now())
  return future.length > 0 ? Math.min(...future) : null
}

function formatTimeUntil(ms: number): string {
  const diff = ms - Date.now()
  if (diff <= 0) return 'now'
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`
  return `${hours} hour${hours !== 1 ? 's' : ''}`
}

// Minimal inline question renderer for review mode
function ReviewQuestion({
  questionId,
  moduleId,
  onAnswer,
  onNavigate,
}: {
  questionId: string
  moduleId: string
  onAnswer: (correct: boolean) => void
  onNavigate: (moduleId: string) => void
}) {
  // Try to find the question data from the module's check data
  const question = useMemo((): Question | null => {
    // We don't have the original Question objects in localStorage,
    // so we show a recall prompt referencing the module
    return null
  }, [])

  // Since we don't store full question data in localStorage, show a recall prompt
  if (!question) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Review question <span className="font-mono text-amber-700 dark:text-amber-400">{questionId}</span> from module{' '}
          <button
            onClick={() => onNavigate(moduleId)}
            className="text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:text-amber-600 dark:hover:text-amber-300"
          >
            {moduleId}
          </button>
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Try to recall the answer, then mark how you did:
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => onAnswer(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-100 dark:bg-emerald-600/20 px-4 py-2 text-sm text-emerald-700 dark:text-emerald-300 transition-colors hover:bg-emerald-200 dark:hover:bg-emerald-600/30"
          >
            <Icon name="check" /> I remembered
          </button>
          <button
            onClick={() => onAnswer(false)}
            className="flex items-center gap-2 rounded-lg bg-amber-100 dark:bg-amber-600/20 px-4 py-2 text-sm text-amber-700 dark:text-amber-300 transition-colors hover:bg-amber-200 dark:hover:bg-amber-600/30"
          >
            <Icon name="cycle" /> Need to review
          </button>
        </div>
      </div>
    )
  }
}

export const SpacedReview: React.FC<SpacedReviewProps> = ({ onNavigateToModule }) => {
  const { lang } = useLanguage()
  const [schedule, setSchedule] = useState(() => buildScheduleFromChecks())
  const [reviewing, setReviewing] = useState(false)
  const [reviewIdx, setReviewIdx] = useState(0)
  const [reviewResults, setReviewResults] = useState<Array<{ questionId: string; correct: boolean }>>([])

  const dueQuestions = useMemo(() => getDueQuestions(schedule), [schedule])
  const nextReview = useMemo(() => getNextReviewTime(schedule), [schedule])
  const totalScheduled = Object.keys(schedule).length

  const handleAnswer = useCallback(
    (correct: boolean) => {
      const current = dueQuestions[reviewIdx]
      setReviewResults((prev) => [...prev, { questionId: current.questionId, correct }])

      // Update schedule
      const updated = { ...schedule }
      const entry = updated[current.questionId]
      if (entry) {
        entry.interval = getNextInterval(entry.interval, correct)
        entry.nextReview = Date.now() + entry.interval
        entry.correct = correct
      }
      saveSchedule(updated)
      setSchedule(updated)

      if (reviewIdx + 1 >= dueQuestions.length) {
        setReviewing(false)
      } else {
        setReviewIdx(reviewIdx + 1)
      }
    },
    [dueQuestions, reviewIdx, schedule],
  )

  // No checks completed yet
  if (totalScheduled === 0) {
    return (
      <section className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">
        <div className="text-center">
          <Icon name="book" size={24} className="mx-auto mb-3 text-zinc-500" />
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t(lang, 'review.empty')}
          </p>
        </div>
      </section>
    )
  }

  // Review session in progress
  if (reviewing && dueQuestions.length > 0) {
    const current = dueQuestions[reviewIdx]
    return (
      <section className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
        <div className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t(lang, 'review.title')}</h3>
            <span className="rounded-full bg-zinc-200 dark:bg-zinc-700 px-2.5 py-0.5 text-xs text-zinc-700 dark:text-zinc-300">
              {reviewIdx + 1} of {dueQuestions.length}
            </span>
          </div>
        </div>
        <div className="p-6">
          <ReviewQuestion
            questionId={current.questionId}
            moduleId={current.moduleId}
            onAnswer={handleAnswer}
            onNavigate={onNavigateToModule}
          />
        </div>
      </section>
    )
  }

  // Review complete — show results
  if (reviewResults.length > 0 && !reviewing) {
    const remembered = reviewResults.filter((r) => r.correct).length
    return (
      <section className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 space-y-4">
        <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t(lang, 'review.complete')}</h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          You remembered {remembered} of {reviewResults.length} questions.
        </p>
        <div className="space-y-2">
          {reviewResults.map((r) => (
            <div
              key={r.questionId}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${
                r.correct
                  ? 'border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-300'
                  : 'border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 text-amber-700 dark:text-amber-300'
              }`}
            >
              <Icon name={r.correct ? 'check' : 'cycle'} />
              <span className="font-mono text-xs">{r.questionId}</span>
            </div>
          ))}
        </div>
        {nextReview && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Next review in {formatTimeUntil(nextReview)}.
          </p>
        )}
      </section>
    )
  }

  // Dashboard — show due count
  return (
    <section className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 space-y-4">
      <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t(lang, 'review.title')}</h3>
      {dueQuestions.length > 0 ? (
        <>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <span className="font-semibold text-amber-700 dark:text-amber-400">{dueQuestions.length}</span> question
            {dueQuestions.length !== 1 ? 's' : ''} due for review.
          </p>
          <button
            onClick={() => {
              setReviewing(true)
              setReviewIdx(0)
              setReviewResults([])
            }}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm text-zinc-100 transition-colors hover:bg-amber-500"
          >
            Start Review
          </button>
        </>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            <Icon name="check" className="mr-1 inline" />
            {t(lang, 'review.allCaughtUp')}
          </p>
          {nextReview && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Next review in {formatTimeUntil(nextReview)}.
            </p>
          )}
        </div>
      )}
    </section>
  )
}
