import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'
import { waysToFeedSv, waysToFeedKo } from './translations'

const METHODS = [
  { name: 'Paste into chat', youKnowItAs: 'Copy-pasting text into ChatGPT or Claude', howItWorks: 'The text goes directly into the conversation as context.', whatItHandles: ['Short text (emails, paragraphs)', 'Quick one-off questions'], limits: 'Limited by context window. Nothing saved between conversations.', isRag: 'Not RAG — just giving the AI more context.', color: 'border-blue-500/30 bg-blue-500/5' },
  { name: 'Upload a file in chat', youKnowItAs: 'Dragging a PDF or Word doc into ChatGPT, Claude, or Gemini', howItWorks: 'The tool extracts text and puts it into conversation context.', whatItHandles: ['PDFs, Word docs, spreadsheets, images', 'Asking about a specific document'], limits: 'Still limited by context window. Gone when you start a new conversation.', isRag: 'Usually not RAG — the file is stuffed into context, not indexed.', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { name: 'Knowledge base / Project files', youKnowItAs: 'ChatGPT Projects, Claude Projects, Amazon Quick', howItWorks: 'You upload many documents to a persistent collection. The tool searches across all of them per question.', whatItHandles: ['Dozens to thousands of documents', 'Ongoing Q&A about a body of knowledge'], limits: 'You trust the platform\'s chunking and search quality.', isRag: 'Yes — this IS RAG. The platform indexes, searches, and feeds relevant chunks to the AI.', color: 'border-amber-500/30 bg-amber-500/5' },
  { name: 'Custom RAG system', youKnowItAs: 'What your engineering team builds using Amazon Bedrock Knowledge Bases or similar', howItWorks: 'Your team controls every step: chunking, embedding, vector database, retrieval, generation.', whatItHandles: ['Thousands to millions of documents', 'Customer-facing chatbots that need accuracy'], limits: 'Requires engineering effort. But you get full control.', isRag: 'Yes — RAG with full control. The enterprise-grade version.', color: 'border-purple-500/30 bg-purple-500/5' },
]

const EN = {
  title: '3. "I Uploaded a PDF to ChatGPT — Is That RAG?"',
  intro: 'There are several ways to give AI access to your information, and they work differently. You have probably used some of these already without knowing the technical name.',
  selfExplainPrompt: 'A colleague says "I just upload everything to ChatGPT and it works fine — why would we need a custom RAG system?" How would you explain the difference?',
  selfExplainAnswer: 'Uploading to ChatGPT works for personal, ad-hoc use. But it has limits: (1) Not persistent — re-upload every time. (2) Can\'t search thousands of documents. (3) No access controls. (4) No audit trail. A RAG system indexes all docs once, searches intelligently, respects permissions, and provides sourced answers at scale.',
}

export const WaysToFeedAIBusiness: React.FC = () => {
  const c = useT(EN, { sv: waysToFeedSv, ko: waysToFeedKo })
  const [expanded, setExpanded] = useState<number | null>(0)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="feed-biz">
      <h2 id="feed-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="mb-8 space-y-2">
        {METHODS.map((m, i) => (
          <div key={i} className={`rounded-lg border ${m.color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="min-w-0"><span className="text-sm font-medium text-zinc-100">{m.name}</span><span className="ml-2 text-xs text-zinc-500">— {m.youKnowItAs}</span></div>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-800 px-5 py-4">
                <p className="text-sm text-zinc-300">{m.howItWorks}</p>
                <div className="space-y-1">{m.whatItHandles.map((h: string) => <p key={h} className="text-xs text-zinc-400">• {h}</p>)}</div>
                <p className="text-xs text-zinc-500">{m.limits}</p>
                <div className={`rounded px-3 py-2 ${m.isRag.startsWith('Yes') ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-zinc-800/50'}`}>
                  <p className="text-sm text-zinc-300">{m.isRag}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
