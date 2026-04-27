import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { lLMDifferenceSectionSv, lLMDifferenceSectionKo } from './tech-translations'
import { comparisonTranslations, overkillCasesTranslations, mlBetterCasesTranslations } from './data-translations'

interface ComparisonRow {
  dimension: string
  ml: string
  llm: string
}

const COMPARISON: ComparisonRow[] = [
  { dimension: 'Training data', ml: 'Task-specific labeled datasets', llm: 'Massive unlabeled text (internet-scale)' },
  { dimension: 'Deployment', ml: 'One model per task', llm: 'One model, many tasks' },
  { dimension: 'Input format', ml: 'Structured features (numbers, categories)', llm: 'Natural language (free-form text)' },
  { dimension: 'Adaptation', ml: 'Retrain from scratch or transfer learn', llm: 'Prompt engineering or fine-tuning' },
  { dimension: 'Inference cost', ml: 'Cheap (milliseconds, minimal compute)', llm: 'Expensive (seconds, GPU-heavy)' },
  { dimension: 'Strengths', ml: 'Precision on narrow, well-defined tasks', llm: 'Flexibility across broad, open-ended tasks' },
]

const ML_APPROACH = {
  title: '4. What Makes LLMs Different',
  steps: [
    '1. Collect 10,000 labeled reviews (positive/negative)',
    '2. Extract features: word counts, TF-IDF vectors',
    '3. Train logistic regression or SVM',
    '4. Deploy model — inference: ~2ms, cost: ~$0.0001/request',
  ],
  pros: ['Fast inference', 'Cheap at scale', 'Interpretable (feature weights)', 'Works offline'],
  cons: ['Needs labeled training data', 'Only does sentiment (one task)', 'Breaks on new domains without retraining'],
}

const LLM_APPROACH = {
  title: 'LLM: Prompted Sentiment Analysis',
  steps: [
    '1. Write a prompt: "Classify this review as positive or negative: {text}"',
    '2. Call the API — no training needed',
    '3. Optionally add few-shot examples for better accuracy',
    '4. Deploy — inference: ~500ms, cost: ~$0.01/request',
  ],
  pros: ['Zero training data needed', 'Works on any domain immediately', 'Can explain its reasoning', 'Handles nuance and sarcasm better'],
  cons: ['100x more expensive per request', '250x slower inference', 'Requires API access / GPU', 'Less predictable outputs'],
}

const OVERKILL_CASES = [
  { label: 'Simple classification', detail: 'Binary yes/no on structured data — logistic regression is faster and cheaper.' },
  { label: 'Structured data tasks', detail: 'Tabular data with clear features — tree-based models (XGBoost) dominate.' },
  { label: 'Latency-critical systems', detail: 'Real-time scoring at <10ms — LLM inference is too slow.' },
]

const ML_BETTER_CASES = [
  { label: 'Tabular data', detail: 'Rows and columns with numerical/categorical features — gradient boosting wins.' },
  { label: 'Real-time scoring', detail: 'Fraud detection, ad bidding — need sub-millisecond responses.' },
  { label: 'Interpretability required', detail: 'Regulated industries need to explain every decision (credit, healthcare).' },
]

const EN_P4 = `Same Problem, Two Approaches: Sentiment Analysis`
const EN_P3 = `Same Problem, Two Approaches: Sentiment Analysis`
const EN_P2 = `{c.p2}`
const EN_INTRO = `LLMs aren't just "bigger ML models." They represent a fundamentally different paradigm.`

export const LLMDifferenceSection: React.FC = () => {
  const { lang } = useLanguage()
  const cOMPARISONT = tArray(lang, COMPARISON, comparisonTranslations)
  const oVERKILL_CASEST = tArray(lang, OVERKILL_CASES, overkillCasesTranslations)
  const mL_BETTER_CASEST = tArray(lang, ML_BETTER_CASES, mlBetterCasesTranslations)
  const c = useT({ title: '4. What Makes LLMs Different', intro: EN_INTRO , p2: EN_P2 , p3: EN_P3 , p4: EN_P4 }, { sv: lLMDifferenceSectionSv, ko: lLMDifferenceSectionKo })
  const [showLLM, setShowLLM] = useState(false)

  const toggle = useCallback(() => {
    setShowLLM(prev => !prev)
  }, [])

  const active = showLLM ? LLM_APPROACH : ML_APPROACH

  return (
    <section aria-labelledby="llm-difference">
      <h2 id="llm-difference" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Comparison table */}
      <div className="mb-8 overflow-hidden rounded-lg border border-zinc-700">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800">
              <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-400">Dimension</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-emerald-400">Traditional ML</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-amber-400">LLMs</th>
            </tr>
          </thead>
          <tbody>
            {cOMPARISONT.map(row => (
              <tr key={row.dimension} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                <td className="px-4 py-3 font-medium text-zinc-200">{row.dimension}</td>
                <td className="px-4 py-3 text-zinc-400">{row.ml}</td>
                <td className="px-4 py-3 text-zinc-400">{row.llm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactive toggle: same problem, two approaches */}
      <div className="mb-8 rounded-lg border border-zinc-700 bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-6 py-4">
          <h3 className="font-mono text-sm font-semibold text-zinc-100">{c.p4}</h3>
          <button
            onClick={toggle}
            className="flex items-center gap-2 rounded-full border border-zinc-600 bg-zinc-700 px-3 py-1 text-xs text-zinc-200 transition-colors hover:bg-zinc-600"
            aria-label={`Switch to ${showLLM ? 'ML' : 'LLM'} approach`}
          >
            <span className={showLLM ? 'text-zinc-500' : 'text-emerald-400'}>ML</span>
            <span className="text-zinc-600">/</span>
            <span className={showLLM ? 'text-amber-400' : 'text-zinc-500'}>LLM</span>
          </button>
        </div>
        <div className="p-6">
          <h4 className="mb-3 font-mono text-sm font-semibold text-zinc-200">{active.title}</h4>
          <div className="mb-4 space-y-1">
            {active.steps.map(step => (
              <p key={step} className="text-sm text-zinc-400">{step}</p>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-semibold text-emerald-400 uppercase">Pros</p>
              <ul className="space-y-1">
                {active.pros.map(p => (
                  <li key={p} className="flex items-start gap-2 text-xs text-zinc-400">
                    <span className="text-emerald-500">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold text-red-400 uppercase">Cons</p>
              <ul className="space-y-1">
                {active.cons.map(c => (
                  <li key={c} className="flex items-start gap-2 text-xs text-zinc-400">
                    <span className="text-red-500">✗</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* When LLMs are overkill / when ML is better */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <h3 className="mb-3 font-mono text-sm font-semibold text-amber-300">When LLMs Are Overkill</h3>
          <ul className="space-y-2">
            {oVERKILL_CASEST.map(c => (
              <li key={c.label}>
                <p className="text-sm font-medium text-zinc-200">{c.label}</p>
                <p className="text-xs text-zinc-500">{c.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <h3 className="mb-3 font-mono text-sm font-semibold text-emerald-300">When Classical ML Wins</h3>
          <ul className="space-y-2">
            {mL_BETTER_CASEST.map(c => (
              <li key={c.label}>
                <p className="text-sm font-medium text-zinc-200">{c.label}</p>
                <p className="text-xs text-zinc-500">{c.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
