import { translateQuestions } from '../quiz-translations'
import { useLanguage } from '../LanguageContext'
import { WhenToFineTuneSection } from './finetuning/WhenToFineTuneSection'
import { PreparingDataSection } from './finetuning/PreparingDataSection'
import { FineTuningRunSection } from './finetuning/FineTuningRunSection'
import { EvaluationMergingSection } from './finetuning/EvaluationMergingSection'
import { CostPlatformSection } from './finetuning/CostPlatformSection'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'

const QUESTIONS: Question[] = [
  {
    id: 'finetuning-1',
    type: 'mc',
    question: 'Your model needs to answer questions about your company\'s internal documentation that changes weekly. Should you fine-tune, use RAG, or improve prompting?',
    options: [
      'Fine-tune on the documentation so the model learns it',
      'Use RAG — retrieve relevant docs at query time so the model always has current information',
      'Write a detailed system prompt describing all the documentation',
      'Fine-tune weekly to keep the model updated',
    ],
    correctIndex: 1,
    explanation: 'RAG is the right choice for frequently changing knowledge. Fine-tuning bakes knowledge into weights at training time — you\'d need to retrain weekly, which is expensive and slow. RAG retrieves current documents at query time, so updates are instant (just update the vector store). Prompting can\'t fit entire documentation sets.',
  },
  {
    id: 'finetuning-2',
    type: 'free',
    question: 'Explain how LoRA works and why it makes fine-tuning practical on consumer hardware. What is it actually modifying compared to full fine-tuning?',
    modelAnswer: 'LoRA (Low-Rank Adaptation) freezes all original model weights and injects small trainable matrices into specific layers (typically attention projections). Instead of updating a full weight matrix W (e.g., 4096×4096 = 16M params), LoRA decomposes the update as ΔW = A×B where A is 4096×16 and B is 16×4096 (rank=16), so only ~130K params are trained. This means: (1) Memory — only gradients for tiny matrices, not the full model. (2) Storage — adapter is ~16MB vs 16GB for full weights. (3) Speed — fewer parameters to update per step. QLoRA goes further by loading the frozen base model in 4-bit, cutting VRAM from ~32GB to ~6GB for an 8B model.',
    explanation: 'LoRA\'s key insight is that fine-tuning updates are low-rank — you don\'t need to modify all parameters to adapt behavior. This makes fine-tuning accessible on consumer GPUs.',
  },
  {
    id: 'finetuning-3',
    type: 'mc',
    question: 'You fine-tuned a model and it scores well on your evaluation set but performs poorly on real user queries. What is the most likely cause?',
    options: [
      'The LoRA rank was too low',
      'The training data doesn\'t represent the distribution of real user queries — evaluation set has the same bias as training data',
      'The model needs more training epochs',
      'The base model was too small',
    ],
    correctIndex: 1,
    explanation: 'This is a classic train/eval distribution mismatch. If your evaluation set was split from the same data as training, it shares the same biases and gaps. Real user queries are more diverse, ambiguous, and messy. The fix is to evaluate on held-out real user data, not a random split of your curated training set.',
  },
  {
    id: 'finetuning-4',
    type: 'mc',
    question: 'Which factor has the biggest impact on fine-tuning quality?',
    options: [
      'Number of training examples (more is always better)',
      'Quality and consistency of training examples — well-formatted, accurate, representative of the target task',
      'The size of the base model',
      'Training for more epochs',
    ],
    correctIndex: 1,
    explanation: 'Data quality dominates. 500 high-quality, consistent examples often outperform 10,000 noisy ones. The model learns patterns from your data — if examples are inconsistent, contain errors, or don\'t match the target task distribution, the model learns those problems. More data with poor quality just reinforces bad patterns.',
  },
]

export const FineTuningModule: React.FC = () => {
  const { lang } = useLanguage()
  return (
  <ModuleLayout moduleId="fine-tuning" title="Fine-Tuning Hands-On" subtitle="From deciding whether to fine-tune, through data preparation and a complete LoRA training
        run, to evaluation, merging, and local deployment — the full practical workflow.">
    <WhenToFineTuneSection />
    <PreparingDataSection />
    <FineTuningRunSection />
    <EvaluationMergingSection />
    <CostPlatformSection />
    <KnowledgeCheck moduleId="finetuning" questions={translateQuestions(QUESTIONS, lang)} />
  </ModuleLayout>
  )
}