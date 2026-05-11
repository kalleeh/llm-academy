import { useState, useCallback } from 'react'
import { tArray, useLanguage, useT } from '../../i18n'
import { advancedPatternsSectionSv, advancedPatternsSectionKo } from './tech-translations'
import { patternsTranslations } from './data-translations'

interface Pattern {
  id: string
  label: string
  description: string
  diagram: DiagramNode[]
  example: { prompt: string; output: string }
}

interface DiagramNode {
  label: string
  x: number
  y: number
  color: string
  connections?: number[]
}

const PATTERNS: Pattern[] = [
  {
    id: 'self-consistency',
    label: 'Self-consistency',
    description: 'Generate multiple answers with temperature > 0, then pick the majority answer. Reduces variance on reasoning tasks by sampling diverse reasoning paths.',
    diagram: [
      { label: 'Prompt', x: 50, y: 10, color: 'bg-violet-500', connections: [1, 2, 3] },
      { label: 'Path A → 42', x: 15, y: 45, color: 'bg-blue-500', connections: [4] },
      { label: 'Path B → 42', x: 50, y: 45, color: 'bg-blue-500', connections: [4] },
      { label: 'Path C → 38', x: 85, y: 45, color: 'bg-blue-500', connections: [4] },
      { label: 'Majority: 42 ✓', x: 50, y: 80, color: 'bg-green-500' },
    ],
    example: {
      prompt: `# Run the same prompt 5 times with temperature=0.7
answers = []
for _ in range(5):
    resp = client.chat.completions.create(
        model="gpt-4o",
        temperature=0.7,
        messages=[{"role": "user", "content": "...math problem..."}]
    )
    answers.append(extract_answer(resp))

# Pick the most common answer
final = max(set(answers), key=answers.count)`,
      output: 'Answers: [42, 42, 38, 42, 42] → Final: 42 (4/5 agreement, high confidence)',
    },
  },
  {
    id: 'tree-of-thought',
    label: 'Tree-of-thought',
    description: 'Explore multiple reasoning paths in parallel, evaluate each, and pursue the most promising branches. Like BFS/DFS over reasoning steps.',
    diagram: [
      { label: 'Problem', x: 50, y: 8, color: 'bg-violet-500', connections: [1, 2, 3] },
      { label: 'Approach A', x: 15, y: 35, color: 'bg-blue-500', connections: [4] },
      { label: 'Approach B', x: 50, y: 35, color: 'bg-blue-500', connections: [5, 6] },
      { label: 'Approach C', x: 85, y: 35, color: 'bg-zinc-600' },
      { label: 'Dead end ✗', x: 15, y: 65, color: 'bg-red-500/60' },
      { label: 'Step B.1', x: 38, y: 65, color: 'bg-blue-500', connections: [7] },
      { label: 'Step B.2', x: 62, y: 65, color: 'bg-zinc-600' },
      { label: 'Solution ✓', x: 38, y: 90, color: 'bg-green-500' },
    ],
    example: {
      prompt: `Solve this step by step. At each step, propose 2-3 approaches,
evaluate which is most promising, then continue with the best one.

Problem: Design a caching strategy for an API with 10M daily requests,
where data freshness matters for 20% of endpoints.`,
      output: `Approach A: Global TTL cache → Simple but stale data for critical endpoints ✗
Approach B: Tiered caching → Different TTLs per endpoint category ✓
Approach C: No cache, optimize DB → Won't scale to 10M ✗

Pursuing B: Tiered caching...
  B.1: Hot endpoints (80%) → 5min TTL, Redis
  B.2: Fresh endpoints (20%) → 10s TTL + cache invalidation on write
  → Final: Two-tier Redis with write-through invalidation for critical paths`,
    },
  },
  {
    id: 'meta-prompting',
    label: 'Meta-prompting',
    description: 'Use a prompt to generate better prompts. The model optimizes its own instructions. Useful for prompt engineering at scale.',
    diagram: [
      { label: 'Your task', x: 50, y: 10, color: 'bg-violet-500', connections: [1] },
      { label: 'Meta-prompt', x: 50, y: 40, color: 'bg-amber-500', connections: [2] },
      { label: 'Optimized prompt', x: 50, y: 70, color: 'bg-green-500' },
    ],
    example: {
      prompt: `You are a prompt engineering expert. Given this task description,
write an optimal system prompt that will produce the best results.

Task: "I need an LLM to review code for security vulnerabilities
and output structured findings."

Write the system prompt with: role, specific instructions, output format,
and edge cases to handle.`,
      output: `Generated system prompt:
"You are a senior application security engineer performing code review.
For each code snippet, identify vulnerabilities using the OWASP Top 10
framework. Output JSON array: [{"severity": "critical|high|medium|low",
"vulnerability": "CWE-XXX: Name", "line": N, "fix": "..."}].
If no vulnerabilities found, return []. Never suggest fixes that
introduce new vulnerabilities."`,
    },
  },
  {
    id: 'prompt-chaining',
    label: 'Prompt chaining',
    description: 'Break complex tasks into a pipeline of simpler prompts, where each step\'s output feeds into the next. More reliable than one mega-prompt.',
    diagram: [
      { label: 'Input', x: 10, y: 50, color: 'bg-violet-500', connections: [1] },
      { label: 'Step 1: Extract', x: 30, y: 50, color: 'bg-blue-500', connections: [2] },
      { label: 'Step 2: Analyze', x: 55, y: 50, color: 'bg-blue-500', connections: [3] },
      { label: 'Step 3: Format', x: 80, y: 50, color: 'bg-blue-500', connections: [4] },
      { label: 'Output', x: 95, y: 50, color: 'bg-green-500' },
    ],
    example: {
      prompt: `# Chain: Research paper → Summary → Key findings → Action items

# Step 1: Extract key claims
claims = llm("Extract the 5 key claims from this paper: {paper}")

# Step 2: Evaluate each claim
evaluated = llm("Rate each claim's evidence strength: {claims}")

# Step 3: Generate action items
actions = llm("Based on these evaluated claims, what should our team do? {evaluated}")`,
      output: `Step 1 → 5 claims extracted
Step 2 → Claims rated: 2 strong, 2 moderate, 1 weak evidence
Step 3 → "Prioritize implementing claims 1 & 3 (strong evidence).
          Run experiments to validate claim 4. Deprioritize claim 5."`,
    },
  },
]

