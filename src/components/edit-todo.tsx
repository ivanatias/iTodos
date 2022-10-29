import TodoForm from './todo-form'
import { useAuth } from '../contexts/auth-context'
import { verifyUserData } from '../utils/helpers'

interface Props {
  todoTitle: string
  todoPriority: boolean
  toggleEdit: () => void
}

const EditTodo = ({ todoTitle, todoPriority, toggleEdit }: Props) => {
  const { user } = useAuth()
  const verifiedUser = verifyUserData(user)

  return (
    <div className='flex flex-col gap-4'>
      <TodoForm
        token={verifiedUser.token}
        defaultTextValue={todoTitle}
        defaultCheckedValue={todoPriority}
        submitActionText='Edit todo'
      />
      <div className='flex items-center justify-center gap-3'>
        <button onClick={toggleEdit}>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  )
}

export default EditTodo
