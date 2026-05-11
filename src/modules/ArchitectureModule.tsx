import { translateQuestions, useLanguage } from '../i18n'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { SelfExplain } from '../components/SelfExplain'
import { DenseMoESection } from './architecture/DenseMoESection'
import { ScalingLawsSection } from './architecture/ScalingLawsSection'
import { AttentionVariantsSection } from './architecture/AttentionVariantsSection'
import { ModelConfigSection } from './architecture/ModelConfigSection'
import { DecisionTreeSection } from './architecture/DecisionTreeSection'
import { ModuleLayout } from '../components/ModuleLayout'

const questions: Question[] = [
  {
    id: 'arch-1',
    type: 'mc',
    question:
      'A Mixture-of-Experts model has 8×7B experts but only activates 2 per token. What is the key tradeoff compared to a dense 14B model?',
    options: [
      'MoE is always faster because it has fewer total parameters',
      'MoE has higher throughput per token but requires much more memory to hold all expert weights',
      'MoE produces higher quality output because it uses more parameters',
      'Dense models are always preferred because MoE routing is unreliable',
    ],
    correctIndex: 1,
    explanation:
      'MoE activates only a subset of parameters per token (fast inference), but all expert weights must be loaded into memory. Mixtral 8×7B needs ~46.7B parameters in memory even though only ~12.9B are active per token (shared layers like attention aren\'t replicated per expert).',
  },
  {
    id: 'arch-2',
    type: 'free',
    question:
      'Chinchilla scaling laws say compute-optimal training balances model size and data. If you double your compute budget, how should you split the increase between parameters and tokens?',
    modelAnswer:
      'According to Chinchilla, you should scale both model size and training tokens roughly equally. Doubling compute means ~1.4× more parameters AND ~1.4× more tokens (since 1.4 × 1.4 ≈ 2). The key insight is that many models were undertrained — they had too many parameters for the amount of data they saw.',
    explanation:
      'Scaling laws show that compute, parameters, and data are interlinked. Over-parameterizing without enough data (or vice versa) wastes compute.',
  },
  {
    id: 'arch-3',
    type: 'mc',
    question: 'Why was Grouped Query Attention (GQA) adopted in models like Llama 2 over standard Multi-Head Attention?',
    options: [
      'GQA improves training loss by using more attention heads',
      'GQA reduces KV cache memory by sharing key/value heads across query groups, with minimal quality loss',
      'GQA eliminates the need for positional encodings',
      'GQA allows the model to process longer sequences during training',
    ],
    correctIndex: 1,
    explanation:
      'GQA shares K/V projections across groups of query heads, dramatically reducing KV cache size at inference time. This is critical for serving long-context models where KV cache dominates memory.',
  },
  {
    id: 'arch-4',
    type: 'free',
    question:
      'A 3B model trained on 3T tokens often outperforms a 7B model trained on 1T tokens. Explain why, referencing scaling laws.',
    modelAnswer:
      'Scaling laws show that performance depends on the compute-optimal balance of parameters and data. The 7B/1T model is undertrained — it has capacity it never learned to use. The 3B/3T model is closer to the Chinchilla-optimal ratio (~20 tokens per parameter), so it extracts more capability from the same or less compute. More data means more gradient updates and better generalization.',
    explanation:
      'Model size alone doesn\'t determine quality. The ratio of parameters to training tokens matters — undertrained large models waste their capacity.',
  },
]

export const ArchitectureModule: React.FC = () => {
  const { lang } = useLanguage()
  return (
  <ModuleLayout moduleId="architecture" title="Architecture Decisions" subtitle="Dense vs MoE, scaling laws, attention variants, and how to choose the right architecture.">
    <DenseMoESection />
    <ScalingLawsSection />
    <SelfExplain
      prompt="You just explored how compute budget determines optimal model size and token count. Explain in your own words why a team with a fixed GPU budget should care about scaling laws before choosing a model size."
      modelAnswer="Scaling laws tell you the compute-optimal split between parameters and training data. Without them, a team might build a model that's too large for their data budget (undertrained, wasting parameters) or too small (leaving compute on the table). For a fixed GPU budget, scaling laws give the Pareto-optimal point: the model size and token count that maximize performance per FLOP. Ignoring them means you'll either have a big dumb model or a small model that could have been better."
    />
    <AttentionVariantsSection />
    <ModelConfigSection />
    <DecisionTreeSection />
    <KnowledgeCheck moduleId="architecture" questions={translateQuestions(questions, lang)} />
  </ModuleLayout>
  )
}