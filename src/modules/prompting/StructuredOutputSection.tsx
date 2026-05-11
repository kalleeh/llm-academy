import { useState, useCallback } from 'react'
import { CodeBlock } from '../../components/CodeBlock'
import { tArray, useLanguage, useT } from '../../i18n'
import { structuredOutputSectionSv, structuredOutputSectionKo } from './tech-translations'
import { techniquesTranslations, promptLevelsTranslations } from './data-translations'

interface StructureTechnique {
  id: string
  label: string
  description: string
  code: string
  language: string
  filename: string
}

const TECHNIQUES: StructureTechnique[] = [
  {
    id: 'json-mode',
    label: 'JSON Mode',
    description: 'Tell the API to only output valid JSON. The model is constrained at the decoding level — it cannot produce non-JSON tokens.',
    language: 'python',
    filename: 'json_mode.py',
    code: `from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    response_format={"type": "json_object"},
    messages=[
        {
            "role": "system",
            "content": "Extract product info as JSON with: name, price, category"
        },
        {
            "role": "user",
            "content": "The Sony WH-1000XM5 headphones cost $348 and are great for travel."
        }
    ]
)

print(response.choices[0].message.content)
# {"name": "Sony WH-1000XM5", "price": 348, "category": "headphones"}`,
  },
  {
    id: 'function-calling',
    label: 'Function Calling',
    description: 'Define a function schema and the model will output structured arguments that match it. The gold standard for tool use and structured extraction.',
    language: 'python',
    filename: 'function_calling.py',
    code: `from openai import OpenAI

client = OpenAI()

tools = [{
    "type": "function",
    "function": {
        "name": "extract_contact",
        "parameters": {
            "type": "object",
            "properties": {
                "name":  {"type": "string"},
                "email": {"type": "string", "format": "email"},
                "phone": {"type": "string"},
                "company": {"type": "string"}
            },
            "required": ["name", "email"]
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-4o",
    tools=tools,
    tool_choice={"type": "function", "function": {"name": "extract_contact"}},
    messages=[{
        "role": "user",
        "content": "Reach out to Jane at jane@acme.co, she's the CTO at Acme Corp."
    }]
)

args = response.choices[0].message.tool_calls[0].function.arguments
# {"name": "Jane", "email": "jane@acme.co", "company": "Acme Corp"}`,
  },
  {
    id: 'pydantic',
    label: 'Schema Enforcement',
    description: 'Use the Instructor library with Pydantic models for type-safe, validated structured output with automatic retries on validation failure.',
    language: 'python',
    filename: 'instructor_pydantic.py',
    code: `import instructor
from openai import OpenAI
from pydantic import BaseModel, Field

client = instructor.from_openai(OpenAI())

class SentimentResult(BaseModel):
    sentiment: str = Field(description="positive, negative, or neutral")
    confidence: float = Field(ge=0.0, le=1.0)
    keywords: list[str] = Field(description="Key phrases that drove the classification")
    summary: str = Field(max_length=100)

result = client.chat.completions.create(
    model="gpt-4o",
    response_model=SentimentResult,
    messages=[{
        "role": "user",
        "content": "I absolutely love this product! Best purchase I've made all year."
    }]
)

print(result.model_dump_json(indent=2))
# Fully validated Pydantic object — type-safe, with retries on failure`,
  },
]

const PROMPT_LEVELS = [
  {
    label: 'No structure',
    prompt: 'Extract the events from this text.',
    output: 'There are two events mentioned: a meeting on Tuesday and a dinner on Friday.',
    reliability: 30,
  },
  {
    label: '+ Format hint',
    prompt: 'Extract events as a list with date and description.',
    output: '- Tuesday: Team meeting at 2pm\n- Friday: Dinner with clients at 7pm',
    reliability: 60,
  },
  {
    label: '+ JSON schema',
    prompt: 'Extract events as JSON array: [{"date": "...", "time": "...", "description": "..."}]',
    output: '[{"date": "Tuesday", "time": "2:00 PM", "description": "Team meeting"},\n {"date": "Friday", "time": "7:00 PM", "description": "Dinner with clients"}]',
    reliability: 85,
  },
  {
    label: '+ response_format',
    prompt: 'Same prompt + response_format={"type": "json_object"} in API call',
    output: '{"events": [{"date": "Tuesday", "time": "14:00", "description": "Team meeting"}, {"date": "Friday", "time": "19:00", "description": "Dinner with clients"}]}',
    reliability: 98,
  },
]

const EN_INTRO = `Click each level to see how adding structure constraints improves output consistency.`

export const StructuredOutputSection: React.FC = () => {
  const { lang } = useLanguage()
  const tECHNIQUEST = tArray(lang, TECHNIQUES, techniquesTranslations)
  const pROMPT_LEVELST = tArray(lang, PROMPT_LEVELS, promptLevelsTranslations)
  const c = useT({ title: '4. Structured Output', intro: EN_INTRO }, { sv: structuredOutputSectionSv, ko: structuredOutputSectionKo })
  const [activeTechnique, setActiveTechnique] = useState(TECHNIQUES[0].id)
  const [activeLevel, setActiveLevel] = useState(0)

  const handleTechClick = useCallback((id: string) => {
    setActiveTechnique(id)
  }, [])

  const handleLevelClick = useCallback((index: number) => {
    setActiveLevel(index)
  }, [])

  const tech = TECHNIQUES.find(t => t.id === activeTechnique) ?? TECHNIQUES[0]
  const level = PROMPT_LEVELS[activeLevel]

  return (
    <section aria-labelledby="structured-output">
      <h2 id="structured-output" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        Getting reliable JSON, tables, and specific formats from LLMs. The key insight:{' '}
        <strong className="text-zinc-900 dark:text-zinc-100">constrain the output at the API level</strong>, not just in
        the prompt text.
      </p>

      {/* Reliability progression */}
      <div className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <h3 className="mb-1 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Structure Improves Reliability
        </h3>
        <p className="mb-4 text-xs text-zinc-600 dark:text-zinc-400">{c.intro}</p>

        <div className="mb-4 flex flex-wrap gap-1">
          {pROMPT_LEVELST.map((l, i) => (
            <button
              key={l.label}
              onClick={() => handleLevelClick(i)}
              className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                i === activeLevel
                  ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-1 text-xs text-zinc-500">Prompt</p>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-zinc-50 dark:bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-green-700 dark:text-green-300">
              {level.prompt}
            </pre>
          </div>
          <div>
            <p className="mb-1 text-xs text-zinc-500">Output</p>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-zinc-50 dark:bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-amber-700 dark:text-amber-300">
              {level.output}
            </pre>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs text-zinc-500">Reliability:</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                level.reliability > 80 ? 'bg-green-500' : level.reliability > 50 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${level.reliability}%` }}
            />
          </div>
          <span className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300">{level.reliability}%</span>
        </div>
      </div>

      {/* Technique tabs */}
      <div className="mb-4 flex flex-wrap gap-1" role="tablist" aria-label="Structured output techniques">
        {tECHNIQUEST.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === activeTechnique}
            onClick={() => handleTechClick(t.id)}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              t.id === activeTechnique
                ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div className="rounded-md bg-zinc-100 dark:bg-zinc-800 p-3">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{tech.description}</p>
        </div>
        <CodeBlock code={tech.code} language={tech.language} title={tech.filename} />
      </div>
    </section>
  )
}
