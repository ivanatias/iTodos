import Input from './input'
import PlainButton from './plain-button'
import type { InputProps } from './input'
import type { FormEvent } from '../models/types'

interface FormProps {
  inputs: InputProps[]
  onSubmit: (e: FormEvent) => Promise<void> | void
  submitActionText: string
  submitDisabled: boolean
}

const Form = ({
  inputs,
  onSubmit,
  submitActionText,
  submitDisabled,
}: FormProps) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-col w-full gap-3'>
      {inputs.map((input, index) => (
        <Input {...input} key={index} />
      ))}
      <div className='flex justify-center'>
        <PlainButton
          variant='primary'
          type='submit'
          size='big'
          disabled={submitDisabled}
        >
          {submitActionText}
        </PlainButton>
      </div>
    </form>
  )
}

export default Form
