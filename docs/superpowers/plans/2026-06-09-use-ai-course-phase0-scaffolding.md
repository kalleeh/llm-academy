# "Use AI" Course — Phase 0: Scaffolding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the infrastructure for a two-course academy (course switcher above the persona toggle, per-course module filtering, per-course progress, backward-compatible URLs) with ZERO change to the existing app's visible behavior.

**Architecture:** Introduce a `CourseContext` mirroring the existing `DifficultyContext`. Extend the `App.tsx` module registry with `course` and `personas` fields (migrating the `businessVisible` boolean). Add a segmented course switcher to the sidebar. Namespace progress/visited state and the URL hash by course, with backward-compatible parsing of the old `#/<track>/<module>` format. No new "Use AI" modules are added in this phase — `course: 'use'` simply yields an empty module list for now.

**Tech Stack:** React 19, TypeScript (strict, `noUnusedLocals`/`noUnusedParameters` on), Vite 8, Tailwind v4. No test runner — every task is verified by `npm run build && npm run lint` plus explicit manual-behavior checks. Pure functions get inline assertion snippets you run with `node`.

**Reference spec:** `docs/superpowers/specs/2026-06-09-use-ai-course-design.md`

---

## File Structure

- **Create:** `src/CourseContext.tsx` — `'understand' | 'use'` state, localStorage persistence, `useCourse()` hook. Mirrors `DifficultyContext.tsx` exactly in shape.
- **Modify:** `src/main.tsx` — wrap `<App/>` in `<CourseProvider>`.
- **Modify:** `src/App.tsx` — registry fields (`course`, `personas`), course-aware `visibleModules`, course switcher UI, per-course progress, hash format `#/<course>/<persona>/<module>` with legacy fallback.
- **Modify:** `src/ui-labels.ts` — add `course.understand` / `course.use` labels for EN/SV/KO.

No existing module files or section components change in Phase 0.

---

## Task 1: Create CourseContext

**Files:**
- Create: `src/CourseContext.tsx`

- [ ] **Step 1: Write the context file**

Create `src/CourseContext.tsx` with this exact content (a faithful mirror of `DifficultyContext.tsx`, but with a named `setCourse` in addition to `toggle` because the switcher selects a specific course rather than flipping):

```tsx
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export type Course = 'understand' | 'use'

interface CourseContextValue {
  course: Course
  setCourse: (c: Course) => void
}

const STORAGE_KEY = 'llm-academy-course'

const CourseContext = createContext<CourseContextValue>({
  course: 'understand',
  setCourse: () => {},
})

export function CourseProvider({ children }: { children: ReactNode }) {
  const [course, setCourseState] = useState<Course>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'use' ? 'use' : 'understand'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, course)
  }, [course])

  const setCourse = useCallback((c: Course) => setCourseState(c), [])

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      {children}
    </CourseContext.Provider>
  )
}

export function useCourse() {
  return useContext(CourseContext)
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: PASS — build completes, no TypeScript errors. (The provider isn't used yet; that's fine — exporting it means no unused-local error inside the file.)

- [ ] **Step 3: Commit**

```bash
git add src/CourseContext.tsx
git commit -m "feat: add CourseContext for two-course academy"
```

---

## Task 2: Wire CourseProvider into the app root

**Files:**
- Modify: `src/main.tsx`

- [ ] **Step 1: Add the import**

In `src/main.tsx`, add this import after the `DifficultyProvider` import (line 5):

```tsx
import { CourseProvider } from './CourseContext.tsx'
```

- [ ] **Step 2: Wrap App in CourseProvider**

Replace the render tree so `CourseProvider` sits just inside `DifficultyProvider` (innermost-but-one, wrapping `<App/>`). The full `createRoot(...)` call becomes:

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <DifficultyProvider>
          <CourseProvider>
            <App />
          </CourseProvider>
        </DifficultyProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS — both clean.

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx
git commit -m "feat: mount CourseProvider at app root"
```

---

## Task 3: Add course labels to ui-labels

**Files:**
- Modify: `src/ui-labels.ts`

- [ ] **Step 1: Add EN labels**

