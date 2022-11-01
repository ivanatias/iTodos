import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTodo } from '../../services/delete-todo'
import type { Todo, MutateTodo } from '../../models/types'

export const useRemoveTodo = ({ token, id }: MutateTodo) => {
  const queryClient = useQueryClient()

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

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(['todos', token], context?.previousTodos)
    },

    onSettled: async () => {
      await queryClient.invalidateQueries(['todos', token])
    },
  })

  return { removeTodo }
}
