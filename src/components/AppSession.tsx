import { useState } from 'react'
import type { ReactNode } from 'react'

export interface AppTab { id: string; label: string }

interface AppSessionProps {
  tabs: AppTab[]
  /** Translated a11y label for the product toggle. */
  toggleLabel: string
  /** Render the active variant's window. Use the id as a React key for clean reset on switch. */
  children: (activeId: string) => ReactNode
}

export const AppSession: React.FC<AppSessionProps> = ({ tabs, toggleLabel, children }) => {
  const [active, setActive] = useState(tabs[0].id)
  return (
    <div className="space-y-2">
      <div className="flex gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5" role="group" aria-label={toggleLabel}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            aria-pressed={active === t.id}
            className={`flex-1 rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors ${
              active === t.id
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {children(active)}
    </div>
  )
}
