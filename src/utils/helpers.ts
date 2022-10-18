const capitalize = (str: string) => {
  const lowerCase = str.toLowerCase()
  return `${str.charAt(0).toUpperCase()}${lowerCase.slice(1)}`
}

export { capitalize }
