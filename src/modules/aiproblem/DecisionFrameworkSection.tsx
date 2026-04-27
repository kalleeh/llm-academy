import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../useT'
import { decisionFrameworkSectionSv, decisionFrameworkSectionKo } from './tech-translations'

interface TreeNode {
  id: string
  question?: string
  answer?: string
  explanation?: string
  example?: string
  yes?: string
  no?: string
}

const TREE: Record<string, TreeNode> = {
  start: {
    id: 'start',
    question: 'Is your problem well-defined with clear, deterministic rules?',
    yes: 'rule-based',
    no: 'structured',
  },
  'rule-based': {
    id: 'rule-based',
    answer: 'Rule-based system',
    explanation:
      'If the logic can be fully captured in formulas, lookup tables, or decision rules — you don\'t need ML at all. Traditional software is cheaper, faster, and 100% predictable.',
    example: 'Tax calculation, unit conversion, shipping cost formulas, form validation.',
  },
  structured: {
    id: 'structured',
    question: 'Do you have structured/tabular data?',
    yes: 'prediction',
    no: 'media',
  },
  prediction: {
    id: 'prediction',
    question: 'Do you need prediction or pattern recognition?',
    yes: 'classical-ml',
    no: 'rule-based-2',
  },
  'classical-ml': {
    id: 'classical-ml',
    answer: 'Classical ML',
    explanation:
      'Structured data with rows and columns is the sweet spot for gradient boosting, random forests, and logistic regression. These models are fast, interpretable, and battle-tested.',
    example: 'Fraud detection, churn prediction, credit scoring, demand forecasting.',
  },
  'rule-based-2': {
    id: 'rule-based-2',
    answer: 'Rule-based or simple analytics',
    explanation:
      'If you have structured data but just need aggregation, filtering, or reporting — SQL and business logic are the right tool.',
    example: 'Dashboard metrics, inventory alerts, threshold-based notifications.',
  },
  media: {
    id: 'media',
    question: 'Does it involve images, audio, or video?',
    yes: 'deep-learning',
    no: 'text',
  },
  'deep-learning': {
    id: 'deep-learning',
    answer: 'Deep Learning (CNN / speech models)',
    explanation:
      'Unstructured media data requires neural networks that learn hierarchical features. CNNs for images, specialized architectures like Whisper for audio.',
    example: 'Image classification, object detection, speech-to-text, video analysis.',
  },
  text: {
    id: 'text',
    question: 'Does it involve understanding or generating natural language?',
    yes: 'llm',
    no: 'reassess',
  },
  llm: {
    id: 'llm',
    answer: 'LLM',
    explanation:
      'If the task requires reading, writing, reasoning about, or generating text — LLMs are purpose-built for this. Add RAG for domain knowledge, fine-tuning for specialized behavior.',
    example: 'Summarization, chatbots, code generation, document Q&A, translation.',
  },
  reassess: {
    id: 'reassess',
    answer: 'Reassess the problem',
    explanation:
      'If none of the above fit, break the problem into smaller sub-problems. Most real-world systems combine multiple approaches — an LLM for text + classical ML for scoring + rules for validation.',
    example: 'E-commerce: rules for pricing + ML for recommendations + LLM for product descriptions.',
  },
}

const NODE_COLORS: Record<string, string> = {
  'rule-based': 'border-zinc-500/50 bg-zinc-500/10',
  'rule-based-2': 'border-zinc-500/50 bg-zinc-500/10',
  'classical-ml': 'border-emerald-500/50 bg-emerald-500/10',
  'deep-learning': 'border-purple-500/50 bg-purple-500/10',
  llm: 'border-amber-500/50 bg-amber-500/10',
  reassess: 'border-cyan-500/50 bg-cyan-500/10',
}

const EN_INTRO = `Walk through this decision tree to find the right approach for your problem.`

export const DecisionFrameworkSection: React.FC = () => {
  const c = useT({ title: '3. The Decision Framework', intro: EN_INTRO }, { sv: decisionFrameworkSectionSv, ko: decisionFrameworkSectionKo })
  const [path, setPath] = useState<string[]>(['start'])

  const currentId = path[path.length - 1]
  const current = TREE[currentId]

  const choose = useCallback(
    (nextId: string) => {
      setPath(prev => [...prev, nextId])
    },
    [],
  )

  const reset = useCallback(() => {
    setPath(['start'])
  }, [])

  const goBack = useCallback(() => {
    setPath(prev => (prev.length > 1 ? prev.slice(0, -1) : prev))
  }, [])

  return (
    <section aria-labelledby="decision-framework">
      <h2 id="decision-framework" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="rounded-lg border border-zinc-700 bg-zinc-900">
        {/* Path breadcrumb */}
        <div className="flex flex-wrap items-center gap-1 border-b border-zinc-700 bg-zinc-800 px-6 py-3">
          {path.map((nodeId, i) => {
            const node = TREE[nodeId]
            return (
              <span key={nodeId} className="flex items-center gap-1">
                {i > 0 && <span className="text-xs text-zinc-600">→</span>}
                <span
                  className={`rounded px-2 py-0.5 text-xs ${
                    i === path.length - 1
                      ? 'bg-zinc-600 text-zinc-100'
                      : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {node.answer ?? (node.question ? node.question.slice(0, 30) + '…' : nodeId)}
                </span>
              </span>
            )
          })}
        </div>

        <div className="p-6">
          {current.question ? (
            <div>
              <p className="mb-4 text-lg font-medium text-zinc-100">{current.question}</p>
              <div className="flex gap-3">
                {current.yes && (
                  <button
                    onClick={() => choose(current.yes!)}
                    className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-6 py-2 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20"
                  >
                    Yes
                  </button>
                )}
                {current.no && (
                  <button
                    onClick={() => choose(current.no!)}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-6 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20"
                  >
                    No
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className={`rounded-lg border p-4 ${NODE_COLORS[currentId] ?? 'border-zinc-700 bg-zinc-800'}`}>
              <h3 className="mb-2 font-mono text-sm font-bold text-zinc-100">→ {current.answer}</h3>
              <p className="mb-2 text-sm leading-relaxed text-zinc-300">{current.explanation}</p>
              <p className="text-xs text-zinc-500">
                <span className="font-semibold text-zinc-400">Examples: </span>
                {current.example}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2 border-t border-zinc-700 bg-zinc-800 px-6 py-3">
          <button
            onClick={goBack}
            disabled={path.length <= 1}
            className="rounded bg-zinc-700 px-4 py-1.5 text-xs text-zinc-200 transition-colors hover:bg-zinc-600 disabled:opacity-40"
          >
            ← Back
          </button>
          <button
            onClick={reset}
            className="rounded bg-zinc-700 px-4 py-1.5 text-xs text-zinc-200 transition-colors hover:bg-zinc-600"
          >
            Start Over
          </button>
        </div>
      </div>

      <SelfExplain
        prompt="You just walked through the decision tree. Think of a real problem at your job or in a project you've worked on. Which branch of the tree would it land on, and why? Would you have picked a different approach before seeing this framework?"
        modelAnswer="A good answer picks a specific problem (e.g., 'classifying support tickets') and traces it through the tree: it involves natural language → not images/audio → yes, understanding text → LLM. The key insight is that many problems people reach for LLMs to solve actually belong in the classical ML or rule-based branches — like anything with structured tabular data or deterministic logic. The framework helps you avoid over-engineering with expensive LLM calls when a simpler tool would work better."
      />
    </section>
  )
}
