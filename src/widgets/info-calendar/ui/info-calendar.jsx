// Ближайшие события
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './InfoCalendar.module.css'
import Logo from '../../../UI/Logo/Logo'
import { Button } from '../../../shared/ui/button'

export const InfoCalendar = (props) => {
  const [calendars, setCalendars] = useState([])

  const navigate = useNavigate()

  //получить данные с сервера
  const getCalendarData = () => {
    fetch('/api/calendar?_sort=month,day&_order=desc,asc')
      .then((response) => {
        return response.json()
      })
      .then((calendarData) => {
        setCalendars(calendarData)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(() => {
    getCalendarData()
  }, [])

  //создать новую
  const CreateCalendar = () => {
    navigate('/calendar/create')
  }

  //удаление
  const RemoveFunction = (id) => {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      fetch('/api/calendar/' + id, {
        method: 'DELETE',
      })
        .then(() => {
          getCalendarData()
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }

  return (
    <div className={styles['info-calendar']}>
      {props.user?.isAdmin && (
        <Button onClick={CreateCalendar}> Добавить новое событие</Button>
      )}

      <Logo className={styles['info-calendar__logo']}>Ближайшие события</Logo>

      <div className={styles['info-calendar__list']}>
        {calendars.map((calendar) => (
          <div className={styles['info-calendar__item']} key={calendar.id}>
            <div className={styles['info-calendar__description']}>
              <div className={styles['info-calendar__date']}>
                <p className={styles.month}>{calendar.date}</p>
              </div>
              <p className={styles['info-calendar__text']}>{calendar.title}</p>
              <a
                className={styles['plus__btn']}
                onClick={() => {
                  navigate('/calendar/detail/' + calendar.id)
                }}
              >
                +
              </a>
            </div>

            {props.user?.isAdmin && (
              <div className={styles['button-section']}>
                <Button
                  onClick={() => {
                    navigate('/calendar/edit/' + calendar.id)
                  }}
                >
                  Изменить
                </Button>
                <Button onClick={() => RemoveFunction(calendar.id)}>
                  Удалить
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

InfoCalendar.propTypes = {
  user: PropTypes.object,
}
