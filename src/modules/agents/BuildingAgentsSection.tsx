import { SimulatedTerminal, type TerminalStep } from '../../components/SimulatedTerminal'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { buildingAgentsSectionSv, buildingAgentsSectionKo } from './tech-translations'

interface Framework {
  name: string
  description: string
  complexity: 'Low' | 'Medium' | 'High'
  flexibility: 'Low' | 'Medium' | 'High'
  learningCurve: 'Easy' | 'Moderate' | 'Steep'
  bestFor: string
}

const FRAMEWORKS: Framework[] = [
  {
    name: 'Raw function calling',
    description: 'Direct API calls with tool schemas. No framework overhead.',
    complexity: 'Low',
    flexibility: 'Medium',
    learningCurve: 'Easy',
    bestFor: 'Simple agents, learning, prototypes',
  },
  {
    name: 'Vercel AI SDK',
    description: 'Web-focused, great TypeScript support, streaming-first.',
    complexity: 'Low',
    flexibility: 'Medium',
    learningCurve: 'Easy',
    bestFor: 'Web apps, Next.js, streaming UIs',
  },
  {
    name: 'LangChain / LangGraph',
    description: 'Most popular. LangGraph adds graph-based workflows for complex agents.',
    complexity: 'Medium',
    flexibility: 'High',
    learningCurve: 'Moderate',
    bestFor: 'Production agents, complex workflows',
  },
  {
    name: 'CrewAI',
    description: 'Multi-agent framework with role-based agents that collaborate.',
    complexity: 'Medium',
    flexibility: 'Medium',
    learningCurve: 'Moderate',
    bestFor: 'Multi-agent teams, role-based tasks',
  },
  {
    name: 'AutoGen (Microsoft)',
    description: 'Multi-agent conversations with human-in-the-loop support.',
    complexity: 'High',
    flexibility: 'High',
    learningCurve: 'Steep',
    bestFor: 'Research, complex multi-agent systems',
  },
  {
    name: 'Amazon Bedrock AgentCore',
    description: 'Managed infrastructure for deploying agents at scale — runtime, memory, identity, observability. Works with any framework (LangGraph, CrewAI, Strands).',
    complexity: 'Medium',
    flexibility: 'High',
    learningCurve: 'Moderate',
    bestFor: 'Enterprise deployment, production agents on AWS',
  },
]

const LEVEL_COLORS: Record<string, string> = {
  Low: 'text-green-400',
  Medium: 'text-amber-400',
  High: 'text-red-400',
  Easy: 'text-green-400',
  Moderate: 'text-amber-400',
  Steep: 'text-red-400',
}

const TERMINAL_STEPS: TerminalStep[] = [
  {
    command: 'pip install openai',
    output: 'Successfully installed openai-1.82.0',
    delay: 400,
  },
  {
    command: 'cat agent.py',
    output: `import openai, json

client = openai.OpenAI()
tools = [{
    "type": "function",
    "function": {
        "name": "search",
        "description": "Search the web",
        "parameters": {
            "type": "object",
            "properties": {"query": {"type": "string"}},
            "required": ["query"]
        }
    }
}]

def run_agent(user_input):
    messages = [{"role": "user", "content": user_input}]
    while True:
        resp = client.chat.completions.create(
            model="gpt-4o", messages=messages, tools=tools
        )
        msg = resp.choices[0].message
        if not msg.tool_calls:
            return msg.content
        # Execute each tool call
        messages.append(msg)
        for tc in msg.tool_calls:
            result = execute_tool(tc.function.name, tc.function.arguments)
            messages.append({"role": "tool", "tool_call_id": tc.id, "content": result})

print(run_agent("What's trending in AI today?"))`,
    delay: 800,
  },
  {
    command: 'python agent.py',
    output: `[Agent] Calling search("latest AI news today")...
[Tool] Returned 3 results
[Agent] Based on today's top AI news:
1. OpenAI released GPT-5 with improved reasoning
2. Google DeepMind published new robotics research
3. EU AI Act enforcement begins next month`,
    delay: 1000,
  },
]

const EN_P2 = `A basic agent is just a loop: send messages → check for tool calls → execute tools → feed results back → repeat. Add frameworks like LangGraph or CrewAI only when you need graph-based routing, persistent state, or multi-agent orchestration.`
export const BuildingAgentsSection: React.FC = () => {
  const { lang } = useLanguage()
  const fRAMEWORKST = tArray(lang, FRAMEWORKS)
  const c = useT({ title: '5. Building Agents' , p2: EN_P2 }, { sv: buildingAgentsSectionSv, ko: buildingAgentsSectionKo })
  return (
  <section aria-labelledby="building-agents">
    <h2 id="building-agents" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
    <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
      You don&apos;t need a framework to build an agent. Start with{' '}
      <strong className="text-zinc-100">raw function calling</strong> — it&apos;s just a while loop.
      Add a framework when your agent needs complex routing, state management, or multi-agent
      coordination.
    </p>

    {/* Framework comparison table */}
    <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-700 bg-zinc-800">
            <th className="px-4 py-3 text-left font-mono text-xs text-zinc-400">Framework</th>
            <th className="px-4 py-3 text-left font-mono text-xs text-zinc-400">Complexity</th>
            <th className="px-4 py-3 text-left font-mono text-xs text-zinc-400">Flexibility</th>
            <th className="px-4 py-3 text-left font-mono text-xs text-zinc-400">Learning Curve</th>
            <th className="px-4 py-3 text-left font-mono text-xs text-zinc-400">Best For</th>
          </tr>
        </thead>
        <tbody>
          {fRAMEWORKST.map(fw => (
            <tr key={fw.name} className="border-b border-zinc-800 last:border-0">
              <td className="px-4 py-2.5">
                <span className="font-medium text-zinc-200">{fw.name}</span>
                <p className="mt-0.5 text-xs text-zinc-500">{fw.description}</p>
              </td>
              <td className={`px-4 py-2.5 font-mono text-xs ${LEVEL_COLORS[fw.complexity]}`}>
                {fw.complexity}
              </td>
              <td className={`px-4 py-2.5 font-mono text-xs ${LEVEL_COLORS[fw.flexibility]}`}>
                {fw.flexibility}
              </td>
              <td className={`px-4 py-2.5 font-mono text-xs ${LEVEL_COLORS[fw.learningCurve]}`}>
                {fw.learningCurve}
              </td>
              <td className="px-4 py-2.5 text-xs text-zinc-400">{fw.bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Simulated terminal */}
    <SimulatedTerminal steps={TERMINAL_STEPS} title="Building a simple agent from scratch" />

    <div className="mt-4 rounded-md bg-zinc-800 p-4">
      <p className="text-sm leading-relaxed text-zinc-300">
        <strong className="text-zinc-100">Start simple.</strong> {c.p2}
      </p>
    </div>
  </section>
  )
}