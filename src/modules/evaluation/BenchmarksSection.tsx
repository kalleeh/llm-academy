import { useState } from 'react'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { benchmarksSectionSv, benchmarksSectionKo } from './tech-translations'
import { benchmarksTranslations } from './data-translations'

interface Benchmark {
  name: string
  category: string
  color: string
  what: string
  example: string
  scoring: string
  topScores: string
}

const BENCHMARKS: Benchmark[] = [
  { name: 'MMLU-Pro', category: 'Knowledge', color: 'bg-blue-500/20 border-blue-500/40 text-blue-300', what: 'Tests general knowledge across 57 subjects — from history to physics to law. Harder than original MMLU with 10-choice questions.', example: 'Q: What is the primary function of the mitochondria?\n(A) Protein synthesis (B) Energy production (C) Cell division ...', scoring: 'Accuracy (% correct). Multiple choice, 10 options.', topScores: 'GPT-5: ~90% · Claude Opus 4.6: ~88% · Gemini 3.1 Pro: ~87%' },
  { name: 'GPQA', category: 'Science', color: 'bg-purple-500/20 border-purple-500/40 text-purple-300', what: 'Graduate-level science questions written by PhD experts. Designed to be hard even for domain specialists outside their field.', example: 'Q: In quantum chromodynamics, what mechanism explains the mass gap in Yang-Mills theory?', scoring: 'Accuracy on expert-validated questions.', topScores: 'GPT-5: ~75% · o3: ~78% · Claude Opus 4.6: ~72%' },
  { name: 'HumanEval / SWE-bench', category: 'Coding', color: 'bg-green-500/20 border-green-500/40 text-green-300', what: 'HumanEval: 164 Python problems. SWE-bench: real GitHub issues requiring multi-file fixes in actual repos.', example: 'def has_close_elements(numbers: List[float], threshold: float) -> bool:\n    """Check if any two numbers are closer than threshold"""', scoring: 'Pass@1 (first attempt correct). SWE-bench: % of issues resolved.', topScores: 'HumanEval — Claude Opus 4.6: ~93% · GPT-5: ~92%\nSWE-bench — Claude: ~55% · GPT-5: ~52%' },
  { name: 'MATH / AIME', category: 'Math', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300', what: 'MATH: competition-level math problems. AIME: American Invitational Mathematics Examination problems.', example: 'Find all integers n such that n² + 3n + 5 is divisible by 121.', scoring: 'Accuracy. AIME scored 0-15.', topScores: 'GPT-5: 100% AIME 2025 · o3: ~97% · DeepSeek R1: ~90%' },
  { name: 'ARC-AGI', category: 'Reasoning', color: 'bg-red-500/20 border-red-500/40 text-red-300', what: 'Abstract reasoning puzzles testing pattern recognition and generalization. Visual grid transformations.', example: 'Given input/output grid pairs, predict the transformation rule and apply to a new input.', scoring: '% of puzzles solved correctly.', topScores: 'o3: ~88% · GPT-5: ~75% · Human average: ~85%' },
  { name: 'LMArena / Chatbot Arena', category: 'Human Pref', color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300', what: 'Blind side-by-side comparisons. Real users chat with two anonymous models and pick the better one. ELO rating system.', example: 'User sends same prompt to Model A and Model B, picks preferred response without knowing which is which.', scoring: 'ELO rating from pairwise human preferences.', topScores: 'GPT-5: ~1380 ELO · Claude Opus 4.6: ~1370 · Gemini 3.1: ~1360' },
]

const EN_P2 = `Top models now score 85-95% on many benchmarks, making it hard to differentiate. The industry is shifting toward harder benchmarks (GPQA, ARC-AGI, SWE-bench) and human preference ratings (LMArena).`
const EN_INTRO = `The industry uses standardized benchmarks to compare models. No single benchmark tells the whole story.`

export const BenchmarksSection: React.FC = () => {
  const { lang } = useLanguage()
  const bENCHMARKST = tArray(lang, BENCHMARKS, benchmarksTranslations)
  const c = useT({ title: '2. Key Benchmarks (2025–2026)', intro: EN_INTRO , p2: EN_P2 }, { sv: benchmarksSectionSv, ko: benchmarksSectionKo })
  const [selected, setSelected] = useState(0)
  const bench = BENCHMARKS[selected]

  return (
    <section aria-labelledby="benchmarks">
      <h2 id="benchmarks" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {bENCHMARKST.map((b, i) => (
          <button
            key={b.name}
            onClick={() => setSelected(i)}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
              selected === i ? b.color : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <div className="mb-3 flex items-center gap-3">
          <h3 className="font-mono text-lg font-semibold text-zinc-100">{bench.name}</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-xs ${bench.color}`}>{bench.category}</span>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-zinc-300">{bench.what}</p>

        <div className="mb-4 rounded-md border border-zinc-700 bg-zinc-950 p-3">
          <span className="mb-1 block text-xs text-zinc-500">Example question:</span>
          <pre className="whitespace-pre-wrap font-mono text-xs text-zinc-300">{bench.example}</pre>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md bg-zinc-800/50 p-3">
            <span className="text-xs font-medium text-zinc-400">Scoring</span>
            <p className="mt-1 text-sm text-zinc-300">{bench.scoring}</p>
          </div>
          <div className="rounded-md bg-zinc-800/50 p-3">
            <span className="text-xs font-medium text-zinc-400">Top Scores (2026)</span>
            <pre className="mt-1 whitespace-pre-wrap font-mono text-xs text-zinc-300">{bench.topScores}</pre>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-sm text-amber-200/90">
          <strong>Benchmark saturation:</strong> {c.p2}
        </p>
      </div>
    </section>
  )
}
