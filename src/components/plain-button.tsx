interface Props {
  type?: 'button' | 'submit'
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  underlined?: boolean
  size?: 'small' | 'big'
  children: string
}

const commonStyles =
  'text-sm font-bold 2xl:text-base border-none outline-none flex-shrink-0 transition-colors duration-150'

const underlinedStyles = 'underline-offset-2 underline'

const bigStyles = 'text-base 2xl:text-lg'
const smallStyles = 'text-sm 2xl:text-base'

const primaryStyles = `${commonStyles} text-blue-500 hover:text-blue-600`
const secondaryStyles = `${commonStyles} text-red-500 hover:text-red-600`

const PlainButton = ({
  type,
  onClick,
  variant,
  underlined,
  size,
  children,
}: Props) => {
  const isPrimary = variant !== undefined && variant === 'primary'
  const isUnderlined = underlined !== undefined && underlined
  const isBig = size !== undefined && size === 'big'

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${isPrimary ? primaryStyles : secondaryStyles} ${
        isUnderlined ? underlinedStyles : ''
      } ${isBig ? bigStyles : smallStyles}`}
    >
      {children}
    </button>
  )
}

export default PlainButton
