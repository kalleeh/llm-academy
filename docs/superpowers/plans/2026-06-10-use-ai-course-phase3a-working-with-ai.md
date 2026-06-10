# "Use AI" Course — Phase 3a: Working With AI Module Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship "Use AI" module 2 — *Working With AI* (chat-surface fluency: context, iteration, files, projects/custom instructions) — with Business + Technical sections, one emulation per persona, KnowledgeChecks, CourseBridges to Prompt Engineering, and full EN/SV/KO i18n.

**Architecture:** Identical pattern to the shipped Tools Landscape module (see `src/modules/ToolsLandscapeModule.tsx` and `src/modules/toolslandscape/`): registry entry in `src/registry.ts` + lazy import in App, module root branching on `useDifficulty()`, section components under `src/modules/workingwithai/`, prose in the `useTranslation()` tree (`modules.workingwithai.*`), quiz/SelfExplain via the legacy translation files. Bridges use the existing `CourseBridge` component targeting `prompting` (visible to both personas, course `understand` — never a dead link).

**Tech Stack:** React 19, TS strict, Vite 8, Tailwind v4 (dark: pairing). Gates: `npm run build && npm run lint` + browser checks.

**Reference spec:** `docs/superpowers/specs/2026-06-09-use-ai-course-design.md` (Phase 3, module 2; bridge example "Use ▸ Working With AI ⟷ Understand ▸ Prompt Engineering")

---

## Module Content Design

After this module the learner can drive a chat assistant well day-to-day: give it the right context, iterate instead of accepting the first draft, and set up custom instructions/projects/files so good results become the default.

**Technical sections (3):**
1. **What the Model Actually Sees** — expandable cards: system prompt, conversation history, attachments, context limits. Demystifies why answers degrade in long chats.
2. **Iterate Like a Pro** *(emulation — InteractiveDemo)* — step through a real iteration: vague prompt → mediocre output → diagnose what's missing → refined prompt → strong output. SelfExplain.
3. **Beyond the Single Chat** — expandable cards: custom instructions, projects/memory, files & artifacts, when to graduate to an agentic tool. CourseBridge → prompting.

**Business sections (3):**
1. **Brief It Like a Colleague** — expandable cards: the four things every good brief contains (role/context, task, format, audience).
2. **From Vague to Valuable** *(emulation — InteractiveDemo)* — step through refining "write a job posting" from generic to great, including a follow-up tweak. SelfExplain.
3. **Make Good Results the Default** — expandable cards: custom instructions, reusable prompts, projects, files. CourseBridge → prompting.

IDs: registry `working-with-ai`; i18n subtree `workingwithai`; KnowledgeCheck `workingwithai` / `workingwithai-business`; question ids `workai-1`, `workai-2` (technical), `workai-biz-1`, `workai-biz-2` (business).

---

## File Structure

- **Create:** `src/modules/WorkingWithAIModule.tsx`; `src/modules/workingwithai/WhatModelSeesSection.tsx`, `IterationLoopSection.tsx`, `PowerFeaturesSection.tsx`, `BriefingBusiness.tsx`, `VagueToValuableBusiness.tsx`, `MakeItStickBusiness.tsx`
- **Modify:** `src/registry.ts`, `src/App.tsx`, `src/ui-labels.ts`, `src/i18n/en.ts`, `src/i18n/sv.ts`, `src/i18n/ko.ts`, `src/quiz-translations.ts`, `src/selfexplain-translations.ts`

---

## Task 1: Register the module

**Files:** Modify `src/registry.ts`, `src/App.tsx`; Create `src/modules/WorkingWithAIModule.tsx`

- [ ] **Step 1: Placeholder module.** Create `src/modules/WorkingWithAIModule.tsx`:

```tsx
import { ModuleLayout } from '../components/ModuleLayout'

export const WorkingWithAIModule: React.FC = () => {
  return (
    <ModuleLayout moduleId="working-with-ai" title="Working With AI" subtitle="Getting great results from a chat assistant, day to day.">
      <p className="text-zinc-700 dark:text-zinc-300">Content coming in Phase 3.</p>
    </ModuleLayout>
  )
}
```

