/**
 * Unified translation API.
 *
 * NEW (Checkpoint 1 of i18n consolidation, see docs/i18n-refactor/PLAN.md):
 *   - `useTranslation()` returns the full typed translation tree for the
 *     current language. Components access deep paths directly:
 *
 *       const t = useTranslation()
 *       <h1>{t.modules.agents.toolUse.title}</h1>
 *       <button>{t.ui.review.start}</button>
 *
 * LEGACY (still re-exported during the incremental migration):
 *   - `useT(EN, { sv, ko })` — component prose
 *   - `tArray(lang, EN, { sv, ko })` — data arrays
 *   - `translateQuestions(questions, lang)` — quiz Q&A
 *   - `translateSelfExplain(prompt, answer, lang)` — SelfExplain prompts
 *   - `t(lang, key)` and `MODULE_LABELS` — UI chrome / sidebar labels
 *   - `tLabel(lang, key)` — short reusable labels
 *
 * The legacy helpers will be removed once every component has been
 * migrated to `useTranslation()` and the per-module/quiz/selfExplain
 * sections of `en.ts` / `sv.ts` / `ko.ts` are populated.
 */

import { useMemo } from 'react'
import { useLanguage } from '../LanguageContext'
import { en, type Translation } from './en'
import { sv } from './sv'
import { ko } from './ko'
import type { DeepPartial } from './types'

// === New API ===

/**
 * Deep-merges two trees, treating empty-string / null / undefined leaves
 * in the override as "fall back to base". Arrays merge by index with
 * shallow per-item merge so a `sv`/`ko` array can specify only some
 * fields per item — matches the legacy `tArray` semantics.
 */
function deepMerge<T>(base: T, override: DeepPartial<T> | undefined): T {
  if (override === undefined || override === null) return base
  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base
    return base.map((item, i) => {
      const o = (override as unknown[])[i]
      if (o === undefined || o === null) return item
      if (typeof item === 'object' && item !== null && typeof o === 'object') {
        // Shallow merge per-item, treating empty strings as missing.
        const merged: Record<string, unknown> = { ...(item as Record<string, unknown>) }
        for (const [k, v] of Object.entries(o as Record<string, unknown>)) {
          if (v !== '' && v !== undefined && v !== null) merged[k] = v
        }
        return merged
      }
      return o
    }) as unknown as T
  }
  if (typeof base === 'object' && base !== null && typeof override === 'object') {
    const merged: Record<string, unknown> = { ...(base as Record<string, unknown>) }
    for (const [k, v] of Object.entries(override as Record<string, unknown>)) {
      if (v === '' || v === undefined || v === null) continue
      const existing = (base as Record<string, unknown>)[k]
      if (
        existing !== undefined &&
        (typeof existing === 'object' || Array.isArray(existing))
      ) {
        merged[k] = deepMerge(existing, v as DeepPartial<typeof existing>)
      } else {
        merged[k] = v
      }
    }
    return merged as T
  }
  return (override as unknown as T)
}

// Translation tables. Empty omissions / empty strings in sv/ko fall back to EN.
const svTable: DeepPartial<Translation> = sv
const koTable: DeepPartial<Translation> = ko

/**
 * Returns the merged translation tree for the current language.
 * Falls back to the EN value for any missing or empty leaf.
 */
export function useTranslation(): Translation {
  const { lang } = useLanguage()
  return useMemo<Translation>(() => {
    if (lang === 'en') return en
    const override = lang === 'sv' ? svTable : koTable
    if (!override) return en
    // deepMerge preserves the EN structure exactly (we only ever overlay
    // existing keys with non-empty values). TS cannot verify this against
    // the strict `as const` literal type, so we assert.
    return deepMerge(en as Translation, override) as Translation
  }, [lang])
}

export type { Translation } from './en'
export type { DeepPartial } from './types'

// === Legacy API (re-exports) ===
// Components using these continue to work; they will be migrated to
// `useTranslation()` incrementally in subsequent sessions.

export { useLanguage, LanguageProvider, LANGUAGE_META } from '../LanguageContext'
export type { Language } from '../LanguageContext'
export { useT } from '../useT'
export { tArray } from '../tArray'
export { translateQuestions } from '../quiz-translations'
export { translateSelfExplain } from '../selfexplain-translations'
export { t, MODULE_LABELS } from '../ui-labels'
export { tLabel } from '../labels'
