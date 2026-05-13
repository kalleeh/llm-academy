import { useState, useCallback } from 'react'
import { useT } from '../../i18n'
import { keyPlayersSv, keyPlayersKo } from './translations'

const PLAYERS = [
  { name: 'OpenAI', product: 'ChatGPT, GPT-4o', position: 'The one everyone knows — like the iPhone of AI. First to market, biggest brand recognition.', users: 'Millions of consumers and businesses. Microsoft is their biggest partner (Copilot runs on OpenAI).', color: 'border-emerald-500/30 bg-emerald-500/5' },
  { name: 'Google', product: 'Gemini', position: 'Built into everything Google — Search, Gmail, Docs, Android. Massive distribution advantage.', users: 'Anyone using Google products. Enterprises on Google Cloud.', color: 'border-blue-500/30 bg-blue-500/5' },
  { name: 'Anthropic', product: 'Claude', position: 'The "safety-first" company. Popular with enterprises who care about reliability and responsible AI.', users: 'Enterprises, developers, Amazon (major investor and partner via AWS).', color: 'border-purple-500/30 bg-purple-500/5' },
  { name: 'Amazon / AWS', product: 'Bedrock, Nova, AgentCore', position: 'Rather than building one model, AWS built the platform — Amazon Bedrock gives you access to 100+ models (Claude, Llama, Mistral, and Amazon\'s own Nova family) through a single API with enterprise security. AgentCore handles deploying AI agents at scale.', users: 'Enterprises already on AWS. Companies that want model choice without vendor lock-in to a single AI provider.', color: 'border-amber-500/30 bg-amber-500/5' },
  { name: 'Meta', product: 'Llama (free)', position: 'Gives away their AI for free. Strategy: build the ecosystem, like Android vs iPhone. If everyone builds on Llama, Meta wins.', users: 'Developers and companies who want to run AI on their own servers.', color: 'border-cyan-500/30 bg-cyan-500/5' },
  { name: 'Others', product: 'Mistral, DeepSeek, Cohere, etc.', position: 'Smaller players with specific strengths — some are cheaper, some are better for certain languages or tasks.', users: 'Companies looking for alternatives or specialized capabilities.', color: 'border-zinc-500/30 bg-zinc-100 dark:bg-zinc-800' },
]

export const KeyPlayersBusiness: React.FC = () => {
  const c = useT({ title: '1. Who Makes AI?', intro: 'A handful of companies dominate the AI landscape. Think of it like the smartphone market — a few big players, each with a different strategy. Click each to learn more.' , players: PLAYERS}, { sv: keyPlayersSv, ko: keyPlayersKo })
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="players-biz">
      <h2 id="players-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        {c.intro}
      </p>
      <div className="space-y-2">
        {c.players.map((p, i) => (
          <div key={p.name} className={`rounded-lg border ${(PLAYERS[i]?.color ?? "")}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div><span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{p.name}</span><span className="ml-2 text-xs text-zinc-600 dark:text-zinc-400">— {p.product}</span></div>
              <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{p.position}</p>
                <p className="text-xs text-zinc-500"><strong className="text-zinc-600 dark:text-zinc-400">Who uses them:</strong> {p.users}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
