import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'
import { systemPromptsSv, systemPromptsKo } from './translations'

// Verified facts (May 2026):
// - ChatGPT Custom Instructions: Settings → Personalization → Custom Instructions
// - Custom GPTs: Plus required, GPT Builder via sidebar, Configure tab → Instructions
// - Claude Projects: project-level Instructions field
// - Gemini Gems: Instructions field for personalised AI assistants
// - Amazon Quick (formerly Q Business): Persona instructions + Reference documents +
//   Spaces. "Apps in Quick" let you describe an app in natural language. Custom chat
//   agents configured by IT admins. (docs.aws.amazon.com/quick)
// - Microsoft Copilot Studio: Topic / Agent instructions
// - Salesforce Agentforce: Topic / Action instructions

interface Surface {
  product: string
  tier: string
  fieldName: string
  whereToFind: string
  whoBuilds: string
  bestFor: string
  example: string
  color: string
  badge: string
}

const SURFACES: Surface[] = [
  {
    product: 'ChatGPT Custom Instructions',
    tier: 'Personal',
    fieldName: '"What would you like ChatGPT to know about you?" + "How would you like ChatGPT to respond?"',
    whereToFind: 'ChatGPT → Settings → Personalization → Custom Instructions',
    whoBuilds: 'You. Takes 5 minutes once.',
    bestFor: 'Your personal preferences applied to every chat — your role, your industry, your formatting and tone preferences.',
    example: '"I&apos;m a marketing manager at a B2B SaaS company. Always respond in plain language without jargon. Keep emails under 150 words. Lead with the conclusion."',
    color: 'border-blue-500/30 bg-blue-500/5',
    badge: 'bg-blue-500/20 text-blue-300',
  },
  {
    product: 'Custom GPTs / Claude Projects / Gemini Gems',
    tier: 'Team / Power user',
    fieldName: 'Instructions',
    whereToFind: 'ChatGPT GPT Builder (Plus required) → Configure tab · Claude Projects · Gemini Gems',
    whoBuilds: 'A team lead or power user. ~10 minutes to build, lifetime use.',
    bestFor: 'A purpose-built assistant your team can share — with persistent instructions, attached knowledge files, and (for Custom GPTs) connected actions.',
    example: '"Brand Voice Editor" — knows your brand guide, your forbidden words, your preferred tone. Anyone in marketing pastes copy in and gets consistent feedback.',
    color: 'border-purple-500/30 bg-purple-500/5',
    badge: 'bg-purple-500/20 text-purple-300',
  },
  {
    product: 'Amazon Quick (formerly Amazon Q Business)',
    tier: 'Enterprise',
    fieldName: 'Persona instructions + Reference documents + Spaces',
    whereToFind: 'Amazon Quick console → Chat agents → Create chat agent · or describe an app in natural language in "Apps in Quick"',
    whoBuilds: 'IT admins, ops, dept managers. Plugs into Slack, Teams, Outlook, CRMs, databases, and your internal docs.',
    bestFor: 'Company-wide AI assistants that connect to your real systems — CRM, ticketing, knowledge bases, internal apps. Free + Plus tiers; desktop, mobile, browser apps.',
    example: 'A "New Hire Onboarding" agent that answers questions from the employee handbook, files IT requests, schedules meetings with the buddy, and clears HR tickets — all from one Slack conversation.',
    color: 'border-amber-500/30 bg-amber-500/5',
    badge: 'bg-amber-500/20 text-amber-300',
  },
  {
    product: 'Microsoft Copilot Studio',
    tier: 'Enterprise',
    fieldName: 'Topic instructions / Agent instructions',
    whereToFind: 'Copilot Studio → Create → Agent / Topic',
    whoBuilds: 'Power Platform admins, citizen developers in M365 environments.',
    bestFor: 'Department-level agents inside Microsoft Teams / Outlook / SharePoint that work with your existing M365 data and permissions.',
    example: 'A "Procurement Helper" agent in Teams that pulls vendor data from SharePoint, drafts purchase requests in the right format, and routes them through your approval workflow.',
    color: 'border-cyan-500/30 bg-cyan-500/5',
    badge: 'bg-cyan-500/20 text-cyan-300',
  },
  {
    product: 'Salesforce Agentforce',
    tier: 'Enterprise (Salesforce shops)',
    fieldName: 'Topic instructions / Action instructions',
    whereToFind: 'Salesforce Setup → Agentforce',
    whoBuilds: 'Salesforce admins, RevOps.',
    bestFor: 'Agents that live inside your Salesforce data and processes — sales, service, marketing.',
    example: 'A service agent that summarises a case, suggests the next best action, and drafts a customer reply — all using Salesforce-native data and permissions.',
    color: 'border-emerald-500/30 bg-emerald-500/5',
    badge: 'bg-emerald-500/20 text-emerald-300',
  },
]