- [ ] **Step 2: Registry.** In `src/registry.ts`: append `| 'working-with-ai'` to `ModuleId`; append to `MODULES` after the `tools-landscape` entry:

```ts
  { id: 'working-with-ai', label: 'Working With AI', course: 'use', personas: ['technical', 'business'] },
```

- [ ] **Step 3: App wiring.** In `src/App.tsx`: after the `ToolsLandscapeModule` lazy import add:

```tsx
const WorkingWithAIModule = lazy(() => import('./modules/WorkingWithAIModule').then(m => ({ default: m.WorkingWithAIModule })))
```

and in `moduleComponents` after `'tools-landscape': ToolsLandscapeModule,` add:

```tsx
  'working-with-ai': WorkingWithAIModule,
```

- [ ] **Step 4:** `npm run build && npm run lint` → PASS.
- [ ] **Step 5:** Manual: Use AI course now lists 2 modules in both personas; module 2 renders placeholder; Understand AI unchanged.
- [ ] **Step 6: Commit**

```bash
git add src/registry.ts src/App.tsx src/modules/WorkingWithAIModule.tsx
git commit -m "feat: register Working With AI module in Use AI course"
```

---

## Task 2: Sidebar + module labels (EN/SV/KO)

**Files:** Modify `src/ui-labels.ts`, `src/i18n/en.ts`

- [ ] **Step 1:** In `src/ui-labels.ts` add after each language's `'tools-landscape'` entry:

EN:
```ts
    'working-with-ai': { label: 'Working With AI', subtitle: 'Context, iteration, files, custom instructions — getting great results from a chat assistant.', businessSubtitle: 'Brief it like a colleague, iterate like an editor — make great AI results your default.' },
```
SV:
```ts
    'working-with-ai': { label: 'Att arbeta med AI', subtitle: 'Kontext, iteration, filer, anpassade instruktioner — få bra resultat från en chattassistent.', businessSubtitle: 'Briefa som till en kollega, iterera som en redaktör — gör bra AI-resultat till standard.' },
```
KO:
```ts
    'working-with-ai': { label: 'AI와 함께 일하기', subtitle: '컨텍스트, 반복, 파일, 사용자 지정 지침 — 챗 어시스턴트에서 좋은 결과 얻기.', businessSubtitle: '동료에게 브리핑하듯, 편집자처럼 반복하기 — 좋은 AI 결과를 기본값으로.' },
```

- [ ] **Step 2:** In `src/i18n/en.ts` `moduleLabels` after the `'tools-landscape'` entry:

```ts
  'working-with-ai': {
    label: 'Working With AI',
    subtitle: 'Context, iteration, files, custom instructions — getting great results from a chat assistant.',
    businessSubtitle: 'Brief it like a colleague, iterate like an editor — make great AI results your default.',
  },
```

- [ ] **Step 3:** Build + lint → PASS. **Step 4: Commit**

```bash
git add src/ui-labels.ts src/i18n/en.ts
git commit -m "feat: add Working With AI sidebar + module labels (EN/SV/KO)"
```

---

## Task 3: English content tree

**Files:** Modify `src/i18n/en.ts`

- [ ] **Step 1:** Inside `const modules = {`, after the closing brace of the `toolslandscape` entry, insert:

