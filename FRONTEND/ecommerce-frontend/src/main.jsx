import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/authProvider.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