In `src/ui-labels.ts`, inside the `en: { ... }` block of the `UI` object, add these two keys right after the `'track.technical'` line (line 6):

```ts
    'course.understand': 'Understand AI',
    'course.use': 'Use AI',
```

- [ ] **Step 2: Add SV labels**

Inside the `sv: { ... }` block, after the `'track.technical': 'Tekniska spåret',` line (line 31), add:

```ts
    'course.understand': 'Förstå AI',
    'course.use': 'Använda AI',
```

- [ ] **Step 3: Add KO labels**

Inside the `ko: { ... }` block, after the `'track.technical': '기술 트랙',` line (line 55), add:

```ts
    'course.understand': 'AI 이해하기',
    'course.use': 'AI 활용하기',
```

- [ ] **Step 4: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/ui-labels.ts
git commit -m "feat: add Understand/Use course labels (EN/SV/KO)"
```

---

## Task 4: Extend the module registry with course + personas

**Files:**
- Modify: `src/App.tsx:27-48`

This task changes the data model only. The `businessVisible` boolean becomes a `personas` array, and every existing module gets `course: 'understand'`. No filtering logic changes yet (Task 5 does that), so behavior is identical after this task as long as the old `businessVisible` reads are updated in lockstep — which they are, here.

- [ ] **Step 1: Replace the ModuleId type and registry**

In `src/App.tsx`, replace the `type ModuleId` line (line 27) and the `const modules` array (lines 29-48) with:

```tsx
type Course = 'understand' | 'use'
type Persona = 'technical' | 'business'

type ModuleId = 'ai-problem' | 'data-foundations' | 'tokens' | 'transformer' | 'training' | 'llm-data' | 'alignment' | 'architecture' | 'solution' | 'evaluation' | 'quantization' | 'inference' | 'industry' | 'embeddings' | 'prompting' | 'agents' | 'ai-in-org' | 'fine-tuning'

const modules: { id: ModuleId; label: string; businessLabel?: string; course: Course; personas: Persona[] }[] = [
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
]
```

Note: the local `type Course` here duplicates the one in `CourseContext.tsx` intentionally — App.tsx will import the canonical one in Task 5. For now this keeps the file compiling as a standalone edit. (Task 5 removes this local `type Course`.)

- [ ] **Step 2: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS. The `visibleModules` memo at the old line ~178 still reads `m.businessVisible` — wait: it will now error because `businessVisible` no longer exists. **This is expected and fixed in the very next step.** If the build fails here with "Property 'businessVisible' does not exist", proceed to Step 3 immediately.

- [ ] **Step 3: Update the visibleModules filter to use personas**

Find the `visibleModules` memo (search for `mode === 'business' ? modules.filter`). Replace it with the persona-array version (still course-unaware for this task — course filtering lands in Task 5):

```tsx
  const visibleModules = useMemo(
    () => modules.filter((m) => m.personas.includes(mode)),
    [mode],
  )
```

- [ ] **Step 4: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS. Behavior is now identical to before: business mode shows the same 10 modules (those whose `personas` include `'business'`), technical shows all 18.

- [ ] **Step 5: Manual behavior check**

Run: `npm run dev`, open the app.
- In Technical mode: sidebar shows all 18 modules. ✔
- Toggle to Business mode: sidebar shows exactly 10 modules (AI Problem, Data Foundations, Alignment, Solution, Evaluation, Industry, Embeddings, Prompting, Agents, AI in Org). ✔
Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx
git commit -m "refactor: migrate module registry to course+personas model"
```

---

## Task 5: Make module filtering course-aware

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Import the canonical Course type and useCourse**

At the top of `src/App.tsx`, the existing import on line 2 is:

```tsx
import { useDifficulty } from './DifficultyContext'
```

Add immediately after it:

```tsx
import { useCourse, type Course } from './CourseContext'
```

Then DELETE the local `type Course = 'understand' | 'use'` line added in Task 4 Step 1 (it now conflicts with the import). Keep the local `type Persona` line.

- [ ] **Step 2: Read course from context in the App component**

Find the line `const { mode, toggle: toggleMode } = useDifficulty()` (around line 160). Add immediately after it:

```tsx
  const { course, setCourse } = useCourse()
```

