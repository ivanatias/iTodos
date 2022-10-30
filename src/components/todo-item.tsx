import EditTodo from './edit-todo'
import { useToggle } from '../hooks/useToggle'
import { useMutateTodos } from '../hooks/useMutateTodos'
import { useAuth } from '../contexts/auth-context'
import { CheckIcon, TrashIcon, PencilIcon } from '@heroicons/react/20/solid'
import type { Todo } from '../models/types'
import { verifyUserData } from '../utils/helpers'

interface Props {
  todo: Todo
}

const importantTodoStyles = 'border border-red-400'
const completeTodoStyles = 'line-through bg-slate-400 opacity-70'

const TodoItem = ({ todo }: Props) => {
  const { user } = useAuth()
  const verifiedUser = verifyUserData(user)
  const { value: edit, toggleValue: toggleEdit } = useToggle()
  const { removeTodo, modifyTodo } = useMutateTodos({
    token: verifiedUser.token,
    todoId: todo.id,
  })

  if (edit) {
    return (
      <EditTodo
        toggleEdit={toggleEdit}
        todoTitle={todo.title}
        todoPriority={todo.isPriority}
        todoId={todo.id}
      />
    )
  }

  const deleteTodo = () => {
    removeTodo({
      token: verifiedUser.token,
      id: todo.id,
    })
  }

  const toggleTodoCompleted = () => {
    modifyTodo({
      token: verifiedUser.token,
      title: todo.title,
      isPriority: todo.isPriority,
      isCompleted: !todo.isCompleted,
      id: todo.id,
    })
  }

  return (
    <div
      className={`flex flex-col gap-1 p-2 rounded-sm border ${
        todo.isPriority ? importantTodoStyles : ''
      } ${todo.isCompleted ? completeTodoStyles : 'bg-white'}`}
    >
      <div className='flex items-center justify-end gap-3'>
        <button
          onClick={toggleTodoCompleted}
          className='p-1 font-bold text-white bg-green-500 border-none rounded-md outline-none'
        >
          <CheckIcon className='w-3 h-3' />
        </button>
        <button
          onClick={toggleEdit}
          className='p-1 font-bold text-white bg-yellow-500 border-none rounded-md outline-none'
        >
          <PencilIcon className='w-3 h-3' />
        </button>
        <button
          onClick={deleteTodo}
          className='p-1 font-bold text-white bg-red-500 border-none rounded-md outline-none'
        >
          <TrashIcon className='w-3 h-3' />
        </button>
      </div>
      <p className='text-sm break-words 2xl:text-base'>{todo.title}</p>
    </div>
  )
}

export default TodoItem
