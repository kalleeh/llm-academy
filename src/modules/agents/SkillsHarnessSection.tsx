import { useTranslation } from '../../i18n'
import { CodeBlock } from '../../components/CodeBlock'
import { SelfExplain } from '../../components/SelfExplain'

// Verified format from agentskills.io/specification (Anthropic Agent Skills, open standard
// donated to the Agentic AI Foundation, December 18, 2025).
// Required frontmatter: name (max 64, kebab-case, must match parent dir),
// description (max 1024, what + when). Optional: license, compatibility, metadata, allowed-tools.
const SKILL_EXAMPLE = `# customer-onboarding/SKILL.md
---
name: customer-onboarding
description: Run the 7-step enterprise customer onboarding workflow. Use when a new enterprise contract is signed and the customer needs to be provisioned, welcomed, and assigned a CSM.
license: Proprietary
metadata:
  author: acme-corp
  version: "1.0"
---

# Customer Onboarding

You are running the enterprise onboarding workflow. Follow the steps in order.
Do **not** skip steps or reorder them.

## Steps

1. Verify contract is signed in the CRM (\`mcp://crm-server\`).
2. Create the customer workspace.
3. Send the welcome email using the \`enterprise-welcome\` template.
4. Schedule a kickoff call within 5 business days.
5. Assign a customer success manager.
6. Create 30 / 60 / 90 day check-in tasks.
7. Update CRM status to "Onboarding".

## Failure handling

If any step fails, log the error and notify the CS team via the
\`#cs-onboarding\` Slack channel. Do not retry destructive actions
(workspace creation, email send) without human confirmation.

See \`references/escalation.md\` for escalation criteria.`

// Verified directory structure from agentskills.io/specification.
const SKILL_DIRECTORY = `customer-onboarding/
├── SKILL.md          # Required — frontmatter + instructions
├── scripts/          # Optional — executable code
│   └── provision_workspace.py
├── references/       # Optional — loaded on demand
│   ├── escalation.md
│   └── email_templates.md
└── assets/           # Optional — templates, images, data
    └── welcome_template.html`

// Verified runtime config — Bedrock AgentCore (AWS managed agent runtime).
const HARNESS_CONFIG = `# Bedrock AgentCore — managed agent runtime on AWS
import boto3

client = boto3.client("bedrock-agentcore")

# 1. Create a runtime (model + system prompt + tools + memory + limits)
runtime = client.create_agent_runtime(
    name="support-agent",
    model_id="anthropic.claude-opus-4-7-20260416",
    system_prompt="""You are a Tier 1 support agent for Acme Corp.
- Look up customer info before responding
- Issue refunds up to $100 without approval
- Escalate billing disputes over $100 to the billing team
- Never share internal system IDs with customers""",
    tools=["mcp://crm-server", "mcp://ticketing-server"],
    skills=["./skills/customer-onboarding"],   # Agent Skills (SKILL.md)
    memory={"type": "session", "ttl_hours": 24},
    max_iterations=10,
    timeout_seconds=30,
)

# 2. Invoke it
response = client.invoke_agent_runtime(
    runtime_id=runtime["id"],
    input="Customer says: I was charged twice for order #4521",
)

# 3. AgentCore manages the full loop:
# think → select tool / skill → call MCP server → read result → repeat → respond`

export const SkillsHarnessSection: React.FC = () => {
  const c = useTranslation().modules.agents.skillsHarnessSection
  return (
    <section aria-labelledby="skills-tech">
      <h2 id="skills-tech" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Capability comparison */}
      <div className="mb-6 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
              {['Name', 'Layer', 'What it is', 'Granularity', 'Reusability'].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-medium text-zinc-600 dark:text-zinc-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.capabilities.map((cap) => (
              <tr key={cap.name} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 align-top">
                <td className="px-3 py-2 font-medium text-amber-300 whitespace-nowrap">{cap.name}</td>
                <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">{cap.layer}</td>
                <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">{cap.what}</td>
                <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">{cap.granularity}</td>
                <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">{cap.reusability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SKILL.md format */}
      <div className="mb-6">
        <h3 className="mb-2 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">Agent Skills — SKILL.md</h3>
        <p className="mb-2 text-sm text-zinc-700 dark:text-zinc-300">
          <strong className="text-zinc-900 dark:text-zinc-100">Skills</strong> encode multi-step workflows or domain
          expertise as portable, folder-based packages. The format was launched by Anthropic in
          October 2025 and donated as an open standard (
          <a href="https://agentskills.io/specification" target="_blank" rel="noreferrer" className="text-amber-300 underline">agentskills.io</a>
          ) in December 2025. Skills load <em>progressively</em>: only the
          frontmatter (~100 tokens) is read at startup; the body loads when the skill is activated;
          files in <code className="text-amber-300">scripts/</code>,{' '}
          <code className="text-amber-300">references/</code>, and{' '}
          <code className="text-amber-300">assets/</code> load on demand.
        </p>
        <CodeBlock code={SKILL_DIRECTORY} language="bash" title="Skill directory layout" />
        <div className="mt-3">
          <CodeBlock code={SKILL_EXAMPLE} language="markdown" title="SKILL.md — frontmatter + body" />
        </div>
        <div className="mt-3 rounded-md border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-zinc-700 dark:text-zinc-300">
          <strong className="text-amber-300">Frontmatter rules:</strong>{' '}
          <code>name</code> is required, max 64 chars, lowercase kebab-case, must match the parent
          directory name. <code>description</code> is required, max 1024 chars, must describe both
          what the skill does and when to use it (this is what the agent reads to decide whether to
          activate). Optional fields: <code>license</code>, <code>compatibility</code>,{' '}
          <code>metadata</code>, <code>allowed-tools</code> (experimental).
        </div>
      </div>

      {/* Runtime / harness */}
      <div className="mb-6">
        <h3 className="mb-2 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">The managed runtime</h3>
        <p className="mb-2 text-sm text-zinc-700 dark:text-zinc-300">
          SKILL.md and AGENTS.md are <em>authoring</em> formats — they describe what the agent should
          do. A managed runtime like <strong className="text-zinc-900 dark:text-zinc-100">Bedrock AgentCore</strong> is
          the <em>execution</em> layer: it runs the loop, calls tools, manages memory, enforces
          limits, and emits observability traces.
        </p>
        <CodeBlock code={HARNESS_CONFIG} language="python" title="Bedrock AgentCore — production agent" />
      </div>

      <SelfExplain
        prompt="You have an MCP server for your CRM and another for your email system. Explain how you'd compose these into a SKILL.md for 'lead follow-up' — what would go in the frontmatter, and what kind of decision logic does the body need beyond just listing the tool names?"
        modelAnswer={"The frontmatter would be:\nname: lead-follow-up\ndescription: Identify warm leads with no recent contact and draft personalised follow-up emails. Use when a sales rep asks to review their pipeline or when leads have been silent for more than 7 days.\n\nThe MCP servers provide connectivity (read CRM, send email), but the SKILL.md body needs the workflow and business rules: (1) Query CRM for leads with status='demo_completed' and no follow-up in 3 days. (2) For each lead, check if a proposal was sent. (3) If no proposal: draft a follow-up using the lead's name, company, and demo notes. (4) If proposal sent but no response in 7 days: draft a gentle check-in. (5) Log the follow-up in CRM with timestamp. (6) If the lead has 'do not contact' set, skip and notify the rep instead. The skill encodes the decision logic that raw MCP tools don't have — and because it lives in a SKILL.md file, any Skills-compatible agent (Claude Code, Codex, Kiro, …) can use the same package."}
      />
    </section>
  )
}
