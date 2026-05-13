import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { tArray, useLanguage, useT } from '../../i18n'
import { designPatternsSectionSv, designPatternsSectionKo } from './tech-translations'
import { patternsTranslations } from './data-translations'

interface Pattern {
  name: string
  icon: IconName
  description: string
  diagram: string[]
  useCase: string
  example: string
}

const PATTERNS: Pattern[] = [
  {
    name: 'ReAct',
    icon: 'cycle',
    description:
      'The most common pattern. The agent alternates between thinking (reasoning about what to do), acting (calling a tool), and observing (reading the result). Repeats until the task is done.',
    diagram: ['Thought', '→', 'Action', '→', 'Observation', '→', '(repeat)'],
    useCase: 'General-purpose agents, Q&A with tool use, data retrieval tasks.',
    example: '"What are the top 3 restaurants near me?" → thinks → calls search API → reads results → thinks → responds',
  },
  {
    name: 'Reflection',
    icon: 'mirror',
    description:
      'The agent generates an output, then reviews its own work and improves it. A second LLM call (or the same model with a critic prompt) evaluates quality and suggests fixes.',
    diagram: ['Generate', '→', 'Critique', '→', 'Revise', '→', 'Output'],
    useCase: 'Code generation, writing tasks, any output that benefits from self-review.',
    example: 'Write code → review for bugs → fix issues → verify tests pass → return final version',
  },
  {
    name: 'Planning',
    icon: 'clipboard',
    description:
      'Before executing anything, the agent creates a step-by-step plan. Then it follows the plan, potentially re-planning if something unexpected happens.',
    diagram: ['Analyze task', '→', 'Create plan', '→', 'Execute steps', '→', 'Adapt if needed'],
    useCase: 'Complex multi-step tasks, research, project management.',
    example: '"Build me a dashboard" → plan: 1) gather requirements 2) design schema 3) create components 4) test',
  },
  {
    name: 'Multi-Agent',
    icon: 'people',
    description:
      'Multiple specialized agents collaborate. Each agent has a specific role (researcher, coder, reviewer) and they pass work between each other.',
    diagram: ['Orchestrator', '→', 'Agent A', '⇄', 'Agent B', '⇄', 'Agent C'],
    useCase: 'Complex workflows, software development, research pipelines.',
    example: 'Researcher finds info → Writer drafts content → Editor reviews → Publisher formats',
  },
  {
    name: 'Human-in-the-Loop',
    icon: 'shield',
    description:
      'The agent pauses before risky actions and asks for human approval. Essential for production systems where mistakes have real consequences.',
    diagram: ['Agent plans', '→', 'Risk check', '→', '⏸ Human approval', '→', 'Execute'],
    useCase: 'Financial transactions, infrastructure changes, data deletion, production deployments.',
    example: '"Delete all inactive users" → agent pauses → shows list of 847 users → waits for confirmation',
  },
]

const EN_INTRO = `Not all agents work the same way. These are the core architectural patterns — each suited to different types of tasks.`

export const DesignPatternsSection: React.FC = () => {
  const { lang } = useLanguage()
  const pATTERNST = tArray(lang, PATTERNS, patternsTranslations)
  const c = useT({ title: '4. Agent Design Patterns', intro: EN_INTRO }, { sv: designPatternsSectionSv, ko: designPatternsSectionKo })
  const [activePattern, setActivePattern] = useState(0)

  const handlePatternClick = useCallback((index: number) => {
    setActivePattern(index)
  }, [])

  const pattern = PATTERNS[activePattern]

  return (
    <section aria-labelledby="design-patterns">
      <h2 id="design-patterns" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        {/* Pattern selector */}
        <div className="flex flex-col gap-1.5" role="tablist" aria-label="Agent design patterns">
          {pATTERNST.map((p, i) => (
            <button
              key={p.name}
              role="tab"
              aria-selected={i === activePattern}
              onClick={() => handlePatternClick(i)}
              className={`flex items-center gap-2.5 rounded-md px-3 py-3 text-left text-sm transition-colors ${
                i === activePattern
                  ? 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/40'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:bg-zinc-800 hover:text-zinc-800 dark:text-zinc-200'
              }`}
            >
              <span className="text-lg"><Icon name={p.icon} /></span>
              {p.name}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900" role="tabpanel">
          <div className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-5 py-3">
            <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <Icon name={pattern.icon} /> {pattern.name}
            </h3>
          </div>
          <div className="space-y-4 p-5">
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{pattern.description}</p>

            {/* Diagram */}
            <div className="rounded-md bg-zinc-50 dark:bg-zinc-950 p-4">
              <p className="mb-2 text-xs font-medium text-zinc-500">Flow</p>
              <div className="flex flex-wrap items-center gap-2">
                {pattern.diagram.map((step, i) =>
                  step === '→' || step === '⇄' ? (
                    <span key={i} className="text-zinc-600">{step}</span>
                  ) : (
                    <span key={i} className="rounded border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 font-mono text-xs text-violet-300">
                      {step}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-md bg-zinc-100 dark:bg-zinc-800 p-3">
              <p className="text-xs font-medium text-zinc-500">Best for</p>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{pattern.useCase}</p>
            </div>

            <div className="rounded-md bg-zinc-100 dark:bg-zinc-800 p-3">
              <p className="text-xs font-medium text-zinc-500">Example</p>
              <p className="mt-1 font-mono text-xs leading-relaxed text-green-300">{pattern.example}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
