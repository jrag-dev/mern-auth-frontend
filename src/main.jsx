import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

import AuthState from './context/auth/AuthState'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AuthState>
        <App />
      </AuthState>
    </HashRouter>
  </React.StrictMode>
)
