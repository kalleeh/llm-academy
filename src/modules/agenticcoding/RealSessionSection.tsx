import { useMemo } from 'react'
import { AgentSession } from '../../components/AgentSession'
import type { TranscriptTurn } from '../../components/AgentTranscript'
import type { WorkspaceSnapshot } from '../../components/Workspace'
import type { FileNode } from '../../components/FileExplorer'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Transcript + filesystem content stays English by convention.
// Same task in each CLI: add rate limiting (100 req/min/IP, 429 over limit) + a test.

const CLAUDE_TURNS: TranscriptTurn[] = [
  { lines: [
    { kind: 'user', text: 'add rate limiting to the public API — 100 req/min per IP, return 429 over the limit, add a test' },
  ], delay: 800 },
  { lines: [
    { kind: 'tool', text: 'Grep(pattern: "express()", path: "src/")' },
    { kind: 'result', text: 'src/app.js' },
    { kind: 'tool', text: 'Read(src/app.js, src/routes/public.js)' },
    { kind: 'result', text: 'Read 2 files' },
    { kind: 'assistant', text: 'No rate limiting today. Plan: add a rateLimiter middleware, wire it into the public router, add a 429 test, run the suite.' },
  ], delay: 1100 },
  { lines: [
    { kind: 'tool', text: 'Write(src/middleware/rateLimiter.js)' },
    { kind: 'result', text: 'Wrote 18 lines — sliding-window counter keyed by req.ip, 429 + Retry-After over the limit' },
  ], delay: 800 },
  { lines: [
    { kind: 'tool', text: 'Update(src/routes/public.js)' },
    { kind: 'result', text: 'Updated with 2 additions' },
    { kind: 'diff-add', text: "    + const rateLimiter = require('../middleware/rateLimiter')" },
    { kind: 'diff-add', text: '    + router.use(rateLimiter({ windowMs: 60000, max: 100 }))' },
  ], delay: 800 },
  { lines: [
    { kind: 'tool', text: 'Write(test/rateLimiter.test.js)' },
    { kind: 'result', text: 'Wrote 12 lines — fires 101 requests, asserts the 101st is 429 with Retry-After' },
    { kind: 'tool', text: 'Bash(npm test)' },
    { kind: 'result', text: '2 suites passed, 14 tests passed' },
    { kind: 'assistant', text: 'Done. Rate limiting is live (100/min/IP), over-limit requests get 429 + Retry-After, and a regression test locks it in.' },
  ], delay: 1200 },
]

const KIRO_TURNS: TranscriptTurn[] = [
  { lines: [
    { kind: 'user', text: 'add rate limiting to the public API — 100 req/min per IP, return 429 over the limit, add a test' },
  ], delay: 800 },
  { lines: [
    { kind: 'assistant', text: 'Generating a spec before writing code.' },
    { kind: 'ok', text: 'Created .kiro/specs/add-rate-limit/requirements.md' },
    { kind: 'ok', text: 'Created .kiro/specs/add-rate-limit/design.md' },
    { kind: 'ok', text: 'Created .kiro/specs/add-rate-limit/tasks.md' },
    { kind: 'result', text: 'Task 1 — rateLimiter middleware (sliding window, 100/min/IP)' },
    { kind: 'result', text: 'Task 2 — wire into the public router' },
    { kind: 'result', text: 'Task 3 — add 429 regression test, run suite' },
  ], delay: 1200 },
  { lines: [
    { kind: 'tool', text: 'Execute task 1/3 — middleware' },
    { kind: 'result', text: 'Created src/middleware/rateLimiter.js' },
    { kind: 'tool', text: 'Execute task 2/3 — wire router' },
    { kind: 'result', text: 'Updated src/routes/public.js' },
  ], delay: 900 },
  { lines: [
    { kind: 'tool', text: 'Execute task 3/3 — test + suite' },
    { kind: 'result', text: 'Created test/rateLimiter.test.js' },
    { kind: 'result', text: 'npm test: 14 passed' },
    { kind: 'assistant', text: 'All tasks complete. The change is traceable to .kiro/specs/add-rate-limit/ — requirements, design, and tasks live beside the code.' },
  ], delay: 1100 },
]

// Shared file nodes
const F = (name: string, size: string, annotation?: string): FileNode => ({ name, type: 'file', size, ...(annotation ? { annotation } : {}) })
const baseSrc = (publicSize = '0.8 KB', publicAnn?: string, withMiddleware?: 'new' | 'plain'): FileNode => ({
  name: 'src', type: 'folder', children: [
    F('app.js', '1.1 KB'),
    ...(withMiddleware ? [{ name: 'middleware', type: 'folder' as const, children: [F('rateLimiter.js', '0.7 KB', withMiddleware === 'new' ? 'new' : undefined)] }] : []),
    { name: 'routes', type: 'folder', children: [F('public.js', publicSize, publicAnn)] },
  ],
})
const testFolder = (withRateTest?: boolean): FileNode => ({
  name: 'test', type: 'folder', children: [
    F('public.test.js', '0.6 KB'),
    ...(withRateTest ? [F('rateLimiter.test.js', '0.5 KB', 'new')] : []),
  ],
})
const pkg = F('package.json', '0.4 KB')
const kiroSpec = (): FileNode => ({
  name: '.kiro', type: 'folder', children: [{
    name: 'specs', type: 'folder', children: [{
      name: 'add-rate-limit', type: 'folder', children: [
        F('requirements.md', '0.5 KB', 'new'), F('design.md', '0.6 KB', 'new'), F('tasks.md', '0.3 KB', 'new'),
      ],
    }],
  }],
})

export const RealSessionSection: React.FC = () => {
  const c = useTranslation().modules.agenticcoding.realSession

  const claudeSnapshots = useMemo<Record<number, WorkspaceSnapshot>>(() => ({
    [-1]: { tree: [baseSrc(), testFolder(), pkg], info: c.snapshotInitial },
    [0]: { tree: [baseSrc(), testFolder(), pkg], info: c.snapshotMiddlewareSeen },
    [1]: { tree: [baseSrc('0.8 KB', undefined, 'new'), testFolder(), pkg], info: c.snapshotMiddlewareAdded },
    [2]: { tree: [baseSrc('0.9 KB', 'edited', 'plain'), testFolder(), pkg], info: c.snapshotEdited },
    [3]: { tree: [baseSrc('0.9 KB', undefined, 'plain'), testFolder(true), pkg], info: c.snapshotTested },
  }), [c])

  const kiroSnapshots = useMemo<Record<number, WorkspaceSnapshot>>(() => ({
    [-1]: { tree: [baseSrc(), testFolder(), pkg], info: c.snapshotInitial },
    [0]: { tree: [kiroSpec(), baseSrc(), testFolder(), pkg], info: c.snapshotKiroSpec },
    [1]: { tree: [kiroSpec(), baseSrc('0.9 KB', 'edited', 'new'), testFolder(), pkg], info: c.snapshotMiddlewareAdded },
    [2]: { tree: [kiroSpec(), baseSrc('0.9 KB', undefined, 'plain'), testFolder(true), pkg], info: c.snapshotTested },
  }), [c])

  return (
    <section aria-labelledby="real-session">
      <h2 id="real-session" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <p className="mb-4 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.stepNote}</p>
      <AgentSession
        toggleLabel={c.cliToggleLabel}
        fileTreeTitle="~/project"
        variants={{
          'claude-code': { turns: CLAUDE_TURNS, snapshots: claudeSnapshots },
          kiro: { turns: KIRO_TURNS, snapshots: kiroSnapshots },
        }}
      />
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
