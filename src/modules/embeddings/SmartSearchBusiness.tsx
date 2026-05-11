import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import { useT } from '../../i18n'
import { smartSearchSv, smartSearchKo } from './translations'

const DEMOS = [
  {
    query: 'How many vacation days do I get?',
    keywordResults: [
      { title: 'Vacation Policy 2019.pdf', snippet: '...annual vacation entitlement for full-time employees...' },
      { title: 'Team Vacation Calendar.xlsx', snippet: '...Smith: Aug 12-19, Jones: Jul 3-7...' },
      { title: 'No other results found', snippet: 'Your search for "vacation days" returned 2 results. The current policy uses "PTO allowance" — not matched.' },
    ],
    smartResults: [
      { title: 'PTO & Leave Policy (2025)', snippet: 'Full-time employees receive 20 days of PTO per year, accruing at 1.67 days/month...', score: '97%' },
      { title: 'New Hire Onboarding Guide', snippet: '...your PTO allowance starts accruing from day one...', score: '84%' },
      { title: 'Employee Benefits Summary', snippet: '...in addition to PTO, employees receive 10 paid holidays...', score: '76%' },
    ],
  },
  {
    query: 'What did we promise Acme Corp about delivery?',
    keywordResults: [
      { title: '847 results for "Acme"', snippet: 'Too many results — mentions in emails, invoices, meeting notes...' },
      { title: 'Acme Corp Invoice #4021.pdf', snippet: '...payment terms: Net 30...' },
      { title: 'No results for "promise delivery"', snippet: 'The exact phrase doesn\'t appear in any document.' },
    ],
    smartResults: [
      { title: 'Acme Corp Proposal v3 (signed)', snippet: 'Section 5.2: Delivery timeline — initial deployment within 6 weeks...', score: '95%' },
      { title: 'Email: Re: Acme timeline update', snippet: 'Confirming we can meet the 6-week target. Our team will begin March 1st...', score: '89%' },
      { title: 'Acme QBR Notes - Q1 2025', snippet: 'Action item: expedite Phase 2 delivery from 90 days to 60 days...', score: '81%' },
    ],
  },
]

const EN = {
  title: '1. Why Regular Search Isn\'t Enough',
  intro: 'Regular search looks for exact words. AI-powered search understands meaning. See the difference:',
  tryAnother: 'Try another query',
  keywordLabel: 'Keyword search (Ctrl+F style)',
  smartLabel: 'AI-powered search (understands meaning)',
  howTitle: 'How does it work? (No math, promise)',
  howText: 'AI converts every piece of text into a "meaning fingerprint." Similar meanings get similar fingerprints. When you search, AI converts your question into a fingerprint too, then finds the documents with the closest match — even if they use completely different words.',
}

export const SmartSearchBusiness: React.FC = () => {
  const c = useT(EN, { sv: smartSearchSv, ko: smartSearchKo })
  const [demoIdx, setDemoIdx] = useState(0)
  const demo = DEMOS[demoIdx]
  const switchDemo = useCallback(() => setDemoIdx((p) => (p + 1) % DEMOS.length), [])

  return (
    <section aria-labelledby="search-biz">
      <h2 id="search-biz" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      <div className="mb-4 flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2.5">
          <Icon name="search" size={14} className="text-zinc-500" />
          <span className="text-sm text-zinc-200">{demo.query}</span>
        </div>
        <button onClick={switchDemo} className="rounded-lg bg-zinc-700 px-3 py-2.5 text-xs text-zinc-300 hover:bg-zinc-600">{c.tryAnother}</button>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-red-500/20 bg-zinc-900 overflow-hidden">
          <div className="border-b border-zinc-800 bg-zinc-800 px-4 py-2"><span className="text-xs font-medium text-red-400">{c.keywordLabel}</span></div>
          <div className="divide-y divide-zinc-800/50">
            {demo.keywordResults.map((r, i) => (<div key={i} className="px-4 py-3"><p className="text-sm text-zinc-400">{r.title}</p><p className="mt-1 text-xs text-zinc-500">{r.snippet}</p></div>))}
          </div>
        </div>
        <div className="rounded-lg border border-emerald-500/20 bg-zinc-900 overflow-hidden">
          <div className="border-b border-zinc-800 bg-zinc-800 px-4 py-2"><span className="text-xs font-medium text-emerald-400">{c.smartLabel}</span></div>
          <div className="divide-y divide-zinc-800/50">
            {demo.smartResults.map((r, i) => (<div key={i} className="px-4 py-3"><div className="flex items-center justify-between"><p className="text-sm font-medium text-zinc-200">{r.title}</p><span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs text-emerald-400">{r.score}</span></div><p className="mt-1 text-xs text-zinc-400">{r.snippet}</p></div>))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <p className="mb-2 text-sm font-medium text-zinc-100">{c.howTitle}</p>
        <p className="text-sm text-zinc-300">{c.howText}</p>
      </div>
    </section>
  )
}
