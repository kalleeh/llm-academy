import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { tArray, useLanguage, useT } from '../../i18n'
import { caseStudiesSectionSv, caseStudiesSectionKo } from './tech-translations'
import { caseStudiesTranslations } from './data-translations'

interface DecisionStep {
  question: string
  answer: string
}

interface CaseStudy {
  id: string
  icon: IconName
  title: string
  problem: string
  solution: string
  approach: string
  steps: DecisionStep[]
  stack: string[]
  result: string
}

const CASES: CaseStudy[] = [
  {
    id: 'support',
    icon: 'headphones',
    title: '5. Case Studies',
    problem: 'E-commerce company gets 10K support tickets/day. 60% are repetitive (order status, refund policy, shipping). Need 24/7 coverage with accurate, on-brand responses.',
    solution: 'RAG + fine-tuned small model',
    approach: 'RAG retrieves from knowledge base (policies, FAQs). Fine-tuned 8B model ensures consistent brand voice and handles edge cases.',
    steps: [
      { question: 'Does data change frequently?', answer: 'Yes — policies, products, and FAQs update weekly → RAG for knowledge retrieval' },
      { question: 'Need specific output style?', answer: 'Yes — brand voice, empathetic tone → Fine-tune a small model for style' },
      { question: 'Volume and latency?', answer: '10K/day, <2s response → Small model (8B) for speed, self-hosted for cost' },
      { question: 'Privacy concerns?', answer: 'Customer data involved → Self-hosted to keep data internal' },
    ],
    stack: ['Llama 3 8B (fine-tuned)', 'ChromaDB vector store', 'FastAPI serving layer', 'Self-hosted on 2x A10G'],
    result: '70% ticket deflection, $0.002/query, 800ms avg latency',
  },
  {
    id: 'code',
    icon: 'laptop',
    title: 'Code Assistant',
    problem: 'Dev tools startup needs an AI code assistant that understands their proprietary framework. Must handle code generation, debugging, and documentation across 5 languages.',
    solution: 'Large model API + custom prompts',
    approach: 'Frontier API model (GPT-4o/Claude) for maximum code quality. Extensive system prompts with framework docs. RAG for proprietary API reference.',
    steps: [
      { question: 'Task complexity?', answer: 'Very high — multi-file reasoning, debugging → Need frontier model capability' },
      { question: 'Proprietary knowledge?', answer: 'Yes — custom framework docs → RAG for API reference, system prompt for patterns' },
      { question: 'Training data available?', answer: 'Limited — small framework, few examples → Not enough to fine-tune effectively' },
      { question: 'Budget vs quality?', answer: 'Quality is critical for developer trust → API cost justified by capability gap' },
    ],
    stack: ['Claude Sonnet API', 'Pinecone for framework docs', 'Detailed system prompts', 'Streaming via SSE'],
    result: '40% faster development, $3K/mo API cost for 500 developers',
  },
  {
    id: 'medical',
    icon: 'medical',
    title: 'Medical Document Analysis',
    problem: 'Hospital network needs to extract structured data from clinical notes, pathology reports, and discharge summaries. Must handle medical terminology and comply with HIPAA.',
    solution: 'Fine-tuned domain model',
    approach: 'Fine-tune a medical-domain model on annotated clinical documents. Self-host for HIPAA compliance. No external API calls.',
    steps: [
      { question: 'Domain specificity?', answer: 'Extremely high — medical terminology, abbreviations → Fine-tuning essential' },
      { question: 'Regulatory requirements?', answer: 'HIPAA — no data can leave premises → Must self-host, no external APIs' },
      { question: 'Output format?', answer: 'Structured extraction (ICD codes, medications) → Fine-tune for consistent schema' },
      { question: 'Data availability?', answer: '50K annotated clinical notes available → Sufficient for effective fine-tuning' },
    ],
    stack: ['Llama 3 70B (fine-tuned on clinical data)', 'On-premise A100 cluster', 'Custom NER pipeline', 'HL7 FHIR output format'],
    result: '94% extraction accuracy, HIPAA compliant, 3s per document',
  },
  {
    id: 'knowledge',
    icon: 'books',
    title: 'Internal Knowledge Base',
    problem: 'Enterprise with 50K employees can\'t find information across Confluence, SharePoint, Slack, and internal wikis. Employees waste 2hrs/day searching for answers.',
    solution: 'RAG with vector store',
    approach: 'Index all internal documents into a vector store. RAG pipeline retrieves relevant chunks and generates answers with source links. No fine-tuning needed.',
    steps: [
      { question: 'Data volume and freshness?', answer: '100K+ documents, updated daily → RAG with incremental indexing' },
      { question: 'Need citations?', answer: 'Critical — employees must verify answers → RAG provides source links' },
      { question: 'Customization needed?', answer: 'Minimal — general Q&A format → Prompting sufficient, no fine-tuning' },
      { question: 'Scale?', answer: '50K users, ~5K queries/day → API model for simplicity, manageable cost' },
    ],
    stack: ['GPT-4o Mini API', 'Weaviate vector store', 'Document connectors (Confluence, SharePoint)', 'Slack bot interface'],
    result: '85% answer accuracy, saves 45min/employee/day, $1.2K/mo',
  },
]

