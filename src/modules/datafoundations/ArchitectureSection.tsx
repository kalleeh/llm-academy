import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

interface PatternMeta {
  id: string
  icon: IconName
  color: string
  borderColor: string
}

// Non-translatable per-pattern metadata. Order matches `patterns` array in
// `useTranslation().modules.datafoundations.architectureSection.patterns`.
const PATTERN_META: PatternMeta[] = [
  { id: 'warehouse', icon: 'warehouse', color: 'bg-blue-50 dark:bg-blue-500/10', borderColor: 'border-blue-400 dark:border-blue-500/30' },
  { id: 'lake', icon: 'lake', color: 'bg-emerald-50 dark:bg-emerald-500/10', borderColor: 'border-emerald-400 dark:border-emerald-500/30' },
  { id: 'lakehouse', icon: 'home', color: 'bg-purple-50 dark:bg-purple-500/10', borderColor: 'border-purple-400 dark:border-purple-500/30' },
  { id: 'vector', icon: 'compass', color: 'bg-amber-50 dark:bg-amber-500/10', borderColor: 'border-amber-400 dark:border-amber-500/30' },
]

export const ArchitectureSection: React.FC = () => {
  const c = useTranslation().modules.datafoundations.architectureSection
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = useCallback((id: string) => {
    setExpanded(prev => (prev === id ? null : id))
  }, [])

  return (
    <section aria-labelledby="architecture">
      <h2 id="architecture" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {c.patterns.map((p, i) => {
          const meta = PATTERN_META[i]
          const isOpen = expanded === meta.id
          return (
            <button
              key={meta.id}
              onClick={() => toggle(meta.id)}
              className={`rounded-lg border text-left transition-all ${meta.borderColor} ${meta.color} ${
                isOpen ? 'ring-2 ring-zinc-400/50' : 'hover:brightness-125'
              }`}
              aria-expanded={isOpen}
            >
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Icon name={meta.icon} />
                  <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{p.title}</h3>
                </div>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{p.tagline}</p>
              </div>

              {isOpen && (
                <div className="border-t border-zinc-200/50 dark:border-zinc-700/50 p-4 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">When to use</p>
                    <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">{p.whenToUse}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">✓ Pros</p>
                      <ul className="mt-1 space-y-0.5">
                        {p.pros.map(pro => (
                          <li key={pro} className="text-xs text-zinc-600 dark:text-zinc-400">• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-red-700 dark:text-red-400">✗ Cons</p>
                      <ul className="mt-1 space-y-0.5">
                        {p.cons.map(con => (
                          <li key={con} className="text-xs text-zinc-600 dark:text-zinc-400">• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Tools</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {p.tools.map(t => (
                        <span key={t} className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs text-zinc-700 dark:text-zinc-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* RAG connection callout */}
      <div className="mt-6 rounded-lg border border-amber-400 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4">
        <p className="text-sm font-medium text-amber-700 dark:text-amber-300"><Icon name="link" />{c.p6}</p>
        <p className="mt-1 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          Vector stores are the bridge between your data and LLMs. In{' '}
          <span className="text-amber-800 dark:text-amber-200">{c.p4}</span>, you embed
          your documents into vectors, store them, then at query time retrieve the most relevant
          chunks and feed them to the LLM as context. This lets the model answer questions about
          <em> your</em> data without retraining.
        </p>
      </div>
    </section>
  )
}
