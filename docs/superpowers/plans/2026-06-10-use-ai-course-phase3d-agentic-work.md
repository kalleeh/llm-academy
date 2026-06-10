# "Use AI" Course — Phase 3d: Agentic Work Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship "Use AI" module 5 — *Agentic Work* (business-only): AI assistants that do tasks for you — delegate multi-step work to Quick / Cowork-style agents, supervise, and set guardrails — with two emulations (one step-through delegation + one expandable governance model), a KnowledgeCheck, CourseBridges to Agents & Tool Use and AI in Your Organization, and full EN/SV/KO i18n.

**Architecture:** Second **single-persona** module (`personas: ['business']`), the business mirror of Agentic Coding. The module root renders ONE layout with no `useDifficulty` branch and no mode-guard return null — registry `personas: ['business']` is the sole visibility control (this is exactly the corrected `ai-in-org` pattern, done right from the start). Pattern otherwise matches shipped Use-AI modules: registry entry + lazy import; section components under `src/modules/agenticwork/`; prose in `useTranslation()` (`modules.agenticwork.*`); quiz/SelfExplain via legacy translation files. Business emulation uses `InteractiveDemo` (the Workspace terminal is the technical-side device; business gets a step-through, matching DelegationDemoBusiness). Bridges target `agents` and `ai-in-org` (both render in business → never dead-end).

**Tech Stack:** React 19, TS strict, Vite 8, Tailwind v4 (dark: pairing). Gates: `npm run build && npm run lint` + browser checks (headless setup: memory `browser-verification-setup`; deploy + verifier-artifact cleanup: memory `deploy-llm-academy`).

**Reference spec:** `docs/superpowers/specs/2026-06-09-use-ai-course-design.md` (Phase 3, module 5; "drive Quick / Cowork / agents: delegate multi-step work, supervise, set guardrails")

---

## Module Content Design (business only)

After this module a business user can hand a multi-step task to an agentic work app (Amazon Quick Desktop, Claude Cowork), supervise it at the right checkpoints, and put sensible guardrails around what it's allowed to do — getting leverage without losing control.

**Sections (3):**
1. **What Agentic Work Actually Is** — expandable cards: assistant vs agent (chat answers; an agent plans and executes across apps/files), what makes a task delegable (multi-step, clear done-state, recoverable), the tools (Quick Desktop, Cowork, and where they fit), the human's new role (director, not doer). Bridge → agents.
2. **Delegate and Supervise** *(emulation — InteractiveDemo)* — step through delegating a real multi-step task to an agentic work app: brief it ("reconcile this month's expenses against the policy and flag exceptions") → approve the plan → it works across the spreadsheet + policy doc → you review the flagged exceptions at a checkpoint → it produces the summary. Emphasis on where the human stays in the loop. SelfExplain.
3. **Set Guardrails** — expandable cards: scope limits (what it may touch), spend/action ceilings, human-in-the-loop for irreversible/sensitive actions, an audit trail. The "delegate the work, never the accountability" rule, with a concrete failure (an agent that over-refunds without fraud checks). Bridge → ai-in-org.

Ends with a KnowledgeCheck (2 questions). No technical branch.

IDs: registry `agentic-work`; i18n subtree `agenticwork`; KnowledgeCheck `agenticwork`; question ids `agwork-1`, `agwork-2`.

---

## File Structure

- **Create:** `src/modules/AgenticWorkModule.tsx`; `src/modules/agenticwork/WhatIsAgenticWorkSection.tsx`, `DelegateSuperviseSection.tsx`, `GuardrailsSection.tsx`
- **Modify:** `src/registry.ts`, `src/App.tsx`, `src/ui-labels.ts`, `src/i18n/en.ts`, `src/i18n/sv.ts`, `src/i18n/ko.ts`, `src/quiz-translations.ts`, `src/selfexplain-translations.ts`

---

## Task 1: Register the module

**Files:** Modify `src/registry.ts`, `src/App.tsx`; Create `src/modules/AgenticWorkModule.tsx`

