import { useMemo } from 'react'
import { Workspace } from '../../components/Workspace'
import type { WorkspaceSnapshot } from '../../components/Workspace'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { useT } from '../../useT'
import { evaluationMergingSectionSv, evaluationMergingSectionKo } from './tech-translations'

const STEPS: TerminalStep[] = [
  {
    command: 'python evaluate.py --model base --prompt "Extract ICD-10 codes: Patient presents with acute bronchitis and mild asthma."',
    output: `[Base model — Llama 3.1 8B Instruct]
> The patient has bronchitis and asthma. Bronchitis is an inflammation
  of the bronchial tubes. Asthma is a chronic condition...

  ❌ No ICD-10 codes extracted. Model gave a general explanation.`,
    delay: 800,
  },
  {
    command: 'python evaluate.py --model finetuned --prompt "Extract ICD-10 codes: Patient presents with acute bronchitis and mild asthma."',
    output: `[Fine-tuned model — LoRA adapter loaded]
> ICD-10 codes:
  - J20.9: Acute bronchitis, unspecified
  - J45.20: Mild intermittent asthma, uncomplicated
  Primary: J20.9

  ✓ Correct codes, correct format, correct primary designation.`,
    delay: 800,
  },
  {
    command: 'python evaluate.py --run-eval --test-file ./training-data/test.jsonl',
    output: `Running evaluation on 250 test examples...

  Exact match:     78.4%  (196/250)
  Code accuracy:   91.2%  (correct codes, any order)
  Format accuracy: 98.8%  (valid structured output)
  Hallucination:    1.6%  (codes not in reference)

  Baseline (zero-shot Llama 3.1 8B):
  Exact match:     12.0%
  Code accuracy:   34.8%
  Format accuracy: 23.2%`,
    delay: 1200,
  },
  {
    command: 'python merge_adapter.py --base meta-llama/Llama-3.1-8B-Instruct --adapter ./output/lora-adapter --output ./merged-model',
    output: `Loading base model (FP16)...
  Loading LoRA adapter (16 MB)...
  Merging weights into base model...
  [████████████████████████████████] 32/32 layers merged
  Saving merged model...
  Written: ./merged-model/ (14.96 GB)
  ✓ Standalone model — no adapter needed at inference`,
    delay: 1000,
  },
  {
    command: 'python convert_to_gguf.py ./merged-model --quantize Q4_K_M --output ./llama-medical.Q4_K_M.gguf',
    output: `Converting merged model to GGUF...
  Architecture: LlamaForCausalLM
  Tensors: 291
  Quantizing with Q4_K_M...
  Original:   14.96 GB (FP16)
  Quantized:   4.37 GB (Q4_K_M)
  Compression: 3.42x
  Written: ./llama-medical.Q4_K_M.gguf`,
    delay: 1000,
  },
  {
    command: 'ollama create medical-coder -f Modelfile && ollama run medical-coder "Extract ICD-10: Diabetic patient with stage 3 CKD"',
    output: `transferring model data ████████████████ 100%
  creating model layer... success

  > ICD-10 codes:
    - E11.22: Type 2 diabetes with CKD
    - N18.3: Chronic kidney disease, stage 3
    Primary: E11.22

  ✓ Running locally via Ollama at 42 tokens/sec`,
    delay: 800,
  },
]

