import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DifficultyProvider } from './DifficultyContext.tsx'
import { LanguageProvider } from './LanguageContext.tsx'
import { ThemeProvider } from './ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <DifficultyProvider>
          <App />
        </DifficultyProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
