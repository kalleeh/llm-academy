// Swedish / Korean overlays for interactive challenges.
//
// Mirrors `quiz-translations.ts` + `translateQuestions`: English prose is
// authored inline on the `Challenge` data objects; this file provides id-keyed
// overrides for the translatable fields, and `translateChallenge` overlays them
// for the current language, falling back to the inline English for any gap.

import type { Language } from '../LanguageContext'
import type { Challenge, PromptRubricChallenge } from './types'

/** The subset of a challenge's fields that hold human-readable prose. */
interface ChallengeText {
  title?: string
  instructions?: string
  hints?: string[]
  placeholder?: string
  /** Per-criterion labels, keyed by criterion id. */
  criteria?: Record<string, string>
}

export const challengeSv: Record<string, ChallengeText> = {
  'prompting-rubric-classify': {
    title: 'Skriv en klassificeringsprompt',
    instructions:
      'Skriv en system-prompt som får en LLM att klassificera inkommande kundmejl i exakt en av: Faktura, Teknisk support, eller Allmän förfrågan. Du har inga märkta exempel, så var tydlig. En stark prompt ger modellen en roll, definierar varje kategori, specificerar utdataformatet och hanterar tvetydiga fall.',
    hints: [
      'Börja med en roll: "Du är en klassificerare som …"',
      'Definiera varje kategori med ett kriterium, inte bara namnet.',
      'Säg exakt vilket format svaret ska ha (t.ex. enbart kategorinamnet).',
      'Berätta vad modellen ska göra när mejlet inte passar någon kategori.',
    ],
    placeholder: 'Du är en …',
    criteria: {
      role: 'Tilldelar modellen en tydlig roll',
      categories: 'Nämner alla tre kategorierna',
      'output-format': 'Specificerar ett utdataformat',
      ambiguity: 'Hanterar tvetydiga eller okända fall',
      'no-hedging': 'Undviker vaga, osäkra instruktioner',
      length: 'Tillräckligt detaljerad',
    },
  },
}

export const challengeKo: Record<string, ChallengeText> = {
  'prompting-rubric-classify': {
    title: '분류 프롬프트 작성하기',
    instructions:
      'LLM이 들어오는 고객 이메일을 청구, 기술 지원, 일반 문의 중 정확히 하나로 분류하도록 하는 시스템 프롬프트를 작성하세요. 레이블이 있는 예시가 없으니 명확하게 작성해야 합니다. 좋은 프롬프트는 모델에 역할을 부여하고, 각 카테고리를 정의하며, 출력 형식을 지정하고, 모호한 경우를 처리합니다.',
    hints: [
      '역할로 시작하세요: "당신은 …하는 분류기입니다"',
      '각 카테고리를 이름뿐 아니라 기준으로 정의하세요.',
      '답변 형식을 정확히 지정하세요 (예: 카테고리 이름만).',
      '이메일이 어떤 카테고리에도 맞지 않을 때 모델이 무엇을 할지 알려주세요.',
    ],
    placeholder: '당신은 …',
    criteria: {
      role: '모델에 명확한 역할을 부여함',
      categories: '세 카테고리를 모두 언급함',
      'output-format': '출력 형식을 지정함',
      ambiguity: '모호하거나 알 수 없는 경우를 처리함',
      'no-hedging': '모호하고 불확실한 지시를 피함',
      length: '충분히 구체적임',
    },
  },
}

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
