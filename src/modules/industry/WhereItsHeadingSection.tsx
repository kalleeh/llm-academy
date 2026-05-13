import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { tArray, useLanguage, useT } from '../../i18n'
import { whereItsHeadingSectionSv, whereItsHeadingSectionKo } from './tech-translations'
import { trendsTranslations } from './data-translations'

interface Trend {
  id: string
  icon: IconName
  title: string
  tagline: string
  color: string
  detail: string
  examples: string[]
}

const TRENDS: Trend[] = [
  {
    id: 'reasoning',
    icon: 'brain',
    title: '4. Where It Is Heading',
    tagline: 'RL-trained chain-of-thought',
    color: 'border-purple-500',
    detail:
      'Models like o3 and DeepSeek R1 use reinforcement learning to develop internal chain-of-thought reasoning. They "think" before answering, dramatically improving math, code, and logic tasks. R1 proved you can get there with pure RL — no supervised fine-tuning needed.',
    examples: ['OpenAI o3', 'DeepSeek R1', 'Claude with extended thinking'],
  },
  {
    id: 'multimodal',
    icon: 'palette',
    title: 'Native Multimodal',
    tagline: 'Text + image + audio + video in one model',
    color: 'border-blue-500',
    detail:
      'Frontier models now process and generate text, images, audio, and video natively — not as bolted-on modules. Gemini was trained multimodal from the start. GPT-5.5 and Claude handle images, audio, and documents in a single context.',
    examples: ['Gemini 3.1 Pro (native)', 'GPT-5.5 (omni)', 'Llama 4 (vision)'],
  },
  {
    id: 'agentic',
    icon: 'robot',
    title: 'Agentic AI',
    tagline: 'Models that use tools and take actions',
    color: 'border-green-500',
    detail:
      'LLMs are evolving from text generators to autonomous agents that browse the web, write and execute code, call APIs, and complete multi-step tasks. Computer use, MCP (Model Context Protocol), and tool-use frameworks are making this practical.',
    examples: ['Claude computer use', 'OpenAI Operator', 'Devin (code agent)', 'MCP ecosystem'],
  },
  {
    id: 'on-device',
    icon: 'mobile',
    title: 'On-Device AI',
    tagline: 'Smaller models running locally',
    color: 'border-amber-500',
    detail:
      'Quantized models (1-4B params) now run on phones and laptops. Apple Intelligence runs on-device by default. Gemma, Phi, and Llama small variants enable private, offline AI with zero API costs.',
    examples: ['Apple Intelligence (AFM)', 'Gemma 3 2B', 'Phi-4 mini', 'Llama 3.2 3B'],
  },
  {
    id: 'efficiency',
    icon: 'bolt',
    title: 'Efficiency Revolution',
    tagline: 'MoE, quantization, distillation',
    color: 'border-cyan-500',
    detail:
      'DeepSeek V3 trained a 671B model for $5.5M — 10-50× cheaper than expected. Techniques: MoE (activate only needed experts), FP8 training, Multi-head Latent Attention, aggressive quantization, and distillation from large to small models.',
    examples: ['DeepSeek V3 ($5.5M training)', 'MoE routing', 'GGUF quantization', 'Knowledge distillation'],
  },
  {
    id: 'regulation',
    icon: 'scale',
    title: 'Regulation & Safety',
    tagline: 'EU AI Act, safety requirements',
    color: 'border-red-500',
    detail:
      'The EU AI Act is now in effect, classifying AI systems by risk level. High-risk systems (hiring, credit, law enforcement) face strict requirements. Foundation model providers must document training data, energy use, and safety testing. The US and China are developing parallel frameworks.',
    examples: ['EU AI Act (2024-2026 rollout)', 'NIST AI RMF', 'China interim AI rules', 'Frontier model safety commitments'],
  },
]

const EN_INTRO = `Six trends shaping the LLM landscape in 2026 and beyond. Click any card to dive deeper.`

export const WhereItsHeadingSection: React.FC = () => {
  const { lang } = useLanguage()
  const tRENDST = tArray(lang, TRENDS, trendsTranslations)
  const c = useT({ title: '4. Where It Is Heading', intro: EN_INTRO }, { sv: whereItsHeadingSectionSv, ko: whereItsHeadingSectionKo })
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = useCallback((id: string) => {
    setExpanded(prev => (prev === id ? null : id))
  }, [])

  return (
    <section aria-labelledby="where-heading">
      <h2 id="where-heading" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tRENDST.map(t => (
          <button
            key={t.id}
            onClick={() => toggle(t.id)}
            className={`rounded-lg border-l-4 ${t.color} bg-white dark:bg-zinc-900 p-4 text-left transition-all hover:bg-zinc-100 dark:bg-zinc-800`}
            aria-expanded={expanded === t.id}
          >
            <div className="flex items-center gap-2">
              <Icon name={t.icon} className="text-lg" />
              <h3 className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{t.title}</h3>
            </div>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{t.tagline}</p>
            {expanded === t.id && (
              <div className="mt-3 border-t border-zinc-200 dark:border-zinc-700 pt-3">
                <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">{t.detail}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {t.examples.map(ex => (
                    <span key={ex} className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-700 dark:text-zinc-300">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
