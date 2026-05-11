import { useMemo } from 'react'
import { Workspace } from '../../components/Workspace'
import type { WorkspaceSnapshot } from '../../components/Workspace'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { CodeBlock } from '../../components/CodeBlock'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'
import { fineTuningRunSectionSv, fineTuningRunSectionKo } from './tech-translations'

const STEPS: TerminalStep[] = [
  {
    command: 'pip install unsloth transformers datasets trl',
    output: `Successfully installed unsloth-2024.12.4 transformers-4.47.1
  datasets-3.2.0 trl-0.12.2 peft-0.14.0 bitsandbytes-0.45.0`,
    delay: 800,
  },
  {
    command: 'python -c "import torch; print(torch.cuda.get_device_name(0))"',
    output: `NVIDIA A100-SXM4-40GB`,
    delay: 400,
  },
  {
    command: 'python finetune.py --step load_model',
    output: `Loading meta-llama/Llama-3.1-8B-Instruct in 4-bit...
  Quantization: 4-bit NormalFloat (NF4)
  Compute dtype: bfloat16
  Model loaded: 4.65 GB VRAM (was 14.96 GB at FP16)
  Trainable parameters: 0 / 7,505,707,008 (0.00%)`,
    delay: 1000,
  },
  {
    command: 'python finetune.py --step configure_lora',
    output: `Applying LoRA adapter:
    r = 16
    lora_alpha = 32
    target_modules = ["q_proj", "v_proj"]
    lora_dropout = 0.05
  Trainable parameters: 6,553,600 / 7,505,707,008 (0.087%)
  Adapter size: ~16 MB`,
    delay: 600,
  },
  {
    command: 'python finetune.py --step load_data',
    output: `Loading dataset: ./training-data/train.jsonl
  Train examples: 5,000
  Val examples: 500
  Tokenizing... done (avg length: 342 tokens)
  Max sequence length: 2048`,
    delay: 600,
  },
  {
    command: 'python finetune.py --step train',
    output: `Training started — 3 epochs, batch_size=4, grad_accum=4
  Effective batch size: 16 | Steps: 938

  Step  50/938  | Loss: 1.842 | LR: 2.00e-04 | 3.2 it/s
  Step 100/938  | Loss: 1.456 | LR: 2.00e-04 | 3.1 it/s
  Step 200/938  | Loss: 1.103 | LR: 1.96e-04 | 3.2 it/s
  Step 300/938  | Loss: 0.847 | LR: 1.85e-04 | 3.2 it/s
  Step 400/938  | Loss: 0.692 | LR: 1.68e-04 | 3.1 it/s
  Step 500/938  | Loss: 0.581 | LR: 1.46e-04 | 3.2 it/s
  Step 600/938  | Loss: 0.523 | LR: 1.21e-04 | 3.2 it/s
  Step 700/938  | Loss: 0.478 | LR: 9.30e-05 | 3.1 it/s
  Step 800/938  | Loss: 0.451 | LR: 6.18e-05 | 3.2 it/s
  Step 900/938  | Loss: 0.432 | LR: 2.88e-05 | 3.2 it/s
  Step 938/938  | Loss: 0.425 | LR: 0.00e+00 | 3.2 it/s

  Training complete in 4m 53s
  Best val loss: 0.461 (step 850)
  Peak VRAM: 11.2 GB`,
    delay: 2000,
  },
  {
    command: 'python finetune.py --step save',
    output: `Saving LoRA adapter to ./output/lora-adapter/
  Saved: adapter_model.safetensors (16.4 MB)
  Saved: adapter_config.json
  Saved: training_args.json
  ✓ Adapter ready for merging or direct loading`,
    delay: 600,
  },
]

