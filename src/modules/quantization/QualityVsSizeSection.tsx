import { useState, useCallback } from 'react'
import { tArray, useLanguage, useT } from '../../i18n'
import { qualityVsSizeSectionSv, qualityVsSizeSectionKo } from './tech-translations'
import { quantLevelsTranslations } from './data-translations'

interface QuantLevel {
  label: string
  size: number
  quality: number
  bpw: number
  useCase: string
  sweet?: boolean
}

const QUANT_LEVELS: QuantLevel[] = [
  { label: 'Q2_K', size: 2.7, quality: 72, bpw: 2.50, useCase: 'Extreme compression — testing only' },
  { label: 'Q3_K_M', size: 3.3, quality: 82, bpw: 3.30, useCase: 'Very constrained memory, acceptable quality loss' },
  { label: 'Q4_K_M', size: 4.0, quality: 93, bpw: 4.83, useCase: 'Best balance — recommended for most local use', sweet: true },
  { label: 'Q5_K_M', size: 4.7, quality: 96, bpw: 5.69, useCase: 'Higher quality when you have the RAM' },
  { label: 'Q6_K', size: 5.5, quality: 98, bpw: 6.00, useCase: 'Near-lossless, good for important tasks' },
  { label: 'Q8_0', size: 7.0, quality: 99.5, bpw: 8.50, useCase: 'Virtually lossless, 2x FP16 compression' },
  { label: 'FP16', size: 14.0, quality: 100, bpw: 16.0, useCase: 'Full precision baseline — no quantization' },
]

const CHART_W = 600
const CHART_H = 300
const PAD = { top: 20, right: 30, bottom: 40, left: 50 }

