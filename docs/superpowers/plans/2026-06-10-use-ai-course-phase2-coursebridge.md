# "Use AI" Course — Phase 2: CourseBridge + Deep-Link Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the `CourseBridge` component (curated, directional, persona-aware cross-course links) with the first four bridge placements (Tools Landscape ⟷ Industry Map, Agentic Loop → Agents), and fix the pre-existing deep-link race where fresh-profile URLs lose their course/persona before the contexts can apply them.

**Architecture:** Three structural moves. (1) **Deep-link fix at the source:** `CourseContext` and `DifficultyContext` initialize their state from `window.location.hash` (deep link wins over localStorage), making App's initial-load effect redundant — it gets deleted, eliminating the mount-order race entirely. (2) **Registry extraction:** the `modules` array and its types move from `App.tsx` to a new data-only `src/registry.ts`, so `CourseBridge` can read module metadata (course, personas) without importing App (which would be an import cycle — App lazy-imports the module components which import the bridge). (3) **`CourseBridge`** is a small callout component (same family as `Reveal`/`SelfExplain`): renders nothing if the target is same-course or invisible for the current persona; navigates via `history.pushState` + a manually dispatched `popstate` event, riding the existing App popstate handler (which already handles cross-course navigation correctly, including the per-course visited fix).

**Tech Stack:** React 19, TypeScript strict (`noUnusedLocals`/`noUnusedParameters`), Vite 8, Tailwind v4 (dark: pairing required). No test runner — gates are `npm run build && npm run lint` + manual browser checks.

**Reference spec:** `docs/superpowers/specs/2026-06-09-use-ai-course-design.md` (Phase 2; `CourseBridge` definition under "New code concepts")

---

## Diagnosed bug being fixed (context for Task 1)

Fresh profile + deep link `#/use/technical/tools-landscape`:
1. `CourseContext` initializes course from localStorage → `'understand'`.
2. App mounts. Effects run in declaration order: the "jump to first visible" effect sees `tools-landscape` not in the understand course and resets `activeModule` to `ai-problem`; the "sync URL hash" effect then **rewrites the hash** to `#/understand/technical/ai-problem`.
3. Only now does the initial-load effect run `parseHash()` — but the hash has already been rewritten, so `hashCourse` is `'understand'` and `setCourse('use')` never fires.

Same race hits persona: `#/understand/business/prompting` on a fresh profile loads in technical mode. Initializing both contexts from the hash removes the race (state is correct on first render; no effect ordering involved).

## Bridge navigation mechanism (context for Task 3)

