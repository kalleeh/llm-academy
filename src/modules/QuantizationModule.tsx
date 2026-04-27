import { translateQuestions } from '../quiz-translations'
import { useLanguage } from '../LanguageContext'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { SelfExplain } from '../components/SelfExplain'
import { WhatIsQuantizationSection } from './quantization/WhatIsQuantizationSection'
import { QuantizationMethodsSection } from './quantization/QuantizationMethodsSection'
import { ConversionPipelineSection } from './quantization/ConversionPipelineSection'
import { QualityVsSizeSection } from './quantization/QualityVsSizeSection'
import { ModuleLayout } from '../components/ModuleLayout'

const questions: Question[] = [
  {
    id: 'quant-1',
    type: 'free',
    question:
      'Why is quantization essential for running LLMs locally? Explain the memory math for a 70B parameter model.',
    modelAnswer:
      'A 70B model at FP16 needs 70B × 2 bytes = 140 GB — far more than any consumer GPU (24 GB max). At INT4, it\'s 70B × 0.5 bytes = 35 GB, which fits on 2× 24 GB GPUs or a single high-end card with offloading. Without quantization, running large models locally is physically impossible due to memory constraints. Quantization makes the impossible possible with ~5-7% quality loss.',
    explanation:
      'The memory equation is simple: parameters × bytes_per_weight. Quantization reduces bytes_per_weight, making large models fit in limited hardware.',
  },
  {
    id: 'quant-2',
    type: 'mc',
    question: 'What is the key tradeoff between INT4 and INT8 quantization?',
    options: [
      'INT4 is faster to quantize but INT8 produces smaller files',
      'INT4 halves memory vs INT8 but loses more quality, especially on reasoning-heavy tasks',
      'INT8 requires calibration data but INT4 does not',
      'There is no meaningful difference — both produce identical quality',
    ],
    correctIndex: 1,
    explanation:
      'INT4 uses half the bits of INT8, so models are ~50% smaller. But the reduced precision means more information loss, which shows up most on tasks requiring precise reasoning, math, or code generation.',
  },
  {
    id: 'quant-3',
    type: 'mc',
    question: 'When would you choose GGUF over GPTQ for quantization?',
    options: [
      'When deploying on NVIDIA GPUs with vLLM',
      'When running on CPU or mixed CPU+GPU setups with llama.cpp',
      'When you need the highest possible quality regardless of speed',
      'When the model has more than 100B parameters',
    ],
    correctIndex: 1,
    explanation:
      'GGUF is the native format for llama.cpp, optimized for CPU and mixed CPU+GPU inference. GPTQ is GPU-focused and works with frameworks like vLLM and text-generation-inference. Choose based on your hardware.',
  },
  {
    id: 'quant-4',
    type: 'free',
    question:
      'You have a 13B model and need to choose between Q4_K_M and Q8_0 GGUF quantization. Your machine has 16 GB RAM. Walk through your decision.',
    modelAnswer:
      'Q8_0 of a 13B model ≈ 13 GB — it fits in 16 GB RAM but leaves almost no room for the KV cache or OS. Q4_K_M ≈ 7 GB, leaving ~9 GB for KV cache and system overhead. For any context length beyond a few hundred tokens, Q4_K_M is the practical choice. Q8_0 would only work for very short contexts. The quality difference (Q4_K_M ≈ 93% vs Q8_0 ≈ 98%) is usually acceptable for the massive memory savings.',
    explanation:
      'Quantization decisions aren\'t just about quality — you must account for KV cache memory, OS overhead, and your actual context length requirements.',
  },
]

export const QuantizationModule: React.FC = () => {
  const { lang } = useLanguage()
  return (
  <ModuleLayout moduleId="quantization" title="Quantization &amp; Formats" subtitle="How to shrink a 14 GB model to 4 GB and run it on a laptop. Precision tradeoffs,
        quantization methods, the conversion pipeline, and finding the sweet spot.">
    <WhatIsQuantizationSection />
    <SelfExplain
      prompt="You just dragged the precision slider from FP32 down to INT4 and saw the memory savings. Explain in your own words why going from 32 bits to 4 bits doesn't destroy the model's quality — what makes this compression work?"
      modelAnswer="Neural network weights are highly redundant — most weights cluster around small values and the precise value matters less than the relative relationships between weights. Quantization works because: 1) the model has billions of parameters, so small per-weight errors average out, 2) modern quantization methods (like GPTQ/AWQ) calibrate on real data to minimize the error that matters most, and 3) the model's learned representations are robust to noise — a weight of 0.0312 vs 0.0315 doesn't change the output meaningfully. It's lossy compression that exploits the redundancy in neural networks."
    />
    <QuantizationMethodsSection />
    <ConversionPipelineSection />
    <QualityVsSizeSection />
    <KnowledgeCheck moduleId="quantization" questions={translateQuestions(questions, lang)} />
  </ModuleLayout>
  )
}