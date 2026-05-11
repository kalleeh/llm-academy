import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { WhatAreAgentsSection } from './agents/WhatAreAgentsSection'
import { FunctionCallingSection } from './agents/FunctionCallingSection'
import { MCPSection } from './agents/MCPSection'
import { DesignPatternsSection } from './agents/DesignPatternsSection'
import { ContextFilesSection } from './agents/ContextFilesSection'
import { BuildingAgentsSection } from './agents/BuildingAgentsSection'
import { A2ASection } from './agents/A2ASection'
import { SkillsHarnessSection } from './agents/SkillsHarnessSection'
import { WhatAreAgentsBusiness } from './agents/WhatAreAgentsBusiness'
import { ToolUseBusiness } from './agents/ToolUseBusiness'
import { AgentPatternsBusiness } from './agents/AgentPatternsBusiness'
import { HowAgentsConnectBusiness } from './agents/HowAgentsConnectBusiness'
import { ContextFilesBusiness } from './agents/ContextFilesBusiness'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'

const TECHNICAL_QUESTIONS: Question[] = [
  {
    id: 'agents-1',
    type: 'free',
    question: 'Describe the three stages of a ReAct loop and explain why the "Observation" stage is critical. What would happen if an agent skipped it?',
    modelAnswer: 'The three stages are: (1) Thought — the LLM reasons about what to do next based on the goal and current state. (2) Action — the agent calls a tool or API to interact with the external world. (3) Observation — the agent reads the result of the action and incorporates it into its context. Without the Observation stage, the agent would be "flying blind" — it would call tools but never see the results, so it couldn\'t adapt its plan, detect errors, or know when the task is complete. It would degenerate into a fixed script rather than a reactive agent.',
    explanation: 'The Observation stage closes the feedback loop. It\'s what makes agents adaptive rather than scripted — they can react to unexpected results, errors, and partial information.',
  },
  {
    id: 'agents-2',
    type: 'mc',
    question: 'What is the key difference between MCP and A2A?',
    options: [
      'MCP is newer than A2A',
      'MCP connects agents to tools/resources; A2A connects agents to other agents for cross-boundary collaboration',
      'A2A replaces MCP for all use cases',
      'MCP only works with Anthropic models, A2A only with Google models',
    ],
    correctIndex: 1,
    explanation: 'MCP (Anthropic, 2024) standardizes agent→tool connections. A2A (Google → Linux Foundation, 2025) standardizes agent→agent communication. They\'re complementary layers: MCP gives an agent capabilities, A2A lets agents delegate to and collaborate with other agents across organizational boundaries.',
  },
  {
    id: 'agents-3',
    type: 'mc',
    question: 'What distinguishes an AgentCore Skill from a raw MCP server?',
    options: [
      'Skills are faster than MCP servers',
      'Skills bundle MCP tools with workflow instructions and domain logic — encoding multi-step business processes, not just tool connectivity',
      'Skills don\'t use MCP at all',
      'Skills are only for coding assistants',
    ],
    correctIndex: 1,
    explanation: 'An MCP server provides connectivity to one system (e.g., CRM read/write). A Skill combines multiple MCP tools with procedural instructions and decision logic — it knows the 7-step onboarding process, not just how to call the CRM API. Skills encode tribal knowledge into repeatable agent behavior.',
  },
  {
    id: 'agents-4',
    type: 'free',
    question: 'You\'re deploying a support agent at L2 autonomy (bounded — acts within rules, human monitors). An agent-specific failure mode called "goal drift" occurs: the agent starts closing tickets prematurely to optimize its resolution count. How would you detect and prevent this?',
    modelAnswer: 'Detection: Monitor outcome metrics, not just throughput. Track ticket reopen rate (if the agent closes tickets that get reopened, it\'s not actually resolving them), CSAT scores per agent-resolved ticket, and average resolution time (suspiciously fast closures are a red flag). Set alerts: reopen rate >10% triggers investigation, CSAT drop >0.5 points triggers L1 fallback. Prevention: (1) Don\'t expose resolution count as a metric the agent can see or optimize for. (2) Define "resolved" in the system prompt as "customer confirms issue is fixed" not "ticket status changed to closed." (3) Require a customer confirmation step before closing. (4) Weekly behavioral audit: sample 50 closed tickets and verify resolution quality. (5) Add a Bedrock Guardrails check that flags tickets closed without a resolution summary.',
    explanation: 'Goal drift is an alignment problem at the agent level — the agent optimizes for a measurable proxy (tickets closed) instead of the actual goal (issues resolved). The fix is measuring outcomes (CSAT, reopen rate) not outputs (close count), and building verification into the workflow.',
  },
  {
    id: 'agents-5',
    type: 'mc',
    question: 'An agent is stuck in a loop — it keeps calling the same API with slightly different parameters and getting errors. What design pattern would prevent this?',
    options: [
      'Give the agent more tools to try',
      'Increase the context window size',
      'Add a maximum iteration limit with a fallback strategy (e.g., ask the user for help or return a partial result)',
      'Switch to a larger model',
    ],
    correctIndex: 2,
    explanation: 'Infinite loops are a common agent failure mode. A maximum iteration limit (max_iterations in AgentCore harness config) is a basic safety mechanism. Combined with a fallback strategy (escalate to human, return partial results, try a different approach), it prevents the agent from burning tokens and time on unrecoverable errors.',
  },
]

