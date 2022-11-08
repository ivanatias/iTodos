import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { addTodo } from '../../services/add-todo'
import type { Todo } from '../../models/types'
import { expiredTokenError } from '../../utils/constants'

export const useAddTodo = (token: string) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: addNewTodo } = useMutation(addTodo, {
    onMutate: async ({ title, isPriority }) => {
      await queryClient.cancelQueries(['todos', token])

      const newTodo = {
        title,
        isPriority,
        id: `${Math.floor(Math.random() * 1000)}`, // assign random id on optimistic update to avoid key warning on console, will be replaced by id coming from backend on onSettled callback revalidation.
      } as Todo // Asserting newTodo as Todo type, since "id", "date", "user" and "isCompleted" fields are generated on the backend and not available on onMutate callback params.

      const previousTodos = queryClient.getQueryData<Todo[] | undefined>([
        'todos',
        token,
      ])

      queryClient.setQueryData<Todo[] | undefined>(
        ['todos', token],
        (oldTodos) => {
          return oldTodos !== undefined ? [...oldTodos, newTodo] : undefined
        }
      )

      return { previousTodos }
    },

    onError: (error, _variables, context) => {
      queryClient.setQueryData<Todo[] | undefined>(
        ['todos', token],
        context?.previousTodos
      )

      if (error instanceof Error) {
        error.message === expiredTokenError.message &&
          navigate('/signin', { replace: true })
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries(['todos', token])
    },
  })

  return { addNewTodo }
}
