import { MODULES, type ModuleId } from '../registry'
import { useCourse } from '../CourseContext'
import { useDifficulty } from '../DifficultyContext'
import { MODULE_LABELS, t, useLanguage } from '../i18n'

interface CourseBridgeProps {
  /** Module to link to — must belong to the OTHER course. */
  target: ModuleId
  /** One-sentence hook for why the reader would cross over. Pass a translated string. */
  blurb: string
}

/**
 * Curated cross-course link ("go deeper" ⟷ "go apply").
 * Renders nothing when the target is in the current course or not visible
 * for the active persona — a bridge must never dead-end.
 */
export const CourseBridge: React.FC<CourseBridgeProps> = ({ target, blurb }) => {
  const { course } = useCourse()
  const { mode } = useDifficulty()
  const { lang } = useLanguage()

  const targetMeta = MODULES.find((m) => m.id === target)
  if (!targetMeta || targetMeta.course === course || !targetMeta.personas.includes(mode)) return null

  const ml = MODULE_LABELS[lang]?.[target]
  const targetLabel = ml ? (mode === 'business' && ml.businessLabel ? ml.businessLabel : ml.label) : targetMeta.label
  const heading = t(lang, targetMeta.course === 'understand' ? 'bridge.deeper' : 'bridge.apply')

  const go = () => {
    window.history.pushState(null, '', `#/${targetMeta.course}/${mode}/${target}`)
    // pushState never fires popstate on its own; App's popstate handler owns
    // cross-course navigation (course, persona, module, visited), so invoke it once.
    window.dispatchEvent(new PopStateEvent('popstate'))
    document.querySelector('main')?.scrollTo({ top: 0 })
  }

  return (
    <aside className="mt-6 max-w-2xl rounded-lg border border-dashed border-amber-300 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 p-4">
      <p className="font-mono text-xs font-semibold tracking-wide text-amber-700 dark:text-amber-400 uppercase">{heading}</p>
      <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{blurb}</p>
      <button
        onClick={go}
        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-amber-700 dark:text-amber-300 transition-colors hover:text-amber-600 dark:hover:text-amber-200"
      >
        {targetLabel} <span aria-hidden="true">→</span>
      </button>
    </aside>
  )
}
