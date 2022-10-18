interface Props {
  name: string
  id: string
  type: string
  value: string | number
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const capitalize = (str: string) => {
  const lowerCase = str.toLowerCase()
  return `${str.charAt(0).toUpperCase()}${lowerCase.slice(1)}`
}

const textInputStyle =
  'px-1 py-2 text-sm h-8 outline-none border-none bg-gray-50 text-black placeholder:text-sm rounded-md w-full'

const Input = (props: Props) => {
  const { type } = props
  const style = type === 'text' || type === 'password' ? textInputStyle : ''

  return (
    <div className='flex flex-col gap-1'>
      <label className='text-xs mb-2' htmlFor={props.id}>
        {capitalize(props.name)}
      </label>
      <input {...props} className={style} />
    </div>
  )
}

export default Input
