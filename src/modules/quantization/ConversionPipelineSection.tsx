import { useMemo } from 'react'
import { Workspace } from '../../components/Workspace'
import type { WorkspaceSnapshot } from '../../components/Workspace'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { useT } from '../../i18n'
import { conversionPipelineSectionSv, conversionPipelineSectionKo } from './tech-translations'

const STEPS: TerminalStep[] = [
  {
    command: 'ls -lh ./mistral-7b-instruct/',
    output: `total 14G
-rw-r--r-- 1 user user 4.7G model-00001-of-00003.safetensors
-rw-r--r-- 1 user user 4.7G model-00002-of-00003.safetensors
-rw-r--r-- 1 user user 4.6G model-00003-of-00003.safetensors
-rw-r--r-- 1 user user  587 config.json
-rw-r--r-- 1 user user 489K tokenizer.model
-rw-r--r-- 1 user user 1.8K tokenizer_config.json`,
    delay: 400,
  },
  {
    command: 'pip install llama-cpp-python huggingface-hub',
    output: `Successfully installed llama-cpp-python-0.3.4 huggingface-hub-0.27.1`,
    delay: 800,
  },
  {
    command: 'python convert_hf_to_gguf.py ./mistral-7b-instruct/ --outtype f16 --outfile mistral-7b.f16.gguf',
    output: `Loading model: mistral-7b-instruct
  Model architecture: MistralForCausalLM
  Converting 291 tensors...
  [████████████████████████████████] 291/291
  Model size: 14.5 GiB (16.0 BPW)
  Written: mistral-7b.f16.gguf (14.5 GiB)`,
    delay: 1200,
  },
  {
    command: 'llama-quantize mistral-7b.f16.gguf mistral-7b.Q4_K_M.gguf Q4_K_M',
    output: `Quantizing model with Q4_K_M...
  Original size:  14500.0 MiB
  Quantized size:  4073.4 MiB (4.83 BPW)
  Compression ratio: 3.56x
  Written: mistral-7b.Q4_K_M.gguf (4.0 GiB)`,
    delay: 1000,
  },
  {
    command: 'cat Modelfile',
    output: `FROM ./mistral-7b.Q4_K_M.gguf
TEMPLATE "{{ .System }}\\n{{ .Prompt }}"
PARAMETER temperature 0.7
PARAMETER num_ctx 8192`,
    delay: 300,
  },
  {
    command: 'ollama create mistral-local -f Modelfile',
    output: `transferring model data ████████████████ 100%
  creating model layer
  creating template layer
  creating parameters layer
  writing manifest
  success`,
    delay: 800,
  },
  {
    command: 'ollama run mistral-local "Explain quantization in one sentence."',
    output: `Quantization reduces the numerical precision of model weights from 32-bit
floats to smaller formats like 4-bit integers, shrinking the model by ~4x
while retaining most of its capability.`,
    delay: 600,
  },
]

