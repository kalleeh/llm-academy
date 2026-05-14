# i18n Refactor — Progress

Tracks the incremental migration from the legacy 44-file translation system
to the unified `src/i18n/{en,sv,ko}.ts` tree. See `PLAN.md` for the spec.

## Checkpoint 2 — DONE (`aiproblem` module migrated)

- Added `t.modules.aiproblem.*` to `en.ts` (landscape, decision, landscapeSection, classificationSection, decisionFrameworkSection, llmDifferenceSection, toolboxSection).
- Created `src/i18n/sv.ts` and `src/i18n/ko.ts` with `aiproblem` content. Preserved every existing human translation from the old files. 3 MT-marked entries per language (where legacy `tech-translations.ts` placeholders were empty `pN: ''`).
- Updated `src/i18n/index.ts` to import `sv` and `ko` directly. Removed the lazy `_setTranslationTable` helper.
- Refined `DeepPartial` in `types.ts` to widen literal primitive types so translations can supply different string values than the `as const` EN tree.
- Migrated 8 components in `src/modules/aiproblem/` to `useTranslation()`. Note: `LLMvsMLBusiness.tsx` previously had no SV/KO and still doesn't — its EN remains inline pending future translation work.
- Deleted `src/modules/aiproblem/{translations,tech-translations,data-translations}.ts`.
- `npm run build` clean (241 ms).

## Checkpoint 1 — DONE

**Foundation files are in place and the build is clean.** No behavior change:
the new API coexists with the legacy API, and every existing component still
uses the legacy one.

Files added:
- `src/i18n/types.ts` — `DeepPartial<T>` helper
- `src/i18n/en.ts` — canonical EN tree with cross-cutting sections populated
  (`ui`, `labels`, `moduleLabels`); `modules`, `quiz`, `selfExplain` are
  empty placeholders
- `src/i18n/index.ts` — new `useTranslation()` hook PLUS legacy re-exports
  (`useT`, `tArray`, `translateQuestions`, `translateSelfExplain`, `t`,
  `tLabel`, `MODULE_LABELS`)

Files left intact (still in active use by every component):
- `src/useT.tsx`
- `src/tArray.ts`
- `src/quiz-translations.ts`
- `src/selfexplain-translations.ts`
- `src/ui-labels.ts`
- `src/labels.ts`
- 9 × `src/modules/*/translations.ts`
- 16 × `src/modules/*/tech-translations.ts`
- 16 × `src/modules/*/data-translations.ts`

Build verification: `npm run build` exits 0, bundle size unchanged.

---

## Remaining work (Checkpoints 2 → N)

The pattern for each subsequent session is small, focused, deployable:

1. Pick **one module** (or a handful of small ones).
2. Read its component files for EN content.
3. Add the module's content to `en.ts` under `modules.<moduleId>`.
4. Add the module's translations to `sv.ts` and `ko.ts` (preserve every
   existing human translation from the legacy files; MT-mark gaps).
5. Migrate the module's `*.tsx` files from legacy helpers to
   `useTranslation()`.
6. Delete the module's old translation files (`translations.ts`,
   `tech-translations.ts`, `data-translations.ts`).
7. Build, verify, commit.

When all modules are migrated, do the cross-cutting cleanup checkpoint:
8. Move quiz Q&A into `en.ts` `.quiz`, populate `sv.ts`/`ko.ts` `.quiz`,
   migrate every `translateQuestions(...)` call, delete `quiz-translations.ts`.
9. Same for selfExplain (`selfexplain-translations.ts`).
10. Migrate every `t(lang, ...)` / `tLabel(lang, ...)` / `MODULE_LABELS[...]`
    call, delete `ui-labels.ts` and `labels.ts`.
11. Delete `src/useT.tsx` and `src/tArray.ts`.
12. Remove the legacy re-exports from `src/i18n/index.ts`.

### Per-module checklist

| Module | Old files to delete | Component files to migrate (count) | Status |
|---|---|---|---|
| `ai-problem` | (deleted) | 8 .tsx migrated | ✅ |
| `data-foundations` | `translations.ts`, `tech-translations.ts`, `data-translations.ts` | ~8 .tsx | ⏳ |
| `tokens` | (none — content inline in `TokensModule.tsx`) | 1 .tsx | ⏳ |
| `transformer` | `tech-translations.ts`, `data-translations.ts` | ~7 .tsx | ⏳ |
| `training` | `tech-translations.ts`, `data-translations.ts` | ~6 .tsx | ⏳ |
| `llm-data` | `tech-translations.ts`, `data-translations.ts` | ~6 .tsx | ⏳ |
| `alignment` | `translations.ts`, `tech-translations.ts`, `data-translations.ts` | ~9 .tsx | ⏳ |
| `architecture` | `tech-translations.ts`, `data-translations.ts` | ~6 .tsx | ⏳ |
| `solution` | `translations.ts`, `tech-translations.ts`, `data-translations.ts` | ~10 .tsx | ⏳ |
| `evaluation` | `translations.ts`, `tech-translations.ts`, `data-translations.ts` | ~9 .tsx | ⏳ |
| `quantization` | `tech-translations.ts`, `data-translations.ts` | ~5 .tsx | ⏳ |
| `inference` | `tech-translations.ts`, `data-translations.ts` | ~5 .tsx | ⏳ |
| `industry` | `translations.ts`, `tech-translations.ts`, `data-translations.ts` | ~8 .tsx | ⏳ |
| `embeddings` | `translations.ts`, `tech-translations.ts`, `data-translations.ts` | ~9 .tsx | ⏳ |
| `prompting` | `translations.ts`, `tech-translations.ts`, `data-translations.ts` | ~10 .tsx | ⏳ |
| `agents` | `translations.ts`, `tech-translations.ts`, `data-translations.ts` | ~16 .tsx | ⏳ |
| `ai-in-org` | (none — content inline in `AIInOrgModule.tsx`) | 1 .tsx | ⏳ |
| `fine-tuning` | `tech-translations.ts`, `data-translations.ts` | ~6 .tsx | ⏳ |

