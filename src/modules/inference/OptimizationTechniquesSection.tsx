import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { optimizationTechniquesSectionSv, optimizationTechniquesSectionKo } from './tech-translations'
import { techniquesTranslations } from './data-translations'

interface Technique {
  id: string
  name: string
  short: string
  description: string
  before: { label: string; value: number }
  after: { label: string; value: number }
  unit: string
  visual: string[]
}

const TECHNIQUES: Technique[] = [
  {
    id: 'continuous-batching',
    name: 'Continuous Batching',
    short: 'Process multiple requests simultaneously',
    description:
      'Static batching waits for all requests to finish before starting new ones. Continuous batching inserts new requests as soon as a slot opens — GPU stays busy, throughput jumps 2-5×.',
    before: { label: 'Static batching', value: 40 },
    after: { label: 'Continuous batching', value: 150 },
    unit: 'req/s',
    visual: ['Req A ████████░░░░', 'Req B ░░████████░░', 'Req C ░░░░░░████░░', 'GPU idle ████░░░░████'],
  },
  {
    id: 'kv-paging',
    name: 'KV Cache Paging (vLLM)',
    short: 'Manage cache like virtual memory',
    description:
      'Traditional KV cache pre-allocates contiguous memory per sequence, wasting space on short outputs. PagedAttention allocates cache in small blocks (pages) on demand — like OS virtual memory. Reduces waste from ~60% to ~4%.',
    before: { label: 'Contiguous allocation', value: 35 },
    after: { label: 'PagedAttention', value: 90 },
    unit: '% GPU utilization',
    visual: ['Seq 1 [██░░░░░░]', 'Seq 2 [████░░░░]', 'Wasted  [░░░░████]'],
  },
  {
    id: 'speculative',
    name: 'Speculative Decoding',
    short: 'Small model drafts, large model verifies',
    description:
      'A small "draft" model generates K candidate tokens cheaply. The large model verifies all K in a single forward pass (parallel). If most are accepted, you get K tokens for the cost of ~1 large-model step. Typical speedup: 2-3×.',
    before: { label: 'Standard decode', value: 30 },
    after: { label: 'Speculative (K=5)', value: 75 },
    unit: 'tokens/s',
    visual: ['Draft:  [t1 t2 t3 t4 t5]', 'Verify: [✓  ✓  ✓  ✗  —]', 'Accept: [t1 t2 t3] + resample t4'],
  },
  {
    id: 'prefix-caching',
    name: 'Prefix Caching',
    short: 'Reuse KV cache for shared system prompts',
    description:
      'Many requests share the same system prompt. Instead of recomputing its KV cache every time, cache it once and reuse across requests. SGLang\'s RadixAttention does this automatically with a trie structure. Saves 30-80% of prefill compute.',
    before: { label: 'No caching', value: 200 },
    after: { label: 'Prefix cached', value: 50 },
    unit: 'ms prefill',
    visual: ['System prompt KV: [cached ████████]', 'User query KV:   [compute ██]', 'Total:           [████████ ██]'],
  },
]

const EN_INTRO = `Raw model inference is slow. These techniques can improve throughput 2-10x without changing the model.`

export const OptimizationTechniquesSection: React.FC = () => {
  const { lang } = useLanguage()
  const tECHNIQUEST = tArray(lang, TECHNIQUES, techniquesTranslations)
  const c = useT({ title: '3. Optimization Techniques', intro: EN_INTRO }, { sv: optimizationTechniquesSectionSv, ko: optimizationTechniquesSectionKo })
  const [activeTech, setActiveTech] = useState(TECHNIQUES[0].id)
  const tech = TECHNIQUES.find(t => t.id === activeTech) ?? TECHNIQUES[0]

  const handleSelect = useCallback((id: string) => () => setActiveTech(id), [])

  const beforePct = Math.round((tech.before.value / Math.max(tech.before.value, tech.after.value)) * 100)
  const afterPct = Math.round((tech.after.value / Math.max(tech.before.value, tech.after.value)) * 100)
  const isLowerBetter = tech.id === 'prefix-caching'

  return (
    <section aria-labelledby="optimization-techniques">
      <h2 id="optimization-techniques" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Technique selector */}
      <div className="mb-4 flex flex-wrap gap-2">
        {tECHNIQUEST.map(t => (
          <button
            key={t.id}
            onClick={handleSelect(t.id)}
            className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
              activeTech === t.id
                ? 'bg-zinc-100 text-zinc-900'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
            aria-pressed={activeTech === t.id}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Detail card */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="font-mono text-sm font-bold text-zinc-100">{tech.name}</h3>
        <p className="mt-1 text-xs text-zinc-400">{tech.short}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">{tech.description}</p>

        {/* ASCII visual */}
        <div className="mt-4 rounded-md bg-zinc-950 p-3 font-mono text-xs text-zinc-400">
          {tech.visual.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {/* Before/after comparison */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
            Before / After ({tech.unit})
          </p>
          <div className="space-y-2">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-zinc-400">{tech.before.label}</span>
                <span className={isLowerBetter ? 'text-red-400' : 'text-zinc-300'}>
                  {tech.before.value} {tech.unit}
                </span>
              </div>
              <div className="h-5 w-full overflow-hidden rounded bg-zinc-800">
                <div
                  className={`h-full rounded transition-all duration-500 ${isLowerBetter ? 'bg-red-500/60' : 'bg-zinc-600'}`}
                  style={{ width: `${beforePct}%` }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-zinc-400">{tech.after.label}</span>
                <span className={isLowerBetter ? 'text-green-400' : 'text-green-400'}>
                  {tech.after.value} {tech.unit}
                </span>
              </div>
              <div className="h-5 w-full overflow-hidden rounded bg-zinc-800">
                <div
                  className="h-full rounded bg-green-500 transition-all duration-500"
                  style={{ width: `${afterPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
