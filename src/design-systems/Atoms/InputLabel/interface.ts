import { ChangeEvent } from 'react'

export interface InputLabelProps {
  label?: string
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  inputType: string
  value?: string
}
