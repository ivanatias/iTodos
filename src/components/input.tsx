import { capitalize } from '../utils/helpers'
import type { InputChangeEvent } from '../models/types'

export interface InputProps {
  name?: string
  id: string
  type: string
  value: string
  checked?: boolean
  placeholder?: string
  onChange: (e: InputChangeEvent) => void
}

const textInputStyle =
  'px-1 py-2 text-sm h-8 outline-none border-none bg-gray-50 text-black placeholder:text-sm rounded-md w-full'

const Input = (props: InputProps) => {
  const { type } = props
  const style = type === 'text' || type === 'password' ? textInputStyle : ''

  return (
    <>
      {props.name !== undefined && (
        <label className='text-xs' htmlFor={props.id}>
          {capitalize(props.name)}
        </label>
      )}
      <input {...props} className={style} />
    </>
  )
}

export default Input
