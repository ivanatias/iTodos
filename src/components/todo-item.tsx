import EditTodo from './edit-todo'
import { useToggle } from '../hooks/useToggle'
import { CheckIcon, TrashIcon, PencilIcon } from '@heroicons/react/20/solid'
import type { Todo } from '../models/types'

interface Props {
  todo: Todo
}

const TodoItem = ({ todo }: Props) => {
  const { value: edit, toggleValue: toggleEdit } = useToggle()

  if (edit) {
    return (
      <EditTodo
        toggleEdit={toggleEdit}
        todoTitle={todo.title}
        todoPriority={todo.isPriority}
      />
    )
  }

  return (
    <div className='flex flex-col gap-1 p-2 bg-white rounded-sm'>
      <div className='flex items-center justify-end gap-3'>
        <button className='p-1 font-bold text-white bg-green-500 border-none rounded-md outline-none'>
          <CheckIcon className='w-3 h-3' />
        </button>
        <button
          onClick={toggleEdit}
          className='p-1 font-bold text-white bg-yellow-500 border-none rounded-md outline-none'
        >
          <PencilIcon className='w-3 h-3' />
        </button>
        <button className='p-1 font-bold text-white bg-red-500 border-none rounded-md outline-none'>
          <TrashIcon className='w-3 h-3' />
        </button>
      </div>
      <p className='text-sm 2xl:text-base'>{todo.title}</p>
    </div>
  )
}

export default TodoItem
