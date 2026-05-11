import { useState, useCallback, useMemo } from 'react'
import { tLabel, useLanguage, useT } from '../../i18n'
import { attentionVariantsSectionSv, attentionVariantsSectionKo } from './tech-translations'

type Variant = 'mha' | 'gqa' | 'mqa' | 'mla'

interface VariantInfo {
  label: string
  full: string
  kvHeads: string
  kvCache: string
  speed: string
  quality: string
  usedBy: string
  description: string
}

const VARIANTS: Record<Variant, VariantInfo> = {
  mha: {
    label: 'MHA',
    full: 'Multi-Head Attention',
    kvHeads: 'H (e.g. 32)',
    kvCache: '100%',
    speed: 'Baseline',
    quality: 'Best',
    usedBy: 'GPT-2, GPT-3, Original Transformer',
    description: 'mhaDesc',
  },
  gqa: {
    label: 'GQA',
    full: 'Grouped-Query Attention',
    kvHeads: 'G groups (e.g. 8)',
    kvCache: '~25%',
    speed: '~2× faster',
    quality: 'Near-MHA',
    usedBy: 'Llama 2 70B, Llama 3, Gemma',
    description: 'gqaDesc',
  },
  mqa: {
    label: 'MQA',
    full: 'Multi-Query Attention',
    kvHeads: '1',
    kvCache: '~3%',
    speed: '~4× faster',
    quality: 'Slightly lower',
    usedBy: 'PaLM, Falcon 40B, StarCoder',
    description: 'mqaDesc',
  },
  mla: {
    label: 'MLA',
    full: 'Multi-Head Latent Attention',
    kvHeads: 'Compressed latent',
    kvCache: '~5-10%',
    speed: '~3× faster',
    quality: 'Near-MHA',
    usedBy: 'DeepSeek V2, DeepSeek V3',
    description: 'mlaDesc',
  },
}

const VARIANT_KEYS: Variant[] = ['mha', 'gqa', 'mqa', 'mla']

const KV_BARS: Record<Variant, number> = { mha: 100, gqa: 25, mqa: 3, mla: 8 }

const EN_P3 = `Query Heads → KV Heads (8 query heads shown)`
const EN_INTRO = `The KV cache is the main memory bottleneck during inference. Different attention variants trade off memory, speed, and quality.`

export const AttentionVariantsSection: React.FC = () => {
  const { lang } = useLanguage()
  const c = useT({ title: '3. Attention Variants', intro: EN_INTRO  , p3: EN_P3 }, { sv: attentionVariantsSectionSv, ko: attentionVariantsSectionKo })
  const [active, setActive] = useState<Variant>('mha')

  const selectVariant = useCallback((v: Variant) => setActive(v), [])

  const info = VARIANTS[active]

  const headVisual = useMemo(() => {
    const totalHeads = 8
    if (active === 'mha') {
      return Array.from({ length: totalHeads }).map((_, i) => ({ q: i, kv: i, color: 'bg-blue-200 dark:bg-blue-500/30 border-blue-400 dark:border-blue-500/40' }))
    }
    if (active === 'gqa') {
      return Array.from({ length: totalHeads }).map((_, i) => ({ q: i, kv: Math.floor(i / 2), color: 'bg-green-200 dark:bg-green-500/30 border-green-400 dark:border-green-500/40' }))
    }
    if (active === 'mqa') {
      return Array.from({ length: totalHeads }).map((_, i) => ({ q: i, kv: 0, color: 'bg-amber-200 dark:bg-amber-500/30 border-amber-400 dark:border-amber-500/40' }))
    }
    // mla
    return Array.from({ length: totalHeads }).map((_, i) => ({ q: i, kv: -1, color: 'bg-purple-200 dark:bg-purple-500/30 border-purple-400 dark:border-purple-500/40' }))
  }, [active])

  const kvCount = active === 'mla' ? 1 : new Set(headVisual.map(h => h.kv)).size

  return (
    <section aria-labelledby="attention-variants">
      <h2 id="attention-variants" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Variant selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {VARIANT_KEYS.map(v => (
          <button
            key={v}
            onClick={() => selectVariant(v)}
            className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
              active === v
                ? 'border-zinc-500 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
            }`}
          >
            {VARIANTS[v].label}
            <span className="ml-1 text-xs text-zinc-500">({VARIANTS[v].full})</span>
          </button>
        ))}
      </div>

      {/* Visual */}
      <div className="mb-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">
        <p className="mb-1 font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-200">{info.full}</p>
        <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">{tLabel(lang, info.description)}</p>

        {/* Head diagram */}
        <div className="mb-4">
          <p className="mb-2 text-xs text-zinc-500 uppercase">{c.p3}</p>
          <div className="flex gap-2">
            {headVisual.map((h, i) => (
              <div key={i} className={`flex-1 rounded border p-2 text-center text-xs ${h.color}`}>
                <div className="text-zinc-700 dark:text-zinc-300">Q{h.q}</div>
                <div className="my-1 text-zinc-500 dark:text-zinc-600">↓</div>
                <div className="text-zinc-500 dark:text-zinc-400">
                  {active === 'mla' ? 'Latent' : `KV${h.kv}`}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            {active === 'mla'
              ? '1 compressed latent vector (low-rank projection)'
              : `${kvCount} KV head${kvCount > 1 ? 's' : ''} for 8 query heads`}
          </p>
        </div>

        {/* KV cache comparison bars */}
        <p className="mb-2 text-xs text-zinc-500 uppercase">Relative KV Cache Size</p>
        <div className="space-y-2">
          {VARIANT_KEYS.map(v => (
            <div key={v} className="flex items-center gap-3">
              <span className={`w-10 text-right font-mono text-xs ${v === active ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500'}`}>
                {VARIANTS[v].label}
              </span>
              <div className="h-4 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    v === active ? 'bg-zinc-300' : 'bg-zinc-600'
                  }`}
                  style={{ width: `${KV_BARS[v]}%` }}
                />
              </div>
              <span className="w-12 font-mono text-xs text-zinc-500">{VARIANTS[v].kvCache}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tradeoff table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-500 uppercase">
              <th className="px-4 py-2">Variant</th>
              <th className="px-4 py-2">KV Heads</th>
              <th className="px-4 py-2">Cache Size</th>
              <th className="px-4 py-2">Speed</th>
              <th className="px-4 py-2">Quality</th>
              <th className="px-4 py-2">Used By</th>
            </tr>
          </thead>
          <tbody>
            {VARIANT_KEYS.map(v => (
              <tr key={v} className={`border-b border-zinc-200 dark:border-zinc-800 ${v === active ? 'bg-zinc-100 dark:bg-zinc-800/50' : ''}`}>
                <td className="px-4 py-2 font-mono font-medium text-zinc-800 dark:text-zinc-200">{VARIANTS[v].label}</td>
                <td className="px-4 py-2 text-zinc-500 dark:text-zinc-400">{VARIANTS[v].kvHeads}</td>
                <td className="px-4 py-2 font-mono text-zinc-700 dark:text-zinc-300">{VARIANTS[v].kvCache}</td>
                <td className="px-4 py-2 text-zinc-500 dark:text-zinc-400">{VARIANTS[v].speed}</td>
                <td className="px-4 py-2 text-zinc-500 dark:text-zinc-400">{VARIANTS[v].quality}</td>
                <td className="px-4 py-2 text-zinc-500">{VARIANTS[v].usedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
