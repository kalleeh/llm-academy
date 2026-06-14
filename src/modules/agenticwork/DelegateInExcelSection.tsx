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
