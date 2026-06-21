import { translateQuestions, useLanguage } from '../i18n'
import { TrainingSection1 } from './training/TrainingSection1'
import { TrainingSection2 } from './training/TrainingSection2'
import { TrainingSection3 } from './training/TrainingSection3'
import { TrainingSection4 } from './training/TrainingSection4'
import { TrainingSection5 } from './training/TrainingSection5'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import { ModuleChallenges } from '../components/ModuleChallenges'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'

const questions: Question[] = [
  {
    id: 'training-1',
    type: 'mc',
    question: 'Before training, a model\'s weights are random numbers. If you asked this untrained model to complete "The capital of France is ___", what would happen?',
    options: [
      'It would output "Paris" because the architecture already encodes language knowledge',
      'It would output random gibberish — the weights have no learned patterns yet, so predictions are essentially random guesses across the entire vocabulary',
      'It would output nothing — the model can\'t run without trained weights',
      'It would output the most common word in English, like "the"',
    ],
    correctIndex: 1,
    explanation: 'Random weights mean random predictions. The model would output a random distribution over its vocabulary — maybe "banana" or "zzq" or any token with roughly equal probability. The architecture provides the capacity to learn, but the actual knowledge comes entirely from training. This is why the initial loss is so high (~10+) — the model is maximally wrong about everything.',
  },
  {
    id: 'training-2',
    type: 'mc',
    question: 'In the training loop, what is the correct order of operations for a single iteration?',
    options: [
      'Compute Loss → Forward Pass → Backward Pass → Update Weights → Load Batch',
      'Load Batch → Backward Pass → Forward Pass → Compute Loss → Update Weights',
      'Load Batch → Forward Pass → Compute Loss → Backward Pass → Update Weights',
      'Forward Pass → Load Batch → Update Weights → Compute Loss → Backward Pass',
    ],
    correctIndex: 2,
    explanation: 'The training loop follows a strict sequence: (1) Load a batch of text, (2) Forward pass — run it through the model to get predictions, (3) Compute loss — measure how wrong the predictions are, (4) Backward pass — calculate gradients (which direction to nudge each weight), (5) Update weights — apply the nudges. Then repeat. Each step depends on the previous one — you can\'t compute loss without predictions, and you can\'t compute gradients without loss.',
  },
  {
    id: 'training-3',
    type: 'mc',
    question: 'The loss function measures "how wrong the model was." During nanochat training, the loss dropped from ~10 to ~2.4. What does a loss of 2.4 actually mean?',
    options: [
      'The model gets 2.4% of predictions wrong',
      'The model is 2.4× better than random guessing',
      'The cross-entropy loss of 2.4 means the model\'s probability distribution over next tokens is much more concentrated on the correct answer than at the start, but still not perfect',
      'The model has learned 2.4 out of 10 possible language skills',
    ],
    correctIndex: 2,
    explanation: 'Cross-entropy loss measures how far the model\'s predicted probability distribution is from the true answer. A loss of ~11 means the model assigns roughly equal probability to all ~65K tokens (random guessing). A loss of 2.4 means the model concentrates most probability on a small set of plausible next tokens, with the correct one getting significant weight. Lower is better, but it never reaches 0 because language has genuine ambiguity — multiple next tokens can be valid.',
  },
  {
    id: 'training-4',
    type: 'mc',
    question: 'In nanochat, the --depth flag is "the only dial you set." Setting depth=26 auto-configures width=1280, heads=10, params=1.6B. Why is depth the single control rather than letting you set each parameter independently?',
    options: [
      'The other parameters don\'t matter — only depth affects model quality',
      'It\'s a simplification for beginners that sacrifices flexibility',
      'Research has established optimal ratios between depth, width, and heads — given a depth, the other parameters follow from scaling laws',
      'It\'s a limitation of the nanochat codebase that could be fixed',
    ],
    correctIndex: 2,
    explanation: 'Scaling laws research (Chinchilla, etc.) has shown that model dimensions have optimal ratios. Given a target depth, there are well-established formulas for the matching width and head count that maximize performance per parameter. nanochat encodes these ratios so you just pick a scale and get a well-proportioned model. Setting parameters independently would likely produce a worse model (e.g., too wide and shallow, or too narrow and deep).',
  },
  {
    id: 'training-5',
    type: 'free',
    question: 'The nanochat checkpoint (state_step010000.pt) is 9.6 GB, but the final model (model.pt) is only 3.2 GB. Explain why the checkpoint is 3× larger than the model, and when you\'d want each file.',
    modelAnswer: 'A checkpoint contains everything needed to resume training: the model weights (3.2 GB) plus the optimizer state (momentum, variance estimates for each parameter — roughly 2× the model size for Adam) plus the learning rate schedule, step count, and random number generator states. The model file contains only the trained weights — just the numbers needed for inference. You\'d use the checkpoint if training was interrupted and you need to continue from where you left off (without the optimizer state, you\'d lose training momentum and the model would train poorly). You\'d use the model file for inference/deployment — it\'s smaller and has everything needed to generate text.',
    explanation: 'Checkpoints are for resuming training (weights + optimizer state + metadata). Model files are for inference (weights only). The optimizer state roughly doubles the size because Adam tracks two running averages per parameter.',
  },
]

export const TrainingModule: React.FC = () => {
  const { lang } = useLanguage()
  return (
  <ModuleLayout moduleId="training" title="Training From Scratch" subtitle="How do billions of random numbers become a language model? Walk through the full
        training pipeline — from empty weights to a working model.">
    <TrainingSection1 />
    <TrainingSection2 />
    <TrainingSection3 />
    <TrainingSection4 />
    <TrainingSection5 />
    <ModuleChallenges moduleId="training" />
    <KnowledgeCheck moduleId="training" questions={translateQuestions(questions, lang)} />
  </ModuleLayout>
  )
}