import AddTodoForm from '../components/add-todo-form'
import MainHeader from '../components/main-header'
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

  if (isLoading) return <p>Loading...</p>

  return (
    <section className='flex flex-col w-full max-w-md gap-5'>
      <MainHeader name={verifiedUser.name} handleLogout={handleLogout} />
      <AddTodoForm token={verifiedUser.token} />
      <div>
        {todos?.map((todo) => (
          <p key={todo.id}>{todo.title}</p>
        ))}
      </div>
    </section>
  )
}

export default Main
