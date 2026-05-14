import { useTranslation, type Translation } from '../../i18n'
import { useState, useCallback, useEffect, useRef } from 'react'
import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { FileExplorer } from '../../components/FileExplorer'
import type { FileNode } from '../../components/FileExplorer'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { SelfExplain } from '../../components/SelfExplain'

type LabelKey = keyof Translation['labels']

const LOOP_STAGES: { label: LabelKey; icon: IconName; active: string; desc: string; detail: string }[] = [
  {
    label: 'trainLoadBatch',
    icon: 'box',
    active: 'bg-blue-100 dark:bg-blue-500/20 border-blue-400 dark:border-blue-500/50 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/30',
    desc: 'Grab a chunk of text (e.g. 4096 tokens) from the training data. This is one "batch" the model will learn from.',
    detail: 'batch_size=4096 tokens from OpenWebText',
  },
  {
    label: 'trainForwardPass',
    icon: 'arrow-right',
    active: 'bg-purple-100 dark:bg-purple-500/20 border-purple-400 dark:border-purple-500/50 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/30',
    desc: 'Feed the tokens through all 32 layers. Each layer transforms the data — attention, feed-forward, normalize. The model predicts the next token at each position.',
    detail: '32 layers × (attention → FFN → norm)',
  },
  {
    label: 'trainComputeLoss',
    icon: 'chart-down',
    active: 'bg-red-100 dark:bg-red-500/20 border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-300 ring-2 ring-red-500/30',
    desc: 'Compare predictions to the actual next tokens. The "loss" measures how wrong the model was. High loss = bad predictions.',
    detail: 'cross_entropy(predicted, actual) → 3.42',
  },
  {
    label: 'trainBackwardPass',
    icon: 'arrow-left',
    active: 'bg-amber-100 dark:bg-amber-500/20 border-amber-400 dark:border-amber-500/50 text-amber-700 dark:text-amber-300 ring-2 ring-amber-500/30',
    desc: 'Calculate gradients — for each of the billions of weights, figure out which direction to nudge it to reduce the loss. This is backpropagation.',
    detail: '∂loss/∂weight for all parameters',
  },
  {
    label: 'trainUpdateWeights',
    icon: 'wrench',
    active: 'bg-green-100 dark:bg-green-500/20 border-green-400 dark:border-green-500/50 text-green-700 dark:text-green-300 ring-2 ring-green-500/30',
    desc: 'Nudge every weight slightly in the direction that reduces loss. The learning rate controls how big each nudge is.',
    detail: 'w = w - lr × gradient (lr=1e-4)',
  },
]

