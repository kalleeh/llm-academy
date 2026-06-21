// Central catalog of interactive challenges, keyed by KnowledgeCheck-style
// moduleId (e.g. 'prompting', 'prompting-business'). Logic/rubrics live here
// inline; prose is overlaid for sv/ko via translateChallenge inside <Challenge>.
//
// Every challenge here is `prompt-rubric` — the only fully-implemented kind.
// Model-backed kinds (tokenizer/embedding) and js-code are deferred to later
// phases and are intentionally NOT catalogued, so no learner ever sees a
// "not available" challenge.

import type { PromptRubricChallenge } from '../types'
import { understandChallenges } from './understand'
import { useAiChallenges } from './use-ai'

export const CHALLENGE_CATALOG: Record<string, PromptRubricChallenge[]> = {
  ...understandChallenges,
  ...useAiChallenges,
}
