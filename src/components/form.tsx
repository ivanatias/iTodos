import Input from './input'
import type { InputProps } from './input'
import type { FormEvent } from '../models/types'

interface FormProps {
  inputs: InputProps[]
  onSubmit: (e: FormEvent) => Promise<void>
  submitActionText: string
}

const Form = ({ inputs, onSubmit, submitActionText }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-col w-full gap-5'>
      {inputs.map((input, index) => (
        <Input {...input} key={index} />
      ))}
      <div className='flex justify-center'>
        <button
          className='font-bold w-full max-w-[150px] text-blue-500'
          type='submit'
        >
          {submitActionText}
        </button>
      </div>
    </form>
  )
}

export default Form
