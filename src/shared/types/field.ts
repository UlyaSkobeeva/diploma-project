import { ChangeEvent } from 'react'

export interface Field {
  label?: string
  type: FieldType
  name: string
  value: string
  onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
  required?: boolean
  placeholder?: string
}

export enum FieldType {
  text = 'text',
  password = 'password',
  date = 'date',
  textarea = 'textarea',
}
