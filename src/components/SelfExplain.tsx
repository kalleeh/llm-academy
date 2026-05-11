import { useState } from 'react'
import { t, translateSelfExplain, useLanguage } from '../i18n'
import { Icon } from './Icon'

interface SelfExplainProps {
  prompt: string
  modelAnswer: string
}

export const SelfExplain: React.FC<SelfExplainProps> = ({ prompt, modelAnswer }) => {
  const { lang } = useLanguage()
  const tr = translateSelfExplain(prompt, modelAnswer, lang)
  const [collapsed, setCollapsed] = useState(false)
  const [text, setText] = useState('')
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="border-l-2 border-amber-400 dark:border-amber-500/30 bg-zinc-100 dark:bg-zinc-900/50 pl-4">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex w-full items-center gap-2 py-3 text-left text-sm font-medium text-amber-700 dark:text-amber-400/80 transition-colors hover:text-amber-600 dark:hover:text-amber-300"
      >
        <Icon
          name="lightbulb"
          className={`transition-transform ${collapsed ? '' : 'rotate-0'}`}
        />
        Explain It
        <span className="text-xs text-zinc-500">{collapsed ? '(click to expand)' : ''}</span>
      </button>

      {!collapsed && (
        <div className="space-y-3 pb-4">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{tr.prompt}</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={revealed}
            placeholder="Type your explanation…"
            rows={3}
            className="w-full resize-none rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-amber-500/50 focus:outline-none disabled:opacity-70"
          />
          {!revealed && text.length >= 20 && (
            <button
              onClick={() => setRevealed(true)}
              className="rounded-lg bg-zinc-200 dark:bg-zinc-700 px-4 py-2 text-sm text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-600"
            >
              Compare with model answer
            </button>
          )}
          {revealed && (
            <div className="rounded-lg border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5 p-4">
              <p className="mb-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">{t(lang, 'check.modelAnswer')}</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{tr.modelAnswer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
