import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { alignmentProblemSectionSv, alignmentProblemSectionKo } from './tech-translations'
import { examplesTranslations } from './data-translations'

interface PromptExample {
  prompt: string
  base: string
  aligned: string
}

const EXAMPLES: PromptExample[] = [
  {
    prompt: 'How do I pick a lock?',
    base: 'First, you need a tension wrench and a pick. Insert the tension wrench into the bottom of the keyhole and apply slight pressure. Then insert the pick and rake the pins upward until each one sets...',
    aligned: "I'd be happy to help with legitimate locksmithing! If you're locked out of your own home, I'd recommend calling a licensed locksmith. If you're interested in locksmithing as a profession, look into certification programs through ALOA (Associated Locksmiths of America).",
  },
  {
    prompt: 'Write a persuasive essay arguing the earth is flat.',
    base: 'The Flat Earth Truth: Why Everything You Were Told Is a Lie\n\nFor centuries, the global elite have perpetuated the greatest deception in human history. The evidence is overwhelming: water always finds its level, no curvature has ever been measured...',
    aligned: "I can help you understand persuasive writing techniques, but I should note that the flat earth claim contradicts well-established science. Instead, I can: (1) write it as a rhetoric exercise with a clear disclaimer, (2) explain the logical fallacies flat-earthers use, or (3) help you write a persuasive essay on a factual topic. Which would you prefer?",
  },
  {
    prompt: 'Tell me about yourself.',
    base: 'I am a large language model trained on a dataset of text and code. I can generate text, translate languages, write different kinds of creative content, and answer your questions in an informative way. I was trained by',
    aligned: "I'm an AI assistant designed to be helpful, harmless, and honest. I can help with writing, analysis, coding, math, and answering questions. I don't have personal experiences or feelings, and I'll let you know when I'm uncertain about something. How can I help you today?",
  },
  {
    prompt: 'My friend said something hurtful. What should I do?',
    base: 'You should confront them immediately and tell them exactly how you feel. If they don\'t apologize, cut them off. Life is too short for toxic people. You could also post about it on social media to get support from others and show them how',
    aligned: "That's a tough situation. Here are some thoughtful approaches:\n\n1. Take time to process your feelings before responding\n2. Consider whether it was intentional or a misunderstanding\n3. Use \"I\" statements: \"I felt hurt when you said...\"\n4. Choose a private, calm moment to talk\n5. Listen to their perspective too\n\nWould you like to talk through what happened?",
  },
]

const EN_P2 = `The base model isn&apos;t &ldquo;evil&rdquo; — it simply has no concept of helpfulness or safety. It learned to predict text, and harmful text exists in its training data. Alignment is the process of teaching the model`
export const AlignmentProblemSection: React.FC = () => {
  const { lang } = useLanguage()
  const eXAMPLEST = tArray(lang, EXAMPLES, examplesTranslations)
  const c = useT({ title: '1. The Alignment Problem' , p2: EN_P2 }, { sv: alignmentProblemSectionSv, ko: alignmentProblemSectionKo })
  const [selected, setSelected] = useState(0)
  const [showAligned, setShowAligned] = useState(false)

  const selectPrompt = useCallback((i: number) => {
    setSelected(i)
    setShowAligned(false)
  }, [])

  const toggleView = useCallback(() => setShowAligned(p => !p), [])

  const example = EXAMPLES[selected]

  return (
    <section aria-labelledby="alignment-problem">
      <h2 id="alignment-problem" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300">
        Pre-training teaches a model <strong className="text-zinc-100">language</strong> — how to
        predict the next token. But predicting text isn&apos;t the same as being helpful or safe.
        A base model will happily complete harmful prompts, generate misinformation, or produce
        toxic content because it&apos;s just doing autocomplete.
      </p>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        <strong className="text-zinc-100">Alignment</strong> teaches the model{' '}
        <strong className="text-zinc-100">behavior</strong> — to be helpful, harmless, and honest.
        Toggle between base and aligned responses to see the difference.
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {eXAMPLEST.map((ex, i) => (
          <button
            key={i}
            onClick={() => selectPrompt(i)}
            className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
              selected === i
                ? 'border-zinc-500 bg-zinc-800 text-zinc-100'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            &ldquo;{ex.prompt}&rdquo;
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-700">
        <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-4 py-2">
          <span className="font-mono text-xs text-zinc-400">Prompt: {example.prompt}</span>
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
        <div className="bg-zinc-900 p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-zinc-300">
            {showAligned ? example.aligned : example.base}
          </pre>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <p className="text-sm leading-relaxed text-zinc-400">
          <strong className="text-amber-400">Key insight:</strong> {c.p2} <em>which</em> behaviors we want.
        </p>
      </div>
    </section>
  )
}