```ts
  workingwithai: {
    // Tech: 1. What the Model Actually Sees
    modelSees: {
      title: '1. What the Model Actually Sees',
      intro:
        'Every reply is generated from one thing: the context the model has right now. Most "the AI is being dumb" moments are really "the AI can\'t see what you think it sees." Click each piece of the context to explore.',
      items: [
        {
          name: 'The system prompt',
          tagline: 'Standing orders you don\'t see',
          description:
            'Before your first word, the assistant has already read instructions from its maker — tone, refusals, formatting habits. Custom instructions let you add your own layer: who you are, what stack you use, how you like answers. Set once, applies to every chat.',
        },
        {
          name: 'The conversation so far',
          tagline: 'Memory, but only inside this chat',
          description:
            'The model re-reads the whole thread on every turn. That is why it can follow "make it shorter" — and why a chat that wandered through three topics gives muddled answers. New task, new chat is the cheapest quality upgrade there is.',
        },
        {
          name: 'Files and attachments',
          tagline: 'Paste beats describe',
          description:
            'The model cannot open your laptop. A vague description of your code or document produces a vague answer about it. Attach the file, paste the error verbatim, include the actual numbers — the model is dramatically better at reading than guessing.',
        },
        {
          name: 'The context limit',
          tagline: 'The window has edges',
          description:
            'Context windows are large but finite, and quality can sag before the hard limit — details from 200 messages ago get less attention than recent ones. For long work: summarize progress into a fresh chat, or move durable facts into custom instructions or a project.',
        },
      ],
      takeaway:
        'Before blaming the model, audit the context: does it actually have what it needs to answer well? The skill of chat fluency is mostly the skill of context supply.',
    },
    // Tech: 2. Iterate Like a Pro
    iteration: {
      title: '2. Iterate Like a Pro',
      intro:
        'Nobody gets a great result from one prompt — pros get there in two or three turns because they treat the first output as a diagnostic, not a disappointment. Step through a real iteration.',
      stepLabel: 'Turn',
      steps: [
        {
          label: 'The vague prompt',
          content: '"Write me a Python script to clean up this data."',
          note: 'No file attached, no definition of "clean", no output format. The model must guess all three.',
        },
        {
          label: 'The mediocre output — read it as a diagnostic',
          content:
            'The model produces a generic pandas script: drops NA rows, strips whitespace, writes a CSV. Plausible — and useless, because your data has duplicated IDs with conflicting timestamps, and that\'s the actual problem.',
          note: 'The gap between what you got and what you wanted IS the list of context you failed to supply.',
        },
        {
          label: 'The refined prompt',
          content:
            '"Here\'s a 50-row sample (attached). Rows share an order_id when an order was edited; keep only the row with the latest updated_at per order_id. Timestamps are ISO but some lack timezones — assume UTC. Output: a function I can import, plus a doctest with the edge case."',
          note: 'Sample data, the real rule, the known trap, the exact deliverable. Same model — completely different request.',
        },
        {
          label: 'The strong output — and the cheap follow-up',
          content:
            'Correct dedup logic, timezone handling, importable function, doctest. One more turn: "Now make it stream from a 2 GB file instead of loading it all" — and because the thread carries the context, that costs one sentence.',
          note: 'Iteration compounds: every turn inherits everything you established before it.',
        },
      ],
      takeaway:
        'The loop is: prompt → read the output as a diagnosis of missing context → supply it → repeat. Two informed turns beat ten vague ones.',
      selfExplainPrompt:
        'Recall a recent AI answer that disappointed you. Reading it as a diagnostic: what context had you failed to supply?',
      selfExplainAnswer:
        'Example: "I asked for a regex to validate emails and got a textbook pattern that rejected our internal user+tag@corp addresses. I never said which address forms we accept — the model answered the generic question I actually asked. One sentence of context would have fixed it."',
    },
    // Tech: 3. Beyond the Single Chat
    powerFeatures: {
      title: '3. Beyond the Single Chat',
      intro:
        'Once your prompts are good, stop re-typing them. Every major assistant has machinery for making your context durable. Click each feature.',
      items: [
        {
          name: 'Custom instructions',
          tagline: 'Your personal system prompt',
          description:
            'Facts that are true in every chat — "I\'m a backend dev, we use Go and Postgres, answer tersely, no pleasantries" — belong in custom instructions, not in every prompt. Write them once; every conversation starts pre-briefed.',
        },
        {
          name: 'Projects & memory',
          tagline: 'Context that persists across chats',
          description:
            'Projects group related chats and share files and instructions between them. The codebase docs you attached Monday are still there Friday. Memory features go further and quietly accumulate facts — review what gets stored.',
        },
        {
          name: 'Files & artifacts',
          tagline: 'Work on documents, not just about them',
          description:
            'Modern assistants edit documents and code in a side-by-side view, keep versions, and let you target changes ("tighten section 2"). For anything longer than a paragraph, work in an artifact instead of regenerating walls of chat text.',
        },
        {
          name: 'Know when to graduate',
          tagline: 'Chat has a ceiling',
          description:
            'If you are pasting files back and forth, re-explaining your repo every session, or shepherding a 10-step workflow by hand — the task has outgrown chat. That is what agentic tools are for; the context skills you built here transfer directly.',
        },
      ],
      bridgeBlurb:
        'Refining prompts by hand is a skill with real technique behind it — zero-shot vs few-shot, chain-of-thought, structured outputs. Go deeper.',
    },
    // Business: 1. Brief It Like a Colleague
    briefing: {
      title: '1. Brief It Like a Colleague',
      intro:
        'The single biggest upgrade to your AI results costs nothing: write your request the way you would brief a capable new colleague. Four ingredients do most of the work — click each.',
      items: [
        {
          name: 'Context — who you are, what this is for',
          tagline: 'The model knows nothing about you',
          description:
            '"I run customer success at a 40-person SaaS company; this goes to churned customers" changes everything about the answer. One sentence of situation beats ten rounds of correcting a generic draft.',
        },
        {
          name: 'Task — what you actually want',
          tagline: 'Decide, then ask',
          description:
            '"Help me with this email" makes the model guess. "Rewrite this to be warmer but keep the firm deadline" is a task. If you cannot state what you want, the first output will tell you — read it and decide.',
        },
        {
          name: 'Format — what the deliverable looks like',
          tagline: 'Shape the output before it exists',
          description:
            '"Three bullet points I can paste into Slack", "a table comparing the options", "max 150 words". Format instructions are nearly always obeyed and save you the reformatting pass.',
        },
        {
          name: 'Audience & tone — who reads it',
          tagline: 'The same content wears different clothes',
          description:
            '"For the board" and "for the engineering team" produce different documents from the same facts. Name the reader and the register: formal, friendly, blunt, careful.',
        },
      ],
      takeaway:
        'Context, task, format, audience. You would never hand a colleague a task without them — the AI just fails more politely when you skip them.',
    },
    // Business: 2. From Vague to Valuable
    vagueToValuable: {
      title: '2. From Vague to Valuable',
      intro:
        'Watch the four ingredients turn a generic draft into something you would actually ship. Same assistant, same task — different brief.',
      stepLabel: 'Step',
      steps: [
        {
          label: 'The vague ask',
          content: '"Write a job posting for a marketing manager."',
          note: 'The model fills every gap with averages — and average is exactly what you will get.',
        },
        {
          label: 'The generic result',
          content:
            'A perfectly grammatical posting that could be from any company in any industry: "dynamic team player", "fast-paced environment", a bullet list of clichés. Nothing about it is wrong. Nothing about it is yours.',
          note: 'Generic in, generic out. The output mirrors the brief.',
        },
        {
          label: 'The real brief',
          content:
            '"We\'re a 12-person outdoor-gear e-commerce brand in Stockholm. First marketing hire — they\'ll own everything from paid social to packaging copy. Scrappy generalist over polished specialist. Tone: how we talk — direct, a bit playful, zero corporate filler. 300 words max, end with a one-line application ask."',
          note: 'Context, task, format, audience — all four ingredients, five sentences.',
        },
        {
          label: 'The result you ship — after one tweak',
          content:
            'A posting that sounds like your company and screens for the right person. One follow-up — "add a line that remote within the EU is fine" — and it slots in cleanly, because the conversation remembers the brief.',
          note: 'Iteration is cheap once the foundation is right. Tweaks beat rewrites.',
        },
      ],
      takeaway:
        'First drafts are diagnostics. If the output is generic, the brief was generic — fix the input, not your patience.',
      selfExplainPrompt:
        'Take a task you would normally delegate to a colleague. Write the AI brief using all four ingredients: context, task, format, audience.',
      selfExplainAnswer:
        'Example: "Context: I lead sales ops; our quarterly review deck goes to the exec team Friday. Task: turn these bullet notes (pasted) into a one-page narrative summary. Format: three short sections — wins, risks, asks — under 400 words. Audience: execs who skim; lead with numbers, no jargon."',
    },
    // Business: 3. Make Good Results the Default
    makeItStick: {
      title: '3. Make Good Results the Default',
      intro:
        'Great briefs should not live in your head. A few minutes of setup turns your best prompts into the default experience. Click each habit.',
      items: [
        {
          name: 'Custom instructions',
          tagline: 'Tell it once, not every time',
          description:
            'Your role, your company, your preferred tone and length — saved in settings, applied to every chat automatically. The "who you are" half of the brief, permanently handled.',
        },
        {
          name: 'A personal prompt library',
          tagline: 'Your greatest hits, reusable',
          description:
            'When a brief produces a great result, save it — a notes doc is fine. "Weekly report", "meeting summary", "customer reply" — most people\'s AI use is five recurring tasks. Stop rewriting their briefs from scratch.',
        },
        {
          name: 'Projects per workstream',
          tagline: 'A briefed workspace for recurring work',
          description:
            'A project holds shared files and instructions for one stream of work — "Q3 campaign" with the brand guide and product sheets attached. Every chat inside starts already knowing the material.',
        },
        {
          name: 'Attach, don\'t summarize',
          tagline: 'Let it read the real thing',
          description:
            'Upload the actual contract, the actual data export, the actual transcript. Your summary of a document is a lossy copy; the model does its best work from the source.',
        },
      ],
      bridgeBlurb:
        'Briefing well is a craft with named techniques behind it — examples, step-by-step reasoning, role prompts. See how prompting really works.',
    },
  },
```