const EN_P2 = `The relationship between model size and quality isn&apos;t linear. There&apos;s a sweet spot where you get most of the quality at a fraction of the size. For a 7B model, that sweet spot is`
export const QualityVsSizeSection: React.FC = () => {
  const { lang } = useLanguage()
  const qUANT_LEVELST = tArray(lang, QUANT_LEVELS, quantLevelsTranslations)
  const c = useT({ title: '4. Quality vs Size' , p2: EN_P2 }, { sv: qualityVsSizeSectionSv, ko: qualityVsSizeSectionKo })
  const [hovered, setHovered] = useState<number | null>(null)

  const handleHover = useCallback((i: number | null) => setHovered(i), [])

  const xMin = 0
  const xMax = 16
  const yMin = 60
  const yMax = 102

  const toX = (size: number) => PAD.left + ((size - xMin) / (xMax - xMin)) * (CHART_W - PAD.left - PAD.right)
  const toY = (quality: number) => PAD.top + ((yMax - quality) / (yMax - yMin)) * (CHART_H - PAD.top - PAD.bottom)

  return (
    <section aria-labelledby="quality-vs-size">
      <h2 id="quality-vs-size" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        {c.p2} <strong className="text-zinc-900 dark:text-zinc-100">Q4_K_M</strong>.
      </p>

      {/* SVG Chart */}
      <div className="mb-6 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="w-full"
          role="img"
          aria-label="Chart showing quality vs model size for different quantization levels"
        >
          {/* Grid lines */}
          {[70, 80, 90, 100].map((y) => (
            <line key={y} x1={PAD.left} x2={CHART_W - PAD.right} y1={toY(y)} y2={toY(y)} stroke="#3f3f46" strokeDasharray="4 4" />
          ))}
          {[2, 4, 6, 8, 10, 12, 14].map((x) => (
            <line key={x} x1={toX(x)} x2={toX(x)} y1={PAD.top} y2={CHART_H - PAD.bottom} stroke="#3f3f46" strokeDasharray="4 4" />
          ))}

          {/* Axes */}
          <line x1={PAD.left} x2={CHART_W - PAD.right} y1={CHART_H - PAD.bottom} y2={CHART_H - PAD.bottom} stroke="#71717a" />
          <line x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={CHART_H - PAD.bottom} stroke="#71717a" />

          {/* Axis labels */}
          <text x={CHART_W / 2} y={CHART_H - 5} textAnchor="middle" fill="#a1a1aa" fontSize="11">Model Size (GB) — 7B model</text>
          <text x={12} y={CHART_H / 2} textAnchor="middle" fill="#a1a1aa" fontSize="11" transform={`rotate(-90, 12, ${CHART_H / 2})`}>Quality (%)</text>

          {/* Y-axis ticks */}
          {[70, 80, 90, 100].map((y) => (
            <text key={y} x={PAD.left - 8} y={toY(y) + 4} textAnchor="end" fill="#a1a1aa" fontSize="10">{y}</text>
          ))}
          {/* X-axis ticks */}
          {[2, 4, 6, 8, 10, 12, 14].map((x) => (
            <text key={x} x={toX(x)} y={CHART_H - PAD.bottom + 16} textAnchor="middle" fill="#a1a1aa" fontSize="10">{x}</text>
          ))}

          {/* Sweet spot zone */}
          <rect
            x={toX(3.5)}
            y={toY(97)}
            width={toX(5.2) - toX(3.5)}
            height={toY(88) - toY(97)}
            fill="#f59e0b"
            opacity={0.08}
            rx={4}
          />
          <text x={toX(4.35)} y={toY(97) - 4} textAnchor="middle" fill="#f59e0b" fontSize="9" opacity={0.7}>sweet spot</text>

          {/* Line connecting points */}
          <polyline
            points={qUANT_LEVELST.map((q) => `${toX(q.size)},${toY(q.quality)}`).join(' ')}
            fill="none"
            stroke="#a1a1aa"
            strokeWidth={1.5}
            opacity={0.4}
          />

          {/* Data points */}
          {qUANT_LEVELST.map((q, i) => (
            <g key={q.label}>
              <circle
                cx={toX(q.size)}
                cy={toY(q.quality)}
                r={hovered === i ? 7 : q.sweet ? 6 : 5}
                fill={q.sweet ? '#f59e0b' : '#a1a1aa'}
                stroke={hovered === i ? '#fff' : 'none'}
                strokeWidth={2}
                className="cursor-pointer transition-all"
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={() => handleHover(null)}
              />
              <text
                x={toX(q.size)}
                y={toY(q.quality) - 10}
                textAnchor="middle"
                fill={q.sweet ? '#f59e0b' : '#d4d4d8'}
                fontSize="9"
                fontWeight={q.sweet ? 'bold' : 'normal'}
              >
                {q.label}
              </text>
            </g>
          ))}

          {/* Tooltip */}
          {hovered !== null && (
            <g>
              <rect
                x={Math.min(toX(qUANT_LEVELST[hovered].size) - 70, CHART_W - PAD.right - 145)}
                y={toY(qUANT_LEVELST[hovered].quality) + 12}
                width={140}
                height={36}
                fill="#27272a"
                stroke="#52525b"
                rx={4}
              />
              <text
                x={Math.min(toX(qUANT_LEVELST[hovered].size) - 70, CHART_W - PAD.right - 145) + 8}
                y={toY(qUANT_LEVELST[hovered].quality) + 28}
                fill="#e4e4e7"
                fontSize="10"
              >
                {qUANT_LEVELST[hovered].size} GB · {qUANT_LEVELST[hovered].quality}% quality
              </text>
              <text
                x={Math.min(toX(qUANT_LEVELST[hovered].size) - 70, CHART_W - PAD.right - 145) + 8}
                y={toY(qUANT_LEVELST[hovered].quality) + 42}
                fill="#a1a1aa"
                fontSize="9"
              >
                {qUANT_LEVELST[hovered].bpw} bits per weight
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
              <th className="px-4 py-2 text-left font-mono text-xs text-zinc-500 dark:text-zinc-400">Quant Level</th>
              <th className="px-4 py-2 text-left font-mono text-xs text-zinc-500 dark:text-zinc-400">Size (7B)</th>
              <th className="px-4 py-2 text-left font-mono text-xs text-zinc-500 dark:text-zinc-400">BPW</th>
              <th className="px-4 py-2 text-left font-mono text-xs text-zinc-500 dark:text-zinc-400">Quality</th>
              <th className="px-4 py-2 text-left font-mono text-xs text-zinc-500 dark:text-zinc-400">Use Case</th>
            </tr>
          </thead>
          <tbody>
            {qUANT_LEVELST.map((q) => (
              <tr
                key={q.label}
                className={`border-b border-zinc-200 dark:border-zinc-800 ${q.sweet ? 'bg-amber-50 dark:bg-amber-500/5' : ''}`}
              >
                <td className="px-4 py-2 font-mono text-zinc-900 dark:text-zinc-100">
                  {q.label}
                  {q.sweet && <span className="ml-2 text-xs text-amber-700 dark:text-amber-400">⭐</span>}
                </td>
                <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">{q.size} GB</td>
                <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">{q.bpw}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className={`h-full rounded-full ${q.sweet ? 'bg-amber-500' : 'bg-zinc-500'}`}
                        style={{ width: `${q.quality}%` }}
                      />
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300">{q.quality}%</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-zinc-500 dark:text-zinc-400">{q.useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 p-4">
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          <strong className="text-amber-700 dark:text-amber-400">Recommendation:</strong> For most local use cases,{' '}
          <strong className="text-zinc-900 dark:text-zinc-100">Q4_K_M</strong> is the sweet spot — 93% quality at 29%
          of the original size. Go Q5_K_M if you have extra RAM, or Q6_K/Q8_0 for tasks where
          accuracy is critical (coding, math, medical).
        </p>
      </div>
    </section>
  )
}
