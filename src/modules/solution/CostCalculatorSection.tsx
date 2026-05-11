import { useState, useMemo, useCallback } from 'react'
import { useT } from '../../i18n'
import { costCalculatorSectionSv, costCalculatorSectionKo } from './tech-translations'

type Approach = 'api' | 'self-hosted' | 'fine-tuned'
type ModelSize = 'small' | 'medium' | 'large'

interface PricingConfig {
  label: string
  models: Record<ModelSize, { name: string; inputPer1M: number; outputPer1M: number }>
}

interface SelfHostedConfig {
  label: string
  models: Record<ModelSize, { name: string; gpuType: string; gpuCostPerHr: number; throughputReqPerHr: number }>
}

const API_PRICING: PricingConfig = {
  label: 'apiProvider',
  models: {
    small: { name: 'GPT-4o Mini', inputPer1M: 0.15, outputPer1M: 0.60 },
    medium: { name: 'Claude Sonnet', inputPer1M: 3.00, outputPer1M: 15.00 },
    large: { name: 'GPT-4o', inputPer1M: 2.50, outputPer1M: 10.00 },
  },
}

const SELF_HOSTED: SelfHostedConfig = {
  label: 'selfHosted',
  models: {
    small: { name: 'Llama 3 8B', gpuType: 'A10G', gpuCostPerHr: 1.00, throughputReqPerHr: 600 },
    medium: { name: 'Llama 3 70B', gpuType: 'A100 40GB', gpuCostPerHr: 2.00, throughputReqPerHr: 150 },
    large: { name: 'Llama 3 405B', gpuType: '8x A100 80GB', gpuCostPerHr: 16.00, throughputReqPerHr: 40 },
  },
}

const AVG_INPUT_TOKENS = 500
const AVG_OUTPUT_TOKENS = 300
const FINE_TUNE_TRAINING_COST: Record<ModelSize, number> = { small: 50, medium: 500, large: 5000 }

