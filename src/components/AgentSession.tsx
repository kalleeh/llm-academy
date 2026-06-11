import { useState, useCallback } from 'react'
import { AgentTranscript } from './AgentTranscript'
import type { CliVariant, TranscriptTurn } from './AgentTranscript'
import { FileExplorer } from './FileExplorer'
import type { WorkspaceSnapshot } from './Workspace'

interface VariantData { turns: TranscriptTurn[]; snapshots?: Record<number, WorkspaceSnapshot> }

interface AgentSessionProps {
  variants: Record<CliVariant, VariantData>
  /** Translated a11y label for the CLI toggle. */
  toggleLabel: string
  /** FileExplorer title when snapshots are present. */
  fileTreeTitle?: string
}

const VARIANT_TABS: { id: CliVariant; label: string }[] = [
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'kiro', label: 'Kiro CLI' },
]

export const AgentSession: React.FC<AgentSessionProps> = ({ variants, toggleLabel, fileTreeTitle }) => {
  const [variant, setVariant] = useState<CliVariant>('claude-code')
  const [executedTurn, setExecutedTurn] = useState(-1)

  const handleTurn = useCallback((i: number) => setExecutedTurn(i), [])
  const selectVariant = useCallback((v: CliVariant) => {
    setVariant(v)
    setExecutedTurn(-1)
  }, [])

  const active = variants[variant]
  const snapshots = active.snapshots

  let snapshot: WorkspaceSnapshot | undefined
  if (snapshots) {
    const keys = Object.keys(snapshots).map(Number).sort((a, b) => a - b)
    const activeKey = keys.reduce((best, k) => (k <= executedTurn ? k : best), keys[0] ?? -1)
    snapshot = snapshots[activeKey]
  }

  return (
    <div className="space-y-2">
      {/* CLI toggle */}
      <div className="flex gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5" role="group" aria-label={toggleLabel}>
        {VARIANT_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => selectVariant(t.id)}
            aria-pressed={variant === t.id}
            className={`flex-1 rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors ${
              variant === t.id
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {snapshots ? (
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="min-w-0">
            <AgentTranscript key={variant} variant={variant} turns={active.turns} onTurnExecuted={handleTurn} />
          </div>
          <div className="flex h-80 min-w-0 flex-col gap-2 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
            {snapshot ? (
              <>
                <div className="flex-1 overflow-y-auto px-1 pt-2">
                  <FileExplorer tree={snapshot.tree} title={fileTreeTitle ?? '~/project'} />
                </div>
                {snapshot.info && (
                  <div className="shrink-0 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2">
                    <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">{snapshot.info}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-xs text-zinc-500 dark:text-zinc-600">
                Run the session to see files change
              </div>
            )}
          </div>
        </div>
      ) : (
        <AgentTranscript key={variant} variant={variant} turns={active.turns} onTurnExecuted={handleTurn} />
      )}
    </div>
  )
}
