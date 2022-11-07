import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { deleteTodo } from '../../services/delete-todo'
import type { Todo, MutateTodo } from '../../models/types'
import { expiredTokenError } from '../../utils/constants'

export const useRemoveTodo = ({ token, id }: MutateTodo) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: removeTodo } = useMutation(deleteTodo, {
    onMutate: async () => {
      await queryClient.cancelQueries(['todos', token])

      const previousTodos = queryClient.getQueryData<Todo[] | undefined>([
        'todos',
        token,
      ])

      if (previousTodos === undefined) return

      queryClient.setQueryData(
        ['todos', token],
        previousTodos.filter((prevTodo) => prevTodo.id !== id)
      )

      return { previousTodos }
    },

    onError: (error, _variables, context) => {
      queryClient.setQueryData(['todos', token], context?.previousTodos)

      if (error instanceof Error) {
        error.message === expiredTokenError.message &&
          navigate('/login', { replace: true })
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries(['todos', token])
    },
  })

  return { removeTodo }
}
