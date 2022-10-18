interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main className='max-w-2xl px-4 mx-auto flex flex-col items-center justify-center'>
      {children}
    </main>
  )
}

export default Layout
