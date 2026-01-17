import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import LoginScreen from './components/LoginScreen'
import Portal from './components/Portal'
import { checkAuth, login, logout } from './utils/auth'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check auth on mount
    setIsAuthenticated(checkAuth())
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
