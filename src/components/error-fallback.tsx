import GradientTitle from './gradient-title'

interface Props {
  retry: () => void
}

const ErrorFallback = ({ retry }: Props) => {
  return (
    <div className='grid h-screen gap-3 place-content-center'>
      <GradientTitle>iTodos</GradientTitle>
      <p className='text-base font-semibold text-center 2xl:text-lg'>
        Whoops! something went wrong...
      </p>
      <button
        onClick={retry}
        className='font-bold text-blue-500 border-none outline-none'
      >
        Try again
      </button>
    </div>
  )
}

export default ErrorFallback