const SNAPSHOTS: Record<number, WorkspaceSnapshot> = {
  [-1]: {
    label: 'Starting with trained adapter',
    tree: [
      {
        name: 'output',
        type: 'folder',
        children: [
          {
            name: 'lora-adapter',
            type: 'folder',
            children: [
              { name: 'adapter_model.safetensors', type: 'file', size: '16.4 MB' },
              { name: 'adapter_config.json', type: 'file', size: '412 B' },
            ],
          },
        ],
      },
      {
        name: 'training-data',
        type: 'folder',
        children: [
          { name: 'test.jsonl', type: 'file', size: '620 KB', annotation: '250 examples' },
        ],
      },
    ],
    info: 'Starting with the LoRA adapter from training. Time to evaluate, merge, and deploy.',
  },
  [2]: {
    label: 'Evaluation complete',
    tree: [
      {
        name: 'output',
        type: 'folder',
        children: [
          { name: 'lora-adapter/', type: 'folder' },
          { name: 'eval_results.json', type: 'file', size: '4.2 KB', annotation: '91.2% accuracy' },
        ],
      },
    ],
    info: 'Fine-tuned model: 91.2% code accuracy vs 34.8% baseline. Format compliance jumped from 23% to 99%.',
  },
  [3]: {
    label: 'Merged model (standalone)',
    tree: [
      {
        name: 'output',
        type: 'folder',
        children: [{ name: 'lora-adapter/', type: 'folder' }],
      },
      {
        name: 'merged-model',
        type: 'folder',
        annotation: '14.96 GB',
        children: [
          { name: 'model-00001-of-00003.safetensors', type: 'file', size: '5.0 GB' },
          { name: 'model-00002-of-00003.safetensors', type: 'file', size: '5.0 GB' },
          { name: 'model-00003-of-00003.safetensors', type: 'file', size: '4.96 GB' },
          { name: 'config.json', type: 'file', size: '1.2 KB' },
          { name: 'tokenizer.json', type: 'file', size: '8.5 MB' },
        ],
      },
    ],
    info: 'Base (14 GB) + Adapter (16 MB) → Merged (14.96 GB). The adapter weights are baked into the model.',
  },
  [4]: {
    label: 'Quantized GGUF',
    tree: [
      { name: 'merged-model/', type: 'folder', annotation: '14.96 GB' },
      { name: 'llama-medical.Q4_K_M.gguf', type: 'file', size: '4.37 GB', annotation: '← runs on laptop' },
    ],
    info: 'Merged 14.96 GB → Quantized 4.37 GB. Ready for local inference with llama.cpp or Ollama.',
  },
  [5]: {
    label: 'Running locally via Ollama',
    tree: [
      { name: 'llama-medical.Q4_K_M.gguf', type: 'file', size: '4.37 GB' },
      { name: 'Modelfile', type: 'file', size: '156 B' },
      {
        name: '~/.ollama/models',
        type: 'folder',
        children: [
          { name: 'medical-coder', type: 'file', size: '4.37 GB', annotation: '42 tok/s' },
        ],
      },
    ],
    info: 'Full pipeline: 14 GB base + 16 MB adapter → 14.96 GB merged → 4.37 GB GGUF → local Ollama model.',
  },
}

const EN_INTRO = `Test the fine-tuned model, compare before vs after, merge the LoRA adapter into the base model.`

export const EvaluationMergingSection: React.FC = () => {
  const c = useT({ title: '4. Evaluation & Merging', intro: EN_INTRO }, { sv: evaluationMergingSectionSv, ko: evaluationMergingSectionKo })
  const steps = useMemo(() => STEPS, [])

  return (
    <section aria-labelledby="eval-merging">
      <h2 id="eval-merging" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <Workspace
        title="Evaluate → Merge → Deploy"
        terminalTitle="evaluation"
        steps={steps}
        snapshots={SNAPSHOTS}
      />

      <div className="mt-6 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <p className="mb-2 text-sm font-semibold text-amber-400">Size pipeline</p>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-300">
          <span className="rounded bg-zinc-700 px-2 py-1">Base: 14 GB</span>
          <span className="text-zinc-500">+</span>
          <span className="rounded bg-amber-900/40 px-2 py-1 text-amber-300">Adapter: 16 MB</span>
          <span className="text-zinc-500">→</span>
          <span className="rounded bg-zinc-700 px-2 py-1">Merged: 14.96 GB</span>
          <span className="text-zinc-500">→</span>
          <span className="rounded bg-green-900/40 px-2 py-1 text-green-300">GGUF Q4: 4.37 GB</span>
        </div>
      </div>
    </section>
  )
}