const SNAPSHOTS: Record<number, WorkspaceSnapshot> = {
  [-1]: {
    label: 'ftProjectSetup',
    tree: [
      { name: 'finetune.py', type: 'file', size: '4.2 KB' },
      {
        name: 'training-data',
        type: 'folder',
        children: [
          { name: 'train.jsonl', type: 'file', size: '12.4 MB', annotation: '5K examples' },
          { name: 'val.jsonl', type: 'file', size: '1.2 MB' },
        ],
      },
    ],
    info: 'Starting point: your fine-tuning script and prepared training data.',
  },
  [2]: {
    label: 'ftBaseLoaded',
    tree: [
      { name: 'finetune.py', type: 'file', size: '4.2 KB' },
      {
        name: 'training-data',
        type: 'folder',
        children: [
          { name: 'train.jsonl', type: 'file', size: '12.4 MB' },
          { name: 'val.jsonl', type: 'file', size: '1.2 MB' },
        ],
      },
      {
        name: '~/.cache/huggingface',
        type: 'folder',
        children: [
          { name: 'Llama-3.1-8B-Instruct/', type: 'folder', annotation: '4.65 GB (4-bit)', children: [
            { name: 'model.safetensors', type: 'file', size: '4.65 GB' },
            { name: 'config.json', type: 'file', size: '1.2 KB' },
            { name: 'tokenizer.json', type: 'file', size: '8.5 MB' },
          ]},
        ],
      },
    ],
    info: '4-bit quantized loading: 14.96 GB → 4.65 GB VRAM. Enough room for training on a single A100.',
  },
  [3]: {
    label: 'ftLoraConfigured',
    tree: [
      { name: 'finetune.py', type: 'file', size: '4.2 KB' },
      {
        name: 'training-data',
        type: 'folder',
        children: [
          { name: 'train.jsonl', type: 'file', size: '12.4 MB' },
          { name: 'val.jsonl', type: 'file', size: '1.2 MB' },
        ],
      },
    ],
    info: 'LoRA injects small trainable matrices into q_proj and v_proj. Only 0.087% of parameters are trained — 6.5M out of 7.5B.',
  },
  [5]: {
    label: 'ftTrainingComplete',
    tree: [
      { name: 'finetune.py', type: 'file', size: '4.2 KB' },
      {
        name: 'training-data',
        type: 'folder',
        children: [
          { name: 'train.jsonl', type: 'file', size: '12.4 MB' },
          { name: 'val.jsonl', type: 'file', size: '1.2 MB' },
        ],
      },
      {
        name: 'output',
        type: 'folder',
        children: [
          { name: 'checkpoint-850/', type: 'folder', annotation: 'best val loss', children: [
            { name: 'adapter_model.safetensors', type: 'file', size: '16.4 MB' },
            { name: 'optimizer.pt', type: 'file', size: '33 MB' },
          ]},
          { name: 'training.log', type: 'file', size: '24 KB' },
        ],
      },
    ],
    info: 'Loss dropped from 1.84 → 0.43 over 938 steps. Training took ~5 min on A100. Peak VRAM: 11.2 GB.',
  },
  [6]: {
    label: 'ftAdapterSaved',
    tree: [
      { name: 'finetune.py', type: 'file', size: '4.2 KB' },
      {
        name: 'training-data',
        type: 'folder',
        children: [
          { name: 'train.jsonl', type: 'file', size: '12.4 MB' },
          { name: 'val.jsonl', type: 'file', size: '1.2 MB' },
        ],
      },
      {
        name: 'output',
        type: 'folder',
        children: [
          {
            name: 'lora-adapter',
            type: 'folder',
            annotation: '← 16 MB total',
            children: [
              { name: 'adapter_model.safetensors', type: 'file', size: '16.4 MB', annotation: 'the trained weights' },
              { name: 'adapter_config.json', type: 'file', size: '412 B' },
              { name: 'training_args.json', type: 'file', size: '1.8 KB' },
            ],
          },
        ],
      },
    ],
    info: 'Final adapter: just 16 MB. This tiny file contains everything the model learned during fine-tuning.',
  },
}

const FULL_SCRIPT = `from unsloth import FastLanguageModel
from datasets import load_dataset
from trl import SFTTrainer
from transformers import TrainingArguments

# 1. Load base model in 4-bit
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="meta-llama/Llama-3.1-8B-Instruct",
    max_seq_length=2048,
    load_in_4bit=True,
    dtype=None,  # auto-detect
)

# 2. Configure LoRA
model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
)

# 3. Load and format dataset
dataset = load_dataset("json", data_files={
    "train": "./training-data/train.jsonl",
    "validation": "./training-data/val.jsonl",
})

def format_example(example):
    return {
        "text": f"""<|begin_of_text|><|start_header_id|>user<|end_header_id|>
{example['instruction']}
{example['input']}<|eot_id|><|start_header_id|>assistant<|end_header_id|>
{example['output']}<|eot_id|>"""
    }

dataset = dataset.map(format_example)

# 4. Train
trainer = SFTTrainer(
    model=model,
    train_dataset=dataset["train"],
    eval_dataset=dataset["validation"],
    dataset_text_field="text",
    max_seq_length=2048,
    args=TrainingArguments(
        output_dir="./output",
        num_train_epochs=3,
        per_device_train_batch_size=4,
        gradient_accumulation_steps=4,
        learning_rate=2e-4,
        lr_scheduler_type="cosine",
        warmup_steps=50,
        logging_steps=50,
        eval_strategy="steps",
        eval_steps=100,
        save_strategy="steps",
        save_steps=100,
        bf16=True,
    ),
)

trainer.train()

# 5. Save adapter
model.save_pretrained("./output/lora-adapter")`

