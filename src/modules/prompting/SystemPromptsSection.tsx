import { useState, useCallback, useMemo } from 'react'
import { CodeBlock } from '../../components/CodeBlock'
import { SelfExplain } from '../../components/SelfExplain'
import { tLabel, useLanguage, useT } from '../../i18n'
import { systemPromptsSectionSv, systemPromptsSectionKo } from './tech-translations'

const FRAMEWORK_FIELDS = [
  { key: 'goal', label: 'spGoal', placeholder: 'Classify customer support tickets by urgency', color: 'text-violet-700 dark:text-violet-400' },
  { key: 'context', label: 'spContext', placeholder: 'You work for an e-commerce company with 3 urgency levels: low, medium, high', color: 'text-blue-700 dark:text-blue-400' },
  { key: 'format', label: 'spFormat', placeholder: 'Respond with JSON: {"urgency": "...", "reason": "..."}', color: 'text-green-700 dark:text-green-400' },
  { key: 'tone', label: 'spTone', placeholder: 'Be concise and professional', color: 'text-amber-700 dark:text-amber-400' },
  { key: 'constraints', label: 'spConstraints', placeholder: 'Never make up information. If unsure, classify as medium.', color: 'text-red-700 dark:text-red-400' },
] as const

type FieldKey = (typeof FRAMEWORK_FIELDS)[number]['key']

const DEFAULT_VALUES: Record<FieldKey, string> = {
  goal: 'Classify customer support tickets by urgency',
  context: 'You work for an e-commerce company. Urgency levels: low, medium, high.',
  format: 'Respond with JSON: {"urgency": "...", "reason": "..."}',
  tone: 'Be concise and professional',
  constraints: 'Never make up information. If unsure, classify as medium.',
}

const EN_INTRO = `Edit each component to build your system prompt. The preview updates live.`

export const SystemPromptsSection: React.FC = () => {
  const { lang } = useLanguage()
  const c = useT({ title: '3. System Prompts', intro: EN_INTRO }, { sv: systemPromptsSectionSv, ko: systemPromptsSectionKo })
  const [values, setValues] = useState<Record<FieldKey, string>>(DEFAULT_VALUES)

  const handleChange = useCallback((key: FieldKey, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }))
  }, [])

  const systemPrompt = useMemo(() => {
    const parts: string[] = []
    if (values.goal) parts.push(values.goal)
    if (values.context) parts.push(`\nContext: ${values.context}`)
    if (values.format) parts.push(`\nFormat: ${values.format}`)
    if (values.tone) parts.push(`\nTone: ${values.tone}`)
    if (values.constraints) parts.push(`\nConstraints: ${values.constraints}`)
    return parts.join('\n')
  }, [values])

  const apiCode = useMemo(() => `from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "system",
            "content": """${systemPrompt}"""
        },
        {
            "role": "user",
            "content": "My order arrived broken and I need it for tomorrow's event!"
        }
    ]
)

print(response.choices[0].message.content)
# {"urgency": "high", "reason": "Damaged item with time-sensitive need"}`, [systemPrompt])

  return (
    <section aria-labelledby="system-prompts">
      <h2 id="system-prompts" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        System prompts set the <strong className="text-zinc-900 dark:text-zinc-100">persistent behavior</strong> of the
        model across an entire conversation. They define who the model is, what it should do, and how
        it should respond — before the user says anything.
      </p>

      {/* Why they matter */}
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {[
          { title: 'Consistency', desc: 'Same behavior across all user messages in a session' },
          { title: 'Safety', desc: 'Enforce guardrails, content policies, and output constraints' },
          { title: 'Persona', desc: 'Define expertise level, tone, and domain knowledge' },
        ].map(item => (
          <div key={item.title} className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
            <p className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 5-component framework */}
      <div className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <h3 className="mb-1 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          The 5-Component Framework
        </h3>
        <p className="mb-4 text-xs text-zinc-600 dark:text-zinc-400">{c.intro}</p>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-3">
            {FRAMEWORK_FIELDS.map(field => (
              <div key={field.key}>
                <label htmlFor={`sp-${field.key}`} className={`mb-1 block text-xs font-medium ${field.color}`}>
                  {tLabel(lang, field.label)}
                </label>
                <input
                  id={`sp-${field.key}`}
                  type="text"
                  value={values[field.key]}
                  onChange={e => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-600 dark:text-zinc-400 dark:placeholder:text-zinc-600"
                />
              </div>
            ))}
          </div>

          {/* Preview */}
          <div>
            <p className="mb-1 text-xs font-medium text-zinc-500">Generated System Prompt</p>
            <pre className="h-full overflow-auto whitespace-pre-wrap rounded-md bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
              {systemPrompt}
            </pre>
          </div>
        </div>
      </div>

      {/* API call example */}
      <div>
        <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          API Call with System Prompt
        </h3>
        <CodeBlock code={apiCode} language="python" title="system_prompt_example.py" />
      </div>

      <SelfExplain
        prompt="You just built a system prompt using the framework above. Now think about failure modes: what happens if your system prompt contradicts the user's message? For example, the system prompt says 'always respond in JSON' but the user asks 'explain this in plain English.' How should the model handle this, and how would you design the system prompt to handle such conflicts?"
        modelAnswer="When system and user prompts conflict, most models prioritize the system prompt since it's processed first and represents the developer's intent. However, rigid system prompts create poor user experiences. Good design strategies: (1) Make the system prompt define boundaries, not rigid rules — 'default to JSON unless the user explicitly requests another format.' (2) Use conditional instructions — 'If the user asks for an explanation, provide it in plain text; otherwise use JSON.' (3) Separate hard constraints (safety, format for API consumers) from soft preferences (tone, verbosity). Hard constraints should never yield; soft preferences should adapt to user needs."
      />
    </section>
  )
}
