import { FileExplorer } from '../../components/FileExplorer'
import type { FileNode } from '../../components/FileExplorer'
import { CodeBlock } from '../../components/CodeBlock'
import { useT } from '../../useT'
import { dataFormatsSectionSv, dataFormatsSectionKo } from './tech-translations'

const PRETRAIN_CONTENT = '{"text": "The transformer architecture was introduced in 2017...", "source": "wikipedia", "language": "en"}\n{"text": "def quicksort(arr):\\n    if len(arr) <= 1:\\n        return arr...", "source": "github", "language": "python"}\n{"text": "In quantum mechanics, the wave function describes...", "source": "arxiv", "language": "en"}'

const SFT_CONTENT = '{"messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Explain recursion."}, {"role": "assistant", "content": "Recursion is when a function calls itself to solve a smaller version of the same problem..."}]}\n{"messages": [{"role": "user", "content": "Translate to French: Hello world"}, {"role": "assistant", "content": "Bonjour le monde"}]}'

const RLHF_CONTENT = '{"prompt": "Write a poem about the ocean.", "chosen": "Beneath the waves, a world unseen...", "rejected": "The ocean is big and has water. Fish live in it."}\n{"prompt": "Explain gravity simply.", "chosen": "Gravity pulls objects toward each other. More mass = stronger pull...", "rejected": "Gravity is described by general relativity as spacetime curvature..."}'

const TREE: FileNode[] = [
  {
    name: 'training-data/',
    type: 'folder',
    children: [
      { name: 'pretrain/', type: 'folder', children: [
        { name: 'shard-00001.jsonl', type: 'file', size: '2.1 GB', annotation: '← one doc per line', content: PRETRAIN_CONTENT },
      ]},
      { name: 'sft/', type: 'folder', children: [
        { name: 'instructions.jsonl', type: 'file', size: '450 MB', annotation: '← conversation pairs', content: SFT_CONTENT },
      ]},
      { name: 'rlhf/', type: 'folder', children: [
        { name: 'preferences.jsonl', type: 'file', size: '180 MB', annotation: '← chosen vs rejected', content: RLHF_CONTENT },
      ]},
    ],
  },
]

const PRE_EX = `// Pre-training: plain text, one document per JSON line
{"text": "The transformer architecture was introduced in...", "source": "wikipedia"}
{"text": "def quicksort(arr):\\n    if len(arr) <= 1:...", "source": "github"}`

const SFT_EX = `// SFT: conversation format
{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Explain recursion."},
    {"role": "assistant", "content": "Recursion is when a function calls itself..."}
  ]
}`

const RLHF_EX = `// RLHF: preference pairs (chosen > rejected)
{
  "prompt": "Write a poem about the ocean.",
  "chosen": "Beneath the waves, a world unseen...",
  "rejected": "The ocean is big and has water..."
}`

const EN_INTRO = `Each training stage uses a different format.`

export const DataFormatsSection: React.FC = () => {
  const c = useT({ title: '5. Data Formats', intro: EN_INTRO }, { sv: dataFormatsSectionSv, ko: dataFormatsSectionKo })
  return (
  <section aria-labelledby="data-formats">
    <h2 id="data-formats" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>
    <div className="mb-6">
      <FileExplorer tree={TREE} title="~/datasets" />
    </div>
    <div className="space-y-4">
      <CodeBlock title="Pre-training format (JSONL)" language="javascript" code={PRE_EX} />
      <CodeBlock title="SFT instruction format" language="javascript" code={SFT_EX} />
      <CodeBlock title="RLHF preference pairs" language="javascript" code={RLHF_EX} />
    </div>
  </section>
  )
}