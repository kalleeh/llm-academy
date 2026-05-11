import { useState, useCallback } from 'react'
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { tArray, useLanguage, useT } from '../../i18n'
import { layerByLayerSectionSv, layerByLayerSectionKo } from './tech-translations'
import { layerDataTranslations } from './data-translations'

const TOKEN = 'it'

interface LayerInfo {
  name: string
  description: string
  features: { label: string; value: number; color: string }[]
}

const LAYER_DATA: LayerInfo[] = [
  {
    name: 'Layer 1 — Surface Features',
    description: 'The model recognizes basic syntax: "it" is a pronoun, appears mid-sentence.',
    features: [
      { label: 'Is pronoun', value: 0.85, color: 'bg-sky-500' },
      { label: 'Position: mid', value: 0.70, color: 'bg-sky-500' },
      { label: 'Refers to noun', value: 0.20, color: 'bg-sky-500' },
      { label: 'Subject of clause', value: 0.15, color: 'bg-sky-500' },
      { label: 'Sentiment carrier', value: 0.05, color: 'bg-sky-500' },
    ],
  },
  {
    name: 'Layer 4 — Syntax & Grammar',
    description: '"it" is identified as the subject of "was tired", linked to the "because" clause.',
    features: [
      { label: 'Is pronoun', value: 0.90, color: 'bg-violet-500' },
      { label: 'Subject of clause', value: 0.75, color: 'bg-violet-500' },
      { label: 'Refers to "cat"', value: 0.45, color: 'bg-violet-500' },
      { label: 'Causal context', value: 0.40, color: 'bg-violet-500' },
      { label: 'Sentiment carrier', value: 0.15, color: 'bg-violet-500' },
    ],
  },
  {
    name: 'Layer 8 — Semantic Meaning',
    description: 'The model now strongly links "it" to "cat" and understands the causal chain.',
    features: [
      { label: 'Refers to "cat"', value: 0.88, color: 'bg-emerald-500' },
      { label: 'Causal context', value: 0.75, color: 'bg-emerald-500' },
      { label: 'Animate entity', value: 0.70, color: 'bg-emerald-500' },
      { label: 'Subject of clause', value: 0.82, color: 'bg-emerald-500' },
      { label: 'Sentiment carrier', value: 0.40, color: 'bg-emerald-500' },
    ],
  },
  {
    name: 'Layer 12 — Task Reasoning',
    description: 'Full understanding: "it" = the cat, which sat on the mat, and is now tired.',
    features: [
      { label: 'Refers to "cat"', value: 0.95, color: 'bg-amber-500' },
      { label: 'Animate entity', value: 0.90, color: 'bg-amber-500' },
      { label: 'Causal: sat → tired', value: 0.88, color: 'bg-amber-500' },
      { label: 'Predict: "tired"', value: 0.85, color: 'bg-amber-500' },
      { label: 'Sentiment: fatigue', value: 0.72, color: 'bg-amber-500' },
    ],
  },
]

function BarChart({ features }: { features: LayerInfo['features'] }) {
  return (
    <div className="space-y-2">
      {features.map(f => (
        <div key={f.label} className="flex items-center gap-2">
          <span className="w-32 shrink-0 text-right text-xs text-zinc-400">{f.label}</span>
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-zinc-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${f.color}`}
              style={{ width: `${f.value * 100}%` }}
            />
          </div>
          <span className="w-10 text-right font-mono text-xs text-zinc-500">
            {(f.value * 100).toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
  )
}

const EN_P4 = `Watch how the representation of the token`
const EN_P3 = `Watch how the representation of the token`
export const LayerByLayerSection: React.FC = () => {
  const { lang } = useLanguage()
  const lAYER_DATAT = tArray(lang, LAYER_DATA, layerDataTranslations)
  const c = useT({ title: '4 · Layer by Layer'  , p3: EN_P3 , p4: EN_P4 }, { sv: layerByLayerSectionSv, ko: layerByLayerSectionKo })
  const [step, setStep] = useState(0)

  const handleStep = useCallback((s: number) => {
    setStep(s)
  }, [])

  const steps = LAYER_DATA.map((layer, i) => (
    <div key={i}>
      <div className="mb-3 flex items-baseline gap-2">
        <span className="font-mono text-sm font-bold text-zinc-200">{layer.name}</span>
      </div>
      <p className="mb-4 text-xs text-zinc-400">{layer.description}</p>
      <BarChart features={layer.features} />
    </div>
  ))

  return (
    <section aria-labelledby="layers-heading">
      <h2 id="layers-heading" className="mb-2 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-4 text-sm text-zinc-400">{c.p4}<strong className="text-amber-300">
        &quot;{TOKEN}&quot;</strong> evolves as it passes through the transformer's layers.
        Early layers capture surface features; deeper layers build rich semantic understanding.
      </p>

      {/* Layer progress indicator */}
      <div className="mb-4 flex items-center gap-1">
        {lAYER_DATAT.map((_, i) => (
          <button
            key={i}
            onClick={() => handleStep(i)}
            className={`h-2 flex-1 rounded-full transition-all ${
              i <= step ? 'bg-amber-500' : 'bg-zinc-700'
            }`}
            aria-label={`Go to ${lAYER_DATAT[i].name}`}
          />
        ))}
      </div>

      <InteractiveDemo
        title={`Token "${TOKEN}" — Representation Through Layers`}
        description="Step through layers to see how understanding builds up"
        steps={steps}
        currentStep={step}
      />

      {/* Manual nav since we're using controlled mode */}
      <div className="mt-3 flex justify-center gap-2">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded bg-zinc-700 px-4 py-1.5 text-xs text-zinc-200 hover:bg-zinc-600 disabled:opacity-40"
        >
          ← Previous Layer
        </button>
        <button
          onClick={() => setStep(s => Math.min(LAYER_DATA.length - 1, s + 1))}
          disabled={step === LAYER_DATA.length - 1}
          className="rounded bg-zinc-700 px-4 py-1.5 text-xs text-zinc-200 hover:bg-zinc-600 disabled:opacity-40"
        >
          Next Layer →
        </button>
      </div>
    </section>
  )
}
