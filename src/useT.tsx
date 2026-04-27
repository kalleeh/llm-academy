import { useMemo } from 'react'
import { useLanguage, type Language } from './LanguageContext'

/**
 * Returns translated content for the current language.
 * English content is the default. Non-empty translation values override it.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useT<T extends Record<string, any>>(
  en: Partial<T>,
  translations: Partial<Record<Language, T>>,
): T {
  const { lang } = useLanguage()
  return useMemo(() => {
    if (lang === 'en') return en as T
    const tr = translations[lang]
    if (!tr) return en as T
    // Merge: use translation value only if it's non-empty
    const merged = { ...en } as Record<string, unknown>
    for (const [key, val] of Object.entries(tr)) {
      if (val !== '' && val !== undefined && val !== null) {
        merged[key] = val
      }
    }
    return merged as T
  }, [lang, en, translations])
}
