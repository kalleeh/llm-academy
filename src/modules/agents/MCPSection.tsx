import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { mCPSectionSv, mCPSectionKo } from './tech-translations'
import { CodeBlock } from '../../components/CodeBlock'
import { Icon } from '../../components/Icon'
import { comparisonTranslations } from './data-translations'

const MCP_SERVER_EXAMPLE = `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "weather-server",
  version: "1.0.0",
});

// Define a tool — any MCP client can discover and use it
server.tool(
  "get_weather",
  "Get current weather for a location",
  { location: z.string(), unit: z.enum(["celsius", "fahrenheit"]).optional() },
  async ({ location, unit }) => {
    const data = await fetchWeather(location, unit ?? "celsius");
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);`

const COMPARISON = [
  {
    aspect: 'Scope',
    functionCalling: 'Per-model, per-integration',
    mcp: 'Universal protocol, any client',
  },
  {
    aspect: 'Schema format',
    functionCalling: 'Varies (OpenAI, Anthropic, etc.)',
    mcp: 'Standardized JSON-RPC',
  },
  {
    aspect: 'Tool reuse',
    functionCalling: 'Rewrite for each provider',
    mcp: 'Write once, use everywhere',
  },
  {
    aspect: 'Discovery',
    functionCalling: 'Manual — you pass schemas',
    mcp: 'Automatic — client queries server',
  },
  {
    aspect: 'Transport',
    functionCalling: 'HTTP API calls',
    mcp: 'stdio, SSE, HTTP (flexible)',
  },
  {
    aspect: 'Ecosystem',
    functionCalling: 'Vendor-specific',
    mcp: 'Open standard, growing ecosystem',
  },
]

const EN_P2 = `Instead of writing custom integrations for every model provider, you build one MCP server. Any MCP-compatible client — Claude, ChatGPT, Cursor, VS Code, your own app — can discover and use your tools automatically.`
export const MCPSection: React.FC = () => {
  const { lang } = useLanguage()
  const cOMPARISONT = tArray(lang, COMPARISON, comparisonTranslations)
  const c = useT({ title: '3. MCP (Model Context Protocol)' , p2: EN_P2 }, { sv: mCPSectionSv, ko: mCPSectionKo })
  return (
  <section aria-labelledby="mcp">
    <h2 id="mcp" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
    <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
      MCP is the <strong className="text-zinc-100">2025–2026 standard</strong> for connecting LLMs
      to tools. Think of it as{' '}
      <strong className="text-amber-300">&quot;USB-C for AI&quot;</strong> — one protocol, many
      tools. Created by Anthropic, now adopted across the industry by OpenAI, Google, Microsoft, and
      hundreds of tool providers.
    </p>

    {/* Architecture diagram */}
    <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-900 p-6">
      <p className="mb-3 text-xs font-medium text-zinc-500">MCP Architecture</p>
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <div className="rounded-md border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-center">
          <p className="font-mono text-xs text-purple-400">Your App</p>
          <p className="text-xs text-purple-300">(MCP Client)</p>
        </div>
        <span className="text-zinc-600">⇄</span>
        <div className="rounded-md border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center">
          <p className="font-mono text-xs text-amber-400">MCP Server</p>
          <p className="text-xs text-amber-300">(Protocol layer)</p>
        </div>
        <span className="text-zinc-600">⇄</span>
        <div className="space-y-1">
          {([
            { icon: 'wrench', label: 'Tools' },
            { icon: 'database', label: 'Databases' },
            { icon: 'globe', label: 'APIs' },
            { icon: 'folder', label: 'File systems' },
          ] as const).map(item => (
            <div key={item.label} className="rounded border border-green-500/30 bg-green-500/10 px-3 py-1">
              <span className="text-xs text-green-300"><Icon name={item.icon} /> {item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Comparison table */}
    <div className="mb-8 overflow-x-auto rounded-lg border border-zinc-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-700 bg-zinc-800">
            <th className="px-4 py-3 text-left font-mono text-xs text-zinc-400">Aspect</th>
            <th className="px-4 py-3 text-left font-mono text-xs text-zinc-400">Function Calling</th>
            <th className="px-4 py-3 text-left font-mono text-xs text-amber-400">MCP</th>
          </tr>
        </thead>
        <tbody>
          {cOMPARISONT.map(row => (
            <tr key={row.aspect} className="border-b border-zinc-800 last:border-0">
              <td className="px-4 py-2.5 font-medium text-zinc-200">{row.aspect}</td>
              <td className="px-4 py-2.5 text-zinc-400">{row.functionCalling}</td>
              <td className="px-4 py-2.5 text-amber-300">{row.mcp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <CodeBlock code={MCP_SERVER_EXAMPLE} language="typescript" title="weather-server.ts — MCP server example" />

    <div className="mt-4 rounded-md bg-zinc-800 p-4">
      <p className="text-sm leading-relaxed text-zinc-300">
        <strong className="text-zinc-100">Why MCP matters:</strong> {c.p2}
      </p>
    </div>
  </section>
  )
}