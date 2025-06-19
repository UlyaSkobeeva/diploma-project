import { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import styles from './header-layout.module.css'
import { ActiveLink } from '../../types'
import { useClickOutside } from '../../lib/utils/use-click-outside'
import { MENU_ITEMS } from '../../lib/constants/menu-items'
import { RoutePath } from '../../../../shared/types/route-path'
import { Context } from '../../../App'

export const HeaderLayout = () => {
  const [isOpenBurger, setIsOpenBurger] = useState<boolean>(false)

  const user = useContext(Context)

  useEffect(() => {
    let startTouchY = 0
    let endTouchY = 0

    const handleTouchStart = (event: TouchEvent) => {
      startTouchY = event.changedTouches[0].pageY
    }

    const handleTouchEnd = (event: TouchEvent) => {
      endTouchY = event.changedTouches[0].pageY
      if (endTouchY < startTouchY) setIsOpenBurger(false)
    }

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  const menuRef = useRef<HTMLElement | null>(null)

  useClickOutside(menuRef, () => {
    if (isOpenBurger) {
      setTimeout(() => setIsOpenBurger(false), 100)
    }
  })

  const logOut = () => {
    if (confirm('Вы точно хотите выйти?')) {
      sessionStorage.clear()

      window.location.reload()
    }
  }

  const setActiveLink = ({ isActive }: ActiveLink): string =>
    classNames(
      styles['header-menu__link'],
      isActive && styles['header-menu__link--active'],
    )

  const menuItems = !user?.isAdmin
    ? MENU_ITEMS.filter((item) => item.path !== RoutePath.admin)
    : MENU_ITEMS

  return (
    <header className={styles['header']}>
      <div className={styles['header__container']}>
        <h1 className={styles['header__title']}>𝓞𝓾𝓻𝓣𝓮𝓪𝓶</h1>
        <nav
          className={classNames(
            styles['header-menu'],
            isOpenBurger && styles['header-menu--open'],
          )}
          ref={menuRef}
        >
          <ul className={styles['header-menu__list']}>
            {menuItems.map(({ path, label }) => (
              <li className={styles['header-menu__item']} key={path}>
                <NavLink to={path} className={setActiveLink}>
                  {label}
                </NavLink>
              </li>
            ))}

            <li className={styles['header-menu__item']}>
              <a
                onClick={logOut}
                className={styles['header-menu__link--closing']}
              >
                ⇒
              </a>
            </li>
          </ul>
        </nav>

        <div
          className={classNames(
            styles['burger'],
            isOpenBurger && styles['burger--active'],
          )}
          onClick={() => setIsOpenBurger(!isOpenBurger)}
        >
          <span></span>
        </div>
      </div>
    </header>
  )
}
