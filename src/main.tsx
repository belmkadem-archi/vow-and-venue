import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { InvitationProvider } from './InvitationContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <InvitationProvider>
        <App />
      </InvitationProvider>
    </BrowserRouter>
  </StrictMode>,
)
