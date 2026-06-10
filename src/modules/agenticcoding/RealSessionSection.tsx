import { useMemo } from 'react'
import { Workspace } from '../../components/Workspace'
import type { WorkspaceSnapshot } from '../../components/Workspace'
import type { TerminalStep } from '../../components/SimulatedTerminal'
import { SelfExplain } from '../../components/SelfExplain'
import { useTranslation } from '../../i18n'

// Terminal + filesystem content stays English by convention (matches FineTuningRunSection).
const STEPS: TerminalStep[] = [
  {
    command: 'claude "add rate limiting to the public API — 100 req/min per IP, return 429 over the limit, add a test"',
    output:
      'I\'ll start by understanding the API structure.\n\n→ Grep "express()" src/ — found src/app.js\n→ Read src/app.js, src/routes/public.js\n\nNo rate limiting today. Plan:\n  1. Add a rateLimiter middleware (in-memory, 100/min/IP)\n  2. Wire it into the public router\n  3. Add a test for the 429 path\n  4. Run the suite',
    delay: 900,
  },
  {
    command: '[agent] Write src/middleware/rateLimiter.js',
    output:
      'Created rateLimiter.js — sliding-window counter keyed by req.ip,\nreturns 429 with Retry-After when the window is exceeded.',
    delay: 600,
  },
  {
    command: '[agent] Edit src/routes/public.js',
    output:
      "+ const rateLimiter = require('../middleware/rateLimiter')\n+ router.use(rateLimiter({ windowMs: 60000, max: 100 }))\n\n✓ middleware wired into the public router",
    delay: 600,
  },
  {
    command: '[agent] Write test/rateLimiter.test.js',
    output:
      'Added a test: fires 101 requests from one IP, asserts the\n101st returns 429 and includes a Retry-After header.',
    delay: 600,
  },
  {
    command: '[agent] Bash: npm test',
    output:
      'PASS test/public.test.js\nPASS test/rateLimiter.test.js\n\nTest Suites: 2 passed, Tests: 14 passed\n\nDone. Rate limiting is live on the public API (100/min/IP),\nover-limit requests get a 429 + Retry-After, and a regression\ntest locks the behavior in.',
    delay: 800,
  },
]

const BASE_TREE = [
  { name: 'src', type: 'folder' as const, children: [
    { name: 'app.js', type: 'file' as const, size: '1.1 KB' },
    { name: 'routes', type: 'folder' as const, children: [
      { name: 'public.js', type: 'file' as const, size: '0.8 KB' },
    ] },
  ] },
  { name: 'test', type: 'folder' as const, children: [
    { name: 'public.test.js', type: 'file' as const, size: '0.6 KB' },
  ] },
  { name: 'package.json', type: 'file' as const, size: '0.4 KB' },
]

export const RealSessionSection: React.FC = () => {
  const c = useTranslation().modules.agenticcoding.realSession

  const snapshots = useMemo<Record<number, WorkspaceSnapshot>>(() => ({
    [-1]: { label: c.workspaceTitle, tree: BASE_TREE, info: c.snapshotInitial },
    [0]: { label: c.workspaceTitle, tree: BASE_TREE, info: c.snapshotMiddlewareSeen },
    [1]: { label: c.workspaceTitle, tree: [
      { name: 'src', type: 'folder', children: [
        { name: 'app.js', type: 'file', size: '1.1 KB' },
        { name: 'middleware', type: 'folder', children: [
          { name: 'rateLimiter.js', type: 'file', size: '0.7 KB', annotation: 'new' },
        ] },
        { name: 'routes', type: 'folder', children: [
          { name: 'public.js', type: 'file', size: '0.8 KB' },
        ] },
      ] },
      { name: 'test', type: 'folder', children: [
        { name: 'public.test.js', type: 'file', size: '0.6 KB' },
      ] },
      { name: 'package.json', type: 'file', size: '0.4 KB' },
    ], info: c.snapshotMiddlewareAdded },
    [2]: { label: c.workspaceTitle, tree: [
      { name: 'src', type: 'folder', children: [
        { name: 'app.js', type: 'file', size: '1.1 KB' },
        { name: 'middleware', type: 'folder', children: [
          { name: 'rateLimiter.js', type: 'file', size: '0.7 KB' },
        ] },
        { name: 'routes', type: 'folder', children: [
          { name: 'public.js', type: 'file', size: '0.9 KB', annotation: 'edited' },
        ] },
      ] },
      { name: 'test', type: 'folder', children: [
        { name: 'public.test.js', type: 'file', size: '0.6 KB' },
      ] },
      { name: 'package.json', type: 'file', size: '0.4 KB' },
    ], info: c.snapshotEdited },
    [3]: { label: c.workspaceTitle, tree: [
      { name: 'src', type: 'folder', children: [
        { name: 'app.js', type: 'file', size: '1.1 KB' },
        { name: 'middleware', type: 'folder', children: [
          { name: 'rateLimiter.js', type: 'file', size: '0.7 KB' },
        ] },
        { name: 'routes', type: 'folder', children: [
          { name: 'public.js', type: 'file', size: '0.9 KB' },
        ] },
      ] },
      { name: 'test', type: 'folder', children: [
        { name: 'public.test.js', type: 'file', size: '0.6 KB' },
        { name: 'rateLimiter.test.js', type: 'file', size: '0.5 KB', annotation: 'new' },
      ] },
      { name: 'package.json', type: 'file', size: '0.4 KB' },
    ], info: c.snapshotTested },
  }), [c])

  return (
    <section aria-labelledby="real-session">
      <h2 id="real-session" className="mb-4 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">{c.title}</h2>
      <p className="mb-2 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">{c.intro}</p>
      <p className="mb-4 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{c.stepNote}</p>
      <Workspace title={c.workspaceTitle} terminalTitle={c.terminalTitle} steps={STEPS} snapshots={snapshots} />
      <p className="mt-4 max-w-2xl rounded-lg border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/5 p-4 text-sm text-zinc-700 dark:text-zinc-300">{c.takeaway}</p>
      <div className="mt-8">
        <SelfExplain prompt={c.selfExplainPrompt} modelAnswer={c.selfExplainAnswer} />
      </div>
    </section>
  )
}
