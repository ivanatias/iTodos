import Form from '../components/form'
import { Link, useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'
import { useAuth } from '../contexts/auth-context'
import type { FormEvent } from '../models/types'
import { toast } from 'react-hot-toast'

const Login = () => {
  const { reset: resetUsername, ...username } = useField({ type: 'text' })
  const { reset: resetPassword, ...password } = useField({ type: 'password' })
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await loginUser({ username: username.value, password: password.value })
      navigate('/', { replace: true })
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
        console.error(err)
      }
      resetUsername()
      resetPassword()
    }
  }

  return (
    <section className='flex flex-col w-full max-w-sm gap-5'>
      <h1 className='text-3xl font-bold text-center lg:text-5xl text-slate-500'>
        Sign in
      </h1>
      <div className='p-3 bg-gray-100 rounded-sm shadow-md'>
        <Form
          onSubmit={handleLogin}
          submitActionText='Login'
          inputs={[
            {
              ...username,
              placeholder: 'johndoe',
              id: 'username',
              name: 'username',
            },
            {
              ...password,
              placeholder: 'Enter a password',
              id: 'password',
              name: 'password',
            },
          ]}
        />
        <div className='mt-4'>
          <p className='text-xs '>
            Don&apos;t have an account yet?
            <Link
              to=''
              className='ml-1 text-blue-500 underline underline-offset-1'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
