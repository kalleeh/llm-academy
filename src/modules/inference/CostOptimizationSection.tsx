import { useState, useMemo, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useT } from '../../useT'
import { costOptimizationSectionSv, costOptimizationSectionKo } from './tech-translations'

type ModelTier = '7b' | '70b' | '405b'

interface GpuConfig {
  label: string
  gpu: string
  costPerHr: number
  throughputTokPerSec: number
  count: number
}

const GPU_CONFIGS: Record<ModelTier, { label: string; single: GpuConfig; multi: GpuConfig }> = {
  '7b': {
    label: '7B (e.g. Llama 3 8B)',
    single: { label: '1× A10G', gpu: 'A10G', costPerHr: 1.0, throughputTokPerSec: 80, count: 1 },
    multi: { label: '1× A100 40GB', gpu: 'A100', costPerHr: 2.0, throughputTokPerSec: 200, count: 1 },
  },
  '70b': {
    label: '70B (e.g. Llama 3 70B)',
    single: { label: '1× A100 80GB', gpu: 'A100', costPerHr: 2.0, throughputTokPerSec: 40, count: 1 },
    multi: { label: '2× A100 80GB', gpu: 'A100', costPerHr: 4.0, throughputTokPerSec: 90, count: 2 },
  },
  '405b': {
    label: '405B (e.g. Llama 3 405B)',
    single: { label: '4× A100 80GB', gpu: 'A100', costPerHr: 8.0, throughputTokPerSec: 20, count: 4 },
    multi: { label: '8× H100 80GB', gpu: 'H100', costPerHr: 28.0, throughputTokPerSec: 80, count: 8 },
  },
}

const API_PRICING = [
  { name: 'GPT-4o', per1kInput: 0.0025, per1kOutput: 0.01 },
  { name: 'Claude Sonnet', per1kInput: 0.003, per1kOutput: 0.015 },
  { name: 'GPT-4o Mini', per1kInput: 0.00015, per1kOutput: 0.0006 },
] as const

const TIPS: readonly { icon: IconName; title: string; desc: string }[] = [
  { icon: 'quantize', title: '4. Cost Optimization', desc: 'INT4/INT8 cuts memory 2-4× with <2% quality loss. Always quantize before deploying.' },
  { icon: 'box', title: 'Batch requests', desc: 'Continuous batching can 3-5× throughput. Never serve one request at a time.' },
  { icon: 'save', title: 'Cache prefixes', desc: 'Shared system prompts? Prefix caching saves 30-80% of prefill compute.' },
  { icon: 'compress', title: 'Use smaller models', desc: 'A fine-tuned 8B often beats a generic 70B on your specific task. Benchmark first.' },
]

