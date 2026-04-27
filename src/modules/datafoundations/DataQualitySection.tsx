import { useState, useCallback } from 'react'
import { useT } from '../../useT'
import { useLanguage } from '../../LanguageContext'
import { tArray } from '../../tArray'
import { dataQualitySectionSv, dataQualitySectionKo } from './tech-translations'
import { datasetTranslations, issuesTranslations } from './data-translations'

interface DataRow {
  id: number
  name: string
  email: string
  date: string
  amount: string
  country: string
}

interface DataIssue {
  type: 'missing' | 'duplicate' | 'inconsistent' | 'outlier' | 'bias'
  label: string
  rowIds: number[]
  column?: string
  explanation: string
}

const DATASET: DataRow[] = [
  { id: 1, name: 'Alice Chen', email: '[email]', date: '2024-01-15', amount: '$120.00', country: 'US' },
  { id: 2, name: 'Bob Smith', email: '', date: '2024-01-16', amount: '$85.50', country: 'US' },
  { id: 3, name: 'Carol Jones', email: '[email]', date: '01/17/2024', amount: '$200.00', country: 'US' },
  { id: 4, name: 'Dave Wilson', email: '[email]', date: '2024-01-17', amount: '$45.99', country: 'US' },
  { id: 5, name: 'Alice Chen', email: '[email]', date: '2024-01-15', amount: '$120.00', country: 'US' },
  { id: 6, name: 'Eve Brown', email: '[email]', date: '2024-01-18', amount: '€310.25', country: 'DE' },
  { id: 7, name: 'Frank Lee', email: '[email]', date: '2024-01-19', amount: '$99,999.00', country: 'US' },
  { id: 8, name: 'Grace Kim', email: '[email]', date: '2024-01-20', amount: '$75.00', country: 'US' },
  { id: 9, name: 'Hank Davis', email: '[email]', date: '2024-01-20', amount: '$90.00', country: 'US' },
  { id: 10, name: 'Ivy Patel', email: '[email]', date: '2024-01-21', amount: '$110.00', country: 'US' },
]

const ISSUES: DataIssue[] = [
  {
    type: 'missing',
    label: 'Missing Values',
    rowIds: [2],
    column: 'email',
    explanation: 'Row 2 has no email. Missing data can cause model errors or biased predictions if not handled (imputation, removal, or flagging).',
  },
  {
    type: 'duplicate',
    label: 'Duplicates',
    rowIds: [1, 5],
    explanation: 'Rows 1 and 5 are identical. Duplicates inflate training data, causing the model to overweight these examples.',
  },
  {
    type: 'inconsistent',
    label: 'Inconsistent Formats',
    rowIds: [3, 6],
    column: 'date',
    explanation: 'Row 3 uses MM/DD/YYYY while others use ISO 8601. Row 6 uses € instead of $. Inconsistent formats break parsers and confuse models.',
  },
  {
    type: 'outlier',
    label: 'Outliers',
    rowIds: [7],
    column: 'amount',
    explanation: 'Row 7 shows $99,999 — orders of magnitude above the rest. Could be legitimate (enterprise deal) or a data entry error. Either way, it skews statistics.',
  },
  {
    type: 'bias',
    label: 'Demographic Bias',
    rowIds: [],
    explanation: '9 of 10 records are from the US. A model trained on this data will perform poorly for other regions. For LLMs, training data skewed toward English text means weaker performance in other languages.',
  },
]

const ISSUE_COLORS: Record<DataIssue['type'], string> = {
  missing: 'bg-red-500/20 border-red-500/40',
  duplicate: 'bg-yellow-500/20 border-yellow-500/40',
  inconsistent: 'bg-orange-500/20 border-orange-500/40',
  outlier: 'bg-purple-500/20 border-purple-500/40',
  bias: 'bg-cyan-500/20 border-cyan-500/40',
}

const ISSUE_TEXT_COLORS: Record<DataIssue['type'], string> = {
  missing: 'text-red-300',
  duplicate: 'text-yellow-300',
  inconsistent: 'text-orange-300',
  outlier: 'text-purple-300',
  bias: 'text-cyan-300',
}

