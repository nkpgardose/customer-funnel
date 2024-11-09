import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/Globals/variables.css'
import './components/Globals/globals.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
