import { translateQuestions } from '../quiz-translations'
import { useLanguage } from '../LanguageContext'
import { BigPictureSection } from './transformer/BigPictureSection'
import { AttentionSection } from './transformer/AttentionSection'
import { MultiHeadSection } from './transformer/MultiHeadSection'
import { LayerByLayerSection } from './transformer/LayerByLayerSection'
import { FFNSection } from './transformer/FFNSection'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'

const questions: Question[] = [
  {
    id: 'transformer-1',
    type: 'mc',
    question: 'In the attention heatmap, "it" strongly attends to "cat" in the sentence "The cat sat on the mat because it was tired." What does this tell us about what attention learns?',
    options: [
      'The model memorized that "it" always refers to "cat"',
      'Attention learns to resolve references — "it" attends to "cat" because the model figured out they refer to the same entity',
      'The model just looks at nearby words, and "cat" happens to be close',
      'This is random — attention weights don\'t have interpretable meaning',
    ],
    correctIndex: 1,
    explanation: 'Attention learns coreference resolution — connecting pronouns to the nouns they refer to. "it" attends strongly to "cat" because the model learned that "it" refers back to "cat" in this context. This isn\'t memorization (it works on new sentences) or proximity (there are closer words). It\'s genuine linguistic understanding emerging from the attention mechanism.',
  },
  {
    id: 'transformer-2',
    type: 'mc',
    question: 'Why does the transformer use multiple attention heads instead of one big attention mechanism?',
    options: [
      'Multiple heads are faster to compute than one large head',
      'Each head can learn to attend to different types of relationships (syntax, semantics, position), giving the model richer representations',
      'Multiple heads prevent overfitting by adding regularization',
      'It\'s just an engineering choice — one head would work equally well with the same parameter count',
    ],
    correctIndex: 1,
    explanation: 'Multiple heads let the model attend to different things simultaneously. One head might learn syntactic relationships (subject-verb), another might learn semantic similarity, another might track positional patterns. With a single head, all these different relationship types would compete for the same attention weights. Multi-head attention is like having multiple specialists instead of one generalist.',
  },
  {
    id: 'transformer-3',
    type: 'mc',
    question: 'The feed-forward network (FFN) in each transformer layer processes each token independently. What role does it play after attention has already mixed information between tokens?',
    options: [
      'It\'s redundant — attention already does all the work',
      'It compresses the representation to save memory',
      'It transforms each token\'s enriched representation through nonlinear computation — this is where factual knowledge and complex patterns are stored',
      'It just normalizes the output for the next layer',
    ],
    correctIndex: 2,
    explanation: 'Attention mixes information between tokens (the "who should I look at?" step), but the FFN transforms each token\'s representation through nonlinear computation (the "what do I do with what I learned?" step). Research shows that FFN layers store factual knowledge — specific neurons activate for specific facts. The FFN expands to a wider dimension (4× typically), applies nonlinearity, then projects back down, giving the model capacity to learn complex transformations.',
  },
  {
    id: 'transformer-4',
    type: 'free',
    question: 'Layer normalization appears after both the attention and FFN sub-layers. Explain why a transformer would struggle to train without it, even though it doesn\'t add any "intelligence" to the model.',
    modelAnswer: 'Without layer normalization, the numbers flowing through the network would grow or shrink uncontrollably as they pass through dozens of layers. Attention and FFN operations multiply and add values repeatedly — after 32+ layers, small values could vanish to zero (vanishing gradients) or explode to infinity (exploding gradients). Layer norm rescales the values at each step to have consistent mean and variance, keeping the numbers in a stable range. It\'s like recalibrating a measuring instrument between each measurement. Without it, training becomes unstable — the loss oscillates wildly or the model simply fails to learn. It doesn\'t add intelligence, but it makes learning possible.',
    explanation: 'Layer normalization is a training stability mechanism. It doesn\'t help the model "think" better, but without it, the model can\'t learn at all because the numerical values become unstable across many layers.',
  },
]

export const TransformerModule: React.FC = () => {
  const { lang } = useLanguage()
  return (
  <ModuleLayout moduleId="transformer" title="The Transformer" subtitle="The architecture behind every modern large language model. Explore each component
        interactively — from the high-level pipeline down to individual attention heads.">
    <BigPictureSection />
    <AttentionSection />
    <MultiHeadSection />
    <LayerByLayerSection />
    <FFNSection />
    <KnowledgeCheck moduleId="transformer" questions={translateQuestions(questions, lang)} />
  </ModuleLayout>
  )
}