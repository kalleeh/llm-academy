import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

type Tab = 'table' | 'trend'

// Per-open-model non-translatable metadata. Order matches the `openModels`
// array in `useTranslation().modules.industry.openVsClosedSection.openModels`.
const OPEN_MODEL_META = [
  { org: 'Meta',     params: '400B (17B active)' },
  { org: 'DeepSeek', params: '671B (37B active)' },
  { org: 'Alibaba',  params: '72B' },
  { org: 'Mistral',  params: '123B' },
  { org: 'Google',   params: '27B' },
] as const

export const OpenVsClosedSection: React.FC = () => {
  const c = useTranslation().modules.industry.openVsClosedSection
  const [tab, setTab] = useState<Tab>('table')

  const switchTab = useCallback((t: Tab) => setTab(t), [])

  return (
    <section aria-labelledby="open-vs-closed">
      <h2 id="open-vs-closed" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Tab switcher */}
      <div className="mb-6 flex gap-2" role="tablist">
        {(['table', 'trend'] as const).map(t => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => switchTab(t)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === t ? 'bg-zinc-700 text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:text-zinc-200'
            }`}
          >
            {t === 'table' ? 'Comparison' : 'Open Models Rising'}
          </button>
        ))}
      </div>

      {tab === 'table' ? (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
                <th className="px-4 py-3 font-mono text-xs font-semibold text-zinc-600 dark:text-zinc-400">Dimension</th>
                <th className="px-4 py-3 font-mono text-xs font-semibold text-green-400">Open-weight</th>
                <th className="px-4 py-3 font-mono text-xs font-semibold text-red-400">Closed-source</th>
              </tr>
            </thead>
            <tbody>
              {c.comparison.map(row => (
                <tr key={row.dimension} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-white dark:bg-zinc-900/50">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">{row.dimension}</td>
                  <td className="px-4 py-3 text-xs text-zinc-700 dark:text-zinc-300">{row.open}</td>
                  <td className="px-4 py-3 text-xs text-zinc-700 dark:text-zinc-300">{row.closed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{c.openModelsHeading}</p>
          {c.openModels.map((m, i) => {
            const meta = OPEN_MODEL_META[i]
            return (
              <div key={m.name} className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{m.name}</h3>
                  <span className="text-xs text-zinc-500">{meta.org}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{meta.params}</p>
                <p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300">{m.note}</p>
              </div>
            )
          })}
          <div className="mt-4 rounded-lg border border-green-900/50 bg-green-950/20 p-4">
            <p className="text-sm text-green-300">
              <strong>The trend:</strong> {c.trendCallout}
            </p>
          </div>
        </div>
      )}

      <SelfExplain
        prompt="You just compared open and closed models across multiple dimensions. Pick a real use case (e.g., a healthcare startup, a social media company, a solo developer) and argue which approach — open or closed — they should choose. Explain the tradeoffs specific to that use case."
        modelAnswer="Example: A healthcare startup handling patient data should consider open models because: (1) Customization — they can fine-tune for medical terminology and clinical workflows, which closed APIs can't match. (2) Cost at scale — after infrastructure setup, per-query cost is fixed regardless of volume. (3) Control — they can audit exactly what the model does. The tradeoff: they need ML engineering talent and must build their own security/compliance infrastructure (encryption, access controls, audit logs). Note: enterprise cloud AI services (Azure OpenAI with HIPAA BAA) are also viable and may actually be MORE secure than self-hosting if the startup lacks a dedicated security team. For a solo developer building a side project, closed APIs make more sense — no infrastructure to manage, pay-per-use scales from zero, and frontier models handle diverse tasks well out of the box."
      />
    </section>
  )
}
