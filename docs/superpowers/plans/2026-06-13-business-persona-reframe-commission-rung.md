# Business-Persona Reframe + "Commission a Tool" Rung — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reshape the "Use AI" course's **business persona** from "manager at a SaaS company" toward "a non-technical knowledge worker / operator in any industry and country," and add a new fourth rung to the skill ladder — **commissioning a small no-code/low-code tool**, the step beyond delegating a one-off task. The course should make a clinic front-desk lead, a restaurant owner, a school administrator, or a finance back-office analyst think *"oh — I could do this in my operations"* and then know *how*.

**Architecture:** Two phases, each independently shippable.
- **Phase 1 (new feature):** A new conceptual section **"4. When a Task Wants to Be a Tool"** in the business-only **Agentic Work** module (the "agentic part of the business track"), plus a lighter technical counterpart section **"4. From Editing Code to Spinning Up Tools"** in the technical-only **Agentic Coding** module. Each adds an i18n subtree, a React section component following shipped patterns, module wiring (renumbering the existing "Steal This" capstone to "5."), one new knowledge-check question, and SV/KO translations.
- **Phase 2 (editorial sweep):** A targeted set of verbatim example swaps across the business branches of shared/business-only Use-course modules, re-centering the most corporate-SaaS-skewing scenarios onto cross-industry operators. EN edited in `en.ts`, mirrored in `sv.ts`/`ko.ts`, plus two business quiz questions.

**Tool-naming convention:** The course already names representative products in short "Tools:" lines (ChatGPT, Claude, Claude Code, Amazon Quick Desktop, Claude Cowork, Kiro). The new commission content stays **mostly tool-agnostic** — it teaches *categories* ("AI app builders," "agentic work apps that produce artifacts," "describe-it-and-it-builds tools") and does **not** build the course around any specific product or around the author's personal demos. No new product names beyond the generic categories.

**Tech Stack:** React 19, TypeScript strict, Vite 8, Tailwind v4 (every color uses a `dark:` pairing). Translations use the unified `useTranslation()` tree (`src/i18n/{en,sv,ko}.ts`) with `DeepPartial<Translation>` fallback to EN; quiz translations live in `src/quiz-translations.ts` keyed by question ID; self-explain translations in `src/selfexplain-translations.ts` keyed by the first ~50 chars of the EN prompt. Template/code strings stay English by convention and live as module-level consts in the `.tsx`. Gates: `npm run build && npm run lint` + headless browser check (memory `browser-verification-setup`). Deploy + verifier-artifact cleanup per memory `deploy-llm-academy`.

**Conventions to match (verified in the codebase):**
- Card-list section: see `src/modules/agenticwork/WhatIsAgenticWorkSection.tsx` — `useState<number|null>` expand, `ITEM_META` array of `{icon: IconName, color}` whose order matches `c.items`, `aria-labelledby`, `<h2>` `font-mono text-xl`, intro `<p>`, amber takeaway box.
- Step walkthrough: see `src/modules/toolslandscape/PickingToolsBusiness.tsx` and `src/modules/agenticwork/DelegateSuperviseSection.tsx` — `InteractiveDemo` with `steps={c.steps.map(...)}` or `c.scenarios.map(...)`, then a `SelfExplain` with `prompt`/`modelAnswer`.
- Self-explain: `<SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />`.
- Available icon names (from `src/components/Icon.tsx`): includes `build`, `wrench`, `rocket`, `puzzle`, `target`, `lightbulb`, `package`, `box`, `compass`, `robot`, `people`, `cycle`, `chat`, `gear`, `scissors`, `clipboard`, `bolt`, `block`.
- SV is du-form, KO is 합니다체. App/product names and copyable template code stay verbatim English.

---

## Phase 1 — The "Commission a Tool" Rung

### Task 1: English content tree — two new subtrees

**Files:**
- Modify: `src/i18n/en.ts`

- [ ] **Step 1: Add the business subtree.** Inside `modules.agenticwork`, insert this entry **after** the `guardrails` entry and **before** `briefLibrary` (so the conceptual section precedes the steal-this capstone). Exact content:

