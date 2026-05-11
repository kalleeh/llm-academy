import { useTheme } from '../ThemeContext'
import { Icon } from './Icon'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 ${className}`}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={16} />
    </button>
  )
}
