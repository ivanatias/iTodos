import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTodo } from '../services/add-todo'
import { editTodo } from '../services/edit-todo'
import type { Todo } from '../models/types'

interface UseMutateTodos {
  token: string
  todoId?: string
}

export const useMutateTodos = ({ token, todoId }: UseMutateTodos) => {
  const queryClient = useQueryClient()

  const { mutate: addNewTodo } = useMutation(addTodo, {
    onSuccess: (newTodo) => {
      const oldQueryData = queryClient.getQueryData(['todos', token]) as Todo[]
      queryClient.setQueryData(['todos', token], [...oldQueryData, newTodo])
    },
  })

  const { mutate: modifyTodo } = useMutation(editTodo, {
    onMutate: async ({ title, isPriority, isCompleted }) => {
      await queryClient.cancelQueries(['todos', token])

      const oldTodos = queryClient.getQueryData(['todos', token]) as Todo[]

      queryClient.setQueryData(
        ['todos', token],
        oldTodos.map((oldTodo) => {
          if (oldTodo.id === todoId) {
            return {
              ...oldTodo,
              title,
              isPriority,
              isCompleted,
            }
          }
          return oldTodo
        })
      )

      return { oldTodos }
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(['todos', token], context?.oldTodos)
    },

    onSettled: async () => {
      await queryClient.invalidateQueries(['todos', token])
    },
  })

  return { addNewTodo, modifyTodo }
}
