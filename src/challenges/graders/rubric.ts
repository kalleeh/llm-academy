// Pure, zero-dependency grader for prompt-writing challenges.
//
// Each criterion is evaluated independently, weighted, and summed into a 0..1
// score; the challenge passes when score >= passThreshold (default 1.0). The
// `structure` detectors are deterministic regex heuristics — useful as soft
// signals, so structure-heavy rubrics should set passThreshold < 1 and rely on
// `contains`/`regex` for hard requirements.

import type {
  CriterionResult,
  GradeOutcome,
  PromptRubricChallenge,
  RubricCriterion,
  StructureElement,
} from '../types'

const STRUCTURE_PATTERNS: Record<StructureElement, RegExp> = {
  role: /\b(you are|you're|act as|your role|as an?|pretend you)\b/i,
  constraints: /\b(must|should|do not|don't|only|never|always|limit|no more than|under \d|at most|within|avoid)\b/i,
  examples: /\b(example|examples|e\.g\.|for instance|such as|sample|like this)\b|```/i,
  outputFormat:
    /\b(json|markdown|bullet|bullets|table|format|as a list|numbered|csv|xml|schema|respond with|reply with|output only|answer with|return (only|just)|one word|single word|exactly one)\b|```/i,
  context: /\b(context|background|given that|i am|i'm|we are|we're|we have|my |our |the user)\b/i,
}

function detectStructure(element: StructureElement, text: string): boolean {
  return STRUCTURE_PATTERNS[element].test(text)
}

function evalCriterion(c: RubricCriterion, text: string): CriterionResult {
  const weight = c.weight ?? 1
  switch (c.type) {
    case 'contains': {
      const haystack = c.caseSensitive ? text : text.toLowerCase()
      const needle = c.caseSensitive ? c.needle : c.needle.toLowerCase()
      const passed = haystack.includes(needle)
      return {
        id: c.id,
        label: c.label,
        weight,
        passed,
        detail: passed ? `Found “${c.needle}”` : `Missing “${c.needle}”`,
      }
    }
    case 'regex': {
      const passed = new RegExp(c.pattern, c.flags).test(text)
      return { id: c.id, label: c.label, weight, passed }
    }
    case 'anti': {
      const matched = new RegExp(c.pattern, c.flags).test(text)
      return {
        id: c.id,
        label: c.label,
        weight,
        passed: !matched,
        detail: matched ? 'Found a pattern this prompt should avoid' : undefined,
      }
    }
    case 'length': {
      const count =
        c.unit === 'words'
          ? text.trim().split(/\s+/).filter(Boolean).length
          : text.length
      const passed = (c.min == null || count >= c.min) && (c.max == null || count <= c.max)
      return {
        id: c.id,
        label: c.label,
        weight,
        passed,
        detail: `${count} ${c.unit ?? 'chars'}`,
      }
    }
    case 'structure': {
      const passed = detectStructure(c.element, text)
      return { id: c.id, label: c.label, weight, passed }
    }
  }
}

export function gradeRubric(challenge: PromptRubricChallenge, submission: string): GradeOutcome {
  const criteria = challenge.rubric.map((c) => evalCriterion(c, submission))
  const total = criteria.reduce((sum, c) => sum + c.weight, 0) || 1
  const earned = criteria.reduce((sum, c) => sum + (c.passed ? c.weight : 0), 0)
  const score = earned / total
  const passed = challenge.graded && score >= (challenge.passThreshold ?? 1)
  return { graded: challenge.graded, passed, score, criteria }
}
