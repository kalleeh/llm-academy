import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'
import { techniquesSv, techniquesKo } from './translations'

const TECHNIQUES = [
  {
    name: 'Give it a role',
    analogy: 'Like briefing a consultant before a meeting',
    example: '"You are an experienced HR manager at a mid-size tech company. An employee asks about parental leave options."',
    why: 'The AI adjusts its tone, vocabulary, and perspective to match the role — just like a consultant adapts to the client\'s context.',
    color: 'border-blue-400 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5',
  },
  {
    name: 'Ask for step-by-step thinking',
    analogy: 'Like asking someone to show their work, not just the answer',
    example: '"Think through this step by step: should we expand into the European market? Consider costs, regulations, competition, and timing."',
    why: 'When AI thinks out loud, it catches its own mistakes and gives more thorough answers — like how writing out your reasoning helps you think more clearly.',
    color: 'border-purple-400 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/5',
  },
  {
    name: 'Give examples',
    analogy: 'Like training by showing, not just telling',
    example: '"Here are 3 customer responses our team rated as excellent: [examples]. Write a response to this new complaint in the same style."',
    why: 'Examples are worth a thousand words of instructions. The AI picks up on patterns in tone, length, structure, and approach.',
    color: 'border-emerald-400 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5',
  },
  {
    name: 'Create reusable templates',
    analogy: 'Like email templates, but for AI',
    example: '"Summarize the attached meeting notes. Format: (1) Key decisions made, (2) Action items with owners, (3) Open questions for next meeting."',
    why: 'Once you find a prompt that works well, save it and reuse it. Your whole team can use the same template for consistent results. AI coding tools like Kiro take this further — they use structured specs and task lists rather than freeform prompts, turning "vibe coding" into systematic development.',
    color: 'border-amber-400 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5',
  },
]

const MISTAKES = [
  { mistake: 'Being too vague', fix: 'Add specifics: who, what, format, length, tone' },
  { mistake: 'No context', fix: 'Tell the AI who you are, who the audience is, and why' },
  { mistake: 'Multiple requests at once', fix: 'One task per prompt — like one topic per email' },
  { mistake: 'Not iterating', fix: 'If the first result isn\'t right, refine — "make it shorter" or "more formal"' },
]

export const TechniquesBusiness: React.FC = () => {
  const c = useT({ title: '2. Practical Techniques for Everyday Work' , techniques: TECHNIQUES, mistakes: MISTAKES, intro: 'Four techniques that immediately improve your AI results', mistakesTitle: 'Common mistakes (and quick fixes)'}, { sv: techniquesSv, ko: techniquesKo })
  return (
  <section aria-labelledby="techniques-biz">
    <h2 id="techniques-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
    <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
{c.intro}
    </p>

    <div className="mb-8 space-y-3">
      {c.techniques.map((t, i) => (
        <div key={t.name} className={`rounded-lg border p-5 ${(TECHNIQUES[i]?.color ?? "")}`}>
          <div className="mb-2"><span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t.name}</span><span className="ml-2 text-xs text-zinc-600 dark:text-zinc-400">— {t.analogy}</span></div>
          <div className="mb-2 rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2">
            <p className="text-xs text-zinc-500">Example prompt</p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300 italic">{t.example}</p>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">{t.why}</p>
        </div>
      ))}
    </div>

    <div className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
      <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.mistakesTitle}</p>
      <div className="space-y-2">
        {c.mistakes.map((m) => (
          <div key={m.mistake} className="flex items-start gap-3 rounded bg-zinc-100 dark:bg-zinc-800/50 px-4 py-3">
            <span className="text-xs text-red-700 dark:text-red-400">✗</span>
            <div>
              <span className="text-sm text-zinc-700 dark:text-zinc-300">{m.mistake}</span>
              <span className="mx-2 text-zinc-500 dark:text-zinc-600">→</span>
              <span className="text-sm text-emerald-700 dark:text-emerald-300">{m.fix}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <SelfExplain
      prompt="Pick a task you do regularly at work (writing emails, summarizing meetings, analyzing data, etc.). Write a specific prompt that would get AI to help you with it effectively. Use at least 2 of the techniques above."
      modelAnswer="Example: 'You are a senior project manager at a software company (role). I'm going to paste in notes from today's sprint retrospective. Please: (1) List the top 3 things the team said went well, (2) List the top 3 improvement areas with specific suggestions, (3) Create a table of action items with owner and due date (format). Here's an example of a good retro summary from last month: [paste example]. Keep the tone constructive and forward-looking (tone). Limit to one page (length).' This uses role-playing, examples, step-by-step structure, and specific format instructions."
    />
  </section>
  )
}
