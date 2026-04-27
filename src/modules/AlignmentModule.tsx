import { translateQuestions } from '../quiz-translations'
import { useLanguage } from '../LanguageContext'
import { useDifficulty } from '../DifficultyContext'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { SelfExplain } from '../components/SelfExplain'
import { AlignmentProblemSection } from './alignment/AlignmentProblemSection'
import { AlignmentPipelineSection } from './alignment/AlignmentPipelineSection'
import { ModernAlternativesSection } from './alignment/ModernAlternativesSection'
import { SafetyGuardrailsSection } from './alignment/SafetyGuardrailsSection'
import { PostTrainingPipelineSection } from './alignment/PostTrainingPipelineSection'
import { ProductionGovernanceSection } from './agents/ProductionGovernanceSection'
import { WhyAIGoesWrongBusiness } from './alignment/WhyAIGoesWrongBusiness'
import { GuardrailsBusiness } from './alignment/GuardrailsBusiness'
import { ModuleLayout } from '../components/ModuleLayout'

const questions: Question[] = [
  {
    id: 'align-1',
    type: 'free',
    question:
      'A base model can write fluent text, so why does it still need alignment? Describe a concrete failure mode.',
    modelAnswer:
      'Base models are trained to predict the next token, not to be helpful or safe. They may comply with harmful requests, generate toxic content, or produce plausible-sounding misinformation because "helpful refusal" never appeared as a likely continuation in the training data. For example, asking a base model "how to pick a lock" will get a detailed answer with no safety consideration.',
    explanation:
      'Next-token prediction optimizes for statistical likelihood, not intent alignment. Without alignment, the model has no concept of helpfulness, harmlessness, or honesty.',
  },
  {
    id: 'align-2',
    type: 'mc',
    question: 'What is the primary purpose of Supervised Fine-Tuning (SFT) in the alignment pipeline?',
    options: [
      'Reduce the model size for faster inference',
      'Teach the model the format and style of helpful responses using curated examples',
      'Train a separate model to score response quality',
      'Replace RLHF entirely with a simpler objective',
    ],
    correctIndex: 1,
    explanation:
      'SFT uses human-written (instruction, response) pairs to shift the model from raw text completion toward the format of a helpful assistant. It doesn\'t replace RLHF — it provides the starting point that RLHF then refines.',
  },
  {
    id: 'align-3',
    type: 'free',
    question:
      'Explain the role of the reward model in RLHF. Why can\'t you skip it and go straight from SFT to PPO?',
    modelAnswer:
      'The reward model learns human preferences from comparison data (which response is better?) and produces a scalar score for any given response. PPO needs this score as its optimization signal. Without a reward model, PPO has no objective to optimize — you\'d need a human to rate every single generated response during training, which is impossibly expensive.',
    explanation:
      'The reward model is the bridge between sparse human judgments and the dense signal PPO needs. It generalizes human preferences to unseen responses.',
  },
  {
    id: 'align-4',
    type: 'mc',
    question: 'How does DPO differ from PPO in its approach to alignment?',
    options: [
      'DPO trains a larger reward model for better accuracy',
      'DPO skips the reward model and directly optimizes the policy using preference pairs',
      'DPO uses more human feedback data than PPO',
      'DPO only works with models under 7B parameters',
    ],
    correctIndex: 1,
    explanation:
      'DPO (Direct Preference Optimization) reformulates the RLHF objective so the policy model itself is updated directly from preference pairs, eliminating the need for a separate reward model and the instability of RL training.',
  },
  {
    id: 'align-5',
    type: 'free',
    question:
      'What is "alignment tax" and why might a team accept it? Give an example of the tradeoff.',
    modelAnswer:
      'Alignment tax is the performance cost of alignment — the model may become less capable at certain tasks (e.g., creative writing, coding edge cases) because alignment training teaches it to refuse or hedge. A team accepts it because an unaligned model poses safety and reputation risks. For example, an aligned model might refuse to generate exploit code, losing capability but preventing misuse.',
    explanation:
      'Alignment is a tradeoff: safety and helpfulness come at the cost of some raw capability. The "tax" is worth paying for production deployment.',
  },
]

const businessQuestions: Question[] = [
  { id: 'align-biz-1', type: 'mc', question: 'Your AI chatbot confidently tells a customer that your product has a feature it doesn\'t have. What type of AI failure is this?', options: ['Bias', 'Hallucination — the AI made something up that sounds plausible', 'A data leak', 'A software bug'], correctIndex: 1, explanation: 'Hallucination is when AI generates confident, plausible-sounding information that\'s simply wrong. It\'s one of the most common AI failures in business settings.' },
  { id: 'align-biz-2', type: 'mc', question: 'What\'s the best approach when first deploying a customer-facing AI?', options: ['Let it run fully autonomously to save time', 'Start with human review on everything, then gradually give the AI more autonomy as trust builds', 'Only deploy it internally, never customer-facing', 'Wait until AI is 100% reliable'], correctIndex: 1, explanation: 'Start tight, loosen gradually — like onboarding a new employee. Begin with full oversight, track performance, and expand autonomy as the AI proves reliable.' },
]

export const AlignmentModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="alignment" title="Trust &amp; Safety" subtitle="Why AI sometimes goes wrong, and how to put guardrails in place to use it safely.">
        <WhyAIGoesWrongBusiness />
        <GuardrailsBusiness />
        <KnowledgeCheck moduleId="alignment-business" questions={translateQuestions(businessQuestions, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="alignment" title="Alignment &amp; Safety" subtitle="How models go from raw text predictors to helpful, harmless, and honest assistants.">
      <AlignmentProblemSection />
      <AlignmentPipelineSection />
      <SelfExplain prompt="You just walked through the alignment pipeline (SFT → Reward Model → PPO). In your own words, explain why each stage exists and what would go wrong if you skipped it." modelAnswer="SFT teaches the model the format of helpful responses — without it, the model wouldn't know how to structure answers. The reward model captures human preferences as a trainable signal — without it, there's no scalable way to tell the model what 'good' means. PPO uses that signal to optimize the policy — without it, the model only mimics the SFT examples and can't generalize preferences to novel situations. Skipping any stage leaves a gap: no SFT = wrong format, no RM = no preference signal, no PPO = no preference generalization." />
      <ModernAlternativesSection />
      <SafetyGuardrailsSection />
      <PostTrainingPipelineSection />
      <ProductionGovernanceSection />
      <KnowledgeCheck moduleId="alignment" questions={translateQuestions(questions, lang)} />
    </ModuleLayout>
  )
}
