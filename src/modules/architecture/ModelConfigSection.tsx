import { useState, useMemo, useCallback } from 'react'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { modelConfigSectionSv, modelConfigSectionKo } from './tech-translations'
import { presetsTranslations } from './data-translations'

interface Config {
  layers: number
  hiddenSize: number
  heads: number
  experts: number
}

interface Preset {
  label: string
  config: Config
}

const PRESETS: Preset[] = [
  { label: 'GPT-2 Small', config: { layers: 12, hiddenSize: 768, heads: 12, experts: 1 } },
  { label: 'Llama 3 8B', config: { layers: 32, hiddenSize: 4096, heads: 32, experts: 1 } },
  { label: 'Llama 3 70B', config: { layers: 80, hiddenSize: 8192, heads: 64, experts: 1 } },
  { label: 'DeepSeek V3', config: { layers: 61, hiddenSize: 7168, heads: 128, experts: 256 } },
]

function formatNum(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toFixed(1)}T`
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`
  return String(n)
}

function calcParams(c: Config) {
  const h = c.hiddenSize
  const ffnSize = 4 * h
  // Attention: Q, K, V, O projections
  const attnPerLayer = 4 * h * h
  // FFN per expert: up + down projections
  const ffnPerExpert = 2 * h * ffnSize
  const totalExperts = Math.max(c.experts, 1)
  const ffnPerLayer = ffnPerExpert * totalExperts
  // Router params (if MoE)
  const routerPerLayer = totalExperts > 1 ? h * totalExperts : 0
  const paramsPerLayer = attnPerLayer + ffnPerLayer + routerPerLayer
  const totalParams = paramsPerLayer * c.layers + h * 50000 // + embedding (approx 50k vocab)

  // Active params: only top-2 experts active (or all if dense)
  const activeExperts = totalExperts > 1 ? Math.min(2, totalExperts) : 1
  const activeFFNPerLayer = ffnPerExpert * activeExperts
  const activePerLayer = attnPerLayer + activeFFNPerLayer + routerPerLayer
  const activeParams = activePerLayer * c.layers + h * 50000

  // VRAM estimate: ~2 bytes per param (fp16) + overhead
  const vramGB = (totalParams * 2) / 1e9 * 1.2

  // Training cost: very rough estimate based on 6 * N * D FLOPs, assuming 20 tokens/param
  const tokens = totalParams * 20
  const flops = 6 * activeParams * tokens
  // Rough: $1 per 1e18 FLOPs on H100
  const costUSD = flops / 1e18 * 0.5

  return { totalParams, activeParams, vramGB, costUSD }
}

const SLIDERS: { key: keyof Config; label: string; min: number; max: number; step: number }[] = [
  { key: 'layers', label: 'Layers', min: 12, max: 96, step: 1 },
  { key: 'hiddenSize', label: 'Hidden Size', min: 1024, max: 8192, step: 256 },
  { key: 'heads', label: 'Attention Heads', min: 8, max: 128, step: 8 },
  { key: 'experts', label: 'Experts (1 = dense)', min: 1, max: 256, step: 1 },
]

const EN_INTRO = `Configure your own model architecture and see how parameter choices affect total size.`

export const ModelConfigSection: React.FC = () => {
  const { lang } = useLanguage()
  const pRESETST = tArray(lang, PRESETS, presetsTranslations)
  const c = useT({ title: '4. Model Configuration', intro: EN_INTRO }, { sv: modelConfigSectionSv, ko: modelConfigSectionKo })
  const [config, setConfig] = useState<Config>(PRESETS[1].config)

  const updateField = useCallback((key: keyof Config, value: number) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }, [])

  const applyPreset = useCallback((p: Preset) => {
    setConfig(p.config)
  }, [])

  const stats = useMemo(() => calcParams(config), [config])

  return (
    <section aria-labelledby="model-config">
      <h2 id="model-config" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Presets */}
      <div className="mb-4 flex flex-wrap gap-2">
        {pRESETST.map(p => (
          <button
            key={p.label}
            onClick={() => applyPreset(p)}
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sliders */}
        <div className="space-y-4 rounded-lg border border-zinc-700 bg-zinc-900 p-6">
          {SLIDERS.map(s => (
            <div key={s.key}>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor={`slider-${s.key}`} className="text-sm text-zinc-400">{s.label}</label>
                <span className="font-mono text-sm text-zinc-100">{config[s.key]}</span>
              </div>
              <input
                id={`slider-${s.key}`}
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={config[s.key]}
                onChange={e => updateField(s.key, Number(e.target.value))}
                className="w-full accent-zinc-400"
              />
              <div className="flex justify-between text-[10px] text-zinc-600">
                <span>{s.min}</span>
                <span>{s.max}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <p className="text-xs text-zinc-500 uppercase">Total Parameters</p>
            <p className="mt-1 font-mono text-xl font-bold text-zinc-100">{formatNum(stats.totalParams)}</p>
          </div>
          <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <p className="text-xs text-zinc-500 uppercase">Active Parameters</p>
            <p className="mt-1 font-mono text-xl font-bold text-zinc-100">{formatNum(stats.activeParams)}</p>
            {config.experts > 1 && (
              <p className="mt-1 text-xs text-zinc-500">
                {((stats.activeParams / stats.totalParams) * 100).toFixed(1)}% of total
              </p>
            )}
          </div>
          <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <p className="text-xs text-zinc-500 uppercase">Est. VRAM (FP16)</p>
            <p className="mt-1 font-mono text-xl font-bold text-zinc-100">{stats.vramGB.toFixed(1)} GB</p>
            <p className="mt-1 text-xs text-zinc-500">
              {stats.vramGB <= 24 ? '1× consumer GPU' : stats.vramGB <= 80 ? '1× A100/H100' : `${Math.ceil(stats.vramGB / 80)}× H100s`}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <p className="text-xs text-zinc-500 uppercase">Est. Training Cost</p>
            <p className="mt-1 font-mono text-xl font-bold text-zinc-100">
              ${stats.costUSD >= 1e6 ? `${(stats.costUSD / 1e6).toFixed(1)}M` : stats.costUSD >= 1e3 ? `${(stats.costUSD / 1e3).toFixed(0)}K` : stats.costUSD.toFixed(0)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">Very rough H100 estimate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
