import { Outlet } from 'react-router-dom'

import '../../../app.css'

import { HeaderLayout } from '../header-layout/header-layout'

export const Layout = () => {
  return (
    <>
      <HeaderLayout />

      <main>
        <Outlet />
      </main>
    </>
  )
}
