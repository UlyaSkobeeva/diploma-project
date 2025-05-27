import { useEffect, useState } from 'react'

import { LoginPage } from '../pages/login-page'

import { AUTH_KEY } from '../shared/constants/auth-key'
import { User } from '../shared/types'

import { Router } from './router'

export default function App() {
  const [isAuth, setAuth] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const sessionStorageId = sessionStorage.getItem(AUTH_KEY)
    if (!sessionStorageId) {
      return
    }

    fetch('/api/systemUsers/')
      .then((res) => {
        return res.json()
      })
      .then((usersDB: User[]) => {
        // console.log(usersDB)
        const userAuth = usersDB.find(
          (userItem) => userItem.id === sessionStorageId,
        )
        if (userAuth) {
          setAuth(true)
          setUser(userAuth)
        }
      })
  }, [])

  const LogIn = async (login: string, password: string) => {
    // console.log('Нажала на кнопку', login, pas)
    const response = await fetch('/api/systemUsers/')
    const users: User[] = await response.json()
    // console.log(users)
    const userFromDB = users.find(
      (item) => item.login === login && item.password === password,
    )
    // console.log(userFromDB)
    if (userFromDB) {
      sessionStorage.setItem(AUTH_KEY, userFromDB.id)
      setAuth(true)
      setUser(userFromDB)
    } else {
      alert('Введен неверный логин или пароль! Повторите попытку!')
    }
  }

  if (!isAuth) {
    return <LoginPage logIn={LogIn} />
  }

  return <Router user={user} />
}
