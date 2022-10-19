import { capitalize } from '../utils/helpers'
import type { InputChangeEvent } from '../models/types'

export interface InputProps {
  name: string
  id: string
  type: string
  value: string | number
  placeholder?: string
  onChange: (e: InputChangeEvent) => void
}

const textInputStyle =
  'px-1 py-2 text-sm h-8 outline-none border-none bg-gray-50 text-black placeholder:text-sm rounded-md w-full'

const Input = (props: InputProps) => {
  const { type } = props
  const style = type === 'text' || type === 'password' ? textInputStyle : ''

  return (
    <div className='flex flex-col gap-1'>
      <label className='mb-2 text-xs' htmlFor={props.id}>
        {capitalize(props.name)}
      </label>
      <input {...props} className={style} />
    </div>
  )
}

export default Input
