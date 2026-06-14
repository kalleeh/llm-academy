# Excel Simulator ("Claude in Excel") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable `ExcelSimulator` React component that renders authentic Microsoft Excel chrome with an interactive (read-only, selectable) grid and an authored "Claude for Excel" replay in a right-hand sidebar, then wire one business-track lesson (expense-vs-travel-policy reconciliation) into the Agentic Work module, fully in EN/SV/KO.

**Architecture:** A self-contained presentational emulator following the shipped pattern of `SimulatedTerminal`/`WorkAppWindow` (authored content, step-forward playback, no backend, fixed height, scrolls in-container, light body in both themes). The grid is a single combined `CellData[][]` (header row + data rows) folded with an authored `GridOp[]` reducer per revealed step. The lesson section assembles the component's props from translated prose (`useTranslation()`) zipped with non-translatable structural data (cell values, op shapes, citation refs) defined as English consts in the section file.

**Tech Stack:** React 19, TypeScript strict, Vite 8, Tailwind v4. Authentic Excel palette via arbitrary Tailwind hex values (`bg-[#217346]`, etc.) since the brand palette is outside the `zinc` system. Calibri-family font stack scoped to the grid. No new dependencies. **No test runner exists** in this repo — verification is `npm run build` (tsc strict) + `npm run lint` + headless-browser checks (memory `browser-verification-setup`). Deploy + verifier-artifact cleanup per memory `deploy-llm-academy`.

**Reference files to imitate:**
- `src/components/SimulatedTerminal.tsx` — fixed height, in-container scroll, Run/Next bottom bar that never causes layout shift, char-typing animation.
- `src/components/WorkAppWindow.tsx` — light-body-in-both-themes chrome, revealed-step model, progress affordances.
- `src/modules/agenticcoding/RealSessionSection.tsx` — how authored session data (English consts) coexists with `useTranslation()` prose in a section.
- `src/modules/agenticwork/DelegateSuperviseSection.tsx` — the sibling section the new one sits beside.

---

## Task 1: Authored data types

**Files:**
- Create: `src/components/excel-types.ts`

- [ ] **Step 1: Write the types file.** Exact content:

```ts
// Authored-content types for the ExcelSimulator. No runtime logic lives here.

/** One spreadsheet cell. `value` shows in the cell; `formula` (if present) shows
 *  in the formula bar when the cell is selected. The grid never computes — both
 *  are authored. */
export interface CellData {
  value: string
  formula?: string
  bold?: boolean
  align?: 'left' | 'right'
}

/** One authored grid mutation, applied when its ClaudeStep is revealed.
 *  `row`/`col` are RENDER indices into the combined grid where render row 0 is the
 *  header row (Excel row 1), so render index = Excel row number − 1. */
export type GridOp =
  | { kind: 'addColumn'; at: number; header: string }
  | { kind: 'setCells'; cells: { row: number; col: number; data: CellData }[] }
  | { kind: 'flagRows'; rows: number[]; tone?: 'warn' | 'ok' }

/** One step of the Claude replay. `message` may embed cell-reference tokens like
 *  `[D4]`; the component auto-renders those as clickable citation chips that select
 *  and flash the referenced cell. `overwriteWarning`, if set, shows an amber note. */
export interface ClaudeStep {
  message: string
  ops?: GridOp[]
  overwriteWarning?: string
}

export interface ExcelSimulatorProps {
  /** Workbook name shown in the title bar, e.g. "expenses-march.xlsx". */
  title: string
  /** Human header names rendered as the bold first grid row (Excel row 1).
   *  Column letters A, B, C… are generated automatically as chrome. */
  columns: string[]
  /** Data rows only (no header row). rows[r][c] is a data cell. */
  rows: CellData[][]
  /** The request shown pre-filled (display-only) in Claude's input box. */
  prompt: string
  /** The authored replay. */
  session: ClaudeStep[]
}
```

- [ ] **Step 2: Verify it compiles.**

Run: `cd ~/projects/llm-academy && npm run build`
Expected: PASS (types only; no consumers yet).

- [ ] **Step 3: Commit.**

