// Swedish / Korean overlays for interactive challenges.
//
// Mirrors `quiz-translations.ts` + `translateQuestions`: English prose is
// authored inline on the `Challenge` data objects (in catalog/); these tables
// provide id-keyed overrides for the translatable fields, and
// `translateChallenge` overlays them for the current language, falling back to
// the inline English for any gap.

import type { Language } from '../LanguageContext'
import type { Challenge, PromptRubricChallenge } from './types'
import { challengeSvCatalog } from './catalog/sv'
import { challengeKoCatalog } from './catalog/ko'

/** The subset of a challenge's fields that hold human-readable prose. */
export interface ChallengeText {
  title?: string
  instructions?: string
  hints?: string[]
  placeholder?: string
  /** Per-criterion labels, keyed by criterion id. */
  criteria?: Record<string, string>
}

const challengeSv: Record<string, ChallengeText> = challengeSvCatalog
const challengeKo: Record<string, ChallengeText> = challengeKoCatalog

/**
 * Returns a copy of `challenge` with translatable prose overlaid for `lang`.
 * English (the inline value) is returned unchanged for 'en' or any missing key.
 */
export function translateChallenge<T extends Challenge>(challenge: T, lang: Language): T {
  if (lang === 'en') return challenge
  const table = lang === 'sv' ? challengeSv : challengeKo
  const tr = table[challenge.id]
  if (!tr) return challenge

  const next: T = {
    ...challenge,
    title: tr.title || challenge.title,
    instructions: tr.instructions || challenge.instructions,
    hints: tr.hints ?? challenge.hints,
    placeholder: tr.placeholder || challenge.placeholder,
  }

  // Overlay per-criterion labels for the rubric kind.
  if (next.kind === 'prompt-rubric' && tr.criteria) {
    const criteria = tr.criteria
    ;(next as PromptRubricChallenge).rubric = (next as PromptRubricChallenge).rubric.map((c) =>
      criteria[c.id] ? { ...c, label: criteria[c.id] } : c,
    )
  }

  return next
}
