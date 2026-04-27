import { useState, useCallback } from 'react'
import { CodeBlock } from '../../components/CodeBlock'
import { useT } from '../../useT'
import { syntheticDataSectionSv, syntheticDataSectionKo } from './tech-translations'

interface Example { instruction: string; response: string }

const HUMAN: Example[] = [
  { instruction: 'Explain photosynthesis in simple terms.', response: 'Plants use sunlight, water, and CO₂ to make glucose and oxygen. Chlorophyll in leaves captures light energy to power this reaction.' },
  { instruction: 'Write a haiku about programming.', response: 'Semicolons lost\nThe compiler screams at me\nOne bug fixed, ten born' },
]

const SYNTHETIC: Example[] = [
  { instruction: 'Explain photosynthesis in simple terms.', response: 'Photosynthesis is the process by which green plants convert light energy into chemical energy. Plants absorb CO₂ and water, using sunlight to produce glucose and release oxygen as a byproduct.' },
  { instruction: 'Write a haiku about programming.', response: 'Lines of code compile\nLogic flows through silicon\nPrograms come alive' },
]

const SCRIPT = `import openai

def generate_synthetic_data(seed_instructions, model="gpt-4"):
    """Generate instruction-response pairs from seed tasks."""
    client = openai.OpenAI()
    results = []

    for seed in seed_instructions:
        # Step 1: Generate new instructions inspired by seed
        response = client.chat.completions.create(
            model=model,
            messages=[{
                "role": "system",
                "content": "Generate 5 diverse instructions similar to the example."
            }, {
                "role": "user",
                "content": f"Example: {seed}"
            }],
            temperature=0.9,
        )
        new_instructions = response.choices[0].message.content.split("\\n")

        # Step 2: Generate responses for each instruction
        for instr in new_instructions:
            resp = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": instr}],
                temperature=0.7,
            )
            results.append({
                "instruction": instr,
                "response": resp.choices[0].message.content,
                "source": "synthetic",
                "generator": model,
            })

    return results

# Alpaca-style: 175 seed tasks -> 52K synthetic instructions
# Phi-style: textbook-quality synthetic data for reasoning`

export const SyntheticDataSection: React.FC = () => {
  const c = useT({ title: '4. Synthetic Data' }, { sv: syntheticDataSectionSv, ko: syntheticDataSectionKo })
  const [isSynthetic, setIsSynthetic] = useState(false)
  const toggle = useCallback(() => setIsSynthetic(p => !p), [])
  const examples = isSynthetic ? SYNTHETIC : HUMAN

  return (
    <section aria-labelledby="synthetic-data">
      <h2 id="synthetic-data" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-4 max-w-2xl leading-relaxed text-zinc-300">
        Human data is expensive. <strong className="text-zinc-100">Alpaca</strong> showed 52K synthetic
        instructions from GPT-3.5 could fine-tune a competitive model. <strong className="text-zinc-100">Phi</strong> (Microsoft)
        trained primarily on synthetic textbook-quality data for outsized performance at small scale.
      </p>
      <div className="mb-4 flex items-center gap-3">
        <span className={`text-sm ${!isSynthetic ? 'text-zinc-100' : 'text-zinc-500'}`}>Human</span>
        <button onClick={toggle} role="switch" aria-checked={isSynthetic}
          aria-label="Toggle human vs synthetic examples"
          className={`relative h-6 w-11 rounded-full transition-colors ${isSynthetic ? 'bg-purple-600' : 'bg-zinc-600'}`}>
          <span className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform ${isSynthetic ? 'translate-x-5' : ''}`} />
        </button>
        <span className={`text-sm ${isSynthetic ? 'text-zinc-100' : 'text-zinc-500'}`}>Synthetic</span>
      </div>
      <div className="mb-6 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
          {isSynthetic ? 'Synthetic (LLM-generated)' : 'Human-written'}
        </div>
        {examples.map((ex, i) => (
          <div key={`${isSynthetic}-${i}`} className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4">
            <div className="mb-2">
              <span className="text-xs font-semibold text-amber-400">Instruction: </span>
              <span className="text-sm text-zinc-200">{ex.instruction}</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-green-400">Response: </span>
              <span className="text-sm text-zinc-400">{ex.response}</span>
            </div>
          </div>
        ))}
        <p className="text-xs text-zinc-500">
          {isSynthetic ? 'Synthetic responses tend to be more formal and structured.' : 'Human responses are more natural but expensive to collect at scale.'}
        </p>
      </div>
      <CodeBlock title="generate_synthetic.py" language="python" code={SCRIPT} />
    </section>
  )
}
