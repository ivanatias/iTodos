import { useState } from 'react'
import type { InputChangeEvent } from '../models/types'

interface UseFieldType {
  type: 'text' | 'password' | 'checkbox'
}

export const useField = ({ type }: UseFieldType) => {
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)

  const onChange = (e: InputChangeEvent) => {
    if (type === 'checkbox') setChecked(e.target.checked)

    setValue(e.target.value)
  }

  const reset = () => {
    if (type === 'checkbox') setChecked(false)

    setValue('')
  }

  return {
    value,
    checked,
    type,
    onChange,
    reset,
  }
}
