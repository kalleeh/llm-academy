import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { levelsTranslations, overlaysTranslations } from './data-translations'
import { landscapeSectionSv, landscapeSectionKo } from './tech-translations'

interface AILevel {
  id: string
  label: string
  color: string
  ringColor: string
  definition: string
  examples: string[]
}

const LEVELS: AILevel[] = [
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    color: 'bg-blue-500/10 border-blue-500/30',
    ringColor: 'ring-blue-500/50',
    definition:
      'Any system that performs tasks normally requiring human intelligence — reasoning, planning, perception, or decision-making.',
    examples: [
      'Rule-based systems (if/else logic for tax calculations)',
      'Expert systems (medical diagnosis from symptom rules)',
      'Search algorithms (A*, minimax for chess/pathfinding)',
      'Robotic process automation (RPA for form filling)',
    ],
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    color: 'bg-emerald-500/10 border-emerald-500/30',
    ringColor: 'ring-emerald-500/50',
    definition:
      'Systems that learn patterns from data instead of being explicitly programmed. They improve with more data.',
    examples: [
      'Regression (predicting house prices from features)',
      'Classification (spam vs. not spam)',
      'Clustering (customer segmentation)',
      'Recommendation engines (Netflix, Spotify)',
    ],
  },
  {
    id: 'dl',
    label: 'Deep Learning',
    color: 'bg-purple-500/10 border-purple-500/30',
    ringColor: 'ring-purple-500/50',
    definition:
      'ML using neural networks with many layers. Excels at learning from raw, unstructured data like images, audio, and text.',
    examples: [
      'CNNs — image classification, object detection',
      'RNNs/LSTMs — time-series, sequence modeling',
      'Transformers — the architecture behind modern LLMs',
      'GANs — image generation, style transfer',
    ],
  },
  {
    id: 'llm',
    label: 'Large Language Models',
    color: 'bg-amber-500/10 border-amber-500/30',
    ringColor: 'ring-amber-500/50',
    definition:
      'Massive transformer models trained on internet-scale text. They predict the next token and emerge with reasoning, coding, and conversation abilities.',
    examples: [
      'GPT-4, Claude, Gemini — general-purpose reasoning',
      'Llama, Mistral — open-weight models',
      'Text generation, summarization, translation',
      'Code generation, analysis, debugging',
    ],
  },
]

interface OverlayBadge {
  label: string
  description: string
  color: string
  position: string
}

const OVERLAYS: OverlayBadge[] = [
  {
    label: 'Generative AI',
    description: 'Models that create new content (text, images, audio, code). Spans Deep Learning and LLMs.',
    color: 'bg-pink-500/20 border-pink-500/40 text-pink-300',
    position: 'top-2 right-2',
  },
  {
    label: 'Agentic AI',
    description: 'LLMs augmented with tools, memory, and planning — they take actions, not just generate text.',
    color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300',
    position: 'top-2 left-2',
  },
]

const EN_INTRO = `AI is a broad field. Machine Learning is a subset, Deep Learning is a subset of that, and LLMs are a specific kind of deep learning. Click each layer to explore.`

export const LandscapeSection: React.FC = () => {
  const { lang } = useLanguage()
  const lEVELST = tArray(lang, LEVELS, levelsTranslations)
  const oVERLAYST = tArray(lang, OVERLAYS, overlaysTranslations)
  const c = useT({ title: '1. The Landscape', intro: EN_INTRO }, { sv: landscapeSectionSv, ko: landscapeSectionKo })
  const [expanded, setExpanded] = useState<string | null>(null)
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null)

  const toggle = useCallback((id: string) => {
    setExpanded(prev => (prev === id ? null : id))
  }, [])

  const toggleOverlay = useCallback((label: string) => {
    setActiveOverlay(prev => (prev === label ? null : label))
  }, [])

  return (
    <section aria-labelledby="landscape">
      <h2 id="landscape" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Nested diagram */}
      <div className="relative mb-6">
        {lEVELST.map((level, i) => (
          <div
            key={level.id}
            style={{ marginLeft: `${i * 24}px`, marginRight: `${i * 24}px` }}
            className="mb-2"
          >
            <button
              onClick={() => toggle(level.id)}
              className={`w-full rounded-lg border p-4 text-left transition-all ${level.color} ${
                expanded === level.id ? `ring-2 ${level.ringColor}` : ''
              } hover:brightness-125`}
              aria-expanded={expanded === level.id}
              aria-controls={`${level.id}-details`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-zinc-100">{level.label}</span>
                <span className="text-xs text-zinc-500">{expanded === level.id ? '▲' : '▼'}</span>
              </div>
            </button>
            {expanded === level.id && (
              <div
                id={`${level.id}-details`}
                className="mt-1 rounded-b-lg border border-t-0 border-zinc-700 bg-zinc-900/80 p-4"
              >
                <p className="mb-3 text-sm leading-relaxed text-zinc-300">{level.definition}</p>
                <ul className="space-y-1">
                  {level.examples.map(ex => (
                    <li key={ex} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className="mt-1 text-zinc-600">•</span>
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* GenAI / Agentic badges */}
      <div className="flex flex-wrap gap-3">
        {oVERLAYST.map(o => (
          <div key={o.label}>
            <button
              onClick={() => toggleOverlay(o.label)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${o.color} hover:brightness-125`}
              aria-expanded={activeOverlay === o.label}
            >
              {o.label}
            </button>
            {activeOverlay === o.label && (
              <p className="mt-2 max-w-md text-sm text-zinc-400">{o.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
