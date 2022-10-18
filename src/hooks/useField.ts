import { useState } from 'react'
import type { InputChangeEvent } from '../models/types'

interface UseFieldType {
  type: 'text' | 'password'
}

export const useField = ({ type }: UseFieldType) => {
  const [value, setValue] = useState('')

  const onChange = (e: InputChangeEvent) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    value,
    type,
    onChange,
    reset,
  }
}
