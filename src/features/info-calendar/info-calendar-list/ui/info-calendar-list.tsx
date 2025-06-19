import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '../../../../shared/ui/button'
import styles from './info-calendar-list.module.css'
import { InfoCalendarListProps } from '../types'
import { RoutePath } from '../../../../shared/types/route-path'
import { formatShortDate } from '../../../../shared/lib/utils/format-date'
import { getUpcomingCalendarDates } from '../lib/utils/get-upcoming-calendar-date'

import {
  fetchCalendars,
  removeCalendar,
} from '../../../../app/store/calendars/calendars-action'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/lib/utils/use-app'
import { CalendarSelector } from '../../../../app/store/calendars/calendars-slice'
import dayjs from 'dayjs'

export const InfoCalendarList = (props: InfoCalendarListProps) => {
  const { user } = props

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const calendars = useAppSelector(CalendarSelector)

  useEffect(() => {
    !calendars.length && dispatch(fetchCalendars())
  }, [dispatch])

  const removeCalendarItem = (id: number) => {
    dispatch(removeCalendar(id))
  }

  const filteredCalendars = getUpcomingCalendarDates(calendars).sort(
    (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
  )

  return (
    <div className={styles['info-calendar__list']}>
      {!filteredCalendars.length && <p> информация отствует </p>}

      {filteredCalendars.map(({ id, date, title }) => (
        <div className={styles['info-calendar__item']} key={id}>
          <div className={styles['info-calendar__description']}>
            <div className={styles['info-calendar__date']}>
              {formatShortDate(date)}
            </div>
            <p className={styles['info-calendar__text']}>{title}</p>
            <button
              className={styles['info-calendar__button--navigation']}
              onClick={() => {
                navigate(RoutePath.calendarDetail + id)
              }}
            >
              +
            </button>
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
