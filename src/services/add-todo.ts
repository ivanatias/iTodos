import { API_URL } from '../utils/constants'
import type { Todo } from '../models/types'

interface AddTodo {
  token: string
  title: string
  isPriority: boolean
}

export const addTodo = async ({
  token,
  title,
  isPriority,
}: AddTodo): Promise<Todo | undefined> => {
  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token} `,
    },
    body: JSON.stringify({ title, isPriority }),
  }

  const response = await fetch(`${API_URL}/api/todos`, config)
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }

  const todo = (await response.json()) as Todo
  return todo
}
