import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Non-translatable per-tool color metadata. Order matches `tools` array in
// `useTranslation().modules.agents.toolUse.tools`.
const TOOL_META = [
  { color: 'border-blue-500/30 bg-blue-500/5' },
  { color: 'border-emerald-500/30 bg-emerald-500/5' },
  { color: 'border-purple-500/30 bg-purple-500/5' },
  { color: 'border-amber-500/30 bg-amber-500/5' },
  { color: 'border-cyan-500/30 bg-cyan-500/5' },
]

// Non-translatable per-scenario risk-color metadata. Order matches `guardrailScenarios` array
// in `useTranslation().modules.agents.toolUse.guardrailScenarios`.
const GUARDRAIL_META = [
  { riskColor: 'text-emerald-400' },
  { riskColor: 'text-amber-400' },
  { riskColor: 'text-red-400' },
  { riskColor: 'text-red-500' },
]

export const ToolUseBusiness: React.FC = () => {
  const c = useTranslation().modules.agents.toolUse
  const [expandedTool, setExpandedTool] = useState<number | null>(null)
  const toggleTool = useCallback((i: number) => setExpandedTool((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="tools-biz">
      <h2 id="tools-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="mb-8 space-y-2">
        {c.tools.map((tool, i) => (
          <div key={i} className={`rounded-lg border ${TOOL_META[i].color}`}>
            <button onClick={() => toggleTool(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expandedTool === i}>
              <div><span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{tool.name}</span><span className="ml-2 text-xs text-zinc-500">— {tool.analogy}</span></div>
              <span className="text-xs text-zinc-500">{expandedTool === i ? '▲' : '▼'}</span>
            </button>
            {expandedTool === i && (
              <div className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{tool.whatItDoes}</p>
                <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800/50 p-3">
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{tool.businessExample}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="mb-3 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">{c.trustTitle}</h3>
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{c.trustIntro}</p>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
          <table className="w-full text-sm">
            <tbody>
              {c.guardrailScenarios.map((s, i) => (
                <tr key={i} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{s.action}</td>
                  <td className={`px-4 py-3 font-medium ${GUARDRAIL_META[i].riskColor}`}>{s.risk}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{s.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{c.platformNote}</p>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
