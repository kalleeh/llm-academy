# i18n Consolidation Refactor — Ground-Truth Spec

**Audience:** Subagents working on this refactor. Read this fully before any action. The orchestrator (kalleh's main session) wrote this; deviations require their approval.

**Repo:** `/Users/wallbomk/Projects.local/llm-academy`
**Branch:** `main`
**Live URL:** https://llm-academy.gurum.se

---

## Goal

Replace the current 44-file / 6-pattern translation system with a single typed translation tree under `src/i18n/{en,sv,ko}.ts` plus one `useTranslation()` hook. Preserve every existing human-translated string. Machine-translate only what's missing. Migrate all 130+ component files. Delete all old translation files. Build clean, no behavior regression.

---

## Current state (do not skip — this is what you must replace)

### File inventory (44 files)
- `src/ui-labels.ts` — UI chrome strings, exposes `t(lang, key)` and `MODULE_LABELS`
- `src/labels.ts` — short reusable labels (Yes/No/Pros/Cons/etc), exposes `tLabel(lang, key)`
- `src/quiz-translations.ts` — quiz Q&A, exposes `translateQuestions(questions, lang)`
- `src/selfexplain-translations.ts` — SelfExplain prompts, exposes `translateSelfExplain(prompt, answer, lang)`
- 9 × `src/modules/<m>/translations.ts` — Business-track section prose for `useT(EN, {sv,ko})`
- 16 × `src/modules/<m>/tech-translations.ts` — Technical-track section prose
- 16 × `src/modules/<m>/data-translations.ts` — Data arrays for `tArray(lang, EN, {sv,ko})`
- `src/i18n/index.ts` — barrel that re-exports everything

### 6 patterns currently in use
| Pattern | Helper | Calls | Source |
|---|---|---:|---|
| Component prose | `useT(EN, {sv, ko})` | 109 | `*/translations.ts`, `*/tech-translations.ts` |
| Data arrays | `tArray(lang, EN, {sv, ko})` | 63 | `*/data-translations.ts` |
| Quiz | `translateQuestions(qs, lang)` | 29 | `quiz-translations.ts` |
| SelfExplain | `translateSelfExplain(p, a, lang)` | 3 | `selfexplain-translations.ts` |
| UI chrome | `t(lang, key)` | 12 | `ui-labels.ts` |
| Short labels | `tLabel(lang, key)` | 17 | `labels.ts` |

### Languages
`Language = 'en' | 'sv' | 'ko'` — defined in `src/LanguageContext.tsx`. Do not change.

### Critical fallback semantic
`useT` and `tArray` silently fall back to English when a key is missing OR has empty-string value. The new system must preserve this: a missing/empty SV/KO entry must render the English value, never `undefined` or empty.

---

## Target architecture

### File layout
```
src/i18n/
├── index.ts          # Public API: useTranslation, Language re-export
├── types.ts          # Translation type derived from en.ts shape
├── en.ts             # Canonical EN — single source of truth for shape & defaults
├── sv.ts             # Swedish — same DeepPartial<Translation> shape
└── ko.ts             # Korean — same DeepPartial<Translation> shape
```

Old files **must be deleted** at the end of stage D.

### Translation tree shape
```ts
// src/i18n/en.ts (sketch — exact shape determined by audit)
export const en = {
  ui: {
    appTitle: 'LLM Academy',
    track: { business: 'Business Track', technical: 'Technical Track' },
    review: { title: 'Spaced Review', start: 'Start Review', /* ... */ },
    check: { title: 'Check Your Understanding', /* ... */ },
    explain: { title: 'Explain It', /* ... */ },
    nav: { previous: 'Previous', next: 'Next' },
  },
  labels: {           // short reusable labels (was tLabel)
    yes: 'Yes', no: 'No', pros: 'Pros', cons: 'Cons',
    tools: 'Tools', whenToUse: 'When to use', /* ... all from labels.ts */
  },
  moduleLabels: {     // sidebar labels (was MODULE_LABELS)
    aiproblem: 'What\'s an AI Problem?',
    /* ... all 18 modules */
  },
  modules: {
    agents: {
      // grouped by section file, kebab→camelCase
      whatAreAgents: { title, intro, /* prose keys */ },
      toolUse:        { title, intro, tools: [{ name, analogy, whatItDoes, businessExample }, ...] },
      patterns:       { title, intro, patterns: [{ name, analogy, howItWorks, bestFor, realExample }, ...] },
      /* etc */
      // data arrays live as plain arrays here, no separate file
    },
    aiproblem:       { /* ... */ },
    alignment:       { /* ... */ },
    architecture:    { /* ... */ },
    datafoundations: { /* ... */ },
    embeddings:      { /* ... */ },
    evaluation:      { /* ... */ },
    finetuning:      { /* ... */ },
    industry:        { /* ... */ },
    inference:       { /* ... */ },
    llmdata:         { /* ... */ },
    prompting:       { /* ... */ },
    quantization:    { /* ... */ },
    solution:        { /* ... */ },
    tokens:          { /* ... */ },
    training:        { /* ... */ },
    transformer:     { /* ... */ },
    aiInOrg:         { /* ... */ },   // AIInOrgModule.tsx
  },
  quiz: {
    'aiproblem-biz-1': { question: '...', options: ['...', ...], explanation: '...', modelAnswer: '...' },
    /* every quiz key */
  },
  selfExplain: {
    // Use the EXISTING 50-char-prefix key (preserves backward semantics until D);
    // stage D may rename to stable IDs — see "Migration notes" below.
    'In your own words, explain the difference between': { prompt: '...', modelAnswer: '...' },
    /* ... */
  },
} as const

export type Translation = typeof en
```

### Hook API
```ts
// src/i18n/index.ts
import { en } from './en'
import { sv } from './sv'
import { ko } from './ko'
import { useLanguage, type Language } from '../LanguageContext'
import type { DeepPartial } from './types'

const TABLES: Record<Language, DeepPartial<typeof en>> = { en, sv, ko }

/**
 * Deep-merges the per-lang table over en, falling back to EN for any missing
 * or empty-string leaf. Memoized per language switch.
 */
export function useTranslation(): typeof en { ... }

// Optional selector form for convenience (NOT required, but encouraged):
export function useT<R>(selector: (t: typeof en) => R): R {
  return selector(useTranslation())
}

// Re-exports
export { useLanguage } from '../LanguageContext'
export type { Language } from '../LanguageContext'
```

`DeepPartial<T>` recursively makes every leaf optional and allows empty strings to mean "fall back to EN". Arrays in `sv`/`ko` are `Partial<Item>[]` so individual array items can be partial too — matching current `tArray` semantics.

### Component usage examples
```tsx
// Before (5 different patterns):
const c = useT(EN, { sv: cSv, ko: cKo })
const stages = tArray(lang, STAGES, stageTranslations)
const qs = translateQuestions(QUESTIONS, lang)
const { prompt, answer } = translateSelfExplain(EN_PROMPT, EN_ANSWER, lang)
<button>{t(lang, 'review.start')}</button>
<th>{tLabel(lang, 'pros')}</th>

// After (one pattern):
const t = useTranslation()
const c = t.modules.agents.toolUse
const stages = t.modules.training.stages   // already correct shape
const qs = QUESTIONS.map(q => ({ ...q, ...t.quiz[q.id] }))   // pure data merge in component
const { prompt, modelAnswer } = t.selfExplain[key]
<button>{t.ui.review.start}</button>
<th>{t.labels.pros}</th>
```

---

## Translation policy

This is non-negotiable:

1. **Preserve every existing human translation.** Do not rewrite SV/KO strings that exist today. Copy them verbatim into the new tree.
2. **Empty strings count as "missing".** Pull them from EN (matching current fallback semantics).
3. **Machine-translate only the gaps.** Use clear, concise translations. Match the tone of existing human translations (informal, second-person, technical-yet-accessible). Preserve `**bold**`, backticks, and links.
4. **Mark MT entries.** In `sv.ts` and `ko.ts`, every machine-translated entry must be preceded by `// MT` on its own line. Example:
   ```ts
   // MT
   contextFiles: { title: 'Kontextfiler', intro: '…' },
   ```
   This lets a human reviewer find them later via grep.
5. **Keep technical terms in English where current translations do.** AGENTS.md, RAG, MCP, A2A, KV cache, etc. — preserve as-is. Look at existing translations for tone calibration.
6. **Do NOT translate code blocks, identifiers, URL paths.**
7. **Korean: use 합니다체 (formal-polite).** Match existing tone. No 해요체.
8. **Swedish: use neutral "du" form.** Match existing tone.

---

## Migration notes

### selfExplain key strategy
The current key is the first 50 chars of the English prompt. Stage D should:
- Stage A audit captures the EN prompt → existing 50-char key mapping.
- Keep the same 50-char keys in the new tree to minimize component churn.
- (Future cleanup, NOT this refactor: rename to stable IDs.)

### MODULE_LABELS
Currently keyed by module ID (`'aiproblem'`, `'tokens'`, …). Move directly into `t.moduleLabels`.

### Type strictness
`en.ts` MUST use `as const` so the inferred `Translation` type is precise (string literals, fixed array lengths, etc.). `sv.ts` and `ko.ts` declare `: DeepPartial<Translation>`.

### Backward compatibility
None required. This is an internal refactor — no external consumers. Old helpers (`useT`, `tArray`, `translateQuestions`, `translateSelfExplain`, `t`, `tLabel`, `MODULE_LABELS`) are deleted. Their source files are deleted. Any remaining import is a build error (good — proves migration completeness).

---

## Pipeline stages

### Stage A — Audit (output: `docs/i18n-refactor/inventory.json`)

**Input:** the codebase as-is.

**Output:** a JSON file with this shape:
```json
{
  "ui":          { "<key>": { "en": "...", "sv": "...", "ko": "..." } },
  "labels":      { "<key>": { "en": "...", "sv": "...", "ko": "..." } },
  "moduleLabels":{ "<id>":  { "en": "...", "sv": "...", "ko": "..." } },
  "modules": {
    "<moduleId>": {
      "<sectionKey>": {
        "<leafPath>": {
          "en": "...",
          "sv": "..." | "" | null,
          "ko": "..." | "" | null,
          "type": "string" | "array" | "object",
          "usedIn": ["src/modules/<m>/<File>.tsx"]
        }
      }
    }
  },
  "quiz":        { "<id>": { "en": {...}, "sv": {...}, "ko": {...}, "usedIn": [...] } },
  "selfExplain": { "<50charKey>": { "en": {...}, "sv": {...}, "ko": {...}, "usedIn": [...] } }
}
```

**Method:** read every file under `src/**/translations.ts`, `tech-translations.ts`, `data-translations.ts`, plus `quiz-translations.ts`, `selfexplain-translations.ts`, `ui-labels.ts`, `labels.ts`. Cross-reference with `useT/tArray/...` calls in `*.tsx` to record `usedIn`.

**Success:** every key from every old file is in the JSON. Run `wc -l` and check the count is reasonable (expect thousands of leaves).

### Stage B — Build canonical files (`src/i18n/en.ts`, `src/i18n/types.ts`, updated `src/i18n/index.ts`)

**Input:** `inventory.json` from A.

**Output:**
- `src/i18n/en.ts` with the full nested EN tree, `as const`.
- `src/i18n/types.ts` with `Translation` and `DeepPartial<T>`.
- `src/i18n/index.ts` rewritten with the new `useTranslation()` and `useT(selector)` hook. Old re-exports deleted.

**Constraint:** the tree shape must be stable — Stage C and D will key off this exact shape. Document any naming decisions inline.

### Stage C-sv — Build `src/i18n/sv.ts` (parallel with C-ko)

**Input:** `inventory.json` + `en.ts` shape.

**Output:** `src/i18n/sv.ts` exporting `sv: DeepPartial<Translation>`.

**Method:**
1. Walk every leaf in the EN shape.
2. If `inventory.modules.<m>.<sec>.<leaf>.sv` is non-empty → use it verbatim.
3. Else → machine-translate from EN, prepend `// MT` comment.
4. Maintain the SAME nested structure as `en.ts`. Do not flatten.

**Translation guidance:** see the **Translation policy** section above. When in doubt, look at the most recent human Swedish translations (e.g. `agents/translations.ts`'s `toolUseSv`) for tone calibration.

### Stage C-ko — Build `src/i18n/ko.ts` (parallel with C-sv)

Same as C-sv but for Korean. Use 합니다체. Reference `agents/translations.ts`'s `toolUseKo` for tone.

### Stage D — Migrate components + delete old files

**Inputs:** `en.ts` shape (from B). May start as soon as B is done; does not need C-sv/C-ko.

**Output:**
- All `*.tsx` files in `src/modules/**` and `src/components/**` updated to use `useTranslation()` (or `useT(selector)`).
- All 41 old translation source files deleted (the 44 minus `src/i18n/index.ts`, `src/LanguageContext.tsx`, `src/i18n/en.ts`).
- `src/useT.tsx`, `src/tArray.ts` deleted (replaced by new hook).

**Mechanical replacements:**
| Before | After |
|---|---|
| `import { useT } from '../../i18n'`<br>`const c = useT(EN, { sv: cSv, ko: cKo })` | `import { useTranslation } from '../../i18n'`<br>`const c = useTranslation().modules.<m>.<section>` |
| `import { tArray } from '../../i18n'`<br>`const x = tArray(lang, EN, xT)` | `const x = useTranslation().modules.<m>.<section>.<arrayName>` |
| `t(lang, 'review.start')` | `useTranslation().ui.review.start` |
| `tLabel(lang, 'pros')` | `useTranslation().labels.pros` |
| `translateQuestions(QS, lang)` | `QS.map(q => ({ ...q, ...useTranslation().quiz[q.id] }))` *(or extract earlier in component)* |
| `translateSelfExplain(P, A, lang)` | `useTranslation().selfExplain[KEY]` |
| `MODULE_LABELS[id][lang]` | `useTranslation().moduleLabels[id]` |

**Constraint:** preserve EN runtime behavior bit-for-bit. If you must change a component's structure to fit the new API, keep all visible strings identical to current EN.

### Stage E — Verify

**Inputs:** everything from B, C-sv, C-ko, D.

**Tasks:**
1. `npm run build` — must exit 0 with no TS errors.
2. `grep -rE "\b(useT|tArray|translateQuestions|translateSelfExplain|tLabel|MODULE_LABELS)\b" src` — must return zero hits in non-deleted files.
3. `grep -rE "from\s+['\"](\.\.?/)+(useT|tArray|quiz-translations|selfexplain-translations|ui-labels|labels)['\"]" src` — zero hits.
4. `find src/modules -name 'translations.ts' -o -name 'tech-translations.ts' -o -name 'data-translations.ts'` — zero results.
5. Spot-check 5 random components in EN/SV/KO via `npm run dev` is **not required** in this stage (orchestrator will visually verify).
6. Write `docs/i18n-refactor/REPORT.md`:
   - File count delta (44 → 5).
   - Total leaves migrated.
   - Number of MT-marked entries per language.
   - Any unresolved questions or oddities.

---

## Things to absolutely not do

- Do not change EN content meaning. EN is the source of truth.
- Do not delete or rephrase existing human SV/KO translations. Copy verbatim.
- Do not introduce new dependencies (no `react-intl`, no `i18next`, none).
- Do not add a build step or codegen — `en.ts` is hand-/agent-authored once.
- Do not auto-deploy. The orchestrator deploys after their own review.
- Do not commit. The orchestrator commits after their own review.
- Do not modify `src/LanguageContext.tsx` beyond what's strictly needed.

---

## Definition of done (orchestrator's checklist)

- [ ] `npm run build` clean
- [ ] EN renders identically to before
- [ ] SV renders all existing human translations correctly
- [ ] KO renders all existing human translations correctly
- [ ] Every previously-untranslated string now has SV+KO (with `// MT` markers)
- [ ] Old 41 files deleted, no dangling imports
- [ ] `REPORT.md` written

---

## Stage 1 hint for Stage A subagent

Start with these commands to scope yourself:
```bash
find src -name 'translations.ts' -o -name 'tech-translations.ts' -o -name 'data-translations.ts'
wc -l src/{quiz-translations.ts,selfexplain-translations.ts,ui-labels.ts,labels.ts}
grep -rE '\buseT\(' src --include='*.tsx' --include='*.ts' | wc -l
```
Then read each translation source file in full. The file count is small enough (44) to fit in your context.
