import type { Todo } from '../models/types'
import { API_URL } from '../utils/constants'

export const getUserTodos = async (
  token: string
): Promise<Todo[] | undefined> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  }
  const response = await fetch(`${API_URL}/api/todos/usertodos`, config)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }

  const todos = (await response.json()) as Todo[]
  return todos
}
