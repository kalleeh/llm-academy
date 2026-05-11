import { translateQuestions, useLanguage } from '../i18n'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { SelfExplain } from '../components/SelfExplain'
import { HowInferenceWorksSection } from './inference/HowInferenceWorksSection'
import { ServingFrameworksSection } from './inference/ServingFrameworksSection'
import { OptimizationTechniquesSection } from './inference/OptimizationTechniquesSection'
import { CostOptimizationSection } from './inference/CostOptimizationSection'
import { ModuleLayout } from '../components/ModuleLayout'

const questions: Question[] = [
  {
    id: 'inf-1',
    type: 'free',
    question:
      'Explain the difference between the prefill and decode phases of inference. Why is prefill fast but decode slow?',
    modelAnswer:
      'Prefill processes all prompt tokens in parallel — one forward pass computes attention for every token pair simultaneously, fully utilizing GPU parallelism. Decode generates one token at a time, each requiring a full forward pass that attends to all previous tokens. Decode is memory-bandwidth bound (reading the full model weights for each single token), while prefill is compute-bound (lots of parallel work). This is why time-to-first-token (prefill) is fast but tokens-per-second (decode) is the bottleneck.',
    explanation:
      'Prefill is parallel and compute-bound; decode is sequential and memory-bandwidth-bound. This fundamental asymmetry drives most inference optimization strategies.',
  },
  {
    id: 'inf-2',
    type: 'mc',
    question: 'What is the primary purpose of the KV cache, and what is its main cost?',
    options: [
      'It stores model weights in a compressed format to save memory',
      'It caches attention key/value projections to avoid recomputation, but grows linearly with sequence length and can dominate GPU memory',
      'It speeds up tokenization by caching frequent token sequences',
      'It stores gradient information for faster fine-tuning',
    ],
    correctIndex: 1,
    explanation:
      'Without the KV cache, every decode step would recompute K/V projections for all previous tokens — O(n²) work. The cache makes it O(n) per step, but the memory cost grows as sequence_length × layers × heads × head_dim × 2.',
  },
  {
    id: 'inf-3',
    type: 'mc',
    question: 'How does continuous batching improve throughput compared to static batching?',
    options: [
      'It uses larger batch sizes to process more tokens per forward pass',
      'It inserts new requests into the batch as soon as any request finishes, instead of waiting for the entire batch to complete',
      'It compresses requests to fit more into each batch',
      'It skips the prefill phase for requests that are similar',
    ],
    correctIndex: 1,
    explanation:
      'Static batching wastes GPU cycles — short requests finish early but the GPU waits for the longest request. Continuous batching fills those empty slots immediately with new requests, keeping GPU utilization near 100%.',
  },
  {
    id: 'inf-4',
    type: 'free',
    question:
      'You need to serve a 70B model to 100 concurrent users with <500ms time-to-first-token. What serving framework considerations matter, and why?',
    modelAnswer:
      'Key considerations: 1) PagedAttention (vLLM) — efficiently manages KV cache memory across concurrent requests, preventing OOM. 2) Continuous batching — keeps GPU utilization high with 100 concurrent users. 3) Tensor parallelism — splits the 70B model across multiple GPUs for faster per-request latency. 4) Quantization support — INT4/INT8 reduces memory per GPU, potentially reducing the number of GPUs needed. 5) Speculative decoding — can reduce latency by drafting tokens with a smaller model. Framework choice: vLLM or TensorRT-LLM for production, as they support all of these. Ollama/llama.cpp are for single-user local use.',
    explanation:
      'Production serving at scale requires memory-efficient batching, multi-GPU support, and optimized scheduling — features that distinguish production frameworks from local inference tools.',
  },
]

export const InferenceModule: React.FC = () => {
  const { lang } = useLanguage()
  return (
  <ModuleLayout moduleId="inference" title="Inference &amp; Deployment" subtitle="How models generate text, the frameworks that serve them at scale, optimization techniques
        that multiply throughput, and how to keep costs under control.">
    <HowInferenceWorksSection />
    <SelfExplain
      prompt="You just adjusted the KV cache slider and saw memory jump from megabytes to gigabytes as context length increased. Explain why the KV cache is both essential for performance and the biggest memory bottleneck during inference."
      modelAnswer="The KV cache is essential because without it, every decode step would recompute key/value projections for ALL previous tokens — making generation O(n²) in compute. With the cache, each step only computes K/V for the new token and looks up the rest, making it O(n). But the cache stores 2 tensors (K and V) per layer per head for every token in the sequence. For a 70B model at 128K context, that's ~16 GB just for the cache — often more than the quantized model weights. It's the classic space-time tradeoff: save compute by spending memory."
    />
    <ServingFrameworksSection />
    <OptimizationTechniquesSection />
    <CostOptimizationSection />
    <KnowledgeCheck moduleId="inference" questions={translateQuestions(questions, lang)} />
  </ModuleLayout>
  )
}