import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../../shared/ui/button'
import { InfoCalendarList } from '../../../features/info-calendar/info-calendar-list'
import { Calendar } from '../../../shared/types/calendar'

import { InfoCalendarProps } from '../types'
import styles from './info-calendar.module.css'
import { RoutePath } from '../../../shared/types/route-path'

export const InfoCalendar = (props: InfoCalendarProps) => {
  const { user } = props
  const [calendars, setCalendars] = useState<Calendar[]>([])

  const navigate = useNavigate()

  const getCalendarData = () => {
    fetch('/api/calendar')
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

  return (
    <div className={styles['info-calendar']}>
      {user?.isAdmin && (
        <Button onClick={() => navigate(RoutePath.calendarCreate)}>
          Добавить новое событие
        </Button>
      )}

      <h2 className={styles['info-calendar__title']}>Ближайшие события</h2>

      <InfoCalendarList
        calendars={calendars}
        getCalendarData={getCalendarData}
        user={user}
      />
    </div>
  )
}
