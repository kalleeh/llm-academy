/**
 * Type helpers for the new unified translation system.
 * See docs/i18n-refactor/PLAN.md for the architecture spec.
 */

/**
 * Recursively makes every property optional. Arrays become arrays of
 * partial items so individual array entries can be partially translated
 * while still falling back to EN for unspecified fields. Matches the
 * fallback semantics of the previous `useT` and `tArray` helpers.
 */
export type DeepPartial<T> = T extends readonly (infer U)[]
  ? U extends object
    ? Partial<U>[]
    : T
  : T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T
