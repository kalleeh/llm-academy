import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { LandscapeSection } from './aiproblem/LandscapeSection'
import { ClassificationSection } from './aiproblem/ClassificationSection'
import { DecisionFrameworkSection } from './aiproblem/DecisionFrameworkSection'
import { LLMDifferenceSection } from './aiproblem/LLMDifferenceSection'
import { ToolboxSection } from './aiproblem/ToolboxSection'
import { LandscapeBusiness } from './aiproblem/LandscapeBusiness'
import { LLMvsMLBusiness } from './aiproblem/LLMvsMLBusiness'
import { DecisionBusiness } from './aiproblem/DecisionBusiness'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import { ModuleChallenges } from '../components/ModuleChallenges'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'

const questions: Question[] = [
  {
    id: 'aiproblem-1',
    type: 'mc',
    question: 'A company wants to predict which customers will cancel their subscription next month using historical billing data in a spreadsheet. What approach fits best?',
    options: [
      'An LLM — it can reason about customer behavior',
      'Classical ML (e.g., gradient boosting) — structured tabular data with a prediction target',
      'Deep learning CNN — to detect patterns in the data',
      'A rule-based system — just set a threshold on billing amount',
    ],
    correctIndex: 1,
    explanation: 'Structured/tabular data with a clear prediction target (churn yes/no) is the sweet spot for classical ML models like gradient boosting or random forests. LLMs are designed for language tasks, CNNs for images/spatial data, and a simple threshold would miss the complex patterns across multiple features.',
  },
  {
    id: 'aiproblem-2',
    type: 'mc',
    question: 'What is the key difference between "deep learning" and "machine learning"?',
    options: [
      'Deep learning uses more data than machine learning',
      'Deep learning is a subset of ML that uses neural networks with many layers to learn hierarchical features automatically',
      'Machine learning is older and therefore less accurate',
      'Deep learning can only be used for images, while ML handles everything else',
    ],
    correctIndex: 1,
    explanation: 'Deep learning is specifically a subset of machine learning that uses multi-layer neural networks. The "deep" refers to the depth (number of layers), which lets the model learn increasingly abstract features. It\'s not about data size, age, or being limited to images — deep learning is used for text, audio, and more.',
  },
  {
    id: 'aiproblem-3',
    type: 'mc',
    question: 'A tax calculation engine needs to apply different rates based on income brackets, filing status, and deductions. The rules are defined by law and change annually. What should you build?',
    options: [
      'Train an ML model on past tax returns to predict the correct amount',
      'Use an LLM to interpret the tax code and calculate taxes',
      'A rule-based system — the logic is deterministic and fully specified by law',
      'A deep learning model that learns the tax rules from examples',
    ],
    correctIndex: 2,
    explanation: 'When the logic is fully deterministic and defined by explicit rules, traditional software is the right tool. ML models would add unnecessary complexity and unpredictability to something that needs to be 100% correct and auditable. An LLM might hallucinate tax amounts — not what you want.',
  },
  {
    id: 'aiproblem-4',
    type: 'free',
    question: 'Explain why an LLM is not just "a bigger machine learning model." What makes LLMs fundamentally different from classical ML approaches like random forests or logistic regression?',
    modelAnswer: 'LLMs are different in kind, not just scale. Classical ML models work on structured features (numbers in columns) and learn statistical patterns for specific tasks like classification or regression. LLMs are trained on raw text to predict the next token, which forces them to learn language structure, world knowledge, and reasoning as emergent capabilities. They can generalize to tasks they were never explicitly trained on (zero-shot), handle unstructured natural language input, and generate coherent text — none of which classical ML can do. The transformer architecture and self-attention mechanism are also fundamentally different from decision trees or linear models.',
    explanation: 'The key insight is that LLMs learn general language understanding through next-token prediction, while classical ML learns specific input→output mappings. This gives LLMs emergent capabilities like reasoning and generalization that classical models simply cannot develop.',
  },
]

const businessQuestions: Question[] = [
  {
    id: 'aiproblem-biz-1',
    type: 'mc',
    question: 'Your team spends 3 hours daily sorting customer emails into categories (billing, support, sales). Should you use AI for this?',
    options: [
      'No — email sorting needs human judgment',
      'Yes — this is repetitive, pattern-based, and there\'s plenty of historical data to learn from',
      'Only if you build a custom AI model from scratch',
      'No — a simple email filter rule is enough',
    ],
    correctIndex: 1,
    explanation: 'This is a classic AI use case: repetitive task, clear categories, lots of past examples to learn from. AI can learn the patterns from your historical sorted emails and handle most of the sorting automatically, freeing your team for complex cases.',
  },
  {
    id: 'aiproblem-biz-2',
    type: 'mc',
    question: 'A tax calculation engine needs to apply exact rates based on income brackets defined by law. What should you build?',
    options: [
      'An AI model trained on past tax returns',
      'A rule-based system — the logic is exact and defined by law',
      'An LLM that can interpret tax code',
      'A machine learning model that predicts tax amounts',
    ],
    correctIndex: 1,
    explanation: 'When the rules are exact and fully defined (like tax law), traditional software is better. AI adds unpredictability to something that needs to be 100% correct. You wouldn\'t want an AI that "usually" gets your taxes right.',
  },
]

export const AIProblemModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="ai-problem" title="What&apos;s an AI Problem?" subtitle="Not everything needs AI. Learn when it helps, when it doesn&apos;t, and how to tell the difference.">
        <LandscapeBusiness />
        <DecisionBusiness />
        <LLMvsMLBusiness />
        <ModuleChallenges moduleId="aiproblem-business" />
        <KnowledgeCheck moduleId="aiproblem-business" questions={translateQuestions(businessQuestions, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="ai-problem" title="What&apos;s an AI Problem?" subtitle="Not every problem needs an LLM — or even ML. Learn to classify problems and pick the right tool for the job.">
      <LandscapeSection />
      <ClassificationSection />
      <DecisionFrameworkSection />
      <LLMDifferenceSection />
      <ToolboxSection />
      <KnowledgeCheck moduleId="aiproblem" questions={translateQuestions(questions, lang)} />
    </ModuleLayout>
  )
}
