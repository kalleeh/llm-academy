/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState, startTransition, type ReactNode, type FC } from 'react'

export function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () => startTransition(() => setVisible(true))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      show()
      return
    }

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const timer = requestAnimationFrame(show)
      return () => cancelAnimationFrame(timer)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '60px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

type Animation = 'fade-up' | 'fade' | 'slide-left' | 'slide-right' | 'scale'

interface RevealProps {
  children: ReactNode
  animation?: Animation
  delay?: number
  className?: string
}

export const Reveal: FC<RevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
}) => {
  const { ref, visible } = useInView()

  // Each animation type has its own hidden → visible transform
  const styles: Record<Animation, { hidden: React.CSSProperties; visible: React.CSSProperties }> = {
    'fade-up': {
      hidden: { opacity: 0, transform: 'translateY(20px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'slide-left': {
      hidden: { opacity: 0, transform: 'translateX(-24px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    'slide-right': {
      hidden: { opacity: 0, transform: 'translateX(24px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    scale: {
      hidden: { opacity: 0, transform: 'scale(0.97)' },
      visible: { opacity: 1, transform: 'scale(1)' },
    },
  }

  const s = styles[animation]

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(visible ? s.visible : s.hidden),
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: visible ? `${delay}ms` : '0ms',
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

interface StaggerProps {
  children: ReactNode[]
  animation?: Animation
  interval?: number
  className?: string
}

export const Stagger: FC<StaggerProps> = ({
  children,
  animation = 'fade-up',
  interval = 80,
  className = '',
}) => (
  <div className={className}>
    {children.map((child, i) => (
      <Reveal key={i} animation={animation} delay={i * interval}>
        {child}
      </Reveal>
    ))}
  </div>
)
