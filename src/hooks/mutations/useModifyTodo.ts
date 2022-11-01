import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editTodo } from '../../services/edit-todo'
import type { Todo, MutateTodo } from '../../models/types'

export const useModifyTodo = ({ token, id }: MutateTodo) => {
  const queryClient = useQueryClient()

  const { mutate: modifyTodo } = useMutation(editTodo, {
    onMutate: async ({ title, isPriority, isCompleted }) => {
      await queryClient.cancelQueries(['todos', token])

      const previousTodos = queryClient.getQueryData<Todo[] | undefined>([
        'todos',
        token,
      ])

      if (previousTodos === undefined) return

      queryClient.setQueryData(
        ['todos', token],
        previousTodos.map((prevTodo) => {
          if (prevTodo.id === id) {
            return {
              ...prevTodo,
              title,
              isPriority,
              isCompleted,
            }
          }
          return prevTodo
        })
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

  return { modifyTodo }
}
