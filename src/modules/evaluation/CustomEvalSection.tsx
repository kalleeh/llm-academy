import { useState } from 'react'
import { CodeBlock } from '../../components/CodeBlock'
import { Icon } from '../../components/Icon'
import { useTranslation } from '../../i18n'

const EVAL_SCRIPT = `import json
from openai import OpenAI  # or any model client

def evaluate_model(eval_set_path: str, model: str):
    with open(eval_set_path) as f:
        examples = [json.loads(line) for line in f]

    correct = 0
    results = []
    for ex in examples:
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": ex["input"]}],
            temperature=0,  # deterministic for eval
        )
        prediction = response.choices[0].message.content.strip()
        is_correct = prediction == ex["expected"]
        correct += is_correct
        results.append({
            "input": ex["input"],
            "expected": ex["expected"],
            "predicted": prediction,
            "correct": is_correct,
        })

    accuracy = correct / len(examples)
    print(f"Accuracy: {accuracy:.1%} ({correct}/{len(examples)})")
    return results`

export const CustomEvalSection: React.FC = () => {
  const c = useTranslation().modules.evaluation.customEvalSection
  const [selectedTask, setSelectedTask] = useState(0)
  const task = c.taskTypes[selectedTask]

  return (
    <section aria-labelledby="custom-eval">
      <h2 id="custom-eval" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}<em>your</em> fine-tuned model, you need
        evaluation sets from your domain. Pick your task type to see recommended metrics:
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {c.taskTypes.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setSelectedTask(i)}
            className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
              selectedTask === i
                ? 'border-zinc-500 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mb-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">{task.label}</h3>
        <div className="mb-3 flex flex-wrap gap-2">
          {task.metrics.map(m => (
            <span key={m} className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-300">{m}</span>
          ))}
        </div>
        <p className="text-sm text-amber-200/80"><Icon name="lightbulb" /> {task.tip}</p>
      </div>

      <CodeBlock code={EVAL_SCRIPT} language="python" title="eval_model.py — simple evaluation script" />
    </section>
  )
}