```bash
cd ~/projects/llm-academy
git add src/components/excel-types.ts
git commit -m "feat(excel-sim): authored-content types

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

## Task 2: The ExcelSimulator component

**Files:**
- Create: `src/components/ExcelSimulator.tsx`

This is the whole component: Excel chrome (title bar with Claude pill, Name Box + formula bar, A/B/C + 1/2/3 headers, grid), read-only cell selection, the right-hand Claude sidebar, the Run/Next replay with per-character message typing, cell-flash on writes, row flagging, clickable cell citations, and the overwrite-warning note. It is verified by build + lint here; behavioral browser verification happens in Task 4 once a render site exists.

- [ ] **Step 1: Write the component.** Exact content:

```tsx
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
                    const align = cell.align ?? (/^[$]?[\d,.\-]+$/.test(cell.value) && cell.value !== '' ? 'right' : 'left')
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
```

- [ ] **Step 2: Gate.**

Run: `cd ~/projects/llm-academy && npm run build && npm run lint`
Expected: both PASS, no type or lint errors. If lint flags the `CITATION_RE` global regex `lastIndex` reset or the `align` regex, leave the logic but satisfy the rule (the reset is intentional — keep it). If TypeScript complains `ExcelSimulatorProps` import is unused, it IS used (the `React.FC<ExcelSimulatorProps>` annotation) — do not remove it.

- [ ] **Step 3: Commit.**

```bash
cd ~/projects/llm-academy
git add src/components/ExcelSimulator.tsx
git commit -m "feat(excel-sim): Excel chrome, selectable grid, Claude replay sidebar

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

## Task 3: English content + downstream renumbering

**Files:**
- Modify: `src/i18n/en.ts`

The lesson lives in a new `modules.agenticwork.delegateInExcel` subtree, placed after `delegateSupervise` and before `guardrails`. The existing sections `guardrails` (3), `taskToTool` (4), `briefLibrary` (5) shift to 4, 5, 6.

- [ ] **Step 1: Add the `delegateInExcel` subtree.** Inside `modules.agenticwork`, insert AFTER the `delegateSupervise` entry and BEFORE the `guardrails` entry. Exact content:

```ts
    // 3. See It In Excel — Claude working a reconciliation in a real grid
    delegateInExcel: {
      title: '3. See It In Excel',
      intro:
        'You just stepped through a delegation in the abstract. Here is the same kind of task in the tool millions of people already live in — a spreadsheet. Watch Claude for Excel reconcile an expense sheet against a travel policy: it works in the grid, flags what breaks the rules, and cites the exact cells. Click any cell to inspect it; press Run to watch Claude work.',
      workbookTitle: 'expenses-march.xlsx',
      columns: ['Date', 'Employee', 'Category', 'Amount'],
      statusHeader: 'Status',
      statusOk: 'OK',
      statusOver: 'OVER',
      flaggedLabel: 'Flagged lines',
      prompt:
        'Reconcile this expense sheet against our travel policy: meals up to $75, hotels up to $300. Standardize the Amount column to currency, add a Status column marking each line OK or OVER, flag the lines that break policy, and give me the count.',
      overwriteWarning: 'Claude will overwrite the existing values in D2:D12.',
      messages: [
        'I\'ll reconcile all 11 lines against the policy — meals up to $75, hotels up to $300. First, adding a [E1] Status column.',
        'Standardizing the Amount column to currency format. This rewrites the values in column D.',
        'Marking the lines that comply with policy as OK.',
        'Five lines exceed the limits — see [D4], [D6], [D8], [D11], and [D12]. Marking them OVER and flagging the rows.',
        'Adding the count of flagged lines in [E13] with a formula, so it stays correct if the data changes.',
      ],
      takeaway:
        'Notice what stayed yours: the policy, the decision to send, the final review. Claude did the reading and the flagging across every row and showed its work cell by cell — you supervised. That is delegation, in the tool you already use.',
      selfExplainPrompt:
        'Claude flagged five lines and cited the exact cells (D4, D6, D8, D11, D12). Why does citing the specific cells matter more than just reporting "5 lines are over policy"?',
      selfExplainAnswer:
        'Because a citation turns a claim you have to trust into one you can check in seconds. "5 lines are over" asks you to take Claude\'s word; "see D4, D6, D8, D11, D12" lets you click straight to each one, confirm the amount against the rule, and catch a miscall before it reaches finance. Traceability is what makes reviewing the output fast enough that delegation actually saves time — without it you would re-check all 240 lines yourself, which is the work you were trying to delegate.',
    },
```

