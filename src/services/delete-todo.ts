import { API_URL } from '../utils/constants'
import type { MutateTodo } from '../models/types'

export const deleteTodo = async ({ token, id }: MutateTodo): Promise<void> => {
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token} `,
    },
  }

  const response = await window.fetch(`${API_URL}/api/todos/${id}`, config)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }
}
