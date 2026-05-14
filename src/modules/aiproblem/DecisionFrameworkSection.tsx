import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Non-translatable graph structure: which node id leads where on yes/no.
// Translatable text (question / answer / explanation / example) lives in
// `useTranslation().modules.aiproblem.decisionFrameworkSection.tree`.
const TREE_GRAPH: Record<string, { yes?: string; no?: string }> = {
  start: { yes: 'rule-based', no: 'structured' },
  structured: { yes: 'prediction', no: 'media' },
  prediction: { yes: 'classical-ml', no: 'rule-based-2' },
  media: { yes: 'deep-learning', no: 'text' },
  text: { yes: 'llm', no: 'reassess' },
}

const NODE_COLORS: Record<string, string> = {
  'rule-based': 'border-zinc-500/50 bg-zinc-500/10',
  'rule-based-2': 'border-zinc-500/50 bg-zinc-500/10',
  'classical-ml': 'border-emerald-400 dark:border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/10',
  'deep-learning': 'border-purple-400 dark:border-purple-500/50 bg-purple-50 dark:bg-purple-500/10',
  llm: 'border-amber-400 dark:border-amber-500/50 bg-amber-50 dark:bg-amber-500/10',
  reassess: 'border-cyan-400 dark:border-cyan-500/50 bg-cyan-50 dark:bg-cyan-500/10',
}

export const DecisionFrameworkSection: React.FC = () => {
  const c = useTranslation().modules.aiproblem.decisionFrameworkSection
  const [path, setPath] = useState<string[]>(['start'])

  const currentId = path[path.length - 1]
  const current = c.tree[currentId as keyof typeof c.tree] as {
    question?: string
    answer?: string
    explanation?: string
    example?: string
  }
  const graph = TREE_GRAPH[currentId]

  const choose = useCallback((nextId: string) => {
    setPath(prev => [...prev, nextId])
  }, [])

  const reset = useCallback(() => {
    setPath(['start'])
  }, [])

  const goBack = useCallback(() => {
    setPath(prev => (prev.length > 1 ? prev.slice(0, -1) : prev))
  }, [])

  return (
    <section aria-labelledby="decision-framework">
      <h2 id="decision-framework" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
        {/* Path breadcrumb */}
        <div className="flex flex-wrap items-center gap-1 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-6 py-3">
          {path.map((nodeId, i) => {
            const node = c.tree[nodeId as keyof typeof c.tree] as {
              question?: string
              answer?: string
            }
            return (
              <span key={nodeId} className="flex items-center gap-1">
                {i > 0 && <span className="text-xs text-zinc-500 dark:text-zinc-600">→</span>}
                <span
                  className={`rounded px-2 py-0.5 text-xs ${
                    i === path.length - 1
                      ? 'bg-zinc-600 text-zinc-900 dark:text-zinc-100'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
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
              <p className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">{current.question}</p>
              <div className="flex gap-3">
                {graph?.yes && (
                  <button
                    onClick={() => choose(graph.yes!)}
                    className="rounded-lg border border-emerald-400 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-6 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300 transition-colors hover:bg-emerald-100 dark:hover:bg-emerald-500/20"
                  >
                    Yes
                  </button>
                )}
                {graph?.no && (
                  <button
                    onClick={() => choose(graph.no!)}
                    className="rounded-lg border border-red-400 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 px-6 py-2 text-sm font-medium text-red-700 dark:text-red-300 transition-colors hover:bg-red-100 dark:hover:bg-red-500/20"
                  >
                    No
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className={`rounded-lg border p-4 ${NODE_COLORS[currentId] ?? 'border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800'}`}>
              <h3 className="mb-2 font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">→ {current.answer}</h3>
              <p className="mb-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{current.explanation}</p>
              <p className="text-xs text-zinc-500">
                <span className="font-semibold text-zinc-600 dark:text-zinc-400">Examples: </span>
                {current.example}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-6 py-3">
          <button
            onClick={goBack}
            disabled={path.length <= 1}
            className="rounded bg-zinc-200 dark:bg-zinc-700 px-4 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-600 disabled:opacity-40"
          >
            ← Back
          </button>
          <button
            onClick={reset}
            className="rounded bg-zinc-200 dark:bg-zinc-700 px-4 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-600"
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
