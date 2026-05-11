import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import { FileExplorer } from '../../components/FileExplorer'
import type { FileNode } from '../../components/FileExplorer'
import { useT } from '../../i18n'
import { lLMDataSectionSv, lLMDataSectionKo } from './tech-translations'

const COMPARISON: { aspect: string; ml: string; llm: string }[] = [
  { aspect: 'Data format', ml: 'Labeled CSV, feature tables', llm: 'Massive raw text (books, web, code)' },
  { aspect: 'Schema', ml: 'Fixed columns, typed features', llm: 'No schema — just sequences of tokens' },
  { aspect: 'Labels', ml: 'Required (supervised) or clusters', llm: 'Self-supervised (predict next token)' },
  { aspect: 'Typical size', ml: '10K – 1M rows', llm: '10 – 15 TRILLION tokens' },
  { aspect: 'Preparation', ml: 'Feature engineering, normalization', llm: 'Deduplication, filtering, tokenization' },
  { aspect: 'Quality signal', ml: 'Label accuracy, feature relevance', llm: 'Text quality, diversity, decontamination' },
]

const DATASET_TREE: FileNode[] = [
  {
    name: 'pretraining-corpus/',
    type: 'folder',
    children: [
      {
        name: 'common-crawl/',
        type: 'folder',
        annotation: '~60% of data',
        children: [
          { name: 'CC-2024-01.jsonl.zst', type: 'file', size: '~850 GB', annotation: 'filtered web pages' },
          { name: 'CC-2024-02.jsonl.zst', type: 'file', size: '~820 GB' },
          { name: 'url_blocklist.txt', type: 'file', size: '12 MB', content: '# Domains filtered out\nmalware-site.example.com\nspam-farm.example.net\n...' },
        ],
      },
      {
        name: 'wikipedia/',
        type: 'folder',
        annotation: '~4% of data',
        children: [
          { name: 'en_wiki_2024.jsonl.zst', type: 'file', size: '22 GB' },
          { name: 'multilingual/', type: 'folder', children: [
            { name: 'de_wiki.jsonl.zst', type: 'file', size: '6 GB' },
            { name: 'fr_wiki.jsonl.zst', type: 'file', size: '5 GB' },
            { name: 'zh_wiki.jsonl.zst', type: 'file', size: '3 GB' },
          ]},
        ],
      },
      {
        name: 'github-code/',
        type: 'folder',
        annotation: '~10% of data',
        children: [
          { name: 'python/', type: 'folder', children: [
            { name: 'python_deduped.jsonl.zst', type: 'file', size: '180 GB' },
          ]},
          { name: 'javascript/', type: 'folder', children: [
            { name: 'js_deduped.jsonl.zst', type: 'file', size: '150 GB' },
          ]},
          { name: 'license_filter.yaml', type: 'file', size: '4 KB', content: 'allowed_licenses:\n  - MIT\n  - Apache-2.0\n  - BSD-2-Clause\n  - BSD-3-Clause\nblocked:\n  - GPL-3.0  # copyleft concerns' },
        ],
      },
      {
        name: 'books/',
        type: 'folder',
        annotation: '~8% of data',
        children: [
          { name: 'books_deduped.jsonl.zst', type: 'file', size: '95 GB' },
          { name: 'metadata.json', type: 'file', size: '200 MB', content: '{\n  "total_books": 185000,\n  "languages": ["en", "de", "fr", "es", "zh"],\n  "avg_tokens_per_book": 82000\n}' },
        ],
      },
      {
        name: 'academic/',
        type: 'folder',
        annotation: '~6% of data',
        children: [
          { name: 'arxiv_papers.jsonl.zst', type: 'file', size: '45 GB' },
          { name: 'pubmed_abstracts.jsonl.zst', type: 'file', size: '18 GB' },
        ],
      },
      {
        name: 'config/',
        type: 'folder',
        children: [
          { name: 'mix_ratios.yaml', type: 'file', size: '1 KB', content: 'data_mix:\n  common_crawl: 0.60\n  github_code: 0.10\n  books: 0.08\n  academic: 0.06\n  wikipedia: 0.04\n  other: 0.12\ntotal_tokens: 15_000_000_000_000' },
          { name: 'quality_filters.yaml', type: 'file', size: '2 KB', content: 'filters:\n  min_doc_length: 100  # tokens\n  max_doc_length: 100000\n  dedup_method: minhash\n  dedup_threshold: 0.8\n  language_detection: fasttext\n  perplexity_filter: true\n  max_perplexity: 1000' },
        ],
      },
    ],
  },
]

