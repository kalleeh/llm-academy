# Realistic Claude Code / Kiro CLI Terminal Sessions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Replace the two generic coding-assistant terminal simulations with authentic, side-by-side **Claude Code ⇄ Kiro CLI** sessions the learner can toggle between. Each terminal shows the *same task* rendered the way each CLI actually presents it: Claude Code's direct tool-call loop (`>` prompt, `⏺` tool calls, `⎿` results) vs Kiro's spec-driven flow (`.kiro/specs/<feature>/{requirements,design,tasks}.md` then task execution).

**Architecture:** Build TWO new components, leaving the shared `SimulatedTerminal` (19 other callers) completely untouched:
1. `AgentTranscript` — renders a single CLI transcript with per-variant chrome (header, prompt glyph, line-kind styling) and the same step-through + `onStepExecuted` animation model as `SimulatedTerminal`.
2. `AgentSession` — a toggle wrapper: a Claude Code / Kiro segmented control on top, the active variant's `AgentTranscript` below, and (optionally) a `FileExplorer` snapshot panel beside it (so the Agentic Coding section keeps its live file tree, now per-variant).

Then rewire the two sections to use `AgentSession`. Transcript/file content stays English (existing convention); the only translated string is the toggle's a11y label.

**Tech Stack:** React 19, TS strict, Vite 8, Tailwind v4 (dark: pairing). Gates: `npm run build && npm run lint` + headless browser (memory `browser-verification-setup`); deploy + artifact cleanup per memory `deploy-llm-academy`.

**Affected sections:** `src/modules/toolslandscape/AgenticLoopSection.tsx` (terminal only), `src/modules/agenticcoding/RealSessionSection.tsx` (terminal + file tree).

---

## Component design

```ts
// src/components/AgentTranscript.tsx
export type CliVariant = 'claude-code' | 'kiro'
export type LineKind = 'user' | 'assistant' | 'tool' | 'result' | 'ok' | 'diff-add' | 'diff-del'
export interface TranscriptLine { kind: LineKind; text: string }
export interface TranscriptTurn { lines: TranscriptLine[]; delay?: number }
```

Per-variant chrome in `AgentTranscript`:
- **claude-code:** header label `✻ Claude Code` (amber); user prompt glyph `>` (zinc-500); `tool` lines prefixed `⏺ ` (emerald-400); `result` lines prefixed `⎿ ` indented (zinc-500); `assistant` plain zinc-300; `ok` (unused) same as result; `diff-add` green, `diff-del` red.
- **kiro:** header label `◆ Kiro` (violet/purple); user prompt glyph `▶` (zinc-500); `tool` lines (= task/step markers) prefixed `▶ ` (violet-400); `result` `⎿ ` indented zinc-500; `ok` lines prefixed `✓ ` (emerald-400) for spec-file creation; `assistant` plain zinc-300; diffs same.

Animation: identical model to `SimulatedTerminal` — a turn is one "step"; a Run/Next button reveals the next turn (its last line types out char-by-char, prior lines instant), and `onStepExecuted(turnIndex)` fires when a turn finishes (drives snapshots). Keep the macOS dot chrome + a bottom bar with the Run/Next button and "Turn N of M".

`AgentSession` props:
```ts
interface AgentSessionProps {
  variants: Record<CliVariant, { turns: TranscriptTurn[]; snapshots?: Record<number, WorkspaceSnapshot> }>
  toggleLabel: string            // translated a11y label for the segmented control
  fileTreeTitle?: string         // passed to FileExplorer when snapshots present
}
```
Renders a segmented `[ Claude Code | Kiro CLI ]` control (reuse the course-switcher styling from `App.tsx`), keeps `const [variant, setVariant] = useState<CliVariant>('claude-code')`, and renders the active `AgentTranscript`. If the active variant has `snapshots`, render the two-column terminal+FileExplorer layout (mirror `Workspace`); else terminal full-width. Switching variant resets the transcript to turn 0.

---

## Task 1: Build AgentTranscript component

**Files:** Create `src/components/AgentTranscript.tsx`

- [ ] **Step 1: Write the component.** It mirrors `src/components/SimulatedTerminal.tsx`'s animation (read it first) but renders typed *lines* with per-variant chrome. Exact implementation:

```tsx
import { useState, useEffect, useCallback, useRef } from 'react'

export type CliVariant = 'claude-code' | 'kiro'
export type LineKind = 'user' | 'assistant' | 'tool' | 'result' | 'ok' | 'diff-add' | 'diff-del'
export interface TranscriptLine { kind: LineKind; text: string }
export interface TranscriptTurn { lines: TranscriptLine[]; delay?: number }

interface AgentTranscriptProps {
  variant: CliVariant
  turns: TranscriptTurn[]
  /** Called with the turn index after a turn finishes animating. */
  onTurnExecuted?: (turnIndex: number) => void
}

const VARIANT_META: Record<CliVariant, { label: string; labelColor: string; glyph: string }> = {
  'claude-code': { label: '✻ Claude Code', labelColor: 'text-amber-400', glyph: '>' },
  kiro: { label: '◆ Kiro', labelColor: 'text-violet-400', glyph: '▶' },
}

// Per-line-kind prefix glyph + text color. `user` uses the variant glyph.
function lineClass(kind: LineKind): string {
  switch (kind) {
    case 'assistant': return 'text-zinc-300'
    case 'tool': return 'text-emerald-400'
    case 'result': return 'text-zinc-500'
    case 'ok': return 'text-emerald-400'
    case 'diff-add': return 'text-green-400'
    case 'diff-del': return 'text-red-400'
    default: return 'text-zinc-100'
  }
}

interface RenderedLine extends TranscriptLine { displayed: string; done: boolean }

export const AgentTranscript: React.FC<AgentTranscriptProps> = ({ variant, turns, onTurnExecuted }) => {
  const [rendered, setRendered] = useState<RenderedLine[]>([])
  const [turnIndex, setTurnIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const meta = VARIANT_META[variant]

  // Reset when the variant changes (toggle swaps the whole session).
  useEffect(() => {
    setRendered([])
    setTurnIndex(0)
    setIsAnimating(false)
  }, [variant, turns])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [rendered])

  const runTurn = useCallback((index: number) => {
    if (index >= turns.length || isAnimating) return
    const turn = turns[index]
    const instant = turn.lines.slice(0, -1).map((l) => ({ ...l, displayed: l.text, done: true }))
    const last = turn.lines[turn.lines.length - 1]
    setRendered((prev) => [...prev, ...instant, { ...last, displayed: '', done: false }])
    setIsAnimating(true)
    setTurnIndex(index + 1)

    const full = last.text
    const delay = turn.delay ?? 700
    const charDelay = Math.max(5, Math.min(28, delay / Math.max(full.length, 1)))
    let i = 0
    const id = setInterval(() => {
      i++
      setRendered((prev) => {
        const up = [...prev]
        const tail = up[up.length - 1]
        if (tail) up[up.length - 1] = { ...tail, displayed: full.slice(0, i) }
        return up
      })
      if (i >= full.length) {
        clearInterval(id)
        setRendered((prev) => {
          const up = [...prev]
          const tail = up[up.length - 1]
          if (tail) up[up.length - 1] = { ...tail, done: true }
          return up
        })
        setIsAnimating(false)
        onTurnExecuted?.(index)
      }
    }, charDelay)
  }, [turns, isAnimating, onTurnExecuted])

  const hasMore = turnIndex < turns.length

  return (
    <div className="flex h-80 flex-col overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
      <div className="flex shrink-0 items-center gap-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
        <span className="size-3 rounded-full bg-red-500" />
        <span className="size-3 rounded-full bg-yellow-500" />
        <span className="size-3 rounded-full bg-green-500" />
        <span className={`ml-2 font-mono text-xs font-semibold ${meta.labelColor}`}>{meta.label}</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-zinc-900 p-4 font-mono text-sm">
        {rendered.map((line, i) => (
          <pre key={i} className={`whitespace-pre-wrap leading-relaxed ${lineClass(line.kind)}`}>
            {line.kind === 'user' && <span className="text-zinc-500">{meta.glyph} </span>}
            {line.kind === 'tool' && <span>{variant === 'kiro' ? '▶ ' : '⏺ '}</span>}
            {line.kind === 'result' && <span className="text-zinc-600">{'  ⎿ '}</span>}
            {line.kind === 'ok' && <span>{'✓ '}</span>}
            {line.displayed}
            {!line.done && <span className="animate-pulse text-amber-400">▌</span>}
          </pre>
        ))}
        {rendered.length === 0 && (
          <div className="flex items-center gap-1">
            <span className="text-zinc-500">{meta.glyph}</span>
            <span className="animate-pulse text-amber-400">▌</span>
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
        {hasMore ? (
          <>
            <button
              onClick={() => runTurn(turnIndex)}
              disabled={isAnimating}
              className="rounded bg-zinc-200 dark:bg-zinc-600 px-3 py-1 text-xs text-zinc-900 dark:text-zinc-100 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-500 disabled:opacity-50"
            >
              {turnIndex === 0 ? 'Run' : 'Next'}
            </button>
            <span className="text-xs text-zinc-500">Turn {turnIndex + 1} of {turns.length}</span>
          </>
        ) : (
          <span className="text-xs text-zinc-500">{rendered.length > 0 ? '✓ Session complete' : `${turns.length} turns ready`}</span>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2:** `npm run build && npm run lint` → PASS (component exports, unused until Task 3).
- [ ] **Step 3: Commit**

```bash
git add src/components/AgentTranscript.tsx
git commit -m "feat: add AgentTranscript component for realistic CLI sessions"
```

---

## Task 2: Build AgentSession toggle wrapper

**Files:** Create `src/components/AgentSession.tsx`

- [ ] **Step 1: Write the component.** Holds the variant state, renders the segmented toggle + active `AgentTranscript`, and — when the active variant has `snapshots` — a `FileExplorer` panel beside it (mirror `src/components/Workspace.tsx`'s two-column layout + snapshot-by-step logic; read it first).

```tsx
import { useState, useCallback } from 'react'
import { AgentTranscript } from './AgentTranscript'
import type { CliVariant, TranscriptTurn } from './AgentTranscript'
import { FileExplorer } from './FileExplorer'
import type { WorkspaceSnapshot } from './Workspace'

