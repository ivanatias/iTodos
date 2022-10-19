import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth-context'

const ProtectedRoute = () => {
  const { user, isAuthorizing } = useAuth()

  if (isAuthorizing) return <p>Loading...</p>

  if (user === null) return <Navigate to='/login' replace={true} />

  return <Outlet />
}

export default ProtectedRoute
