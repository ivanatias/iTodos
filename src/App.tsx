import AuthProvider from './contexts/auth-context'
import Login from './pages/login'
import Signup from './pages/signup'
import Main from './pages/main'
import Layout from './components/layout'
import ProtectedRoute from './components/protected-route'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Main />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