const EN_P2 = `For classical ML, bad data means bad predictions. For LLMs, it&apos;s even worse — biased or noisy training data gets baked into the model&apos;s weights and surfaces as hallucinations, stereotypes, or factual errors across millions of interactions.`
const EN_INTRO = `Spot the problems in this dataset. Click each issue type below to highlight it in the data.`

export const DataQualitySection: React.FC = () => {
  const { lang } = useLanguage()
  const dATASETT = tArray(lang, DATASET, datasetTranslations)
  const iSSUEST = tArray(lang, ISSUES, issuesTranslations)
  const c = useT({ title: '3. Data Quality', intro: EN_INTRO , p2: EN_P2 }, { sv: dataQualitySectionSv, ko: dataQualitySectionKo })
  const [found, setFound] = useState<Set<string>>(new Set())
  const [activeIssue, setActiveIssue] = useState<string | null>(null)

  const handleIssueClick = useCallback((type: string) => {
    setFound(prev => {
      const next = new Set(prev)
      next.add(type)
      return next
    })
    setActiveIssue(prev => (prev === type ? null : type))
  }, [])

  // Build a set of highlighted row+column combos
  const highlightedCells = new Map<string, DataIssue['type']>()
  if (activeIssue) {
    const issue = ISSUES.find(i => i.type === activeIssue)
    if (issue) {
      for (const rowId of issue.rowIds) {
        if (issue.column) {
          highlightedCells.set(`${rowId}-${issue.column}`, issue.type)
        } else {
          for (const col of ['name', 'email', 'date', 'amount', 'country']) {
            highlightedCells.set(`${rowId}-${col}`, issue.type)
          }
        }
      }
    }
  }

  const columns = ['id', 'name', 'email', 'date', 'amount', 'country'] as const

  return (
    <section aria-labelledby="quality">
      <h2 id="quality" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Issue buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {iSSUEST.map(issue => (
          <button
            key={issue.type}
            onClick={() => handleIssueClick(issue.type)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
              ISSUE_COLORS[issue.type]
            } ${ISSUE_TEXT_COLORS[issue.type]} ${
              activeIssue === issue.type ? 'ring-2 ring-zinc-400/50' : 'hover:brightness-125'
            }`}
            aria-pressed={activeIssue === issue.type}
          >
            {found.has(issue.type) ? '✓ ' : ''}{issue.label}
          </button>
        ))}
        <span className="self-center text-xs text-zinc-500">
          {found.size}/{ISSUES.length} found
        </span>
      </div>

      {/* Feedback */}
      {activeIssue && (() => {
        const issue = ISSUES.find(i => i.type === activeIssue)
        if (!issue) return null
        return (
          <div className={`mb-4 rounded-lg border p-3 ${ISSUE_COLORS[issue.type]}`}>
            <p className={`text-sm font-medium ${ISSUE_TEXT_COLORS[issue.type]}`}>{issue.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-300">{issue.explanation}</p>
          </div>
        )
      })()}

      {/* Dataset table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-700">
        <table className="w-full text-left text-sm" role="table">
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800 text-xs text-zinc-400">
              {columns.map(h => (
                <th key={h} className="px-3 py-2 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono text-xs">
            {dATASETT.map(row => (
              <tr key={row.id} className="border-b border-zinc-800">
                {columns.map(col => {
                  const cellKey = `${row.id}-${col}`
                  const issueType = highlightedCells.get(cellKey)
                  const value = row[col as keyof DataRow]
                  const isEmpty = col === 'email' && !value
                  return (
                    <td
                      key={col}
                      className={`px-3 py-1.5 ${
                        issueType
                          ? `${ISSUE_COLORS[issueType]} font-semibold`
                          : isEmpty
                            ? 'bg-red-500/10 text-red-400 italic'
                            : 'text-zinc-300'
                      }`}
                    >
                      {isEmpty ? '(null)' : String(value)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GIGO callout */}
      <div className="mt-6 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <p className="text-sm font-medium text-zinc-200">Garbage In, Garbage Out</p>
        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
          {c.p2}
        </p>
      </div>
    </section>
  )
}
