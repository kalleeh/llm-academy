import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../useT'
import { openVsClosedSectionSv, openVsClosedSectionKo } from './tech-translations'

type Tab = 'table' | 'trend'

interface ComparisonRow {
  dimension: string
  open: string
  closed: string
}

const COMPARISON: ComparisonRow[] = [
  { dimension: 'Access', open: 'Download weights, run anywhere', closed: 'API-only, vendor lock-in' },
  { dimension: 'Fine-tuning', open: 'Full control — LoRA, full FT, merging', closed: 'Limited API fine-tuning or none' },
  { dimension: 'Cost', open: 'Infra cost only; free weights', closed: 'Per-token API pricing' },
  { dimension: 'Privacy', open: 'Full control over data — but security is your responsibility', closed: 'Data processed by provider — enterprise tiers offer strong compliance (SOC 2, HIPAA)' },
  { dimension: 'Community', open: 'Huge ecosystem — HF, Reddit, Discord', closed: 'Vendor docs and support' },
  { dimension: 'Cutting-edge', open: 'Closing fast — DeepSeek R1 ≈ o1', closed: 'Still leads on hardest benchmarks' },
  { dimension: 'Safety tooling', open: 'DIY guardrails, community tools', closed: 'Built-in moderation, content filters' },
  { dimension: 'Deployment', open: 'Self-host, edge, on-device', closed: 'Cloud-only via provider' },
]

const OPEN_MODELS = [
  { name: 'Llama 4 Maverick', org: 'Meta', params: '400B (17B active)', note: 'MoE, 128 experts, rivals GPT-4o' },
  { name: 'DeepSeek R1', org: 'DeepSeek', params: '671B (37B active)', note: 'Matches o1 on reasoning benchmarks' },
  { name: 'Qwen 2.5 72B', org: 'Alibaba', params: '72B', note: 'Strong multilingual, code, math' },
  { name: 'Mistral Large 2', org: 'Mistral', params: '123B', note: 'Competitive with GPT-4 Turbo' },
  { name: 'Gemma 3 27B', org: 'Google', params: '27B', note: 'Best-in-class at size, open weights' },
]

const EN_INTRO = `The gap between open-weight and closed-source models has narrowed dramatically.`

export const OpenVsClosedSection: React.FC = () => {
  const c = useT({ title: '2. Open vs Closed', intro: EN_INTRO }, { sv: openVsClosedSectionSv, ko: openVsClosedSectionKo })
  const [tab, setTab] = useState<Tab>('table')

  const switchTab = useCallback((t: Tab) => setTab(t), [])

  return (
    <section aria-labelledby="open-vs-closed">
      <h2 id="open-vs-closed" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Tab switcher */}
      <div className="mb-6 flex gap-2" role="tablist">
        {(['table', 'trend'] as const).map(t => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => switchTab(t)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === t ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {t === 'table' ? 'Comparison' : 'Open Models Rising'}
          </button>
        ))}
      </div>

      {tab === 'table' ? (
        <div className="overflow-x-auto rounded-lg border border-zinc-700">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800">
                <th className="px-4 py-3 font-mono text-xs font-semibold text-zinc-400">Dimension</th>
                <th className="px-4 py-3 font-mono text-xs font-semibold text-green-400">Open-weight</th>
                <th className="px-4 py-3 font-mono text-xs font-semibold text-red-400">Closed-source</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(row => (
                <tr key={row.dimension} className="border-b border-zinc-800 last:border-0 hover:bg-zinc-900/50">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-zinc-100">{row.dimension}</td>
                  <td className="px-4 py-3 text-xs text-zinc-300">{row.open}</td>
                  <td className="px-4 py-3 text-xs text-zinc-300">{row.closed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="mb-4 text-sm text-zinc-400">
            Open models that compete with frontier closed models (as of mid-2026):
          </p>
          {OPEN_MODELS.map(m => (
            <div key={m.name} className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
              <div className="flex items-baseline justify-between">
                <h3 className="font-mono text-sm font-bold text-zinc-100">{m.name}</h3>
                <span className="text-xs text-zinc-500">{m.org}</span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">{m.params}</p>
              <p className="mt-1 text-xs text-zinc-300">{m.note}</p>
            </div>
          ))}
          <div className="mt-4 rounded-lg border border-green-900/50 bg-green-950/20 p-4">
            <p className="text-sm text-green-300">
              <strong>The trend:</strong> Open models now match or exceed closed models on most
              standard benchmarks. The remaining gap is in agentic capabilities, long-context
              reliability, and safety tooling — and it&apos;s shrinking fast.
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
