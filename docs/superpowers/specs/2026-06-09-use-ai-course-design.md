# Design: "Use AI" Course — Two-Course Academy

**Date:** 2026-06-09
**Status:** Approved design, pending implementation planning

## Problem

The app teaches two kinds of thing today: *how AI works under the hood* (tokens,
transformer, training, …) and *how to decide/govern AI* (problem framing, build vs
buy, safety, org readiness). Both are organized as 18 modules filtered by a
**persona toggle** (Business / Technical).

What's missing is a third kind of content: **how to actually use the tools** —
Amazon Quick Desktop, Claude Cowork, Claude Code, Kiro CLI, ChatGPT/Copilot — and
**how to optimize your workflow** as a *user* of agentic AI. This is application
fluency, distinct from both "how it works" and "should we buy it."

The goal of this design is purely structural: where does that new material live so
the separation is clean and logical while keeping the learning level high.

## Decision Summary

- Add a **second course**, "Use AI", alongside the existing content (now "Understand
  AI"). A top-level **course switcher** sits above the existing persona toggle.
- Keep the **Business / Technical persona toggle** inside each course.
- Add a **`CourseBridge`** component: curated, contextual, cross-course links that
  connect "do it" ⟷ "understand it" without merging the two courses.
- v1 "Use AI" ships **6 modules** (below). Hands-on "build from scratch" content is
  **deferred to v2**.

## Non-Negotiable Pedagogical Mantra

Applies to **both courses and all four lenses** (course × persona):

> This is **practical, hands-on learning** — not a 3-day PhD lecture. Maximum
> applicability and understanding through **terminal emulation, user emulation, and
> step-through interaction**, geared to the two personas.

**Acceptance criterion for every "Use AI" module:** it must teach by doing/seeing,
not prose alone. Each module includes **at least one emulation** (simulated
terminal, workspace, or step-through demo) where the learner watches or drives a
realistic tool interaction. This applies to the business persona too — e.g.
stepping through a Quick/Cowork delegation or a Custom GPT setup, not just reading
analogies.

Reuse the existing interactive arsenal:

| Existing component | How "Use AI" uses it |
| --- | --- |
| `SimulatedTerminal` | Emulate Claude Code / Kiro CLI sessions — agentic loop: think → act → output |
| `Workspace` (terminal + files) | Emulate an agent editing a repo; watch files change |
| `InteractiveDemo` | Step through a workflow: vague prompt → refined → great result; delegate → supervise |
| `FileExplorer` | Explore an `AGENTS.md` / project setup / MCP config like a real user |
| `KnowledgeCheck` | Scenario-based retrieval practice (not definitions) |
| `SelfExplain` / `Reveal` | Same learning-science scaffolding |
| `CourseBridge` (new) | Connect "do it" ⟷ "understand it" |

## Architecture

The app becomes a small academy with two courses, each retaining the persona toggle:

```
┌─ ACADEMY ─────────────────────────────────────────────┐
│  Course:  ( Understand AI | Use AI )   ← NEW top axis  │
│  Track:   ( Business | Technical )     ← existing       │
└────────────────────────────────────────────────────────┘

UNDERSTAND AI  (today's 18 modules)      USE AI  (new, 6 modules)
  how the machine works +                 how to operate the tools +
  decide/govern it                        optimize your workflow
        ▲                                        ▲
        └──────────  CourseBridge  ──────────────┘
           "go deeper" ⟷ "go apply"  (curated, contextual links)
```

### New code concepts (mirror existing patterns)

- **`CourseContext`** — exact mirror of `DifficultyContext`. Holds
  `'understand' | 'use'`, persisted to localStorage, reflected in the URL hash.
- **`<CourseBridge>`** — same component family as `Reveal` / `SelfExplain`. A
  hand-placed callout linking a section in one course to its counterpart in the
  other, with directional framing ("under the hood →" vs "try it for real →").
  Cross-course only; never links within a course. Persona-aware: if no counterpart
  exists for the current persona, it renders nothing (no dead links).

### What stays untouched

All 18 existing modules, the persona toggle, i18n, theming. "Understand AI" *is*
the current app; we add a sibling course beside it — no refactor of existing content.

### The 4-lens matrix

2 courses × 2 personas = 4 content lenses. Each module declares which course it
belongs to and which personas it serves; the nav filters on both.

## Navigation & IA Mechanics

### Sidebar layout (course switcher above persona toggle)

```
┌─ ACADEMY ──────────────────────┐
│  ◫ Understand AI  |  ▸ Use AI   │   ← course switcher (segmented)
│  ⚙ Technical  ↔                 │   ← persona toggle (existing)
│  🇬🇧 🇸🇪 🇰🇷   ☾                  │   ← lang + theme (existing)
│  ▓▓▓▓▓░░░  4/9                  │   ← progress (now per-course)
├─────────────────────────────────┤
│  ↻ Spaced Review                │
│  ─────────────────              │
│  1 · AI Tools Landscape         │   ← modules for CURRENT
│  2 · Working With AI            │     course + persona only
│  ...                            │
└─────────────────────────────────┘
```

### Registry model

Each module gains two fields:

- `course: 'understand' | 'use'`
- `personas: ('business' | 'technical')[]` — replaces today's `businessVisible`
  boolean. More expressive: a module can be technical-only, business-only, or both.

Sidebar shows modules where `course === activeCourse && personas.includes(activePersona)`.

Migration: every existing module → `course: 'understand'`; `businessVisible: true`
→ `personas: ['business','technical']`; `businessVisible: false` →
`personas: ['technical']`.

### State & URL

- Hash format: `#/<course>/<persona>/<module>` — e.g.
  `#/use/technical/agentic-coding`.
- **Backward-compatible:** a legacy `#/technical/tokens` is read as course
  `understand`.
- **Per-course progress:** `visited`, the `X/Y` bar, and spaced-review due counts
  become per-course; localStorage keys namespaced by course so the two courses'
  progress don't dilute each other.

### Edge cases

Handled the same way the persona toggle already is: if switching course/persona
leaves the active module invisible, jump to the first visible module in the new
combination (extend the existing `useEffect` at `App.tsx:184` to also watch course).

## "Use AI" Content Taxonomy (v1)

`●` = full module for that persona · `○` = not shown for that persona

```
USE AI ── module                          B  T   what the user can DO after
──────────────────────────────────────────────────────────────────────────
1 AI Tools Landscape                       ●  ●   pick the right tool: ChatGPT,
  "What tool for what job"                         Claude, Quick, Cowork, Code,
                                                    Kiro, Copilot — and why
2 Working With AI (chat-surface fluency)   ●  ●   drive a chat assistant well:
  "Getting great results day-to-day"               context, iteration, files,
                                                    projects/custom instructions
3 Agentic Coding (deep-dive)               ○  ●   drive Claude Code / Kiro:
  "Coding with an agent as your pair"              task decomposition, context &
                                                    memory mgmt, review loops, MCP
4 Optimizing Your Workflow                 ●  ●   build durable AI habits: where
  "From one-off prompts to a system"               AI fits your day, reusable
                                                    setups, team patterns
5 Agentic Work (business lens)             ●  ○   drive Quick / Cowork / agents:
  "AI assistants that do tasks for you"            delegate multi-step work,
                                                    supervise, set guardrails
6 Generative AI Beyond Text                ●  ●   use image/video/voice/multimodal
  "Image, voice, video, multimodal"                tools; know models & use cases
                                                    (B: use cases · T: APIs/models)
```

### Design decisions

1. **Modules 3 and 5 are the same idea split by persona.** "Driving an agent" =
   Claude Code / Kiro for a developer (#3), and Quick / Cowork for a business user
   (#5). Two persona-specific modules rather than one that awkwardly serves both —
   the matrix makes single-persona modules clean.
2. **Module 6 (GenAI breadth)** is the surface that broadens "LLM Academy" toward
   "GenAI Academy." Dual-track like every existing module (business: tools & use
   cases; technical: models & APIs).
3. **Hands-on "build from scratch" (RAG app / agent from scratch) is deferred to
   v2.** Out of scope for now; decide after seeing how the two-course structure
   lands. (Candidate v2 home: deeper hands-on sections inside the existing
   *Understand AI ▸ Technical* modules, keeping "Use AI" cleanly about operating
   tools — but not decided here.)

### Example CourseBridges

- Use ▸ Agentic Coding ⟷ Understand ▸ Agents & Tool Use
- Use ▸ Working With AI ⟷ Understand ▸ Prompt Engineering
- Use ▸ AI Tools Landscape ⟷ Understand ▸ The Industry Map

## Build Sequence

Each phase is independently shippable and gated by `npm run build && npm run lint`.

```
PHASE 0 ─ Scaffolding (no visible content yet)
  • CourseContext (mirror DifficultyContext) — 'understand' | 'use', localStorage, hash
  • Extend module registry: add course + personas fields
    (migrate businessVisible → personas; all existing modules → course:'understand')
  • Sidebar course switcher; per-course progress namespacing
  • Hash backward-compat (#/technical/tokens → understand)
  ✔ verify: existing app behaves identically; URL still resolves; lint+build green

PHASE 1 ─ First "Use AI" module (proves the pattern end-to-end)
  • Module 1: AI Tools Landscape (Business + Technical sections)
  • i18n wiring (EN + SV/KO translation files, matching existing convention)
  • KnowledgeCheck for both personas
  • At least one emulation (mantra acceptance criterion)
  ✔ verify: switch course → see new module; persona toggle filters; quiz works

PHASE 2 ─ CourseBridge component + first links
  • <CourseBridge> (directional callout, persona-aware, cross-course only)
  • Wire 2-3 bridges (Tools Landscape ⟷ Industry Map, etc.)
  ✔ verify: bridge appears, links across courses, hides when no counterpart

PHASE 3 ─ Remaining modules, in priority order
  2 Working With AI           (B+T)
  4 Optimizing Workflow       (B+T)
  3 Agentic Coding            (T)
  5 Agentic Work              (B)
  6 Generative AI Beyond Text (B+T)
  ✔ verify per module: lint+build, both personas render, quizzes, bridges,
    at least one emulation each
```

### Sequencing rationale

- **Phase 0** is pure infrastructure with zero content risk — if it ships and the
  old app is unchanged, the foundation is sound.
- **Phase 1** builds one full module before any others, validating the whole 4-lens
  pattern (course × persona × i18n × quiz × emulation) on a single vertical slice.
- **Phase 2** brings bridges early because they shape how modules reference each
  other.
- **Phase 3** fills modules by value: the two universal ones first, then the
  persona-specific agentic pair, then GenAI breadth last as the biggest net-new
  surface.

## Out of Scope (v1)

- Hands-on "build from scratch" content (deferred to v2).
- Any refactor of the existing 18 "Understand AI" modules beyond the registry
  field migration.
- A third course or additional personas.

## Constraints Inherited From the Repo

- React 19 + TypeScript + Vite 8, Tailwind v4, no router (state + hash nav).
- `tsconfig` has `noUnusedLocals` / `noUnusedParameters` on — build fails on dead imports.
- i18n via the `i18n/` barrel; per-module translation files (EN inline, SV/KO files).
- Dark + light theme; every colored class needs a `dark:` counterpart.
- No external UI/charting libraries — visualizations are HTML/CSS/SVG + React state.
