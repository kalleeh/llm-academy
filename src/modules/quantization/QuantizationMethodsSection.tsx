import { useState, useCallback } from 'react'
import { tArray, useLanguage, useT } from '../../i18n'
import { quantizationMethodsSectionSv, quantizationMethodsSectionKo } from './tech-translations'
import { methodsTranslations } from './data-translations'

interface Method {
  id: string
  name: string
  tagline: string
  howItWorks: string
  pros: string[]
  cons: string[]
  whenToUse: string
  badge?: string
}

const METHODS: Method[] = [
  {
    id: 'gptq',
    name: 'GPTQ',
    tagline: 'Post-training, GPU-optimized quantization',
    howItWorks:
      'GPTQ quantizes weights layer-by-layer using a small calibration dataset (~128 samples). It minimizes the output error of each layer by solving an optimization problem, producing INT4/INT3 weights optimized for GPU inference via CUDA kernels.',
    pros: [
      'Excellent GPU inference speed with optimized kernels',
      'Well-established with broad tooling support',
      'Good quality at INT4 with proper calibration',
    ],
    cons: [
      'Requires calibration data (quality-sensitive)',
      'GPU-only — no CPU inference support',
      'Quantization process is slow (hours for large models)',
    ],
    whenToUse: 'Legacy GPU deployments. Being superseded by AWQ for new projects.',
  },
  {
    id: 'awq',
    name: 'AWQ',
    tagline: 'Activation-aware — the GPU production standard',
    howItWorks:
      'AWQ identifies the most important weights by analyzing activation patterns, then protects those weights during quantization. Instead of treating all weights equally, it preserves the 1% of weights that matter most for quality, achieving better accuracy at the same bit-width.',
    pros: [
      'Best quality-per-bit for GPU inference in 2025–2026',
      'Faster quantization than GPTQ',
      'Excellent vLLM and TGI integration',
    ],
    cons: [
      'GPU-only (no CPU fallback)',
      'Newer ecosystem — fewer pre-quantized models than GPTQ',
      'Requires activation statistics from calibration data',
    ],
    whenToUse: 'Default choice for GPU production serving. Use with vLLM or TGI.',
    badge: '⭐ GPU Default',
  },
  {
    id: 'gguf',
    name: 'GGUF',
    tagline: 'The llama.cpp ecosystem format',
    howItWorks:
      'GGUF is a file format (not just a quantization method) designed for llama.cpp. It bundles model weights, tokenizer, and metadata into a single file. Supports many quantization levels (Q2_K through Q8_0) with mixed-precision: important layers get more bits, less important layers get fewer.',
    pros: [
      'Runs on CPU, GPU, or mixed (CPU offload)',
      'Single-file format — easy to distribute',
      'Huge ecosystem: Ollama, LM Studio, llama.cpp',
      'Many quant levels for fine-grained size/quality control',
    ],
    cons: [
      'Slower than AWQ/GPTQ on pure GPU inference',
      'Quality can vary between quant levels',
      'Format is llama.cpp-specific',
    ],
    whenToUse: 'Local inference, Ollama, LM Studio, or any CPU/hybrid deployment.',
    badge: '⭐ Local Default',
  },
  {
    id: 'bnb',
    name: 'BitsAndBytes',
    tagline: 'Easy integration for training and inference',
    howItWorks:
      'BitsAndBytes provides on-the-fly quantization integrated directly into the HuggingFace Transformers library. Load any model in 4-bit or 8-bit with a single flag. Most importantly, it enables QLoRA — fine-tuning a 4-bit quantized model with LoRA adapters, making fine-tuning accessible on consumer GPUs.',
    pros: [
      'One-line integration with HuggingFace',
      'Enables QLoRA fine-tuning on consumer GPUs',
      'No separate quantization step needed',
    ],
    cons: [
      'Slower inference than GPTQ/AWQ',
      'Not ideal for production serving',
      'NVIDIA GPU required',
    ],
    whenToUse: 'Fine-tuning with QLoRA, or quick experimentation. Not for production serving.',
  },
]

const EN_INTRO = `Four main approaches dominate the ecosystem. Each targets a different use case.`

export const QuantizationMethodsSection: React.FC = () => {
  const { lang } = useLanguage()
  const mETHODST = tArray(lang, METHODS, methodsTranslations)
  const c = useT({ title: '2. Quantization Methods', intro: EN_INTRO }, { sv: quantizationMethodsSectionSv, ko: quantizationMethodsSectionKo })
  const [activeTab, setActiveTab] = useState(0)
  const method = METHODS[activeTab]

  const selectTab = useCallback((i: number) => setActiveTab(i), [])

  return (
    <section aria-labelledby="quant-methods">
      <h2 id="quant-methods" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {mETHODST.map((m, i) => (
          <button
            key={m.id}
            onClick={() => selectTab(i)}
            className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
              activeTab === i
                ? 'border-zinc-500 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
            }`}
            aria-pressed={activeTab === i}
          >
            {m.name}
            {m.badge && <span className="ml-2 text-xs text-amber-700 dark:text-amber-400">{m.badge}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <div className="mb-4">
          <h3 className="font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">{method.name}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{method.tagline}</p>
        </div>

        <div className="mb-4">
          <h4 className="mb-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            How it works
          </h4>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{method.howItWorks}</p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-md bg-green-50 dark:bg-green-500/10 p-3">
            <span className="text-xs font-medium text-green-700 dark:text-green-400">✓ Pros</span>
            <ul className="mt-2 space-y-1">
              {method.pros.map((p) => (
                <li key={p} className="text-sm text-zinc-700 dark:text-zinc-300">• {p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md bg-red-50 dark:bg-red-500/10 p-3">
            <span className="text-xs font-medium text-red-700 dark:text-red-400">✗ Cons</span>
            <ul className="mt-2 space-y-1">
              {method.cons.map((c) => (
                <li key={c} className="text-sm text-zinc-700 dark:text-zinc-300">• {c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 p-3">
          <span className="text-xs font-medium text-amber-700 dark:text-amber-400">When to use</span>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{method.whenToUse}</p>
        </div>
      </div>
    </section>
  )
}
