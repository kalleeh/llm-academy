import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'

import type { IconName } from '../../components/Icon'
import { tArray, useLanguage, useT } from '../../i18n'
import { whenToFineTuneSectionSv, whenToFineTuneSectionKo } from './tech-translations'
import { winCasesTranslations } from './data-translations'

type NodeId = 'start' | 'few-shot' | 'rag' | 'finetune' | 'done-prompt' | 'done-fewshot' | 'done-rag'

interface TreeNode {
  id: NodeId
  question: string
  yes: NodeId
  no: NodeId
}

const TREE: TreeNode[] = [
  { id: 'start', question: 'Is zero-shot prompting giving you the results you need?', yes: 'done-prompt', no: 'few-shot' },
  { id: 'few-shot', question: 'Does adding few-shot examples fix the quality issues?', yes: 'done-fewshot', no: 'rag' },
  { id: 'rag', question: 'Is the problem about missing knowledge (not style/format)?', yes: 'done-rag', no: 'finetune' },
]

const ENDPOINTS: Record<string, { label: string; color: string; detail: string; icon?: IconName }> = {
  'done-prompt': { label: '✅ Stick with prompting', color: 'text-green-400', detail: 'Cheapest and most flexible. No training needed.' },
  'done-fewshot': { label: '✅ Use few-shot prompting', color: 'text-green-400', detail: 'Works well for most tasks. Add examples to your prompt.' },
  'done-rag': { label: '✅ Use RAG', color: 'text-blue-400', detail: 'Retrieval-Augmented Generation — inject relevant docs into context.' },
  finetune: { label: 'Fine-tune the model', color: 'text-amber-400', detail: 'Train the model to internalize your patterns, format, and domain.', icon: 'wrench' as const },
}

const WIN_CASES = [
  { title: '1. When to Fine-Tune', desc: 'Always return valid JSON, specific XML schema, or structured reports — without fragile prompt engineering.' },
  { title: 'Domain terminology', desc: 'Medical, legal, or internal jargon that the base model gets wrong or hallucinates.' },
  { title: 'Latency reduction', desc: 'A fine-tuned 8B model can match a general 70B model on your task — 10x faster, 10x cheaper.' },
  { title: 'Behavior patterns', desc: 'Teach a specific tone, refusal style, or multi-step reasoning pattern that prompting can\'t reliably produce.' },
]

const EN_INTRO = `Fine-tuning is powerful but expensive. Walk through this decision tree to see if you actually need it.`

export const WhenToFineTuneSection: React.FC = () => {
  const { lang } = useLanguage()
  const wIN_CASEST = tArray(lang, WIN_CASES, winCasesTranslations)
  const c = useT({ title: '1. When to Fine-Tune', intro: EN_INTRO }, { sv: whenToFineTuneSectionSv, ko: whenToFineTuneSectionKo })
  const [path, setPath] = useState<NodeId[]>(['start'])

  const currentId = path[path.length - 1]
  const currentNode = TREE.find(n => n.id === currentId)
  const endpoint = ENDPOINTS[currentId]

  const handleChoice = useCallback((next: NodeId) => {
    setPath(prev => [...prev, next])
  }, [])

  const handleReset = useCallback(() => {
    setPath(['start'])
  }, [])

  return (
    <section aria-labelledby="when-to-finetune">
      <h2 id="when-to-finetune" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="font-mono text-xs text-zinc-500">Decision path:</span>
          {path.map((id, i) => (
            <span key={i} className="font-mono text-xs text-zinc-400">
              {i > 0 && ' → '}{id}
            </span>
          ))}
        </div>

        {currentNode && !endpoint ? (
          <div className="space-y-4">
            <p className="text-lg font-medium text-zinc-100">{currentNode.question}</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleChoice(currentNode.yes)}
                className="rounded-md bg-green-600/20 px-4 py-2 text-sm font-medium text-green-400 transition-colors hover:bg-green-600/30"
              >
                Yes
              </button>
              <button
                onClick={() => handleChoice(currentNode.no)}
                className="rounded-md bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-600/30"
              >
                No
              </button>
            </div>
          </div>
        ) : endpoint ? (
          <div className="space-y-3">
            <p className={`text-lg font-bold ${endpoint.color}`}>{endpoint.icon && <Icon name={endpoint.icon} />} {endpoint.label}</p>
            <p className="text-sm text-zinc-300">{endpoint.detail}</p>
            <button
              onClick={handleReset}
              className="rounded-md bg-zinc-700 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-zinc-600"
            >
              Start over
            </button>
          </div>
        ) : null}
      </div>

      <h3 className="mb-4 font-mono text-sm font-semibold tracking-wider text-zinc-400 uppercase">
        Where fine-tuning wins
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {wIN_CASEST.map(c => (
          <div key={c.title} className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
            <p className="mb-1 text-sm font-semibold text-amber-400">{c.title}</p>
            <p className="text-xs leading-relaxed text-zinc-400">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
