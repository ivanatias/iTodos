export interface Credentials {
  username: string
  password: string
}

export interface AuthResponse {
  username: string
  name: string
  token: string
}

const API_URL = process.env.REACT_APP_API_BASEURL as string

export const login = async ({
  username,
  password,
}: Credentials): Promise<AuthResponse | undefined> => {
  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  }

  try {
    const response = await window.fetch(`${API_URL}/api/login`, config)
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText)
    }
    const resJSON = await response.json()
    return resJSON
  } catch (err) {
    if (err instanceof Error) {
      console.error(err)
    }
  }
}
