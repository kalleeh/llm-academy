import { useState, useCallback, useEffect } from 'react'
import { t, useLanguage } from '../i18n'
import { Icon } from './Icon'

export interface Question {
  id: string
  type: 'mc' | 'free'
  question: string
  options?: string[]
  correctIndex?: number
  modelAnswer?: string
  explanation: string
}

interface KnowledgeCheckProps {
  moduleId: string
  questions: Question[]
}

interface QuestionResult {
  questionId: string
  correct: boolean
  answeredAt: number
}

interface StoredCheckData {
  results: QuestionResult[]
  completedAt: number
}

function saveResults(moduleId: string, results: QuestionResult[]) {
  const data: StoredCheckData = { results, completedAt: Date.now() }
  localStorage.setItem(`llm-academy-checks-${moduleId}`, JSON.stringify(data))
}

function MCQuestion({
  question,
  onAnswer,
}: {
  question: Question
  onAnswer: (correct: boolean) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)

  const handleSelect = useCallback(
    (idx: number) => {
      if (selected !== null) return
      setSelected(idx)
      onAnswer(idx === question.correctIndex)
    },
    [selected, onAnswer, question.correctIndex],
  )

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{question.question}</p>
      <div className="space-y-2">
        {question.options?.map((opt, i) => {
          const answered = selected !== null
          const isCorrect = i === question.correctIndex
          const isSelected = i === selected

          let borderClass = 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500'
          if (answered) {
            if (isCorrect) borderClass = 'border-emerald-400 dark:border-emerald-500/60 bg-emerald-50 dark:bg-emerald-500/10'
            else if (isSelected) borderClass = 'border-amber-400 dark:border-amber-500/60 bg-amber-50 dark:bg-amber-500/10'
            else borderClass = 'border-zinc-200 dark:border-zinc-700 opacity-60'
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm text-zinc-800 dark:text-zinc-200 transition-colors ${borderClass} disabled:cursor-default`}
            >
              <span className="mt-0.5 shrink-0">
                {answered && isCorrect && (
                  <Icon name="check" className="text-emerald-700 dark:text-emerald-400" />
                )}
                {answered && isSelected && !isCorrect && (
                  <Icon name="cross" className="text-amber-700 dark:text-amber-400" />
                )}
                {(!answered || (!isCorrect && !isSelected)) && (
                  <span className="inline-block size-4 rounded-full border border-zinc-300 dark:border-zinc-600" />
                )}
              </span>
              {opt}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 p-4 text-sm text-zinc-700 dark:text-zinc-300">
          {question.explanation}
        </div>
      )}
    </div>
  )
}

function FreeRecallQuestion({
  question,
  onAnswer,
}: {
  question: Question
  onAnswer: (correct: boolean) => void
}) {
  const { lang: fLang } = useLanguage()
  const [text, setText] = useState('')
  const [revealed, setRevealed] = useState(false)

  const handleReveal = useCallback(() => {
    setRevealed(true)
    onAnswer(true) // free recall is always "completed", not graded
  }, [onAnswer])

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{question.question}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={revealed}
        placeholder="Type your answer…"
        rows={4}
        className="w-full resize-none rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-amber-500/50 focus:outline-none disabled:opacity-70"
      />
      {!revealed && text.length >= 10 && (
        <button
          onClick={handleReveal}
          className="rounded-lg bg-zinc-200 dark:bg-zinc-700 px-4 py-2 text-sm text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-600"
        >
          Show model answer
        </button>
      )}
      {revealed && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 p-4">
            <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">{t(fLang, 'check.yourAnswer')}</p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
          </div>
          <div className="rounded-lg border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5 p-4">
            <p className="mb-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">{t(fLang, 'check.modelAnswer')}</p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{question.modelAnswer}</p>
          </div>
        </div>
      )}
      {revealed && (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 p-4 text-sm text-zinc-700 dark:text-zinc-300">
          {question.explanation}
        </div>
      )}
    </div>
  )
}

export const KnowledgeCheck: React.FC<KnowledgeCheckProps> = ({ moduleId, questions }) => {
  const { lang } = useLanguage()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [results, setResults] = useState<QuestionResult[]>([])
  const [answered, setAnswered] = useState(false)

  const isComplete = results.length === questions.length
  const question = questions[currentIdx]

  // Save results when all questions are answered (effect ensures state is settled)
  useEffect(() => {
    if (results.length === questions.length && results.length > 0) {
      saveResults(moduleId, results)
    }
  }, [results, questions.length, moduleId])

  const handleAnswer = useCallback(
    (correct: boolean) => {
      setAnswered(true)
      setResults((prev) => [
        ...prev,
        { questionId: question.id, correct, answeredAt: Date.now() },
      ])
    },
    [question],
  )

  const handleNext = useCallback(() => {
    setCurrentIdx((prev) => prev + 1)
    setAnswered(false)
  }, [])

  return (
    <section className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <div className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Check Your Understanding
          </h3>
          {!isComplete && (
            <span className="rounded-full bg-zinc-200 dark:bg-zinc-700 px-2.5 py-0.5 text-xs text-zinc-700 dark:text-zinc-300">
              {currentIdx + 1} of {questions.length}
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        {!isComplete && question ? (
          <div className="space-y-4">
            {question.type === 'mc' ? (
              <MCQuestion
                key={question.id}
                question={question}
                onAnswer={handleAnswer}
              />
            ) : (
              <FreeRecallQuestion
                key={question.id}
                question={question}
                onAnswer={handleAnswer}
              />
            )}
            {answered && currentIdx < questions.length - 1 && (
              <button
                onClick={handleNext}
                className="rounded-lg bg-zinc-200 dark:bg-zinc-700 px-4 py-2 text-sm text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-600"
              >
                Next →
              </button>
            )}
            {answered && currentIdx === questions.length - 1 && (
              <button
                onClick={handleNext}
                className="rounded-lg bg-amber-600 px-4 py-2 text-sm text-zinc-100 transition-colors hover:bg-amber-500"
              >
                See Summary
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t(lang, 'check.reviewSummary')}</p>
            <div className="space-y-2">
              {results.map((r, i) => {
                const q = questions.find((q) => q.id === r.questionId)
                return (
                  <div
                    key={r.questionId}
                    className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                      r.correct
                        ? 'border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5 text-zinc-800 dark:text-zinc-200'
                        : 'border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    <Icon
                      name={r.correct ? 'check' : 'lightbulb'}
                      className={`mt-0.5 shrink-0 ${r.correct ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}
                    />
                    <span>
                      <span className="text-zinc-600 dark:text-zinc-400">Q{i + 1}:</span> {q?.question}
                      {!r.correct && (
                        <span className="ml-2 text-xs text-amber-700 dark:text-amber-400">— review the explanation above</span>
                      )}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
