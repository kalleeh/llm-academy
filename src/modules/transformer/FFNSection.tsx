import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import { useT } from '../../useT'
import { fFNSectionSv, fFNSectionKo } from './tech-translations'

type Mode = 'dense' | 'moe'

function DenseView() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="rounded border border-zinc-600 bg-zinc-800 px-6 py-2 text-xs text-zinc-300">
        Token Representation
      </div>
      <div className="h-6 w-px bg-zinc-600" />
      <div className="w-64 rounded-lg border border-orange-700 bg-orange-950 px-4 py-6 text-center">
        <div className="font-mono text-sm font-bold text-orange-300">Single FFN</div>
        <p className="mt-1 text-[10px] text-orange-400/70">
          All tokens processed by the same network — every parameter activated
        </p>
        <div className="mt-3 flex justify-center gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-8 w-2 rounded-sm bg-orange-500/60" />
          ))}
        </div>
        <p className="mt-1 text-[9px] text-zinc-500">All neurons fire</p>
      </div>
      <div className="h-6 w-px bg-zinc-600" />
      <div className="rounded border border-zinc-600 bg-zinc-800 px-6 py-2 text-xs text-zinc-300">
        Output
      </div>
    </div>
  )
}

function MoEView() {
  const experts = ['Syntax', 'Facts', 'Math', 'Code']
  const [activeExperts] = useState([0, 2]) // Router picks 2 of 4

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="rounded border border-zinc-600 bg-zinc-800 px-6 py-2 text-xs text-zinc-300">
        Token Representation
      </div>
      <div className="h-6 w-px bg-zinc-600" />

      {/* Router */}
      <div className="rounded-lg border border-purple-700 bg-purple-950 px-4 py-2 text-center">
        <div className="font-mono text-xs font-bold text-purple-300">Router</div>
        <p className="text-[10px] text-purple-400/70">Picks top-2 experts per token</p>
      </div>

      {/* Fan-out lines */}
      <svg width="280" height="24" className="text-zinc-600">
        <line x1="140" y1="0" x2="35" y2="24" stroke="currentColor" strokeWidth="1" />
        <line x1="140" y1="0" x2="105" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="140" y1="0" x2="175" y2="24" stroke="currentColor" strokeWidth="1" />
        <line x1="140" y1="0" x2="245" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      </svg>

      {/* Experts */}
      <div className="flex gap-2">
        {experts.map((name, i) => {
          const active = activeExperts.includes(i)
          return (
            <div
              key={i}
              className={`w-16 rounded-lg border px-2 py-3 text-center transition-all ${
                active
                  ? 'border-emerald-600 bg-emerald-950 ring-1 ring-emerald-500'
                  : 'border-zinc-700 bg-zinc-900 opacity-40'
              }`}
            >
              <div className={`text-[10px] font-bold ${active ? 'text-emerald-300' : 'text-zinc-500'}`}>
                {name}
              </div>
              <div className="mt-1 flex justify-center gap-0.5">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className={`h-5 w-1.5 rounded-sm ${active ? 'bg-emerald-500/60' : 'bg-zinc-700'}`}
                  />
                ))}
              </div>
              {active && <div className="mt-1 text-[8px] text-emerald-400">active</div>}
            </div>
          )
        })}
      </div>

      {/* Fan-in */}
      <svg width="280" height="24" className="text-zinc-600">
        <line x1="35" y1="0" x2="140" y2="24" stroke="currentColor" strokeWidth="1" />
        <line x1="175" y1="0" x2="140" y2="24" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="rounded border border-zinc-600 bg-zinc-800 px-6 py-2 text-xs text-zinc-300">
        Weighted Sum → Output
      </div>
    </div>
  )
}

const EN_P5 = `Only 2 of N experts activate per token. A model can have 400B+ total parameters but only use ~50B per token — more knowledge, same compute cost.`
const EN_P4 = `After attention gathers context, each token passes through a`
const EN_P3 = `Only 2 of N experts activate per token. A model can have 400B+ total parameters but only use ~50B per token — more knowledge, same compute cost.`
const EN_P2 = `After attention gathers context, each token passes through a`
const EN_INTRO = `Every token activates all parameters. Simple but expensive at scale — a 70B model
            uses all 70B parameters for every single token.`

export const FFNSection: React.FC = () => {
  const c = useT({ title: '5 · The Feed-Forward Network', intro: EN_INTRO  , p2: EN_P2 , p3: EN_P3 , p4: EN_P4 , p5: EN_P5 }, { sv: fFNSectionSv, ko: fFNSectionKo })
  const [mode, setMode] = useState<Mode>('dense')

  const toggleMode = useCallback((m: Mode) => {
    setMode(m)
  }, [])

  return (
    <section aria-labelledby="ffn-heading">
      <h2 id="ffn-heading" className="mb-2 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-4 text-sm text-zinc-400">{c.p4}<strong>feed-forward
        network (FFN)</strong>. This is where the model stores factual knowledge — it's the
        &quot;memory&quot; of the transformer. In <strong>Mixture of Experts (MoE)</strong> models,
        the single FFN is replaced by multiple specialized expert networks, with a router choosing
        which experts to activate per token.
      </p>

      {/* Toggle */}
      <div className="mb-6 flex justify-center gap-2" role="radiogroup" aria-label="FFN architecture type">
        {(['dense', 'moe'] as const).map(m => (
          <button
            key={m}
            role="radio"
            aria-checked={mode === m}
            onClick={() => toggleMode(m)}
            className={`rounded-lg border px-4 py-2 text-sm transition-all ${
              mode === m
                ? 'border-amber-600 bg-amber-950 text-amber-300'
                : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            {m === 'dense' ? <><Icon name="block" /> Dense FFN</> : <><Icon name="puzzle" /> Mixture of Experts</>}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-6">
        {mode === 'dense' ? <DenseView /> : <MoEView />}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className={`rounded-lg border p-3 ${mode === 'dense' ? 'border-orange-700 bg-orange-950/50' : 'border-zinc-700 bg-zinc-900'}`}>
          <h4 className="text-xs font-semibold text-orange-300">Dense FFN</h4>
          <p className="mt-1 text-xs text-zinc-400">{c.intro}</p>
        </div>
        <div className={`rounded-lg border p-3 ${mode === 'moe' ? 'border-emerald-700 bg-emerald-950/50' : 'border-zinc-700 bg-zinc-900'}`}>
          <h4 className="text-xs font-semibold text-emerald-300">Mixture of Experts</h4>
          <p className="mt-1 text-xs text-zinc-400">{c.p5}</p>
        </div>
      </div>
    </section>
  )
}
