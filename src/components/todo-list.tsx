import TodoItem from './todo-item'
import type { Todo } from '../models/types'

interface Props {
  todos: Todo[] | undefined
}

const TodoList = ({ todos }: Props) => {
  return (
    <div className='max-h-[400px] overflow-y-auto p-4 bg-gray-100 flex flex-col gap-4 rounded-md'>
      {todos?.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  )
}

export default TodoList
