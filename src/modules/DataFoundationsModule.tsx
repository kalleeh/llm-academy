import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { DataTypesSection } from './datafoundations/DataTypesSection'
import { PipelineSection } from './datafoundations/PipelineSection'
import { DataQualitySection } from './datafoundations/DataQualitySection'
import { ArchitectureSection } from './datafoundations/ArchitectureSection'
import { LLMDataSection } from './datafoundations/LLMDataSection'
import { GarbageInOutBusiness } from './datafoundations/GarbageInOutBusiness'
import { DataForBusinessBusiness } from './datafoundations/DataForBusinessBusiness'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'

const questions: Question[] = [
  {
    id: 'datafoundations-1',
    type: 'mc',
    question: 'A customer review like "Great product, fast shipping!" is an example of:',
    options: [
      'Structured data — it has clear fields (sentiment, topic)',
      'Semi-structured data — it\'s text but could be parsed into fields',
      'Unstructured data — it\'s free-form text without a predefined schema',
      'Tabular data — each word is a column',
    ],
    correctIndex: 2,
    explanation: 'Free-form text is unstructured data — it has no predefined schema or fixed fields. While you could extract structure from it (sentiment analysis, topic classification), the raw text itself is unstructured. Semi-structured data has some organization (like JSON or XML) but isn\'t rigidly tabular.',
  },
  {
    id: 'datafoundations-2',
    type: 'mc',
    question: 'In a data pipeline, what is the key difference between ETL and ELT?',
    options: [
      'ETL is faster because it transforms data before loading',
      'ELT loads raw data first, then transforms it in the destination — leveraging the warehouse\'s compute power',
      'ETL is for structured data, ELT is for unstructured data',
      'There is no practical difference — they\'re just different names for the same process',
    ],
    correctIndex: 1,
    explanation: 'The critical difference is when transformation happens. ETL transforms data before loading (good when you need to clean/filter before storage). ELT loads raw data first, then transforms in-place using the destination\'s compute (modern data warehouses like Snowflake/BigQuery are powerful enough to handle this). ELT is increasingly popular because it preserves raw data and lets you re-transform later.',
  },
  {
    id: 'datafoundations-3',
    type: 'mc',
    question: 'You train a sentiment classifier on product reviews, but it performs terribly on medical patient feedback. The most likely cause is:',
    options: [
      'The model architecture is wrong for medical text',
      'Medical text uses longer sentences than product reviews',
      'Data quality issue: the training data distribution doesn\'t match the target domain',
      'The model needs more parameters to understand medical terminology',
    ],
    correctIndex: 2,
    explanation: 'This is a classic data distribution mismatch. The model learned patterns from product review language ("great product", "fast shipping") that don\'t transfer to medical language ("patient presented with", "prognosis is guarded"). The fix is better training data that matches your target domain — not a bigger model or different architecture.',
  },
  {
    id: 'datafoundations-4',
    type: 'free',
    question: 'Why does the saying "garbage in, garbage out" matter even more for LLMs than for traditional software? What happens when an LLM trains on low-quality data?',
    modelAnswer: 'Traditional software with bad input data produces obviously wrong outputs — a calculation error, a crash, a missing field. But LLMs trained on low-quality data produce outputs that look confident and fluent but are subtly wrong. The model learns the biases, errors, and patterns in its training data. If it trains on spam, it generates spammy text. If it trains on outdated information, it states outdated facts confidently. If it trains on duplicated data, it memorizes and regurgitates instead of generalizing. The danger is that LLM outputs are convincing even when wrong, so data quality issues are harder to detect downstream.',
    explanation: 'The key insight is that LLMs amplify data quality problems because they produce fluent, confident text regardless of whether the underlying knowledge is correct. Bad data doesn\'t cause crashes — it causes subtle, hard-to-detect errors.',
  },
]

const businessQuestions: Question[] = [
  { id: 'df-biz-1', type: 'mc', question: 'Your company\'s CRM has duplicate customer entries, inconsistent naming, and outdated emails. What happens if you train AI on this data?', options: ['The AI will automatically clean the data', 'The AI will learn the wrong patterns and give confused, contradictory answers', 'It won\'t matter — AI is smart enough to work around messy data', 'The AI will flag the duplicates for you'], correctIndex: 1, explanation: 'Garbage in, garbage out. AI learns from whatever data you give it. Messy data = messy AI. It won\'t clean the data for you — it will confidently repeat the errors.' },
  { id: 'df-biz-2', type: 'mc', question: 'What percentage of most companies\' data is unstructured (emails, documents, chat logs)?', options: ['About 20%', 'About 50%', 'Over 80%', 'Less than 10%'], correctIndex: 2, explanation: 'Over 80% of business data is unstructured — emails, Word docs, PDFs, chat logs, meeting recordings. This is actually where LLMs shine, because they\'re designed to understand natural language.' },
]

export const DataFoundationsModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="data-foundations" title="Why Data Quality Matters" subtitle="Your AI is only as good as the data you feed it. Learn why &quot;garbage in, garbage out&quot; is the #1 rule.">
        <GarbageInOutBusiness />
        <DataForBusinessBusiness />
        <KnowledgeCheck moduleId="datafoundations-business" questions={translateQuestions(businessQuestions, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="data-foundations" title="Data Foundations" subtitle="Before you can build with LLMs, you need to understand data — how it&apos;s shaped, moved, stored, and why quality matters more than quantity.">
      <DataTypesSection />
      <PipelineSection />
      <DataQualitySection />
      <ArchitectureSection />
      <LLMDataSection />
      <KnowledgeCheck moduleId="datafoundations" questions={translateQuestions(questions, lang)} />
    </ModuleLayout>
  )
}
