import { useState, useCallback } from 'react'

export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggleValue = useCallback(() => setValue((prev) => !prev), [])

  return { value, toggleValue }
}
