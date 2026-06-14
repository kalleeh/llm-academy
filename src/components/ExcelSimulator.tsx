import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import type { CellData, ClaudeStep, GridOp, ExcelSimulatorProps } from './excel-types'

// --- ref helpers ---------------------------------------------------------
// Column index → letter(s): 0→A, 25→Z, 26→AA.
function colLabel(index: number): string {
  let s = ''
  let i = index + 1
  while (i > 0) {
    const m = (i - 1) % 26
    s = String.fromCharCode(65 + m) + s
    i = Math.floor((i - 1) / 26)
  }
  return s
}
// "D4" → { col: 3, row: 3 } (render index = Excel row − 1). null if unparseable.
function parseRef(ref: string): { row: number; col: number } | null {
  const m = ref.match(/^([A-Za-z]+)(\d+)$/)
  if (!m) return null
  const letters = m[1].toUpperCase()
  let col = 0
  for (let k = 0; k < letters.length; k++) col = col * 26 + (letters.charCodeAt(k) - 64)
  const rowNum = parseInt(m[2], 10)
  return { col: col - 1, row: rowNum - 1 }
}
const cellKey = (r: number, c: number) => `${r},${c}`

// --- grid fold -----------------------------------------------------------
// Build the combined grid (header row + data rows) and apply the ops of the
// first `revealed` steps. Pure: same inputs → same output (resumable playback).
function foldGrid(
  columns: string[],
  rows: CellData[][],
  session: ClaudeStep[],
  revealed: number,
): { grid: CellData[][]; flagged: Map<number, 'warn' | 'ok'> } {
  let grid: CellData[][] = [
    columns.map((name) => ({ value: name, bold: true, align: 'left' as const })),
    ...rows.map((r) => r.map((c) => ({ ...c }))),
  ]
  const flagged = new Map<number, 'warn' | 'ok'>()
  for (let s = 0; s < revealed; s++) {
    for (const op of session[s]?.ops ?? []) {
      grid = applyOp(grid, op)
      if (op.kind === 'flagRows') op.rows.forEach((r) => flagged.set(r, op.tone ?? 'warn'))
    }
  }
  return { grid, flagged }
}
function applyOp(grid: CellData[][], op: GridOp): CellData[][] {
  if (op.kind === 'addColumn') {
    return grid.map((row, ri) => {
      const inserted: CellData = ri === 0
        ? { value: op.header, bold: true, align: 'left' }
        : { value: '' }
      return [...row.slice(0, op.at), inserted, ...row.slice(op.at)]
    })
  }
  if (op.kind === 'setCells') {
    const next = grid.map((r) => [...r])
    for (const c of op.cells) {
      if (next[c.row]) next[c.row][c.col] = { ...c.data }
    }
    return next
  }
  return grid // flagRows handled by caller
}

// --- citation rendering --------------------------------------------------
const CITATION_RE = /\[([A-Za-z]+\d+)\]/g
// Split a message into text + clickable citation chips.
function renderMessage(message: string, onCite: (ref: string) => void): React.ReactNode[] {
  const out: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  CITATION_RE.lastIndex = 0
  let key = 0
  while ((m = CITATION_RE.exec(message)) !== null) {
    if (m.index > last) out.push(message.slice(last, m.index))
    const ref = m[1].toUpperCase()
    out.push(
      <button
        key={`cite-${key++}`}
        type="button"
        onClick={() => onCite(ref)}
        className="mx-0.5 rounded border border-[#107c41]/40 bg-[#107c41]/10 px-1 font-mono text-[11px] font-semibold text-[#0b5c30] hover:bg-[#107c41]/20"
      >
        {ref}
      </button>,
    )
    last = m.index + m[0].length
  }
  if (last < message.length) out.push(message.slice(last))
  return out
}

const GRID_FONT = "'Calibri', 'Segoe UI', system-ui, sans-serif"

