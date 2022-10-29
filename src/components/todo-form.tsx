import Input from './input'
import { useField } from '../hooks/useField'
import { useMutateTodos } from '../hooks/useMutateTodos'
import type { FormEvent } from '../models/types'

interface Props {
  token: string
  defaultTextValue?: string
  defaultCheckedValue?: boolean
  submitActionText: string
}

const TodoForm = ({
  token,
  defaultTextValue,
  defaultCheckedValue,
  submitActionText,
}: Props) => {
  const { addNewTodo } = useMutateTodos(token)
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
    addNewTodo({
      title: todoText.value,
      isPriority: todoPriority.checked,
      token,
    })
    resetTodoInput()
    resetTodoPriority()
  }

  return (
    <form className='flex flex-col w-full gap-3' onSubmit={createTodo}>
      <div className='flex items-center justify-between gap-3'>
        <Input {...todoText} id='todo' placeholder='Write a todo!' />
        <button className='flex-shrink-0 text-sm font-bold text-blue-500 underline border-none outline-none underline-offset-2 2xl:text-base'>
          {submitActionText}
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
