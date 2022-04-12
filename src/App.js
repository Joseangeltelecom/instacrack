import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { AppRouter } from './router/AppRouter'
import './styles/app.css'
import './styles/index.css'

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  )
}

export default App
