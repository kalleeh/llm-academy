import { InteractiveDemo } from '../../components/InteractiveDemo'
import { useT } from '../../i18n'
import { basicsSv, basicsKo } from './translations'

const EXAMPLES = [
  {
    label: 'Writing an email',
    bad: 'Write me an email.',
    good: 'Write a follow-up email to a client who hasn\'t responded in 2 weeks. Professional but warm tone. Mention we\'re happy to adjust the proposal timeline. Keep it under 100 words.',
    why: 'The vague prompt could produce anything. The specific prompt tells the AI exactly what you need — like giving clear instructions to an assistant instead of saying "do something."',
  },
  {
    label: 'Summarizing a document',
    bad: 'Summarize this.',
    good: 'Summarize this quarterly report in 5 bullet points for the executive team. Focus on revenue changes, key risks, and action items. Skip the methodology section.',
    why: 'Without guidance, the AI might summarize the wrong parts or write 3 pages. With clear instructions, it knows the audience (executives), format (bullets), focus areas, and length.',
  },
  {
    label: 'Analyzing data',
    bad: 'Look at this data.',
    good: 'Analyze this customer feedback data. Group complaints into categories, rank them by frequency, and suggest the top 3 issues we should fix first. Present as a table.',
    why: '"Look at this" gives the AI nothing to work with. The specific prompt defines the task (categorize), the output (ranked table), and the goal (prioritize fixes).',
  },
]

export const BasicsBusiness: React.FC = () => {
  const c = useT({ title: '1. Why How You Ask Matters' , intro: 'Getting good results from AI is like giving instructions to a new intern — the clearer you are, the better the output.', keysTitle: 'The 4 keys to a good prompt', vagueLabel: 'Vague prompt', specificLabel: 'Specific prompt', introSub: 'Write something about our product gets vague results.'}, { sv: basicsSv, ko: basicsKo })
  return (
  <section aria-labelledby="basics-biz">
    <h2 id="basics-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
    <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300">
{c.intro}
    </p>
    <p className="mb-6 max-w-2xl text-sm text-zinc-400">
      &quot;Write something about our product&quot; gets vague results. &quot;Write a 200-word product
      description for our website, professional tone, highlighting these 3 features&quot; gets exactly
      what you need.
    </p>

    <InteractiveDemo
      title="Vague vs Specific — See the Difference"
      description="Compare bad prompts with good ones for common work tasks."
      steps={EXAMPLES.map((ex) => (
        <div key={ex.label} className="space-y-3">
          <p className="text-sm font-medium text-zinc-100">{ex.label}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <p className="mb-2 text-xs font-medium text-red-400">{c.vagueLabel}</p>
              <p className="text-sm text-zinc-400 italic">&quot;{ex.bad}&quot;</p>
            </div>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
              <p className="mb-2 text-xs font-medium text-emerald-400">{c.specificLabel}</p>
              <p className="text-sm text-zinc-300 italic">&quot;{ex.good}&quot;</p>
            </div>
          </div>
          <p className="text-xs text-zinc-400">{ex.why}</p>
        </div>
      ))}
    />

    <div className="mt-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
      <p className="mb-3 text-sm font-medium text-zinc-100">{c.keysTitle}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {[
          { key: 'Be specific', example: 'Not "help with email" but "draft a follow-up to a client about the delayed shipment"' },
          { key: 'Give context', example: '"You are helping a B2B SaaS company" or "the audience is senior executives"' },
          { key: 'Show examples', example: '"Here\'s a good response we sent before — write one like this"' },
          { key: 'Specify format', example: '"Bullet points", "one paragraph", "table with 3 columns"' },
        ].map((k) => (
          <div key={k.key} className="rounded bg-zinc-800/50 px-4 py-3">
            <p className="text-sm font-medium text-amber-300">{k.key}</p>
            <p className="mt-1 text-xs text-zinc-400">{k.example}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}
