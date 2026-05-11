/**
 * Unified translation API for LLM Academy.
 *
 * All translation utilities are re-exported from this single module.
 * Components should import everything from here:
 *
 *   import { useT, useLanguage, tArray, translateQuestions, t } from '../i18n'
 *
 * Adding a new language:
 *   1. Add the language code to Language type in LanguageContext.tsx
 *   2. Add entries in each module's translations.ts / tech-translations.ts / data-translations.ts
 *   3. Add quiz translations in quiz-translations.ts
 *   4. Add selfexplain translations in selfexplain-translations.ts
 *   5. Add UI labels in ui-labels.ts
 */

// Core language context
export { useLanguage, LanguageProvider, LANGUAGE_META } from '../LanguageContext'
export type { Language } from '../LanguageContext'

// Component prose translations — useT(EN_OBJ, { sv, ko })
export { useT } from '../useT'

// Data array translations — tArray(lang, EN_ARRAY, { sv, ko })
export { tArray } from '../tArray'

// Quiz question translations — translateQuestions(questions, lang)
export { translateQuestions } from '../quiz-translations'

// SelfExplain prompt translations — translateSelfExplain(prompt, answer, lang)
export { translateSelfExplain } from '../selfexplain-translations'

// UI chrome strings — t(lang, key)
export { t, MODULE_LABELS } from '../ui-labels'

// Centralized label translations — tLabel(lang, key)
export { tLabel } from '../labels'