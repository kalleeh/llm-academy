import { InteractiveDemo } from '../../components/InteractiveDemo'
import { useTranslation } from '../../i18n'

// Non-translatable per-failure color metadata. Order matches `failures` array in
// `useTranslation().modules.alignment.whyAIGoesWrong.failures`.
const FAILURE_META = [
  { color: 'border-red-500/30 bg-red-500/5' },
  { color: 'border-amber-500/30 bg-amber-500/5' },
  { color: 'border-purple-500/30 bg-purple-500/5' },
  { color: 'border-cyan-500/30 bg-cyan-500/5' },
]

export const WhyAIGoesWrongBusiness: React.FC = () => {
  const c = useTranslation().modules.alignment.whyAIGoesWrong
  return (
    <section aria-labelledby="wrong-biz">
      <h2 id="wrong-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        {c.intro}
      </p>
      <p className="mb-6 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
        {c.introSub}
      </p>

      <InteractiveDemo
        title="The Four Ways AI Can Fail"
        description="Real failures that happened to real companies. Click through to learn from their mistakes."
        steps={c.failures.map((f, i) => (
          <div key={f.title} className={`rounded-lg border p-5 ${FAILURE_META[i]?.color ?? ''}`}>
            <p className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{f.title}</p>
            <p className="mb-3 text-xs text-zinc-500">{f.analogy}</p>
            <p className="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{f.description}</p>
            <div className="mb-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 p-3">
              <p className="text-xs font-medium text-zinc-500">Real-world case</p>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{f.example}</p>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400"><strong className="text-zinc-700 dark:text-zinc-300">Business risk:</strong> {f.risk}</p>
          </div>
        ))}
      />
    </section>
  )
}
