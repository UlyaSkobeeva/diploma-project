import { Routes, Route } from 'react-router-dom'

//ИМПОРТИРУЕМ СТРАНИЦЫ
import Home from './pages/HomePage/HomePage'
import Worker from './pages/Worker/WorkerPage'
import Document from './pages/DocumentPage/DocumentPage'
// import {NotFoundPage} from "../../pages/NotFoundPage"
import Idea from './pages/IdeaPage/IdeaPage'
import Company from './pages/CompanyPage/СompanyPage'

import Layout from './components/Layout/Layout' //ИМПОРТ ХЕДЕРА и футера
import WorkerCreate from './pages/Worker/WorkerCreate'
import WorkerEdit from './pages/Worker/WorkerEdit'
import CalendarCreate from './pages/HomePage/InfoCalendar/InfoCalendarCreate'
import CalendarDetail from './pages/HomePage/InfoCalendar/InfoCalendarDetail'
import CalendarEdit from './pages/HomePage/InfoCalendar/InfoCalendarEdit'

import NewsCreate from './pages/HomePage/News/NewsCreate'
import NewsDetail from './pages/HomePage/News/NewsDetail'
import NewsEdit from './pages/HomePage/News/NewsEdit'
import { useEffect, useState } from 'react'
import { Login } from './pages/LoginPage/LoginPage'
import { AUTH_KEY } from './shared/constants/authKey'
import Info from './pages/InfoPage/InfoPage'
import Admin from './pages/AdminPage/AdminPage'
// import './App.css'

export default function App() {
  const [isAuth, setAuth] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const sessionStorageId = sessionStorage.getItem(AUTH_KEY)
    if (!sessionStorageId) {
      return
    }

    fetch('/api/systemUsers/')
      .then((res) => {
        return res.json()
      })
      .then((usersDB) => {
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

  const LogIn = async (login, pas) => {
    // console.log('Нажала на кнопку', login, pas)
    const response = await fetch('/api/systemUsers/')
    const users = await response.json()
    // console.log(users)
    const userFromDB = users.find(
      (item) => item.login === login && item.password === pas,
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
    return <Login login={LogIn} />
  }

  return (
    <>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}

        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<Home user={user} />} />

          <Route path="/calendar/create" element={<CalendarCreate />} />
          <Route
            path="/calendar/detail/:calenid"
            element={<CalendarDetail />}
          />
          <Route path="/calendar/edit/:calenid" element={<CalendarEdit />} />

          <Route path="/news/create" element={<NewsCreate />} />
          <Route path="/news/detail/:newsid" element={<NewsDetail />} />
          <Route path="/news/edit/:newsid" element={<NewsEdit />} />

          <Route path="worker" element={<Worker user={user} />} />

          {/*Создать новый  */}
          <Route path="/worker/create" element={<WorkerCreate />} />

          {/* редактировать */}
          <Route path="/worker/edit/:workid" element={<WorkerEdit />} />

          <Route path="document" element={<Document />} />

          <Route path="info" element={<Info />} />
          <Route path="idea" element={<Idea user={user} />} />
          <Route path="company" element={<Company />} />
          <Route path="admin" element={<Admin />} />
          {/* <Route path="*" element={<NotFoundPage/>}/> */}
        </Route>
      </Routes>
    </>
  )
}
