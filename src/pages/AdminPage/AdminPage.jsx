import { useState } from 'react'
import { useEffect } from 'react'
import './Admin.css'
import Button from '../../UI/Button/Button'
import styles from './Admin.module.css'

export default function Admin() {
  const [users, setUsers] = useState([])
  const [login, setLogin] = useState('')
  const [password, setPas] = useState('')
  const [editId, setEditId] = useState('')
  const [buttonText, setbuttonText] = useState('добавить')

  // добавить
  const addUser = async () => {
    if (login === '') {
      alert('Введите логин!')
    } else if (password === '') {
      alert('Введите пароль!')
    } else {
      const dateObject = new Date()
      const idUser = dateObject.getTime()
      const id = String(idUser)
      const task = { id, login, password, isAdmin: false }
      await fetch('/api/systemUsers', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(task),
      })
      setLogin('')
      setPas('')
      getUser()
    }
  }

  // роль
  const changeRole = async (idNo) => {
    for (let user of users) {
      if (user.id === idNo) {
        await fetch(`/api/systemUsers/${idNo}`, {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            id: user.id,
            login: user.login,
            password: user.password,
            isAdmin: !user.isAdmin,
          }),
        })
      }
    }
    getUser()
  }

  //удалить
  const deleteUser = async (idNo) => {
    if (window.confirm('Вы точно хотите удалить пользователя?')) {
      for (let user of users) {
        if (user.id === idNo) {
          await fetch(`/api/systemUsers/${idNo}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
          })
        }
      }
      getUser()
    }
  }

  //редактировать
  const getEdit = (idNo) => {
    for (let user of users) {
      if (user.id === idNo) {
        setLogin(user.login)
        setPas(user.password)
      }
    }
    setbuttonText('сохранить')
    setEditId(idNo)
  }

  //редактировать
  const editUser = async () => {
    for (let user of users) {
      if (user.id === editId) {
        await fetch(`/api/systemUsers/${editId}`, {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            id: user.id,
            login: login,
            password: password,
            isAdmin: user.isAdmin,
          }),
        })
      }
    }
    setLogin('')
    setPas('')
    setbuttonText('добавить')
    getUser()
  }

  //получить с сервера
  const getUser = async () => {
    await fetch('/api/systemUsers?_sort=id&_order=desc')
      .then((res) => res.json())
      .then((data) => setUsers(data))
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="admin-container">
      <div className="head-container">
        <h3 className="input-logo" style={{ marginBottom: '20px' }}>
          Администрирование
        </h3>
        <input
          type="text"
          autoComplete="off"
          placeholder="Введите логин"
          className="input-inp"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          // onKeyUp={handleKeyPress}
        />
        <input
          type="text"
          autoComplete="off"
          placeholder="Введите пароль"
          className="input-inp"
          value={password}
          onChange={(e) => setPas(e.target.value)}
          // onKeyUp={handleKeyPress}
        />
        <Button
          className={styles['admin-create__button']}
          onClick={() => {
            buttonText === 'добавить' ? addUser() : editUser()
          }}
        >
          {buttonText}
        </Button>
      </div>

      {users.map((user) => (
        <div className="admin-item" key={user.id}>
          {user.isAdmin === true ? (
            <>
              {/* если админ */}
              <div className="admin-info">
                <div className="auth-info">
                  <label className="admin-label">логин</label>
                  <p className="admin-title ">{user.login}</p>
                </div>
                <div className="auth-info">
                  <label className="admin-label">пароль</label>
                  <p className="admin-title ">{user.password}</p>
                </div>
              </div>
              <div className="admin-button">
                <div className="userRole">
                  <button
                    className="Adone "
                    style={{ marginRight: '10px' }}
                    value={user.id}
                    onClick={(e) => changeRole(e.target.value)}
                  >
                    🟢
                  </button>
                  <p>роль: администратор</p>
                </div>
                <div className="calendar-button">
                  <Button onClick={() => getEdit(user.id)}>Изменить</Button>
                  <Button onClick={() => deleteUser(user.id)}>удалить</Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* если пользователь */}
              <div className="admin-info">
                <div className="auth-info">
                  <label className="admin-label">логин</label>
                  <p className="admin-title ">{user.login}</p>
                </div>
                <div className="auth-info">
                  <label className="admin-label">пароль</label>
                  <p className="admin-title ">{user.password}</p>
                </div>
              </div>
              <div className="admin-button">
                <div className="userRole">
                  <button
                    className="Adone "
                    style={{ marginRight: '10px' }}
                    value={user.id}
                    onClick={(e) => changeRole(e.target.value)}
                  >
                    🔴
                  </button>
                  <p>роль: пользователь</p>
                </div>
                <div className="calendar-button">
                  <Button
                    onClick={() => getEdit(user.id)}
                    className="operate-button"
                  >
                    Изменить
                  </Button>
                  <Button
                    onClick={() => deleteUser(user.id)}
                    className="operate-button"
                  >
                    удалить
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
