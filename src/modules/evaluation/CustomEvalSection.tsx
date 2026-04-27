import { useState } from 'react'
import { CodeBlock } from '../../components/CodeBlock'
import { Icon } from '../../components/Icon'
import { useT } from '../../useT'
import { customEvalSectionSv, customEvalSectionKo } from './tech-translations'

const TASK_TYPES = [
  { id: 'classification', label: 'Classification', metrics: ['Accuracy', 'F1 Score', 'Precision / Recall'], tip: 'Build a balanced eval set with examples from every class. 200+ examples minimum.' },
  { id: 'generation', label: 'Text Generation', metrics: ['ROUGE-L', 'BLEU', 'BERTScore', 'Human rating'], tip: 'Automated metrics correlate poorly with quality. Always include human evaluation for generation tasks.' },
  { id: 'code', label: 'Code Generation', metrics: ['Pass@1', 'Pass@5', 'Execution success rate'], tip: 'Run generated code in a sandbox. Test with edge cases, not just happy paths.' },
  { id: 'qa', label: 'Question Answering', metrics: ['Exact Match', 'F1 (token overlap)', 'Faithfulness'], tip: 'For RAG: measure both retrieval quality and answer quality separately.' },
  { id: 'chat', label: 'Conversational', metrics: ['Human preference (A/B)', 'Helpfulness rating', 'Safety rate'], tip: 'Use blind A/B comparisons against a baseline model. 100+ conversations minimum.' },
]

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

const EN_P2 = `{c.p2}`
export const CustomEvalSection: React.FC = () => {
  const c = useT({ title: '3. Custom Evaluation' , p2: EN_P2 }, { sv: customEvalSectionSv, ko: customEvalSectionKo })
  const [selectedTask, setSelectedTask] = useState(0)
  const task = TASK_TYPES[selectedTask]

  return (
    <section aria-labelledby="custom-eval">
      <h2 id="custom-eval" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        Public benchmarks test general capabilities. For <em>your</em> fine-tuned model, you need
        evaluation sets from your domain. Pick your task type to see recommended metrics:
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {TASK_TYPES.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setSelectedTask(i)}
            className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
              selectedTask === i
                ? 'border-zinc-500 bg-zinc-800 text-zinc-100'
                : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-100">{task.label}</h3>
        <div className="mb-3 flex flex-wrap gap-2">
          {task.metrics.map(m => (
            <span key={m} className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">{m}</span>
          ))}
        </div>
        <p className="text-sm text-amber-200/80"><Icon name="lightbulb" /> {task.tip}</p>
      </div>

      <CodeBlock code={EVAL_SCRIPT} language="python" title="eval_model.py — simple evaluation script" />
    </section>
  )
}
