/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export type Course = 'understand' | 'use'

interface CourseContextValue {
  course: Course
  setCourse: (c: Course) => void
}

const STORAGE_KEY = 'llm-academy-course'

const CourseContext = createContext<CourseContextValue>({
  course: 'understand',
  setCourse: () => {},
})

export function CourseProvider({ children }: { children: ReactNode }) {
  const [course, setCourseState] = useState<Course>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'use' ? 'use' : 'understand'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, course)
  }, [course])

  const setCourse = useCallback((c: Course) => setCourseState(c), [])

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      {children}
    </CourseContext.Provider>
  )
}

export function useCourse() {
  return useContext(CourseContext)
}
