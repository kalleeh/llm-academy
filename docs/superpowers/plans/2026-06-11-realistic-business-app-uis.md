# Realistic Business App UIs (Quick Desktop / Cowork / ChatGPT / Claude) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Give the "Use AI" course's business emulations the same realism treatment the coding terminals got — but as *app windows that look like the real products*. The four business demos that depict **using a tool** get product-distinct, toggleable skins:
- **Agentic-work demos** (`toolslandscape.delegation` "Watching an AI Do Work", `agenticwork.delegateSupervise" "Delegate and Supervise") → a **WorkAppWindow** with an **Amazon Quick Desktop ⇄ Claude Cowork** toggle.
- **Chat demos** (`workingwithai.vagueToValuable` "From Vague to Valuable", `optimizingworkflow.oneOffToSystem` "From One-Off to a System") → a **ChatWindow** with a **ChatGPT ⇄ Claude** toggle.

The two remaining business `InteractiveDemo`s (`toolslandscape.pickingTools`, `genaibeyondtext.pickTheTool`) are decision matrices ("which tool for which job"), NOT interfaces — they stay as cards, untouched.

**Architecture (mirrors the CLI work):** Build three NEW components and leave the shared `InteractiveDemo` (used by the two decision-matrix demos + nothing else after this) untouched:
1. `AppSession` — generic toggle wrapper: a product segmented control + render-prop for the active variant (same role `AgentSession` played for CLIs).
2. `WorkAppWindow` — agentic-work-app chrome (Quick Desktop vs Cowork), driven by progressive step reveal.
3. `ChatWindow` — chat-assistant chrome (ChatGPT vs Claude), message bubbles + composer.

**Content stays translated.** Both window components consume the EXISTING i18n step arrays (`c.steps` = `{label, content, note}[]`, already in EN/SV/KO) and a small per-demo *structural* array (kinds/roles) authored in the section `.tsx`. So no teaching content moves to English and no SV/KO translation work is needed beyond ONE new `appToggleLabel` string per section. This is the key difference from the CLI transcripts (which were literal code/commands and stayed English).

**Tech Stack:** React 19, TS strict, Vite 8, Tailwind v4 (dark: pairing). Chrome is pure Tailwind, no external assets. Gates: `npm run build && npm run lint` + headless browser + screenshots (memory `browser-verification-setup`); deploy + artifact cleanup per memory `deploy-llm-academy`.

---

## Product chrome reference (visual identity)

| Product | Titlebar | Accent | Mark glyph | Used by |
|---|---|---|---|---|
| Amazon Quick Desktop | `bg-slate-800` (cool navy) | orange (`text-orange-400`, `bg-orange-500`) | `▦` square-grid | work-app demos |
| Claude Cowork | `bg-stone-700` (warm) | clay (`text-orange-300`, `bg-orange-600`) | `✻` | work-app demos |
| ChatGPT | `bg-zinc-800` | emerald (`text-emerald-400`, `bg-emerald-600`) | `◯` ring | chat demos |
| Claude | `bg-stone-700` (warm) | clay (`text-orange-300`, `bg-orange-600`) | `✻` | chat demos |

Cool-navy (Quick Desktop / ChatGPT-zinc) vs warm-stone (Cowork / Claude) + different marks make the toggle visibly switch products. Every colored class needs a `dark:` counterpart; these chrome colors are dark-surface by design (app windows render on a dark canvas like the terminal), so use the color at full strength and pair only where a light-mode container shows through.

---

## Task 1: AppSession generic toggle wrapper

**Files:** Create `src/components/AppSession.tsx`

Mirrors `AgentSession` but generic: takes tabs + a render-prop. Read `src/components/AgentSession.tsx` first for the toggle styling to match.

```tsx
import { useState } from 'react'
import type { ReactNode } from 'react'

export interface AppTab { id: string; label: string }

interface AppSessionProps {
  tabs: AppTab[]
  /** Translated a11y label for the product toggle. */
  toggleLabel: string
  /** Render the active variant's window. Use the id as a React key for clean reset on switch. */
  children: (activeId: string) => ReactNode
}

export const AppSession: React.FC<AppSessionProps> = ({ tabs, toggleLabel, children }) => {
  const [active, setActive] = useState(tabs[0].id)
  return (
    <div className="space-y-2">
      <div className="flex gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5" role="group" aria-label={toggleLabel}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            aria-pressed={active === t.id}
            className={`flex-1 rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors ${
              active === t.id
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {children(active)}
    </div>
  )
}
```

- [ ] **Step 1:** Create the file with the exact code above.
- [ ] **Step 2:** `npm run build && npm run lint` → PASS (unused until Task 3).
- [ ] **Step 3: Commit**

```bash
git add src/components/AppSession.tsx
git commit -m "feat: add AppSession generic product-toggle wrapper"
```

---

## Task 2: WorkAppWindow + ChatWindow renderers

**Files:** Create `src/components/WorkAppWindow.tsx`, `src/components/ChatWindow.tsx`

Both take the existing translated step data + a structural array, and reveal steps one at a time via a Run/Next bar (mirrors the AgentTranscript reveal model — read it first).

- [ ] **Step 1: WorkAppWindow.tsx**

```tsx
import { useState, useCallback, useEffect, useRef } from 'react'
import { Icon } from './Icon'

export type WorkAppVariant = 'quick-desktop' | 'cowork'
export type WorkEventKind = 'brief' | 'plan' | 'working' | 'review' | 'done'
export interface WorkStep { label: string; content: string; note?: string }

interface WorkAppWindowProps {
  variant: WorkAppVariant
  steps: WorkStep[]
  /** Parallel to steps: the app-event kind for each step. */
  kinds: WorkEventKind[]
}

const META: Record<WorkAppVariant, { name: string; bar: string; accent: string; chip: string; mark: string }> = {
  'quick-desktop': {
    name: 'Amazon Quick Desktop', bar: 'bg-slate-800', accent: 'text-orange-400',
    chip: 'bg-orange-500/15 text-orange-300 border-orange-500/30', mark: '▦',
  },
  cowork: {
    name: 'Claude Cowork', bar: 'bg-stone-700', accent: 'text-orange-300',
    chip: 'bg-orange-400/15 text-orange-200 border-orange-400/30', mark: '✻',
  },
}

const STAGES: { kind: WorkEventKind; label: string }[] = [
  { kind: 'brief', label: 'Brief' }, { kind: 'plan', label: 'Plan' },
  { kind: 'working', label: 'Work' }, { kind: 'review', label: 'Review' }, { kind: 'done', label: 'Done' },
]

export const WorkAppWindow: React.FC<WorkAppWindowProps> = ({ variant, steps, kinds }) => {
  const [revealed, setRevealed] = useState(0) // count of steps shown
  const m = META[variant]
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setRevealed(0) }, [variant, steps])
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight }, [revealed])

  const next = useCallback(() => setRevealed((r) => Math.min(r + 1, steps.length)), [steps.length])
  const hasMore = revealed < steps.length
  const currentStageIdx = revealed > 0 ? STAGES.findIndex((s) => s.kind === kinds[revealed - 1]) : -1

  return (
    <div className="flex h-96 flex-col overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700 shadow-sm">
      {/* Title bar */}
      <div className={`flex shrink-0 items-center gap-2 px-4 py-2 ${m.bar}`}>
        <span className="size-3 rounded-full bg-white/25" />
        <span className="size-3 rounded-full bg-white/25" />
        <span className="size-3 rounded-full bg-white/25" />
        <span className={`ml-2 font-mono text-xs font-semibold ${m.accent}`}>{m.mark} {m.name}</span>
      </div>
      {/* Stage tracker */}
      <div className="flex shrink-0 items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-3 py-2 text-[10px] font-medium">
        {STAGES.map((s, i) => (
          <span key={s.kind} className={`rounded px-2 py-0.5 ${i <= currentStageIdx ? m.chip + ' border' : 'text-zinc-400 dark:text-zinc-600'}`}>{s.label}</span>
        ))}
      </div>
      {/* Activity body */}
      <div ref={bodyRef} className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950 p-4 space-y-3">
        {steps.slice(0, revealed).map((s, i) => {
          const kind = kinds[i]
          return (
            <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-3">
              <div className="mb-1.5 flex items-center gap-2">
                <span className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${m.chip}`}>{kind === 'brief' ? 'Task' : STAGES.find((st) => st.kind === kind)?.label ?? kind}</span>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{s.label}</span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{s.content}</p>
              {kind === 'working' && (
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div className={`h-full rounded-full ${variant === 'quick-desktop' ? 'bg-orange-500' : 'bg-orange-400'}`} style={{ width: '70%' }} />
                </div>
              )}
              {kind === 'done' && (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-300">
                  <Icon name="check" size={12} /> Deliverable ready
                </div>
              )}
              {s.note && <p className="mt-2 text-xs italic text-zinc-500 dark:text-zinc-500"><Icon name="lightbulb" size={12} className="mr-1 inline" />{s.note}</p>}
            </div>
          )
        })}
        {revealed === 0 && (
          <div className="flex h-full items-center justify-center text-xs text-zinc-400 dark:text-zinc-600">Press Run to start the session</div>
        )}
      </div>
      {/* Action bar */}
      <div className="flex shrink-0 items-center gap-2 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2">
        {hasMore ? (
          <>
            <button onClick={next} className="rounded bg-zinc-200 dark:bg-zinc-600 px-3 py-1 text-xs text-zinc-900 dark:text-zinc-100 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-500">{revealed === 0 ? 'Run' : 'Next'}</button>
            <span className="text-xs text-zinc-500">Step {revealed + 1} of {steps.length}</span>
          </>
        ) : (
          <span className="text-xs text-zinc-500">✓ Session complete</span>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: ChatWindow.tsx**

```tsx
import { useState, useCallback, useEffect, useRef } from 'react'
import { Icon } from './Icon'

export type ChatVariant = 'chatgpt' | 'claude'
export type ChatRole = 'user' | 'assistant'
export interface ChatStep { label: string; content: string; note?: string }

interface ChatWindowProps {
  variant: ChatVariant
  steps: ChatStep[]
  /** Parallel to steps: who "sends" each step. */
  roles: ChatRole[]
}

const META: Record<ChatVariant, { name: string; bar: string; accent: string; avatar: string; mark: string; send: string }> = {
  chatgpt: { name: 'ChatGPT', bar: 'bg-zinc-800', accent: 'text-emerald-400', avatar: 'bg-emerald-600', mark: '◯', send: 'bg-emerald-600' },
  claude: { name: 'Claude', bar: 'bg-stone-700', accent: 'text-orange-300', avatar: 'bg-orange-600', mark: '✻', send: 'bg-orange-600' },
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ variant, steps, roles }) => {
  const [revealed, setRevealed] = useState(0)
  const m = META[variant]
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setRevealed(0) }, [variant, steps])
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight }, [revealed])

  const next = useCallback(() => setRevealed((r) => Math.min(r + 1, steps.length)), [steps.length])
  const hasMore = revealed < steps.length

  return (
    <div className="flex h-96 flex-col overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700 shadow-sm">
      {/* Title bar */}
      <div className={`flex shrink-0 items-center gap-2 px-4 py-2 ${m.bar}`}>
        <span className="size-3 rounded-full bg-white/25" />
        <span className="size-3 rounded-full bg-white/25" />
        <span className="size-3 rounded-full bg-white/25" />
        <span className={`ml-2 font-mono text-xs font-semibold ${m.accent}`}>{m.mark} {m.name}</span>
      </div>
      {/* Messages */}
      <div ref={bodyRef} className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950 p-4 space-y-4">
        {steps.slice(0, revealed).map((s, i) => {
          const role = roles[i]
          const isUser = role === 'user'
          return (
            <div key={i} className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}>
              <span className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${isUser ? 'bg-zinc-500' : m.avatar}`}>{isUser ? 'U' : m.mark}</span>
              <div className={`min-w-0 max-w-[80%] ${isUser ? 'text-right' : ''}`}>
                <div className={`inline-block rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${isUser ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'}`}>
                  {s.content}
                </div>
                {s.note && <p className="mt-1.5 text-xs italic text-zinc-500"><Icon name="lightbulb" size={12} className="mr-1 inline" />{s.note}</p>}
              </div>
            </div>
          )
        })}
        {revealed === 0 && (
          <div className="flex h-full items-center justify-center text-xs text-zinc-400 dark:text-zinc-600">Press Run to start the conversation</div>
        )}
      </div>
      {/* Composer (decorative) + action */}
      <div className="flex shrink-0 items-center gap-2 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-3 py-2">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-3 py-1.5">
          <span className="flex-1 truncate text-xs text-zinc-400 dark:text-zinc-500">Message {m.name}…</span>
          <span className={`flex size-5 items-center justify-center rounded-full text-white ${m.send}`}><Icon name="arrow-right" size={12} /></span>
        </div>
        {hasMore ? (
          <button onClick={next} className="rounded bg-zinc-200 dark:bg-zinc-600 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-500">{revealed === 0 ? 'Run' : 'Next'}</button>
        ) : (
          <span className="px-2 text-xs text-zinc-500">✓ Done</span>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Icon check.** Confirm `check`, `lightbulb`, `arrow-right` exist in `src/components/Icon.tsx` PATHS. Report DONE_WITH_CONCERNS if any missing.
- [ ] **Step 4:** `npm run build && npm run lint` → PASS.
- [ ] **Step 5: Commit**

```bash
git add src/components/WorkAppWindow.tsx src/components/ChatWindow.tsx
git commit -m "feat: add WorkAppWindow and ChatWindow realistic app skins"
```

---

## Task 3: Rewire the two work-app demos (Quick Desktop ⇄ Cowork)

**Files:** Modify `src/modules/agenticwork/DelegateSuperviseSection.tsx`, `src/modules/toolslandscape/DelegationDemoBusiness.tsx`; Modify `src/i18n/en.ts`, `sv.ts`, `ko.ts` (one toggle-label key each section).

The kinds map each existing step to a stage. Both demos are 5 steps: brief → plan → working → review → done.

- [ ] **Step 1: i18n toggle labels.** Add `appToggleLabel` to both work-app sections in all three languages.
  - In `src/i18n/en.ts`: in `modules.agenticwork.delegateSupervise` (after `stepLabel`) and in `modules.toolslandscape.delegation` (after `intro`), add: `appToggleLabel: 'Choose app: Amazon Quick Desktop or Claude Cowork',`
  - In `src/i18n/sv.ts`: same two locations, `appToggleLabel: 'Välj app: Amazon Quick Desktop eller Claude Cowork',`
  - In `src/i18n/ko.ts`: same two locations, `appToggleLabel: '앱 선택: Amazon Quick Desktop 또는 Claude Cowork',`

- [ ] **Step 2: DelegateSuperviseSection.tsx.** Replace the `InteractiveDemo` block with `AppSession` + `WorkAppWindow`. Full file:

```tsx
import { AppSession } from '../../components/AppSession'
import { WorkAppWindow } from '../../components/WorkAppWindow'
import type { WorkEventKind } from '../../components/WorkAppWindow'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

const KINDS: WorkEventKind[] = ['brief', 'plan', 'working', 'review', 'done']

export const DelegateSuperviseSection: React.FC = () => {
  const c = useTranslation().modules.agenticwork.delegateSupervise

  return (
    <section aria-labelledby="delegate-supervise">
      <h2 id="delegate-supervise" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <AppSession
        toggleLabel={c.appToggleLabel}
        tabs={[{ id: 'quick-desktop', label: 'Amazon Quick Desktop' }, { id: 'cowork', label: 'Claude Cowork' }]}
      >
        {(id) => <WorkAppWindow key={id} variant={id as 'quick-desktop' | 'cowork'} steps={c.steps} kinds={KINDS} />}
      </AppSession>
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: DelegationDemoBusiness.tsx.** Read the current file first (it has no SelfExplain). Replace its `InteractiveDemo` with the same `AppSession` + `WorkAppWindow` pattern, reading `modules.toolslandscape.delegation`, `KINDS` identical (brief/plan/working/review/done), aria id unchanged, and PRESERVE whatever trailing elements it currently has (takeaway, etc. — match the existing structure, only swap the demo).

- [ ] **Step 4:** `npm run build && npm run lint` → PASS.
- [ ] **Step 5:** Manual: Use AI / Business → Agentic Work § Delegate and Supervise, and Tools Landscape § Watching an AI Do Work. Each shows a product window with the Quick Desktop / Cowork toggle, a stage tracker, Run/Next stepping through brief→done, the file/deliverable chip on the last step, and switching product re-skins + resets.
- [ ] **Step 6: Commit**

```bash
git add src/modules/agenticwork/DelegateSuperviseSection.tsx src/modules/toolslandscape/DelegationDemoBusiness.tsx src/i18n/en.ts src/i18n/sv.ts src/i18n/ko.ts
git commit -m "feat: Quick Desktop / Cowork app windows for the agentic-work demos"
```

---

## Task 4: Rewire the two chat demos (ChatGPT ⇄ Claude)

**Files:** Modify `src/modules/workingwithai/VagueToValuableBusiness.tsx`, `src/modules/optimizingworkflow/OneOffToSystemBusiness.tsx`; Modify `src/i18n/en.ts`, `sv.ts`, `ko.ts`.

Both demos are 4 steps. Role mapping per demo (structural):
- `vagueToValuable`: steps are vague-ask / generic-result / real-brief / shipped-result → roles `['user','assistant','user','assistant']`.
- `oneOffToSystem`: steps are weekly-grind / save-the-brief / make-a-project / review-job. These read as a narration of moving chat→system; render as assistant-side "system" messages with the user kicking off → roles `['user','assistant','assistant','assistant']` (the first step "the weekly grind" framed as the user describing the situation, the rest as the assistant/app responding). Use that mapping.

- [ ] **Step 1: i18n toggle labels.** Add `appToggleLabel` to both chat sections in all three languages.
  - `src/i18n/en.ts`: in `modules.workingwithai.vagueToValuable` (after `stepLabel`) and `modules.optimizingworkflow.oneOffToSystem` (after `stepLabel`), add: `appToggleLabel: 'Choose assistant: ChatGPT or Claude',`
  - `src/i18n/sv.ts`: same, `appToggleLabel: 'Välj assistent: ChatGPT eller Claude',`
  - `src/i18n/ko.ts`: same, `appToggleLabel: '어시스턴트 선택: ChatGPT 또는 Claude',`

- [ ] **Step 2: VagueToValuableBusiness.tsx.** Full file:

```tsx
import { AppSession } from '../../components/AppSession'
import { ChatWindow } from '../../components/ChatWindow'
import type { ChatRole } from '../../components/ChatWindow'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

const ROLES: ChatRole[] = ['user', 'assistant', 'user', 'assistant']

export const VagueToValuableBusiness: React.FC = () => {
  const c = useTranslation().modules.workingwithai.vagueToValuable

  return (
    <section aria-labelledby="vague-to-valuable">
      <h2 id="vague-to-valuable" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <AppSession
        toggleLabel={c.appToggleLabel}
        tabs={[{ id: 'chatgpt', label: 'ChatGPT' }, { id: 'claude', label: 'Claude' }]}
      >
        {(id) => <ChatWindow key={id} variant={id as 'chatgpt' | 'claude'} steps={c.steps} roles={ROLES} />}
      </AppSession>
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: OneOffToSystemBusiness.tsx.** Read the current file first. Replace its `InteractiveDemo` with the same `AppSession` + `ChatWindow` pattern, reading `modules.optimizingworkflow.oneOffToSystem`, `ROLES = ['user','assistant','assistant','assistant']`, aria id unchanged, preserving the existing takeaway + SelfExplain.

- [ ] **Step 4:** `npm run build && npm run lint` → PASS.
- [ ] **Step 5:** Manual: Use AI / Business → Working With AI § From Vague to Valuable, and Optimizing Your Workflow § From One-Off to a System. Each shows a chat window with the ChatGPT / Claude toggle, message bubbles (user right / assistant left with product mark), a decorative composer, Run/Next reveals messages, switching product re-skins + resets.
- [ ] **Step 6: Commit**

```bash
git add src/modules/workingwithai/VagueToValuableBusiness.tsx src/modules/optimizingworkflow/OneOffToSystemBusiness.tsx src/i18n/en.ts src/i18n/sv.ts src/i18n/ko.ts
git commit -m "feat: ChatGPT / Claude chat windows for the chat-assistant demos"
```

---

## Task 5: Regression + gate + deploy

**Files:** none (verification only)

- [ ] **Step 1:** Clean `npm run build && npm run lint`. Check `git status` for stray verifier artifacts (no `@playwright/test` in package.json; no `test-results/`, `test_translations.*`) — revert/remove per memory `deploy-llm-academy`.
- [ ] **Step 2:** Browser regression (headless; memory `browser-verification-setup`; start dev server in its own step + `curl` 200 before driving; explicit `waitFor`; write playwright to a fresh `.mjs`):
  - **Agentic Work § Delegate and Supervise** (`#/use/business/agentic-work`): WorkAppWindow with `Amazon Quick Desktop` / `Claude Cowork` toggle; Run steps through 5 stages; stage tracker advances; toggling to Cowork re-skins (warm) and resets to step 1. Capture a screenshot of each variant.
  - **Tools Landscape § Watching an AI Do Work** (`#/use/business/tools-landscape`): same WorkApp toggle works.
  - **Working With AI § From Vague to Valuable** (`#/use/business/working-with-ai`): ChatWindow with `ChatGPT` / `Claude` toggle; messages reveal as user/assistant bubbles; toggling re-skins (emerald↔clay) + resets. Screenshot each variant.
  - **Optimizing Your Workflow § From One-Off to a System** (`#/use/business/optimizing-workflow`): chat toggle works.
  - **No-regression:** the two decision-matrix demos still render as cards — Tools Landscape § Pick Tools for Your Team and GenAI Beyond Text § Pick the Right Tool (both still use `InteractiveDemo`); spot-check one renders + steps. Also confirm the CLI terminals (Agentic Coding, Tools Landscape § Anatomy) are unaffected.
  - SV/KO: toggle a11y label translates; product tab names + step content render (step content already translated). Dark mode: app chrome legible.
- [ ] **Step 3: Review screenshots** (Read the PNGs): confirm each window genuinely reads as its product (titlebar color/mark, accent, chat bubbles vs work stages). If a variant looks wrong, fix before proceeding.
- [ ] **Step 4: Final whole-branch code review** (dispatch reviewer): new components clean; `InteractiveDemo` untouched and still used by the 2 decision demos; `AgentSession`/CLI components untouched; no dead-end toggles; role/kind arrays length-match each demo's steps; no stray files.
- [ ] **Step 5:** Merge to main (--no-ff), verify build+lint on main, delete branch, commit plan doc, push.
- [ ] **Step 6:** Deploy per memory `deploy-llm-academy`: build → S3 sync → CloudFront invalidation `E2TWEQEC71DPUY` `/*`. Verify live `index-*.js` hash matches local.

---

## Self-Review Notes

- **Scope:** 4 of the 6 business `InteractiveDemo`s become app windows (the 2 that depict *using a tool*); the 2 decision-matrix demos stay cards. `InteractiveDemo` is NOT modified or removed — still their renderer.
- **Per-product skins (the user's choice):** Quick Desktop ⇄ Cowork for work apps; ChatGPT ⇄ Claude for chat. Cool-navy vs warm-stone titlebars + distinct marks make the toggle visibly switch product.
- **i18n preserved:** window components consume the existing TRANSLATED `c.steps`; only ONE new key per section (`appToggleLabel`) in EN/SV/KO. No teaching content moves to English. (Contrast with CLI transcripts, which were literal commands and stayed English.) Product/tab names are product names, not translated.
- **Reset on toggle:** `AppSession` holds active id and renders `children(id)`; sections pass `key={id}` to the window so switching product remounts → step reveal resets. Mirrors the CLI `key={variant}` pattern (sound, lint-clean).
- **Structural arrays in .tsx:** `kinds`/`roles` are per-demo structural metadata (not content), so they live in the section file, parallel to `c.steps`. Verify each array length equals that demo's step count (work apps 5; chats 4).
- **No new icons needed:** uses existing `check`, `lightbulb`, `arrow-right`.
- **Verifier hygiene:** clean package.json/test-results before the gate.
- **Realism check is mandatory:** Task 5 Step 3 requires actually viewing the screenshots — the whole point is that they look like the real apps.
