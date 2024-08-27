import PropTypes from 'prop-types'
import { useState } from 'react'

export function Login(props) {
  const [login, setLogin] = useState('')
  const [pas, setPas] = useState('')

  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }
  // console.log(login, pas)
  return (
    <div
      className="input-container"
      style={{
        marginTop: '150px',
      }}
    >
      <h1 className="input-logo AuthLogo">Авторизация</h1>
      <div>
        <div className="input-elem">
          <label>Введите логин</label>
          <input
            type="text"
            className="input-inp"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="input-elem" style={{ marginBottom: '28px' }}>
          <label>Введите пароль</label>
          <input
            value={pas}
            type={passwordShown ? 'text' : 'password'}
            className="input-inp"
            onChange={(e) => setPas(e.target.value)}
          />
          <p onClick={togglePasswordVisiblity} className="showPas">
            {passwordShown ? '☒ скрыть пароль' : '☐ показать пароль'}
          </p>{' '}
        </div>
        <div className="input-button-section">
          <button
            className="input-button"
            onClick={() => props.login(login, pas)}
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
}
