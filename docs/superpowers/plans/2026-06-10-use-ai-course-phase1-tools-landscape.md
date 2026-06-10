# "Use AI" Course — Phase 1: AI Tools Landscape Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the first "Use AI" course module — *AI Tools Landscape* — with Business + Technical sections, an interactive emulation per persona (mantra requirement), KnowledgeChecks for both personas, and full EN/SV/KO i18n, proving the 4-lens pattern (course × persona × i18n × quiz) end-to-end.

**Architecture:** One new registry entry (`id: 'tools-landscape', course: 'use'`) plus a new `ToolsLandscapeModule` following the exact pattern of `IndustryModule.tsx` (business/technical branch on `useDifficulty()`, sections as separate files under `src/modules/toolslandscape/`, `ModuleLayout` wrapper, `KnowledgeCheck` at the end). All prose lives in the **new i18n system** (`useTranslation()` tree in `en.ts`/`sv.ts`/`ko.ts` under `modules.toolslandscape.*`) — new content must NOT use the legacy `useT`/`tArray` helpers. Quiz and SelfExplain translations use the legacy `quiz-translations.ts` / `selfexplain-translations.ts` mechanism because `KnowledgeCheck`/`SelfExplain` still consume those.

**Tech Stack:** React 19, TypeScript (strict, `noUnusedLocals`/`noUnusedParameters` on), Vite 8, Tailwind v4 (every colored class needs a `dark:` counterpart). No test runner — every task is gated by `npm run build && npm run lint` plus explicit manual checks.

**Reference spec:** `docs/superpowers/specs/2026-06-09-use-ai-course-design.md` (Phase 1, module 1)

---

## Module Content Design (what we're teaching)

"AI Tools Landscape — What tool for what job." After this module the learner can pick the right tool among: ChatGPT / Claude / Gemini (chat assistants), Amazon Quick Desktop & Claude Cowork (agentic work apps), Claude Code & Kiro CLI (agentic coding), and GitHub Copilot (IDE assistant) — and explain *why*.

**Technical sections (3):**
1. **The Tool Categories** — interactive category map: chat surface → IDE assistant → agentic CLI → autonomous agent platform. Click each category to see what it is, when to reach for it, example tools.
2. **Anatomy of an Agentic Tool** *(emulation — SimulatedTerminal)* — a simulated Claude Code session: the learner steps through prompt → plan → tool call → file edit → verification, seeing the agentic loop with their own eyes.
3. **Choosing Your Stack** — decision walkthrough (InteractiveDemo): four realistic dev scenarios, each stepping to a recommendation and the reasoning.

**Business sections (3):**
1. **The Tool Categories** (business lens) — same category map, business framing: chat assistant vs work delegate vs developer tools; what your teams should be using for what.
2. **Watching an AI Do Work** *(emulation — InteractiveDemo step-through)* — step through delegating a real task ("summarize these 30 customer interviews into themes") to an agentic work app: delegate → agent plans → works → you review checkpoints → final deliverable.
3. **Picking Tools for Your Team** — decision walkthrough: four org scenarios (sales team, legal review, dev team, exec reporting), each stepping to a recommendation.

Both end with `KnowledgeCheck` (2 technical Qs / 2 business Qs) and the decision sections include a `SelfExplain`.

---

## File Structure

- **Create:** `src/modules/ToolsLandscapeModule.tsx` — module root, branches on persona (mirrors `IndustryModule.tsx`).
- **Create:** `src/modules/toolslandscape/ToolCategoriesSection.tsx` — technical section 1.
- **Create:** `src/modules/toolslandscape/AgenticLoopSection.tsx` — technical section 2 (SimulatedTerminal emulation).
- **Create:** `src/modules/toolslandscape/ChoosingStackSection.tsx` — technical section 3 (InteractiveDemo + SelfExplain).
- **Create:** `src/modules/toolslandscape/ToolCategoriesBusiness.tsx` — business section 1.
- **Create:** `src/modules/toolslandscape/DelegationDemoBusiness.tsx` — business section 2 (InteractiveDemo emulation).
- **Create:** `src/modules/toolslandscape/PickingToolsBusiness.tsx` — business section 3 (InteractiveDemo + SelfExplain).
- **Modify:** `src/App.tsx` — registry entry, `ModuleId` union, lazy import, `moduleComponents` map.
- **Modify:** `src/i18n/en.ts` — `moduleLabels['tools-landscape']` + `modules.toolslandscape` subtree.
- **Modify:** `src/i18n/sv.ts`, `src/i18n/ko.ts` — translations (moduleLabels + modules subtree).
- **Modify:** `src/ui-labels.ts` — `MODULE_LABELS` sidebar entries for `tools-landscape` (EN/SV/KO).
- **Modify:** `src/quiz-translations.ts` — SV/KO for the 4 quiz questions.
- **Modify:** `src/selfexplain-translations.ts` — SV/KO for the 2 SelfExplain prompts.

Note on terminal/demo content: command strings and simulated outputs in the SimulatedTerminal stay English (matches `PipelineSection.tsx` convention — terminal content is not translated). Surrounding prose IS translated.

---

## Task 1: Register the module (registry, type, lazy import, component map)

**Files:**
- Modify: `src/App.tsx`

The module component doesn't exist yet, so this task creates a minimal placeholder module file too — it gets fully built out in Tasks 3-6. This keeps every task compiling.

- [ ] **Step 1: Create the placeholder module**

Create `src/modules/ToolsLandscapeModule.tsx`:

```tsx
import { ModuleLayout } from '../components/ModuleLayout'

export const ToolsLandscapeModule: React.FC = () => {
  return (
    <ModuleLayout moduleId="tools-landscape" title="AI Tools Landscape" subtitle="What tool for what job — chat assistants, agentic work apps, and coding agents.">
      <p className="text-zinc-700 dark:text-zinc-300">Content coming in Phase 1.</p>
    </ModuleLayout>
  )
}
```

- [ ] **Step 2: Add the ModuleId and registry entry in App.tsx**

In `src/App.tsx`, change the `ModuleId` type (line 30) to append the new id:

```tsx
type ModuleId = 'ai-problem' | 'data-foundations' | 'tokens' | 'transformer' | 'training' | 'llm-data' | 'alignment' | 'architecture' | 'solution' | 'evaluation' | 'quantization' | 'inference' | 'industry' | 'embeddings' | 'prompting' | 'agents' | 'ai-in-org' | 'fine-tuning' | 'tools-landscape'
```

Then append to the `modules` array (after the `fine-tuning` entry, line 50):

```tsx
  { id: 'tools-landscape', label: 'AI Tools Landscape', course: 'use', personas: ['technical', 'business'] },
```

- [ ] **Step 3: Add the lazy import and component map entry**

After the `AIInOrgModule` lazy import (line 26), add:

```tsx
const ToolsLandscapeModule = lazy(() => import('./modules/ToolsLandscapeModule').then(m => ({ default: m.ToolsLandscapeModule })))
```

In `moduleComponents` (after `'fine-tuning': FineTuningModule,`), add:

```tsx
  'tools-landscape': ToolsLandscapeModule,
```

- [ ] **Step 4: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 5: Manual behavior check**

Run: `npm run dev`.
- Understand AI course: unchanged (18 technical / 10 business — the new module must NOT appear). ✔
- Switch to Use AI: sidebar shows exactly 1 module, "AI Tools Landscape", in both personas. Clicking it renders the placeholder. ✔
- URL shows `#/use/technical/tools-landscape` when viewing it. ✔
Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/modules/ToolsLandscapeModule.tsx
git commit -m "feat: register AI Tools Landscape module in Use AI course"
```

---

## Task 2: Sidebar labels + i18n module labels (EN/SV/KO)

**Files:**
- Modify: `src/ui-labels.ts`
- Modify: `src/i18n/en.ts`
- Modify: `src/i18n/sv.ts`
- Modify: `src/i18n/ko.ts`

- [ ] **Step 1: Add MODULE_LABELS entries in ui-labels.ts**

In `src/ui-labels.ts`, inside `MODULE_LABELS.en` (after the `'fine-tuning'` line, line 109), add:

```ts
    'tools-landscape': { label: 'AI Tools Landscape', subtitle: 'Chat assistants, agentic work apps, coding agents — what tool for what job, and why.', businessSubtitle: 'The AI tools your teams should be using — and how to pick the right one for each job.' },
```

Inside `MODULE_LABELS.sv` (after its `'fine-tuning'` line, line 129), add:

```ts
    'tools-landscape': { label: 'AI-verktygslandskapet', subtitle: 'Chattassistenter, agentiska arbetsappar, kodagenter — vilket verktyg för vilket jobb, och varför.', businessSubtitle: 'AI-verktygen dina team borde använda — och hur man väljer rätt verktyg för varje jobb.' },
```

Inside `MODULE_LABELS.ko` (after its `'fine-tuning'` line, line 149), add:

```ts
    'tools-landscape': { label: 'AI 도구 지형도', subtitle: '챗 어시스턴트, 에이전틱 업무 앱, 코딩 에이전트 — 어떤 작업에 어떤 도구를, 그리고 왜.', businessSubtitle: '팀이 사용해야 할 AI 도구들 — 그리고 각 작업에 맞는 도구를 고르는 법.' },
