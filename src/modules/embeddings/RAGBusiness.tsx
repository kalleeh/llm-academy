import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'
import { ragSv, ragKo } from './translations'

const RAG_STEPS = [
  { type: 'user', label: 'You ask', content: 'What\'s our return policy for enterprise customers?', color: 'border-blue-500/30 bg-blue-500/5', badge: 'bg-blue-500/20 text-blue-300' },
  { type: 'search', label: 'AI searches your docs', content: null, docs: [{ name: 'Enterprise Terms of Service v4.2', match: '96%', section: 'Section 7: Returns & Refunds' }, { name: 'Customer FAQ - Returns', match: '82%', section: 'Enterprise tier exceptions' }], color: 'border-purple-500/30 bg-purple-500/5', badge: 'bg-purple-500/20 text-purple-300' },
  { type: 'read', label: 'AI reads the relevant sections', content: '"Enterprise customers may request a full refund within 60 calendar days..." — Enterprise ToS v4.2, Section 7.1', color: 'border-amber-500/30 bg-amber-500/5', badge: 'bg-amber-500/20 text-amber-300' },
  { type: 'answer', label: 'AI answers with sources', content: 'Enterprise customers have a 60-day full refund window. Contact your account manager — refunds are processed within 10 business days.\n\nSource: Enterprise Terms of Service v4.2, Section 7.1', color: 'border-emerald-500/30 bg-emerald-500/5', badge: 'bg-emerald-500/20 text-emerald-300' },
]

const EN = {
  title: '2. Giving AI Access to Your Company\'s Knowledge',
  intro: 'Out of the box, AI only knows general knowledge from the internet. RAG gives it an open-book exam — it searches your documents before answering. Watch it work:',
  nextStep: 'Next step →',
  startOver: 'Start over',
  withoutRagLabel: 'Without RAG (answering from memory)',
  withRagLabel: 'With RAG (open-book exam)',
  whenTitle: 'When to use this approach',
  selfExplainPrompt: 'Your team has 10,000 support articles. A customer asks a question. Walk through how RAG would help the AI find and use the right article.',
  selfExplainAnswer: 'Step 1: Customer types their question. Step 2: AI converts it into a meaning fingerprint and searches all 10,000 articles. Step 3: AI reads the most relevant sections. Step 4: AI generates a clear answer with source citation.',
}

export const RAGBusiness: React.FC = () => {
  const c = useT(EN, { sv: ragSv, ko: ragKo })
  const [visibleSteps, setVisibleSteps] = useState(1)
  const showNext = useCallback(() => setVisibleSteps((p) => Math.min(p + 1, RAG_STEPS.length)), [])
  const reset = useCallback(() => setVisibleSteps(1), [])

  return (
    <section aria-labelledby="rag-biz">
      <h2 id="rag-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="mb-4 rounded-lg border border-zinc-700 bg-zinc-900 overflow-hidden">
        <div className="border-b border-zinc-700 bg-zinc-800 px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-zinc-400">RAG in action</span>
          <span className="text-xs text-zinc-500">{visibleSteps} / {RAG_STEPS.length}</span>
        </div>
        <div className="p-4 space-y-3">
          {RAG_STEPS.slice(0, visibleSteps).map((step, i) => (
            <div key={i} className={`rounded-lg border p-4 ${step.color}`}>
              <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${step.badge}`}>{step.label}</span>
              {step.content && <p className="mt-2 text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">{step.content}</p>}
              {step.docs && (<div className="mt-2 space-y-1.5">{step.docs.map((doc, j) => (<div key={j} className="flex items-center justify-between rounded bg-zinc-800/50 px-3 py-2"><div><p className="text-xs font-medium text-zinc-200">{doc.name}</p><p className="text-xs text-zinc-500">{doc.section}</p></div><span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-xs text-purple-300">{doc.match}</span></div>))}</div>)}
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-700 bg-zinc-800 px-4 py-2">
          {visibleSteps < RAG_STEPS.length ? (
            <button onClick={showNext} className="rounded bg-zinc-600 px-3 py-1 text-xs text-zinc-100 hover:bg-zinc-500">{c.nextStep}</button>
          ) : (
            <button onClick={reset} className="rounded bg-zinc-600 px-3 py-1 text-xs text-zinc-100 hover:bg-zinc-500">{c.startOver}</button>
          )}
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="mb-2 text-xs font-medium text-red-400">{c.withoutRagLabel}</p>
          <p className="text-sm text-zinc-400 italic">Most enterprise software companies offer a 30-day return policy, though this can vary. I&apos;d recommend checking your specific contract terms.</p>
        </div>
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="mb-2 text-xs font-medium text-emerald-400">{c.withRagLabel}</p>
          <p className="text-sm text-zinc-300 italic">Enterprise customers have a 60-day full refund window. Contact your account manager. (Source: Enterprise ToS v4.2, Section 7.1)</p>
        </div>
      </div>

      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-100">{c.whenTitle}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { yes: true, text: 'Your information changes frequently' },
            { yes: true, text: 'You need answers with sources' },
            { yes: true, text: 'You have lots of existing documents' },
            { yes: true, text: 'Accuracy matters more than creativity' },
            { yes: false, text: 'You need a specific brand voice (use fine-tuning)' },
            { yes: false, text: 'Creative writing with no reference material' },
          ].map((item) => (
            <div key={item.text} className="rounded bg-zinc-800/50 px-3 py-2">
              <span className={`text-xs ${item.yes ? 'text-emerald-400' : 'text-zinc-500'}`}>{item.yes ? '✓' : '✗'} </span>
              <span className="text-xs text-zinc-400">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
