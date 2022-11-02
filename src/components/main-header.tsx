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
      <button
        onClick={handleLogout}
        className='text-sm font-bold text-red-500 underline border-none outline-none underline-offset-2 2xl:text-base'
      >
        Logout
      </button>
    </div>
  )
}

export default MainHeader
