import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppWithRouting } from './AppWithRouting.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithRouting />
  </StrictMode>,
)
