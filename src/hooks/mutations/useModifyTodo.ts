import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { editTodo } from '../../services/edit-todo'
import type { Todo, MutateTodo } from '../../models/types'
import { expiredTokenError } from '../../utils/constants'

export const useModifyTodo = ({ token, id }: MutateTodo) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

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

    onError: (error, _variables, context) => {
      queryClient.setQueryData(['todos', token], context?.previousTodos)

      if (error instanceof Error) {
        error.message === expiredTokenError.message &&
          navigate('/signin', { replace: true })
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries(['todos', token])
    },
  })

  return { modifyTodo }
}
