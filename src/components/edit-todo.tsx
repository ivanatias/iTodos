import AddTodoForm from './add-todo-form'
import { useAuth } from '../contexts/auth-context'
import { verifyUserData } from '../utils/helpers'

interface Props {
  toggleEdit: () => void
}

const EditTodo = ({ toggleEdit }: Props) => {
  const { user } = useAuth()
  const verifiedUser = verifyUserData(user)

  return (
    <div className='flex flex-col gap-4'>
      <AddTodoForm token={verifiedUser.token} />
      <div className='flex items-center justify-center gap-3'>
        <button onClick={toggleEdit}>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  )
}

export default EditTodo
