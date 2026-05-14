# i18n Refactor — Progress

Tracks the incremental migration from the legacy 44-file translation system
to the unified `src/i18n/{en,sv,ko}.ts` tree. See `PLAN.md` for the spec.

## Checkpoint 10 — DONE (`llmdata` module migrated)

- Added `t.modules.llmdata.*` to `en.ts` (5 sections: dataSourcesSection, cleaningPipelineSection, dataMixSection, syntheticDataSection, dataFormatsSection).
- Extended `sv.ts` and `ko.ts` with llmdata content. Preserved every populated human translation. 0 MT-marked entries.
- Migrated 5 components in `src/modules/llmdata/`:
  - `DataSourcesSection`: title/p2/sources[] via tree; `SOURCE_META` holds non-translatable percent/barColor/color. Reordered legacy SV/KO `sources[]` arrays to match the new EN order — legacy was [Common Crawl, Wikipedia, Books, Code, Academic, Conversations] but the current EN component is [Common Crawl, Code, Books, Academic, Wikipedia, Other]. Pre-existing per-index merge bug fixed by reordering. Position 5 dropped (legacy "Conversations" doesn't match new EN "Other" semantically) → falls back to EN.
  - `CleaningPipelineSection`: title/intro via tree; `STEPS` (terminal commands and outputs) stays inline EN-only since legacy `stepsTranslations` was `{sv: [], ko: []}` (empty by design — terminal command/output is technical, not user-facing prose).
  - `DataMixSection`: title/intro/p3 via tree; SLIDERS + CAPS arrays stay inline (no legacy translations).
  - `SyntheticDataSection`: title only via tree; legacy `intro` field was orphaned (component never rendered c.intro) — dropped.
  - `DataFormatsSection`: title/intro via tree; TREE/PRE_EX/SFT_EX/RLHF_EX all stay inline (technical content).
- Deleted `src/modules/llmdata/{tech-translations,data-translations}.ts`.
- `npm run build` clean (225 ms).

## Checkpoint 9 — DONE (`training` module migrated)

- Added `t.modules.training.*` to `en.ts` (5 sections: trainingSection1, trainingSection2, trainingSection3, trainingSection4, trainingSection5).
- Extended `sv.ts` and `ko.ts` with training content. Preserved every populated human translation. 0 MT-marked entries.
- Migrated 5 components in `src/modules/training/`. Highlights:
  - `TrainingSection1` and `TrainingSection3` previously had **no** `useT` calls — their headings were hardcoded EN, even though `tech-translations.ts` had legacy SV/KO titles for them. Both components now read their heading from the tree, **reconnecting** the orphaned legacy translations. EN headings preserved bit-for-bit; SV/KO users now see the legacy translated headings instead of EN.
  - `TrainingSection2` had EN_P2 == EN_P3 dead duplicate; component renders only `c.p3` → dropped p2. The component also contained an inline `{en, sv, ko}[lang]` ad-hoc i18n with two strings ("Click a stage or animate the full cycle" subtitle and the longer idle hint) — both lifted into the tree as `subtitle` and `idle`.
  - `tLabel(lang, ...)` calls (training stage labels: trainLoadBatch / trainForwardPass / trainComputeLoss / trainBackwardPass / trainUpdateWeights) replaced with `useTranslation().labels[key]` typed as `keyof Translation['labels']`.
  - `TrainingSection4` variants[] migrated through the tree with the legacy SV/KO array reordered to match the new EN order (legacy was [scratch, continued, lora, fulltuning]; new EN is [scratch, continued, fulltuning, lora]). Per-item content preserved verbatim. `VARIANT_META` holds non-translatable id/emoji/cost/time/data/code/steps/snapshots.
  - `TrainingSection5` formats[] migrated through the tree. Legacy SV/KO had 3 items but the 3rd was "JSONL" (training data file format) while the new EN 3rd is "PyTorch" (model weight file format) — pre-existing skew from a refactor. Preserved first 2 items verbatim; 3rd item dropped → falls back to EN.
- Deleted `src/modules/training/{tech-translations,data-translations}.ts`.
- `npm run build` clean (210 ms).

## Checkpoint 8 — DONE (`architecture` module migrated)

- Added `t.modules.architecture.*` to `en.ts` (5 sections: denseMoESection, scalingLawsSection, attentionVariantsSection, modelConfigSection, decisionTreeSection).
- Extended `sv.ts` and `ko.ts` with architecture content. Preserved every populated human translation. 0 MT-marked entries.
- Migrated 5 components in `src/modules/architecture/`. Highlights:
  - `tLabel(lang, key)` calls in `AttentionVariantsSection` (variant descriptions: mhaDesc/gqaDesc/mqaDesc/mlaDesc) and `ScalingLawsSection` (budget step notes: noteSmallResearch/noteGpt2Small/etc) replaced with `useTranslation().labels[key]` typed as `keyof Translation['labels']`.
  - `ScalingLawsSection` had EN_P5 == EN_P8 and EN_P6 == EN_P9 dead duplicates; component renders only p7/p8/p9 → dropped p5/p6 from the EN object and tree.
  - `DenseMoESection`'s `comparison` array migrated through the tree (legacy SV/KO data preserved verbatim); `MODELS` array (with model names like "Llama 3 70B") stays inline EN-only.
  - `ModelConfigSection`'s `PRESETS` stays inline — labels are model identifiers ("Llama 3 8B" etc) that don't translate; legacy `presetsTranslations` was `{sv: [], ko: []}` (empty by design).
  - `DecisionTreeSection`'s `getRecommendation()` returns inline EN strings (decision logic). Future translation work could lift these into the tree; for this checkpoint they stay inline matching the established pattern for component-side decision logic.
- Deleted `src/modules/architecture/{tech-translations,data-translations}.ts`.
- `npm run build` clean (239 ms).

## Checkpoint 7 — DONE (`inference` module migrated)

- Added `t.modules.inference.*` to `en.ts` (4 sections: howInferenceWorksSection, servingFrameworksSection, optimizationTechniquesSection, costOptimizationSection).
- Extended `sv.ts` and `ko.ts` with inference content. Preserved every populated human translation from `tech-translations.ts` and `data-translations.ts`. 0 MT-marked entries.
- Migrated 4 components in `src/modules/inference/`:
  - `HowInferenceWorksSection.tsx`: title/p2/p5 from tree; `tLabel(lang, ...)` calls (for the prefill/decode phase labels) replaced with `useTranslation().labels[key]` typed as `keyof Translation['labels']`. Dropped EN_P4 dead duplicate of EN_P5.
  - `OptimizationTechniquesSection.tsx`: title/intro/techniques[] via tree; `TECHNIQUE_META` holds non-translatable id/before/after/unit/visual fields parallel to the techniques array.
  - `ServingFrameworksSection.tsx`: title/intro/p3/frameworks[] via tree; `FRAMEWORK_META` holds non-translatable color/throughput/latency/ease/gpu.
  - `CostOptimizationSection.tsx`: title/intro from tree; GPU_CONFIGS/API_PRICING/TIPS arrays stay inline EN-only (no legacy data).
- Legacy `optimizationTechniquesSection` techniques array (8 items: Continuous Batching/KV Cache/Speculative/Quantization/FlashAttention/Tensor Parallelism/PagedAttention/Prefix Caching) was reduced to 4 items in the new EN tree to match what the component actually renders. SV/KO arrays trimmed to the 4 retained items, preserving per-item content verbatim.
- Several legacy tech-section `intro` fields semantically remapped to `p2` where the component renders `p2` instead (HowInferenceWorks).
- Deleted `src/modules/inference/{tech-translations,data-translations}.ts`.
- `npm run build` clean (224 ms).

## Checkpoint 6 — DONE (`quantization` module migrated)

- Added `t.modules.quantization.*` to `en.ts` (4 sections: whatIsQuantizationSection, quantizationMethodsSection, conversionPipelineSection, qualityVsSizeSection).
- Extended `sv.ts` and `ko.ts` with quantization content. Preserved every existing human translation from `tech-translations.ts` and `data-translations.ts` (Methods array reordered to match the new EN tree order; per-item content unchanged). 0 MT-marked entries — every populated entry was preserved verbatim.
- Migrated 4 components in `src/modules/quantization/`. Patterns:
  - `WhatIsQuantizationSection.tsx`: only `title` migrated through the tree; the EN_P4 fragment was inlined into JSX (it was a UI fragment ending mid-sentence; legacy SV/KO `intro` was orphaned and dropped).
  - `QuantizationMethodsSection.tsx`: full tree usage; `METHOD_META` holds non-translatable id and badge fields parallel to the methods array.
  - `QualityVsSizeSection.tsx`: title and p2 from tree; QUANT_LEVELS array stays inline EN-only because legacy `quantLevelsTranslations` SV/KO data described different precision tiers (FP32/FP16/INT8/INT4) that don't match the component's GGUF-specific levels (Q2_K/Q3_K_M/Q4_K_M/...). Pre-existing literal `&apos;` artifacts in EN_P2 preserved bit-for-bit per policy.
  - `ConversionPipelineSection.tsx`: title, intro, p2 from tree (legacy SV/KO `intro` field used; legacy `p2:''` placeholder skipped → falls back to EN).
- Several legacy tech-section `intro` fields semantically remapped to the EN tree key the component actually renders (`p2` for conversionPipeline, `p2` for qualityVsSize), matching the pattern established in Checkpoint 5.
- Deleted `src/modules/quantization/{tech-translations,data-translations}.ts`.
- `npm run build` clean (213 ms).

## Checkpoint 5 — DONE (`agents` module migrated)

- Added `t.modules.agents.*` to `en.ts` (13 sections: whatAreAgents, whatAreAgentsSection, toolUse, functionCallingSection, mcpSection, patterns, designPatternsSection, connect, buildingAgentsSection, businessImpact, a2aSection, skillsHarnessSection, productionGovernanceSection).
- Extended `sv.ts` and `ko.ts` with agents content. Preserved every existing human translation from `translations.ts` and `tech-translations.ts` and `data-translations.ts`. 2 MT-marked entries per language (insightTitle / insightText for the `connect` section, which were new EN-only fields with no legacy equivalent).
- Migrated 15 components in `src/modules/agents/`. Three components had only inline EN with no SV/KO (`useT(EN, {})` pattern): `ContextFilesSection.tsx` and `ContextFilesBusiness.tsx` keep EN inline; `HowAgentsConnectBusiness.tsx` was reconnected to its orphaned legacy `connectSv`/`connectKo` translations through the new tree. Several legacy tech-section `intro` fields that the current components never rendered were dropped as orphans; one (`buildingAgentsSection`, `productionGovernanceSection`, `a2aSection`) was semantically remapped to the field the component actually renders (`p2` or `p3`).
- Migrated `WhatAreAgentsBusiness.tsx` from a parallel `getWhatAreAgentsContent(lang)` system (loaded from `src/modules/agents/content/whatAreAgents.{en,sv,ko}.ts`) to the unified tree. Deleted the `content/` subdirectory.
- Renamed two section keys for clean camelCase: legacy `mCPSection` → `mcpSection`, legacy `a2ASection` → `a2aSection`. Component imports updated accordingly.
- Lifted previously inline-EN-only arrays (TOOLS, GUARDRAIL_SCENARIOS, DECISION_QUESTIONS, AUTONOMY_LEVELS, SELF_DRIVING_PARALLELS, RISK_FRAMEWORK, FAILURE_PATTERNS) into the tree under their parent section so future SV/KO translations can populate them. Non-translatable per-item fields (color, icon, diagram) live in parallel `*_META` consts indexed by position, matching the established pattern from industry / aiproblem.
- Deleted `src/modules/agents/{translations,tech-translations,data-translations}.ts` plus the `content/` subdirectory.
- `npm run build` clean (220 ms).

## Checkpoint 4 — DONE (`evaluation` module migrated)

- Added `t.modules.evaluation.*` to `en.ts` (measuring, choosing, whyEvaluationSection, benchmarksSection, customEvalSection, leaderboardSection).
- Extended `sv.ts` and `ko.ts` with evaluation content.
- Migrated 8 components in `src/modules/evaluation/`. `ModelPersonalitiesBusiness.tsx` and the brand-new `ModelSelectionSection.tsx` previously had no SV/KO; EN remains inline pending future translation.
- Deleted `src/modules/evaluation/{translations,tech-translations,data-translations}.ts`.
- `npm run build` clean (249 ms).

## Checkpoint 3 — DONE (`industry` module migrated)

- Added `t.modules.industry.*` to `en.ts` (keyPlayers, openVsClosed, whoBuiltWhatSection, openVsClosedSection, ecosystemSection, whereItsHeadingSection).
- Extended `sv.ts` and `ko.ts` with industry content. Preserved every existing human translation. 4 MT-marked entries per language.
- Migrated 7 components in `src/modules/industry/`. `WhereItsHeadingBusiness.tsx` previously had no SV/KO; EN remains inline pending future translation.
- Deleted `src/modules/industry/{translations,tech-translations,data-translations}.ts`.
- `npm run build` clean (253 ms).

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
| `training` | (deleted) | 5 .tsx migrated | ✅ |
| `llm-data` | (deleted) | 5 .tsx migrated | ✅ |
| `alignment` | `translations.ts`, `tech-translations.ts`, `data-translations.ts` | ~9 .tsx | ⏳ |
| `architecture` | (deleted) | 5 .tsx migrated | ✅ |
| `solution` | `translations.ts`, `tech-translations.ts`, `data-translations.ts` | ~10 .tsx | ⏳ |
| `evaluation` | (deleted) | 8 .tsx migrated | ✅ |
| `quantization` | (deleted) | 4 .tsx migrated | ✅ |
| `inference` | (deleted) | 4 .tsx migrated | ✅ |
| `industry` | (deleted) | 7 .tsx migrated | ✅ |
| `embeddings` | `translations.ts`, `tech-translations.ts`, `data-translations.ts` | ~9 .tsx | ⏳ |
| `prompting` | `translations.ts`, `tech-translations.ts`, `data-translations.ts` | ~10 .tsx | ⏳ |
| `agents` | (deleted) | 15 .tsx migrated | ✅ |
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
