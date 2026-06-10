# "Use AI" Course — Phase 3b: Optimizing Your Workflow Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship "Use AI" module 4 — *Optimizing Your Workflow* ("from one-off prompts to a system": where AI fits your day, reusable setups, team patterns) — with Business + Technical sections, one emulation per persona, KnowledgeChecks, CourseBridges to AI in Your Organization, and full EN/SV/KO i18n.

**Architecture:** Identical pattern to the shipped Tools Landscape and Working With AI modules. Registry entry in `src/registry.ts` + lazy import in App; module root branching on `useDifficulty()`; section components under `src/modules/optimizingworkflow/`; prose in the `useTranslation()` tree (`modules.optimizingworkflow.*`); quiz/SelfExplain via the legacy translation files. Bridges use the existing `CourseBridge` targeting `ai-in-org` (visible to both personas, course `understand` → never a dead link; heading auto-resolves to "Under the hood").

**Tech Stack:** React 19, TS strict, Vite 8, Tailwind v4 (dark: pairing). Gates: `npm run build && npm run lint` + browser checks (headless setup: see memory `browser-verification-setup`).

**Reference spec:** `docs/superpowers/specs/2026-06-09-use-ai-course-design.md` (Phase 3, module 4)

---

## Module Content Design

After this module the learner stops treating AI as a sequence of one-off chats and builds durable habits: knowing where AI actually earns its keep in their day, turning repeated asks into reusable setups, and spreading what works to their team.

**Technical sections (3):**
1. **Map Where AI Fits Your Day** — expandable cards: the four places AI reliably pays off in an engineering day (understanding unfamiliar code, generating boilerplate/tests, review & debugging, writing docs/comms) and where it doesn't (decisions needing full system context, anything you can't verify).
2. **Build Reusable Setups** *(emulation — InteractiveDemo)* — step through promoting an ad-hoc prompt into durable infrastructure: repeated copy-paste prompt → extract project facts into an `AGENTS.md` / custom instructions → capture the workflow as a reusable command/snippet → now it's one invocation. SelfExplain.
3. **Team Patterns & Guardrails** — expandable cards: shared context files in the repo, a prompt/skill library, review norms for AI-authored code, measuring impact honestly. CourseBridge → ai-in-org.

**Business sections (3):**
1. **Find Your AI-Shaped Tasks** — expandable cards: a quick audit — recurring + judgment-light + text-based = AI-shaped; one-off, high-stakes-judgment, or needs-private-context = keep human. Plus "the weekly-time-sink test".
2. **From One-Off to a System** *(emulation — InteractiveDemo)* — step through turning the hand-built weekly report into a system: redo it from scratch each week → save the winning brief → make it a project with the recurring sources → a 5-minute review job. SelfExplain.
3. **Roll It Out to Your Team** — expandable cards: a shared prompt library, naming a champion, light-touch governance, measuring time saved (not vanity metrics). CourseBridge → ai-in-org.

IDs: registry `optimizing-workflow`; i18n subtree `optimizingworkflow`; KnowledgeCheck `optimizingworkflow` / `optimizingworkflow-business`; question ids `optwf-1`, `optwf-2` (technical), `optwf-biz-1`, `optwf-biz-2` (business).

---

## File Structure

- **Create:** `src/modules/OptimizingWorkflowModule.tsx`; `src/modules/optimizingworkflow/WhereAIFitsSection.tsx`, `ReusableSetupsSection.tsx`, `TeamPatternsSection.tsx`, `AIShapedTasksBusiness.tsx`, `OneOffToSystemBusiness.tsx`, `RollItOutBusiness.tsx`
- **Modify:** `src/registry.ts`, `src/App.tsx`, `src/ui-labels.ts`, `src/i18n/en.ts`, `src/i18n/sv.ts`, `src/i18n/ko.ts`, `src/quiz-translations.ts`, `src/selfexplain-translations.ts`

---

## Task 1: Register the module

**Files:** Modify `src/registry.ts`, `src/App.tsx`; Create `src/modules/OptimizingWorkflowModule.tsx`

- [ ] **Step 1: Placeholder module.** Create `src/modules/OptimizingWorkflowModule.tsx`:

```tsx
import { ModuleLayout } from '../components/ModuleLayout'

export const OptimizingWorkflowModule: React.FC = () => {
  return (
    <ModuleLayout moduleId="optimizing-workflow" title="Optimizing Your Workflow" subtitle="From one-off prompts to a system — where AI fits, reusable setups, team patterns.">
      <p className="text-zinc-700 dark:text-zinc-300">Content coming in Phase 3.</p>
    </ModuleLayout>
  )
}
```