- [ ] **Step 1: Placeholder module.** Create `src/modules/AgenticWorkModule.tsx`:

```tsx
import { ModuleLayout } from '../components/ModuleLayout'

export const AgenticWorkModule: React.FC = () => {
  return (
    <ModuleLayout moduleId="agentic-work" title="Agentic Work" subtitle="AI assistants that do tasks for you — delegate, supervise, set guardrails.">
      <p className="text-zinc-700 dark:text-zinc-300">Content coming in Phase 3.</p>
    </ModuleLayout>
  )
}
```

- [ ] **Step 2: Registry.** In `src/registry.ts`: append `| 'agentic-work'` to `ModuleId`; append to `MODULES` after the `agentic-coding` entry:

```ts
  { id: 'agentic-work', label: 'Agentic Work', course: 'use', personas: ['business'] },
```

- [ ] **Step 3: App wiring.** In `src/App.tsx`: after the `AgenticCodingModule` lazy import add:

```tsx
const AgenticWorkModule = lazy(() => import('./modules/AgenticWorkModule').then(m => ({ default: m.AgenticWorkModule })))
```

and in `moduleComponents` after `'agentic-coding': AgenticCodingModule,` add:

```tsx
  'agentic-work': AgenticWorkModule,
```

- [ ] **Step 4:** `npm run build && npm run lint` → PASS.
- [ ] **Step 5:** Manual:
  - Use AI / Business: sidebar lists 4 modules (Tools Landscape, Working With AI, Optimizing Workflow, Agentic Work); module 4 renders placeholder.
  - Use AI / Technical: sidebar lists 4 modules (Agentic Coding shown, Agentic Work NOT shown).
  - Understand AI unchanged.
- [ ] **Step 6: Commit**

```bash
git add src/registry.ts src/App.tsx src/modules/AgenticWorkModule.tsx
git commit -m "feat: register Agentic Work (business) module in Use AI course"
```

---

## Task 2: Sidebar + module labels (EN/SV/KO)

**Files:** Modify `src/ui-labels.ts`, `src/i18n/en.ts`

- [ ] **Step 1:** In `src/ui-labels.ts` add after each language's `'agentic-coding'` entry. This is business-only, so `subtitle` and `businessSubtitle` should carry the same business framing (ModuleLayout uses `businessSubtitle` in business mode, falling back to `subtitle`; provide both identical to be safe):

EN:
```ts
    'agentic-work': { label: 'Agentic Work', subtitle: 'AI assistants that do tasks for you — delegate multi-step work, supervise, and set guardrails.', businessSubtitle: 'AI assistants that do tasks for you — delegate multi-step work, supervise, and set guardrails.' },
```
SV:
```ts
    'agentic-work': { label: 'Agentiskt arbete', subtitle: 'AI-assistenter som utför uppgifter åt dig — delegera flerstegsarbete, övervaka och sätt skyddsräcken.', businessSubtitle: 'AI-assistenter som utför uppgifter åt dig — delegera flerstegsarbete, övervaka och sätt skyddsräcken.' },
```
KO:
```ts
    'agentic-work': { label: '에이전틱 워크', subtitle: '당신을 위해 작업을 수행하는 AI 어시스턴트 — 다단계 작업 위임, 감독, 가드레일 설정.', businessSubtitle: '당신을 위해 작업을 수행하는 AI 어시스턴트 — 다단계 작업 위임, 감독, 가드레일 설정.' },
```

- [ ] **Step 2:** In `src/i18n/en.ts` `moduleLabels` after the `'agentic-coding'` entry:

```ts
  'agentic-work': {
    label: 'Agentic Work',
    subtitle: 'AI assistants that do tasks for you — delegate multi-step work, supervise, and set guardrails.',
    businessSubtitle: 'AI assistants that do tasks for you — delegate multi-step work, supervise, and set guardrails.',
  },
```

- [ ] **Step 3:** Build + lint → PASS. **Step 4: Commit**

