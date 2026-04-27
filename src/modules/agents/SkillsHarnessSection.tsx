import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { skillsHarnessSectionSv, skillsHarnessSectionKo } from './tech-translations'
import { CodeBlock } from '../../components/CodeBlock'
import { SelfExplain } from '../../components/SelfExplain'

const HARNESS_CONFIG = `# AgentCore managed harness — 3 API calls to a production agent
import boto3

client = boto3.client("bedrock-agentcore")

# 1. Create the harness
harness = client.create_harness(
    name="support-agent",
    model_id="anthropic.claude-sonnet-4-20250514",
    system_prompt="""You are a Tier 1 support agent for Acme Corp.
    - Look up customer info before responding
    - Issue refunds up to $100 without approval
    - Escalate billing disputes over $100 to the billing team
    - Never share internal system IDs with customers""",
    tools=["mcp://crm-server", "mcp://ticketing-server"],
    memory={"type": "session", "ttl_hours": 24},
    max_iterations=10,
    timeout_seconds=30,
)

# 2. Invoke it
response = client.invoke_harness(
    harness_id=harness["id"],
    input="Customer says: I was charged twice for order #4521"
)

# 3. The harness manages the full loop:
# think → select tool → call MCP server → read result → repeat → respond`

const SKILL_EXAMPLE = `# AgentCore Skill — reusable behavioral package
# skills/customer-onboarding/skill.yaml
name: customer-onboarding
version: 1.0.0
description: 7-step enterprise customer onboarding workflow

tools:
  - mcp://crm-server        # Read/write customer records
  - mcp://email-server       # Send onboarding emails
  - mcp://calendar-server    # Schedule kickoff meetings

instructions: |
  Follow the onboarding checklist:
  1. Verify contract is signed in CRM
  2. Create customer workspace
  3. Send welcome email (template: enterprise-welcome)
  4. Schedule kickoff call within 5 business days
  5. Assign customer success manager
  6. Create 30/60/90 day check-in tasks
  7. Update CRM status to "Onboarding"
  
  If any step fails, log the error and notify the CS team.
  Do NOT skip steps or reorder them.`

const CAPABILITIES = [
  { name: 'MCP Server', layer: 'Connectivity', what: 'Universal tool connector — exposes one API/database/service to any MCP client', granularity: 'Single tool or resource', reusability: 'Any MCP-compatible agent or IDE', example: 'mcp-server-salesforce, mcp-server-postgres, mcp-server-slack' },
  { name: 'AgentCore Skill', layer: 'Behavior', what: 'Workflow package — MCP tools + instructions + domain logic', granularity: 'Multi-step business process', reusability: 'Any AgentCore harness', example: 'customer-onboarding, invoice-processing, incident-triage' },
  { name: 'Kiro Power', layer: 'Dev Experience', what: 'Curated MCP servers + steering files + hooks for a specific technology', granularity: 'Technology domain', reusability: 'Kiro IDE', example: 'AWS Observability, Arm Development, Feature Flags' },
  { name: 'AgentCore Harness', layer: 'Runtime', what: 'Managed agent loop — model + system prompt + tools + memory + limits', granularity: 'Complete agent', reusability: 'Production deployment', example: 'Support agent, sales assistant, IT helpdesk' },
]

const EN_INTRO = `MCP gives agents tools. But tools alone aren't enough — you need workflow logic, runtime management, and reusable behavioral packages. The ecosystem has converged on distinct layers.`

export const SkillsHarnessSection: React.FC = () => {
  const { lang } = useLanguage()
  const cAPABILITIEST = tArray(lang, CAPABILITIES)
  const c = useT({ title: '7. Skills, Powers, and the AgentCore Harness', intro: EN_INTRO }, { sv: skillsHarnessSectionSv, ko: skillsHarnessSectionKo })
  return (
  <section aria-labelledby="skills-tech">
    <h2 id="skills-tech" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

    {/* Capability comparison */}
    <div className="mb-6 overflow-hidden rounded-lg border border-zinc-700">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-zinc-700 bg-zinc-800">
            {['Name', 'Layer', 'What it is', 'Granularity', 'Reusability'].map((h) => (
              <th key={h} className="px-3 py-2 text-left font-medium text-zinc-400">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cAPABILITIEST.map((c) => (
            <tr key={c.name} className="border-b border-zinc-800 last:border-0">
              <td className="px-3 py-2 font-medium text-amber-300">{c.name}</td>
              <td className="px-3 py-2 text-zinc-400">{c.layer}</td>
              <td className="px-3 py-2 text-zinc-300">{c.what}</td>
              <td className="px-3 py-2 text-zinc-400">{c.granularity}</td>
              <td className="px-3 py-2 text-zinc-400">{c.reusability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Harness code */}
    <div className="mb-6">
      <p className="mb-2 text-sm text-zinc-300">
        The <strong className="text-zinc-100">managed harness</strong> is the key abstraction — it replaces
        hand-written orchestration with configuration. Model, system prompt, tools, memory, and limits
        are declared; AgentCore runs the agent loop.
      </p>
      <CodeBlock code={HARNESS_CONFIG} language="python" title="AgentCore managed harness — production agent in 3 calls" />
    </div>

    {/* Skill example */}
    <div className="mb-6">
      <p className="mb-2 text-sm text-zinc-300">
        <strong className="text-zinc-100">Skills</strong> encode multi-step workflows as reusable packages.
        They combine MCP tools with procedural instructions — turning tribal knowledge into agent behavior.
      </p>
      <CodeBlock code={SKILL_EXAMPLE} language="python" title="AgentCore Skill definition" />
    </div>

    <SelfExplain
      prompt="You have an MCP server for your CRM and another for your email system. Explain how you'd compose these into a Skill for 'lead follow-up' — what instructions would the skill need beyond just the tool connections?"
      modelAnswer="The MCP servers provide connectivity (read CRM, send email), but the Skill needs workflow logic: (1) Query CRM for leads with status='demo_completed' and no follow-up in 3 days. (2) For each lead, check if a proposal was sent (CRM field). (3) If no proposal: draft a follow-up email using the lead's name, company, and demo notes. (4) If proposal sent but no response in 7 days: draft a gentle check-in. (5) Log the follow-up in CRM with timestamp. (6) If the lead has a 'do not contact' flag, skip and notify the sales rep instead. The Skill encodes the business rules and decision logic that raw MCP tools don't have — it's the difference between having a phone and knowing who to call and what to say."
    />
  </section>
  )
}