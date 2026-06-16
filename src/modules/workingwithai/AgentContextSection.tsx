import { AppSession } from '../../components/AppSession'
import { ChatWindow } from '../../components/ChatWindow'
import type { ChatRole } from '../../components/ChatWindow'
import { AgentTranscript } from '../../components/AgentTranscript'
import type { TranscriptTurn } from '../../components/AgentTranscript'
import { SelfExplain } from '../../components/SelfExplain'
import { Icon } from '../../components/Icon'
import { useDifficulty } from '../../DifficultyContext'
import { useTranslation } from '../../i18n'

// The before/after chat is two roles: the same request, then the reply.
const CHAT_ROLES: ChatRole[] = ['user', 'assistant']

// Technical transcript stays English by convention (matches RealSessionSection):
// the same task — add an endpoint returning a day's open appointment slots — run
// without and with the clinic's AGENTS.md loaded. The card above drives both columns.
const NO_CONTEXT_TURNS: TranscriptTurn[] = [
  { lines: [
    { kind: 'user', text: 'add an endpoint that returns the open appointment slots for a given day' },
  ], delay: 800 },
  { lines: [
    { kind: 'tool', text: 'Write(routes/slots.js)' },
    { kind: 'result', text: 'Wrote 8 lines' },
    { kind: 'diff-add', text: "    + app.get('/slots', (req, res) => {" },
    { kind: 'diff-add', text: "    +   res.send(['09:00', '10:00', '11:00', '14:00'])" },
    { kind: 'diff-add', text: '    + })' },
    { kind: 'assistant', text: 'Added a /slots route that returns the open times for the day.' },
  ], delay: 1100 },
]
const WITH_CONTEXT_TURNS: TranscriptTurn[] = [
  { lines: [
    { kind: 'user', text: 'add an endpoint that returns the open appointment slots for a given day' },
  ], delay: 800 },
  { lines: [
    { kind: 'tool', text: 'Read(AGENTS.md, src/calendar.ts)' },
    { kind: 'result', text: 'TypeScript + Fastify; slots come from the live calendar, never hardcoded; table-driven tests' },
    { kind: 'assistant', text: 'Following the conventions: a typed Fastify route that reads the live calendar, plus a table-driven test.' },
  ], delay: 1100 },
  { lines: [
    { kind: 'tool', text: 'Write(src/routes/slots.ts)' },
    { kind: 'result', text: 'Wrote 16 lines' },
    { kind: 'diff-add', text: "    + fastify.get<{ Params: { date: string } }>('/slots/:date', async (req, reply) => {" },
    { kind: 'diff-add', text: '    +   const day = parseDate(req.params.date)' },
    { kind: 'diff-add', text: '    +   if (!day) throw new BadRequestError(`invalid date ${req.params.date}`)' },
    { kind: 'diff-add', text: '    +   return { slots: await openSlots(day) } // from the live calendar' },
    { kind: 'diff-add', text: '    + })' },
  ], delay: 1200 },
  { lines: [
    { kind: 'tool', text: 'Write(test/slots.test.ts)' },
    { kind: 'result', text: 'Wrote a table-driven test — a day with openings, a fully-booked day (empty), a bad date (400)' },
    { kind: 'tool', text: 'Bash(npm test && tsc --noEmit)' },
    { kind: 'ok', text: '3 tests passed, types clean' },
    { kind: 'assistant', text: 'Done. Typed Fastify route, slots read from the live calendar, invalid dates 400 with a wrapped error, and a table-driven test locks it in.' },
  ], delay: 1300 },
]

interface ContextCardProps {
  title: string
  company: { label: string; body: string }
  project: { label: string; body: string }
  role: { label: string; body: string }
}

const ContextCard: React.FC<ContextCardProps> = ({ title, company, project, role }) => {
  const blocks = [
    { icon: 'warehouse' as const, ...company },
    { icon: 'target' as const, ...project },
    { icon: 'people' as const, ...role },
  ]
  return (
    <div className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
        <Icon name="clipboard" size={14} /> {title}
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {blocks.map((b) => (
          <div key={b.label} className="rounded-lg bg-white/60 dark:bg-zinc-900/50 p-3">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-zinc-500">
              <Icon name={b.icon} size={12} /> {b.label}
            </p>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{b.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const AgentContextSection: React.FC = () => {
  const { mode } = useDifficulty()
  const c = useTranslation().modules.workingwithai.agentContext
  const isBusiness = mode === 'business'

  const tabs = [
    { id: 'before', label: c.genericTab },
    { id: 'after', label: c.briefedTab },
  ]

  return (
    <section aria-labelledby="agent-context">
      <h2 id="agent-context" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{isBusiness ? c.introBusiness : c.introTechnical}</p>

      <ContextCard
        title={c.cardTitle}
        company={c.company}
        project={c.project}
        role={isBusiness ? c.roleBusiness : c.roleTechnical}
      />

      <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{c.taskLabel}</span>{' '}
        {isBusiness ? c.taskBusiness : c.taskTechnical}
      </p>

      <AppSession tabs={tabs} toggleLabel={c.toggleLabel}>
        {(activeId) =>
          isBusiness ? (
            <ChatWindow
              key={activeId}
              variant="claude"
              steps={[...(activeId === 'after' ? c.briefedSteps : c.genericSteps)]}
              roles={CHAT_ROLES}
            />
          ) : (
            <AgentTranscript
              key={activeId}
              variant="claude-code"
              turns={activeId === 'after' ? WITH_CONTEXT_TURNS : NO_CONTEXT_TURNS}
            />
          )
        }
      </AppSession>

      <p className="mt-6 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{isBusiness ? c.bridgeBusiness : c.bridgeTechnical}</p>

      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