### Per-module migration recipe

For module `<m>`:

**Step A: Add EN content to `src/i18n/en.ts`**
- Find the EN constants in `src/modules/<m>/<Section>.tsx` files (the `EN`
  / `EN_DATA` objects passed to `useT(EN, ...)` and `tArray(lang, EN, ...)`).
- Add them under `modules.<moduleId>.<sectionKey>` in `en.ts`.
- Section key derivation: legacy export `toolUseSv` → `toolUse`,
  `whatAreAgentsSectionSv` → `whatAreAgentsSection`, etc.

**Step B: Add SV/KO to `src/i18n/sv.ts` and `src/i18n/ko.ts`** (these
files don't exist yet — first use creates them)
- Copy SV/KO entries verbatim from `src/modules/<m>/translations.ts`,
  `src/modules/<m>/tech-translations.ts`, `src/modules/<m>/data-translations.ts`.
- Empty strings (e.g. `p2: ''` placeholders) are SKIPPED — `useTranslation`
  falls back to EN.
- Where SV or KO is missing entirely, machine-translate from EN and
  prepend `// MT` on its own line above the entry.
- See `PLAN.md` § "Translation policy" for tone rules.
- Both files start with:
  ```ts
  import type { DeepPartial, Translation } from './types'
  export const sv: DeepPartial<Translation> = { /* ... */ }
  ```
  (and `ko` for ko.ts)
- Wire them into `src/i18n/index.ts` — replace the lazy `let svTable = null`
  with `import { sv } from './sv'; let svTable: DeepPartial<Translation> = sv`
  (same for ko).

**Step C: Migrate the module's `*.tsx` files**
- Replace `import { useT, tArray } from '../../i18n'` with
  `import { useTranslation } from '../../i18n'`.
- Replace `useT(EN, { sv: cSv, ko: cKo })` with
  `useTranslation().modules.<m>.<section>`.
- Replace `tArray(lang, EN, xT)` with
  `useTranslation().modules.<m>.<section>.<arrayName>`.
- Drop the now-unused inline `EN` / `EN_DATA` constants and the imports of
  `*Sv` / `*Ko` constants from the about-to-be-deleted translation files.
- If `useLanguage` is no longer used (because every `(lang, ...)` call
  was replaced), drop that destructure too.

**Step D: Delete the module's old translation files**
- `rm src/modules/<m>/translations.ts` (if exists)
- `rm src/modules/<m>/tech-translations.ts`
- `rm src/modules/<m>/data-translations.ts`

**Step E: Build, verify, commit**
- `npm run build` must exit 0.
- `grep -rE "from\s+['\"]\.{1,2}/(translations|tech-translations|data-translations)['\"]" src/modules/<m>` must be empty.
- Commit with message like `i18n: migrate <m> module to useTranslation`.

### Final checkpoint (after all 18 modules)

1. Quiz: same recipe but for `quiz-translations.ts`. Move EN questions
   into `en.ts` `.quiz`, SV/KO into `sv.ts`/`ko.ts` `.quiz`, migrate every
   `translateQuestions(QS, lang)` call to inline merge.
2. SelfExplain: same for `selfexplain-translations.ts`.
3. Cross-cutting: migrate every `t(lang, ...)` / `tLabel(lang, ...)` /
   `MODULE_LABELS[...][lang]` to `useTranslation().{ui|labels|moduleLabels}`.
4. Delete `src/useT.tsx`, `src/tArray.ts`, `src/quiz-translations.ts`,
   `src/selfexplain-translations.ts`, `src/ui-labels.ts`, `src/labels.ts`.
5. Remove the legacy re-exports from `src/i18n/index.ts` (keep only
   `useLanguage`, `LanguageProvider`, `LANGUAGE_META`, `Language` type,
   `useTranslation`, `Translation` type).
6. Build, verify, deploy.

---

## Notes for future sessions

- `src/i18n/en.ts` is `as const`, so adding any leaf grows the inferred
  `Translation` type automatically. `sv.ts`/`ko.ts` are typed as
  `DeepPartial<Translation>` — they can omit anything; missing or
  empty-string leaves fall back to EN at runtime.
- The `_setTranslationTable` export in `index.ts` is for future flexibility;
  prefer just importing `sv` / `ko` directly into `index.ts` once they exist.
- The `agents` module has the richest existing translations (see
  `src/modules/agents/translations.ts`) — reference it for tone calibration
  when machine-translating gaps in other modules.
- `tokens` and `ai-in-org` have no module-level translation files; their
  content lives inline in their respective `*Module.tsx` files.
