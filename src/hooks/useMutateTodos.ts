import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTodo } from '../services/add-todo'
import { editTodo } from '../services/edit-todo'
import { deleteTodo } from '../services/delete-todo'
import type { Todo } from '../models/types'

interface UseMutateTodos {
  token: string
  todoId?: string
}

export const useMutateTodos = ({ token, todoId }: UseMutateTodos) => {
  const queryClient = useQueryClient()

  const { mutate: addNewTodo } = useMutation(addTodo, {
    onMutate: async ({ title, isPriority }) => {
      await queryClient.cancelQueries(['todos', token])

      const newTodo = {
        title,
        isPriority,
        id: `${Math.floor(Math.random() * 1000)}`, // assign random id on optimistic update to avoid key warning on console, will be replaced by id coming from backend on OnSettled callback revalidation.
      } as Todo // Asserting newTodo as Todo type, since "id", "date" and "isCompleted" fields are generated on the backend and not available on onMutate callback params.

      const previousTodos: Todo[] | undefined = queryClient.getQueryData([
        'todos',
        token,
      ])

      queryClient.setQueryData<Todo[] | undefined>(
        ['todos', token],
        (oldTodos) => {
          if (oldTodos !== undefined) return [...oldTodos, newTodo]
        }
      )

      return { previousTodos }
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData<Todo[] | undefined>(
        ['todos', token],
        context?.previousTodos
      )
    },

    onSettled: async () => {
      await queryClient.invalidateQueries(['todos', token])
    },
  })

  const { mutate: modifyTodo } = useMutation(editTodo, {
    onMutate: async ({ title, isPriority, isCompleted }) => {
      await queryClient.cancelQueries(['todos', token])

      const previousTodos = queryClient.getQueryData(['todos', token]) as Todo[] // Since a todo is being modified, it's safe to assume that previousTodos is not undefined.

      queryClient.setQueryData(
        ['todos', token],
        previousTodos.map((prevTodo) => {
          if (prevTodo.id === todoId) {
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

  const { mutate: removeTodo } = useMutation(deleteTodo, {
    onMutate: async () => {
      await queryClient.cancelQueries(['todos', token])

      const previousTodos = queryClient.getQueryData(['todos', token]) as Todo[] // Since a todo is being deleted, it's safe to assume that previousTodos is not undefined.

      queryClient.setQueryData<Todo[] | undefined>(
        ['todos', token],
        previousTodos.filter((prevTodo) => prevTodo.id !== todoId)
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

  return { addNewTodo, modifyTodo, removeTodo }
}
