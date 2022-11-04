import { useEffect } from 'react'
import { useAuth } from '../contexts/auth-context'

export const useLogout = () => {
  const { user, logoutUser } = useAuth()

  useEffect(() => {
    if (user !== null) {
      logoutUser()
      console.log('User logged out')
    }
  }, [user, logoutUser])
}
