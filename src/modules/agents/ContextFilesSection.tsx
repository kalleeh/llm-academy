import { useState, useCallback } from 'react'
import { CodeBlock } from '../../components/CodeBlock'
import { SelfExplain } from '../../components/SelfExplain'
import { useT } from '../../i18n'

// Verified examples below come from:
// - https://agents.md/                    (open standard, AAIF / OpenAI / Sourcegraph)
// - https://agentskills.io/specification  (Anthropic Agent Skills, open standard)
// - https://kiro.dev/docs/cli/steering/   (Kiro steering files)

const AGENTS_MD = `# AGENTS.md

## Setup commands
- Install deps: \`pnpm install\`
- Start dev server: \`pnpm dev\`
- Run tests: \`pnpm test\`

## Code style
- TypeScript strict mode
- Single quotes, no semicolons
- Functional patterns where possible

## Testing instructions
- Find the CI plan in .github/workflows/
- Run \`pnpm test --filter <project>\` per package
- All tests must pass before merge
- Add or update tests for the code you change

## PR instructions
- Title format: [<project>] <Title>
- Always run \`pnpm lint\` and \`pnpm test\` before committing`

const SKILL_MD = `---
name: pdf-processing
description: Extract text and tables from PDFs, fill forms, and merge files. Use when working with PDF documents or when the user mentions PDFs, forms, or document extraction.
license: Apache-2.0
metadata:
  author: example-org
  version: "1.0"
---

# PDF Processing

Use \`scripts/extract.py\` to pull text and tables from a PDF.
Use \`scripts/fill_form.py\` for form-filling.
Use \`scripts/merge.py\` to combine multiple PDFs.

See \`references/REFERENCE.md\` for the full API reference and edge
cases (encrypted PDFs, scanned documents, malformed forms).`

const KIRO_STEERING = `.kiro/
├── steering/
│   ├── product.md      # What the product is, who it serves
│   ├── tech.md         # Languages, frameworks, libraries, runtimes
│   ├── structure.md    # Directory layout and conventions
│   └── style.md        # Coding style, naming, patterns to prefer
└── specs/              # Per-feature specs (optional)
    └── feature-x/
        ├── requirements.md
        ├── design.md
        └── tasks.md`

const STEERING_EXAMPLE = `# tech.md — Kiro steering file

## Languages and runtimes
- TypeScript 5.x with \`strict: true\`
- Node.js 22 (LTS)
- React 19, Vite 8, Tailwind CSS v4

## Approved libraries
- Data fetching: native \`fetch\` only — do not add axios
- State: React state + context — no Redux
- Testing: Vitest, no Jest

## Patterns to prefer
- Functional components with hooks
- Discriminated unions over enums
- \`Result<T, E>\` types for fallible APIs

## Patterns to avoid
- \`any\` type
- Default exports (named only)
- Class components`

interface FormatRow {
  format: string
  scope: string
  audience: string
  origin: string
  spec: string
  good: string
  bad: string
  color: string
}