```ts
    // 4. When a Task Wants to Be a Tool (business — the "commission" rung)
    taskToTool: {
      title: '4. When a Task Wants to Be a Tool',
      intro:
        'Delegating hands an agent a job once. But when the same job comes back every week, you can now do something that used to need a developer and a budget: ask AI to build you a small tool — a form, a tracker, a calculator, a one-page app — that you and your team reuse. The skill is the same briefing you just learned; the deliverable is bigger. Click each idea.',
      items: [
        {
          name: 'Delegating vs commissioning',
          tagline: 'A job done once vs a tool you keep',
          description:
            'Delegation gets one task done: "reconcile this month\'s expenses." Commissioning gets you the thing that does it every month: "build me an expense-checker I can drop next month\'s sheet into." When a delegation keeps repeating, that is the signal it wants to become a tool.',
        },
        {
          name: 'What "no-code" actually means now',
          tagline: 'Describe it, don\'t build it',
          description:
            'You no longer need to write software or hire someone to get a small internal tool. You describe what you want in plain language — the fields, the rule, the output — and an AI app builder produces a working app you can click. It is the same move as briefing a task; the output just happens to be software.',
        },
        {
          name: 'Spotting a tool-shaped task',
          tagline: 'Recurring + manual + structured',
          description:
            'A task wants to be a tool when three things are true: you do it again and again, it is fiddly by hand, and it has structure — the same fields and steps every time. The intake form you re-key, the weekly sheet you rebuild, the checklist you copy and tweak — those are tools waiting to be asked for, in a clinic, a restaurant, a school office, or a finance back office alike.',
        },
        {
          name: 'Your role does not change',
          tagline: 'You still direct and review',
          description:
            'Commissioning a tool is the same discipline as delegating a task: a clear brief, a checkpoint where you try what it built, and you owning the result before anyone relies on it. You do not become a programmer — you become someone who can get software made. The fear that "this is for technical people" ends exactly here.',
        },
      ],
      walkthroughTitle: 'From a daily grind to a tool you own',
      stepLabel: 'Step',
      steps: [
        {
          label: 'The recurring pain',
          content:
            'A clinic front desk re-keys every new patient\'s details from a paper form into three different screens, then writes a short summary by hand. Twenty minutes a patient, dozens of times a week — the same fields, every single time.',
          note: 'This is not one task to delegate; it repeats forever. That is the tell.',
        },
        {
          label: 'You recognize the shape',
          content:
            'Recurring, manual, and structured — the same nine fields and the same summary, over and over. That is a tool-shaped task. You stop thinking "who can I hand this to?" and start thinking "what could just do this?"',
          note: 'The recognition is the skill. The building is now the easy part.',
        },
        {
          label: 'You describe the tool',
          content:
            '"Build a simple intake form with these nine fields. Validate the phone number and the ID format. When I submit, show me a one-paragraph summary plus a clean row I can paste into our sheet. Keep everything on the page — no data leaves it." You are briefing, not coding.',
          note: 'Same four-part brief as a delegation: context, what you want, the format, the constraints.',
        },
        {
          label: 'You review what it built',
          content:
            'Minutes later there is a working form. You try it with one real (anonymized) case, fix a field label that read wrong, and ask for the summary to be two sentences shorter. It updates. You reviewed the output exactly the way you review a delegated draft.',
          note: 'The checkpoint is unchanged — you just happen to be reviewing an app instead of a document.',
        },
        {
          label: 'The team uses it',
          content:
            'The front desk now fills one form instead of re-keying three screens. Twenty minutes became two. You commissioned it in an afternoon, with no developer and no budget request — and you can change it tomorrow by asking.',
          note: 'A restaurant owner could do the same for supplier orders; a school office for permission slips. The pattern travels.',
        },
      ],
      takeaway:
        'The ladder has four rungs: use AI well, save your best prompts, delegate whole tasks, and — when a task keeps coming back — commission a small tool that does it for you. Each rung is the same skill (a clear brief and a real review), pointed at a bigger deliverable.',
      selfExplainPrompt:
        'Think of one task you or your team redo by hand every week that has the same shape each time. Describe, in plain language, the small tool you would ask an AI to build for it — the inputs, the rule or steps, and the output you want back.',
      selfExplainAnswer:
        'Example: "Every Friday our restaurant tallies the week\'s supplier deliveries against the order sheet to catch shortfalls. Tool: a page where I paste the order list and the delivery notes; it matches them line by line, flags anything short or overcharged with the difference, and gives me a one-line summary plus a list to send the supplier. Nothing leaves the page." Inputs, a clear rule, a checkable output — that is a commission-ready brief, and it is the same brief you would write to delegate the task, just asking for the tool instead of the result.',
    },
```

- [ ] **Step 2: Add the technical subtree.** Inside `modules.agenticcoding`, insert this entry **after** the `effectively` entry and **before** `stealThisSetup`. Exact content:

