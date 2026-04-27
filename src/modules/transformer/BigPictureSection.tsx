import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { bigPictureSectionSv, bigPictureSectionKo } from './tech-translations'

interface LayerDef {
  id: string
  label: string
  color: string
  desc: string
  expandable?: boolean
}

const LAYERS: LayerDef[] = [
  { id: 'input', label: 'Input', color: 'bg-sky-900 border-sky-600', desc: 'Raw text tokens enter the model.' },
  { id: 'embed', label: 'Embedding', color: 'bg-violet-900 border-violet-600', desc: 'Each token is mapped to a dense vector that captures its meaning.' },
  { id: 'layer1', label: 'Layer 1', color: 'bg-emerald-900 border-emerald-600', desc: 'First transformer block — learns basic syntax and local patterns.', expandable: true },
  { id: 'layer2', label: 'Layer 2', color: 'bg-emerald-900 border-emerald-600', desc: 'Second block — builds richer representations from Layer 1.', expandable: true },
  { id: 'layerN', label: '⋯ Layer N', color: 'bg-emerald-900 border-emerald-600', desc: 'Final blocks — high-level reasoning and task-specific features.', expandable: true },
  { id: 'output', label: 'Output', color: 'bg-amber-900 border-amber-600', desc: 'Probability distribution over the vocabulary for the next token.' },
]

const EN_P2 = `{c.p2}`
const EN_P3 = `{c.p3}`
const EN_INTRO = `A transformer is a stack of identical layers. Data flows from input to output, getting richer at each step.`

export const BigPictureSection: React.FC = () => {
  const c = useT({ title: '1 · The Big Picture', intro: EN_INTRO , p2: EN_P2, p3: EN_P3 }, { sv: bigPictureSectionSv, ko: bigPictureSectionKo })
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = useCallback((id: string) => {
    setExpanded(prev => (prev === id ? null : id))
  }, [])

  return (
    <section aria-labelledby="big-picture-heading">
      <h2 id="big-picture-heading" className="mb-2 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="flex flex-col items-center gap-1">
        {LAYERS.map((layer, i) => (
          <div key={layer.id} className="flex w-full max-w-md flex-col items-center">
            {/* Arrow between blocks */}
            {i > 0 && <div className="h-4 w-px bg-zinc-600" />}

            {/* Block */}
            <button
              onClick={() => layer.expandable ? toggle(layer.id) : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-center text-sm font-medium transition-all ${layer.color} ${
                layer.expandable ? 'cursor-pointer hover:brightness-125' : 'cursor-default'
              } ${expanded === layer.id ? 'ring-2 ring-zinc-400' : ''}`}
              aria-expanded={layer.expandable ? expanded === layer.id : undefined}
            >
              {layer.label}
              {layer.expandable && (
                <span className="ml-2 text-xs text-zinc-400">
                  {expanded === layer.id ? '▾' : '▸'}
                </span>
              )}
            </button>

            {/* Description */}
            <p className="mt-1 text-center text-xs text-zinc-500">{layer.desc}</p>

            {/* Expanded inner view */}
            {expanded === layer.id && (
              <div className="mt-2 flex w-full max-w-sm flex-col items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
                <span className="mb-1 text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                  Inside {layer.label}
                </span>
                <div className="w-full rounded border border-blue-700 bg-blue-950 px-3 py-2 text-center text-xs text-blue-300">
                  Multi-Head Attention
                  <p className="mt-0.5 text-[10px] text-blue-400/70">
                    Each token looks at every other token to gather context
                  </p>
                </div>
                <div className="h-3 w-px bg-zinc-600" />
                <div className="text-[10px] text-zinc-500">+ Add &amp; Normalize</div>
                <div className="h-3 w-px bg-zinc-600" />
                <div className="w-full rounded border border-orange-700 bg-orange-950 px-3 py-2 text-center text-xs text-orange-300">
                  Feed-Forward Network
                  <p className="mt-0.5 text-[10px] text-orange-400/70">
                    Processes each token independently — where knowledge is stored
                  </p>
                </div>
                <div className="h-3 w-px bg-zinc-600" />
                <div className="text-[10px] text-zinc-500">+ Add &amp; Normalize</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