const EN_INTRO = `Walk through real-world decision processes. Each case shows how constraints lead to different solutions.`

export const CaseStudiesSection: React.FC = () => {
  const { lang } = useLanguage()
  const cASEST = tArray(lang, CASES, caseStudiesTranslations)
  const c = useT({ title: '5. Case Studies', intro: EN_INTRO }, { sv: caseStudiesSectionSv, ko: caseStudiesSectionKo })
  const [activeCase, setActiveCase] = useState(0)
  const [revealedSteps, setRevealedSteps] = useState(0)

  const selectCase = useCallback((i: number) => {
    setActiveCase(i)
    setRevealedSteps(0)
  }, [])

  const revealNext = useCallback(() => {
    setRevealedSteps(prev => prev + 1)
  }, [])

  const study = CASES[activeCase]
  const allRevealed = revealedSteps >= study.steps.length

  return (
    <section aria-labelledby="case-studies">
      <h2 id="case-studies" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Case selector */}
      <div className="mb-6 grid gap-2 sm:grid-cols-4">
        {cASEST.map((c, i) => (
          <button
            key={c.id}
            onClick={() => selectCase(i)}
            className={`rounded-lg border p-3 text-left transition-colors ${
              activeCase === i
                ? 'border-zinc-500 bg-zinc-800 text-zinc-100'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            <span className="text-lg"><Icon name={c.icon} /></span>
            <p className="mt-1 text-sm font-medium">{c.title}</p>
          </button>
        ))}
      </div>

      {/* Case detail */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-900">
        {/* Header */}
        <div className="border-b border-zinc-700 bg-zinc-800 px-5 py-4">
          <h3 className="font-mono text-sm font-semibold text-zinc-100">
            <Icon name={study.icon} /> {study.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-400">{study.problem}</p>
        </div>

        <div className="p-5 space-y-4">
          {/* Decision steps */}
          <div>
            <p className="mb-3 text-xs font-medium text-zinc-500 uppercase">Decision Process</p>
            <div className="space-y-2">
              {study.steps.map((step, i) => (
                <div
                  key={i}
                  className={`rounded-md border p-3 transition-all ${
                    i < revealedSteps
                      ? 'border-zinc-600 bg-zinc-800/50'
                      : 'border-zinc-800 bg-zinc-900'
                  }`}
                >
                  <p className="text-sm font-medium text-zinc-300">
                    {i + 1}. {step.question}
                  </p>
                  {i < revealedSteps && (
                    <p className="mt-1 text-sm text-zinc-400">→ {step.answer}</p>
                  )}
                </div>
              ))}
            </div>
            {!allRevealed && (
              <button
                onClick={revealNext}
                className="mt-3 rounded-md bg-zinc-700 px-4 py-1.5 text-xs text-zinc-200 transition-colors hover:bg-zinc-600"
              >
                Reveal Next Step →
              </button>
            )}
          </div>

          {/* Solution (shown after all steps revealed) */}
          {allRevealed && (
            <div className="space-y-4 border-t border-zinc-700 pt-4">
              <div>
                <p className="mb-1 text-xs font-medium text-zinc-500 uppercase">Solution</p>
                <p className="text-sm font-medium text-green-400">{study.solution}</p>
                <p className="mt-1 text-sm text-zinc-400">{study.approach}</p>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-zinc-500 uppercase">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {study.stack.map(item => (
                    <span
                      key={item}
                      className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-md border border-green-500/20 bg-green-500/5 p-3">
                <p className="text-xs font-medium text-green-400 uppercase">Result</p>
                <p className="mt-1 text-sm text-zinc-300">{study.result}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
