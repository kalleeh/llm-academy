import { useState } from 'react'
import { useTranslation } from '../../i18n'

// Per-benchmark non-translatable metadata. Order matches the `benchmarks`
// array in `useTranslation().modules.evaluation.benchmarksSection.benchmarks`.
const BENCHMARK_META = [
  { color: 'bg-blue-500/20 border-blue-500/40 text-blue-300', example: 'Q: What is the primary function of the mitochondria?\n(A) Protein synthesis (B) Energy production (C) Cell division ...', topScores: 'GPT-5.5: ~91% · Claude Opus 4.7: ~89% · Gemini 3.1 Pro: ~88%' },
  { color: 'bg-purple-500/20 border-purple-500/40 text-purple-300', example: 'Q: In quantum chromodynamics, what mechanism explains the mass gap in Yang-Mills theory?', topScores: 'GPT-5.5: ~80% · o3: ~78% · Claude Opus 4.7: ~76%' },
  { color: 'bg-green-500/20 border-green-500/40 text-green-300', example: 'def has_close_elements(numbers: List[float], threshold: float) -> bool:\n    """Check if any two numbers are closer than threshold"""', topScores: 'SWE-bench Verified — Claude Opus 4.7: 87.6% · GPT-5.5: ~88.7%\nTerminal-Bench 2.0 — GPT-5.4: 75.1% · Claude Opus 4.7: 69.4%' },
  { color: 'bg-amber-500/20 border-amber-500/40 text-amber-300', example: 'Find all integers n such that n² + 3n + 5 is divisible by 121.', topScores: 'GPT-5.5: ~99% AIME 2025 · o3: ~97% · DeepSeek R1: ~90%' },
  { color: 'bg-red-500/20 border-red-500/40 text-red-300', example: 'Given input/output grid pairs, predict the transformation rule and apply to a new input.', topScores: 'o3 (high compute): ~88% · GPT-5.5: ~78% · Human average: ~85%' },
  { color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300', example: 'User sends same prompt to Model A and Model B, picks preferred response without knowing which is which.', topScores: 'Claude Opus 4.7: ~1561 ELO · GPT-5.5: ~1550 · Gemini 3.1 Pro: ~1540' },
] as const

export const BenchmarksSection: React.FC = () => {
  const c = useTranslation().modules.evaluation.benchmarksSection
  const [selected, setSelected] = useState(0)
  const bench = c.benchmarks[selected]
  const meta = BENCHMARK_META[selected]

  return (
    <section aria-labelledby="benchmarks">
      <h2 id="benchmarks" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {c.benchmarks.map((b, i) => (
          <button
            key={b.name}
            onClick={() => setSelected(i)}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
              selected === i ? BENCHMARK_META[i].color : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-600'
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <div className="mb-3 flex items-center gap-3">
          <h3 className="font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">{bench.name}</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-xs ${meta.color}`}>{bench.category}</span>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{bench.what}</p>

        <div className="mb-4 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 p-3">
          <span className="mb-1 block text-xs text-zinc-500">Example question:</span>
          <pre className="whitespace-pre-wrap font-mono text-xs text-zinc-700 dark:text-zinc-300">{meta.example}</pre>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md bg-zinc-100 dark:bg-zinc-800/50 p-3">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Scoring</span>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{bench.scoring}</p>
          </div>
          <div className="rounded-md bg-zinc-100 dark:bg-zinc-800/50 p-3">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Top Scores (2026)</span>
            <pre className="mt-1 whitespace-pre-wrap font-mono text-xs text-zinc-700 dark:text-zinc-300">{meta.topScores}</pre>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-sm text-amber-200/90">
          <strong>Benchmark saturation:</strong> {c.saturationCallout}
        </p>
      </div>
    </section>
  )
}
