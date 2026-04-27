import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useT } from '../../useT'
import { dataTypesSectionSv, dataTypesSectionKo } from './tech-translations'

interface DataExample {
  label: string
  icon: IconName
  preview: string
}

interface DataCategory {
  title: string
  color: string
  borderColor: string
  description: string
  examples: DataExample[]
}

const CATEGORIES: DataCategory[] = [
  {
    title: '1. Structured vs Unstructured Data',
    color: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    description: 'Fixed schema, rows & columns. Every record follows the same format.',
    examples: [
      {
        label: 'Database Table',
        icon: 'database',
        preview:
          '┌────────┬───────┬────────┬──────────┐\n│ id     │ name  │ price  │ category │\n├────────┼───────┼────────┼──────────┤\n│ 1      │ Bolt  │ 2.99   │ hardware │\n│ 2      │ Nut   │ 1.49   │ hardware │\n│ 3      │ Pipe  │ 12.00  │ plumbing │\n└────────┴───────┴────────┴──────────┘',
      },
      {
        label: 'CSV File',
        icon: 'bar-chart',
        preview:
          'id,name,email,signup_date\n1,Alice,[email],2024-01-15\n2,Bob,[email],2024-02-20\n3,Carol,[email],2024-03-10',
      },
      {
        label: 'Spreadsheet',
        icon: 'book',
        preview:
          '   A          B        C         D\n1  Quarter    Revenue  Costs     Profit\n2  Q1 2024    $1.2M    $800K     $400K\n3  Q2 2024    $1.5M    $900K     $600K\n4  Q3 2024    $1.8M    $950K     $850K',
      },
      {
        label: 'Fixed-Schema JSON',
        icon: 'clipboard',
        preview:
          '{\n  "user_id": 42,\n  "name": "Alice",\n  "age": 30,\n  "active": true\n}',
      },
    ],
  },
  {
    title: 'Unstructured',
    color: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    description: 'No predefined schema. Meaning is embedded in the content itself.',
    examples: [
      {
        label: 'Text Document',
        icon: 'file',
        preview:
          'The quarterly earnings report showed\nunexpected growth in the APAC region,\ndriven primarily by new enterprise\ncontracts signed in Q3...',
      },
      {
        label: 'Email',
        icon: 'envelope',
        preview:
          'From: [email]\nTo: [email]\nSubject: Re: Project Update\n\nHey team, just wanted to flag that\nthe deadline moved to Friday...',
      },
      {
        label: 'Image / Audio / Video',
        icon: 'image',
        preview:
          '[Raw pixel data: 1920×1080×3 = 6.2M values]\n[Audio waveform: 44100 samples/sec × 180s]\n[Video: 30 fps × 1080p × 2hrs = ~11B values]',
      },
      {
        label: 'PDF / Web Page',
        icon: 'globe',
        preview:
          '<html>\n  <body>\n    <h1>Annual Report 2024</h1>\n    <p>Mixed text, tables, charts,\n       images, footnotes...</p>\n  </body>\n</html>',
      },
    ],
  },
  {
    title: 'Semi-Structured',
    color: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    description: 'Has some organization (tags, keys) but schema varies between records.',
    examples: [
      {
        label: 'Varying JSON',
        icon: 'clipboard',
        preview:
          '// Record 1: has address\n{ "name": "Alice", "address": { "city": "NYC" } }\n\n// Record 2: no address, has tags\n{ "name": "Bob", "tags": ["vip", "beta"] }',
      },
      {
        label: 'Server Logs',
        icon: 'edit',
        preview:
          '2024-03-15T10:23:01Z INFO  [api] GET /users 200 45ms\n2024-03-15T10:23:02Z WARN  [db] slow query: 1200ms\n2024-03-15T10:23:05Z ERROR [auth] token expired uid=42',
      },
      {
        label: 'XML / HTML',
        icon: 'tag',
        preview:
          '<product>\n  <name>Widget Pro</name>\n  <price currency="USD">29.99</price>\n  <specs>\n    <weight unit="kg">0.5</weight>\n  </specs>\n</product>',
      },
    ],
  },
]

const EN_P3 = `LLMs work with unstructured text. This changes everything.`
const EN_P2 = `{c.p2}`
const EN_INTRO = `All data falls into three categories. Click any example to see what it actually looks like.`

export const DataTypesSection: React.FC = () => {
  const c = useT({ title: '1. Structured vs Unstructured Data', intro: EN_INTRO , p2: EN_P2 , p3: EN_P3 }, { sv: dataTypesSectionSv, ko: dataTypesSectionKo })
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = useCallback((key: string) => {
    setExpanded(prev => (prev === key ? null : key))
  }, [])

  return (
    <section aria-labelledby="data-types">
      <h2 id="data-types" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="grid gap-4 lg:grid-cols-3">
        {CATEGORIES.map(cat => (
          <div key={cat.title} className={`rounded-lg border ${cat.borderColor} ${cat.color} p-4`}>
            <h3 className="mb-1 font-mono text-sm font-semibold text-zinc-100">{cat.title}</h3>
            <p className="mb-4 text-xs text-zinc-400">{cat.description}</p>
            <div className="space-y-2">
              {cat.examples.map(ex => {
                const key = `${cat.title}-${ex.label}`
                const isOpen = expanded === key
                return (
                  <div key={ex.label}>
                    <button
                      onClick={() => toggle(key)}
                      className="flex w-full items-center gap-2 rounded-md border border-zinc-700/50 bg-zinc-900/50 px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-800/50"
                      aria-expanded={isOpen}
                    >
                      <Icon name={ex.icon} />
                      <span className="text-zinc-200">{ex.label}</span>
                      <span className="ml-auto text-xs text-zinc-500">{isOpen ? '▲' : '▼'}</span>
                    </button>
                    {isOpen && (
                      <pre className="mt-1 overflow-x-auto rounded-md bg-zinc-950 p-3 font-mono text-xs leading-relaxed text-zinc-300">
                        {ex.preview}
                      </pre>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Mini table visualization */}
      <div className="mt-6 overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-900">
        <div className="border-b border-zinc-700 bg-zinc-800 px-4 py-2">
          <span className="font-mono text-xs text-zinc-400">structured_data.csv — 5 rows × 4 columns</span>
        </div>
        <table className="w-full text-left text-sm" role="table">
          <thead>
            <tr className="border-b border-zinc-700 text-xs text-zinc-400">
              {['id', 'customer', 'amount', 'date'].map(h => (
                <th key={h} className="px-4 py-2 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono text-xs text-zinc-300">
            {[
              ['1', 'Alice', '$120.00', '2024-01-15'],
              ['2', 'Bob', '$85.50', '2024-01-16'],
              ['3', 'Carol', '$200.00', '2024-01-16'],
              ['4', 'Dave', '$45.99', '2024-01-17'],
              ['5', 'Eve', '$310.25', '2024-01-18'],
            ].map(row => (
              <tr key={row[0]} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-1.5">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key insight */}
      <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <p className="text-sm font-medium text-amber-300"><Icon name="lightbulb" /> Key Insight</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-300">
          ML traditionally needs structured data — clean rows and columns with labeled features.{' '}
          <span className="text-amber-200">
            LLMs work with unstructured text. This changes everything.
          </span>{' '}
          Instead of engineering features from structured tables, you can feed raw documents,
          conversations, and code directly into a model.
        </p>
      </div>
    </section>
  )
}