const BUSINESS_QUESTIONS: Question[] = [
  {
    id: 'agents-biz-1',
    type: 'mc',
    question: 'Your company wants to automate customer support. Customers ask about order status, return policies, and billing issues. Which agent setup makes the most sense?',
    options: [
      'One agent that handles everything — keep it simple',
      'A router agent that detects the topic and hands off to specialist agents for orders, returns, and billing',
      'A multi-agent team where agents discuss the answer together',
      'No agent needed — just a FAQ page',
    ],
    correctIndex: 1,
    explanation: 'Different request types (orders, returns, billing) need access to different systems and have different workflows. A router + specialists pattern is like having a receptionist direct calls to the right department — each specialist agent is focused and has the right tools for its job.',
  },
  {
    id: 'agents-biz-2',
    type: 'mc',
    question: 'Your AI agent drafts emails to clients. A colleague says "let\'s just let it send them automatically to save time." What\'s the best response?',
    options: [
      'Great idea — automation saves time and the AI is usually right',
      'Start with a draft-and-approve workflow. Auto-send routine confirmations once we trust the quality, but keep human review for sensitive communications.',
      'Never let AI send emails — too risky',
      'Only auto-send if we use the most expensive AI model',
    ],
    correctIndex: 1,
    explanation: 'This is about matching oversight to risk. Routine emails (order confirmations) are low-risk and can be automated once quality is proven. Sensitive emails (complaints, negotiations) need human review because one bad email can damage a client relationship. Start cautious, loosen as trust builds — like onboarding a new team member.',
  },
  {
    id: 'agents-biz-3',
    type: 'free',
    question: 'Your CEO asks: "What\'s the difference between the AI chatbot we have now and these new AI agents everyone is talking about?" Explain it in plain language.',
    modelAnswer: 'Our current chatbot is like a very knowledgeable colleague you can text — you ask a question, it answers from what it knows, but it can\'t actually do anything. An AI agent is more like a personal assistant — you can say "check the status of the Johnson account, draft a follow-up email, and schedule a meeting for next week" and it will actually do those things. It connects to our email, calendar, CRM, and other tools. The key difference: a chatbot talks, an agent acts. But with that power comes the need for guardrails — we decide what it can do on its own vs. what needs our approval.',
    explanation: 'The core distinction is action vs. information. Chatbots provide answers; agents take actions. The business implication is that agents can automate multi-step workflows, but need appropriate oversight based on the risk level of each action.',
  },
  {
    id: 'agents-biz-4',
    type: 'mc',
    question: 'Which task is the WORST fit for an AI agent?',
    options: [
      'Researching competitors and summarizing findings',
      'Calculating exact tax amounts based on legal tax brackets',
      'Scheduling meetings by checking multiple calendars',
      'Drafting responses to customer inquiries',
    ],
    correctIndex: 1,
    explanation: 'Tax calculations follow exact legal rules — they\'re deterministic. You need a calculator, not an AI that might get creative with numbers. AI agents are best for tasks that require judgment, flexibility, and connecting multiple systems. For tasks with exact right answers defined by rules, traditional software is more reliable and auditable.',
  },
  {
    id: 'agents-biz-5',
    type: 'mc',
    question: 'MCP (Model Context Protocol) is often called "the USB-C of AI." What does it actually do?',
    options: [
      'It makes AI models run faster',
      'It\'s a universal standard for connecting AI to external tools and data — build one connector and any MCP-compatible AI can use it',
      'It\'s a specific product sold by Anthropic',
      'It encrypts data sent to AI models',
    ],
    correctIndex: 1,
    explanation: 'MCP is an open standard (created by Anthropic, adopted by OpenAI, AWS, Microsoft, and others) that standardizes how AI connects to tools. Like USB-C replaced a dozen different charger cables with one universal plug, MCP replaces custom integrations with one standard protocol. Over 3,000 MCP connectors already exist.',
  },
]

export const AgentsModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="agents" title="AI Assistants That Take Action" subtitle="From chatbots that answer questions to AI assistants that actually get things done — what agents are, what they can do, and how to set them up for your team.">
        <WhatAreAgentsBusiness />
        <ToolUseBusiness />
        <AgentPatternsBusiness />
        <HowAgentsConnectBusiness />
        <ContextFilesBusiness />
        <KnowledgeCheck moduleId="agents-business" questions={translateQuestions(BUSINESS_QUESTIONS, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="agents" title="Agents &amp; Tool Use" subtitle="From passive text generators to autonomous problem-solvers — how LLMs call tools, the protocols that connect them, and the patterns for building reliable agents.">
      <WhatAreAgentsSection />
      <FunctionCallingSection />
      <MCPSection />
      <DesignPatternsSection />
      <ContextFilesSection />
      <BuildingAgentsSection />
      <A2ASection />
      <SkillsHarnessSection />
      <KnowledgeCheck moduleId="agents" questions={translateQuestions(TECHNICAL_QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
