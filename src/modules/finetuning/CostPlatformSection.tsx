import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { costPlatformSectionSv, costPlatformSectionKo } from './tech-translations'

interface Platform {
  name: string
  gpu: string
  vram: string
  cost: string
  ease: number
  notes: string
}

const PLATFORMS: Platform[] = [
  { name: 'Google Colab (Free)', gpu: 'T4', vram: '15 GB', cost: 'Free', ease: 5, notes: 'Limited to ~12h sessions. T4 is slow for 8B+ models. Good for learning.' },
  { name: 'Google Colab Pro', gpu: 'A100 40GB', vram: '40 GB', cost: '~$10/mo', ease: 5, notes: 'Best value for occasional fine-tuning. A100 access not guaranteed.' },
  { name: 'RunPod / Lambda', gpu: 'A100 80GB', vram: '80 GB', cost: '$1–2/hr', ease: 3, notes: 'On-demand GPU rental. Pay only for what you use. Great for serious work.' },
  { name: 'AWS SageMaker', gpu: 'A100 / H100', vram: '40–80 GB', cost: '$3–5/hr', ease: 2, notes: 'Managed service with MLOps integration. Higher cost, more features.' },
  { name: 'Local (own GPU)', gpu: 'RTX 4090', vram: '24 GB', cost: '$0 (amortized)', ease: 4, notes: 'No recurring cost. 24 GB VRAM handles 8B models with QLoRA. Setup required.' },
]

const EASE_LABELS = ['', '★', '★★', '★★★', '★★★★', '★★★★★']

const COST_ESTIMATE = {
  model: 'Llama 3.1 8B',
  method: 'QLoRA (4-bit)',
  dataset: '5,000 examples',
  epochs: 3,
  time: '~20 min on A100',
  costRange: '$0.50–$1.00',
  vram: '~11 GB peak',
}

const EN_P2 = `A LoRA fine-tune of an 8B model on 5K examples costs about`
const EN_INTRO = `Where to run your fine-tuning job, what it costs, and what hardware you need.`

export const CostPlatformSection: React.FC = () => {
  const { lang } = useLanguage()
  const pLATFORMST = tArray(lang, PLATFORMS)
  const c = useT({ title: '5. Cost & Platform Guide', intro: EN_INTRO , p2: EN_P2 }, { sv: costPlatformSectionSv, ko: costPlatformSectionKo })
  const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null)

  const handleSelect = useCallback((i: number) => {
    setSelectedPlatform(prev => prev === i ? null : i)
  }, [])

  return (
    <section aria-labelledby="cost-platform">
      <h2 id="cost-platform" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="mb-8 overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-zinc-700 text-left">
              <th className="px-3 py-2 font-mono text-xs font-semibold text-zinc-400">Platform</th>
              <th className="px-3 py-2 font-mono text-xs font-semibold text-zinc-400">GPU</th>
              <th className="px-3 py-2 font-mono text-xs font-semibold text-zinc-400">VRAM</th>
              <th className="px-3 py-2 font-mono text-xs font-semibold text-zinc-400">Cost</th>
              <th className="px-3 py-2 font-mono text-xs font-semibold text-zinc-400">Ease</th>
            </tr>
          </thead>
          <tbody>
            {pLATFORMST.map((p, i) => (
              <tr
                key={p.name}
                onClick={() => handleSelect(i)}
                className={`cursor-pointer border-b border-zinc-800 transition-colors ${
                  selectedPlatform === i ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'
                }`}
              >
                <td className="px-3 py-2.5 font-medium text-zinc-200">{p.name}</td>
                <td className="px-3 py-2.5 font-mono text-xs text-zinc-300">{p.gpu}</td>
                <td className="px-3 py-2.5 font-mono text-xs text-zinc-300">{p.vram}</td>
                <td className="px-3 py-2.5 font-mono text-xs text-amber-400">{p.cost}</td>
                <td className="px-3 py-2.5 text-xs text-yellow-500">{EASE_LABELS[p.ease]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedPlatform !== null && (
          <div className="mt-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3">
            <p className="text-xs leading-relaxed text-zinc-300">
              <strong className="text-zinc-100">{pLATFORMST[selectedPlatform].name}:</strong>{' '}
              {pLATFORMST[selectedPlatform].notes}
            </p>
          </div>
        )}
      </div>

      <h3 className="mb-3 font-mono text-sm font-semibold tracking-wider text-zinc-400 uppercase">
        Realistic cost estimate
      </h3>
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-5">
        <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {Object.entries(COST_ESTIMATE).map(([key, value]) => (
            <div key={key} className="flex justify-between gap-4">
              <span className="text-sm text-zinc-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <span className="font-mono text-sm font-medium text-zinc-200">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-amber-500/20 pt-3">
          <p className="text-sm text-zinc-300">
            <strong className="text-amber-400">Bottom line:</strong> {c.p2} <strong className="text-zinc-100">$0.50–$1.00</strong> on
            cloud GPUs, or free if you have a local RTX 3090/4090.
          </p>
        </div>
      </div>
    </section>
  )
}
