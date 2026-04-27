import { translateQuestions } from '../quiz-translations'
import { useLanguage } from '../LanguageContext'
import { useDifficulty } from '../DifficultyContext'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { SelfExplain } from '../components/SelfExplain'
import { AdaptationSpectrumSection } from './solution/AdaptationSpectrumSection'
import { RAGDeepDiveSection } from './solution/RAGDeepDiveSection'
import { BuildVsBuySection } from './solution/BuildVsBuySection'
import { CostCalculatorSection } from './solution/CostCalculatorSection'
import { CaseStudiesSection } from './solution/CaseStudiesSection'
import { ApproachesBusiness } from './solution/ApproachesBusiness'
import { BuildVsBuyBusiness } from './solution/BuildVsBuyBusiness'
import { ModuleLayout } from '../components/ModuleLayout'

const questions: Question[] = [
  {
    id: 'sol-1',
    type: 'mc',
    question:
      'Your company has 50,000 internal policy documents that change monthly. Users need answers with citations. Which approach is most appropriate?',
    options: [
      'Fine-tune a model on the documents quarterly',
      'Use RAG with a vector store that re-indexes on document updates',
      'Use few-shot prompting with the most important documents',
      'Train a custom model from scratch on the documents',
    ],
    correctIndex: 1,
    explanation:
      'RAG is ideal here: documents change frequently (re-indexing is cheap), users need citations (RAG can point to source chunks), and no training data needs to be curated. Fine-tuning would go stale monthly and can\'t provide citations.',
  },
  {
    id: 'sol-2',
    type: 'free',
    question:
      'Walk through the stages of a RAG pipeline from user query to final answer. What happens at each stage and where can things go wrong?',
    modelAnswer:
      '1) Query embedding: user question is converted to a vector. Can fail if the embedding model doesn\'t capture the query\'s intent. 2) Retrieval: vector similarity search finds top-k chunks. Can fail if chunks are too large/small, or if the relevant info wasn\'t indexed. 3) Context injection: retrieved chunks are added to the prompt. Can fail if too many chunks exceed the context window or if irrelevant chunks dilute the signal. 4) Generation: LLM produces an answer grounded in the context. Can fail if the model ignores the context or hallucinates beyond it.',
    explanation:
      'Each RAG stage is a potential failure point. Understanding the pipeline helps you debug retrieval quality, chunking strategy, and generation faithfulness independently.',
  },
  {
    id: 'sol-3',
    type: 'mc',
    question:
      'When is fine-tuning clearly better than RAG?',
    options: [
      'When you need the model to cite its sources',
      'When your data changes daily and must be up-to-date',
      'When you need the model to adopt a specific tone, format, or domain vocabulary consistently',
      'When you have fewer than 100 examples',
    ],
    correctIndex: 2,
    explanation:
      'Fine-tuning bakes behavior into the model weights — ideal for consistent style, tone, or domain-specific patterns. RAG is better for dynamic knowledge and citations. Fine-tuning typically needs 1K+ examples to be effective.',
  },
  {
    id: 'sol-4',
    type: 'free',
    question:
      'A startup is choosing between a $0.01/1K token API and self-hosting an open model on a $2K/month GPU. At what usage level does self-hosting break even? What non-cost factors matter?',
    modelAnswer:
      'Break-even: $2,000 / $0.01 per 1K tokens = 200M tokens/month. Below that, the API is cheaper. Above that, self-hosting saves money. Non-cost factors: latency (self-hosted can be faster), data privacy (self-hosted keeps data on-premise), customization (self-hosted allows fine-tuning and full control), reliability (API has the provider\'s SLA; self-hosted requires your own ops), and scaling flexibility (API scales instantly; self-hosted needs capacity planning).',
    explanation:
      'Cost is only one dimension. Data privacy, latency requirements, customization needs, and operational complexity all influence the build-vs-buy decision.',
  },
]

const businessQuestions: Question[] = [
  { id: 'sol-biz-1', type: 'mc', question: 'Your company has 10,000 policy documents that change monthly. Employees need answers with sources. Which AI approach fits best?', options: ['Fine-tune a model on the documents', 'RAG — AI searches your docs before answering, so it\'s always up-to-date and can cite sources', 'Just use ChatGPT and paste documents in', 'Build a custom AI from scratch'], correctIndex: 1, explanation: 'RAG (open-book exam approach) is perfect here: documents change often (easy to re-index), employees need citations (RAG points to sources), and no expensive training is needed.' },
  { id: 'sol-biz-2', type: 'mc', question: 'Your startup needs AI working in 2 weeks, handles non-sensitive data, and has no ML team. What should you do?', options: ['Self-host an open-source model', 'Use an API service like ChatGPT Enterprise or Claude for Business', 'Build a custom model', 'Wait until you can hire an ML team'], correctIndex: 1, explanation: 'API services are the "taxi" option — fast to start, no maintenance, pay per use. With no ML team and a 2-week timeline, self-hosting or custom models aren\'t realistic.' },
]

export const SolutionModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="solution" title="From Problem to Solution" subtitle="Four ways to use AI, from simple to complex — and how to decide between renting and buying.">
        <ApproachesBusiness />
        <BuildVsBuyBusiness />
        <KnowledgeCheck moduleId="solution-business" questions={translateQuestions(businessQuestions, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="solution" title="From Problem to Solution" subtitle="Choosing the right approach: prompting, RAG, fine-tuning, build vs buy, and real-world cost analysis.">
      <AdaptationSpectrumSection />
      <RAGDeepDiveSection />
      <SelfExplain prompt="You just explored the RAG pipeline stages and compared RAG vs fine-tuning. Describe a real scenario where you'd combine both approaches, and explain what each one handles." modelAnswer="Example: a customer support bot for a SaaS product. Fine-tune the base model on thousands of past support conversations so it learns the company's tone, ticket format, and common resolution patterns. Then use RAG to retrieve the latest product documentation, release notes, and known issues — information that changes weekly. Fine-tuning handles style and domain behavior; RAG handles dynamic, up-to-date knowledge. Together they give consistent, accurate, and current responses." />
      <BuildVsBuySection />
      <CostCalculatorSection />
      <CaseStudiesSection />
      <KnowledgeCheck moduleId="solution" questions={translateQuestions(questions, lang)} />
    </ModuleLayout>
  )
}
