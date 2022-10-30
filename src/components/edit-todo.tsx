import TodoForm from './todo-form'
import { useAuth } from '../contexts/auth-context'
import { verifyUserData } from '../utils/helpers'

interface Props {
  todoTitle: string
  todoPriority: boolean
  todoId: string
  toggleEdit: () => void
}

const EditTodo = ({ todoTitle, todoPriority, todoId, toggleEdit }: Props) => {
  const { user } = useAuth()
  const verifiedUser = verifyUserData(user)

  return (
    <div className='flex flex-col gap-4'>
      <TodoForm
        token={verifiedUser.token}
        defaultTextValue={todoTitle}
        defaultCheckedValue={todoPriority}
        submitActionText='edit'
        todoId={todoId}
        toggleEdit={toggleEdit}
      />
      <div className='flex items-center justify-center gap-3 text-xs 2xl:text-sm'>
        <button className='text-gray-600' onClick={toggleEdit}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default EditTodo
