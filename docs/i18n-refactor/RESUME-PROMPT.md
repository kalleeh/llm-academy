# Resume Prompt — i18n Consolidation (paste into a fresh `kiro chat` session)

This is a self-contained kickoff prompt for continuing the LLM Academy i18n
consolidation refactor. It assumes nothing about prior conversation context.

> **How to use:** open a new `kiro chat` session in `/Users/wallbomk/Projects.local/llm-academy`,
> then paste **everything inside the `--- BEGIN PROMPT ---` / `--- END PROMPT ---`
> markers below**. Replace `<MODULE>` with the module(s) you want this session
> to migrate (one at a time, or 2-3 small ones in batch).

---

## --- BEGIN PROMPT ---

You are continuing an in-progress i18n refactor for the LLM Academy repository
at `/Users/wallbomk/Projects.local/llm-academy`. Branch: `main`. Live URL:
https://llm-academy.gurum.se. **Do not deploy. Do not push to main without
asking.** Commit locally, then ask me before pushing.

### First actions (mandatory, in this order)

1. Read `docs/i18n-refactor/PLAN.md` — the architecture spec.
2. Read `docs/i18n-refactor/PROGRESS.md` — the per-module checklist with
   completed/remaining modules and the migration recipe (steps A-E).
3. Read `src/i18n/en.ts` (skim the structure, you don't need to memorize it),
   `src/i18n/sv.ts`, `src/i18n/ko.ts`, and `src/i18n/index.ts` to confirm the
   foundation is in place.

### Your task

Migrate the following module(s) end-to-end, one at a time:

**MODULES TO MIGRATE THIS SESSION:** `<MODULE>` *(e.g. `agents`, or `prompting,solution`)*

For each module, follow the per-module migration recipe in PROGRESS.md
(§ "Per-module migration recipe", steps A-E). After each module completes
cleanly, commit it as a separate commit with a message in the form
`i18n: migrate <module> module to useTranslation (Checkpoint N)` where N
follows the existing checkpoint numbering. Update `PROGRESS.md` to mark
the module ✅ in the per-module checklist and add a "Checkpoint N — DONE"
entry above the previous checkpoint.

### What's already done (do not redo)

- Foundation: `src/i18n/{en,sv,ko,types,index}.ts` exist and work.
- Cross-cutting EN content (`t.ui.*`, `t.labels.*`, `t.moduleLabels.*`) is
  populated. SV/KO for these are still served by the legacy `ui-labels.ts` /
  `labels.ts` re-exported through `src/i18n/index.ts`. Do not touch these
  yet — the final cleanup checkpoint handles them.
- 4 modules complete: `aiproblem`, `industry`, `evaluation`. Their content
  is already in `en.ts`/`sv.ts`/`ko.ts` and their components use
  `useTranslation()`. Their old `translations.ts`/`tech-translations.ts`/
  `data-translations.ts` are deleted.
- `DeepPartial<T>` in `src/i18n/types.ts` already widens literal primitive
  types correctly. Do not modify it.

### Recipe summary (full version in PROGRESS.md)

**Step A:** Read the module's three legacy translation files (some modules
only have a subset — that's normal):
- `src/modules/<m>/translations.ts` — Business prose SV/KO (with EN inline in `*Business.tsx` files)
- `src/modules/<m>/tech-translations.ts` — Technical SV/KO (mostly empty `pN: ''` placeholders)
- `src/modules/<m>/data-translations.ts` — Data array SV/KO

Then read every `.tsx` file in `src/modules/<m>/` to extract the EN content.

**Step B:** Add the module to `en.ts` by `strReplace`-ing the closing
`  },\n} as const` with the new module entry inserted before the closing.
Section keys: lowercase the first letter of the legacy `*Sv`/`*Ko` export
name (e.g. `toolUseSv` → `toolUse`, `whatAreAgentsSectionSv` →
`whatAreAgentsSection`). For acronyms at the start, normalize sensibly —
e.g. `lLMDifferenceSection` is ugly, prefer `llmDifferenceSection` or
similar; document the choice in a comment.

**Step C:** Add the module to `sv.ts` and `ko.ts` by similarly extending
the existing `modules: { ... }` object. **Preserve every human SV/KO
translation verbatim from the legacy files.** Skip empty-string
placeholders (`pN: ''`) — they fall back to EN. Mark machine-translated
entries with `// MT` on a comment line above them. Tone:
- SV: neutral 'du' form, technical-yet-accessible.
- KO: 합니다체 (formal-polite), keep English acronyms in Latin script
  (RAG, MCP, A2A, LLM, KV, etc.).

**Step D:** Migrate every `.tsx` file in `src/modules/<m>/` from
`useT(EN, { sv, ko })` / `tArray(lang, EN, ...)` to
`useTranslation().modules.<m>.<section>`. Drop the inline `EN` constants
that are now in the tree, and drop the `import { ...Sv, ...Ko } from
'./translations'` (and `tech-translations` / `data-translations`) lines.

**Step E:** Delete the three legacy translation files for the module.
Run `npm run build` — it must exit 0. Run the grep checks from PLAN.md
§ "Stage E — Verify". Commit.

### Common gotchas (real ones I hit on the first 3 modules)

1. **Components with `useT(EN, {})`** — empty translation overrides means
   the component never had SV/KO. Do not put it in `en.ts` — it has no
   matching tree node to migrate to. Just drop the `useT` import and
   inline the EN const directly. Examples in already-migrated modules:
   `aiproblem/LLMvsMLBusiness.tsx`, `industry/WhereItsHeadingBusiness.tsx`,
   `evaluation/ModelPersonalitiesBusiness.tsx`,
   `evaluation/ModelSelectionSection.tsx`. Look for this pattern in your
   target module too.

2. **Components mixing translatable arrays with non-translatable
   metadata** (e.g. an array of `{ name, color, icon }` where only `name`
   is translated). Solution: keep a separate `<NAME>_META` array of the
   non-translatable fields in the component file, indexed in the same
   order as the tree array, and merge by index. Examples:
   `aiproblem/LandscapeSection.tsx` (LEVEL_META + LEVELS in tree),
   `industry/WhoBuiltWhatSection.tsx` (PLAYER_META).

3. **Components using `tLabel(lang, key)`** for short labels: replace
   with `useTranslation().labels[key]`. Type the key as
   `keyof Translation['labels']` for safety. Example:
   `evaluation/LeaderboardSection.tsx`.

4. **Module top-level `*Module.tsx` files** that use `translateQuestions`
   or `translateSelfExplain` — **leave these alone** for this checkpoint.
   The quiz and selfExplain migrations happen in a separate later
   checkpoint, after all module content is migrated.

5. **DO NOT spawn the `subagent` tool.** It is broken in this environment
   and produces no output. I tried it 4 times in a previous session and
   it returned empty every time. Just do the work directly.

### Hard constraints

- Do not modify `src/LanguageContext.tsx`, `src/i18n/types.ts`,
  `src/i18n/en.ts` foundation sections (ui/labels/moduleLabels), or any
  other module's content.
- Do not run `npm run dev` (not needed; build is sufficient).
- Do not deploy (`aws s3 sync` / `aws cloudfront create-invalidation`).
- Do not push to `origin/main` without explicit confirmation.
- Do not delete `src/useT.tsx`, `src/tArray.ts`, `src/quiz-translations.ts`,
  `src/selfexplain-translations.ts`, `src/ui-labels.ts`, or `src/labels.ts`.
  Those happen in the final cleanup checkpoint after every module is done.
- Preserve EN visual output bit-for-bit. Verify by reading your migrated
  components and confirming the EN strings match the originals.

### When you're done

Print a summary in this format:

```
MODULE(S) MIGRATED: <list>
COMMITS CREATED: <list of commit hashes>
FILES TOUCHED: <count>
LEGACY FILES DELETED: <count>
BUILD STATUS: ✅ clean | ❌ <error>
MT MARKERS ADDED: <count> in sv.ts, <count> in ko.ts
NOTES / ANOMALIES: <anything weird you found>
```

Then ask: "Push to origin/main and continue with the next module, or stop?"

### Parallel session coordination

If multiple `kiro chat` sessions are running this prompt simultaneously
on different modules:
- Each session must create a feature branch first: `git checkout -b
  i18n-migrate-<module>` before any edits.
- Push to a remote branch when done, not directly to main.
- Conflicts on `src/i18n/{en,sv,ko}.ts` will be additions to different
  module subtrees. Resolve by accepting both additions textually — they
  don't semantically conflict.
- Whoever merges first wins; subsequent branches rebase on main.

If you're the only session running, just work on `main` directly (commits
only, no auto-push), as the previous session did.

