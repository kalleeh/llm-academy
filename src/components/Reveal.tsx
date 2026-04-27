/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState, type ReactNode, type FC } from 'react'

/**
 * Hook that returns true once the element enters the viewport.
 * Once triggered, stays true (no re-hiding on scroll up).
 * Also handles elements that are already in the viewport on mount.
 */
export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip animation if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    // Check if already in viewport immediately (handles page switches)
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Element is already visible — reveal after a micro-delay
      // so the initial hidden state renders first (enables the transition)
      const timer = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(timer)
    }

    // Otherwise, observe for scroll-into-view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '50px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

type Animation = 'fade-up' | 'fade' | 'slide-left' | 'slide-right' | 'scale'

const HIDDEN: Record<Animation, string> = {
  'fade-up': 'opacity-0 translate-y-6',
  fade: 'opacity-0',
  'slide-left': 'opacity-0 -translate-x-8',
  'slide-right': 'opacity-0 translate-x-8',
  scale: 'opacity-0 scale-95',
}

const VISIBLE = 'opacity-100 translate-y-0 translate-x-0 scale-100'

interface RevealProps {
  children: ReactNode
  animation?: Animation
  /** Delay in ms (stagger children) */
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

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? VISIBLE : HIDDEN[animation]} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

/**
 * Wraps children in staggered reveal animations.
 * Each direct child gets an increasing delay.
 */
interface StaggerProps {
  children: ReactNode[]
  animation?: Animation
  /** Ms between each child */
  interval?: number
  className?: string
}

export const Stagger: FC<StaggerProps> = ({
  children,
  animation = 'fade-up',
  interval = 100,
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
