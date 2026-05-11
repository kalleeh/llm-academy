import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import { tArray, useLanguage, useT } from '../../i18n'
import { coreTechniquesSectionSv, coreTechniquesSectionKo } from './tech-translations'
import { techniquesTranslations } from './data-translations'

interface Technique {
  id: string
  label: string
  description: string
  when: string
  before: { prompt: string; output: string }
  after: { prompt: string; output: string }
}

const TECHNIQUES: Technique[] = [
  {
    id: 'zero-shot',
    label: 'Zero-shot',
    description: 'Ask the model directly with no examples. Relies entirely on the model\'s pre-training.',
    when: 'Simple, well-defined tasks where the model already knows the format (translation, summarization, basic classification).',
    before: {
      prompt: 'Translate to French: "The weather is nice today"',
      output: '"Le temps est beau aujourd\'hui"',
    },
    after: {
      prompt: 'What is the capital of Australia?',
      output: 'The capital of Australia is Canberra.',
    },
  },
  {
    id: 'few-shot',
    label: 'Few-shot',
    description: 'Provide 2-5 examples of input→output pairs before your actual query. The model learns the pattern in-context.',
    when: 'Custom formats, domain-specific labels, or when zero-shot gives inconsistent output.',
    before: {
      prompt: 'Classify this ticket: "My login doesn\'t work"',
      output: 'This appears to be a technical issue related to authentication.',
    },
    after: {
      prompt: `Classify the support ticket into a category.

"I can't access my account" → Authentication
"Where is my refund?" → Billing
"The app crashes on startup" → Bug

"My login doesn't work" →`,
      output: 'Authentication',
    },
  },
  {
    id: 'cot',
    label: 'Chain-of-thought',
    description: 'Add "Think step by step" or show reasoning examples. Forces the model to work through the problem before answering.',
    when: 'Math, logic, multi-step reasoning, or any task where the model tends to jump to wrong conclusions.',
    before: {
      prompt: 'If a shirt costs $25 and is 20% off, and tax is 8%, what do I pay?',
      output: '$21.60',
    },
    after: {
      prompt: `If a shirt costs $25 and is 20% off, and tax is 8%, what do I pay? Think step by step.`,
      output: `Step 1: Original price = $25.00
Step 2: Discount = 20% of $25 = $5.00
Step 3: Price after discount = $25 - $5 = $20.00
Step 4: Tax = 8% of $20 = $1.60
Step 5: Total = $20.00 + $1.60 = $21.60

You pay $21.60.`,
    },
  },
  {
    id: 'role',
    label: 'Role assignment',
    description: 'Tell the model who it is: "You are an expert..." This activates relevant knowledge and sets the tone.',
    when: 'Domain-specific tasks, when you need expert-level depth, or to control the response style.',
    before: {
      prompt: 'What should I do about my knee pain?',
      output: 'You should rest and maybe see a doctor.',
    },
    after: {
      prompt: `You are a sports medicine physician with 20 years of experience. A patient asks:

"What should I do about my knee pain after running?"`,
      output: `Based on your description, this could be runner's knee (patellofemoral pain syndrome). I'd recommend:

1. RICE protocol for the first 48 hours
2. Assess your running form — overstriding is a common cause
3. Strengthen your quadriceps and hip abductors
4. Consider a gait analysis if pain persists beyond 2 weeks

If you experience locking, giving way, or significant swelling, we should rule out meniscal injury with an MRI.`,
    },
  },
  {
    id: 'format',
    label: 'Output formatting',
    description: 'Specify the exact output structure: JSON, markdown table, numbered list, or a custom schema.',
    when: 'Building applications that parse model output, APIs, data pipelines, or any structured data extraction.',
    before: {
      prompt: 'Extract the key info from: "John Smith, 35, lives in NYC, works at Google as a senior engineer"',
      output: 'The person is John Smith, age 35, living in New York City, employed at Google as a senior engineer.',
    },
    after: {
      prompt: `Extract info as JSON with fields: name, age, city, company, title.

"John Smith, 35, lives in NYC, works at Google as a senior engineer"`,
      output: `{
  "name": "John Smith",
  "age": 35,
  "city": "NYC",
  "company": "Google",
  "title": "Senior Engineer"
}`,
    },
  },
]

const EN_INTRO = `Five fundamental prompting techniques. Each tab shows a before/after comparison.`

export const CoreTechniquesSection: React.FC = () => {
  const { lang } = useLanguage()
  const tECHNIQUEST = tArray(lang, TECHNIQUES, techniquesTranslations)
  const c = useT({ title: '2. Core Techniques', intro: EN_INTRO }, { sv: coreTechniquesSectionSv, ko: coreTechniquesSectionKo })
  const [activeTab, setActiveTab] = useState(TECHNIQUES[0].id)

  const handleTabClick = useCallback((id: string) => {
    setActiveTab(id)
  }, [])

  const technique = TECHNIQUES.find(t => t.id === activeTab) ?? TECHNIQUES[0]

  return (
    <section aria-labelledby="core-techniques">
      <h2 id="core-techniques" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-1" role="tablist" aria-label="Prompting techniques">
        {tECHNIQUEST.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === activeTab}
            onClick={() => handleTabClick(t.id)}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              t.id === activeTab
                ? 'bg-zinc-700 text-zinc-100'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-900" role="tabpanel">
        <div className="border-b border-zinc-700 bg-zinc-800 px-5 py-3">
          <h3 className="font-mono text-sm font-semibold text-zinc-100">{technique.label}</h3>
          <p className="mt-1 text-sm text-zinc-400">{technique.description}</p>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2">
          {/* Before */}
          <div>
            <p className="mb-2 text-xs font-medium text-red-400"><Icon name="cross" className="text-red-400" /> Without technique</p>
            <div className="space-y-2">
              <div>
                <p className="mb-1 text-xs text-zinc-500">Prompt</p>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-zinc-300">
                  {technique.before.prompt}
                </pre>
              </div>
              <div>
                <p className="mb-1 text-xs text-zinc-500">Output</p>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-zinc-400">
                  {technique.before.output}
                </pre>
              </div>
            </div>
          </div>

          {/* After */}
          <div>
            <p className="mb-2 text-xs font-medium text-green-400">✓ With technique</p>
            <div className="space-y-2">
              <div>
                <p className="mb-1 text-xs text-zinc-500">Prompt</p>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-green-300">
                  {technique.after.prompt}
                </pre>
              </div>
              <div>
                <p className="mb-1 text-xs text-zinc-500">Output</p>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-amber-300">
                  {technique.after.output}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-700 bg-zinc-800 px-5 py-3">
          <p className="text-xs text-zinc-300">
            <strong className="text-zinc-100">Best for:</strong> {technique.when}
          </p>
        </div>
      </div>
    </section>
  )
}
