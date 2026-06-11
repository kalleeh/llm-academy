# Pro-Tips Toolkit ("Steal This") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Fix the "theory, not guidance" gap in the Use AI course. Today the course says *what* good practice is ("add context to your prompts") but never hands the learner the *artifact* — the exact custom-instructions block to paste so they never re-type context, the prompt skeleton with blanks, the AGENTS.md starter, the delegation brief. Add one **"Steal This" toolkit section** (numbered "4.") to each of four modules, built from **copy-paste templates** (via the existing CodeBlock copy button) plus **practitioner pro tips** (moves, not principles).

**The four new sections:**
1. `workingwithai.starterKit` — **"4. Set It Once: Your Starter Kit"** — the direct answer to "do I have to rewrite my context every time?" (No: here's the custom-instructions block, here's exactly where the setting lives in ChatGPT/Claude/Copilot, here's the reusable skeleton.) Rendered in **BOTH personas** (one component, persona-neutral prose).
2. `agenticcoding.stealThisSetup` — **"4. Steal This Setup"** — AGENTS.md starter + agent-driving habits (plan-before-code, checkpoint commits, paste the real error, guard the tests). Technical-only module.
3. `agenticwork.briefLibrary` — **"4. A Brief You Can Steal"** — the delegation-brief template + a filled example + checkpoint placement. Business-only module.
4. `optimizingworkflow.promptLibrary` — **"4. Your First Prompt Library"** — three copyable fill-in briefs (weekly report, meeting→actions, customer reply). **Business branch only** (the technical branch's Reusable Setups already covers the dev equivalent).

**Architecture:** Pure content + four new section components following shipped patterns. Templates are module-level English constants rendered in `CodeBlock` (copy button included) — matching the established "prompt/code examples stay English" convention (see `src/modules/prompting/data-translations.ts`). All surrounding prose (titles, intros, tips, takeaways, CodeBlock titles) lives in the `useTranslation()` tree and gets SV/KO. No new shared components; no quiz changes; existing sections untouched.

**Tech Stack:** React 19, TS strict, Vite 8, Tailwind v4 (dark: pairing). Gates: `npm run build && npm run lint` + headless browser (memory `browser-verification-setup`); deploy + artifact cleanup per memory `deploy-llm-academy`.

---

## Task 1: English content tree (4 subtrees)

**Files:** Modify `src/i18n/en.ts`

- [ ] **Step 1:** Insert each subtree inside the named module object, after its last existing section subtree (before the module's closing `},`). Exact content:

**(a) Inside `modules.workingwithai` (after the `makeItStick` entry):**

```ts
    // 4. Set It Once: Your Starter Kit (rendered in both personas)
    starterKit: {
      title: '4. Set It Once: Your Starter Kit',
      intro:
        'Everything this module teaches works without retyping it. Context goes in once — into settings, not into every prompt. Copy these two templates, fill in the brackets, and you are set up in five minutes.',
      templateTitleA: 'Paste into your assistant\'s custom instructions',
      templateTitleB: 'Save this skeleton — fill the brackets each time',
      whereTitle: 'Where the setting lives',
      where: [
        { app: 'ChatGPT', path: 'Settings → Personalization → Custom instructions' },
        { app: 'Claude', path: 'Settings → Profile — and per-workspace instructions inside a Project' },
        { app: 'Copilot (Microsoft 365)', path: 'Settings → Copilot → Personalization' },
      ],
      tipsTitle: 'Pro tips',
      tips: [
        {
          name: 'Make it interview you',
          body: 'End big requests with "Ask me up to 3 clarifying questions before you answer." One sentence buys a tailored result instead of a generic one.',
        },
        {
          name: 'Paste, don\'t paraphrase',
          body: 'Your summary of a document is a lossy copy. Attach or paste the real thing — the model reads faster than you can describe.',
        },
        {
          name: 'Ask for variants, pick, then refine',
          body: '"Give me 3 versions: one safe, one bold, one short" beats regenerate-roulette. Pick one and say "more like #2, but…".',
        },
        {
          name: 'Tell it what to leave out',
          body: '"No emojis, no exclamation marks, don\'t restate my question" kills the most common annoyances in one line — and belongs in your custom instructions, not in every prompt.',
        },
        {
          name: 'Reuse the thread for the same task',
          body: 'Follow-ups inherit everything you established. But switch topics in a fresh chat, or the old context bleeds into the new answer.',
        },
      ],
      takeaway:
        'Five minutes of setup is the difference between an assistant that already knows you and a stranger you re-brief from scratch every day.',
    },
```

**(b) Inside `modules.agenticcoding` (after the `effectively` entry):**

```ts
    // 4. Steal This Setup
    stealThisSetup: {
      title: '4. Steal This Setup',
      intro:
        'The difference between fighting a coding agent and shipping with it is rarely the model — it is the setup. Copy this starter AGENTS.md into your repo root, fill the brackets, then steal the habits below.',
      templateTitle: 'AGENTS.md starter — drop at the repo root',
      tipsTitle: 'Pro tips',
      tips: [
        {
          name: 'Ask for the plan before the code',
          body: '"Tell me your plan first — don\'t write code yet." Reviewing a 5-line plan is ten times cheaper than reviewing a 500-line diff.',
        },
        {
          name: 'Make checkpoints out of commits',
          body: 'Have the agent commit after each working step. A bad step becomes a git revert, not an archaeology dig through a giant diff.',
        },
        {
          name: 'Paste the real error',
          body: 'The verbatim stack trace, the actual failing output. "It throws something about auth" sends the agent guessing; the trace sends it to the line.',
        },
        {
          name: 'Guard the tests',
          body: 'If a test fails, say "fix the code, not the test" — an agent under pressure will happily edit the assertion. Name the behaviors that are load-bearing.',
        },
        {
          name: 'One task, one session',
          body: 'Long mixed sessions accumulate stale context. Finish, commit, clear, start fresh — with an AGENTS.md, the agent re-onboards in seconds.',
        },
      ],
      takeaway:
        'A good AGENTS.md plus these five habits is most of what separates teams that ship with agents from teams that gave up after a week.',
    },
```

**(c) Inside `modules.agenticwork` (after the `guardrails` entry):**

```ts
    // 4. A Brief You Can Steal
    briefLibrary: {
      title: '4. A Brief You Can Steal',
      intro:
        'You do not need to invent delegation from scratch. Copy this brief template, fill the brackets, and place the checkpoint where a mistake would actually cost you.',
      templateTitle: 'The delegation brief — fill in the brackets',
      exampleTitle: 'The same brief, filled in',
      tipsTitle: 'Pro tips',
      tips: [
        {
          name: 'Put the checkpoint where mistakes get expensive',
          body: 'Before anything is sent, paid, deleted, or published — that is where "show me first" goes. Everything before that can run unattended.',
        },
        {
          name: 'Ask what it needs',
          body: 'End the brief with "What is missing from this brief?" Agents are good at spotting their own blockers before they hit them.',
        },
        {
          name: 'Define done, or it is never done',
          body: '"A table I can review" beats "look into the expenses". If you cannot check the deliverable in two minutes, you have not defined it yet.',
        },
        {
          name: 'Name the escalation',
          body: '"If a rule is ambiguous, list it under \'needs human\' instead of deciding" — one line that prevents confident wrong calls.',
        },
      ],
      takeaway:
        'A reusable brief turns delegation from a writing exercise into a fill-in-the-blanks habit — and the checkpoint line is the part that keeps it safe.',
    },
```

**(d) Inside `modules.optimizingworkflow` (after the `rollItOut` entry):**

```ts
    // 4. Your First Prompt Library (business branch)
    promptLibrary: {
      title: '4. Your First Prompt Library',
      intro:
        'A prompt library sounds grand; it is a notes doc. Start it with these three — write each once, reuse it weekly. Copy, fill the brackets, save the filled version.',
      templateTitleA: 'Weekly status report',
      templateTitleB: 'Meeting → decisions and actions',
      templateTitleC: 'Customer reply, in your voice',
      tipsTitle: 'Pro tips',
      tips: [
        {
          name: 'Save it the moment it works',
          body: 'The best time to add to your library is the second a prompt produces something you would ship. "Later" never comes.',
        },
        {
          name: 'Store the brief with a sample output',
          body: 'Future-you needs to remember what "good" looked like, not just what you asked. Keep one great result next to each saved prompt.',
        },
        {
          name: 'One doc, not a system',
          body: 'A single pinned note beats a tagged database you will never maintain. Graduate to projects or folders only when the doc gets crowded.',
        },
      ],
      takeaway:
        'Three saved briefs is already a system. Most people\'s AI usage is five recurring tasks — a one-page library covers most of your week.',
    },
```

- [ ] **Step 2:** `npm run build && npm run lint` → PASS.
- [ ] **Step 3: Commit**

```bash
git add src/i18n/en.ts
git commit -m "feat: add Steal This toolkit content (starter kit, AGENTS.md, briefs, prompt library)"
```

---

## Task 2: Four section components + module wiring

**Files:** Create `src/modules/workingwithai/StarterKitSection.tsx`, `src/modules/agenticcoding/StealThisSetupSection.tsx`, `src/modules/agenticwork/BriefLibrarySection.tsx`, `src/modules/optimizingworkflow/PromptLibrarySection.tsx`; Modify the four module roots.

Shared shape: intro → CodeBlock template(s) → (section-specific extras) → pro-tips list → amber takeaway. Templates are English module constants (convention). Tips render as a compact list — lightbulb icon, bold name, body. Read `src/components/CodeBlock.tsx` (props: code, language, title) and a sibling section for styling.

- [ ] **Step 1: StarterKitSection.tsx** (full reference implementation — the other three mirror its tips/takeaway markup):

```tsx
import { CodeBlock } from '../../components/CodeBlock'
import { Icon } from '../../components/Icon'
import { useTranslation } from '../../i18n'

// Template content stays English by convention (matches prompting-module examples).
const CUSTOM_INSTRUCTIONS = `About me:
- Role: [your role, e.g. "customer success lead at a 40-person B2B SaaS"]
- I mostly use AI for: [your top 3 tasks]
- Audience I usually write for: [e.g. "customers and the exec team"]

How to answer:
- Default to [concise / detailed] answers; bullets over prose
- Tone: [e.g. "professional but warm, no corporate filler"]
- If my request is ambiguous, ask up to 2 clarifying questions first
- When I ask for writing, give me 2-3 variants, not one
- Never invent facts, numbers, or quotes; say "I don't know" instead`

const PROMPT_SKELETON = `Context: [1 sentence on the situation and who this is for]
Task: [the verb — draft / summarize / compare / rewrite — and the object]
Input: [paste the material, or name the attached file]
Format: [bullets / table / max length / sections you want]
Constraints: [tone, what to leave out, what must stay verbatim]`

export const StarterKitSection: React.FC = () => {
  const c = useTranslation().modules.workingwithai.starterKit

  return (
    <section aria-labelledby="starter-kit">
      <h2 id="starter-kit" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>

      <div className="space-y-4">
        <CodeBlock code={CUSTOM_INSTRUCTIONS} language="markdown" title={c.templateTitleA} />
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4">
          <p className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.whereTitle}</p>
          <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            {c.where.map((w) => (
              <li key={w.app}><strong className="text-zinc-900 dark:text-zinc-100">{w.app}:</strong> {w.path}</li>
            ))}
          </ul>
        </div>
        <CodeBlock code={PROMPT_SKELETON} language="markdown" title={c.templateTitleB} />
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{c.tipsTitle}</p>
        <ul className="space-y-3">
          {c.tips.map((t) => (
            <li key={t.name} className="flex gap-2.5 text-sm">
              <span className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"><Icon name="lightbulb" size={14} /></span>
              <span className="text-zinc-700 dark:text-zinc-300"><strong className="text-zinc-900 dark:text-zinc-100">{t.name}.</strong> {t.body}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
    </section>
  )
}
```

- [ ] **Step 2: StealThisSetupSection.tsx** — same shape, aria id `steal-this-setup`, reads `modules.agenticcoding.stealThisSetup`, ONE CodeBlock (`language="markdown"`, title `c.templateTitle`) with this constant:

```ts
const AGENTS_MD_STARTER = `# AGENTS.md — [project name]

## Setup
- Install: [pnpm install]
- Dev server: [pnpm dev]
- Tests: [pnpm test]   <- run before claiming any task done
- Lint: [pnpm lint]

## Conventions
- [Language + strictness, e.g. "TypeScript strict; no any"]
- [Style rules the linter doesn't catch, e.g. "named exports only"]
- [Error handling, e.g. "wrap errors with context; never swallow"]

## Architecture notes
- [1-3 bullets: where things live, what calls what]
- [Known gotchas, e.g. "auth middleware must stay first in the chain"]

## Definition of done
- Tests pass, lint clean
- [Your bar: "new code has a test", "no TODOs without a ticket"]`
```

Then the tips list + takeaway exactly like StarterKitSection's markup.

- [ ] **Step 3: BriefLibrarySection.tsx** — aria id `brief-library`, reads `modules.agenticwork.briefLibrary`, TWO CodeBlocks (template then filled example), then tips + takeaway:

```ts
const BRIEF_TEMPLATE = `Task: [the outcome, in one sentence]
Inputs: [the files / folders / sources it may use — be explicit]
Rules: [the policy, criteria, or definitions to apply]
Deliverable: [exact format: table / doc / list + length]
Checkpoint: show me [the plan / flagged items / the draft]
            before [running / sending / finalizing]
Out of bounds: [what it must NOT touch or do without asking]`

const BRIEF_EXAMPLE = `Task: Reconcile this month's expenses against our travel policy.
Inputs: expenses-march.xlsx, travel-policy.pdf (attached)
Rules: flag any line that breaks a policy rule; cite the rule
       and the amount over
Deliverable: a review table (line, rule broken, amount over)
             plus a 1-line summary
Checkpoint: show me the flagged list before drafting the
            finance email
Out of bounds: don't email anyone; don't modify the spreadsheet`
```

(Use `language="markdown"`, titles `c.templateTitle` / `c.exampleTitle`.)

- [ ] **Step 4: PromptLibrarySection.tsx** — aria id `prompt-library`, reads `modules.optimizingworkflow.promptLibrary`, THREE CodeBlocks (titles `c.templateTitleA/B/C`), then tips + takeaway:

```ts
const WEEKLY_REPORT = `Context: weekly [team] status for [audience]. Sources attached.
Task: compile the report from the attached [exports / notes].
Format: 3 sections — Wins, Risks, Next week — max 300 words,
        numbers first, no adjective without a number behind it.
Keep my phrasing where it exists; flag anything that looks off
rather than smoothing it over.`

const MEETING_ACTIONS = `Task: turn this transcript into (1) decisions made, (2) action
      items with owner + due date, (3) open questions.
Format: three short lists. If an owner or date is missing, mark
        it [UNASSIGNED] — don't guess.`

const CUSTOMER_REPLY = `Context: replying to the attached customer email. Relationship:
         [new / long-time / at-risk]. Goal: [retain / inform / apologize].
Task: draft a reply in our voice: [paste 2 lines of a past email
      you like the tone of].
Format: under 150 words, one clear next step, no corporate filler.
Give me 2 versions: one warmer, one more direct.`
```

- [ ] **Step 5: Wire into module roots** (each inserted immediately BEFORE the branch's KnowledgeCheck):
  - `src/modules/WorkingWithAIModule.tsx`: import StarterKitSection; add `<StarterKitSection />` to **BOTH** the business branch and the technical branch.
  - `src/modules/AgenticCodingModule.tsx`: import + add `<StealThisSetupSection />`.
  - `src/modules/AgenticWorkModule.tsx`: import + add `<BriefLibrarySection />`.
  - `src/modules/OptimizingWorkflowModule.tsx`: import + add `<PromptLibrarySection />` to the **business branch only**.

- [ ] **Step 6:** `npm run build && npm run lint` → PASS.
- [ ] **Step 7:** Manual: each module shows the new "4." section with copyable templates (Copy button works), tips list, takeaway. Working With AI shows it in both personas.
- [ ] **Step 8: Commit**

```bash
git add src/modules/workingwithai/StarterKitSection.tsx src/modules/agenticcoding/StealThisSetupSection.tsx src/modules/agenticwork/BriefLibrarySection.tsx src/modules/optimizingworkflow/PromptLibrarySection.tsx src/modules/WorkingWithAIModule.tsx src/modules/AgenticCodingModule.tsx src/modules/AgenticWorkModule.tsx src/modules/OptimizingWorkflowModule.tsx
git commit -m "feat: Steal This toolkit sections with copyable templates and pro tips"
```

---

## Task 3: SV/KO prose translations

**Files:** Modify `src/i18n/sv.ts`, `src/i18n/ko.ts`

- [ ] **Step 1:** Add `// MT`-marked subtrees mirroring Task 1's four EN subtrees, at the matching positions (after `makeItStick` / `effectively` / `guardrails` / `rollItOut` in each file). Translate EVERY prose field (titles, intros, templateTitle*, whereTitle, where[].path stays mostly product-UI English path names — translate the connective words only if natural, otherwise keep paths verbatim since they mirror real English UI menus; app names verbatim; tipsTitle, tips[]{name,body}, exampleTitle, takeaways). SV du-form; KO 합니다체. Template CODE content is in the .tsx files and is NOT translated (convention). Array lengths: starterKit.where[3], starterKit.tips[5], stealThisSetup.tips[5], briefLibrary.tips[4], promptLibrary.tips[3]. `DeepPartial<Translation>` enforces structure.
- [ ] **Step 2:** Build + lint → PASS. **Step 3: Commit**

```bash
git add src/i18n/sv.ts src/i18n/ko.ts
git commit -m "i18n: Swedish + Korean for Steal This toolkit sections"
```

---

## Task 4: Regression + gate + deploy

**Files:** none (verification only)

- [ ] **Step 1:** Clean `npm run build && npm run lint`; revert/remove stray verifier artifacts per memory `deploy-llm-academy`.
- [ ] **Step 2:** Browser regression (headless; memory `browser-verification-setup`; dev server in its own step + curl 200; fresh .mjs; waitFor):
  - `#/use/business/working-with-ai`: h2 "4. Set It Once: Your Starter Kit" present; two CodeBlocks; click a Copy button → reads "✓ Copied"; tips list (5) renders. Toggle to technical persona → section ALSO present there.
  - `#/use/technical/agentic-coding`: "4. Steal This Setup" + AGENTS.md CodeBlock + 5 tips.
  - `#/use/business/agentic-work`: "4. A Brief You Can Steal" + 2 CodeBlocks + 4 tips.
  - `#/use/business/optimizing-workflow`: "4. Your First Prompt Library" + 3 CodeBlocks + 3 tips. Technical branch of this module does NOT show it.
  - Quizzes still render after the new sections (placement check); SV: titles/tips translate, template code stays English; dark mode legible.
- [ ] **Step 3:** Screenshot the Working With AI starter kit (the user's exact pain point) and view it — confirm it reads as a usable, copyable toolkit.
- [ ] **Step 4:** Final whole-branch review: no existing section touched; tips arrays length-match; CodeBlock used correctly; i18n complete.
- [ ] **Step 5:** Merge to main (--no-ff), build+lint on main, delete branch, commit plan doc, push.
- [ ] **Step 6:** Deploy per memory `deploy-llm-academy`; verify live hash matches.

---

## Self-Review Notes

- **The point:** every new section leads with an artifact (paste-ready template with brackets) and follows with moves ("make it interview you", "fix the code not the test"), not principles. The user's literal question — "how do I add context without rewriting it every time?" — is answered by the first CodeBlock + the where-it-lives box.
- **Translation split:** prose translated; bracketed template content English (matches the prompting module's explicit convention). Where-it-lives paths mirror real English UI menus — keep paths verbatim.
- **Both-personas render for StarterKitSection** is new but safe: it's one component included in two branches (components are persona-agnostic; only registry/branching controls visibility).
- **Numbering:** every touched branch had exactly 3 sections → the new ones are all "4." with no renumbering.
- **No quiz changes** — scope control. The toolkit is reference material, not testable theory.
- **Copy buttons are the feature:** Task 4 explicitly verifies the Copy → "✓ Copied" interaction.