const SNAPSHOTS: Record<number, WorkspaceSnapshot> = {
  [-1]: {
    label: 'cpOriginal',
    tree: [
      {
        name: 'mistral-7b-instruct',
        type: 'folder',
        children: [
          { name: 'model-00001-of-00003.safetensors', type: 'file', size: '4.7 GB', annotation: 'shard 1' },
          { name: 'model-00002-of-00003.safetensors', type: 'file', size: '4.7 GB', annotation: 'shard 2' },
          { name: 'model-00003-of-00003.safetensors', type: 'file', size: '4.6 GB', annotation: 'shard 3' },
          { name: 'config.json', type: 'file', size: '587 B' },
          { name: 'tokenizer.model', type: 'file', size: '489 KB' },
          { name: 'tokenizer_config.json', type: 'file', size: '1.8 KB' },
        ],
      },
    ],
    info: 'Starting point: a HuggingFace model in SafeTensors format. 3 shards totaling ~14 GB at FP16 precision.',
  },
  [2]: {
    label: 'cpGgufFp16',
    tree: [
      {
        name: 'mistral-7b-instruct',
        type: 'folder',
        children: [
          { name: 'model-00001-of-00003.safetensors', type: 'file', size: '4.7 GB' },
          { name: 'model-00002-of-00003.safetensors', type: 'file', size: '4.7 GB' },
          { name: 'model-00003-of-00003.safetensors', type: 'file', size: '4.6 GB' },
          { name: 'config.json', type: 'file', size: '587 B' },
          { name: 'tokenizer.model', type: 'file', size: '489 KB' },
          { name: 'tokenizer_config.json', type: 'file', size: '1.8 KB' },
        ],
      },
      { name: 'mistral-7b.f16.gguf', type: 'file', size: '14.5 GB', annotation: '← FP16 GGUF' },
    ],
    info: 'Converted to GGUF format at FP16. Same size, but now in a single file with embedded tokenizer and metadata.',
  },
  [3]: {
    label: 'cpQuantized',
    tree: [
      {
        name: 'mistral-7b-instruct',
        type: 'folder',
        children: [
          { name: 'model-00001-of-00003.safetensors', type: 'file', size: '4.7 GB' },
          { name: 'model-00002-of-00003.safetensors', type: 'file', size: '4.7 GB' },
          { name: 'model-00003-of-00003.safetensors', type: 'file', size: '4.6 GB' },
          { name: 'config.json', type: 'file', size: '587 B' },
          { name: 'tokenizer.model', type: 'file', size: '489 KB' },
          { name: 'tokenizer_config.json', type: 'file', size: '1.8 KB' },
        ],
      },
      { name: 'mistral-7b.f16.gguf', type: 'file', size: '14.5 GB' },
      { name: 'mistral-7b.Q4_K_M.gguf', type: 'file', size: '4.0 GB', annotation: '← 3.6x smaller!' },
    ],
    info: 'Q4_K_M quantization: 14.5 GB → 4.0 GB. Mixed precision — attention layers get more bits, FFN layers get fewer.',
  },
  [4]: {
    label: 'cpModelfile',
    tree: [
      {
        name: 'mistral-7b-instruct',
        type: 'folder',
        children: [
          { name: 'model-00001-of-00003.safetensors', type: 'file', size: '4.7 GB' },
          { name: 'model-00002-of-00003.safetensors', type: 'file', size: '4.7 GB' },
          { name: 'model-00003-of-00003.safetensors', type: 'file', size: '4.6 GB' },
          { name: 'config.json', type: 'file', size: '587 B' },
          { name: 'tokenizer.model', type: 'file', size: '489 KB' },
          { name: 'tokenizer_config.json', type: 'file', size: '1.8 KB' },
        ],
      },
      { name: 'mistral-7b.f16.gguf', type: 'file', size: '14.5 GB' },
      { name: 'mistral-7b.Q4_K_M.gguf', type: 'file', size: '4.0 GB' },
      { name: 'Modelfile', type: 'file', size: '112 B', annotation: '← Ollama config' },
    ],
    info: 'Modelfile tells Ollama how to load the GGUF: which file, prompt template, and inference parameters.',
  },
  [5]: {
    label: 'cpRegistered',
    tree: [
      { name: 'mistral-7b.Q4_K_M.gguf', type: 'file', size: '4.0 GB' },
      { name: 'Modelfile', type: 'file', size: '112 B' },
      {
        name: '~/.ollama/models',
        type: 'folder',
        children: [
          { name: 'mistral-local', type: 'file', size: '4.0 GB', annotation: '← ready to run' },
        ],
      },
    ],
    info: 'Model registered with Ollama. You can now run it with `ollama run mistral-local`.',
  },
}

const EN_P2 = `SafeTensors (14 GB, 3 shards) → GGUF FP16 (14.5 GB, single file) → GGUF Q4_K_M (4 GB, quantized) → Ollama model. The final model runs on a laptop with 8 GB RAM.`
const EN_INTRO = `Walk through the real process: take a HuggingFace model, convert it to GGUF, and quantize it.`

export const ConversionPipelineSection: React.FC = () => {
  const c = useT({ title: '3. The Conversion Pipeline', intro: EN_INTRO , p2: EN_P2 }, { sv: conversionPipelineSectionSv, ko: conversionPipelineSectionKo })
  const steps = useMemo(() => STEPS, [])

  return (
    <section aria-labelledby="conversion-pipeline">
      <h2 id="conversion-pipeline" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <Workspace
        title="SafeTensors → GGUF → Ollama"
        terminalTitle="conversion-pipeline"
        steps={steps}
        snapshots={SNAPSHOTS}
      />

      <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <p className="text-sm leading-relaxed text-zinc-400">
          <strong className="text-amber-400">Pipeline summary:</strong> {c.p2}
        </p>
      </div>
    </section>
  )
}