## --- END PROMPT ---

---

## Suggested module assignments for parallel work

These are sensible session boundaries based on module size and complexity:

| Session | Modules | Why |
|---|---|---|
| **A (heavy)** | `agents` | 16 .tsx, biggest. Contains `ContextFilesSection`/`ContextFilesBusiness` from the original missing-translation bug. Worth its own session. |
| **B (medium pair)** | `prompting` + `solution` | 10 .tsx each. Both have full translation files (Business + tech + data). |
| **C (medium pair)** | `alignment` + `embeddings` | 8-9 .tsx each. Same shape as B. |
| **D (medium pair)** | `datafoundations` + `architecture` | 8 + 6 .tsx. |
| **E (small batch)** | `tokens`, `transformer`, `training`, `quantization`, `inference`, `llm-data`, `fine-tuning`, `ai-in-org` | All small (1-7 .tsx). Some have only tech+data, no Business `translations.ts`. Several can fit in one session. |
| **F (final cleanup)** | quiz + selfExplain + ui-labels + labels + delete legacy helpers + remove legacy re-exports from index.ts | Run only after sessions A-E are all on main. |

Pick the assignment row, fill the `<MODULE>` placeholder in the prompt, and
go. After each session finishes, that row is done.

## Status tracking

Run this anytime to see what's left:

```bash
cd /Users/wallbomk/Projects.local/llm-academy
echo "=== Modules not yet migrated (legacy files still present) ==="
find src/modules -type d -mindepth 1 -maxdepth 1 | while read d; do
  if ls "$d"/translations.ts "$d"/tech-translations.ts "$d"/data-translations.ts 2>/dev/null | head -1 >/dev/null; then
    echo "  ⏳ ${d#src/modules/}"
  fi
done
echo ""
echo "=== Modules migrated (no legacy files) ==="
for m in aiproblem industry evaluation agents alignment architecture datafoundations embeddings finetuning industry inference llmdata prompting quantization solution training transformer; do
  d="src/modules/$m"
  [ -d "$d" ] || continue
  if ! ls "$d"/translations.ts "$d"/tech-translations.ts "$d"/data-translations.ts 2>/dev/null | head -1 >/dev/null; then
    echo "  ✅ $m"
  fi
done
```
