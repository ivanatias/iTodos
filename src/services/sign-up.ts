import { API_URL } from '../utils/constants'
import type { Credentials } from '../models/types'

interface SignUp extends Credentials {
  name: string
}

export const signUp = async ({
  name,
  username,
  password,
}: SignUp): Promise<void> => {
  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ name, username, password }),
  }

  const response = await window.fetch(`${API_URL}/api/users`, config)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }
}