App's `onPopState` handler (App.tsx ~line 227) already does exactly what a bridge click needs: parse hash → `setCourse` → `toggleMode` if needed → `setActiveModule` → record visited under the hash's course. `history.pushState` does NOT fire `popstate` natively, so the bridge calls `pushState` then dispatches `new PopStateEvent('popstate')` manually — guaranteed exactly one invocation, no double-handling. The bridge also scrolls `main` to top (the popstate path doesn't, which is right for back/forward but wrong for a forward click).

---

## File Structure

- **Create:** `src/registry.ts` — `ModuleId`, `Persona`, `ModuleMeta` types + `MODULES` array (pure data, moved verbatim from App.tsx).
- **Create:** `src/components/CourseBridge.tsx` — the bridge component.
- **Modify:** `src/CourseContext.tsx`, `src/DifficultyContext.tsx` — hash-aware state initializers.
- **Modify:** `src/App.tsx` — drop initial-load effect (Task 1); import registry instead of local array (Task 2).
- **Modify:** `src/ui-labels.ts` — `bridge.deeper` / `bridge.apply` labels (EN/SV/KO).
- **Modify:** `src/i18n/en.ts` — bridge blurbs (3 in `toolslandscape`, 2 in `industry`).
- **Modify:** `src/i18n/sv.ts`, `src/i18n/ko.ts` — blurb translations.
- **Modify:** `src/modules/toolslandscape/ToolCategoriesSection.tsx`, `ToolCategoriesBusiness.tsx`, `AgenticLoopSection.tsx`, `src/modules/IndustryModule.tsx` — bridge placements.

---

## Task 1: Fix the deep-link race (contexts initialize from hash)

**Files:**
- Modify: `src/CourseContext.tsx`
- Modify: `src/DifficultyContext.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Hash-aware initializer in CourseContext**

In `src/CourseContext.tsx`, replace the `useState` initializer (lines 20-23):

```tsx
  const [course, setCourseState] = useState<Course>(() => {
    // A course in the URL hash is an explicit deep-link intent — it wins over the stored preference.
    const hashCourse = window.location.hash.match(/^#\/(understand|use)(?:\/|$)/)?.[1]
    if (hashCourse === 'understand' || hashCourse === 'use') return hashCourse
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'use' ? 'use' : 'understand'
  })
```

- [ ] **Step 2: Hash-aware initializer in DifficultyContext**

In `src/DifficultyContext.tsx`, replace the `useState` initializer (lines 20-23):

```tsx
  const [mode, setMode] = useState<DifficultyMode>(() => {
    // A track in the URL hash (new or legacy format) wins over the stored preference.
    const hashMode = window.location.hash.match(/^#\/(?:(?:understand|use)\/)?(technical|business)(?:\/|$)/)?.[1]
    if (hashMode === 'technical' || hashMode === 'business') return hashMode
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'business' ? 'business' : 'technical'
  })
```

- [ ] **Step 3: Delete the now-redundant initial-load effect in App.tsx**

In `src/App.tsx`, delete this entire effect (lines ~245-251) including its comment and the eslint-disable line:

```tsx
  // On initial load, apply course + track from hash
  useEffect(() => {
    const { course: hashCourse, track } = parseHash()
    if (hashCourse && hashCourse !== course) setCourse(hashCourse)
    if (track && track !== mode) toggleMode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
```

(The contexts now initialize correctly before first render, so this effect can only ever no-op — or worse, lose the race it was meant to win.)

- [ ] **Step 4: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS. (If lint flags unused `parseHash` import or similar — it shouldn't; `parseHash` is still used by `activeModule`/`visited` initializers and `onPopState` — investigate before suppressing anything.)

- [ ] **Step 5: Manual behavior check**

Run: `npm run dev`. In a private/incognito window (fresh localStorage) for each:
- `<url>#/use/technical/tools-landscape` → loads AI Tools Landscape in the Use AI course, hash preserved. ✔
- `<url>#/understand/business/prompting` → loads How to Talk to AI in Business mode, hash preserved. ✔
- `<url>#/technical/tokens` (legacy) → Tokens module, technical, hash normalizes to `#/understand/technical/tokens`. ✔
- `<url>` (no hash) → defaults: understand / technical / ai-problem. ✔
Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add src/CourseContext.tsx src/DifficultyContext.tsx src/App.tsx
git commit -m "fix: deep links apply course and persona on fresh profiles"
```

---

## Task 2: Extract the module registry to src/registry.ts

**Files:**
- Create: `src/registry.ts`
- Modify: `src/App.tsx`

Pure refactor — zero behavior change. The data and types move; App imports them.

- [ ] **Step 1: Create src/registry.ts**

```ts
import type { Course } from './CourseContext'

export type Persona = 'technical' | 'business'

export type ModuleId = 'ai-problem' | 'data-foundations' | 'tokens' | 'transformer' | 'training' | 'llm-data' | 'alignment' | 'architecture' | 'solution' | 'evaluation' | 'quantization' | 'inference' | 'industry' | 'embeddings' | 'prompting' | 'agents' | 'ai-in-org' | 'fine-tuning' | 'tools-landscape'

export interface ModuleMeta {
  id: ModuleId
  label: string
  businessLabel?: string
  course: Course
  personas: Persona[]
}

export const MODULES: ModuleMeta[] = [
  { id: 'ai-problem', label: "What's an AI Problem?", course: 'understand', personas: ['technical', 'business'] },
  { id: 'data-foundations', label: 'Data Foundations', businessLabel: 'Why Data Quality Matters', course: 'understand', personas: ['technical', 'business'] },
  { id: 'tokens', label: 'Tokens & Tokenizers', course: 'understand', personas: ['technical'] },
  { id: 'transformer', label: 'The Transformer', course: 'understand', personas: ['technical'] },
  { id: 'training', label: 'Training From Scratch', course: 'understand', personas: ['technical'] },
  { id: 'llm-data', label: 'Data for LLM Training', course: 'understand', personas: ['technical'] },
  { id: 'alignment', label: 'Alignment & Safety', businessLabel: 'Trust & Safety', course: 'understand', personas: ['technical', 'business'] },
  { id: 'architecture', label: 'Architecture Decisions', course: 'understand', personas: ['technical'] },
  { id: 'solution', label: 'From Problem to Solution', course: 'understand', personas: ['technical', 'business'] },
  { id: 'evaluation', label: 'Evaluation & Benchmarks', businessLabel: 'How to Know If It Works', course: 'understand', personas: ['technical', 'business'] },
  { id: 'quantization', label: 'Quantization & Formats', course: 'understand', personas: ['technical'] },
  { id: 'inference', label: 'Inference & Deployment', course: 'understand', personas: ['technical'] },
  { id: 'industry', label: 'The Industry Map', businessLabel: 'Who Makes What', course: 'understand', personas: ['technical', 'business'] },
  { id: 'embeddings', label: 'Embeddings & Vector Search', businessLabel: 'Search & Knowledge Retrieval', course: 'understand', personas: ['technical', 'business'] },
  { id: 'prompting', label: 'Prompt Engineering', businessLabel: 'How to Talk to AI', course: 'understand', personas: ['technical', 'business'] },
  { id: 'agents', label: 'Agents & Tool Use', businessLabel: 'AI Assistants That Take Action', course: 'understand', personas: ['technical', 'business'] },
  { id: 'ai-in-org', label: 'AI in Your Organization', course: 'understand', personas: ['technical', 'business'] },
  { id: 'fine-tuning', label: 'Fine-Tuning Hands-On', course: 'understand', personas: ['technical'] },
  { id: 'tools-landscape', label: 'AI Tools Landscape', course: 'use', personas: ['technical', 'business'] },
]
```

(Entries copied verbatim from App.tsx — verify against the current file, don't retype from this plan if they diverge.)

- [ ] **Step 2: Rewire App.tsx**

In `src/App.tsx`:

(a) After the CourseContext import (line 3), add:

```tsx
import { MODULES, type ModuleId, type Persona } from './registry'
```

(b) DELETE the local `type Persona = ...` line (~line 28), the local `type ModuleId = ...` line (~line 30), and the entire local `const modules: {...}[] = [...]` array (~lines 32-52).

(c) Replace every remaining reference to `modules` in App.tsx with `MODULES`. There are exactly four: `modules.map((m) => m.id)` in `parseHash`; `modules.filter(...)` in the `visibleModules` memo; `modules.find(...)` in the SpacedReview `onNavigateToModule` callback; and the `visibleModules: typeof modules` type annotation in `ModuleNavigation` props — change that one to `typeof MODULES`.

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 4: Manual sanity check**

Run: `npm run dev`. App loads, sidebar shows 18 modules (understand/technical), course switcher works, Tools Landscape appears under Use AI. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add src/registry.ts src/App.tsx
git commit -m "refactor: extract module registry to src/registry.ts"
```

---

## Task 3: CourseBridge component + bridge labels (EN/SV/KO)

**Files:**
- Create: `src/components/CourseBridge.tsx`
- Modify: `src/ui-labels.ts`

- [ ] **Step 1: Add bridge labels to ui-labels.ts**

In `src/ui-labels.ts`, in the `en` block after the `'course.use'` line, add:

```ts
    'bridge.deeper': 'Under the hood',
    'bridge.apply': 'Try it for real',
```

In the `sv` block after its `'course.use'` line, add:

```ts
    'bridge.deeper': 'Under huven',
    'bridge.apply': 'Prova på riktigt',
```

In the `ko` block after its `'course.use'` line, add:

```ts
    'bridge.deeper': '내부 들여다보기',
    'bridge.apply': '직접 해보기',
```

- [ ] **Step 2: Create src/components/CourseBridge.tsx**

```tsx
import { MODULES, type ModuleId } from '../registry'
import { useCourse } from '../CourseContext'
import { useDifficulty } from '../DifficultyContext'
import { MODULE_LABELS, t, useLanguage } from '../i18n'

interface CourseBridgeProps {
  /** Module to link to — must belong to the OTHER course. */
  target: ModuleId
  /** One-sentence hook for why the reader would cross over. Pass a translated string. */
  blurb: string
}

/**
 * Curated cross-course link ("go deeper" ⟷ "go apply").
 * Renders nothing when the target is in the current course or not visible
 * for the active persona — a bridge must never dead-end.
 */
export const CourseBridge: React.FC<CourseBridgeProps> = ({ target, blurb }) => {
  const { course } = useCourse()
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  const targetMeta = MODULES.find((m) => m.id === target)
  if (!targetMeta || targetMeta.course === course || !targetMeta.personas.includes(mode)) return null

  const ml = MODULE_LABELS[lang]?.[target]
  const targetLabel = ml ? (mode === 'business' && ml.businessLabel ? ml.businessLabel : ml.label) : targetMeta.label
  const heading = t(lang, targetMeta.course === 'understand' ? 'bridge.deeper' : 'bridge.apply')

  const go = () => {
    window.history.pushState(null, '', `#/${targetMeta.course}/${mode}/${target}`)
    // pushState never fires popstate on its own; App's popstate handler owns
    // cross-course navigation (course, persona, module, visited), so invoke it once.
    window.dispatchEvent(new PopStateEvent('popstate'))
    document.querySelector('main')?.scrollTo({ top: 0 })
  }

  return (
    <aside className="mt-6 max-w-2xl rounded-lg border border-dashed border-amber-300 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 p-4">
      <p className="font-mono text-xs font-semibold tracking-wide text-amber-700 dark:text-amber-400 uppercase">{heading}</p>
      <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{blurb}</p>
      <button
        onClick={go}
        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-amber-700 dark:text-amber-300 transition-colors hover:text-amber-600 dark:hover:text-amber-200"
      >
        {targetLabel} <span aria-hidden="true">→</span>
      </button>
    </aside>
  )
}
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS (component not used yet; it exports, so no unused warnings).

- [ ] **Step 4: Commit**

```bash
git add src/components/CourseBridge.tsx src/ui-labels.ts
git commit -m "feat: add CourseBridge component for cross-course links"
```

---

## Task 4: English blurbs + wire the first four bridges

**Files:**
- Modify: `src/i18n/en.ts`
- Modify: `src/modules/toolslandscape/ToolCategoriesSection.tsx`
- Modify: `src/modules/toolslandscape/ToolCategoriesBusiness.tsx`
- Modify: `src/modules/toolslandscape/AgenticLoopSection.tsx`
- Modify: `src/modules/IndustryModule.tsx`

- [ ] **Step 1: Add blurbs to en.ts**

In `src/i18n/en.ts`:

(a) Inside `modules.toolslandscape.categories` (after `axisNote`), add:

```ts
      bridgeBlurb: 'Curious who actually builds the models behind these tools — and why some are open and some closed?',
```

(b) Inside `modules.toolslandscape.categoriesBiz` (after `axisNote`), add:

```ts
      bridgeBlurb: 'Want to know the companies behind these tools, and what their strategies mean for your business?',
```

(c) Inside `modules.toolslandscape.agenticLoop` (after `takeaway`), add:

```ts
      bridgeBlurb: 'That think → act → verify loop has real machinery inside — function calling, MCP, agent design patterns. See how it works.',
```

(d) Inside `modules.industry` (after the closing brace of `whereItsHeadingSection`, before the `},` that closes `industry`), add:

```ts
    bridgeToTools: 'You know who builds the models. The flip side: which of these products should YOU be using day to day?',
    bridgeToToolsBusiness: 'You know the players. Now see which of their tools fit your teams — and how to pick.',
```

- [ ] **Step 2: Bridge in ToolCategoriesSection.tsx**

Add the import after the existing imports:

```tsx
import { CourseBridge } from '../../components/CourseBridge'
```

Then directly AFTER the axisNote `<p>` (the last element before `</section>`), add:

```tsx
      <CourseBridge target="industry" blurb={c.bridgeBlurb} />
```

- [ ] **Step 3: Bridge in ToolCategoriesBusiness.tsx**

Same import; same placement after its axisNote `<p>`:

```tsx
      <CourseBridge target="industry" blurb={c.bridgeBlurb} />
```

- [ ] **Step 4: Bridge in AgenticLoopSection.tsx**

Same import; after the takeaway `<p>` (last element before `</section>`):

```tsx
      <CourseBridge target="agents" blurb={c.bridgeBlurb} />
```

- [ ] **Step 5: Bridges in IndustryModule.tsx**

Add imports after the existing i18n import (line 1 — keep `translateQuestions, useLanguage` and add `useTranslation`):

```tsx
import { translateQuestions, useLanguage, useTranslation } from '../i18n'
```

and after the ModuleLayout import:

```tsx
import { CourseBridge } from '../components/CourseBridge'
```

In the component body after `const { lang } = useLanguage()`:

```tsx
  const tr = useTranslation().modules.industry
```

In the BUSINESS branch, insert before `<KnowledgeCheck ...>`:

```tsx
        <CourseBridge target="tools-landscape" blurb={tr.bridgeToToolsBusiness} />
```

In the TECHNICAL branch, insert before `<KnowledgeCheck ...>`:

```tsx
      <CourseBridge target="tools-landscape" blurb={tr.bridgeToTools} />
```

- [ ] **Step 6: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 7: Manual behavior check**

Run: `npm run dev`.
- Use AI / Technical → Tools Landscape: "UNDER THE HOOD" bridges appear after section 1 (→ The Industry Map) and section 2 (→ Agents & Tool Use). Clicking the section-1 bridge switches to Understand AI / Industry Map, scrolled to top, hash `#/understand/technical/industry`. ✔
- On Industry Map: "TRY IT FOR REAL" bridge appears before the quiz; clicking returns to Use AI / Tools Landscape. ✔
- Business persona: same round trip with business labels ("Who Makes What"). ✔
- Browser back after a bridge click returns to the originating module/course. ✔
Stop the dev server.

- [ ] **Step 8: Commit**

```bash
git add src/i18n/en.ts src/modules/toolslandscape src/modules/IndustryModule.tsx
git commit -m "feat: wire first CourseBridges (Tools Landscape ⟷ Industry Map, Agentic Loop → Agents)"
```

---

## Task 5: SV/KO blurb translations

**Files:**
- Modify: `src/i18n/sv.ts`
- Modify: `src/i18n/ko.ts`

- [ ] **Step 1: Swedish**

In `src/i18n/sv.ts`:

(a) Inside `modules.toolslandscape.categories` (after `axisNote`):

```ts
        bridgeBlurb: 'Nyfiken på vem som faktiskt bygger modellerna bakom dessa verktyg — och varför vissa är öppna och andra stängda?',
```

(b) Inside `modules.toolslandscape.categoriesBiz` (after `axisNote`):

```ts
        bridgeBlurb: 'Vill du veta vilka företag som står bakom verktygen, och vad deras strategier betyder för ditt företag?',
```

(c) Inside `modules.toolslandscape.agenticLoop` (after `takeaway`):

```ts
        bridgeBlurb: 'Loopen tänk → agera → verifiera har riktigt maskineri inuti — funktionsanrop, MCP, agentdesignmönster. Se hur det fungerar.',
```

(d) Inside `modules.industry` (after the closing brace of `whereItsHeadingSection`):

```ts
      bridgeToTools: 'Du vet vem som bygger modellerna. Andra sidan av myntet: vilka av dessa produkter borde DU använda dagligen?',
      bridgeToToolsBusiness: 'Du känner till aktörerna. Se nu vilka av deras verktyg som passar dina team — och hur man väljer.',
```

- [ ] **Step 2: Korean**

In `src/i18n/ko.ts`, same four positions:

(a) `modules.toolslandscape.categories`:

```ts
        bridgeBlurb: '이 도구들 뒤의 모델을 실제로 누가 만드는지 — 그리고 왜 어떤 것은 오픈이고 어떤 것은 클로즈드인지 궁금하신가요?',
```

(b) `modules.toolslandscape.categoriesBiz`:

```ts
        bridgeBlurb: '이 도구들 뒤에 있는 회사들과, 그들의 전략이 비즈니스에 어떤 의미인지 알고 싶으신가요?',
```

(c) `modules.toolslandscape.agenticLoop`:

```ts
        bridgeBlurb: '생각 → 행동 → 검증 루프 안에는 실제 작동 원리가 있습니다 — 함수 호출, MCP, 에이전트 디자인 패턴. 어떻게 작동하는지 보세요.',
```

(d) `modules.industry`:

```ts
      bridgeToTools: '누가 모델을 만드는지 알았습니다. 반대편 질문: 이 제품들 중 무엇을 매일 사용해야 할까요?',
      bridgeToToolsBusiness: '주요 기업들을 알았습니다. 이제 그들의 도구 중 무엇이 우리 팀에 맞는지 — 그리고 고르는 법을 보세요.',
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS (`DeepPartial<Translation>` catches structural typos).

- [ ] **Step 4: Manual check**

Run: `npm run dev`. SV: bridges show "UNDER HUVEN" / "PROVA PÅ RIKTIGT" with Swedish blurbs; KO equivalents. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/sv.ts src/i18n/ko.ts
git commit -m "i18n: SV/KO CourseBridge blurbs"
```

---

## Task 6: Full regression + Phase 2 gate

**Files:** none (verification only)

- [ ] **Step 1: Clean build + lint** — both PASS, no warnings.

- [ ] **Step 2: Full manual regression**

Run: `npm run dev`, confirm:
- **Deep links (fresh profile each):** `#/use/technical/tools-landscape`, `#/use/business/tools-landscape`, `#/understand/business/prompting`, legacy `#/technical/tokens`, bare URL — all resolve correctly with hash preserved/normalized. ✔
- **Bridges:** all four placements render; round trip Tools Landscape ⟷ Industry Map works in both personas; Agentic Loop → Agents works (technical); back button restores origin. ✔
- **No dead bridges:** bridges never render a link to the course you're already in. ✔
- **Everything from Phase 1 still works:** course switcher, persona filtering, per-course progress, quizzes, SV/KO, dark mode. ✔
- **Spaced Review unaffected.** ✔

- [ ] **Step 3: Commit any fixups**

```bash
git add -A
git commit -m "fix: Phase 2 regression fixups"
```

---

## Self-Review Notes (for the implementer)

- **Spec coverage:** Implements spec Phase 2 exactly: `<CourseBridge>` (directional callout, persona-aware, cross-course only, no dead links) + 2-3 wired bridges (we wire 4 placements / 3 logical bridges, including the spec's named example Tools Landscape ⟷ Industry Map). The deep-link fix is a Phase 0 defect repair folded in (found during Phase 1 runtime verification).
- **Navigation correctness:** the manual `PopStateEvent` dispatch is the load-bearing trick — verify in the browser (Task 4 Step 7), not just by reading code. If module content doesn't change on bridge click, that's the place to look.
- **Import cycle:** CourseBridge must import from `src/registry.ts`, never from `App.tsx`.
- **`typeof modules` annotation:** `ModuleNavigation`'s prop type referenced the old local array; Task 2 Step 2(c) renames it — easy to miss, build will catch it.
- **DeepPartial safety:** sv/ko additions are structurally checked against en.ts at compile time; if Task 5 fails to build, the key path (not the prose) is wrong.
- **Industry i18n note:** `bridgeToTools*` keys sit at the `modules.industry` level (not inside a section subtree) because the bridge is placed by the module root, not a section component.
