import { useState } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { tLabel, useLanguage, useT } from '../../i18n'
import { leaderboardSectionSv, leaderboardSectionKo } from './tech-translations'

const PROBLEMS: { label: string; icon: IconName; desc: string; example: string }[] = [
  { label: 'dataContamination', icon: 'flask', desc: 'Models may have seen benchmark questions during training. If MMLU questions leak into the training data, high scores don\'t mean the model is smart — it memorized the answers.', example: 'A model scores 95% on MMLU but can\'t answer rephrased versions of the same questions.' },
  { label: 'benchmarkGaming', icon: 'gamepad', desc: 'Teams can optimize specifically for benchmark performance without improving general capability. Overfitting to the test.', example: 'Fine-tuning on benchmark-style questions boosts scores 5-10% without improving real-world usefulness.' },
  { label: 'narrowMeasurement', icon: 'ruler', desc: 'Each benchmark tests one slice of capability. A model can ace MMLU (knowledge) while being terrible at following complex instructions.', example: 'Model ranks #1 on coding benchmarks but produces unusable code in real projects with ambiguous requirements.' },
  { label: 'saturation', icon: 'trend-up', desc: 'When top models all score 85-95%, the benchmark stops being useful for differentiation. The remaining 5-15% may be noise or edge cases.', example: 'MMLU scores: GPT-5.5 91%, Claude Opus 4.7 89%, Gemini 3.1 Pro 88% — is that difference meaningful or noise?' },
]

const EN_P12 = `Use benchmarks as a starting filter, then evaluate on`
const EN_P11 = `Instead of automated benchmarks, LMArena uses`
const EN_P10 = `The Alternative: LMArena / Chatbot Arena`
const EN_P9 = `Use benchmarks as a starting filter, then evaluate on`
const EN_P8 = `Instead of automated benchmarks, LMArena uses`
const EN_P7 = `The Alternative: LMArena / Chatbot Arena`
const EN_P4 = `Can&apos;t be gamed (blind), measures what users actually care about, captures nuance that automated metrics miss.`
const EN_P5 = `Biased toward chatty/verbose responses, English-centric, doesn&apos;t test specialized domains well.`
const EN_INTRO = `Benchmarks are useful but flawed. Here's why you shouldn't pick a model based on leaderboard rank alone.`

export const LeaderboardSection: React.FC = () => {
  const { lang } = useLanguage()
  const c = useT({ title: '4. The Leaderboard Problem', intro: EN_INTRO , p4: EN_P4, p5: EN_P5 , p7: EN_P7 , p8: EN_P8 , p9: EN_P9 , p10: EN_P10 , p11: EN_P11 , p12: EN_P12 }, { sv: leaderboardSectionSv, ko: leaderboardSectionKo })
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section aria-labelledby="leaderboard-problem">
      <h2 id="leaderboard-problem" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="mb-6 space-y-3">
        {PROBLEMS.map((p, i) => (
          <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-zinc-100 dark:bg-zinc-800"
            >
              <span><Icon name={p.icon} /></span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{tLabel(lang, p.label)}</span>
              <span className="ml-auto text-zinc-500">{expanded === i ? '▾' : '▸'}</span>
            </button>
            {expanded === i && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 space-y-2">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{p.desc}</p>
                <div className="rounded bg-zinc-100 dark:bg-zinc-800/50 p-3">
                  <span className="text-xs text-zinc-500">Example:</span>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{p.example}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{c.p10}</h3>
        <p className="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{c.p11}<strong className="text-zinc-900 dark:text-zinc-100">blind human
          preference</strong>. Real users chat with two anonymous models side-by-side and pick the
          better one. Results are aggregated into an ELO rating — like chess rankings.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md bg-green-500/10 p-3">
            <span className="text-xs font-medium text-green-400">✓ Why it works</span>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              {c.p4}
            </p>
          </div>
          <div className="rounded-md bg-red-500/10 p-3">
            <span className="text-xs font-medium text-red-400">✗ Limitations</span>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              {c.p5}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-sm text-amber-200/90">
          <strong>Bottom line:</strong>{c.p12}<em> your specific use case</em> with your own eval set. No leaderboard can tell you
          which model is best for your problem.
        </p>
      </div>
    </section>
  )
}
