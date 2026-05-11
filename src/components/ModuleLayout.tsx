import { Children, type ReactNode, type FC } from 'react'
import { Reveal } from './Reveal'
import { MODULE_LABELS, useLanguage } from '../i18n'
import { useDifficulty } from '../DifficultyContext'

interface ModuleLayoutProps {
  moduleId?: string
  title: string
  subtitle: string
  children: ReactNode
}

export const ModuleLayout: FC<ModuleLayoutProps> = ({ moduleId, title, subtitle, children }) => {
  const { lang } = useLanguage()
  const { mode } = useDifficulty()

  const ml = moduleId ? MODULE_LABELS[lang]?.[moduleId] : undefined
  const displayTitle = ml
    ? (mode === 'business' && ml.businessLabel ? ml.businessLabel : ml.label)
    : title
  const displaySubtitle = ml
    ? (mode === 'business' && ml.businessSubtitle ? ml.businessSubtitle : ml.subtitle ?? subtitle)
    : subtitle

  return (
    <div className="mx-auto max-w-4xl space-y-16 pb-16">
      <Reveal animation="fade" delay={0}>
        <header>
          <h1 className="font-mono text-2xl font-bold text-zinc-100 sm:text-3xl">{displayTitle}</h1>
          <p className="mt-2 max-w-2xl text-zinc-400">{displaySubtitle}</p>
        </header>
      </Reveal>
      {Children.map(children, (child, i) => (
        <Reveal key={i} animation="fade-up" delay={80 + i * 60}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
