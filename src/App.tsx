import AuthProvider from './contexts/auth-context'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Main from './pages/main'
import Layout from './components/layout'
import ProtectedRoute from './components/protected-route'
import ErrorBoundary from './components/error-boundary'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Main />} />
            </Route>
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </AuthProvider>
  )
}

export default App
