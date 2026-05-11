import { FileExplorer } from '../../components/FileExplorer'
import type { FileNode } from '../../components/FileExplorer'
import { Icon } from '../../components/Icon'

const beforeTraining: FileNode[] = [
  {
    name: 'nanochat/',
    type: 'folder',
    children: [
      { name: 'gpt.py', type: 'file', size: '8.2 KB', annotation: '← Model architecture' },
      { name: 'dataloader.py', type: 'file', size: '5.1 KB' },
    ],
  },
  {
    name: 'data/',
    type: 'folder',
    children: [
      { name: 'tok65536.model', type: 'file', size: '1.2 MB', annotation: '← Tokenizer' },
      { name: 'climbmix/', type: 'folder', annotation: '← Training data shards' },
    ],
  },
  {
    name: 'logs/',
    type: 'folder',
    annotation: '← Empty',
    children: [],
  },
]

const afterTraining: FileNode[] = [
  {
    name: 'nanochat/',
    type: 'folder',
    children: [
      { name: 'gpt.py', type: 'file', size: '8.2 KB', annotation: '← Same code, unchanged' },
    ],
  },
  {
    name: 'data/',
    type: 'folder',
    children: [
      { name: 'tok65536.model', type: 'file', size: '1.2 MB' },
      { name: 'climbmix/', type: 'folder' },
    ],
  },
  {
    name: 'logs/',
    type: 'folder',
    children: [
      {
        name: 'd26/',
        type: 'folder',
        annotation: '← All training output',
        children: [
          {
            name: 'model.pt',
            type: 'file',
            size: '3.2 GB',
            annotation: '✓ Trained weights (1.6B params)',
            content: '# PyTorch checkpoint containing:\n# - model state dict (all transformer weights)\n# - config (depth=26, width=1280, heads=10)\n# - tokenizer reference\n#\n# These 3.2 GB encode patterns learned from\n# billions of tokens of text. Before training,\n# these same numbers were random noise.',
          },
          { name: 'state_step010000.pt', type: 'file', size: '9.6 GB', annotation: '← Mid-training checkpoint' },
          { name: 'state_step019531.pt', type: 'file', size: '9.6 GB', annotation: '← Final checkpoint + optimizer' },
          {
            name: 'wandb/',
            type: 'folder',
            annotation: '← Training metrics',
            children: [
              { name: 'run-d26/', type: 'folder', annotation: 'val_bpb, loss, CORE metric, MFU' },
            ],
          },
        ],
      },
    ],
  },
]

export const TrainingSection3: React.FC = () => (
  <section className="space-y-6" aria-labelledby="section-3-heading">
    <h3 id="section-3-heading" className="font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">
      3. The Filesystem After Training
    </h3>
    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
      After training, the nanochat project directory gains a <code className="text-amber-700 dark:text-amber-300">logs/d26/</code> folder
      with the trained model and checkpoints. The code and data are unchanged — all the "learning"
      lives in the weight files.
    </p>

    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <p className="mb-2 text-sm font-medium text-red-700 dark:text-red-400"><Icon name="cross" className="text-red-700 dark:text-red-400" /> Before training:</p>
        <FileExplorer tree={beforeTraining} title="~/nanochat — before" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-green-700 dark:text-green-400"><Icon name="check" className="text-green-700 dark:text-green-400" /> After training:</p>
        <FileExplorer tree={afterTraining} title="~/nanochat — after" />
      </div>
    </div>

    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 p-4">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        <strong className="text-zinc-900 dark:text-zinc-100">model.pt vs state checkpoints:</strong> The{' '}
        <code className="text-amber-700 dark:text-amber-300">model.pt</code> (3.2 GB) contains just the trained weights —
        this is what you load for inference. The <code className="text-amber-700 dark:text-amber-300">state_*.pt</code> files
        (9.6 GB each) include the optimizer state too, so you can resume training. The optimizer
        state is ~2-3× the model size because Adam tracks momentum and variance for every parameter.
      </p>
    </div>
  </section>
)
