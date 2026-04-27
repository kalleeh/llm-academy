import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import { useT } from '../../useT'
import { adaptationSpectrumSectionSv, adaptationSpectrumSectionKo } from './tech-translations'

interface Approach {
  id: string
  label: string
  color: string
  when: string
  cost: string
  effort: string
  data: string
  control: string
}

const APPROACHES: Approach[] = [
  {
    id: 'prompting',
    label: 'Prompting',
    color: 'bg-green-500',
    when: 'Quick prototyping, general tasks, when base model capability is sufficient',
    cost: '$ — Pay per API call only',
    effort: 'Hours — Write and iterate on prompts',
    data: 'None — Just examples in the prompt (few-shot)',
    control: 'Low — Constrained by model\'s existing knowledge',
  },
  {
    id: 'rag',
    label: 'RAG',
    color: 'bg-blue-500',
    when: 'Frequently changing data, need citations, domain-specific knowledge retrieval',
    cost: '$$ — API calls + vector DB + embedding costs',
    effort: 'Days–Weeks — Build retrieval pipeline, chunk documents',
    data: 'Your documents — No labeled training data needed',
    control: 'Medium — Control what knowledge is available, not how model reasons',
  },
  {
    id: 'fine-tuning',
    label: 'Fine-tuning',
    color: 'bg-amber-500',
    when: 'Specific style/format, domain expertise, consistent behavior patterns',
    cost: '$$$ — Training compute + hosting fine-tuned model',
    effort: 'Weeks — Curate dataset, train, evaluate, iterate',
    data: '1K–100K examples — High-quality labeled pairs',
    control: 'High — Model learns your specific patterns and domain',
  },
  {
    id: 'training',
    label: 'Training from Scratch',
    color: 'bg-red-500',
    when: 'Novel architecture needs, unique language/domain, full control required',
    cost: '$$$$ — Millions in compute (GPT-4 estimated $100M+)',
    effort: 'Months–Years — Team of ML engineers, massive infrastructure',
    data: 'Trillions of tokens — Web-scale data collection and curation',
    control: 'Total — You own everything from tokenizer to weights',
  },
]

interface Scenario {
  label: string
  answer: string
  position: number // 0-3 index into APPROACHES
}

const SCENARIOS: Scenario[] = [
  { label: 'Summarize meeting notes for my team', answer: 'Prompting with a good system prompt handles this well — no custom data needed.', position: 0 },
  { label: 'Answer questions about company docs', answer: 'RAG — your docs change frequently and you need citations back to source.', position: 1 },
  { label: 'Generate medical reports in specific format', answer: 'Fine-tuning — you need consistent domain terminology and strict formatting.', position: 2 },
  { label: 'Build a model for a low-resource language', answer: 'Training from scratch — existing models lack sufficient data for this language.', position: 3 },
  { label: 'Customer-facing chatbot with brand voice', answer: 'Fine-tuning — consistent tone and style requires learned behavior patterns.', position: 2 },
  { label: 'Search internal wiki for answers', answer: 'RAG — retrieves relevant wiki pages and generates answers with sources.', position: 1 },
]

const EN_P3 = `Pick a Scenario — Where Does It Land?`
const EN_P2 = `{c.p2}`
const EN_INTRO = `Not every problem needs training from scratch. Most LLM applications fall somewhere on this spectrum.`

export const AdaptationSpectrumSection: React.FC = () => {
  const c = useT({ title: '1. The Adaptation Spectrum', intro: EN_INTRO , p2: EN_P2 , p3: EN_P3 }, { sv: adaptationSpectrumSectionSv, ko: adaptationSpectrumSectionKo })
  const [selected, setSelected] = useState<string | null>(null)
  const [scenario, setScenario] = useState<number | null>(null)

  const selectApproach = useCallback((id: string) => {
    setSelected(prev => (prev === id ? null : id))
  }, [])

  const selectScenario = useCallback((i: number) => {
    setScenario(prev => (prev === i ? null : i))
  }, [])

  const activeApproach = APPROACHES.find(a => a.id === selected)

  return (
    <section aria-labelledby="adaptation-spectrum">
      <h2 id="adaptation-spectrum" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Spectrum bar */}
      <div className="mb-2 flex gap-1 rounded-lg border border-zinc-700 bg-zinc-900 p-3">
        {APPROACHES.map(a => (
          <button
            key={a.id}
            onClick={() => selectApproach(a.id)}
            className={`flex-1 rounded-md py-3 text-center text-sm font-medium transition-all ${
              selected === a.id
                ? `${a.color} text-white shadow-lg scale-105`
                : `${a.color}/20 text-zinc-300 hover:${a.color}/30`
            }`}
            aria-pressed={selected === a.id}
          >
            {a.label}
          </button>
        ))}
      </div>
      <div className="mb-6 flex justify-between px-3 text-xs text-zinc-500">
        <span>← Less effort, less control</span>
        <span>More effort, more control →</span>
      </div>

      {/* Detail card */}
      {activeApproach && (
        <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
          <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-100">{activeApproach.label}</h3>
          <dl className="grid gap-3 sm:grid-cols-2">
            {([
              ['When to use', activeApproach.when],
              ['Cost', activeApproach.cost],
              ['Effort', activeApproach.effort],
              ['Data needed', activeApproach.data],
              ['Control level', activeApproach.control],
            ] as const).map(([label, value]) => (
              <div key={label} className="rounded-md border border-zinc-800 bg-zinc-800/50 p-3">
                <dt className="text-xs font-medium text-zinc-500 uppercase">{label}</dt>
                <dd className="mt-1 text-sm text-zinc-300">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Scenario picker */}
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-300">
        <Icon name="target" /> Pick a Scenario — Where Does It Land?
      </h3>
      <div className="mb-4 flex flex-wrap gap-2">
        {SCENARIOS.map((s, i) => (
          <button
            key={i}
            onClick={() => selectScenario(i)}
            className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
              scenario === i
                ? 'border-zinc-500 bg-zinc-800 text-zinc-100'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {scenario !== null && (
        <div className="space-y-3">
          {/* Mini spectrum showing position */}
          <div className="flex gap-1 rounded-lg border border-zinc-700 bg-zinc-900 p-3">
            {APPROACHES.map((a, i) => (
              <div
                key={a.id}
                className={`flex-1 rounded-md py-2 text-center text-xs font-medium transition-all ${
                  i === SCENARIOS[scenario].position
                    ? `${a.color} text-white`
                    : 'bg-zinc-800 text-zinc-600'
                }`}
              >
                {a.label}
                {i === SCENARIOS[scenario].position && <span className="block text-[10px]">▲</span>}
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
            <p className="text-sm text-zinc-300">{SCENARIOS[scenario].answer}</p>
          </div>
        </div>
      )}
    </section>
  )
}
