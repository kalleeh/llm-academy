import { useState, useCallback } from 'react'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'
import { dataForBusinessSv, dataForBusinessKo } from './translations'

type Tab = 'structured' | 'unstructured' | 'semi'

const STRUCTURED_ROWS = [
  ['C-1001', 'Acme Corp', 'sarah@acme.com', 'Enterprise', '$48,000', '2025-03-15', 'Active'],
  ['C-1002', 'Bolt Industries', 'mike@bolt.io', 'Startup', '$2,400', '2025-06-01', 'Active'],
  ['C-1003', 'Nova Labs', 'jen@novalabs.com', 'Mid-Market', '$12,000', '2024-11-20', 'Churned'],
]

const UNSTRUCTURED_EXAMPLES = [
  { label: 'Customer email', content: 'From: sarah@acme.com\nTo: support@yourcompany.com\nSubject: Re: Invoice discrepancy\n\nHi team,\nI noticed our March invoice shows $4,200 but we agreed on $4,000/month in the renewal. Can someone look into this?\nAlso, we\'re thinking about adding 5 more seats next quarter.\n\nThanks, Sarah' },
  { label: 'Meeting notes', content: 'Q1 Review — Acme Corp\nDate: April 2, 2025\nAttendees: Sarah (Acme), Mike (Sales), Jen (CS)\n\n- Acme happy with product, NPS 9/10\n- Want API access — currently on Standard plan\n- Budget approved for expansion in Q3\n- ACTION: Mike to send Enterprise upgrade proposal by Apr 10\n- RISK: Competitor demo scheduled for next week' },
  { label: 'Slack message', content: '#sales-team\nMike: heads up — Acme Corp is looking at a competitor.\nSarah mentioned it casually on our call today.\nJen: I\'ll flag this in the account health dashboard.\nMike: thx' },
]

const EN = {
  title: '2. Your Company\'s Data — What AI Sees',
  intro: 'Your company already has the data AI needs. But not all data looks the same. Let us look at actual examples so you can see the difference.',
  structuredLabel: 'Structured (spreadsheet)',
  unstructuredLabel: 'Unstructured (emails, docs)',
  whyItMattersLabel: 'Why it matters',
  structuredNote: 'Every piece of information has a clear label (column) and consistent format. AI can easily answer "how many Enterprise customers do we have?"',
  unstructuredNote: 'The same customer info is scattered across emails, docs, and Slack — in different formats. This is 80%+ of most companies\' data, and it\'s where LLMs shine.',
  howMuchTitle: 'How much data do you need?',
  howMuchIntro: 'It depends on the task — like training a new employee:',
  amounts: [
    { task: 'Answer FAQs', amount: 'A few dozen Q&A pairs', analogy: 'Like giving a new receptionist a cheat sheet' },
    { task: 'Classify support tickets', amount: 'A few hundred labeled examples', analogy: 'Like showing a new agent examples of each ticket type' },
    { task: 'Write in your brand voice', amount: 'Thousands of past communications', analogy: 'Like months of shadowing your best writer' },
  ],
  selfExplainPrompt: 'Think about your company\'s data. What\'s structured (spreadsheets, CRM)? What\'s unstructured (emails, docs, Slack)? If you pointed an AI at both, what questions could it answer that nobody can answer quickly today?',
  selfExplainAnswer: 'Example: Our CRM has clean customer records (structured) — AI could easily answer who is up for renewal. But the real gold is in our unstructured data: account managers\' email threads have context about customer sentiment, meeting notes capture verbal commitments, and Slack has real-time signals about at-risk accounts.',
}

export const DataForBusinessBusiness: React.FC = () => {
  const c = useT(EN, { sv: dataForBusinessSv, ko: dataForBusinessKo })
  const [tab, setTab] = useState<Tab>('structured')
  const [exampleIdx, setExampleIdx] = useState(0)
  const nextExample = useCallback(() => setExampleIdx((p) => (p + 1) % UNSTRUCTURED_EXAMPLES.length), [])

  return (
    <section aria-labelledby="data-biz">
      <h2 id="data-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="mb-4 flex gap-2">
        {([{ id: 'structured' as Tab, label: c.structuredLabel }, { id: 'unstructured' as Tab, label: c.unstructuredLabel }, { id: 'semi' as Tab, label: c.whyItMattersLabel }]).map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${tab === t.id ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>{t.label}</button>
        ))}
      </div>

      {tab === 'structured' && (
        <div className="mb-8 rounded-lg border border-emerald-400 dark:border-emerald-500/30 bg-white dark:bg-zinc-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50">{['ID', 'Company', 'Email', 'Plan', 'ARR', 'Start Date', 'Status'].map((h) => (<th key={h} className="px-3 py-2 text-left font-medium text-emerald-700 dark:text-emerald-400">{h}</th>))}</tr></thead>
              <tbody>{STRUCTURED_ROWS.map((row, i) => (<tr key={i} className="border-b border-zinc-200/50 dark:border-zinc-800/50 last:border-0">{row.map((cell, j) => (<td key={j} className="px-3 py-2 text-zinc-700 dark:text-zinc-300 whitespace-nowrap">{cell}</td>))}</tr>))}</tbody>
            </table>
          </div>
          <div className="border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-3"><p className="text-xs text-zinc-600 dark:text-zinc-400">{c.structuredNote}</p></div>
        </div>
      )}

      {tab === 'unstructured' && (
        <div className="mb-8 rounded-lg border border-amber-400 dark:border-amber-500/30 bg-white dark:bg-zinc-900 overflow-hidden">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
            <span className="text-xs text-zinc-600 dark:text-zinc-400">{UNSTRUCTURED_EXAMPLES[exampleIdx].label}</span>
            <button onClick={nextExample} className="rounded bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600">Next →</button>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{UNSTRUCTURED_EXAMPLES[exampleIdx].content}</pre>
          <div className="border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-3"><p className="text-xs text-zinc-600 dark:text-zinc-400">{c.unstructuredNote}</p></div>
        </div>
      )}

      {tab === 'semi' && (
        <div className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 space-y-4">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{c.whyItMattersLabel}</p>
        </div>
      )}

      <div className="mb-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.howMuchTitle}</p>
        <p className="mb-4 text-sm text-zinc-700 dark:text-zinc-300">{c.howMuchIntro}</p>
        <div className="space-y-2">
          {(c.amounts ?? EN.amounts).map((row) => (
            <div key={row.task} className="flex items-start gap-3 rounded bg-zinc-100 dark:bg-zinc-800/50 px-4 py-3">
              <div className="min-w-0 flex-1">
                <span className="text-sm text-zinc-800 dark:text-zinc-200">{row.task}</span>
                <span className="mx-2 text-zinc-500 dark:text-zinc-600">→</span>
                <span className="text-sm text-amber-700 dark:text-amber-300">{row.amount}</span>
                <p className="mt-1 text-xs text-zinc-500">{row.analogy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
    </section>
  )
}
