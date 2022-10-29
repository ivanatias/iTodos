import { API_URL } from '../utils/constants'
import type { Todo, EditTodo } from '../models/types'

export const editTodo = async ({
  title,
  isPriority,
  token,
  id,
}: EditTodo): Promise<Todo | undefined> => {
  const config = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token} `,
    },
    body: JSON.stringify({ title, isPriority }),
  }

  const response = await window.fetch(`${API_URL}/api/todos/${id}`, config)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }

  const modifiedTodo = await response.json()
  return modifiedTodo
}
