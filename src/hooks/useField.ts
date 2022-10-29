import { useState } from 'react'
import type { InputChangeEvent, InputType } from '../models/types'

interface UseField {
  type: InputType
  defaultTextValue?: string
  defaultCheckedValue?: boolean
}

export const useField = ({
  type,
  defaultTextValue,
  defaultCheckedValue,
}: UseField) => {
  const [value, setValue] = useState<string>(defaultTextValue ?? '')
  const [checked, setChecked] = useState<boolean>(defaultCheckedValue ?? false)

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
