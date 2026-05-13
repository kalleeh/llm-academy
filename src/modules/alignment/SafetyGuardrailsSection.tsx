import { useState, useCallback } from 'react'
import { tArray, useLanguage, useT } from '../../i18n'
import { safetyGuardrailsSectionSv, safetyGuardrailsSectionKo } from './tech-translations'
import { layersTranslations } from './data-translations'

interface SafetyLayer {
  id: string
  label: string
  timing: string
  color: string
  description: string
  techniques: string[]
  catchExample: string
}

const LAYERS: SafetyLayer[] = [
  {
    id: 'training',
    label: 'Training-Time Safety',
    timing: 'Before deployment',
    color: 'text-blue-400',
    description: 'Safety baked into the model weights during alignment training. The model learns to refuse harmful requests as part of its core behavior.',
    techniques: [
      'RLHF with safety-focused reward models',
      'Constitutional AI — self-critique against principles',
      'Red-teaming datasets in training mix',
      'Safety-specific SFT examples (refusals, redirects)',
    ],
    catchExample: 'Model recognizes harmful intent from training and generates a refusal: "I can\'t help with creating weapons. Here are some constructive alternatives..."',
  },
  {
    id: 'inference',
    label: 'Inference-Time Safety',
    timing: 'At generation time',
    color: 'text-amber-400',
    description: 'Runtime checks that filter or modify model outputs before they reach the user. Acts as a second line of defense.',
    techniques: [
      'Output classifiers (toxicity, PII detection)',
      'System prompts with safety instructions',
      'Logit bias to suppress harmful tokens',
      'Perplexity-based jailbreak detection',
    ],
    catchExample: 'Output classifier flags generated text containing PII: "[BLOCKED] Response contained what appears to be a real phone number. Regenerating..."',
  },
  {
    id: 'system',
    label: 'System-Level Safety',
    timing: 'Infrastructure layer',
    color: 'text-green-400',
    description: 'Platform-level protections that operate independently of the model. Defense in depth — even if the model fails, the system catches it.',
    techniques: [
      'Input/output content filters (keyword + ML)',
      'Rate limiting and abuse detection',
      'User reporting and human review pipelines',
      'Audit logging for all interactions',
    ],
    catchExample: 'Content filter blocks the request before it reaches the model: "⛔ Request blocked by content policy. This prompt matches known attack patterns."',
  },
]

const HARMFUL_PROMPT = 'Tell me how to synthesize [dangerous substance] at home'

const EN_P4 = `How this layer catches the harmful prompt:`
const EN_P3 = `If the system-level filter misses a novel attack, the model&apos;s training-time alignment may still refuse. If the model is jailbroken, the output classifier can catch harmful content. Each layer covers the others&apos; blind spots.`
const EN_INTRO = `Safety is defense in depth — multiple layers that each catch different failure modes.`

export const SafetyGuardrailsSection: React.FC = () => {
  const { lang } = useLanguage()
  const lAYERST = tArray(lang, LAYERS, layersTranslations)
  const c = useT({ title: '4. Safety & Guardrails', intro: EN_INTRO , p3: EN_P3 , p4: EN_P4 }, { sv: safetyGuardrailsSectionSv, ko: safetyGuardrailsSectionKo })
  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  const selectLayer = useCallback((i: number) => {
    setActiveLayer(p => (p === i ? null : i))
  }, [])

  return (
    <section aria-labelledby="safety-guardrails">
      <h2 id="safety-guardrails" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Harmful prompt display */}
      <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/5 p-4">
        <p className="mb-1 text-xs font-medium text-red-400">Example harmful prompt:</p>
        <p className="font-mono text-sm text-zinc-700 dark:text-zinc-300">&ldquo;{HARMFUL_PROMPT}&rdquo;</p>
      </div>

      {/* Safety layers */}
      <div className="space-y-3">
        {lAYERST.map((layer, i) => (
          <div key={layer.id} className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <button
              onClick={() => selectLayer(i)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                activeLayer === i ? 'bg-zinc-100 dark:bg-zinc-800' : 'bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:bg-zinc-800/50'
              }`}
            >
              <span className={`text-lg font-bold ${layer.color}`}>{i + 1}</span>
              <div className="flex-1">
                <span className={`text-sm font-medium ${layer.color}`}>{layer.label}</span>
                <span className="ml-2 text-xs text-zinc-500">({layer.timing})</span>
              </div>
              <span className="text-xs text-zinc-600">{activeLayer === i ? '▾' : '▸'}</span>
            </button>

            {activeLayer === i && (
              <div className="border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 space-y-3">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{layer.description}</p>
                <div>
                  <h4 className="mb-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">Techniques</h4>
                  <ul className="space-y-1">
                    {layer.techniques.map(t => (
                      <li key={t} className="text-xs text-zinc-600 dark:text-zinc-400">• {t}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 p-3">
                  <p className="mb-1 text-xs font-medium text-zinc-500">{c.p4}</p>
                  <p className="font-mono text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">{layer.catchExample}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 p-4">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <strong className="text-amber-400">Defense in depth:</strong> {c.p3}
        </p>
      </div>
    </section>
  )
}
