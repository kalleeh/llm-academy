import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { denseMoESectionSv, denseMoESectionKo } from './tech-translations'
import { comparisonTranslations } from './data-translations'

type Mode = 'dense' | 'moe'

const MODELS = [
  { name: 'Llama 3 70B', type: 'Dense' as const, total: '70B', active: '70B', experts: '—', note: 'All params active every forward pass' },
  { name: 'Mixtral 8x7B', type: 'MoE' as const, total: '46.7B', active: '12.9B', experts: '8 (top-2)', note: '2 of 8 experts per token' },
  { name: 'DeepSeek V3', type: 'MoE' as const, total: '671B', active: '37B', experts: '256 (top-8)', note: '8 of 256 experts per token' },
  { name: 'GPT-4 (rumored)', type: 'MoE' as const, total: '~1.8T', active: '~220B', experts: '16 (top-2)', note: 'Unconfirmed; 16 expert mixture' },
]

const COMPARISON = [
  { aspect: 'Training ease', dense: 'Simpler — standard backprop', moe: 'Harder — load balancing, routing instability' },
  { aspect: 'Fine-tuning', dense: 'Straightforward — all params updated', moe: 'Complex — expert freezing, routing drift' },
  { aspect: 'Memory (inference)', dense: 'All params in VRAM', moe: 'All params in VRAM (larger total)' },
  { aspect: 'Compute (inference)', dense: 'All params activated', moe: 'Only active experts computed — faster' },
  { aspect: 'Scaling efficiency', dense: 'Linear cost increase', moe: 'Sub-linear — add experts cheaply' },
]

export const DenseMoESection: React.FC = () => {
  const { lang } = useLanguage()
  const cOMPARISONT = tArray(lang, COMPARISON, comparisonTranslations)
  const c = useT({ title: '1. Dense vs Mixture-of-Experts' }, { sv: denseMoESectionSv, ko: denseMoESectionKo })
  const [mode, setMode] = useState<Mode>('dense')

  const toggle = useCallback(() => setMode(m => (m === 'dense' ? 'moe' : 'dense')), [])

  return (
    <section aria-labelledby="dense-moe">
      <h2 id="dense-moe" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        A <strong className="text-zinc-100">dense</strong> model activates every parameter on every
        token. A <strong className="text-zinc-100">Mixture-of-Experts (MoE)</strong> model routes
        each token to a small subset of specialist &ldquo;expert&rdquo; FFN blocks, keeping compute
        low while storing far more knowledge.
      </p>

      {/* Interactive toggle */}
      <div className="mb-6 flex items-center gap-3">
        <span className={`text-sm ${mode === 'dense' ? 'text-zinc-100' : 'text-zinc-500'}`}>Dense</span>
        <button
          onClick={toggle}
          className="relative h-6 w-11 rounded-full bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500"
          role="switch"
          aria-checked={mode === 'moe'}
          aria-label="Toggle between Dense and MoE architecture"
        >
          <span
            className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-zinc-100 transition-transform ${
              mode === 'moe' ? 'translate-x-5' : ''
            }`}
          />
        </button>
        <span className={`text-sm ${mode === 'moe' ? 'text-zinc-100' : 'text-zinc-500'}`}>MoE</span>
      </div>

      {/* Architecture visual */}
      <div className="mb-6 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 p-6">
        <p className="mb-3 font-mono text-xs text-zinc-500 uppercase">
          {mode === 'dense' ? 'Dense Layer' : 'MoE Layer'} — Single Transformer Block
        </p>

        <div className="flex flex-col items-center gap-3">
          {/* Input */}
          <div className="rounded border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm text-zinc-300">
            Token Embedding
          </div>
          <span className="text-zinc-600">↓</span>

          {/* Attention */}
          <div className="rounded border border-blue-500/30 bg-blue-500/10 px-6 py-2 text-sm text-blue-400">
            Self-Attention
          </div>
          <span className="text-zinc-600">↓</span>

          {mode === 'dense' ? (
            /* Dense: single FFN, fully active */
            <div className="w-full max-w-xs rounded border border-amber-500/30 bg-amber-500/10 p-4 text-center">
              <p className="font-mono text-sm font-semibold text-amber-400">FFN (Feed-Forward)</p>
              <p className="mt-1 text-xs text-amber-400/70">100% of parameters active</p>
            </div>
          ) : (
            /* MoE: router + experts */
            <div className="w-full max-w-md space-y-3">
              <div className="rounded border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-center text-sm text-purple-400">
                Router (Gating Network)
              </div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 8 }).map((_, i) => {
                  const active = i < 2
                  return (
                    <div
                      key={i}
                      className={`rounded border p-2 text-center text-xs ${
                        active
                          ? 'border-green-500/40 bg-green-500/15 text-green-400'
                          : 'border-zinc-700 bg-zinc-800/50 text-zinc-600'
                      }`}
                    >
                      Expert {i + 1}
                      {active && <span className="block text-[10px]">✓ active</span>}
                    </div>
                  )
                })}
              </div>
              <p className="text-center text-xs text-zinc-500">
                2 of 8 experts selected per token — 75% compute saved
              </p>
            </div>
          )}

          <span className="text-zinc-600">↓</span>
          <div className="rounded border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm text-zinc-300">
            Output
          </div>
        </div>
      </div>

      {/* Real model examples */}
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-300">Real-World Models</h3>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-700 text-xs text-zinc-500 uppercase">
              <th className="py-2 pr-4">Model</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Total Params</th>
              <th className="py-2 pr-4">Active Params</th>
              <th className="py-2 pr-4">Experts</th>
              <th className="py-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {MODELS.map(m => (
              <tr key={m.name} className="border-b border-zinc-800">
                <td className="py-2 pr-4 font-medium text-zinc-200">{m.name}</td>
                <td className="py-2 pr-4">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    m.type === 'Dense' ? 'bg-amber-500/20 text-amber-400' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {m.type}
                  </span>
                </td>
                <td className="py-2 pr-4 font-mono text-zinc-300">{m.total}</td>
                <td className="py-2 pr-4 font-mono text-zinc-300">{m.active}</td>
                <td className="py-2 pr-4 text-zinc-400">{m.experts}</td>
                <td className="py-2 text-zinc-500">{m.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comparison table */}
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-300">Tradeoff Comparison</h3>
      <div className="overflow-x-auto rounded-lg border border-zinc-700">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800">
              <th className="px-4 py-2 text-xs text-zinc-500 uppercase">Aspect</th>
              <th className="px-4 py-2 text-xs text-amber-400/70 uppercase">Dense</th>
              <th className="px-4 py-2 text-xs text-purple-400/70 uppercase">MoE</th>
            </tr>
          </thead>
          <tbody>
            {cOMPARISONT.map(row => (
              <tr key={row.aspect} className="border-b border-zinc-800">
                <td className="px-4 py-2 font-medium text-zinc-300">{row.aspect}</td>
                <td className="px-4 py-2 text-zinc-400">{row.dense}</td>
                <td className="px-4 py-2 text-zinc-400">{row.moe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
