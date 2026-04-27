/* eslint-disable react-refresh/only-export-components */
 
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export type DifficultyMode = 'technical' | 'business'

interface DifficultyContextValue {
  mode: DifficultyMode
  toggle: () => void
}

const STORAGE_KEY = 'llm-academy-difficulty-mode'

const DifficultyContext = createContext<DifficultyContextValue>({
  mode: 'technical',
  toggle: () => {},
})

export function DifficultyProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<DifficultyMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'business' ? 'business' : 'technical'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  const toggle = useCallback(() => {
    setMode((prev) => (prev === 'technical' ? 'business' : 'technical'))
  }, [])

  return (
    <DifficultyContext.Provider value={{ mode, toggle }}>
      {children}
    </DifficultyContext.Provider>
  )
}

export function useDifficulty() {
  return useContext(DifficultyContext)
}
