// localStorage persistence for challenge results.
//
// Key shape `llm-academy-challenge-${moduleId}-${challengeId}` parallels
// KnowledgeCheck's `llm-academy-checks-${moduleId}`. One key per challenge so
// results stay isolated; SpacedReview scans this prefix to schedule reviews.

import type { ChallengeResultRecord, StoredChallengeData } from './types'

export const CHALLENGE_KEY_PREFIX = 'llm-academy-challenge-'

function storageKey(moduleId: string, challengeId: string): string {
  return `${CHALLENGE_KEY_PREFIX}${moduleId}-${challengeId}`
}

export function saveChallengeResult(moduleId: string, result: ChallengeResultRecord): void {
  const data: StoredChallengeData = { result, completedAt: Date.now() }
  localStorage.setItem(storageKey(moduleId, result.challengeId), JSON.stringify(data))
}

export function loadChallengeResult(moduleId: string, challengeId: string): ChallengeResultRecord | null {
  try {
    const raw = localStorage.getItem(storageKey(moduleId, challengeId))
    return raw ? (JSON.parse(raw) as StoredChallengeData).result : null
  } catch {
    return null
  }
}
