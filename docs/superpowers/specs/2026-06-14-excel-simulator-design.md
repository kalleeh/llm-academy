# Excel Simulator ("Claude in Excel") — Design

**Date:** 2026-06-14
**Status:** Approved for planning

## Problem

The business-persona "Use AI" track talks about spreadsheets constantly — reconciling expenses against a travel policy, matching invoices to purchase orders, flagging policy violations, compiling weekly reports from sheets — but never *shows* one. The technical track has a terminal emulator (`SimulatedTerminal`) and there's a generic agent/work-app window (`WorkAppWindow`), but no spreadsheet. A non-technical operator (clinic admin, school office, restaurant owner, finance back office) reads "the agent operates directly on your spreadsheet" and has nothing concrete to picture.

This feature adds an **Excel simulator** that (a) looks like genuine Microsoft Excel and (b) replays **Claude for Excel** working in the grid — the real product experience: a right-hand Claude sidebar, a task, Claude streaming its work while cells update, cell-level citations, and warn-before-overwrite.

## Goals

- A reusable React component that renders **authentic Microsoft Excel chrome** (not a recolored terminal) — this is an explicit fidelity bar, see Acceptance Criteria.
- An **interactive but read-only grid**: the learner can click any cell and get the real Excel feel (Name Box, formula bar, header highlighting, green selection rectangle with fill handle). No editing, no recomputation.
- An authored **Claude-for-Excel replay**: right sidebar, pre-filled prompt, ▶ Run/Next stepping, Claude messages streamed into the panel, each step applying a grid operation in sync, with **clickable cell citations** and **warn-before-overwrite** notes.
- Honest on a static site: there is no LLM and no formula engine. Claude's side is an authored replay; the grid is presentational. The input box is authentic chrome but display-only.

## Non-Goals (explicitly cut, with reasons)

- **No formula engine.** Originally considered (let the learner type live formulas that compute). Cut because once the Claude panel is an authored replay, the engine only serves a free-typing sandbox the fear-averse target persona is unlikely to use — it's the largest build + bug surface for the least teaching value, and it sets the expectation "I changed B2, why didn't the total move?" that a static grid can't honor.
- **No free-text input to Claude.** A static site cannot genuinely answer arbitrary prompts; faking it (keyword-matching to a canned reply) teaches the wrong lesson for a course about using AI well. The input box is present for authenticity but runs an authored session.
- **No raw-value cell editing** (not even non-computing). Same expectation problem; a clearly read-only-but-selectable sheet is more honest.
- **No full ribbon.** The ribbon is large and adds no teaching value; we render the identifying chrome (title bar, Name Box, formula bar, headers, grid) like the terminal renders just its title bar.

## Architecture

A new self-contained, presentational, authored-content emulator following the established pattern of `SimulatedTerminal` and `WorkAppWindow`: no backend, fixed height to prevent layout shift, scrolls inside its own container, light body in both themes.

### Files

- **Create** `src/components/ExcelSimulator.tsx` — the component. Renders Excel chrome + grid (left) and the Claude sidebar (right); owns selection state and replay state.
- **Create** `src/components/excel-types.ts` — the authored data shapes (`CellData`, `GridOp`, `ClaudeStep`, `ExcelSimulatorProps`) so lessons import types without importing the component.

### Prop / data interface

```ts
// excel-types.ts
export interface CellData {
  value: string        // what shows IN the cell (e.g. "47,300" or "Acme Ltd")
  formula?: string     // what shows in the FORMULA BAR when selected (e.g. "=SUMIF(D2:D241,\"over\",E2:E241)")
                       // if absent, the formula bar shows `value`
  bold?: boolean       // header-row styling, etc.
  align?: 'left' | 'right'   // default: right if value parses as a number, else left
}

// One authored grid mutation applied when a Claude step is revealed.
export type GridOp =
  | { kind: 'addColumn'; at: number; header: string }                 // insert a column at index `at`
  | { kind: 'setCells'; cells: { row: number; col: number; data: CellData }[] }  // write/overwrite cells (each flashes)
  | { kind: 'flagRows'; rows: number[]; tone?: 'warn' | 'ok' }        // shade rows (e.g. policy breach)

// A citation embedded in Claude's message text: clicking it selects + flashes the cell.
export interface CellCitation { token: string; ref: string }          // token e.g. "[E47]", ref e.g. "E47"

export interface ClaudeStep {
  message: string                 // Claude's panel text for this step (may contain citation tokens like [E47])
  citations?: CellCitation[]      // tokens in `message` to render as clickable chips
  ops?: GridOp[]                  // grid mutations applied when this step is revealed
  overwriteWarning?: string       // optional "⚠ Claude will overwrite B2:B12" note shown with this step
}

export interface ExcelSimulatorProps {
  title: string                   // workbook name, e.g. "expenses-march.xlsx"
  columns: string[]               // header labels for columns A, B, C… (NOT the A/B/C letters; those are auto)
  rows: CellData[][]              // initial grid (row-major). rows[r][c]. Row 0 is typically the header row.
  prompt: string                  // request pre-filled in Claude's input box
  session: ClaudeStep[]           // the authored replay
}
```

### Why a new component (not extending an existing one)

`SimulatedTerminal` and `WorkAppWindow` have a linear text body and different chrome; the spreadsheet needs a 2-D grid, cell selection, and a docked side panel. The shared DNA (authored `steps`, Run/Next bar, in-container scroll, light-body-in-both-themes) is small enough to re-implement cleanly rather than abstract behind a shared base.

