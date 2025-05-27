import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../shared/ui/button'
import styles from './info-calendar-list.module.css'
import { InfoCalendarListProps } from '../types'
import { RoutePath } from '../../../../shared/types/route-path'

export const InfoCalendarList = (props: InfoCalendarListProps) => {
  const { calendars, user, getCalendarData } = props

  const navigate = useNavigate()

  const removeCalendarItem = (id?: number) => {
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
    <div className={styles['info-calendar__list']}>
      {calendars.map(({ id, date, title }) => (
        <div className={styles['info-calendar__item']} key={id}>
          <div className={styles['info-calendar__description']}>
            <div className={styles['info-calendar__date']}>
              <p className={styles.month}>{date}</p>
            </div>
            <p className={styles['info-calendar__text']}>{title}</p>
            <a
              className={styles['info-calendar__link']}
              onClick={() => {
                navigate(RoutePath.calendarDetail + id)
              }}
            >
              +
            </a>
          </div>

          {user?.isAdmin && (
            <div className={styles['info-calendar__button']}>
              <Button
                onClick={() => {
                  navigate(RoutePath.calendarEdit + id)
                }}
              >
                Изменить
              </Button>
              <Button onClick={() => removeCalendarItem(id)}>Удалить</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
