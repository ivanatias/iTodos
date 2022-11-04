import PlainButton from './plain-button'

interface Props {
  name: string
  handleLogout: () => void
}

const MainHeader = ({ name, handleLogout }: Props) => {
  return (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      <h1 className='text-xl font-extrabold text-blue-400 2xl:text-2xl'>
        Hello, {name}
      </h1>
      <PlainButton variant='secondary' onClick={handleLogout}>
        Logout
      </PlainButton>
    </div>
  )
}

export default MainHeader