## Component design

### Layout

A fixed-height container (≈`h-[28rem]`) split into the Excel area (left, flex-1) and the Claude sidebar (right, ~320px, toggizable). Outer container border/shadow is the only thing that adapts to dark mode; all inner chrome is authentic-light in both themes.

### Excel chrome (left), top to bottom

1. **Title bar** — Excel ribbon green (`#217346`), a small workbook glyph + `{title}`. Right side: a **terracotta Claude pill** (✻ Claude) that toggles the sidebar (mirrors the real add-in's ribbon entry). Claude reads as a distinct add-in inside Excel's green chrome.
2. **Formula-bar row** — **Name Box** (left, fixed width) showing the selected ref (e.g. `C5`) or empty; `fx` glyph; **formula bar** showing the selected cell's `formula` if present, else its `value`; empty when no selection.
3. **Grid:**
   - **Select-all corner nub** (top-left), then **column header row** — grey cells with auto letters `A B C…`; the selected cell's column letter highlights green.
   - **Row header column** — grey numbers `1 2 3…`; the selected row's number highlights green.
   - **Cells** — Excel gridlines, numbers right-aligned, text left-aligned, `bold` cells bold. Click selects: **2px green selection rectangle** (`#107c41`) with the **fill-handle square** at bottom-right. Read-only. Flagged rows show a warn/ok fill. Recently-written cells (from a replay step) flash a brief highlight.
   - Scrolls vertically **inside** the grid box.

### Claude sidebar (right)

- **Header** — ✻ Claude (terracotta), small.
- **Message list** — each revealed `ClaudeStep.message` streamed in (char animation like the terminal). Citation tokens render as **clickable chips**; clicking selects + flashes the referenced cell in the grid. `overwriteWarning` renders as an amber inline note on its step.
- **Input box (bottom)** — authentic chrome: a text field pre-filled with `{prompt}`, a send glyph, and faint `/` hint text (`/clean-up`, `/debug`). **Display-only** (not editable / does not accept free prompts).
- **Run/Next action bar** — `▶ Run` then `Next` to advance steps; "✓ Done" at the end. Same pattern as `SimulatedTerminal`'s bottom bar (always present, no layout shift).

### State

- `selected: {row, col} | null` — drives Name Box, formula bar, header highlight, selection rectangle.
- `revealed: number` — count of `session` steps shown; advancing applies that step's `ops` to a derived working copy of the grid and streams its message.
- `flashCells: Set<string>` — cells to briefly highlight (written this step, or a clicked citation target); cleared on a timer.
- The working grid is derived by folding `ops[0..revealed]` over `rows` (pure reducer), so playback is deterministic and re-renderable.

### Behaviors faithful to the real product

- Claude **highlights every cell it writes** (the flash).
- **Cell-level citations** are clickable and navigate/flash (the signature feature).
- **Warn-before-overwrite** note on steps that mutate existing data.
- Sidebar opens from a ribbon-style entry (the title-bar pill).

## Internationalization

All learner-facing prose (Claude messages, prompt, column headers, takeaways) lives in the `useTranslation()` tree per existing convention; cell *values* that are data (numbers, vendor names, dates) and formula strings stay verbatim (like code/template strings elsewhere). The component takes already-resolved strings via props; the lesson wires `useTranslation()` content into `ExcelSimulatorProps`. SV/KO follow in the same task as the lesson content (not in the component task).

## Where it's used (first lesson)

The natural home is the business **Agentic Work** module's delegation walkthrough (`DelegateSuperviseSection`), whose authored example is already the expense-reconciliation-against-travel-policy story — the simulator makes that concrete. Exact placement (replace/supplement the existing `InteractiveDemo`, and whether the technical track also gets an instance) is a planning decision; this spec covers the reusable component plus one authored business session.

## Acceptance criteria

1. **Excel fidelity (explicit bar):** Rendered side-by-side with a real Excel screenshot, the chrome reads as Excel — ribbon green `#217346`, gridline grey `~#d4d4d4`, header band `~#f5f5f5`, green selection `#107c41` with fill-handle nub, select-all corner nub, Calibri/Segoe-family grid typography, Excel row proportions, numbers right-aligned + header row bold. **No terminal tropes** (no traffic-light dots, no monospace grid body, no `$` prompt).
2. **Selection works:** clicking any cell updates Name Box + formula bar (formula if present, else value) and highlights the column letter and row number; the green selection rectangle + fill handle draw on the active cell.
3. **Replay works:** ▶ Run / Next steps through `session`; each step streams its Claude message and applies its grid ops in sync; written cells flash; flagged rows shade; the bottom bar never causes layout shift.
4. **Citations work:** citation chips in Claude messages are clickable and select + flash the referenced cell.
5. **Overwrite warning:** steps with `overwriteWarning` show the amber note.
6. **Honest static behavior:** the input box is present but display-only; no free-text prompt is accepted; no claim of live computation.
7. **Theme:** chrome is authentic-light in both light and dark site themes; only the outer container adapts.
8. **Gates:** `npm run build` + `npm run lint` clean; headless-browser check confirms render, selection, replay, and citation clicks; visual eyeball against a real Excel reference.

## Tech stack / conventions

React 19, TypeScript strict, Vite 8, Tailwind v4. Authentic Excel colors via explicit hex (arbitrary Tailwind values, e.g. `bg-[#217346]`) since the palette is brand-specific and outside the `zinc` system. Calibri-family font stack scoped to the grid. Pure-reducer grid folding for deterministic, resumable playback. No new dependencies.
