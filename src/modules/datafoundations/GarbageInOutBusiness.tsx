import { useState, useCallback } from 'react'
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { useTranslation } from '../../i18n'

const MESSY_ROWS = [
  ['C-1001', 'Acme Corp', 'sarah@acme.com', '$48,000', 'Active'],
  ['C-1002', 'acme corp.', 'SARAH@ACME.COM', '$48k', 'active'],
  ['C-1003', 'Bolt Industries', '', '$2,400', 'Active'],
  ['C-1004', 'bolt ind.', 'mike@bolt.io', '2400', ''],
  ['C-1005', 'Nova Labs', 'jen@novalabs.com', '$12,000', 'Cancelled'],
  ['C-1006', 'Nova Labs Inc', 'jen@novalabs.com', '$12,000', 'Churned'],
]

const CLEAN_ROWS = [
  ['C-1001', 'Acme Corp', 'sarah@acme.com', '$48,000', 'Active'],
  ['C-1002', 'Bolt Industries', 'mike@bolt.io', '$2,400', 'Active'],
  ['C-1003', 'Nova Labs', 'jen@novalabs.com', '$12,000', 'Churned'],
]

const ISSUES = [
  { label: 'Duplicates', detail: 'Acme Corp appears twice with slightly different names', color: 'text-red-700 dark:text-red-400' },
  { label: 'Inconsistent format', detail: '"$48,000" vs "$48k" vs "2400" — same data, three formats', color: 'text-amber-700 dark:text-amber-400' },
  { label: 'Missing values', detail: 'Bolt has no email in one row, no status in another', color: 'text-amber-700 dark:text-amber-400' },
  { label: 'Inconsistent labels', detail: '"Cancelled" vs "Churned" — same meaning, different words', color: 'text-red-700 dark:text-red-400' },
]

const IMPACT_EXAMPLES = [
  {
    title: 'Biased hiring AI',
    messy: 'Training data: 10 years of resumes submitted to a tech company. 85% from men (reflecting industry demographics).',
    result: 'AI learned that male candidates were preferable. It penalized resumes containing "women\'s chess club" and downgraded graduates of all-women\'s colleges.',
    realCase: 'Amazon, 2018 — they identified the bias and disbanded the project. (Reuters)',
    color: 'border-purple-400 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/5',
  },
  {
    title: 'Outdated product info',
    messy: 'Knowledge base has docs from 2019-2025, no version dates, old and new mixed together.',
    result: 'AI tells customers about features that were removed 2 years ago and quotes prices that changed last quarter.',
    realCase: 'Common in customer support chatbots — the #1 cause of wrong answers is outdated source documents.',
    color: 'border-amber-400 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5',
  },
  {
    title: 'Duplicate customer records',
    messy: 'CRM has "Acme Corp", "acme corp.", and "ACME Corporation" as three separate customers.',
    result: 'AI gives contradictory answers about the same customer depending on which record it finds. "Acme has 5 users" vs "Acme has 12 users."',
    realCase: 'Affects any company with messy CRM data — which is most companies.',
    color: 'border-blue-400 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5',
  },
]

export const GarbageInOutBusiness: React.FC = () => {
  const c = useTranslation().modules.datafoundations.garbageInOut
  const [showClean, setShowClean] = useState(false)

  const toggleClean = useCallback(() => setShowClean((p) => !p), [])

  return (
    <section aria-labelledby="gigo-biz">
      <h2 id="gigo-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        The #1 rule of AI: <strong className="text-zinc-900 dark:text-zinc-100">your AI is only as good as the data you feed it</strong>.
        Let&apos;s look at what messy data actually looks like — and why it matters.
      </p>

      {/* Visual: messy vs clean spreadsheet */}
      <div className="mb-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
          <span className="text-xs text-zinc-600 dark:text-zinc-400">{showClean ? 'customers_cleaned.xlsx' : 'customers_raw.xlsx'} — Can you spot the problems?</span>
          <button onClick={toggleClean} className={`rounded px-3 py-1 text-xs transition-colors ${showClean ? 'bg-emerald-600/20 text-emerald-700 dark:text-emerald-300' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600'}`}>
            {showClean ? 'Show messy version' : 'Show cleaned version'}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50">
                {['ID', 'Company', 'Email', 'ARR', 'Status'].map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-medium text-zinc-600 dark:text-zinc-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(showClean ? CLEAN_ROWS : MESSY_ROWS).map((row, i) => (
                <tr key={i} className="border-b border-zinc-200/50 dark:border-zinc-800/50 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-3 py-2 whitespace-nowrap ${
                      !showClean && !cell ? 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 italic' :
                      !showClean && j === 1 && i > 0 && MESSY_ROWS[i-1]?.[1]?.toLowerCase().startsWith(cell.toLowerCase().slice(0, 4)) && cell !== MESSY_ROWS[i-1]?.[1] ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300' :
                      'text-zinc-700 dark:text-zinc-300'
                    }`}>
                      {cell || '(empty)'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!showClean && (
          <div className="border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-3">
            <div className="grid gap-2 sm:grid-cols-2">
              {ISSUES.map((issue) => (
                <p key={issue.label} className="text-xs">
                  <span className={`font-medium ${issue.color}`}>{issue.label}:</span>{' '}
                  <span className="text-zinc-600 dark:text-zinc-400">{issue.detail}</span>
                </p>
              ))}
            </div>
          </div>
        )}
        {showClean && (
          <div className="border-t border-zinc-200 dark:border-zinc-700 bg-emerald-50 dark:bg-emerald-500/5 px-4 py-3">
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              3 clean records instead of 6 messy ones. Duplicates merged, formats consistent, missing data filled or flagged. AI trained on this will give consistent, accurate answers.
            </p>
          </div>
        )}
      </div>

      {/* Real-world impact */}
      <InteractiveDemo
        title="What Happens When AI Learns From Bad Data"
        description="Real consequences from real companies. Click through to see the pattern: messy data → wrong AI."
        steps={IMPACT_EXAMPLES.map((ex) => (
          <div key={ex.title} className={`rounded-lg border p-5 ${ex.color}`}>
            <p className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{ex.title}</p>
            <div className="space-y-2">
              <div className="rounded bg-zinc-100 dark:bg-zinc-800/50 p-3">
                <p className="text-xs font-medium text-zinc-500">The messy data</p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{ex.messy}</p>
              </div>
              <div className="rounded bg-red-50 dark:bg-red-500/5 border border-red-300 dark:border-red-500/20 p-3">
                <p className="text-xs font-medium text-red-700 dark:text-red-400">What the AI learned</p>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{ex.result}</p>
              </div>
              <p className="text-xs text-zinc-500 italic">{ex.realCase}</p>
            </div>
          </div>
        ))}
      />

      <div className="mt-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.goodDataTitle}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { label: 'Complete', desc: 'No missing fields — like a form with every box filled in' },
            { label: 'Consistent', desc: 'Same format everywhere — dates, names, categories all match' },
            { label: 'Current', desc: 'Up to date — not last year\'s product catalog' },
            { label: 'Representative', desc: 'Covers the full picture — not just one department or region' },
          ].map((q) => (
            <div key={q.label} className="rounded bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2">
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400">{q.label}: </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">{q.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