```bash
git add src/ui-labels.ts src/i18n/en.ts
git commit -m "feat: add Agentic Work sidebar + module labels (EN/SV/KO)"
```

---

## Task 3: English content tree

**Files:** Modify `src/i18n/en.ts`

- [ ] **Step 1:** Inside `const modules = {`, after the closing brace of the `agenticcoding` entry, insert:

```ts
  agenticwork: {
    // 1. What Agentic Work Actually Is
    whatItIs: {
      title: '1. What Agentic Work Actually Is',
      intro:
        'A chat assistant answers; an agentic work app acts. You hand it a multi-step task — across your documents, spreadsheets, and apps — and it plans, does the steps, and reports back, while you stay in the director\'s chair. Click each piece.',
      items: [
        {
          name: 'Assistant vs agent',
          tagline: 'Answering vs doing',
          description:
            'A chat assistant gives you words back: a draft, an answer, a summary you then act on. An agent operates — it opens the files, fills the rows, drafts the email, moves through a workflow. The difference is not intelligence; it is whether the work lands in your systems or just in the chat.',
        },
        {
          name: 'What makes a task delegable',
          tagline: 'Multi-step, checkable, recoverable',
          description:
            'Good candidates have several steps (worth the setup), a clear definition of done (so you can check it), and are recoverable if wrong (a draft, not a sent contract). "Compile the weekly pipeline report from these sources" fits; "decide who to lay off" does not.',
        },
        {
          name: 'The tools',
          tagline: 'Quick Desktop, Cowork, and kin',
          description:
            'Amazon Quick Desktop and Claude Cowork are agentic work apps: you delegate office tasks and supervise as they work across files and apps. They are the business-side equivalent of what coding agents do in a repo — same loop, pointed at documents and workflows instead of code.',
        },
        {
          name: 'Your new role',
          tagline: 'Director, not doer',
          description:
            'When the doing is delegated, your value moves to briefing well, deciding what matters, and reviewing the result — the work of a manager, not an individual contributor. The teams that win with agents are the ones whose people make this shift deliberately.',
        },
      ],
      bridgeBlurb:
        'These assistants-that-act have real machinery under them — tool use, function calling, the agent loop. See how an AI actually goes from answering to taking action.',
    },
    // 2. Delegate and Supervise (InteractiveDemo emulation)
    delegateSupervise: {
      title: '2. Delegate and Supervise',
      intro:
        'Delegating to an agent is a skill that looks a lot like managing a sharp junior employee. Step through a real multi-step delegation and notice exactly where you stay in the loop.',
      stepLabel: 'Step',
      steps: [
        {
          label: 'You brief the task',
          content:
            '"Reconcile this month\'s expense report against our travel policy. Flag every expense that breaks a rule, with the rule it breaks and the amount over. Output a table I can review, plus a one-line summary."',
          note: 'A delegable brief names the inputs, the rule to apply, and the exact deliverable — just like briefing a person.',
        },
        {
          label: 'The agent proposes a plan',
          content:
            'It reads the policy and the expense sheet and proposes: parse 240 expense lines → match each to the relevant policy rule → flag violations with amount-over → build the review table → write the summary. It asks one thing: "Treat missing receipts as a violation or a separate ‘needs follow-up’ list?"',
          note: 'The plan + clarifying question is your first checkpoint — cheap to steer now, expensive after it has run.',
        },
        {
          label: 'It works across your files',
          content:
            'You choose "separate follow-up list." The agent processes all 240 lines, applying the policy rule by rule, and shows progress — not waiting for you to paste anything. It flags 11 violations and 6 missing-receipt items.',
          note: 'Unlike a chat assistant, it is operating directly on the spreadsheet and policy doc — that is the agentic part.',
        },
        {
          label: 'You supervise at the checkpoint',
          content:
            'The 11 flags arrive with the rule and overage each. You spot two that are actually within policy (a per-diem the agent read too strictly) and say so. It corrects the rule interpretation and re-runs the affected lines — 9 real violations remain.',
          note: 'Review is the job now. You are checking judgment calls, not re-doing the arithmetic.',
        },
        {
          label: 'It delivers — you stay accountable',
          content:
            'Final table of 9 violations + 6 follow-ups + a one-line summary, ready to send to finance. Twenty minutes of briefing and review replaced an afternoon of line-by-line checking — and the decision to send is still yours.',
          note: 'The work was delegated; the accountability was not. That division is the whole discipline.',
        },
      ],
      takeaway:
        'Delegate the task, supervise at checkpoints, own the outcome. The agent does the volume; your judgment is still the gate before anything ships.',
      selfExplainPrompt:
        'Pick a multi-step task on your plate this week. Write the brief you would hand an agentic work app — inputs, the rule or goal, the deliverable — and name the one checkpoint where you would insist on reviewing before it proceeds.',
      selfExplainAnswer:
        'Example: "Task: triage this week\'s 80 inbound support tickets. Brief — inputs: the ticket export; rule: tag each by urgency (P1–P3) using our SLA definitions and group by product area; deliverable: a sorted table plus the P1 list up top. Checkpoint: I review the P1 list before anything is auto-escalated, because a wrong P1 wakes someone at 2am." The checkpoint sits exactly where an error would be costly or hard to reverse.',
    },
    // 3. Set Guardrails
    guardrails: {
      title: '3. Set Guardrails',
      intro:
        'An agent that acts needs limits, the same way you would not give a new hire the company credit card on day one. Four guardrails keep delegation safe. Click each.',
      items: [
        {
          name: 'Scope limits',
          tagline: 'What it may touch',
          description:
            'Be explicit about which files, systems, and data an agent can read and change. "This folder and this sheet" beats "the shared drive." Narrow scope contains mistakes and keeps sensitive data out of reach by default.',
        },
        {
          name: 'Spend & action ceilings',
          tagline: 'Caps on consequential moves',
          description:
            'Where an agent can spend money or take outbound actions (issue refunds, send to customers, place orders), set hard ceilings and rate limits. A ceiling is necessary but not sufficient — pair it with the rule below.',
        },
        {
          name: 'Human-in-the-loop',
          tagline: 'Approval for the irreversible',
          description:
            'Anything hard to undo or externally visible — sending to a customer, deleting records, finalizing a payment — should require a human OK. Let the agent prepare and queue the action; a person presses send. Drafts are free; sent is forever.',
        },
        {
          name: 'Audit trail',
          tagline: 'Know what it did and why',
          description:
            'Log the agent\'s actions, inputs, and decisions so you can review, debug, and answer "why did it do that?" An audit trail turns a surprising outcome into a traceable one — and is often a compliance requirement, not a nicety.',
        },
      ],
      failureLabel: 'A guardrail gap, concretely:',
      failure:
        'An agent allowed to refund up to $1,000 autonomously gets a clearly fraudulent $950 request — and pays it, because a spend ceiling is not a fraud check. The missing guardrail was not a lower cap; it was a human-in-the-loop rule for refunds above a risk threshold. Caps limit size; they do not supply judgment.',
      bridgeBlurb:
        'Guardrails on one agent are the start. The bigger question — roles, decision rights, and why ~40% of agent initiatives stall on non-technical issues — is organizational. Go there.',
    },
  },
```