interface PromptExample {
  role: string
  prompt: string
  why: string
  color: string
}

const EXAMPLES: PromptExample[] = [
  {
    role: 'Customer support chatbot',
    prompt:
      'You are a support agent for Acme Corp. Be helpful, empathetic, and professional. Answer questions about our products and policies using the provided knowledge base. If you don\'t know the answer, say "Let me connect you with a team member" — never guess. Never discuss competitor products. Never share internal pricing or system IDs.',
    why: 'Defines the role, tone, data source, boundaries, and fallback behavior.',
    color: 'border-blue-500/30 bg-blue-500/5',
  },
  {
    role: 'Internal HR assistant',
    prompt:
      'You are an HR assistant for employees of Acme Corp. Answer questions about PTO, benefits, and company policies using the employee handbook (2025 edition). Be friendly but precise — employees make decisions based on your answers. If a question involves individual circumstances (accommodations, disputes, termination), say "Please contact your HR business partner directly" and provide the contact link.',
    why: 'Specifies the data source version, sets accuracy expectations, and defines clear escalation for sensitive topics.',
    color: 'border-emerald-500/30 bg-emerald-500/5',
  },
  {
    role: 'Sales email drafter',
    prompt:
      'You help sales reps draft follow-up emails. Match the tone of our brand: professional but warm, never pushy. Keep emails under 150 words. Always include a specific next step (meeting link, question, or deadline). Never make claims about features we don\'t have — if unsure, flag it for the rep to verify.',
    why: 'Controls tone, length, structure, and prevents the AI from making promises the company can\'t keep.',
    color: 'border-amber-500/30 bg-amber-500/5',
  },
]

const KEYS = [
  { key: 'Define the role', example: '"You are a support agent for Acme Corp"' },
  { key: 'Set the tone', example: '"Professional but warm, never pushy"' },
  { key: 'Specify data sources', example: '"Use the 2025 employee handbook"' },
  { key: 'Set boundaries', example: '"Never discuss competitors"' },
  { key: 'Define fallbacks', example: '"If unsure, say I don\'t know"' },
  { key: 'Limit scope', example: '"Only answer questions about our products"' },
]

const REBRAND_NOTE = `Note: Amazon Q Business was renamed Amazon Quick in April 2026 (announced at "What's Next with AWS, 2026"). Amazon Q Developer was rebranded to Kiro. You'll see both names in the wild for a while.`

