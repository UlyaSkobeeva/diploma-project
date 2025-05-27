import { ChangeEvent, FormEvent, useState } from 'react'
import { CustomForm } from '../../../shared/ui/custom-form'

import styles from './login-page.module.css'
import { LoginPageProps } from '../types'
import { FieldType } from '../../../shared/types'

export const LoginPage = (props: LoginPageProps) => {
  const { logIn } = props
  const [login, setLogin] = useState<string>('')
  const [pas, setPas] = useState<string>('')

  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    logIn(login, pas)
  }

  const fields = [
    {
      label: 'Введите логин',
      type: FieldType.text,
      name: 'login',
      value: login,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value),
    },
    {
      label: 'Введите пароль',
      type: FieldType.password,
      name: 'pas',
      value: pas,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setPas(e.target.value),
    },
  ]

  return (
    <CustomForm
      fields={fields}
      onSubmit={handlesubmit}
      title="Авторизация"
      submitBtnTitle="Войти"
      containerClassName={styles['login-page']}
      titleClassName={styles['login-page__title']}
    />
  )
}