- [ ] **Step 3: Make visibleModules filter by course AND persona**

Replace the `visibleModules` memo from Task 4 Step 3 with:

```tsx
  const visibleModules = useMemo(
    () => modules.filter((m) => m.course === course && m.personas.includes(mode)),
    [course, mode],
  )
```

- [ ] **Step 4: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 5: Manual behavior check**

Run: `npm run dev`.
- Course is `understand` by default → app looks exactly as before (18 technical / 10 business). ✔
- In the browser console, run `localStorage.setItem('llm-academy-course','use'); location.reload()` → sidebar module list is now EMPTY (no `course: 'use'` modules exist yet). This is correct for Phase 0. ✔
- Reset: `localStorage.setItem('llm-academy-course','understand'); location.reload()`.
Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx
git commit -m "feat: filter modules by active course"
```

---

## Task 6: Add the course switcher UI to the sidebar

**Files:**
- Modify: `src/App.tsx` (sidebar header, just above the mode toggle button)

- [ ] **Step 1: Insert the course switcher markup**

In the sidebar's sticky header, find the mode toggle button — it starts with `<button` and has `onClick={toggleMode}` (around line 301). Immediately BEFORE that `<button onClick={toggleMode} ...>`, insert this segmented course switcher:

```tsx
          {/* Course switcher */}
          <div className="flex gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5" role="group" aria-label="Course">
            {(['understand', 'use'] as Course[]).map((c) => (
              <button
                key={c}
                onClick={() => setCourse(c)}
                aria-pressed={course === c}
                className={`flex-1 rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors ${
                  course === c
                    ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                {t(lang, c === 'understand' ? 'course.understand' : 'course.use')}
              </button>
            ))}
          </div>
```

This reuses the existing `t(lang, key)` helper (already imported on line 3) and the same zinc styling as the language selector below it.

- [ ] **Step 2: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 3: Manual behavior check**

Run: `npm run dev`.
- The sidebar now shows an "Understand AI | Use AI" segmented control above the track toggle. ✔
- "Understand AI" is highlighted by default; clicking "Use AI" empties the module list and highlights "Use AI"; clicking back restores the modules. ✔
- Switch language to SV/KO → the switcher labels translate (Förstå AI / Använda AI, AI 이해하기 / AI 활용하기). ✔
Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add course switcher to sidebar"
```

---

## Task 7: Course-aware URL hash with backward compatibility

**Files:**
- Modify: `src/App.tsx` — `parseHash` (lines 147-157) and the three hash-related `useEffect`s + `navigateTo`.

The new hash format is `#/<course>/<persona>/<module>`. Old links `#/<persona>/<module>` (e.g. `#/technical/tokens`) must still resolve, defaulting course to `understand`.

- [ ] **Step 1: Rewrite parseHash to handle both formats**

Replace the entire `parseHash` function (lines 147-157) with:

```tsx
function parseHash(): { course?: Course; module?: ModuleId; track?: Persona } {
  const hash = window.location.hash.replace(/^#\/?/, '')
  if (!hash) return {}
  const parts = hash.split('/')
  const validCourses = ['understand', 'use'] as const
  const validTracks = ['technical', 'business'] as const
  const validModules = modules.map((m) => m.id)
  const result: { course?: Course; module?: ModuleId; track?: Persona } = {}

  // New format: <course>/<track>/<module>
  if (validCourses.includes(parts[0] as typeof validCourses[number])) {
    result.course = parts[0] as Course
    if (validTracks.includes(parts[1] as typeof validTracks[number])) result.track = parts[1] as Persona
    if (validModules.includes(parts[2] as ModuleId)) result.module = parts[2] as ModuleId
    return result
  }

  // Legacy format: <track>/<module>  → course defaults to 'understand'
  if (validTracks.includes(parts[0] as typeof validTracks[number])) {
    result.course = 'understand'
    result.track = parts[0] as Persona
    if (validModules.includes(parts[1] as ModuleId)) result.module = parts[1] as ModuleId
  }
  return result
}
```

Note: `Persona` is the local type alias defined in Task 4. It equals `'technical' | 'business'`.

- [ ] **Step 2: Apply parsed course on initial load**

Find the initial-load `useEffect` that reads the track from the hash (search for `// On initial load, apply track from hash`). Replace its body so it also applies the course:

```tsx
  // On initial load, apply course + track from hash
  useEffect(() => {
    const { course: hashCourse, track } = parseHash()
    if (hashCourse && hashCourse !== course) setCourse(hashCourse)
    if (track && track !== mode) toggleMode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
```

- [ ] **Step 3: Include course when writing the hash on state change**

Find the "Sync URL hash with current state" `useEffect` (search for `const newHash = `). Replace it with the course-prefixed version:

```tsx
  // Sync URL hash with current state
  useEffect(() => {
    const newHash = `#/${course}/${mode}/${activeModule}`
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash)
    }
  }, [course, mode, activeModule])
