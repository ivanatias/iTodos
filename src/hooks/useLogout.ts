import { useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/auth-context'

export const useLogout = () => {
  const { user, logoutUser } = useAuth()

  const handleLogout = useCallback(() => {
    if (user !== null) {
      logoutUser()
      console.log('User logged out!')
    }
  }, [user, logoutUser])

  useEffect(() => {
    handleLogout()
  }, [handleLogout])
}
