import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main className='flex flex-col items-center justify-center h-screen max-w-2xl px-4 mx-auto'>
      <Outlet />
    </main>
  )
}

export default Layout
