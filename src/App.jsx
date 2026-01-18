import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import LoginScreen from './components/LoginScreen'
import Portal from './components/Portal'
import { checkAuth, login, logout } from './utils/auth'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Validate session and force logout if invalid
  const validateSession = () => {
    const isValid = checkAuth()
    if (!isValid && isAuthenticated) {
      // Session expired - force logout and clear hash
      setIsAuthenticated(false)
      window.location.hash = ''
    }
    return isValid
  }

  useEffect(() => {
    // Check auth on mount
    const isValid = checkAuth()
    setIsAuthenticated(isValid)

    // If not authenticated, ensure we're at root (clear any hash)
    if (!isValid && window.location.hash) {
      window.location.hash = ''
    }
  }, [])

  // Check session on every hash change (route navigation)
  useEffect(() => {
    const handleHashChange = () => {
      if (!checkAuth()) {
        setIsAuthenticated(false)
        window.location.hash = ''
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Periodic session validation (every 60 seconds)
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(() => {
      validateSession()
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [isAuthenticated])

  // Check session when tab regains focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (!checkAuth()) {
          setIsAuthenticated(false)
          window.location.hash = ''
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  const handleLogin = (passcode) => {
    const success = login(passcode)
    if (success) {
      setIsAuthenticated(true)
    }
    return success
  }

  const handleLogout = () => {
    logout()
    setIsAuthenticated(false)
  }

  return (
    <ThemeProvider defaultTheme="dark">
      {!isAuthenticated ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <Portal onLogout={handleLogout} />
      )}
    </ThemeProvider>
  )
}

export default App
