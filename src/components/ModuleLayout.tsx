import { Children, type ReactNode, type FC } from 'react'
import { Reveal } from './Reveal'
import { useLanguage } from '../LanguageContext'
import { MODULE_LABELS } from '../ui-labels'
import { useDifficulty } from '../DifficultyContext'

interface ModuleLayoutProps {
  /** Used to look up translated title/subtitle. Falls back to title/subtitle props. */
  moduleId?: string
  title: string
  subtitle: string
  children: ReactNode
}

/**
 * Standard module wrapper that applies scroll-reveal animations
 * to the header and each direct child (section).
 * Translates the title from MODULE_LABELS when moduleId is provided.
 */
export const ModuleLayout: FC<ModuleLayoutProps> = ({ moduleId, title, subtitle, children }) => {
  const { lang } = useLanguage()
  const { mode } = useDifficulty()

  // Look up translated title and subtitle from MODULE_LABELS if moduleId provided
  const ml = moduleId ? MODULE_LABELS[lang]?.[moduleId] : undefined
  const displayTitle = ml
    ? (mode === 'business' && ml.businessLabel ? ml.businessLabel : ml.label)
    : title
  const displaySubtitle = ml
    ? (mode === 'business' && ml.businessSubtitle ? ml.businessSubtitle : ml.subtitle ?? subtitle)
    : subtitle

  return (
    <div className="mx-auto max-w-4xl space-y-16 pb-16">
      <Reveal animation="fade">
        <header>
          <h1 className="font-mono text-2xl font-bold text-zinc-100 sm:text-3xl">{displayTitle}</h1>
          <p className="mt-2 max-w-2xl text-zinc-400">{displaySubtitle}</p>
        </header>
      </Reveal>
      {Children.map(children, (child, i) => (
        <Reveal key={i} animation="fade-up" delay={i === 0 ? 100 : 0}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