export const ExcelSimulator: React.FC<ExcelSimulatorProps> = ({ title, columns, rows, prompt, session }) => {
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null)
  const [revealed, setRevealed] = useState(0)
  const [typedLen, setTypedLen] = useState(0)
  const [typing, setTyping] = useState(false)
  const [flash, setFlash] = useState<Set<string>>(new Set())
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const panelRef = useRef<HTMLDivElement>(null)

  const { grid, flagged } = useMemo(
    () => foldGrid(columns, rows, session, revealed),
    [columns, rows, session, revealed],
  )
  const colCount = grid[0]?.length ?? columns.length

  // Type out the latest revealed step's message, char by char.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (revealed === 0) { setTypedLen(0); setTyping(false); return }
    const msg = session[revealed - 1]?.message ?? ''
    setTyping(true)
    setTypedLen(0)
    let i = 0
    const id = setInterval(() => {
      i++
      setTypedLen(i)
      if (i >= msg.length) { clearInterval(id); setTyping(false) }
    }, 12)
    return () => clearInterval(id)
  }, [revealed, session])

  // Flash cells written by the latest revealed step.
  useEffect(() => {
    if (revealed === 0) { setFlash(new Set()); return }
    const f = new Set<string>()
    for (const op of session[revealed - 1]?.ops ?? []) {
      if (op.kind === 'setCells') op.cells.forEach((c) => f.add(cellKey(c.row, c.col)))
    }
    setFlash(f)
    const id = setTimeout(() => setFlash(new Set()), 1100)
    return () => clearTimeout(id)
  }, [revealed, session])
  /* eslint-enable react-hooks/set-state-in-effect */

  // Keep the panel scrolled to the newest message.
  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = panelRef.current.scrollHeight
  }, [revealed, typedLen])

  const next = useCallback(() => {
    if (!typing && revealed < session.length) setRevealed((r) => r + 1)
  }, [typing, revealed, session.length])

  const onCite = useCallback((ref: string) => {
    const pos = parseRef(ref)
    if (!pos) return
    setSelected(pos)
    setFlash(new Set([cellKey(pos.row, pos.col)]))
    setTimeout(() => setFlash(new Set()), 1100)
  }, [])

  const hasMore = revealed < session.length
  const selCell = selected && grid[selected.row]?.[selected.col]
  const nameBox = selected ? `${colLabel(selected.col)}${selected.row + 1}` : ''
  const formulaText = selCell ? (selCell.formula ?? selCell.value) : ''

  return (
    <div className="flex h-[30rem] overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700 shadow-sm">
      {/* ===== Excel area ===== */}
      <div className="flex min-w-0 flex-1 flex-col bg-white" style={{ fontFamily: GRID_FONT }}>
        {/* Title bar */}
        <div className="flex shrink-0 items-center justify-between bg-[#217346] px-3 py-1.5">
          <div className="flex items-center gap-2 text-white">
            <span className="grid size-4 place-items-center rounded-sm bg-white/90 text-[10px] font-bold text-[#217346]">X</span>
            <span className="text-xs font-semibold">{title}</span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="flex items-center gap-1 rounded bg-[#d97757] px-2 py-0.5 text-[11px] font-semibold text-white hover:bg-[#c96746]"
          >
            <span aria-hidden>✻</span> Claude
          </button>
        </div>
        {/* Name box + formula bar */}
        <div className="flex shrink-0 items-stretch border-b border-[#d4d4d4] bg-[#f5f5f5] text-[12px] text-zinc-800">
          <div className="flex w-16 items-center justify-center border-r border-[#d4d4d4] px-2 py-1 font-mono">{nameBox}</div>
          <div className="flex w-8 items-center justify-center border-r border-[#d4d4d4] italic text-zinc-500">fx</div>
          <div className="flex-1 truncate px-2 py-1 font-mono">{formulaText}</div>
        </div>
        {/* Grid */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="border-collapse text-[12px] text-zinc-800" style={{ borderSpacing: 0 }}>
            <tbody>
              {/* Column-letter header row */}
              <tr>
                <th className="sticky left-0 top-0 z-10 h-5 w-10 border border-[#d4d4d4] bg-[#f5f5f5]" />
                {Array.from({ length: colCount }, (_, c) => (
                  <th
                    key={c}
                    className={`h-5 min-w-[88px] border border-[#d4d4d4] px-2 text-center font-normal ${
                      selected?.col === c ? 'bg-[#cfe5d6] text-[#0b5c30] font-semibold' : 'bg-[#f5f5f5] text-zinc-600'
                    }`}
                  >
                    {colLabel(c)}
                  </th>
                ))}
              </tr>
              {/* Data rows */}
              {grid.map((row, r) => (
                <tr key={r}>
                  {/* Row-number header */}
                  <th
                    className={`sticky left-0 z-10 h-5 w-10 border border-[#d4d4d4] text-center font-normal ${
                      selected?.row === r ? 'bg-[#cfe5d6] text-[#0b5c30] font-semibold' : 'bg-[#f5f5f5] text-zinc-600'
                    }`}
                  >
                    {r + 1}
                  </th>
                  {row.map((cell, c) => {
                    const isSel = selected?.row === r && selected?.col === c
                    const isFlash = flash.has(cellKey(r, c))
                    const tone = flagged.get(r)
                    const align = cell.align ?? (/^[$]?[\d,.-]+$/.test(cell.value) && cell.value !== '' ? 'right' : 'left')
                    return (
                      <td
                        key={c}
                        onClick={() => setSelected({ row: r, col: c })}
                        className={`relative h-5 cursor-cell border border-[#d4d4d4] px-2 ${
                          align === 'right' ? 'text-right' : 'text-left'
                        } ${cell.bold ? 'font-semibold' : ''} ${
                          tone === 'warn' ? 'bg-[#fdecea]' : tone === 'ok' ? 'bg-[#eaf6ec]' : ''
                        } ${isFlash ? 'bg-[#fff3cd] transition-colors duration-500' : ''}`}
                      >
                        {cell.value}
                        {isSel && (
                          <span className="pointer-events-none absolute inset-0 z-20 border-2 border-[#107c41]">
                            <span className="absolute -bottom-[3px] -right-[3px] size-1.5 bg-[#107c41]" />
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Claude sidebar ===== */}
      {sidebarOpen && (
        <div className="flex w-80 shrink-0 flex-col border-l border-zinc-300 bg-[#faf9f7]">
          <div className="flex shrink-0 items-center gap-1.5 border-b border-zinc-200 px-3 py-2 text-[#b3492f]">
            <span aria-hidden>✻</span>
            <span className="text-xs font-semibold">Claude</span>
            <span className="ml-1 text-[10px] text-zinc-400">for Excel</span>
          </div>
          {/* Messages */}
          <div ref={panelRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {/* The user's request */}
            <div className="ml-6 rounded-lg rounded-tr-sm bg-[#ece9e3] px-3 py-2 text-[13px] leading-relaxed text-zinc-800">
              {prompt}
            </div>
            {session.slice(0, revealed).map((step, i) => {
              const isLast = i === revealed - 1
              const text = isLast ? step.message.slice(0, typedLen) : step.message
              return (
                <div key={i} className="space-y-1.5">
                  <div className="text-[13px] leading-relaxed text-zinc-800">
                    {renderMessage(text, onCite)}
                    {isLast && typing && <span className="ml-0.5 inline-block animate-pulse text-[#b3492f]">▌</span>}
                  </div>
                  {step.overwriteWarning && (!isLast || !typing) && (
                    <div className="rounded border border-amber-300 bg-amber-50 px-2 py-1 text-[11px] text-amber-800">
                      ⚠ {step.overwriteWarning}
                    </div>
                  )}
                </div>
              )
            })}
            {revealed === 0 && (
              <p className="px-1 text-[12px] italic text-zinc-400">Press Run to watch Claude work this task in the sheet.</p>
            )}
          </div>
          {/* Input box (display-only) */}
          <div className="shrink-0 border-t border-zinc-200 px-3 py-2">
            <div className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-2 py-1.5">
              <span className="truncate text-[12px] text-zinc-400">Type / for skills…</span>
              <span className="ml-auto grid size-5 shrink-0 place-items-center rounded bg-[#d97757] text-[11px] text-white">↑</span>
            </div>
          </div>
          {/* Run / Next bar */}
          <div className="flex shrink-0 items-center gap-2 border-t border-zinc-200 bg-[#f3f1ee] px-3 py-2">
            {hasMore ? (
              <>
                <button
                  type="button"
                  onClick={next}
                  disabled={typing}
                  className="rounded bg-[#d97757] px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-[#c96746] disabled:opacity-50"
                >
                  {revealed === 0 ? '▶ Run' : 'Next'}
                </button>
                <span className="text-[11px] text-zinc-500">Step {revealed + 1} of {session.length}</span>
              </>
            ) : (
              <span className="text-[11px] text-zinc-500">✓ Task complete</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