```ts
    // 4. From Editing Code to Spinning Up Tools (technical — the "commission" rung)
    spinUpTools: {
      title: '4. From Editing Code to Spinning Up Tools',
      intro:
        'You have driven an agent through an existing repo. The same agent is just as good at zero-to-one — and that quietly changes your defaults. The cost of a small internal tool, script, or dashboard has collapsed, so the question shifts from "is this worth building?" to "what would I build if it were nearly free?" Click each shift.',
      items: [
        {
          name: 'Zero-to-one, not just edits',
          tagline: 'Greenfield is now cheap',
          description:
            'Agents scaffold a working app from one paragraph as readily as they refactor an old one. The internal tool you have lived without — the log triager, the on-call dashboard, the data-munging UI — is now an afternoon, not a quarter. Build the thing you would previously have skipped.',
        },
        {
          name: 'Right-size the stack',
          tagline: 'Match ceremony to lifespan',
          description:
            'A tool nobody outside the team will see does not need your production framework. A single-file app, a script, or a no-code/low-code builder often beats a full project. Reserve the heavy stack for what ships to users; let throwaway tools be throwaway.',
        },
        {
          name: 'A small tool is a small spec',
          tagline: 'Same scoping discipline',
          description:
            'Commissioning a tool from an agent uses the exact habits from the last section: a clear outcome, the constraints that matter, a definition of done. "Build a CLI that tails these logs, groups errors by stack signature, and prints the top 10" is a complete brief — scope it once, let it run, review the result.',
        },
        {
          name: 'Know the no-code line',
          tagline: 'Sometimes you are the wrong builder',
          description:
            'Not every internal tool should be code you maintain. For a form a non-technical colleague will own, or a one-off UI, an AI app builder hands them something they can change themselves — no pull request, no you in the loop. Knowing when to hand off to no-code is its own engineering judgment.',
        },
      ],
      takeaway:
        'The agent that edits your repo also collapses the cost of building from scratch. Lower your bar for what is worth making, right-size the stack to the tool\'s lifespan, and know when the better answer is a no-code builder your colleague owns instead of code you maintain.',
      selfExplainPrompt:
        'Name one small internal tool you have wanted but never built because it was not worth the time. What is the one-paragraph spec you would now hand an agent — and would you build it as code you own or as a no-code app a teammate owns?',
      selfExplainAnswer:
        'Example: "A dashboard that polls our CI and flags tests that flaked more than twice this week. Spec: read the last 200 runs from the CI API, group failures by test name, list any test with ≥2 non-deterministic failures, sorted by frequency, refreshed on load. I would build it as a single-file app I own, because it touches our CI token and I want it in our repo — but the triage notes form the QA lead wants attached to each flake, that I would hand off to a no-code builder so they can change the fields without me."',
    },
```

- [ ] **Step 3: Verify the tree compiles.**

Run: `cd ~/projects/llm-academy && npm run build`
Expected: PASS (TypeScript compiles; the new keys widen the `Translation` type so the section components in Task 2 can reference them).

- [ ] **Step 4: Commit.**

```bash
cd ~/projects/llm-academy
git add src/i18n/en.ts
git commit -m "feat(use-ai): EN content for the commission-a-tool rung (biz + tech)"
```

---

### Task 2: Section components + module wiring

**Files:**
- Create: `src/modules/agenticwork/TaskToToolSection.tsx`
- Create: `src/modules/agenticcoding/SpinUpToolsSection.tsx`
- Modify: `src/modules/AgenticWorkModule.tsx`
- Modify: `src/modules/AgenticCodingModule.tsx`

- [ ] **Step 1: Create the business section component.** It pairs a card list (like `WhatIsAgenticWorkSection`) with an `InteractiveDemo` walkthrough and a `SelfExplain` (like `DelegateSuperviseSection`). Full file:

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.agenticwork.taskToTool.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'cycle', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'build', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'puzzle', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'people', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

const STEP_COLORS = [
  'border-blue-400 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/5',
  'border-emerald-400 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5',
  'border-amber-400 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5',
  'border-purple-400 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/5',
  'border-rose-400 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/5',
]

