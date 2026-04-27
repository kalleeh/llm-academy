import { useT } from '../../useT'
import { toolboxSectionSv, toolboxSectionKo } from './tech-translations'

interface ToolCategory {
  level: string
  color: string
  tools: string[]
}

const TOOLBOX: ToolCategory[] = [
  {
    level: 'Rule-based',
    color: 'border-zinc-500/30 bg-zinc-500/5',
    tools: ['if/else logic', 'regex', 'decision tables', 'state machines'],
  },
  {
    level: 'Classical ML',
    color: 'border-emerald-500/30 bg-emerald-500/5',
    tools: ['scikit-learn', 'XGBoost', 'LightGBM', 'statsmodels'],
  },
  {
    level: 'Deep Learning',
    color: 'border-purple-500/30 bg-purple-500/5',
    tools: ['PyTorch', 'TensorFlow', 'JAX', 'Keras'],
  },
  {
    level: 'LLMs',
    color: 'border-amber-500/30 bg-amber-500/5',
    tools: ['Hugging Face', 'OpenAI API', 'Ollama', 'vLLM'],
  },
  {
    level: 'Agentic AI',
    color: 'border-cyan-500/30 bg-cyan-500/5',
    tools: ['LangChain', 'CrewAI', 'AutoGen', 'LlamaIndex'],
  },
]

const EN_INTRO = `Each level of the AI landscape has its own ecosystem of tools and frameworks.`

export const ToolboxSection: React.FC = () => {
  const c = useT({ title: '5. The AI/ML/LLM Toolbox', intro: EN_INTRO }, { sv: toolboxSectionSv, ko: toolboxSectionKo })
  return (
  <section aria-labelledby="toolbox">
    <h2 id="toolbox" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {TOOLBOX.map(cat => (
        <div key={cat.level} className={`rounded-lg border p-4 ${cat.color}`}>
          <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-200">{cat.level}</h3>
          <div className="flex flex-wrap gap-1.5">
            {cat.tools.map(tool => (
              <span
                key={tool}
                className="rounded border border-zinc-700 bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="mt-6 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3">
      <p className="text-sm text-zinc-400">
        <span className="font-semibold text-zinc-300">Up next: </span>
        The rest of this course dives deep into the LLM track — how they work under the hood,
        how to use them effectively, and how to build real applications with them.
      </p>
    </div>
  </section>
  )
}