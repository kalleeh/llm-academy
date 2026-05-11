import { useState, useCallback, useMemo } from 'react'
import { useT } from '../../i18n'
import { dataMixSectionSv, dataMixSectionKo } from './tech-translations'

const SLIDERS = [
  { label: 'Text (web, books)', key: 'text', color: 'text-blue-700 dark:text-blue-400', bar: 'bg-blue-500' },
  { label: 'Code', key: 'code', color: 'text-green-700 dark:text-green-400', bar: 'bg-green-500' },
  { label: 'Math', key: 'math', color: 'text-amber-700 dark:text-amber-400', bar: 'bg-amber-500' },
] as const

const CAPS = [
  { name: 'Natural language', fn: (m: Record<string, number>) => m.text * 1.2 + m.code * 0.2 + m.math * 0.1 },
  { name: 'Code generation', fn: (m: Record<string, number>) => m.code * 2.0 + m.text * 0.3 + m.math * 0.5 },
  { name: 'Math reasoning', fn: (m: Record<string, number>) => m.math * 2.5 + m.code * 0.6 + m.text * 0.1 },
  { name: 'Instruction following', fn: (m: Record<string, number>) => m.text * 0.8 + m.code * 0.5 + m.math * 0.3 },
  { name: 'Multilingual', fn: (m: Record<string, number>) => m.text * 1.0 + m.code * 0.1 },
]

const EN_P3 = `Illustrative — real capability depends on model size, training duration, and data quality.`
const EN_INTRO = `The ratio of data types directly shapes what the model is good at.`

export const DataMixSection: React.FC = () => {
  const c = useT({ title: '3. Data Mix', intro: EN_INTRO  , p3: EN_P3 }, { sv: dataMixSectionSv, ko: dataMixSectionKo })
  const [mix, setMix] = useState<Record<string, number>>({ text: 60, code: 25, math: 15 })

  const handleChange = useCallback((key: string, value: number) => {
    setMix(prev => {
      const others = Object.keys(prev).filter(k => k !== key)
      const remaining = 100 - value
      const otherTotal = others.reduce((s, k) => s + prev[k], 0)
      const next: Record<string, number> = { ...prev, [key]: value }
      if (otherTotal > 0) {
        others.forEach(k => { next[k] = Math.round((prev[k] / otherTotal) * remaining) })
        const sum = Object.values(next).reduce((s, v) => s + v, 0)
        if (sum !== 100) next[others[0]] += 100 - sum
      }
      return next
    })
  }, [])

  const caps = useMemo(
    () => CAPS.map(c => ({ name: c.name, score: Math.min(100, Math.round(c.fn(mix))) })),
    [mix],
  )

  return (
    <section aria-labelledby="data-mix">
      <h2 id="data-mix" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
          <h3 className="mb-4 font-mono text-sm font-semibold text-zinc-700 dark:text-zinc-300">Training Data Ratio</h3>
          <div className="space-y-4">
            {SLIDERS.map(s => (
              <div key={s.key}>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor={`mix-${s.key}`} className={`text-sm font-medium ${s.color}`}>{s.label}</label>
                  <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">{mix[s.key]}%</span>
                </div>
                <input id={`mix-${s.key}`} type="range" min={0} max={100} value={mix[s.key]}
                  onChange={e => handleChange(s.key, Number(e.target.value))} className="w-full accent-zinc-400" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex h-4 overflow-hidden rounded" role="img" aria-label="Current data mix">
            {SLIDERS.map(s => (
              <div key={s.key} className={`${s.bar} transition-all duration-300`} style={{ width: `${mix[s.key]}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
          <h3 className="mb-4 font-mono text-sm font-semibold text-zinc-700 dark:text-zinc-300">Estimated Capabilities</h3>
          <div className="space-y-3">
            {caps.map(c => (
              <div key={c.name}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">{c.name}</span>
                  <span className="font-mono text-zinc-700 dark:text-zinc-300">{c.score}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded bg-zinc-100 dark:bg-zinc-800">
                  <div className="h-full rounded bg-gradient-to-r from-zinc-500 to-zinc-300 transition-all duration-300"
                    style={{ width: `${c.score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-zinc-500">{c.p3}</p>
        </div>
      </div>
    </section>
  )
}
