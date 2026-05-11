import { useState, useCallback } from 'react'
import { tArray, useLanguage, useT } from '../../i18n'
import { dataSourcesSectionSv, dataSourcesSectionKo } from './tech-translations'
import { sourcesTranslations } from './data-translations'

interface DataSource {
  name: string
  percent: number
  barColor: string
  color: string
  details: string
}

const SOURCES: DataSource[] = [
  {
    name: 'Common Crawl', percent: 65, barColor: 'bg-blue-500', color: 'text-blue-700 dark:text-blue-400',
    details: 'Web pages scraped regularly since 2008. FineWeb by HuggingFace extracted 15T tokens with aggressive quality filtering. DCLM (DataComp-LM) and RedPajama also build on Common Crawl with different filtering strategies.',
  },
  {
    name: 'Code', percent: 12, barColor: 'bg-green-500', color: 'text-green-700 dark:text-green-400',
    details: 'GitHub repos, StackOverflow, docs. The Stack v2 is 67.5 TB across 619 languages (~900B tokens). Code data dramatically improves reasoning and structured output.',
  },
  {
    name: 'Books', percent: 8, barColor: 'bg-amber-500', color: 'text-amber-700 dark:text-amber-400',
    details: 'Digitized books provide extended narrative coherence and deep domain knowledge. Books3 (~196K books) was commonly used but faced copyright challenges.',
  },
  {
    name: 'Academic', percent: 5, barColor: 'bg-purple-500', color: 'text-purple-700 dark:text-purple-400',
    details: 'Papers from arXiv, PubMed, Semantic Scholar. Provides scientific reasoning and mathematical notation. peS2o contains 40M open-access papers.',
  },
  {
    name: 'Wikipedia', percent: 3, barColor: 'bg-cyan-500', color: 'text-cyan-700 dark:text-cyan-400',
    details: 'All language editions. Despite being ~3% by volume, Wikipedia is high-quality factual text and is often upsampled during training for better factual grounding.',
  },
  {
    name: 'Other', percent: 7, barColor: 'bg-rose-500', color: 'text-rose-700 dark:text-rose-400',
    details: 'Reddit, forums, multilingual data, curated instruction datasets, government docs, patents, legal text. Diversity here helps generalization.',
  },
]

const EN_P2 = `Modern LLMs train on trillions of tokens from diverse sources. Key open datasets include`
export const DataSourcesSection: React.FC = () => {
  const { lang } = useLanguage()
  const sOURCEST = tArray(lang, SOURCES, sourcesTranslations)
  const c = useT({ title: '1. Data Sources' , p2: EN_P2 }, { sv: dataSourcesSectionSv, ko: dataSourcesSectionKo })
  const [selected, setSelected] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setSelected(p => p === i ? null : i), [])

  return (
    <section aria-labelledby="data-sources">
      <h2 id="data-sources" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-4 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        {c.p2} <strong className="text-zinc-900 dark:text-zinc-100">FineWeb</strong> (15T tokens),{' '}
        <strong className="text-zinc-900 dark:text-zinc-100">DCLM</strong>, and <strong className="text-zinc-900 dark:text-zinc-100">RedPajama</strong>.
      </p>
      <div className="mb-4 flex h-10 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700" role="img" aria-label="Data source distribution">
        {sOURCEST.map((s, i) => (
          <button key={s.name} onClick={() => toggle(i)}
            className={`${s.barColor} relative flex items-center justify-center transition-opacity hover:opacity-80 ${selected !== null && selected !== i ? 'opacity-50' : ''}`}
            style={{ width: `${s.percent}%` }} aria-label={`${s.name}: ${s.percent}%`}>
            {s.percent >= 8 && <span className="truncate px-1 text-xs font-semibold text-white drop-shadow">{s.name}</span>}
          </button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {sOURCEST.map((s, i) => (
          <button key={s.name} onClick={() => toggle(i)}
            className={`rounded-lg border p-3 text-left transition-colors ${selected === i ? 'border-zinc-500 bg-zinc-100 dark:bg-zinc-800' : 'border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-600'}`}>
            <div className="flex items-center gap-2">
              <span className={`size-3 rounded-sm ${s.barColor}`} />
              <span className={`text-sm font-medium ${s.color}`}>{s.name}</span>
              <span className="ml-auto font-mono text-sm text-zinc-600 dark:text-zinc-400">{s.percent}%</span>
            </div>
            {selected === i && <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{s.details}</p>}
          </button>
        ))}
      </div>
    </section>
  )
}