const EN_P19 = `LoRA and QLoRA modify the model's weight matrices — they change`
const EN_P18 = `In the training run above, notice step 3:`
const EN_P17 = `The PEFT family: LoRA, QLoRA, and Prefix Tuning`
const EN_P16 = `LoRA and QLoRA modify the model's weight matrices — they change`
const EN_P15 = `In the training run above, notice step 3:`
const EN_P14 = `The PEFT family: LoRA, QLoRA, and Prefix Tuning`
const EN_P13 = `Prefix Tuning — a different approach`
const EN_P3 = `LoRA is the most popular way to fine-tune efficiently, but it&apos;s not the only one. The key question is always the same:`
const EN_P5 = `Here&apos;s the idea: every number in a model&apos;s weights is normally stored with high precision — 16 bits per number (FP16), like measuring with a ruler that has millimeter marks. QLoRA says:`
const EN_P6 = `The LoRA adapter matrices (the small part we&apos;re actually training) still use full precision — they need the fine-grained detail to learn properly. So you get the best of both worlds: a compressed base model that takes up little memory, plus precise adapter training on top.`
const EN_P7 = `You can — but there&apos;s a cliff. At 4 bits, the quality loss from rounding is barely measurable. At 2 bits, the model starts forgetting things — like photocopying a photocopy, each round of compression loses detail. At 1 bit, you&apos;ve essentially reduced every weight to &quot;positive or negative&quot; — the model loses most of its nuance. 4-bit is the sweet spot where you save ~75% memory with &lt;1% quality loss.`
const EN_P8 = `A 70B parameter model normally needs ~140 GB of memory (FP16). With QLoRA, the base model fits in ~35 GB, and you only need a few extra GB for the LoRA adapters. That&apos;s the difference between needing a cluster of GPUs and needing a single high-end GPU.`
const EN_P11 = `Think of it like this: instead of retraining an employee (LoRA), you give them a detailed briefing note at the start of every task (prefix tuning). The employee&apos;s skills don&apos;t change, but the briefing steers their work in the right direction.`
const EN_P12 = `In practice, prefix tuning is simpler but generally less effective than LoRA for most tasks. It was an important early PEFT method (2021), but LoRA has largely superseded it. You&apos;ll still see it in research and in some specialized use cases where you need to switch between many tasks quickly — swapping a prefix is cheaper than swapping an adapter.`
const EN_INTRO = `A complete LoRA fine-tune of Llama 3.1 8B using Unsloth. Click through each step to see the model load, LoRA attach, training progress, and adapter save.`

