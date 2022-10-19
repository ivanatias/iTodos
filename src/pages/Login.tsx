import Input from '../components/input'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'
import { useAuth } from '../contexts/auth-context'
import type { FormEvent } from '../models/types'

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
    <section className='flex flex-col justify-center w-full h-screen max-w-sm gap-5'>
      <h1 className='text-3xl font-bold text-center lg:text-5xl text-slate-500'>
        Sign in
      </h1>
      <div className='p-3 bg-gray-100 rounded-sm shadow-md'>
        <form onSubmit={handleLogin} className='flex flex-col w-full gap-5'>
          <Input
            {...username}
            id='username'
            name='username'
            placeholder='johndoe'
          />
          <Input
            {...password}
            id='password'
            name='password'
            placeholder='Enter password'
          />
          <div className='flex justify-center'>
            <button
              className='font-bold w-full max-w-[150px] text-blue-500'
              type='submit'
            >
              Login
            </button>
          </div>
        </form>
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
