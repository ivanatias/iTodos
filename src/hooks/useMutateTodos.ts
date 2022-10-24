import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTodo } from '../services/add-todo'
import type { Todo } from '../models/types'

export const useMutateTodos = (token: string) => {
  const queryClient = useQueryClient()
  const { mutate: addNewTodo } = useMutation(addTodo, {
    onSuccess: (newTodo) => {
      const oldQueryData = queryClient.getQueryData(['todos', token]) as Todo[]
      queryClient.setQueryData(['todos', token], [...oldQueryData, newTodo])
    },
  })

  return { addNewTodo }
}
