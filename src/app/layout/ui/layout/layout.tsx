import { Outlet } from 'react-router-dom'

import '../../../App.css'
import { LayoutProps } from '../../types'
import { HeaderLayout } from '../header-layout/header-layout'

export const Layout = (props: LayoutProps) => {
  const { user } = props

  return (
    <>
      <HeaderLayout user={user} />

      <main>
        <Outlet />
      </main>
    </>
  )
}
