import EditTodo from './edit-todo'
import TodoActionButton from './todo-action-btn'
import { useToggle } from '../hooks/useToggle'
import { useRemoveTodo } from '../hooks/mutations/useRemoveTodo'
import { useModifyTodo } from '../hooks/mutations/useModifyTodo'
import { useAuth } from '../contexts/auth-context'
import { CheckIcon, TrashIcon, PencilIcon } from '@heroicons/react/20/solid'
import type { Todo } from '../models/types'
import { verifyUserData } from '../utils/helpers'

interface Props {
  todo: Todo
}

const importantTodoStyles = 'border border-red-400'
const completeTodoStyles = 'line-through bg-slate-400'

const TodoItem = ({ todo }: Props) => {
  const { user } = useAuth()
  const verifiedUser = verifyUserData(user)
  const { value: edit, toggleValue: toggleEdit } = useToggle()
  const { removeTodo } = useRemoveTodo({
    token: verifiedUser.token,
    id: todo.id,
  })
  const { modifyTodo } = useModifyTodo({
    token: verifiedUser.token,
    id: todo.id,
  })

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

  return (
    <div
      className={`flex flex-col gap-1 p-2 rounded-sm border ${
        todo.isPriority ? importantTodoStyles : ''
      } ${todo.isCompleted ? completeTodoStyles : 'bg-white'}`}
    >
      <div className='flex items-center justify-end gap-3'>
        <TodoActionButton
          Icon={CheckIcon}
          actionFunction={toggleTodoCompleted}
          backgroundColor='bg-green-500'
        />
        <TodoActionButton
          Icon={PencilIcon}
          actionFunction={toggleEdit}
          backgroundColor='bg-yellow-500'
          disabled={todo.isCompleted}
        />
        <TodoActionButton
          Icon={TrashIcon}
          actionFunction={deleteTodo}
          backgroundColor='bg-red-500'
        />
      </div>
      <p className='text-sm break-words 2xl:text-base'>{todo.title}</p>
    </div>
  )
}

export default TodoItem
