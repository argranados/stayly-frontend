import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await authService.getCurrentUser()
      if (currentUser) {
        const sessionData = await authService.getSession()
        setUser(currentUser)
        setSession(sessionData)
      }
      setLoading(false)
    }
    checkUser()
  }, [])

  const login = async (email, password) => {
    await authService.login(email, password)
    const currentUser = await authService.getCurrentUser()
    const sessionData = await authService.getSession()
    setUser(currentUser)
    setSession(sessionData)
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
    setSession(null)
  }

  const register = async (email, password, name) => {
    return await authService.register(email, password, name)
  }

  const confirmEmail = async (email, code) => {
    await authService.confirmEmail(email, code)
  }

  const isAdmin = session?.groups?.includes('admins') ?? false

  return (
    <AuthContext.Provider value={{ user, session, loading, login, logout, register, confirmEmail, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}