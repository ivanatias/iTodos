import { API_URL } from '../utils/constants'
import type { Todo, AddTodo } from '../models/types'

export const addTodo = async ({
  token,
  title,
  isPriority,
}: AddTodo): Promise<Todo> => {
  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token} `,
    },
    body: JSON.stringify({ title, isPriority }),
  }

  const response = await window.fetch(`${API_URL}/api/todos`, config)
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }

  const todo = await response.json()
  return todo
}
