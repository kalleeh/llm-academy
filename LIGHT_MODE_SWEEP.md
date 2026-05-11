# Light Mode Sweep — Transformation Rules

The app currently hardcodes a dark zinc + saturated-accent palette. We're keeping
**dark as the default** and adding a high-quality light mode via the Tailwind v4
`dark:` variant (already configured in `src/index.css`).

## Core principle

For every Tailwind class that produces a colour:

1. Pick the right LIGHT-mode value.
2. Move the EXISTING dark-mode value behind a `dark:` prefix.
3. Order: light first, then `dark:` — to make merge conflicts and reading easier.

```tsx
// BEFORE (dark only)
<div className="bg-zinc-900 text-zinc-100 border border-zinc-700">

// AFTER (both modes)
<div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
```

DO NOT remove the dark values. DO NOT alter layout/spacing/typography classes.
Only add light counterparts and prefix existing dark values with `dark:`.

## Translation table — neutrals (zinc family)

| Dark (existing)         | Light (add)             |
| ----------------------- | ----------------------- |
| `bg-zinc-950`           | `bg-zinc-50`            |
| `bg-zinc-900`           | `bg-white`              |
| `bg-zinc-800`           | `bg-zinc-100`           |
| `bg-zinc-800/50`        | `bg-zinc-100`           |
| `bg-zinc-700`           | `bg-zinc-200`           |
| `text-zinc-100`         | `text-zinc-900`         |
| `text-zinc-200`         | `text-zinc-800`         |
| `text-zinc-300`         | `text-zinc-700`         |
| `text-zinc-400`         | `text-zinc-600`         |
| `text-zinc-500`         | `text-zinc-500`  (unchanged — works on both) |
| `text-zinc-600`         | `text-zinc-500`         |
| `border-zinc-700`       | `border-zinc-200`       |
| `border-zinc-800`       | `border-zinc-200`       |
| `border-zinc-900`       | `border-zinc-300`       |
| `divide-zinc-800`       | `divide-zinc-200`       |
| `ring-zinc-700`         | `ring-zinc-300`         |
| `placeholder-zinc-500`  | `placeholder-zinc-400`  |

## Translation table — accents (callouts and badges)

The dark theme uses transparent accent fills like `bg-amber-500/5` with
`border-amber-500/30`. On light backgrounds these are invisible — use higher-saturation
50/100 backgrounds with mid-tone borders instead.

For ANY accent colour `<C>` in {amber, emerald, blue, purple, red, cyan, green, violet, pink, orange, rose}:

| Dark (existing)                | Light (add)                      |
| ------------------------------ | -------------------------------- |
| `bg-<C>-500/5`                 | `bg-<C>-50`                      |
| `bg-<C>-500/10`                | `bg-<C>-50`                      |
| `bg-<C>-500/20`                | `bg-<C>-100`                     |
| `bg-<C>-500/30`                | `bg-<C>-200`                     |
| `border-<C>-500/20`            | `border-<C>-300`                 |
| `border-<C>-500/30`            | `border-<C>-400`                 |
| `border-<C>-500/40`            | `border-<C>-400`                 |
| `text-<C>-300`                 | `text-<C>-700`                   |
| `text-<C>-400`                 | `text-<C>-700`                   |
| `text-<C>-500`                 | `text-<C>-700`                   |
| `text-<C>-200`                 | `text-<C>-800`                   |

Examples:

```tsx
// BEFORE
<div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
  <p className="text-amber-300">…</p>
</div>

// AFTER
<div className="rounded-lg border border-amber-300 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5 p-4">
  <p className="text-amber-700 dark:text-amber-300">…</p>
</div>
```

## Hover and focus variants

`hover:bg-zinc-800` → `hover:bg-zinc-100 dark:hover:bg-zinc-800`
`hover:text-zinc-100` → `hover:text-zinc-900 dark:hover:text-zinc-100`
`focus:ring-zinc-700` → `focus:ring-zinc-300 dark:focus:ring-zinc-700`

Same idea: light first, dark prefixed.

## Inline styles (rare)

If you find an inline `style={{ color: '#...' }}` or `style={{ backgroundColor: '#...' }}`
in a component, leave it for now — flag it in your final report. We'll handle
those in a separate pass.

## What to leave alone

- Layout: `flex`, `grid`, `gap-*`, `p-*`, `m-*`, `w-*`, `h-*`, `rounded-*`, `space-*`, `divide-*` (without colour)
- Typography sizes/weights: `text-xs`, `font-mono`, `font-semibold`, etc.
- Animations/transitions
- The existing dark values — keep them, just prefix
- `bg-transparent`, `bg-black/50` overlays — usually fine on both modes
- `currentColor` references in SVG — the icons inherit text colour and just work

## CodeBlock & Terminal special case

`src/components/CodeBlock.tsx` and `src/components/SimulatedTerminal.tsx` should
stay dark-themed even in light mode (terminals on light backgrounds look bad).
Apply the bg/text changes ONLY to the surrounding container border / labels,
not the content area itself. If unsure, leave them dark.

## Validation

After your sweep, run from the project root:

```
cd /Users/wallbomk/Projects.local/llm-learning && npm run build
```

The build MUST succeed. If it fails, the tsconfig has `noUnusedLocals` and
`noUnusedParameters` on — usually means an import you removed.

## Output

For each file you modify, write a one-line summary:
`<file>: <count> classes updated`