- [ ] **Step 2:** Build + lint → PASS. **Step 3: Commit**

```bash
git add src/i18n/en.ts
git commit -m "feat: add Agentic Work English content tree"
```

---

## Task 4: Sections + module root

**Files:** Create `src/modules/agenticwork/WhatIsAgenticWorkSection.tsx`, `DelegateSuperviseSection.tsx`, `GuardrailsSection.tsx`; Modify `src/modules/AgenticWorkModule.tsx`

Patterns mirror shipped siblings exactly: the two card sections mirror `src/modules/optimizingworkflow/RollItOutBusiness.tsx` (cards + trailing CourseBridge) and `WhereAIFitsSection.tsx` (cards + trailing amber callout); the emulation mirrors `src/modules/optimizingworkflow/OneOffToSystemBusiness.tsx` (InteractiveDemo, purple chips, lightbulb note, amber takeaway, SelfExplain).

- [ ] **Step 1: WhatIsAgenticWorkSection.tsx** — expandable cards reading `useTranslation().modules.agenticwork.whatItIs`, aria id `what-is-agentic-work`, with `<CourseBridge target="agents" blurb={c.bridgeBlurb} />` after the cards. ITEM_META icons: `chat`/`target`/`robot`/`people`.

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { CourseBridge } from '../../components/CourseBridge'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.agenticwork.whatItIs.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'chat', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'target', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'robot', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'people', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const WhatIsAgenticWorkSection: React.FC = () => {
  const c = useTranslation().modules.agenticwork.whatItIs
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="what-is-agentic-work">
      <h2 id="what-is-agentic-work" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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

- [ ] **Step 2: DelegateSuperviseSection.tsx** — InteractiveDemo emulation reading `...delegateSupervise`, aria id `delegate-supervise`, purple step chips `{c.stepLabel} {i + 1}: {s.label}`, lightbulb note, amber takeaway, SelfExplain.

```tsx
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { Icon } from '../../components/Icon'
import { useTranslation } from '../../i18n'

export const DelegateSuperviseSection: React.FC = () => {
  const c = useTranslation().modules.agenticwork.delegateSupervise

  return (
    <section aria-labelledby="delegate-supervise">
      <h2 id="delegate-supervise" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <InteractiveDemo
        title={c.title}
        steps={c.steps.map((s, i) => (
          <div key={i} className="space-y-3">
            <div className="inline-block rounded-full bg-purple-100 dark:bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">{c.stepLabel} {i + 1}: {s.label}</div>
            <p className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{s.content}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400"><Icon name="lightbulb" className="mr-1 inline" /> {s.note}</p>
          </div>
        ))}
      />
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: GuardrailsSection.tsx** — expandable cards reading `...guardrails`, aria id `guardrails`, trailing amber callout using bold `failureLabel` + `failure`, then `<CourseBridge target="ai-in-org" blurb={c.bridgeBlurb} />`. ITEM_META icons: `shield`/`bolt`/`check`/`clipboard`.

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { CourseBridge } from '../../components/CourseBridge'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.agenticwork.guardrails.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'shield', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'bolt', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'check', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'clipboard', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const GuardrailsSection: React.FC = () => {
  const c = useTranslation().modules.agenticwork.guardrails
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="guardrails">
      <h2 id="guardrails" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">
        <strong className="text-zinc-900 dark:text-zinc-100">{c.failureLabel}</strong> {c.failure}
      </p>
      <CourseBridge target="ai-in-org" blurb={c.bridgeBlurb} />
    </section>
  )
}
```

- [ ] **Step 4: Module root.** Replace `src/modules/AgenticWorkModule.tsx` with (single-persona — NO `useDifficulty`, NO mode guard):

```tsx
import { translateQuestions, useLanguage } from '../i18n'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'
import { WhatIsAgenticWorkSection } from './agenticwork/WhatIsAgenticWorkSection'
import { DelegateSuperviseSection } from './agenticwork/DelegateSuperviseSection'
import { GuardrailsSection } from './agenticwork/GuardrailsSection'

const QUESTIONS: Question[] = [
  {
    id: 'agwork-1',
    type: 'mc',
    question: 'Which task is the best candidate to delegate to an agentic work app?',
    options: [
      'Deciding which team members to lay off this quarter',
      'Reconciling 240 expense lines against a written policy and flagging the violations for your review',
      'Approving the final wording of a legal contract before signature',
      'Choosing the company\'s strategic direction for next year',
    ],
    correctIndex: 1,
    explanation:
      'A delegable task is multi-step (worth the setup), has a clear definition of done (so you can check it), and is recoverable if wrong (a flagged list you review, not an irreversible decision). The expense reconciliation fits all three; the others are high-judgment or irreversible calls you keep.',
  },
  {
    id: 'agwork-2',
    type: 'free',
    question: 'An agent is allowed to issue refunds up to $1,000 on its own. It approves a clearly fraudulent $950 refund. Which guardrail was missing, and why was the spending cap not enough?',
    modelAnswer:
      'The missing guardrail was a human-in-the-loop approval for refunds above a risk threshold (or any refund flagged as suspicious). A spending cap only limits the size of an action; it supplies no judgment about whether the action is legitimate. $950 was under the cap, so the cap let it through — exactly as designed. Caps limit magnitude; they do not detect fraud. The fix is to route risky or anomalous refunds to a person before they pay out, and to keep an audit trail so the decision is reviewable.',
    explanation:
      'Spend ceilings bound how much, never whether-it-should. Consequential or anomalous actions need a human checkpoint, not just a smaller number.',
  },
]

export const AgenticWorkModule: React.FC = () => {
  const { lang } = useLanguage()

  return (
    <ModuleLayout moduleId="agentic-work" title="Agentic Work" subtitle="AI assistants that do tasks for you — delegate multi-step work, supervise, and set guardrails.">
      <WhatIsAgenticWorkSection />
      <DelegateSuperviseSection />
      <GuardrailsSection />
      <KnowledgeCheck moduleId="agenticwork" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
```

- [ ] **Step 5: Icon check.** Verify `chat`, `target`, `robot`, `people`, `shield`, `bolt`, `check`, `clipboard`, `lightbulb`, `box` exist in `src/components/Icon.tsx` PATHS. Report DONE_WITH_CONCERNS naming any missing.
- [ ] **Step 6:** Build + lint → PASS. Manual (Use AI / Business → Agentic Work):
  - 3 sections render; cards expand.
  - The InteractiveDemo steps through 5 delegation stages.
  - Bridge in section 1 → Agents & Tool Use (business label "AI Assistants That Take Action") navigates and back; bridge in section 3 → AI in Your Organization navigates and back.
  - Quiz works.
- [ ] **Step 7: Commit**

```bash
git add src/modules/agenticwork src/modules/AgenticWorkModule.tsx
git commit -m "feat: Agentic Work sections with delegate-and-supervise emulation"
```

---

## Task 5: SV/KO content translations

**Files:** Modify `src/i18n/sv.ts`, `src/i18n/ko.ts`

- [ ] **Step 1:** Add a `// MT`-marked `agenticwork` subtree to each file after the `agenticcoding` entry, mirroring the EN structure from Task 3 exactly. Translator writes faithful, complete, native-register translations (SV du-form; KO 합니다체) of EVERY prose field: whatItIs{title,intro,items[4]{name,tagline,description},bridgeBlurb}, delegateSupervise{title,intro,stepLabel,steps[5]{label,content,note},takeaway,selfExplainPrompt,selfExplainAnswer}, guardrails{title,intro,items[4]{name,tagline,description},failureLabel,failure,bridgeBlurb}. Array lengths 4/5/4. Product names (Amazon Quick Desktop, Claude Cowork) and figures ($1,000, $950, P1–P3) stay verbatim; escape apostrophes. `DeepPartial<Translation>` catches structural mismatches at build time.

- [ ] **Step 2:** Build + lint → PASS. Manual: SV/KO render in business mode.
- [ ] **Step 3: Commit**

```bash
git add src/i18n/sv.ts src/i18n/ko.ts
git commit -m "i18n: Swedish + Korean for Agentic Work module"
```

---

## Task 6: Quiz + SelfExplain translations (legacy mechanism)

**Files:** Modify `src/quiz-translations.ts`, `src/selfexplain-translations.ts`

- [ ] **Step 1:** In `src/quiz-translations.ts`, after the `// Agentic Coding (Use AI course)` block, add an `// Agentic Work (Use AI course)` block: `quizSv`/`quizKo` entries for `agwork-1` (mc, correct index 1) and `agwork-2` (free: modelAnswer + `options: undefined`). Translate faithfully from the EN questions in `src/modules/AgenticWorkModule.tsx`; option ORDER must match EN so correctIndex stays valid. SV du-form; KO 합니다체.

- [ ] **Step 2:** In `src/selfexplain-translations.ts`, add SV + KO entries for the one prompt (delegateSupervise.selfExplainPrompt). Key is `prompt.slice(0, 50)` of the EN prompt — compute with node from the REAL en.ts string before writing; watch for trailing spaces. Place SV entry before the sv record's closing `}`, KO before the ko record's closing `}`.

- [ ] **Step 3:** Build + lint → PASS. Manual: SV quiz + SelfExplain prompt translated.
- [ ] **Step 4: Commit**

```bash
git add src/quiz-translations.ts src/selfexplain-translations.ts
git commit -m "i18n: SV/KO quiz and SelfExplain translations for Agentic Work"
```

---

## Task 7: Regression + gate + deploy

**Files:** none (verification only)

- [ ] **Step 1:** Clean `npm run build && npm run lint`. Check `git status` for stray verifier artifacts (no `@playwright/test` in package.json; no `test-results/`, `test_translations.*`) — revert/remove before the gate per memory `deploy-llm-academy`.
- [ ] **Step 2:** Browser regression (headless, see memory `browser-verification-setup`; use explicit `waitFor` on lazy headings):
  - Use AI / Business: sidebar lists 4 modules (Tools Landscape, Working With AI, Optimizing Workflow, Agentic Work); progress denominator 4. ✔
  - Use AI / Technical: sidebar lists 4 modules (Agentic Coding shown, Agentic Work hidden). ✔
  - Agentic Work: 3 sections + InteractiveDemo (step it) + quiz. ✔
  - Bridge section 1 → Agents & Tool Use (`#/understand/business/agents`, business label) renders, back returns. ✔
  - Bridge section 3 → AI in Your Organization (`#/understand/business/ai-in-org`) renders, back returns. ✔
  - Deep link `#/use/business/agentic-work` (fresh profile) resolves. ✔
  - Prior Use-AI modules, Understand course, SV/KO, dark mode unaffected. ✔
- [ ] **Step 3:** Final whole-branch code review (dispatch reviewer). Confirm: business-only single-persona pattern clean (no useDifficulty/mode guard); both bridges target business-visible modules; full i18n; no stray files in diff.
- [ ] **Step 4:** Merge to main (--no-ff), verify build+lint on main, delete branch, commit the plan doc, push.
- [ ] **Step 5:** Deploy per memory `deploy-llm-academy`: `npm run build` → `aws s3 sync dist/ s3://llm-academy-gurum-se/ --delete` → CloudFront invalidation `E2TWEQEC71DPUY` `/*`. Verify live `index-*.js` hash matches local and the live registry chunk lists `agentic-work`.

---

## Self-Review Notes

- **Spec coverage:** Phase 3 module 5 (business-only) — "drive Quick/Cowork/agents: delegate multi-step work, supervise, set guardrails." InteractiveDemo delegation emulation (the business-side device; the Workspace terminal is reserved for technical Agentic Coding), quiz, two bridges. Full i18n.
- **Single-persona done right:** business-only via registry `personas: ['business']`, NO mode guard in the component (the anti-pattern we fixed in `ai-in-org`). It's the mirror of Agentic Coding.
- **Bridge correctness:** both `agents` and `ai-in-org` render in business mode → never dead-end. `agents` shows business label "AI Assistants That Take Action"; `ai-in-org` has no businessLabel (same label both personas). Headings resolve to "Under the hood" (both targets are `understand` course).
- **Pattern fidelity:** card+bridge sections mirror RollItOutBusiness; card+callout+bridge mirrors WhereAIFitsSection + bridge; the emulation mirrors OneOffToSystemBusiness. Deviations are bugs.
- **SelfExplain key trap:** key is slice(0,50) of the EN prompt — Task 6 computes it from real en.ts text.
- **Verifier hygiene:** per memory `deploy-llm-academy`, expect subagents to dirty package.json/test-results during browser checks; clean before the gate.
