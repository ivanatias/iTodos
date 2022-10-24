import type { AuthResponse } from '../models/types'

const capitalize = (str: string) => {
  const lowerCase = str.toLowerCase()
  return `${str.charAt(0).toUpperCase()}${lowerCase.slice(1)}`
}

const verifyUserData = (userData: AuthResponse | null) => {
  if (userData === null)
    throw new Error('User data should be available at this point but it is not')
  return userData
}

export { capitalize, verifyUserData }