- [ ] **Step 2: Renumber the three downstream section titles.** In `src/i18n/en.ts`:
  - `modules.agenticwork.guardrails.title`: `'3. Set Guardrails'` → `'4. Set Guardrails'`
  - `modules.agenticwork.taskToTool.title`: `'4. When a Task Wants to Be a Tool'` → `'5. When a Task Wants to Be a Tool'`
  - `modules.agenticwork.briefLibrary.title`: `'5. A Brief You Can Steal'` → `'6. A Brief You Can Steal'`

- [ ] **Step 3: Verify it compiles.**

Run: `cd ~/projects/llm-academy && npm run build`
Expected: PASS (new keys widen the `Translation` type for the section component in Task 4).

- [ ] **Step 4: Commit.**

```bash
cd ~/projects/llm-academy
git add src/i18n/en.ts
git commit -m "feat(excel-sim): EN content for the See-It-In-Excel lesson; renumber downstream

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

## Task 4: Section component + module wiring + browser verification

**Files:**
- Create: `src/modules/agenticwork/DelegateInExcelSection.tsx`
- Modify: `src/modules/AgenticWorkModule.tsx`

The section assembles `ExcelSimulatorProps` from translated prose (`useTranslation()`) plus non-translatable structural data (cell values, op shapes) defined as English consts. Render-row indices: 0 = header, 1..11 = the 11 data rows, 12 = a blank totals row (Excel row 13). Violation rows (render indices) are 3, 5, 7, 10, 11; compliant data rows are 1, 2, 4, 6, 8, 9. Status column is index 4 (E) after `addColumn`.

- [ ] **Step 1: Create the section component.** Exact content:

```tsx
import { ExcelSimulator } from '../../components/ExcelSimulator'
import type { CellData, ClaudeStep } from '../../components/excel-types'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Non-translatable authored data (numbers, names, dates, op shapes). Prose comes
// from useTranslation(). Render row 0 is the header; rows below are 1-indexed in
// Excel terms (render index = Excel row − 1).
const RAW_ROWS: CellData[][] = [
  [{ value: '2026-03-02' }, { value: 'A. Berg' }, { value: 'Meals' }, { value: '42.00' }],
  [{ value: '2026-03-03' }, { value: 'A. Berg' }, { value: 'Hotel' }, { value: '280.00' }],
  [{ value: '2026-03-05' }, { value: 'C. Diaz' }, { value: 'Meals' }, { value: '91.00' }],
  [{ value: '2026-03-06' }, { value: 'C. Diaz' }, { value: 'Taxi' }, { value: '28.00' }],
  [{ value: '2026-03-08' }, { value: 'E. Frank' }, { value: 'Hotel' }, { value: '345.00' }],
  [{ value: '2026-03-09' }, { value: 'E. Frank' }, { value: 'Meals' }, { value: '68.00' }],
  [{ value: '2026-03-11' }, { value: 'G. Huang' }, { value: 'Meals' }, { value: '102.00' }],
  [{ value: '2026-03-12' }, { value: 'G. Huang' }, { value: 'Hotel' }, { value: '295.00' }],
  [{ value: '2026-03-14' }, { value: 'I. Johansson' }, { value: 'Taxi' }, { value: '35.00' }],
  [{ value: '2026-03-15' }, { value: 'I. Johansson' }, { value: 'Meals' }, { value: '80.00' }],
  [{ value: '2026-03-16' }, { value: 'K. Lee' }, { value: 'Hotel' }, { value: '312.00' }],
  [{ value: '' }, { value: '' }, { value: '' }, { value: '' }], // totals row (Excel row 13)
]

