import { translateQuestions } from '../quiz-translations'
import { useLanguage } from '../LanguageContext'
import { DataSourcesSection } from './llmdata/DataSourcesSection'
import { CleaningPipelineSection } from './llmdata/CleaningPipelineSection'
import { DataMixSection } from './llmdata/DataMixSection'
import { SyntheticDataSection } from './llmdata/SyntheticDataSection'
import { DataFormatsSection } from './llmdata/DataFormatsSection'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'

const questions: Question[] = [
  {
    id: 'llmdata-1',
    type: 'mc',
    question: 'Most LLM training data comes from web crawls (Common Crawl). Roughly what percentage of raw crawl data survives the cleaning pipeline to become usable training data?',
    options: [
      'About 70-80% — most web content is usable',
      'About 50% — half is good, half is junk',
      'About 10-15% — the vast majority is filtered out as low-quality, duplicate, or non-English',
      'About 1% — only the very best content survives',
    ],
    correctIndex: 2,
    explanation: 'In the pipeline you just ran, 100 TB of raw crawl data was reduced to ~14 TB — about 14% survival rate. The 86% that gets removed includes non-English text, SEO spam, boilerplate, near-duplicates, and PII. This aggressive filtering is essential because training on garbage produces a garbage model. The cleaning pipeline is arguably more important than the model architecture.',
  },
  {
    id: 'llmdata-2',
    type: 'mc',
    question: 'The deduplication step removed 50% of the data that survived quality filtering. Why is removing near-duplicate documents so important for training?',
    options: [
      'Duplicates waste storage space and that\'s expensive',
      'The model would memorize duplicated text verbatim instead of learning general patterns, and over-represented content biases the model\'s outputs',
      'Duplicates slow down training because the GPU has to process the same data twice',
      'Deduplication is mainly a legal requirement to avoid copyright issues',
    ],
    correctIndex: 1,
    explanation: 'When the model sees the same text multiple times, it memorizes it rather than learning generalizable patterns. This leads to the model regurgitating training data verbatim (a privacy and copyright risk) and biasing outputs toward over-represented content. If 30% of your data is cookie-cutter "About Us" pages, the model gets really good at generating generic corporate text but worse at everything else. Deduplication ensures the model sees diverse examples.',
  },
  {
    id: 'llmdata-3',
    type: 'mc',
    question: 'Training data mixes typically over-represent code and academic papers relative to their proportion on the web. Why would you deliberately skew the data mix away from the natural web distribution?',
    options: [
      'Code and papers are cheaper to obtain than web text',
      'The natural web distribution is mostly low-quality content — deliberately increasing high-quality sources like code and papers improves the model\'s reasoning and factual accuracy disproportionately',
      'Code and papers are easier to tokenize',
      'It\'s just tradition — early LLMs used this mix and everyone copied it',
    ],
    correctIndex: 1,
    explanation: 'The web is dominated by e-commerce, social media, and low-quality content. If you trained on the natural distribution, the model would be great at generating product descriptions but poor at reasoning. Code teaches logical structure and precise thinking. Academic papers teach factual accuracy and careful argumentation. By over-weighting these sources, you get a model that\'s much better at reasoning and knowledge tasks — even though these sources are a small fraction of the web.',
  },
  {
    id: 'llmdata-4',
    type: 'free',
    question: 'Imagine you\'re building a training dataset for a new LLM and you skip the cleaning pipeline entirely — you just tokenize the raw Common Crawl dump and start training. Describe what the resulting model would be like and why.',
    modelAnswer: 'The model would be terrible in specific, predictable ways. It would frequently generate SEO spam phrases ("click here", "best deals 2024"), cookie-cutter boilerplate, and navigation menus because that\'s a huge portion of raw web data. It would mix languages unpredictably since raw crawls contain text in hundreds of languages. It would memorize and regurgitate duplicated content (the same news article copied across thousands of sites). It would leak personal information (emails, phone numbers, addresses) found in the raw data. And its "knowledge" would be heavily biased toward whatever content is most duplicated on the web, not what\'s most accurate or useful. The model might still generate fluent text, but the content would be unreliable, biased, and potentially harmful.',
    explanation: 'Skipping cleaning doesn\'t just reduce quality — it introduces specific, predictable failure modes. Each cleaning step (language filtering, quality filtering, deduplication, PII removal) prevents a specific category of problems in the final model.',
  },
]

export const LLMDataModule: React.FC = () => {
  const { lang } = useLanguage()
  return (
  <ModuleLayout moduleId="llm-data" title="Data for LLM Training" subtitle="Where training data comes from, how it gets cleaned, and why the mix matters.">
    <DataSourcesSection />
    <CleaningPipelineSection />
    <DataMixSection />
    <SyntheticDataSection />
    <DataFormatsSection />
    <KnowledgeCheck moduleId="llmdata" questions={translateQuestions(questions, lang)} />
  </ModuleLayout>
  )
}