import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { useTranslation } from '../../i18n'
import { CourseBridge } from '../../components/CourseBridge'

// Terminal content stays English by convention (matches PipelineSection).
const TERMINAL_STEPS: TerminalStep[] = [
  {
    command: 'claude "users report the CSV export drops rows with commas in the name field — find and fix it"',
    output:
      'I\'ll investigate the CSV export. Searching for the export code...\n\n→ Grep "csv" src/ — 3 matches\n→ Read src/export/csv_writer.py\n\nFound it: line 41 joins fields with "," but never quotes values.\nA name like "Smith, Jr." splits into two columns, corrupting the row.\n\nPlan:\n  1. Switch to Python\'s csv module (handles quoting)\n  2. Add a regression test with a comma-containing name\n  3. Run the test suite',
    delay: 900,
  },
  {
    command: '[agent] Edit src/export/csv_writer.py',
    output:
      '- out.write(",".join(str(v) for v in row) + "\\n")\n+ writer = csv.writer(out, quoting=csv.QUOTE_MINIMAL)\n+ writer.writerow(row)\n\n✓ 2 edits applied',
    delay: 500,
  },
  {
    command: '[agent] Write tests/test_csv_export.py',
    output:
      'def test_comma_in_field_is_quoted():\n    rows = [["Smith, Jr.", "smith@example.com"]]\n    result = export_csv(rows)\n    assert \'"Smith, Jr."\' in result\n    assert len(parse_csv(result)) == 1\n\n✓ test written',
    delay: 500,
  },
  {
    command: '[agent] Bash: pytest tests/ -q',
    output:
      '........................\n24 passed in 1.8s\n\nAll tests pass, including the new regression test.\n\nDone. Root cause: naive string join without CSV quoting.\nFix: csv.writer with QUOTE_MINIMAL. The new test locks the behavior in.',
    delay: 700,
  },
]

export const AgenticLoopSection: React.FC = () => {
  const c = useTranslation().modules.toolslandscape.agenticLoop

  return (
    <section aria-labelledby="agentic-loop">
      <h2 id="agentic-loop" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <p className="mb-4 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.stepNote}</p>
      <SimulatedTerminal steps={TERMINAL_STEPS} title="claude-code — fix CSV export bug" />
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
      <CourseBridge target="agents" blurb={c.bridgeBlurb} />
    </section>
  )
}
