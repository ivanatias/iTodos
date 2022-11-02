interface Props {
  children: React.ReactNode
  animationClass?: string
}

const GradientTitle = ({ children, animationClass }: Props) => {
  return (
    <h1
      className={`${
        animationClass !== undefined ? animationClass : ''
      } p-3 text-3xl font-bold text-center text-transparent lg:text-5xl bg-clip-text bg-gradient-to-r from-blue-500 to-gray-300`}
    >
      {children}
    </h1>
  )
}

export default GradientTitle
