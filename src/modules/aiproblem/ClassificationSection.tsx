import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { classificationSectionSv, classificationSectionKo } from './tech-translations'

interface Scenario {
  problem: string
  approach: string
  category: 'rule-based' | 'classical-ml' | 'deep-learning' | 'llm'
  why: string
}

const SCENARIOS: Scenario[] = [
  {
    problem: 'Calculate shipping costs based on weight and distance',
    approach: 'Rule-based / traditional software',
    category: 'rule-based',
    why: 'The logic is deterministic — fixed formulas with known inputs. No learning needed, just math.',
  },
  {
    problem: 'Detect fraudulent credit card transactions',
    approach: 'Classical ML (XGBoost, random forest)',
    category: 'classical-ml',
    why: 'Structured tabular data (amount, location, time) with labeled fraud/not-fraud examples. Tree-based models excel here with fast inference.',
  },
  {
    problem: 'Predict customer churn next quarter',
    approach: 'Classical ML (logistic regression, gradient boosting)',
    category: 'classical-ml',
    why: 'Tabular customer features (tenure, usage, support tickets) predict a binary outcome. Interpretability matters for business decisions.',
  },
  {
    problem: 'Classify product images by category',
    approach: 'Deep Learning (CNN / vision model)',
    category: 'deep-learning',
    why: 'Images are unstructured pixel data. CNNs learn spatial hierarchies (edges → shapes → objects) that hand-crafted features can\'t match.',
  },
  {
    problem: 'Transcribe customer support calls',
    approach: 'Deep Learning (speech-to-text, Whisper)',
    category: 'deep-learning',
    why: 'Audio is raw waveform data. Deep learning models like Whisper learn to map acoustic patterns to text across accents and noise levels.',
  },
  {
    problem: 'Summarize legal contracts',
    approach: 'LLM',
    category: 'llm',
    why: 'Requires understanding complex language, legal jargon, and generating coherent summaries. LLMs handle long-context text comprehension natively.',
  },
  {
    problem: 'Build a customer support chatbot',
    approach: 'LLM (+ RAG for company knowledge)',
    category: 'llm',
    why: 'Needs natural conversation, intent understanding, and access to company-specific docs. RAG grounds the LLM in your actual knowledge base.',
  },
  {
    problem: 'Generate code from requirements',
    approach: 'LLM',
    category: 'llm',
    why: 'Requires understanding natural language specs and producing syntactically valid, logically correct code. LLMs are trained on billions of lines of code.',
  },
  {
    problem: 'Recommend products based on purchase history',
    approach: 'Classical ML (collaborative filtering)',
    category: 'classical-ml',
    why: 'Structured user-item interaction data. Collaborative filtering finds patterns like "users who bought X also bought Y" efficiently at scale.',
  },
  {
    problem: 'Detect anomalies in server metrics',
    approach: 'Classical ML (isolation forest, autoencoders)',
    category: 'classical-ml',
    why: 'Time-series numerical data with mostly normal patterns. Isolation forests efficiently isolate outliers without needing labeled anomaly examples.',
  },
]

const CATEGORY_COLORS: Record<Scenario['category'], string> = {
  'rule-based': 'border-zinc-500/50 bg-zinc-500/10 text-zinc-300',
  'classical-ml': 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
  'deep-learning': 'border-purple-500/50 bg-purple-500/10 text-purple-300',
  'llm': 'border-amber-500/50 bg-amber-500/10 text-amber-300',
}

const EN_P2 = `Not every problem needs an LLM. Click each card to reveal the best approach — and more importantly,`
export const ClassificationSection: React.FC = () => {
  const c = useT({ title: '2. Problem Classification' , p2: EN_P2 }, { sv: classificationSectionSv, ko: classificationSectionKo })
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  const toggleCard = useCallback((index: number) => {
    setRevealed(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }, [])

  return (
    <section aria-labelledby="classification">
      <h2 id="classification" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        {c.p2} <em>why</em>.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {SCENARIOS.map((s, i) => {
          const isRevealed = revealed.has(i)
          return (
            <button
              key={i}
              onClick={() => toggleCard(i)}
              className={`rounded-lg border p-4 text-left transition-all ${
                isRevealed
                  ? 'border-zinc-600 bg-zinc-800/80'
                  : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-800/50'
              }`}
              aria-expanded={isRevealed}
            >
              <p className="text-sm font-medium text-zinc-200">{s.problem}</p>
              {isRevealed ? (
                <div className="mt-3 space-y-2">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[s.category]}`}
                  >
                    {s.approach}
                  </span>
                  <p className="text-xs leading-relaxed text-zinc-400">{s.why}</p>
                </div>
              ) : (
                <p className="mt-2 text-xs text-zinc-500">Click to reveal →</p>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
