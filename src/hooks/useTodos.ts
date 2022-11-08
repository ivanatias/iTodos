import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getUserTodos } from '../services/get-user-todos'
import { expiredTokenError } from '../utils/constants'

export const useTodos = (token: string) => {
  const navigate = useNavigate()
  const { data: todos, isLoading } = useQuery(
    ['todos', token],
    async () => await getUserTodos(token),
    {
      onError: (error) => {
        if (error instanceof Error) {
          error.message === expiredTokenError.message &&
            navigate('/signin', { replace: true })
        }
      },
    }
  )

  return { todos, isLoading }
}
