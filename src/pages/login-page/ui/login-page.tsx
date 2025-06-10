import { ChangeEvent, FormEvent, useState } from 'react'
import { CustomForm } from '../../../shared/ui/custom-form'

import styles from './login-page.module.css'
import { LoginPageProps } from '../types'
import { Field, FieldType } from '../../../shared/types'

export const LoginPage = (props: LoginPageProps) => {
  const { logIn, validUser } = props
  const [login, setLogin] = useState<string>('')
  const [pas, setPas] = useState<string>('')

  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    logIn(login, pas)
  }

  const fields: Field[] = [
    {
      label: 'Введите логин',
      type: FieldType.text,
      name: 'login',
      value: login,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value),
      required: true,
    },
    {
      label: 'Введите пароль',
      type: FieldType.password,
      name: 'pas',
      value: pas,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setPas(e.target.value),
      required: true,
    },
  ]

  return (
    <>
      <CustomForm
        fields={fields}
        onSubmit={handlesubmit}
        title="Авторизация"
        submitBtnTitle="Войти"
        containerClassName={styles['login-page']}
        titleClassName={styles['login-page__title']}
      />
      {!validUser && (
        <p className={styles['login-page__error']}>
          Неверный логин или пароль! Повторите попытку входа!
        </p>
      )}
    </>
  )
}
