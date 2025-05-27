import { ButtonHTMLAttributes } from 'react'
import { ButtonType } from '../../../types'

export interface ButtonProps {
  className?: string
  type?: ButtonType
  onClick?(): void
  children: string
}
