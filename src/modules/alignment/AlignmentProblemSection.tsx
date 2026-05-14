import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import { useTranslation } from '../../i18n'

export const AlignmentProblemSection: React.FC = () => {
  const c = useTranslation().modules.alignment.alignmentProblemSection
  const [selected, setSelected] = useState(0)
  const [showAligned, setShowAligned] = useState(false)

  const selectPrompt = useCallback((i: number) => {
    setSelected(i)
    setShowAligned(false)
  }, [])

  const toggleView = useCallback(() => setShowAligned(p => !p), [])

  const example = c.examples[selected]

  return (
    <section aria-labelledby="alignment-problem">
      <h2 id="alignment-problem" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        Pre-training teaches a model <strong className="text-zinc-900 dark:text-zinc-100">language</strong> — how to
        predict the next token. But predicting text isn&apos;t the same as being helpful or safe.
        A base model will happily complete harmful prompts, generate misinformation, or produce
        toxic content because it&apos;s just doing autocomplete.
      </p>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        <strong className="text-zinc-900 dark:text-zinc-100">Alignment</strong> teaches the model{' '}
        <strong className="text-zinc-900 dark:text-zinc-100">behavior</strong> — to be helpful, harmless, and honest.
        Toggle between base and aligned responses to see the difference.
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {c.examples.map((ex, i) => (
          <button
            key={i}
            onClick={() => selectPrompt(i)}
            className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
              selected === i
                ? 'border-zinc-500 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-600'
            }`}
          >
            &ldquo;{ex.prompt}&rdquo;
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
          <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">Prompt: {example.prompt}</span>
          <button
            onClick={toggleView}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              showAligned
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {showAligned ? '✓ Aligned Model' : <><Icon name="warning" /> Base Model</>}
          </button>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {showAligned ? example.aligned : example.base}
          </pre>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 p-4">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <strong className="text-amber-400">Key insight:</strong> {c.p2} <em>which</em> behaviors we want.
        </p>
      </div>
    </section>
  )
}
