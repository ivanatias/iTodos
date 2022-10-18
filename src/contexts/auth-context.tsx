import { useState, useEffect, useContext, createContext } from 'react'
import type { AuthResponse, Credentials } from '../services/login-service'
import { login } from '../services/login-service'

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthContextType {
  user: AuthResponse | undefined
  isAuthorizing: boolean
  loginUser: ({ username, password }: Credentials) => Promise<void>
  logoutUser: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthResponse | undefined>(undefined)
  const [isAuthorizing, setIsAuthorizing] = useState(true)

  const loginUser = async ({ username, password }: Credentials) => {
    const userSession = await login({ username, password })
    setUser(userSession)
    setIsAuthorizing(false)
    window.localStorage.setItem('user', JSON.stringify(userSession))
  }

  const logoutUser = () => {
    window.localStorage.removeItem('user')
    setUser(undefined)
  }

  useEffect(() => {
    const localUser = window.localStorage.getItem('user')
    const userInfo = localUser !== null && JSON.parse(localUser)
    if (userInfo !== undefined) {
      setUser(userInfo)
      setIsAuthorizing(false)
    }
    setIsAuthorizing(false)
  }, [])

  const contextValues = {
    user,
    isAuthorizing,
    loginUser,
    logoutUser,
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined)
    throw new Error('useAuth must be used within a child of AuthProvider')

  return context
}

export default AuthProvider
