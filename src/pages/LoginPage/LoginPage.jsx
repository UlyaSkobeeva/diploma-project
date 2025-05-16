import PropTypes from 'prop-types'
import { useState } from 'react'
import { CustomForm } from '../../shared/ui/custom-form'

import styles from './login-page.module.css'
export function Login(props) {
  const [login, setLogin] = useState('')
  const [pas, setPas] = useState('')

  const [passwordShown, setPasswordShown] = useState(false)

  //показать и скрыть пароль
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    props.login(login, pas)
  }

  const fields = [
    {
      label: 'Введите логин',
      type: 'text',
      name: 'login',
      value: login,
      onChange: (e) => setLogin(e.target.value),
    },
    {
      label: 'Введите пароль',
      type: `${passwordShown ? 'text' : 'password'}`,
      name: 'pas',
      value: pas,
      onChange: (e) => setPas(e.target.value),
    },
  ]

  /* показать и скрыть пароль */

  return (
    <CustomForm
      fields={fields}
      onSubmit={handlesubmit}
      title="Авторизация"
      submitBtn="Войти"
      containerClassName={styles['login-page']}
      titleClassName={styles['login-page__title']}
    />
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
}