```

- [ ] **Step 2: Add moduleLabels entry in en.ts**

In `src/i18n/en.ts`, inside `const moduleLabels = {` (after the `'fine-tuning'` entry, ~line 364), add:

```ts
  'tools-landscape': {
    label: 'AI Tools Landscape',
    subtitle: 'Chat assistants, agentic work apps, coding agents — what tool for what job, and why.',
    businessSubtitle: 'The AI tools your teams should be using — and how to pick the right one for each job.',
  },
```

(`sv.ts`/`ko.ts` have no `moduleLabels` section today — the sidebar reads `MODULE_LABELS` from `ui-labels.ts`, which Step 1 covered. Do not add a `moduleLabels` section to sv/ko.)

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 4: Manual check**

Run: `npm run dev`. In Use AI course, switch language to SV → sidebar shows "AI-verktygslandskapet"; KO → "AI 도구 지형도". Module header (from `ModuleLayout`'s `MODULE_LABELS` lookup) translates too, and shows the business subtitle in business mode. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/ui-labels.ts src/i18n/en.ts
git commit -m "feat: add Tools Landscape sidebar + module labels (EN/SV/KO)"
```

---

## Task 3: English content tree in en.ts

**Files:**
- Modify: `src/i18n/en.ts`

All section prose lands in the translation tree FIRST, so the section components (Tasks 4-5) can be written against `useTranslation().modules.toolslandscape.*` from the start.

- [ ] **Step 1: Add the toolslandscape subtree**

In `src/i18n/en.ts`, inside `const modules = {` — after the closing brace of the `alignment` entry (the last module subtree, ends ~line 1522 with `  },`) and before the final `}` of `modules` — add:

```ts
  toolslandscape: {
    // Tech: 1. The Tool Categories
    categories: {
      title: '1. The Tool Categories',
      intro:
        'The AI tool space looks crowded, but almost everything falls into four categories — defined by how much autonomy the tool has and where it lives. Click each category to explore.',
      whenLabel: 'When to reach for it:',
      toolsLabel: 'Tools:',
      items: [
        {
          name: 'Chat Assistants',
          tagline: 'You ask, it answers',
          description:
            'A conversation surface. You bring the context, it brings the reasoning. Powerful for drafting, explaining, analyzing — but it only acts inside the chat: nothing happens in your files, repos, or apps unless you copy it there.',
          when: 'Questions, drafts, analysis, brainstorming — any task where the deliverable is text and you stay in the loop on every turn.',
          tools: 'ChatGPT, Claude, Gemini',
        },
        {
          name: 'IDE Assistants',
          tagline: 'Autocomplete that grew up',
          description:
            'Lives inside your editor, sees the file you have open, and suggests code inline. Low autonomy: it proposes, you accept. Great for keeping flow, weak when a change spans many files.',
          when: 'Single-file edits, boilerplate, learning an unfamiliar API as you type.',
          tools: 'GitHub Copilot, Cursor inline mode',
        },
        {
          name: 'Agentic Coding Tools',
          tagline: 'An agent in your terminal & repo',
          description:
            'You describe an outcome; the agent plans, reads your codebase, edits multiple files, runs commands and tests, and reports back. It works in steps — think → act → check — and you review at checkpoints.',
          when: 'Multi-file features, refactors, debugging, test coverage — real engineering tasks you would hand a teammate.',
          tools: 'Claude Code, Kiro CLI',
        },
        {
          name: 'Agentic Work Apps',
          tagline: 'Delegate office work, not code',
          description:
            'The same agentic loop, pointed at documents, spreadsheets, research, and workflows instead of code. You delegate a task, the agent works through it across files and apps, and you supervise the result.',
          when: 'Research and synthesis, report drafting, data cleanup, multi-document work.',
          tools: 'Amazon Quick Desktop, Claude Cowork',
        },
      ],
      axisNote:
        'The pattern behind the map: as you move from chat to agents, the tool stops answering and starts doing. The more autonomy, the more your job shifts from writing to reviewing.',
    },
    // Tech: 2. Anatomy of an Agentic Tool
    agenticLoop: {
      title: '2. Anatomy of an Agentic Tool',
      intro:
        'What actually happens when you hand a task to an agentic coding tool? Run the session below — it is a faithful simulation of a Claude Code run. Watch the loop: understand → plan → act → verify.',
      stepNote: 'Each command is one turn of the agentic loop. Notice the agent checks its own work before reporting done.',
      takeaway:
        'This loop — plan, act, verify, repeat — is the signature of every agentic tool, whether it is editing code or a spreadsheet. The skill of using one well is mostly the skill of writing a clear task and reviewing at the right checkpoints.',
    },
    // Tech: 3. Choosing Your Stack
    choosingStack: {
      title: '3. Choosing Your Stack',
      intro:
        'Four realistic situations. For each: what would you reach for? Step through to see the reasoning.',
      recommendLabel: 'Best fit:',
      scenarios: [
        {
          situation: 'You need to understand an unfamiliar 50k-line codebase enough to fix a bug somewhere in the auth flow.',
          pick: 'Agentic coding tool (Claude Code / Kiro)',
          why: 'The agent can search the repo, trace the flow across files, and explain the architecture — then fix the bug and run the tests. A chat assistant cannot see your repo; an IDE assistant only sees the open file.',
        },
        {
          situation: 'You are writing a one-off Python script to parse a CSV and you know exactly what you want.',
          pick: 'IDE assistant — or just a chat assistant',
          why: 'Full agentic autonomy is overkill for a task you can specify completely and verify at a glance. Inline completion keeps you in flow; a chat assistant can write the whole script in one shot.',
        },
        {
          situation: 'You want a second opinion on a system design before you commit to it.',
          pick: 'Chat assistant (Claude, ChatGPT)',
          why: 'This is a reasoning-and-conversation task. You want to iterate on ideas, challenge assumptions, and explore trade-offs — the deliverable is understanding, not artifacts.',
        },
        {
          situation: 'Your team needs the API documentation updated to match 30 endpoints that changed this quarter.',
          pick: 'Agentic coding tool, supervised',
          why: 'Repetitive, multi-file, verifiable — ideal agent work. The agent reads each endpoint, updates docs, and you spot-check. Doing this by hand in an IDE assistant means 30 manual passes.',
        },
      ],
      selfExplainPrompt:
        'Pick a real task from your current week. Which tool category fits it best, and what would you have to specify for the tool to succeed?',
      selfExplainAnswer:
        'Example: "Migrate our date handling from moment.js to date-fns" — agentic coding tool. I would specify: the libraries involved, that tests must pass after each file, and which edge cases (timezones) to be careful with. The clearer the outcome and constraints, the better the agent performs.',
    },
    // Business: 1. The Tool Categories (business lens)
    categoriesBiz: {
      title: '1. The Tool Categories',
      intro:
        'Your teams are already using AI — the question is whether they are using the right kind for each job. Almost every tool falls into one of three categories. Click each to explore.',
      whenLabel: 'Use it for:',
      toolsLabel: 'Tools:',
      items: [
        {
          name: 'Chat Assistants',
          tagline: 'A brilliant colleague in a chat window',
          description:
            'You ask questions, it answers; you paste material, it analyzes or rewrites. The catch: it only talks. Nothing lands in your documents or systems unless someone copies it there.',
          when: 'Drafting emails and documents, summarizing material you paste in, brainstorming, quick analysis.',
          tools: 'ChatGPT, Claude, Gemini',
        },
        {
          name: 'Agentic Work Apps',
          tagline: 'A capable assistant you delegate to',
          description:
            'You hand over a task — "turn these 30 interviews into a themes report" — and the AI works through it: opening files, extracting, organizing, drafting. You review at checkpoints instead of doing every step.',
          when: 'Research and synthesis, recurring reports, data cleanup, any multi-document task that eats hours.',
          tools: 'Amazon Quick Desktop, Claude Cowork',
        },
        {
          name: 'Developer AI Tools',
          tagline: 'Your engineering team’s power tools',
          description:
            'Agents that write and change real code under engineer supervision. You do not need to operate these — but you should know your dev team can ship significantly faster with them, and budget accordingly.',
          when: 'Engineering work: features, bug fixes, code modernization. (Your developers drive; you fund and measure.)',
          tools: 'Claude Code, Kiro CLI, GitHub Copilot',
        },
      ],
      axisNote:
        'The pattern: chat assistants answer, agentic tools do. The more the tool does, the more your people shift from doing the work to specifying and reviewing it — that is the real workflow change to manage.',
    },
    // Business: 2. Watching an AI Do Work
    delegation: {
      title: '2. Watching an AI Do Work',
      intro:
        'The biggest mental shift is from chatting to delegating. Step through a real delegation to an agentic work app — notice where the human stays in control.',
      steps: [
        {
          label: 'You delegate',
          content:
            '"Here are 30 customer interview transcripts. Identify the recurring themes, pull two supporting quotes per theme, and draft a 2-page summary for the product team."',
          note: 'A good delegation looks like a good brief to a junior colleague: outcome, format, audience.',
        },
        {
          label: 'The agent plans',
          content:
            'The agent proposes a plan: read all 30 transcripts → tag pain points per transcript → cluster into themes → select quotes → draft the summary. It asks one clarifying question: "Should pricing complaints be a separate theme or grouped under ‘value’?"',
          note: 'You approve the plan or adjust it. This is your first checkpoint — cheap to correct now, expensive later.',
        },
        {
          label: 'The agent works',
          content:
            'It processes the transcripts and shows progress: "14/30 read — 6 candidate themes emerging." You are free to do other work; it flags anything ambiguous instead of guessing.',
          note: 'Unlike a chat assistant, it is actually operating on your files — not waiting for you to paste content in.',
        },
        {
          label: 'You review the draft',
          content:
            'The draft lands with themes, quotes, and an appendix mapping every claim to its source transcript. You spot one theme that is really two, and say so. The agent restructures and updates the summary.',
          note: 'Review is your real job now. The traceable sources are what make the review fast.',
        },
        {
          label: 'The deliverable ships',
          content:
            'Final 2-page summary, ready for the product team. Elapsed human time: ~20 minutes of briefing and review, instead of two days of reading and writing.',
          note: 'The work did not disappear — it changed shape: from doing to directing.',
        },
      ],
      takeaway:
        'Delegation quality determines output quality. The teams that get the most from agentic tools are the ones that write clear briefs and review at checkpoints — exactly the skills of a good manager.',
    },
    // Business: 3. Picking Tools for Your Team
    pickingTools: {
      title: '3. Picking Tools for Your Team',
      intro:
        'Four common team situations. Step through each to see which tool category fits and why.',
      recommendLabel: 'Best fit:',
      scenarios: [
        {
          situation: 'Your sales team spends every Friday afternoon assembling a pipeline summary from CRM exports and call notes.',
          pick: 'Agentic work app',
          why: 'Recurring, multi-source, well-defined output — ideal delegation. The agent assembles the draft from the exports; a rep reviews it in minutes. A chat assistant would require pasting everything in manually each week.',
        },
        {
          situation: 'Legal needs a first-pass review of incoming NDAs against your standard playbook.',
          pick: 'Agentic work app — with mandatory human review',
          why: 'The agent compares each NDA to the playbook and flags deviations with references. A lawyer makes every judgment call. High-stakes domains keep the human as the decision-maker; the agent kills the reading time.',
        },
        {
          situation: 'Marketing wants help punching up campaign copy and subject lines.',
          pick: 'Chat assistant',
          why: 'Creative iteration is conversation — generate options, react, refine. No files to operate on, no multi-step workflow. The simplest tool that works is the right tool.',
        },
        {
          situation: 'Engineering says a legacy system rewrite will take three quarters.',
          pick: 'Agentic coding tools for the dev team',
          why: 'Modernization is where coding agents shine: large, repetitive, testable. Teams using them well report dramatic speedups on exactly this work. Your role: fund the tools, ask for before/after metrics.',
        },
      ],
      selfExplainPrompt:
        'Think of the most repetitive multi-step task your team does every week. Could you delegate it to an agentic tool? Write the one-paragraph brief you would give it.',
      selfExplainAnswer:
        'Example: "Every Monday we compile a competitor-news digest. Brief: scan these 12 sources for news about competitors X, Y, Z from the past week; group by competitor; two-sentence summary per item with a link; flag anything about pricing or layoffs as urgent; output as one page." Clear sources, format, and escalation rule — that is a delegation-ready brief.',
    },
  },
```

- [ ] **Step 2: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS (the subtree is unused so far — that's fine; `en.ts` is data, not code with unused-local checks on object members).

- [ ] **Step 3: Commit**

```bash
git add src/i18n/en.ts
git commit -m "feat: add Tools Landscape English content tree"
```

---

## Task 4: Technical sections (3 components + module wiring)

**Files:**
- Create: `src/modules/toolslandscape/ToolCategoriesSection.tsx`
- Create: `src/modules/toolslandscape/AgenticLoopSection.tsx`
- Create: `src/modules/toolslandscape/ChoosingStackSection.tsx`
- Modify: `src/modules/ToolsLandscapeModule.tsx`

- [ ] **Step 1: Create ToolCategoriesSection.tsx**

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Non-translatable per-category metadata. Order matches the `items` array in
// `useTranslation().modules.toolslandscape.categories.items`.
const CATEGORY_META: { icon: IconName; color: string }[] = [
  { icon: 'chat', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'edit', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'terminal', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'robot', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const ToolCategoriesSection: React.FC = () => {
  const c = useTranslation().modules.toolslandscape.categories
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="tool-categories">
      <h2 id="tool-categories" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <div className="space-y-2">
        {c.items.map((item, i) => (
          <div key={item.name} className={`rounded-lg border ${CATEGORY_META[i]?.color ?? ''}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="flex items-center gap-2">
                <Icon name={CATEGORY_META[i]?.icon ?? 'box'} className="shrink-0 text-zinc-600 dark:text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">— {item.tagline}</span>
              </div>
              <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{item.description}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400"><strong>{c.whenLabel}</strong> {item.when}</p>
                <p className="text-xs text-zinc-500"><strong className="text-zinc-600 dark:text-zinc-400">{c.toolsLabel}</strong> {item.tools}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-2xl rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.axisNote}</p>
    </section>
  )
}
```

- [ ] **Step 2: Create AgenticLoopSection.tsx**

```tsx
import { SimulatedTerminal } from '../../components/SimulatedTerminal'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { useTranslation } from '../../i18n'

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
    </section>
  )
}
```

- [ ] **Step 3: Create ChoosingStackSection.tsx**

```tsx
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Order matches `scenarios` in useTranslation().modules.toolslandscape.choosingStack.
const SCENARIO_COLORS = [
  'border-blue-400 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5',
  'border-emerald-400 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5',
  'border-amber-400 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5',
  'border-purple-400 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/5',
]

export const ChoosingStackSection: React.FC = () => {
  const c = useTranslation().modules.toolslandscape.choosingStack

  return (
    <section aria-labelledby="choosing-stack">
      <h2 id="choosing-stack" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <InteractiveDemo
        title={c.title}
        steps={c.scenarios.map((s, i) => (
          <div key={i} className={`rounded-lg border p-5 ${SCENARIO_COLORS[i]}`}>
            <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">&quot;{s.situation}&quot;</p>
            <div className="mb-3 inline-block rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">{c.recommendLabel} {s.pick}</div>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{s.why}</p>
          </div>
        ))}
      />
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Wire the technical sections into the module**

Replace `src/modules/ToolsLandscapeModule.tsx` entirely with:

```tsx
import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'
import { ToolCategoriesSection } from './toolslandscape/ToolCategoriesSection'
import { AgenticLoopSection } from './toolslandscape/AgenticLoopSection'
import { ChoosingStackSection } from './toolslandscape/ChoosingStackSection'

const QUESTIONS: Question[] = [
  {
    id: 'toolsland-1',
    type: 'mc',
    question: 'You need to rename a config key that appears in ~40 files across a repo, updating tests as you go. Which tool fits best, and why?',
    options: [
      'A chat assistant — paste each file in and apply the edits it suggests',
      'An IDE assistant — accept inline suggestions file by file',
      'An agentic coding tool — it can search the repo, edit all files, and run the tests itself',
      'No AI — multi-file changes are too risky to involve AI at all',
    ],
    correctIndex: 2,
    explanation:
      'This is the signature agentic-coding task: multi-file, mechanical, and verifiable by tests. A chat assistant can\'t see the repo, an IDE assistant works one file at a time. The test suite is the safety net that makes agent autonomy safe here.',
  },
  {
    id: 'toolsland-2',
    type: 'free',
    question: 'Describe the agentic loop (the cycle an agentic tool runs for each task) and explain why the verification step changes how much you can safely delegate.',
    modelAnswer:
      'The loop is: understand the task → plan → act (edit files, run commands) → verify (run tests, check output) → repeat or report. Verification is what makes delegation safe: if the agent proves its work with passing tests or checkable sources, you can review outcomes instead of supervising every step. Without verification you\'d have to re-check everything manually, which erases the time saved.',
    explanation:
      'The verify step is the difference between "AI that generates plausible output" and "an agent whose work you can trust at checkpoints." Delegation scales with verifiability.',
  },
]

const BUSINESS_QUESTIONS: Question[] = [
  {
    id: 'toolsland-biz-1',
    type: 'mc',
    question: 'Your operations team manually assembles a weekly report from five spreadsheets and a folder of emails. Which AI tool category fits best?',
    options: [
      'A chat assistant — paste the spreadsheets into the chat each week',
      'An agentic work app — delegate the whole assembly and review the draft',
      'A coding agent like Claude Code',
      'None — recurring reports must be done by hand for accuracy',
    ],
    correctIndex: 1,
    explanation:
      'Recurring, multi-source, well-defined output is exactly what agentic work apps are for. The agent operates on the files directly — no weekly copy-paste — and a human reviews the draft. Accuracy comes from the review checkpoint, not from doing it by hand.',
  },
  {
    id: 'toolsland-biz-2',
    type: 'mc',
    question: 'What is the most important skill shift for a team that starts delegating work to agentic AI tools?',
    options: [
      'Learning to write code',
      'Typing faster prompts',
      'Writing clear briefs and reviewing work at checkpoints — managing, not doing',
      'Memorizing each tool\'s menu options',
    ],
    correctIndex: 2,
    explanation:
      'Agentic tools turn doers into delegators. The quality of the brief (outcome, format, constraints) determines the quality of the output, and checkpoint review is where errors get caught cheaply. These are management skills, applied to AI.',
  },
]

export const ToolsLandscapeModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="tools-landscape" title="AI Tools Landscape" subtitle="The AI tools your teams should be using — and how to pick the right one for each job.">
        <KnowledgeCheck moduleId="toolslandscape-business" questions={translateQuestions(BUSINESS_QUESTIONS, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="tools-landscape" title="AI Tools Landscape" subtitle="Chat assistants, agentic work apps, coding agents — what tool for what job, and why.">
      <ToolCategoriesSection />
      <AgenticLoopSection />
      <ChoosingStackSection />
      <KnowledgeCheck moduleId="toolslandscape" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
```

(The business branch gets its sections in Task 5 — for now it renders just its KnowledgeCheck, which keeps every commit green.)

- [ ] **Step 5: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 6: Manual behavior check**

Run: `npm run dev`. In Use AI / Technical:
- Three sections render; category cards expand/collapse. ✔
- The terminal emulation steps through 4 commands with typing animation; "✓ All commands executed" at the end. ✔
- The InteractiveDemo pages through 4 scenarios; SelfExplain accepts text and reveals the model answer. ✔
- KnowledgeCheck: answer both questions, see explanations. ✔
Stop the dev server.

- [ ] **Step 7: Commit**

```bash
git add src/modules/toolslandscape src/modules/ToolsLandscapeModule.tsx
git commit -m "feat: Tools Landscape technical sections with agentic-loop emulation"
```

---

## Task 5: Business sections (3 components + module wiring)

**Files:**
- Create: `src/modules/toolslandscape/ToolCategoriesBusiness.tsx`
- Create: `src/modules/toolslandscape/DelegationDemoBusiness.tsx`
- Create: `src/modules/toolslandscape/PickingToolsBusiness.tsx`
- Modify: `src/modules/ToolsLandscapeModule.tsx`

- [ ] **Step 1: Create ToolCategoriesBusiness.tsx**

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Non-translatable per-category metadata. Order matches the `items` array in
// `useTranslation().modules.toolslandscape.categoriesBiz.items`.
const CATEGORY_META: { icon: IconName; color: string }[] = [
  { icon: 'chat', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'robot', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
  { icon: 'terminal', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
]

export const ToolCategoriesBusiness: React.FC = () => {
  const c = useTranslation().modules.toolslandscape.categoriesBiz
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="tool-categories-biz">
      <h2 id="tool-categories-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <div className="space-y-2">
        {c.items.map((item, i) => (
          <div key={item.name} className={`rounded-lg border ${CATEGORY_META[i]?.color ?? ''}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="flex items-center gap-2">
                <Icon name={CATEGORY_META[i]?.icon ?? 'box'} className="shrink-0 text-zinc-600 dark:text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400">— {item.tagline}</span>
              </div>
              <span className="text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{item.description}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400"><strong>{c.whenLabel}</strong> {item.when}</p>
                <p className="text-xs text-zinc-500"><strong className="text-zinc-600 dark:text-zinc-400">{c.toolsLabel}</strong> {item.tools}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-2xl rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.axisNote}</p>
    </section>
  )
}
```

- [ ] **Step 2: Create DelegationDemoBusiness.tsx**

```tsx
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { useTranslation } from '../../i18n'

export const DelegationDemoBusiness: React.FC = () => {
  const c = useTranslation().modules.toolslandscape.delegation

  return (
    <section aria-labelledby="delegation-demo">
      <h2 id="delegation-demo" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <InteractiveDemo
        title={c.title}
        steps={c.steps.map((s, i) => (
          <div key={i} className="space-y-3">
            <div className="inline-block rounded-full bg-purple-100 dark:bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">{i + 1}. {s.label}</div>
            <p className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{s.content}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">💡 {s.note}</p>
          </div>
        ))}
      />
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
    </section>
  )
}
```

- [ ] **Step 3: Create PickingToolsBusiness.tsx**

```tsx
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Order matches `scenarios` in useTranslation().modules.toolslandscape.pickingTools.
const SCENARIO_COLORS = [
  'border-blue-400 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5',
  'border-emerald-400 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5',
  'border-amber-400 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5',
  'border-purple-400 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/5',
]

export const PickingToolsBusiness: React.FC = () => {
  const c = useTranslation().modules.toolslandscape.pickingTools

  return (
    <section aria-labelledby="picking-tools">
      <h2 id="picking-tools" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <InteractiveDemo
        title={c.title}
        steps={c.scenarios.map((s, i) => (
          <div key={i} className={`rounded-lg border p-5 ${SCENARIO_COLORS[i]}`}>
            <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">&quot;{s.situation}&quot;</p>
            <div className="mb-3 inline-block rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">{c.recommendLabel} {s.pick}</div>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{s.why}</p>
          </div>
        ))}
      />
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Wire business sections into the module**

In `src/modules/ToolsLandscapeModule.tsx`, add three imports after the `ChoosingStackSection` import:

```tsx
import { ToolCategoriesBusiness } from './toolslandscape/ToolCategoriesBusiness'
import { DelegationDemoBusiness } from './toolslandscape/DelegationDemoBusiness'
import { PickingToolsBusiness } from './toolslandscape/PickingToolsBusiness'
```

Then in the `mode === 'business'` branch, insert the sections before the KnowledgeCheck:

```tsx
      <ModuleLayout moduleId="tools-landscape" title="AI Tools Landscape" subtitle="The AI tools your teams should be using — and how to pick the right one for each job.">
        <ToolCategoriesBusiness />
        <DelegationDemoBusiness />
        <PickingToolsBusiness />
        <KnowledgeCheck moduleId="toolslandscape-business" questions={translateQuestions(BUSINESS_QUESTIONS, lang)} />
      </ModuleLayout>
```

- [ ] **Step 5: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 6: Manual behavior check**

Run: `npm run dev`. In Use AI / Business:
- Three business sections render; the delegation demo steps through 5 stages. ✔
- Persona toggle flips between the two section sets without errors. ✔
- Both KnowledgeChecks work independently (separate `moduleId` keys). ✔
- Dark/light theme: spot-check both themes on the new sections. ✔
Stop the dev server.

- [ ] **Step 7: Commit**

```bash
git add src/modules/toolslandscape src/modules/ToolsLandscapeModule.tsx
git commit -m "feat: Tools Landscape business sections with delegation emulation"
```

---

## Task 6: Swedish + Korean translations (content tree)

**Files:**
- Modify: `src/i18n/sv.ts`
- Modify: `src/i18n/ko.ts`

Structure mirrors `en.ts`; omitted fields fall back to EN. Translate ALL prose fields. Tool names and product names stay untranslated.

- [ ] **Step 1: Add the `toolslandscape` subtree to sv.ts**

In `src/i18n/sv.ts`, inside `modules: {` — after the closing of the `alignment` entry (last entry before the final `},` `}` at file end) — add the full Swedish mirror of the EN tree from Task 3. Translate every `title`, `intro`, `description`, `when`, `tagline`, `why`, `pick`, `situation`, `label`, `content`, `note`, `takeaway`, `axisNote`, `whenLabel`, `toolsLabel`, `recommendLabel`, `stepNote`, `selfExplainPrompt`, `selfExplainAnswer` field. Keep `name` fields for categories translated naturally ('Chattassistenter', 'IDE-assistenter', 'Agentiska kodverktyg', 'Agentiska arbetsappar' / business: 'Chattassistenter', 'Agentiska arbetsappar', 'AI-verktyg för utvecklare'); keep `tools` values verbatim (product names).

Mark the block with `// MT` (machine-translated) comment per the file's convention:

```ts
    // MT
    toolslandscape: {
      categories: {
        title: '1. Verktygskategorierna',
        intro: 'AI-verktygsmarknaden ser rörig ut, men nästan allt faller inom fyra kategorier — definierade av hur mycket autonomi verktyget har och var det bor. Klicka på varje kategori för att utforska.',
        whenLabel: 'När du ska använda det:',
        toolsLabel: 'Verktyg:',
        items: [
          { name: 'Chattassistenter', tagline: 'Du frågar, den svarar', description: 'En konversationsyta. Du tar med kontexten, den står för resonemanget. Kraftfull för utkast, förklaringar, analys — men den agerar bara i chatten: inget händer i dina filer, repon eller appar om du inte kopierar dit det.', when: 'Frågor, utkast, analys, brainstorming — uppgifter där leveransen är text och du är med i varje steg.', tools: 'ChatGPT, Claude, Gemini' },
          { name: 'IDE-assistenter', tagline: 'Autocomplete som växte upp', description: 'Bor i din editor, ser filen du har öppen och föreslår kod inline. Låg autonomi: den föreslår, du accepterar. Utmärkt för att hålla flytet, svag när en ändring spänner över många filer.', when: 'Enfilsändringar, boilerplate, att lära sig ett okänt API medan du skriver.', tools: 'GitHub Copilot, Cursor inline-läge' },
          { name: 'Agentiska kodverktyg', tagline: 'En agent i din terminal & ditt repo', description: 'Du beskriver ett resultat; agenten planerar, läser din kodbas, redigerar flera filer, kör kommandon och tester och rapporterar tillbaka. Den arbetar i steg — tänk → agera → kontrollera — och du granskar vid kontrollpunkter.', when: 'Flerfilsfunktioner, refaktoreringar, felsökning, testtäckning — riktiga ingenjörsuppgifter du skulle ge en kollega.', tools: 'Claude Code, Kiro CLI' },
          { name: 'Agentiska arbetsappar', tagline: 'Delegera kontorsarbete, inte kod', description: 'Samma agentiska loop, riktad mot dokument, kalkylblad, research och arbetsflöden i stället för kod. Du delegerar en uppgift, agenten arbetar igenom den över filer och appar, och du övervakar resultatet.', when: 'Research och syntes, rapportutkast, datarensning, flerdokumentsarbete.', tools: 'Amazon Quick Desktop, Claude Cowork' },
        ],
        axisNote: 'Mönstret bakom kartan: när du går från chatt till agenter slutar verktyget svara och börjar göra. Ju mer autonomi, desto mer skiftar ditt jobb från att skriva till att granska.',
      },
      agenticLoop: {
        title: '2. Anatomin hos ett agentiskt verktyg',
        intro: 'Vad händer egentligen när du ger en uppgift till ett agentiskt kodverktyg? Kör sessionen nedan — en trogen simulering av en Claude Code-körning. Se loopen: förstå → planera → agera → verifiera.',
        stepNote: 'Varje kommando är ett varv i den agentiska loopen. Lägg märke till att agenten kontrollerar sitt eget arbete innan den rapporterar klart.',
        takeaway: 'Denna loop — planera, agera, verifiera, upprepa — är signaturen för varje agentiskt verktyg, oavsett om det redigerar kod eller ett kalkylblad. Skickligheten i att använda ett väl är mest skickligheten att skriva en tydlig uppgift och granska vid rätt kontrollpunkter.',
      },
      choosingStack: {
        title: '3. Välja din verktygslåda',
        intro: 'Fyra realistiska situationer. För var och en: vad skulle du välja? Stega igenom för att se resonemanget.',
        recommendLabel: 'Bästa valet:',
        scenarios: [
          { situation: 'Du behöver förstå en okänd kodbas på 50 000 rader tillräckligt för att fixa en bugg någonstans i auth-flödet.', pick: 'Agentiskt kodverktyg (Claude Code / Kiro)', why: 'Agenten kan söka i repot, spåra flödet över filer och förklara arkitekturen — och sedan fixa buggen och köra testerna. En chattassistent kan inte se ditt repo; en IDE-assistent ser bara den öppna filen.' },
          { situation: 'Du skriver ett engångsskript i Python för att tolka en CSV och vet exakt vad du vill ha.', pick: 'IDE-assistent — eller bara en chattassistent', why: 'Full agentisk autonomi är överdrivet för en uppgift du kan specificera helt och verifiera med en blick. Inline-komplettering håller flytet; en chattassistent kan skriva hela skriptet i ett svep.' },
          { situation: 'Du vill ha en andra åsikt om en systemdesign innan du bestämmer dig.', pick: 'Chattassistent (Claude, ChatGPT)', why: 'Detta är en resonemangs- och konversationsuppgift. Du vill iterera på idéer, utmana antaganden och utforska avvägningar — leveransen är förståelse, inte artefakter.' },
          { situation: 'Ditt team behöver uppdatera API-dokumentationen för 30 endpoints som ändrats detta kvartal.', pick: 'Agentiskt kodverktyg, övervakat', why: 'Repetitivt, flerfiligt, verifierbart — idealiskt agentarbete. Agenten läser varje endpoint, uppdaterar dokumentationen och du stickprovskontrollerar. Att göra detta för hand i en IDE-assistent betyder 30 manuella pass.' },
        ],
        selfExplainPrompt: 'Välj en verklig uppgift från din nuvarande vecka. Vilken verktygskategori passar bäst, och vad skulle du behöva specificera för att verktyget ska lyckas?',
        selfExplainAnswer: 'Exempel: "Migrera vår datumhantering från moment.js till date-fns" — agentiskt kodverktyg. Jag skulle specificera: biblioteken, att testerna måste passera efter varje fil och vilka kantfall (tidszoner) att vara försiktig med. Ju tydligare resultat och begränsningar, desto bättre presterar agenten.',
      },
      categoriesBiz: {
        title: '1. Verktygskategorierna',
        intro: 'Dina team använder redan AI — frågan är om de använder rätt sort för varje jobb. Nästan varje verktyg faller i en av tre kategorier. Klicka på varje för att utforska.',
        whenLabel: 'Använd det till:',
        toolsLabel: 'Verktyg:',
        items: [
          { name: 'Chattassistenter', tagline: 'En briljant kollega i ett chattfönster', description: 'Du ställer frågor, den svarar; du klistrar in material, den analyserar eller skriver om. Haken: den bara pratar. Inget hamnar i dina dokument eller system om inte någon kopierar dit det.', when: 'Utkast till mejl och dokument, sammanfattning av inklistrat material, brainstorming, snabb analys.', tools: 'ChatGPT, Claude, Gemini' },
          { name: 'Agentiska arbetsappar', tagline: 'En kapabel assistent du delegerar till', description: 'Du lämnar över en uppgift — "gör om dessa 30 intervjuer till en temarapport" — och AI:n arbetar igenom den: öppnar filer, extraherar, organiserar, skriver utkast. Du granskar vid kontrollpunkter i stället för att göra varje steg.', when: 'Research och syntes, återkommande rapporter, datarensning, alla flerdokumentsuppgifter som slukar timmar.', tools: 'Amazon Quick Desktop, Claude Cowork' },
          { name: 'AI-verktyg för utvecklare', tagline: 'Ditt ingenjörsteams kraftverktyg', description: 'Agenter som skriver och ändrar riktig kod under ingenjörsövervakning. Du behöver inte använda dessa själv — men du bör veta att ditt utvecklingsteam kan leverera betydligt snabbare med dem, och budgetera därefter.', when: 'Ingenjörsarbete: funktioner, buggfixar, kodmodernisering. (Dina utvecklare kör; du finansierar och mäter.)', tools: 'Claude Code, Kiro CLI, GitHub Copilot' },
        ],
        axisNote: 'Mönstret: chattassistenter svarar, agentiska verktyg gör. Ju mer verktyget gör, desto mer skiftar dina medarbetare från att utföra arbetet till att specificera och granska det — det är den verkliga arbetsflödesförändringen att hantera.',
      },
      delegation: {
        title: '2. Se en AI utföra arbete',
        intro: 'Det största mentala skiftet är från att chatta till att delegera. Stega igenom en verklig delegering till en agentisk arbetsapp — lägg märke till var människan behåller kontrollen.',
        steps: [
          { label: 'Du delegerar', content: '"Här är 30 transkript från kundintervjuer. Identifiera återkommande teman, ta fram två stödcitat per tema och skriv ett 2-sidigt sammandrag för produktteamet."', note: 'En bra delegering ser ut som en bra brief till en junior kollega: resultat, format, målgrupp.' },
          { label: 'Agenten planerar', content: 'Agenten föreslår en plan: läs alla 30 transkript → tagga smärtpunkter per transkript → klustra till teman → välj citat → skriv sammandraget. Den ställer en klargörande fråga: "Ska prisklagomål vara ett eget tema eller grupperas under ‘värde’?"', note: 'Du godkänner planen eller justerar den. Detta är din första kontrollpunkt — billigt att rätta nu, dyrt senare.' },
          { label: 'Agenten arbetar', content: 'Den bearbetar transkripten och visar framsteg: "14/30 lästa — 6 kandidat-teman växer fram." Du är fri att göra annat; den flaggar oklarheter i stället för att gissa.', note: 'Till skillnad från en chattassistent arbetar den faktiskt med dina filer — den väntar inte på att du ska klistra in innehåll.' },
          { label: 'Du granskar utkastet', content: 'Utkastet landar med teman, citat och en bilaga som kopplar varje påstående till sitt källtranskript. Du upptäcker ett tema som egentligen är två, och säger det. Agenten omstrukturerar och uppdaterar sammandraget.', note: 'Granskning är ditt verkliga jobb nu. De spårbara källorna är det som gör granskningen snabb.' },
          { label: 'Leveransen skickas', content: 'Färdigt 2-sidigt sammandrag, redo för produktteamet. Använd mänsklig tid: ~20 minuter briefing och granskning, i stället för två dagars läsande och skrivande.', note: 'Arbetet försvann inte — det bytte form: från att göra till att dirigera.' },
        ],
        takeaway: 'Delegeringskvalitet avgör resultatkvalitet. Teamen som får ut mest av agentiska verktyg är de som skriver tydliga briefer och granskar vid kontrollpunkter — exakt en bra chefs färdigheter.',
      },
      pickingTools: {
        title: '3. Välja verktyg för ditt team',
        intro: 'Fyra vanliga teamsituationer. Stega igenom var och en för att se vilken verktygskategori som passar och varför.',
        recommendLabel: 'Bästa valet:',
        scenarios: [
          { situation: 'Ditt säljteam lägger varje fredagseftermiddag på att sammanställa en pipelinerapport från CRM-exporter och samtalsanteckningar.', pick: 'Agentisk arbetsapp', why: 'Återkommande, flera källor, väldefinierat resultat — idealisk delegering. Agenten sammanställer utkastet från exporterna; en säljare granskar det på minuter. En chattassistent skulle kräva manuell inklistring varje vecka.' },
          { situation: 'Juridik behöver en första genomgång av inkommande NDA:er mot er standardspelbok.', pick: 'Agentisk arbetsapp — med obligatorisk mänsklig granskning', why: 'Agenten jämför varje NDA med spelboken och flaggar avvikelser med referenser. En jurist tar varje beslut. I domäner med höga insatser förblir människan beslutsfattaren; agenten eliminerar lästiden.' },
          { situation: 'Marknadsföring vill ha hjälp att vässa kampanjtexter och ämnesrader.', pick: 'Chattassistent', why: 'Kreativ iteration är konversation — generera alternativ, reagera, förfina. Inga filer att arbeta med, inget flerstegsarbetsflöde. Det enklaste verktyget som fungerar är rätt verktyg.' },
          { situation: 'Ingenjörsteamet säger att en omskrivning av legacysystemet tar tre kvartal.', pick: 'Agentiska kodverktyg för utvecklingsteamet', why: 'Modernisering är där kodagenter glänser: stort, repetitivt, testbart. Team som använder dem väl rapporterar dramatiska hastighetsökningar på exakt detta arbete. Din roll: finansiera verktygen, be om före/efter-mätvärden.' },
        ],
        selfExplainPrompt: 'Tänk på den mest repetitiva flerstegsuppgiften ditt team gör varje vecka. Skulle ni kunna delegera den till ett agentiskt verktyg? Skriv briefen på ett stycke som du skulle ge det.',
        selfExplainAnswer: 'Exempel: "Varje måndag sammanställer vi ett nyhetssammandrag om konkurrenter. Brief: skanna dessa 12 källor efter nyheter om konkurrenterna X, Y, Z från senaste veckan; gruppera per konkurrent; två meningars sammanfattning per post med länk; flagga allt om priser eller uppsägningar som brådskande; leverera som en sida." Tydliga källor, format och eskaleringsregel — det är en delegeringsklar brief.',
      },
    },
```

- [ ] **Step 2: Add the `toolslandscape` subtree to ko.ts**

Same structure in `src/i18n/ko.ts` (inside `modules: {`, after the last module entry), Korean translations, `// MT` marker:

```ts
    // MT
    toolslandscape: {
      categories: {
        title: '1. 도구 카테고리',
        intro: 'AI 도구 시장은 복잡해 보이지만, 거의 모든 것이 네 가지 카테고리로 나뉩니다 — 도구가 가진 자율성의 정도와 도구가 있는 위치로 정의됩니다. 각 카테고리를 클릭해 살펴보세요.',
        whenLabel: '이럴 때 사용:',
        toolsLabel: '도구:',
        items: [
          { name: '챗 어시스턴트', tagline: '묻고, 답을 받는다', description: '대화 화면입니다. 컨텍스트는 당신이, 추론은 AI가 제공합니다. 초안 작성, 설명, 분석에 강력하지만 채팅 안에서만 작동합니다: 복사하지 않는 한 파일, 저장소, 앱에서는 아무 일도 일어나지 않습니다.', when: '질문, 초안, 분석, 브레인스토밍 — 결과물이 텍스트이고 매 턴마다 사람이 개입하는 작업.', tools: 'ChatGPT, Claude, Gemini' },
          { name: 'IDE 어시스턴트', tagline: '성장한 자동완성', description: '에디터 안에 살면서 열려 있는 파일을 보고 인라인으로 코드를 제안합니다. 낮은 자율성: AI가 제안하고 당신이 수락합니다. 흐름을 유지하기에 좋지만 변경이 여러 파일에 걸치면 약합니다.', when: '단일 파일 편집, 보일러플레이트, 입력하면서 낯선 API 배우기.', tools: 'GitHub Copilot, Cursor 인라인 모드' },
          { name: '에이전틱 코딩 도구', tagline: '터미널과 저장소 안의 에이전트', description: '원하는 결과를 설명하면 에이전트가 계획하고, 코드베이스를 읽고, 여러 파일을 수정하고, 명령과 테스트를 실행하고, 보고합니다. 생각 → 행동 → 확인 단계로 일하며 체크포인트에서 검토합니다.', when: '여러 파일에 걸친 기능, 리팩토링, 디버깅, 테스트 커버리지 — 동료에게 맡길 만한 실제 엔지니어링 작업.', tools: 'Claude Code, Kiro CLI' },
          { name: '에이전틱 업무 앱', tagline: '코드가 아닌 사무 업무를 위임', description: '같은 에이전틱 루프를 코드 대신 문서, 스프레드시트, 리서치, 워크플로우에 적용합니다. 작업을 위임하면 에이전트가 파일과 앱을 오가며 처리하고, 당신은 결과를 감독합니다.', when: '리서치와 종합, 보고서 초안, 데이터 정리, 다중 문서 작업.', tools: 'Amazon Quick Desktop, Claude Cowork' },
        ],
        axisNote: '지도 뒤의 패턴: 챗에서 에이전트로 갈수록 도구는 답하기를 멈추고 실행하기 시작합니다. 자율성이 클수록 당신의 일은 쓰기에서 검토하기로 옮겨갑니다.',
      },
      agenticLoop: {
        title: '2. 에이전틱 도구의 해부학',
        intro: '에이전틱 코딩 도구에 작업을 맡기면 실제로 무슨 일이 일어날까요? 아래 세션을 실행해 보세요 — Claude Code 실행의 충실한 시뮬레이션입니다. 루프를 관찰하세요: 이해 → 계획 → 행동 → 검증.',
        stepNote: '각 명령은 에이전틱 루프의 한 턴입니다. 에이전트가 완료를 보고하기 전에 자기 작업을 스스로 확인하는 것에 주목하세요.',
        takeaway: '이 루프 — 계획, 행동, 검증, 반복 — 는 코드를 수정하든 스프레드시트를 수정하든 모든 에이전틱 도구의 시그니처입니다. 잘 사용하는 기술은 대부분 명확한 작업을 작성하고 올바른 체크포인트에서 검토하는 기술입니다.',
      },
      choosingStack: {
        title: '3. 나의 도구 스택 고르기',
        intro: '네 가지 현실적인 상황입니다. 각각에 대해: 무엇을 선택하겠습니까? 단계를 넘기며 추론을 확인하세요.',
        recommendLabel: '최적의 선택:',
        scenarios: [
          { situation: '낯선 5만 줄 코드베이스에서 인증 흐름 어딘가의 버그를 고칠 만큼 이해해야 합니다.', pick: '에이전틱 코딩 도구 (Claude Code / Kiro)', why: '에이전트는 저장소를 검색하고, 파일을 넘나들며 흐름을 추적하고, 아키텍처를 설명한 다음 버그를 고치고 테스트를 실행할 수 있습니다. 챗 어시스턴트는 저장소를 볼 수 없고, IDE 어시스턴트는 열린 파일만 봅니다.' },
          { situation: 'CSV를 파싱하는 일회용 Python 스크립트를 작성 중이고 원하는 것을 정확히 알고 있습니다.', pick: 'IDE 어시스턴트 — 또는 그냥 챗 어시스턴트', why: '완전히 명세할 수 있고 한눈에 검증 가능한 작업에 완전한 에이전트 자율성은 과합니다. 인라인 완성은 흐름을 유지하고, 챗 어시스턴트는 스크립트 전체를 한 번에 쓸 수 있습니다.' },
          { situation: '시스템 설계를 확정하기 전에 두 번째 의견이 필요합니다.', pick: '챗 어시스턴트 (Claude, ChatGPT)', why: '이것은 추론과 대화 작업입니다. 아이디어를 반복하고, 가정에 도전하고, 트레이드오프를 탐색하고 싶을 때 — 결과물은 산출물이 아니라 이해입니다.' },
          { situation: '이번 분기에 변경된 30개 엔드포인트에 맞춰 API 문서를 업데이트해야 합니다.', pick: '에이전틱 코딩 도구, 감독하에', why: '반복적이고, 여러 파일에 걸치고, 검증 가능 — 이상적인 에이전트 작업입니다. 에이전트가 각 엔드포인트를 읽고 문서를 업데이트하면 당신은 표본 검사합니다. IDE 어시스턴트로 직접 하면 30번의 수동 작업입니다.' },
        ],
        selfExplainPrompt: '이번 주의 실제 작업 하나를 골라 보세요. 어떤 도구 카테고리가 가장 적합하며, 도구가 성공하려면 무엇을 명시해야 할까요?',
        selfExplainAnswer: '예시: "날짜 처리를 moment.js에서 date-fns로 마이그레이션" — 에이전틱 코딩 도구. 명시할 것: 관련 라이브러리, 파일마다 테스트 통과 필수, 주의할 엣지 케이스(시간대). 결과와 제약이 명확할수록 에이전트 성능이 좋아집니다.',
      },
      categoriesBiz: {
        title: '1. 도구 카테고리',
        intro: '팀은 이미 AI를 사용하고 있습니다 — 문제는 각 작업에 맞는 종류를 쓰고 있는가입니다. 거의 모든 도구는 세 카테고리 중 하나입니다. 각각 클릭해 살펴보세요.',
        whenLabel: '용도:',
        toolsLabel: '도구:',
        items: [
          { name: '챗 어시스턴트', tagline: '채팅창 속 뛰어난 동료', description: '질문하면 답하고, 자료를 붙여넣으면 분석하거나 다시 써 줍니다. 함정: 말만 합니다. 누군가 복사하지 않는 한 문서나 시스템에는 아무것도 반영되지 않습니다.', when: '이메일·문서 초안, 붙여넣은 자료 요약, 브레인스토밍, 빠른 분석.', tools: 'ChatGPT, Claude, Gemini' },
          { name: '에이전틱 업무 앱', tagline: '위임할 수 있는 유능한 비서', description: '작업을 넘기면 — "이 인터뷰 30개를 테마 보고서로 만들어줘" — AI가 처리합니다: 파일 열기, 추출, 정리, 초안 작성. 모든 단계를 직접 하는 대신 체크포인트에서 검토합니다.', when: '리서치와 종합, 반복 보고서, 데이터 정리, 시간을 잡아먹는 다중 문서 작업.', tools: 'Amazon Quick Desktop, Claude Cowork' },
          { name: '개발자 AI 도구', tagline: '엔지니어링 팀의 파워 툴', description: '엔지니어 감독하에 실제 코드를 작성하고 변경하는 에이전트입니다. 직접 다룰 필요는 없지만 개발팀이 이 도구로 훨씬 빠르게 출시할 수 있다는 것을 알고 그에 맞게 예산을 잡아야 합니다.', when: '엔지니어링 작업: 기능, 버그 수정, 코드 현대화. (개발자가 운전하고, 당신은 지원하고 측정합니다.)', tools: 'Claude Code, Kiro CLI, GitHub Copilot' },
        ],
        axisNote: '패턴: 챗 어시스턴트는 답하고, 에이전틱 도구는 실행합니다. 도구가 더 많이 할수록 구성원의 일은 직접 수행에서 명세와 검토로 옮겨갑니다 — 이것이 관리해야 할 진짜 워크플로우 변화입니다.',
      },
      delegation: {
        title: '2. AI가 일하는 모습 지켜보기',
        intro: '가장 큰 사고 전환은 채팅에서 위임으로의 전환입니다. 에이전틱 업무 앱에 실제 위임하는 과정을 단계별로 따라가 보세요 — 사람이 어디서 통제권을 유지하는지 주목하세요.',
        steps: [
          { label: '위임한다', content: '"여기 고객 인터뷰 녹취록 30개가 있습니다. 반복되는 테마를 찾고, 테마당 근거 인용 두 개를 뽑고, 제품팀을 위한 2페이지 요약을 작성하세요."', note: '좋은 위임은 주니어 동료에게 주는 좋은 브리프와 같습니다: 결과물, 형식, 대상.' },
          { label: '에이전트가 계획한다', content: '에이전트가 계획을 제안합니다: 30개 녹취록 읽기 → 녹취록별 페인 포인트 태깅 → 테마로 클러스터링 → 인용 선택 → 요약 초안. 명확화 질문도 하나 합니다: "가격 불만은 별도 테마인가요, ‘가치’ 아래로 묶나요?"', note: '계획을 승인하거나 조정합니다. 첫 체크포인트입니다 — 지금 고치면 싸고, 나중엔 비�쌉니다.' },
          { label: '에이전트가 일한다', content: '녹취록을 처리하며 진행 상황을 보여줍니다: "14/30 읽음 — 후보 테마 6개 등장." 당신은 다른 일을 해도 됩니다; 애매한 것은 추측하지 않고 표시합니다.', note: '챗 어시스턴트와 달리 실제로 파일을 다루며 작업합니다 — 내용을 붙여넣어 주기를 기다리지 않습니다.' },
          { label: '초안을 검토한다', content: '테마, 인용, 그리고 모든 주장을 출처 녹취록에 연결한 부록과 함께 초안이 도착합니다. 하나의 테마가 사실 둘이라는 것을 발견하고 말합니다. 에이전트가 재구성하고 요약을 업데이트합니다.', note: '이제 검토가 당신의 진짜 일입니다. 추적 가능한 출처가 검토를 빠르게 만듭니다.' },
          { label: '결과물이 나간다', content: '제품팀에 바로 줄 수 있는 최종 2페이지 요약. 사용한 사람의 시간: 이틀의 읽기와 쓰기 대신 브리핑과 검토 약 20분.', note: '일이 사라진 게 아닙니다 — 형태가 바뀌었습니다: 하기에서 지휘하기로.' },
        ],
        takeaway: '위임의 질이 결과물의 질을 결정합니다. 에이전틱 도구에서 가장 많은 것을 얻는 팀은 명확한 브리프를 쓰고 체크포인트에서 검토하는 팀입니다 — 바로 좋은 관리자의 기술입니다.',
      },
      pickingTools: {
        title: '3. 팀을 위한 도구 고르기',
        intro: '흔한 팀 상황 네 가지입니다. 각각 단계를 넘기며 어떤 도구 카테고리가 맞는지, 왜인지 확인하세요.',
        recommendLabel: '최적의 선택:',
        scenarios: [
          { situation: '영업팀이 매주 금요일 오후를 CRM 내보내기와 통화 메모로 파이프라인 요약을 만드는 데 씁니다.', pick: '에이전틱 업무 앱', why: '반복적이고, 출처가 여럿이고, 결과물이 명확함 — 이상적인 위임입니다. 에이전트가 내보내기에서 초안을 조립하고 담당자가 몇 분 만에 검토합니다. 챗 어시스턴트라면 매주 수동으로 붙여넣어야 합니다.' },
          { situation: '법무팀이 들어오는 NDA를 표준 플레이북과 대조해 1차 검토해야 합니다.', pick: '에이전틱 업무 앱 — 필수 인간 검토와 함께', why: '에이전트가 각 NDA를 플레이북과 비교하고 근거와 함께 이탈 사항을 표시합니다. 모든 판단은 변호사가 합니다. 고위험 영역에서는 사람이 의사결정자로 남고, 에이전트는 읽는 시간을 없애줍니다.' },
          { situation: '마케팅이 캠페인 문구와 제목을 다듬는 데 도움을 원합니다.', pick: '챗 어시스턴트', why: '창의적 반복은 대화입니다 — 옵션 생성, 반응, 다듬기. 다룰 파일도, 다단계 워크플로우도 없습니다. 작동하는 가장 단순한 도구가 옳은 도구입니다.' },
          { situation: '엔지니어링팀이 레거시 시스템 재작성에 세 분기가 걸린다고 합니다.', pick: '개발팀을 위한 에이전틱 코딩 도구', why: '현대화는 코딩 에이전트가 빛나는 곳입니다: 크고, 반복적이고, 테스트 가능합니다. 잘 쓰는 팀은 바로 이런 작업에서 극적인 속도 향상을 보고합니다. 당신의 역할: 도구에 투자하고 전후 지표를 요구하기.' },
        ],
        selfExplainPrompt: '팀이 매주 하는 가장 반복적인 다단계 작업을 떠올려 보세요. 에이전틱 도구에 위임할 수 있을까요? 도구에 줄 한 단락짜리 브리프를 써 보세요.',
        selfExplainAnswer: '예시: "매주 월요일 경쟁사 뉴스 다이제스트를 만듭니다. 브리프: 이 12개 출처에서 지난주 경쟁사 X, Y, Z 관련 뉴스를 스캔; 경쟁사별로 그룹화; 항목당 링크 포함 두 문장 요약; 가격이나 구조조정 관련은 긴급으로 표시; 한 페이지로 출력." 명확한 출처, 형식, 에스컬레이션 규칙 — 그것이 위임 준비가 된 브리프입니다.',
      },
    },
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS. (`DeepPartial<Translation>` will catch any structural mismatch against the EN tree — fix any reported key typos.)

- [ ] **Step 4: Manual check**

Run: `npm run dev`. In Use AI, switch SV → all section prose is Swedish (terminal commands stay English — expected). Switch KO → Korean. Switch back EN. Both personas. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/sv.ts src/i18n/ko.ts
git commit -m "i18n: Swedish + Korean for Tools Landscape module"
```

---

## Task 7: Quiz + SelfExplain translations (legacy mechanism)

**Files:**
- Modify: `src/quiz-translations.ts`
- Modify: `src/selfexplain-translations.ts`

- [ ] **Step 1: Add quiz translations**

In `src/quiz-translations.ts`, after the `// Agents (technical)` block (end of file additions, before the `// Helper:` comment at line ~301), add:

```ts
// Tools Landscape (Use AI course)
quizSv['toolsland-1'] = { question: 'Du behöver byta namn på en konfigurationsnyckel som förekommer i ~40 filer i ett repo, och uppdatera tester längs vägen. Vilket verktyg passar bäst, och varför?', options: ['En chattassistent — klistra in varje fil och applicera ändringarna den föreslår', 'En IDE-assistent — acceptera inline-förslag fil för fil', 'Ett agentiskt kodverktyg — det kan söka i repot, redigera alla filer och köra testerna självt', 'Ingen AI — flerfilsändringar är för riskabla för AI'], explanation: 'Detta är den typiska agentiska koduppgiften: flerfilig, mekanisk och verifierbar med tester. En chattassistent kan inte se repot, en IDE-assistent arbetar en fil i taget. Testsviten är skyddsnätet som gör agentautonomi säker här.' }
quizSv['toolsland-2'] = { question: 'Beskriv den agentiska loopen (cykeln ett agentiskt verktyg kör för varje uppgift) och förklara varför verifieringssteget förändrar hur mycket du säkert kan delegera.', modelAnswer: 'Loopen är: förstå uppgiften → planera → agera (redigera filer, köra kommandon) → verifiera (köra tester, kontrollera resultat) → upprepa eller rapportera. Verifiering är det som gör delegering säker: om agenten bevisar sitt arbete med passerande tester eller kontrollerbara källor kan du granska resultat i stället för att övervaka varje steg. Utan verifiering måste du kontrollera allt manuellt, vilket raderar tidsvinsten.', options: undefined, explanation: 'Verifieringssteget är skillnaden mellan "AI som genererar trovärdig output" och "en agent vars arbete du kan lita på vid kontrollpunkter."' }
quizSv['toolsland-biz-1'] = { question: 'Ert operationsteam sammanställer manuellt en veckorapport från fem kalkylblad och en mapp med mejl. Vilken AI-verktygskategori passar bäst?', options: ['En chattassistent — klistra in kalkylbladen i chatten varje vecka', 'En agentisk arbetsapp — delegera hela sammanställningen och granska utkastet', 'En kodagent som Claude Code', 'Ingen — återkommande rapporter måste göras för hand för noggrannhet'], explanation: 'Återkommande, flera källor, väldefinierat resultat är exakt vad agentiska arbetsappar är till för. Agenten arbetar direkt med filerna och en människa granskar utkastet. Noggrannheten kommer från granskningskontrollpunkten, inte från handarbete.' }
quizSv['toolsland-biz-2'] = { question: 'Vilket är det viktigaste kompetensskiftet för ett team som börjar delegera arbete till agentiska AI-verktyg?', options: ['Lära sig koda', 'Skriva prompts snabbare', 'Skriva tydliga briefer och granska arbete vid kontrollpunkter — leda, inte göra', 'Memorera varje verktygs menyalternativ'], explanation: 'Agentiska verktyg förvandlar utförare till delegerare. Briefens kvalitet avgör resultatets kvalitet, och kontrollpunktsgranskning är där fel fångas billigt. Detta är ledarskapsfärdigheter, tillämpade på AI.' }

quizKo['toolsland-1'] = { question: '저장소의 ~40개 파일에 나타나는 설정 키 이름을 바꾸고 테스트도 함께 업데이트해야 합니다. 어떤 도구가 가장 적합하며, 왜인가요?', options: ['챗 어시스턴트 — 각 파일을 붙여넣고 제안된 수정을 적용', 'IDE 어시스턴트 — 파일별로 인라인 제안 수락', '에이전틱 코딩 도구 — 저장소를 검색하고, 모든 파일을 수정하고, 테스트를 직접 실행 가능', 'AI 없이 — 여러 파일 변경은 AI에게 너무 위험'], explanation: '이것은 전형적인 에이전틱 코딩 작업입니다: 여러 파일, 기계적, 테스트로 검증 가능. 챗 어시스턴트는 저장소를 볼 수 없고 IDE 어시스턴트는 한 번에 한 파일만 작업합니다. 테스트 스위트가 에이전트 자율성을 안전하게 만드는 안전망입니다.' }
quizKo['toolsland-2'] = { question: '에이전틱 루프(에이전틱 도구가 각 작업마다 실행하는 사이클)를 설명하고, 검증 단계가 안전하게 위임할 수 있는 양을 어떻게 바꾸는지 설명하세요.', modelAnswer: '루프: 작업 이해 → 계획 → 행동(파일 수정, 명령 실행) → 검증(테스트 실행, 출력 확인) → 반복 또는 보고. 검증이 위임을 안전하게 만듭니다: 에이전트가 통과하는 테스트나 확인 가능한 출처로 작업을 증명하면 모든 단계를 감독하는 대신 결과만 검토할 수 있습니다. 검증이 없으면 모든 것을 수동으로 재확인해야 하므로 절약한 시간이 사라집니다.', options: undefined, explanation: '검증 단계는 "그럴듯한 출력을 생성하는 AI"와 "체크포인트에서 신뢰할 수 있는 에이전트"의 차이입니다.' }
quizKo['toolsland-biz-1'] = { question: '운영팀이 스프레드시트 5개와 이메일 폴더에서 주간 보고서를 수동으로 만듭니다. 어떤 AI 도구 카테고리가 가장 적합한가요?', options: ['챗 어시스턴트 — 매주 스프레드시트를 채팅에 붙여넣기', '에이전틱 업무 앱 — 조립 전체를 위임하고 초안 검토', 'Claude Code 같은 코딩 에이전트', '없음 — 반복 보고서는 정확성을 위해 수작업 필수'], explanation: '반복적이고, 출처가 여럿이고, 결과물이 명확한 작업은 에이전틱 업무 앱의 전형입니다. 에이전트가 파일을 직접 다루고 사람이 초안을 검토합니다. 정확성은 수작업이 아니라 검토 체크포인트에서 나옵니다.' }
quizKo['toolsland-biz-2'] = { question: '에이전틱 AI 도구에 업무를 위임하기 시작하는 팀에게 가장 중요한 역량 전환은?', options: ['코딩 배우기', '프롬프트 빨리 입력하기', '명확한 브리프 작성과 체크포인트 검토 — 직접 하기가 아닌 관리하기', '각 도구의 메뉴 옵션 외우기'], explanation: '에이전틱 도구는 실행자를 위임자로 바꿉니다. 브리프의 질(결과물, 형식, 제약)이 출력의 질을 결정하고, 체크포인트 검토에서 오류를 저렴하게 잡습니다. 이것은 AI에 적용된 관리 기술입니다.' }
```

- [ ] **Step 2: Add SelfExplain translations**

In `src/selfexplain-translations.ts`, add to the `sv` record (before its closing `}` at line 25) — keys are the FIRST 50 CHARACTERS of the English prompts. For prompt 1, `'Pick a real task from your current week. Which too'`; for prompt 2, `'Think of the most repetitive multi-step task your '`:

```ts
  'Pick a real task from your current week. Which too': { prompt: 'Välj en verklig uppgift från din nuvarande vecka. Vilken verktygskategori passar bäst, och vad skulle du behöva specificera för att verktyget ska lyckas?', modelAnswer: 'Exempel: "Migrera vår datumhantering från moment.js till date-fns" — agentiskt kodverktyg. Jag skulle specificera: biblioteken, att testerna måste passera efter varje fil och vilka kantfall (tidszoner) att vara försiktig med. Ju tydligare resultat och begränsningar, desto bättre presterar agenten.' },
  'Think of the most repetitive multi-step task your ': { prompt: 'Tänk på den mest repetitiva flerstegsuppgiften ditt team gör varje vecka. Skulle ni kunna delegera den till ett agentiskt verktyg? Skriv briefen på ett stycke som du skulle ge det.', modelAnswer: 'Exempel: "Varje måndag sammanställer vi ett nyhetssammandrag om konkurrenter. Brief: skanna dessa 12 källor efter nyheter om konkurrenterna X, Y, Z; gruppera per konkurrent; två meningars sammanfattning per post med länk; flagga allt om priser eller uppsägningar som brådskande." Tydliga källor, format och eskaleringsregel.' },
```

And to the `ko` record (before its closing `}` at line 64):

```ts
  'Pick a real task from your current week. Which too': { prompt: '이번 주의 실제 작업 하나를 골라 보세요. 어떤 도구 카테고리가 가장 적합하며, 도구가 성공하려면 무엇을 명시해야 할까요?', modelAnswer: '예시: "날짜 처리를 moment.js에서 date-fns로 마이그레이션" — 에이전틱 코딩 도구. 명시할 것: 관련 라이브러리, 파일마다 테스트 통과 필수, 주의할 엣지 케이스(시간대). 결과와 제약이 명확할수록 에이전트 성능이 좋아집니다.' },
  'Think of the most repetitive multi-step task your ': { prompt: '팀이 매주 하는 가장 반복적인 다단계 작업을 떠올려 보세요. 에이전틱 도구에 위임할 수 있을까요? 도구에 줄 한 단락짜리 브리프를 써 보세요.', modelAnswer: '예시: "매주 월요일 경쟁사 뉴스 다이제스트를 만듭니다. 브리프: 12개 출처에서 경쟁사 뉴스 스캔; 경쟁사별 그룹화; 항목당 링크 포함 두 문장 요약; 가격·구조조정 관련은 긴급 표시." 명확한 출처, 형식, 에스컬레이션 규칙.' },
```

IMPORTANT — key verification: the lookup is `prompt.slice(0, 50)`. Before committing, verify each key in `node`:

```bash
node -e "
const p1 = 'Pick a real task from your current week. Which tool category fits it best, and what would you have to specify for the tool to succeed?'
const p2 = 'Think of the most repetitive multi-step task your team does every week. Could you delegate it to an agentic tool? Write the one-paragraph brief you would give it.'
console.log(JSON.stringify(p1.slice(0,50)))
console.log(JSON.stringify(p2.slice(0,50)))
"
```

Expected output (the keys you must use, exactly):
```
"Pick a real task from your current week. Which too"
"Think of the most repetitive multi-step task your "
```
(Note the trailing space in the second key.) If your en.ts prompts differ from the above, recompute and use the actual slice.

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 4: Manual check**

Run: `npm run dev`. In Use AI, SV language: quiz questions render in Swedish in both personas; both SelfExplain prompts render in Swedish. Repeat for KO. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/quiz-translations.ts src/selfexplain-translations.ts
git commit -m "i18n: SV/KO quiz and SelfExplain translations for Tools Landscape"
```

---

## Task 8: Full regression + Phase 1 gate

**Files:** none (verification only)

- [ ] **Step 1: Clean build + lint**

Run: `npm run build && npm run lint`
Expected: both PASS, no warnings.

- [ ] **Step 2: Full manual regression**

Run: `npm run dev` and confirm ALL of:
- **Understand AI course unchanged:** 18 technical / 10 business modules, no Tools Landscape in either persona. ✔
- **Use AI course:** exactly 1 module in both personas. Progress bar shows 1/1 = 100% after visiting. ✔
- **Spec's Phase 1 verify line:** switch course → see new module; persona toggle filters (here: switches section sets); quiz works in both personas. ✔
- **Emulation criterion (mantra):** technical has the SimulatedTerminal session; business has the step-through delegation demo. Both are interactive, not prose. ✔
- **Deep links:** `#/use/business/tools-landscape` loads the business view directly; legacy `#/technical/tokens` still resolves to Understand AI. ✔
- **i18n:** EN/SV/KO all render across sidebar label, module header, sections, quizzes, SelfExplains. ✔
- **Theme:** new sections look correct in dark AND light mode. ✔
- **Spaced Review:** complete the technical quiz, then check the review counter increments (new `toolslandscape` check keys feed the existing pipeline automatically). ✔
Stop the dev server.

- [ ] **Step 3: Commit any regression fixups**

```bash
git add -A
git commit -m "fix: Phase 1 regression fixups"
```

---

## Self-Review Notes (for the implementer)

- **Spec coverage:** Implements spec Phase 1 fully — module 1 (AI Tools Landscape, B+T), i18n wiring (EN inline in en.ts + SV/KO), KnowledgeCheck for both personas, and TWO emulations (SimulatedTerminal for technical, InteractiveDemo step-through for business; spec requires ≥1). CourseBridge is spec Phase 2 — deliberately NOT in this plan; the categories sections will get a bridge to Industry Map then.
- **i18n split-brain:** Module *content* uses the NEW `useTranslation()` tree; sidebar labels use BOTH `ui-labels.ts` (`MODULE_LABELS`, read by App.tsx + ModuleLayout) and `en.ts` `moduleLabels` (forward-looking, keeps the canonical tree complete); quiz/SelfExplain use the LEGACY translation files because `KnowledgeCheck`/`SelfExplain` still call legacy helpers. This mirrors exactly how recently-migrated modules (e.g. alignment, datafoundations) are wired today. Do not "fix" this inconsistency in this phase.
- **KnowledgeCheck moduleId:** `toolslandscape` / `toolslandscape-business` (no hyphen between words, matching `datafoundations` convention; distinct from the registry id `tools-landscape`).
- **Type safety net:** `DeepPartial<Translation>` in sv/ko means a typo'd key fails the build — trust the compiler in Task 6.
- **SelfExplain key trap:** the legacy lookup is by `prompt.slice(0, 50)` — Task 7 Step 2 includes the verification command; the second key ends with a trailing space.
- **`as const` arrays:** `c.items.map(...)` / `c.scenarios.map(...)` on `as const` arrays is fine — existing sections (KeyPlayersBusiness, DecisionBusiness) already do this.
- **Sampling params note for terminal content:** the simulated Claude Code transcript is illustrative fiction; no need to match any real CLI output format exactly.
