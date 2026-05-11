import { useState, useMemo, useCallback } from 'react'
import { useT } from '../../i18n'
import { whatIsQuantizationSectionSv, whatIsQuantizationSectionKo } from './tech-translations'

const PRECISIONS = [
  { label: 'FP32', bits: 32, size: 28, quality: 100, color: 'bg-blue-500' },
  { label: 'FP16', bits: 16, size: 14, quality: 99.5, color: 'bg-green-500' },
  { label: 'INT8', bits: 8, size: 7, quality: 98, color: 'bg-amber-500' },
  { label: 'INT4', bits: 4, size: 3.5, quality: 93, color: 'bg-red-500' },
] as const

const EN_P4 = `The key insight: going from FP32 to INT4 cuts memory by`
const EN_P3 = `The key insight: going from FP32 to INT4 cuts memory by`
export const WhatIsQuantizationSection: React.FC = () => {
  const c = useT({ title: '1. What is Quantization?'  , p3: EN_P3 , p4: EN_P4 }, { sv: whatIsQuantizationSectionSv, ko: whatIsQuantizationSectionKo })
  const [level, setLevel] = useState(0)
  const precision = PRECISIONS[level]

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(Number(e.target.value))
  }, [])

  const bitBoxes = useMemo(() => {
    const total = 32
    const active = precision.bits
    return Array.from({ length: total }, (_, i) => i < active)
  }, [precision.bits])

  return (
    <section aria-labelledby="what-is-quantization">
      <h2 id="what-is-quantization" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">
        Every weight in a neural network is a number stored with a certain{' '}
        <strong className="text-zinc-100">precision</strong>. Full precision (FP32) uses 32 bits per
        weight. Quantization reduces this — fewer bits means a smaller model that runs faster, with
        a slight quality tradeoff.
      </p>

      {/* Bit visualization */}
      <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <p className="mb-3 text-sm text-zinc-400">
          One weight at <strong className="text-zinc-100">{precision.label}</strong> — {precision.bits} bits:
        </p>
        <div className="mb-4 flex flex-wrap gap-1" role="img" aria-label={`${precision.bits} active bits out of 32`}>
          {bitBoxes.map((active, i) => (
            <div
              key={i}
              className={`h-6 w-4 rounded-sm transition-all duration-300 ${
                active ? precision.color : 'bg-zinc-800'
              }`}
            />
          ))}
        </div>

        {/* Slider */}
        <label className="mb-1 block text-xs text-zinc-500" htmlFor="precision-slider">
          Drag to change precision
        </label>
        <input
          id="precision-slider"
          type="range"
          min={0}
          max={PRECISIONS.length - 1}
          value={level}
          onChange={handleSlider}
          className="w-full accent-zinc-400"
          aria-valuetext={precision.label}
        />
        <div className="mt-1 flex justify-between text-xs text-zinc-500">
          {PRECISIONS.map((p) => (
            <span key={p.label}>{p.label}</span>
          ))}
        </div>
      </div>

      {/* Memory savings table */}
      <h3 className="mb-3 font-mono text-sm font-semibold text-zinc-200">
        7B Parameter Model — Memory at Each Precision
      </h3>
      <div className="mb-6 overflow-hidden rounded-lg border border-zinc-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800">
              <th className="px-4 py-2 text-left font-mono text-xs text-zinc-400">Precision</th>
              <th className="px-4 py-2 text-left font-mono text-xs text-zinc-400">Bits/Weight</th>
              <th className="px-4 py-2 text-left font-mono text-xs text-zinc-400">Model Size</th>
              <th className="px-4 py-2 text-left font-mono text-xs text-zinc-400">Quality</th>
              <th className="px-4 py-2 text-left font-mono text-xs text-zinc-400">Savings</th>
            </tr>
          </thead>
          <tbody>
            {PRECISIONS.map((p) => (
              <tr
                key={p.label}
                className={`border-b border-zinc-800 transition-colors ${
                  p.label === precision.label ? 'bg-zinc-800' : ''
                }`}
              >
                <td className="px-4 py-2 font-mono text-zinc-100">{p.label}</td>
                <td className="px-4 py-2 text-zinc-300">{p.bits}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 rounded-sm ${p.color} transition-all duration-300`}
                      style={{ width: `${(p.size / 28) * 100}%`, minWidth: '12px', maxWidth: '120px' }}
                    />
                    <span className="text-zinc-100">{p.size} GB</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-zinc-300">{p.quality}%</td>
                <td className="px-4 py-2 text-zinc-400">
                  {p.bits === 32 ? '—' : `${Math.round((1 - p.size / 28) * 100)}% smaller`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Current selection summary */}
      <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
        <p className="text-sm leading-relaxed text-zinc-400">
          <strong className="text-amber-400">At {precision.label}:</strong> Each weight uses{' '}
          {precision.bits} bits. A 7B model needs{' '}
          <strong className="text-zinc-100">{precision.size} GB</strong> of memory, retaining{' '}
          <strong className="text-zinc-100">{precision.quality}%</strong> of original quality.
          {precision.bits <= 8 && (
            <>{c.p4}<strong className="text-zinc-100">87.5%</strong> while
              keeping ~93% quality — that&apos;s why quantization is essential for running LLMs locally.</>
          )}
        </p>
      </div>
    </section>
  )
}
