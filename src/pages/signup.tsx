import Form from '../components/form'
import { Link, useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'
import { signUp } from '../services/sign-up'
import type { FormEvent } from '../models/types'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-hot-toast'

const Signup = () => {
  const { reset: resetName, ...name } = useField({ type: 'text' })
  const { reset: resetUsername, ...username } = useField({ type: 'text' })
  const { reset: resetPassword, ...password } = useField({ type: 'password' })
  const navigate = useNavigate()

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault()
    console.log(username.value, name.value, password.value)
    try {
      await signUp({
        name: name.value,
        username: username.value,
        password: password.value,
      })
      toast.success('User created, you can now log in!')
      navigate('/login', { replace: true })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
        console.error(error)
      }
    }
  }

  return (
    <section className='flex flex-col w-full max-w-sm gap-5'>
      <h1 className='text-3xl font-bold text-center lg:text-5xl text-slate-500'>
        Sign up
      </h1>
      <div className='flex flex-col gap-3 p-3 bg-gray-100 rounded-sm shadow-md'>
        <Form
          onSubmit={handleSignup}
          submitActionText='Sign up'
          inputs={[
            {
              ...name,
              placeholder: 'John Doe',
              id: 'name',
              name: 'name',
            },
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
        <div className='flex justify-center text-gray-600'>
          <Link to='/login' className='flex items-center justify-center w-fit'>
            <ArrowLeftIcon className='w-4 h-4 mr-2' />
            Back
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Signup
