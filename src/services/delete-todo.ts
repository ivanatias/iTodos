import { API_URL } from '../utils/constants'
import type { DeleteTodo } from '../models/types'

export const deleteTodo = async ({ token, id }: DeleteTodo): Promise<void> => {
  const config = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token} `,
    },
  }

  const response = await window.fetch(`${API_URL}/api/todos/${id}`, config)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }
}
