import { useState, useCallback } from 'react'
import { useTranslation } from '../../i18n'

// Per-layer non-translatable metadata. Order matches the `layers` array in
// `useTranslation().modules.industry.ecosystemSection.layers`. Tools live in
// the tree (translatable note text); colors stay local.
const LAYER_COLORS = [
  'bg-purple-900/40 border-purple-500',
  'bg-blue-900/40 border-blue-500',
  'bg-green-900/40 border-green-500',
  'bg-amber-900/40 border-amber-500',
  'bg-red-900/40 border-red-500',
] as const

export const EcosystemSection: React.FC = () => {
  const c = useTranslation().modules.industry.ecosystemSection
  const [expanded, setExpanded] = useState<number | null>(null)

  const toggle = useCallback((idx: number) => {
    setExpanded(prev => (prev === idx ? null : idx))
  }, [])

  return (
    <section aria-labelledby="ecosystem">
      <h2 id="ecosystem" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="space-y-2">
        {c.layers.map((layer, idx) => (
          <div key={layer.name}>
            <button
              onClick={() => toggle(idx)}
              className={`w-full rounded-lg border-l-4 ${LAYER_COLORS[idx]} p-4 text-left transition-all hover:brightness-110`}
              aria-expanded={expanded === idx}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{layer.name}</h3>
                <span className="text-xs text-zinc-500">
                  {layer.tools.map(t => t.name).join(' · ')}
                </span>
              </div>
            </button>
            {expanded === idx && (
              <div className="ml-4 mt-1 space-y-2 border-l-2 border-zinc-200 dark:border-zinc-700 pl-4 pt-2">
                {layer.tools.map(tool => (
                  <div key={tool.name} className="rounded bg-white dark:bg-zinc-900 p-3">
                    <p className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">{tool.name}</p>
                    <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{tool.note}</p>
                  </div>
                ))}
              </div>
            )}
            {idx < c.layers.length - 1 && (
              <div className="flex justify-center py-1">
                <span className="text-zinc-600" aria-hidden="true">↓</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          <strong className="text-zinc-700 dark:text-zinc-300">Key insight:</strong> {c.keyInsight}
        </p>
      </div>
    </section>
  )
}
