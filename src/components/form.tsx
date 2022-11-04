import Input from './input'
import PlainButton from './plain-button'
import type { InputProps } from './input'
import type { FormEvent } from '../models/types'

interface FormProps {
  inputs: InputProps[]
  onSubmit: (e: FormEvent) => Promise<void> | void
  submitActionText: string
}

const Form = ({ inputs, onSubmit, submitActionText }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-col w-full gap-3'>
      {inputs.map((input, index) => (
        <Input {...input} key={index} />
      ))}
      <div className='flex justify-center'>
        <PlainButton variant='primary' type='submit' size='big'>
          {submitActionText}
        </PlainButton>
      </div>
    </form>
  )
}

export default Form
