import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../useT'
import { systemPromptsSv, systemPromptsKo } from './translations'

const EXAMPLES = [
  {
    role: 'Customer support chatbot',
    prompt: 'You are a support agent for Acme Corp. Be helpful, empathetic, and professional. Answer questions about our products and policies using the provided knowledge base. If you don\'t know the answer, say "Let me connect you with a team member" — never guess. Never discuss competitor products. Never share internal pricing or system IDs.',
    why: 'Defines the role, tone, data source, boundaries, and fallback behavior. The customer never sees this — but it shapes every response.',
    color: 'border-blue-500/30 bg-blue-500/5',
  },
  {
    role: 'Internal HR assistant',
    prompt: 'You are an HR assistant for employees of Acme Corp. Answer questions about PTO, benefits, and company policies using the employee handbook (2025 edition). Be friendly but precise — employees make decisions based on your answers. If a question involves individual circumstances (accommodations, disputes, termination), say "Please contact your HR business partner directly" and provide the contact link.',
    why: 'Specifies the data source version (2025 handbook), sets accuracy expectations, and defines clear escalation for sensitive topics.',
    color: 'border-emerald-500/30 bg-emerald-500/5',
  },
  {
    role: 'Sales email drafter',
    prompt: 'You help sales reps draft follow-up emails. Match the tone of our brand: professional but warm, never pushy. Keep emails under 150 words. Always include a specific next step (meeting link, question, or deadline). Never make claims about features we don\'t have — if unsure, flag it for the rep to verify.',
    why: 'Controls tone, length, structure, and prevents the AI from making promises the company can\'t keep.',
    color: 'border-amber-500/30 bg-amber-500/5',
  },
]

export const SystemPromptsBusiness: React.FC = () => {
  const c = useT({ title: '4. The Hidden Instructions — System Prompts' , intro: 'Every AI tool has hidden instructions', introSub: 'When you use ChatGPT, there\'s a system prompt behind the scenes', goodPromptTitle: 'What makes a good system prompt?'}, { sv: systemPromptsSv, ko: systemPromptsKo })
  return (
  <section aria-labelledby="sysprompt-biz">
    <h2 id="sysprompt-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">
        {c.title}
      </h2>
    <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300">
{c.intro}
    </p>
    <p className="mb-6 max-w-2xl text-sm text-zinc-400">
{c.introSub}
    </p>

    <div className="mb-8 space-y-3">
      {EXAMPLES.map((ex, i) => (
        <div key={ex.role} className={`rounded-lg border p-5 ${(EXAMPLES[i]?.color ?? "")}`}>
          <p className="mb-2 text-sm font-medium text-zinc-100">{ex.role}</p>
          <div className="mb-3 rounded bg-zinc-800 p-3">
            <p className="font-mono text-xs leading-relaxed text-zinc-300">{ex.prompt}</p>
          </div>
          <p className="text-xs text-zinc-400">{ex.why}</p>
        </div>
      ))}
    </div>

    <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
      <p className="mb-3 text-sm font-medium text-zinc-100">{c.goodPromptTitle}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {[
          { key: 'Define the role', example: '"You are a support agent for Acme Corp"' },
          { key: 'Set the tone', example: '"Professional but warm, never pushy"' },
          { key: 'Specify data sources', example: '"Use the 2025 employee handbook"' },
          { key: 'Set boundaries', example: '"Never discuss competitors"' },
          { key: 'Define fallbacks', example: '"If unsure, say I don\'t know"' },
          { key: 'Limit scope', example: '"Only answer questions about our products"' },
        ].map((k) => (
          <div key={k.key} className="rounded bg-zinc-800/50 px-3 py-2">
            <p className="text-xs font-medium text-amber-300">{k.key}</p>
            <p className="mt-1 text-xs text-zinc-400">{k.example}</p>
          </div>
        ))}
      </div>
    </div>

    <SelfExplain
      prompt="Write a system prompt for an AI assistant that helps your team with a specific task at work. Define its role, tone, data sources, boundaries, and what it should do when it doesn't know the answer."
      modelAnswer={'Example for an IT helpdesk bot: "You are the IT support assistant for Acme Corp. Help employees with password resets, software access requests, VPN issues, and common troubleshooting. Use the IT knowledge base (2025). Be patient and clear — assume the user is not technical. For password resets, walk them through the self-service portal step by step. For software access, check if the software is on the approved list before proceeding. If the issue involves security incidents, data breaches, or hardware problems, say: This needs our IT security team — I am creating a priority ticket for you now, and escalate. Never share admin credentials or internal system architecture details."'}
    />
  </section>
  )
}
