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