- [ ] **Step 2:** Build + lint → PASS. **Step 3: Commit**

```bash
git add src/i18n/en.ts
git commit -m "feat: add Working With AI English content tree"
```

---

## Task 4: Technical sections + module root

**Files:** Create `src/modules/workingwithai/WhatModelSeesSection.tsx`, `IterationLoopSection.tsx`, `PowerFeaturesSection.tsx`; Modify `src/modules/WorkingWithAIModule.tsx`

- [ ] **Step 1: WhatModelSeesSection.tsx**

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.workingwithai.modelSees.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'gear', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'chat', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'file', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'ruler', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const WhatModelSeesSection: React.FC = () => {
  const c = useTranslation().modules.workingwithai.modelSees
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="model-sees">
      <h2 id="model-sees" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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

- [ ] **Step 2: IterationLoopSection.tsx**

```tsx
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

export const IterationLoopSection: React.FC = () => {
  const c = useTranslation().modules.workingwithai.iteration

  return (
    <section aria-labelledby="iteration-loop">
      <h2 id="iteration-loop" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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

Add `import { Icon } from '../../components/Icon'` with the other imports (the note line uses it).

- [ ] **Step 3: PowerFeaturesSection.tsx**

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { CourseBridge } from '../../components/CourseBridge'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.workingwithai.powerFeatures.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'edit', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'folder', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'file', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'rocket', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const PowerFeaturesSection: React.FC = () => {
  const c = useTranslation().modules.workingwithai.powerFeatures
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="power-features">
      <h2 id="power-features" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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
      <CourseBridge target="prompting" blurb={c.bridgeBlurb} />
    </section>
  )
}
```

- [ ] **Step 4: Module root.** Replace `src/modules/WorkingWithAIModule.tsx` with:

```tsx
import { translateQuestions, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'
import { KnowledgeCheck } from '../components/KnowledgeCheck'
import type { Question } from '../components/KnowledgeCheck'
import { ModuleLayout } from '../components/ModuleLayout'
import { WhatModelSeesSection } from './workingwithai/WhatModelSeesSection'
import { IterationLoopSection } from './workingwithai/IterationLoopSection'
import { PowerFeaturesSection } from './workingwithai/PowerFeaturesSection'

const QUESTIONS: Question[] = [
  {
    id: 'workai-1',
    type: 'mc',
    question: 'A 100-message chat that has covered three different tasks starts giving muddled, off-target answers. What is the most effective fix?',
    options: [
      'Ask the model to try harder and pay attention',
      'Start a fresh chat for the current task, carrying over a short summary of what matters',
      'Switch to a different AI provider',
      'Repeat your last question in all caps',
    ],
    correctIndex: 1,
    explanation:
      'The model re-reads the whole thread every turn — a wandering thread means diluted, conflicting context. A fresh chat with a tight summary gives it exactly what the current task needs and nothing else. "New task, new chat" is the cheapest quality upgrade.',
  },
  {
    id: 'workai-2',
    type: 'free',
    question: 'Describe the iteration loop for working with a chat assistant, and explain why a mediocre first output is useful rather than a failure.',
    modelAnswer:
      'The loop: prompt → read the output as a diagnostic → identify what context was missing (sample data, constraints, format, the real rule) → supply it in a refined prompt → repeat. A mediocre first output is useful because the gap between what you got and what you wanted is precisely the list of context you failed to supply — it tells you what to add. Two informed turns beat ten vague ones.',
    explanation:
      'Treating outputs as diagnostics turns disappointment into information. The skill is reading the gap, not writing one perfect mega-prompt.',
  },
]

const BUSINESS_QUESTIONS: Question[] = [
  {
    id: 'workai-biz-1',
    type: 'mc',
    question: 'Your AI draft of a customer email came out generic and off-brand. What went wrong, most likely?',
    options: [
      'The AI is not good at emails',
      'The brief was generic — no context about your company, audience, or tone, so the model filled the gaps with averages',
      'You need a paid plan for better writing',
      'Emails should not be delegated to AI',
    ],
    correctIndex: 1,
    explanation:
      'Generic in, generic out. The model fills every unspecified gap with the statistical average. One sentence each of context, task, format, and audience turns the same model into something that sounds like you.',
  },
  {
    id: 'workai-biz-2',
    type: 'mc',
    question: 'You find yourself typing "I run customer success at a SaaS company, keep it concise and friendly" at the start of every chat. What should you do?',
    options: [
      'Keep typing it — repetition is unavoidable',
      'Put it in custom instructions so every chat starts pre-briefed',
      'Stop providing that context to save time',
      'Use a different assistant for each tone',
    ],
    correctIndex: 1,
    explanation:
      'Anything true in every chat belongs in custom instructions — your role, company, preferred tone and length. Set it once and the "who you are" half of every brief is permanently handled.',
  },
]

export const WorkingWithAIModule: React.FC = () => {
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  if (mode === 'business') {
    return (
      <ModuleLayout moduleId="working-with-ai" title="Working With AI" subtitle="Brief it like a colleague, iterate like an editor — make great AI results your default.">
        <KnowledgeCheck moduleId="workingwithai-business" questions={translateQuestions(BUSINESS_QUESTIONS, lang)} />
      </ModuleLayout>
    )
  }

  return (
    <ModuleLayout moduleId="working-with-ai" title="Working With AI" subtitle="Context, iteration, files, custom instructions — getting great results from a chat assistant.">
      <WhatModelSeesSection />
      <IterationLoopSection />
      <PowerFeaturesSection />
      <KnowledgeCheck moduleId="workingwithai" questions={translateQuestions(QUESTIONS, lang)} />
    </ModuleLayout>
  )
}
```

(Business sections come in Task 5; its branch renders only the quiz for now.)

- [ ] **Step 5:** Build + lint → PASS. Manual: technical persona shows 3 sections, demo steps, bridge to Prompt Engineering renders and navigates; quiz works.
- [ ] **Step 6: Commit**

```bash
git add src/modules/workingwithai src/modules/WorkingWithAIModule.tsx
git commit -m "feat: Working With AI technical sections with iteration emulation"
```

---

## Task 5: Business sections + wiring

**Files:** Create `src/modules/workingwithai/BriefingBusiness.tsx`, `VagueToValuableBusiness.tsx`, `MakeItStickBusiness.tsx`; Modify `src/modules/WorkingWithAIModule.tsx`

- [ ] **Step 1: BriefingBusiness.tsx** — same expandable-cards shape as WhatModelSeesSection but reading `modules.workingwithai.briefing` and aria id "briefing-biz":

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.workingwithai.briefing.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'people', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'target', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'clipboard', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'chat', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const BriefingBusiness: React.FC = () => {
  const c = useTranslation().modules.workingwithai.briefing
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="briefing-biz">
      <h2 id="briefing-biz" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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

- [ ] **Step 2: VagueToValuableBusiness.tsx** — same shape as IterationLoopSection (InteractiveDemo + SelfExplain) reading `modules.workingwithai.vagueToValuable`, aria id "vague-to-valuable", step chips purple (`bg-purple-100 dark:bg-purple-500/20 ... text-purple-700 dark:text-purple-300`):

```tsx
import { InteractiveDemo } from '../../components/InteractiveDemo'
import { SelfExplain } from '../../components/SelfExplain'
import { Icon } from '../../components/Icon'
import { useTranslation } from '../../i18n'

export const VagueToValuableBusiness: React.FC = () => {
  const c = useTranslation().modules.workingwithai.vagueToValuable

  return (
    <section aria-labelledby="vague-to-valuable">
      <h2 id="vague-to-valuable" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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

- [ ] **Step 3: MakeItStickBusiness.tsx** — expandable cards reading `modules.workingwithai.makeItStick`, aria id "make-it-stick", with the CourseBridge at the end:

```tsx
import { useState, useCallback } from 'react'
import { Icon } from '../../components/Icon'
import type { IconName } from '../../components/Icon'
import { CourseBridge } from '../../components/CourseBridge'
import { useTranslation } from '../../i18n'

// Order matches `items` in useTranslation().modules.workingwithai.makeItStick.
const ITEM_META: { icon: IconName; color: string }[] = [
  { icon: 'edit', color: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'books', color: 'border-emerald-400 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'folder', color: 'border-amber-400 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10' },
  { icon: 'file', color: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10' },
]

export const MakeItStickBusiness: React.FC = () => {
  const c = useTranslation().modules.workingwithai.makeItStick
  const [expanded, setExpanded] = useState<number | null>(null)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="make-it-stick">
      <h2 id="make-it-stick" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
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
      <CourseBridge target="prompting" blurb={c.bridgeBlurb} />
    </section>
  )
}
```

- [ ] **Step 4:** In `WorkingWithAIModule.tsx` add imports for the three business sections and insert them in the business branch before the KnowledgeCheck:

```tsx
        <BriefingBusiness />
        <VagueToValuableBusiness />
        <MakeItStickBusiness />
```

- [ ] **Step 5:** Build + lint → PASS. Manual: business persona shows 3 sections + bridge ("Under the hood" → How to Talk to AI) + quiz; persona toggle flips section sets.
- [ ] **Step 6: Commit**

```bash
git add src/modules/workingwithai src/modules/WorkingWithAIModule.tsx
git commit -m "feat: Working With AI business sections with vague-to-valuable emulation"
```

---

## Task 6: SV/KO content translations

**Files:** Modify `src/i18n/sv.ts`, `src/i18n/ko.ts`

- [ ] **Step 1:** Add a `// MT`-marked `workingwithai` subtree to each file after the `toolslandscape` entry, mirroring the EN structure from Task 3 exactly (same keys, array lengths: modelSees.items[4], iteration.steps[4], powerFeatures.items[4], briefing.items[4], vagueToValuable.steps[4], makeItStick.items[4]; bridgeBlurb in powerFeatures and makeItStick). Translate ALL prose to natural Swedish (du-form) / Korean (합니다체); keep product/feature names like "custom instructions" translated naturally per each file's conventions (SV may say "anpassade instruktioner", KO "사용자 지정 지침"); escape apostrophes.

The translator agent writes the actual strings — they must be faithful, complete translations of the EN tree (not stubs), matching the register of each file's existing `toolslandscape` block. `DeepPartial<Translation>` will catch any structural mismatch at build time.

- [ ] **Step 2:** Build + lint → PASS. Manual: SV/KO render across both personas.
- [ ] **Step 3: Commit**

```bash
git add src/i18n/sv.ts src/i18n/ko.ts
git commit -m "i18n: Swedish + Korean for Working With AI module"
```

---

## Task 7: Quiz + SelfExplain translations (legacy mechanism)

**Files:** Modify `src/quiz-translations.ts`, `src/selfexplain-translations.ts`

- [ ] **Step 1:** In `src/quiz-translations.ts`, after the `// Tools Landscape (Use AI course)` block, add a `// Working With AI (Use AI course)` block: `quizSv`/`quizKo` entries for `workai-1` (mc, 4 options, correct option = index 1 "start a fresh chat..."), `workai-2` (free: modelAnswer + `options: undefined`), `workai-biz-1` (mc, correct index 1), `workai-biz-2` (mc, correct index 1). Translate faithfully from the EN questions in `src/modules/WorkingWithAIModule.tsx`; option ORDER must match EN so correctIndex stays valid.

- [ ] **Step 2:** In `src/selfexplain-translations.ts`, add SV + KO entries for both prompts. Keys are `prompt.slice(0, 50)` of the EN prompts — compute them with node before writing:

```bash
node -e "
const p1 = 'Recall a recent AI answer that disappointed you. Reading it as a diagnostic: what context had you failed to supply?'
const p2 = 'Take a task you would normally delegate to a colleague. Write the AI brief using all four ingredients: context, task, format, audience.'
console.log(JSON.stringify(p1.slice(0,50)))
console.log(JSON.stringify(p2.slice(0,50)))
"
```

Cross-check the prompts against the actual strings in en.ts (`selfExplainPrompt` under `workingwithai.iteration` and `workingwithai.vagueToValuable`) and use the slice of the REAL en.ts text.

- [ ] **Step 3:** Build + lint → PASS. Manual: SV quiz + SelfExplain prompts translated in both personas.
- [ ] **Step 4: Commit**

```bash
git add src/quiz-translations.ts src/selfexplain-translations.ts
git commit -m "i18n: SV/KO quiz and SelfExplain translations for Working With AI"
```

---

## Task 8: Regression + gate

**Files:** none (verification only)

- [ ] **Step 1:** Clean `npm run build && npm run lint`.
- [ ] **Step 2:** Browser regression (headless, see memory note `browser-verification-setup`):
- Use AI course lists 2 modules both personas; progress denominator now 2. ✔
- Working With AI: both personas render 3 sections + demo + quiz; bridges navigate to Prompt Engineering / How to Talk to AI and back. ✔
- Deep link `#/use/business/working-with-ai` (fresh profile) resolves. ✔
- Tools Landscape, Understand AI course, SV/KO, dark mode unaffected. ✔
- [ ] **Step 3:** Commit any fixups.

---

## Self-Review Notes

- **Spec coverage:** Phase 3 module 2 (B+T) with emulation per persona (InteractiveDemo step-throughs — the spec's own "vague prompt → refined → great result" example), quizzes, bridges to Prompt Engineering (spec's named bridge example), full i18n.
- **Bridge correctness:** `prompting` is `understand`-course and visible to both personas → bridge never dead-ends; heading auto-resolves to "Under the hood"; business label "How to Talk to AI" auto-resolves via MODULE_LABELS.
- **Pattern fidelity:** every component mirrors a shipped Tools Landscape sibling — deviations should be treated as bugs.
- **SelfExplain key trap:** keys are slice(0,50) of the EN prompt — Task 7 Step 2 computes them; second prompt's 50-char boundary may land mid-word, that's fine.