function TrainingLoopViz() {
  const t = useTranslation()
  const c = t.modules.training.trainingSection2
  const [activeStage, setActiveStage] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [iteration, setIteration] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const toggleAnimation = useCallback(() => {
    if (isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsRunning(false)
    } else {
      setIsRunning(true)
      setActiveStage(0)
      intervalRef.current = setInterval(() => {
        setActiveStage(prev => {
          const next = (prev + 1) % LOOP_STAGES.length
          if (next === 0) setIteration(i => i + 1)
          return next
        })
      }, 1000)
    }
  }, [isRunning])

  const clickStage = (i: number) => {
    if (isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsRunning(false)
    }
    setActiveStage(i)
  }

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-5 py-3">
        <div>
          <h4 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">The Training Loop</h4>
          <p className="text-xs text-zinc-500">{c.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          {iteration > 0 && (
            <span className="font-mono text-xs text-zinc-500">
              Iteration {iteration + 1}
            </span>
          )}
          <button
            onClick={toggleAnimation}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              isRunning
                ? 'bg-amber-600 text-white hover:bg-amber-500'
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-600'
            }`}
          >
            {isRunning ? '⏸ Pause' : '▶ Animate'}
          </button>
        </div>
      </div>

      {/* Pipeline visualization */}
      <div className="px-5 py-4">
        <div className="flex items-stretch gap-1">
          {LOOP_STAGES.map((stage, i) => {
            const isActive = i === activeStage
            const isPast = activeStage >= 0 && i < activeStage
            return (
              <button
                key={stage.label}
                onClick={() => clickStage(i)}
                className={`group relative flex flex-1 flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-center transition-all duration-300 ${
                  isActive
                    ? stage.active
                    : isPast
                      ? 'border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-600 hover:border-zinc-200 dark:border-zinc-700 hover:text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-125' : ''}`}>
                  <Icon name={stage.icon} />
                </span>
                <span className="text-[10px] font-medium leading-tight">{t.labels[stage.label]}</span>
                <span className={`font-mono text-[9px] leading-tight transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  {stage.detail}
                </span>
                {/* Arrow connector */}
                {i < LOOP_STAGES.length - 1 && (
                  <span className={`absolute -right-2 top-1/2 z-10 -translate-y-1/2 text-xs transition-colors ${
                    isActive ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-700'
                  }`}>›</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Loop-back arrow */}
        <div className="relative mx-auto mt-1 h-6 w-[90%]">
          <svg viewBox="0 0 400 24" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M 380 2 C 390 2, 395 12, 380 20 L 20 20 C 5 20, 5 12, 20 2"
              fill="none"
              stroke={activeStage === LOOP_STAGES.length - 1 ? '#f59e0b' : '#3f3f46'}
              strokeWidth="1.5"
              strokeDasharray="4 3"
              className="transition-colors duration-300"
            />
            <polygon
              points="20,0 26,5 20,5"
              fill={activeStage === LOOP_STAGES.length - 1 ? '#f59e0b' : '#3f3f46'}
              className="transition-colors duration-300"
            />
          </svg>
          <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-white dark:bg-zinc-900 px-2 font-mono text-[9px] transition-colors duration-300 ${
            activeStage === LOOP_STAGES.length - 1 ? 'text-amber-700 dark:text-amber-400' : 'text-zinc-500 dark:text-zinc-600'
          }`}>
            repeat ×1,000,000
          </span>
        </div>
      </div>

      {/* Description panel — fixed height to prevent jumps */}
      <div className="border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 px-5 py-3 min-h-[4.5rem]">
        {activeStage >= 0 ? (
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <span className="mr-1.5"><Icon name={LOOP_STAGES[activeStage].icon} /></span>
            <strong className="text-zinc-900 dark:text-zinc-100">{t.labels[LOOP_STAGES[activeStage].label]}:</strong>{' '}
            {LOOP_STAGES[activeStage].desc}
          </p>
        ) : (
          <p className="text-sm text-zinc-500">{c.idle}</p>
        )}
      </div>
    </div>
  )
}

function LossCurve({ progress }: { progress: number }) {
  const numPoints = Math.max(2, Math.round(progress * 50))
  const points = Array.from({ length: numPoints }, (_, i) => {
    const x = i / 49
    const loss = 10.5 * Math.exp(-3 * x) + 1.8 + Math.sin(i * 0.7) * 0.3 * Math.exp(-2 * x)
    return { x: 20 + x * 360, y: 10 + (1 - (loss - 1.8) / 9) * 180 }
  })

  const pathD =
    points.length > 1
      ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
      : ''

  const lastLoss = (10.5 * Math.exp(-3 * ((numPoints - 1) / 49)) + 1.8).toFixed(2)

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Training Loss</span>
        <span className="font-mono text-xs text-amber-700 dark:text-amber-400">Loss: {lastLoss}</span>
      </div>
      <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="Training loss curve">
        <line x1="20" y1="10" x2="20" y2="200" stroke="#52525b" strokeWidth="1" />
        <line x1="20" y1="200" x2="380" y2="200" stroke="#52525b" strokeWidth="1" />
        <text x="14" y="18" textAnchor="end" className="fill-zinc-500 text-[9px]">10</text>
        <text x="14" y="105" textAnchor="end" className="fill-zinc-500 text-[9px]">5</text>
        <text x="14" y="198" textAnchor="end" className="fill-zinc-500 text-[9px]">2</text>
        <text x="200" y="215" textAnchor="middle" className="fill-zinc-500 text-[9px]">Training Steps →</text>
        {pathD && (
          <path d={pathD} fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        )}
        {points.length > 0 && (
          <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="3" fill="#f59e0b" />
        )}
      </svg>
    </div>
  )
}

const trainSteps: TerminalStep[] = [
  {
    command: 'OMP_NUM_THREADS=1 torchrun --standalone --nproc_per_node=8 -m scripts.base_train --depth=26',
    output:
      'nanochat base_train | depth=26 (GPT-2 scale)\n' +
      'Auto-configured: width=1280, heads=10, params=1.6B\n' +
      'Dataset: NVIDIA ClimbMix (tokenized shards)\n' +
      'Batch size: 1M tokens | 8× H100 GPUs\n' +
      '─────────────────────────────────────────',
    delay: 1200,
  },
  {
    command: '# ...training in progress (watching wandb)...',
    output:
      'step    100 | loss 10.18 | val_bpb 1.082 | lr 6.0e-4 | tok/s 485000\n' +
      'step    200 | loss  9.71 | val_bpb 1.044 | lr 6.0e-4 | tok/s 491000\n' +
      'step    500 | loss  8.12 | val_bpb 0.952 | lr 6.0e-4 | tok/s 488000\n' +
      'step   1000 | loss  6.54 | val_bpb 0.891 | lr 6.0e-4 | tok/s 490000',
    delay: 1200,
  },
  {
    command: '# ...~1.5 hours in...',
    output:
      'step   5000 | loss  3.89 | val_bpb 0.812 | lr 5.8e-4 | tok/s 489000\n' +
      'step  10000 | loss  3.21 | val_bpb 0.784 | lr 5.2e-4 | tok/s 491000\n' +
      'Checkpoint saved: logs/d26/state_step010000.pt',
    delay: 1000,
  },
  {
    command: '# ...~3 hours — training complete!',
    output:
      'step  19000 | loss  2.41 | val_bpb 0.748 | lr 1.2e-5 | tok/s 490000\n' +
      'step  19531 | loss  2.38 | val_bpb 0.745 | lr 0.0e+0 | tok/s 491000\n' +
      '─────────────────────────────────────────\n' +
      '✓ Training complete!\n' +
      '  CORE metric: 0.2585 (beats GPT-2: 0.2565)\n' +
      '  Wall time: ~3h on 8× H100\n' +
      '  Cost: ~$73 (spot: ~$25)\n' +
      '  Model saved: logs/d26/model.pt\n\n' +
      '  For reference: GPT-2 cost ~$43,000 to train in 2019.\n' +
      '  7 years of progress: 600× cheaper.',
    delay: 1500,
  },
]

const filesystemByStep: Record<number, FileNode[]> = {
  [-1]: [
    { name: 'nanochat/', type: 'folder', children: [
      { name: 'gpt.py', type: 'file', size: '8.2 KB', annotation: '← Model definition' },
      { name: 'dataloader.py', type: 'file', size: '5.1 KB' },
    ]},
    { name: 'data/', type: 'folder', children: [
      { name: 'tok65536.model', type: 'file', size: '1.2 MB', annotation: '← Tokenizer' },
      { name: 'climbmix/', type: 'folder', annotation: '← Training data shards' },
    ]},
  ],
  [0]: [
    { name: 'nanochat/', type: 'folder', children: [
      { name: 'gpt.py', type: 'file', size: '8.2 KB' },
    ]},
    { name: 'data/', type: 'folder', children: [
      { name: 'tok65536.model', type: 'file', size: '1.2 MB' },
      { name: 'climbmix/', type: 'folder', annotation: '← Streaming shards' },
    ]},
    { name: 'logs/', type: 'folder', annotation: '← NEW', children: [
      { name: 'd26/', type: 'folder', children: [
        { name: 'wandb/', type: 'folder', annotation: '← Loss curves, metrics' },
      ]},
    ]},
  ],
  [2]: [
    { name: 'logs/', type: 'folder', children: [
      { name: 'd26/', type: 'folder', children: [
        { name: 'state_step010000.pt', type: 'file', size: '9.6 GB', annotation: '← Checkpoint' },
        { name: 'wandb/', type: 'folder', annotation: '← val_bpb: 0.784' },
      ]},
    ]},
  ],
  [3]: [
    { name: 'logs/', type: 'folder', children: [
      { name: 'd26/', type: 'folder', children: [
        { name: 'model.pt', type: 'file', size: '3.2 GB', annotation: '✓ Trained model' },
        { name: 'state_step010000.pt', type: 'file', size: '9.6 GB' },
        { name: 'state_step019531.pt', type: 'file', size: '9.6 GB', annotation: '← Final state' },
        { name: 'wandb/', type: 'folder', annotation: '← CORE: 0.2585' },
      ]},
    ]},
  ],
}

// Map step index to loss curve progress (0-1)
const PROGRESS_MAP: Record<number, number> = { [-1]: 0, 0: 0.02, 1: 0.15, 2: 0.5, 3: 1 }

export const TrainingSection2: React.FC = () => {
  const c = useTranslation().modules.training.trainingSection2
  const [executedStep, setExecutedStep] = useState(-1)

  const handleStepExecuted = useCallback((stepIndex: number) => {
    setExecutedStep(stepIndex)
  }, [])

  // Find the most recent filesystem snapshot
  const fsKeys = Object.keys(filesystemByStep).map(Number).sort((a, b) => a - b)
  const activeKey = fsKeys.reduce((best, k) => (k <= executedStep ? k : best), fsKeys[0] ?? -1)
  const currentTree = filesystemByStep[activeKey]

  // Loss curve progress
  const progressKeys = Object.keys(PROGRESS_MAP).map(Number).sort((a, b) => a - b)
  const progressKey = progressKeys.reduce((best, k) => (k <= executedStep ? k : best), progressKeys[0] ?? -1)
  const progress = PROGRESS_MAP[progressKey] ?? 0

  return (
    <section className="space-y-6" aria-labelledby="section-2-heading">
      <h3 id="section-2-heading" className="font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{c.p3}<code className="text-amber-700 dark:text-amber-300">--depth</code> is
        the only dial you set.
      </p>

      <TrainingLoopViz />

      <SelfExplain
        prompt="You just watched the training loop animate through Load Batch → Forward Pass → Compute Loss → Backward Pass → Update Weights. Explain why the backward pass is the most computationally expensive step, and what would happen if you skipped it and just randomly nudged the weights instead."
        modelAnswer="The backward pass (backpropagation) computes gradients for every single parameter — for a 1.6B parameter model, that's 1.6 billion partial derivatives, each requiring a chain of multiplications back through all 26 layers. It's expensive because it essentially re-traverses the entire network in reverse. If you skipped it and randomly nudged weights, you'd be doing a random walk in a 1.6-billion-dimensional space — the chance of stumbling toward lower loss is astronomically small. Gradients tell you the exact direction to nudge each weight to reduce loss. Without them, training would take impossibly long or never converge at all. It's the difference between navigating with a compass versus wandering blindfolded."
      />

      {/* Connected workspace: terminal + filesystem + loss curve */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400"><Icon name="terminal" /> nanochat Speedrun — GPT-2 for ~$73</span>
          <span className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {/* Left: terminal */}
          <SimulatedTerminal
            steps={trainSteps}
            title="nanochat — base_train"
            onStepExecuted={handleStepExecuted}
          />

          {/* Right: loss curve + filesystem — fixed height matching terminal */}
          <div className="flex h-80 flex-col gap-2 overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-700 p-2">
            <LossCurve progress={progress} />
            <FileExplorer tree={currentTree} title="~/project — filesystem" />
          </div>
        </div>
      </div>
    </section>
  )
}
