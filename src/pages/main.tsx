import Input from '../components/input'
import { useField } from '../hooks/useField'
import { useTodos } from '../hooks/useTodos'
import { useMutateTodos } from '../hooks/useMutateTodos'
import { useAuth } from '../contexts/auth-context'
import { useNavigate } from 'react-router'
import type { FormEvent } from '../models/types'

const Main = () => {
  const { user, logoutUser } = useAuth()
  const { todos, isLoading } = useTodos(user?.token as string)
  const { addNewTodo } = useMutateTodos(user?.token as string)
  const { reset: resetTodoInput, ...todoText } = useField({ type: 'text' })
  const { reset: resetTodoPriority, ...todoPriority } = useField({
    type: 'checkbox',
  })
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/login', { replace: true })
  }

  const createTodo = (e: FormEvent) => {
    e.preventDefault()
    addNewTodo({
      title: todoText.value,
      isPriority: todoPriority.checked,
      token: user?.token as string,
    })
    resetTodoInput()
    resetTodoPriority()
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <section className='flex flex-col w-full max-w-md gap-5'>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <h1 className='text-xl font-bold 2xl:text-2xl'>Hello, {user?.name}</h1>
        <button
          onClick={handleLogout}
          className='text-sm font-bold text-red-500 underline border-none outline-none underline-offset-2 2xl:text-base'
        >
          Logout
        </button>
      </div>
      <div className='flex flex-col gap-3'>
        <form onSubmit={createTodo}>
          <div className='flex items-center justify-between gap-3'>
            <Input {...todoText} id='todo' placeholder='Write a todo!' />
            <button className='flex-shrink-0 text-sm font-bold text-blue-500 underline border-none outline-none underline-offset-2 2xl:text-base'>
              Add todo
            </button>
          </div>
        </form>
        <div className='flex items-center gap-2'>
          <Input
            {...todoPriority}
            id='todoCheckbox'
            checked={todoPriority.checked}
          />
          <label className='text-xs' htmlFor='todoCheckbox'>
            Important?
          </label>
        </div>
        <div>
          {todos?.map((todo) => (
            <p key={todo.id}>{todo.title}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Main
