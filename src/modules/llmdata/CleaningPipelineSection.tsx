import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../useT'
import { cleaningPipelineSectionSv, cleaningPipelineSectionKo } from './tech-translations'

interface PipelineStep extends TerminalStep {
  sizeLabel: string
  sizeTB: number
}

const STEPS: PipelineStep[] = [
  { command: 'echo "Stage 0: Raw crawl data"', output: 'Raw Common Crawl dump: 100 TB (WARC files)', sizeLabel: 'Raw', sizeTB: 100 },
  { command: 'python extract_text.py --input warc/ --output text/', output: '✓ HTML → plain text extraction complete\n  Removed markup, scripts, styles\n  Output: 80 TB', sizeLabel: 'Extract', sizeTB: 80 },
  { command: 'python lang_filter.py --lang en --threshold 0.95', output: '✓ Language ID (fastText lid.176)\n  Kept: English ≥95% confidence\n  Removed: 25% non-English/mixed\n  Output: 60 TB', sizeLabel: 'Lang', sizeTB: 60 },
  { command: 'python quality_filter.py --classifier kenlm --perplexity-max 1500', output: '✓ Quality filtering (KenLM perplexity + classifier)\n  Removed: SEO spam, boilerplate, low-quality\n  Output: 30 TB', sizeLabel: 'Quality', sizeTB: 30 },
  { command: 'python dedup.py --method minhash --ngram 5 --threshold 0.8', output: '✓ Dedup (MinHash LSH, 5-gram, Jaccard ≥0.8)\n  Removed: 50% near-duplicate documents\n  Output: 15 TB', sizeLabel: 'Dedup', sizeTB: 15 },
  { command: 'python pii_removal.py --patterns emails,phones,ssn', output: '✓ PII removal (regex + NER detection)\n  Replaced: emails, phones, SSNs, addresses\n  Output: 14 TB  ← final clean dataset', sizeLabel: 'PII', sizeTB: 14 },
]

const MAX_TB = 100

const EN_INTRO = `Raw web data is mostly garbage. A typical pipeline discards 85%+ through extraction, filtering, and deduplication.`

export const CleaningPipelineSection: React.FC = () => {
  const c = useT({ title: '2. Cleaning Pipeline', intro: EN_INTRO }, { sv: cleaningPipelineSectionSv, ko: cleaningPipelineSectionKo })
  const [executedStep, setExecutedStep] = useState(-1)
  const onStep = useCallback((i: number) => setExecutedStep(i), [])

  const terminalSteps: TerminalStep[] = STEPS.map(s => ({ command: s.command, output: s.output }))
  const currentSize = executedStep >= 0 ? STEPS[executedStep].sizeTB : MAX_TB

  return (
    <section aria-labelledby="cleaning-pipeline">
      <h2 id="cleaning-pipeline" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>
      <div className="mb-4 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
        <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
          <span>Data remaining</span>
          <span className="font-mono text-zinc-200">{currentSize} TB / {MAX_TB} TB</span>
        </div>
        <div className="h-6 w-full overflow-hidden rounded bg-zinc-800">
          <div
            className="flex h-full items-center justify-end rounded bg-gradient-to-r from-emerald-600 to-emerald-400 pr-2 transition-all duration-700"
            style={{ width: `${(currentSize / MAX_TB) * 100}%` }}
            role="progressbar" aria-valuenow={currentSize} aria-valuemin={0} aria-valuemax={MAX_TB}
          >
            <span className="text-xs font-semibold text-white drop-shadow">{currentSize} TB</span>
          </div>
        </div>
        <div className="mt-2 flex justify-between text-xs text-zinc-500">
          {STEPS.map((s, i) => (
            <span key={s.sizeLabel} className={i <= executedStep ? 'text-emerald-400' : ''}>{s.sizeLabel}</span>
          ))}
        </div>
      </div>
      <SimulatedTerminal steps={terminalSteps} title="data-pipeline" onStepExecuted={onStep} />

      <SelfExplain
        prompt="You just watched 100 TB of raw web data shrink to 14 TB through six cleaning stages. The quality filter alone removed 50% of the remaining data. In your own words, explain what 'quality' means in this context — what makes a web page high-quality training data vs. low-quality?"
        modelAnswer="Quality for LLM training data isn't about whether the content is 'good writing' in a literary sense. It's about whether the text teaches the model useful language patterns. High-quality pages have coherent, informative prose — articles, documentation, educational content, well-written discussions. Low-quality pages include SEO-stuffed keyword spam, auto-generated product listings, cookie-cutter boilerplate, pages that are mostly navigation menus or ads, and text that's garbled or machine-translated poorly. The quality filter (often using a KenLM perplexity score) essentially asks: 'Does this text look like it was written by a competent human for other humans to read?' Pages with very high perplexity (surprising/random word patterns) get filtered out."
      />

      <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <p className="mb-2 text-sm font-medium text-zinc-200">
          <Icon name="box" /> How nanochat handles this
        </p>
        <p className="text-sm leading-relaxed text-zinc-400">
          In{' '}
          <a href="https://github.com/karpathy/nanochat" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline decoration-amber-400/30 hover:decoration-amber-400">
            nanochat
          </a>
          , the data pipeline is split into two files: <code className="text-amber-300">dataset.py</code>{' '}
          downloads and tokenizes data into binary shards, and <code className="text-amber-300">dataloader.py</code>{' '}
          streams those shards during training with distributed shuffling. The default dataset is{' '}
          <strong className="text-zinc-200">NVIDIA ClimbMix</strong> — a curated, pre-cleaned web corpus
          that already went through quality filtering and deduplication similar to the pipeline above.
          This is why nanochat can skip straight to training: the hard data work is already done.
        </p>
      </div>
    </section>
  )
}
