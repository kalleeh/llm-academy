import { tArray, useLanguage, useT } from '../../i18n'
import { trainingSection4Sv, trainingSection4Ko } from './tech-translations'
import { useState, useCallback } from 'react'
import { CodeBlock } from '../../components/CodeBlock'
import { Workspace } from '../../components/Workspace'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import type { FileNode } from '../../components/FileExplorer'
import type { WorkspaceSnapshot } from '../../components/Workspace'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { variantsTranslations } from './data-translations'

interface Variant {
  id: string
  label: string
  emoji: IconName
  cost: string
  time: string
  data: string
  desc: string
  code: string
  steps: TerminalStep[]
  snapshots: Record<number, WorkspaceSnapshot>
}

function makeSnapshots(tree: FileNode[], info: string): Record<number, WorkspaceSnapshot> {
  return { [-1]: { tree: [], label: 'No files yet — run the command', info: 'Click "Run" in the terminal to start.' }, [0]: { tree, label: 'Result', info } }
}

const VARIANTS: Variant[] = [
  {
    id: 'scratch',
    label: 'From Scratch',
    emoji: 'build',
    cost: '$73 – $100M+',
    time: '3 hours (GPT-2) to months (frontier)',
    data: 'Billions to trillions of tokens',
    desc: 'Build the entire model from random weights. nanochat can reproduce GPT-2 capability on 8× H100 in ~3 hours for ~$73 — a task that cost $50,000 in 2019. Frontier models still cost millions.',
    code: `# nanochat: reproduce GPT-2 on 8× H100
# The --depth flag is the ONLY dial — everything else is auto-calculated
bash runs/speedrun.sh   # or manually:

OMP_NUM_THREADS=1 torchrun --standalone --nproc_per_node=8 \\
  -m scripts.base_train -- --depth=26

# depth=12 → 124M params (GPT-2 Small, ~5 min, ~$1)
# depth=26 → 1.6B params (GPT-2, ~3 hrs, ~$73)
# All hyperparams (width, heads, LR, schedule) auto-scale`,
    steps: [
      { command: 'bash runs/speedrun.sh', output: 'nanochat speedrun | depth=26 | 8× H100\nAuto: width=1280, heads=10, params=1.6B, lr=6e-4\nDataset: NVIDIA ClimbMix\n\n...training for ~3 hours...\n\n✓ CORE metric: 0.2585 (GPT-2 baseline: 0.2565)\n  Wall time: ~3h | Cost: ~$73\n  Model saved: logs/d26/model.pt', delay: 1000 },
    ],
    snapshots: makeSnapshots(
      [{ name: 'logs/', type: 'folder', children: [
        { name: 'd26/', type: 'folder', children: [
          { name: 'model.pt', type: 'file', size: '3.2 GB', annotation: '✓ Trained from scratch' },
          { name: 'state_step019531.pt', type: 'file', size: '9.6 GB', annotation: '← Full checkpoint + optimizer' },
        ]},
      ]}],
      'GPT-2 capability reproduced for ~$73. In 2019 this cost ~$43,000 — 600× cheaper thanks to 7 years of hardware + software progress.',
    ),
  },
  {
    id: 'continued',
    label: 'Continued Pre-training',
    emoji: 'books',
    cost: '$10K – $500K',
    time: 'Days to weeks',
    data: 'Billions of tokens (domain-specific)',
    desc: 'Start from an existing model and keep training on new domain data. Same architecture, shifted weights.',
    code: `# Continued pre-training on domain data
python train.py \\
  --model_name meta-llama/Llama-3-8B \\
  --data /data/medical_corpus \\
  --epochs 1 \\
  --lr 2e-5 \\
  --gpus 4`,
    steps: [
      { command: 'python train.py --model_name meta-llama/Llama-3-8B --data /data/medical_corpus', output: 'Loading base model: Llama-3-8B\nContinued pre-training on medical corpus (50B tokens)\nEstimated time: 3 days\nEstimated cost: ~$15K\n\n✓ Training complete. Model saved to ./output-model/', delay: 800 },
    ],
    snapshots: makeSnapshots(
      [
        { name: 'base-model/', type: 'folder', children: [
          { name: 'model-00001-of-00004.safetensors', type: 'file', size: '3.5 GB', annotation: '← Starting point (unchanged)' },
          { name: 'config.json', type: 'file', size: '1.2 KB' },
        ]},
        { name: 'output-model/', type: 'folder', annotation: '← NEW', children: [
          { name: 'model-00001-of-00004.safetensors', type: 'file', size: '3.5 GB', annotation: '← Updated weights' },
          { name: 'config.json', type: 'file', size: '1.2 KB', annotation: '← Same architecture' },
        ]},
      ],
      'Same architecture, shifted weights. The model now has medical domain knowledge on top of general language understanding.',
    ),
  },
  {
    id: 'finetune',
    label: 'Full Fine-tuning',
    emoji: 'target',
    cost: '$100 – $10K',
    time: 'Hours to days',
    data: 'Thousands to millions of examples',
    desc: 'Update ALL weights on a specific task dataset. Same structure, all weights change.',
    code: `# Full fine-tuning with Hugging Face
from transformers import Trainer, TrainingArguments

training_args = TrainingArguments(
    output_dir="./finetuned-model",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    learning_rate=2e-5,
    bf16=True,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
)
trainer.train()`,
    steps: [
      { command: 'python finetune.py --model meta-llama/Llama-3-8B --dataset ./chat_data.jsonl', output: 'Fine-tuning all 8B parameters\nDataset: 50,000 examples\nEstimated time: 4 hours on 1x A100\nEstimated cost: ~$8\n\n✓ Fine-tuning complete. Model saved to ./finetuned-model/', delay: 800 },
    ],
    snapshots: makeSnapshots(
      [{ name: 'finetuned-model/', type: 'folder', children: [
        { name: 'model-00001-of-00004.safetensors', type: 'file', size: '3.5 GB', annotation: '← All weights updated' },
        { name: 'model-00002-of-00004.safetensors', type: 'file', size: '3.5 GB' },
        { name: 'model-00003-of-00004.safetensors', type: 'file', size: '3.5 GB' },
        { name: 'model-00004-of-00004.safetensors', type: 'file', size: '2.8 GB' },
        { name: 'config.json', type: 'file', size: '1.2 KB' },
      ]}],
      'Looks identical to the base model — same files, same sizes. But every weight has been adjusted for your task.',
    ),
  },
  {
    id: 'lora',
    label: 'LoRA',
    emoji: 'puzzle',
    cost: '$10 – $100',
    time: 'Minutes to hours',
    data: 'Hundreds to thousands of examples',
    desc: 'Freeze the base model. Train tiny adapter matrices that sit alongside the frozen weights. Two separate folders.',
    code: `# LoRA fine-tuning with PEFT
from peft import LoraConfig, get_peft_model

lora_config = LoraConfig(
    r=16,              # rank — smaller = fewer params
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
)

model = get_peft_model(base_model, lora_config)
# Trainable params: 4.2M / 8B (0.05%)
model.print_trainable_parameters()`,
    steps: [
      { command: 'python lora_train.py --model meta-llama/Llama-3-8B --rank 16 --dataset ./chat_data.jsonl', output: 'Trainable parameters: 4,194,304 / 8,030,261,248 (0.05%)\nBase model: frozen\nAdapter size: ~16 MB\nEstimated time: 20 minutes on 1x A100\nEstimated cost: ~$0.50\n\n✓ LoRA training complete. Adapter saved to ./lora-adapter/', delay: 800 },
    ],
    snapshots: makeSnapshots(
      [
        { name: 'base-model/', type: 'folder', children: [
          { name: 'model-00001-of-00004.safetensors', type: 'file', size: '3.5 GB', annotation: 'Frozen (unchanged)' },
          { name: 'model-00002-of-00004.safetensors', type: 'file', size: '3.5 GB', annotation: 'Frozen' },
          { name: 'config.json', type: 'file', size: '1.2 KB' },
        ]},
        { name: 'lora-adapter/', type: 'folder', annotation: '← NEW (tiny!)', children: [
          { name: 'adapter_model.safetensors', type: 'file', size: '16 MB', annotation: '← Only trained part' },
          { name: 'adapter_config.json', type: 'file', size: '512 B', annotation: '← LoRA hyperparams' },
        ]},
      ],
      'The base model is completely untouched. Your entire fine-tuning result is a 16 MB adapter file — 0.05% of the base model size.',
    ),
  },
]

