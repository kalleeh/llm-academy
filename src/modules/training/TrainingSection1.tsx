import { Workspace } from '../../components/Workspace'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import type { WorkspaceSnapshot } from '../../components/Workspace'

const initSteps: TerminalStep[] = [
  {
    command: 'git clone https://github.com/karpathy/nanochat && cd nanochat',
    output:
      'Cloning into \'nanochat\'...\n' +
      'remote: Enumerating objects: 2841, done.\n' +
      'Resolving deltas: 100% (1923/1923), done.',
    delay: 800,
  },
  {
    command: 'uv sync --extra gpu && source .venv/bin/activate',
    output:
      'Resolved 47 packages in 1.2s\n' +
      'Installed 47 packages in 3.8s\n' +
      ' + torch==2.6.0+cu124\n' +
      ' + numpy==2.2.3\n' +
      ' + tiktoken==0.9.0\n' +
      ' + wandb==0.19.6\n' +
      '(.venv) $',
    delay: 600,
  },
  {
    command: 'python -m scripts.chat_cli -p "Hello, who are you?"',
    output:
      'No model found. Downloading default d12 checkpoint...\n' +
      'Loading model: depth=12, 124M parameters\n' +
      'Generating...\n\n' +
      '> Hello, who are you?\n' +
      'I am a the of a the in the world of the and the\n' +
      'of the in a the the the...\n\n' +
      '⚠ This is a tiny untrained model — pure gibberish.\n' +
      '  Training will transform these random weights into language.',
    delay: 1000,
  },
]

const SNAPSHOTS: Record<number, WorkspaceSnapshot> = {
  [-1]: {
    label: 'trainEmpty',
    tree: [],
    info: 'nanochat is Karpathy\'s minimal LLM training harness. One repo covers tokenization → pretraining → SFT → RLHF → eval → chat UI.',
  },
  [0]: {
    label: 'nanochat cloned — the full project',
    tree: [
      { name: 'nanochat/', type: 'folder', children: [
        { name: 'nanochat/', type: 'folder', annotation: '← Core library', children: [
          { name: 'gpt.py', type: 'file', size: '8.2 KB', annotation: '← The GPT Transformer model' },
          { name: 'dataloader.py', type: 'file', size: '5.1 KB', annotation: '← Distributed data loading' },
          { name: 'tokenizer.py', type: 'file', size: '3.4 KB', annotation: '← BPE tokenizer wrapper' },
          { name: 'engine.py', type: 'file', size: '4.8 KB', annotation: '← Inference with KV cache' },
          { name: 'common.py', type: 'file', size: '2.1 KB' },
        ]},
        { name: 'scripts/', type: 'folder', annotation: '← All entry points', children: [
          { name: 'tok_train.py', type: 'file', annotation: 'Train tokenizer' },
          { name: 'tok_eval.py', type: 'file', annotation: 'Eval tokenizer' },
          { name: 'base_train.py', type: 'file', annotation: 'Pre-train base model' },
          { name: 'base_eval.py', type: 'file', annotation: 'Eval base model' },
          { name: 'chat_sft.py', type: 'file', annotation: 'Supervised fine-tuning' },
          { name: 'chat_rl.py', type: 'file', annotation: 'RLHF training' },
          { name: 'chat_cli.py', type: 'file', annotation: 'Talk via terminal' },
          { name: 'chat_web.py', type: 'file', annotation: 'Talk via web UI' },
        ]},
        { name: 'runs/', type: 'folder', children: [
          { name: 'speedrun.sh', type: 'file', annotation: '← Train GPT-2 for ~$73' },
          { name: 'scaling_laws.sh', type: 'file' },
        ]},
        { name: 'pyproject.toml', type: 'file', size: '1.8 KB' },
      ]},
    ],
    info: 'The entire LLM pipeline in one repo: tokenizer → pretraining → alignment → eval → chat. Each script is a single entry point.',
  },
  [1]: {
    label: 'trainDepsInstalled',
    tree: [
      { name: 'nanochat/', type: 'folder', children: [
        { name: '.venv/', type: 'folder', annotation: '← Python virtual env', children: [
          { name: 'lib/', type: 'folder', annotation: 'torch, numpy, tiktoken, wandb...' },
        ]},
        { name: 'nanochat/', type: 'folder', children: [
          { name: 'gpt.py', type: 'file', size: '8.2 KB' },
          { name: 'dataloader.py', type: 'file', size: '5.1 KB' },
          { name: 'tokenizer.py', type: 'file', size: '3.4 KB' },
          { name: 'engine.py', type: 'file', size: '4.8 KB' },
        ]},
        { name: 'scripts/', type: 'folder', children: [
          { name: 'base_train.py', type: 'file' },
          { name: 'chat_sft.py', type: 'file' },
          { name: 'chat_cli.py', type: 'file' },
        ]},
      ]},
    ],
    info: 'uv sync installs PyTorch with CUDA, plus all dependencies. The --extra gpu flag pulls CUDA-enabled torch.',
  },
  [2]: {
    label: 'trainUntrained',
    tree: [
      { name: 'nanochat/', type: 'folder', children: [
        { name: 'nanochat/', type: 'folder', children: [
          { name: 'gpt.py', type: 'file', size: '8.2 KB', annotation: '← Defines the architecture' },
        ]},
        { name: 'data/', type: 'folder', annotation: '← NEW', children: [
          { name: 'tok65536.model', type: 'file', size: '1.2 MB', annotation: '← Default tokenizer' },
        ]},
      ]},
    ],
    info: '⚠ Random weights = gibberish. The model has the right architecture (GPT transformer) but no knowledge. The --depth flag controls model size — everything else is auto-calculated.',
  },
}

export const TrainingSection1: React.FC = () => (
  <section className="space-y-6" aria-labelledby="section-1-heading">
    <h3 id="section-1-heading" className="font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">
      1. Starting From Nothing
    </h3>
    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
      Every LLM starts as an empty shell — billions of numbers, all random. Let's set up{' '}
      <a href="https://github.com/karpathy/nanochat" target="_blank" rel="noopener noreferrer" className="text-amber-700 dark:text-amber-400 underline decoration-amber-400/30 hover:decoration-amber-400">
        nanochat
      </a>
      , Karpathy's minimal LLM training harness, and see what an untrained model looks like.
      One repo covers the entire pipeline: tokenizer → pretraining → alignment → eval → chat.
    </p>

    <Workspace
      title="nanochat Setup"
      terminalTitle="terminal — setup"
      steps={initSteps}
      snapshots={SNAPSHOTS}
    />

    <div className="rounded-lg border border-amber-300 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5 p-4">
      <p className="text-sm text-amber-800 dark:text-amber-200/90">
        <strong>Key insight:</strong> Random weights = the model knows nothing. Ask it anything
        and you get gibberish. In nanochat, the <code className="text-amber-700 dark:text-amber-300">--depth</code> flag
        is the single dial that controls model size — all other hyperparameters (width, heads,
        learning rate, training horizon) are calculated automatically to be compute-optimal.
      </p>
    </div>
  </section>
)
