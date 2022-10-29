export type FormEvent = React.FormEvent<HTMLFormElement>
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
export type InputType = 'text' | 'password' | 'checkbox'

export interface Todo {
  isCompleted: boolean
  date: Date
  title: string
  isPriority: boolean
  user: string
  id: string
}

export interface TodoMutationData {
  token: string
  title: string
  isPriority: boolean
  isCompleted: boolean
  id: string
}

export type AddTodo = Omit<TodoMutationData, 'id' | 'isCompleted'>

export type EditTodo = Omit<TodoMutationData, 'isCompleted'>

export type DeleteTodo = Pick<TodoMutationData, 'token' | 'id'>

export interface Credentials {
  username: string
  password: string
}

export interface AuthResponse {
  username: string
  name: string
  token: string
}