function formatCost(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`
  return `$${n.toFixed(2)}`
}

const EN_INTRO = `Inference cost is the dominant expense in production LLM systems. Use this calculator to compare approaches.`

export const CostOptimizationSection: React.FC = () => {
  const c = useT({ title: '4. Cost Optimization', intro: EN_INTRO }, { sv: costOptimizationSectionSv, ko: costOptimizationSectionKo })
  const [modelTier, setModelTier] = useState<ModelTier>('70b')
  const [reqPerDay, setReqPerDay] = useState(10000)
  const [avgTokens, setAvgTokens] = useState(500)

  const handleModelChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setModelTier(e.target.value as ModelTier)
  }, [])
  const handleReqChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setReqPerDay(Number(e.target.value))
  }, [])
  const handleTokenChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAvgTokens(Number(e.target.value))
  }, [])

  const costs = useMemo(() => {
    const cfg = GPU_CONFIGS[modelTier]
    const monthlyReqs = reqPerDay * 30
    const totalTokensPerMonth = monthlyReqs * avgTokens

    const calcGpu = (g: GpuConfig) => {
      const tokensPerHr = g.throughputTokPerSec * 3600
      const hoursNeeded = totalTokensPerMonth / tokensPerHr
      const minHours = 730 * g.count // always-on
      return Math.max(minHours, hoursNeeded) * (g.costPerHr / g.count) * g.count
    }

    return {
      single: { label: cfg.single.label, monthly: calcGpu(cfg.single) },
      multi: { label: cfg.multi.label, monthly: calcGpu(cfg.multi) },
      api: API_PRICING.map(p => ({
        name: p.name,
        monthly: (totalTokensPerMonth / 1000) * (p.per1kInput * 0.6 + p.per1kOutput * 0.4),
      })),
    }
  }, [modelTier, reqPerDay, avgTokens])

  const maxCost = useMemo(() => {
    const all = [costs.single.monthly, costs.multi.monthly, ...costs.api.map(a => a.monthly)]
    return Math.max(...all)
  }, [costs])

  return (
    <section aria-labelledby="cost-optimization">
      <h2 id="cost-optimization" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Calculator inputs */}
      <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="mb-4 font-mono text-sm font-semibold text-zinc-100">Cost Calculator</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="model-tier" className="mb-1 block text-xs text-zinc-400">Model Size</label>
            <select
              id="model-tier"
              value={modelTier}
              onChange={handleModelChange}
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100"
            >
              {(Object.entries(GPU_CONFIGS) as [ModelTier, typeof GPU_CONFIGS[ModelTier]][]).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="req-per-day" className="mb-1 block text-xs text-zinc-400">
              Requests/day: <strong className="text-zinc-200">{reqPerDay.toLocaleString()}</strong>
            </label>
            <input
              id="req-per-day"
              type="range"
              min={100}
              max={100000}
              step={100}
              value={reqPerDay}
              onChange={handleReqChange}
              className="w-full accent-violet-500"
            />
          </div>
          <div>
            <label htmlFor="avg-tokens" className="mb-1 block text-xs text-zinc-400">
              Avg tokens/request: <strong className="text-zinc-200">{avgTokens}</strong>
            </label>
            <input
              id="avg-tokens"
              type="range"
              min={50}
              max={4000}
              step={50}
              value={avgTokens}
              onChange={handleTokenChange}
              className="w-full accent-violet-500"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="mb-4 font-mono text-sm font-semibold text-zinc-100">
          Estimated Monthly Cost
        </h3>
        <div className="space-y-3">
          {/* Self-hosted */}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">Self-Hosted</p>
            {[costs.single, costs.multi].map(c => (
              <div key={c.label} className="mb-2">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-zinc-400">{c.label}</span>
                  <span className="font-mono text-zinc-200">{formatCost(c.monthly)}/mo</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded bg-zinc-800">
                  <div
                    className="h-full rounded bg-violet-500 transition-all duration-500"
                    style={{ width: `${Math.max(2, (c.monthly / maxCost) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* API */}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">API Providers</p>
            {costs.api.map(a => (
              <div key={a.name} className="mb-2">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-zinc-400">{a.name}</span>
                  <span className="font-mono text-zinc-200">{formatCost(a.monthly)}/mo</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded bg-zinc-800">
                  <div
                    className="h-full rounded bg-amber-500 transition-all duration-500"
                    style={{ width: `${Math.max(2, (a.monthly / maxCost) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GPU pricing reference */}
      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-100">GPU Pricing Reference</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { gpu: 'A10G (24 GB)', cost: '~$1.00/hr', use: 'Small models, dev' },
            { gpu: 'A100 80GB', cost: '~$2.00/hr', use: 'Production standard' },
            { gpu: 'H100 80GB', cost: '~$3.50/hr', use: 'Max throughput' },
          ].map(g => (
            <div key={g.gpu} className="rounded-md bg-zinc-800 p-3">
              <p className="font-mono text-xs font-bold text-zinc-100">{g.gpu}</p>
              <p className="text-lg font-bold text-violet-400">{g.cost}</p>
              <p className="text-xs text-zinc-400">{g.use}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="grid gap-3 sm:grid-cols-2">
        {TIPS.map(tip => (
          <div key={tip.title} className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <p className="mb-1 text-lg"><Icon name={tip.icon} /></p>
            <h4 className="font-mono text-sm font-bold text-zinc-100">{tip.title}</h4>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400">{tip.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