export const TaskToToolSection: React.FC = () => {
  const c = useTranslation().modules.agenticwork.taskToTool
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="task-to-tool">
      <h2 id="task-to-tool" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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

      <div className="mt-8">
        <InteractiveDemo
          title={c.walkthroughTitle}
          steps={c.steps.map((s, i) => (
            <div key={i} className={`rounded-lg border p-5 ${STEP_COLORS[i % STEP_COLORS.length]}`}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{c.stepLabel} {i + 1} — {s.label}</p>
              <p className="mb-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{s.content}</p>
              <p className="text-xs italic text-zinc-600 dark:text-zinc-400">{s.note}</p>
            </div>
          ))}
        />
      </div>

      <p className="mt-6 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>

      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create the technical section component.** Card list + takeaway + self-explain (no walkthrough, keeping it the lighter counterpart). Full file:

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.agenticcoding.spinUpTools.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'rocket', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'ruler', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'clipboard', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'scissors', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const SpinUpToolsSection: React.FC = () => {
  const c = useTranslation().modules.agenticcoding.spinUpTools
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="spin-up-tools">
      <h2 id="spin-up-tools" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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

      <p className="mt-6 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>

      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
```

Note: `ruler` is a confirmed icon name in `Icon.tsx`. If the build flags any icon name as not in `IconName`, substitute `gear` (also confirmed) and continue.

- [ ] **Step 3: Wire the business section into the module.** In `src/modules/AgenticWorkModule.tsx`, add the import and render `<TaskToToolSection />` between `<GuardrailsSection />` and `<BriefLibrarySection />`.

Add to the import block (after the `GuardrailsSection` import):
```tsx
import { TaskToToolSection } from './agenticwork/TaskToToolSection'
```

Change the render body from:
```tsx
      <WhatIsAgenticWorkSection />
      <DelegateSuperviseSection />
      <GuardrailsSection />
      <BriefLibrarySection />
```
to:
```tsx
      <WhatIsAgenticWorkSection />
      <DelegateSuperviseSection />
      <GuardrailsSection />
      <TaskToToolSection />
      <BriefLibrarySection />
```

- [ ] **Step 4: Wire the technical section into the module.** In `src/modules/AgenticCodingModule.tsx`, add the import and render `<SpinUpToolsSection />` between `<WorkingEffectivelySection />` and `<StealThisSetupSection />`.

Add to the import block (after the `WorkingEffectivelySection` import):
```tsx
import { SpinUpToolsSection } from './agenticcoding/SpinUpToolsSection'
```

Change the render body from:
```tsx
      <CodingAgentDifferentSection />
      <RealSessionSection />
      <WorkingEffectivelySection />
      <StealThisSetupSection />
```
to:
```tsx
      <CodingAgentDifferentSection />
      <RealSessionSection />
      <WorkingEffectivelySection />
      <SpinUpToolsSection />
      <StealThisSetupSection />
```

- [ ] **Step 5: Renumber the existing "Steal This" capstones to "5."** The two new sections take the "4." slot, so the existing capstones shift to "5." Edit `en.ts` only (SV/KO renumbering happens in Task 4):
  - `modules.agenticwork.briefLibrary.title`: `'4. A Brief You Can Steal'` → `'5. A Brief You Can Steal'`
  - `modules.agenticcoding.stealThisSetup.title`: `'4. Steal This Setup'` → `'5. Steal This Setup'`

- [ ] **Step 6: Run the gate.**

Run: `cd ~/projects/llm-academy && npm run build && npm run lint`
Expected: PASS, no type or lint errors.

- [ ] **Step 7: Browser-verify both sections render.** Per memory `browser-verification-setup` (use cached playwright shell 1217 via `executablePath`). Start the dev server, then load the two routes and confirm the new section headings appear and a card expands.

Run: `cd ~/projects/llm-academy && npm run dev &` then drive the headless browser to:
- `#/use/business/agentic-work` — assert text "When a Task Wants to Be a Tool" is present, click the first card, assert "A job done once vs a tool you keep" detail shows, step the `InteractiveDemo` to step 5, assert "The team uses it" appears.
- `#/use/technical/agentic-coding` — assert "From Editing Code to Spinning Up Tools" is present, click the first card, assert "Greenfield is now cheap" detail shows.

Expected: both assertions pass. Kill the dev server when done.

- [ ] **Step 8: Commit.**

```bash
cd ~/projects/llm-academy
git add src/modules/agenticwork/TaskToToolSection.tsx src/modules/agenticcoding/SpinUpToolsSection.tsx src/modules/AgenticWorkModule.tsx src/modules/AgenticCodingModule.tsx src/i18n/en.ts
git commit -m "feat(use-ai): render commission-a-tool sections; renumber steal-this to 5"
```

---

### Task 3: Knowledge-check questions (EN)

**Files:**
- Modify: `src/modules/AgenticWorkModule.tsx`
- Modify: `src/modules/AgenticCodingModule.tsx`

- [ ] **Step 1: Add a business question.** In `AgenticWorkModule.tsx`, append this object to the `QUESTIONS` array (after `agwork-2`):

```tsx
  {
    id: 'agwork-3',
    type: 'mc',
    question: 'You have delegated the same weekly inventory-reconciliation task to an agent four weeks running. What is the higher-leverage next move?',
    options: [
      'Keep delegating it each week — it works fine',
      'Ask an AI app builder to make you a small reusable tool that does the reconciliation, then review and keep it',
      'Hire a developer to build a custom system',
      'Go back to doing it by hand to stay in control',
    ],
    correctIndex: 1,
    explanation:
      'A delegation that repeats every week with the same shape is the signal it wants to become a tool. No-code/low-code app builders let you commission a reusable tool by describing it — same brief, bigger deliverable. You still review what it builds and own the result; you do not need a developer or a budget request.',
  },
```

- [ ] **Step 2: Add a technical question.** In `AgenticCodingModule.tsx`, append this object to the `QUESTIONS` array (after `agcode-2`):

```tsx
  {
    id: 'agcode-3',
    type: 'mc',
    question: 'A non-technical colleague needs a small internal form they will own and tweak themselves. You could build it as a single-file app in your repo or point them at a no-code app builder. What is the better default, and why?',
    options: [
      'Always build it yourself in the repo — code you own is always better',
      'A no-code builder, so they can change the fields without a PR or you in the loop — reserve code-you-maintain for what touches secrets or ships to users',
      'Refuse — non-technical people should not own tools',
      'Build it in your production framework so it is robust',
    ],
    correctIndex: 1,
    explanation:
      'Match ceremony to lifespan and ownership. A form a colleague will own and edit is better as a no-code app they control than as code that routes every change through you. Keep code-you-maintain for tools that touch credentials, need your repo, or ship to real users. Knowing when to hand off to no-code is its own engineering judgment.',
  },
```

- [ ] **Step 3: Gate + browser-verify the questions appear.**

Run: `cd ~/projects/llm-academy && npm run build && npm run lint`
Expected: PASS.

Then (dev server) confirm the new MC question renders at the end of each module's "Check Your Understanding" and that selecting the correct option shows its explanation. The new questions will appear untranslated in SV/KO until Task 4 — that is expected (the `translateQuestions` helper falls back to EN).

- [ ] **Step 4: Commit.**

```bash
cd ~/projects/llm-academy
git add src/modules/AgenticWorkModule.tsx src/modules/AgenticCodingModule.tsx
git commit -m "feat(use-ai): knowledge-check questions for the commission rung"
```

---

### Task 4: SV/KO translations for Phase 1

**Files:**
- Modify: `src/i18n/sv.ts`
- Modify: `src/i18n/ko.ts`
- Modify: `src/quiz-translations.ts`

- [ ] **Step 1: Mirror the two new i18n subtrees in `sv.ts`.** Insert `taskToTool` in `modules.agenticwork` (after `guardrails`, before `briefLibrary`) and `spinUpTools` in `modules.agenticcoding` (after `effectively`, before `stealThisSetup`), translating **every** prose field from the EN in Task 1: `title`, `intro`, each `items[].{name,tagline,description}` (4 items each), `walkthroughTitle`, `stepLabel`, each `steps[].{label,content,note}` (5 steps, business only), `takeaway`, `selfExplainPrompt`, `selfExplainAnswer`. SV is du-form. Keep these **verbatim/untranslated**: nothing here contains product names or code, so translate all of it naturally. Also renumber the existing capstone titles: `agenticwork.briefLibrary.title` → `'5. ...'` and `agenticcoding.stealThisSetup.title` → `'5. ...'` (Swedish wording, "5." prefix). Array lengths must match EN exactly (`items[4]`, `steps[5]`); `DeepPartial<Translation>` enforces structure but not length, so count them.

- [ ] **Step 2: Mirror both subtrees in `ko.ts`** identically to Step 1, KO 합니다체, same positions, same field coverage, same renumbering of the two capstone titles to "5.".

- [ ] **Step 3: Add quiz translations.** In `src/quiz-translations.ts`, add SV and KO entries for the two new question IDs, following the existing `quizSv['...'] = {...}` / `quizKo['...'] = {...}` line format (translate `question`, all four `options`, and `explanation`; `modelAnswer`/`options: undefined` not needed for MC):
  - `quizSv['agwork-3']`, `quizKo['agwork-3']`
  - `quizSv['agcode-3']`, `quizKo['agcode-3']`

  Place them near the existing `agwork-*` / `agcode-*` entries for locality.

- [ ] **Step 4: Add self-explain translations.** Both new sections use `SelfExplain`, which looks up `src/selfexplain-translations.ts` by the first ~50 chars of the EN prompt. Add SV and KO entries:
  - Key (first 50 chars of business prompt): `'Think of one task you or your team redo by hand e'` — wait, the lookup uses the EXACT prefix the helper slices. Confirm the slice length in `translateSelfExplain` before keying; match the existing entries' key style (they are the leading substring of the EN prompt). Add `sv[...]` and `ko[...]` (or the file's `quizSv`-equivalent maps) for both the business prompt (`'Think of one task you or your team redo by hand...'`) and the technical prompt (`'Name one small internal tool you have wanted but...'`), each with translated `prompt` and `modelAnswer`.

  If a prompt has no entry, `SelfExplain` falls back to EN — acceptable but not the bar; add both.

- [ ] **Step 5: Gate.**

Run: `cd ~/projects/llm-academy && npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 6: Browser-verify SV + KO.** Switch language to Swedish, load `#/use/business/agentic-work` and `#/use/technical/agentic-coding`, confirm the new sections, walkthrough steps, takeaways, self-explain, and new quiz question all render in Swedish (no English leakage). Repeat for Korean.

- [ ] **Step 7: Commit.**

```bash
cd ~/projects/llm-academy
git add src/i18n/sv.ts src/i18n/ko.ts src/quiz-translations.ts src/selfexplain-translations.ts
git commit -m "i18n: Swedish + Korean for the commission-a-tool rung"
```

---

## Phase 2 — Re-center the Business Examples on Cross-Industry Operators

Targeted, verbatim example swaps. Each shifts a corporate-SaaS scenario onto an operator a clinic/restaurant/school/finance-back-office reader recognizes, and lowers the "this is for technical people" barrier. Only business-branch strings are touched; technical branches are left alone.

### Task 5: The delegation walkthrough + tool-picker scenarios

**Files:**
- Modify: `src/i18n/en.ts`

- [ ] **Step 1: Reframe the Agentic Work delegation demo's opening brief** so the central walkthrough is recognizable to a non-corporate operator. In `modules.agenticwork.delegateSupervise.steps[0]` (`label: 'You brief the task'`), the EN currently uses an expense-report-vs-travel-policy example. Keep that one (it is already operator-neutral — expenses exist everywhere). **No change needed here** — verified the existing content is industry-neutral. Skip.

- [ ] **Step 2: Diversify the `toolslandscape.pickingTools` business scenarios.** Replace the four `scenarios` entries (currently sales pipeline / legal NDA / marketing copy / engineering rewrite — three of four read corporate) with an industry-spread set. Replace the `scenarios` array in `modules.toolslandscape.pickingTools` with:

```ts
      scenarios: [
        {
          situation: 'A clinic\'s front desk spends every afternoon assembling the next day\'s appointment list from the booking system, cancellation emails, and handwritten notes.',
          pick: 'Agentic work app',
          why: 'Recurring, multi-source, well-defined output — ideal delegation. The agent assembles the list from the sources; a staff member reviews it in minutes. A chat assistant would mean pasting everything in by hand each day.',
        },
        {
          situation: 'A school office must check every incoming field-trip consent form against the district\'s policy before the trip is approved.',
          pick: 'Agentic work app — with mandatory human review',
          why: 'The agent compares each form to the policy and flags anything missing or non-compliant with a reference. A staff member makes the final call. High-stakes checks keep the human as decision-maker; the agent kills the reading time.',
        },
        {
          situation: 'A restaurant owner wants help punching up the menu descriptions and a few social posts for the new seasonal dishes.',
          pick: 'Chat assistant',
          why: 'Creative iteration is conversation — generate options, react, refine. No files to operate on, no multi-step workflow. The simplest tool that works is the right tool.',
        },
        {
          situation: 'A finance back office reconciles hundreds of supplier invoices against purchase orders every month and the work is swallowing the team.',
          pick: 'Agentic work app (and, if it recurs, a commissioned tool)',
          why: 'Repetitive, structured, checkable — ideal agent work, and a strong candidate to graduate into a small reusable tool. The agent matches invoices to orders and flags mismatches; a person reviews the exceptions.',
        },
      ],
```

- [ ] **Step 3: Update the matching `pickingTools` self-explain** so its example is not sales-team-specific. Replace `modules.toolslandscape.pickingTools.selfExplainAnswer` with:

```ts
      selfExplainAnswer:
        'Example: "Every Monday our clinic compiles a no-show and follow-up list from the week\'s appointments. Brief: scan last week\'s booking export, list every missed appointment grouped by provider, note which need a follow-up call, two-line summary up top; flag anything marked urgent. Output as one page." Clear sources, format, and an escalation rule — that is a delegation-ready brief, and if it repeats every week it is also a tool waiting to be commissioned.',
```

- [ ] **Step 4: Gate + commit.**

Run: `cd ~/projects/llm-academy && npm run build && npm run lint`
Expected: PASS.
```bash
cd ~/projects/llm-academy
git add src/i18n/en.ts
git commit -m "content(use-ai): re-center business tool-picker scenarios on cross-industry operators"
```

---

### Task 6: Optimizing-Workflow business examples + starter-kit bracket

**Files:**
- Modify: `src/i18n/en.ts`
- Modify: `src/modules/workingwithai/StarterKitSection.tsx`

- [ ] **Step 1: Diversify the `optimizingworkflow.oneOffToSystem` walkthrough.** It currently uses a "pipeline report → exec email" frame and a "board update" self-explain. Replace `modules.optimizingworkflow.oneOffToSystem.steps[0]` content/note and `selfExplainAnswer` with operator-relatable versions. Replace `steps[0]`:

```ts
        {
          label: 'The weekly grind',
          content:
            'Every Monday a school office rebuilds the same attendance-and-events digest for parents: open three spreadsheets, paste the highlights into the chat, re-explain the format, fix the tone, reformat for the newsletter. Ninety minutes, every week, from scratch.',
          note: 'You are re-paying the full setup cost every single time. That is the waste.',
        },
```

And replace `modules.optimizingworkflow.oneOffToSystem.selfExplainAnswer`:

```ts
      selfExplainAnswer:
        'Example: "Monthly family newsletter. Saved brief: context (who reads it, what they care about), the three-section format, the warm-but-brief tone. Project contents: the events calendar export, last month\'s newsletter for continuity, the school voice note. Then \'draft this month\'s newsletter\' starts from everything it needs." And if a step in it is the same every month, that step is a candidate to commission as a small tool.',
```

- [ ] **Step 2: Neutralize the starter-kit role-bracket example.** In `src/modules/workingwithai/StarterKitSection.tsx`, the `CUSTOM_INSTRUCTIONS` template's first bracket reads `[your role, e.g. "customer success lead at a 40-person B2B SaaS"]` — a corporate-only example, and this section renders in **both** personas. Change that single line to:

```
- Role: [your role, e.g. "office manager at a dental clinic" or "ops lead at a logistics firm"]
```

(Template code stays English by convention — this is the canonical English source, no translation needed.)

- [ ] **Step 3: Gate + browser-verify the starter kit still copies.**

Run: `cd ~/projects/llm-academy && npm run build && npm run lint`
Expected: PASS.
Then confirm in-browser that the Copy button on the starter-kit custom-instructions block still produces "✓ Copied" and the new role line is present.

- [ ] **Step 4: Commit.**

```bash
cd ~/projects/llm-academy
git add src/i18n/en.ts src/modules/workingwithai/StarterKitSection.tsx
git commit -m "content(use-ai): operator-relatable examples in optimizing-workflow + starter kit"
```

---

### Task 7: Business quiz questions + SV/KO for Phase 2

**Files:**
- Modify: `src/modules/WorkingWithAIModule.tsx`
- Modify: `src/i18n/sv.ts`
- Modify: `src/i18n/ko.ts`
- Modify: `src/quiz-translations.ts`
- Modify: `src/selfexplain-translations.ts`

- [ ] **Step 1: De-corporate one business quiz example.** In `src/modules/WorkingWithAIModule.tsx`, `BUSINESS_QUESTIONS` question `workai-biz-2` uses "I run customer success at a SaaS company". Change that phrase in both the `question` string and the `explanation` to an operator-neutral example. New `question`:

```tsx
    question: 'You find yourself typing "I manage the front office at a dental clinic, keep it concise and friendly" at the start of every chat. What should you do?',
```

Leave `correctIndex` and options unchanged; the options/explanation are already role-agnostic. (Verify the explanation text does not itself name SaaS — it does not.)

- [ ] **Step 2: Mirror all Phase-2 EN edits in `sv.ts` and `ko.ts`.** Update the matching strings to keep the translation trees in sync with EN:
  - `toolslandscape.pickingTools.scenarios` (4 entries) — full re-translation of the new clinic/school/restaurant/finance scenarios (Task 5 Step 2) and the new `selfExplainAnswer` (Task 5 Step 3).
  - `optimizingworkflow.oneOffToSystem.steps[0]` and `selfExplainAnswer` (Task 6 Step 1).
  SV du-form, KO 합니다체.

- [ ] **Step 3: Update the changed self-explain translations.** The `pickingTools` and `oneOffToSystem` self-explain prompts are **unchanged** (only the model answers changed), so their keys in `src/selfexplain-translations.ts` are stable. Update the `modelAnswer` values for those two keys in both `sv` and `ko` maps to match the new EN answers.

- [ ] **Step 4: Update the changed business quiz translation.** In `src/quiz-translations.ts`, update `quizSv['workai-biz-2']` and `quizKo['workai-biz-2']` `question` strings to the new dental-clinic phrasing.

- [ ] **Step 5: Gate + browser-verify EN/SV/KO.**

Run: `cd ~/projects/llm-academy && npm run build && npm run lint`
Expected: PASS.
Then confirm in all three languages: the new tool-picker scenarios, the optimizing-workflow walkthrough step, and the edited quiz question render with no English leakage in SV/KO.

- [ ] **Step 6: Commit.**

```bash
cd ~/projects/llm-academy
git add src/modules/WorkingWithAIModule.tsx src/i18n/sv.ts src/i18n/ko.ts src/quiz-translations.ts src/selfexplain-translations.ts
git commit -m "content+i18n(use-ai): operator-relatable business quiz + SV/KO sync for re-examation"
```

---

### Task 8: Final regression, deploy, and cleanup

**Files:** none (verification + deploy)

- [ ] **Step 1: Full gate.**

Run: `cd ~/projects/llm-academy && npm run build && npm run lint`
Expected: PASS, clean.

- [ ] **Step 2: Cross-persona / cross-language smoke test.** Per memory `browser-verification-setup`, walk all affected routes in EN/SV/KO:
  - `#/use/business/agentic-work` (new section #4, capstone now #5)
  - `#/use/technical/agentic-coding` (new section #4, capstone now #5)
  - `#/use/business/tools-landscape` (new scenarios)
  - `#/use/business/optimizing-workflow` (new walkthrough step)
  - `#/use/business/working-with-ai` (new starter-kit role line + edited quiz)
  Assert: no English leakage in SV/KO, section numbering reads 1–5 in the two touched modules, all `InteractiveDemo` steppers and card expanders work, all three new quiz questions grade correctly, Copy buttons still fire.

- [ ] **Step 3: Verifier-artifact cleanup.** Per memory `deploy-llm-academy`: ensure no stray playwright dependency landed in `package.json` and remove any `test-results/` directory before deploy. Run `git status` and confirm only intended files changed.

- [ ] **Step 4: Deploy.** Per memory `deploy-llm-academy` (S3 + CloudFront commands).

- [ ] **Step 5: Final commit (if cleanup changed anything).**

```bash
cd ~/projects/llm-academy
git add -A
git commit -m "chore(use-ai): pre-deploy cleanup for business-persona reframe"
```

---

## Self-Review

**Spec coverage:**
- "Reframe business persona toward non-technical operator, fear-lowering" → Phase 2 Tasks 5–7 (cross-industry scenarios, operator role bracket, de-SaaS'd quiz) + Phase 1 business section's explicit "the fear that this is for technical people ends here" framing. ✓
- "Commission rung as the agentic part of the business track" → Task 1–4, `taskToTool` section in Agentic Work. ✓
- "Technical version / at least follows along priority" → `spinUpTools` section in Agentic Coding (lighter: cards + self-explain, no full walkthrough). ✓
- "Don't weave in specific demos or product names" → tool-agnostic category language throughout the new content; no Lovable / Quick Apps / Cowork / clinic-admin-app references. ✓
- "Cross-industry, cross-country examples" → clinic, restaurant, school office, finance back office, logistics across the new + swapped content; relevant to KO/SV readers via the trilingual build. ✓
- SV/KO parity → Tasks 4 and 7. ✓

**Placeholder scan:** All new EN prose is verbatim in the plan. SV/KO follow the established "translate this exact EN, du-form/합니다체, keep array lengths" task pattern from the shipped pro-tips plan — mechanical, not a placeholder. One open verification noted explicitly (Task 4 Step 4: confirm the self-explain key-slice length in `translateSelfExplain` before keying) rather than guessed.

**Type/name consistency:** New i18n keys `agenticwork.taskToTool` and `agenticcoding.spinUpTools` are referenced identically in their components. Component names `TaskToToolSection` / `SpinUpToolsSection` match their imports and file paths. Quiz IDs `agwork-3` / `agcode-3` are unique (existing go to `-2`). Icon names (`cycle`, `build`, `puzzle`, `people`, `rocket`, `ruler`, `clipboard`, `scissors`) are all confirmed present in `Icon.tsx`, with a documented fallback. `InteractiveDemo` is uncontrolled (no `currentStep`), matching `PickingToolsBusiness` usage, so it renders its own stepper.

**Scope note:** Phase 2 is a *targeted* set of high-impact swaps, not a full rewrite of every business string — chosen because the most corporate-skewing, learner-facing scenarios drive the persona's "feel," and a wholesale rewrite would be lower-ROI and higher-regression. If after shipping the track still reads corporate in spots, a follow-up pass can extend the same swap pattern to `delegateSupervise`, `briefing`, and `rollItOut`.
