import PropTypes from 'prop-types'

import { useState, useRef, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { UseClickOutside } from '../../hooks/UseClickOutside'
import '../../../src/App.css'
import './Header.css'

//Активная ссылка
const setActive = ({ isActive }) =>
  isActive ? 'header-menu__link active-link' : 'header-menu__link'

export default function Layout(props) {
  //Открывать бургер и закрывать =
  const [isOpen, setOpen] = useState()

  //закрыть бургер по свайпу
  useEffect(() => {
    let startTouchY = 0 //начало свайпа
    let endTouchY = 0 //окончание свайпа

    document.addEventListener('touchstart', () => {
      startTouchY = event.changedTouches[0].pageY
    })

    document.addEventListener('touchend', () => {
      endTouchY = event.changedTouches[0].pageY
      if (endTouchY < startTouchY) setOpen(false) //закрыть когда проводим снизу вверх
    })
  }, [])

  //Закрыть хедер по нажатию вне области
  const menuRef = useRef(null)
  UseClickOutside(menuRef, () => {
    if (isOpen) setTimeout(() => setOpen(false), 100)
  })

  const LogOut = () => {
    if (confirm('Вы точно хотите выйти?')) {
      sessionStorage.clear()
      window.location.reload()
    }
  }

  return (
    <>
      {/* ------------------------ HEADER -------------------------------------*/}
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <a href="#" className="header__logo ">
              𝓞𝓾𝓻𝓣𝓮𝓪𝓶
            </a>
            <nav
              className={`header-menu ${isOpen ? 'open' : ''} `}
              ref={menuRef}
            >
              <ul className="header-menu__list">
                <li className="header-menu__item">
                  <NavLink to="/" className={setActive}>
                    Главная
                  </NavLink>
                </li>
                <li className="header-menu__item">
                  <NavLink to="/worker" className={setActive}>
                    Сотрудники
                  </NavLink>
                </li>
                <li className="header-menu__item">
                  <NavLink to="/document" className={setActive}>
                    Документы
                  </NavLink>
                </li>
                <li className="header-menu__item">
                  <NavLink to="/info" className={setActive}>
                    ИнфоЦентр
                  </NavLink>
                </li>
                <li className="header-menu__item">
                  <NavLink to="/idea" className={setActive}>
                    Банк идей
                  </NavLink>
                </li>
                <li className="header-menu__item">
                  <NavLink to="/company" className={setActive}>
                    О компании
                  </NavLink>
                </li>

                {props.user?.isAdmin && (
                  <li className="header-menu__item">
                    <NavLink to="/admin" className={setActive}>
                      ⚙
                    </NavLink>
                  </li>
                )}

                <li className="header-menu__item">
                  <NavLink
                    onClick={LogOut}
                    className="header-menu__link"
                    style={{
                      borderTop: '2px solid #fff',
                      borderBottom: '2px solid #fff',
                      borderLeft: '2px solid #fff',
                      padding: '5px',
                      borderRadius: '5px',
                    }}
                  >
                    ⇒
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div
              className={`burger ${isOpen ? 'active' : ''} `}
              onClick={() => setOpen(!isOpen)}
            >
              <span></span>
            </div>
          </div>
        </div>
      </header>
      {/* ----------------------------- /HEADER ------------------------------------------------------ */}

      <main>
        {/* СОДЕРЖИМОЕ ВСЕХ СТРАНИЦ НАХОДИТСЯ В main */}
        <Outlet />
      </main>
    </>
  )
}

Layout.propTypes = {
  user: PropTypes.object,
}