- [ ] **Step 2: Registry.** In `src/registry.ts`: append `| 'optimizing-workflow'` to `ModuleId`; append to `MODULES` after the `working-with-ai` entry:

```ts
  { id: 'optimizing-workflow', label: 'Optimizing Your Workflow', course: 'use', personas: ['technical', 'business'] },
```

- [ ] **Step 3: App wiring.** In `src/App.tsx`: after the `WorkingWithAIModule` lazy import add:

```tsx
const OptimizingWorkflowModule = lazy(() => import('./modules/OptimizingWorkflowModule').then(m => ({ default: m.OptimizingWorkflowModule })))
```

and in `moduleComponents` after `'working-with-ai': WorkingWithAIModule,` add:

```tsx
  'optimizing-workflow': OptimizingWorkflowModule,
```

- [ ] **Step 4:** `npm run build && npm run lint` → PASS.
- [ ] **Step 5:** Manual: Use AI lists 3 modules in both personas; module 3 renders placeholder; Understand AI unchanged.
- [ ] **Step 6: Commit**

```bash
git add src/registry.ts src/App.tsx src/modules/OptimizingWorkflowModule.tsx
git commit -m "feat: register Optimizing Your Workflow module in Use AI course"
```

---

## Task 2: Sidebar + module labels (EN/SV/KO)

**Files:** Modify `src/ui-labels.ts`, `src/i18n/en.ts`

- [ ] **Step 1:** In `src/ui-labels.ts` add after each language's `'working-with-ai'` entry:

EN:
```ts
    'optimizing-workflow': { label: 'Optimizing Your Workflow', subtitle: 'Where AI fits your day, reusable setups, team patterns — from one-off prompts to a system.', businessSubtitle: 'Find your AI-shaped tasks, turn one-offs into systems, and roll it out to your team.' },
```
SV:
```ts
    'optimizing-workflow': { label: 'Optimera ditt arbetsflöde', subtitle: 'Var AI passar din dag, återanvändbara upplägg, teammönster — från enstaka prompts till ett system.', businessSubtitle: 'Hitta dina AI-formade uppgifter, gör engångsjobb till system och rulla ut det till teamet.' },
```
KO:
```ts
    'optimizing-workflow': { label: '워크플로우 최적화', subtitle: 'AI가 하루에 어디에 맞는지, 재사용 가능한 설정, 팀 패턴 — 일회성 프롬프트에서 시스템으로.', businessSubtitle: 'AI에 맞는 작업을 찾고, 일회성을 시스템으로 만들고, 팀에 확산하기.' },
```

- [ ] **Step 2:** In `src/i18n/en.ts` `moduleLabels` after the `'working-with-ai'` entry:

```ts
  'optimizing-workflow': {
    label: 'Optimizing Your Workflow',
    subtitle: 'Where AI fits your day, reusable setups, team patterns — from one-off prompts to a system.',
    businessSubtitle: 'Find your AI-shaped tasks, turn one-offs into systems, and roll it out to your team.',
  },
```

- [ ] **Step 3:** Build + lint → PASS. **Step 4: Commit**

```bash
git add src/ui-labels.ts src/i18n/en.ts
git commit -m "feat: add Optimizing Your Workflow sidebar + module labels (EN/SV/KO)"
```

---

## Task 3: English content tree

**Files:** Modify `src/i18n/en.ts`

- [ ] **Step 1:** Inside `const modules = {`, after the closing brace of the `workingwithai` entry, insert:

```ts
  optimizingworkflow: {
    // Tech: 1. Map Where AI Fits Your Day
    whereItFits: {
      title: '1. Map Where AI Fits Your Day',
      intro:
        'The fastest way to get more from AI is not a better prompt — it is knowing which parts of your day it reliably improves, and which parts to keep for yourself. Click each zone.',
      items: [
        {
          name: 'Understanding',
          tagline: 'Get oriented fast',
          description:
            'Unfamiliar codebase, a dense RFC, a stack trace you have never seen — this is where AI shines as a tireless explainer. "Walk me through how auth flows through this repo", "what does this regex do", "summarize this 40-page design doc". Low risk because you verify against the real thing immediately.',
        },
        {
          name: 'Generation',
          tagline: 'Skip the blank page',
          description:
            'Boilerplate, test scaffolding, a first-draft migration, a config you have written ten times before. The model is fast and you can read the output in seconds. The win is starting from 80% instead of zero — not trusting it blindly.',
        },
        {
          name: 'Review & debugging',
          tagline: 'A second pair of eyes, on demand',
          description:
            '"What edge cases does this function miss?", "why might this test be flaky?", "review this diff for security issues." AI catches a real fraction of problems instantly. It is additive to human review, not a replacement — it misses things and invents others.',
        },
        {
          name: 'Communication',
          tagline: 'Translate between audiences',
          description:
            'Turn a terse changelog into release notes, a bug into a clear ticket, a design into a plain-English summary for stakeholders. Tedious, text-shaped, and easy to check — a sweet spot most engineers under-use.',
        },
      ],
      cautionLabel: 'Keep these for yourself:',
      caution:
        'Decisions that need full system and business context, anything you cannot verify, and judgment calls you would be embarrassed to attribute to "the AI told me to." The rule of thumb: delegate the work, never the accountability.',
    },
    // Tech: 2. Build Reusable Setups
    reusableSetups: {
      title: '2. Build Reusable Setups',
      intro:
        'If you have typed the same context into the chat three times, you have found a setup worth saving. Watch an ad-hoc prompt become durable infrastructure.',
      stepLabel: 'Step',
      steps: [
        {
          label: 'The ad-hoc prompt (third time this week)',
          content:
            '"You\'re helping on a Go service using Postgres and sqlc; we use table-driven tests and wrap errors with %w. Write tests for this handler: [paste]."',
          note: 'Everything before "Write tests" is project context you re-type every single time. That is the tell.',
        },
        {
          label: 'Extract the standing context',
          content:
            'Move the durable facts into an AGENTS.md (or the tool\'s custom-instructions / project settings): stack, conventions, test style, error handling. Now every session starts already knowing them — you stop paying the re-explanation tax.',
          note: 'Standing context belongs in a file the tool reads automatically, not in your muscle memory.',
        },
        {
          label: 'Capture the workflow',
          content:
            'The recurring action — "write table-driven tests for the selected handler" — becomes a saved prompt, a slash command, or a snippet. The variable part (which handler) is the only thing you supply.',
          note: 'A good setup separates the stable recipe from the one changing ingredient.',
        },
        {
          label: 'Now it is one invocation',
          content:
            'Select the handler, run the command. The context is loaded, the recipe is fixed, the output is consistent across the team. The five-minute setup pays for itself by the third use — and it keeps paying.',
          note: 'This is the whole game: turn a thing you re-explain into a thing you invoke.',
        },
      ],
      takeaway:
        'The unit of optimization is the repeated task, not the individual prompt. Each time you catch yourself re-typing context, that is a setup asking to be built.',
      selfExplainPrompt:
        'Name a prompt or context you have re-typed to an AI more than twice this month. What standing context would you extract, and what would the reusable invocation be?',
      selfExplainAnswer:
        'Example: "I keep pasting our API error-format spec before asking for a new endpoint handler. Standing context → a project doc with the error envelope, auth middleware, and validation conventions. Reusable invocation → \'scaffold a handler for <route> following our conventions\'. The spec stops being something I paste and becomes something the tool already knows."',
    },
    // Tech: 3. Team Patterns & Guardrails
    teamPatterns: {
      title: '3. Team Patterns & Guardrails',
      intro:
        'Your personal setups become a multiplier when the team shares them — and a liability without a few guardrails. Click each pattern.',
      items: [
        {
          name: 'Context files in the repo',
          tagline: 'Check the AI\'s knowledge into git',
          description:
            'An AGENTS.md / context file committed to the repo means every engineer\'s assistant shares the same picture of conventions, architecture, and gotchas. It reviews like code, evolves with the codebase, and onboards new hires (human and AI) for free.',
        },
        {
          name: 'A shared prompt & skill library',
          tagline: 'Stop everyone reinventing the same prompt',
          description:
            'When someone nails the prompt for "generate a migration" or "write a runbook", it goes in a shared library — a repo folder, a wiki, or tool-native skills. The team\'s best prompt becomes everyone\'s default.',
        },
        {
          name: 'Review norms for AI-authored code',
          tagline: 'The author is accountable, not the model',
          description:
            'Agree explicitly: AI-generated code gets the same review bar as hand-written code, and the human who shipped it owns it. No "the AI wrote it" excuses. Some teams flag AI-heavy PRs so reviewers calibrate attention.',
        },
        {
          name: 'Measure impact honestly',
          tagline: 'Time saved, not lines generated',
          description:
            'Lines of AI code is a vanity metric — it can mean speed or it can mean bloat. Track what matters: cycle time, time-to-first-PR for new hires, how much of a task became "review" instead of "write." Be honest about where it does not help.',
        },
      ],
      bridgeBlurb:
        'Personal and team habits are the ground level. Zoom out: how does this autonomy reshape roles, decision rights, and risk across a whole organization?',
    },
    // Business: 1. Find Your AI-Shaped Tasks
    aiShapedTasks: {
      title: '1. Find Your AI-Shaped Tasks',
      intro:
        'Most people use AI on whatever is in front of them. The higher-leverage move is to deliberately find the tasks where it pays off most. A task is AI-shaped when three things are true — click each.',
      items: [
        {
          name: 'Recurring',
          tagline: 'You do it again and again',
          description:
            'A one-off rarely justifies building a setup. A task you do every week — the status digest, the customer follow-up, the data tidy-up — earns back the time you invest in briefing it well, many times over.',
        },
        {
          name: 'Judgment-light',
          tagline: 'Mostly mechanical, not a high-stakes call',
          description:
            'Summarizing, reformatting, drafting, extracting, comparing — work where "good and fast" beats "agonized over". The high-judgment 10% (the final decision, the sensitive call) stays with you; AI clears the other 90%.',
        },
        {
          name: 'Text-shaped',
          tagline: 'Words in, words out',
          description:
            'AI is strongest where the input and output are language: emails, documents, notes, transcripts, spreadsheets of text. If the task is fundamentally about reading and writing, it is in the sweet spot.',
        },
      ],
      testLabel: 'The weekly-time-sink test:',
      test:
        'Look at your calendar and your last week. What recurring, text-shaped, judgment-light task ate the most hours? That is where to start — not the flashiest use, the most repeated one.',
    },
    // Business: 2. From One-Off to a System
    oneOffToSystem: {
      title: '2. From One-Off to a System',
      intro:
        'The difference between "I use AI sometimes" and "AI saves my team a day a week" is systems. Watch a recurring task graduate from hand-built to handled.',
      stepLabel: 'Step',
      steps: [
        {
          label: 'The weekly grind',
          content:
            'Every Monday you rebuild the same pipeline report: open five spreadsheets, paste highlights into the chat, re-explain the format, fix the tone, reformat for the exec email. Ninety minutes, every week, from scratch.',
          note: 'You are re-paying the full setup cost every single time. That is the waste.',
        },
        {
          label: 'Save the winning brief',
          content:
            'The week it finally came out great, you save that prompt — the exact context, format, and tone that worked. Next week you start from the proven brief instead of reinventing it.',
          note: 'The first reusable asset is simply the best version of a prompt you already wrote.',
        },
        {
          label: 'Make it a project',
          content:
            'Create a project / workspace that holds the recurring sources and the brief together. The format lives there, the source files attach there. "Generate this week\'s report" is now the whole instruction.',
          note: 'A project turns a prompt-plus-attachments ritual into a single briefed workspace.',
        },
        {
          label: 'A five-minute review job',
          content:
            'Monday: drop in the week\'s numbers, run it, read the draft, fix one line, send. Ninety minutes became five. The task did not disappear — the rebuilding did, and your judgment is still the last step.',
          note: 'Systematizing removes the redo, not the human. You review instead of reassemble.',
        },
      ],
      takeaway:
        'A system is just a good brief that stopped living in your head. The setup costs minutes once; the redo costs you every week forever.',
      selfExplainPrompt:
        'Pick the recurring task that eats the most of your week. What is the brief you would save, and what would you put in a project to make it a five-minute job?',
      selfExplainAnswer:
        'Example: "Monthly board update. Saved brief: context (who reads it, what they care about), the three-section format, the plain-numbers tone. Project contents: the metrics dashboard export, last month\'s update for continuity, the brand voice note. Then \'draft this month\'s board update\' starts from everything it needs."',
    },
    // Business: 3. Roll It Out to Your Team
    rollItOut: {
      title: '3. Roll It Out to Your Team',
      intro:
        'One person with good AI habits saves their own time. A team with shared habits changes what the team can take on. Click each rollout move.',
      items: [
        {
          name: 'A shared prompt library',
          tagline: 'Everyone starts from the best version',
          description:
            'A simple shared doc of "prompts that work here" — the report brief, the customer-reply template, the meeting-summary format. New team members become productive on day one instead of rediscovering everyone\'s lessons.',
        },
        {
          name: 'Name a champion',
          tagline: 'Someone owns making it better',
          description:
            'Rollouts stall without an owner. One enthusiastic person who curates the library, answers "how would you prompt this?", and shares wins does more than any mandate. Make it a visible part of their role, not a side hobby.',
        },
        {
          name: 'Light-touch governance',
          tagline: 'Clear lines, not a thick rulebook',
          description:
            'People need to know the few bright lines — what data must never go into a tool, where human sign-off is required, which tools are approved. Keep it short enough that everyone actually reads it; a wall of policy just drives shadow usage.',
        },
        {
          name: 'Measure time saved',
          tagline: 'Prove it, or it gets cut',
          description:
            'Track the honest number: hours back per week, faster turnaround, more handled without more headcount. Concrete before/after wins fund the next step and protect the budget. "It feels faster" does not survive a cost review.',
        },
      ],
      bridgeBlurb:
        'Team habits are where individual productivity meets organizational change. See what it really takes for an organization to be ready for AI.',
    },
  },
```

