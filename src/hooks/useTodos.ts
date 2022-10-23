import { useQuery } from '@tanstack/react-query'
import { getUserTodos } from '../services/get-user-todos'

export const useTodos = (token: string) => {
  const { data: todos, isLoading } = useQuery(
    ['todos', token],
    async () => await getUserTodos(token)
  )

  return { todos, isLoading }
}
