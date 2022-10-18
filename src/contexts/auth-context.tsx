import { useState, useEffect, useContext, createContext } from 'react'
import { API_URL } from '../utils/constants'

interface Credentials {
  username: string
  password: string
}

interface AuthResponse {
  username: string
  name: string
  token: string
}

interface AuthContextType {
  user: AuthResponse | null
  isAuthorizing: boolean
  loginUser: ({ username, password }: Credentials) => Promise<void>
  logoutUser: () => void
}
interface Props {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthResponse | null>(null)
  const [isAuthorizing, setIsAuthorizing] = useState(true)

  const loginUser = async ({ username, password }: Credentials) => {
    const config = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }

    const response = await window.fetch(`${API_URL}/api/login`, config)
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText)
    }

    const userSession = (await response.json()) as AuthResponse
    setUser(userSession)
    window.localStorage.setItem('user', JSON.stringify(userSession))
  }

  const logoutUser = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  useEffect(() => {
    const localUser = window.localStorage.getItem('user')
    const userSession = localUser !== null && JSON.parse(localUser)
    if (userSession !== undefined) {
      setUser(userSession)
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
