import { useState, useCallback } from 'react'
import { tLabel, useLanguage } from '../i18n'
import { SimulatedTerminal } from './SimulatedTerminal'
import type { TerminalStep } from './SimulatedTerminal'
import { FileExplorer } from './FileExplorer'
import type { FileNode } from './FileExplorer'
import { Icon } from './Icon'

export interface WorkspaceSnapshot {
  /** File tree to show at this stage */
  tree: FileNode[]
  /** Optional label shown above the file explorer */
  label?: string
  /** Optional info/status text shown in the info panel */
  info?: string
}

interface WorkspaceProps {
  title?: string
  terminalTitle?: string
  steps: TerminalStep[]
  /**
   * Filesystem snapshots keyed by step index.
   * The workspace shows the snapshot for the highest step index <= current executed step.
   * Include a -1 key for the initial state before any commands run.
   */
  snapshots: Record<number, WorkspaceSnapshot>
}

export const Workspace: React.FC<WorkspaceProps> = ({ title, terminalTitle, steps, snapshots }) => {
  const { lang } = useLanguage()
  const [executedStep, setExecutedStep] = useState(-1)

  const handleStepExecuted = useCallback((stepIndex: number) => {
    setExecutedStep(stepIndex)
  }, [])

  // Find the most recent snapshot for the current step
  const snapshotKeys = Object.keys(snapshots)
    .map(Number)
    .sort((a, b) => a - b)
  const activeKey = snapshotKeys.reduce(
    (best, k) => (k <= executedStep ? k : best),
    snapshotKeys[0] ?? -1,
  )
  const snapshot = snapshots[activeKey]

  return (
    <div className="space-y-2">
      {title && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400"><Icon name="terminal" /> {title}</span>
          <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>
      )}
      <div className="grid gap-3 lg:grid-cols-2">
        {/* Terminal panel — fixed height via SimulatedTerminal's h-80 */}
        <div className="min-w-0">
          <SimulatedTerminal
            steps={steps}
            title={terminalTitle ?? 'terminal'}
            onStepExecuted={handleStepExecuted}
          />
        </div>

        {/* Filesystem + info panel — fixed height matching terminal */}
        <div className="flex h-80 min-w-0 flex-col gap-2 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
          {snapshot ? (
            <>
              {snapshot.label && (
                <p className="shrink-0 px-4 pt-3 text-xs font-medium text-zinc-600 dark:text-zinc-400">{tLabel(lang, snapshot.label)}</p>
              )}
              <div className="flex-1 overflow-y-auto px-1">
                <FileExplorer tree={snapshot.tree} title="~/project" />
              </div>
              {snapshot.info && (
                <div className="shrink-0 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2">
                  <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">{snapshot.info}</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-xs text-zinc-500 dark:text-zinc-600">
              Run commands to see filesystem changes
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
