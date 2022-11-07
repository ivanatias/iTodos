type SVGIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface Props {
  Icon: SVGIcon
  actionFunction: () => void
  backgroundColor: string
  disabled?: boolean
}

const TodoActionButton = ({
  Icon,
  actionFunction,
  backgroundColor,
  disabled,
}: Props) => {
  return (
    <button
      onClick={actionFunction}
      className={`p-1 font-bold text-white ${backgroundColor} border-none rounded-md outline-none`}
      disabled={disabled}
    >
      <Icon className='w-3 h-3' />
    </button>
  )
}

export default TodoActionButton
