import { useState, useMemo, useCallback } from 'react'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { howInferenceWorksSectionSv, howInferenceWorksSectionKo } from './tech-translations'

const PHASES = [
  { label: 'Prompt Tokens', color: 'bg-blue-500', desc: 'User input tokenized into IDs' },
  { label: 'Prefill', color: 'bg-amber-500', desc: 'Process all tokens at once — build initial KV cache' },
  { label: 'Decode', color: 'bg-green-500', desc: 'Generate one token at a time (autoregressive)' },
] as const

const KV_EXAMPLES = [
  { tokens: 1024, label: '1K', cacheGB: 0.001 },
  { tokens: 4096, label: '4K', cacheGB: 0.016 },
  { tokens: 8192, label: '8K', cacheGB: 0.064 },
  { tokens: 32768, label: '32K', cacheGB: 1 },
  { tokens: 65536, label: '64K', cacheGB: 4 },
  { tokens: 131072, label: '128K', cacheGB: 16 },
] as const

const EN_P5 = `KV Cache Size vs Context Length`
const EN_P4 = `KV Cache Size vs Context Length`
const EN_P2 = `Inference is the process of generating text from a trained model. It happens in two distinct phases —`
const EN_P3 = `{c.p3}`
export const HowInferenceWorksSection: React.FC = () => {
  const { lang } = useLanguage()
  const pHASEST = tArray(lang, PHASES)
  const kV_EXAMPLEST = tArray(lang, KV_EXAMPLES)
  const c = useT({ title: '1. How Inference Works' , p2: EN_P2, p3: EN_P3 , p4: EN_P4 , p5: EN_P5 }, { sv: howInferenceWorksSectionSv, ko: howInferenceWorksSectionKo })
  const [activePhase, setActivePhase] = useState(0)
  const [ctxSlider, setCtxSlider] = useState(0)

  const handlePhaseClick = useCallback((i: number) => () => setActivePhase(i), [])
  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCtxSlider(Number(e.target.value))
  }, [])

  const kvEntry = KV_EXAMPLES[ctxSlider]
  const barPct = useMemo(() => Math.max(2, (kvEntry.cacheGB / 16) * 100), [kvEntry.cacheGB])

  return (
    <section aria-labelledby="how-inference-works">
      <h2 id="how-inference-works" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        {c.p2} <strong className="text-zinc-100">prefill</strong> and{' '}
        <strong className="text-zinc-100">decode</strong> — and the KV cache is what makes it
        efficient (and what eats your GPU memory).
      </p>

      {/* Pipeline visualization */}
      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <p className="mb-4 text-sm font-medium text-zinc-400">Inference Pipeline</p>
        <div className="flex items-center gap-2">
          {pHASEST.map((phase, i) => (
            <button
              key={phase.label}
              onClick={handlePhaseClick(i)}
              className={`flex-1 rounded-md border px-4 py-3 text-left transition-all ${
                activePhase === i
                  ? `${phase.color} border-transparent text-white`
                  : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600'
              }`}
              aria-pressed={activePhase === i}
            >
              <span className="block text-xs font-bold uppercase tracking-wider">
                {i > 0 && '→ '}
                {phase.label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-md bg-zinc-800 p-4">
          <p className="text-sm text-zinc-300">{pHASEST[activePhase].desc}</p>
          {activePhase === 0 && (
            <div className="mt-3 flex gap-1.5">
              {['The', 'cat', 'sat', 'on', 'the', 'mat'].map(t => (
                <span key={t} className="rounded bg-blue-500/20 px-2 py-1 font-mono text-xs text-blue-300">
                  {t}
                </span>
              ))}
            </div>
          )}
          {activePhase === 1 && (
            <div className="mt-3 space-y-1">
              <p className="text-xs text-zinc-400">
                All prompt tokens processed <strong className="text-amber-400">in parallel</strong>.
                Attention computed for every token pair → KV cache populated.
              </p>
              <div className="flex gap-1">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="h-8 flex-1 animate-pulse rounded bg-amber-500/30" style={{ animationDelay: `${i * 80}ms` }} />
                ))}
              </div>
            </div>
          )}
          {activePhase === 2 && (
            <div className="mt-3 space-y-1">
              <p className="text-xs text-zinc-400">
                Each new token attends to <strong className="text-green-400">all previous tokens</strong>{' '}
                via the KV cache. One token per forward pass — this is the bottleneck.
              </p>
              <div className="flex gap-1">
                {['▸', '▸', '▸', '…'].map((c, i) => (
                  <span key={i} className="rounded bg-green-500/20 px-2 py-1 font-mono text-xs text-green-300">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* KV Cache explanation */}
      <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-100">The KV Cache</h3>
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-zinc-300">
          During decode, each new token needs to attend to every previous token. Without caching,
          you&apos;d recompute all key/value projections every step. The{' '}
          <strong className="text-zinc-100">KV cache</strong> stores these projections so each step
          only computes the new token&apos;s K and V. The tradeoff: cache size grows with sequence
          length, and for long contexts it dominates GPU memory.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Why it exists', text: 'Avoids recomputing attention keys/values for all previous tokens at each decode step' },
            { label: 'How it grows', text: 'Proportional to sequence_length × num_layers × num_heads × head_dim × 2 (K+V)' },
            { label: 'Why it\'s the bottleneck', text: 'At 128K context on a 70B model, KV cache alone needs ~16 GB — often more than the model weights (quantized)' },
          ].map(item => (
            <div key={item.label} className="rounded-md bg-zinc-800 p-3">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-400">{item.label}</p>
              <p className="text-xs leading-relaxed text-zinc-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive KV cache slider */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-100">{c.p5}</h3>
        <p className="mb-4 text-xs text-zinc-400">70B model, FP16 KV cache</p>

        <label className="mb-1 block text-xs text-zinc-500" htmlFor="kv-slider">
          Context length: <strong className="text-zinc-200">{kvEntry.label} tokens</strong>
        </label>
        <input
          id="kv-slider"
          type="range"
          min={0}
          max={KV_EXAMPLES.length - 1}
          value={ctxSlider}
          onChange={handleSlider}
          className="mb-4 w-full accent-violet-500"
          aria-valuetext={`${kvEntry.label} tokens`}
        />

        <div className="mb-2 flex items-end gap-3">
          <div className="flex-1">
            <div className="mb-1 flex justify-between text-xs text-zinc-500">
              <span>KV Cache</span>
              <span>{kvEntry.cacheGB >= 1 ? `${kvEntry.cacheGB} GB` : `${(kvEntry.cacheGB * 1024).toFixed(0)} MB`}</span>
            </div>
            <div className="h-8 w-full overflow-hidden rounded bg-zinc-800">
              <div
                className="h-full rounded bg-violet-500 transition-all duration-500"
                style={{ width: `${barPct}%` }}
                role="progressbar"
                aria-valuenow={kvEntry.cacheGB}
                aria-valuemin={0}
                aria-valuemax={16}
                aria-label={`KV cache size: ${kvEntry.cacheGB >= 1 ? `${kvEntry.cacheGB} GB` : `${(kvEntry.cacheGB * 1024).toFixed(0)} MB`}`}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {kV_EXAMPLEST.map((ex, i) => (
            <span
              key={ex.label}
              className={`rounded-full px-2.5 py-0.5 text-xs ${
                i === ctxSlider ? 'bg-violet-500/20 text-violet-300' : 'bg-zinc-800 text-zinc-500'
              }`}
            >
              {ex.label} = {ex.cacheGB >= 1 ? `${ex.cacheGB} GB` : `${(ex.cacheGB * 1024).toFixed(0)} MB`}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
