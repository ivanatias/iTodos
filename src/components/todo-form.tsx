import Input from './input'
import { useField } from '../hooks/useField'
import { useMutateTodos } from '../hooks/useMutateTodos'
import type { FormEvent } from '../models/types'
import toast from 'react-hot-toast'

interface Props {
  token: string
  defaultTextValue?: string
  defaultCheckedValue?: boolean
  submitActionText: 'edit' | 'add'
  todoId?: string
  toggleEdit?: () => void
}

const TodoForm = ({
  token,
  defaultTextValue,
  defaultCheckedValue,
  submitActionText,
  todoId,
  toggleEdit,
}: Props) => {
  const { addNewTodo, modifyTodo } = useMutateTodos({ token, todoId })
  const { reset: resetTodoInput, ...todoText } = useField({
    type: 'text',
    defaultTextValue,
  })
  const { reset: resetTodoPriority, ...todoPriority } = useField({
    type: 'checkbox',
    defaultCheckedValue,
  })

  const createTodo = (e: FormEvent) => {
    e.preventDefault()
    if (todoText.value === '' || /^\s*$/.test(todoText.value)) {
      toast.error('Your todo needs a title!')
      return resetTodoInput()
    }
    addNewTodo({
      title: todoText.value,
      isPriority: todoPriority.checked,
      token,
    })
    resetTodoInput()
    resetTodoPriority()
  }

  const editTodo = (e: FormEvent) => {
    e.preventDefault()
    if (todoText.value === '' || /^\s*$/.test(todoText.value)) {
      return toast.error('You can not leave your todo with an empty title!')
    }
    modifyTodo({
      title: todoText.value,
      isPriority: todoPriority.checked,
      id: todoId as string,
      token,
    })
    if (typeof toggleEdit !== 'undefined') toggleEdit()
  }

  return (
    <form
      className='flex flex-col w-full gap-3'
      onSubmit={submitActionText === 'edit' ? editTodo : createTodo}
    >
      <div className='flex items-center justify-between gap-3'>
        <Input {...todoText} id='todo' placeholder='Write a todo!' />
        <button className='flex-shrink-0 text-sm font-bold text-blue-500 underline border-none outline-none underline-offset-2 2xl:text-base'>
          {submitActionText === 'edit' ? 'Edit todo' : 'Add todo'}
        </button>
      </div>
      <div className='flex items-center gap-2'>
        <Input
          {...todoPriority}
          id='todoCheckbox'
          checked={todoPriority.checked}
        />
        <label className='text-xs' htmlFor='todoCheckbox'>
          Is important?
        </label>
      </div>
    </form>
  )
}

export default TodoForm