const SOURCES = [
  { name: 'Common Crawl', tokens: '~9T', pct: 60, color: 'bg-blue-500' },
  { name: 'GitHub Code', tokens: '~1.5T', pct: 10, color: 'bg-emerald-500' },
  { name: 'Books', tokens: '~1.2T', pct: 8, color: 'bg-purple-500' },
  { name: 'Academic', tokens: '~900B', pct: 6, color: 'bg-amber-500' },
  { name: 'Wikipedia', tokens: '~600B', pct: 4, color: 'bg-pink-500' },
  { name: 'Other', tokens: '~1.8T', pct: 12, color: 'bg-zinc-500' },
]

const EN_P7 = `What a pre-training dataset directory looks like — click files to see contents:`
const EN_P6 = `What a pre-training dataset directory looks like — click files to see contents:`
const EN_P5 = `Typical pre-training data mix (~15T tokens)`
const EN_P4 = `You now understand where data comes from, how it flows, and what quality means. Next, we&apos;ll dive into how LLMs actually`
const EN_INTRO = `Now that you understand data broadly, here's what LLMs specifically need.`

export const LLMDataSection: React.FC = () => {
  const c = useT({ title: '5. What LLMs Need', intro: EN_INTRO , p4: EN_P4 , p5: EN_P5 , p6: EN_P6 , p7: EN_P7 }, { sv: lLMDataSectionSv, ko: lLMDataSectionKo })
  const [showComparison, setShowComparison] = useState(true)

  const toggleView = useCallback(() => {
    setShowComparison(prev => !prev)
  }, [])

  return (
    <section aria-labelledby="llm-data">
      <h2 id="llm-data" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      {/* Toggle */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={toggleView}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            showComparison ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          ML vs LLM Comparison
        </button>
        <button
          onClick={toggleView}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            !showComparison ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Data Sources & Scale
        </button>
      </div>

      {showComparison ? (
        /* Comparison table */
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
          <table className="w-full text-left text-sm" role="table">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
                <th className="px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">Aspect</th>
                <th className="px-4 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">Classical ML</th>
                <th className="px-4 py-2 text-xs font-medium text-amber-700 dark:text-amber-400">LLM Pre-training</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {COMPARISON.map(row => (
                <tr key={row.aspect} className="border-b border-zinc-200 dark:border-zinc-800">
                  <td className="px-4 py-2 font-medium text-zinc-800 dark:text-zinc-200">{row.aspect}</td>
                  <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400">{row.ml}</td>
                  <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">{row.llm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Scale visualization */
        <div className="space-y-4">
          {/* Scale comparison */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
            <p className="mb-3 text-xs font-medium text-zinc-700 dark:text-zinc-300">Scale comparison</p>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-700 dark:text-emerald-400">Good ML dataset</span>
                  <span className="text-zinc-600 dark:text-zinc-400">10K – 1M rows</span>
                </div>
                <div className="mt-1 h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div className="h-full rounded-full bg-emerald-500/60" style={{ width: '1%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-700 dark:text-amber-400">LLM pre-training dataset</span>
                  <span className="text-zinc-600 dark:text-zinc-400">10 – 15 TRILLION tokens</span>
                </div>
                <div className="mt-1 h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div className="h-full rounded-full bg-amber-500/60" style={{ width: '100%' }} />
                </div>
              </div>
              <p className="text-center text-xs text-zinc-500">
                That&apos;s roughly <span className="text-amber-700 dark:text-amber-300 font-medium">10,000,000×</span> more data
              </p>
            </div>
          </div>

          {/* Source breakdown */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
            <p className="mb-3 text-xs font-medium text-zinc-700 dark:text-zinc-300">{c.p5}</p>
            {/* Stacked bar */}
            <div className="mb-3 flex h-6 overflow-hidden rounded-full">
              {SOURCES.map(s => (
                <div
                  key={s.name}
                  className={`${s.color} opacity-70`}
                  style={{ width: `${s.pct}%` }}
                  title={`${s.name}: ${s.tokens} (${s.pct}%)`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {SOURCES.map(s => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                  <span className={`inline-block size-2 rounded-full ${s.color} opacity-70`} />
                  {s.name} <span className="text-zinc-500">({s.tokens})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* File explorer */}
      <div className="mt-6">
        <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">{c.p7}</p>
        <FileExplorer tree={DATASET_TREE} title="~/pretraining-corpus" />
      </div>

      {/* Bridge to next module */}
      <div className="mt-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 p-4">
        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200"><Icon name="arrow-right" /> Up Next</p>
        <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {c.p4} <em>consume</em> this data — breaking text
          into <span className="text-amber-700 dark:text-amber-300">tokens</span>, the fundamental unit that
          transformers process.
        </p>
      </div>
    </section>
  )
}
