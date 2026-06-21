import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import { ModuleChallenges } from '../components/ModuleChallenges'
import type { Question } from '../components/KnowledgeCheck'
import { SelfExplain } from '../components/SelfExplain'
import { WhyEvaluationSection } from './evaluation/WhyEvaluationSection'
import { BenchmarksSection } from './evaluation/BenchmarksSection'
import { ModelSelectionSection } from './evaluation/ModelSelectionSection'
import { CustomEvalSection } from './evaluation/CustomEvalSection'
import { LeaderboardSection } from './evaluation/LeaderboardSection'
import { MeasuringAIBusiness } from './evaluation/MeasuringAIBusiness'
import { ModelPersonalitiesBusiness } from './evaluation/ModelPersonalitiesBusiness'
import { ChoosingModelsBusiness } from './evaluation/ChoosingModelsBusiness'
import { ModuleLayout } from '../components/ModuleLayout'

const questions: Question[] = [
  {
    id: 'eval-1',
    type: 'free',
    question:
      'A model has perplexity 8.2 on your test set — lower than any competitor. Why might it still be a bad choice for your product?',
    modelAnswer:
      'Perplexity measures how well the model predicts the next token on average, but it says nothing about task-specific quality. A model with low perplexity might: produce fluent but factually wrong answers, fail at following instructions, generate toxic content, or be terrible at the specific task you care about (e.g., code generation, summarization). Perplexity is a necessary but not sufficient signal — you need task-specific evaluation.',
    explanation:
      'Perplexity is a language modeling metric, not a usefulness metric. Low perplexity means good token prediction, not good task performance.',
  },
  {
    id: 'eval-2',
    type: 'mc',
    question: 'Why are benchmark leaderboards often misleading when choosing a model for production?',
    options: [
      'Benchmarks are too easy for modern models',
      'Models may be trained on benchmark data (contamination), benchmarks may not reflect your task, and aggregate scores hide per-category weaknesses',
      'Leaderboards only measure speed, not quality',
      'Benchmarks are only valid for models under 13B parameters',
    ],
    correctIndex: 1,
    explanation:
      'Benchmark contamination (training on test data), task mismatch (benchmarks ≠ your use case), and score aggregation (hiding weaknesses) all make leaderboard rankings unreliable for production decisions.',
  },
  {
    id: 'eval-3',
    type: 'mc',
    question: 'When is human evaluation essential rather than optional?',
    options: [
      'When you need to evaluate more than 1000 examples',
      'When automated metrics like BLEU or ROUGE are available',
      'When evaluating subjective qualities like helpfulness, safety, or tone that automated metrics can\'t capture',
      'When the model is smaller than 7B parameters',
    ],
    correctIndex: 2,
    explanation:
      'Automated metrics work for well-defined tasks (translation, classification), but subjective qualities — is this response helpful? safe? appropriate in tone? — require human judgment. Human eval is expensive but irreplaceable for these dimensions.',
  },
  {
    id: 'eval-4',
    type: 'free',
    question:
      'You\'re building a custom eval for a medical Q&A system. What dimensions would you evaluate, and why can\'t you rely solely on existing benchmarks like MMLU?',
    modelAnswer:
      'Dimensions: factual accuracy (does the answer match medical consensus?), safety (does it avoid dangerous advice?), citation quality (does it reference sources?), appropriate hedging (does it say "consult a doctor" when needed?), and completeness. MMLU tests general medical knowledge via multiple choice, but it can\'t evaluate free-form answer quality, safety behavior, citation accuracy, or domain-specific tone. A model scoring 90% on MMLU medical questions might still give dangerous advice in open-ended conversations.',
    explanation:
      'Generic benchmarks test knowledge breadth, not domain-specific behavior. Custom evals must test the exact qualities your product requires.',
  },
]

const businessQuestions: Question[] = [
  { id: 'eval-biz-1', type: 'mc', question: 'Your team says the AI chatbot "seems pretty good." Why isn\'t that enough?', options: ['It is enough — if the team is happy, it\'s working', 'You need systematic testing with clear metrics, like QA before launching any product', 'You only need to test it once before launch', 'AI doesn\'t need evaluation — it\'s always improving'], correctIndex: 1, explanation: '"Seems good" is like evaluating a new hire based on vibes. You need clear metrics (accuracy, speed, customer satisfaction) measured systematically over time.' },
  { id: 'eval-biz-2', type: 'mc', question: 'You\'re choosing between a very expensive AI model and a cheaper one. The expensive one scores 5% higher on benchmarks. What should you do?', options: ['Always pick the higher-scoring model', 'Test both on YOUR actual tasks — the 5% benchmark difference might not matter for your use case, and the cheaper model might be fast enough and good enough', 'Benchmarks don\'t matter at all', 'Pick the cheaper one to save money'], correctIndex: 1, explanation: 'Benchmarks are like standardized test scores — they give a general picture but don\'t tell you how the model performs on YOUR specific tasks. Always test with your own data before deciding.' },
]

export const EvaluationModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="evaluation" title="How to Know If It Works" subtitle="Measuring AI performance, choosing the right model, and why &quot;it seems good&quot; isn&apos;t good enough.">
        <MeasuringAIBusiness />
        <ChoosingModelsBusiness />
        <ModelPersonalitiesBusiness />
        <KnowledgeCheck moduleId="evaluation-business" questions={translateQuestions(businessQuestions, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="evaluation" title="Evaluation &amp; Benchmarks" subtitle="How do you know if a model is good? Loss curves aren&apos;t enough. This module covers standardized benchmarks, custom evaluation, and why leaderboards can be misleading.">
      <WhyEvaluationSection />
      <SelfExplain prompt="You just compared models with different perplexity scores and saw how low perplexity doesn't guarantee good responses. Explain in your own words why perplexity alone is insufficient for evaluating an LLM, and what you'd measure instead." modelAnswer="Perplexity measures average token prediction quality — a model can be great at predicting tokens while being terrible at following instructions, staying factual, or being safe. Instead, you'd measure: task-specific accuracy (does it answer correctly?), instruction following (does it do what you asked?), safety (does it refuse harmful requests?), and user preference (do humans prefer its responses?). These require task-specific benchmarks and human evaluation, not just a single number." />
      <BenchmarksSection />
      <ModelSelectionSection />
      <CustomEvalSection />
      <LeaderboardSection />
      <ModuleChallenges moduleId="evaluation" />
      <KnowledgeCheck moduleId="evaluation" questions={translateQuestions(questions, lang)} />
    </ModuleLayout>
  )
}
