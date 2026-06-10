import { AgentSession } from '../../components/AgentSession'
import type { TranscriptTurn } from '../../components/AgentTranscript'
import { useTranslation } from '../../i18n'
import { CourseBridge } from '../../components/CourseBridge'

// Transcript content stays English by convention (matches PipelineSection).
// Same task in each CLI: fix a CSV export that drops rows on comma-in-field.

const CLAUDE_TURNS: TranscriptTurn[] = [
  { lines: [
    { kind: 'user', text: 'the CSV export drops rows when a name contains a comma — find and fix it' },
  ], delay: 700 },
  { lines: [
    { kind: 'tool', text: 'Grep(pattern: "csv", path: "src/")' },
    { kind: 'result', text: '3 matches in src/export/csv_writer.py' },
    { kind: 'tool', text: 'Read(src/export/csv_writer.py)' },
    { kind: 'result', text: 'Read 52 lines' },
    { kind: 'assistant', text: 'Found it — line 41 joins fields with "," and never quotes them, so "Smith, Jr." splits into two columns.' },
  ], delay: 1000 },
  { lines: [
    { kind: 'tool', text: 'Update(src/export/csv_writer.py)' },
    { kind: 'result', text: 'Updated with 2 additions and 1 removal' },
    { kind: 'diff-del', text: '   41 -  out.write(",".join(str(v) for v in row) + "\\n")' },
    { kind: 'diff-add', text: '   41 +  writer = csv.writer(out, quoting=csv.QUOTE_MINIMAL)' },
    { kind: 'diff-add', text: '   42 +  writer.writerow(row)' },
  ], delay: 800 },
  { lines: [
    { kind: 'tool', text: 'Write(tests/test_csv_export.py)' },
    { kind: 'result', text: 'Wrote 9 lines' },
    { kind: 'tool', text: 'Bash(pytest -q)' },
    { kind: 'result', text: '24 passed in 1.83s' },
    { kind: 'assistant', text: 'Fixed. Root cause was a naive string join; switched to csv.writer with QUOTE_MINIMAL and added a regression test for comma-containing names.' },
  ], delay: 1100 },
]

const KIRO_TURNS: TranscriptTurn[] = [
  { lines: [
    { kind: 'user', text: 'the CSV export drops rows when a name contains a comma — find and fix it' },
  ], delay: 700 },
  { lines: [
    { kind: 'assistant', text: 'Kiro works spec-first. Generating a spec for this change.' },
    { kind: 'ok', text: 'Created .kiro/specs/csv-quoting/requirements.md' },
    { kind: 'ok', text: 'Created .kiro/specs/csv-quoting/design.md' },
    { kind: 'ok', text: 'Created .kiro/specs/csv-quoting/tasks.md' },
    { kind: 'result', text: 'Task 1 — Quote fields via csv.writer (QUOTE_MINIMAL)' },
    { kind: 'result', text: 'Task 2 — Add regression test for comma-in-field' },
    { kind: 'result', text: 'Task 3 — Run the test suite' },
  ], delay: 1100 },
  { lines: [
    { kind: 'tool', text: 'Execute task 1/3 — Quote fields' },
    { kind: 'result', text: 'Updated src/export/csv_writer.py (csv.writer, QUOTE_MINIMAL)' },
    { kind: 'tool', text: 'Execute task 2/3 — Regression test' },
    { kind: 'result', text: 'Created tests/test_csv_export.py' },
  ], delay: 900 },
  { lines: [
    { kind: 'tool', text: 'Execute task 3/3 — Run suite' },
    { kind: 'result', text: 'pytest: 24 passed' },
    { kind: 'assistant', text: 'All tasks complete. The spec stays in .kiro/specs/csv-quoting/ as living documentation of the change — requirements, design, and tasks alongside the code.' },
  ], delay: 1000 },
]

export const AgenticLoopSection: React.FC = () => {
  const c = useTranslation().modules.toolslandscape.agenticLoop

  return (
    <section aria-labelledby="agentic-loop">
      <h2 id="agentic-loop" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <p className="mb-4 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.stepNote}</p>
      <AgentSession
        toggleLabel={c.cliToggleLabel}
        variants={{ 'claude-code': { turns: CLAUDE_TURNS }, kiro: { turns: KIRO_TURNS } }}
      />
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
      <CourseBridge target="agents" blurb={c.bridgeBlurb} />
    </section>
  )
}
