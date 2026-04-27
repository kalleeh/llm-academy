import type { Language } from './LanguageContext'

/**
 * Translates fields in a data array based on language.
 * Keeps untranslated fields (like 'color', 'id') as-is.
 * Falls back to English for missing translations.
 * 
 * Usage:
 *   const stages = tArray(lang, STAGES, stageTranslations)
 * 
 * Where stageTranslations = {
 *   sv: [{ label: 'Basmodell', description: '...' }, ...],
 *   ko: [{ label: '기본 모델', description: '...' }, ...],
 * }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function tArray<T extends Record<string, any>>(
  lang: Language,
  en: T[],
  translations?: Partial<Record<Language, Partial<T>[]>>,
): T[] {
  if (lang === 'en' || !translations) return en
  const tr = translations[lang]
  if (!tr) return en
  return en.map((item, i) => {
    const t = tr[i]
    if (!t) return item
    const merged = { ...item }
    for (const [key, val] of Object.entries(t)) {
      if (val && val !== '') {
        (merged as Record<string, unknown>)[key] = val
      }
    }
    return merged
  })
}