const EN_P2 = `Training from scratch is just one option — and the most expensive. Most people start from an existing model and adapt it. Click each approach to compare, then run the terminal command to see the filesystem change.`
export const TrainingSection4: React.FC = () => {
  const { lang } = useLanguage()
  const vARIANTST = tArray(lang, VARIANTS, variantsTranslations)
  const c = useT({ title: '4. Training Variants' , p2: EN_P2 }, { sv: trainingSection4Sv, ko: trainingSection4Ko })
  const [selected, setSelected] = useState('scratch')
  const variant = VARIANTS.find(v => v.id === selected)!

  const handleSelect = useCallback((id: string) => {
    setSelected(id)
  }, [])

  return (
    <section className="space-y-6" aria-labelledby="section-4-heading">
      <h3 id="section-4-heading" className="font-mono text-xl font-bold text-zinc-100">{c.title}</h3>
      <p className="text-zinc-400 leading-relaxed">
        {c.p2}
      </p>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Training variant selection">
        {vARIANTST.map(v => (
          <button
            key={v.id}
            role="tab"
            aria-selected={selected === v.id}
            onClick={() => handleSelect(v.id)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
              selected === v.id
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-300'
                : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
            }`}
          >
            <Icon name={v.emoji} /> {v.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 sm:grid-cols-3" role="tabpanel">
        <div className="rounded bg-zinc-800/50 p-3 text-center">
          <div className="text-xs text-zinc-500">Cost</div>
          <div className="mt-1 font-mono text-sm font-bold text-green-400">{variant.cost}</div>
        </div>
        <div className="rounded bg-zinc-800/50 p-3 text-center">
          <div className="text-xs text-zinc-500">Time</div>
          <div className="mt-1 font-mono text-sm font-bold text-blue-400">{variant.time}</div>
        </div>
        <div className="rounded bg-zinc-800/50 p-3 text-center">
          <div className="text-xs text-zinc-500">Data needed</div>
          <div className="mt-1 font-mono text-sm font-bold text-purple-400">{variant.data}</div>
        </div>
      </div>

      <p className="text-sm text-zinc-400">{variant.desc}</p>

      <Workspace
        key={variant.id}
        title={variant.label}
        terminalTitle={`terminal — ${variant.label.toLowerCase()}`}
        steps={variant.steps}
        snapshots={variant.snapshots}
      />

      <CodeBlock code={variant.code} language="python" title={`${variant.label} — code`} />
    </section>
  )
}
