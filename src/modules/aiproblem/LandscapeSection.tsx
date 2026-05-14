import { useState, useCallback } from 'react'
import { useTranslation } from '../../i18n'

// Non-translatable per-level metadata. The translatable label / definition /
// examples live in `useTranslation().modules.aiproblem.landscapeSection.levels`
// and are merged in by index.
const LEVEL_META = [
  { id: 'ai', color: 'bg-blue-50 dark:bg-blue-500/10 border-blue-400 dark:border-blue-500/30', ringColor: 'ring-blue-500/50' },
  { id: 'ml', color: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-400 dark:border-emerald-500/30', ringColor: 'ring-emerald-500/50' },
  { id: 'dl', color: 'bg-purple-50 dark:bg-purple-500/10 border-purple-400 dark:border-purple-500/30', ringColor: 'ring-purple-500/50' },
  { id: 'llm', color: 'bg-amber-50 dark:bg-amber-500/10 border-amber-400 dark:border-amber-500/30', ringColor: 'ring-amber-500/50' },
] as const

// Non-translatable per-overlay metadata. Translatable label / description
// live in the tree.
const OVERLAY_META = [
  { color: 'bg-pink-100 dark:bg-pink-500/20 border-pink-400 dark:border-pink-500/40 text-pink-700 dark:text-pink-300', position: 'top-2 right-2' },
  { color: 'bg-cyan-100 dark:bg-cyan-500/20 border-cyan-400 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300', position: 'top-2 left-2' },
] as const

export const LandscapeSection: React.FC = () => {
  const c = useTranslation().modules.aiproblem.landscapeSection
  const [expanded, setExpanded] = useState<string | null>(null)
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null)

  const toggle = useCallback((id: string) => {
    setExpanded(prev => (prev === id ? null : id))
  }, [])

  const toggleOverlay = useCallback((label: string) => {
    setActiveOverlay(prev => (prev === label ? null : label))
  }, [])

  return (
    <section aria-labelledby="landscape">
      <h2 id="landscape" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Nested diagram */}
      <div className="relative mb-6">
        {c.levels.map((level, i) => {
          const meta = LEVEL_META[i]
          return (
            <div
              key={meta.id}
              style={{ marginLeft: `${i * 24}px`, marginRight: `${i * 24}px` }}
              className="mb-2"
            >
              <button
                onClick={() => toggle(meta.id)}
                className={`w-full rounded-lg border p-4 text-left transition-all ${meta.color} ${
                  expanded === meta.id ? `ring-2 ${meta.ringColor}` : ''
                } hover:brightness-125`}
                aria-expanded={expanded === meta.id}
                aria-controls={`${meta.id}-details`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{level.label}</span>
                  <span className="text-xs text-zinc-500">{expanded === meta.id ? '▲' : '▼'}</span>
                </div>
              </button>
              {expanded === meta.id && (
                <div
                  id={`${meta.id}-details`}
                  className="mt-1 rounded-b-lg border border-t-0 border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 p-4"
                >
                  <p className="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{level.definition}</p>
                  <ul className="space-y-1">
                    {level.examples.map(ex => (
                      <li key={ex} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="mt-1 text-zinc-500 dark:text-zinc-600">•</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* GenAI / Agentic badges */}
      <div className="flex flex-wrap gap-3">
        {c.overlays.map((o, i) => {
          const meta = OVERLAY_META[i]
          return (
            <div key={o.label}>
              <button
                onClick={() => toggleOverlay(o.label)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${meta.color} hover:brightness-125`}
                aria-expanded={activeOverlay === o.label}
              >
                {o.label}
              </button>
              {activeOverlay === o.label && (
                <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">{o.description}</p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