function formatCost(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`
  return `$${n.toFixed(2)}`
}

const EN_P2 = `These are estimates assuming ~500 input + ~300 output tokens per request. Self-hosted costs assume 24/7 GPU availability. Real costs vary with caching, batching, spot instances, and negotiated pricing.`
const EN_INTRO = `Compare estimated monthly costs across approaches. Adjust volume and model size to see how costs change.`

export const CostCalculatorSection: React.FC = () => {
  const c = useT({ title: '4. Cost Calculator', intro: EN_INTRO , p2: EN_P2 }, { sv: costCalculatorSectionSv, ko: costCalculatorSectionKo })
  const [approaches, setApproaches] = useState<Approach[]>(['api'])
  const [volume, setVolume] = useState(1000)
  const [modelSize, setModelSize] = useState<ModelSize>('medium')

  const toggleApproach = useCallback((a: Approach) => {
    setApproaches(prev =>
      prev.includes(a) ? (prev.length > 1 ? prev.filter(x => x !== a) : prev) : [...prev, a],
    )
  }, [])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
  }, [])

  const costs = useMemo(() => {
    const monthlyRequests = volume * 30
    const results: { approach: Approach; label: string; model: string; monthly: number; breakdown: string }[] = []

    if (approaches.includes('api')) {
      const m = API_PRICING.models[modelSize]
      const inputCost = (monthlyRequests * AVG_INPUT_TOKENS / 1_000_000) * m.inputPer1M
      const outputCost = (monthlyRequests * AVG_OUTPUT_TOKENS / 1_000_000) * m.outputPer1M
      results.push({
        approach: 'api',
        label: 'API',
        model: m.name,
        monthly: inputCost + outputCost,
        breakdown: `Input: ${formatCost(inputCost)} + Output: ${formatCost(outputCost)}`,
      })
    }

    if (approaches.includes('self-hosted')) {
      const m = SELF_HOSTED.models[modelSize]
      const hoursNeeded = monthlyRequests / m.throughputReqPerHr
      const gpuHours = Math.max(730, hoursNeeded) // min 1 GPU always on
      const monthly = gpuHours * m.gpuCostPerHr
      results.push({
        approach: 'self-hosted',
        label: 'selfHosted',
        model: `${m.name} on ${m.gpuType}`,
        monthly,
        breakdown: `${gpuHours.toFixed(0)} GPU-hrs × $${m.gpuCostPerHr}/hr`,
      })
    }

    if (approaches.includes('fine-tuned')) {
      const m = API_PRICING.models[modelSize]
      const inputCost = (monthlyRequests * AVG_INPUT_TOKENS / 1_000_000) * m.inputPer1M * 1.5
      const outputCost = (monthlyRequests * AVG_OUTPUT_TOKENS / 1_000_000) * m.outputPer1M * 1.5
      const trainingAmortized = FINE_TUNE_TRAINING_COST[modelSize] / 6
      const monthly = inputCost + outputCost + trainingAmortized
      results.push({
        approach: 'fine-tuned',
        label: 'Fine-Tuned',
        model: `Fine-tuned ${m.name}`,
        monthly,
        breakdown: `Inference: ${formatCost(inputCost + outputCost)} + Training (amortized 6mo): ${formatCost(trainingAmortized)}`,
      })
    }

    return results
  }, [approaches, volume, modelSize])

  const maxCost = Math.max(...costs.map(c => c.monthly), 1)

  return (
    <section aria-labelledby="cost-calculator">
      <h2 id="cost-calculator" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Controls */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {/* Approach selector */}
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
          <p className="mb-2 text-xs font-medium text-zinc-500 uppercase">Approaches to Compare</p>
          <div className="flex flex-col gap-2">
            {([
              ['api', 'API Provider', 'text-green-400'] as const,
              ['self-hosted', 'Self-Hosted', 'text-blue-400'] as const,
              ['fine-tuned', 'Fine-Tuned', 'text-amber-400'] as const,
            ]).map(([id, label, color]) => (
              <button
                key={id}
                onClick={() => toggleApproach(id)}
                className={`rounded-md border px-3 py-1.5 text-left text-sm transition-colors ${
                  approaches.includes(id)
                    ? `border-zinc-500 bg-zinc-700 ${color}`
                    : 'border-zinc-700 text-zinc-500 hover:border-zinc-600'
                }`}
                aria-pressed={approaches.includes(id)}
              >
                {approaches.includes(id) ? '✓ ' : ''}{label}
              </button>
            ))}
          </div>
        </div>

        {/* Volume slider */}
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
          <p className="mb-2 text-xs font-medium text-zinc-500 uppercase">Requests / Day</p>
          <input
            type="range"
            min={100}
            max={100000}
            step={100}
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-zinc-400"
            aria-label="Requests per day"
          />
          <p className="mt-1 text-center font-mono text-lg text-zinc-100">
            {volume.toLocaleString()}
          </p>
          <p className="text-center text-xs text-zinc-500">
            = {(volume * 30).toLocaleString()} / month
          </p>
        </div>

        {/* Model size */}
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
          <p className="mb-2 text-xs font-medium text-zinc-500 uppercase">Model Size</p>
          <div className="flex flex-col gap-2">
            {([
              ['small', 'Small (8B / Mini)'] as const,
              ['medium', 'Medium (70B / Sonnet)'] as const,
              ['large', 'Large (405B / GPT-4o)'] as const,
            ]).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setModelSize(id)}
                className={`rounded-md border px-3 py-1.5 text-left text-sm transition-colors ${
                  modelSize === id
                    ? 'border-zinc-500 bg-zinc-700 text-zinc-100'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                }`}
                aria-pressed={modelSize === id}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {costs.map(c => (
          <div key={c.approach} className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className={`font-mono text-sm font-semibold ${
                  c.approach === 'api' ? 'text-green-400' : c.approach === 'self-hosted' ? 'text-blue-400' : 'text-amber-400'
                }`}>
                  {c.label}
                </span>
                <span className="ml-2 text-xs text-zinc-500">{c.model}</span>
              </div>
              <span className="font-mono text-lg font-bold text-zinc-100">
                {formatCost(c.monthly)}<span className="text-xs text-zinc-500">/mo</span>
              </span>
            </div>
            <div className="mb-1 h-3 rounded-full bg-zinc-800">
              <div
                className={`h-3 rounded-full transition-all ${
                  c.approach === 'api' ? 'bg-green-500' : c.approach === 'self-hosted' ? 'bg-blue-500' : 'bg-amber-500'
                }`}
                style={{ width: `${(c.monthly / maxCost) * 100}%` }}
              />
            </div>
            <p className="text-xs text-zinc-500">{c.breakdown}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <p className="text-sm leading-relaxed text-zinc-400">
          <strong className="text-amber-400">Note:</strong> {c.p2}
        </p>
      </div>
    </section>
  )
}
