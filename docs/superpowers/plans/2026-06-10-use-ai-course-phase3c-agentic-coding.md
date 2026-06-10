# "Use AI" Course — Phase 3c: Agentic Coding Module (+ ai-in-org fix) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** (a) Fix a latent registry bug — `ai-in-org` is registered for both personas but renders blank in technical mode (it's business-only). (b) Ship "Use AI" module 3 — *Agentic Coding* (technical-only): coding with an agent as your pair — task decomposition, context/memory, review loops, MCP — with a **Workspace** (terminal + files) emulation of a real Claude Code session, a KnowledgeCheck, a CourseBridge to Agents & Tool Use, and full EN/SV/KO i18n.

**Architecture:** This is the course's first **single-persona** module (`personas: ['technical']`) — there's precedent (8 Understand modules are technical-only). The module root therefore renders one layout with no `useDifficulty()` branch (and crucially, no `mode`-guard that returns null — that's exactly the `ai-in-org` bug we're fixing). Pattern otherwise matches shipped Use-AI modules: registry entry + lazy import; section components under `src/modules/agenticcoding/`; prose in the `useTranslation()` tree (`modules.agenticcoding.*`); quiz/SelfExplain via legacy translation files. The emulation uses the existing `Workspace` component (`SimulatedTerminal` + `FileExplorer` driven by step snapshots). Bridge targets `agents` (renders in both personas → never a dead link; the spec's named example "Agentic Coding ⟷ Agents & Tool Use").

**Tech Stack:** React 19, TS strict, Vite 8, Tailwind v4 (dark: pairing). Gates: `npm run build && npm run lint` + browser checks (headless setup: memory `browser-verification-setup`).

**Reference spec:** `docs/superpowers/specs/2026-06-09-use-ai-course-design.md` (Phase 3, module 3; bridge example "Use ▸ Agentic Coding ⟷ Understand ▸ Agents & Tool Use")

---

## Module Content Design (technical only)

After this module the learner can drive an agentic coding tool (Claude Code / Kiro) as a working partner: scope a task it can actually complete, manage what it knows via context files, supervise the think→act→verify loop, and review at the right checkpoints.

**Sections (3):**
1. **What Makes a Coding Agent Different** — expandable cards: task decomposition (turns a goal into a plan), codebase context (reads files, greps, traces), tool use & MCP (runs commands, tests, hits APIs/servers), the verify loop (checks its own work). Contrasts with autocomplete and chat.
2. **Drive a Real Session** *(emulation — Workspace: terminal + files)* — watch an agent implement "add rate limiting to the API" across a repo: explore → plan → edit middleware → add a test → run the suite → report. The file tree updates as commands run; the learner steps through and sees files appear/change. SelfExplain.
3. **Working Effectively With a Coding Agent** — expandable cards: scope tasks like a tech lead, give it durable context (AGENTS.md), review at checkpoints not keystrokes, know when to take the wheel. CourseBridge → agents.

Ends with a KnowledgeCheck (2 questions). No business branch.

IDs: registry `agentic-coding`; i18n subtree `agenticcoding`; KnowledgeCheck `agenticcoding`; question ids `agcode-1`, `agcode-2`.

---

## File Structure

- **Create:** `src/modules/AgenticCodingModule.tsx`; `src/modules/agenticcoding/CodingAgentDifferentSection.tsx`, `RealSessionSection.tsx`, `WorkingEffectivelySection.tsx`
- **Modify:** `src/registry.ts` (ai-in-org fix + new module), `src/App.tsx`, `src/ui-labels.ts`, `src/i18n/en.ts`, `src/i18n/sv.ts`, `src/i18n/ko.ts`, `src/quiz-translations.ts`, `src/selfexplain-translations.ts`

---

## Task 1: Fix ai-in-org persona + register Agentic Coding module

**Files:** Modify `src/registry.ts`, `src/App.tsx`; Create `src/modules/AgenticCodingModule.tsx`

- [ ] **Step 1: Fix the ai-in-org registry bug.** In `src/registry.ts`, the `ai-in-org` entry currently reads `personas: ['technical', 'business']`, but `AIInOrgModule` returns `null` unless `mode === 'business'` — so it renders blank in the technical sidebar. Change it to business-only:

```ts
  { id: 'ai-in-org', label: 'AI in Your Organization', course: 'understand', personas: ['business'] },
```

(Verify the render guard first: `grep -n "mode !== 'business'" src/modules/AIInOrgModule.tsx` should confirm the business-only `return null`. This makes the technical Understand sidebar honest — it drops from 18 to 17 modules, removing the blank entry. The business sidebar is unchanged. No CourseBridge targets `ai-in-org` from a technical context after Phase 3b's fix, so nothing breaks.)

- [ ] **Step 2: Placeholder module.** Create `src/modules/AgenticCodingModule.tsx`:

```tsx
import { ModuleLayout } from '../components/ModuleLayout'

export const AgenticCodingModule: React.FC = () => {
  return (
    <ModuleLayout moduleId="agentic-coding" title="Agentic Coding" subtitle="Coding with an agent as your pair — task decomposition, context, review loops.">
      <p className="text-zinc-700 dark:text-zinc-300">Content coming in Phase 3.</p>
    </ModuleLayout>
  )
}
```

- [ ] **Step 3: Register the new module.** In `src/registry.ts`: append `| 'agentic-coding'` to `ModuleId`; append to `MODULES` after the `optimizing-workflow` entry:

```ts
  { id: 'agentic-coding', label: 'Agentic Coding', course: 'use', personas: ['technical'] },
```

- [ ] **Step 4: App wiring.** In `src/App.tsx`: after the `OptimizingWorkflowModule` lazy import add:

```tsx
const AgenticCodingModule = lazy(() => import('./modules/AgenticCodingModule').then(m => ({ default: m.AgenticCodingModule })))
```

and in `moduleComponents` after `'optimizing-workflow': OptimizingWorkflowModule,` add:

```tsx
  'agentic-coding': AgenticCodingModule,
```

- [ ] **Step 5:** `npm run build && npm run lint` → PASS.
- [ ] **Step 6:** Manual:
  - Use AI / Technical: sidebar lists 4 modules (Tools Landscape, Working With AI, Optimizing Workflow, Agentic Coding); module 4 renders placeholder.
  - Use AI / Business: sidebar lists 3 modules (Agentic Coding NOT shown).
  - Understand AI / Technical: sidebar lists 17 modules, no blank "AI in Your Organization" entry.
  - Understand AI / Business: still shows "AI in Your Organization" and it renders.
- [ ] **Step 7: Commit**

```bash
git add src/registry.ts src/App.tsx src/modules/AgenticCodingModule.tsx
git commit -m "fix: ai-in-org is business-only; register Agentic Coding (technical) module"
```

---

## Task 2: Sidebar + module labels (EN/SV/KO)

**Files:** Modify `src/ui-labels.ts`, `src/i18n/en.ts`

- [ ] **Step 1:** In `src/ui-labels.ts` add after each language's `'optimizing-workflow'` entry. Note: technical-only module, so no `businessSubtitle` needed (matches how other technical-only modules like `tokens` omit it):

EN:
```ts
    'agentic-coding': { label: 'Agentic Coding', subtitle: 'Coding with an agent as your pair — task decomposition, context & memory, review loops, MCP.' },
```
SV:
```ts
    'agentic-coding': { label: 'Agentisk kodning', subtitle: 'Att koda med en agent som parprogrammerare — uppgiftsuppdelning, kontext & minne, granskningsloopar, MCP.' },
```
KO:
```ts
    'agentic-coding': { label: '에이전틱 코딩', subtitle: '에이전트를 짝으로 코딩하기 — 작업 분해, 컨텍스트와 메모리, 검토 루프, MCP.' },
```

- [ ] **Step 2:** In `src/i18n/en.ts` `moduleLabels` after the `'optimizing-workflow'` entry:

```ts
  'agentic-coding': {
    label: 'Agentic Coding',
    subtitle: 'Coding with an agent as your pair — task decomposition, context & memory, review loops, MCP.',
  },
```

- [ ] **Step 3:** Build + lint → PASS. **Step 4: Commit**

```bash
git add src/ui-labels.ts src/i18n/en.ts
git commit -m "feat: add Agentic Coding sidebar + module labels (EN/SV/KO)"
```

---

## Task 3: English content tree

**Files:** Modify `src/i18n/en.ts`

- [ ] **Step 1:** Inside `const modules = {`, after the closing brace of the `optimizingworkflow` entry, insert:

```ts
  agenticcoding: {
    // 1. What Makes a Coding Agent Different
    different: {
      title: '1. What Makes a Coding Agent Different',
      intro:
        'An autocomplete finishes your line. A chat assistant answers in a window. A coding agent does neither — it works in your repo the way a teammate would: plan, edit across files, run things, check the result. Four capabilities set it apart. Click each.',
      items: [
        {
          name: 'Task decomposition',
          tagline: 'Turns a goal into a plan',
          description:
            'You say "add rate limiting to the public API." The agent breaks that into steps — find the middleware layer, add a limiter, wire it into the routes, add a test, run the suite — and works the plan, instead of emitting one blob of code and hoping.',
        },
        {
          name: 'Codebase context',
          tagline: 'Reads before it writes',
          description:
            'It greps, opens files, and traces how things connect — so its changes match your conventions and fit the existing structure. This is why it can edit a repo it has never seen, and why a chat assistant (which sees only what you paste) cannot.',
        },
        {
          name: 'Tool use & MCP',
          tagline: 'Acts, not just suggests',
          description:
            'The agent runs commands, executes tests, reads their output, and via MCP (Model Context Protocol) reaches external tools — your database, issue tracker, docs. Tool use is what turns "here is some code" into "I made the change and the tests pass."',
        },
        {
          name: 'The verify loop',
          tagline: 'Checks its own work',
          description:
            'After acting it inspects the result — runs the test, reads the error, re-reads the file — and adapts. This think → act → verify cycle is the heart of agentic coding: it is what lets you review outcomes at checkpoints instead of supervising every keystroke.',
        },
      ],
      takeaway:
        'Autocomplete predicts, chat advises, an agent acts and verifies. The shift is from getting code to delegating a coding task — which means your job moves from typing to specifying and reviewing.',
    },
    // 2. Drive a Real Session (Workspace emulation)
    realSession: {
      title: '2. Drive a Real Session',
      intro:
        'Here is a faithful simulation of a Claude Code session implementing a small feature. Run the commands and watch the repo change on the right. Notice the loop: explore → plan → edit → test → report.',
      workspaceTitle: 'claude-code — add rate limiting',
      terminalTitle: 'claude-code',
      stepNote:
        'Each command is one turn of the agentic loop. The agent reads the codebase before editing, writes a test for its own change, and runs the suite before declaring done.',
      snapshotInitial: 'Starting point: a small Express API with no rate limiting.',
      snapshotMiddlewareSeen: 'The agent has read the structure and located where middleware is wired in.',
      snapshotEdited: 'New rateLimiter middleware added and wired into the app.',
      snapshotTested: 'A regression test was added and the suite passes.',
      takeaway:
        'You supplied one sentence of intent and reviewed at checkpoints; the agent did the search, the edits, the test, and the verification. That division of labor — you specify and review, it executes and proves — is what working with a coding agent feels like.',
      selfExplainPrompt:
        'In the session above, the agent wrote a test before saying it was done. Why is that verify step the thing that makes delegating to a coding agent safe?',
      selfExplainAnswer:
        'Because verification converts a plausible-looking diff into a checked one. A passing regression test means you can review the outcome ("does this do what I asked, and is it still green?") instead of re-reading every line to guess whether it works. Without the verify step you inherit all the risk and none of the time savings — you would have to manually re-check everything the agent touched. The test is the agent proving its work, which is what lets you operate at the checkpoint level.',
    },
    // 3. Working Effectively With a Coding Agent
    effectively: {
      title: '3. Working Effectively With a Coding Agent',
      intro:
        'The tool is capable; getting great results from it is a skill. Four habits separate people who fight their coding agent from people who ship with it. Click each.',
      items: [
        {
          name: 'Scope like a tech lead',
          tagline: 'Hand it a task, not a wish',
          description:
            'The best-sized task is one you could hand a competent engineer with a paragraph: clear outcome, the constraints that matter, how to know it is done. "Make the app better" fails; "add ret/backoff to the S3 client, max 3 tries, keep the existing interface, add a test for the timeout path" succeeds.',
        },
        {
          name: 'Give it durable context',
          tagline: 'Write the AGENTS.md once',
          description:
            'Stack, conventions, test commands, gotchas — put them in an AGENTS.md at the repo root so every session starts pre-briefed instead of guessing. Context you keep re-typing is context that belongs in a file the agent reads automatically.',
        },
        {
          name: 'Review at checkpoints',
          tagline: 'Outcomes, not keystrokes',
          description:
            'Let it complete a coherent unit — a function, a fix, a passing test — then review that, the way you would review a colleague\'s PR. Watching every token is slower than just writing the code; reviewing the diff is where your judgment actually adds value.',
        },
        {
          name: 'Know when to take the wheel',
          tagline: 'Stop the loop when it spins',
          description:
            'If the agent is thrashing — two failed attempts at the same error, edits drifting away from the goal — stop and intervene. Add the missing context, correct the plan, or take that piece yourself. A good operator redirects early instead of letting an agent dig a deeper hole.',
        },
      ],
      bridgeBlurb:
        'You have driven a coding agent. Now look under the hood: how tool use, function calling, MCP, and agent design patterns actually work — the machinery beneath the session you just ran.',
    },
  },
```

- [ ] **Step 2:** Build + lint → PASS. **Step 3: Commit**

```bash
git add src/i18n/en.ts
git commit -m "feat: add Agentic Coding English content tree"
```

---

## Task 4: Sections + module root (incl. Workspace emulation)

**Files:** Create `src/modules/agenticcoding/CodingAgentDifferentSection.tsx`, `RealSessionSection.tsx`, `WorkingEffectivelySection.tsx`; Modify `src/modules/AgenticCodingModule.tsx`

- [ ] **Step 1: CodingAgentDifferentSection.tsx** — expandable cards reading `useTranslation().modules.agenticcoding.different`, aria id `coding-agent-different`, trailing plain-takeaway box (zinc, like WhatModelSeesSection). ITEM_META icons: `puzzle`/`search`/`plug`/`cycle`.

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.agenticcoding.different.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'puzzle', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'search', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'plug', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'cycle', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const CodingAgentDifferentSection: React.FC = () => {
  const c = useTranslation().modules.agenticcoding.different
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="coding-agent-different">
      <h2 id="coding-agent-different" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <div className="space-y-2">
        {c.items.map((item, i) => (
          <div key={item.name} className={`rounded-lg border ${ITEM_META[i]?.color ?? ''}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="flex items-center gap-2">
                <Icon name={ITEM_META[i]?.icon ?? 'box'} className="shrink-0 text-zinc-600 dark:text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">— {item.tagline}</span>
              </div>
              <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-2xl rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
    </section>
  )
}
```

- [ ] **Step 2: RealSessionSection.tsx** — the Workspace emulation. Terminal steps + file snapshots stay in English (terminal-content convention); surrounding prose comes from i18n. aria id `real-session`. Mirrors `src/modules/finetuning/FineTuningRunSection.tsx` Workspace usage.

```tsx
import { Workspace } from '../../components/Workspace'
import type { WorkspaceSnapshot } from '../../components/Workspace'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Terminal + filesystem content stays English by convention (matches FineTuningRunSection).
const STEPS: TerminalStep[] = [
  {
    command: 'claude "add rate limiting to the public API — 100 req/min per IP, return 429 over the limit, add a test"',
    output:
      'I\'ll start by understanding the API structure.\n\n→ Grep "express()" src/ — found src/app.js\n→ Read src/app.js, src/routes/public.js\n\nNo rate limiting today. Plan:\n  1. Add a rateLimiter middleware (in-memory, 100/min/IP)\n  2. Wire it into the public router\n  3. Add a test for the 429 path\n  4. Run the suite',
    delay: 900,
  },
  {
    command: '[agent] Write src/middleware/rateLimiter.js',
    output:
      'Created rateLimiter.js — sliding-window counter keyed by req.ip,\nreturns 429 with Retry-After when the window is exceeded.',
    delay: 600,
  },
  {
    command: '[agent] Edit src/routes/public.js',
    output:
      "+ const rateLimiter = require('../middleware/rateLimiter')\n+ router.use(rateLimiter({ windowMs: 60000, max: 100 }))\n\n✓ middleware wired into the public router",
    delay: 600,
  },
  {
    command: '[agent] Write test/rateLimiter.test.js',
    output:
      'Added a test: fires 101 requests from one IP, asserts the\n101st returns 429 and includes a Retry-After header.',
    delay: 600,
  },
  {
    command: '[agent] Bash: npm test',
    output:
      'PASS test/public.test.js\nPASS test/rateLimiter.test.js\n\nTest Suites: 2 passed, Tests: 14 passed\n\nDone. Rate limiting is live on the public API (100/min/IP),\nover-limit requests get a 429 + Retry-After, and a regression\ntest locks the behavior in.',
    delay: 800,
  },
]

const BASE_TREE = [
  { name: 'src', type: 'folder' as const, children: [
    { name: 'app.js', type: 'file' as const, size: '1.1 KB' },
    { name: 'routes', type: 'folder' as const, children: [
      { name: 'public.js', type: 'file' as const, size: '0.8 KB' },
    ] },
  ] },
  { name: 'test', type: 'folder' as const, children: [
    { name: 'public.test.js', type: 'file' as const, size: '0.6 KB' },
  ] },
  { name: 'package.json', type: 'file' as const, size: '0.4 KB' },
]

export const RealSessionSection: React.FC = () => {
  const c = useTranslation().modules.agenticcoding.realSession

  const snapshots: Record<number, WorkspaceSnapshot> = {
    [-1]: { label: c.workspaceTitle, tree: BASE_TREE, info: c.snapshotInitial },
    [0]: { label: c.workspaceTitle, tree: BASE_TREE, info: c.snapshotMiddlewareSeen },
    [1]: { label: c.workspaceTitle, tree: [
      { name: 'src', type: 'folder', children: [
        { name: 'app.js', type: 'file', size: '1.1 KB' },
        { name: 'middleware', type: 'folder', children: [
          { name: 'rateLimiter.js', type: 'file', size: '0.7 KB', annotation: 'new' },
        ] },
        { name: 'routes', type: 'folder', children: [
          { name: 'public.js', type: 'file', size: '0.8 KB' },
        ] },
      ] },
      { name: 'test', type: 'folder', children: [
        { name: 'public.test.js', type: 'file', size: '0.6 KB' },
      ] },
      { name: 'package.json', type: 'file', size: '0.4 KB' },
    ], info: c.snapshotEdited },
    [2]: { label: c.workspaceTitle, tree: [
      { name: 'src', type: 'folder', children: [
        { name: 'app.js', type: 'file', size: '1.1 KB' },
        { name: 'middleware', type: 'folder', children: [
          { name: 'rateLimiter.js', type: 'file', size: '0.7 KB' },
        ] },
        { name: 'routes', type: 'folder', children: [
          { name: 'public.js', type: 'file', size: '0.9 KB', annotation: 'edited' },
        ] },
      ] },
      { name: 'test', type: 'folder', children: [
        { name: 'public.test.js', type: 'file', size: '0.6 KB' },
      ] },
      { name: 'package.json', type: 'file', size: '0.4 KB' },
    ], info: c.snapshotEdited },
    [3]: { label: c.workspaceTitle, tree: [
      { name: 'src', type: 'folder', children: [
        { name: 'app.js', type: 'file', size: '1.1 KB' },
        { name: 'middleware', type: 'folder', children: [
          { name: 'rateLimiter.js', type: 'file', size: '0.7 KB' },
        ] },
        { name: 'routes', type: 'folder', children: [
          { name: 'public.js', type: 'file', size: '0.9 KB' },
        ] },
      ] },
      { name: 'test', type: 'folder', children: [
        { name: 'public.test.js', type: 'file', size: '0.6 KB' },
        { name: 'rateLimiter.test.js', type: 'file', size: '0.5 KB', annotation: 'new' },
      ] },
      { name: 'package.json', type: 'file', size: '0.4 KB' },
    ], info: c.snapshotTested },
  }

  return (
    <section aria-labelledby="real-session">
      <h2 id="real-session" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <p className="mb-4 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.stepNote}</p>
      <Workspace title={c.workspaceTitle} terminalTitle={c.terminalTitle} steps={STEPS} snapshots={snapshots} />
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
```

Note: `Workspace` snapshot `label` is passed through `tLabel(lang, label)`, which falls back to the key string itself when no translation exists — so passing the already-translated `c.workspaceTitle` renders it verbatim. That's intended and fine.

- [ ] **Step 3: WorkingEffectivelySection.tsx** — expandable cards reading `...effectively`, aria id `working-effectively`, `<CourseBridge target="agents" blurb={c.bridgeBlurb} />` after the cards. ITEM_META icons: `target`/`file`/`check`/`wrench`.

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { CourseBridge } from '../../components/CourseBridge'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.agenticcoding.effectively.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'target', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'file', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'check', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'wrench', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const WorkingEffectivelySection: React.FC = () => {
  const c = useTranslation().modules.agenticcoding.effectively
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="working-effectively">
      <h2 id="working-effectively" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <div className="space-y-2">
        {c.items.map((item, i) => (
          <div key={item.name} className={`rounded-lg border ${ITEM_META[i]?.color ?? ''}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="flex items-center gap-2">
                <Icon name={ITEM_META[i]?.icon ?? 'box'} className="shrink-0 text-zinc-600 dark:text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">— {item.tagline}</span>
              </div>
              <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <CourseBridge target="agents" blurb={c.bridgeBlurb} />
    </section>
  )
}
```

- [ ] **Step 4: Module root.** Replace `src/modules/AgenticCodingModule.tsx` with (single-persona — NO `useDifficulty` branch, NO mode guard):

```tsx
import { translateQuestions, useLanguage } from '../i18n'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'
import { CodingAgentDifferentSection } from './agenticcoding/CodingAgentDifferentSection'
import { RealSessionSection } from './agenticcoding/RealSessionSection'
import { WorkingEffectivelySection } from './agenticcoding/WorkingEffectivelySection'

const QUESTIONS: Question[] = [
  {
    id: 'agcode-1',
    type: 'mc',
    question: 'What most fundamentally separates an agentic coding tool from an IDE autocomplete or a chat assistant?',
    options: [
      'It uses a larger language model',
      'It plans across steps and acts in your repo — editing files, running commands and tests, and verifying the result — rather than only suggesting or answering',
      'It only works with JavaScript',
      'It never makes mistakes',
    ],
    correctIndex: 1,
    explanation:
      'Autocomplete predicts the next tokens; chat advises in a window. An agent decomposes a task, reads and edits the codebase, runs tools (commands, tests, MCP), and verifies its own work in a think → act → verify loop. Acting-and-verifying is the dividing line.',
  },
  {
    id: 'agcode-2',
    type: 'free',
    question: 'You are about to hand a coding agent a task. Describe how you would scope it and where you would review, so you get a good result without watching every keystroke.',
    modelAnswer:
      'Scope it like a brief to a competent engineer: a clear outcome, the constraints that matter (interfaces to preserve, edge cases to handle), and a definition of done — e.g. "add retry-with-backoff to the S3 client, max 3 tries, keep the existing interface, add a test for the timeout path." Put durable project context (stack, conventions, test command) in an AGENTS.md so the agent starts pre-briefed. Then review at checkpoints: let it complete a coherent unit (the change plus a passing test) and review that diff like a PR, instead of supervising token by token. If it thrashes — two failed attempts at the same error — step in, add context or correct the plan rather than letting it dig deeper.',
    explanation:
      'Good scoping + durable context + checkpoint review is the operating model. You delegate the work but keep the accountability, and the agent\'s own tests are what let you review outcomes instead of keystrokes.',
  },
]

export const AgenticCodingModule: React.FC = () => {
  const { lang } = useLanguage()

  return (
    <ModuleLayout moduleId="agentic-coding" title="Agentic Coding" subtitle="Coding with an agent as your pair — task decomposition, context & memory, review loops, MCP.">
      <CodingAgentDifferentSection />
      <RealSessionSection />
      <WorkingEffectivelySection />
      <KnowledgeCheck moduleId="agenticcoding" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
```

- [ ] **Step 5: Icon check.** Verify `puzzle`, `search`, `plug`, `cycle`, `target`, `file`, `check`, `wrench`, `box`, `terminal` exist in `src/components/Icon.tsx` PATHS. Report DONE_WITH_CONCERNS naming any missing.
- [ ] **Step 6:** Build + lint → PASS. Manual (Use AI / Technical → Agentic Coding):
  - 3 sections render; cards expand.
  - The Workspace emulation: terminal runs the 5 steps; the file tree on the right updates (middleware folder appears, public.js marked edited, rateLimiter.test.js appears) as steps execute.
  - Bridge "Under the hood" → Agents & Tool Use navigates and back works.
  - Quiz works.
- [ ] **Step 7: Commit**

```bash
git add src/modules/agenticcoding src/modules/AgenticCodingModule.tsx
git commit -m "feat: Agentic Coding sections with Workspace session emulation"
```

---

## Task 5: SV/KO content translations

**Files:** Modify `src/i18n/sv.ts`, `src/i18n/ko.ts`

- [ ] **Step 1:** Add a `// MT`-marked `agenticcoding` subtree to each file after the `optimizingworkflow` entry, mirroring the EN structure from Task 3 exactly. Translator writes faithful, complete, native-register translations (SV du-form; KO 합니다체) of EVERY prose field: different{title,intro,items[4]{name,tagline,description},takeaway}, realSession{title,intro,workspaceTitle,terminalTitle,stepNote,snapshotInitial,snapshotMiddlewareSeen,snapshotEdited,snapshotTested,takeaway,selfExplainPrompt,selfExplainAnswer}, effectively{title,intro,items[4],bridgeBlurb}. Array lengths 4/—/4.

  IMPORTANT for realSession: `workspaceTitle` and `terminalTitle` are shown as terminal/panel chrome alongside English terminal output — keep them SHORT and you MAY leave them in English (e.g. 'claude-code — add rate limiting' / 'claude-code') to match the untranslated terminal content, OR translate only the trailing description. Translate the `snapshot*` info strings and all prose. Product names (Claude Code, Kiro, MCP, AGENTS.md, Express, S3) and code fragments stay verbatim; escape apostrophes. `DeepPartial<Translation>` catches structural mismatches at build time.

- [ ] **Step 2:** Build + lint → PASS. Manual: SV/KO render; the Workspace terminal output stays English (expected), prose around it translates.
- [ ] **Step 3: Commit**

```bash
git add src/i18n/sv.ts src/i18n/ko.ts
git commit -m "i18n: Swedish + Korean for Agentic Coding module"
```

---

## Task 6: Quiz + SelfExplain translations (legacy mechanism)

**Files:** Modify `src/quiz-translations.ts`, `src/selfexplain-translations.ts`

- [ ] **Step 1:** In `src/quiz-translations.ts`, after the `// Optimizing Your Workflow (Use AI course)` block, add an `// Agentic Coding (Use AI course)` block: `quizSv`/`quizKo` entries for `agcode-1` (mc, correct index 1) and `agcode-2` (free: modelAnswer + `options: undefined`). Translate faithfully from the EN questions in `src/modules/AgenticCodingModule.tsx`; option ORDER must match EN so correctIndex stays valid. SV du-form; KO 합니다체.

- [ ] **Step 2:** In `src/selfexplain-translations.ts`, add SV + KO entries for the one prompt (realSession.selfExplainPrompt). Key is `prompt.slice(0, 50)` of the EN prompt — compute with node from the REAL en.ts string before writing; watch for trailing spaces. Place SV entry before the sv record's closing `}`, KO before the ko record's closing `}`.

- [ ] **Step 3:** Build + lint → PASS. Manual: SV quiz + SelfExplain prompt translated.
- [ ] **Step 4: Commit**

```bash
git add src/quiz-translations.ts src/selfexplain-translations.ts
git commit -m "i18n: SV/KO quiz and SelfExplain translations for Agentic Coding"
```

---

## Task 7: Regression + gate

**Files:** none (verification only)

- [ ] **Step 1:** Clean `npm run build && npm run lint`. Confirm `git status` shows no stray dependency edits (no `@playwright/test` in package.json; no `test-results/`, `test_translations.*` — if a verifier added them, revert/remove before the gate).
- [ ] **Step 2:** Browser regression (headless, see memory `browser-verification-setup`). Use explicit `waitFor` on lazy module headings (the target module loads as a separate chunk — a fixed sleep can read mid-Suspense and see zero `<h1>`):
  - Use AI / Technical: sidebar lists 4 modules; progress denominator 4. ✔
  - Use AI / Business: sidebar lists 3 modules (Agentic Coding hidden). ✔
  - Agentic Coding: 3 sections + Workspace emulation runs (step the terminal, file tree updates) + quiz. ✔
  - Bridge → Agents & Tool Use (`#/understand/technical/agents`) renders (waitFor its h1), back returns to Agentic Coding. ✔
  - **ai-in-org fix:** Understand / Technical sidebar = 17 modules, no blank "AI in Your Organization"; Understand / Business still shows it and it renders. ✔
  - Deep link `#/use/technical/agentic-coding` (fresh profile) resolves to the module. ✔
  - Prior Use-AI modules, SV/KO, dark mode unaffected. ✔
- [ ] **Step 3:** Commit any fixups.

---

## Self-Review Notes

- **Spec coverage:** Phase 3 module 3 (technical-only) with the Workspace (terminal + files) emulation the spec calls for ("Emulate an agent editing a repo; watch files change"), a quiz, and the spec's named bridge Agentic Coding ⟷ Agents & Tool Use. Full i18n.
- **ai-in-org fix:** the registry now matches what the module renders (business-only). This is the same bug class as Phase 3b's bridge fix — a module advertised for a persona it renders nothing in. After this, every `course:'use'` and `course:'understand'` module renders for each persona its registry lists.
- **Single-persona module:** first of its kind in the Use course. The module root has no `useDifficulty` branch and no `return null` guard — its registry `personas: ['technical']` is the single source of truth for visibility. Do NOT add a mode guard (that is precisely the ai-in-org anti-pattern).
- **Bridge correctness:** `agents` is `understand`-course, both personas → never dead-ends; from the technical Agentic Coding module the heading resolves to "Under the hood" and label "Agents & Tool Use".
- **Workspace emulation:** snapshots keyed by executed-step index (-1 initial, then 0–3); the panel shows the latest snapshot ≤ current step. Terminal/file content English by convention; `tLabel` fallback makes the passed-in translated `workspaceTitle` render verbatim.
- **Pattern fidelity:** card/bridge sections mirror shipped `optimizingworkflow` siblings; the Workspace section mirrors `FineTuningRunSection`. Deviations are bugs.