interface VariantData { turns: TranscriptTurn[]; snapshots?: Record<number, WorkspaceSnapshot> }

interface AgentSessionProps {
  variants: Record<CliVariant, VariantData>
  /** Translated a11y label for the CLI toggle. */
  toggleLabel: string
  /** FileExplorer title when snapshots are present. */
  fileTreeTitle?: string
}

const VARIANT_TABS: { id: CliVariant; label: string }[] = [
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'kiro', label: 'Kiro CLI' },
]

export const AgentSession: React.FC<AgentSessionProps> = ({ variants, toggleLabel, fileTreeTitle }) => {
  const [variant, setVariant] = useState<CliVariant>('claude-code')
  const [executedTurn, setExecutedTurn] = useState(-1)

  const handleTurn = useCallback((i: number) => setExecutedTurn(i), [])
  const selectVariant = useCallback((v: CliVariant) => {
    setVariant(v)
    setExecutedTurn(-1)
  }, [])

  const active = variants[variant]
  const snapshots = active.snapshots

  let snapshot: WorkspaceSnapshot | undefined
  if (snapshots) {
    const keys = Object.keys(snapshots).map(Number).sort((a, b) => a - b)
    const activeKey = keys.reduce((best, k) => (k <= executedTurn ? k : best), keys[0] ?? -1)
    snapshot = snapshots[activeKey]
  }

  return (
    <div className="space-y-2">
      {/* CLI toggle */}
      <div className="flex gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5" role="group" aria-label={toggleLabel}>
        {VARIANT_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => selectVariant(t.id)}
            aria-pressed={variant === t.id}
            className={`flex-1 rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors ${
              variant === t.id
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {snapshots ? (
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="min-w-0">
            <AgentTranscript key={variant} variant={variant} turns={active.turns} onTurnExecuted={handleTurn} />
          </div>
          <div className="flex h-80 min-w-0 flex-col gap-2 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
            {snapshot ? (
              <>
                <div className="flex-1 overflow-y-auto px-1 pt-2">
                  <FileExplorer tree={snapshot.tree} title={fileTreeTitle ?? '~/project'} />
                </div>
                {snapshot.info && (
                  <div className="shrink-0 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2">
                    <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">{snapshot.info}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-xs text-zinc-500 dark:text-zinc-600">
                Run the session to see files change
              </div>
            )}
          </div>
        </div>
      ) : (
        <AgentTranscript key={variant} variant={variant} turns={active.turns} onTurnExecuted={handleTurn} />
      )}
    </div>
  )
}
```

Note: `WorkspaceSnapshot` is `{ tree: FileNode[]; label?: string; info?: string }` exported from `Workspace.tsx`. The `key={variant}` on `AgentTranscript` guarantees a clean remount on toggle.

- [ ] **Step 2:** `npm run build && npm run lint` → PASS.
- [ ] **Step 3: Commit**

```bash
git add src/components/AgentSession.tsx
git commit -m "feat: add AgentSession CLI toggle wrapper"
```

---

## Task 3: Rewire Tools Landscape (terminal-only, both CLIs)

**Files:** Modify `src/modules/toolslandscape/AgenticLoopSection.tsx`; Modify `src/i18n/en.ts` (toggle label)

- [ ] **Step 1: Add the toggle-label string.** In `src/i18n/en.ts`, inside `modules.toolslandscape.agenticLoop`, after `stepNote`, add:

```ts
      cliToggleLabel: 'Choose CLI: Claude Code or Kiro',
```

- [ ] **Step 2: Replace the section body.** Rewrite `src/modules/toolslandscape/AgenticLoopSection.tsx` to define two transcripts (same CSV-quoting bug task) and render `AgentSession`. The transcripts are authored verbatim below — they are the realistic content and the heart of this change:

```tsx
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
```

- [ ] **Step 3:** `npm run build && npm run lint` → PASS.
- [ ] **Step 4:** Manual: Use AI / Technical → Tools Landscape → section 2. Toggle shows Claude Code (`✻` header, `⏺`/`⎿` lines) and Kiro CLI (`◆` header, `✓` spec-file lines, task execution). Run steps through turns in both; switching CLI resets to turn 0.
- [ ] **Step 5: Commit**

```bash
git add src/modules/toolslandscape/AgenticLoopSection.tsx src/i18n/en.ts
git commit -m "feat: realistic Claude Code / Kiro toggle in Tools Landscape agentic loop"
```

---

## Task 4: Rewire Agentic Coding (terminal + file tree, both CLIs)

**Files:** Modify `src/modules/agenticcoding/RealSessionSection.tsx`; Modify `src/i18n/en.ts` (toggle label)

The current section uses `Workspace` (SimulatedTerminal + FileExplorer snapshots). Replace with `AgentSession`, giving each CLI variant its own `turns` AND its own `snapshots` (Kiro's file tree gains `.kiro/specs/add-rate-limit/{requirements,design,tasks}.md` before the code files; Claude's does not). Both end at the same code state.

- [ ] **Step 1: Add the toggle-label string.** In `src/i18n/en.ts`, inside `modules.agenticcoding.realSession`, after `stepNote`, add:

```ts
      cliToggleLabel: 'Choose CLI: Claude Code or Kiro',
```

(Keep `workspaceTitle`, `terminalTitle`, and the `snapshot*` info strings — the snapshot info strings are reused below.)

- [ ] **Step 2: Rewrite the section.** Replace `src/modules/agenticcoding/RealSessionSection.tsx` with:

```tsx
import { useMemo } from 'react'
import { AgentSession } from '../../components/AgentSession'
import type { TranscriptTurn } from '../../components/AgentTranscript'
import type { WorkspaceSnapshot } from '../../components/Workspace'
import type { FileNode } from '../../components/FileExplorer'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Transcript + filesystem content stays English by convention.
// Same task in each CLI: add rate limiting (100 req/min/IP, 429 over limit) + a test.

const CLAUDE_TURNS: TranscriptTurn[] = [
  { lines: [
    { kind: 'user', text: 'add rate limiting to the public API — 100 req/min per IP, return 429 over the limit, add a test' },
  ], delay: 800 },
  { lines: [
    { kind: 'tool', text: 'Grep(pattern: "express()", path: "src/")' },
    { kind: 'result', text: 'src/app.js' },
    { kind: 'tool', text: 'Read(src/app.js, src/routes/public.js)' },
    { kind: 'result', text: 'Read 2 files' },
    { kind: 'assistant', text: 'No rate limiting today. Plan: add a rateLimiter middleware, wire it into the public router, add a 429 test, run the suite.' },
  ], delay: 1100 },
  { lines: [
    { kind: 'tool', text: 'Write(src/middleware/rateLimiter.js)' },
    { kind: 'result', text: 'Wrote 18 lines — sliding-window counter keyed by req.ip, 429 + Retry-After over the limit' },
  ], delay: 800 },
  { lines: [
    { kind: 'tool', text: 'Update(src/routes/public.js)' },
    { kind: 'result', text: 'Updated with 2 additions' },
    { kind: 'diff-add', text: "    + const rateLimiter = require('../middleware/rateLimiter')" },
    { kind: 'diff-add', text: '    + router.use(rateLimiter({ windowMs: 60000, max: 100 }))' },
  ], delay: 800 },
  { lines: [
    { kind: 'tool', text: 'Write(test/rateLimiter.test.js)' },
    { kind: 'result', text: 'Wrote 12 lines — fires 101 requests, asserts the 101st is 429 with Retry-After' },
    { kind: 'tool', text: 'Bash(npm test)' },
    { kind: 'result', text: '2 suites passed, 14 tests passed' },
    { kind: 'assistant', text: 'Done. Rate limiting is live (100/min/IP), over-limit requests get 429 + Retry-After, and a regression test locks it in.' },
  ], delay: 1200 },
]

const KIRO_TURNS: TranscriptTurn[] = [
  { lines: [
    { kind: 'user', text: 'add rate limiting to the public API — 100 req/min per IP, return 429 over the limit, add a test' },
  ], delay: 800 },
  { lines: [
    { kind: 'assistant', text: 'Generating a spec before writing code.' },
    { kind: 'ok', text: 'Created .kiro/specs/add-rate-limit/requirements.md' },
    { kind: 'ok', text: 'Created .kiro/specs/add-rate-limit/design.md' },
    { kind: 'ok', text: 'Created .kiro/specs/add-rate-limit/tasks.md' },
    { kind: 'result', text: 'Task 1 — rateLimiter middleware (sliding window, 100/min/IP)' },
    { kind: 'result', text: 'Task 2 — wire into the public router' },
    { kind: 'result', text: 'Task 3 — add 429 regression test, run suite' },
  ], delay: 1200 },
  { lines: [
    { kind: 'tool', text: 'Execute task 1/3 — middleware' },
    { kind: 'result', text: 'Created src/middleware/rateLimiter.js' },
    { kind: 'tool', text: 'Execute task 2/3 — wire router' },
    { kind: 'result', text: 'Updated src/routes/public.js' },
  ], delay: 900 },
  { lines: [
    { kind: 'tool', text: 'Execute task 3/3 — test + suite' },
    { kind: 'result', text: 'Created test/rateLimiter.test.js' },
    { kind: 'result', text: 'npm test: 14 passed' },
    { kind: 'assistant', text: 'All tasks complete. The change is traceable to .kiro/specs/add-rate-limit/ — requirements, design, and tasks live beside the code.' },
  ], delay: 1100 },
]

// Shared file nodes
const F = (name: string, size: string, annotation?: string): FileNode => ({ name, type: 'file', size, ...(annotation ? { annotation } : {}) })
const baseSrc = (publicSize = '0.8 KB', publicAnn?: string, withMiddleware?: 'new' | 'plain'): FileNode => ({
  name: 'src', type: 'folder', children: [
    F('app.js', '1.1 KB'),
    ...(withMiddleware ? [{ name: 'middleware', type: 'folder' as const, children: [F('rateLimiter.js', '0.7 KB', withMiddleware === 'new' ? 'new' : undefined)] }] : []),
    { name: 'routes', type: 'folder', children: [F('public.js', publicSize, publicAnn)] },
  ],
})
const testFolder = (withRateTest?: boolean): FileNode => ({
  name: 'test', type: 'folder', children: [
    F('public.test.js', '0.6 KB'),
    ...(withRateTest ? [F('rateLimiter.test.js', '0.5 KB', 'new')] : []),
  ],
})
const pkg = F('package.json', '0.4 KB')
const kiroSpec = (): FileNode => ({
  name: '.kiro', type: 'folder', children: [{
    name: 'specs', type: 'folder', children: [{
      name: 'add-rate-limit', type: 'folder', children: [
        F('requirements.md', '0.5 KB', 'new'), F('design.md', '0.6 KB', 'new'), F('tasks.md', '0.3 KB', 'new'),
      ],
    }],
  }],
})

export const RealSessionSection: React.FC = () => {
  const c = useTranslation().modules.agenticcoding.realSession

  const claudeSnapshots = useMemo<Record<number, WorkspaceSnapshot>>(() => ({
    [-1]: { tree: [baseSrc(), testFolder(), pkg], info: c.snapshotInitial },
    [0]: { tree: [baseSrc(), testFolder(), pkg], info: c.snapshotMiddlewareSeen },
    [1]: { tree: [baseSrc('0.8 KB', undefined, 'new'), testFolder(), pkg], info: c.snapshotMiddlewareAdded },
    [2]: { tree: [baseSrc('0.9 KB', 'edited', 'plain'), testFolder(), pkg], info: c.snapshotEdited },
    [3]: { tree: [baseSrc('0.9 KB', undefined, 'plain'), testFolder(true), pkg], info: c.snapshotTested },
  }), [c])

  const kiroSnapshots = useMemo<Record<number, WorkspaceSnapshot>>(() => ({
    [-1]: { tree: [baseSrc(), testFolder(), pkg], info: c.snapshotInitial },
    [0]: { tree: [kiroSpec(), baseSrc(), testFolder(), pkg], info: c.snapshotKiroSpec },
    [1]: { tree: [kiroSpec(), baseSrc('0.9 KB', 'edited', 'new'), testFolder(), pkg], info: c.snapshotMiddlewareAdded },
    [2]: { tree: [kiroSpec(), baseSrc('0.9 KB', undefined, 'plain'), testFolder(true), pkg], info: c.snapshotTested },
  }), [c])

  return (
    <section aria-labelledby="real-session">
      <h2 id="real-session" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <p className="mb-4 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.stepNote}</p>
      <AgentSession
        toggleLabel={c.cliToggleLabel}
        fileTreeTitle="~/project"
        variants={{
          'claude-code': { turns: CLAUDE_TURNS, snapshots: claudeSnapshots },
          kiro: { turns: KIRO_TURNS, snapshots: kiroSnapshots },
        }}
      />
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add the one new snapshot info string.** The Kiro path needs a "spec created" snapshot caption. In `src/i18n/en.ts`, inside `modules.agenticcoding.realSession`, after `snapshotMiddlewareSeen`, add:

```ts
      snapshotKiroSpec: 'Kiro wrote the spec first — requirements, design, and tasks under .kiro/specs/ before touching code.',
```

(Claude uses turn-index keys -1..3; Kiro uses -1..2. `claudeSnapshots`/`kiroSnapshots` map turn index → snapshot exactly like the old Workspace did. The Claude turn count is 5 (indices 0-4) but snapshots only need keys up to 3 — the reduce picks the latest ≤ executedTurn, so the final turn keeps the last snapshot. Verify the file tree reaches the rate-limited end state in both.)

- [ ] **Step 4:** `npm run build && npm run lint` → PASS.
- [ ] **Step 5:** Manual: Use AI / Technical → Agentic Coding → section 2. Both CLIs run; the file tree updates as turns execute. Kiro shows `.kiro/specs/add-rate-limit/` appearing first; Claude goes straight to `middleware/rateLimiter.js`. Both end with `rateLimiter.js` + `rateLimiter.test.js` present. Toggle resets cleanly.
- [ ] **Step 6: Commit**

```bash
git add src/modules/agenticcoding/RealSessionSection.tsx src/i18n/en.ts
git commit -m "feat: realistic Claude Code / Kiro toggle in Agentic Coding session"
```

---

## Task 5: SV/KO for the two new strings

**Files:** Modify `src/i18n/sv.ts`, `src/i18n/ko.ts`

Only TWO new translatable keys were added (`cliToggleLabel` in both sections, and `snapshotKiroSpec` in agenticcoding). The CLI tab labels "Claude Code"/"Kiro CLI" are product names (not translated). Transcript content is English by convention.

- [ ] **Step 1:** In `src/i18n/sv.ts`, add to `modules.toolslandscape.agenticLoop`: `cliToggleLabel: 'Välj CLI: Claude Code eller Kiro',`. Add to `modules.agenticcoding.realSession`: `cliToggleLabel: 'Välj CLI: Claude Code eller Kiro',` and `snapshotKiroSpec: 'Kiro skrev specen först — krav, design och uppgifter under .kiro/specs/ innan koden rördes.',`.
- [ ] **Step 2:** In `src/i18n/ko.ts`, add to `modules.toolslandscape.agenticLoop`: `cliToggleLabel: 'CLI 선택: Claude Code 또는 Kiro',`. Add to `modules.agenticcoding.realSession`: `cliToggleLabel: 'CLI 선택: Claude Code 또는 Kiro',` and `snapshotKiroSpec: 'Kiro는 코드를 건드리기 전에 스펙을 먼저 작성했습니다 — .kiro/specs/ 아래의 요구사항, 설계, 작업.',`.
- [ ] **Step 3:** `npm run build && npm run lint` → PASS (DeepPartial typing confirms key paths).
- [ ] **Step 4: Commit**

```bash
git add src/i18n/sv.ts src/i18n/ko.ts
git commit -m "i18n: SV/KO for CLI toggle label and Kiro spec snapshot"
```

---

## Task 6: Regression + gate + deploy

**Files:** none (verification only)

- [ ] **Step 1:** Clean `npm run build && npm run lint`. Check `git status` for stray verifier artifacts (no `@playwright/test` in package.json; no `test-results/`, `test_translations.*`) — revert/remove per memory `deploy-llm-academy`.
- [ ] **Step 2:** Browser regression (headless; memory `browser-verification-setup`; start the dev server in its own step and `curl` for 200 before driving; explicit `waitFor`):
  - **Tools Landscape § Anatomy of an Agentic Tool:** toggle present; Claude Code variant shows `✻ Claude Code` header + `⏺`/`⎿` lines after Run; Kiro variant shows `◆ Kiro` + `✓ Created .kiro/specs/...`. Stepping advances "Turn N of M"; toggling resets. ✔
  - **Agentic Coding § Drive a Real Session:** same toggle; file tree on the right updates as turns run; Kiro shows `.kiro/specs/add-rate-limit/` appearing; both end with `rateLimiter.js` + `rateLimiter.test.js`. ✔
  - **No regression to the 19 other `SimulatedTerminal` sections:** spot-check one (e.g. Tokens module or datafoundations PipelineSection) still renders + runs. ✔
  - SV/KO: toggle label translates; transcript stays English. Dark mode: transcript chrome legible. ✔
- [ ] **Step 3:** Final whole-branch code review (dispatch reviewer): new components clean, SimulatedTerminal untouched, no dead-ends, snapshots reach correct end state in both variants, no stray files.
- [ ] **Step 4:** Merge to main (--no-ff), verify build+lint on main, delete branch, commit plan doc, push.
- [ ] **Step 5:** Deploy per memory `deploy-llm-academy`: build → S3 sync → CloudFront invalidation `E2TWEQEC71DPUY` `/*`. Verify live `index-*.js` hash matches local.

---

## Self-Review Notes

- **Zero blast radius on `SimulatedTerminal`:** two NEW components; the 19 existing terminal sections are untouched. The Workspace component is also untouched (AgentSession reimplements its two-column snapshot layout against AgentTranscript).
- **Realism is the point:** Claude Code = direct tool-call loop (`>` prompt, `⏺ Tool(args)` / `⎿ result`, inline diffs); Kiro = spec-first (`✓ Created .kiro/specs/<feature>/{requirements,design,tasks}.md`, then `▶ Execute task N/M`). Both do the SAME task so the learner sees the methodology difference, not a content difference.
- **i18n minimal & honest:** transcript/file content is English (established convention for code/terminal content); only the toggle a11y label + one Kiro snapshot caption are translated. CLI names are product names.
- **Snapshot/turn mapping:** AgentSession copies Workspace's "latest snapshot ≤ executedTurn" reduce. Claude has 5 turns / snapshots keyed -1..3; Kiro has 4 turns / snapshots keyed -1..2. Verify in-browser that the final state shows both new files in each variant.
- **Toggle reset:** `key={variant}` remounts AgentTranscript and `setExecutedTurn(-1)` resets the file tree when switching CLI — no stale half-run state.
- **Accessibility:** toggle is a labelled `role="group"` with `aria-pressed` tabs (mirrors the course switcher); transcript lines are `<pre>` so screen readers read them in order.
