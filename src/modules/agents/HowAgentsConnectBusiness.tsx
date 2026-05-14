import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Non-translatable per-concept color metadata. Order matches `concepts` array in
// `useTranslation().modules.agents.connect.concepts`.
//
// Verified May 2026:
// - MCP (Model Context Protocol): open standard from Anthropic, adopted by OpenAI,
//   Google, Microsoft, AWS. Hundreds of public MCP servers (mcp.so registry, etc.).
// - Skills (SKILL.md): Anthropic, launched Oct 2025, open standard Dec 2025.
// - Kiro Powers: AWS Kiro feature — bundled MCP servers + steering for a tech domain.
// - A2A: Google-led protocol launched April 2025; donated to Linux Foundation.
const CONCEPT_META = [
  { color: 'border-emerald-500/30 bg-emerald-500/5' },
  { color: 'border-amber-500/30 bg-amber-500/5' },
  { color: 'border-purple-500/30 bg-purple-500/5' },
  { color: 'border-cyan-500/30 bg-cyan-500/5' },
]

export const HowAgentsConnectBusiness: React.FC = () => {
  const c = useTranslation().modules.agents.connect
  const [expanded, setExpanded] = useState<number | null>(0)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="connect-biz">
      <h2 id="connect-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="mb-6 space-y-2">
        {c.concepts.map((concept, i) => (
          <div key={i} className={`rounded-lg border ${CONCEPT_META[i].color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="min-w-0">
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{concept.name}</span>
                <span className="ml-2 text-xs text-zinc-500">— {concept.analogy}</span>
              </div>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4 text-sm">
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">What it actually is</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: concept.whatItIs }} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">Where you&apos;ll see it in real life</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: concept.whereYouSeeIt }} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-amber-300">Do you need to do anything?</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: concept.doIneedToDoSomething }} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-emerald-400">Why you should care</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: concept.whyCare }} />
                </div>
                <div className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3">
                  <p className="mb-1 text-xs font-medium text-zinc-500">Concrete example</p>
                  <p className="text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: concept.example }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
        <p className="mb-2 text-sm font-medium text-amber-300">{c.insightTitle}</p>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{c.insightText}</p>
      </div>

      <div className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{c.platformNote}</p>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
