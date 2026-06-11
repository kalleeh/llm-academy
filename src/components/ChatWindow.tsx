import { useState, useCallback, useEffect, useRef } from 'react'
import { Icon } from './Icon'

export type ChatVariant = 'chatgpt' | 'claude'
export type ChatRole = 'user' | 'assistant'
export interface ChatStep { label: string; content: string; note?: string }

interface ChatWindowProps {
  variant: ChatVariant
  steps: ChatStep[]
  /** Parallel to steps: who "sends" each step. */
  roles: ChatRole[]
}

const META: Record<ChatVariant, { name: string; bar: string; accent: string; avatar: string; mark: string; send: string }> = {
  chatgpt: { name: 'ChatGPT', bar: 'bg-zinc-800', accent: 'text-emerald-400', avatar: 'bg-emerald-600', mark: '◯', send: 'bg-emerald-600' },
  claude: { name: 'Claude', bar: 'bg-stone-700', accent: 'text-orange-300', avatar: 'bg-orange-600', mark: '✻', send: 'bg-orange-600' },
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ variant, steps, roles }) => {
  const [revealed, setRevealed] = useState(0)
  const m = META[variant]
  const bodyRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setRevealed(0) }, [variant, steps])
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight }, [revealed])

  const next = useCallback(() => setRevealed((r) => Math.min(r + 1, steps.length)), [steps.length])
  const hasMore = revealed < steps.length

  return (
    <div className="flex h-96 flex-col overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700 shadow-sm">
      {/* Title bar */}
      <div className={`flex shrink-0 items-center gap-2 px-4 py-2 ${m.bar}`}>
        <span className="size-3 rounded-full bg-white/25" />
        <span className="size-3 rounded-full bg-white/25" />
        <span className="size-3 rounded-full bg-white/25" />
        <span className={`ml-2 font-mono text-xs font-semibold ${m.accent}`}>{m.mark} {m.name}</span>
      </div>
      {/* Messages */}
      <div ref={bodyRef} className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950 p-4 space-y-4">
        {steps.slice(0, revealed).map((s, i) => {
          const role = roles[i]
          const isUser = role === 'user'
          return (
            <div key={i} className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}>
              <span className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${isUser ? 'bg-zinc-500' : m.avatar}`}>{isUser ? 'U' : m.mark}</span>
              <div className={`min-w-0 max-w-[80%] ${isUser ? 'text-right' : ''}`}>
                <div className={`inline-block rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${isUser ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'}`}>
                  {s.content}
                </div>
                {s.note && <p className="mt-1.5 text-xs italic text-zinc-500"><Icon name="lightbulb" size={12} className="mr-1 inline" />{s.note}</p>}
              </div>
            </div>
          )
        })}
        {revealed === 0 && (
          <div className="flex h-full items-center justify-center text-xs text-zinc-400 dark:text-zinc-600">Press Run to start the conversation</div>
        )}
      </div>
      {/* Composer (decorative) + action */}
      <div className="flex shrink-0 items-center gap-2 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-3 py-2">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-3 py-1.5">
          <span className="flex-1 truncate text-xs text-zinc-400 dark:text-zinc-500">Message {m.name}…</span>
          <span className={`flex size-5 items-center justify-center rounded-full text-white ${m.send}`}><Icon name="arrow-right" size={12} /></span>
        </div>
        {hasMore ? (
          <button onClick={next} className="rounded bg-zinc-200 dark:bg-zinc-600 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-500">{revealed === 0 ? 'Run' : 'Next'}</button>
        ) : (
          <span className="px-2 text-xs text-zinc-500">✓ Done</span>
        )}
      </div>
    </div>
  )
}
