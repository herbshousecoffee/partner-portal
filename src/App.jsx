import { useState, useEffect } from 'react'
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

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return <Portal onLogout={handleLogout} />
}

export default App
