import Form from '../components/form'
import GradientTitle from '../components/gradient-title'
import { Link, useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'
import { useLogout } from '../hooks/useLogout'
import { signUp } from '../services/sign-up'
import type { FormEvent } from '../models/types'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-hot-toast'

const Signup = () => {
  useLogout()
  const { reset: resetName, ...name } = useField({ type: 'text' })
  const { reset: resetUsername, ...username } = useField({ type: 'text' })
  const { reset: resetPassword, ...password } = useField({ type: 'password' })
  const navigate = useNavigate()

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault()
    if (username.value === '' || password.value === '' || name.value === '') {
      toast.error('All fields are required!')
      return
    }
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
      resetName()
      resetUsername()
      resetPassword()
    }
  }

  return (
    <section className='flex flex-col w-full max-w-sm gap-5'>
      <GradientTitle>Sign up</GradientTitle>
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
        <Link
          to='/login'
          className='flex items-center justify-center text-sm text-gray-600 w-fit'
        >
          <ArrowLeftIcon className='w-4 h-4 mr-1' />
          Back
        </Link>
      </div>
    </section>
  )
}

export default Signup