- [ ] **Step 2:** Build + lint → PASS. **Step 3: Commit**

```bash
git add src/i18n/en.ts
git commit -m "feat: add Optimizing Your Workflow English content tree"
```

---

## Task 4: Technical sections + module root

**Files:** Create `src/modules/optimizingworkflow/WhereAIFitsSection.tsx`, `ReusableSetupsSection.tsx`, `TeamPatternsSection.tsx`; Modify `src/modules/OptimizingWorkflowModule.tsx`

Patterns are identical to the shipped `workingwithai` siblings. Card sections mirror `WhatModelSeesSection.tsx` (expandable cards + a trailing callout `<p>`); the emulation mirrors `IterationLoopSection.tsx` (InteractiveDemo over `steps` + amber takeaway + SelfExplain, emerald step chips, `Icon name="lightbulb"` note); the bridge section mirrors `PowerFeaturesSection.tsx`.

- [ ] **Step 1: WhereAIFitsSection.tsx** — expandable-cards section reading `useTranslation().modules.optimizingworkflow.whereItFits`, aria id `where-ai-fits`. After the cards, render the caution callout (NOT a plain takeaway): the i18n object has `cautionLabel` + `caution` instead of `takeaway`.

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.optimizingworkflow.whereItFits.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'search', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'bolt', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'shield', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'chat', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const WhereAIFitsSection: React.FC = () => {
  const c = useTranslation().modules.optimizingworkflow.whereItFits
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="where-ai-fits">
      <h2 id="where-ai-fits" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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
        <strong className="text-zinc-900 dark:text-zinc-100">{c.cautionLabel}</strong> {c.caution}
      </p>
    </section>
  )
}
```

- [ ] **Step 2: ReusableSetupsSection.tsx** — InteractiveDemo emulation reading `...reusableSetups`, aria id `reusable-setups`. Same structure as `IterationLoopSection.tsx` (emerald chips `{c.stepLabel} {i + 1}: {s.label}`, lightbulb note, amber takeaway, SelfExplain). Imports: InteractiveDemo, SelfExplain, Icon, useTranslation.

```tsx
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { Icon } from '../../components/Icon'
import { useTranslation } from '../../i18n'

