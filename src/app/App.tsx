import { useEffect, useState } from 'react'

import { LoginPage } from '../pages/login-page'

import { AUTH_KEY } from '../shared/constants/auth-key'
import { User } from '../shared/types'

import { Router } from './router'

export default function App() {
  //TODO user запихнуть в контекст

  const [isAuth, setAuth] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const [validUser, setValidUser] = useState<boolean>(true)

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
    const response = await fetch('/api/systemUsers/')
    const users: User[] = await response.json()
    const userFromDB = users.find(
      (item) => item.login === login && item.password === password,
    )

    if (userFromDB) {
      sessionStorage.setItem(AUTH_KEY, userFromDB.id)
      setAuth(true)
      setUser(userFromDB)
      setValidUser(true)
    } else {
      //TODO модальное окно
      // alert('Введен неверный логин или пароль! Повторите попытку!')
      setValidUser(false)
    }
  }

  if (!isAuth) {
    return <LoginPage logIn={LogIn} validUser={validUser} />
  }

  return <Router user={user} />
}
