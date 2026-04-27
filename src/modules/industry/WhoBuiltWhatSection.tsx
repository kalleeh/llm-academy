import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { whoBuiltWhatSectionSv, whoBuiltWhatSectionKo } from './tech-translations'
import { playersTranslations } from './data-translations'

interface Player {
  name: string
  color: string
  models: string[]
  approach: string
  openClosed: 'Open' | 'Closed' | 'Open-weight'
  innovation: string
  detail: string
}

const PLAYERS: Player[] = [
  {
    name: 'OpenAI',
    color: 'border-green-500',
    models: ['GPT-5', 'o3', 'GPT-4o'],
    approach: 'Closed-source, API-first, massive scale',
    openClosed: 'Closed',
    innovation: 'Pioneered RLHF at scale; o3 reasoning via RL-trained chain-of-thought',
    detail:
      'Valued at $100B+. Defined the modern LLM era with ChatGPT. GPT-5 pushes multimodal and agentic capabilities. o3 set new benchmarks on ARC-AGI and math reasoning.',
  },
  {
    name: 'Anthropic',
    color: 'border-amber-500',
    models: ['Claude Opus 4.6', 'Claude Sonnet 4', 'Claude Haiku 3.5'],
    approach: 'Safety-focused, Constitutional AI',
    openClosed: 'Closed',
    innovation: 'Constitutional AI — self-supervised alignment without human labels',
    detail:
      'Founded by ex-OpenAI researchers. Leads on safety research. Claude Opus 4.6 competes at the frontier while maintaining strong refusal and harmlessness properties.',
  },
  {
    name: 'Google DeepMind',
    color: 'border-blue-500',
    models: ['Gemini 3.1 Pro', 'Gemini Ultra', 'Gemma 3'],
    approach: 'Vertical integration — TPUs, data, distribution',
    openClosed: 'Closed',
    innovation: 'Custom TPU hardware; 1M+ token context windows; Gemma open models',
    detail:
      'Merged Google Brain + DeepMind. Gemini natively multimodal from training. Owns the full stack: TPU chips, training infra, Search/Android/Cloud distribution.',
  },
  {
    name: 'Meta',
    color: 'border-indigo-500',
    models: ['Llama 4 Maverick', 'Llama 4 Scout', 'Llama 3.3'],
    approach: 'Open-source leader, MoE architecture',
    openClosed: 'Open',
    innovation: 'Largest open-weight models; Llama 4 uses MoE to match closed-model quality',
    detail:
      'Llama 4 Maverick (400B total, 17B active via 128 experts) rivals GPT-4o on benchmarks. Open weights enable the entire ecosystem. Meta bets open-source wins long-term.',
  },
  {
    name: 'DeepSeek',
    color: 'border-red-500',
    models: ['DeepSeek V3', 'DeepSeek R1'],
    approach: 'Efficiency-first, open-weight',
    openClosed: 'Open',
    innovation: 'MoE + Multi-head Latent Attention + FP8 training — V3 trained for ~$5.5M',
    detail:
      'Chinese lab that shocked the industry. V3 (671B total, 37B active) trained on 14.8T tokens for a fraction of typical cost. R1 matches o1 on reasoning via pure RL — no supervised fine-tuning.',
  },
  {
    name: 'Mistral',
    color: 'border-cyan-500',
    models: ['Mistral Large 2', 'Mixtral 8x22B', 'Mistral 7B'],
    approach: 'European, open-weight, efficiency-focused',
    openClosed: 'Open-weight',
    innovation: 'Sliding Window Attention; punches above weight class on efficiency',
    detail:
      'Paris-based. Mistral 7B outperformed Llama 2 13B at launch. Mixtral popularized MoE for open models. Strong EU regulatory positioning.',
  },
  {
    name: 'Amazon / AWS',
    color: 'border-orange-500',
    models: ['Amazon Nova Pro', 'Amazon Nova Lite', 'Amazon Nova Premier'],
    approach: 'Platform + own models — Bedrock hosts 100+ models from all providers',
    openClosed: 'Closed',
    innovation: 'Bedrock model marketplace; AgentCore for enterprise agent deployment; Nova family optimized for Bedrock',
    detail:
      'AWS built the platform layer: Amazon Bedrock provides a single API to access Claude, Llama, Mistral, and Amazon\'s own Nova models. AgentCore handles agent runtime, memory, identity, and observability at scale. Nova models (Micro/Lite/Pro/Premier) are optimized for cost-performance on Bedrock, with Nova Premier supporting 1M token context and model distillation.',
  },
  {
    name: 'xAI',
    color: 'border-zinc-400',
    models: ['Grok 3', 'Grok 2'],
    approach: 'Real-time data via X/Twitter, massive compute',
    openClosed: 'Closed',
    innovation: 'Trained on 100K H100 Colossus cluster; real-time information access',
    detail:
      'Elon Musk\'s AI company. Grok 3 trained on one of the largest GPU clusters ever built. Integrates live data from X platform. Open-sourced Grok 1 weights early on.',
  },
  {
    name: 'Apple',
    color: 'border-zinc-500',
    models: ['Apple Intelligence', 'OpenELM', 'AFM'],
    approach: 'On-device, privacy-first',
    openClosed: 'Closed',
    innovation: 'On-device models running on Apple Silicon; Private Cloud Compute',
    detail:
      'Apple Foundation Models (AFM) run locally on iPhone/Mac. Private Cloud Compute extends to Apple servers with cryptographic privacy guarantees. Focus on practical, integrated AI.',
  },
]

const EN_INTRO = `The LLM landscape is dominated by a handful of well-funded labs, each with a distinct philosophy. Click any card to see details.`

export const WhoBuiltWhatSection: React.FC = () => {
  const { lang } = useLanguage()
  const pLAYERST = tArray(lang, PLAYERS, playersTranslations)
  const c = useT({ title: '1. Who Built What', intro: EN_INTRO }, { sv: whoBuiltWhatSectionSv, ko: whoBuiltWhatSectionKo })
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = useCallback((name: string) => {
    setExpanded(prev => (prev === name ? null : name))
  }, [])

  return (
    <section aria-labelledby="who-built-what">
      <h2 id="who-built-what" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pLAYERST.map(p => (
          <button
            key={p.name}
            onClick={() => toggle(p.name)}
            className={`rounded-lg border-l-4 ${p.color} bg-zinc-900 p-4 text-left transition-all hover:bg-zinc-800`}
            aria-expanded={expanded === p.name}
          >
            <h3 className="font-mono text-sm font-bold text-zinc-100">{p.name}</h3>
            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                p.openClosed === 'Open'
                  ? 'bg-green-900/50 text-green-400'
                  : p.openClosed === 'Open-weight'
                    ? 'bg-cyan-900/50 text-cyan-400'
                    : 'bg-red-900/50 text-red-400'
              }`}
            >
              {p.openClosed}
            </span>
            <p className="mt-2 text-xs text-zinc-400">{p.approach}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {p.models.map(m => (
                <span key={m} className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-300">
                  {m}
                </span>
              ))}
            </div>
            {expanded === p.name && (
              <div className="mt-3 border-t border-zinc-700 pt-3">
                <p className="text-xs leading-relaxed text-zinc-300">{p.detail}</p>
                <p className="mt-2 text-xs text-zinc-400">
                  <strong className="text-zinc-300">Key innovation:</strong> {p.innovation}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
