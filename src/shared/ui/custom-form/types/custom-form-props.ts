import { NavigateOptions, To } from 'react-router-dom'
import { Field } from '../../../types'
import { FormEvent } from 'react'

export interface CustomFormProps {
  //поля для формы
  fields: Field[]

  //отправка формы
  onSubmit(e: FormEvent<HTMLFormElement>): void

  //кнопка отмена
  onCancel?(to?: To, options?: NavigateOptions): void

  //заголовок
  title: string

  //текст кнопки сохранить
  submitBtnTitle: string

  //стили для контейнера
  containerClassName?: string

  //стили для заголовка
  titleClassName?: string

  //стили для кнопок
  buttonsClassName?: string
}