const FORMATS: FormatRow[] = [
  {
    format: 'AGENTS.md',
    scope: 'Repo (or subdirectory)',
    audience: 'Any coding agent',
    origin: 'Open standard, donated to Agentic AI Foundation (Linux Foundation, Dec 2025) by OpenAI / Sourcegraph. 60,000+ repos.',
    spec: 'agents.md',
    good: 'Setup commands, test commands, code style, PR rules — anything you would tell a new contributor.',
    bad: 'Domain knowledge for one specific task. That belongs in a SKILL.md.',
    color: 'border-emerald-500/30 bg-emerald-500/5',
  },
  {
    format: 'SKILL.md',
    scope: 'One folder, one capability',
    audience: 'Any Skills-compatible agent',
    origin: 'Anthropic Agent Skills, launched Oct 16 2025. Open standard at agentskills.io (Dec 18 2025). Adopted by Claude Code, Codex, Microsoft Agent Framework, Kiro.',
    spec: 'agentskills.io/specification',
    good: 'Reusable expertise — "how to file an expense report", "how to extract data from PDFs", "how to onboard a customer".',
    bad: 'General project conventions. Those belong in AGENTS.md.',
    color: 'border-amber-500/30 bg-amber-500/5',
  },
  {
    format: 'Kiro steering',
    scope: 'Workspace',
    audience: 'Kiro CLI / IDE',
    origin: 'AWS Kiro, vendor-specific. Sits alongside AGENTS.md (Kiro reads both).',
    spec: 'kiro.dev/docs/cli/steering',
    good: 'Persistent project knowledge that should always be in context — tech stack, structure, style, product overview.',
    bad: 'Per-task workflows. Use specs in \`.kiro/specs/\` or a SKILL.md instead.',
    color: 'border-cyan-500/30 bg-cyan-500/5',
  },
  {
    format: 'CLAUDE.md / .cursorrules / others',
    scope: 'Repo',
    audience: 'Vendor-specific',
    origin: 'Predates AGENTS.md. Claude Code, Cursor, Aider, etc. each had their own filename. Most now also read AGENTS.md.',
    spec: 'Vendor docs',
    good: 'Vendor-specific overrides on top of AGENTS.md — e.g. instructions only relevant inside one tool.',
    bad: 'Don\'t maintain three copies. Put shared content in AGENTS.md and link from the others.',
    color: 'border-zinc-600/40 bg-zinc-800/40',
  },
]

const EN_INTRO = `Modern AI coding tools are increasingly programmed by markdown files, not code. There are now three converging open formats — plus a handful of vendor-specific ones — and they layer rather than compete.`

