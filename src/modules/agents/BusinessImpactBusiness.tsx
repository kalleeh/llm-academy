import { useState, useCallback } from 'react'
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Non-translatable per-level color metadata. Order matches `levels` array in
// `useTranslation().modules.agents.businessImpact.levels`.
const LEVEL_META = [
  { color: 'border-emerald-500/30 bg-emerald-500/5' },
  { color: 'border-blue-500/30 bg-blue-500/5' },
  { color: 'border-amber-500/30 bg-amber-500/5' },
  { color: 'border-red-500/30 bg-red-500/5' },
]

// Non-translatable per-row color metadata for the riskFramework table.
const RISK_META = [
  { color: 'text-emerald-400' },
  { color: 'text-amber-400' },
  { color: 'text-amber-400' },
  { color: 'text-red-400' },
  { color: 'text-red-500' },
]

export const BusinessImpactBusiness: React.FC = () => {
  const c = useTranslation().modules.agents.businessImpact
  const [showFramework, setShowFramework] = useState(false)
  const toggleFramework = useCallback(() => setShowFramework((p) => !p), [])

  return (
    <section aria-labelledby="impact-biz">
      <h2 id="impact-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <p className="mb-6 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.introSub}</p>

      <InteractiveDemo
        title={c.title}
        steps={c.levels.map((l, i) => (
          <div key={l.level} className={`rounded-lg border p-5 ${LEVEL_META[i].color}`}>
            <div className="mb-3"><span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{l.level}</span><span className="ml-2 text-xs text-zinc-600 dark:text-zinc-400">— {l.analogy}</span></div>
            <p className="mb-3 text-sm text-zinc-700 dark:text-zinc-300">{l.description}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2"><p className="text-xs text-zinc-500">Org change</p><p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300">{l.orgChange}</p></div>
              <div className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2"><p className="text-xs text-zinc-500">Risk</p><p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300">{l.risk}</p></div>
              <div className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2"><p className="text-xs text-zinc-500">Examples</p><p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300">{l.examples}</p></div>
            </div>
          </div>
        ))}
      />

      <div className="mt-10 mb-8">
        <h3 className="mb-3 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">{c.carTitle}</h3>
        <p className="mb-4 max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">{c.carIntro}</p>
        <div className="space-y-3">
          {c.parallels.map((p, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2"><p className="text-xs font-medium text-blue-400">Self-driving cars</p><p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300">{p.car}</p></div>
                <div className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2"><p className="text-xs font-medium text-amber-400">AI agents</p><p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300">{p.ai}</p></div>
              </div>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 italic">{p.but}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <button onClick={toggleFramework} className="mb-4 flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300" aria-expanded={showFramework}>
          <span>{showFramework ? '▾' : '▸'}</span>{c.frameworkButton}
        </button>
        {showFramework && (
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
            <table className="w-full text-xs">
              <tbody>
                {c.riskFramework.map((r, i) => (
                  <tr key={r.decision} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                    <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{r.decision}</td>
                    <td className={`px-3 py-2 font-medium ${RISK_META[i].color}`}>{r.impact}</td>
                    <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">{r.reversible}</td>
                    <td className="hidden px-3 py-2 text-zinc-600 dark:text-zinc-400 sm:table-cell">{r.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.failTitle}</p>
        <p className="mb-3 text-sm text-zinc-700 dark:text-zinc-300">{c.failIntro}</p>
        <div className="space-y-2">
          {c.failurePatterns.map((f) => (
            <div key={f.pattern} className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-4 py-3">
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{f.pattern}</p>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{f.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