export const ReusableSetupsSection: React.FC = () => {
  const c = useTranslation().modules.optimizingworkflow.reusableSetups

  return (
    <section aria-labelledby="reusable-setups">
      <h2 id="reusable-setups" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <InteractiveDemo
        title={c.title}
        steps={c.steps.map((s, i) => (
          <div key={i} className="space-y-3">
            <div className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">{c.stepLabel} {i + 1}: {s.label}</div>
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

- [ ] **Step 3: TeamPatternsSection.tsx** — expandable-cards section reading `...teamPatterns`, aria id `team-patterns`, with `<CourseBridge target="ai-in-org" blurb={c.bridgeBlurb} />` after the cards (mirror `PowerFeaturesSection.tsx`).

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { CourseBridge } from '../../components/CourseBridge'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.optimizingworkflow.teamPatterns.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'folder', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'books', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'shield', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'bar-chart', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const TeamPatternsSection: React.FC = () => {
  const c = useTranslation().modules.optimizingworkflow.teamPatterns
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="team-patterns">
      <h2 id="team-patterns" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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
      <CourseBridge target="ai-in-org" blurb={c.bridgeBlurb} />
    </section>
  )
}
```

- [ ] **Step 4: Module root.** Replace `src/modules/OptimizingWorkflowModule.tsx` with:

```tsx
import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'
import { WhereAIFitsSection } from './optimizingworkflow/WhereAIFitsSection'
import { ReusableSetupsSection } from './optimizingworkflow/ReusableSetupsSection'
import { TeamPatternsSection } from './optimizingworkflow/TeamPatternsSection'

const QUESTIONS: Question[] = [
  {
    id: 'optwf-1',
    type: 'mc',
    question: 'You notice you have pasted the same paragraph about your stack and test conventions into the chat several times this week. What is the highest-leverage fix?',
    options: [
      'Type faster, or keep a copy in a scratch file to paste',
      'Move that standing context into an AGENTS.md / custom instructions the tool reads automatically, and turn the recurring action into a saved command',
      'Switch to a model with a bigger context window',
      'Accept that re-explaining context is just part of using AI',
    ],
    correctIndex: 1,
    explanation:
      'Re-typed context is the signal to build a setup. Standing facts belong in a file the tool reads every session (AGENTS.md / custom instructions); the recurring action becomes a saved prompt or command. The five-minute setup pays for itself by the third use.',
  },
  {
    id: 'optwf-2',
    type: 'free',
    question: 'Your team wants to "measure our AI impact" and proposes tracking lines of AI-generated code. Why is that the wrong metric, and what would you measure instead?',
    modelAnswer:
      'Lines of AI code is a vanity metric: more lines can mean genuine speed or it can mean bloat and review burden — it does not distinguish them, and it is trivially gamed. Measure outcomes instead: cycle time (idea to merged PR), time-to-first-PR for new hires, the share of a task that shifted from "writing" to "reviewing", and honest notes on where AI did NOT help. Those tie to value and survive a cost review.',
    explanation:
      'Good metrics measure time saved and throughput, not volume produced. Volume metrics reward generating more code, which is often the opposite of the goal.',
  },
]

const BUSINESS_QUESTIONS: Question[] = [
  {
    id: 'optwf-biz-1',
    type: 'mc',
    question: 'You want to find where AI will help your team most. Which task is the best first candidate?',
    options: [
      'A high-stakes one-off: next year\'s strategy memo',
      'A recurring, text-shaped, judgment-light task — like the weekly status digest you rebuild every Monday',
      'Whatever task is most visible to leadership',
      'The most technically impressive thing AI can do',
    ],
    correctIndex: 1,
    explanation:
      'AI-shaped tasks are recurring, judgment-light, and text-shaped. The weekly time-sink that fits all three earns back your setup effort many times over — far more than a flashy one-off or a high-judgment call you should keep.',
  },
  {
    id: 'optwf-biz-2',
    type: 'mc',
    question: 'You rebuild the same weekly report from scratch in the chat every Monday. What turns this one-off habit into a system?',
    options: [
      'Type the request more politely each week',
      'Save the brief that worked and set up a project holding the recurring sources, so "generate this week\'s report" is the whole instruction',
      'Ask a different colleague to do it',
      'Wait for the AI to remember on its own',
    ],
    correctIndex: 1,
    explanation:
      'A system is a good brief that stopped living in your head. Saving the winning brief and putting the recurring sources in a project turns a 90-minute rebuild into a 5-minute review job — the redo disappears, your judgment stays the last step.',
  },
]

export const OptimizingWorkflowModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="optimizing-workflow" title="Optimizing Your Workflow" subtitle="Find your AI-shaped tasks, turn one-offs into systems, and roll it out to your team.">
        <KnowledgeCheck moduleId="optimizingworkflow-business" questions={translateQuestions(BUSINESS_QUESTIONS, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="optimizing-workflow" title="Optimizing Your Workflow" subtitle="Where AI fits your day, reusable setups, team patterns — from one-off prompts to a system.">
      <WhereAIFitsSection />
      <ReusableSetupsSection />
      <TeamPatternsSection />
      <KnowledgeCheck moduleId="optimizingworkflow" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
```

(Business sections come in Task 5; its branch renders only the quiz for now.)

- [ ] **Step 5: Icon check.** Verify these icons exist in `src/components/Icon.tsx` PATHS: `search`, `bolt`, `shield`, `chat`, `folder`, `books`, `bar-chart`, `lightbulb`, `box`. Report DONE_WITH_CONCERNS naming any missing (do not substitute silently).
- [ ] **Step 6:** Build + lint → PASS. Manual: technical persona shows 3 sections, demo steps, caution callout, bridge to AI in Your Organization renders + navigates; quiz works.
- [ ] **Step 7: Commit**

```bash
git add src/modules/optimizingworkflow src/modules/OptimizingWorkflowModule.tsx
git commit -m "feat: Optimizing Your Workflow technical sections with reusable-setups emulation"
```

---

## Task 5: Business sections + wiring

**Files:** Create `src/modules/optimizingworkflow/AIShapedTasksBusiness.tsx`, `OneOffToSystemBusiness.tsx`, `RollItOutBusiness.tsx`; Modify `src/modules/OptimizingWorkflowModule.tsx`

- [ ] **Step 1: AIShapedTasksBusiness.tsx** — expandable cards reading `...aiShapedTasks`, aria id `ai-shaped-tasks`, 3 items, trailing callout using `testLabel` + `test` (same amber-callout shape as WhereAIFitsSection's caution). ITEM_META (3): `cycle`/`target`/`chat` icons with blue/emerald/amber colors.

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.optimizingworkflow.aiShapedTasks.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'cycle', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'target', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'chat', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
]

export const AIShapedTasksBusiness: React.FC = () => {
  const c = useTranslation().modules.optimizingworkflow.aiShapedTasks
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="ai-shaped-tasks">
      <h2 id="ai-shaped-tasks" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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
        <strong className="text-zinc-900 dark:text-zinc-100">{c.testLabel}</strong> {c.test}
      </p>
    </section>
  )
}
```

- [ ] **Step 2: OneOffToSystemBusiness.tsx** — InteractiveDemo emulation reading `...oneOffToSystem`, aria id `one-off-to-system`, purple step chips (`bg-purple-100 dark:bg-purple-500/20 ... text-purple-700 dark:text-purple-300`), lightbulb note, amber takeaway, SelfExplain. (Mirror `VagueToValuableBusiness.tsx`.)

```tsx
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { Icon } from '../../components/Icon'
import { useTranslation } from '../../i18n'

export const OneOffToSystemBusiness: React.FC = () => {
  const c = useTranslation().modules.optimizingworkflow.oneOffToSystem

  return (
    <section aria-labelledby="one-off-to-system">
      <h2 id="one-off-to-system" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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

- [ ] **Step 3: RollItOutBusiness.tsx** — expandable cards reading `...rollItOut`, aria id `roll-it-out`, 4 items, `<CourseBridge target="ai-in-org" blurb={c.bridgeBlurb} />` after the cards. ITEM_META (4): `books`/`people`/`shield`/`bar-chart` icons, blue/emerald/amber/purple.

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { CourseBridge } from '../../components/CourseBridge'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.optimizingworkflow.rollItOut.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'books', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'people', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'shield', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'bar-chart', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const RollItOutBusiness: React.FC = () => {
  const c = useTranslation().modules.optimizingworkflow.rollItOut
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="roll-it-out">
      <h2 id="roll-it-out" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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
      <CourseBridge target="ai-in-org" blurb={c.bridgeBlurb} />
    </section>
  )
}
```

- [ ] **Step 4:** In `OptimizingWorkflowModule.tsx` add imports for the three business sections and insert them in the business branch before the KnowledgeCheck:

```tsx
        <AIShapedTasksBusiness />
        <OneOffToSystemBusiness />
        <RollItOutBusiness />
```

- [ ] **Step 5: Icon check.** Verify `cycle`, `people` exist in Icon.tsx PATHS (the rest were checked in Task 4). Report DONE_WITH_CONCERNS if missing.
- [ ] **Step 6:** Build + lint → PASS. Manual: business persona shows 3 sections + test callout + bridge ("Under the hood" → AI in Your Organization) + quiz; persona toggle flips section sets.
- [ ] **Step 7: Commit**

```bash
git add src/modules/optimizingworkflow src/modules/OptimizingWorkflowModule.tsx
git commit -m "feat: Optimizing Your Workflow business sections with one-off-to-system emulation"
```

---

## Task 6: SV/KO content translations

**Files:** Modify `src/i18n/sv.ts`, `src/i18n/ko.ts`

- [ ] **Step 1:** Add a `// MT`-marked `optimizingworkflow` subtree to each file after the `workingwithai` entry, mirroring the EN structure from Task 3 exactly. The translator writes faithful, complete, native-register translations (SV du-form; KO 합니다체) of EVERY prose field: titles, intros, items[].name/tagline/description, steps[].label/content/note, stepLabel, cautionLabel/caution (whereItFits), testLabel/test (aiShapedTasks), takeaways, bridgeBlurbs, selfExplainPrompts/Answers. Array lengths: whereItFits.items[4], reusableSetups.steps[4], teamPatterns.items[4], aiShapedTasks.items[3], oneOffToSystem.steps[4], rollItOut.items[4]. Product names / code-ish fragments (AGENTS.md, Go, Postgres, sqlc, `%w`, PR) stay verbatim; escape apostrophes. `DeepPartial<Translation>` catches structural mismatches at build time.

- [ ] **Step 2:** Build + lint → PASS. Manual: SV/KO render across both personas.
- [ ] **Step 3: Commit**

```bash
git add src/i18n/sv.ts src/i18n/ko.ts
git commit -m "i18n: Swedish + Korean for Optimizing Your Workflow module"
```

---

## Task 7: Quiz + SelfExplain translations (legacy mechanism)

**Files:** Modify `src/quiz-translations.ts`, `src/selfexplain-translations.ts`

- [ ] **Step 1:** In `src/quiz-translations.ts`, after the `// Working With AI (Use AI course)` block, add a `// Optimizing Your Workflow (Use AI course)` block: `quizSv`/`quizKo` entries for `optwf-1` (mc, correct index 1), `optwf-2` (free: modelAnswer + `options: undefined`), `optwf-biz-1` (mc, correct index 1), `optwf-biz-2` (mc, correct index 1). Translate faithfully from the EN questions in `src/modules/OptimizingWorkflowModule.tsx`; option ORDER must match EN so correctIndex stays valid.

- [ ] **Step 2:** In `src/selfexplain-translations.ts`, add SV + KO entries for both prompts. Keys are `prompt.slice(0, 50)` of the EN prompts (from `optimizingworkflow.reusableSetups.selfExplainPrompt` and `optimizingworkflow.oneOffToSystem.selfExplainPrompt` in en.ts). Compute the exact 50-char slices with node from the REAL en.ts strings before writing; watch for trailing spaces. Place SV entries before the sv record's closing `}`, KO before the ko record's closing `}`.

- [ ] **Step 3:** Build + lint → PASS. Manual: SV quiz + SelfExplain prompts translated, both personas.
- [ ] **Step 4: Commit**

```bash
git add src/quiz-translations.ts src/selfexplain-translations.ts
git commit -m "i18n: SV/KO quiz and SelfExplain translations for Optimizing Your Workflow"
```

---

## Task 8: Regression + gate

**Files:** none (verification only)

- [ ] **Step 1:** Clean `npm run build && npm run lint`. Confirm `git status` shows no stray dependency edits (no playwright in package.json — if a verifier added it, revert before the gate).
- [ ] **Step 2:** Browser regression (headless, see memory `browser-verification-setup`):
- Use AI course lists 3 modules both personas; progress denominator 3. ✔
- Optimizing Your Workflow: both personas render 3 sections + demo + quiz; bridges navigate to AI in Your Organization and back. ✔
- Deep link `#/use/business/optimizing-workflow` (fresh profile) resolves. ✔
- Tools Landscape, Working With AI, Understand AI course, SV/KO, dark mode unaffected. ✔
- [ ] **Step 3:** Commit any fixups.

---

## Self-Review Notes

- **Spec coverage:** Phase 3 module 4 (B+T) with an emulation per persona (InteractiveDemo step-throughs: ad-hoc→reusable setup for technical; one-off→system for business), quizzes both personas, bridges to AI in Your Organization, full i18n.
- **Bridge correctness:** `ai-in-org` is `understand`-course and visible to both personas → never dead-ends; heading resolves to "Under the hood"; label "AI in Your Organization" (no businessLabel, same in both personas).
- **Pattern fidelity:** every component mirrors a shipped `workingwithai` sibling — deviations are bugs. Note the two non-takeaway callouts: `whereItFits` uses cautionLabel/caution, `aiShapedTasks` uses testLabel/test (both rendered as a bold-label amber callout, NOT the plain takeaway box).
- **SelfExplain key trap:** keys are slice(0,50) of the EN prompt — Task 7 Step 2 computes them from the real en.ts text.
- **Icon availability:** Task 4/5 include explicit icon-existence checks before relying on `search`/`bolt`/`shield`/`cycle`/`people`/`books`/`bar-chart`.