export const ContextFilesSection: React.FC = () => {
  const c = useT({ title: '5. Context Files: AGENTS.md, SKILL.md, Steering', intro: EN_INTRO }, {})
  const [expanded, setExpanded] = useState<number | null>(0)
  const toggle = useCallback((i: number) => setExpanded((p) => (p === i ? null : i)), [])

  return (
    <section aria-labelledby="context-files">
      <h2 id="context-files" className="mb-4 font-mono text-xl font-bold text-zinc-100">{c.title}</h2>
      <p className="mb-6 max-w-2xl leading-relaxed text-zinc-300">{c.intro}</p>

      {/* Mental model */}
      <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-900 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-100">The three layers</p>
        <ul className="space-y-2 text-sm text-zinc-300">
          <li><code className="rounded bg-zinc-800 px-1.5 py-0.5 text-amber-300">AGENTS.md</code> — <strong>WHAT</strong> to do in this repo (project instructions)</li>
          <li><code className="rounded bg-zinc-800 px-1.5 py-0.5 text-amber-300">SKILL.md</code> — <strong>HOW</strong> to do specific tasks (reusable capabilities)</li>
          <li><code className="rounded bg-zinc-800 px-1.5 py-0.5 text-amber-300">MCP config</code> — <strong>WHICH</strong> external tools are available (services)</li>
        </ul>
        <p className="mt-3 text-xs text-zinc-500">
          AGENTS.md says &quot;follow our content standards.&quot; A SKILL.md provides the
          procedure. MCP connects the tools the procedure needs. They compose.
        </p>
      </div>

      {/* Format comparison */}
      <div className="mb-6 space-y-2">
        {FORMATS.map((f, i) => (
          <div key={f.format} className={`rounded-lg border ${f.color}`}>
            <button onClick={() => toggle(i)} className="flex w-full items-center justify-between px-5 py-3 text-left" aria-expanded={expanded === i}>
              <div className="min-w-0">
                <span className="font-mono text-sm font-medium text-zinc-100">{f.format}</span>
                <span className="ml-3 text-xs text-zinc-400">— {f.scope}</span>
              </div>
              <span className="ml-2 shrink-0 text-xs text-zinc-500">{expanded === i ? '▲' : '▼'}</span>
            </button>
            {expanded === i && (
              <div className="space-y-3 border-t border-zinc-800 px-5 py-4 text-xs">
                <div>
                  <p className="mb-1 text-zinc-500">Audience</p>
                  <p className="text-zinc-300">{f.audience}</p>
                </div>
                <div>
                  <p className="mb-1 text-zinc-500">Origin / spec</p>
                  <p className="text-zinc-300">{f.origin} <span className="text-zinc-500">(spec: {f.spec})</span></p>
                </div>
                <div>
                  <p className="mb-1 text-emerald-400">✓ Good for</p>
                  <p className="text-zinc-300">{f.good}</p>
                </div>
                <div>
                  <p className="mb-1 text-red-400">✗ Don&apos;t put</p>
                  <p className="text-zinc-300">{f.bad}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AGENTS.md example */}
      <div className="mb-6">
        <h3 className="mb-2 font-mono text-sm font-semibold text-zinc-100">AGENTS.md — minimal example</h3>
        <p className="mb-2 text-xs text-zinc-400">
          Drop at the repo root. Monorepos can nest — the closest file wins for any given path.
        </p>
        <CodeBlock code={AGENTS_MD} language="markdown" title="AGENTS.md (root of repo)" />
      </div>

      {/* SKILL.md example */}
      <div className="mb-6">
        <h3 className="mb-2 font-mono text-sm font-semibold text-zinc-100">SKILL.md — minimal example</h3>
        <p className="mb-2 text-xs text-zinc-400">
          One folder per skill. The agent reads only the frontmatter at startup; the body and{' '}
          <code className="text-amber-300">references/</code> load on demand.
        </p>
        <CodeBlock code={SKILL_MD} language="markdown" title="skills/pdf-processing/SKILL.md" />
      </div>

      {/* Kiro steering */}
      <div className="mb-6">
        <h3 className="mb-2 font-mono text-sm font-semibold text-zinc-100">Kiro steering — workspace context</h3>
        <p className="mb-2 text-xs text-zinc-400">
          Steering files live in <code className="text-amber-300">.kiro/steering/</code> and are
          always in context for Kiro. Run <code className="text-amber-300">kiro</code> &quot;Generate Steering Docs&quot;
          to bootstrap the typical four files from your codebase, then edit.
        </p>
        <CodeBlock code={KIRO_STEERING} language="bash" title=".kiro/ layout" />
        <div className="mt-3">
          <CodeBlock code={STEERING_EXAMPLE} language="markdown" title=".kiro/steering/tech.md" />
        </div>
      </div>

      {/* Practical guidance */}
      <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-5">
        <p className="mb-2 text-sm font-medium text-amber-300">Practical rules of thumb</p>
        <ul className="space-y-1.5 text-xs text-zinc-300">
          <li>• <strong>Start with AGENTS.md.</strong> It works in every modern coding agent and is the lowest-effort win. Most existing CLAUDE.md / .cursorrules content moves cleanly into it.</li>
          <li>• <strong>Add a SKILL.md when you find yourself re-explaining the same workflow.</strong> &quot;How we file expenses,&quot; &quot;how we cut a release,&quot; &quot;how we triage incidents.&quot;</li>
          <li>• <strong>Keep SKILL.md bodies under ~5K tokens.</strong> Push details into <code className="text-amber-300">references/</code>; the agent loads them only when needed.</li>
          <li>• <strong>name and description matter most.</strong> The agent only sees those at startup — they decide whether your skill ever runs.</li>
          <li>• <strong>Vendor-specific files are still useful</strong> for tool-only quirks (e.g. Kiro hooks). Otherwise prefer the open standards.</li>
        </ul>
      </div>

      <SelfExplain
        prompt="Your team has three things they keep re-explaining to AI tools: (1) which package manager and test commands to use, (2) the exact 5-step process for cutting a release, (3) which Slack channel to ping when a deploy fails. Where would each one go — AGENTS.md, SKILL.md, or steering?"
        modelAnswer={"(1) Package manager and test commands → AGENTS.md. This is repo-level setup that every agent on the project needs immediately. (2) The 5-step release process → a SKILL.md (e.g. cut-release/SKILL.md). It's a reusable, multi-step procedure with clear activation criteria — exactly what skills are for. The frontmatter description should mention 'release', 'cut a release', 'tag a version' so any agent can find it. (3) Slack channel for deploy failures → could go in either AGENTS.md (under a 'When things go wrong' section) or inside the cut-release SKILL.md if it's only relevant during the release flow. If multiple skills reference it, put it in AGENTS.md once. Kiro steering would only be the right home if your team only uses Kiro — otherwise prefer the open formats."}
      />
    </section>
  )
}
