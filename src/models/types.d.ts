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

export interface Credentials {
  username: string
  password: string
}

export interface AuthResponse {
  username: string
  name: string
  token: string
}