// Currency-formatted amounts written by the "standardize" step (render row → text).
const FORMATTED_AMOUNTS: Record<number, string> = {
  1: '$42.00', 2: '$280.00', 3: '$91.00', 4: '$28.00', 5: '$345.00', 6: '$68.00',
  7: '$102.00', 8: '$295.00', 9: '$35.00', 10: '$80.00', 11: '$312.00',
}
const VIOLATION_ROWS = [3, 5, 7, 10, 11]
const COMPLIANT_ROWS = [1, 2, 4, 6, 8, 9]
const STATUS_COL = 4

export const DelegateInExcelSection: React.FC = () => {
  const c = useTranslation().modules.agenticwork.delegateInExcel

  const session: ClaudeStep[] = [
    // 1. Add the Status column.
    {
      message: c.messages[0],
      ops: [{ kind: 'addColumn', at: STATUS_COL, header: c.statusHeader }],
    },
    // 2. Standardize the Amount column → genuine overwrite of D2:D12.
    {
      message: c.messages[1],
      overwriteWarning: c.overwriteWarning,
      ops: [{
        kind: 'setCells',
        cells: Object.entries(FORMATTED_AMOUNTS).map(([row, value]) => ({
          row: Number(row), col: 3, data: { value, align: 'right' },
        })),
      }],
    },
    // 3. Mark compliant rows OK.
    {
      message: c.messages[2],
      ops: [{
        kind: 'setCells',
        cells: COMPLIANT_ROWS.map((row) => ({ row, col: STATUS_COL, data: { value: c.statusOk } })),
      }],
    },
    // 4. Mark violations OVER and flag the rows.
    {
      message: c.messages[3],
      ops: [
        {
          kind: 'setCells',
          cells: VIOLATION_ROWS.map((row) => ({ row, col: STATUS_COL, data: { value: c.statusOver } })),
        },
        { kind: 'flagRows', rows: VIOLATION_ROWS, tone: 'warn' },
      ],
    },
    // 5. Write the COUNTIF total into the totals row (render row 12 = Excel row 13).
    {
      message: c.messages[4],
      ops: [{
        kind: 'setCells',
        cells: [
          { row: 12, col: 2, data: { value: c.flaggedLabel, bold: true } },
          { row: 12, col: STATUS_COL, data: { value: '5', formula: '=COUNTIF(E2:E12,"OVER")', align: 'right' } },
        ],
      }],
    },
  ]

  return (
    <section aria-labelledby="delegate-in-excel">
      <h2 id="delegate-in-excel" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <ExcelSimulator
        title={c.workbookTitle}
        columns={[...c.columns]}
        rows={RAW_ROWS}
        prompt={c.prompt}
        session={session}
      />
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire it into the module.** In `src/modules/AgenticWorkModule.tsx`, add the import after the `DelegateSuperviseSection` import:

```tsx
import { DelegateInExcelSection } from './agenticwork/DelegateInExcelSection'
```

Then insert `<DelegateInExcelSection />` between `<DelegateSuperviseSection />` and `<GuardrailsSection />` so the render body reads:

```tsx
      <WhatIsAgenticWorkSection />
      <DelegateSuperviseSection />
      <DelegateInExcelSection />
      <GuardrailsSection />
      <TaskToToolSection />
      <BriefLibrarySection />
```

- [ ] **Step 3: Gate.**

Run: `cd ~/projects/llm-academy && npm run build && npm run lint`
Expected: both PASS. If TS complains `c.columns` is readonly when spread into `columns={[...c.columns]}`, the spread already copies it — keep the spread.

- [ ] **Step 4: Browser-verify (per memory `browser-verification-setup`).** Reuse `/tmp/pwtest`; launch the cached chromium shell via `executablePath`; run the dev server on a spare port (e.g. `npm run dev -- --port 5193`). Navigate to `#/use/business/agentic-work` and assert:
  1. The section heading "See It In Excel" renders, and the Excel chrome shows the green title bar with `expenses-march.xlsx` and a terracotta "Claude" pill.
  2. Clicking the cell showing `91.00` selects it: the Name Box shows `D4` and the formula bar shows `91.00`; the column-D header letter and row-4 number highlight.
  3. Press "▶ Run" then "Next" through all 5 steps. After step 1 a `Status` column header appears (column E). After step 2 the Amount cells read `$42.00` etc. After step 4, five rows are shaded and their Status reads `OVER`. After step 5, the totals row shows `5`; clicking that cell shows `=COUNTIF(E2:E12,"OVER")` in the formula bar.
  4. In step 4's Claude message, click the `D6` citation chip — assert the grid selection moves to cell `D6` (Name Box reads `D6`).
  5. Confirm section numbering on the page now reads 1,2,3,4,5,6 with "See It In Excel" as 3, "Set Guardrails" as 4, "When a Task Wants to Be a Tool" as 5, "A Brief You Can Steal" as 6.

Capture actual on-page text for any failed assertion. Clean up: `pkill -f "vite.*5193"`; if `npm run dev` left `package.json`/`package-lock.json` dirty or created `test-results/`, run `git checkout package.json package-lock.json 2>/dev/null; rm -rf test-results`.

- [ ] **Step 5: Commit.**

```bash
cd ~/projects/llm-academy
git add src/modules/agenticwork/DelegateInExcelSection.tsx src/modules/AgenticWorkModule.tsx
git commit -m "feat(excel-sim): wire See-It-In-Excel lesson into Agentic Work

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

## Task 5: Swedish + Korean translations

**Files:**
- Modify: `src/i18n/sv.ts`
- Modify: `src/i18n/ko.ts`

- [ ] **Step 1: Mirror the `delegateInExcel` subtree in `sv.ts`.** Insert inside `modules.agenticwork` AFTER `delegateSupervise` and BEFORE `guardrails`, translating every prose field to Swedish (du-form): `title` (keep the "3. " number prefix), `intro`, `columns` (4 header words — translate: Date→Datum, Employee→Anställd, Category→Kategori, Amount→Belopp), `statusHeader` (Status), `statusOk`, `statusOver`, `flaggedLabel`, `prompt`, `overwriteWarning`, all 5 `messages`, `takeaway`, `selfExplainPrompt`, `selfExplainAnswer`. **Critical:** preserve the bracket citation tokens `[E1] [D4] [D6] [D8] [D11] [D12] [E13]` verbatim inside the translated `messages` — they are parsed by the component. `workbookTitle` stays `expenses-march.xlsx` (a filename). The `statusOk`/`statusOver` values may stay "OK"/"OVER" or be localized — keep them short; if localized, the component renders them as-is (no logic depends on the text). Array lengths: `columns`=4, `messages`=5.

- [ ] **Step 2: Renumber the three downstream titles in `sv.ts`** to 4/5/6 (Swedish wording, leading number only): `guardrails.title` → "4. …", `taskToTool.title` → "5. …", `briefLibrary.title` → "6. …".

- [ ] **Step 3: Mirror the subtree in `ko.ts`** identically (Korean, 합니다체), same positions, same field coverage, same bracket-token preservation, same array lengths. Column headers: Date→날짜, Employee→직원, Category→항목, Amount→금액 (or natural equivalents). Renumber the same three downstream titles to 4/5/6.

- [ ] **Step 4: Gate.**

Run: `cd ~/projects/llm-academy && npm run build && npm run lint`
Expected: both PASS.

- [ ] **Step 5: Browser-verify SV + KO (per memory `browser-verification-setup`).** Switch language to Swedish, load `#/use/business/agentic-work`, confirm the "See It In Excel" section (Swedish title with "3."), the Claude messages, takeaway, and self-explain render in Swedish with no English leakage, and that running the replay still flags 5 rows and the citation chips still work (the `[D6]` token survived translation). Repeat for Korean. Clean up the dev server and any verifier artifacts as in Task 4.

- [ ] **Step 6: Commit.**

```bash
cd ~/projects/llm-academy
git add src/i18n/sv.ts src/i18n/ko.ts
git commit -m "i18n: Swedish + Korean for the See-It-In-Excel lesson

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

## Task 6: Final regression, deploy, cleanup

**Files:** none (verification + deploy)

- [ ] **Step 1: Full gate.**

Run: `cd ~/projects/llm-academy && npm run build && npm run lint`
Expected: PASS, clean.

- [ ] **Step 2: Fidelity + cross-language smoke test.** Per memory `browser-verification-setup`, on `#/use/business/agentic-work` in EN/SV/KO: visually confirm the Excel chrome reads as Microsoft Excel (green `#217346` title bar, grey gridlines/headers, green selection rectangle with fill-handle nub, A/B/C + 1/2/3 headers, Calibri-family grid text, numbers right-aligned, bold header row) — **no terminal tropes** (no traffic-light dots, no monospace grid, no `$` prompt). Confirm the full replay, cell selection, formula bar, citations, and overwrite warning all work, and section numbering reads 1–6.

- [ ] **Step 3: Verifier-artifact cleanup.** Per memory `deploy-llm-academy`: confirm no stray `@playwright/test` entered `package.json`/`package-lock.json` and remove any `test-results/` before deploy. `git status` should show only intended files. (The untracked `.serena/` directory predates this work — leave it.)

- [ ] **Step 4: Deploy.** Per memory `deploy-llm-academy`:

```bash
cd ~/projects/llm-academy
npm run build
aws s3 sync dist/ s3://llm-academy-gurum-se/ --delete
aws cloudfront create-invalidation --distribution-id E2TWEQEC71DPUY --paths '/*'
```
Then verify the live `assets/index-*.js` hash matches the local `dist/assets/index-*.js`, and the invalidation reaches `Completed`.

- [ ] **Step 5: Final commit (only if cleanup changed tracked files).**

```bash
cd ~/projects/llm-academy
git add -A
git commit -m "chore(excel-sim): pre-deploy cleanup"
```

---

## Self-Review

**Spec coverage:**
- Authentic Excel chrome (green title bar, Name Box, formula bar, A/B/C + 1/2/3 headers, green selection + fill handle, gridlines, Calibri font) → Task 2 component + Task 6 fidelity check. ✓
- Interactive read-only selection (Name Box, formula bar, header highlight) → Task 2; verified Task 4 step 4.2. ✓
- Authored Claude replay (right sidebar, pre-filled prompt, Run/Next, streamed messages, grid ops in sync, cell flash, row flagging) → Task 2 + Task 4 data. ✓
- Clickable cell citations → `renderMessage`/`onCite` in Task 2; verified Task 4 step 4.4. ✓
- Warn-before-overwrite → `overwriteWarning` on session step 2 (the genuine D2:D12 overwrite); verified implicitly Task 4 step 3. ✓
- Honest static behavior (display-only input, no engine) → input box is non-interactive markup in Task 2; no compute anywhere. ✓
- Light chrome in both themes → Task 2 uses explicit light hex, only the outer container has `dark:` border. ✓
- I18n EN/SV/KO with data-vs-prose split → Tasks 3, 4 (assembly), 5. ✓
- First home = Agentic Work delegation area → new section 3, placed after `delegateSupervise`. ✓

**Placeholder scan:** All component code, the authored dataset, and the full EN content are concrete. SV/KO follow the established "translate this exact EN, preserve bracket tokens, keep array lengths" pattern proven in the prior plan. No TBDs.

**Type consistency:** `ExcelSimulatorProps`/`CellData`/`GridOp`/`ClaudeStep` defined in Task 1 are used unchanged in Tasks 2 and 4. `STATUS_COL = 4`, violation rows `[3,5,7,10,11]`, and citation refs `D4/D6/D8/D11/D12` are mutually consistent (render index = Excel row − 1; col D = index 3, col E = index 4). The COUNTIF lands in render row 12 (Excel row 13), which exists because `RAW_ROWS` includes the trailing totals row. `addColumn at: 4` shifts nothing left of it, so the Amount column stays D (index 3) for the overwrite and citations. `foldGrid` reads `session[s].ops`; the section provides `ops` on every step. Citation tokens in `messages` match the refs the grid can resolve.

**Known minor:** the `align` auto-detect regex in Task 2 right-aligns numeric-looking values (incl. `$42.00`); header names and text stay left. This is cosmetic and matches Excel defaults; no functional dependency.
