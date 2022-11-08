import FirstLoadScreen from './first-load-screen'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth-context'

const ProtectedRoute = () => {
  const { user, isAuthorizing } = useAuth()

  if (isAuthorizing) return <FirstLoadScreen />

  if (user === null) return <Navigate to='/signin' replace={true} />

  return <Outlet />
}

export default ProtectedRoute
