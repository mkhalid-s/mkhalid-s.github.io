import React from 'react'
import ReactDOM from 'react-dom/client'
// self-hosted fonts, trimmed to latin-only (see src/fonts.css)
import './fonts.css'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
