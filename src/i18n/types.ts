/**
 * Type helpers for the new unified translation system.
 * See docs/i18n-refactor/PLAN.md for the architecture spec.
 */

/**
 * Recursively makes every property optional and widens literal types so
 * translations can supply different string/number/boolean values than the
 * EN source while still matching the structural shape. Arrays become arrays
 * of partial items so individual array entries can be partially translated;
 * unspecified items / fields fall back to EN at runtime. Matches the
 * fallback semantics of the previous `useT` and `tArray` helpers.
 *
 * Why widen primitives:
 *   en.ts uses `as const`, which makes leaves like `'Yes'` a literal type.
 *   Without widening, sv.ts could only ever supply the same literal `'Yes'` —
 *   not the Swedish `'Ja'`. Widening to `string` / `number` / `boolean`
 *   keeps the structural shape required while allowing real translations.
 */
export type DeepPartial<T> = T extends readonly (infer U)[]
  ? DeepPartial<U>[]
  : T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T