```

- [ ] **Step 4: Handle course in popstate (back/forward)**

Find the `onPopState` handler (search for `const onPopState`). Replace the handler body to also reconcile course:

```tsx
    const onPopState = () => {
      const { course: hashCourse, module, track } = parseHash()
      if (hashCourse && hashCourse !== course) setCourse(hashCourse)
      if (track && track !== mode) toggleMode()
      if (module && module !== activeModule) {
        setShowReview(false)
        setActiveModule(module)
        setVisited(prev => new Set(prev).add(module))
      }
    }
```

Then update that effect's dependency array to include `course` and `setCourse`. Find the line `}, [mode, activeModule, toggleMode])` directly tied to this effect and replace with:

```tsx
  }, [course, setCourse, mode, activeModule, toggleMode])
```

- [ ] **Step 5: Include course in the pushState inside navigateTo**

In the `navigateTo` callback, find `window.history.pushState(null, '', `#/${mode}/${id}`)` and replace with:

```tsx
        window.history.pushState(null, '', `#/${course}/${mode}/${id}`)
```

Then add `course` to the `navigateTo` dependency array: find `[activeModule, showReview, mode]` and replace with `[activeModule, showReview, mode, course]`.

- [ ] **Step 6: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS. (If lint flags an unused `setCourse` or missing dep, re-check Steps 4-5.)

- [ ] **Step 7: Manual behavior check — backward compatibility**

Run: `npm run dev`.
- Navigate to a module normally → URL shows `#/understand/technical/<module>`. ✔
- Manually visit `<dev-url>#/technical/tokens` (old format) and reload → resolves to the Tokens module in technical mode, course defaults to Understand AI. ✔
- Browser back/forward moves between modules correctly. ✔
Stop the dev server.

- [ ] **Step 8: Commit**

```bash
git add src/App.tsx
git commit -m "feat: course-aware URL hash with legacy fallback"
```

---

## Task 8: Namespace progress + visited state by course

**Files:**
- Modify: `src/App.tsx`

Today `visited` is a single `Set<ModuleId>` and the progress bar counts visited-visible modules. With two courses this should not bleed across courses. We scope `visited` per-course using a `Record<Course, Set<ModuleId>>`.

- [ ] **Step 1: Change the visited state to per-course**

Find the `visited` state initializer (search for `const [visited, setVisited]`). Replace it with a per-course map:

```tsx
  const [visited, setVisited] = useState<Record<Course, Set<ModuleId>>>(() => {
    const { course: hashCourse, module } = parseHash()
    const initialCourse: Course = hashCourse ?? 'understand'
    const initialModule = module ?? 'ai-problem'
    return {
      understand: new Set<ModuleId>(initialCourse === 'understand' ? [initialModule] : []),
      use: new Set<ModuleId>(initialCourse === 'use' ? [initialModule] : []),
    }
  })
```

- [ ] **Step 2: Update every setVisited call to write into the active course's set**

There are three places that call `setVisited`. Replace each:

(a) In the `visibleModules` "jump to first visible" effect — find `setVisited((prev) => new Set(prev).add(visibleModules[0].id))` and replace with:

```tsx
        setVisited((prev) => ({ ...prev, [course]: new Set(prev[course]).add(visibleModules[0].id) }))
```

(b) In `navigateTo` — find `setVisited((prev) => new Set(prev).add(id))` and replace with:

