import TodoForm from '../components/todo-form'
import MainHeader from '../components/main-header'
import TodoList from '../components/todo-list'
import Spinner from '../components/spinner'
import { useTodos } from '../hooks/useTodos'
import { useAuth } from '../contexts/auth-context'
import { useNavigate } from 'react-router'
import { verifyUserData } from '../utils/helpers'

const Main = () => {
  const { user, logoutUser } = useAuth()
  const verifiedUser = verifyUserData(user)
  const { todos, isLoading } = useTodos(verifiedUser.token)
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/login', { replace: true })
  }

  if (isLoading) return <Spinner />

  return (
    <section className='flex flex-col w-full max-w-md gap-5'>
      <MainHeader name={verifiedUser.name} handleLogout={handleLogout} />
      <TodoForm token={verifiedUser.token} submitActionText='add' />
      <TodoList todos={todos} />
    </section>
  )
}

export default Main
