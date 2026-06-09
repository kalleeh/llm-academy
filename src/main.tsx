import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DifficultyProvider } from './DifficultyContext.tsx'
import { CourseProvider } from './CourseContext.tsx'
import { LanguageProvider } from './LanguageContext.tsx'
import { ThemeProvider } from './ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <DifficultyProvider>
          <CourseProvider>
            <App />
          </CourseProvider>
        </DifficultyProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
