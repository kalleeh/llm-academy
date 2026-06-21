// Grader dispatch. Async-uniform so sandbox/model kinds (phases 2-3) slot in
// without changing call sites; the rubric arm resolves synchronously.

import type { Challenge, GradeOutcome } from './types'
import { gradeRubric } from './graders/rubric'

function notImplemented(kind: string): GradeOutcome {
  return {
    graded: false,
    passed: false,
    score: 0,
    criteria: [],
    runtimeError: `Challenge kind "${kind}" is not available yet.`,
  }
}

export async function grade(challenge: Challenge, submission: string): Promise<GradeOutcome> {
  switch (challenge.kind) {
    case 'prompt-rubric':
      return gradeRubric(challenge, submission)
    // Phase 2: sandboxed iframe execution. Phase 3: lazy transformers.js.
    case 'js-code':
    case 'tokenizer':
    case 'embedding':
      return notImplemented(challenge.kind)
  }
}
