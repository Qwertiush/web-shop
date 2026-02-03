import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/main.scss'
import { CartProvider } from './providers/CartProvider.tsx'
import { PreferencesProvider } from './providers/PreferencesProvider.tsx'
import { ToastProvider } from './providers/ToastProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <PreferencesProvider>
        <CartProvider>
            <App />
        </CartProvider>
      </PreferencesProvider>
    </ToastProvider>
  </StrictMode>,
)
