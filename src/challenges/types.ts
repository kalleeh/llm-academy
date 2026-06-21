// Unified interactive-challenge model.
//
// One discriminated union drives every challenge kind through a single
// `grade()` dispatcher and a single `<Challenge>` component — mirroring how
// `KnowledgeCheck` handles 'mc' | 'free' through one component. Prose
// (instructions, hints, criterion labels) is authored inline in English on the
// data objects and overlaid for sv/ko via `translateChallenge`, exactly like
// `Question` + `translateQuestions`.

export type ChallengeKind = 'prompt-rubric' | 'js-code' | 'tokenizer' | 'embedding'

// --- prompt-rubric (Phase 1) ---

/** Heuristic structure detectors for prompt-writing. Deterministic, zero-dep. */
export type StructureElement = 'role' | 'constraints' | 'examples' | 'outputFormat' | 'context'

export type RubricCriterion =
  | { type: 'contains'; id: string; label: string; needle: string; caseSensitive?: boolean; weight?: number }
  | { type: 'regex'; id: string; label: string; pattern: string; flags?: string; weight?: number }
  | { type: 'anti'; id: string; label: string; pattern: string; flags?: string; weight?: number }
  | { type: 'length'; id: string; label: string; min?: number; max?: number; unit?: 'chars' | 'words'; weight?: number }
  | { type: 'structure'; id: string; label: string; element: StructureElement; weight?: number }

export interface PromptRubricChallenge {
  id: string
  kind: 'prompt-rubric'
  title: string
  instructions: string
  hints?: string[]
  placeholder?: string
  graded: boolean
  rubric: RubricCriterion[]
  /** Fraction of total weight required to pass. Defaults to 1.0 (all required). */
  passThreshold?: number
}

// --- js-code (Phase 2 seam) ---

export interface JsTestCase {
  id: string
  label: string
  args: unknown[]
  expected: unknown
  weight?: number
}

export interface AstCheck {
  id: string
  label: string
  /** AST node type that must (or must not) appear, e.g. 'ForStatement'. */
  requiresNode: string
  mustExist: boolean
  weight?: number
}

export interface JsCodeChallenge {
  id: string
  kind: 'js-code'
  title: string
  instructions: string
  hints?: string[]
  placeholder?: string
  graded: boolean
  /** Function name the learner must define. */
  entryFn: string
  starterCode?: string
  testCases: JsTestCase[]
  astChecks?: AstCheck[]
  timeoutMs?: number
}

// --- tokenizer / embedding (Phase 3 seam) ---

export interface TokenizerChallenge {
  id: string
  kind: 'tokenizer'
  title: string
  instructions: string
  hints?: string[]
  placeholder?: string
  graded: boolean
  /** Hugging Face tokenizer id, e.g. 'Xenova/gpt-4'. */
  modelId: string
  expectTokenCount?: { min?: number; max?: number }
}

export interface EmbeddingChallenge {
  id: string
  kind: 'embedding'
  title: string
  instructions: string
  hints?: string[]
  placeholder?: string
  graded: boolean
  /** Hugging Face feature-extraction model id, e.g. 'Xenova/all-MiniLM-L6-v2'. */
  modelId: string
  reference?: string
  expectSimilarity?: { min?: number; max?: number }
}

export type Challenge =
  | PromptRubricChallenge
  | JsCodeChallenge
  | TokenizerChallenge
  | EmbeddingChallenge

// --- Grading output ---

export interface CriterionResult {
  id: string
  label: string
  passed: boolean
  weight: number
  /** Short human-readable explanation of why this criterion did/didn't pass. */
  detail?: string
}

export interface GradeOutcome {
  graded: boolean
  /** Overall pass/fail (score >= threshold). Always false for ungraded challenges. */
  passed: boolean
  /** Weighted fraction 0..1. */
  score: number
  criteria: CriterionResult[]
  // Kind-specific extras surfaced to the UI without per-call union widening:
  tokens?: { id: number; text: string }[]
  similarity?: number
  runtimeError?: string
}

// --- Persistence ---
//
// The inner record mirrors `QuestionResult` in KnowledgeCheck (questionId →
// challengeId, plus `correct`/`answeredAt`) so the spaced-review scanner can
// read challenge results with the same shape it already uses for checks.

export interface ChallengeResultRecord {
  challengeId: string
  correct: boolean
  answeredAt: number
  score?: number
  attempts: number
}

export interface StoredChallengeData {
  result: ChallengeResultRecord
  completedAt: number
}
