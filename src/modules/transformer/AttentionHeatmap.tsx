import { useState, useCallback } from 'react'
import { WORDS } from './attentionData'

interface AttentionHeatmapProps {
  weights: number[][]
  compact?: boolean
}

function weightToColor(w: number): string {
  const intensity = Math.round(w * 255)
  return `rgb(${intensity}, ${Math.round(intensity * 0.6)}, ${Math.round(255 - intensity * 0.5)})`
}

export const AttentionHeatmap: React.FC<AttentionHeatmapProps> = ({ weights, compact }) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [hoveredCol, setHoveredCol] = useState<number | null>(null)

  const handleCellEnter = useCallback((r: number, c: number) => {
    setHoveredRow(r)
    setHoveredCol(c)
  }, [])

  const handleLeave = useCallback(() => {
    setHoveredRow(null)
    setHoveredCol(null)
  }, [])

  const cellSize = compact ? 28 : 36
  const fontSize = compact ? 'text-[9px]' : 'text-[10px]'
  const labelW = compact ? 52 : 64

  return (
    <div className="overflow-x-auto" onMouseLeave={handleLeave}>
      <div className="inline-block">
        {/* Column headers */}
        <div className="flex" style={{ paddingLeft: `${labelW}px` }}>
          {WORDS.map((w, i) => (
            <div
              key={i}
              className={`${fontSize} text-center transition-colors ${hoveredCol === i ? 'text-amber-700 dark:text-amber-300 font-bold' : 'text-zinc-500 dark:text-zinc-400'}`}
              style={{ width: `${cellSize}px` }}
            >
              <span className="-rotate-45 inline-block origin-center">{w}</span>
            </div>
          ))}
        </div>
        {/* Grid rows */}
        {WORDS.map((word, r) => (
          <div key={r} className="flex items-center">
            <div
              className={`${fontSize} shrink-0 text-right pr-2 transition-colors ${hoveredRow === r ? 'text-amber-700 dark:text-amber-300 font-bold' : 'text-zinc-500 dark:text-zinc-400'}`}
              style={{ width: `${labelW}px` }}
            >
              {word}
            </div>
            {weights[r].map((w, c) => (
              <div
                key={c}
                className="border border-zinc-200 dark:border-zinc-800 transition-all cursor-crosshair"
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: weightToColor(w),
                  opacity: hoveredRow !== null ? (r === hoveredRow ? 1 : 0.3) : 1,
                }}
                onMouseEnter={() => handleCellEnter(r, c)}
                role="gridcell"
                aria-label={`${WORDS[r]} → ${WORDS[c]}: ${(w * 100).toFixed(0)}%`}
              >
                {!compact && (
                  <span className="flex h-full items-center justify-center text-[8px] text-white/70">
                    {(w * 100).toFixed(0)}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {hoveredRow !== null && hoveredCol !== null && (
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="text-amber-700 dark:text-amber-300">{WORDS[hoveredRow]}</span>
          {' → '}
          <span className="text-amber-700 dark:text-amber-300">{WORDS[hoveredCol]}</span>
          {': '}
          <span className="font-mono text-zinc-800 dark:text-zinc-200">
            {(weights[hoveredRow][hoveredCol] * 100).toFixed(1)}%
          </span>
          {' attention'}
        </p>
      )}
    </div>
  )
}
