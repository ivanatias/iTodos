import { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/input'
import { login } from '../services/login-service'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ username, password })
    const user = await login({ username, password })
  }

  return (
    <section className='w-full max-w-sm h-screen flex flex-col justify-center gap-5'>
      <h1 className='font-bold text-3xl lg:text-5xl text-slate-500 text-center'>
        Sign in
      </h1>
      <div className='p-3 bg-gray-100 shadow-md rounded-sm'>
        <form onSubmit={handleLogin} className='w-full flex flex-col gap-5'>
          <Input
            value={username}
            type='text'
            id='username'
            name='username'
            placeholder='johndoe'
            onChange={handleUsernameChange}
          />
          <Input
            value={password}
            type='password'
            id='password'
            name='password'
            placeholder='Enter password'
            onChange={handlePasswordChange}
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
            Don&apos;t have an account yet?{' '}
            <Link to='' className='text-blue-500 underline underline-offset-1'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
