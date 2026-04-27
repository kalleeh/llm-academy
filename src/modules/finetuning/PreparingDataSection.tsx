import { useState, useCallback, useMemo } from 'react'
import { Icon } from '../../components/Icon'
import { CodeBlock } from '../../components/CodeBlock'
import { FileExplorer } from '../../components/FileExplorer'
import type { FileNode } from '../../components/FileExplorer'
import { useT } from '../../useT'
import { preparingDataSectionSv, preparingDataSectionKo } from './tech-translations'

type Format = 'instruction' | 'chat' | 'preference'

const FORMAT_EXAMPLES: Record<Format, { label: string; description: string; code: string }> = {
  instruction: {
    label: 'Instruction Format',
    description: 'Best for single-turn tasks: classification, summarization, extraction.',
    code: `{
  "instruction": "Extract the company name and revenue from this text.",
  "input": "Acme Corp reported Q3 revenue of $4.2B, up 15% YoY.",
  "output": "Company: Acme Corp\\nRevenue: $4.2B"
}`,
  },
  chat: {
    label: 'Chat Format',
    description: 'Best for conversational models and multi-turn interactions.',
    code: `{
  "messages": [
    {"role": "system", "content": "You are a medical coding assistant."},
    {"role": "user", "content": "Patient has type 2 diabetes with neuropathy."},
    {"role": "assistant", "content": "ICD-10 codes:\\n- E11.40: Type 2 diabetes with neuropathy\\n- Primary: E11.40"}
  ]
}`,
  },
  preference: {
    label: 'Preference Format (DPO)',
    description: 'Best for alignment: teach the model which responses are better.',
    code: `{
  "prompt": "Explain quantum computing to a 10-year-old.",
  "chosen": "Imagine a magic coin that can be heads AND tails at the same time...",
  "rejected": "Quantum computing leverages superposition of qubits in Hilbert space..."
}`,
  },
}

const FORMATS: Format[] = ['instruction', 'chat', 'preference']

const TRAINING_TREE: FileNode[] = [
  {
    name: 'training-data',
    type: 'folder',
    children: [
      { name: 'train.jsonl', type: 'file', size: '12.4 MB', annotation: '5,000 examples' },
      { name: 'val.jsonl', type: 'file', size: '1.2 MB', annotation: '500 examples (10%)' },
      { name: 'test.jsonl', type: 'file', size: '620 KB', annotation: '250 held-out' },
      { name: 'README.md', type: 'file', size: '2.1 KB', content: '# Medical Coding Dataset\n\nFormat: instruction\nExamples: 5,750 total\nSplit: 87% train / 8.7% val / 4.3% test\nSource: De-identified clinical notes\nAnnotators: 3 certified medical coders\nAgreement: κ = 0.89' },
      { name: 'prepare_data.py', type: 'file', size: '3.4 KB', content: 'import json\nfrom pathlib import Path\nfrom sklearn.model_selection import train_test_split\n\nraw = json.loads(Path("raw_annotations.json").read_text())\n\n# Convert to instruction format\nexamples = []\nfor item in raw:\n    examples.append({\n        "instruction": "Extract ICD-10 codes from this clinical note.",\n        "input": item["note"],\n        "output": item["codes"]\n    })\n\n# Split\ntrain, temp = train_test_split(examples, test_size=0.13, random_state=42)\nval, test = train_test_split(temp, test_size=0.33, random_state=42)\n\n# Write JSONL\nfor split, name in [(train, "train"), (val, "val"), (test, "test")]:\n    with open(f"{name}.jsonl", "w") as f:\n        for ex in split:\n            f.write(json.dumps(ex) + "\\n")' },
    ],
  },
]

const CHECKLIST = [
  { label: 'Diverse examples', detail: 'Cover edge cases, not just the happy path' },
  { label: 'Consistent format', detail: 'Every example follows the exact same schema' },
  { label: '500–10K examples', detail: 'Sweet spot for LoRA. More isn\'t always better' },
  { label: 'Clean & deduplicated', detail: 'Remove near-duplicates and corrupted entries' },
  { label: '10% validation split', detail: 'Hold out data to detect overfitting' },
  { label: 'Human-verified', detail: 'Spot-check at least 100 examples manually' },
]

export const PreparingDataSection: React.FC = () => {
  const c = useT({ title: '2. Preparing Your Data' }, { sv: preparingDataSectionSv, ko: preparingDataSectionKo })
  const [activeFormat, setActiveFormat] = useState<Format>('instruction')
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const toggleCheck = useCallback((i: number) => {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }, [])

  const fmt = useMemo(() => FORMAT_EXAMPLES[activeFormat], [activeFormat])

  return (
    <section aria-labelledby="preparing-data">
      <h2 id="preparing-data" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        Data quality determines fine-tuning success. Pick a format, structure your examples, and validate before training.
      </p>

      <div className="mb-6 flex gap-2" role="tablist" aria-label="Data format selector">
        {FORMATS.map(f => (
          <button
            key={f}
            role="tab"
            aria-selected={activeFormat === f}
            onClick={() => setActiveFormat(f)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeFormat === f
                ? 'bg-amber-600/20 text-amber-400'
                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {FORMAT_EXAMPLES[f].label}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm text-zinc-400">{fmt.description}</p>
        <CodeBlock code={fmt.code} language="javascript" title={`${fmt.label} — example.jsonl`} />
      </div>

      <div className="mb-8">
        <h3 className="mb-3 font-mono text-sm font-semibold tracking-wider text-zinc-400 uppercase">
          Training data directory
        </h3>
        <FileExplorer tree={TRAINING_TREE} title="~/project/training-data" />
      </div>

      <h3 className="mb-3 font-mono text-sm font-semibold tracking-wider text-zinc-400 uppercase">
        Quality checklist
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {CHECKLIST.map((item, i) => (
          <button
            key={i}
            onClick={() => toggleCheck(i)}
            className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
              checked.has(i)
                ? 'border-green-500/40 bg-green-500/10'
                : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
            }`}
          >
            <span className={`mt-0.5 text-sm ${checked.has(i) ? 'text-green-400' : 'text-zinc-600'}`}>
              {checked.has(i) ? '☑' : '☐'}
            </span>
            <div>
              <p className="text-sm font-medium text-zinc-200">{item.label}</p>
              <p className="text-xs text-zinc-500">{item.detail}</p>
            </div>
          </button>
        ))}
      </div>
      {checked.size === CHECKLIST.length && (
        <p className="mt-3 text-sm font-medium text-green-400">
          ✓ All checks passed — your data is ready for training!
        </p>
      )}

      <div className="mt-8 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <p className="mb-2 text-sm font-medium text-zinc-200">
          <Icon name="box" /> nanochat's approach to SFT data
        </p>
        <p className="mb-3 text-sm leading-relaxed text-zinc-400">
          nanochat uses <code className="text-amber-300">chat_sft.py</code> with data from the{' '}
          <strong className="text-zinc-200">SmolTalk</strong> dataset (HuggingFace) — a curated
          collection of multi-turn conversations. You can also create custom tasks using{' '}
          <code className="text-amber-300">tasks/customjson.py</code> with any JSONL file of conversations.
        </p>
        <p className="text-sm leading-relaxed text-zinc-400">
          Want to give your model a personality? Karpathy's{' '}
          <a href="https://github.com/karpathy/nanochat/discussions/139" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline decoration-amber-400/30 hover:decoration-amber-400">
            identity guide
          </a>{' '}
          shows how to generate synthetic identity data (using a larger model) and mix it into
          the SFT stage — so your nanochat knows its own name, personality, and backstory.
        </p>
      </div>
    </section>
  )
}
