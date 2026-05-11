import { useState, useCallback } from 'react'
import { CodeBlock } from '../../components/CodeBlock'
import { tArray, useLanguage, useT } from '../../i18n'
import { functionCallingSectionSv, functionCallingSectionKo } from './tech-translations'
import { demoStepsTranslations } from './data-translations'

const TOOL_SCHEMA = `{
  "type": "function",
  "function": {
    "name": "get_weather",
    "description": "Get current weather for a location",
    "parameters": {
      "type": "object",
      "properties": {
        "location": {
          "type": "string",
          "description": "City and country, e.g. 'Tokyo, Japan'"
        },
        "unit": {
          "type": "string",
          "enum": ["celsius", "fahrenheit"],
          "description": "Temperature unit"
        }
      },
      "required": ["location"]
    }
  }
}`

const MODEL_RESPONSE = `{
  "role": "assistant",
  "tool_calls": [{
    "id": "call_abc123",
    "type": "function",
    "function": {
      "name": "get_weather",
      "arguments": "{\\"location\\": \\"Tokyo, Japan\\", \\"unit\\": \\"celsius\\"}"
    }
  }]
}`

const FULL_EXAMPLE = `from openai import OpenAI

client = OpenAI()

# 1. Define tools the model can use
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["location"]
        }
    }
}]

# 2. Send user message with tool definitions
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Weather in Tokyo?"}],
    tools=tools,
)

# 3. Model returns a tool call (NOT the result!)
tool_call = response.choices[0].message.tool_calls[0]
# tool_call.function.name == "get_weather"
# tool_call.function.arguments == '{"location": "Tokyo, Japan"}'

# 4. YOUR CODE executes the function
result = get_weather(location="Tokyo, Japan")  # You implement this

# 5. Feed the result back to the model
messages.append(response.choices[0].message)
messages.append({
    "role": "tool",
    "tool_call_id": tool_call.id,
    "content": json.dumps(result),
})

# 6. Model generates final answer using the tool result
final = client.chat.completions.create(
    model="gpt-4o", messages=messages, tools=tools
)`

const DEMO_STEPS = [
  {
    label: 'Tool Schema',
    description: 'You define what tools the model can use — name, description, parameters as JSON Schema.',
    content: TOOL_SCHEMA,
  },
  {
    label: 'User Query',
    description: 'The user asks a question. The model sees both the message and the available tool schemas.',
    content: '"What\'s the weather like in Tokyo?"',
  },
  {
    label: 'Model Response',
    description: 'The model decides to call a tool and returns structured arguments. It does NOT execute the function.',
    content: MODEL_RESPONSE,
  },
]

export const FunctionCallingSection: React.FC = () => {
  const { lang } = useLanguage()
  const dEMO_STEPST = tArray(lang, DEMO_STEPS, demoStepsTranslations)
  const c = useT({ title: '2. Function Calling' }, { sv: functionCallingSectionSv, ko: functionCallingSectionKo })
  const [activeStep, setActiveStep] = useState(0)

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index)
  }, [])

  return (
    <section aria-labelledby="function-calling">
      <h2 id="function-calling" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        Function calling is how LLMs use tools. The model receives{' '}
        <strong className="text-zinc-100">tool schemas</strong> (JSON descriptions of available
        functions), decides which to call, and returns{' '}
        <strong className="text-zinc-100">structured arguments</strong>. The key insight:{' '}
        <em className="text-amber-300">the model doesn&apos;t execute the function — your code does</em>,
        then feeds the result back.
      </p>

      {/* Interactive 3-step demo */}
      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900">
        <div className="border-b border-zinc-700 bg-zinc-800 px-5 py-3">
          <h3 className="font-mono text-sm font-semibold text-zinc-100">How Function Calling Works</h3>
        </div>
        <div className="grid gap-4 p-5 lg:grid-cols-[200px_1fr]">
          <div className="flex flex-col gap-1" role="tablist" aria-label="Function calling steps">
            {dEMO_STEPST.map((s, i) => (
              <button
                key={s.label}
                role="tab"
                aria-selected={i === activeStep}
                onClick={() => handleStepClick(i)}
                className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                  i === activeStep
                    ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  i <= activeStep ? 'bg-amber-500/30 text-amber-300' : 'bg-zinc-800 text-zinc-500'
                }`}>
                  {i + 1}
                </span>
                {s.label}
              </button>
            ))}
          </div>
          <div>
            <p className="mb-2 text-sm text-zinc-300">{dEMO_STEPST[activeStep].description}</p>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-green-300">
              {dEMO_STEPST[activeStep].content}
            </pre>
          </div>
        </div>
      </div>

      {/* Full code example */}
      <CodeBlock code={FULL_EXAMPLE} language="python" title="function_calling.py — Full flow" />

      <div className="mt-4 rounded-md bg-zinc-800 p-4">
        <p className="text-sm leading-relaxed text-zinc-300">
          <strong className="text-zinc-100">Key takeaway:</strong> The model is a{' '}
          <em>decision-maker</em>, not an executor. It picks the right tool and arguments. Your
          application code runs the function, handles errors, and sends results back. This keeps the
          model sandboxed and your system in control.
        </p>
      </div>
    </section>
  )
}