export const FineTuningRunSection: React.FC = () => {
  const c = useT({ title: '3. The Fine-Tuning Run', intro: EN_INTRO , p3: EN_P3, p5: EN_P5, p6: EN_P6, p7: EN_P7, p8: EN_P8, p11: EN_P11, p12: EN_P12 , p13: EN_P13 , p14: EN_P14 , p15: EN_P15 , p16: EN_P16 , p17: EN_P17 , p18: EN_P18 , p19: EN_P19 }, { sv: fineTuningRunSectionSv, ko: fineTuningRunSectionKo })
  const steps = useMemo(() => STEPS, [])

  return (
    <section aria-labelledby="finetuning-run">
      <h2 id="finetuning-run" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <Workspace
        title="LoRA Fine-Tune — Llama 3.1 8B"
        terminalTitle="fine-tuning"
        steps={steps}
        snapshots={SNAPSHOTS}
      />

      <div className="mt-6">
        <h3 className="mb-3 font-mono text-sm font-semibold tracking-wider text-zinc-400 uppercase">
          Full training script
        </h3>
        <CodeBlock code={FULL_SCRIPT} language="python" title="finetune.py" />
      </div>

      <SelfExplain
        prompt="You just walked through a complete LoRA fine-tuning run. The final adapter was only 16 MB while the base model is 16 GB. Explain why the adapter is so small and what would happen if you tried to use it without the base model."
        modelAnswer="The adapter is small because LoRA only trains low-rank decomposition matrices (A and B) for a few layers, not the full model weights. With rank=16 and target modules q_proj and v_proj, you're training ~0.1% of total parameters. The adapter stores only the delta (ΔW = A×B) — the learned adjustments to the base model's behavior. Without the base model, the adapter is useless: it contains no language understanding, no vocabulary, no general capabilities. It's purely a set of adjustments that modify specific weight matrices in the base model. At inference time, the adapter weights are added to (or merged with) the base model weights to produce the fine-tuned behavior."
      />

      {/* PEFT Landscape */}
      <div className="mt-10">
        <h3 className="mb-3 font-mono text-lg font-semibold text-zinc-100">{c.p17}</h3>
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-zinc-300">
          {c.p3} <strong className="text-zinc-100">how do you teach a
          model new tricks without rewriting its entire brain?</strong>
        </p>

        <div className="mb-6 space-y-4">
          {/* QLoRA explanation */}
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-5">
            <h4 className="mb-2 font-mono text-sm font-semibold text-amber-300">QLoRA — LoRA on a budget</h4>
            <p className="mb-3 text-sm leading-relaxed text-zinc-300">{c.p18}<em className="text-zinc-200">&quot;Loading in 4-bit...
              4.65 GB VRAM (was 14.96 GB at FP16)&quot;</em>. That&apos;s QLoRA in action.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-zinc-300">
              {c.p5} <strong className="text-zinc-100">during training, we don&apos;t need
              that precision for the frozen base weights</strong>. We can round them to 4 bits — like
              using a ruler with only centimeter marks. The base model becomes ~4× smaller in memory.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-zinc-300">
              {c.p6}
            </p>
            <p className="mb-3 text-sm leading-relaxed text-zinc-300">
              <strong className="text-zinc-100">Why not 2-bit or 1-bit?</strong> {c.p7}
            </p>
            <div className="rounded bg-zinc-800/50 px-4 py-3">
              <p className="text-xs text-zinc-400">
                <strong className="text-zinc-300">Practical impact:</strong> {c.p8}
              </p>
            </div>
          </div>

          {/* Prefix Tuning explanation */}
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-5">
            <h4 className="mb-2 font-mono text-sm font-semibold text-purple-300">{c.p13}</h4>
            <p className="mb-3 text-sm leading-relaxed text-zinc-300">{c.p19}<em>how</em> the
              model processes information. Prefix tuning takes a completely different approach: it
              doesn&apos;t touch the weights at all. Instead, it prepends a set of learnable
              &quot;virtual tokens&quot; to the input at every layer.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-zinc-300">
              {c.p11}
            </p>
            <p className="text-sm leading-relaxed text-zinc-300">
              {c.p12}
            </p>
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-hidden rounded-lg border border-zinc-700">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800">
                <th className="px-3 py-2 text-left text-zinc-400">Method</th>
                <th className="px-3 py-2 text-left text-zinc-400">What it changes</th>
                <th className="px-3 py-2 text-left text-zinc-400">Memory</th>
                <th className="px-3 py-2 text-left text-zinc-400">Quality</th>
                <th className="hidden px-3 py-2 text-left text-zinc-400 sm:table-cell">When to use</th>
              </tr>
            </thead>
            <tbody>
              {[
                { method: 'Full fine-tuning', what: 'All weights', memory: 'Very high', quality: 'Highest', when: 'Unlimited budget, maximum control', color: 'text-zinc-300' },
                { method: 'LoRA', what: 'Low-rank adapter matrices', memory: 'Moderate', quality: 'Near-full', when: 'Default choice — best quality/cost ratio', color: 'text-blue-400' },
                { method: 'QLoRA', what: 'Same as LoRA, base model quantized', memory: 'Low', quality: 'Near-full', when: 'Limited GPU memory — single-GPU fine-tuning', color: 'text-amber-400' },
                { method: 'Prefix tuning', what: 'Learnable input prefixes', memory: 'Very low', quality: 'Good', when: 'Many tasks, fast switching, research', color: 'text-purple-400' },
              ].map((row) => (
                <tr key={row.method} className="border-b border-zinc-800 last:border-0">
                  <td className={`px-3 py-2 font-medium ${row.color}`}>{row.method}</td>
                  <td className="px-3 py-2 text-zinc-400">{row.what}</td>
                  <td className="px-3 py-2 text-zinc-400">{row.memory}</td>
                  <td className="px-3 py-2 text-zinc-400">{row.quality}</td>
                  <td className="hidden px-3 py-2 text-zinc-400 sm:table-cell">{row.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
