import AddTodoForm from '../components/add-todo-form'
import MainHeader from '../components/main-header'
import { useTodos } from '../hooks/useTodos'
import { useAuth } from '../contexts/auth-context'
import { useNavigate } from 'react-router'

const Main = () => {
  const { user, logoutUser } = useAuth()
  const { todos, isLoading } = useTodos(user?.token as string)
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/login', { replace: true })
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <section className='flex flex-col w-full max-w-md gap-5'>
      <MainHeader name={user?.name as string} handleLogout={handleLogout} />
      <AddTodoForm token={user?.token as string} />
      <div>
        {todos?.map((todo) => (
          <p key={todo.id}>{todo.title}</p>
        ))}
      </div>
    </section>
  )
}

export default Main