```tsx
        setVisited((prev) => ({ ...prev, [course]: new Set(prev[course]).add(id) }))
```

(c) In `onPopState` — find `setVisited(prev => new Set(prev).add(module))` and replace with:

```tsx
        setVisited((prev) => ({ ...prev, [course]: new Set(prev[course]).add(module) }))
```

- [ ] **Step 3: Update visited counts to read the active course's set**

Find the progress calculation (search for `const visitedVisible =`). Replace these two lines:

```tsx
  const visitedVisible = visibleModules.filter((m) => visited.has(m.id)).length
  const progressPercent = Math.round((visitedVisible / visibleModules.length) * 100)
```

with:

```tsx
  const courseVisited = visited[course]
  const visitedVisible = visibleModules.filter((m) => courseVisited.has(m.id)).length
  const progressPercent = visibleModules.length > 0 ? Math.round((visitedVisible / visibleModules.length) * 100) : 0
```

The `> 0` guard prevents `NaN%` when the "Use AI" course has no modules yet in Phase 0.

- [ ] **Step 4: Update the sidebar isVisited check**

Find where each module button computes `isVisited` (search for `const isVisited = visited.has(mod.id)`). Replace with:

```tsx
            const isVisited = courseVisited.has(mod.id)
```

- [ ] **Step 5: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 6: Manual behavior check**

Run: `npm run dev`.
- Visit several modules in Understand AI → progress bar fills (e.g. 3/18), checkmarks appear. ✔
- Switch to Use AI → progress shows 0/0 → bar empty, no `NaN`, no crash. ✔
- Switch back to Understand AI → previous visited checkmarks and progress are preserved. ✔
Stop the dev server.

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx
git commit -m "feat: track visited modules and progress per course"
```

---

## Task 9: Final full-app regression check

**Files:** none (verification only)

- [ ] **Step 1: Clean build + lint**

Run: `npm run build && npm run lint`
Expected: both PASS with no warnings.

- [ ] **Step 2: Full manual regression**

Run: `npm run dev` and confirm ALL of the following:
- Default load (fresh localStorage, after clearing `llm-academy-course`): Understand AI course, Technical track, all 18 modules, app identical to pre-Phase-0. ✔
- Persona toggle still works within Understand AI (18 ↔ 10 modules). ✔
- Course switcher toggles Understand AI ↔ Use AI; Use AI shows empty list (expected). ✔
- Language switch translates the course switcher labels. ✔
- Theme toggle still works. ✔
- Spaced Review still opens and behaves as before (unchanged in Phase 0). ✔
- Old-format deep link `#/technical/tokens` still resolves. ✔
- New-format deep link `#/understand/business/prompting` resolves to Prompting in Business mode. ✔
Stop the dev server.

- [ ] **Step 3: Tag the phase complete (optional commit if any doc updates)**

If everything passes, Phase 0 is done. No code change needed here — this task is the gate. If you made any fixups during regression, commit them:

```bash
git add -A
git commit -m "fix: Phase 0 regression fixups"
```

---

## Self-Review Notes (for the implementer)

- **Spec coverage:** This plan implements the spec's "Architecture" (CourseContext, registry fields), "Navigation & IA Mechanics" (switcher, course+persona filter, per-course progress, hash format + backward-compat, empty-list edge case). It does NOT implement `CourseBridge` (spec Phase 2), any "Use AI" module content (spec Phases 1 & 3), or the pedagogical-mantra emulations (those apply to content modules, not scaffolding). Those are deliberately out of scope for Phase 0.
- **`businessVisible` removal:** Grep `src/` for `businessVisible` after Task 4 — it should appear ONLY in the new `personas` migration, nowhere else. The original boolean had no other readers (confirmed: only `visibleModules` used it).
- **`MODULE_LABELS` untouched:** The sidebar's `displayLabel` logic (business vs default label) keys off `mode`, not the registry boolean, so it needs no change. Verify the label lookup at the module `<li>` still compiles.
- **Type duplication:** `Course` is defined canonically in `CourseContext.tsx` and imported into `App.tsx` (Task 5). The transient local `type Course` from Task 4 is removed in Task 5 Step 1 — do not leave both.