const EN_P2 = `Modern models (GPT-5.5, Claude Opus 4.7, Gemini 3.1 Pro) are good enough that simple, clear prompts often beat complex techniques. Use these patterns when simple prompts fail — not as a default.`
const EN_INTRO = `Sophisticated techniques for complex tasks. Each pattern includes a visual diagram and a practical example.`

export const AdvancedPatternsSection: React.FC = () => {
  const { lang } = useLanguage()
  const pATTERNST = tArray(lang, PATTERNS, patternsTranslations)
  const c = useT({ title: '5. Advanced Patterns', intro: EN_INTRO , p2: EN_P2 }, { sv: advancedPatternsSectionSv, ko: advancedPatternsSectionKo })
  const [activePattern, setActivePattern] = useState(PATTERNS[0].id)

  const handlePatternClick = useCallback((id: string) => {
    setActivePattern(id)
  }, [])

  const pattern = PATTERNS.find(p => p.id === activePattern) ?? PATTERNS[0]

  return (
    <section aria-labelledby="advanced-patterns">
      <h2 id="advanced-patterns" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Pattern note */}
      <div className="mb-6 rounded-md border border-amber-500/30 bg-amber-500/10 px-4 py-3">
        <p className="text-sm text-amber-200">
          <strong>2026 reality check:</strong> {c.p2}
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-1" role="tablist" aria-label="Advanced patterns">
        {pATTERNST.map(p => (
          <button
            key={p.id}
            role="tab"
            aria-selected={p.id === activePattern}
            onClick={() => handlePatternClick(p.id)}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              p.id === activePattern
                ? 'bg-zinc-700 text-zinc-100'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-700 bg-zinc-900" role="tabpanel">
        <div className="border-b border-zinc-700 bg-zinc-800 px-5 py-3">
          <h3 className="font-mono text-sm font-semibold text-zinc-100">{pattern.label}</h3>
          <p className="mt-1 text-sm text-zinc-400">{pattern.description}</p>
        </div>

        <div className="space-y-4 p-5">
          {/* Diagram */}
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-500">Visual Flow</p>
            <div className="relative h-40 rounded-md border border-zinc-700 bg-zinc-950">
              <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                {pattern.diagram.map((node, i) =>
                  (node.connections ?? []).map(target => {
                    const to = pattern.diagram[target]
                    return (
                      <line
                        key={`${i}-${target}`}
                        x1={`${node.x}%`}
                        y1={`${node.y + 4}%`}
                        x2={`${to.x}%`}
                        y2={`${to.y - 4}%`}
                        stroke="#52525b"
                        strokeWidth="1.5"
                      />
                    )
                  }),
                )}
              </svg>
              {pattern.diagram.map((node, i) => (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <span className={`inline-block rounded-md ${node.color} px-2 py-1 text-xs font-medium text-white whitespace-nowrap`}>
                    {node.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Example */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-1 text-xs text-zinc-500">Implementation</p>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-green-300">
                {pattern.example.prompt}
              </pre>
            </div>
            <div>
              <p className="mb-1 text-xs text-zinc-500">Result</p>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-amber-300">
                {pattern.example.output}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
