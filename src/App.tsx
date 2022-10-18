import AuthProvider from './contexts/auth-context'
import Login from './pages/login'
import Layout from './components/layout'

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Login />
      </Layout>
    </AuthProvider>
  )
}

export default App
