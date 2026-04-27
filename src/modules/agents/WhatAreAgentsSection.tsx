import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../useT'
import { whatAreAgentsSectionSv, whatAreAgentsSectionKo } from './tech-translations'

const TRACE_STEPS = [
  {
    type: 'user',
    label: 'User',
    content: "What's the weather in Tokyo and should I bring an umbrella?",
  },
  {
    type: 'thought',
    label: 'Thought',
    content:
      'I need to check the current weather in Tokyo. I have a weather API tool available. Let me call it first, then reason about whether an umbrella is needed.',
  },
  {
    type: 'action',
    label: 'Action',
    content: 'get_weather(location="Tokyo, Japan")',
  },
  {
    type: 'observation',
    label: 'Observation',
    content:
      '{"location": "Tokyo", "temp_c": 18, "condition": "Light rain", "humidity": 82, "wind_kph": 12, "forecast": "Rain continuing through evening"}',
  },
  {
    type: 'thought',
    label: 'Thought',
    content:
      "The weather API says it's currently light rain in Tokyo with 82% humidity, and rain is forecast to continue. I can now answer the user's question with a clear recommendation.",
  },
  {
    type: 'response',
    label: 'Response',
    content:
      "It's currently 18°C in Tokyo with light rain and 82% humidity. Rain is expected to continue through the evening. Yes — definitely bring an umbrella!",
  },
]

const STEP_STYLES: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  user: { border: 'border-blue-500/40', bg: 'bg-blue-500/10', text: 'text-blue-300', badge: 'bg-blue-500/20' },
  thought: { border: 'border-purple-500/40', bg: 'bg-purple-500/10', text: 'text-purple-300', badge: 'bg-purple-500/20' },
  action: { border: 'border-amber-500/40', bg: 'bg-amber-500/10', text: 'text-amber-300', badge: 'bg-amber-500/20' },
  observation: { border: 'border-green-500/40', bg: 'bg-green-500/10', text: 'text-green-300', badge: 'bg-green-500/20' },
  response: { border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', text: 'text-cyan-300', badge: 'bg-cyan-500/20' },
}

const EN_P4 = `A regular LLM generates text. An`
const EN_P3 = `A regular LLM generates text. An`
const EN_P2 = `{c.p2}`
export const WhatAreAgentsSection: React.FC = () => {
  const c = useT({ title: '1. What Are AI Agents?' , p2: EN_P2 , p3: EN_P3 , p4: EN_P4 }, { sv: whatAreAgentsSectionSv, ko: whatAreAgentsSectionKo })
  const [visibleSteps, setVisibleSteps] = useState(1)

  const showNext = useCallback(() => {
    setVisibleSteps(prev => Math.min(prev + 1, TRACE_STEPS.length))
  }, [])

  const reset = useCallback(() => {
    setVisibleSteps(1)
  }, [])

  return (
    <section aria-labelledby="what-are-agents">
      <h2 id="what-are-agents" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.p4}<strong className="text-zinc-100">agent</strong> is an LLM
        that can <em>take actions</em> — call APIs, query databases, run code — then use the results
        to keep reasoning. It closes the loop between thinking and doing.
      </p>

      {/* Agent flow diagram */}
      <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-900 p-6">
        <p className="mb-3 text-xs font-medium text-zinc-500">The Agent Loop</p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          {[
            { label: 'User', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
            { label: '→' },
            { label: 'LLM thinks', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
            { label: '→' },
            { label: 'Tool call', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
            { label: '→' },
            { label: 'Observation', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
            { label: '→' },
            { label: 'LLM thinks again', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
            { label: '→' },
            { label: 'Response', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
          ].map((item, i) =>
            item.color ? (
              <span key={i} className={`rounded-md border px-3 py-1.5 font-mono text-xs ${item.color}`}>
                {item.label}
              </span>
            ) : (
              <span key={i} className="text-zinc-600">{item.label}</span>
            ),
          )}
        </div>
        <p className="mt-4 text-center text-xs text-zinc-500">
          The <strong className="text-zinc-400">ReAct</strong> loop: Thought → Action → Observation — repeat until the task is done.
        </p>
      </div>

      {/* Interactive agent trace */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-5 py-3">
          <h3 className="font-mono text-sm font-semibold text-zinc-100">
            Agent Trace: Weather Query
          </h3>
          <span className="rounded-full bg-zinc-700 px-2.5 py-0.5 text-xs text-zinc-300">
            Step {visibleSteps} of {TRACE_STEPS.length}
          </span>
        </div>

        <div className="space-y-3 p-5">
          {TRACE_STEPS.slice(0, visibleSteps).map((step, i) => {
            const style = STEP_STYLES[step.type]
            return (
              <div key={i} className={`rounded-md border ${style.border} ${style.bg} p-3`}>
                <span className={`mb-1 inline-block rounded px-2 py-0.5 text-xs font-bold ${style.badge} ${style.text}`}>
                  {step.label}
                </span>
                <pre className={`mt-1 whitespace-pre-wrap font-mono text-xs leading-relaxed ${style.text}`}>
                  {step.content}
                </pre>
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-3 border-t border-zinc-700 bg-zinc-800 px-5 py-3">
          {visibleSteps < TRACE_STEPS.length ? (
            <button
              onClick={showNext}
              className="rounded bg-zinc-600 px-4 py-1.5 text-xs text-zinc-100 transition-colors hover:bg-zinc-500"
            >
              Next step →
            </button>
          ) : (
            <button
              onClick={reset}
              className="rounded bg-zinc-600 px-4 py-1.5 text-xs text-zinc-100 transition-colors hover:bg-zinc-500"
            >
              ↺ Replay
            </button>
          )}
        </div>
      </div>

      <SelfExplain
        prompt="You just stepped through an agent trace where the LLM called a weather API. Now imagine the API returned an error (e.g., 'city not found'). Walk through what a well-designed agent should do in its next Thought → Action → Observation cycle to recover from this failure."
        modelAnswer="A well-designed agent would: Thought — 'The weather API returned an error saying the city was not found. The user might have misspelled the city name, or I need to try a different format. Let me search for the correct city name first.' Action — Call a geocoding or search API with the user's input to find the closest matching city name. Observation — The search returns 'Did you mean: San Francisco, CA?' Thought — 'Found a match. Let me retry the weather API with the corrected city name.' Action — Call the weather API with 'San Francisco, CA.' The key insight is that the agent doesn't just retry the same failing call — it reasons about WHY it failed and takes a different action to recover."
      />
    </section>
  )
}
