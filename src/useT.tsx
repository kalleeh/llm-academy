import { useMemo } from 'react'
import { useLanguage, type Language } from './LanguageContext'

/**
 * Returns translated content for the current language.
 * English content is the default. Translations override/extend it.
 * The EN object can be partial — translations fill in the rest.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useT<T extends Record<string, any>>(
  en: Partial<T>,
  translations: Partial<Record<Language, T>>,
): T {
  const { lang } = useLanguage()
  return useMemo(
    () => (lang === 'en' ? en : { ...en, ...translations[lang] }) as T,
    [lang, en, translations],
  )
}
