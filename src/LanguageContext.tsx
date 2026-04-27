/* eslint-disable react-refresh/only-export-components */
 
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export type Language = 'en' | 'sv' | 'ko'

export const LANGUAGE_META: Record<Language, { label: string; flag: string }> = {
  en: { label: 'English', flag: 'EN' },
  sv: { label: 'Svenska', flag: 'SV' },
  ko: { label: '한국어', flag: 'KO' },
}

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
}

const STORAGE_KEY = 'llm-academy-language'

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'sv' || stored === 'ko') return stored
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Language) => setLangState(l), [])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
