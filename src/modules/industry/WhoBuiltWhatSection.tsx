import { useState, useCallback } from 'react'
import { useTranslation } from '../../i18n'

// Per-player non-translatable metadata. Order matches the `players` array in
// `useTranslation().modules.industry.whoBuiltWhatSection.players`.
const PLAYER_META = [
  { color: 'border-green-500',  models: ['GPT-5.5', 'GPT-5.4', 'o3'],                                  openClosed: 'Closed' as const },
  { color: 'border-amber-500',  models: ['Claude Opus 4.7', 'Claude Sonnet 4.5', 'Claude Haiku 4.5'],  openClosed: 'Closed' as const },
  { color: 'border-blue-500',   models: ['Gemini 3.1 Pro', 'Gemini 3.1 Flash', 'Gemma 3'],             openClosed: 'Closed' as const },
  { color: 'border-indigo-500', models: ['Llama 4 Maverick', 'Llama 4 Scout', 'Llama 3.3'],            openClosed: 'Open' as const },
  { color: 'border-red-500',    models: ['DeepSeek V3', 'DeepSeek R1'],                                openClosed: 'Open' as const },
  { color: 'border-cyan-500',   models: ['Mistral Large 2', 'Mixtral 8x22B', 'Mistral 7B'],            openClosed: 'Open-weight' as const },
  { color: 'border-orange-500', models: ['Amazon Nova Pro', 'Amazon Nova Lite', 'Amazon Nova Premier'],openClosed: 'Closed' as const },
  { color: 'border-zinc-400',   models: ['Grok 3', 'Grok 2'],                                          openClosed: 'Closed' as const },
  { color: 'border-zinc-500',   models: ['Apple Intelligence', 'OpenELM', 'AFM'],                      openClosed: 'Closed' as const },
] as const

export const WhoBuiltWhatSection: React.FC = () => {
  const c = useTranslation().modules.industry.whoBuiltWhatSection
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = useCallback((name: string) => {
    setExpanded(prev => (prev === name ? null : name))
  }, [])

  return (
    <section aria-labelledby="who-built-what">
      <h2 id="who-built-what" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {c.players.map((p, i) => {
          const meta = PLAYER_META[i]
          return (
            <button
              key={p.name}
              onClick={() => toggle(p.name)}
              className={`rounded-lg border-l-4 ${meta.color} bg-white dark:bg-zinc-900 p-4 text-left transition-all hover:bg-zinc-100 dark:bg-zinc-800`}
              aria-expanded={expanded === p.name}
            >
              <h3 className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{p.name}</h3>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  meta.openClosed === 'Open'
                    ? 'bg-green-900/50 text-green-400'
                    : meta.openClosed === 'Open-weight'
                      ? 'bg-cyan-900/50 text-cyan-400'
                      : 'bg-red-900/50 text-red-400'
                }`}
              >
                {meta.openClosed}
              </span>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">{p.approach}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {meta.models.map(m => (
                  <span key={m} className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-700 dark:text-zinc-300">
                    {m}
                  </span>
                ))}
              </div>
              {expanded === p.name && (
                <div className="mt-3 border-t border-zinc-200 dark:border-zinc-700 pt-3">
                  <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">{p.detail}</p>
                  <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <strong className="text-zinc-700 dark:text-zinc-300">Key innovation:</strong> {p.innovation}
                  </p>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