export const SystemPromptsBusiness: React.FC = () => {
  const c = useT(
    {
      title: '4. Custom Instructions, Custom GPTs & AI Apps',
      intro: 'Most office workers using ChatGPT don\'t write &quot;system prompts.&quot; But every AI tool has a way to give it persistent instructions — your role, your team\'s rules, your company\'s policies. Knowing where to write them is a 10-minute skill that pays back forever.',
      introSub: 'These are the practical surfaces where business users actually configure AI behavior in 2026 — from personal preferences (5 minutes) up to company-wide AI apps (IT admins).',
      goodPromptTitle: 'What makes a good instruction (regardless of which surface)',
    },
    { sv: systemPromptsSv, ko: systemPromptsKo },
  )
  const [expanded, setExpanded] = useState<number | null>(0)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="sysprompt-biz">
      <h2 id="sysprompt-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300" dangerouslySetInnerHTML={{ __html: c.intro }} />
      <p className="mb-6 max-w-2xl text-sm text-zinc-400">{c.introSub}</p>

      {/* Surfaces */}
      <div className="mb-8 space-y-2">
        {SURFACES.map((s, i) => (
          <div key={i} className={`rounded-lg border ${s.color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-zinc-100">{s.product}</span>
                  <span className={`rounded px-2 py-0.5 text-xs ${s.badge}`}>{s.tier}</span>
                </div>
              </div>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-800 px-5 py-4 text-sm">
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">Field name</p>
                  <p className="font-mono text-xs text-zinc-300" dangerouslySetInnerHTML={{ __html: s.fieldName }} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">Where to find it</p>
                  <p className="text-xs text-zinc-300">{s.whereToFind}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-zinc-500">Who actually builds these</p>
                  <p className="text-xs text-zinc-300">{s.whoBuilds}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-emerald-400">Best for</p>
                  <p className="text-xs text-zinc-300">{s.bestFor}</p>
                </div>
                <div className="rounded bg-zinc-800/50 px-3 py-2">
                  <p className="mb-1 text-xs font-medium text-zinc-500">Concrete example</p>
                  <p className="text-xs text-zinc-300" dangerouslySetInnerHTML={{ __html: s.example }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Rebrand callout */}
      <div className="mb-6 rounded-md border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-zinc-300">
        <strong className="text-amber-300">Heads up — naming changes:</strong> {REBRAND_NOTE}
      </div>

      {/* Worked examples */}
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-100">Three worked examples — drop these into any of the surfaces above</h3>
      <div className="mb-8 space-y-3">
        {EXAMPLES.map((ex) => (
          <div key={ex.role} className={`rounded-lg border p-5 ${ex.color}`}>
            <p className="mb-2 text-sm font-medium text-zinc-100">{ex.role}</p>
            <div className="mb-3 rounded bg-zinc-800 p-3">
              <p className="font-mono text-xs leading-relaxed text-zinc-300">{ex.prompt}</p>
            </div>
            <p className="text-xs text-zinc-400">{ex.why}</p>
          </div>
        ))}
      </div>

      {/* Anatomy of a good instruction */}
      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-100">{c.goodPromptTitle}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {KEYS.map((k) => (
            <div key={k.key} className="rounded bg-zinc-800/50 px-3 py-2">
              <p className="text-xs font-medium text-amber-300">{k.key}</p>
              <p className="mt-1 text-xs text-zinc-400">{k.example}</p>
            </div>
          ))}
        </div>
      </div>

      <SelfExplain
        prompt="Pick a real, repetitive task at your company. Decide which surface above is the right home (Custom Instructions, Custom GPT / Claude Project, Amazon Quick app, Copilot Studio, Agentforce). Sketch a 4-line instruction for it."
        modelAnswer={
          'Example — IT helpdesk for a 200-person company:\n\nSurface: Amazon Quick custom chat agent (because it needs to plug into the IT ticketing system, the employee directory, and Slack — Custom GPT can\'t reach those).\n\nInstructions:\n"You are the IT support assistant for Acme Corp. Help employees with password resets, software access requests, VPN issues, and common troubleshooting. Use the IT knowledge base (2025). For password resets, walk users through the self-service portal step by step. For software access, check the approved-software list before proceeding. If the issue involves a security incident, data breach, or hardware failure, say: \'This needs our IT security team — I\'m creating a priority ticket for you now\' and escalate. Never share admin credentials or internal system architecture details."'
        }
      />
    </section>
  )
}
