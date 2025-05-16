//вынести логику из файла

import { Routes, Route } from 'react-router-dom'

//ИМПОРТИРУЕМ СТРАНИЦЫ
import { HomePage } from './pages/home-page'
import Worker from './pages/Worker/WorkerPage'
import Document from './pages/DocumentPage/DocumentPage'
import Idea from './pages/IdeaPage/IdeaPage'
import Company from './pages/CompanyPage/СompanyPage'
import { InfoPage } from './pages/info-page'

import Layout from './components/Layout/Layout' //ИМПОРТ ХЕДЕРА и футера
import { WorkerEditorForm } from './pages/Worker/worker-editor-form'

import { useEffect, useState } from 'react'
import { Login } from './pages/LoginPage/LoginPage'
import { AUTH_KEY } from './shared/constants/authKey'

import Admin from './pages/AdminPage/AdminPage'

import { CalendarEditorForm, InfoCalendarDetail } from './widgets/info-calendar'
import { NewsDetail, NewsEditorForm } from './widgets/news'

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
          <Route index element={<HomePage user={user} />} />

          <Route
            path="/calendar/create"
            element={<CalendarEditorForm isCreate />}
          />
          <Route
            path="/calendar/detail/:calenid"
            element={<InfoCalendarDetail />}
          />
          <Route
            path="/calendar/edit/:calendarId"
            element={<CalendarEditorForm />}
          />

          <Route path="/news/create" element={<NewsEditorForm isCreate />} />
          <Route path="/news/detail/:newsid" element={<NewsDetail />} />
          <Route path="/news/edit/:newsId" element={<NewsEditorForm />} />

          <Route path="worker" element={<Worker user={user} />} />

          {/*Создать новый  */}
          <Route
            path="/worker/create"
            element={<WorkerEditorForm isCreate />}
          />

          {/* редактировать */}
          <Route path="/worker/edit/:workerId" element={<WorkerEditorForm />} />

          <Route path="document" element={<Document />} />

          <Route path="info" element={<InfoPage />} />
          <Route path="idea" element={<Idea user={user} />} />
          <Route path="company" element={<Company />} />
          <Route path="admin" element={<Admin />} />
          {/* <Route path="*" element={<NotFoundPage/>}/> */}
        </Route>
      </Routes>
    </>
  )
}
